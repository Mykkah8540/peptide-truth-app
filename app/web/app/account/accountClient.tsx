"use client";

import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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

type ActivityRow = {
  path: string;
  at: string;
};

type AccountResponse = {
  ok: boolean;
  isAuthed: boolean;
  user: { id: string; email: string | null; created_at?: string | null } | null;
  profile: ViewerProfile | null;
  plan?: { isPro: boolean; isAdmin: boolean; forceProOn: boolean } | null;
  entitlement: EntitlementRow | null;
  activity?: ActivityRow[] | null;
};

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

function fmtDateTime(x: string | null | undefined): string | null {
  if (!x) return null;
  const d = new Date(x);
  if (!Number.isFinite(d.getTime())) return null;
  return d.toLocaleString();
}

const S = {
  wrap: { marginTop: 12 } as React.CSSProperties,

  // Layout
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 12,
    marginTop: 12,
  } as React.CSSProperties,

  card: {
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 16,
    background: "#fff",
    padding: 16,
  } as React.CSSProperties,

  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  } as React.CSSProperties,

  ident: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 240,
  } as React.CSSProperties,

  name: { fontWeight: 950, fontSize: 16 } as React.CSSProperties,
  sub: { opacity: 0.72, fontWeight: 800 } as React.CSSProperties,

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.15)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 950,
    letterSpacing: 0.4,
    background: "#fff",
    flex: "0 0 auto",
  } as React.CSSProperties,

  badgeRow: {
    marginLeft: "auto",
    display: "flex",
    gap: 8,
    alignItems: "center",
    flexWrap: "wrap",
  } as React.CSSProperties,

  pill: {
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid rgba(0,0,0,0.18)",
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 12,
    fontWeight: 950,
    background: "#fff",
    whiteSpace: "nowrap",
  } as React.CSSProperties,

  pillSoft: {
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 12,
    fontWeight: 900,
    opacity: 0.78,
    whiteSpace: "nowrap",
    background: "transparent",
  } as React.CSSProperties,

  sectionLabel: {
    fontWeight: 950,
    fontSize: 12,
    letterSpacing: 0.8,
    opacity: 0.65,
    marginBottom: 6,
  } as React.CSSProperties,

  sectionTitle: { fontWeight: 950, fontSize: 18, margin: 0 } as React.CSSProperties,
  sectionText: { marginTop: 6, opacity: 0.78, fontWeight: 800 } as React.CSSProperties,

  // Activity
  activityList: { display: "flex", flexDirection: "column", gap: 10, marginTop: 10 } as React.CSSProperties,
  activityRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
  } as React.CSSProperties,
  activityPath: { fontWeight: 950 } as React.CSSProperties,
  activityAt: { opacity: 0.7, fontWeight: 800, fontSize: 13, whiteSpace: "nowrap" } as React.CSSProperties,

  // Actions
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  } as React.CSSProperties,

  btnBase: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "10px 14px",
    borderRadius: 14,
    fontWeight: 950,
    textDecoration: "none",
    cursor: "pointer",
    userSelect: "none",
    border: "1px solid rgba(0,0,0,0.12)",
    background: "#fff",
    color: "inherit",
  } as React.CSSProperties,

  btnPrimary: {
    border: "1px solid rgba(0,0,0,0.90)",
  } as React.CSSProperties,

  btnDanger: {
    border: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(0,0,0,0.03)",
  } as React.CSSProperties,

  note: { marginTop: 12, opacity: 0.7, fontWeight: 800 } as React.CSSProperties,
};

