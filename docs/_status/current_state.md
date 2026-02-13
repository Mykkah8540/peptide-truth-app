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


CURRENT STATE — ADMIN SYSTEM (AS OF 9afda08)

What Was Completed

1. Deterministic Role System (Server-Side Only)

- Created public.user_roles table in Supabase
- Enforced deterministic role resolution via:
  - supabaseAdmin() (service role key)
  - Server-only role reads
- Removed dependency on client session for role checks
- hasAnyRole() + getUserRoles() now:
  - Ignore client supabase instance
  - Always read from public.user_roles
  - Use service role key
  - Fail closed

Status: Production-grade and stable.

2. Supabase Environment Hardening

Verified:

- SUPABASE_URL matches project
- SUPABASE_SERVICE_ROLE_KEY present in Vercel
- NEXT_PUBLIC_SUPABASE_ANON_KEY present
- Service role JWT decodes correctly

/api/admin/diag confirms:

- service key active
- roles visible
- userId correct
- role array returns ["admin"]

Status: Fully validated across:

- Local build
- Vercel deployment
- Signed-in browser session

3. Admin Control Panel Foundation

Routes created:

- /admin
- /admin/ugc
- /admin/flags
- /admin/ops
- /admin/audit
- /admin/roles

Layout:

- Real admin shell
- Sidebar nav
- Sticky nav on desktop
- Header with logout + back to site
- Clean dashboard tile landing

Status: Structural UI complete.

4. Roles Manager (Admin-Only)

Built:

- /admin/roles UI
- Admin-only access enforcement
- POST API: /api/admin/roles
- Add/remove moderator or admin
- Uses service role client
- Redirects after mutation
- Typed fix for Supabase "never" error

Security:

- Only users with admin role may mutate roles
- Moderators cannot manage access control
- Fail closed if role lookup fails

Status: Functional + secure.

5. Diagnostic Endpoint

/api/admin/diag

Purpose:

- Validate Supabase ref
- Validate service key presence
- Validate role resolution
- Validate userId visibility

Used to solve:

- Missing service role key
- Wrong project mismatch
- RLS visibility errors

Status: Working. Should be removed before public maturity.

6. Build State

Current HEAD:

- 47abdd3 DB: add admin_events migration scaffold

Origin matches local.
Build green.
No untracked files.
Deployment active.
Admin dashboard accessible.

RUNNING TRACKER UPDATE

Completed

- Deterministic server-side role resolution
- Service role client
- Admin shell
- Roles manager
- Secure role enforcement
- Environment verified on Vercel
- Diagnostic verification endpoint

In Progress

- None.

Not Started

- Everything listed in Parking Lot.

READY FOR NEW CHAT HANDOFF

In the next chat you should paste:

- Current HEAD commit
- Statement: “Admin system live. Role resolution verified.”
- Parking Lot list
- Which system you want to build next

