"use client";

import { useEffect, useRef, useState } from "react";
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
  subtitle?: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Peptides", href: "/peptides", subtitle: "Compound Profiles" },
  { label: "Commercial Blends", href: "/blends", subtitle: "Branded Combinations" },
  { label: "Resources", href: "/resources", subtitle: "Education Library" },
  { label: "Wellness Paths", href: "/categories", pro: true, subtitle: "Context Pathways" },
  { label: "Stack Builder", href: "/stack-builder", pro: true, subtitle: "Custom Stack Tool" },
  { label: "Explore Stacks", href: "/stacks", pro: true, subtitle: "Curated Stacks" },
];

function ProPill() {
  return <span className="pt-nav__pro-pill">PRO</span>;
}

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
      <rect width="18" height="2" rx="1" fill="currentColor" />
      <rect y="6" width="13" height="2" rx="1" fill="currentColor" />
      <rect y="12" width="18" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

export default function NavBar(props: { peptides: EntityListItem[]; blends: EntityListItem[]; topics: TopicListItem[] }) {
  const [open, setOpen] = useState(false);
  const [showProBadges, setShowProBadges] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const router = useRouter();

  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const supa = supabaseBrowser();

    async function refreshViewer() {
      try {
        const r = await fetch("/api/viewer", { cache: "no-store" as any });
        const j = await r.json().catch(() => null);
        if (!mounted.current) return;

        const isPro = !!j?.isPro;
        const isAdmin = !!(j?.profile?.is_admin);
        setShowAdmin(isAdmin);
        setShowProBadges(!isPro);
      } catch {
        if (!mounted.current) return;
        setShowProBadges(true);
        setShowAdmin(false);
      }
    }

    refreshViewer();

    const { data: sub } = supa.auth.onAuthStateChange(() => {
      setTimeout(() => {
        router.refresh();
        refreshViewer();
      }, 0);
    });

    return () => {
      mounted.current = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  function goBack() {
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

  const items = NAV_ITEMS;

  return (
    <header className="pt-nav">
      <div className="pt-nav__inner">
        <div className="pt-nav__row">

          {/* Left: back + logo */}
          <div className="pt-nav__left">
            <button type="button" aria-label="Back" onClick={goBack} className="pt-nav__back">
              <BackIcon />
            </button>
            <Link href="/" className="pt-nav__logo">
              Pep-Talk
            </Link>
          </div>

          {/* Center: desktop nav */}
          <div className="pt-nav__center">
            <nav className="desktop-nav pt-nav__links">
              {items.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.pro && showProBadges ? `/upgrade?next=${encodeURIComponent(item.href)}` : item.href}
                  className="pt-nav__link"
                >
                  {item.label}
                  {showProBadges && item.pro ? <ProPill /> : null}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: admin, account, hamburger */}
          <div className="pt-nav__right">
            {showAdmin ? (
              <Link href="/admin" className="pt-nav__admin-btn">
                Admin
              </Link>
            ) : null}
            <AccountChip />
            <button
              className="mobile-menu-btn pt-nav__hamburger"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <HamburgerIcon />
            </button>
          </div>

        </div>

        <HomeSearch peptides={props.peptides} blends={props.blends} topics={props.topics} />
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} items={items} showProBadges={showProBadges} />
    </header>
  );
}
