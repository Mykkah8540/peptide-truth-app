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
