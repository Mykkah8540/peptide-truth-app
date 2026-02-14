import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

function getReqMeta(req: Request) {
  const h = req.headers;
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    null;
  const user_agent = h.get("user-agent") || null;
  const request_id = h.get("x-vercel-id") || h.get("x-request-id") || null;
  return { ip, user_agent, request_id };
}

async function requireAdmin() {
  const supa = await supabaseServer();
  const { data: auth } = await supa.auth.getUser();
  const user = auth?.user;
  if (!user)
    return {
      ok: false as const,
      res: NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 }),
    };

  const { data: prof } = await supa
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();
  if (prof?.is_admin !== true)
    return {
      ok: false as const,
      res: NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 }),
    };

  return { ok: true as const, user };
}

export async function GET() {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.res;

  const supa = await supabaseServer();
  const { data, error } = await supa
    .from("admin_flags")
    .select("key,value")
    .eq("key", "force_pro_on")
    .maybeSingle();
  if (error) return NextResponse.json({ ok: false, error: "read_failed" }, { status: 500 });

  return NextResponse.json({ ok: true, flags: { force_pro_on: !!data?.value } });
}

export async function POST(req: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.res;

  const body = await req.json().catch(() => ({} as any));
  const force = !!body?.force_pro_on;

  const supa = await supabaseServer();
  const { error } = await supa
    .from("admin_flags")
    .upsert({ key: "force_pro_on", value: force }, { onConflict: "key" });
  if (error) return NextResponse.json({ ok: false, error: "write_failed" }, { status: 500 });

  // Audit log (best-effort; do not block the op if logging fails)
  try {
    const admin = supabaseAdmin() as any;
    const { ip, user_agent, request_id } = getReqMeta(req);
    const actionName = force ? "flag_set" : "flag_clear";
    await admin.from("admin_events").insert({
      actor_user_id: gate.user.id,
      actor_email: (gate.user as any)?.email || null,
      actor_role: "admin",
      action: actionName,
      entity_type: "admin_flags",
      entity_id: "force_pro_on",
      ip,
      user_agent,
      request_id,
      details: { flag: "force_pro_on", value: force },
    });
  } catch (_) {
    // swallow
  }

  return NextResponse.json({ ok: true, flags: { force_pro_on: force } });
}
