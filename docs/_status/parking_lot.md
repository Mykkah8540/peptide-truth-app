# Pep Talk Parking Lot
Deferred ideas, open questions, and future enhancements

Nothing in this file is approved for build unless promoted into an authoritative spec.

## PDP
- [PDP] “Things to Consider for Your Situation” search: no typeahead suggestions; search appears non-functional; needs guidance/empty-state + working typeahead.
 Contextual Exploration Phase 2
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
- Home page exists (not a placeholder); future enhancements require an authoritative spec before build.
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


## Admin and Moderator Tooling

Deferred / polish (do not build until explicitly promoted):
- Ops panel: add `/api/admin/health` (DB connectivity, content index age, env sanity)
- Flags: expand beyond current `admin_flags` usage (documented keys, descriptions, safe defaults, audited changes)
- Audit UI: filtering/pagination/export polish (if not already present)
- Diag endpoint: restrict `/api/admin/diag` to admin-only or behind env flag (temporary debug)

## UGC Moderation Hardening

- Seen/counts must reflect DB truth deterministically
- Clear operator-facing error reporting + empty states
- Bulk actions / rate limiting / abuse safeguards (future)


## Sponsor System Governance
- Define sponsor rotation rules, disclosure copy, and eligibility criteria
- Document UTM conventions and click tracking expectations
- Ensure no influence over educational content; maintain strict separation

## Things to Consider for Your Situation — Search UX is broken
- The “Things to Consider for Your Situation” search function appears non-functional (no results / no guidance).
- UX needs typeahead suggestions (search suggestions should populate as you start typing).
- Add empty-state guidance: what the user can search for + example queries.
- Verify: keyboard input → suggestions → selection → filters/anchors/blocks update as expected.
