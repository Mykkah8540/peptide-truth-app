import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const id = String(body?.id || "").trim();
  if (!id) return NextResponse.json({ ok: false, error: "missing id" }, { status: 400 });

  const supa = await supabaseServer();
  const { data: auth } = await supa.auth.getUser();
  if (!auth?.user) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  // RLS enforces author ownership. Soft delete; return 404 if nothing matched.
  const { data, error } = await supa
    .from("peptide_comments")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)
    .is("deleted_at", null)
    .eq("removed", false)
    .select("id")
    .maybeSingle();

  if (error) return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  if (!data) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
