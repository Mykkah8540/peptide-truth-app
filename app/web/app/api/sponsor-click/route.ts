import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, href } = body || {};

    if (!id || !href) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // For now: structured server log.
    // Later: pipe to DB, analytics warehouse, or edge log.
    console.log("[sponsor-click]", {
      id,
      href,
      ts: Date.now(),
      ua: req.headers.get("user-agent") || "",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
