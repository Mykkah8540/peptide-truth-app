# Pep-Talk Peptide PDP Model (v1)

## Purpose
This document defines the canonical, non-negotiable structure, tone, and intent
for all peptide detail pages (PDPs) in the Pep-Talk application.

This model prioritizes clarity, realism, and education without encouragement
or discouragement of use.

---

## Core Principle
This page exists to help a curious or already-exposed person understand:
- what this peptide is
- why people talk about it
- what it may do
- what to watch for
- where uncertainty still exists

---

## Section Order (LOCKED)

1. Header (identity + safety snapshot)
2. Plain-English Overview
3. Why People Are Interested
4. What It Appears to Do
5. Practical Considerations
   - Nutrition
   - Fitness & activity
6. Practical Risks & What to Watch For
7. Developmental / Special Population Notes
8. Evidence Snapshot
9. Regulatory & Scientific Uncertainty
10. References
11. Disclaimer

---

## Tone Rules (Non-Negotiable)

- Assume user intelligence
- Assume curiosity
- Assume some users are already using
- Educate holistically
- No scare language
- No moralizing
- No metadata leakage (population/confidence enums)
- No “curation pending” on live pages

---

## Section Definitions

### Plain-English Overview
2–4 sentences. No disclaimers. No metadata. No warnings.

### Why People Are Interested
Reflect real-world curiosity without endorsement.

### Practical Considerations
Explain how nutrition and activity interact with outcomes when relevant.
No macros, dosing, or plans.

### Practical Risks
Start with lived, common downsides before scientific or regulatory risks.

### Uncertainty Statement (Template)
While this peptide shows meaningful promise, much of what is known today comes
from animal studies and limited human trials. Ongoing research will determine
how these findings translate into approved clinical use.

---

## Stability Rule
This model must remain valid before and after FDA approval.
Only the regulatory section should materially change over time.


## Container ownership rule (pt-card)

To avoid “double card” layout regressions (extra padding/borders/blank cards), **only one layer may own the `pt-card` wrapper** for any section.

Allowed patterns:

- **Route-owned card:** the route wraps in `<section className="pt-card"> ... </section>` and any child component inside must render **no card wrapper** (or must be invoked with `wrapCard={false}` if supported).
- **Component-owned card:** the component renders its own `pt-card` wrapper and the route must **not** wrap it.

Hard rule:

- Never wrap a component in `pt-card` if that component already renders `pt-card` internally.
- If a section appears “bloated” or spacing doubles, first check whether both the route and the component are wrapping.

Project convention (current):

- Section components like `InteractionsSection`, `OutlookSection`, `DisclaimerSection`, `IdentityPanel` are expected to be **component-owned cards** unless explicitly refactored.
- Utility renderers like `ContentBlocks` / `EvidenceList` should be invoked with `wrapCard={false}` when the route already provides the card wrapper.

