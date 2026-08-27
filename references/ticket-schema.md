# Ticket schema

A ticket is one bounded GTM job. It should produce one decision or one artifact, not an entire marketing department.

Required fields:

```yaml
id: T-001
title: Find the first audience with an urgent invoice workflow problem
stage: Audience
playbook: gtm-icp
priority: P0
status: ready
blockers: []
evidence_needed: What proves this audience has the problem and can buy?
acceptance_criteria:
  - Name one segment and one buyer role.
  - Cite two independent sources or mark the result insufficient.
  - State the next validation action.
```

## Ticket rules

- Keep the ticket small enough to finish in one focused run.
- Put prerequisite ticket IDs in `blockers`; do not bury dependencies in prose.
- Use `P0` for the decision that unlocks the next slice, `P1` for important supporting work, and `P2` for useful follow-up.
- A ticket is `ready` only when the request, playbook, evidence need, and acceptance criteria are present.
- A ticket becomes `done` only when its artifact and eval result are attached.
- If the user has not supplied a required decision, create a `NEEDS_INPUT` handoff instead of inventing it.
