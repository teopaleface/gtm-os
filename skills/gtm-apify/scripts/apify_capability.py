#!/usr/bin/env python3
"""Bounded, read-only Apify source adapter for GTM OS.

The adapter intentionally uses only the Apify REST API and Python's standard
library. It never prints the API token and never puts the token in a URL.
"""

from __future__ import annotations

import argparse
import ipaddress
import json
import os
import re
import sys
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Mapping
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode, urlsplit
from urllib.request import Request, urlopen


DEFAULT_API_BASE_URL = "https://api.apify.com/v2"
DEFAULT_WAIT_SECONDS = 60
DEFAULT_MAX_TOTAL_CHARGE_USD = 0.25
DEFAULT_MAX_ITEMS = 10
CAPABILITY_NAMES = ("apify", "browser", "computer_use")
CAPABILITY_FILE_ENV = "GTM_OS_CAPABILITIES_FILE"
DEFAULT_ALLOWED_ACTORS = (
    "apify/rag-web-browser",
    "apify/e-commerce-scraping-tool",
    "apify/google-search-scraper",
    "apify/website-content-crawler",
)
ACTORS_BY_MODE = {
    "fetch-url": "apify/rag-web-browser",
    "product-page": "apify/e-commerce-scraping-tool",
    "search": "apify/google-search-scraper",
    "crawl": "apify/website-content-crawler",
}
TOKEN_LIKE_QUERY_KEYS = {
    "api_key",
    "apikey",
    "auth",
    "authorization",
    "key",
    "password",
    "secret",
    "token",
}
SENSITIVE_OUTPUT_KEYS = {
    "api-key",
    "apikey",
    "authorization",
    "cookie",
    "cookies",
    "headers",
    "password",
    "proxy-authorization",
    "secret",
    "set-cookie",
    "token",
}
ACTOR_ID_RE = re.compile(r"^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$")
ENV_KEY_RE = re.compile(r"^[A-Za-z_][A-Za-z0-9_]*$")


class CapabilityError(Exception):
    """An expected configuration, input, network, or source failure."""

    def __init__(self, code: str, message: str, exit_code: int = 2):
        super().__init__(message)
        self.code = code
        self.message = message
        self.exit_code = exit_code


@dataclass(frozen=True)
class Config:
    enabled: bool
    token: str
    api_base_url: str
    allowed_actors: tuple[str, ...]
    wait_seconds: int
    max_total_charge_usd: float
    max_items: int
    env_file: Path | None
    capabilities_file: Path | None
    capability_settings: tuple[tuple[str, bool], ...]
    search_country: str | None
    search_language: str | None
    search_interface_language: str | None


def _repo_root() -> Path:
    return Path(__file__).resolve().parents[3]


def _candidate_env_files() -> list[Path]:
    candidates = [Path.cwd() / ".env", _repo_root() / ".env"]
    unique: list[Path] = []
    for candidate in candidates:
        resolved = candidate.resolve()
        if resolved not in unique:
            unique.append(resolved)
    return unique


def _candidate_capability_files(
    values: Mapping[str, str], explicit_path: Path | None = None
) -> list[Path]:
    candidates: list[Path] = []
    configured_path = explicit_path
    if configured_path is None and values.get(CAPABILITY_FILE_ENV, "").strip():
        configured_path = Path(values[CAPABILITY_FILE_ENV].strip())
    if configured_path is not None:
        candidates.append(configured_path)
    candidates.extend(
        [
            Path.cwd() / "references" / "user-capabilities.md",
            _repo_root() / "references" / "user-capabilities.md",
        ]
    )
    unique: list[Path] = []
    for candidate in candidates:
        resolved = candidate.expanduser().resolve()
        if resolved not in unique:
            unique.append(resolved)
    return unique


def parse_capabilities_file(path: Path) -> dict[str, bool]:
    """Parse the small, fail-closed capability switchboard in Markdown."""

    settings = {name: False for name in CAPABILITY_NAMES}
    try:
        lines = path.read_text(encoding="utf-8").splitlines()
    except FileNotFoundError:
        return settings
    except OSError as exc:
        raise CapabilityError(
            "CAPABILITY_FILE_ERROR", "Could not read the capability settings file."
        ) from exc

    setting_re = re.compile(
        r"^\s*(apify|browser|computer_use)\s*:\s*(enabled|disabled|true|false)\s*(?:#.*)?$",
        re.IGNORECASE,
    )
    for line in lines:
        match = setting_re.fullmatch(line)
        if not match:
            continue
        name, value = match.groups()
        settings[name.lower()] = value.lower() in {"enabled", "true"}
    return settings


