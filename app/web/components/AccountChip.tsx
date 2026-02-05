"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const supa = supabaseBrowser();
        const { data } = await supa.auth.getUser();
        if (!alive) return;
        setEmail(data.user?.email ?? null);
      } catch {
        if (!alive) return;
        setEmail(null);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const nextUrl = useMemo(() => {
    if (!pathname || pathname.startsWith("/login")) return "/";
    return pathname;
  }, [pathname]);

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
    <button
      type="button"
      onClick={() => router.push(`/account`)}
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
  );
}
