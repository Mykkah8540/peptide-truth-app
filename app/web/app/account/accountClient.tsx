"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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
  user: { id: string; email: string | null; created_at: string | null } | null;
  profile: ViewerProfile | null;
  plan: { isPro: boolean; isAdmin: boolean; forceProOn: boolean };
  entitlement: EntitlementRow | null;
  events: any[] | null;
};

type RecentItem = { path: string; at: number };

function initialsFallback(email: string | null): string {
  const e = (email || "").trim();
  if (!e) return "ME";
  const name = e.split("@")[0] || "";
  const parts = name.split(/[._-]+/g).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  if (parts.length === 1 && parts[0].length >= 2) return (parts[0][0] + parts[0][1]).toUpperCase();
  if (parts.length === 1 && parts[0].length === 1) return (parts[0][0] + "X").toUpperCase();
  return "ME";
}

function fmt(dt: string | null): string | null {
  if (!dt) return null;
  const d = new Date(dt);
  if (!Number.isFinite(d.getTime())) return dt;
  return d.toLocaleString();
}

function readRecent(): RecentItem[] {
  try {
    const raw = localStorage.getItem("pt_recent_activity_v1");
    const list = raw ? (JSON.parse(raw) as any[]) : [];
    return (Array.isArray(list) ? list : [])
      .map((x) => ({ path: String(x?.path || ""), at: Number(x?.at || 0) }))
      .filter((x) => x.path.startsWith("/") && Number.isFinite(x.at) && x.at > 0)
      .slice(0, 8);
  } catch {
    return [];
  }
}

