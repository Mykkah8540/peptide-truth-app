"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileMenu from "./MobileMenu";
import HomeSearch from "@/components/HomeSearch";
import type { EntityListItem, TopicListItem } from "@/lib/content";
import AccountChip from "@/components/AccountChip";
import { supabaseBrowser } from "@/lib/supabase/browser";

type NavItem = {
  label: string;
  href: string;
  pro?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },

  // Free
  { label: "Peptides", href: "/peptides" },
  { label: "Blends", href: "/blends" },
  { label: "Resources", href: "/resources" },

  // Pro (always visible; pill shows if not PRO)
  { label: "Wellness Paths", href: "/categories", pro: true },
  { label: "Stack Builder", href: "/stack-builder", pro: true },
  { label: "Explore Stacks", href: "/stacks", pro: true },
  { label: "My Peps", href: "/my-peps", pro: true },
];

function ProPill() {
  return (
    <span
      aria-label="Pro"
      title="Pro"
      style={{
        marginLeft: 8,
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid rgba(0,0,0,0.18)",
        borderRadius: 999,
        padding: "2px 8px",
        fontSize: 10,
        fontWeight: 900,
        letterSpacing: 0.9,
        lineHeight: 1,
        opacity: 0.92,
      }}
    >
      PRO
    </span>
  );
}

export default function NavBar(props: {
  peptides: EntityListItem[];
  blends: EntityListItem[];
  topics: TopicListItem[];
}) {
  const [open, setOpen] = useState(false);

  // If true, we show PRO pills + send PRO links to /upgrade?next=...
  // This should be TRUE for signed-out users and Free users, FALSE for PRO users.
  const [showProBadges, setShowProBadges] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const supa = supabaseBrowser();
    let alive = true;

    async function syncViewer() {
      try {
        const r = await fetch("/api/viewer", { cache: "no-store" as any });
        const j = await r.json().catch(() => null);
        if (!alive) return;

        const isPro = !!j?.isPro;
        setShowProBadges(!isPro);
      } catch {
        // If viewer check fails, default to showing badges (marketing)
        if (!alive) return;
        setShowProBadges(true);
      }
    }

    // Initial sync
    syncViewer();

    // React instantly to auth changes (login/logout) without requiring a manual refresh
    const { data: sub } = supa.auth.onAuthStateChange(() => {
      syncViewer();
      setTimeout(() => router.refresh(), 0);
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  function goBack() {
    // Site-scoped back:
    // - If referrer is within this site, go back.
    // - Otherwise, return to Home instead of backing out of the site.
    try {
      const ref = typeof document !== "undefined" ? String(document.referrer || "") : "";
      const origin = typeof window !== "undefined" ? String(window.location.origin || "") : "";
      const sameOrigin = !!ref && !!origin && ref.startsWith(origin);

      if (sameOrigin) router.back();
      else router.push("/");
    } catch {
      router.push("/");
    }
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#fff",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "14px 16px",
          display: "grid",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <button
              type="button"
              aria-label="Back"
              onClick={goBack}
              style={{
                border: "1px solid rgba(0,0,0,0.10)",
                background: "rgba(0,0,0,0.02)",
                borderRadius: 999,
                padding: "6px 10px",
                fontSize: 14,
                fontWeight: 900,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ←
            </button>

            <Link
              href="/"
              style={{
                fontWeight: 900,
                letterSpacing: -0.3,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Pep-Talk
            </Link>
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            {/* Desktop nav (shown via CSS media query) */}
            <nav className="desktop-nav" style={{ gap: 16, flexWrap: "wrap", alignItems: "center" }}>
              {NAV_ITEMS.slice(1).map((item) => (
                <span key={item.href} style={{ display: "inline-flex", alignItems: "center" }}>
                  <Link
                    href={item.pro && showProBadges ? `/upgrade?next=${encodeURIComponent(item.href)}` : item.href}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      opacity: 0.9,
                      fontWeight: 800,
                      fontSize: 14,
                      display: "inline-flex",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span>{item.label}</span>
                    {item.pro && showProBadges ? <ProPill /> : null}
                  </Link>
                </span>
              ))}
              <AccountChip />
            </nav>

            {/* Mobile toggle (shown via CSS media query) */}
            <button
              className="mobile-menu-btn"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              style={{
                border: "1px solid rgba(0,0,0,0.10)",
                background: "rgba(0,0,0,0.02)",
                borderRadius: 999,
                padding: "8px 10px",
                fontSize: 18,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ☰
            </button>
          </div>
        </div>

        <HomeSearch peptides={props.peptides} blends={props.blends} topics={props.topics} />
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} items={NAV_ITEMS} showProBadges={showProBadges} />
    </header>
  );
}