def _load_capability_settings(
    values: Mapping[str, str], explicit_path: Path | None = None
) -> tuple[Path | None, tuple[tuple[str, bool], ...]]:
    selected = next(
        (
            path
            for path in _candidate_capability_files(values, explicit_path)
            if path.is_file()
        ),
        None,
    )
    settings = (
        parse_capabilities_file(selected)
        if selected
        else {name: False for name in CAPABILITY_NAMES}
    )
    return selected, tuple(settings.items())


def capability_enabled(config: Config, name: str) -> bool:
    """Return whether a named capability is enabled in the Markdown switchboard."""

    return dict(config.capability_settings).get(name, False)


def parse_env_file(path: Path) -> dict[str, str]:
    """Parse the small KEY=value subset needed by this adapter."""

    values: dict[str, str] = {}
    try:
        lines = path.read_text(encoding="utf-8").splitlines()
    except FileNotFoundError:
        return values
    except OSError as exc:
        raise CapabilityError("ENV_FILE_ERROR", "Could not read the environment file.") from exc

    for raw_line in lines:
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("export "):
            line = line[7:].lstrip()
        if "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        if not ENV_KEY_RE.fullmatch(key):
            continue
        value = value.strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
            value = value[1:-1]
        values[key] = value
    return values


def load_config(
    env: Mapping[str, str] | None = None,
    env_file: Path | None = None,
    capabilities_file: Path | None = None,
) -> Config:
    """Load process variables over an optional local .env without exposing values."""

    selected_env_file = env_file
    if selected_env_file is None:
        selected_env_file = next((path for path in _candidate_env_files() if path.is_file()), None)

    values = parse_env_file(selected_env_file) if selected_env_file else {}
    values.update(dict(os.environ if env is None else env))
    selected_capabilities_file, capability_settings = _load_capability_settings(
        values, capabilities_file
    )

    allowed_raw = values.get("APIFY_ALLOWED_ACTORS", "")
    allowed = tuple(
        actor
        for actor in (_normalize_actor_id(part) for part in allowed_raw.split(","))
        if actor
    ) or DEFAULT_ALLOWED_ACTORS

    wait_seconds = _positive_int(values.get("APIFY_WAIT_FOR_FINISH_SECS"), DEFAULT_WAIT_SECONDS)
    if wait_seconds > 300:
        raise CapabilityError("INVALID_CONFIG", "APIFY_WAIT_FOR_FINISH_SECS must be at most 300.")

    max_charge = _positive_float(
        values.get("APIFY_MAX_TOTAL_CHARGE_USD"), DEFAULT_MAX_TOTAL_CHARGE_USD
    )
    max_items = _positive_int(values.get("APIFY_MAX_ITEMS"), DEFAULT_MAX_ITEMS)
    if max_items > 100:
        raise CapabilityError("INVALID_CONFIG", "APIFY_MAX_ITEMS must be at most 100.")

    return Config(
        enabled=_parse_bool(values.get("APIFY_ENABLED", "false")),
        token=values.get("APIFY_TOKEN", "").strip(),
        api_base_url=values.get("APIFY_API_BASE_URL", DEFAULT_API_BASE_URL).rstrip("/"),
        allowed_actors=allowed,
        wait_seconds=wait_seconds,
        max_total_charge_usd=max_charge,
        max_items=max_items,
        env_file=selected_env_file,
        capabilities_file=selected_capabilities_file,
        capability_settings=capability_settings,
        search_country=_optional_value(values.get("APIFY_SEARCH_COUNTRY")),
        search_language=_optional_value(values.get("APIFY_SEARCH_LANGUAGE")),
        search_interface_language=_optional_value(
            values.get("APIFY_SEARCH_INTERFACE_LANGUAGE")
        ),
    )


def _parse_bool(value: str) -> bool:
    return value.strip().lower() in {"1", "true", "yes", "on"}


def _positive_int(value: str | None, default: int) -> int:
    if value is None or not value.strip():
        return default
    try:
        parsed = int(value)
    except ValueError as exc:
        raise CapabilityError("INVALID_CONFIG", "An Apify integer setting is invalid.") from exc
    if parsed < 1:
        raise CapabilityError("INVALID_CONFIG", "An Apify integer setting must be positive.")
    return parsed


