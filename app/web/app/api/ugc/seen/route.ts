import { NextResponse } from "next/server";
import { markSeen } from "@/lib/ugc/store";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const id = String(body?.id || "").trim();

  if (!id) {
    return NextResponse.json({ ok: false, error: "missing id" }, { status: 400 });
  }

  const post = markSeen(id);
  if (!post) {
    return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
