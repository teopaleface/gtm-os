#!/usr/bin/env python3
"""Validate the stable JSON seam produced by GTM OS."""

from __future__ import annotations

import json
import sys
from datetime import date
from pathlib import Path
from urllib.parse import urlparse


ALLOWED_STATUSES = {"READY", "NEEDS_INPUT", "INSUFFICIENT_EVIDENCE"}
ALLOWED_TICKET_STATUSES = {"blocked", "ready", "in_progress", "done"}
ALLOWED_PRIORITIES = {"P0", "P1", "P2"}
ALLOWED_CLAIM_KINDS = {"fact", "interpretation", "hypothesis"}
ALLOWED_SOURCE_TYPES = {
    "official",
    "customer_review",
    "job_post",
    "discussion",
    "dataset",
    "internal",
    "other",
}
SCORE_KEYS = ("evidence_quality", "decision_readiness", "actionability", "completeness")


def _is_string(value: object) -> bool:
    return isinstance(value, str) and bool(value.strip())


def _valid_url(value: object) -> bool:
    if not isinstance(value, str):
        return False
    parsed = urlparse(value)
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


def _valid_date(value: object) -> bool:
    if not isinstance(value, str):
        return False
    try:
        date.fromisoformat(value)
    except ValueError:
        return False
    return True


