# NEXT TASK — PDP v3 Scaling

## Goal

Apply the Retatrutide v3 PDP design to the next flagship peptide(s), starting with Semaglutide. The Retatrutide benchmark is complete and cemented. All patterns, components, and docs are in place. Now we propagate.

## Approach

Follow `docs/_governance/pdp_scaling_playbook.md` exactly.

Phase A: Per-peptide panel components (hardcoded data). One peptide per PR.

## First Peptide: Semaglutide (`/peptide/semaglutide`)

### In Scope
- Extend the v3 gate in `page.tsx` to include `semaglutide`
- Create `SemaglutideOverviewPanel.tsx` — stat cards, fit matrix, timeline, Ozempic vs Wegovy vs Reta comparison
- Create `SemaglutideEvidencePanel.tsx` — SUSTAIN/STEP trial data, mechanisms, gaps, observed
- Create `SemaglutideSafetyPanel.tsx` — GI profile, mitigation playbook, red lines
- Create `SemaglutideInteractionsPanel.tsx` — full interaction map (leverage existing JSON `interactions` field)
- Generate or source vial images (`semaglutide.png` + `semaglutide-sm.png`) per `vial_image_spec.md`
- Update Start Here bullets in `page.tsx` for semaglutide slug

### Out of Scope
- Generic/data-driven panels (Phase B — deferred until 3+ peptides are done)
- Changes to non-v3 PDPs
- Schema changes
- Any new features not present on the Reta page

## Success Criteria
- `/peptide/semaglutide` renders identically to `/peptide/retatrutide` in structure and design
- All 5 tabs function correctly
- Hash links work (`#evidence`, `#safety`, `#interactions`, `#considerations`)
- Mobile layout correct (sticky tab bar, swipe hint, single-column stack)
- Validators pass
- Build is green
- Git status is clean

## Verification Gates (run in order before commit)
1. `git status --short` — clean pre-change
2. `python3 scripts/validate/validate_pdp_contract_v1.py` — validators pass
3. `cd app/web && npm run build` — build passes
4. Visual check: `/peptide/semaglutide` on desktop + mobile
5. `git status --short` — only intended files changed
