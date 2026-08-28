# Missing-input case

Expected behavior: return `NEEDS_INPUT`, identify the missing public
product URL or usable snapshot, and avoid inventing product facts, availability,
markup, or recommendations.

Observed in an independent forward-test: the entry skill returned `NEEDS_INPUT`
and named both missing fields without making assumptions.
