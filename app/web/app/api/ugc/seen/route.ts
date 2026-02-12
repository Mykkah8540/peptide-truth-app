import { NextResponse } from "next/server";
import { isUgcAdmin } from "@/lib/ugc/adminAuth";
import { markSeen } from "@/lib/ugc/store";

export async function POST(req: Request) {
 if (!(await isUgcAdmin(req))) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
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
