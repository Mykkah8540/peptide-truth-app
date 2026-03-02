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
  updated_at: string | null;
};

type ActivityRow = { path: string; at: string };

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
  if (parts[0]?.length >= 2) return (parts[0][0] + parts[0][1]).toUpperCase();
  return "ME";
}

function fmtDate(x: string | null | undefined): string | null {
  if (!x) return null;
  const d = new Date(x);
  if (!Number.isFinite(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function fmtDateTime(x: string | null | undefined): string | null {
  if (!x) return null;
  const d = new Date(x);
  if (!Number.isFinite(d.getTime())) return null;
  return d.toLocaleString();
}

export default function AccountClient() {
  const router = useRouter();
  const [data, setData] = useState<AccountResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function logoutClient() {
    try {
      const supa = supabaseBrowser();
      await supa.auth.signOut();
    } catch { /* ignore */ } finally {
      router.replace("/");
      setTimeout(() => router.refresh(), 0);
    }
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/account", { cache: "no-store" });
        const j = (await res.json()) as AccountResponse;
        if (!cancelled) setData(j);
      } catch (e: any) {
        if (!cancelled) setError(String(e?.message || e));
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const nextPath = "/account";
  const manageSubHref = "/account/subscription";
  const loginHref = useMemo(() => `/login?next=${encodeURIComponent(nextPath)}`, []);

  if (error) return <p className="pt-card-subtext" style={{ marginTop: 12 }}>Error loading account: {error}</p>;
  if (!data) return <p className="pt-card-subtext" style={{ marginTop: 12 }}>Loading…</p>;

  // ── Not signed in ──
  if (!data.isAuthed) {
    return (
      <div className="pt-account">
        <p className="pt-account__note" style={{ marginTop: 0 }}>
          Sign in to view your account and manage your subscription.
        </p>
        <div className="pt-account__actions">
          <Link href={loginHref} className="pt-account__btn pt-account__btn--primary">
            Sign in
          </Link>
          <Link href="/signup" className="pt-account__btn">
            Create account
          </Link>
        </div>
      </div>
    );
  }

  const email = data.user?.email ?? null;
  const displayName = data.profile?.display_name ?? null;
  const initials = (data.profile?.initials ?? initialsFallback(email)).slice(0, 2).toUpperCase();
  const memberSince = fmtDate((data.user as any)?.created_at ?? null);

  const plan = data.plan ?? { isPro: false, isAdmin: false, forceProOn: false };
  const planLabel = plan.isPro ? "Peptide Truth Pro" : "Free";
  const primaryCtaHref = plan.isPro ? manageSubHref : "/upgrade";
  const primaryCtaLabel = plan.isPro ? "Manage subscription" : "Upgrade to Pro";

  const exp = data.entitlement?.pro_expires_at ?? null;
  const entitlementActive = plan.forceProOn ? true : !!(data.entitlement?.pro_active ?? plan.isPro);
  const activity = Array.isArray(data.activity) ? data.activity : [];

  return (
    <div className="pt-account">

      {/* ── HERO ── */}
      <div className="pt-account__hero">
        <div className="pt-account__hero-row">
          {data.profile?.avatar_url ? (
            <img
              src={data.profile.avatar_url}
              alt="Profile photo"
              className="pt-account__avatar"
            />
          ) : (
            <div className="pt-account__avatar" aria-label="Avatar">
              {initials}
            </div>
          )}

          <div className="pt-account__ident">
            <div className="pt-account__name">{displayName || email || "Account"}</div>
            <div className="pt-account__email">{email || "—"}</div>
            {memberSince && (
              <div className="pt-account__since">Member since {memberSince}</div>
            )}
          </div>

          <div className="pt-account__badges">
            {/* Plan badge */}
            <span className={`pt-account__badge ${plan.isPro ? "pt-account__badge--pro" : "pt-account__badge--free"}`}>
              {plan.isPro ? "Pro" : "Free"}
            </span>

            {/* Dev override indicator */}
            {plan.forceProOn && (
              <span className="pt-account__badge pt-account__badge--override">
                Dev override
              </span>
            )}

            {/* Admin badge → links to admin panel */}
            {plan.isAdmin && (
              <a href="/admin" className="pt-account__badge pt-account__badge--admin">
                Admin panel →
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── INFO GRID ── */}
      <div className="pt-account__grid">
        <div className="pt-account__card">
          <div className="pt-account__card-label">Subscription</div>
          <div className="pt-account__card-title">{planLabel}</div>
          <div className="pt-account__card-detail">
            Status: {entitlementActive ? "Active" : "Inactive"}
            {exp ? ` · Renews ${fmtDate(exp) ?? exp}` : ""}
          </div>
          {!plan.isPro && (
            <div className="pt-account__card-detail" style={{ marginTop: 8 }}>
              Peptide profiles are always free. Pro unlocks stacks, blends, and discovery tools.
            </div>
          )}
        </div>

        <div className="pt-account__card">
          <div className="pt-account__card-label">Billing</div>
          <div className="pt-account__card-title">RevenueCat</div>
          <div className="pt-account__card-detail">
            Subscriptions are managed via RevenueCat. Use "Manage subscription" to update or cancel.
          </div>
        </div>
      </div>

      {/* ── RECENT ACTIVITY ── */}
      <div className="pt-account__card">
        <div className="pt-account__card-label">Recent activity</div>
        {activity.length ? (
          <div className="pt-account__activity-list">
            {activity.slice(0, 8).map((a, i) => (
              <div key={a.path + a.at + i} className="pt-account__activity-row">
                <div className="pt-account__activity-path">{a.path}</div>
                <div className="pt-account__activity-at">{fmtDateTime(a.at) || a.at}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pt-account__card-detail" style={{ marginTop: 6 }}>
            No recent activity recorded yet.
          </div>
        )}
      </div>

      {/* ── ACTIONS ── */}
      <div className="pt-account__actions">
        <Link href={primaryCtaHref} className="pt-account__btn pt-account__btn--primary">
          {primaryCtaLabel}
        </Link>
        <button type="button" onClick={logoutClient} className="pt-account__btn">
          Log out
        </button>
      </div>

      <div className="pt-account__note">
        Need help? Contact support if your subscription state looks incorrect.
      </div>

    </div>
  );
}
