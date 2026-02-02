import { NextResponse } from "next/server";
import { listPending, moderatePost } from "@/lib/ugc/store";

function isAuthed(req: Request): boolean {
  const token = process.env.PEP_TALK_ADMIN_TOKEN || "";
  if (!token) return false;
  const got = req.headers.get("x-admin-token") || "";
  return got === token;
}

export async function GET(req: Request) {
  if (!isAuthed(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const posts = listPending(200);
  return NextResponse.json({ ok: true, posts });
}

export async function POST(req: Request) {
  if (!isAuthed(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const id = String(body?.id || "").trim();
  const status = String(body?.status || "").trim();
  const reason = body?.reason ? String(body.reason).trim() : null;

  if (!id || (status !== "approved" && status !== "rejected")) {
    return NextResponse.json({ ok: false, error: "invalid payload" }, { status: 400 });
  }

  const updated = moderatePost({ id, status: status as any, reason });
  if (!updated) return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });

  return NextResponse.json({ ok: true, post: updated });
}
