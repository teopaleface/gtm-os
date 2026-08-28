# GTM OS v0.1 specification

## Problem

GTM work is usually described as a list of disconnected tasks. A founder asks for an ICP, a launch plan, competitor research, or better onboarding copy, then has to decide what to ask next and how to judge the answer. Generic research assistants produce prose. They rarely produce a traceable decision, a bounded work item, and a clear stopping rule.

GTM OS turns the full lifecycle into one navigable flow.

## Outcome

Given a GTM request, the plugin should:

1. establish the product, audience, decision, constraints, and available data;
2. separate facts, assumptions, hypotheses, and unknowns;
3. create prioritized tickets with explicit blockers and acceptance criteria;
4. route each ticket to a named specialist playbook;
5. gather source-backed evidence when the ticket needs current or external facts;
6. produce a usable artifact and a short list of human decisions;
7. score evidence quality, decision readiness, actionability, and completeness;
8. stop with `INSUFFICIENT_EVIDENCE` when the evidence bar is not met.

## Invocation model

`gtm-orchestrator` is model-invoked. Its description is the only permanent routing surface and should cover broad GTM language without naming every specialist trigger.

Every specialist playbook is explicit-only. The orchestrator routes by writing the playbook name into a ticket. A human can run the specialist directly for a focused job. This keeps the specialist set discoverable without loading every playbook on every turn.

## Lifecycle map

| Stage | Typical decision | Playbooks |
| --- | --- | --- |
| Context | What are we trying to change? | `gtm-market-research`, `gtm-analytics` |
| Audience | Who has the problem and why? | `gtm-icp`, `gtm-segmentation` |
| Message | Why should this audience care? | `gtm-positioning`, `gtm-messaging`, `gtm-proofgap` |
| Market | What is changing around the buyer? | `gtm-competitive-intel`, `gtm-why-now`, `gtm-ai-visibility` |
| Product discovery | Is one product page understandable and defensible before traffic? | `gtm-product-page-audit` |
| Demand | Where can we reach qualified buyers? | `gtm-demand-miner`, `gtm-channel-plan`, `gtm-outbound` |
| Revenue | How does interest become a deal? | `gtm-pricing`, `gtm-sales-enablement`, `gtm-launch-plan` |
| Product-led growth | How does a new user reach value? | `gtm-onboarding`, `gtm-activation` |
| Retention | Why do customers stay, leave, or expand? | `gtm-retention`, `gtm-churn` |
| Learning | What should we test next? | `gtm-experiment`, `gtm-analytics` |

## Shared contract

The top-level response shape lives in `references/artifact-contract.md`. Evidence rules live in `references/evidence-policy.md`. Scoring lives in `references/scoring.md`. Tickets use `references/ticket-schema.md`. The full capability map lives in `references/playbook-catalog.md`.

## Vertical slice for v0.1

The first release is complete when a user can give this request:

> I have an app that imports invoices from different sources and submits them to a person's Romanian SPV. Help me find the first audience, explain the value, and identify one proof gap worth investigating.

The orchestrator must ask only the missing high-value questions, create tickets for ICP discovery, positioning, and proof-gap research, and return a structured output. The bundled fixtures must prove that valid evidence passes, weak evidence is downgraded, and invented citations fail.

## Non-goals

- a CRM, campaign sender, ad buyer, or analytics warehouse;
- a promise that public data represents the whole market;
- automatic publication of claims or outreach;
- a large integration layer hidden inside a prompt file;
- a directory of empty specialist skills that only rename generic advice.

## Release bar

The package is ready to share when the plugin manifest validates, all skills pass the skill validator, the deterministic eval suite is green, the public README explains the invocation model, and the live page makes the evidence boundary visible.
