import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import path from "path";

// Deterministic normalization (match HomeSearch contract)
function normKey(s: string): string {
  return (s || "")
    .toLowerCase()
    .trim()
    .replace(/[_\-\s]+/g, "")
    .replace(/[^a-z0-9+]/g, "");
}

function scoreMatch(queryKey: string, term: string): number {
  // Lower is better. 0..49 = startsWith, 50..99 = includes, 999 = no match
  const fk = normKey(term);
  if (!fk) return 999;

  if (fk === queryKey) return 0;
  if (fk.startsWith(queryKey)) return Math.min(49, fk.length);
  const idx = fk.indexOf(queryKey);
  if (idx >= 0) return 50 + Math.min(49, idx);
  return 999;
}

function repoRoot(): string {
  // Walk upward from CWD until we find content/_index/entities_v1.json
  let cur = process.cwd();
  for (let i = 0; i < 20; i++) {
    const marker = path.join(cur, "content", "_index", "entities_v1.json");
    if (existsSync(marker)) return cur;
    const next = path.dirname(cur);
    if (next === cur) break;
    cur = next;
  }
  return process.cwd();
}

type RouteEntry = {
  type: string; // "entity" | "category" | ...
  kind?: string; // "peptide" | "blend" | "topic" | ...
  slug?: string;
  route: string; // token like "peptide:slug"
};

type TermRow = {
  term: string;
  routes: RouteEntry[];
  sources?: string[];
};

function routeTokenToPath(token: string): string | null {
  const t = String(token || "").trim();
  const m = /^([a-z0-9_-]+):(.+)$/i.exec(t);
  if (!m) return null;

  const prefix = m[1].toLowerCase();
  const rest = m[2];

  // Only implement what the current UI can navigate to deterministically
  if (prefix === "peptide") return `/peptide/${rest}`;
  if (prefix === "blend") return `/blend/${rest}`;
  if (prefix === "topic") return `/topic/${rest}`;
  if (prefix === "interaction") return `/interaction/${rest}`;

  // Categories/resources can be added later under governance, once routes are defined.
  return null;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = String(url.searchParams.get("query") || "").trim();
  const qk = normKey(query);

  if (!qk) {
    return NextResponse.json({ results: [] }, { status: 200 });
  }

  const root = repoRoot();
  const fpLocal = path.join(process.cwd(), "content", "_index", "search_routes_v1.json");
  const fpRoot = path.join(root, "content", "_index", "search_routes_v1.json");
  const fp = existsSync(fpLocal) ? fpLocal : fpRoot;
if (!existsSync(fp)) {
    return NextResponse.json({ results: [] }, { status: 200 });
  }

  let doc: any;
  try {
    doc = JSON.parse(readFileSync(fp, "utf-8"));
  } catch {
    return NextResponse.json({ results: [] }, { status: 200 });
  }

  const terms: TermRow[] = Array.isArray(doc?.terms) ? doc.terms : [];

  // Score terms, then expand routes, then dedupe by route token.
  const scored = terms
    .map((row) => ({ row, s: scoreMatch(qk, row.term) }))
    .filter((x) => x.s < 999)
    .sort((a, b) => a.s - b.s || a.row.term.localeCompare(b.row.term));

  const seen = new Set<string>();
  const results: Array<{ kind: string; slug: string; route: string }> = [];

  for (const x of scored) {
    for (const r of x.row.routes || []) {
      const token = String(r?.route || "").trim();
      if (!token || seen.has(token)) continue;

      const href = routeTokenToPath(token);
      if (!href) continue;

      const kind = String(r?.kind || "").trim() || token.split(":")[0];
      const slug = String(r?.slug || "").trim() || token.split(":").slice(1).join(":");

      seen.add(token);
      results.push({ kind, slug, route: href });

      if (results.length >= 12) break;
    }
    if (results.length >= 12) break;
  }

  return NextResponse.json({ results }, { status: 200 });
}
