---
name: gtm-product-page-audit
description: "Score and audit one public e-commerce product page for conversion readiness, SEO, generative-search readiness (GEO), usability, and evidence-backed pre-traffic fixes, with separate human, agent, and score outputs."
---

# Product page audit

Turn one public product page into a bounded pre-traffic decision. Keep the work
read-only and separate what the page says from what the evidence supports. Every
run creates three separate outputs: a plain-language report for a person, a
structured audit for a downstream agent, and a full score report with the
category table and criterion ratings. The human report may summarize the
audit, but it may not add a claim that is absent from it.

Return all user-facing text and all three generated artifacts in English,
regardless of the language used in the user's request. Preserve source excerpts
in their original wording when precision matters.

Read `../../references/evidence-policy.md` and
`../../references/artifact-contract.md` before producing the result. Read
`../../references/user-capabilities.md` before choosing a live source. Read
`references/page-score.md` before scoring.

## Capability gates

- Use the Apify adapter only when its status reports `enabled: true`,
  `configured: true`, and `ready: true`. Follow `../gtm-apify/SKILL.md`; never
  copy the token into prompts, URLs, output, or logs.
- Use Browser only when `browser: enabled`. If it is disabled or unavailable,
  use an ordinary public-web or connector source when one is available.
- Use Computer Use only when `computer_use: enabled` and the page requires
  visual or interactive inspection that the other permitted sources cannot
  provide. Keep it read-only and stop before login, secret entry, form
  submission, editing, or publication.
- A disabled or unavailable capability is a normal fallback condition, not a
  reason to guess. Record the limitation and downgrade the decision when the
  missing observation matters.

## Scope

Work on one product page. The only required input is a public product URL. If
the user supplies no public product URL, write all three outputs with
`NEEDS_INPUT`, name the exact missing input, and stop without guessing.

## Workflow

1. Resolve the output paths before research. The path named by the prompt is the
   agent-audit path. If no path is supplied, use
   `demo/output/product-page-audit.md`. Unless the prompt names a separate
   human-report path, create `product-page-report.md` beside the agent audit.
   Unless the prompt names a separate score-report path, create
   `product-page-score.md` beside the agent audit. A prompt that names only one
   or two outputs is still completed with all three files.
   If the invocation says to write "both" named outputs, treat the score report
   as the additional skill-required artifact and write it before stopping.
2. Lock the product and geography from the page itself. Keep one page as
   the primary object and record the page URL and access date.
3. Observe the page and its product markup using only an enabled capability.
   Record the visible product name, price and currency,
   availability, variants, brand, identifiers, images, shipping, returns,
   reviews or ratings, and relevant Product JSON-LD. When observable, also
   inspect the title, description, main heading, canonical, robots controls,
   internal discovery, mobile purchase path, accessibility basics, and dated
   performance evidence. Mark each item as visible, markup-only, first-party
   claim, measured, or unavailable.
4. Build a claim ledger for material promises. For every claim, capture the
   exact page excerpt, source URL, source role, and status: `verified`,
   `unsupported`, `contradicted`, or `unknown`. A first-party page proves that
   the seller made a claim; it does not independently prove the outcome.
