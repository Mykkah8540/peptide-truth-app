import { NextResponse } from "next/server";
import { getViewer } from "@/lib/viewer";
import { supabaseServer } from "@/lib/supabase/server";

type EntRow = {
  user_id: string;
  rc_app_user_id: string | null;
  pro_active: boolean | null;
  pro_expires_at: string | null;
  source: string | null;
  last_event_id: string | null;
  last_event_at: string | null;
  updated_at: string | null;
};

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

  // Pull auth metadata so we can show "Member since"
  let createdAt: string | null = null;
  try {
    const { data } = await supa.auth.getUser();
    createdAt = (data as any)?.user?.created_at ?? null;
  } catch {
    createdAt = null;
  }

  // Snapshot written by RevenueCat webhook (authoritative)
  const { data: ent, error: entErr } = await supa
    .from("billing_entitlements")
    .select("user_id, rc_app_user_id, pro_active, pro_expires_at, source, last_event_id, last_event_at, updated_at")
    .eq("user_id", v.user.id)
    .maybeSingle();

  return NextResponse.json({
    ok: true,
    isAuthed: true,
    user: { id: v.user.id, email: v.user.email ?? null, created_at: createdAt },
    profile: v.profile,
    isPro: !!(v.forceProOn || v.profile?.is_pro),
    isAdmin: !!v.profile?.is_admin,
    forceProOn: !!v.forceProOn,
    entitlement: entErr ? null : ent,
  });
}
