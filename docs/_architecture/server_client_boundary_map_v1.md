# Server vs Client Boundary Map (V1)

Purpose: Prevent hydration mistakes, accidental secret leakage, and “server-only” imports in client bundles.

This doc is canonical: treat as non-driftable unless explicitly revised under a deliberate governance change.

## Core rule

- Anything that touches secrets, cookies, headers, database connections, or privileged auth must be Server-only.
- Client components may call Route Handlers, but may not import Server-only modules.

## Server-only surfaces (allowed)

### 1) Route Handlers (Next.js)
Location: `app/web/app/api/**/route.ts`

Characteristics:
- Runs on the server.
- May read headers/cookies.
- May call Supabase server client.
- May call Postgres via `pg` pool (UGC).

Known examples:
- `app/web/app/api/peptide-comments/list/route.ts`
- `app/web/app/api/peptide-comments/create/route.ts`

### 2) Supabase server client
Location: `app/web/lib/supabase/server.ts`

Notes:
- Uses `cookies()` from `next/headers`.
- Cookie writes are best-effort and may no-op outside Route Handlers / Server Actions.
- Must not be imported into Client Components.

### 3) UGC Postgres pool (pg)
Location: `app/web/lib/ugc/db.ts`

Notes:
- Uses `pg.Pool` with TLS behavior depending on NODE_ENV.
- Must never execute in the browser bundle.

Related:
- `app/web/lib/ugc/store.ts` (queries against `public.ugc_posts`)
- `app/web/lib/ugc/adminAuth.ts` (admin gating via token header or Supabase roles)

### 4) Content ingestion / repo-root file reads
Location: `app/web/lib/content.ts` and any module reading from `content/**`

Notes:
- Reads local repo files at runtime/build time.
- Must be Server-only unless explicitly bundled as static data.

Known example:
- `buildAliasMaps()` reads `content/_taxonomy/search_synonyms_v1.json` and builds alias maps.

## Client-only surfaces (allowed)

### 1) UI Components (“use client”)
Location: `app/web/app/**` components marked with `"use client"`

Rules:
- May call `fetch()` to Route Handlers.
- Must not import Server-only modules listed above.
- Must not reference `process.env` secrets (only NEXT_PUBLIC vars are allowed).

## Server Component surfaces (allowed)

Location: Next.js App Router pages/layouts that are Server Components by default.

Rules:
- May import Server-only modules.
- Must not mutate cookies directly except in Route Handlers / Server Actions (writes may throw or no-op).

## Cross-boundary call patterns (canonical)

### Pattern A: Client UI → Route Handler → Supabase/DB
1) Client component calls `fetch("/api/...")`
2) Route Handler validates inputs + auth
3) Route Handler calls Supabase server client and/or pg pool
4) Route Handler returns JSON response

### Pattern B: Server Component → Server-only module
1) Server component imports `content.ts` and filters data
2) Server component renders pure UI output
3) No cookie mutation in render path

## Guardrails to enforce this

- Never import `app/web/lib/supabase/server.ts` from a `"use client"` file.
- Never import `app/web/lib/ugc/db.ts` or `pg` from a `"use client"` file.
- Prefer Route Handlers as the stable seam between UI and privileged operations.
- If a client needs data, create an API route; do not “reach across” by importing server modules.

