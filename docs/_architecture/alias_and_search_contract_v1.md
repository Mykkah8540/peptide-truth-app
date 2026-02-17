# PDP + SEARCH + ALIAS + COMMENTS + UGC PLUMBING
Pep-Talk / Peptide Truth
Exhaustive wiring map from current repo state (as observed in terminal output)

This document is the authoritative “where does data come from + what files participate” map for:
- PDP page rendering for /peptide/[slug]
- Content loaders (content JSON + generated indices)
- Alias/synonym plumbing (entity + blend + category synonyms)
- Risk index loader
- Support layer loader
- Peptide comments (Supabase table-backed, authenticated)
- UGC posts (direct Postgres pool, moderation workflow)
- Validation guardrails that enforce PDP contract constraints

No marketing language. No “future plan” speculation. Concrete file paths and flows only.


## 1) PDP PAGE ENTRYPOINT AND ITS IMPORT GRAPH

Primary route (Next.js App Router):
- app/web/app/peptide/[slug]/page.tsx

Observed imports in that file (source of truth: your ripgrep output):
- @/lib/riskIndex
- @/components/MaturityPostureLabel
- @/components/VialImage
- @/components/AliasSequenceMini
- @/lib/content
- @/lib/supportLayer
- @/components/SupportLayerSection
- @/components/ContentBlocks
- @/components/EvidenceList
- @/components/InteractionsSection
- @/components/PDPContextualConsiderations
- @/components/PeptideCommentsSection
- @/components/CollapsibleSection

This list matters because it defines the full dependency surface that can affect PDP runtime.


## 2) PDP PRIMARY DATA LOADERS (WHAT THE PDP CALLS)

In app/web/app/peptide/[slug]/page.tsx, the PDP calls these loaders:

2.1 Risk loader
- getRiskForPeptide(slug)
- Source: app/web/lib/riskIndex.ts
- Backed by: content/_index/risk_index_v1.json (generated artifact)

2.2 Content loader
- loadPeptideBySlug(slug)
- Source: app/web/lib/content.ts
- Backed by: content/peptides/<slug>.json (canonical content file)

2.3 Support layer loader
- getSupportPack(doc)
- Source: app/web/lib/supportLayer.ts
- Produces: SupportPack | null
- Used by: app/web/components/SupportLayerSection.tsx

2.4 Alias loader
- getAliasesForSlug(slug)
- Source: app/web/lib/content.ts
- Backed by: synonym/alias maps built from taxonomy file
- Displayed via: app/web/components/AliasSequenceMini


## 3) CONTENT LOADER: EXACT FILES + RULES

File:
- app/web/lib/content.ts

3.1 repoRoot() logic
- Purpose: resolve repo root regardless of whether Next runs with cwd at repo root OR app/web
- Marker used: content/_index/entities_v1.json
- It walks up multiple directory candidates until it finds that marker
- This behavior exists in both:
  - app/web/lib/content.ts
  - app/web/lib/riskIndex.ts
Meaning: content loading is designed to tolerate cwd variance.

3.2 listEntities(kind)
- Reads: content/_index/entities_v1.json
- Extracts:
  - peptides[] or blends[]
  - slug, route, canonical_name/name, short_name
- Also attaches:
  - aliases: getAliasesForSlug(slug)

3.3 loadPeptideBySlug(slug)
- Reads: content/peptides/<slug>.json
- Normalizes: if doc.slug missing, sets doc.slug = slug

3.4 loadBlendBySlug(slug)
- Reads: content/blends/<slug>.json
- Normalizes similarly

3.5 Topics loader (present in same file)
- Reads: content/topics/pages/<slug>.json
- Normalizes a slug field for convenience
(Topics are adjacent plumbing but not the core of this PDP wiring doc.)

3.6 Alias maps: buildAliasMaps()
- Builds:
  - aliasToSlugs: Map(term -> slugs[])
  - slugToAliases: Map(slug -> aliases[])
- Source taxonomy file:
  - content/_taxonomy/search_synonyms_v1.json
- Specifically ingests:
  - doc.entity_synonyms
  - doc.blend_synonyms
- Noted in-file comment:
  - category_synonyms exists but is not used by current list pages yet

3.7 Alias accessors
- getAliasesForSlug(slug)
  - returns __aliasMaps.slugToAliases.get(slugLower) || []
- expandQuery(q)
  - tokenizes query, includes tokens, expands tokens via aliasToSlugs, includes full phrase, de-dupes
- filterByQuery(rows, q)
  - checks base fields + alias list
  - match logic is substring include on haystack text


## 4) TAXONOMY + GENERATED INDEX ARTIFACTS (CONTENT-LAYER PLUMBING)

