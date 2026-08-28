---
name: gtm-skillathon-proofgap
description: "Compare one competitor promise with independent public customer evidence and produce a cautious proof-gap brief when a GTM battlecard or validation lead is needed."
---

# Proof-gap brief

Produce one auditable GTM validation lead: one competitor, one audience, and
one promise category. In a timed run, read only this skill, the supplied input,
and the output path. Do not inspect demo notes, evals, git state, or other files.

## Required input

The input must identify the competitor, audience or company type, one promise
category, one first-party URL containing the promise, and any public independent
source records. Use public data only. Never reproduce names, email addresses,
phone numbers, scraped profiles, private customer material, or credentials.

If the competitor, audience, promise category, or first-party URL is missing,
write `INSUFFICIENT_EVIDENCE`, name the missing field, and do not guess.

## Procedure

1. Read the complete supplied input and lock the scope to its single
   competitor, audience, and promise category.
2. Treat committed public snapshots as the primary evidence for the timed run.
   Do not use a general web search. A live check is optional and may open only
   an exact listed URL, once, without retrying. Label each source `live` or
   `snapshot`; use an actual access date and an exact excerpt of at most 40
   words. Never call a snapshot live.
3. Separate the first-party claim, customer experience, and interpretation.
   Deduplicate by domain; review counts are context, not market size.
4. Classify the result as `ALIGNED`, `MIXED`, `POSSIBLE GAP`, or
   `INSUFFICIENT_EVIDENCE`. Use `POSSIBLE GAP` only when two independent
   domains support the same material mismatch. A gap is a validation lead, not
   proof that a company is dishonest.
5. Write `demo/output/proof-gap-brief.md` unless the user names another output.
   Use these headings: `Status`, `Scope`, `First-party promise`, `Evidence`,
   `Facts`, `Interpretation`, `Hypothesis`, `Caveat`, `Sales question`,
   `Cheapest next validation action`, and `Limitations`. The evidence table
   must have source type, URL, access date, exact excerpt, independence key,
   and limitation columns. Put `/ snapshot` or `/ live` in every source-type
   cell. Copy the complete first-party excerpt verbatim in `First-party
   promise`; do not shorten it. Keep the brief under 40 physical lines. Stop
   immediately after the one write.

## Failure and safety

- If fewer than two independent sources support a mismatch, use `MIXED` or
  `INSUFFICIENT_EVIDENCE` and say what is missing.
- If sources fail and no committed snapshot exists, use `INSUFFICIENT_EVIDENCE`
  with `SOURCE_ERROR`; a failed fetch proves nothing about absence.
- Refuse accusations, deceptive messaging, external messages/publication, and
  private or personal data. Do not contact anyone or publish anything.
- Never invent sources, excerpts, dates, customer experiences, or conclusions;
  do not invoke another skill.

## Done

The output exists, contains the exact scoped promise and source table, separates
facts/interpretation/hypothesis, includes the caveat, neutral sales question,
next validation action, and limitation, and contains no personal data or
unsupported claim.
