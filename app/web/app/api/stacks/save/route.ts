import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const supa = await supabaseServer();
  const { data: auth } = await supa.auth.getUser();
  const user = auth?.user;
  if (!user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const id = typeof body.id === "string" ? body.id.trim() : null;
  const name = String(body.name ?? "").trim() || "My Stack";
  const goal_id = typeof body.goal_id === "string" ? body.goal_id.trim() || null : null;
  const items = Array.isArray(body.items)
    ? body.items.filter(
        (i: unknown) =>
          i &&
          typeof i === "object" &&
          typeof (i as { slug: unknown }).slug === "string" &&
          typeof (i as { kind: unknown }).kind === "string"
      )
    : [];

  if (id) {
    // Update existing
    const { data, error } = await supa
      .from("user_stacks")
      .update({ name, goal_id, items, updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .maybeSingle();

    if (error) {
      return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, stack: data });
  } else {
    // Insert new
    const { data, error } = await supa
      .from("user_stacks")
      .insert({ user_id: user.id, name, goal_id, items })
      .select()
      .maybeSingle();

    if (error) {
      return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
    }
    return NextResponse.json({ ok: true, stack: data });
  }
}
