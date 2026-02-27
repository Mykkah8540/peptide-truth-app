PDP Hero v2 Specification
Status: Approved v2.0 (Micah approved 2026-02-26 via mockup)
Scope: Phase 1 — Retatrutide Implementation Target Only
Doctrine: Stability-first, validator-safe, deterministic rendering

Purpose
Define the Hero as the authoritative identity anchor of the PDP.
Replace visual card dominance with typographic authority, spatial weight, and frosted glass depth.

Non-Negotiables
- No schema drift
- No API changes
- No content contract mutation
- No layout wrapper refactor outside of .pt-benchmark scope
- No grid system introduction globally (grid is scoped to .reta-hero-v2 only)
- Must render deterministically with existing data

Phase Boundary
This spec applies only to:
- Retatrutide PDP (initial implementation target)

After validation, system-wide rollout may occur (Phase 8).

Hero Responsibilities (Locked)

The Hero must answer immediately:
1. What is this?
2. How mature is the evidence?
3. Where does it fit conceptually?

Hero Composition (Layout)

Three-column grid (desktop):
- Column 1 (~190px): Vial image
- Column 2 (1fr): Title + quick jumps + overview content + CTA
- Column 3 (~310px): Frosted glass rail cards

Mobile behavior:
- Single-column stack at ≤899px
- Column order preserved (vial → main content → rail cards)

Column 1 — Vial
- VialImage component (peptide slug)
- Vertically aligned to top of grid, centered horizontally
- Drop shadow filter only (no card border in this column)

Column 2 — Main Content (left to right reading order)

1. H1 Canonical Title
- Playfair Display, font-size: clamp(44px, 5vw, 62px), weight 900
- Color: --reta-navy (#1a2038)
- Letter spacing: -0.03em
- No icon, no badge, no status chip

2. Quick Jumps Row
- Pill links: Evidence | Safety | Interactions | Community
- Small (12px), lightweight border, frosted glass tint
- "Quick jumps:" label prefix at 60% opacity

3. Overview Section
- "Overview" heading in Playfair Display, 22px, with 1px border-bottom rule
- ContentBlocks rendered below (hideHeading: true — heading rendered separately)
- Prose content only; no card wrapping

4. CTA
- "Join the conversation →" with framing context ("Real-world notes from people who've tried it")
- Pill shape with frosted glass background
- Non-dominant (does not compete with title)

Column 3 — Glass Rail

Card 1: Identity + Posture
- Status: [value] — key/value pair
- Context: [value] — key/value pair
- Evidence posture sentence: "<Grade>. This page is a descriptive overview..."
- Framing orientation sentence: "What it is, why people care..."
- No expandable accordion
- No citation list

Card 2: Start Here
- "Start here" heading in Playfair Display
- 3 checkmark bullet points (✓ prefix, custom list styling)
- Static authored content — not data-driven
- Must be legible without interaction

Visual Architecture

Background
- Page/hero background: --reta-bg (#eef1f7 ice-blue base)
- Molecular watermark texture: /assets/textures/molecular-watermark.png
  - Tiled (background-repeat: repeat)
  - Size: 600px auto
  - Low contrast; must not compete with title

Frosted Glass Cards
- background: rgba(255,255,255,0.52)
- backdrop-filter: blur(24px)
- -webkit-backdrop-filter: blur(24px)
- border: 1px solid rgba(255,255,255,0.65)
- border-radius: 20px
- box-shadow: 0 8px 32px rgba(0,0,0,0.06)

Typography Hierarchy

H1 (Canonical Title):
- Font: Playfair Display (via --font-playfair CSS variable; fallback: Georgia, serif)
- Weight: 900
- Scale: clamp(44px, 5vw, 62px)
- Color: --reta-navy (#1a2038)

Section Headings (Overview, Start Here):
- Font: Playfair Display
- Weight: 700
- Scale: 18–22px

Body / Rail content:
- Font: system sans-serif (inherited)
- Scale: 12–14px in rail cards

Color Tokens (scoped to .pt-benchmark)
- --reta-bg: #eef1f7 (ice-blue page base)
- --reta-navy: #1a2038 (headings, body text)
- --reta-glass: rgba(255,255,255,0.52) (frosted card background)
- --reta-glass-blur: blur(24px)
- --reta-glass-border: rgba(255,255,255,0.65)

Watermark Rule

Watermark is ON by default for Retatrutide benchmark.
- Must remain non-illustrative, ultra-low contrast, texture-like
- Must not compete with H1 title
- If it draws the eye before the H1, adjust opacity or remove

Card Elimination Rule

The following must NOT use .pt-card:
- Hero (v2 uses .reta-hero-v2 with .reta-glass-card)
- Overview (rendered inside Column 2, no wrapper)

CSS Scope Discipline
- All new classes (.reta-hero-v2, .reta-glass-card, .reta-hero-v2__*, .reta-glass-card__*) are Retatrutide-specific
- No global .pt-card mutation
- No global .pt-hero mutation for the v2 path (v2 exits the .pt-hero wrapper)

Determinism Check

Hero must render correctly if:
- Taxonomy keys are empty (topicLabel falls back gracefully)
- Evidence posture is minimal (evidenceLabel has a default)
- Status category is long-form string (rendered as-is in rail card)
- Vial image missing (VialImage falls back to _generic.svg)
- No backdrop-filter support (cards still visible as white background)

Phase 1 Implementation Order (Locked)

1. Update spec (this document) — done
2. Add Playfair Display font variable to layout.tsx via next/font/google
3. Add RETA_HERO_V2_GLASS CSS block to globals.css
4. Restructure Retatrutide hero JSX in page.tsx to 3-column grid
5. Remove Start Here section from body grid (now lives in glass rail)
6. Validate build
7. Validate visual hierarchy: title dominant, rail subordinate, no overlap
8. Commit single scoped change-set

No other components touched in same commit.

Exit Criteria

Hero v2 is approved when:
- Retatrutide PDP feels editorial and spatially rich, not boxed
- Three columns visible on desktop; single column on mobile ≤899px
- Visual hierarchy is obvious: H1 dominant, rail informational
- No regression in layout stability
- No schema or validator errors
- No text overlap between columns
- Frosted glass cards visible against watermark background
