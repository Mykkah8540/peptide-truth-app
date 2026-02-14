import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { getUserSafe } from "@/lib/auth/getUserSafe";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { hasAnyRole } from "@/lib/auth/roles";

function clampInt(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export async function GET(req: Request) {
  // Identify caller via normal cookie auth
  const supa = await supabaseServer();
  const user = await getUserSafe(supa);
  if (!user) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  // Authorize caller (admin-only)
  const isAdmin = await hasAnyRole(user.id, ["admin"]);
  if (!isAdmin) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

  const url = new URL(req.url);

  const limitRaw = Number(url.searchParams.get("limit") || "50");
  const limit = clampInt(Number.isFinite(limitRaw) ? limitRaw : 50, 1, 200);

  // Cursor format: "<created_at>|<id>"
  const cursor = String(url.searchParams.get("cursor") || "").trim();
  const [cursorCreatedAt, cursorId] = cursor ? cursor.split("|") : ["", ""];

  const admin = supabaseAdmin() as any;

  let q = admin
    .from("admin_events")
    .select(
      "id,created_at,actor_user_id,actor_email,actor_role,action,entity_type,entity_id,ip,user_agent,request_id,details"
    )
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(limit);

  if (cursorCreatedAt && cursorId) {
    // fetch older than cursor (created_at desc, id desc)
    q = q.or(`created_at.lt.${cursorCreatedAt},and(created_at.eq.${cursorCreatedAt},id.lt.${cursorId})`);
  }

  const { data, error } = await q;
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });

  const rows = (data || []) as any[];
  const nextCursor =
    rows.length === limit ? `${rows[rows.length - 1].created_at}|${rows[rows.length - 1].id}` : null;

  return NextResponse.json({ ok: true, rows, nextCursor });
}
