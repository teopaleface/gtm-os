---
name: gtm-evals
description: "Evaluate a GTM OS output for contract compliance, evidence quality, reasoning, and actionability."
---

# GTM evals

Review the output, not the confidence of its prose. Use the deterministic runner for the JSON seam and the checklist below for judgment.

## Steps

1. Run `python3 scripts/validate_output.py <output.json>`.
2. Check that every material fact has evidence and that source records include URL, access date, excerpt, and independence key.
3. Check that claims are labeled and that a weak evidence set produces `INSUFFICIENT_EVIDENCE`.
4. Check ticket IDs, blockers, playbook names, acceptance criteria, and completion state.
5. Score evidence quality, decision readiness, actionability, and completeness using `../../references/scoring.md`.
6. Record failed checks as new tickets with a clear acceptance criterion.

## Completion

The eval report names each failed check, preserves the evidence trail, and does not reward a polished answer that lacks support.
