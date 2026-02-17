# PDP Data Flow Diagram (V1)

Purpose: Provide an authoritative, ordered mapping of PDP runtime data flow (content → risk → support → UGC → UI), including server/client boundaries and the safe seams between them.

This doc is canonical: treat as non-driftable unless explicitly revised under a deliberate governance change.

## Legend

- **Source-of-truth**: canonical data that should not be re-derived ad-hoc in UI.
- **Server-only**: may touch secrets/cookies/DB/pg pool/local filesystem reads.
- **Client**: UI-only; can call Route Handlers via `fetch()`; cannot import server-only modules.
- **Seam**: a stable boundary (Route Handler / Server Component boundary) where data crosses safely.

## PDP: High-level call order (authoritative)

### 0) Request enters Next.js App Router
- Entry: `app/web/app/peptide/[slug]/page.tsx` (Server Component by default)

Expected outcome:
- Resolve slug
- Load canonical content
- Compute derived views (risk/support summaries, etc.)
- Render a stable server-first UI shell
- Hand off interactive/UGC parts to client components or to route handlers

### 1) Content load (Server-only)
**Source-of-truth**: `content/**` + `content/_index/**` + `content/_taxonomy/**`

- Loader module: `app/web/lib/content.ts`
  - Reads from repo content files
  - Builds alias maps from: `content/_taxonomy/search_synonyms_v1.json`
  - Provides list/lookup helpers used by server routes/components

Key inputs:
- `content/_index/search_routes_v1.json` (routing contract / index references)
- `content/_taxonomy/search_synonyms_v1.json` (entity_synonyms / blend_synonyms / category_synonyms)

Key rule:
- Any `fs`/repo-root reads stay server-only. Do not import loaders into `"use client"` files.

### 2) Risk index join (Server-only)
**Source-of-truth**: `content/_index/risk_index_v1.json`

Expected behavior:
- PDP resolves the entity (peptide or blend) and joins to risk index row(s)
- UI renders risk summary + per-domain risk slices from structured index

Notes:
- Risk display must not invent risk; it must read the index.

### 3) Support / interactions join (Server-only)
**Source-of-truth**:
- `content/_index/interactions_v1.json`
- `content/_index/interactions_to_peptides_v1.json`

Expected behavior:
- Resolve “supports / interactions” for the entity
- Display interaction/support sections driven by index content
- Avoid client-side recomputation drift

### 4) UGC read path (Client → Route Handler → DB)
**Source-of-truth**: Postgres table(s) behind `app/web/lib/ugc/store.ts` (via `pg` pool)

Canonical pattern:
1) Client component requests UGC via `fetch("/api/...")`
2) Route Handler validates + gates
3) Route Handler uses server-only DB access
4) Route Handler returns normalized JSON
5) Client renders (and only renders)

Server-only modules involved:
- `app/web/lib/ugc/db.ts` (pg.Pool)
- `app/web/lib/ugc/store.ts` (queries)
- `app/web/lib/ugc/adminAuth.ts` (admin gating patterns)

Known route handler examples (verify in repo):
- `app/web/app/api/peptide-comments/list/route.ts`
- `app/web/app/api/peptide-comments/create/route.ts`

Critical rule:
- Client must never import `pg`, `ugc/db.ts`, `ugc/store.ts`, or Supabase server client.

### 5) Supabase auth boundary (Server-only)
**Source-of-truth**: Supabase session cookie + server client

Server client:
- `app/web/lib/supabase/server.ts`

Usage:
- Route Handlers may read cookies/headers and use server supabase client.
- Cookie writes are best-effort and should be performed in Route Handlers / Server Actions, not in render paths.

### 6) Rendering boundaries (Server → Client)
Server should render:
- Canonical content sections
- Risk/support derived sections from indexes
- Stable HTML structure and layout

Client should render:
- UGC interactive components
- Submit forms that POST to route handlers
- Any “live” UI state (tabs, expand/collapse, vote, etc.)

## PDP Data Flow (text diagram)

Request: /peptide/[slug]
  ↓
Server Component: app/web/app/peptide/[slug]/page.tsx
  ↓
Content load (server-only): app/web/lib/content.ts
  ↳ reads content/_taxonomy/search_synonyms_v1.json (alias maps)
  ↳ reads content/_index/* (risk/support/interactions)
  ↓
Derived joins (server-only):
  ↳ risk_index_v1 join
  ↳ interactions_v1 + interactions_to_peptides_v1 join
  ↓
Render server-first shell
  ↓
Client UGC widget mounts (use client)
  ↓
Client fetch:
  GET /api/peptide-comments/list?slug=...
  ↓
Route Handler (server-only):
  validates input + auth
  calls UGC store via pg pool
  ↓
Returns JSON
  ↓
Client renders UGC list

## What MUST NOT happen (anti-patterns)

- Client imports any of:
  - `app/web/lib/supabase/server.ts`
  - `app/web/lib/ugc/db.ts`
  - `app/web/lib/ugc/store.ts`
  - Any module reading `content/**` via filesystem at runtime

- Server render path mutates cookies (should be done in route handlers / server actions)

- Risk/support computed ad-hoc in UI without reading canonical indexes

## “Where to verify” checklist (repo-greps)

Run these from repo root:

- PDP entry:
  - `rg -n "app/peptide/\\[slug\\]/page\\.tsx|function\\s+Page\\(|export default" app/web/app`

- Route handlers:
  - `rg -n "app/web/app/api/.*/route\\.ts" -S app/web/app/api`
  - `rg -n "peptide-comments" -S app/web/app/api`

- Server-only modules:
  - `rg -n "from 'pg'|new Pool\\(" app/web/lib/ugc`
  - `rg -n "next/headers|cookies\\(" app/web/lib/supabase`

- Content sources:
  - `rg -n "search_synonyms_v1\\.json|risk_index_v1\\.json|interactions_v1\\.json" app/web/lib/content.ts content/_index content/_taxonomy`

## Update policy

- This document must be updated any time:
  - PDP route changes (slug routing or file move)
  - Any new PDP data source is added
  - Any new route handler is added for PDP UI
  - UGC storage/query paths change
  - Risk/support index formats change

