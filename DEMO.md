# Run sheet

## Say this — 20 seconds

**Team:** GTM OS

**Track:** `custom`

**Who has the problem:** A product marketer at a Romanian invoicing SaaS who
needs a defensible competitor battlecard.

**The job this skill does:** It compares one competitor promise with independent
public evidence and turns the result into a cautious validation lead.

**Boundary — what it never does:** It never accuses a competitor, generalizes
from a few reviews, exposes personal data, or takes an external action.

## Run this — 60 seconds

1. Open Codex at the repository root.
2. Paste [`demo/seed-prompt.md`](demo/seed-prompt.md).
3. Watch for `demo/output/proof-gap-brief.md` and its visible status, evidence
   table, sales question, and next validation action.
4. If the live run is slow, open the genuine fallback at
   [`demo/output/proof-gap-brief.md`](demo/output/proof-gap-brief.md).

## Show this — 25 seconds

**Result:** A short SmartBill e-Factura proof-gap brief that a marketer can use
to decide what to validate before writing a battlecard.

**Evidence:** Each source row shows source type, URL, access date, excerpt,
independence key, and limitation. The output separates the official promise
from customer evidence and interpretation.

**Fallback output was produced:** 2026-08-28 during QA by running the entry
skill in a fresh Codex session against the committed public input; it is labeled
as a fallback and is not described as live.

## Evals — 10 seconds

| Case | Result | Where |
| --- | --- | --- |
| Intended | Mixed signal with sourced promise, independent evidence, caveat, and next check | [`demo/evals.md`](demo/evals.md) |
| Insufficient evidence | Names missing evidence and does not guess | [`demo/evals.md`](demo/evals.md) |
| Failure / exclusion | Stops when asked to accuse or use private data | [`demo/evals.md`](demo/evals.md) |

## Close — 5 seconds

**Reusable on:** Any one-competitor, one-promise GTM question with public first-
party and independent evidence URLs.

**Material limitation:** Public reviews are directional and may be biased;
they do not establish market prevalence or prove a product gap.
