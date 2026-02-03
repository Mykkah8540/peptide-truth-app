import { NextResponse } from "next/server";
import { markSeen } from "@/lib/ugc/store";

function isAuthed(req: Request): boolean {
  const token = process.env.PEP_TALK_ADMIN_TOKEN || "";
  if (!token) return false;
  const got = req.headers.get("x-admin-token") || "";
  return got === token;
}

export async function POST(req: Request) {
  if (!isAuthed(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const id = String(body?.id || "").trim();

  if (!id) {
    return NextResponse.json({ ok: false, error: "missing id" }, { status: 400 });
  }

  const ok = await markSeen(id);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
