# Server/Client Boundary Map v1

## Purpose
Define what runs on the server vs the client in Pep-Talk, and what data is allowed to cross the boundary. This is a stability and safety contract.

## Principles
- Server is the authority for: auth, entitlements, moderation, and privileged reads.
- Client is for: rendering, user interaction, and calling governed APIs.
- Never leak secrets or privileged data to the client.
- Prefer “thin client, governed server routes.”

## Server-only
### Environment + secrets
- `SUPABASE_SERVICE_ROLE_KEY`
- RevenueCat webhook secrets
- Any admin keys / internal tokens

### Auth + entitlements
- Session verification
- Role checks (admin/mod)
- Subscription/entitlement checks (RevenueCat)

### Moderation + UGC write paths
- UGC submit endpoints validate and store
- Moderation endpoints approve/reject/remove
- “Seen”/ops endpoints update operator state

### Content index reads (authoritative)
- Reading from `content/_index/*` and `content/_taxonomy/*` is allowed server-side.
- If a route returns derived data, it must return only the minimal safe shape required for UI.

## Client-only
- UI rendering components
- Form state, local validation (non-authoritative)
- Calling API routes for:
  - search
  - UGC submit/list (public-safe)
  - account/profile (user-safe)

## Data that may cross server → client
Allowed:
- Canonical public content (peptides/blends/topics/interactions/resources)
- Generated index outputs intended for UI (non-secret)
- User-safe account fields (no secrets)
- Public UGC content that has passed moderation rules

Disallowed:
- Service role keys, webhook secrets
- Raw admin audit payloads not intended for the UI
- Internal-only flags, private moderation notes, hidden diagnostics unless explicitly gated

## API boundary rules
- Client must never call Supabase with a service role key.
- Admin/mod routes must enforce role checks server-side.
- If a route is “admin”, it must never be reachable without server-side gating.

## Governance
Any change to boundary rules or any new API route that exposes new data shapes requires:
- Documentation update here
- Build-green proof
- Note in `docs/_status/current_state.md` describing the risk and why the exposure is safe
