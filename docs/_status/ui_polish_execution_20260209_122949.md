# UI + Content Polish Execution (2026-02-09T12:29:49)

## Source
- docs/ui/Master_UI_and_Content_Polish.md

## Blueprint headings
- # Pep Talk
- # Master UI, Content, and Governance Blueprint
- ## Exhaustive, migration-grade specification (decisions + reasoning + copy + file-level instructions)
- ### File target: `docs/ui/Master_UI_and_Content_Polish.md`
- ## 0. Core reality and product stance
- ### 0.1 Reality we are designing around
- ### 0.2 What Pep Talk is
- ### 0.3 What Pep Talk is not (explicit non-goals)
- ### 0.4 Regulation-proof content principle (internal law)
- #### How regulation-proofing applies by section
- ### 0.5 Quiet positioning line (brand anchor)
- ### 0.6 Ethical stance (why this is right)
- ## 1. Global messaging (final copy) and what it replaces
- ### 1.1 Final headline system (approved)
- ### 1.2 What this replaces (explicit)
- ### 1.3 Disclaimer placement rule (locked)
- ## 2. IA and content strategy (what exists, what we’re moving to)
- ### 2.1 Primary pillars (locked)
- ### 2.2 Depth modes (framing)
- ### 2.3 Gender and population nuance
- ## 3. Section-by-section: CURRENT STATE → TARGET STATE (prescriptive)
- ### 3.1 Peptide PDPs
- #### Current state (common failure modes)
- #### Target state
- #### Replace/insert requirements
- #### File-level instructions (expected)
- ### 3.2 Wellness Paths
- #### Current state
- #### Target state
- #### File-level instructions
- ### 3.3 Resources
- #### Current state
- #### Target state
- #### File-level instructions
- ### 3.4 Commercial Blends (PDP-style, supplier-available combo products)
- #### The problem to solve
- #### Target state
- #### Mandatory content structure for blend pages
- #### File-level instructions
- ### 3.5 Stacks (curated + community)
- #### Product distinction (locked)
- #### Target state
- #### Explore Stacks architecture
- #### File-level instructions
- ## 4. Community knowledge: the whole scope (comments + stacks) — everything decided
- ### 4.1 Core principle (locked)
- ## 5. Peptide PDP Community Comments (full design + rules + auth + moderation)
- ### 5.1 What it is
- ### 5.2 What it is NOT
- ### 5.3 Page-local only rule (hard lock)
- ### 5.4 Public read + auth write (locked)
- ### 5.5 Edit/Delete (locked)
- ### 5.6 Moderation posture for peptide comments (light-touch)
- ### 5.7 Required UI copy (final, verbatim)
- ### 5.8 Placement rules
- ### 5.9 Authentication UX rules
- ### 5.10 Data model + RLS (must-have)
- ### 5.11 Server actions and error posture
- ### 5.12 UI component boundaries
- ## 6. Community Stacks (UGC) — submission, validation, review, publication
- ### 6.1 Submission requirements (locked)
- ### 6.2 Review flow (locked)
- ### 6.3 Regex policy (final intent)
- ### 6.4 Explore stacks split (locked)
- ## 7. Guardrails: upgrade without breaking everything (locked)
- ## 8. Chronological implementation order (dependency-aware)
- ## 9. Acceptance criteria (definition of “done”)
- ## 10. Final product law (never drift)

## Extracted requirements (auto)
Convert these into tasks. Lines are referenced by line number in the blueprint.

- L3: ## Exhaustive, migration-grade specification (decisions + reasoning + copy + file-level instructions)
- L58: ### 0.4 Regulation-proof content principle (internal law)
- L59: Pep Talk content must remain accurate whether peptides are:
- L77: - They never imply:
- L151: ### 1.3 Disclaimer placement rule (locked)
- L153: Do not scare users mid-exploration with defensive language.
- L159: ### 2.1 Primary pillars (locked)
- L172: - never forced
- L177: - do not overclaim; keep it contextual
- L179: - do not imply medical decision-making
- L193: They must:
- L203: #### File-level instructions (expected)
- L222: #### File-level instructions
- L241: #### File-level instructions
- L258: They do NOT:
- L265: Every blend page must include:
- L273: #### File-level instructions
- L281: #### Product distinction (locked)
- L286: Stacks must be framed as:
- L297: #### File-level instructions
- L300: - Community stacks section must show “approved” label; no hype sorting
- L306: ### 4.1 Core principle (locked)
- L314: ## 5. Peptide PDP Community Comments (full design + rules + auth + moderation)
- L325: ### 5.3 Page-local only rule (hard lock)
- L328: - do not populate elsewhere
- L329: - do not create stacks
- L330: - do not change peptide content
- L331: - do not feed “recommended” anything
- L333: ### 5.4 Public read + auth write (locked)
- L337: ### 5.5 Edit/Delete (locked)
- L342: - Do not censor experience language.
- L345: ### 5.7 Required UI copy (final, verbatim)
- L374: ### 5.10 Data model + RLS (must-have)
- L382: - auth insert
- L399: ### 6.1 Submission requirements (locked)
- L407: ### 6.2 Review flow (locked)
- L431: ### 6.4 Explore stacks split (locked)
- L439: ## 7. Guardrails: upgrade without breaking everything (locked)
- L461: ## 9. Acceptance criteria (definition of “done”)
- L466:   - auth post
- L478: ## 10. Final product law (never drift)

## P0 punch list (derived from our already-decided UI work)
- Navbar: center menu above centered search; ensure Account icon spacing from “My Peps”
- Rename “Blends” labeling to “Commercial Blends” (supplier-available combo products)
- Blends: remove paywall (public) to cleanly separate from Stacks (user-assembled)
- Home: add “Recent Stacks” section (gated; show teaser + upgrade prompt when not Pro/logged-in)
- Verify peptide PDP comments (already implemented) matches blueprint placement + copy

## Next: implementation order (P0 → P1)
P0-1) Navbar/menu/search alignment + labels
P0-2) Blends gating + copy
P0-3) Home “Recent Stacks” section
P0-4) Sweep copy replacements (headline system + disclaimers)
