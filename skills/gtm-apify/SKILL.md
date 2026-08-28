---
name: gtm-apify
description: "Use Apify for bounded, read-only public-web collection when APIFY_ENABLED=true and APIFY_TOKEN is configured; otherwise use the normal source path."
---

# Apify capability

Use this as an optional source adapter for live public-web observations. It is
not a replacement for the GTM workflow, the evidence policy, or local
fallbacks.

## Activate

1. Run `python3 scripts/apify_capability.py status` from this skill directory.
2. Continue only when its JSON result reports `enabled: true`,
   `configured: true`, and `ready: true`. `APIFY_ENABLED` must be explicitly
   set to `true`; a token alone never activates the capability.
3. If the capability is unavailable, continue with the available web,
   browser, connector, or snapshot path and label the source limitation.

The script reads `.env` from the current repository or the process environment.
Keep the token server-side/local-only. Never copy it into a prompt, URL,
source file, fixture, output, log, or commit.

## Choose a bounded operation

- `fetch-url --url <public-url>` uses `apify/rag-web-browser` for one URL or
  one narrow search query and returns clean page/search observations.
- `product-page --url <public-product-url>` uses
  `apify/e-commerce-scraping-tool` for one product URL.
- `search --query <buyer-query>` uses `apify/google-search-scraper` for one
  query and one result page.
- `crawl --url <public-url>` uses `apify/website-content-crawler` for one
  page, depth zero, and one page maximum.

Each operation is read-only with respect to the target website, but it creates
an Apify run and may consume the configured budget. Keep the URL/query count,
page count, result count, timeout, and `maxTotalChargeUsd` small. Do not enable
reviews, lead enrichment, cookies, custom authenticated headers, schedules,
webhooks, or downstream writes through this capability.

## Use the result

Treat the returned data as a dated observation of what the Actor retrieved.
Preserve `source_url` or query, `accessed_at`, `actor_id`, `run_id`,
`dataset_id`, and retrieval status. Apply the shared evidence policy: an
extracted first-party claim shows that the page said something; it does not
prove the claim. A failed, partial, blocked, stale, or schema-drifting run is
`UNKNOWN` or `INSUFFICIENT_EVIDENCE`, not evidence that nothing exists.

If a command times out, report the run as incomplete and use the normal source
path or a supplied snapshot. Do not retry repeatedly or abort a run silently.

## Skill boundaries

The capability only collects public observations and returns a reviewable
source bundle. It does not edit websites, feeds, ads, CRM records, pricing,
repositories, or Apify resources. The Skillathon entry skill does not use this
capability: its live path must work without an account, API key, or MCP server.
