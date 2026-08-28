# Product-page audit

## Status
COMPLETE. Live URL mode, exact target fetched once. Coverage 88%, no critical blockers.

## Page score
Overall: 87/100 (Strong). Coverage 88%. No critical blockers.
SEO category is provisional (crawl controls and structured-data markup unobserved).
Full category scores, criterion ratings, and evidence notes are in `demo/output/product-page-score.md`.

## Scope
Target URL: https://www.thomann.ro/beyerdynamic_dt_900_pro_x.htm
Access date: 2026-08-28

## Decision
READY (strong). Page is fit to drive paid and natural traffic. Fix the shipping-cost gap and confirm structured data before scaling.

## Page facts
- Product: beyerdynamic DT 900 PRO X, open-back dynamic studio headphones, STELLAR.45 driver (fact).
- Price: 1.199 lei, VAT included (fact).
- Availability: in stock, ships immediately (fact).
- Article number: 527377; available since October 2021; sell unit 1 piece (fact).
- Specs: 48 Ohm, 5-40000 Hz, 100 dB SPL @1mW/500Hz, 345g, velour pads, interchangeable pads and cable (fact).
- Includes: 3m and 1.8m cables (mini XLR to 3.5mm with 6.35mm adapter) and carrying bag (fact).
- Trust: 30-day money-back, 3-year Thomann warranty (fact).
- Reviews: 4.6/5 from 259 ratings; 177 written reviews; only verified buyers may rate (fact).
- Shipping: free from 1.500 lei; product price 1.199 lei is below threshold (fact).
- Payment: COD, bank transfer, credit card (fact).
- Manufacturer: beyerdynamic GmbH & Co. KG, Theresienstraße 8, 74072 Heilbronn, Germany (fact).
- Sales rank: 12 in Studio Headphones (fact).
- Images: 14 product photos, 360-degree view, alt text present (fact).

## Claim ledger
- "în stoc și poate fi expediat imediat" — thomann.ro page — seller, first-party — verified (stock badge plus shipping link).
- "4.6 din 5 stele din 259 evaluări" — thomann.ro page — seller, first-party — verified (rating breakdown shown: 189 five-star, 53 four-star, 14 three-star, 2 two-star, 1 one-star).
- "transport gratuit de la 1.500 lei" — thomann.ro header — seller, first-party — verified; does not state cost below threshold (unsupported for sub-threshold orders).
- "3 Ani Garanţie Thomann" and "30 Garantarea rambursării banilor" — thomann.ro page — seller, first-party — verified (links to helpdesk pages).
- "STELLAR.45 driver" and spec values — thomann.ro page — seller, first-party — verified as listed; performance not independently tested (unknown).

## Product-data coverage
Title: present. Description: present (spec list). Image: present (14 photos, 360 view, alt text). Link: present. Price: present (1.199 lei). Availability: present (in stock). Condition: new (implied, not explicit). Brand: present (beyerdynamic). Identifiers: article 527377; GTIN and MPN unknown. Shipping: partial (free threshold only). Returns: present (30-day). Product markup: unknown (JSON-LD not visible in markdown snapshot). Gaps: condition, GTIN/MPN, exact shipping cost, structured data.

## Prioritized changes
1. Show shipping cost and ETA for this item below the free-shipping threshold (1199 is below 1500 lei). Issue: buyer cannot compute landed cost. Recommendation: render zone-based cost and ETA beside the price. Evidence: only "free from 1.500 lei" shown. Success signal: shipping cost visible without clicking through. Effort: low (templating).
2. Add or verify Product JSON-LD with price, availability, brand, MPN/GTIN, and review aggregate. Issue: structured data unobserved; eligibility for rich results unknown. Recommendation: emit schema.org Product, Offer, and AggregateRating. Evidence: no markup visible in snapshot. Success signal: Rich Results Test passes with no errors. Effort: medium.
3. Surface condition as "new" and show MPN/GTIN in the data sheet. Issue: condition implied, only internal article number shown. Recommendation: add condition field and manufacturer part number. Evidence: spec block lacks MPN and GTIN. Success signal: MPN visible and validated in Merchant Center. Effort: low.

## Unknowns and limits
- Crawl controls (robots/noindex) not checked. Product JSON-LD not visible in page source.
- Page speed and Core Web Vitals not measured; mobile path inferred from structure, not tested.
- Independent reviews or third-party test data not gathered; spec performance not verified.

## Sources
- https://www.thomann.ro/beyerdynamic_dt_900_pro_x.htm — 2026-08-28 — full page markdown (title, price 1.199 lei, in stock, specs, reviews 4.6/5 n=259, 30-day and 3-year terms, free-shipping threshold, manufacturer address, sales rank 12) — primary seller page — first-party — limitation: seller self-reported claims, no independent testing.
- https://www.thomann.ro/helpdesk_shipping.html — linked, not fetched — shipping policy — first-party — limitation: not read.
