import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

async function requireAdmin() {
  const supa = await supabaseServer();
  const { data: auth } = await supa.auth.getUser();
  const user = auth?.user;
  if (!user) return { ok: false as const, res: NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 }) };

  const { data: prof } = await supa.from("profiles").select("is_admin").eq("user_id", user.id).maybeSingle();
  if (prof?.is_admin !== true) return { ok: false as const, res: NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 }) };

  return { ok: true as const };
}

export async function GET() {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.res;

  const supa = await supabaseServer();
  const { data, error } = await supa.from("admin_flags").select("key,value").eq("key", "force_pro_on").maybeSingle();
  if (error) return NextResponse.json({ ok: false, error: "read_failed" }, { status: 500 });

  return NextResponse.json({ ok: true, flags: { force_pro_on: !!data?.value } });
}

export async function POST(req: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.res;

  const body = await req.json().catch(() => ({} as any));
  const force = !!body?.force_pro_on;

  const supa = await supabaseServer();
  const { error } = await supa.from("admin_flags").upsert({ key: "force_pro_on", value: force }, { onConflict: "key" });
  if (error) return NextResponse.json({ ok: false, error: "write_failed" }, { status: 500 });

  return NextResponse.json({ ok: true, flags: { force_pro_on: force } });
}
