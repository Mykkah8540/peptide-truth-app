import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export async function GET() {
  try {
    const root = process.cwd();
    const candidates = [
      path.join(root, "content", "_index", "blends.json"),
      path.join(root, "content", "_index", "blends_v1.json"),
      path.join(root, "content", "_index", "blend_summaries.json"),
    ];

    for (const fp of candidates) {
      try {
        const raw = await fs.readFile(fp, "utf-8");
        const j = JSON.parse(raw);

        const arr = Array.isArray(j?.blends) ? j.blends : Array.isArray(j) ? j : [];
        const blends = arr
          .map((b: any) => ({
            slug: String(b?.slug || ""),
            title: String(b?.title || b?.name || b?.slug || ""),
          }))
          .filter((b: any) => b.slug);

        return NextResponse.json({ blends }, { status: 200 });
      } catch {
        // keep trying candidates
      }
    }
  } catch {
    // fall through
  }

  return NextResponse.json({ blends: [] }, { status: 200 });
}
