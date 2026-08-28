# QA report

Run date: 2026-08-28 (EEST)

## Plugin package

- .codex-plugin/plugin.json parses as JSON.
- The official Codex plugin validator passed.
- All 42 bundled skills passed the official skill quick validator.
- The original 40 bundled skills have the recorded cold-start smoke run below.
  The new product-page skill passed independent forward-tests against its
  intended, missing-input, and safety cases.
- The real plugin was installed from a temporary local marketplace and the
  installed gtm-orchestrator skill loaded in a fresh Codex session.

The original 40 skills tested were:

gtm-abm, gtm-activation, gtm-ai-visibility, gtm-analytics, gtm-attribution,
gtm-campaign-ops, gtm-channel-plan, gtm-churn, gtm-community,
gtm-competitive-intel, gtm-content, gtm-customer-research,
gtm-customer-success, gtm-demand-miner, gtm-evals, gtm-experiment,
gtm-forecasting, gtm-funnel-diagnostics, gtm-icp, gtm-launch-plan,
gtm-lifecycle, gtm-market-research, gtm-market-sizing, gtm-messaging,
gtm-onboarding, gtm-orchestrator, gtm-outbound, gtm-paid-growth,
gtm-partnerships, gtm-plg, gtm-positioning, gtm-pricing, gtm-proofgap,
gtm-referrals, gtm-retention, gtm-sales-enablement, gtm-segmentation,
gtm-seo, gtm-strategy, gtm-why-now.

The 41st production skill is gtm-product-page-audit. The 42nd is the optional
gtm-apify capability.

## Repository contract

- python3 scripts/run_evals.py: 8/8 passed.
- python3 scripts/validate_output.py evals/fixtures/valid-output.json: passed.
- python3 -m unittest discover -s tests -v: 14/14 passed.
- python3 -m compileall -q scripts tests: passed.
- git diff --check: passed.

## Optional Apify capability

- The bounded adapter, `.env.example`, source-adapter contract, and fallback
  behavior are present and documented.
- The official quick validator and the focused unit tests passed.
- A transient live test used `apify/rag-web-browser` against the public GTM OS
  site. The Apify run succeeded, returned HTTP 200 and the expected page title,
  and stayed below the configured charge cap. The adapter output excluded
  response headers and cookies.
- The token and live payload were not written to the repository. Apify remains
  unavailable unless `APIFY_ENABLED=true` and a local `APIFY_TOKEN` are set.

## Focused e-commerce slice

- The production skill and the isolated Skillathon entry skill both pass the
  official quick validator.
- The plugin manifest validator passes with the new skill included.
- The routing matrix, playbook catalog, product specification, README, demo,
  source snapshots, fallback output, and submission manifest point to the same
  gtm-product-page-audit job.
- The intended, missing-input, and failure/safety cases are recorded in
  [demo/evals.md](../demo/evals.md). Independent forward-tests confirmed
  evidence abstention, NEEDS_INPUT for missing required input, and the
  read-only safety boundary.

## Skillathon package

- The focused entry skill is
  .agents/skills/gtm-product-page-audit/SKILL.md; its submission paths, JSON
  manifest, source snapshots, and fallback output are present and parseable.
- The fallback is snapshot-first, includes dated URLs and exact
  fields/excerpts, and is not described as a live page check.
- The generated Skillathon archive was extracted into a temporary directory and
  passed plugin validation, entry-skill validation, submission-path checks, and
  the single-entry-skill invariant.
- The official submission has not been created or sent. A fresh-clone timing
  run and the organizer’s separate validator remain final pre-submit checks.

## Public release checks

- GitHub API reports teopaleface/gtm-os as public (private: false).
- The configured homepage, support, privacy, and terms URLs each returned HTTP
  200 during the check.

## Scope and limitations

The individual skill smoke tests confirm loading, routing boundaries, and safe
abstention on controlled prompts. They are not a substitute for every possible
live GTM research scenario. The deterministic eval suite covers the existing
JSON output contract; the focused demo covers one genuine public-data product
page use case. The official organizer validator and fresh-clone timing run must
still be repeated after the final commit before any official submission.
