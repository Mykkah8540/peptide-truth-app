"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

type Item = {
  label: string;
  href: string;
  pro?: boolean;
  subtitle?: string;
};

function ProPill() {
  return <span className="pt-mobile__pro-pill">PRO</span>;
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function MobileMenu(props: { open: boolean; onClose: () => void; items: Item[]; showProBadges?: boolean }) {
  const { open, onClose, items, showProBadges = true } = props;

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supa = supabaseBrowser();
    let alive = true;

    async function hydrate() {
      try {
        const { data } = await supa.auth.getUser();
        if (!alive) return;
        setEmail(data.user?.email ?? null);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    hydrate();

    const { data: sub } = supa.auth.onAuthStateChange((_event, session) => {
      if (!alive) return;
      setEmail(session?.user?.email ?? null);
      setTimeout(() => {
        router.refresh();
      }, 0);
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  async function handleLogout() {
    try {
      const supa = supabaseBrowser();
      setEmail(null);
      await supa.auth.signOut();
    } catch {
      // ignore
    } finally {
      onClose();
      router.replace("/");
      setTimeout(() => {
        router.refresh();
      }, 0);
    }
  }

  if (!open) return null;

  const publicItems = items.filter((i) => !i.pro);
  const proItems = items.filter((i) => i.pro);

  return (
    <div className="pt-mobile__backdrop" onClick={onClose}>
      <div className="pt-mobile__panel" onClick={(e) => e.stopPropagation()}>

        <button onClick={onClose} className="pt-mobile__close">
          <CloseIcon />
          Close
        </button>

        <nav>
          <p className="pt-mobile__section-label">Menu</p>
          <div className="pt-mobile__link-list">
            {publicItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={onClose} className="pt-mobile__link">
                <span>{item.label}</span>
                {item.subtitle ? <span className="pt-mobile__link-sub">{item.subtitle}</span> : null}
              </Link>
            ))}
          </div>
        </nav>

        <div className="pt-mobile__divider" />

        <div>
          <p className="pt-mobile__section-label">Account</p>
          {loading ? (
            <div className="pt-mobile__loading">Loading…</div>
          ) : !email ? (
            <div className="pt-mobile__link-list">
              <Link href="/login" onClick={onClose} className="pt-mobile__link">Sign in</Link>
              <Link href="/signup" onClick={onClose} className="pt-mobile__link">Create account</Link>
            </div>
          ) : (
            <div className="pt-mobile__link-list">
              <Link href="/account" onClick={onClose} className="pt-mobile__link">Account</Link>
              <Link href="/my-peps" onClick={onClose} className="pt-mobile__link">My Peps</Link>
              <button type="button" onClick={handleLogout} className="pt-mobile__logout-btn">
                Sign out
              </button>
            </div>
          )}
        </div>

        <div className="pt-mobile__divider" />

        <div>
          <p className="pt-mobile__section-label">{showProBadges ? "Pro Features" : "Features"}</p>
          <div className="pt-mobile__link-list">
            {proItems.map((item) => (
              <Link
                key={item.href}
                href={item.pro && showProBadges ? `/upgrade?next=${encodeURIComponent(item.href)}` : item.href}
                onClick={onClose}
                className="pt-mobile__link"
              >
                <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  {item.label}
                  {showProBadges && item.pro ? <ProPill /> : null}
                </span>
                {item.subtitle ? <span className="pt-mobile__link-sub">{item.subtitle}</span> : null}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
