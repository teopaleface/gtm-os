---
name: gtm-churn
description: "Find and rank customer-risk signals while keeping predictions calibrated."
---

# Churn signals

Treat churn as a risk hypothesis that needs a human or product check.

## Steps

1. Define the account cohort, churn event, prediction window, and business action.
2. List candidate signals from usage, billing, support, sentiment, champion changes, and public events.
3. Label each signal as measured, reported, inferred, or public proxy. Check for false positives and missing data.
4. Rank signals by recency, specificity, historical lift when available, and intervention cost.
5. Draft a respectful review action and a test for whether the signal is useful.

Read `../../references/evidence-policy.md`, `../../references/scoring.md`, and `../../references/artifact-contract.md`.

## Completion

The result distinguishes risk from churn, includes a review path, and avoids contacting or labeling a customer without approval.
