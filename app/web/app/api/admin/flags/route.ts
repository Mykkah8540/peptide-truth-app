import { NextResponse } from "next/server";
import { requireAdminViewer } from "@/lib/viewer";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  try {
    await requireAdminViewer();
    const supa = await supabaseServer();
    const { data } = await supa.from("admin_flags").select("key,value").eq("key", "force_pro_on").maybeSingle();
    return NextResponse.json({ ok: true, force_pro_on: Boolean((data as any)?.value) });
  } catch (e: any) {
    const msg = String(e?.message || "error");
    const status = msg === "unauthorized" ? 401 : msg === "forbidden" ? 403 : 500;
    return NextResponse.json({ ok: false, error: msg }, { status });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdminViewer();
    const body = await req.json().catch(() => null);
    const value = body?.force_pro_on === true;

    const supa = await supabaseServer();
    const { error } = await supa
      .from("admin_flags")
      .upsert({ key: "force_pro_on", value }, { onConflict: "key" });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, force_pro_on: value });
  } catch (e: any) {
    const msg = String(e?.message || "error");
    const status = msg === "unauthorized" ? 401 : msg === "forbidden" ? 403 : 500;
    return NextResponse.json({ ok: false, error: msg }, { status });
  }
}