5. Check product-information coverage against Google's official product and
   merchant-listing guidance. Structured data can improve eligibility for
   search enhancements, but it is not a guarantee of display or ranking. Use
   [Google product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
   and [Google's generative AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
   as the rubric, not as a promise of visibility.
6. Score the observed page with `references/page-score.md`. Put the overall
   score, band, audit coverage, provisional or unscorable label, and critical
   blockers in the agent audit's `## Page score` section. Put the category
   table, criterion ratings, and evidence notes in the separate score-report
   file. Keep unknowns unscored, label low-coverage results provisional, and
   never present the score as a conversion, ranking, or AI citation prediction.
7. Prioritize up to three changes. Each change needs an evidence-backed issue,
   the proposed copy/data/experiment change, a reason, an observable success
   signal, and an effort or dependency note. Return fewer changes when the
   evidence cannot support three; say why.
8. Draft the human report from the finalized agent audit. Do not do a second,
   looser research pass for it. Carry over the decision, strongest evidence,
   fixes, and limits without adding claims.
9. Write the agent audit first, then the score report, then the human report.
   Finish only after all three files exist and the human report points to the
   exact agent-audit path.

## Human report

Apply this built-in unslop pass on every run. The skill must work even when no
separate writing skill is installed.

- Write the report in English. Keep source excerpts in their original wording
  when precision matters.
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
The structured audit is at `<agent-audit-path>`. Give that file to another
agent when it needs the evidence ledger, source rows, or implementation context.
```

The report still uses this shape for `NEEDS_INPUT`; its bottom line names the
missing input and its next move says what to provide.

## Agent audit

Write to the agent-audit path named by the prompt; use
`demo/output/product-page-audit.md` when no path is supplied. Use this order:

1. `## Status`: `READY`, `NEEDS_INPUT`, or `INSUFFICIENT_EVIDENCE`.
2. `## Page score`: overall score and band, audit coverage, provisional or
   unscorable label when required, and critical blockers only. Do not include
   the category table or criterion ratings here; those go in the score-report
   file. End the section with a pointer to the score-report path.
3. `## Decision`: one sentence answering whether the page is ready for the
   stated traffic or discovery test, with calibrated confidence.
4. `## Scope`: product, URL, and access date.
5. `## Page facts`: observed facts and first-party claims kept distinct.
6. `## Claim ledger`: claim, excerpt, source, status, and caveat.
7. `## Product-data coverage`: present, missing, or uncheckable fields.
8. `## Prioritized changes`: no more than three actionable changes.
9. `## Unknowns and limits`: inaccessible sources, assumptions, and the
   cheapest next check.
10. `## Sources`: URL, access date, short excerpt or precise field, role, and
    independence key for every material external fact.

Label reasoning as `fact`, `interpretation`, or `hypothesis`. A proposed
success signal is a measurement plan, never a reported result. Keep claims
about rankings, conversions, demand, and purchase intent as unknown unless the
user provides direct measurement data. Keep this file useful as an agent
handoff, not as the human explanation.

## Score report

Write the full score detail to `product-page-score.md` beside the agent audit
unless the prompt names a separate path. Include:

1. Start with the title `# Product-page score`, then show one compact score
   line in this form:

   ```text
   87/100 Strong [█████████████████░░░] 87%
   ```

   Use a 20-segment bar. Fill `round(overall score / 5)` segments with `█` and
   the remainder with `░`; the numeric score and percentage must always remain
   visible. The bar represents page quality, not audit coverage. On a numeric
   score, follow it with a short line such as `Coverage 88%. No critical
   blockers. SEO category is provisional.` Add a horizontal rule before the
   category section. If the result is `UNSCORABLE`, do not render an apparently
   empty quality bar; show `UNSCORABLE` and explain the missing evidence.
2. `## Category scores`: a table with category name, weight, quality score
   (0 to 100), coverage, and the main finding for each category.
3. `## Criterion ratings`: every assessed criterion with its weight, rating
   (0 to 4, U, or NA), earned points, and a short evidence note. Cite one
   observation for every rating below 2 and every rating of 4. Briefly explain
   ratings of 2 or 3.
4. `## Arithmetic`: the sums and formula line that reproduce the overall score
   and coverage from the criterion ratings.

The score report is the only place the category table and criterion ratings
appear. The agent audit's `## Page score` section references it by path.

Use the same score line and loaded bar in the human report's `## Bottom line`
when a numeric score exists, so the three artifacts agree. Keep the bar
accessible by including the exact score and percentage in text; never use color
or the bar alone to communicate the result.

At the end of the Codex response, show the human-readable conclusion first,
then name all three output paths and explain that the agent audit is the
structured handoff and the score report holds the full scoring detail. Do not
return only "the audit was written".

## Boundary

All three outputs are read-only and public-data-only. The audit produces a decision
and a change proposal. It does not expose
personal or customer data, invent reviews or certifications, infer missing
values, edit a page or feed, change an ad or store account, send outreach, or
publish anything. If the user wants a change, return a reviewable proposal and
wait for a separate, explicit approval before any external action.

## Completion

The result is complete when all three outputs exist at the resolved paths, the
primary URL and access date are visible, page observations are separated from
claims and interpretations, every material external fact has a traceable
source, the score arithmetic and coverage can be recalculated from the
criterion ratings in the score report, missing evidence is explicit, the
recommended changes are prioritized, and the outputs state what the audit did
not establish. The human report passes the human-writing check and ends with
an exact pointer to the agent audit.
