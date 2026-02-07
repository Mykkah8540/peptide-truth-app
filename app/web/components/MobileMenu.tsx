"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

type Item = {
  label: string;
  href: string;
  pro?: boolean;
};

function ProPill() {
  return (
    <span
      aria-label="Pro"
      title="Pro"
      style={{
        marginLeft: 8,
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid rgba(0,0,0,0.22)",
        borderRadius: 999,
        padding: "2px 7px",
        fontSize: 10,
        fontWeight: 900,
        letterSpacing: 0.8,
        lineHeight: 1,
        background: "#fff",
        color: "#111",
        opacity: 0.92,
        whiteSpace: "nowrap",
      }}
    >
      PRO
    </span>
  );
}

function SectionLabel(props: { children: string }) {
  return (
    <div
      style={{
        marginTop: 6,
        marginBottom: 6,
        fontSize: 11,
        fontWeight: 900,
        letterSpacing: 0.9,
        opacity: 0.6,
      }}
    >
      {props.children}
    </div>
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
      setEmail(null); // instant UI update
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
  const proItems = items.filter((i) => i.pro); // always visible; pills depend on showProBadges

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "#fff",
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: 20,
          maxWidth: 360,
          height: "100%",
        }}
      >
        <button
          onClick={onClose}
          style={{
            border: "none",
            background: "#fff",
            fontSize: 18,
            fontWeight: 800,
            marginBottom: 12,
            cursor: "pointer",
          }}
        >
          ✕ Close
        </button>

        <nav style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionLabel>MENU</SectionLabel>

          {publicItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{
                fontSize: 16,
                fontWeight: 900,
                textDecoration: "none",
                color: "#000",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <span>{item.label}</span>
            </Link>
          ))}

          <div style={{ marginTop: 10 }}>
            <div style={{ height: 1, background: "#fff", margin: "6px 0 12px" }} />
            <SectionLabel>ACCOUNT</SectionLabel>

            {loading ? (
              <div style={{ color: "#666", fontWeight: 800 }}>Loading…</div>
            ) : !email ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Link href="/login" onClick={onClose} style={{ fontSize: 16, fontWeight: 900, textDecoration: "none", color: "#000" }}>
                  Sign in
                </Link>
                <Link href="/signup" onClick={onClose} style={{ fontSize: 16, fontWeight: 900, textDecoration: "none", color: "#000" }}>
                  Create account
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Link href="/account" onClick={onClose} style={{ fontSize: 16, fontWeight: 900, textDecoration: "none", color: "#000" }}>
                  Account
                </Link>

                <Link
                  href="/account"
                  onClick={onClose}
                  style={{ fontSize: 16, fontWeight: 900, textDecoration: "none", color: "#000" }}
                >
                  Account
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    textAlign: "left",
                    border: "none",
                    background: "#fff",
                    padding: 0,
                    fontSize: 16,
                    fontWeight: 900,
                    color: "#000",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div style={{ marginTop: 10 }}>
            <div style={{ height: 1, background: "#fff", margin: "6px 0 12px" }} />
            <SectionLabel>{showProBadges ? "PRO FEATURES" : "FEATURES"}</SectionLabel>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 4 }}>
              {proItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.pro && showProBadges ? `/upgrade?next=${encodeURIComponent(item.href)}` : item.href}
                  onClick={onClose}
                  style={{
                    fontSize: 16,
                    fontWeight: 900,
                    textDecoration: "none",
                    color: "#000",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <span>{item.label}</span>
                  {showProBadges && item.pro ? <ProPill /> : null}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
