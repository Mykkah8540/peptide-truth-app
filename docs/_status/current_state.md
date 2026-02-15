# Pep-Talk Current State (Authoritative)

Date: 2026-02-14
Branch: main (HEAD 6198bab)

## System Health

- Build: PASS (Next.js app/web builds clean when gates are run)
- Validators: PASS (core validators and index rebuild pipeline operational)
- Repo state: expected clean working tree before/after changes

## What Is Implemented (Reality, Not Aspirational)

### Risk Badge Integration
Risk index UI integration is implemented:
- `content/_index/risk_index_v1.json` is used by the web app via `app/web/lib/riskIndex.ts`
- `RiskBadge` exists at `app/web/components/RiskBadge.tsx`
- Peptide PDP and Blend PDP render risk badge through IdentityPanel when risk info is available

### PDP Tone + Structure
PDP rendering is aligned with mission:
- Educational only (no dosing/protocols)
- Practical, neutral voice
- No debug/metadata leakage in user-facing content
- Practical risks phrasing avoids fear framing and signals rarity appropriately
- Interactions and Evidence sections behave deterministically with sane empty states

### UGC → Supabase Postgres (LIVE)

### Sponsor System (Test + Verified in Prod)
- Home page includes a sponsored placement module (currently test sponsor: ACME Lab).
- Sponsor link includes UTM params (note: HTML renders `&amp;` escapes; unescape to see raw `&`).
- Click tracking endpoint verified in production:
  - `POST /api/sponsor-click` with `{id, href}` returns `{ok:true}`
  - Vercel logs show `POST /api/sponsor-click 200`

UGC storage has been migrated from file-based JSON to Supabase-hosted Postgres and is verified end-to-end:

- Database: Supabase Postgres (pooler) via `UGC_DATABASE_URL` (fallback: `DATABASE_URL`)
- Schema: `public.ugc_posts` exists with statuses: `pending|approved|rejected|archived|trash`
- Runtime verification: submit → moderate(approve) → list(approved) confirmed working against DB
- Admin auth: role-gated via Supabase session roles (admin|moderator) using `public.user_roles` (token header remains as legacy fallback where present).
- Seen/unseen: admin selection marks `seen_at` in DB via `/api/ugc/seen`

Code locations (authoritative):
- DB pool: `app/web/lib/ugc/db.ts`
- Store: `app/web/lib/ugc/store.ts`
- Routes: `app/web/app/api/ugc/{submit,list,moderate,seen}/route.ts`
- Admin UI: `app/web/app/admin/ugc/page.tsx`

API contracts (verified):
- Submit: `POST /api/ugc/submit`
  Body: `{ "type":"peptide|blend", "slug":"...", "username":"...", "text":"...", "ack_no_dosing": true }`
- List approved: `GET /api/ugc/list?type=peptide|blend&slug=...`
- Moderate (admin): `GET /api/ugc/moderate?status=pending|approved|...&limit=...` (header `x-admin-token`)
  `POST /api/ugc/moderate` body: `{ "id":"...", "status":"approved|rejected|archived|trash|pending", "reason": null|string }`
- Seen (admin): `POST /api/ugc/seen` body `{ "id":"..." }` (header `x-admin-token`)

TLS behavior (explicit):
- Dev: Node pg pool uses TLS with `rejectUnauthorized: false` to avoid local cert-chain issues.
- Prod: pool enforces verification with `rejectUnauthorized: true` (requires proper CA trust in deployment).

## Known Stale Docs (Fixed in repo when updated)
If any doc claims “risk badge not implemented” or “next action is integrate risk badge,” it is stale.

## NEXT SINGLE ACTION (Strict Scope)

UGC production hardening (no feature creep):
- Keep UGC working in dev + production (TLS verification plan for prod)
- Confirm admin UGC UI marks `seen_at` and counts align with DB truth
- Improve UGC error reporting + empty states (no new schemas)
- Run gates and commit small, scoped changes
## Guardrails (Non-Negotiable)

- Repo is truth, not chat
- Do not invent schemas, file paths, or content contracts
- No dosing, no protocols, no vendor links, no affiliate logic
- Always prove wires before edits
- Always run gates before commit

## Admin System (Reality)

- Admin area routes exist: `/admin`, `/admin/ugc`, `/admin/flags`, `/admin/ops`, `/admin/audit`, `/admin/roles`
- Access model:
  - `/admin/*` is gated server-side by `public.user_roles` (roles: `admin`, `moderator`)
  - `/admin/roles` mutations are admin-only
  - UGC admin APIs use `isUgcAdmin` (admin|moderator; legacy header token may exist in some routes)
- Audit + traceability:
  - `admin_events` logging is present for admin mutations that already write events (e.g., flags/roles where implemented)
  - `/admin/audit` + `/api/admin/audit` exist (viewer is read-only)

## Most Recent Changes (This Merge)

- Removed “Global Pro Override” control from `/admin/ugc` UI (no flags control in moderation screen).
- NavBar:
  - Fetches `/api/viewer` and surfaces an “Admin” link when `profile.is_admin` is true.
  - Fixed MobileMenu prop mismatch that was breaking `next build`.


## PDP Visual & UX Status (Retatrutide Gold Standard)

### Data Integrity
• Peptides: 92
• Blends: 8
• PDP contract validation: PASSING
• No schema drift
• No new dependencies introduced

---

### Strategic Direction

Retatrutide is the gold standard PDP.

All PDPs must:
- Feel editorial, structured, and intentional
- Reflect Apple-level hierarchy and clarity
- Avoid visual flatness
- Emphasize contrast between content sections
- Maintain deterministic governance (validators first)

---

### Completed Work

• Support Layer system added and rendering on PDP
• Inline SVG replacement for lucide dependency (removed external icon dep)
• Softened card borders
• Subtle hero elevation (PT_PDP_POLISH_V1)
• Section spacing rhythm adjustments
• Pill styling utility (.pt-pill)
• Title divider visual refinement (PT_PDP_POLISH_V2)
• Input field styling improvements
• Red flag visual accent bar
• Typography weight refinement
• All builds passing (Next.js 16.1.6)
• All validators passing

---

### Partially Implemented (Not Finished)

• PT_PDP_POLISH_V2 hierarchy refinement
• Hero depth and molecule visual layering
• Section weight differences (Evidence vs Support vs Context vs Red Flags)
• Interactive micro-motion polish
• Visual rhythm improvements between stacked pt-card sections

---

### Not Implemented

• Protein & Hydration widget (concept only)
• Scientific visual fill (molecule diagrams / editorial depth assets)
• Contextual search typeahead
• Search empty-state guidance
• Contextual search filtering logic
• Dynamic hero refinement
• Sidebar / right-rail treatment exploration
• Scroll-based section anchoring refinement
• Visual differentiation between PDP and homepage tone

---

### Known Functional Issues

• "Things to Consider for Your Situation" search:
  - No typeahead suggestions
  - No empty-state messaging
  - No active filter indication
  - May not filter content at all

• PDP pages still visually flatter than homepage
• Homepage contrast model not yet applied to PDP

---

### Architectural Guardrails (Non-Negotiable)

• No schema drift beyond contract
• Validators must pass before commit
• No interactive shell-breaking commands
• Small atomic commits only
• CSS-only changes unless explicitly authorized
• Retatrutide defines aesthetic benchmark

---

## END PDP STATUS
