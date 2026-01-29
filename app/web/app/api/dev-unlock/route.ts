import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({ ok: true, gate: "unlocked" });
  res.cookies.set("pt_gate", "1", {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
