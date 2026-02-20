# Current State

HEAD: c4ee6c2

Active focus:
- PDP Phase 1: reduce cognitive load via progressive disclosure + hierarchy tokens
- Retatrutide remains benchmark; changes must remain deterministic + validator-safe

Just landed:
- CollapsibleSection: desktop collapse supported + SSR-safe initial collapse (prevents wall-of-text flash)
- pt-collapse-title class introduced for nested collapse alignment + density
- repoRoot resolution hardened (best match rather than first match)

Locks:
- No schema drift
- Small atomic changes
- Build must be green before push

---
# Pep-Talk Current State (Authoritative)

Date: 2026-02-18  
Branch: main  
HEAD: 3ded412  
Commit message: PDP strategic pivot captured: moving away from stacked cards toward editorial hierarchy  

This document reflects actual repository state — not aspirational direction.

Always verify before trusting this file:

cd "$(git rev-parse --show-toplevel)" || exit 1  
git --no-pager log -1 --oneline  
git status --short  
python3 scripts/validate/validate_pdp_contract_v1.py  

Validator output is canonical truth for dataset counts.

---

# Constitutional Governance (New Anchor)

As of 2026-02-18, the following documents are constitutional and override older governance language where conflicts exist:

- docs/_constitution/pep-talk_human_and_tone_charter_v1.md  
- docs/_constitution/pep-talk_master_blueprint_v1.md  

If any governance, PDP doctrine, or editorial spec contradicts those documents, the constitution wins.

This includes tone, observational transparency, and product intent.

---

# System Health

Build: PASS (Next.js 16.1.6)  
Validators: PASS  
Working tree: expected clean before/after change sets  

No schema drift introduced in this session.  
No API contract changes introduced in this session.  

---

# Authoritative Catalog Counts (Validator)

PDP contract validator at this HEAD:

Peptides scanned: 92  
Blends scanned: 8  

Before citing counts in documentation, always re-run:

python3 scripts/validate/validate_pdp_contract_v1.py  

---

# UGC → Supabase (Production Verified)

Database: Supabase Postgres  
Schema: public.ugc_posts  

Statuses:

- pending  
- approved  
- rejected  
- archived  
- trash  

Flow verified:
submit → moderate → list → seen  

Admin gating:

Supabase session roles (admin | moderator)  
Legacy header fallback exists in some routes  

Seen/unseen:

Writes seen_at via /api/ugc/seen  

No schema expansion in this session.

---

# Sponsor System

Home page sponsor placement active.  
Click tracking endpoint verified in production.  
No sponsor changes in this session.

---

# PDP Strategic Pivot

This is the FIRST work intentionally initiating a gold-standard editorial PDP redesign.

Important clarification:

The redesign is NOT complete.

What exists today is scaffolding — not architecture.

---

# What Was Implemented (CSS-Only Scaffolding)

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

---

# What Is NOT Implemented

The true editorial hierarchy system does NOT exist.

We still have:

- pt-card stacking dominance  
- Uniform section boxing  
- No explicit Primary / Secondary / Utility system  
- No contrast zone system  
- No layered background architecture  
- No defined editorial layout spec  
- No component-level structural refactor  

PT_PDP_POLISH_V1 and V2 are visual refinements only — not architectural redesign.

---

# Partially Started But Incomplete

- Section weight differentiation experiments  
- Hero depth experiments  
- Molecule visual exploration (concept only)  
- Rhythm experimentation  

These changes are incomplete and not systematized.

---

# Functional Issues

“Things to Consider for Your Situation” module:

- No typeahead  
- No empty state guidance  
- No active filter indicators  
- Filtering logic may not function correctly  

Logged in parking lot.

---

# Retatrutide Standard

Retatrutide PDP defines aesthetic benchmark.

All redesign work must:

- Maintain governance integrity  
- Remain validator-safe  
- Avoid schema drift  
- Preserve deterministic rendering  

---

# Observational Transparency Policy (Updated)

Previous governance language in parts of the repo stated: “No dosing/protocols.”

This has been replaced with:

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

Clarity reduces harm more effectively than omission.

Non-directive education remains required.  
Prescriptive instruction remains prohibited.  
Observational transparency is allowed and required.

---

# Architectural Guardrails (Still Enforced)

- No schema drift  
- Validators must pass before commit  
- No multi-file mutation scripts  
- No blind JSX deletion  
- One scoped change-set per commit  
- Always build after structural edits  
- Stability-first doctrine enforced  

---

# PDP Editorial Governance Anchor

Canonical PDP editorial guidance lives in:

- docs/_governance/pdp_hero_build_governance_chat42.md  
- docs/_governance/pdp_editorial_doctrine.md  
- docs/_governance/design_spec_v2_pdp_editorial_architecture.md  

Phase 1 remains locked:

- Single-column, deterministic, mobile-first  
- No adaptive branching / decision-path UI  
- No schema drift  
- No right-rail in Phase 1  
- Retatrutide is aesthetic benchmark  
- No peptide-specific styling (system-wide tokens only)  
- CSS tokens + section-weight classes first (zero layout-break risk)  
- No component refactor until token layer stable  

Note:

Tone, observational dosing transparency, and modeling intent are now governed by the constitutional documents referenced above.

---

# Stability Doctrine

Build integrity > velocity.  
Determinism > experimentation.  
Validator truth > documentation claims.  
Constitution > legacy governance phrasing.  

Pep-Talk is moving toward editorial hierarchy architecture.

Scaffolding exists.  
Architecture does not yet.

No redesign proceeds beyond tokenization until implementation details are executed deterministically.
