# T-002 Orchestrator and playbooks

status: done
priority: P0
playbook: gtm-orchestrator
blockers: [T-001]

## Outcome

Provide one model-invoked orchestrator and explicit-only playbooks that cover the GTM lifecycle from research to retention and measurement.

## Acceptance criteria

- `gtm-orchestrator` covers intake, classification, ticketing, routing, evidence, scoring, and handoff.
- Every specialist has a focused job, an output seam, and a completion criterion.
- Specialist skills remain explicit-only and do not depend on implicit skill-to-skill calls.
- All skills pass the individual skill validator.
