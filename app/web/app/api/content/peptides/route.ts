import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export async function GET() {
  // Goal: lightweight list for dropdowns (slug + title).
  // We try index files first; if missing, return empty array (still compiles/builds).
  try {
    const root = process.cwd();
    const candidates = [
      path.join(root, "content", "_index", "peptides.json"),
      path.join(root, "content", "_index", "peptides_v1.json"),
      path.join(root, "content", "_index", "peptide_summaries.json"),
    ];

    for (const fp of candidates) {
      try {
        const raw = await fs.readFile(fp, "utf-8");
        const j = JSON.parse(raw);

        // Accept a few shapes:
        // 1) { peptides: [{ slug, title }, ...] }
        // 2) [{ slug, title }, ...]
        const arr = Array.isArray(j?.peptides) ? j.peptides : Array.isArray(j) ? j : [];
        const peptides = arr
          .map((p: any) => ({
            slug: String(p?.slug || ""),
            title: String(p?.title || p?.name || p?.slug || ""),
          }))
          .filter((p: any) => p.slug);

        return NextResponse.json({ peptides }, { status: 200 });
      } catch {
        // keep trying candidates
      }
    }
  } catch {
    // fall through
  }

  return NextResponse.json({ peptides: [] }, { status: 200 });
}
