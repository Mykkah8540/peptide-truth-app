# Pep Talk Parking Lot
Deferred ideas, open questions, and future enhancements

Nothing in this file is approved for build unless promoted into an authoritative spec.

## PDP Contextual Exploration Phase 2
- Suggested queries personalized by peptide
- Condition clusters
- Visual indicators for limited data
- Optional citations toggle
- Retrieval-only AI synthesis with no advice

## Gender and Hormonal Context Layer
- Sex-based biological differences in signaling
- Life-stage framing
- Must remain descriptive, not prescriptive

## Community Experience Signals
- Qualitative synthesis of themes
- No ratings, likes, or scores
- No implied endorsement

## Admin and Moderator Tooling
- Review queue UI for community stack submissions
- Comment moderation dashboard
- Regex flag visibility
- Soft-delete restore
- Approval and rejection audit trail

## PDP Layout Enhancements
- Right-rail contextual widgets
- Progressive disclosure
- Jump links
- Visual balance improvements

## Home Landing Page Concepts
- Audience self-identification entry points
- Choose-your-depth onboarding
- Clear articulation of Pep Talk’s role
- Routing to pillars

## Wellness Paths Expansion
- Expanded category list
- Cross-linking with peptides and resources
- System-first framing

## Resources Backbone
- Science literacy guides
- How to read claims
- Research quality and uncertainty
- Regulation evolution education

## Analytics and Insight
- Anonymous aggregation of search terms for gap analysis only
- Must not optimize for conversion or hype

## Promotion Rule
Items move out of this file only when:
- a dedicated authoritative spec is written
- governance implications are resolved
- scope is explicitly approved

## RBAC + Admin Portal
- Adopt RBAC via `user_roles` table (roles: admin, moderator).
- `/admin` becomes the canonical admin entry (uses normal Supabase auth; role gated).
- UGC moderation should allow role: admin OR moderator.
- Defer “UGC metadata/audit trail fields” (ip hash, user agent, seen_by, moderated_by, admin_events) until post-polish/build-complete.

- UGC metadata + audit trail (post-level + admin events) AFTER UI polish is complete:
  - ugc_posts: seen_by, submit_ip_hash, submit_user_agent, moderated_at, moderated_by
  - ugc_admin_events table for moderation actions + auth failures
  - optional /api/ugc/stats endpoint + moderation velocity metrics

- Admin Control Panel (SaaS dashboard + multi-tool hub):
  - Role Management UI (/admin/roles): admin-only create/remove moderator/admin roles, with email lookup and guardrails
  - Feature Flags UI (/admin/flags): safe toggles + descriptions + change history
  - Audit Trail UI (/admin/audit): moderation/event log with filtering/export
  - Ops UI (/admin/ops): health checks, queue snapshots, maintenance tools
  - Admin UI polish: better nav, sectioning, design consistency, mobile-first layout


WHAT WE DID NOT BUILD YET (PARKING LOT)

These are real, unfinished system layers.

1. Audit Logging System (CRITICAL)

We built:

- Role mutations
- Moderation actions
- Future flags control

But we did NOT:

- Create admin_events table
- Log:
  - role adds/removes
  - UGC moderation actions
  - flag toggles
- Build /admin/audit viewer UI
- Add pagination
- Add filters by event type

This is required for:

- Forensic traceability
- Governance integrity
- Production accountability

Status: Not implemented.

2. Feature Flags System (HIGH PRIORITY)

We scaffolded:

- /admin/flags
- /api/admin/flags (exists but not wired to DB-backed toggle system)

Missing:

- site_flags table
- GET flags endpoint
- POST mutation endpoint
- Audit logging
- Safe defaulting
- Server-side gating helper
- UI toggle controls

Flags needed for:

- UGC submission enable/disable
- Dev unlock control
- Stack suggestions enable/disable
- Temporary system lockdown

Status: Not implemented.

3. Ops Panel (HIGH PRIORITY)

We scaffolded /admin/ops.

Missing:

- /api/admin/health
- DB connectivity check
- Content index age check
- Environment sanity display
- Supabase ref display
- RevenueCat webhook verification
- Cron/job queue visibility (future)

This becomes the system heartbeat.

Status: Not implemented.

4. UGC Moderation Hardening (MEDIUM)

We have:

- UGC routes
- Moderation endpoints

Missing:

- Audit trail
- Moderator attribution
- Moderation status history
- Bulk moderation tools
- Rate limiting
- Abuse safeguards
- Auto-flag logic
- Moderator dashboard metrics

Status: Basic only.

5. Admin Guard Rails

Missing:

- Double confirmation on role deletion
- Protection from self-demotion
- Protection from removing last admin
- Rate limiting on role endpoint
- CSRF protection verification

Status: Minimal protections.

6. Diag Endpoint Removal

Before maturity:

- Remove /api/admin/diag
- Or restrict to admin only
- Or put behind env flag

Currently public.

Status: Temporary debug endpoint.

7. Governance / Source-of-Truth Alignment

Not touched in this session:

- Content validator hardening
- Canonical JSON schema enforcement improvements
- Content index rebuild verification tooling
- Automated integrity checks

Status: Deferred.

8. UI / UX Polish

Not done:

- Active nav highlighting
- Breadcrumbs
- Better dashboard stats tiles
- Mobile admin nav behavior improvements
- Admin-only badge in header
- Inline toast success/failure messaging

Status: Cosmetic backlog.

OUTSTANDING ARCHITECTURAL LAYERS

- Admin Events System
- Flags System
- Ops Health Panel
- Moderation Audit Trail
- Production Lockdown Mode
- Remove debug endpoints
- Admin metrics dashboard

SECONDARY NEED — ACCOUNT PASSWORD CHANGE

Users should be able to change their password from the account page (desktop priority, still responsive).

Scope:

- Add password change UI to /account
- Use Supabase auth.updateUser({ password })
- Require current session
- Confirmation messaging
- Handle error states (weak password, expired session)
- Optional: require reauthentication if session age > threshold

Security considerations:

- No password fields logged
- Rate limit attempts
- Clear success/failure states
- Consider future: email verification on password change

Status: Not implemented.

