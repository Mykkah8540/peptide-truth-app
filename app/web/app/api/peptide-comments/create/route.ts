import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

function cleanText(s: string) {
  return String(s || "").replace(/\r\n/g, "\n").trim();
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const slug = String(body?.slug || "").trim();
  const content = cleanText(body?.content);

  if (!slug || !content) return NextResponse.json({ ok: false, error: "missing fields" }, { status: 400 });
  if (content.length > 2000) return NextResponse.json({ ok: false, error: "too_long" }, { status: 400 });

  const supa = await supabaseServer();
  const { data: auth } = await supa.auth.getUser();
  const user = auth?.user;
  if (!user) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  // derive display name from profile (RLS allows own select)
  const { data: prof } = await supa.from("profiles").select("display_name,email").eq("id", user.id).maybeSingle();
  const displayName =
    (prof?.display_name && String(prof.display_name).trim()) ||
    (prof?.email && String(prof.email).split("@")[0]) ||
    "Member";

  const { data, error } = await supa
    .from("peptide_comments")
    .insert({ peptide_slug: slug, user_id: user.id, display_name: displayName, content })
    .select("id, peptide_slug, user_id, display_name, content, created_at")
    .maybeSingle();

  if (error) return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  return NextResponse.json({ ok: true, comment: data });
}
