---
name: gtm-orchestrator
description: "Route go-to-market work from a broad request to a decision, ticket queue, evidence-backed artifact, and evaluated next action. Use when the user asks about GTM, ICP, audiences, positioning, messaging, market research, competitors, demand, channels, launch, sales, pricing, onboarding, activation, retention, churn, growth experiments, or marketing analytics."
---

# GTM orchestrator

Run the GTM loop. Keep the user's decision visible while the work branches into bounded tickets.

## 1. Scope the request

Extract the product, market, audience, business goal, time horizon, constraints, existing evidence, and the decision that matters. If the request is not GTM work, say which part is out of scope and ask for a GTM decision.

Use the smallest useful intake. Ask only questions whose answers would change the first ticket. If a missing answer blocks safe progress, return `NEEDS_INPUT` with the exact decision the user must supply.

## 2. Build the map

Separate context into `knowns`, `assumptions`, `hypotheses`, and `unknowns`. Treat a user assertion as context, not independent proof. Choose one primary stage and no more than two supporting stages using `../../references/routing-matrix.md`.

Create one to five tickets using `../../references/ticket-schema.md`. Start with the smallest decision that unlocks the next slice. Put prerequisite ticket IDs in `blockers`. Each ticket names its primary explicit playbook, evidence need, and acceptance criteria.

## 3. Work the first slice

Work the highest-priority unblocked ticket when the user asked for execution. The specialist skill names are the contracts for focused human invocation. The orchestrator owns routing so it does not depend on implicit skill-to-skill calls.

For external or current claims, use the available web, browser, connector, or MCP tool. Follow `../../references/evidence-policy.md` and `../../references/source-adapters.md`. For a drafting-only request, label unsupported content as a hypothesis and state what would validate it.

## 4. Assemble the result

Return a short readable summary first, then a JSON object matching `../../references/artifact-contract.md`. Include:

- the decision and a calibrated confidence;
- the knowns, assumptions, and unknowns;
- the ordered ticket queue and blockers;
- the artifact with claims labeled `fact`, `interpretation`, or `hypothesis`;
- every material source with URL, access date, excerpt, and independence key;
- the four component scores and the weighted overall score;
- the next human action and any approval needed.

Use `INSUFFICIENT_EVIDENCE` when a source-dependent recommendation has fewer than two independent material sources, when the sources fail, or when the remaining evidence only supports a hypothesis. Explain the cheapest next check.

## 5. Close the loop

Apply `../../references/scoring.md`. A ticket is done only when its artifact and eval result are present. Ask for human approval before sending outreach, writing to a CRM, publishing a claim, changing pricing, or making another external state change.

Completion means the response has one clear decision, a bounded queue, traceable evidence or an explicit evidence gap, an actionable next step, and a valid JSON contract. Do not end with a generic offer to help.
