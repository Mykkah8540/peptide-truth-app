# Current State
Date: 2026-03-01
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
2. **Governance** (authoritative specs): `docs/_governance/pdp_v3_standard.md`, `pdp_scaling_playbook.md`, `vial_image_spec.md`
3. **Status** (this file + next_task.md + parking_lot.md)
4. **Code** — implements specs, not the other way around

---

## Authoritative Catalog Counts

Peptides: **92**
Blends: **8**
(Validator is truth — always re-run to confirm)

---

## What Is Complete (as of 2026-03-01)

### All 92 Peptide PDPs — v3 Panel System ✅

Every peptide in the database has v3 panels. The v3 system replaced the old scrolling 2-col layout for all compounds.

**Architecture:**

- `V3_SLUGS` in `page.tsx` — all 92 slugs gated into v3 render path
- `PANEL_MAP` — per-slug component map (Overview, Evidence, Safety, Interactions)
- `V3_HERO_CONTENT` — per-slug hero `considerSub` text + 3 `startHere` bullets
- `getSupportPack()` in `supportLayer.ts` — per-slug SupportPack for PDPContextualConsiderations

**Per-compound components (4 per compound × 92 = 368 panel files):**

- `{Compound}OverviewPanel.tsx` — plain server component, overview content
- `{Compound}EvidencePanel.tsx` — plain server component, evidence signals
- `{Compound}SafetyPanel.tsx` — plain server component, safety flags (no `dot` in TIER_STYLE)
- `{Compound}InteractionsPanel.tsx` — `"use client"`, live search filter (has `dot` in TIER_STYLE)

**Last batch committed:** 912a10d (palmitoyl-pentapeptide-4, palmitoyl-tripeptide-1, vip, ziconotide)

### Retatrutide PDP — Benchmark Design ✅

The Retatrutide page at `/peptide/retatrutide` is the gold-standard PDP with full custom design.

**Hero:** `reta-hero-v2` — 3-col grid (vial / title+jumps / glass card), mobile single-col stack

**Body — Tab System:**

- `PDPTabs.tsx` — sticky tab bar, hash routing, hashchange listener
- Start Here strip (3 orientation bullets above tabs)
- 5 tabs: Overview / Evidence / Safety / Interactions / For You
- Community below tabs (scroll anchor, outside panels)

**Premium panels:**

- `RetaOverviewPanel.tsx` — stat cards, fit matrix, timeline, head-to-head comparison
- `RetaEvidencePanel.tsx` — 6 signal tiles, NEJM 2023 trial stats, mechanisms, gaps
- `RetaSafetyPanel.tsx` — side effect grid, 5-card mitigation playbook, 6 red lines
- `RetaInteractionsPanel.tsx` — 37 entries, live search + 5 category chips
- `PDPContextualConsiderations.tsx` — 43 SupportPacks, ghost typeahead, Enter-to-search

### Site-Wide Infrastructure ✅

- `CollapsibleSection.tsx` — CSS grid animation, always in DOM (SEO-safe)
- `BackToTop.tsx` — floating button site-wide via layout.tsx
- Jump links on all PDPs
- Shadow/glass system upgraded globally
- Global PDP Fix Directives codified in charter + governance docs

### Documentation ✅

- `docs/_governance/pdp_v3_standard.md` — site-wide PDP standard + Global Fix Directives
- `docs/_governance/pdp_scaling_playbook.md` — Phase A + Phase B scaling guide + compliance checklist
- `docs/_constitution/pep-talk_human_and_tone_charter_v1.md` — Section 10 panel rules added
- `docs/_governance/vial_image_spec.md` — ChatGPT vial generation specs

---

## What Is NOT Complete (Honest)

- **Peptide-to-peptide stacking interactions** — if Retatrutide interacts with BPC-157, that appears on the Retatrutide page but not the BPC-157 page (and vice versa). Cross-compound interaction parity has not been audited. This is the next planned pass.
- **Phase B — Generic panels** — all 368 panel files are hardcoded per-compound. The deferred refactor to data-driven `<OverviewPanel peptide={data} />` components has not been done.
- **Start Here bullets are hardcoded** in `page.tsx` `V3_HERO_CONTENT`. Not yet JSON-driven.
- **Vial images** — most compounds fall back to `_generic.svg`. Only retatrutide has a custom vial.
- **Blends** — 8 blends have no v3 panels and placeholder content throughout.
- **JSON content completeness** — many peptides still have pending placeholder text in their `.json` files for fields like `classification.category`, `structure.sequence_oneletter`. These are legacy content fields that predate the v3 panel system; the panels don't depend on them, but they surface in the conformance report.

---

## Locks (Enforced)

- No schema drift
- No API contract changes
- Validators must pass before commit
- Build must be green before push
- One scoped change-set per commit

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

---

## Sponsor System

Home page sponsor placement: active
Click tracking endpoint: verified in production
