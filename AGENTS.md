# GTM OS contributor guide

GTM OS is a skills-only Codex plugin. Read `docs/spec.md` for the product contract and `references/` for the shared vocabulary.

## Agent skills

- Keep `gtm-orchestrator` model-invoked. It is the single entry point for broad GTM requests.
- Keep specialist playbooks explicit-only. They are small, testable contracts that the orchestrator can name in a ticket.
- Treat evidence, assumptions, and unknowns as separate objects. Never turn a missing source into a confident claim.
- Keep outputs compatible with `references/artifact-contract.md` and run the local evals after changing a contract.
- Use the Matt Pocock flow for product work: context, spec, tracer-bullet tickets, implementation, tests, and review.

## Verification

Run `python3 scripts/run_evals.py` and `python3 scripts/validate_output.py evals/fixtures/valid-output.json` before opening a release pull request.
