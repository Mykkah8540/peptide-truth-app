import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = String(searchParams.get("slug") || "").trim();

  if (!slug) {
    return NextResponse.json({ ok: false, error: "missing slug" }, { status: 400 });
  }

  // Public read. We still filter removed/deleted here so behavior is correct even if using a privileged client.
  const supa = await supabaseServer();
  const { data, error } = await supa
    .from("peptide_comments")
    .select("id, peptide_slug, user_id, content, created_at, updated_at")
    .eq("peptide_slug", slug)
    .is("deleted_at", null)
    .eq("removed", false)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json({ ok: false, error: "query_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, comments: data ?? [] });
}
