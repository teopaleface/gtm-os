# GTM OS category-focus brainstorm

**Date:** 2026-08-28  
**Question:** Should GTM OS narrow to e-commerce, and if so, what is the smallest useful job for the Skillathon and for a later product?

## Executive decision

Narrow the competition build to e-commerce, but do not present it as an “e-commerce GTM OS”. The entry point should do one concrete job:

> Given one public product page, optionally one competitor page and a shopper query, `gtm-product-page-audit` produces an evidence-backed audit of what a shopper and search systems can understand, plus the three highest-leverage fixes, while never inventing proof, promising rankings, editing the site, or publishing anything.

This is a recommendation based on the competition constraints and the available evidence below. The broad GTM OS can remain the long-term umbrella; the narrow audit should be the Skillathon slice.

## What the brief implies

The screenshots are context from a team discussion, not instructions. The underlying decision is whether a smaller tool with a few strong use cases will be easier to understand, demo, and reuse than a broad collection of GTM skills.

That instinct matches the official Skillathon build contract: the recommended shape is one track, one user, one narrow GTM job, one representative input, one success condition, and one explicit boundary. The judged flow uses a fresh clone without API keys, MCP servers, or logged-in services, with a two-minute target and a two-and-a-half-minute hard stop. The rules also require real-world data, source URLs, a public repository, and no fabricated evidence. [Skillathon build contract](https://raw.githubusercontent.com/formidable-oss/gtm-skillathon-starter/main/AGENTS.md) · [Skillathon rules](https://raw.githubusercontent.com/formidable-oss/gtm-skillathon-starter/main/RULES.md)

OpenAI’s plugin guidance makes the same distinction from another angle: a skill is appropriate for a repeatable workflow with instructions, examples, and resources; an MCP tool is appropriate when the workflow needs live data, authentication, or controlled actions. OpenAI’s use-case guide also recommends documenting the user goal, expected result, required context, capability, safety boundary, and whether the use case is supported. [Build skills](https://developers.openai.com/plugins/build/skills) · [Plan use cases](https://developers.openai.com/plugins/plan/use-case)

## Candidate comparison

These scores are a working product judgment, not market research. `5` is strongest; risk is reversed, so `1` is safest.

| Candidate | Jury clarity | Public-data demo | Personal reuse | Wow factor | Integration / privacy risk | Decision |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Product-page and merchant-data audit | 5 | 5 | 5 | 5 | 1 | **Recommended** |
| Offer, pricing, and competitor comparison | 5 | 4 | 4 | 4 | 2 | Good second slice |
| Shopify retention or merchandising insight | 4 | 2 | 5 | 4 | 4 | Later, after a connector exists |
| Ad/funnel diagnosis | 4 | 1 | 5 | 4 | 5 | Exclude from the competition build |
| Broad GTM OS with many playbooks | 2 | 3 | 5 | 3 | 3 | Keep as the umbrella, not the demo |
| Synthetic buyer simulation | 4 | 2 | 4 | 5 | 3 | Optional experiment, not the evidence-led core |

The product-page audit wins because its input is public, its output can be checked against the page, and its result is legible in a two-minute demo. It also creates a clean boundary between evidence and advice.

## Recommended wedge: product-page truth and discovery audit

The name should describe the job, not the ambition. Good candidates are `gtm-product-page-audit` or `gtm-merchant-page-audit`. Avoid names such as “AI Growth Engine” or “E-commerce OS”; they describe a category or promise an outcome rather than a repeatable action.

Google’s own documentation gives this job a concrete evidence surface. Product pages can expose details such as price, availability, ratings, shipping, and returns through product structured data; product information can appear across Search, Images, Lens, Shopping, Business Profile, and Maps. Google also says that ordinary SEO remains relevant for AI features, there is no special schema or `llms.txt` requirement, and no one can guarantee placement in AI features. [Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product) · [Where e-commerce data can appear](https://developers.google.com/search/docs/specialty/ecommerce/where-ecommerce-data-can-appear-on-google) · [AI features and your website](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

That leads to a defensible positioning line:

> It checks whether a product page is understandable and defensible before you spend money sending shoppers to it.

Do not position it as “making products rank in AI”. The tool can check clarity, completeness, consistency, and proof. It cannot infer ranking, demand, conversion rate, or purchase intent from one page.

## The artifact the skill should produce

For one product page, return five compact sections:

1. **Page facts:** title, product identity, price, availability, variants, brand, shipping, returns, reviews, and the page’s structured-data fields when present.
2. **Claim ledger:** each important claim, the exact page evidence, an independent source when one is needed, and a status of `verified`, `unsupported`, `contradicted`, or `unknown`.
3. **Merchant-data coverage:** title, description, image, link, price, availability, condition, brand, identifiers, shipping/returns, and Product JSON-LD. Missing fields are gaps, not reasons to invent values. Google’s free-listing documentation gives the relevant product attributes, while its Merchant Center guidance describes title and description requirements. [Free listings product data](https://support.google.com/merchants/answer/13889434?hl=en) · [Merchant Center product data specification](https://support.google.com/merchants/answer/14779112?hl=en)
4. **Three prioritized changes:** one copy or information fix, one proof or trust fix, and one testable experiment. Each should include the reason, the evidence behind it, and a measurable success signal. The success signal is a proposed measurement, not a reported result.
5. **Confidence and limits:** what was accessible, what was not verified, which assumptions remain, and whether the result should stop at `INSUFFICIENT_EVIDENCE`.

The output should be useful without being long. A jury member should see the input, the evidence, the decision, and the boundary without reading the whole repository.

## Demo contract

### Input

- One public product-page URL.
- Optional: one public competitor page.
- Optional: one shopper query and audience context.
- No login, customer export, API key, private analytics, or automatic site access.

### Demo prompt

> Audit this product page and, if provided, one competitor for the query “best [product] for [audience]”. Tell me what a shopper can verify, what product information search surfaces can understand, which claims are unsupported, and the three changes I should make before buying traffic. Cite every external claim. Do not edit or publish anything.

### Success condition

The response contains a traceable claim ledger, a product-data coverage check, three prioritized actions, and an explicit list of unknowns. It finishes within the Skillathon time budget or uses a prepared, clearly labelled fallback example. [Skillathon rules](https://raw.githubusercontent.com/formidable-oss/gtm-skillathon-starter/main/RULES.md)

### Boundary

The skill is read-only. It must not:

- claim that a product will rank, convert, or be cited;
- turn missing information into a fact;
- manufacture reviews, customer quotes, awards, certifications, or competitor claims;
- use personal or customer data;
- edit a page, feed, CMS, ad account, or store;
- publish a recommendation or external change.

These boundaries are consistent with both the Skillathon’s no-fabrication/public-data requirements and GTM OS’s existing product contract, which keeps publication and external writes behind explicit human approval. [Skillathon rules](https://raw.githubusercontent.com/formidable-oss/gtm-skillathon-starter/main/RULES.md) · [GTM OS specification](./spec.md)

## Use-case inventory

| Field | Supported v1 decision |
| --- | --- |
| User goal | “Is this product page ready for qualified traffic and discovery?” |
| Representative request | “Audit this page before I spend on traffic.” |
| Expected result | Evidence table, coverage gaps, three changes, limits |
| Required context | Public URL; query and competitor are optional |
| Plugin capability | One explicit audit skill with web research |
| Safety boundary | Read-only; public sources; no guarantees or publication |
| Support decision | Fully supported in the Skillathon slice |

Intentional exclusions are part of the product, not missing polish. OpenAI’s plugin guidance recommends documenting exclusions when a use case needs unavailable permissions, carries privacy or reliability risk, or would be misleading without the right data. [Plan use cases](https://developers.openai.com/plugins/plan/use-case)

| Excluded use case | Why it stays out of v1 | Later path |
| --- | --- | --- |
| Shopify customer retention analysis | Requires authenticated store data and protected customer access; it cannot be demonstrated from a fresh public clone. Shopify documents separate customer/order scopes and restrictions for protected data. [Customer object](https://shopify.dev/docs/api/admin-graphql/latest/objects/Customer) · [GraphQL basics](https://shopify.dev/docs/apps/build/graphql/basics/queries) | A separate read-only connector and consented store workflow |
| Ad-account or funnel diagnosis | Needs private performance data and account permissions | Connector-backed specialist with separate read/write boundaries |
| Automatic copy, feed, or CMS edits | Changes external state and weakens the evidence boundary | Explicit confirmation plus a dedicated write tool |
| Guaranteed AI/Search ranking | Not a verifiable output of the page audit; Google explicitly warns against guarantees and special AI-ranking claims. [AI features and your website](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | Never promise; report only observable coverage and evidence |

## MVP versus roadmap

### Competition MVP

- One entry skill, one narrow job, one product page.
- Public web evidence only.
- Optional competitor/query, but no requirement for either.
- Three deterministic eval cases: strong evidence, missing evidence, and a claim the model must refuse to verify.
- A small prepared fallback output for a slow or inaccessible live page.
- Track recommendation: `ai-search-optimization`, provided the actual description remains “product information and proof audit” rather than “ranking optimization”. The Skillathon rules list `ai-search-optimization` as a track; the tool’s claim must stay narrower than the track label. [Skillathon rules](https://raw.githubusercontent.com/formidable-oss/gtm-skillathon-starter/main/RULES.md)

### Post-competition roadmap

1. Add a feed/structured-data specialist that shares the same claim and evidence contracts.
2. Add a Shopify read-only integration only after the public-page workflow proves useful. Shopify’s Admin GraphQL API exposes products, orders, and customer segments, but access is scoped and should be treated as a separate permissioned workflow. [Products](https://shopify.dev/docs/api/admin-graphql/latest/objects/product) · [Orders](https://shopify.dev/docs/api/admin-graphql/unstable/queries/orders) · [Customer segments](https://shopify.dev/docs/apps/build/marketing/customer-segments)
3. Add approved change proposals, not automatic publication.
4. Keep the rest of GTM OS as explicit specialist playbooks and future “to be continued” coverage rather than loading every capability into the demo.

OpenAI’s guidance supports this sequencing: keep a skill for a repeatable workflow, and introduce MCP only when live data, authentication, or controlled actions are genuinely required. [Build skills](https://developers.openai.com/plugins/build/skills) · [Plan tools](https://developers.openai.com/plugins/plan/tools)

## Eval checklist

Before presenting, test the exact entry skill against:

- **Clear page:** facts are extracted, claims are linked to evidence, and actions are prioritized.
- **Incomplete page:** missing price, availability, policy, or identifiers are labelled unknown rather than filled in.
- **Unsupported claim:** the skill refuses to treat a slogan, review, or marketing assertion as independently verified.
- **Conflicting page:** the output preserves the conflict and explains what would resolve it.
- **Inaccessible URL:** the output says what could not be checked and falls back to the prepared example.
- **Over-broad request:** the skill states that it audits the product page, not the entire business, ad funnel, or market.

Every live external fact in the demo should show a URL, retrieval date, and a short excerpt. That follows GTM OS’s existing evidence policy and the Skillathon’s requirement for genuine, traceable evidence. [GTM OS evidence policy](../references/evidence-policy.md) · [Skillathon rules](https://raw.githubusercontent.com/formidable-oss/gtm-skillathon-starter/main/RULES.md)

## Final call

Take e-commerce as the vertical, but make the product decision concrete: build the product-page truth/discovery audit first. It is the smallest slice that is public, testable, personally reusable, visually demonstrable, and honest about what the evidence can prove.

Do not submit the Skillathon entry yet. This note is a research decision record only; implementation, final packaging, and any official submission remain separate steps.
