"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";
import Link from "next/link";

function initialsFromEmail(email?: string | null): string {
  const e = (email || "").trim();
  if (!e) return "ME";
  const name = e.split("@")[0] || "";
  const parts = name.split(/[._-]+/g).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  if (parts.length === 1 && parts[0].length >= 2) return (parts[0][0] + parts[0][1]).toUpperCase();
  if (parts.length === 1 && parts[0].length === 1) return (parts[0][0] + "X").toUpperCase();
  return "ME";
}

export default function AccountChip() {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

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
      setOpen(false);
      setEmail(session?.user?.email ?? null);
      // Force App Router revalidation so nav + any server-derived UI updates immediately.
      router.refresh();
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const el = ref.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const nextUrl = useMemo(() => {
    if (!pathname || pathname.startsWith("/login")) return "/";
    return pathname;
  }, [pathname]);

  async function handleLogout() {
    setOpen(false);
    try {
      const supa = supabaseBrowser();
      await supa.auth.signOut(); // triggers onAuthStateChange immediately
    } catch {
      // ignore
    } finally {
      // hard refresh server components / viewer checks
      router.replace("/");
      router.refresh();
    }
  }

  if (loading) {
    return (
      <div
        aria-label="Account"
        style={{
          width: 40,
          height: 40,
          borderRadius: 999,
          border: "1px solid rgba(0,0,0,0.15)",
        }}
      />
    );
  }

  if (!email) {
    return (
      <button
        type="button"
        onClick={() => router.push(`/login?next=${encodeURIComponent(nextUrl)}`)}
        style={{
          height: 40,
          padding: "0 12px",
          borderRadius: 999,
          border: "1px solid rgba(0,0,0,0.15)",
          background: "white",
          fontWeight: 900,
          cursor: "pointer",
        }}
      >
        Sign in
      </button>
    );
  }

  const initials = initialsFromEmail(email);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title={email || "Account"}
        aria-label="Account"
        style={{
          width: 40,
          height: 40,
          borderRadius: 999,
          border: "1px solid rgba(0,0,0,0.15)",
          background: "white",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 950,
          letterSpacing: 0.4,
          cursor: "pointer",
        }}
      >
        {initials}
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Account links"
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 10px)",
            minWidth: 180,
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.10)",
            borderRadius: 14,
            boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
            padding: 10,
            zIndex: 200,
          }}
        >
          <Link
            href="/account"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              padding: "10px 10px",
              borderRadius: 10,
              textDecoration: "none",
              color: "inherit",
              fontWeight: 900,
            }}
          >
            Account
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              width: "100%",
              textAlign: "left",
              display: "block",
              padding: "10px 10px",
              borderRadius: 10,
              border: "none",
              background: "transparent",
              color: "inherit",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
