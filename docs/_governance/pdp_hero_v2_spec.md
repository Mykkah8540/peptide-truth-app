PDP Hero v2 Specification
Status: Draft v1.0
Scope: Phase 1 — Retatrutide Implementation Target Only
Doctrine: Stability-first, validator-safe, deterministic rendering

Purpose
Define the Hero as the authoritative identity anchor of the PDP.
Replace visual card dominance with typographic authority and spatial weight.

Non-Negotiables
- No schema drift
- No API changes
- No content contract mutation
- No layout wrapper refactor
- No grid system introduction
- No right-rail
- No dependency additions
- Must render deterministically with existing data

Phase Boundary
This spec applies only to:
- Retatrutide PDP (initial implementation target)

After validation, system-wide rollout may occur.

Hero Responsibilities (Locked)

The Hero must answer immediately:
1. What is this?
2. How mature is the evidence?
3. Where does it fit conceptually?

Hero Composition (Content Blocks)

1. Canonical Title
- Large typographic anchor (H1)
- No decorative icon
- No badge clutter
- Strong weight, disciplined spacing

2. Status Category (Signal Chip)
- Approved / Investigational / Preclinical etc.
- Rendered as subdued signal token
- Not a loud badge
- Inline beneath title

3. Taxonomy Context Line
- Small framing line
- Example: "Metabolic · Weight · GLP-1 / GIP / GCGR context"
- Low contrast
- Secondary typographic hierarchy

4. Evidence Posture Signal (Summary Only)
- 1–2 sentence maturity signal
- No citations
- No expandable list
- No research blocks
- Pure narrative authority

5. Framing Orientation Line
- 1–2 sentence neutral educational orientation
- Explains why the molecule matters in conversation
- Non-directive
- No prescriptive directives
- Observational transparency allowed when lane-separated (Clinical Evidence vs Observed Patterns)

What Is Explicitly Excluded
- No citation lists
- No expandable accordions
- No UGC
- No interaction blocks
- No stack discussion
- No red flag blocks
- No buttons competing with content
- No call-to-action marketing elements

Visual Architecture

Primary Characteristics
- Open layout (no .pt-card wrapper)
- Generous vertical spacing
- No border box
- No heavy container shadow
- No section icons

Spacing Rhythm
- Title → 16–24px breathing
- Signal lines grouped tightly
- Large margin below Hero before Overview begins

Typography Hierarchy
H1:
- Dominant scale
- Strong weight
- Tight but controlled letter spacing

Status + Taxonomy:
- Smaller than H1
- Subdued color token
- Consistent spacing

Evidence Posture:
- Normal body scale
- Slight emphasis via weight, not color

Framing Line:
- Neutral tone
- Not visually louder than evidence signal

Watermark Rule (Optional Token — Default OFF)

If enabled:
- Ultra-low contrast molecule texture
- Non-illustrative
- Must not compete with title
- Must pass distraction test
- If it draws the eye before the H1, remove it

Default state:
Watermark OFF.

Card Elimination Rule

The following must NOT use .pt-card:
- Hero
- Overview
- Evidence Posture

Hero is an editorial open section.

Retatrutide Benchmark Standard

Retatrutide must:
- Feel lighter than current implementation
- Have stronger vertical authority
- Remove stacked-card feel
- Clearly separate identity from depth content
- Set the aesthetic standard for all PDPs

Determinism Check

Hero must render correctly if:
- Taxonomy keys are empty
- Evidence posture is minimal
- Status category is long-form string
- No optional watermark token

No conditional rendering that causes layout shift.

Phase 1 Implementation Order (Locked)

1. Remove .pt-card wrapper from Hero (Retatrutide only)
2. Adjust spacing tokens
3. Adjust typography scale
4. Soften status token styling
5. Validate build
6. Validate visual hierarchy
7. Commit single scoped change

No other components touched in same commit.

Exit Criteria

Hero v2 is approved when:
- Retatrutide PDP feels editorial, not boxed
- Visual hierarchy is obvious without color reliance
- No regression in layout stability
- No schema or validator errors