export default function AccountClient() {
  const router = useRouter();

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

  const [data, setData] = useState<AccountResponse | null>(null);
  const [status, setStatus] = useState<string>("Loading…");
  const [error, setError] = useState<string | null>(null);

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
  const manageSubHref = useMemo(() => `/account/subscription`, []);
  const loginHref = useMemo(() => `/login?next=${encodeURIComponent(nextPath)}`, []);

  if (error) return <p className="pt-card-subtext">Error: {error}</p>;
  if (!data) return <p className="pt-card-subtext">{status}</p>;

  if (!data.isAuthed) {
    return (
      <div style={S.wrap}>
        <p className="pt-card-subtext" style={{ marginTop: 10 }}>
          Sign in to view your account details and manage your subscription.
        </p>

        <div style={S.actions}>
          <Link href={loginHref} style={{ ...S.btnBase, ...S.btnPrimary }}>
            Sign in
          </Link>

          <Link href="/signup" style={S.btnBase}>
            Create account
          </Link>
        </div>
      </div>
    );
  }

  const email = data.user?.email ?? null;
  const displayName = data.profile?.display_name ?? null;
  const initials = (data.profile?.initials ?? initialsFallback(email)).slice(0, 2).toUpperCase();

  const plan = data.plan ?? { isPro: false, isAdmin: false, forceProOn: false };
  const planLabel = plan.isPro ? "Pep-Talk Pro" : "Free";
  const badgeLabel = plan.isPro ? "PRO" : "FREE";

  const primaryCtaHref = plan.isPro ? manageSubHref : "/upgrade";
  const primaryCtaLabel = plan.isPro ? "Manage subscription" : "Upgrade to Pro";

  const memberSince = fmtDateTime((data.user as any)?.created_at ?? null);
  const exp = data.entitlement?.pro_expires_at ?? null;
  const expLabel = fmtDateTime(exp);

  const entitlementActive = plan.forceProOn ? true : !!(data.entitlement?.pro_active ?? plan.isPro);

  const activity = Array.isArray(data.activity) ? data.activity : [];

  return (
    <div style={S.wrap}>
      {/* HERO */}
      <div style={S.card}>
        <div style={S.headerRow}>
          <div style={S.avatar} aria-label="Avatar" title={email || "Account"}>
            {initials}
          </div>

          <div style={S.ident}>
            <div style={S.name}>{displayName || email || "Account"}</div>
            <div style={S.sub}>{email || "—"}</div>
            {memberSince ? <div style={{ ...S.sub, opacity: 0.6 }}>Member since: {memberSince}</div> : null}
          </div>

          <div style={S.badgeRow}>
            <span style={S.pill} title={planLabel}>
              {badgeLabel}
            </span>
            {plan.forceProOn ? (
              <span style={S.pillSoft} title="Admin flag: force_pro_on">
                Dev unlock
              </span>
            ) : null}
            {plan.isAdmin ? (
              <span style={S.pillSoft} title="Admin">
                Admin
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* INFO GRID */}
      <div
        style={S.grid2}
      >
        <div style={S.card}>
          <div style={S.sectionLabel}>SUBSCRIPTION</div>
          <h2 style={S.sectionTitle}>{planLabel}</h2>
          <div style={S.sectionText}>
            Status: {entitlementActive ? "Active" : "Inactive"}
            {expLabel ? ` • Renews/Expires: ${expLabel}` : ""}
          </div>
          <div className="pt-card-subtext" style={{ marginTop: 8 }}>
            Educational peptide information is always free. Pro unlocks discovery, organization, and synthesis tools.
          </div>
        </div>

        <div style={S.card}>
          <div style={S.sectionLabel}>BILLING</div>
          <h2 style={S.sectionTitle}>RevenueCat</h2>
          <div style={S.sectionText}>Purchases are handled via RevenueCat. Use “Manage subscription” to proceed.</div>
          <div className="pt-card-subtext" style={{ marginTop: 8 }}>
            If your plan doesn’t update immediately after purchase, refresh the page.
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div style={{ ...S.card, marginTop: 12 }}>
        <div style={S.sectionLabel}>RECENT ACTIVITY</div>

        {activity.length ? (
          <div style={S.activityList}>
            {activity.slice(0, 8).map((a, i) => (
              <div key={a.path + a.at + i} style={S.activityRow}>
                <div style={S.activityPath}>{a.path}</div>
                <div style={S.activityAt}>{fmtDateTime(a.at) || a.at}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pt-card-subtext" style={{ marginTop: 6 }}>
            No recent activity yet.
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div style={S.actions}>
        <Link href={primaryCtaHref} style={{ ...S.btnBase, ...S.btnPrimary }}>
          {primaryCtaLabel}
        </Link>

        <button type="button" onClick={logoutClient} style={S.btnBase}>
          Log out
        </button>
      </div>

      <div style={S.note}>
        Need help? Contact support if you believe your subscription state is incorrect.
      </div>

      <style jsx>{`
        @media (min-width: 860px) {
          .pt-page :global(.pt-card) {
            max-width: 920px;
          }
        }
        @media (min-width: 780px) {
          div[style*="grid-template-columns: 1fr"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
