# Evidence policy

Evidence is the spine of GTM OS. The agent may reason from a source, but it must keep the source, the interpretation, and the action separate.

## Source record

Each external fact gets one evidence record with:

- a stable URL;
- the date it was accessed;
- a short excerpt or a precise data field;
- the claim or ticket it supports;
- an `independence_key`, normally the source domain or dataset name.

Use the source's own words for the excerpt. Keep it short enough to audit. A search-result snippet is a lead; open the source before treating it as evidence.

## Source quality

Prefer first-party or primary sources for what a company says about itself. Prefer independent sources for customer experience, market behavior, and buying friction. Internal product, billing, support, and interview data outrank public proxies when the user has permission to provide them.

Public signals have limits:

- a review is one experience, not a market estimate;
- a job post suggests a possible change, not intent or budget;
- a pricing page may be stale or segment-specific;
- a competitor claim proves only that the competitor made the claim;
- a failed fetch proves a source error, not that the fact is absent.

## Evidence bar

For a directional recommendation, use at least two independent sources when the claim is external and material to the decision. For a high-stakes or public claim, ask for stronger primary evidence or mark the claim as a hypothesis.

When the minimum bar cannot be met, return `INSUFFICIENT_EVIDENCE`. Explain what was searched, what was missing, and the cheapest next check.

## Claim labels

- **Fact**: directly supported by a cited source.
- **Interpretation**: a reasoned reading of one or more facts.
- **Hypothesis**: a testable idea that still needs validation.

Never use a fact label for an interpretation. Never use a confident sentence to hide an unknown.
