---
name: gtm-product-page-audit
description: "Audit one public e-commerce product page and produce a concise, evidence-backed pre-traffic brief."
---

# Product-page audit

Produce one auditable pre-traffic decision for one public e-commerce product
page. The timed run reads only this skill, the supplied input, and the named
output path. Resolve one explicit `Target URL:` from the invocation prompt or
the input. If both are present, they must identify the same page; a mismatch is
missing input, not a reason to guess. In snapshot mode, use the public snapshots
in the input as the primary evidence. Do not browse or web-search unless the
prompt explicitly allows a check of that exact URL. A URL alone never
authorizes browsing. Do not follow links or inspect another URL. This keeps the
result reproducible under the Skillathon time limit.

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
exact-URL check is available, write `NEEDS_INPUT`, name the missing field, and
stop without guessing. Use `INSUFFICIENT_EVIDENCE` when a page is available but
the evidence cannot support the requested decision.

## Procedure

1. Resolve the `Target URL` from the prompt and input, reject a mismatch as
   `NEEDS_INPUT`, then lock the scope to one primary product page. Keep the
   competitor and query optional.
2. Extract page observations from the supplied snapshot or the permitted exact
   URL check: product name, price and currency, availability,
   variants, brand, identifiers, images, shipping, returns, ratings or reviews,
   and Product JSON-LD when the input provides it. Mark absent fields as
   `unknown`, never as a likely value.
3. Build a short claim ledger. For each material claim, include the exact
   excerpt, source URL, source role, and one status: `verified`, `unsupported`,
   `contradicted`, or `unknown`. Keep first-party claims separate from facts
   supported by independent evidence.
4. Check product-data coverage for title, description, image, link, price,
   availability, condition, brand, identifiers, shipping, returns, and product
   markup. Use the supplied Google guidance as the rubric. Treat structured data
   as an eligibility aid, never as a ranking or display guarantee.
5. Return at most three prioritized changes. A change includes the issue,
   recommendation, evidence, observable success signal, and effort or
   dependency. If the evidence cannot support three changes, return fewer and
   use `INSUFFICIENT_EVIDENCE`.

## Output

Write to the output path named by the prompt; use
`demo/output/product-page-audit.md` when no path is supplied. Keep the brief
under 60 physical lines and use exactly these headings:

- `## Status`
- `## Scope`
- `## Decision`
- `## Page facts`
- `## Claim ledger`
- `## Product-data coverage`
- `## Prioritized changes`
- `## Unknowns and limits`
- `## Sources`

Every material source row includes URL, access date, exact excerpt or precise
field, source role, independence key, and limitation. Label reasoning as
`fact`, `interpretation`, or `hypothesis`. Use `NEEDS_INPUT` only when the
required input is absent; use `INSUFFICIENT_EVIDENCE` when the page or evidence
does not support the decision. Include the resolved `Target URL` and access
date under `## Scope`.

## Safety boundary

Keep the output read-only and public-data-only. State unknowns instead of
inventing reviews, certifications, availability, identifiers, competitor
claims, rankings, conversions, or buyer intent. Do not reproduce personal data,
edit or publish a page, modify a feed or account, contact anyone, or claim that
the product will rank or convert.

## Done

The output exists at the requested path, contains the nine headings, shows the
resolved target URL and access date, separates observations from claims and reasoning,
includes a coverage check and prioritized changes, and leaves unsupported
outcomes explicitly unknown.
