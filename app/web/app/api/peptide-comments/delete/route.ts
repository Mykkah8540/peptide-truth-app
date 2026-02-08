import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

function cleanText(v: any): string {
  return String(v ?? "").trim();
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const id = cleanText(body?.id);

  if (!id) {
    return NextResponse.json({ ok: false, error: "missing id" }, { status: 400 });
  }

  const supa = await supabaseServer();
  const { data: auth } = await supa.auth.getUser();
  const user = auth?.user;
  if (!user) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  // Soft delete. RLS author-update policy allows this.
  const { data, error } = await supa
    .from("peptide_comments")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)
    .is("deleted_at", null)
    .eq("removed", false)
    .select("id")
    .maybeSingle();

  if (error) return NextResponse.json({ ok: false, error: "delete_failed" }, { status: 400 });
  if (!data) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
