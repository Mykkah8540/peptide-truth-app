import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supa = await supabaseServer();
  const { data: auth } = await supa.auth.getUser();

  if (!auth?.user) {
    return NextResponse.json({ ok: true, peptides: [], blends: [], stacks: [] });
  }

  const { data, error } = await supa
    .from("user_favorites")
    .select("kind,slug")
    .eq("user_id", auth.user.id);

  if (error) {
    return NextResponse.json({ ok: false, error: "read_failed" }, { status: 500 });
  }

  const peptides = (data ?? []).filter((r) => r.kind === "peptide").map((r) => r.slug);
  const blends   = (data ?? []).filter((r) => r.kind === "blend").map((r) => r.slug);
  const stacks   = (data ?? []).filter((r) => r.kind === "stack").map((r) => r.slug);

  return NextResponse.json({ ok: true, peptides, blends, stacks });
}
