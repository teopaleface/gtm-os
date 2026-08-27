---
name: gtm-funnel-diagnostics
description: "Find the highest-value funnel bottleneck from measured behavior and define the next diagnostic step."
---

# Funnel diagnostics

Diagnose the path, not the last number in the dashboard.

## Steps

1. Define the funnel, cohort, period, denominator, and business decision.
2. Check event definitions, identity stitching, missing data, and sample size before interpreting rates.
3. Locate the largest meaningful drop and compare relevant segments or cohorts.
4. Offer competing explanations and identify the cheapest discriminating check.
5. Turn the leading explanation into one experiment or instrumentation ticket.

Read `../../references/scoring.md`, `../../references/ticket-schema.md`, and `../../references/artifact-contract.md`.

## Completion

The diagnosis names a measured bottleneck, data limits, competing causes, and the next check. It does not claim causality from a funnel drop alone.
