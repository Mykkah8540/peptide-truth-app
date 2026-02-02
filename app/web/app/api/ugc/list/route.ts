import { NextResponse } from "next/server";
import { listApproved, type UgcEntityType } from "@/lib/ugc/store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const entityType = String(searchParams.get("type") || "").trim() as UgcEntityType;
  const entitySlug = String(searchParams.get("slug") || "").trim();

  if (!entityType || !entitySlug) {
    return NextResponse.json({ ok: false, error: "missing type/slug" }, { status: 400 });
  }

  if (entityType !== "peptide" && entityType !== "blend" && entityType !== "stack") {
    return NextResponse.json({ ok: false, error: "invalid type" }, { status: 400 });
  }

  const posts = listApproved(entityType, entitySlug);
  return NextResponse.json({ ok: true, posts });
}
