import { NextResponse } from "next/server";
import { requireAuthedViewer } from "@/lib/viewer";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST() {
 try {
  const v = await requireAuthedViewer();
  const supa = await supabaseServer();

  // Best-effort: if table doesn't exist yet, return a clear error but don't crash the app
  const { error } = await supa.from("account_deletion_requests").insert({
   user_id: v.user!.id,
   email: v.user!.email ?? null,
   status: "requested",
  });

  if (error) {
   return NextResponse.json({ ok: false, error: "request_store_failed", detail: String(error.message || error) }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
 } catch (e: any) {
  const msg = String(e?.message || e);
  const code = msg.includes("unauthorized") ? 401 : 500;
  return NextResponse.json({ ok: false, error: msg }, { status: code });
 }
}
