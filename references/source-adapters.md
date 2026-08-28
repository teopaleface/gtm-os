# Source adapters

GTM OS is a skills package, not a hosted data service. It can use a source only when the running Codex session has a suitable tool or connector.

Before selecting Browser or Computer Use, read `user-capabilities.md`. It is the
human-editable switchboard for those interactive capabilities and contains no
credentials. A disabled capability is unavailable; use the next permitted
source or a supplied snapshot. Apify is separately gated by its local `.env`
configuration and the `apify` setting in `user-capabilities.md`.

## Preferred order

1. user-provided product, customer, billing, support, and interview data;
2. first-party product and competitor pages;
3. reputable public datasets and official filings;
4. independent reviews, communities, job posts, and discussions;
5. search results as discovery leads only.

For current web research, use the web capability available in the session. Use
Browser or Computer Use only when enabled in `user-capabilities.md`. For
repeatable collection, the bounded Apify adapter or another MCP connector can
be used when enabled and connected. The connector's secret belongs in its
credential store, never in a skill file, fixture, prompt, or commit.

Record the adapter used in the run notes when it materially affects coverage. If an adapter fails, return `SOURCE_ERROR` for that source and continue with the remaining evidence. Do not convert an adapter failure into a market conclusion.

## Optional Apify capability

When the production repository has `apify: enabled` in
`user-capabilities.md`, plus `APIFY_ENABLED=true` and `APIFY_TOKEN`
configured in its local `.env` or secret store, the model may use the
`gtm-apify` capability for a bounded public URL, product page, search query, or
one-page crawl. Read that skill's contract before invoking it. It uses an
allow-listed Actor, a charge cap, and a read-only source bundle with run and
dataset provenance.

When either gate is absent, use the normal web/snapshot path without reporting
Apify as a failure. The capability is enrichment, not a
prerequisite for any GTM skill. Its output remains an observation and must pass the same source,
independence, privacy, and evidence rules as every other adapter.

## Live-data handoff

When a playbook needs a connector that is not available, create a ticket with:

- the exact source needed;
- the query or URL pattern;
- the fields to capture;
- the evidence bar;
- a local fixture that lets the workflow be evaluated without the connector.
