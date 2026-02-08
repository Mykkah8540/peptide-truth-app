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
  return NextResponse.json(
   {
    ok: true,
    isAuthed: false,
    user: null,
    profile: null,
    plan: { isPro: false, isAdmin: false, forceProOn: false },
    entitlement: null,
    events: null,
   },
   { status: 200 }
  );
 }

 const supa = await supabaseServer();

 // Entitlement snapshot (authoritative billing gate snapshot written by webhook)
 let entitlement: EntRow | null = null;
 try {
  const { data: ent } = await supa
   .from("billing_entitlements")
   .select("user_id, rc_app_user_id, pro_active, pro_expires_at, source, last_event_id, last_event_at, updated_at")
   .eq("user_id", v.user.id)
   .maybeSingle();
  entitlement = (ent as any) ?? null;
 } catch {
  entitlement = null;
 }

 // Optional: recent billing events if table exists (best-effort)
 let events: any[] | null = null;
 try {
  const { data: ev } = await supa
   .from("billing_events")
   .select("id, event_id, event_type, created_at")
   .eq("user_id", v.user.id)
   .order("created_at", { ascending: false })
   .limit(10);
  events = (ev as any) ?? null;
 } catch {
  events = null;
 }

 const isPro = Boolean(v.forceProOn || v.profile?.is_pro);
 const isAdmin = Boolean(v.profile?.is_admin);

 return NextResponse.json(
  {
   ok: true,
   isAuthed: true,
   user: {
    id: v.user.id,
    email: v.user.email ?? null,
    created_at: v.user.created_at ?? null,
   },
   profile: v.profile ?? null,
   plan: { isPro, isAdmin, forceProOn: Boolean(v.forceProOn) },
   entitlement,
   events,
  },
  { status: 200 }
 );
}
