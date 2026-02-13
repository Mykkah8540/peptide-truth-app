import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { getUserSafe } from "@/lib/auth/getUserSafe";
import { hasAnyRole } from "@/lib/auth/roles";

export async function POST(req: Request) {
  const supa = await supabaseServer();
  const user = await getUserSafe(supa);
  if (!user) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const isAdmin = await hasAnyRole(supa, user.id, ["admin"]);
  if (!isAdmin) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

  const form = await req.formData();
  const op = String(form.get("op") || "").trim();
  const userId = String(form.get("user_id") || "").trim();
  const role = String(form.get("role") || "").trim();

  if (!userId || !role) return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  if (!["admin", "moderator"].includes(role)) return NextResponse.json({ ok: false, error: "invalid_role" }, { status: 400 });
  if (!["add", "remove"].includes(op)) return NextResponse.json({ ok: false, error: "invalid_op" }, { status: 400 });

  if (op === "add") {
    const { error } = await supa.from("user_roles").insert({ user_id: userId, role });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  } else {
    const { error } = await supa.from("user_roles").delete().eq("user_id", userId).eq("role", role);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  return NextResponse.redirect(new URL("/admin/roles", req.url), 303);
}
