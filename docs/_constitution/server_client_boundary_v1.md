cd "$(git rev-parse --show-toplevel)" || exit 1

cat > docs/_constitution/server_client_boundary_v1.md <<'MD'
# Server/Client Boundary v1

Rule
Client components must never access secrets, service roles, admin tokens, or privileged database clients. All privileged operations live in server-only code paths.

Server-only
- Next.js route handlers under app/web/app/api/**
- Server actions (if used)
- Supabase server client via "@/lib/supabase/server"
- Any use of admin token headers

Client-only
- "use client" components
- fetch() calls to app/web/app/api/** only
- No direct Supabase admin/session manipulation

Allowed data flow
Client UI -> fetch("/api/...") -> route handler -> server auth -> DB -> sanitized JSON -> client UI

Disallowed
- Using service-role key in client
- Calling Postgres directly from client
- Leaking admin token into browser runtime
- Embedding sensitive env vars into client bundles

Auth rules
- User auth uses Supabase session server-side
- Admin/moderator checks happen server-side (roles table)
- Emergency automation can use x-admin-token only in server-to-server contexts
MD

git add docs/_constitution/server_client_boundary_v1.md
cd app/web && npm run build
cd "$(git rev-parse --show-toplevel)" || exit 1
git status --short
