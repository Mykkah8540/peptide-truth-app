"use client";

import { useState } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import HomeSearch from "@/components/HomeSearch";
import type { EntityListItem, TopicListItem } from "@/lib/content";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Peptides", href: "/peptides" },
  { label: "Blends", href: "/blends" },
  { label: "Topics", href: "/topics" },
  { label: "Stack Builder", href: "/stack-builder" },
];

export default function NavBar(props: {
  peptides: EntityListItem[];
  blends: EntityListItem[];
  topics: TopicListItem[];
}) {
  const [open, setOpen] = useState(false);

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
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontWeight: 900, letterSpacing: -0.3, textDecoration: "none", color: "inherit" }}>
            Pep-Talk
          </Link>

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ display: "none", gap: 14, flexWrap: "wrap" }}>
            {NAV_ITEMS.slice(1).map((item) => (
              <Link key={item.href} href={item.href} style={{ textDecoration: "none", color: "inherit", opacity: 0.85, fontWeight: 700, fontSize: 14 }}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="mobile-menu-btn"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            style={{ border: "none", background: "transparent", fontSize: 22, cursor: "pointer" }}
          >
            ☰
          </button>
        </div>

        <HomeSearch peptides={props.peptides} blends={props.blends} topics={props.topics} />
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} items={NAV_ITEMS} />
    </header>
  );
}
