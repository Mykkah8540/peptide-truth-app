import { NextResponse } from "next/server";
import { getViewer } from "@/lib/viewer";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  const v = await getViewer();

  if (!v.user) {
    return NextResponse.json({
      ok: true,
      isAuthed: false,
      user: null,
      profile: null,
      isPro: false,
      isAdmin: false,
      forceProOn: false,
      entitlement: null,
    });
  }

  const supa = await supabaseServer();

  // Snapshot written by RevenueCat webhook (authoritative)
  const { data: ent, error: entErr } = await supa
    .from("billing_entitlements")
    .select("user_id, rc_app_user_id, pro_active, pro_expires_at, source, last_event_id, last_event_at, updated_at")
    .eq("user_id", v.user.id)
    .maybeSingle();

  return NextResponse.json({
    ok: true,
    isAuthed: true,
    user: { id: v.user.id, email: v.user.email ?? null },
    profile: v.profile,
    isPro: !!(v.forceProOn || v.profile?.is_pro),
    isAdmin: !!v.profile?.is_admin,
    forceProOn: !!v.forceProOn,
    entitlement: entErr ? null : ent,
  });
}
