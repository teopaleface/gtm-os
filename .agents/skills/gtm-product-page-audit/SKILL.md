---
name: gtm-product-page-audit
description: "Audit and score one public e-commerce product page, producing a plain-language report, a structured agent audit, and a full score report."
---

# Product-page audit

Produce one auditable pre-traffic decision for one public e-commerce product
page. Every run creates three separate outputs:

1. a plain-language report for the marketer or founder who needs to make the
   decision;
2. a structured audit for a downstream agent that needs evidence, limits, and
   implementation-ready changes.
3. a full score report with the category table, criterion ratings, evidence
   notes, and reproducible arithmetic.

The three files are different deliverables. The human report explains the
result without machine-shaped tables. The agent audit preserves the evidence
contract. The score report keeps the detailed scoring separate so a person can
read the decision while another agent can recalculate the score.
The human report may summarize the audit, but it may not add a claim that is
absent from it. When the observations are sufficient, the agent audit also
includes a page-quality score covering conversion, purchase confidence, SEO,
GEO, and UX/accessibility/performance. The score describes the page evidence;
it never predicts sales, rankings, or AI citations.

Resolve one explicit `Target URL:` from the invocation prompt or the input. If
both are present, they must identify the same page; a mismatch is missing input,
not a reason to guess. In snapshot mode, use the public snapshots in the input
as the primary evidence. Do not browse or web-search unless the prompt
explicitly allows a check of that exact URL. A URL alone never authorizes
browsing. Do not follow links or inspect another URL. This keeps the result
reproducible under the Skillathon time limit.

## Required input

In snapshot mode, the input names one `Target URL`, access date, product or
merchant context, and a public snapshot with exact excerpts or precise fields.
In live URL mode, the prompt may provide the `Target URL` directly; if an input
is also supplied, its target must match. The input may include one competitor
page, one shopper query, and a small Google guidance snapshot. Public data only.
A source URL proves where an observation came from; a seller claim is not
independent proof of the promised outcome.

The default is snapshot mode: use the supplied snapshot and do not fetch the
web. Live URL mode is allowed only when the prompt explicitly permits checking
the exact `Target URL`; use that page only and keep all other evidence rules.

If the target URL is missing, or neither a usable page snapshot nor an explicit
exact-URL check is available, write all three required outputs with
`NEEDS_INPUT`, name the missing field, and stop without guessing. Use
`INSUFFICIENT_EVIDENCE` when a page is available but the evidence cannot support
the requested decision.

## Procedure

1. Resolve the output paths before doing research. The path named by the prompt
   is the agent-audit path. If no path is supplied, use
   `demo/output/product-page-audit.md`. Unless the prompt names a separate
   human-report path, create `product-page-report.md` beside the agent audit.
   Unless the prompt names a separate score-report path, create
   `product-page-score.md` beside the agent audit. A prompt that names only one
   or two outputs is still completed with all three files.
   If the invocation says to write "both" named outputs, treat the score report
   as the additional skill-required artifact and write it before stopping.
2. Resolve the `Target URL` from the prompt and input, reject a mismatch as
   `NEEDS_INPUT`, then lock the scope to one primary product page. Keep the
   competitor and query optional.
3. Extract page observations from the supplied snapshot or the permitted
   exact-URL check: product name, price and currency, availability, variants,
   brand, identifiers, images, shipping, returns, ratings or reviews, and
   Product JSON-LD when the input provides it. Mark absent fields as `unknown`,
   never as a likely value.
4. Build a short claim ledger. For each material claim, include the exact
   excerpt, source URL, source role, and one status: `verified`, `unsupported`,
   `contradicted`, or `unknown`. Keep first-party claims separate from facts
   supported by independent evidence.
5. Check product-data coverage for title, description, image, link, price,
   availability, condition, brand, identifiers, shipping, returns, and product
   markup. Use the supplied Google guidance as the rubric. Treat structured data
   as an eligibility aid, never as a ranking or display guarantee.
6. Score the observed page with the rubric below. Put the overall score or
   `UNSCORABLE`, audit coverage, provisional or unscorable label, and critical
   blockers in the agent audit. Put the category scores, category coverage,
   criterion ratings, evidence notes, and arithmetic in the score report. Keep
   unknown criteria out of quality points, but count them in coverage.
7. Return at most three prioritized changes. A change includes the issue,
   recommendation, evidence, observable success signal, and effort or
   dependency. If the evidence cannot support three changes, return fewer and
   use `INSUFFICIENT_EVIDENCE`.
8. Draft the human report from the finalized agent audit. Do not do a second,
   looser research pass for it. Carry over the decision, strongest evidence,
   fixes, and limits without adding claims.
9. Write the agent audit first, then the score report, then the human report.
   Finish only after all three files exist and the human report points to the
   exact agent-audit path.

## Human report

Apply this built-in unslop pass on every run. The skill must work even when no
separate writing skill is installed.

- Write in the language of the user's request. Keep source excerpts in their
  original wording when precision matters.
- Lead with the decision in plain language. Say what you would do and why.
- Use concrete facts, short paragraphs, and a natural rhythm. Prefer "is" and
  "has" over inflated phrasing.
- Remove hype, generic filler, chatbot phrases, decorative emojis, em dashes,
  title-case headings, curly quotes in ordinary prose, and claims about impact
  that the evidence cannot support. Keep a source quote exact only when its
  wording is the evidence.
