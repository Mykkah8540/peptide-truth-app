"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

type ViewerProfile = {
  id: string;
  email: string | null;
  display_name: string | null;
  initials: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  is_pro: boolean;
};

type EntitlementRow = {
  user_id: string;
  rc_app_user_id: string | null;
  pro_active: boolean | null;
  pro_expires_at: string | null;
  source: string | null;
  last_event_id: string | null;
  last_event_at: string | null;
  updated_at: string | null;
};

type AccountResponse = {
  ok: boolean;
  isAuthed: boolean;
  user: { id: string; email: string | null; created_at?: string | null } | null;
  profile: ViewerProfile | null;
  plan: { isPro: boolean; isAdmin: boolean; forceProOn: boolean };
  entitlement: EntitlementRow | null;
  events?: any[] | null;
};

function fmtDateTime(x?: string | null) {
  const v = String(x || "").trim();
  if (!v) return null;
  const t = Date.parse(v);
  if (!Number.isFinite(t)) return v;
  try {
    return new Date(t).toLocaleString();
  } catch {
    return v;
  }
}

const S: Record<string, any> = {
  wrap: { marginTop: 12 },
  card: {
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 14,
    padding: 14,
    background: "#fff",
  },
  sectionLabel: {
    fontWeight: 950,
    fontSize: 12,
    letterSpacing: 0.6,
    opacity: 0.65,
    marginBottom: 6,
  },
  title: { fontWeight: 950, fontSize: 16, margin: 0 },
  sub: { opacity: 0.75, fontWeight: 800, marginTop: 4 },
  actions: { display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 },
  btnBase: {
    border: "1px solid rgba(0,0,0,0.15)",
    padding: "10px 12px",
    borderRadius: 12,
    fontWeight: 900,
    textDecoration: "none",
    background: "#fff",
    color: "inherit",
    cursor: "pointer",
  },
  btnPrimary: {
    border: "1px solid #000",
    background: "linear-gradient(180deg, rgba(0,207,255,0.10), rgba(0,62,255,0.06))",
  },
  btnDanger: {
    border: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(0,0,0,0.02)",
  },
  dangerBox: {
    marginTop: 12,
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 14,
    padding: 14,
    background: "rgba(0,0,0,0.02)",
  },
  dangerTitle: { fontWeight: 950, margin: 0, fontSize: 14 },
  fine: { fontSize: 12, opacity: 0.75, fontWeight: 800, marginTop: 6 },
  list: { marginTop: 10, display: "grid", gap: 8 },
  row: { display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13, fontWeight: 800, opacity: 0.85 },
};

export default function SubscriptionClient() {
  const [data, setData] = useState<AccountResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dangerOpen, setDangerOpen] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/account", { cache: "no-store" });
        const j = (await res.json()) as AccountResponse;
        if (cancelled) return;
        setData(j);
      } catch (e: any) {
        if (cancelled) return;
        setError(String(e?.message || e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const accountHref = useMemo(() => "/account", []);
  const homeHref = useMemo(() => "/", []);

  async function logoutClient() {
    try {
      const supa = supabaseBrowser();
      await supa.auth.signOut();
    } catch {
      // ignore
    } finally {
      router.replace("/");
      setTimeout(() => router.refresh(), 0);
    }
  }

  async function requestDeletion() {
    setDeleteStatus(null);
    try {
      const res = await fetch("/api/account/delete-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j?.ok) {
        setDeleteStatus(j?.error ? String(j.error) : "Request failed.");
        return;
      }
      setDeleteStatus("Request received. Support will follow up by email.");
    } catch (e: any) {
      setDeleteStatus(String(e?.message || e));
    }
  }

  if (error) return <p className="pt-card-subtext">Error: {error}</p>;
  if (!data) return <p className="pt-card-subtext">Loading…</p>;

  if (!data.isAuthed) {
    return (
      <div style={S.wrap}>
        <p className="pt-card-subtext">Please sign in to manage your subscription.</p>
        <div style={S.actions}>
          <Link href="/login?next=%2Faccount%2Fsubscription" style={{ ...S.btnBase, ...S.btnPrimary }}>
            Sign in
          </Link>
          <Link href="/signup" style={S.btnBase}>
            Create account
          </Link>
        </div>
      </div>
    );
  }

  const plan = data.plan ?? { isPro: false, isAdmin: false, forceProOn: false };
  const expLabel = fmtDateTime(data.entitlement?.pro_expires_at ?? null);
  const entitlementActive = plan.forceProOn ? true : !!(data.entitlement?.pro_active ?? plan.isPro);

  const events = Array.isArray((data as any).events) ? ((data as any).events as any[]) : [];

  return (
    <div style={S.wrap}>
      <div style={S.card}>
        <div style={S.sectionLabel}>BILLING STATUS</div>
        <p style={S.title}>{plan.isPro ? "Pep-Talk Pro" : "Free"}</p>
        <p style={S.sub}>
          Status: {entitlementActive ? "Active" : "Inactive"}
          {expLabel ? ` • Renews/Expires: ${expLabel}` : ""}
        </p>

        <div style={{ marginTop: 10 }}>
          <div style={S.sectionLabel}>HELP</div>
          <div className="pt-card-subtext">
            Need help or seeing something that looks wrong? Email support: <b>support@mykkah.com</b>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={S.sectionLabel}>BILLING HISTORY</div>
          {events.length ? (
            <div style={S.list}>
              {events.slice(0, 10).map((ev, i) => (
                <div key={(ev?.id ?? "") + i} style={S.row}>
                  <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>
                    {String(ev?.event_type ?? "event")}
                  </div>
                  <div>{fmtDateTime(ev?.created_at ?? null) ?? "—"}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="pt-card-subtext">No billing events available yet.</div>
          )}
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={S.sectionLabel}>CANCEL</div>
          <div className="pt-card-subtext">
            Purchases are managed through RevenueCat. If you need help canceling, contact <b>support@mykkah.com</b> and
            we’ll walk you through the correct path for your purchase method.
          </div>
        </div>

        <div style={S.actions}>
          <Link href={accountHref} style={S.btnBase}>
            Back to account
          </Link>
          <Link href={homeHref} style={S.btnBase}>
            Home
          </Link>
          <button type="button" onClick={logoutClient} style={{ ...S.btnBase, ...S.btnPrimary }}>
            Log out
          </button>
        </div>
      </div>

      <div style={S.dangerBox}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <p style={S.dangerTitle}>Danger zone</p>
          <button type="button" onClick={() => setDangerOpen((v) => !v)} style={S.btnBase}>
            {dangerOpen ? "Hide" : "Show"}
          </button>
        </div>

        {dangerOpen ? (
          <>
            <div style={S.fine}>
              Account deletion is irreversible. If you proceed, we’ll record your request and support will follow up by
              email.
            </div>

            <div style={S.actions}>
              <button type="button" onClick={requestDeletion} style={{ ...S.btnBase, ...S.btnDanger }}>
                Request account deletion
              </button>
            </div>

            {deleteStatus ? <div className="pt-card-subtext" style={{ marginTop: 8 }}>{deleteStatus}</div> : null}
          </>
        ) : null}
      </div>
    </div>
  );
}
