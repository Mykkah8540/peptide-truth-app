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

 // Free
 { label: "Peptides", href: "/peptides", subtitle: "Compound Profiles" },
 { label: "Commercial Blends", href: "/blends", subtitle: "Branded Combinations" },
 { label: "Resources", href: "/resources", subtitle: "Education Library" },

 // Pro (always visible; pill indicates paid when not Pro). My Peps is in the avatar menu.
 { label: "Wellness Paths", href: "/categories", pro: true, subtitle: "Context Pathways" },
 { label: "Stack Builder", href: "/stack-builder", pro: true, subtitle: "Custom Stack Tool" },
 { label: "Explore Stacks", href: "/stacks", pro: true, subtitle: "Curated Stacks" },
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
    border: "1px solid rgba(0,0,0,0.16)",
    borderRadius: 999,
    padding: "2px 6px",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 0.7,
    lineHeight: 1,
    background: "rgba(255,255,255,0.9)",
    color: "rgba(0,0,0,0.88)",
    whiteSpace: "nowrap",
   }}
  >
   PRO
  </span>
 );
}

export default function NavBar(props: { peptides: EntityListItem[]; blends: EntityListItem[]; topics: TopicListItem[] }) {
 const [open, setOpen] = useState(false);
 const [showProBadges, setShowProBadges] = useState(true);
 const router = useRouter();

 // We must not rely on a one-time viewer fetch; the menu needs to update immediately after auth changes.
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
    // If user is Pro => hide PRO pills. Otherwise show pills (marketing + clear gating).
    setShowProBadges(!isPro);
   } catch {
    // Default: show badges (marketing) if viewer check fails
    if (!mounted.current) return;
    setShowProBadges(true);
   }
  }

  // Initial hydrate
  refreshViewer();

  // Update immediately on auth changes (login/logout) so menu does not require a full page refresh.
  const { data: sub } = supa.auth.onAuthStateChange(() => {
   // Refresh server-derived gate state (profiles.is_pro + dev unlock)
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

 const items = NAV_ITEMS; // always visible (Pro items route to /upgrade when not Pro)

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
   <div style={{ maxWidth: 980, margin: "0 auto", padding: "14px 16px", display: "grid", gap: 10 }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 12 }}>
     <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <button
       type="button"
       aria-label="Back"
       onClick={goBack}
       style={{
        border: "1px solid rgba(0,0,0,0.10)",
        background: "#fff",
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

     
<div style={{ display: "flex", justifyContent: "center", minWidth: 0 }}>
        <nav
         className="desktop-nav"
         style={{
          display: "inline-flex",
          gap: 14,
          flexWrap: "nowrap",
          alignItems: "center",
          overflowX: "auto",
          maxWidth: "100%",
          whiteSpace: "nowrap",
          paddingBottom: 2,
         }}
        >
         {items.slice(1).map((item) => (
        <span key={item.href} style={{ display: "inline-flex", alignItems: "center" }}>
         <Link
          href={item.pro && showProBadges ? `/upgrade?next=${encodeURIComponent(item.href)}` : item.href}
          style={{
           textDecoration: "none",
           color: "inherit",
           opacity: 0.92,
           fontWeight: 800,
           fontSize: 14,
           display: "inline-flex",
           alignItems: "center",
           whiteSpace: "nowrap",
           lineHeight: 1,
          }}
         >
          <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
             <span style={{ display: "inline-flex", alignItems: "center" }}>
              <span>{item.label}</span>
              {showProBadges && item.pro ? <ProPill /> : null}
             </span>            </span>
         </Link>
        </span>
       ))}
       
      </nav>
</div>

      <div
       className="taxonomy-legend"
       style={{
        display: "flex",
        justifyContent: "center",
        gap: 14,
        flexWrap: "wrap",
        fontSize: 11,
        fontWeight: 650,
        letterSpacing: 0.2,
        opacity: 0.52,
        paddingTop: 2,
       }}
      >
       <span>Peptides = Compound Profiles</span>
       <span>Commercial Blends = Branded Combinations</span>
       <span>Resources = Education Library</span>
       <span>Wellness Paths = Context Pathways</span>
       <span>Stack Builder = Custom Stack Tool</span>
       <span>Explore Stacks = Curated Stacks</span>
      </div>


<div style={{ display: "inline-flex", alignItems: "center", justifyContent: "flex-end", gap: 12, paddingLeft: 12 }}>
 <AccountChip />
 <button
       className="mobile-menu-btn"
       aria-label="Open menu"
       onClick={() => setOpen(true)}
       style={{
        border: "1px solid rgba(0,0,0,0.10)",
        background: "#fff",
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

   <MobileMenu open={open} onClose={() => setOpen(false)} items={items} showProBadges={showProBadges} />
  </header>
 );
}
