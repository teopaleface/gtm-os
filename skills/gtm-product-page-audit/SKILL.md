---
name: gtm-product-page-audit
description: "Score and audit one public e-commerce product page for conversion readiness, SEO, generative-search readiness (GEO), usability, and evidence-backed pre-traffic fixes."
---

# Product page audit

Turn one public product page into a bounded pre-traffic decision. Keep the work
read-only and separate what the page says from what the evidence supports.

Read `../../references/evidence-policy.md` and
`../../references/artifact-contract.md` before producing the result. Read
`../../references/user-capabilities.md` before choosing a live source. Use a
supplied snapshot when a page is inaccessible or a timed run needs a
deterministic fallback. Read `references/page-score.md` before scoring.

## Capability gates

- Use the Apify adapter only when its status reports `enabled: true`,
  `configured: true`, and `ready: true`. Follow `../gtm-apify/SKILL.md`; never
  copy the token into prompts, URLs, output, or logs.
- Use Browser only when `browser: enabled`. If it is disabled or unavailable,
  use an ordinary public-web or connector source when one is available, or
  use the supplied snapshot.
- Use Computer Use only when `computer_use: enabled` and the page requires
  visual or interactive inspection that the other permitted sources cannot
  provide. Keep it read-only and stop before login, secret entry, form
  submission, editing, or publication.
- A disabled or unavailable capability is a normal fallback condition, not a
  reason to guess. Record the limitation and downgrade the decision when the
  missing observation matters.

## Scope

Work on one product page. A public competitor page and a shopper query are
optional comparison context, not extra permission to audit the whole market.
If the user supplies no public product URL or usable snapshot, return
`NEEDS_INPUT` with the exact missing input.

## Workflow

1. Lock the product, audience, geography, query, and decision. Keep one page as
   the primary object and record the page URL and access date.
2. Observe the page and its product markup using only an enabled capability or
   the supplied snapshot. Record the visible product name, price and currency,
   availability, variants, brand, identifiers, images, shipping, returns,
   reviews or ratings, and relevant Product JSON-LD. When observable, also
   inspect the title, description, main heading, canonical, robots controls,
   internal discovery, mobile purchase path, accessibility basics, and dated
   performance evidence. Mark each item as visible, markup-only, first-party
   claim, measured, or unavailable.
3. Build a claim ledger for material promises. For every claim, capture the
   exact page excerpt, source URL, source role, and status: `verified`,
   `unsupported`, `contradicted`, or `unknown`. A first-party page proves that
   the seller made a claim; it does not independently prove the outcome.
4. If a query or competitor was supplied, compare only the stated buyer
   decision. Treat search or AI answers as dated observations, not rankings or
   market facts. Use independent sources for material external claims and stop
   at `INSUFFICIENT_EVIDENCE` when the evidence bar is not met.
5. Check product-information coverage against Google's official product and
   merchant-listing guidance. Structured data can improve eligibility for
   search enhancements, but it is not a guarantee of display or ranking. Use
   [Google product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
   and [Google's generative AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
   as the rubric, not as a promise of visibility.
6. Score the observed page with `references/page-score.md`. Return the overall
   score, band, audit coverage, category scores, criterion ratings, and any
   critical blockers. Keep unknowns unscored, label low-coverage results
   provisional, and never present the score as a conversion, ranking, or AI
   citation prediction.
7. Prioritize up to three changes. Each change needs an evidence-backed issue,
   the proposed copy/data/experiment change, a reason, an observable success
   signal, and an effort or dependency note. Return fewer changes when the
   evidence cannot support three; say why.

## Output

Use this order:

1. `## Status`: `READY`, `NEEDS_INPUT`, or `INSUFFICIENT_EVIDENCE`.
2. `## Page score`: overall score and band, audit coverage, provisional or
   unscorable label when required, critical blockers, and a category table with
   weight, quality score, coverage, and the main finding. Follow it
   with criterion ratings and short evidence notes.
3. `## Decision`: one sentence answering whether the page is ready for the
   stated traffic or discovery test, with calibrated confidence.
4. `## Scope`: product, audience, query, competitor, URL, and access date.
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
user provides direct measurement data.

## Boundary

The audit produces a decision and a change proposal. It does not expose
personal or customer data, invent reviews or certifications, infer missing
values, edit a page or feed, change an ad or store account, send outreach, or
publish anything. If the user wants a change, return a reviewable proposal and
wait for a separate, explicit approval before any external action.

## Completion

The result is complete when the primary URL and access date are visible, page
observations are separated from claims and interpretations, every material
external fact has a traceable source, the score arithmetic and coverage can be
recalculated from the criterion ratings, missing evidence is explicit, the
recommended changes are prioritized, and the output states what the audit did
not establish.
