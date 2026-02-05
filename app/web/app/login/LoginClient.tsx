"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function LoginClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const nextPath = useMemo(() => {
    const n = (sp.get("next") || "").trim();
    if (!n) return "/";
    if (!n.startsWith("/")) return "/";
    if (n.startsWith("/login")) return "/";
    return n;
  }, [sp]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    const em = email.trim();
    if (!em || !password) {
      setMsg("Email and password are required.");
      return;
    }

    setBusy(true);
    try {
      const supa = supabaseBrowser();
      const { error } = await supa.auth.signInWithPassword({ email: em, password });
      if (error) {
        setMsg(error.message || "Sign-in failed.");
        return;
      }
      router.replace(nextPath);
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ maxWidth: 520 }}>
        <h1 style={{ fontSize: 28, fontWeight: 950, margin: 0 }}>Sign in</h1>
        <div style={{ color: "#666", marginTop: 8, lineHeight: 1.35 }}>
          Use your email + password. You’ll be redirected back after signing in.
        </div>

        <form onSubmit={onSubmit} style={{ marginTop: 18 }}>
          <div style={{ display: "grid", gap: 10 }}>
            <label style={{ display: "grid", gap: 6 }}>
              <div style={{ fontWeight: 900 }}>Email</div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                placeholder="you@domain.com"
                style={{
                  width: "100%",
                  padding: "12px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.15)",
                  fontSize: 14,
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 6 }}>
              <div style={{ fontWeight: 900 }}>Password</div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "12px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.15)",
                  fontSize: 14,
                }}
              />
            </label>

            {msg ? <div style={{ color: "#b00020", fontWeight: 800 }}>{msg}</div> : null}

            <button
              type="submit"
              disabled={busy}
              style={{
                height: 44,
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.15)",
                background: "black",
                color: "white",
                fontWeight: 950,
                cursor: busy ? "not-allowed" : "pointer",
              }}
            >
              {busy ? "Signing in..." : "Sign in"}
            </button>

            <button
              type="button"
              onClick={() => router.replace(nextPath)}
              style={{
                height: 44,
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.15)",
                background: "white",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
