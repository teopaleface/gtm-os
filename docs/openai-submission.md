# OpenAI plugin submission notes

GTM OS is packaged as a skills-only plugin. It has no MCP server and no app connector of its own. The plugin can use tools available in the user's Codex or ChatGPT session, but its repository contains no credentials.

## Public links

- Website: https://gtm-os.ishi-8634.chatgpt.site
- Support: https://gtm-os.ishi-8634.chatgpt.site/support
- Privacy: https://gtm-os.ishi-8634.chatgpt.site/privacy
- Terms: https://gtm-os.ishi-8634.chatgpt.site/terms
- Repository: https://github.com/teopaleface/gtm-os

## Starter prompts

1. `I have a product idea. Help me find the first audience, the buying problem, and the next evidence check.`
2. `Compare these competitors for one buyer decision and show which claims have independent proof.`
3. `Turn this launch idea into tickets with blockers, owners, evidence needs, and a measurement plan.`
4. `Audit this GTM output. Check the evidence, labels, scores, and next action.`

## Included test cases

The deterministic suite has five positive cases and three negative cases in `evals/cases.json`.

Positive cases cover a valid contract, deliberate evidence abstention, ticket blockers, score consistency, and a structured handoff. Negative cases cover an invalid citation, an uncited fact, and a `READY` output whose evidence score is below the release bar.

## Preflight

The detailed run log is [`docs/qa-report.md`](qa-report.md). It records the
manifest validator, all 40 skill validators and smoke tests, the deterministic
evals, the public-link checks, and the fresh-clone Skillathon run.

The repository also contains the optional Skillathon package under
`.agents/skills/`, `demo/`, `DEMO.md`, and `submission.json`. The OpenAI plugin
manifest continues to load the production plugin skills from `skills/`.

## Submission state

The package, public links, starter prompts, and eval assets are ready for the manual submission form. Directory publication still depends on the OpenAI review and the developer or business verification required by the submission process.

See the official [plugin submission guide](https://developers.openai.com/plugins/deploy/submission) and [plugin building guide](https://developers.openai.com/plugins/build/plugins) for the current form and review requirements.
