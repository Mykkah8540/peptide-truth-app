Pep-Talk Current State (Authoritative)
Date: 2026-02-14
Branch: main
HEAD: b10eb66
Commit message: PDP strategic pivot captured: moving away from stacked cards toward editorial hierarchy

This document reflects actual repository state — not aspirational direction.

Always verify before trusting this file:

cd "$(git rev-parse --show-toplevel)" || exit 1
git --no-pager log -1 --oneline
git status --short
python3 scripts/validate/validate_pdp_contract_v1.py


Validator output is canonical truth for dataset counts.

System Health

Build: PASS (Next.js 16.1.6)
Validators: PASS
Working tree: expected clean before/after change sets

No schema drift introduced in this chat.
No API contract changes introduced in this chat.

Data Integrity

Validator is authoritative.

Historical validator output during this session showed:

Peptides scanned: 94

Blends scanned: 9

Later documentation referenced:

92 peptides

8 blends

This discrepancy indicates either:

Content was removed between commits

Validator was run before index update

Documentation was written manually without re-verification

Rule going forward:
Validator output overrides documentation claims.

Before writing counts into docs, always re-run:

python3 scripts/validate/validate_pdp_contract_v1.py

UGC → Supabase (Production Verified)

Database: Supabase Postgres
Schema: public.ugc_posts
Statuses:

pending

approved

rejected

archived

trash

Flow verified:
submit → moderate → list → seen

Admin gating:

Supabase session roles (admin | moderator)

Legacy header fallback exists in some routes

Seen/unseen:

Writes seen_at via /api/ugc/seen

No schema expansion in this chat.

Sponsor System

Home page sponsor placement active.
Click tracking endpoint verified in production.
No sponsor changes in this chat.

PDP Strategic Pivot (This Chat)

This is the FIRST chat intentionally initiating a gold-standard editorial PDP redesign.

Important clarification:

The redesign is NOT complete.

What exists today is scaffolding — not architecture.

What Was Implemented (CSS-Only Scaffolding)

PT_PDP_POLISH_V1 (hero elevation + softened card rhythm)

PT_PDP_POLISH_V2 (section weight refinement + pill styling + divider refinement)

Inline SVG replacement for lucide dependency

Red flag visual accent refinement

Typography weight adjustments

Input styling refinement

All changes:

CSS-only

No schema edits

No component contract edits

No API changes

Build passes.

What Is NOT Implemented

The true editorial hierarchy system does NOT exist.

We still have:

pt-card stacking dominance

Uniform section boxing

No explicit Primary / Secondary / Utility system

No contrast zone system

No layered background architecture

No defined editorial layout spec

No component-level structural refactor

PT_PDP_POLISH_V1 and V2 are visual refinements only — not architectural redesign.

Partially Started But Incomplete

Section weight differentiation experiments

Hero depth experiments

Molecule visual exploration (concept only)

Rhythm experimentation

These changes are incomplete and not systematized.

Functional Issues

“Things to Consider for Your Situation” module:

No typeahead

No empty state guidance

No active filter indicators

Filtering logic may not function correctly

Logged in parking lot.

Retatrutide Standard

Retatrutide PDP defines aesthetic benchmark.

All redesign work must:

Maintain governance integrity

Remain validator-safe

Avoid schema drift

Preserve deterministic rendering

Remain educational (no dosing/protocols)

Architectural Guardrails

No schema drift

Validators must pass before commit

No multi-file mutation scripts

No blind JSX deletion

One scoped change-set per commit

Always build after structural edits

Stability-first doctrine enforced

Next Required Step

Design Spec v2 now exists (canonical) and doctrine is locked.

Next work must be zero-risk:
- Add CSS editorial tokens + section-weight classes (no component edits yet)
- Keep validators + build green
- One scoped change-set per commit

No redesign code proceeds beyond tokenization until the spec implementation details are executed deterministically.


## PDP Editorial Governance Anchor (HEAD 638a931, 2026-02-15)

Canonical PDP editorial guidance now lives in:
- Doctrine (authoritative posture, narrative order, non-negotiables)
  - docs/governance/pdp_editorial_doctrine.md
- Design Spec v2 (canonical blueprint)
  - docs/_governance/design_spec_v2_pdp_editorial_architecture.md

Phase 1 is locked:
- Single-column, deterministic, mobile-first
- No adaptive branching / decision-path UI
- No schema drift
- Non-directive education only (no dosing, no protocols, no medical advice)
- Primary sections move toward unboxed (reduce stacked-card dominance)
- Right-rail banned in Phase 1
- Retatrutide is benchmark; no peptide-specific styling (system-wide tokens only)
- CSS tokens + section-weight classes first (zero layout-break risk); no component edits yet

Authoritative catalog counts (PDP contract validator at this HEAD):
- Peptides scanned: 94
- Blends scanned: 9

Notes:
- PT_PDP_POLISH_V1/V2 are scaffolding/polish, not the full editorial architecture.
- Avoid duplicate PDP specs under docs/_status; canonical spec lives under docs/_governance.
