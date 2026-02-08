import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

function cleanText(v: any): string {
  return String(v ?? "").trim();
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const peptideSlug = cleanText(body?.slug);
  const content = cleanText(body?.content);

  if (!peptideSlug || !content) {
    return NextResponse.json({ ok: false, error: "missing fields" }, { status: 400 });
  }
  if (content.length > 2000) {
    return NextResponse.json({ ok: false, error: "too_long" }, { status: 400 });
  }

  const supa = await supabaseServer();
  const { data: auth } = await supa.auth.getUser();
  const user = auth?.user;
  if (!user) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const { data, error } = await supa
    .from("peptide_comments")
    .insert({
      peptide_slug: peptideSlug,
      user_id: user.id,
      content,
    })
    .select("id, peptide_slug, user_id, content, created_at, updated_at")
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ ok: false, error: "insert_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, comment: data });
}
