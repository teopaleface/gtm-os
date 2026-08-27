#!/usr/bin/env python3
"""Run the deterministic contract and safety evals for GTM OS."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
VALIDATOR = ROOT / "scripts" / "validate_output.py"
CASES = ROOT / "evals" / "cases.json"


def run_case(case: dict[str, object]) -> tuple[bool, str]:
    fixture = ROOT / "evals" / "fixtures" / str(case["fixture"])
    result = subprocess.run(
        [sys.executable, str(VALIDATOR), str(fixture)],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    expected = case["expect"] == "pass"
    actual = result.returncode == 0
    if actual != expected:
        detail = (result.stdout + result.stderr).strip()
        return False, f"{case['id']}: expected {case['expect']}, got {result.returncode}\n{detail}"

    assertions = case.get("assert", {})
    if actual and isinstance(assertions, dict):
        document = json.loads(fixture.read_text(encoding="utf-8"))
        if "status" in assertions and document.get("status") != assertions["status"]:
            return False, f"{case['id']}: status assertion failed"
        if assertions.get("all_facts_cited"):
            for artifact in document.get("artifacts", []):
                for claim in artifact.get("claims", []):
                    if claim.get("kind") == "fact" and not claim.get("supporting_evidence_ids"):
                        return False, f"{case['id']}: an asserted fact has no citation"
        if assertions.get("has_blocked_ticket") and not any(
            ticket.get("status") == "blocked" or ticket.get("blockers")
            for ticket in document.get("tickets", [])
        ):
            return False, f"{case['id']}: no blocked ticket was found"
        if assertions.get("score_consistent"):
            scores = document["scores"]
            expected_overall = round(
                0.35 * scores["evidence_quality"]
                + 0.25 * scores["decision_readiness"]
                + 0.25 * scores["actionability"]
                + 0.15 * scores["completeness"],
                1,
            )
            if scores["overall"] != expected_overall:
                return False, f"{case['id']}: score assertion failed"
    return True, f"PASS {case['id']}"


def main() -> int:
    cases = json.loads(CASES.read_text(encoding="utf-8"))
    failures: list[str] = []
    for case in cases:
        passed, message = run_case(case)
        print(message)
        if not passed:
            failures.append(message)
    print(f"\n{len(cases) - len(failures)}/{len(cases)} evals passed")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
