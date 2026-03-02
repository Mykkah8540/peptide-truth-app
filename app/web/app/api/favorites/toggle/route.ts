import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

const VALID_KINDS = ["peptide", "blend", "stack"] as const;
type FavKind = (typeof VALID_KINDS)[number];

export async function POST(req: Request) {
  const supa = await supabaseServer();
  const { data: auth } = await supa.auth.getUser();
  if (!auth?.user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({} as any));
  const kind: FavKind = body?.kind;
  const slug = typeof body?.slug === "string" ? body.slug.trim() : "";

  if (!(VALID_KINDS as readonly string[]).includes(kind) || !slug) {
    return NextResponse.json({ ok: false, error: "invalid_params" }, { status: 400 });
  }

  const userId = auth.user.id;

  const { data: existing } = await supa
    .from("user_favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("kind", kind)
    .eq("slug", slug)
    .maybeSingle();

  if (existing) {
    await supa.from("user_favorites").delete().eq("id", existing.id);
    return NextResponse.json({ ok: true, saved: false });
  } else {
    await supa.from("user_favorites").insert({ user_id: userId, kind, slug });
    return NextResponse.json({ ok: true, saved: true });
  }
}
