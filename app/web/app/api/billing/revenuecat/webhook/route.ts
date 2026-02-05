import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, route: "revenuecat_webhook" });
}

import { createClient } from "@supabase/supabase-js";

type RcSubscriber = {
  subscriber?: {
    entitlements?: Record<
      string,
      {
        expires_date?: string | null;
        product_identifier?: string | null;
        purchase_date?: string | null;
      }
    >;
  };
};

function supabaseService() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !key) throw new Error("missing_supabase_service_env");
  return createClient(url, key, { auth: { persistSession: false } });
}

function authOk(req: Request): boolean {
  const want = (process.env.REVENUECAT_WEBHOOK_AUTH || "").trim();
  if (!want) return false;
  const got = String(req.headers.get("authorization") || "").trim();
  if (!got) return false;
  // Accept either exact match or Bearer match for flexibility
  if (got === want) return true;
  if (got === `Bearer ${want}`) return true;
  return false;
}

async function fetchCanonicalSubscriber(appUserId: string): Promise<RcSubscriber | null> {
  const secret = (process.env.REVENUECAT_SECRET_API_KEY || "").trim();
  if (!secret) throw new Error("missing_revenuecat_secret");
  const url = `https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(appUserId)}`;
  const r = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    // no-store: always fresh
    cache: "no-store" as any,
  });
  if (!r.ok) return null;
  const j = (await r.json().catch(() => null)) as any;
  if (!j || typeof j !== "object") return null;
  return j as RcSubscriber;
}

function pickEvent(payload: any) {
  // RevenueCat webhooks typically include { event: { id, type, app_user_id, ... } }
  const ev = payload?.event || payload;
  const eventId =
    String(ev?.id || payload?.event_id || payload?.id || "").trim() ||
    null;
  const eventType =
    String(ev?.type || payload?.event_type || payload?.type || "").trim() ||
    "unknown";
  const appUserId =
    String(
      ev?.app_user_id ||
        payload?.app_user_id ||
        payload?.subscriber?.app_user_id ||
        payload?.customer?.app_user_id ||
        ""
    ).trim() || null;

  return { eventId, eventType, appUserId };
}

function entitlementFromSubscriber(sub: RcSubscriber | null) {
  const entId = (process.env.REVENUECAT_PRO_ENTITLEMENT_ID || "pro").trim();
  const ent = sub?.subscriber?.entitlements?.[entId];
  if (!ent) return { proActive: false, expiresAt: null as string | null };

  const exp = ent.expires_date ?? null;
  // If expires_date is null, treat as lifetime/active.
  if (!exp) return { proActive: true, expiresAt: null as string | null };

  const t = new Date(exp).getTime();
  if (!Number.isFinite(t)) return { proActive: true, expiresAt: exp };

  const now = Date.now();
  return { proActive: t > now, expiresAt: exp };
}

export async function POST(req: Request) {
  try {
    if (!authOk(req)) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const payload = await req.json().catch(() => null);
    if (!payload) return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });

    const { eventId, eventType, appUserId } = pickEvent(payload);
    if (!eventId) return NextResponse.json({ ok: false, error: "missing_event_id" }, { status: 400 });
    if (!appUserId) return NextResponse.json({ ok: false, error: "missing_app_user_id" }, { status: 400 });

    const supa = supabaseService();

    // Idempotency: store event; if exists, accept
    const { error: insErr } = await supa.from("billing_webhook_events").insert({
      event_id: eventId,
      event_type: eventType,
      rc_app_user_id: appUserId,
      payload,
    });

    // If duplicate key, treat as OK
    if (insErr && !String(insErr.message || "").toLowerCase().includes("duplicate")) {
      return NextResponse.json({ ok: false, error: "event_store_failed" }, { status: 500 });
    }
    if (!insErr) {
      // fresh event stored
    } else {
      // duplicate event -> still proceed with canonical sync (safe), or short-circuit
      // We'll short-circuit for speed & stability.
      return NextResponse.json({ ok: true, deduped: true });
    }

    // Canonical fetch to avoid out-of-order webhook edge cases
    const sub = await fetchCanonicalSubscriber(appUserId);
    const { proActive, expiresAt } = entitlementFromSubscriber(sub);

    // app_user_id is Supabase UUID string by design
    const userId = appUserId;

    // Reliability: RevenueCat TEST events (and misconfigured app_user_id) may not map to a real Supabase user.
    // We still store the webhook event above (idempotent), but we only mutate entitlements/profiles if the user exists.
    const { data: profExists } = await supa
      .from("profiles")
      .select("id,user_id")
      .or(`user_id.eq.${userId},id.eq.${userId}`)
      .maybeSingle();
    const hasProfile = !!(profExists?.user_id || profExists?.id);
    if (!hasProfile) {
      return NextResponse.json({ ok: true, ignored: "unknown_user", app_user_id: appUserId });
    }

    const profileMatchCol = profExists?.user_id === userId ? "user_id" : "id";

    // Upsert entitlement snapshot
    const { error: upErr } = await supa.from("billing_entitlements").upsert(
      {
        user_id: userId,
        rc_app_user_id: appUserId,
        pro_active: proActive,
        pro_expires_at: expiresAt,
        source: "revenuecat",
        last_event_id: eventId,
        last_event_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
    if (upErr) return NextResponse.json({ ok: false, error: "entitlement_upsert_failed" }, { status: 500 });

    // Update profile gate field
    const { error: profErr } = await supa
      .from("profiles")
      .update({ is_pro: proActive })
      .eq(profileMatchCol, userId);

    if (profErr) return NextResponse.json({ ok: false, error: "profile_update_failed" }, { status: 500 });

    return NextResponse.json({ ok: true, proActive, expiresAt });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || "server_error") }, { status: 500 });
  }
}
