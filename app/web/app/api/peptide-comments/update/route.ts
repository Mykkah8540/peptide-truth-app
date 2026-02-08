import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

function cleanText(v: any): string {
  return String(v ?? "").trim();
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const id = cleanText(body?.id);
  const content = cleanText(body?.content);

  if (!id || !content) {
    return NextResponse.json({ ok: false, error: "missing fields" }, { status: 400 });
  }
  if (content.length > 2000) {
    return NextResponse.json({ ok: false, error: "too_long" }, { status: 400 });
  }

  const supa = await supabaseServer();
  const { data: auth } = await supa.auth.getUser();
  const user = auth?.user;
  if (!user) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  // RLS enforces author-only update; we also filter out removed/deleted rows.
  const { data, error } = await supa
    .from("peptide_comments")
    .update({ content })
    .eq("id", id)
    .is("deleted_at", null)
    .eq("removed", false)
    .select("id, peptide_slug, user_id, content, created_at, updated_at")
    .maybeSingle();

  if (error) {
    // If RLS blocks it, Supabase may return empty / error depending on client config. Keep generic.
    return NextResponse.json({ ok: false, error: "update_failed" }, { status: 400 });
  }
  if (!data) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

  return NextResponse.json({ ok: true, comment: data });
}
