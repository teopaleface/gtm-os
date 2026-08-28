# Product-page audit run sheet

## Say this — 20 seconds

**Team:** GTM OS

**Track:** `ai-search-optimization`

**Who has the problem:** An e-commerce product marketer deciding whether a
product page is ready for qualified traffic.

**The job this skill does:** It audits one public product page for buyer clarity,
merchant-data coverage, and evidence-backed pre-traffic fixes.

**Boundary — what it never does:** It never promises rankings or conversions,
invents proof, uses private data, edits a page, or publishes anything.

## Run this — 60 seconds

1. Open Codex at the repository root.
2. Paste [`demo/seed-prompt-product-page.md`](demo/seed-prompt-product-page.md).
3. Watch for two outputs: `demo/output/product-page-report.md` for a human
   reader and `demo/output/product-page-audit.md` for a downstream agent. The
   agent audit now includes a page score or an honest `UNSCORABLE` result with
   its coverage and missing observations.
4. If the Codex run is slow, open the genuine snapshot fallback at
   [`demo/output/product-page-report.md`](demo/output/product-page-report.md),
   then pass the structured audit to an agent when needed.

## Show this — 25 seconds

**Human result:** A short Skullcandy Crusher ANC 2 report that says what to do
before buying traffic, in language a marketer can read quickly.

**Agent result:** A structured audit with the evidence ledger, source rows,
coverage gaps, page score, and fixes. It is the handoff for another agent, not
the human explanation.

**Evidence:** The output separates page observations, first-party claims, and
interpretations. Each source row shows URL, access date, excerpt, role,
independence key, and limitation.

**Fallback output:** The committed snapshot is labelled as a fallback and is
not described as a live page check.

## Evals — 10 seconds

| Case | Result | Where |
| --- | --- | --- |
| Intended | Flags insufficient evidence, with claim ledger, coverage gaps, and three validation changes | [`demo/evals.md`](demo/evals.md) |
| Insufficient evidence | Names missing page evidence and does not guess | [`demo/evals.md`](demo/evals.md) |
| Failure / exclusion | Refuses ranking guarantees, private data, and publication | [`demo/evals.md`](demo/evals.md) |

## Close — 5 seconds

**Reusable on:** Any public product page where a founder or marketer needs a
pre-traffic clarity and evidence check.

**Material limitation:** A page audit does not establish rankings, demand,
conversion, purchase intent, or market prevalence.

The previous proof-gap demo remains in `demo/input/proof-gap-input.md` and
`demo/output/proof-gap-brief.md` as a regression example for the broader GTM OS.
