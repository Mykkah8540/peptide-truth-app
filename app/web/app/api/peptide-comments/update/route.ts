import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

function cleanText(s: string) {
  return String(s || "").replace(/\r\n/g, "\n").trim();
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const id = String(body?.id || "").trim();
  const content = cleanText(body?.content);

  if (!id || !content) return NextResponse.json({ ok: false, error: "missing fields" }, { status: 400 });
  if (content.length > 2000) return NextResponse.json({ ok: false, error: "too_long" }, { status: 400 });

  const supa = await supabaseServer();
  const { data: auth } = await supa.auth.getUser();
  if (!auth?.user) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  // RLS enforces author ownership; we also prevent edits to deleted/removed rows.
  const { data, error } = await supa
    .from("peptide_comments")
    .update({ content })
    .eq("id", id)
    .is("deleted_at", null)
    .eq("removed", false)
    .select("id, peptide_slug, user_id, display_name, content, created_at")
    .maybeSingle();

  if (error) return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  if (!data) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

  return NextResponse.json({ ok: true, comment: data });
}
