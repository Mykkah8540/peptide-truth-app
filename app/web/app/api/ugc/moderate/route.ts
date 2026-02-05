import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { listByStatus, moderatePost, type UgcPostStatus } from "@/lib/ugc/store";

async function isAuthed(req: Request): Promise<boolean> {

  // Supabase session → profiles.is_admin
  const supa = await supabaseServer();
  const { data: auth } = await supa.auth.getUser();
  const user = auth?.user;
  if (!user) return false;

  const { data: prof } = await supa
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .maybeSingle();

  return prof?.is_admin === true; // replaced below
}

export async function GET(req: Request) {
  if (!(await isAuthed(req))) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = String(searchParams.get("status") || "pending").trim();
  const limit = Math.max(1, Math.min(1000, Number(searchParams.get("limit") || 200)));

  const posts = await listByStatus(status, limit);
  return NextResponse.json({ ok: true, posts });
}

export async function POST(req: Request) {
  if (!(await isAuthed(req))) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const id = String(body?.id || "").trim();
  const status = String(body?.status || "").trim() as UgcPostStatus;
  const reason = body?.reason ? String(body.reason).trim() : null;

  const allowed: UgcPostStatus[] = ["pending", "approved", "rejected", "archived", "trash"];
  if (!id || !allowed.includes(status)) {
    return NextResponse.json({ ok: false, error: "invalid payload" }, { status: 400 });
  }

  const updated = await moderatePost({ id, status, reason });
  if (!updated) return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });

  return NextResponse.json({ ok: true, post: updated });
}
