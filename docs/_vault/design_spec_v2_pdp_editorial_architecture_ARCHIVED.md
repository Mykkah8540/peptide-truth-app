Design Spec v2: PDP Editorial Architecture
Status: Draft v1.1 (requires Micah approval before redesign code)
Benchmark PDP: Retatrutide
Doctrine: Stability-first, validator-safe, non-directive education

Purpose
Create a gold-standard editorial PDP system that replaces stacked-card dominance with an Apple-level hierarchy:
- clearer scanning
- fewer boxes
- stronger visual rhythm
- explicit section weight model
- deterministic behavior
- governance-safe posture (not medical advice; no prescriptive directives; observational transparency allowed in lane-separated form)


## Observational Transparency Policy (Constitution-Aligned)

Pep-Talk may include:
- Clinical dose ranges studied
- Study titration schedules
- Duration patterns studied
- Observed real-world titration patterns
- Common stacking patterns
- Common discontinuation reasons

These must be framed in two clearly separated lanes:
Clinical Evidence
Observed Patterns

Pep-Talk must NOT include:
- Directive language (“you should,” “start at,” “take X”)
- Personalized instruction
- Prescriptive protocol steps

Non-negotiables
- No schema drift
- Validators must pass before commit
- One scoped change-set per commit
- No feature expansion while core modules are non-deterministic
- UGC must not become canonical content

Locked Decisions (Micah)
Molecule watermark in hero
- Allowed only as an optional global design token
- OFF by default
- Must be non-illustrative, ultra-low contrast, texture-like
- Must never compete with title/CTA
- If distracting, remove immediately

Icons in section titles
- Allowed only for Utility sections
- Must be inline SVG (no dependencies)
- Primary/Secondary sections rely on typography + spacing, not icons
- Icons must be rare

Primary sections: remove pt-card
- Yes: Primary becomes “editorial open sections” (no border box)
- Primary weight is achieved via:
  - spacing rhythm
  - dividers
  - background zones / contrast zones
  - typographic hierarchy
- Secondary and Utility may remain boxed

Right-rail
- Banned for Phase 1
- Phase 1 must be single-column, deterministic, mobile-first
- Right-rail is Phase 2 only

Retatrutide accents
- Neutral system-wide (no Retatrutide-only styling)
- Retatrutide is the benchmark, not a special snowflake
- Any accent must be a global token usable across all PDPs

Section Classes
Primary
Definition: Highest editorial weight, open layout, minimal chrome
Examples:
- Hero / identity
- Overview
- Evidence posture
- Practical summary (only if real authored content exists)
Rules:
- minimal or no container border
- most open on mobile (not collapsed by default)
- uses contrast zones and dividers to separate content

Secondary
Definition: Supporting substance that deepens understanding without competing for attention
Examples:
- What people discuss and why it matters
- Interactions
- Safety and cautions
- Evidence list (when present)
Rules:
- may be boxed
- may be collapsible on mobile depending on density
- consistent subhead hierarchy and spacing rhythm

Utility
Definition: Tools and interpretive helpers; must fail-soft and never hijack narrative
Examples:
- “Things to Consider for Your Situation” contextual module
- Anchor navigation (Phase 2 candidate)
- Right-rail (Phase 2 only)
Rules:
- must be deterministic
- must degrade gracefully if no data/matches
- icons allowed (inline SVG only), rare

Phase Plan
Phase 1 (Retatrutide benchmark, but system-wide tokens)
- Single-column only
- Implement section class system (Primary open; Secondary/Utility boxed)
- Establish global tokens for:
  - spacing rhythm
  - dividers
  - contrast zones
  - optional watermark (OFF by default)
- No right-rail

Phase 1 Guardrails
- No redesign code until this spec is approved by Micah
- No new components unless explicitly promoted into an approved spec
- Functional repair of “Things to Consider…” remains required before UX expansion

Open Questions (to resolve before code)
- Exact mobile spacing scale (token values)
- Which Secondary sections are collapsible by default
- Divider style and placement rules between open Primary sections
- Where (if anywhere) Utility modules appear in Phase 1 without right-rail