4.1 Synonyms taxonomy file (source of truth)
- content/_taxonomy/search_synonyms_v1.json
Contains:
- entity_synonyms
- category_synonyms
- blend_synonyms

Runtime usage today:
- entity_synonyms: USED (alias maps)
- blend_synonyms: USED (alias maps)
- category_synonyms: PRESENT but NOT used in expandQuery/filterByQuery for list pages (per code comment + observed behavior)

4.2 Search routing index (generated)
- content/_index/search_routes_v1.json
Observed to reference many routing keys, including:
- peptide_search_index:canonical_name
- peptide_search_index:short_name
- peptide_search_index:aliases
- synonyms:entity_synonyms
- synonyms:blend_synonyms
- synonyms:category_synonyms

Important distinction:
- app/web/lib/content.ts is implementing direct synonym expansion from taxonomy file
- search_routes_v1.json is a generated routing definition that can drive more complex search route resolution elsewhere
This doc does not assume where search_routes_v1.json is executed unless the repo shows that code path; it is enumerated here because it is explicitly part of the search plumbing surface you surfaced.

4.3 Core entity index (generated)
- content/_index/entities_v1.json
Used by:
- app/web/lib/content.ts repoRoot marker and listEntities
Used indirectly by:
- listPeptides/listBlends pages and any entity listings

4.4 Risk index (generated)
- content/_index/risk_index_v1.json
Used by:
- app/web/lib/riskIndex.ts loadRiskIndex()

4.5 Interactions indices (generated)
Present in content/_index (observed by ls):
- interactions_v1.json
- interactions_to_peptides_v1.json
These are not directly shown in the snippet you pasted from PDP, but they are part of the repo’s content plumbing and likely feed InteractionsSection. If InteractionsSection reads them, that wiring lives inside:
- app/web/components/InteractionsSection.tsx
and/or the libs it imports (not shown in your pasted output). This doc marks them as “present artifacts” and flags them for explicit mapping when you run the same import-graph scan on InteractionsSection.

4.6 Category taxonomy files (canonical taxonomy keys)
- content/_taxonomy/peptide_categories_v1.json
- content/_taxonomy/blend_categories_v1.json
These define stable taxonomy keys and “no free-text drift” posture.


## 5) RISK INDEX PLUMBING

File:
- app/web/lib/riskIndex.ts

5.1 loadRiskIndex()
- Reads: content/_index/risk_index_v1.json
- Caches result in module-level _cache
- Validates format:
  - version === "v1"
  - entities is array

5.2 accessors
- getRiskForRoute(route)
- getRiskForPeptide(slug) -> getRiskForRoute(`peptide:${slug}`)
- getRiskForBlend(slug) -> getRiskForRoute(`blend:${slug}`)

5.3 evidence grade UI mapping
- evidenceGradeLabel(grade)
- EVIDENCE_GRADE_LABELS maps internal enums to friendly user copy
This is part of the “no enum leakage” doctrine.


## 6) SUPPORT LAYER PLUMBING

File:
- app/web/lib/supportLayer.ts

6.1 getSupportPack(entity)
- Detects incretin family via:
  - interactions.drug_classes includes "antidiabetics-insulin-glp1"
  - OR slug fallback list: retatrutide, tirzepatide, semaglutide, cagrilintide
- Returns:
  - SUPPORT_INCRETIN (SupportPack) OR null

6.2 Render surface
- app/web/components/SupportLayerSection.tsx
- PDP uses:
  - {supportPack ? <SupportLayerSection pack={supportPack} /> : null}

Support layer is entirely server-derived (based on entity doc fields) and does not call DB.


## 7) PEPTIDE COMMENTS PLUMBING (SUPABASE)

Directory (observed):
- app/web/app/api/peptide-comments/
Contains:
- create/route.ts
- delete/route.ts
- list/route.ts
- update/route.ts

Client surface:
- app/web/components/PeptideCommentsSection.tsx
Fetches:
- GET /api/peptide-comments/list?slug=<slug>
- POST /api/peptide-comments/create
- POST /api/peptide-comments/update
- POST /api/peptide-comments/delete

Server auth + DB client:
- All peptide-comments route handlers import:
  - supabaseServer from "@/lib/supabase/server"
- This is Supabase SSR client using anon key + cookies session

7.1 list route
File:
- app/web/app/api/peptide-comments/list/route.ts
Behavior:
- reads slug and limit from query
- uses supabaseServer()
- queries:
  table: peptide_comments
  selects: id, peptide_slug, user_id, display_name, content, created_at
  filters:
    peptide_slug == slug
    deleted_at IS null
    removed == false
  order: created_at desc
  limit: (max 200)

7.2 create route
File:
- app/web/app/api/peptide-comments/create/route.ts
Behavior:
- expects body: { slug, content }
- validates:
  slug present
  content present
  content length <= 2000
