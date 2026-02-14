import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { getUserSafe } from "@/lib/auth/getUserSafe";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { hasAnyRole } from "@/lib/auth/roles";

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


export async function POST(req: Request) {
  // Identify caller via normal cookie auth
  const supa = await supabaseServer();
  const user = await getUserSafe(supa);
  if (!user) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  // Authorize caller (admin-only)
  const isAdmin = await hasAnyRole(user.id, ["admin"]);
  if (!isAdmin) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

  // Perform role edit via admin client (bypasses RLS)
  const form = await req.formData();
  const op = String(form.get("op") || "").trim();
  const userId = String(form.get("user_id") || "").trim();
  const role = String(form.get("role") || "").trim();

  if (!userId || !role) return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  if (!["admin", "moderator"].includes(role)) return NextResponse.json({ ok: false, error: "invalid_role" }, { status: 400 });
  if (!["add", "remove"].includes(op)) return NextResponse.json({ ok: false, error: "invalid_op" }, { status: 400 });

  const admin = supabaseAdmin() as any;

  if (op === "add") {
    const { error } = await admin.from("user_roles").insert({ user_id: userId, role });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  } else {
    const { error } = await admin.from("user_roles").delete().eq("user_id", userId).eq("role", role);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  
  // Audit log (best-effort; do not block the op if logging fails)
  try {
    const { ip, user_agent, request_id } = getReqMeta(req);
    const actionName = op === "add" ? "role_add" : "role_remove";
    await admin.from("admin_events").insert({
      actor_user_id: user.id,
      actor_email: (user as any)?.email || null,
      actor_role: "admin",
      action: actionName,
      entity_type: "user_roles",
      entity_id: userId,
      ip,
      user_agent,
      request_id,
      details: { target_user_id: userId, role, op },
    });
  } catch (_) {
    // swallow
  }

return NextResponse.redirect(new URL("/admin/roles", req.url), 303);
}
