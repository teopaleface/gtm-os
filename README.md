# GTM OS

GTM OS is an evidence-backed GTM workflow for Codex. It starts with a fuzzy go-to-market question, turns the missing work into tickets, routes each ticket to a focused playbook, and checks the result before it becomes a recommendation.

It is built for founders and growth teams who want practical marketing work without losing the trail from claim to source.

## The short version

Ask Codex something like:

> I have an app that imports invoices from different sources and submits them to a person's Romanian SPV. Help me find the first audience, explain the value, and identify one proof gap worth investigating.

GTM OS should ask for the missing context, label what is known and unknown, create a small ticket queue, and work the first useful slice. The final output includes evidence, a decision, next actions, and scores.

## Invocation model

- `gtm-orchestrator` is the model-invoked entry point. Use a normal GTM request and let it route the work.
- The specialist playbooks are explicit-only. Run one when you already know the job, for example `/gtm-proofgap` or `/gtm-positioning`.
- `gtm-evals` is explicit-only and checks saved outputs. It does not pretend that a fixture test proves the quality of live research.

The package includes 39 explicit playbooks across strategy, audience, positioning, research, competition, proof gaps, demand, channels, launches, pricing, sales enablement, onboarding, activation, PLG, retention, churn, experiments, and analytics. See `references/playbook-catalog.md` for the map.

## How the flow works

`context → ticket → evidence → artifact → eval → decision`

The plugin stays read-only by default. It can draft outreach or campaign work, but a human must approve any external send, CRM write, publication, or pricing change.

## Evidence policy

Every external fact needs a URL, access date, and short excerpt. We distinguish facts from interpretations and hypotheses. A few public reviews do not represent every customer. A job post is a signal, not proof of budget. When the evidence bar is not met, the output says `INSUFFICIENT_EVIDENCE`.

The plugin can use the web, connected apps, or an MCP data source when those tools are available in the user's workspace. The skills package itself contains no secret and makes no API promise on its own.

## Repository layout

```text
.codex-plugin/        plugin manifest
skills/               one router plus explicit specialist playbooks
references/            shared evidence, ticket, score, and artifact contracts
evals/                 fixtures and cases for deterministic checks
scripts/               local validators and eval runner
docs/                  product spec and Matt Pocock workflow notes
```

## Local checks

```bash
python3 scripts/run_evals.py
python3 scripts/validate_output.py evals/fixtures/valid-output.json
python3 /path/to/skill-creator/scripts/quick_validate.py .
```

## Status

This is an early public release. The workflow and contracts are usable now. Live data quality still depends on the sources and connectors available to the running Codex session.

## License

MIT. See `LICENSE`.