export default function AccountClient() {
  const [data, setData] = useState<AccountResponse | null>(null);
  const [status, setStatus] = useState<string>("Loading…");
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleteMsg, setDeleteMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setStatus("Loading…");
        const res = await fetch("/api/account", { cache: "no-store" });
        const j = (await res.json()) as AccountResponse;
        if (cancelled) return;
        setData(j);
        setStatus("Ready.");
      } catch (e: any) {
        if (cancelled) return;
        setError(String(e?.message || e));
        setStatus("Error.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const nextPath = "/account";
  const upgradeHref = useMemo(() => `/upgrade?next=${encodeURIComponent(nextPath)}`, []);
  const loginHref = useMemo(() => `/login?next=${encodeURIComponent(nextPath)}`, []);

  const recent = useMemo(() => {
    if (typeof window === "undefined") return [];
    return readRecent();
  }, [data?.ok]);

  async function requestDeletion() {
    if (deleting) return;
    setDeleteMsg(null);
    setDeleting(true);
    try {
      const res = await fetch("/api/account/delete-request", { method: "POST" });
      const j = await res.json();
      if (!res.ok || !j?.ok) {
        setDeleteMsg("Could not submit request. (If this is new, the Supabase table may not exist yet.)");
        return;
      }
      setDeleteMsg("Request received. Support will follow up.");
    } catch {
      setDeleteMsg("Could not submit request.");
    } finally {
      setDeleting(false);
    }
  }

  if (error) return <p className="pt-card-subtext">Error: {error}</p>;
  if (!data) return <p className="pt-card-subtext">{status}</p>;

  if (!data.isAuthed) {
    return (
      <>
        <p className="pt-card-subtext" style={{ marginTop: 10 }}>
          Sign in to view your account details and manage your subscription.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
          <Link
            href={loginHref}
            style={{
              border: "1px solid #000",
              padding: "10px 12px",
              borderRadius: 12,
              fontWeight: 900,
              textDecoration: "none",
              background: "#fff",
              color: "inherit",
            }}
          >
            Sign in
          </Link>

          <Link
            href="/signup"
            style={{
              border: "1px solid #e5e5e5",
              padding: "10px 12px",
              borderRadius: 12,
              fontWeight: 900,
              textDecoration: "none",
              background: "#fff",
              color: "inherit",
            }}
          >
            Create account
          </Link>
        </div>
      </>
    );
  }

  const email = data.user?.email ?? null;
  const displayName = data.profile?.display_name ?? null;
  const initials = (data.profile?.initials ?? initialsFallback(email)).slice(0, 2).toUpperCase();

  const planLabel = data.plan.isPro ? "Pep-Talk Pro" : "Free";
  const badgeLabel = data.plan.isPro ? "PRO" : "FREE";

  const exp = data.entitlement?.pro_expires_at ?? null;
  const expLabel = fmt(exp);

  const entitlementActive = data.plan.forceProOn ? true : !!(data.entitlement?.pro_active ?? data.plan.isPro);

  const memberSince = fmt(data.user?.created_at ?? null);

  return (
    <div style={{ marginTop: 12 }}>
      <div
        style={{
          marginTop: 6,
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 14,
          padding: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div
            aria-label="Avatar"
            title={email || "Account"}
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.15)",
              background: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 950,
              letterSpacing: 0.4,
            }}
          >
            {initials}
          </div>

          <div style={{ minWidth: 220 }}>
            <div style={{ fontWeight: 950, fontSize: 16 }}>{displayName || email || "Account"}</div>
            <div style={{ opacity: 0.7, fontWeight: 800, marginTop: 2 }}>{email || "—"}</div>
            {memberSince ? (
              <div style={{ opacity: 0.7, fontWeight: 800, marginTop: 2, fontSize: 12 }}>Member since: {memberSince}</div>
            ) : null}
          </div>

          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid rgba(0,0,0,0.18)",
                borderRadius: 999,
                padding: "6px 10px",
                fontSize: 12,
                fontWeight: 950,
                background: "#fff",
              }}
              title={planLabel}
            >
              {badgeLabel}
            </span>

            {data.plan.forceProOn ? (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 999,
                  padding: "6px 10px",
                  fontSize: 12,
                  fontWeight: 900,
                  opacity: 0.75,
                }}
                title="Admin flag: force_pro_on"
              >
                Dev unlock
              </span>
            ) : null}

            {data.plan.isAdmin ? (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 999,
                  padding: "6px 10px",
                  fontSize: 12,
                  fontWeight: 900,
                  opacity: 0.75,
                }}
                title="Admin"
              >
                Admin
              </span>
            ) : null}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 12 }}>
          <div style={{ minWidth: 260 }}>
            <div style={{ fontWeight: 950, fontSize: 12, letterSpacing: 0.6, opacity: 0.7 }}>SUBSCRIPTION</div>
            <div style={{ fontWeight: 900, marginTop: 2 }}>{planLabel}</div>
            <div className="pt-card-subtext" style={{ marginTop: 6 }}>
              Status: {entitlementActive ? "Active" : "Inactive"}
              {expLabel ? ` • Renews/Expires: ${expLabel}` : ""}
            </div>
          </div>

          <div style={{ minWidth: 260 }}>
            <div style={{ fontWeight: 950, fontSize: 12, letterSpacing: 0.6, opacity: 0.7 }}>BILLING</div>
            <div className="pt-card-subtext" style={{ marginTop: 6 }}>
              Purchases are handled via RevenueCat. Use “Manage subscription” to proceed.
            </div>
          </div>

          <div style={{ minWidth: 260 }}>
            <div style={{ fontWeight: 950, fontSize: 12, letterSpacing: 0.6, opacity: 0.7 }}>RECENT ACTIVITY</div>
            {recent.length ? (
              <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                {recent.slice(0, 6).map((x) => (
                  <li key={x.path + String(x.at)} style={{ marginBottom: 4 }}>
                    <span style={{ fontWeight: 900 }}>{x.path}</span>{" "}
                    <span className="pt-card-subtext" style={{ marginLeft: 6 }}>
                      {new Date(x.at).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="pt-card-subtext" style={{ marginTop: 6 }}>
                No recent activity yet.
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
          <Link
            href={upgradeHref}
            style={{
              border: "1px solid #000",
              padding: "10px 12px",
              borderRadius: 12,
              fontWeight: 900,
              textDecoration: "none",
              background: "#fff",
              color: "inherit",
            }}
          >
            {data.plan.isPro ? "Manage subscription" : "Upgrade to Pro"}
          </Link>

          <Link
            href="/logout"
            style={{
              border: "1px solid #e5e5e5",
              padding: "10px 12px",
              borderRadius: 12,
              fontWeight: 900,
              textDecoration: "none",
              background: "#fff",
              color: "inherit",
            }}
          >
            Log out
          </Link>

          <button
            type="button"
            onClick={requestDeletion}
            disabled={deleting}
            style={{
              border: "1px solid rgba(0,0,0,0.18)",
              padding: "10px 12px",
              borderRadius: 12,
              fontWeight: 900,
              background: deleting ? "#eee" : "#fff",
              cursor: deleting ? "wait" : "pointer",
            }}
          >
            {deleting ? "Submitting…" : "Request account deletion"}
          </button>
        </div>

        {deleteMsg ? <div className="pt-card-subtext" style={{ marginTop: 10 }}>{deleteMsg}</div> : null}
      </div>
    </div>
  );
}
