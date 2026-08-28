# Apify as an optional GTM OS integration

**Research date:** 2026-08-28  
**Scope:** official Apify documentation and official Apify Store pages only. No Apify API was called and no credential was used.

## Executive recommendation

Treat Apify as an optional, user-enabled evidence-collection adapter—not as a dependency of GTM OS and not as an authority on claims. It is a good fit for bounded public-web collection when a page is dynamic, a comparison needs repeatable product/price fields, or a narrow AI/search observation set needs to be refreshed. Keep the Skillathon path fully offline/deterministic: supplied snapshots and fixture datasets remain the default, while live Apify runs are an explicitly labeled opt-in enrichment path.

The first useful slice is a read-only adapter around one approved Actor, one URL/query scope, a hard item/time/spend budget, and a normalized snapshot that preserves source URL, access time, raw observation, and run metadata. The repository now contains that adapter with disabled defaults; it does not contain an Apify key, MCP configuration, or external write path.

## Skillathon impact

The organizer's canonical rules say the jury runs the submitted commit from a
fresh clone on a laptop with no API keys, MCP servers, or logged-in services;
the fallback under `demo/output/` must already work. The same rules say sponsor
products are welcome but not required. ([Skillathon rules](https://github.com/formidable-oss/gtm-skillathon-starter/blob/main/RULES.md),
[starter README](https://github.com/formidable-oss/gtm-skillathon-starter))

That makes a live Apify call inappropriate for the required demo path. It can
be shown later as an optional enhancement, but it must never be required for
the skill, its evals, or its fallback output.

## Official capability map

### Authentication and token handling

Apify recommends the `Authorization: Bearer <token>` header; the `token` URL parameter is supported but less secure because URLs can enter browser history and server logs. Apify says not to share tokens or use them in client-side code, and supports descriptions, expiration, scoped permissions, and rotation; rotation can keep the old token active for 24 hours while clients migrate. ([API integration](https://docs.apify.com/integrations/api), [API reference](https://docs.apify.com/api/v2))

Practical implication: a future adapter must be server-side/local-only, read the token from a secret manager or process environment, never print it, never put it in URLs, and default to a short-lived, narrowly scoped token. A browser-facing plugin action should not receive the token. For Skillathon evaluation, omit authentication entirely.

One important scope caveat: Apify documents that scheduled runs create and inject a new run token, and that this token is unscoped even when the scheduling token is scoped. This makes scheduling an account-bound trust decision, not merely a convenience feature. ([API integration — schedules and permissions](https://docs.apify.com/integrations/api))

### Actor runs and datasets

An Actor run is one execution in a Docker container with its own default dataset, key-value store, and request queue. Runs can be started from Console, API, Scheduler, integrations, or MCP; long runs can be asynchronous, while synchronous endpoints wait up to five minutes. Structured/tabular results normally go to a dataset; files and other unstructured output go to a key-value store. ([Actor runs](https://docs.apify.com/actors/development/builds-and-runs/runs), [Run Actors](https://docs.apify.com/actors/running), [Actor input and output](https://docs.apify.com/actors/running/input-and-output))

Datasets can be retrieved/exported in JSON, JSONL, CSV, XLSX, XML, HTML, or RSS. Apify securely retains the ten most recent runs indefinitely; older runs and their default storages are deleted after the plan's retention period. ([Default dataset API](https://docs.apify.com/api/v2/default-dataset), [Runs and builds](https://docs.apify.com/actors/running/runs-and-builds))

Practical implication: normalize each accepted item immediately into a local, dated evidence snapshot rather than relying on an Apify dataset as the long-term evidence archive. Store the run ID and dataset reference as provenance, and record retention/expiry risk in the artifact's unknowns.

### Webhooks and scheduling

Schedules run Actors or tasks on cron expressions, support time zones/DST, allow input overrides, and can associate up to ten Actors and ten tasks. Scheduled timing is usually within one second but can be delayed by overload or shutdown; new schedules are disabled by default. ([Actor and task schedules](https://docs.apify.com/actors/running/schedules))

Webhooks currently send a POST request to a configured URL when an event occurs. Run events include created, succeeded, failed, aborted, timed out, and resurrected. Delivery retries with exponential backoff after non-2xx responses, may be duplicated, and has a two-minute timeout; Apify recommends a secret in the webhook URL and idempotent receivers. ([Webhook integration](https://docs.apify.com/integrations/webhooks), [Webhook actions](https://docs.apify.com/integrations/webhooks/actions), [Webhook events](https://docs.apify.com/integrations/webhooks/events))

Practical implication: use a webhook only to enqueue or mark a refresh, never to perform a long audit inline. Require an allow-listed event, authenticate the receiver, deduplicate by dispatch/run ID, and keep the adapter's receiver read-only. Scheduling belongs after a manual, bounded pilot.

### MCP and agent integration

Apify officially documents a hosted MCP server at `https://mcp.apify.com` using Streamable HTTP with OAuth, or bearer-token auth; local stdio is also available. The hosted server supports inferred output schemas. Apify says the MCP server can expose selected Actors/tools, and its anonymous mode supports only discovery/documentation tools such as `search-actors`, `fetch-actor-details`, `search-apify-docs`, and `fetch-apify-docs`. Full-permission and rental Actors are intentionally excluded from MCP search/execution. ([Apify MCP server](https://docs.apify.com/integrations/mcp), [Apify for AI agents](https://docs.apify.com/get-started/agent-onboarding))

This is relevant to GTM OS as a human-approved research tool, not as autonomous authority. A future MCP profile should expose only an allow-list of read-only, public-page Actors and require explicit approval before each run. Discovery-only anonymous MCP is suitable for evaluating candidates without credentials. The repository itself should not commit MCP configuration or token placeholders during the Skillathon.

## Candidate official/public Actors

The Store contains both Apify-maintained and community Actors, so ownership and permission level must be checked per Actor. ([Apify Store](https://docs.apify.com/console/store), [Privacy Policy — third-party Actors](https://docs.apify.com/legal/privacy-policy))

| Candidate | Useful GTM OS input | Boundary |
|---|---|---|
| [E-commerce Scraping Tool](https://apify.com/apify/e-commerce-scraping-tool) — Apify-maintained | Product/category URLs or keywords; product name, description, price/currency, IDs, brand, image, variants, shipping, stock, ratings/review count, seller data; useful for product-page audits and competitor comparison | Public data only; current observations, not historical truth. The page says it cannot access login-protected data and that historical series must be built by repeated runs. |
| [Google Search scraper and SERP API](https://apify.com/apify/google-search-scraper) — official Store listing | Dated result pages, snippets, ads/AI-overview observations, localized query checks for SEO and AI-visibility research | SERP output is a sampled observation, not ranking/demand proof; preserve locale, query, date, and result page. |
| [Website Content Crawler](https://apify.com/apify/website-content-crawler) — official Store listing | Public competitor/product/support pages converted to cleaned text/Markdown for source comparison, content-gap work, and claim harvesting | Do not let extracted text become independent proof; retain the original URL and page date, and do not crawl beyond the declared scope. |

The Store page also lists many community Actors. Prefer an Apify-maintained Actor where available; if a community Actor is used, review its README, permissions, pricing, maintenance, privacy practices, and output quality before allowing it. Apify's privacy policy specifically recommends limited-permission Actors and warns that third-party creators may access personal data needed for functionality. ([Privacy Policy](https://docs.apify.com/legal/privacy-policy))

## Mapping to existing GTM OS skills

| Skill | Practical Apify augmentation | Contract-preserving rule |
|---|---|---|
| `gtm-product-page-audit` | E-commerce Actor supplies a structured observation layer for one product URL: visible product fields, variants, price, availability, reviews, seller/shipping fields, and possibly page text/markup; Website Content Crawler can provide a deterministic text snapshot when browser inspection is unavailable | Keep one primary page, access date, page facts vs first-party claims vs interpretation, and the existing claim ledger. Apify extraction proves what was observed or claimed on the page—not that a claim is true. It must not expand scope to a market crawl or publish edits. |
| `gtm-ai-visibility` | Google Search scraper can create a dated, localized query sample; Website Content Crawler can collect the public source pages cited or missing from an AI answer | Preserve exact prompt/query, model/source, date, locale, citations, and coverage caveat. Apify cannot turn a small sample into a stable AI ranking or market fact. |
| `gtm-seo` | Search scraper supports query/result-pattern collection; product/content Actors can help inspect competitor pages and source types | Use it to collect language and result patterns, not search volume unless a separate authoritative measurement exists. Keep buyer intent, fit, evidence, competition, and a measurable next page. |
| `gtm-proofgap` | Website/e-commerce extraction can speed capture of one competitor's exact public promise and collect candidate public review pages for manual comparison | Independent evidence still needs source diversity and the skill's minimum of two independent sources for a possible gap. Scraped reviews are leads, not automatically independent or representative evidence; never accuse or generalize. |

Cross-cutting adapter output should be a source bundle: `source_url`, `accessed_at`, `query_or_input`, `actor_id`, `run_id`, `dataset_id`, `field`, `value`, `raw_excerpt_or_pointer`, `retrieval_status`, and `limitations`. The existing evidence policy remains the authority for classification.

## Cost, rate, and reliability considerations

Apify's current pricing page shows a free plan at $0 with $5/month prepaid usage, no credit card required, and platform usage charged across Actors, proxies, data transfer, and storage; it states that free-plan access is blocked after prepaid usage is exhausted until the next cycle and unused credits expire. The same page lists compute-unit, storage, proxy, and transfer pricing, while exact Actor cost depends on the Actor, job, duration, retries, storage, proxies, and transfer. Store Actors may also have their own rental fee. ([Apify pricing](https://apify.com/pricing))

The API documents global and per-resource rate limits and `429` responses; official clients implement exponential backoff and rate limiting. ([Apify API](https://docs.apify.com/api/v2), [API integration](https://docs.apify.com/integrations/api))

Guardrails for a pilot:

- Default to one URL or a very small query set; cap items, pages, browser time, retries, memory, and maximum charge where the Actor supports it.
- Prefer HTTP/lightweight extraction before full browser rendering; disable enrichments, proxies, reviews, or screenshots unless the decision needs them.
- Run once manually, inspect output and cost, then schedule only if freshness has a clear decision value.
- Treat a failed, partial, stale, blocked, or schema-drifting run as `UNKNOWN`/`INSUFFICIENT_EVIDENCE`, never as an empty result meaning “nothing found.”
- Cache dated snapshots locally for the evaluation; never depend on Apify retention for reproducibility.

## Security, privacy, compliance, and legal constraints

Apify states that the platform is SOC 2 Type II compliant and points to its Trust Center for certifications, controls, and subprocessors. Its GDPR information describes Apify as an EU company and as a processor when customers use the platform to process personal data; its current DPA says customers should not provide categories such as HIPAA, PCI-DSS, criminal-justice, children's, or special-category data without the applicable contractual/legal basis. ([Security](https://docs.apify.com/security), [GDPR information](https://docs.apify.com/legal/gdpr-information), [Data Processing Addendum](https://docs.apify.com/legal/data-processing-addendum))

Apify's current terms put responsibility on the customer for the legality, accuracy, appropriateness, authorization, and use of Customer Data, and require use of Actors for legitimate purposes consistent with the Actor terms, applicable law, and the Creator's terms. ([General Terms and Conditions](https://docs.apify.com/legal/general-terms-and-conditions), [Actor Terms and Conditions](https://docs.apify.com/legal/actor-terms-and-conditions))

Therefore:

- Restrict the integration to public, authorized URLs and public business/product information; do not bypass authentication, paywalls, access controls, or robots/target-site restrictions.
- Do not collect personal, sensitive, confidential, or customer data for the Skillathon. Redact or reject emails, phone numbers, account data, precise location, reviews containing personal details, and hidden fields unless a separately approved privacy basis exists.
- Review each target site's terms, copyright/database rights, rate expectations, and applicable law; Apify's platform compliance is not permission to scrape a particular site.
- Use Apify-maintained or reviewed limited-permission Actors, pin an Actor version/build where practical, and inspect output schemas before ingestion.
- Keep credentials and external destinations out of repo files and logs. Webhook endpoints must be authenticated, idempotent, and non-destructive.

## Phased implementation approach

**Phase 0 — offline contract (Skillathon).** Add no integration. Define a provider-neutral evidence bundle schema and fixture snapshots that mimic Actor output. Demonstrate all four skills against local inputs, including failure/partial/unknown cases. This preserves deterministic evals and the current no-external-write boundary.

**Phase 1 — optional manual adapter.** Outside the Skillathon path, add a local/server-side adapter with an explicit `APIFY_ENABLED=false` default. Allow-list one Apify-maintained Actor, one URL/query scope, bounded inputs, read-only retrieval, run/dataset provenance, and local normalization. Require human confirmation and show estimated/observed cost before execution.

**Phase 2 — validation and repeatability.** Compare the adapter's normalized snapshots with hand-checked pages and fixtures. Measure field completeness, stale/blocked rate, duplicate rate, cost per accepted evidence item, and time-to-result. Keep Apify as an enrichment source only when it improves a stated decision.

**Phase 3 — controlled refresh.** If a recurring refresh is justified, use an Apify schedule or webhook with an explicit owner, budget, timezone, retention policy, secret-protected idempotent receiver, failure alert, and kill switch. Store canonical snapshots in the repository's approved data location or a separately approved system; do not make the GTM skill depend on live availability.

## What remains fallback/offline for the Skillathon

The following should remain offline and first-class: all eval fixtures, supplied page snapshots, claim-ledger examples, AI-visibility prompt/answer samples, SEO query/result fixtures, proof-gap evidence packets, and all negative tests for missing, inaccessible, stale, partial, or contradictory sources. The demo must work with no Apify account, no API token, no network, no schedule, and no webhook.

## Open questions before production use

1. Which single public-data use case has enough decision value to justify recurring cloud collection?
2. What repository-approved secret/runtime boundary will host an optional adapter?
3. What retention and deletion policy applies to extracted page text, reviews, screenshots, and URLs?
4. Which Actor version, locale, browser mode, and output schema will be pinned for reproducibility?
5. Who owns legal review for each target domain and the cost kill switch?

## Sources

All sources below are first-party Apify documentation or official Apify pages, accessed 2026-08-28.

- [Apify API](https://docs.apify.com/api/v2) — authentication modes, security warning, run workflow, rate limits.
- [API integration](https://docs.apify.com/integrations/api) — token scoping, expiration, rotation, clients, schedule/webhook permission caveats.
- [Actor runs](https://docs.apify.com/actors/development/builds-and-runs/runs) and [Run Actors](https://docs.apify.com/actors/running) — run lifecycle, storages, origins, API/MCP execution.
- [Actor input and output](https://docs.apify.com/actors/running/input-and-output) and [Default dataset API](https://docs.apify.com/api/v2/default-dataset) — input/output locations and dataset access/export.
- [Runs and builds](https://docs.apify.com/actors/running/runs-and-builds) — retention of recent runs and default storages.
- [Actor and task schedules](https://docs.apify.com/actors/running/schedules) — cron, timezone/DST, limits, defaults, timing caveat.
- [Webhook integration](https://docs.apify.com/integrations/webhooks), [Webhook actions](https://docs.apify.com/integrations/webhooks/actions), and [Webhook events](https://docs.apify.com/integrations/webhooks/events) — POST-only actions, event types, retries, timeout, duplication, and secret guidance.
- [Apify MCP server](https://docs.apify.com/integrations/mcp) and [Apify for AI agents](https://docs.apify.com/get-started/agent-onboarding) — hosted/local MCP, OAuth, anonymous discovery, tool selection, and excluded Actors.
- [Apify Store](https://docs.apify.com/console/store) and [official Store](https://apify.com/store) — Store model and public Actor catalog.
- [E-commerce Scraping Tool](https://apify.com/apify/e-commerce-scraping-tool) — official product extraction fields, public-only boundary, dataset output, pricing model, MCP support.
- [Google Search scraper and SERP API](https://apify.com/apify/google-search-scraper) — official search Actor page.
- [Website Content Crawler](https://apify.com/apify/website-content-crawler) — official content extraction Actor page.
- [Apify pricing](https://apify.com/pricing) — free plan, prepaid usage, overage/blocking, compute/storage/proxy/transfer pricing.
- [Security](https://docs.apify.com/security), [GDPR information](https://docs.apify.com/legal/gdpr-information), and [Data Processing Addendum](https://docs.apify.com/legal/data-processing-addendum) — security, processor posture, and restricted data categories.
- [General Terms and Conditions](https://docs.apify.com/legal/general-terms-and-conditions), [Actor Terms and Conditions](https://docs.apify.com/legal/actor-terms-and-conditions), and [Privacy Policy](https://docs.apify.com/legal/privacy-policy) — authorization/legal responsibility, Actor permissions, and third-party Actor privacy considerations.
- [Skillathon rules](https://github.com/formidable-oss/gtm-skillathon-starter/blob/main/RULES.md) and [starter README](https://github.com/formidable-oss/gtm-skillathon-starter) — no-credential judged path, fallback requirement, and sponsor-product guidance.
