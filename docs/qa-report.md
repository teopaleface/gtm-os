# QA report

Run date: 2026-08-28 (EEST)

## Plugin package

- `.codex-plugin/plugin.json` parses as JSON.
- The official Codex plugin validator passed.
- All 40 bundled skills passed the official skill quick validator.
- A cold-start smoke run loaded and exercised every bundled skill. All 40
  returned the expected `SMOKE_RESULT: PASS` marker while respecting the
  evidence boundary and missing-input behavior.
- The real plugin was installed from a temporary local marketplace and the
  installed `gtm-orchestrator` skill loaded in a fresh Codex session.

The 40 skills tested were:

`gtm-abm`, `gtm-activation`, `gtm-ai-visibility`, `gtm-analytics`,
`gtm-attribution`, `gtm-campaign-ops`, `gtm-channel-plan`, `gtm-churn`,
`gtm-community`, `gtm-competitive-intel`, `gtm-content`,
`gtm-customer-research`, `gtm-customer-success`, `gtm-demand-miner`,
`gtm-evals`, `gtm-experiment`, `gtm-forecasting`, `gtm-funnel-diagnostics`,
`gtm-icp`, `gtm-launch-plan`, `gtm-lifecycle`, `gtm-market-research`,
`gtm-market-sizing`, `gtm-messaging`, `gtm-onboarding`, `gtm-orchestrator`,
`gtm-outbound`, `gtm-paid-growth`, `gtm-partnerships`, `gtm-plg`,
`gtm-positioning`, `gtm-pricing`, `gtm-proofgap`, `gtm-referrals`,
`gtm-retention`, `gtm-sales-enablement`, `gtm-segmentation`, `gtm-seo`,
`gtm-strategy`, `gtm-why-now`.

## Repository contract

- `python3 scripts/run_evals.py`: 8/8 passed.
- `python3 scripts/validate_output.py evals/fixtures/valid-output.json`: passed.
- `python3 -m unittest discover -s tests -v`: 5/5 passed.
- `python3 -m compileall -q scripts tests`: passed.
- `git diff --cached --check`: passed.

## Skillathon package

- The canonical organizer validator returned `ok: true`, with zero errors and
  zero warnings.
- The intended, insufficient-evidence, and failure/safety cases are recorded
  in [`demo/evals.md`](../demo/evals.md), with observed result files.
- A fresh-clone run using the exact seed prompt wrote the requested output in
  59.79 seconds at local `max` reasoning. It used the committed public
  snapshots, preserved the complete first-party excerpt, and changed only the
  output file. The fallback is already committed at
  [`demo/output/proof-gap-brief.md`](../demo/output/proof-gap-brief.md).
- The same fresh-clone run completed in 23.31 seconds with the local Codex
  `low` reasoning setting. Both measurements are below the 75-second hard
  cutoff.
- The smoke run is deliberately snapshot-first so the organizer can fall back
  at about 60 seconds; no live page is described as live in the fallback.

## Public release checks

- GitHub API reports `teopaleface/gtm-os` as public (`private: false`).
- The configured homepage, support, privacy, and terms URLs each returned HTTP
  200 during the check.

## Scope and limitations

The individual skill smoke tests confirm loading, routing boundaries, and safe
abstention on controlled missing-input prompts. They are not a substitute for
every possible live GTM research scenario. The deterministic eval suite covers
the output contract; the Skillathon demo covers one genuine public-data use
case.