- Separate what the page says from what you conclude. Mark interpretations and
  hypotheses in ordinary language instead of presenting them as facts.
- Keep the report concise enough to read in one minute. Include only the
  strongest facts, the score and what it means when available, up to three
  fixes, and the important unknowns.
- If a numeric score is available, use the same rounded overall and category
  values as the finalized audit and score report. If it is `UNSCORABLE`, say
  that plainly.

Use this shape, adapting the wording to the evidence:

```markdown
# Product-page report

## Bottom line
<status and direct recommendation>

## What I found
<the few facts a person needs>

## What needs attention
<prioritized fixes>

## What I couldn't verify
<open unknowns and limits>

## Next move
<one practical next step>

## Agent handoff
The structured audit is at `<agent-audit-path>`, and the full score detail is
at `<score-report-path>`. Give the audit to another agent when it needs the
evidence ledger, source rows, or implementation context.
```

The report still uses this shape for `NEEDS_INPUT`; its bottom line names the
missing input and its next move says what to provide.

## Page score

Rate each observable criterion from 0 to 4. Use `U` for unobserved and `NA` for
not applicable. Do not turn `U` into zero. Calculate each category and the
overall score from assessed weights only:

`100 * sum(weight * rating / 4) / sum(assessed weights)`

Calculate audit coverage as assessed applicable weight divided by total
applicable weight. If coverage is below 50%, report `UNSCORABLE` and name the
cheapest observations needed. Mark a numeric score `provisional` below 80%
coverage. Use these bands: 90-100 Excellent, 75-89 Strong, 60-74 Mixed,
40-59 Weak, and 0-39 Critical. Round the overall and category scores to whole
numbers before writing either output.

Use these category weights and inspect the listed dimensions:

| Category | Weight | Dimensions |
|---|---:|---|
| Conversion clarity and persuasion | 30 | offer, product detail, CTA/options, objections, scanability |
| Purchase confidence and friction | 20 | price/availability, shipping, returns/warranty, proof, seller trust |
| SEO discovery | 20 | crawl controls, title/description/heading, unique content, markup, images |
| GEO and AI answer readiness | 15 | factual answerability, entity clarity, provenance, buyer questions, consistency |
| UX, accessibility, and performance | 15 | mobile path, interactions, accessibility, media, speed/stability |

In the score report, show each category's weight, quality score, coverage, and
main finding, followed by the criterion ratings and short evidence notes. Cite
an observation for every rating below 2 and every rating of 4. Name critical
blockers separately in the agent audit. A critical blocker keeps the readiness
decision negative even when the arithmetic score is high. SEO and GEO scores
assess eligibility and answerability, not ranking, rich results, citations, or
sales.

## Agent audit

Write to the agent-audit path named by the prompt; use
`demo/output/product-page-audit.md` when no path is supplied. Keep the brief
under 60 physical lines and use exactly these headings:

- `## Status`
- `## Page score`
- `## Scope`
- `## Decision`
- `## Page facts`
- `## Claim ledger`
- `## Product-data coverage`
- `## Prioritized changes`
- `## Unknowns and limits`
- `## Sources`

In `## Page score`, include the overall score and band, audit coverage,
provisional or unscorable label when required, critical blockers, and a pointer
to the score-report path. Do not put the category table or criterion ratings in
this file; keep those in the score report. Every material source row includes
URL, access date, exact excerpt or precise field, source role, independence key,
and limitation. Label reasoning as `fact`, `interpretation`, or `hypothesis`.
Use `NEEDS_INPUT` only when the required input is absent; use
`INSUFFICIENT_EVIDENCE` when the page or evidence does not support the
decision. Include the resolved `Target URL` and access date under `## Scope`.
Keep this file useful as an agent handoff, not as the human explanation.

## Score report

Write the full score detail to `product-page-score.md` beside the agent audit
unless the prompt names a separate path. Include:

1. `## Category scores`: a table with category name, weight, quality score
   (0 to 100), coverage, and the main finding for each category.
2. `## Criterion ratings`: every assessed criterion with its weight, rating
   (0 to 4, `U`, or `NA`), earned points, and a short evidence note. Cite one
   observation for every rating below 2 and every rating of 4. Briefly explain
   ratings of 2 or 3.
3. `## Arithmetic`: the sums and formula line that reproduce the overall score
   and coverage from the criterion ratings.

The score report is the only place the category table and criterion ratings
appear. The agent audit's `## Page score` section references it by path.

At the end of the Codex response, show the human-readable conclusion first,
then name all three output paths and explain that the agent audit is the
structured handoff and the score report contains the full scoring detail. Do
not return only "the audit was written".

## Safety boundary

Keep all three outputs read-only and public-data-only. State unknowns instead of
inventing reviews, certifications, availability, identifiers, competitor
claims, rankings, conversions, or buyer intent. Do not reproduce personal data,
edit or publish a page, modify a feed or account, contact anyone, or claim that
the product will rank or convert.

## Done

All three outputs exist at the resolved paths. The agent audit contains the ten
headings, resolved target URL, access date, page score or `UNSCORABLE` result,
observations, claim ledger, coverage check, prioritized changes, and source rows.
The score report contains the category table, criterion ratings, evidence notes,
and reproducible arithmetic. The human report gives the same decision and score
meaning in plain language, passes the human-writing check, states its limits,
and ends with exact pointers to the agent audit and score report. The final
response names all three files and leads with the human conclusion.