def _positive_float(value: str | None, default: float) -> float:
    if value is None or not value.strip():
        return default
    try:
        parsed = float(value)
    except ValueError as exc:
        raise CapabilityError("INVALID_CONFIG", "An Apify charge setting is invalid.") from exc
    if parsed <= 0:
        raise CapabilityError("INVALID_CONFIG", "APIFY_MAX_TOTAL_CHARGE_USD must be positive.")
    return parsed


def _optional_value(value: str | None) -> str | None:
    value = (value or "").strip()
    return value or None


def _normalize_actor_id(actor_id: str) -> str:
    actor_id = actor_id.strip()
    if "~" in actor_id and "/" not in actor_id:
        owner, name = actor_id.split("~", 1)
        actor_id = f"{owner}/{name}"
    return actor_id


def actor_api_name(actor_id: str) -> str:
    actor_id = _normalize_actor_id(actor_id)
    if not ACTOR_ID_RE.fullmatch(actor_id):
        raise CapabilityError("INVALID_ACTOR", "The Actor ID must use owner/name format.")
    return actor_id.replace("/", "~", 1)


def ensure_ready(config: Config) -> None:
    if not capability_enabled(config, "apify"):
        raise CapabilityError(
            "APIFY_DISABLED_IN_SETTINGS",
            "Apify is disabled in references/user-capabilities.md.",
        )
    if not config.enabled:
        raise CapabilityError(
            "APIFY_DISABLED",
            "Apify is disabled; set APIFY_ENABLED=true to activate this capability.",
        )
    if not config.token:
        raise CapabilityError(
            "APIFY_NOT_CONFIGURED",
            "Apify is enabled but APIFY_TOKEN is not configured.",
        )


def ensure_allowed_actor(config: Config, actor_id: str) -> str:
    normalized = _normalize_actor_id(actor_id)
    if normalized not in config.allowed_actors:
        raise CapabilityError(
            "ACTOR_NOT_ALLOWED",
            f"Actor '{normalized}' is not in APIFY_ALLOWED_ACTORS.",
        )
    actor_api_name(normalized)
    return normalized


def validate_public_url(value: str) -> str:
    value = value.strip()
    if len(value) > 2048:
        raise CapabilityError("INVALID_URL", "The public URL is too long.")
    parsed = urlsplit(value)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc or not parsed.hostname:
        raise CapabilityError("INVALID_URL", "Use an absolute http or https URL.")
    if parsed.username or parsed.password:
        raise CapabilityError("INVALID_URL", "URLs with embedded credentials are not allowed.")
    query_keys = {key.lower() for key in _query_keys(parsed.query)}
    if query_keys & TOKEN_LIKE_QUERY_KEYS:
        raise CapabilityError("INVALID_URL", "URLs containing credential-like query parameters are not allowed.")

    hostname = parsed.hostname.rstrip(".").lower()
    if hostname in {"localhost", "localhost.localdomain"} or hostname.endswith((".local", ".internal")):
        raise CapabilityError("PRIVATE_URL", "Only public hostnames are allowed.")
    try:
        address = ipaddress.ip_address(hostname)
    except ValueError:
        address = None
    if address is not None and (
        address.is_private
        or address.is_loopback
        or address.is_link_local
        or address.is_reserved
        or address.is_multicast
    ):
        raise CapabilityError("PRIVATE_URL", "Private or local IP addresses are not allowed.")
    return value


def _query_keys(query: str) -> list[str]:
    return [part.split("=", 1)[0] for part in query.split("&") if part]


def sanitize_output(value: Any) -> Any:
    """Remove headers and credential-like fields from Actor output."""

    if isinstance(value, dict):
        return {
            key: sanitize_output(item)
            for key, item in value.items()
            if str(key).strip().lower().replace("_", "-") not in SENSITIVE_OUTPUT_KEYS
        }
    if isinstance(value, list):
        return [sanitize_output(item) for item in value]
    return value