- auth:
  supa.auth.getUser() must return user
- derives displayName from profiles:
  supa.from("profiles").select("display_name,email").eq("id", user.id).maybeSingle()
  display_name OR email prefix OR "Member"
- inserts into peptide_comments:
  fields: peptide_slug, user_id, display_name, content
- returns inserted row selection

7.3 supabase server client
File:
- app/web/lib/supabase/server.ts
Behavior:
- requires env:
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY
- uses next/headers cookies()
- createServerClient(url, anon, { cookies: get/set/remove })
- cookie writes are best-effort and no-op outside route handlers/server actions
This is a stability guard to prevent render-time crashes.

Comments system is Supabase table-backed and session-authenticated.


## 8) UGC PLUMBING (DIRECT PG POOL + MODERATION)

This is separate from peptide-comments.

8.1 UGC store
File:
- app/web/lib/ugc/store.ts
Imports:
- ugcPool from "@/lib/ugc/db"

DB surface:
- table: public.ugc_posts

Entity type constraint (in code):
- export type UgcEntityType = "peptide" | "blend"

Key functions:
- listApproved(entityType, entitySlug)
  selects from public.ugc_posts where type+slug and status='approved'
- submitPost({ entityType, entitySlug, username, text, flags })
  inserts into public.ugc_posts with status 'pending'
- moderatePost({ id, status, reason })
  updates status/status_reason/updated_at
- listByStatus(status, limit)
  lists by status
- markSeen(id)
  updates seen_at = coalesce(seen_at, now())

8.2 UGC DB pool
File:
- app/web/lib/ugc/db.ts
Behavior:
- connection string env:
  UGC_DATABASE_URL OR DATABASE_URL
- sanitizes connection string by removing sslmode/uselibpqcompat query params
- creates pg.Pool with:
  max: 10
  ssl:
    production: rejectUnauthorized true
    dev: rejectUnauthorized false
- stores singleton in global.__pt_ugc_pool to avoid reload thrash

8.3 UGC admin auth
File:
- app/web/lib/ugc/adminAuth.ts
Auth methods:
- Token auth:
  header: x-admin-token
  env: PEP_TALK_ADMIN_TOKEN
  timingSafeEqual compare
- Supabase role auth:
  uses supabaseServer()
  getUserSafe(supa)
  hasAnyRole(supa, user.id, ["admin","moderator"])
Exports:
- getUgcAdminContext(req)
- isUgcAdmin(req)

8.4 UGC API routes observed
From your grep output:
- app/web/app/api/ugc/submit/route.ts
  uses submitPost + detectDosingOrProtocol
- app/web/app/api/ugc/list/route.ts
  uses listApproved
- app/web/app/api/ugc/moderate/route.ts
  uses isUgcAdmin + listByStatus + moderatePost
- app/web/app/api/ugc/seen/route.ts
  uses isUgcAdmin + markSeen
- app/web/app/api/admin/ugc/stats/route.ts
  uses isUgcAdmin + ugcPool + queries public.ugc_posts

8.5 UGC UI surfaces observed
- app/web/app/admin/page.tsx links to /admin/ugc
- app/web/app/admin/_components/AdminNav.tsx has /admin/ugc
- app/web/app/admin/ugc/page.tsx
  uses localStorage pt_ugc_read_ids
  calls:
    /api/ugc/moderate
    /api/ugc/seen
- app/web/components/UgcNotesSection.tsx
  fetches /api/ugc/list and posts /api/ugc/submit
- app/web/components/StackSuggestionForm.tsx
  posts /api/ugc/submit
- app/web/components/SuggestStackForm.tsx
  posts /api/ugc/submit
- app/web/app/stack/suggest/page.tsx
  renders StackSuggestionForm

UGC is a distinct system: direct Postgres pool + admin moderation + no-dosing detector.


## 9) PDP CONTRACT VALIDATOR (GUARDRAILS)

File:
- scripts/validate/validate_pdp_contract_v1.py

Enforces:
- No PLACEHOLDER tokens anywhere in content/peptides or content/blends JSON (nested scan of all string fields)
- No internal leak markers in app/web source:
  - PEP_TALK__
  - NO_RETURN_EMPTY_OBJECT
  - CAST_RELATED_INTERACTIONS
- Banned jargon phrases (user-facing language constraints):
  - includes mechanistic_only, with a special exception:
    mechanistic_only is allowed ONLY as evidence_grade structured JSON value

Scanner boundaries:
- ignores .next and node_modules under app/web
- scans source suffixes: ts/tsx/js/jsx/md/mdx

This validator is part of “stability-first doctrine” enforcement for PDP content.


## 10) WHAT WE HAVE NOT EXPLICITLY MAPPED YET (KNOWN GAPS, NOT GUESSING)

