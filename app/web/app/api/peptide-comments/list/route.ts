import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = String(searchParams.get("slug") || "").trim();
  const limit = Math.max(1, Math.min(200, Number(searchParams.get("limit") || 50)));

  if (!slug) return NextResponse.json({ ok: false, error: "missing slug" }, { status: 400 });

  const supa = await supabaseServer();

  const { data, error } = await supa
    .from("peptide_comments")
    .select("id, peptide_slug, user_id, display_name, content, created_at")
    .eq("peptide_slug", slug)
    .is("deleted_at", null)
    .eq("removed", false)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });

  return NextResponse.json({ ok: true, comments: data ?? [] });
}
