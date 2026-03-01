"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase/browser";

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

  const nextUrl = useMemo(() => {
    if (!pathname || pathname.startsWith("/login") || pathname.startsWith("/signup")) return "/";
    return pathname;
  }, [pathname]);

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
      setTimeout(() => {
        router.refresh();
      }, 0);
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

  async function handleLogout() {
    setOpen(false);
    try {
      const supa = supabaseBrowser();
      await supa.auth.signOut();
    } catch {
      // ignore
    } finally {
      router.replace("/");
      setTimeout(() => {
        router.refresh();
      }, 0);
    }
  }

  if (loading) {
    return <div className="pt-nav__account-skeleton" aria-label="Account" />;
  }

  if (!email) {
    return (
      <button
        type="button"
        onClick={() => router.push(`/login?next=${encodeURIComponent(nextUrl)}`)}
        className="pt-nav__signin-btn"
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
        className="pt-nav__account-btn"
      >
        {initials}
      </button>

      {open ? (
        <div role="menu" aria-label="Account links" className="pt-nav__account-menu">
          <Link href="/account" onClick={() => setOpen(false)} className="pt-nav__account-menu-item">
            Account
          </Link>
          <Link href="/my-peps" onClick={() => setOpen(false)} className="pt-nav__account-menu-item">
            My Peps
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="pt-nav__account-menu-item pt-nav__account-menu-logout"
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
