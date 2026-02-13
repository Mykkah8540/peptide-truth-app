# Pep-Talk Current State (Authoritative)

Date: 2026-02-03
Branch: interactions-glp-batch1-20260127

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
UGC storage has been migrated from file-based JSON to Supabase-hosted Postgres and is verified end-to-end:

- Database: Supabase Postgres (pooler) via `UGC_DATABASE_URL` (fallback: `DATABASE_URL`)
- Schema: `public.ugc_posts` exists with statuses: `pending|approved|rejected|archived|trash`
- Runtime verification: submit → moderate(approve) → list(approved) confirmed working against DB
- Admin auth: protected endpoints require header `x-admin-token` matching `PEP_TALK_ADMIN_TOKEN`
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

---

## Account System Status

Current:

- Users can sign up
- Users can log in
- Users can log out
- Account page exists

Missing:

- Password change flow
- Email change flow
- Session management UI
- Account security settings

Password change has been added to Parking Lot as a secondary priority.

