# T-003 Contract evals

status: done
priority: P0
playbook: gtm-evals
blockers: [T-001, T-002]

## Outcome

Make the output contract executable with local tests and positive and negative fixtures.

## Acceptance criteria

- Valid evidence-backed output passes.
- Insufficient evidence passes as a deliberate status.
- Invalid URLs, uncited facts, and ready outputs with weak evidence fail.
- The eval set contains five positive and three negative cases.
- CI runs unit tests and deterministic evals.
