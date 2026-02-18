import { NextResponse } from "next/server";
import { existsSync, readFileSync } from "fs";
import path from "path";

function repoRoot(): string {
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

export async function GET() {
  const cwd = process.cwd();
  const root = repoRoot();
  const fpLocal = path.join(process.cwd(), "content", "_index", "search_routes_v1.json");
  const fpRoot = path.join(root, "content", "_index", "search_routes_v1.json");
  const fp = existsSync(fpLocal) ? fpLocal : fpRoot;
const out: any = {
    cwd,
    resolved_root: root,
    fp,
    fpLocal,
    fpRoot,
    existsLocal: existsSync(fpLocal),
    existsRoot: existsSync(fpRoot),
    exists: existsSync(fp),
  };

  if (out.exists) {
    try {
      const doc = JSON.parse(readFileSync(fp, "utf-8"));
      out.doc = {
        version: doc?.version ?? null,
        updated_at: doc?.updated_at ?? null,
        terms_count: Array.isArray(doc?.terms) ? doc.terms.length : null,
        counts: doc?.counts ?? null,
      };
    } catch (e: any) {
      out.read_error = String(e?.message || e);
    }
  }

  return NextResponse.json(out, { status: 200 });
}
