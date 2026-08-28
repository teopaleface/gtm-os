# Product-page score

Use this rubric to score how well the observable page is built to support a
purchase decision and organic discovery. It does not predict conversion rate,
revenue, rankings, or inclusion in an AI answer.

## Rating method

Rate each criterion from 0 to 4.

| Rating | Meaning |
| --- | --- |
| 4 | Strong: complete, specific, consistent, and easy to use. |
| 3 | Solid: supports the decision with only a minor gap. |
| 2 | Partial: useful material exists, but a material gap remains. |
| 1 | Weak: present but unclear, hard to use, or internally inconsistent. |
| 0 | Failing: absent, broken, deceptive, or contradicted. |
| U | Unobserved: the source or capability cannot establish it. |
| NA | Not applicable: the criterion does not apply to this product. Explain why. |

For each assessed criterion, calculate `weight * rating / 4`. The overall score
is:

```text
100 * sum(earned points) / sum(assessed weights)
```

Round the overall score and category scores to whole numbers. Calculate audit
coverage as:

```text
100 * sum(assessed weights) / sum(applicable weights)
```

Unknown criteria count against coverage, not page quality. Exclude `NA` from
both sums. Do not turn an unknown into zero. If less than 50% of the applicable
weight is observed, return `UNSCORABLE` instead of a numeric overall score and
name the cheapest observations needed to score it.

Calculate each category's quality score with the same formula, using only that
category's criteria. In the output, show category quality as 0 to 100 and keep
the category weight in its own column. This avoids making an unobserved
criterion look like a page failure.

Use these score bands:

| Score | Band |
| --- | --- |
| 90 to 100 | Excellent |
| 75 to 89 | Strong |
| 60 to 74 | Mixed |
| 40 to 59 | Weak |
| 0 to 39 | Critical |

Mark a numeric score `provisional` when coverage is below 80%. A score is a
prioritization aid, not a measured business outcome. A critical blocker keeps
the page-readiness decision negative even when the arithmetic score is high.

## Rubric

### Conversion clarity and persuasion, 30 points

| Criterion | Weight | What to inspect |
| --- | ---: | --- |
| Offer and audience clarity | 6 | The shopper can identify the product, intended user, main value, and relevant use case without reconstruction. |
| Product detail and benefit specificity | 7 | Benefits connect to concrete specs, contents, materials, dimensions, compatibility, or outcomes that the page can support. |
| CTA and option selection | 6 | The primary action, price relationship, variants, quantity, state, and next step are clear and usable. |
| Objection and fit handling | 6 | The page resolves material fit, compatibility, sizing, limitations, comparison, care, or usage questions for the stated buyer. |
| Message hierarchy and scanability | 5 | Headings, summaries, and detail order put decision-critical information where shoppers can find it. |

### Purchase confidence and friction, 20 points

| Criterion | Weight | What to inspect |
| --- | ---: | --- |
| Price, currency, availability, and total-cost clarity | 5 | Current commercial terms are visible and internally consistent. |
| Shipping and delivery | 4 | Cost, timing, geography, and material exceptions are findable before checkout. |
| Returns and warranty | 4 | Eligibility, window, process, cost, and warranty terms are findable and specific. |
| Reviews, ratings, and proof | 4 | Proof is authentic-looking, attributable, sufficiently detailed, and kept distinct from seller claims. |
| Seller and transaction trust | 3 | Seller identity, contact path, payment expectations, and relevant trust or policy information are clear. |

### SEO discovery, 20 points

| Criterion | Weight | What to inspect |
| --- | ---: | --- |
| Crawl and index controls | 4 | HTTP status, robots directives, canonical target, and rendered content permit the intended page to be discovered and indexed. |
| Title, description, heading, and intent alignment | 4 | The title, meta description, main heading, and visible copy identify the product and match the stated query without stuffing. |
| Unique content and internal discovery | 4 | The page has useful original text plus sensible internal links or breadcrumbs, without relying on duplicate manufacturer copy alone. |
| Product structured data | 5 | Valid Product or ProductGroup markup matches visible price, currency, availability, variants, brand, identifiers, ratings, shipping, and returns where applicable. |
| Image discovery | 3 | Product images are descriptive, indexable, high quality, and have useful alternative text where the image conveys information. |

### GEO and AI answer readiness, 15 points

Google treats generative-search optimization as part of SEO, not a separate
ranking system. Use this category to assess whether an eligible page contains
clear, supportable material that an answer system can retrieve and cite. Do not
award points for `llms.txt`, special AI markup, artificial content chunking, or
keyword variants made only for machines.

| Criterion | Weight | What to inspect |
| --- | ---: | --- |
| Factual answerability | 4 | Decision-critical facts are explicit in crawlable text rather than trapped in images, interactions, or vague marketing language. |
| Entity and variant clarity | 3 | Product, brand, model, variants, identifiers, and relationships use consistent names. |
| Evidence and provenance | 3 | Material claims have specific first-party support or traceable independent proof, with claim scope kept clear. |
| Buyer-question coverage | 3 | The page answers relevant use-case, comparison, compatibility, limitation, and care questions in natural language. |
| Freshness and cross-surface consistency | 2 | Visible facts, markup, merchant data, dates, and policies agree where they can be checked. |

### UX, accessibility, and performance, 15 points

| Criterion | Weight | What to inspect |
| --- | ---: | --- |
| Mobile layout and navigation | 3 | Primary content and actions remain readable, reachable, and stable on a representative mobile viewport. |
| Interaction usability | 3 | Variant, quantity, gallery, disclosure, validation, stock, and error states give clear feedback and preserve the shopper's context. |
| Accessibility basics | 3 | Names, labels, focus order, keyboard operation, contrast, headings, and alternatives support the main purchase path. |
| Product media | 2 | Images or video show the product, scale, important details, and variants with usable zoom or equivalent inspection. |
| Performance and visual stability | 4 | Field data or a dated lab run supports loading, responsiveness, and layout stability. Record the source and device profile. |

## Scoring rules

- Score the stated audience, query, geography, device, and product state. Record
  material variants or regional differences instead of averaging them away.
- Cite one observation for every rating below 2 and every rating of 4. Briefly
  explain ratings of 2 or 3 in the scorecard.
- Assign one issue to its primary criterion. Cross-reference it elsewhere
  without deducting it twice.
- Treat analytics such as conversion rate, revenue per session, search
  impressions, and AI citations as validation evidence. They do not earn page
  points by themselves.
- Name critical blockers separately. Examples include a broken primary CTA,
  contradictory price or availability, a blocked or `noindex` canonical page,
  an inaccessible purchase action, or a material unsupported safety claim.
- Keep SEO and GEO conclusions bounded. Eligibility and page quality never
  guarantee crawling, indexing, ranking, rich results, citations, or sales.
