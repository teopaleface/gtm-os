# Routing matrix

Use the smallest playbook that can answer the decision. A ticket may reference one primary playbook and one supporting playbook.

| User need | Primary playbook | Supporting playbook |
| --- | --- | --- |
| Who should we sell to? | `gtm-icp` | `gtm-segmentation` |
| Which segment should come first? | `gtm-segmentation` | `gtm-icp`, `gtm-market-research` |
| How big could this market be? | `gtm-market-sizing` | `gtm-market-research`, `gtm-pricing` |
| What do users actually do or say? | `gtm-customer-research` | `gtm-market-research` |
| What should we say and why? | `gtm-positioning` | `gtm-messaging`, `gtm-proofgap` |
| What do buyers already believe? | `gtm-market-research` | `gtm-icp` |
| What do competitors claim or miss? | `gtm-competitive-intel` | `gtm-proofgap` |
| Is there a reason to act now? | `gtm-why-now` | `gtm-demand-miner` |
| Where are qualified buyers visible? | `gtm-demand-miner` | `gtm-channel-plan` |
| Will buyers find us in AI answers? | `gtm-ai-visibility` | `gtm-messaging` |
| How should we reach a market? | `gtm-channel-plan` | `gtm-content`, `gtm-outbound` |
| Which search topics should we own? | `gtm-seo` | `gtm-content`, `gtm-demand-miner` |
| Which paid test is worth running? | `gtm-paid-growth` | `gtm-channel-plan`, `gtm-experiment` |
| How can we earn community attention? | `gtm-community` | `gtm-content`, `gtm-demand-miner` |
| Is a partnership worth testing? | `gtm-partnerships` | `gtm-channel-plan`, `gtm-abm` |
| Which named accounts fit? | `gtm-abm` | `gtm-why-now`, `gtm-outbound` |
| How should we launch? | `gtm-launch-plan` | `gtm-sales-enablement`, `gtm-analytics` |
| How should campaigns be executed? | `gtm-campaign-ops` | `gtm-launch-plan`, `gtm-analytics` |
| What should we charge? | `gtm-pricing` | `gtm-competitive-intel`, `gtm-experiment` |
| How should sales handle the deal? | `gtm-sales-enablement` | `gtm-outbound`, `gtm-positioning` |
| How does a user reach value? | `gtm-onboarding` | `gtm-activation` |
| Why are users not reaching value? | `gtm-activation` | `gtm-analytics`, `gtm-onboarding` |
| Can the product create a growth loop? | `gtm-plg` | `gtm-referrals`, `gtm-activation` |
| How can customers share value? | `gtm-referrals` | `gtm-plg`, `gtm-retention` |
| What should lifecycle messages do? | `gtm-lifecycle` | `gtm-activation`, `gtm-retention` |
| Why might customers leave? | `gtm-churn` | `gtm-retention`, `gtm-analytics` |
| How do we run customer success? | `gtm-customer-success` | `gtm-retention`, `gtm-churn` |
| How do we keep or expand customers? | `gtm-retention` | `gtm-experiment` |
| What should we test next? | `gtm-experiment` | `gtm-analytics` |
| What is the funnel bottleneck? | `gtm-funnel-diagnostics` | `gtm-analytics`, `gtm-experiment` |
| Which channel gets credit? | `gtm-attribution` | `gtm-analytics`, `gtm-experiment` |
| What might demand or revenue look like? | `gtm-forecasting` | `gtm-analytics`, `gtm-market-sizing` |
| Can we trust this output? | `gtm-evals` | `gtm-market-research` |