def validate_document(document: object) -> list[str]:
    errors: list[str] = []
    if not isinstance(document, dict):
        return ["output must be a JSON object"]

    required = {
        "schema_version",
        "request_id",
        "status",
        "decision",
        "context",
        "tickets",
        "artifacts",
        "evidence",
        "scores",
        "next_actions",
        "human_decisions",
    }
    for key in sorted(required - document.keys()):
        errors.append(f"missing top-level field: {key}")

    if document.get("schema_version") != "1.0":
        errors.append("schema_version must be 1.0")
    if not _is_string(document.get("request_id")):
        errors.append("request_id must be a non-empty string")
    if document.get("status") not in ALLOWED_STATUSES:
        errors.append("status must be READY, NEEDS_INPUT, or INSUFFICIENT_EVIDENCE")

    decision = document.get("decision")
    if not isinstance(decision, dict):
        errors.append("decision must be an object")
    else:
        for key in ("question", "answer"):
            if not _is_string(decision.get(key)):
                errors.append(f"decision.{key} must be a non-empty string")
        confidence = decision.get("confidence")
        if not isinstance(confidence, (int, float)) or isinstance(confidence, bool) or not 0 <= confidence <= 1:
            errors.append("decision.confidence must be a number between 0 and 1")

    context = document.get("context")
    if not isinstance(context, dict):
        errors.append("context must be an object")
    else:
        for key in ("product", "market", "knowns", "assumptions", "unknowns"):
            if key not in context:
                errors.append(f"context missing field: {key}")
        for key in ("knowns", "assumptions", "unknowns"):
            if key in context and (
                not isinstance(context[key], list)
                or any(not _is_string(item) for item in context[key])
            ):
                errors.append(f"context.{key} must be a list of strings")

    evidence = document.get("evidence")
    evidence_ids: set[str] = set()
    independence_keys: set[str] = set()
    if not isinstance(evidence, list):
        errors.append("evidence must be a list")
        evidence = []
    for index, item in enumerate(evidence):
        prefix = f"evidence[{index}]"
        if not isinstance(item, dict):
            errors.append(f"{prefix} must be an object")
            continue
        evidence_id = item.get("id")
        if not _is_string(evidence_id):
            errors.append(f"{prefix}.id must be a non-empty string")
        elif evidence_id in evidence_ids:
            errors.append(f"duplicate evidence id: {evidence_id}")
        else:
            evidence_ids.add(evidence_id)
        if item.get("source_type") not in ALLOWED_SOURCE_TYPES:
            errors.append(f"{prefix}.source_type is not supported")
        if not _valid_url(item.get("url")):
            errors.append(f"{prefix}.url must be an http(s) URL")
        if not _valid_date(item.get("accessed_at")):
            errors.append(f"{prefix}.accessed_at must be an ISO date")
        excerpt = item.get("excerpt")
        if not _is_string(excerpt):
            errors.append(f"{prefix}.excerpt must be a non-empty string")
        elif len(excerpt.split()) > 40:
            errors.append(f"{prefix}.excerpt must be 40 words or fewer")
        if not isinstance(item.get("supports"), list) or any(
            not _is_string(value) for value in item.get("supports", [])
        ):
            errors.append(f"{prefix}.supports must be a list of strings")
        independence_key = item.get("independence_key")
        if not _is_string(independence_key):
            errors.append(f"{prefix}.independence_key must be a non-empty string")
        else:
            independence_keys.add(independence_key)

    tickets = document.get("tickets")
    ticket_ids: set[str] = set()
    if not isinstance(tickets, list) or not tickets:
        errors.append("tickets must be a non-empty list")
        tickets = []
    for index, ticket in enumerate(tickets):
        prefix = f"tickets[{index}]"
        if not isinstance(ticket, dict):
            errors.append(f"{prefix} must be an object")
            continue
        ticket_id = ticket.get("id")
        if not _is_string(ticket_id):
            errors.append(f"{prefix}.id must be a non-empty string")
        elif ticket_id in ticket_ids:
            errors.append(f"duplicate ticket id: {ticket_id}")
        else:
            ticket_ids.add(ticket_id)
        for key in ("title", "stage", "playbook", "evidence_needed"):
            if not _is_string(ticket.get(key)):
                errors.append(f"{prefix}.{key} must be a non-empty string")
        if ticket.get("priority") not in ALLOWED_PRIORITIES:
            errors.append(f"{prefix}.priority must be P0, P1, or P2")
        if ticket.get("status") not in ALLOWED_TICKET_STATUSES:
            errors.append(f"{prefix}.status is not supported")
        blockers = ticket.get("blockers")
        if not isinstance(blockers, list) or any(not _is_string(item) for item in blockers):
            errors.append(f"{prefix}.blockers must be a list of strings")
        if not isinstance(ticket.get("acceptance_criteria"), list) or not ticket.get("acceptance_criteria"):
            errors.append(f"{prefix}.acceptance_criteria must be a non-empty list")
        elif any(not _is_string(item) for item in ticket["acceptance_criteria"]):
            errors.append(f"{prefix}.acceptance_criteria must contain strings")

    for index, ticket in enumerate(tickets):
        if not isinstance(ticket, dict):
            continue
        for blocker in ticket.get("blockers", []):
            if blocker not in ticket_ids:
                errors.append(f"tickets[{index}].blockers references unknown ticket: {blocker}")

    artifacts = document.get("artifacts")
    if not isinstance(artifacts, list):
        errors.append("artifacts must be a list")
        artifacts = []
    for index, artifact in enumerate(artifacts):
        prefix = f"artifacts[{index}]"
        if not isinstance(artifact, dict):
            errors.append(f"{prefix} must be an object")
            continue
        for key in ("type", "title", "summary"):
            if not _is_string(artifact.get(key)):
                errors.append(f"{prefix}.{key} must be a non-empty string")
        claims = artifact.get("claims")
        if not isinstance(claims, list):
            errors.append(f"{prefix}.claims must be a list")
            continue
        for claim_index, claim in enumerate(claims):
            claim_prefix = f"{prefix}.claims[{claim_index}]"
            if not isinstance(claim, dict):
                errors.append(f"{claim_prefix} must be an object")
                continue
            if not _is_string(claim.get("claim")):
                errors.append(f"{claim_prefix}.claim must be a non-empty string")
            if claim.get("kind") not in ALLOWED_CLAIM_KINDS:
                errors.append(f"{claim_prefix}.kind is not supported")
            supporting = claim.get("supporting_evidence_ids")
            if not isinstance(supporting, list) or any(not _is_string(item) for item in supporting):
                errors.append(f"{claim_prefix}.supporting_evidence_ids must be a list of strings")
            else:
                for evidence_id in supporting:
                    if evidence_id not in evidence_ids:
                        errors.append(f"{claim_prefix} references unknown evidence: {evidence_id}")
                if claim.get("kind") == "fact" and not supporting:
                    errors.append(f"{claim_prefix} facts need supporting evidence")

    scores = document.get("scores")
    if not isinstance(scores, dict):
        errors.append("scores must be an object")
        scores = {}
    for key in (*SCORE_KEYS, "overall"):
        value = scores.get(key)
        if not isinstance(value, (int, float)) or isinstance(value, bool) or not 0 <= value <= 5:
            errors.append(f"scores.{key} must be a number between 0 and 5")
    if all(isinstance(scores.get(key), (int, float)) and not isinstance(scores.get(key), bool) for key in (*SCORE_KEYS, "overall")):
        expected = round(
            0.35 * scores["evidence_quality"]
            + 0.25 * scores["decision_readiness"]
            + 0.25 * scores["actionability"]
            + 0.15 * scores["completeness"],
            1,
        )
        if abs(expected - scores["overall"]) > 0.05:
            errors.append(f"scores.overall must equal the weighted score ({expected})")

    for key in ("next_actions", "human_decisions"):
        if not isinstance(document.get(key), list) or any(not _is_string(item) for item in document[key]):
            errors.append(f"{key} must be a list of strings")

    if document.get("status") == "READY" and isinstance(scores.get("evidence_quality"), (int, float)) and scores["evidence_quality"] < 2.5:
        errors.append("READY outputs need evidence_quality of at least 2.5")

    return errors


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        print("usage: validate_output.py OUTPUT.json", file=sys.stderr)
        return 2
    path = Path(argv[1])
    try:
        document = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        print(f"ERROR: cannot read {path}: {error}", file=sys.stderr)
        return 2
    errors = validate_document(document)
    if errors:
        print(f"FAIL: {path}")
        for error in errors:
            print(f"- {error}")
        return 1
    print(f"PASS: {path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