def build_input(
    mode: str,
    value: str,
    config: Config,
    actor_id: str | None = None,
) -> tuple[str, dict[str, Any], dict[str, str]]:
    """Return actor, actor input, and a safe provenance summary."""

    actor = ensure_allowed_actor(config, actor_id or ACTORS_BY_MODE[mode])
    if mode in {"fetch-url", "product-page", "crawl"}:
        public_url = validate_public_url(value)
    else:
        query = value.strip()
        if not query or len(query) > 512 or len(query.split()) > 32:
            raise CapabilityError("INVALID_QUERY", "Use one non-empty query of at most 32 words.")
        public_url = query

    if mode == "fetch-url":
        actor_input = {"query": public_url, "maxResults": 1}
        provenance = {"source_url": public_url, "query_or_input": public_url}
    elif mode == "product-page":
        actor_input = {
            "detailsUrls": [public_url],
            "maxProductResults": 1,
            "scrapeMode": "AUTO",
        }
        provenance = {"source_url": public_url, "query_or_input": public_url}
    elif mode == "search":
        actor_input = {"queries": public_url, "maxPagesPerQuery": 1}
        if config.search_country:
            actor_input["countryCode"] = config.search_country
        if config.search_language:
            actor_input["searchLanguage"] = config.search_language
        if config.search_interface_language:
            actor_input["languageCode"] = config.search_interface_language
        provenance = {"query_or_input": public_url}
    elif mode == "crawl":
        actor_input = {
            "startUrls": [{"url": public_url}],
            "maxCrawlDepth": 0,
            "maxCrawlPages": 1,
            "crawlerType": "playwright:adaptive",
            "respectRobotsTxtFile": True,
        }
        provenance = {"source_url": public_url, "query_or_input": public_url}
    else:
        raise CapabilityError("INVALID_MODE", "The requested Apify operation is not supported.")
    return actor, actor_input, provenance


