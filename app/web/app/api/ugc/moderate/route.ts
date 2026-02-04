import { NextResponse } from "next/server";
import { listByStatus, moderatePost, type UgcPostStatus } from "@/lib/ugc/store";

function isAuthed(req: Request): boolean {
  const token = process.env.PEP_TALK_ADMIN_TOKEN || "";
  if (!token) return false;
  const got = req.headers.get("x-admin-token") || "";
  return got === token;
}

export async function GET(req: Request) {
  if (!isAuthed(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = String(searchParams.get("status") || "pending").trim();
  const limit = Math.max(1, Math.min(1000, Number(searchParams.get("limit") || 200)));

  const posts = await listByStatus(status, limit);
  return NextResponse.json({ ok: true, posts });
}

export async function POST(req: Request) {
  if (!isAuthed(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

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
