# Current State
Date: 2026-02-27
Branch: main

Always verify before trusting this file:
```bash
cd "$(git rev-parse --show-toplevel)" || exit 1
git --no-pager log -1 --oneline
git status --short
python3 scripts/validate/validate_pdp_contract_v1.py
```

---

## System Health

Build: **PASS** (Next.js App Router)
Validators: **PASS**
Working tree: clean after every push
UGC → Supabase: **verified in production**

---

## Constitutional Governance (Authoritative Hierarchy)

1. **Constitutional** (override all): `docs/_constitution/pep-talk_human_and_tone_charter_v1.md`, `pep-talk_master_blueprint_v1.md`
2. **Governance** (authoritative specs): `docs/_governance/pdp_v3_standard.md` ← NEW ANCHOR, `pdp_scaling_playbook.md`, `vial_image_spec.md`
3. **Status** (this file + next_task.md + parking_lot.md)
4. **Code** — implements specs, not the other way around

---

## Authoritative Catalog Counts

Peptides: **92**
Blends: **8**
(Validator is truth — always re-run to confirm)

---

## What Is Complete (as of 2026-02-27)

### Retatrutide PDP v3 — Benchmark ✅
The Retatrutide page at `/peptide/retatrutide` is the gold standard PDP. Fully built and live.

**Hero:**
- `reta-hero-v2`: 3-column grid (vial / title+jumps / glass card)
- Mobile: single-column stack, small inline vial in title row
- Frosted glass posture card (Status chip, Context chip, Evidence grade, Disclaimer)
- "For your situation" pill → `#considerations`

**Body — Tab System:**
- `PDPTabs.tsx` — sticky tab bar with hash routing, hashchange listener, scroll-anchor community tab
- Start Here strip (3 orientation bullets, always visible above tabs)
- Sticky tab unit: bar + swipe hint travel together (mobile swipe hint is a tab tongue below bar)
- 5 tabs: Overview / Evidence / Safety / Interactions / For You
- Community below tabs (scroll anchor, outside tab panels)

**Panel Components (all complete):**
- `RetaOverviewPanel.tsx` — stat cards (~24%), fit matrix ✓/✗, timeline, comparison table
- `RetaEvidencePanel.tsx` — 6 signal tiles, Phase 2 trial stats (NEJM 2023), mechanism breakdown, gaps, observed block
- `RetaSafetyPanel.tsx` — side effect grid, 5-card mitigation playbook, 6 red lines, proportion closer
- `RetaInteractionsPanel.tsx` — 37 entries, live search + 5 category chips, tier badges (flag/watch/low)
- `PDPContextualConsiderations.tsx` — 43 packs, ghost typeahead, Enter-to-commit search

**Other site-wide improvements (this milestone):**
- `CollapsibleSection.tsx` — CSS grid animation, always in DOM for SEO
- `BackToTop.tsx` — floating button, site-wide via layout.tsx
- Jump links on all PDPs (reta: `reta-hero-v2__jump`; non-reta: `pt-hero-jump`)
- Mid-page community CTA on non-reta PDPs
- Shadow system upgraded globally
- `content/peptides/retatrutide.json` — plain-English interaction_summary and drug_classes

### Documentation ✅
- `docs/_governance/pdp_v3_standard.md` — new site-wide PDP standard
- `docs/_governance/pdp_scaling_playbook.md` — Phase A + Phase B scaling guide
- `docs/_governance/vial_image_spec.md` — ChatGPT vial generation specs
- Archived to `docs/_vault/`: `pdp_hero_build_governance_chat42.md`, `pdp_hero_v2_spec.md`, `pdp_layout_v1.md`, `design_spec_v2_pdp_editorial_architecture.md`

---

## What Is NOT Complete (Honest)

- **Only Retatrutide has v3 design.** 91 other peptides still use the non-v3 (`pt-card` / `pt-hero`) path.
- **Panel components are hardcoded** for Retatrutide. No generic data-driven panels exist yet (Phase B).
- **No vial images** for non-Retatrutide peptides (all fall back to `_generic.svg`).
- **Non-reta PDPs** are working but not upgraded — they render correctly via the `else` branch in `page.tsx`.

---

## Locks (Enforced)

- No schema drift
- No API contract changes
- Validators must pass before commit
- Build must be green before push
- One scoped change-set per commit
- Non-v3 PDPs untouched until deliberately planned per playbook

---

## Observational Transparency Policy

Pep-Talk may include (framed as descriptive, not instructive):
- Clinical dose ranges studied
- Study titration schedules
- Duration patterns studied
- Observed real-world patterns (explicitly labeled as such)
- Common stacking patterns

Must NOT include:
- Directive language ("you should", "start at", "take X")
- Personalized instruction or protocol steps

---

## UGC System

DB: Supabase Postgres → `public.ugc_posts`
Statuses: `pending | approved | rejected | archived | trash`
Flow verified: `submit → moderate → list → seen`
Admin gating: Supabase session roles (admin | moderator)
No schema expansion in this session.

---

## Sponsor System

Home page sponsor placement: active
Click tracking endpoint: verified in production
No sponsor changes in this session.
