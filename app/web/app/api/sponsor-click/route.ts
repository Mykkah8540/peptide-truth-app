import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY; // server only

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, href } = body || {};

    if (!id || !href) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      console.error("[sponsor-click] missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return NextResponse.json({ ok: false, error: "server_misconfigured" }, { status: 500 });
    }

    // Validate sponsor exists and is active before recording the event
    const { data: sponsor } = await supabase
      .from("sponsors")
      .select("id, href")
      .eq("id", id)
      .eq("is_active", true)
      .maybeSingle();

    if (!sponsor) {
      return NextResponse.json({ ok: false, error: "invalid_sponsor" }, { status: 400 });
    }

    await supabase.from("sponsor_events").insert({
      sponsor_id: id,
      href,
      user_agent: req.headers.get("user-agent") || "",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[sponsor-click-error]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
