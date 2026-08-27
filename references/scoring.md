# Scoring

Scores are a decision aid, not a claim of scientific precision. Use a 0 to 5 scale and explain the lowest score.

| Dimension | 0 | 3 | 5 |
| --- | --- | --- | --- |
| Evidence quality | no usable source | relevant but thin or mixed | relevant, recent, independent, and auditable |
| Decision readiness | the question is unclear | a direction is visible but key unknowns remain | the decision and its next check are clear |
| Actionability | no owner or next step | a plausible action exists | a bounded action has an owner, timing, and success signal |
| Completeness | required fields are missing | the core path is covered | context, tickets, evidence, artifact, and handoff are present |

Calculate `overall` as:

```text
0.35 * evidence_quality
+ 0.25 * decision_readiness
+ 0.25 * actionability
+ 0.15 * completeness
```

Round to one decimal place. If `evidence_quality` is below 2.5 for a source-dependent decision, the output cannot be `READY`; use `INSUFFICIENT_EVIDENCE` or `NEEDS_INPUT`.

The score should never outrank the explanation. A 4.0 with one weak source is a broken score, not a useful summary.
