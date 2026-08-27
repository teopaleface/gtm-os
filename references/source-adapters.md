# Source adapters

GTM OS is a skills package, not a hosted data service. It can use a source only when the running Codex session has a suitable tool or connector.

## Preferred order

1. user-provided product, customer, billing, support, and interview data;
2. first-party product and competitor pages;
3. reputable public datasets and official filings;
4. independent reviews, communities, job posts, and discussions;
5. search results as discovery leads only.

For current web research, use the web or browser capability available in the session. For repeatable collection, an Apify or other MCP connector can be used when the user has connected it. The connector's secret belongs in its credential store, never in a skill file, fixture, prompt, or commit.

Record the adapter used in the run notes when it materially affects coverage. If an adapter fails, return `SOURCE_ERROR` for that source and continue with the remaining evidence. Do not convert an adapter failure into a market conclusion.

## Live-data handoff

When a playbook needs a connector that is not available, create a ticket with:

- the exact source needed;
- the query or URL pattern;
- the fields to capture;
- the evidence bar;
- a local fixture that lets the workflow be evaluated without the connector.