def _api_request(
    config: Config,
    method: str,
    path: str,
    params: Mapping[str, Any] | None = None,
    body: Mapping[str, Any] | None = None,
    timeout: float = 30,
) -> Any:
    url = f"{config.api_base_url}/{path.lstrip('/')}"
    if params:
        url = f"{url}?{urlencode({key: value for key, value in params.items() if value is not None})}"
    headers = {
        "Accept": "application/json",
        "Authorization": f"Bearer {config.token}",
        "User-Agent": "gtm-os-apify-capability/0.1",
    }
    payload: bytes | None = None
    if body is not None:
        headers["Content-Type"] = "application/json"
        payload = json.dumps(body, ensure_ascii=False).encode("utf-8")
    request = Request(url, data=payload, headers=headers, method=method)
    try:
        with urlopen(request, timeout=timeout) as response:
            raw = response.read()
    except HTTPError as exc:
        if exc.code in {401, 403}:
            message = "Apify authentication or permission check failed."
        elif exc.code == 429:
            message = "Apify rate limit reached."
        else:
            message = "Apify returned an HTTP error."
        raise CapabilityError("APIFY_HTTP_ERROR", message, 3) from exc
    except URLError as exc:
        raise CapabilityError("APIFY_NETWORK_ERROR", "Apify could not be reached.", 3) from exc
    except TimeoutError as exc:
        raise CapabilityError("APIFY_TIMEOUT", "The Apify request timed out.", 3) from exc

    try:
        decoded = json.loads(raw.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        raise CapabilityError("APIFY_INVALID_RESPONSE", "Apify returned a non-JSON response.", 3) from exc
    if isinstance(decoded, dict) and "data" in decoded:
        return decoded["data"]
    return decoded


def run_actor(
    config: Config,
    mode: str,
    actor_id: str,
    actor_input: Mapping[str, Any],
    provenance: Mapping[str, str],
) -> dict[str, Any]:
    actor_name = actor_api_name(actor_id)
    run_query = {
        "timeout": config.wait_seconds,
        "maxTotalChargeUsd": config.max_total_charge_usd,
    }
    run = _api_request(
        config,
        "POST",
        f"/actors/{quote(actor_name, safe='~')}/runs",
        params=run_query,
        body=actor_input,
        timeout=30,
    )
    if not isinstance(run, dict) or not run.get("id"):
        raise CapabilityError("APIFY_INVALID_RESPONSE", "Apify did not return a run ID.", 3)

    run_id = str(run["id"])
    status = str(run.get("status", "READY"))
    deadline = time.monotonic() + config.wait_seconds
    while status in {"READY", "RUNNING", "TIMING-OUT"}:
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            return {
                "status": "SOURCE_TIMEOUT",
                "provider": "apify",
                "mode": mode,
                "actor_id": actor_id,
                "run_id": run_id,
                "retrieval_status": status,
                "message": "The run is still active; use a fallback or inspect it later.",
            }
        time.sleep(min(2.0, remaining))
        run = _api_request(
            config,
            "GET",
            f"/actor-runs/{quote(run_id, safe='')}",
            params={"waitForFinish": min(60, max(1, int(remaining)))},
            timeout=min(65, max(10, remaining + 5)),
        )
        if not isinstance(run, dict):
            raise CapabilityError("APIFY_INVALID_RESPONSE", "Apify returned an invalid run object.", 3)
        status = str(run.get("status", "UNKNOWN"))

    base_result: dict[str, Any] = {
        "provider": "apify",
        "mode": mode,
        "status": "OK" if status == "SUCCEEDED" else "SOURCE_ERROR",
        "retrieval_status": status,
        "actor_id": actor_id,
        "run_id": run_id,
        "dataset_id": run.get("defaultDatasetId"),
        "accessed_at": datetime.now(timezone.utc).isoformat(),
        "source": dict(provenance),
    }
    usage = run.get("usageTotalUsd")
    if isinstance(usage, (int, float)):
        base_result["usage_usd"] = usage

    if status != "SUCCEEDED":
        base_result["message"] = "The Apify run did not finish successfully."
        return base_result

    dataset_id = run.get("defaultDatasetId")
    if not dataset_id:
        base_result["status"] = "SOURCE_ERROR"
        base_result["message"] = "The Apify run has no default dataset."
        return base_result

    items = _api_request(
        config,
        "GET",
        f"/datasets/{quote(str(dataset_id), safe='')}/items",
        params={"format": "json", "clean": "true", "limit": config.max_items},
        timeout=30,
    )
    if isinstance(items, dict) and isinstance(items.get("items"), list):
        items = items["items"]
    if not isinstance(items, list):
        raise CapabilityError("APIFY_INVALID_RESPONSE", "The Apify dataset response is not a list.", 3)
    base_result["items"] = sanitize_output(items[: config.max_items])
    return base_result


def status_result(config: Config) -> dict[str, Any]:
    settings_enabled = capability_enabled(config, "apify")
    ready = settings_enabled and config.enabled and bool(config.token)
    result: dict[str, Any] = {
        "provider": "apify",
        "settings_enabled": settings_enabled,
        "enabled": config.enabled,
        "configured": bool(config.token),
        "ready": ready,
        "capability_settings": dict(config.capability_settings),
        "settings_file_configured": config.capabilities_file is not None,
        "allowed_actors": list(config.allowed_actors),
        "default_actors": ACTORS_BY_MODE,
    }
    if not settings_enabled:
        result["reason"] = "Apify is disabled in the user capability settings."
    elif not config.enabled:
        result["reason"] = "APIFY_ENABLED is not true."
    elif not config.token:
        result["reason"] = "APIFY_TOKEN is missing."
    return result


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)
    subparsers.add_parser("status", help="Report capability availability without contacting Apify.")

    for mode in ACTORS_BY_MODE:
        subparser = subparsers.add_parser(mode, help=f"Run the bounded {mode} operation.")
        if mode == "search":
            subparser.add_argument("--query", required=True)
        else:
            subparser.add_argument("--url", required=True)
        subparser.add_argument("--actor-id", help="Optional Actor ID from APIFY_ALLOWED_ACTORS.")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    try:
        config = load_config()
        if args.command == "status":
            print(json.dumps(status_result(config), ensure_ascii=False))
            return 0

        ensure_ready(config)
        value = args.query if args.command == "search" else args.url
        actor, actor_input, provenance = build_input(
            args.command, value, config, actor_id=args.actor_id
        )
        result = run_actor(config, args.command, actor, actor_input, provenance)
        print(json.dumps(result, ensure_ascii=False))
        return 0 if result.get("status") == "OK" else 3
    except CapabilityError as exc:
        print(
            json.dumps(
                {
                    "provider": "apify",
                    "status": "CAPABILITY_UNAVAILABLE" if exc.exit_code == 2 else "SOURCE_ERROR",
                    "code": exc.code,
                    "message": exc.message,
                },
                ensure_ascii=False,
            )
        )
        return exc.exit_code


if __name__ == "__main__":
    sys.exit(main())
