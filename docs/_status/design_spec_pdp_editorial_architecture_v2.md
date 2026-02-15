Design Spec v2: PDP Editorial Architecture
Status: Draft v1 (requires Micah approval before redesign code)
Benchmark PDP: Retatrutide
Doctrine: Stability-first, validator-safe, non-directive education

Purpose
Create a gold-standard editorial PDP system that replaces stacked-card dominance with an Apple-level hierarchy:
- clearer scanning
- fewer boxes
- stronger visual rhythm
- explicit section weight model
- deterministic behavior
- governance-safe posture (no dosing, no protocols, no medical advice)

Non-negotiables
- No schema drift
- Validators must pass before commit
- One scoped change-set per commit
- No feature expansion while core modules are non-deterministic
- UGC must not become canonical content

Section classes

Primary sections
Definition: Highest visual weight. Establish identity, posture, and core understanding.
Examples:
- Identity / hero
- Overview
- Evidence posture
- Practical summary (only if real authored content exists)
Rules:
- limited to the minimum set required for comprehension
- most “open” on mobile (not collapsed by default)
- minimal container chrome

Secondary sections
Definition: Supporting substance that deepens understanding without competing for attention.
Examples:
- What people discuss and why it matters
- Interactions
- Safety and cautions
- Evidence list (when present)
Rules:
- may be collapsible on mobile depending on density
- consistent spacing rhythm and subhead hierarchy
- lighter visual treatment than Primary

Utility sections
Definition: Tools and interpretive helpers, visually quieter, must fail-soft.
Examples:
- “Things to Consider for Your Situation” contextual module
- Anchor navigation
- Sidebar / right-rail (experiment)
Rules:
- must not hijack the editorial narrative
- must be deterministic
- must degrade gracefully if no data/matches

Visual weight system

Typography
- H1: disciplined scale, strong weight, restrained letter spacing
- Section titles: consistent sizes per class (Primary > Secondary > Utility)
- Subtext: used for framing lines only, not dense blocks

Spacing rhythm
- define a strict vertical rhythm system (8px grid)
- introduce breathing room zones between primary content blocks
- remove repeated “border-box” rhythm as the default pattern

Contrast zones and card reduction strategy
- not every section is boxed
- cards reserved for:
  - interactive modules
  - dense lists/tables
  - UGC
- editorial narrative sections should read like a document, not a dashboard
- layered background depth system allowed but restrained and non-gimmick

Hero re-architecture

Hero must include
- canonical name (H1) with gravitas
- single primary signal (risk)
- identity support: aliases / sequence as secondary
- optional single action (jump link), no action clutter
- optional single posture line (non-directive)

Hero must avoid
- multiple competing badges
- chip overload
- heavy container stacking above the fold

UGC integration (governance-safe)
- UGC follows editorial foundation
- clearly labeled as community experiences/discussion
- empty states encourage contribution without implying medical direction
- moderation posture is explicit; UGC never presented as canonical truth

Protein & Hydration widget (concept)
Purpose
- context-driven interpretive support, not a prescription engine
Placement
- Utility section adjacent to contextual considerations OR under practical summary as a quiet helper
Rules
- no “you should”
- no dosing, timing, protocol steps
- language: “people often discuss,” “signals people track,” “experiences vary”

Phased rollout plan

Phase 1: Retatrutide (benchmark)
- implement full hierarchy system on Retatrutide only
- validate build + validators
- capture before/after screenshots and lock the pattern

Phase 2: Expand to top PDPs
- apply system to priority peptides
- document edge cases and codify rules

Phase 3: Rollout across catalog
- systematic adoption
- add guardrails to prevent regression into stacked-card dominance

Acceptance criteria
- Visual: clear Primary/Secondary/Utility hierarchy, reduced boxing, calm editorial flow
- Functional: utility modules deterministic or fail-soft
- Governance: non-directive posture preserved
- Engineering: build green, validator green, small commits
