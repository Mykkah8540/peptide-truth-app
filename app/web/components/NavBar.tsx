"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  { label: "Account", href: "/account" },
  { label: "Sign in", href: "/login" },

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
  const router = useRouter();

  function goBack() {
    // Safe back: if no history, go home.
    try {
      if (typeof window !== "undefined" && window.history && window.history.length > 1) {
        router.back();
        return;
      }
    } catch {}
    router.push("/");
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
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            {/* Back button (global) */}
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

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ gap: 14, flexWrap: "wrap" }}>
            {NAV_ITEMS.slice(1).map((item, idx) => (
              <span key={item.href} style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
                {item.pro && idx === 5 ? (
                  <span
                    aria-hidden="true"
                    style={{
                      width: 1,
                      height: 18,
                      background: "rgba(0,0,0,0.12)",
                    }}
                  />
                ) : null}

                <Link
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
              </span>
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
