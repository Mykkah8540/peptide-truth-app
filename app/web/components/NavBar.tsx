"use client";

import { useState } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import HomeSearch from "@/components/HomeSearch";
import type { EntityListItem, TopicListItem } from "@/lib/content";

type NavItem = {
  label: string;
  href: string;
  pro?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Browse Peptides", href: "/peptides" },
  { label: "Resources", href: "/resources" },

  // Pro
  { label: "Blends", href: "/blends", pro: true },
  { label: "Browse Stacks", href: "/stacks", pro: true },
  { label: "Browse Categories", href: "/categories", pro: true },
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
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ display: "none", gap: 14, flexWrap: "wrap" }}>
            {NAV_ITEMS.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  opacity: 0.85,
                  fontWeight: 700,
                  fontSize: 14,
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <span>{item.label}</span>
                {item.pro ? <ProPill /> : null}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="mobile-menu-btn"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            style={{
              border: "none",
              background: "transparent",
              fontSize: 22,
              cursor: "pointer",
            }}
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