Based on what you pasted, these are present on PDP but their internal data dependencies were not printed in your snippet:

- app/web/components/InteractionsSection.tsx
- app/web/components/EvidenceList.tsx
- app/web/components/PDPContextualConsiderations.tsx
- app/web/components/ContentBlocks.tsx
- app/web/components/MaturityPostureLabel.tsx
- app/web/components/VialImage.tsx
- app/web/components/CollapsibleSection.tsx

They are in the PDP import graph.
We have not enumerated:
- which content/_index artifacts they read
- whether they query Supabase or use content JSON only
- whether they use search_routes_v1.json directly

To map those, the same “import graph + ripgrep key strings” scan must be run per component.
This doc intentionally does not invent those wiring paths.


## 11) REPRODUCIBLE INVESTIGATION COMMANDS (SAFE, SMALL, NO TERMINAL-KILL)

Use these to complete mapping for any component:

11.1 Import graph for a component
FILE="app/web/components/<Component>.tsx"
rg -n '^import ' "$FILE" || true

11.2 Find content/_index usage
rg -n "content/_index|risk_index_v1|entities_v1|interactions_v1|search_routes_v1" -S app/web/components app/web/lib || true

11.3 Find Supabase usage
rg -n "supabaseServer\\(|from\\(\"[A-Za-z0-9_]+\"\\)\\.select|auth\\.getUser" -S app/web || true

11.4 Find direct Postgres usage
rg -n "ugcPool\\(|new Pool\\(|pool\\.query\\(" -S app/web || true

11.5 Find taxonomy/synonym usage
rg -n "search_synonyms_v1|entity_synonyms|blend_synonyms|category_synonyms|getAliasesForSlug|buildAliasMaps" -S app/web content || true


## 12) EXECUTION RULES (DOCTRINE)

- Do not add new schema unless explicitly allowed by governance (and you already have “locked” areas).
- Do not wire category_synonyms into query expansion without explicit design guardrails; it can explode matching.
- Keep changes atomic: one file or one concern per commit.
- Always run validators and a build after wiring edits.
- Keep UI from leaking internal enums; use mapping functions like evidenceGradeLabel().


## 13) QUICK REFERENCE: FILE PATHS LIST (ALL LOCATIONS DISCUSSED)

PDP page:
- app/web/app/peptide/[slug]/page.tsx

Content loader + alias plumbing:
- app/web/lib/content.ts
- content/_taxonomy/search_synonyms_v1.json
- content/_index/search_routes_v1.json
- content/_index/entities_v1.json

Risk plumbing:
- app/web/lib/riskIndex.ts
- content/_index/risk_index_v1.json

Support layer plumbing:
- app/web/lib/supportLayer.ts
- app/web/components/SupportLayerSection.tsx

Peptide comments (Supabase):
- app/web/components/PeptideCommentsSection.tsx
- app/web/app/api/peptide-comments/list/route.ts
- app/web/app/api/peptide-comments/create/route.ts
- app/web/app/api/peptide-comments/update/route.ts
- app/web/app/api/peptide-comments/delete/route.ts
- app/web/lib/supabase/server.ts

UGC (direct PG pool):
- app/web/lib/ugc/store.ts
- app/web/lib/ugc/db.ts
- app/web/lib/ugc/adminAuth.ts
- app/web/app/api/ugc/submit/route.ts
- app/web/app/api/ugc/list/route.ts
- app/web/app/api/ugc/moderate/route.ts
- app/web/app/api/ugc/seen/route.ts
- app/web/app/api/admin/ugc/stats/route.ts
- app/web/app/admin/ugc/page.tsx
- app/web/app/admin/page.tsx
- app/web/app/admin/_components/AdminNav.tsx
- app/web/components/UgcNotesSection.tsx
- app/web/components/StackSuggestionForm.tsx
- app/web/components/SuggestStackForm.tsx
- app/web/app/stack/suggest/page.tsx

Validator:
- scripts/validate/validate_pdp_contract_v1.py

Taxonomy keys:
- content/_taxonomy/peptide_categories_v1.json
- content/_taxonomy/blend_categories_v1.json
- content/_index/interactions_v1.json
- content/_index/interactions_to_peptides_v1.json
  (present artifacts; InteractionsSection wiring not yet enumerated in this doc)


## 14) WHAT “EXHAUSTIVE” MEANS HERE

This document is exhaustive for:
- everything you pasted into the terminal output
- every file path that was directly surfaced in your grep/ls/sed output
- the concrete runtime loaders and DB touchpoints we observed

It is intentionally not claiming wiring inside components you have not scanned yet.
When you run the same scan on the remaining PDP components, append their import graphs + data touchpoints under section 10 and promote them into the Quick Reference list.
