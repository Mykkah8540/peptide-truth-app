"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function SignupClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const nextPath = useMemo(() => {
    const n = (sp.get("next") || "").trim();
    if (!n) return "/";
    if (!n.startsWith("/")) return "/";
    if (n.startsWith("/login") || n.startsWith("/signup")) return "/";
    return n;
  }, [sp]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    const em = email.trim();
    if (!em || !password) {
      setMsg("Email and password are required.");
      return;
    }
    if (password.length < 8) {
      setMsg("Password must be at least 8 characters.");
      return;
    }

    setBusy(true);
    try {
      const supa = supabaseBrowser();
      const { data, error } = await supa.auth.signUp({ email: em, password });
      if (error) {
        setMsg(error.message || "Sign-up failed.");
        return;
      }

      if (data.session) {
        router.replace(nextPath);
        router.refresh();
        return;
      }

      setSuccess(true);
    } finally {
      setBusy(false);
    }
  }

  if (success) {
    return (
      <main className="pt-auth">
        <div className="pt-auth__card">
          <div className="pt-auth__success-icon">✉️</div>
          <h1 className="pt-auth__title">Check your email</h1>
          <p className="pt-auth__sub">
            We sent a confirmation link to <strong>{email}</strong>.
            Click it to activate your account, then sign in.
          </p>
          <a href={`/login?next=${encodeURIComponent(nextPath)}`} className="pt-auth__submit">
            Go to sign in
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-auth">
      <div className="pt-auth__card">

        <div className="pt-auth__brand">Peptide Truth</div>
        <h1 className="pt-auth__title">Create your account</h1>
        <p className="pt-auth__sub">
          Free to join. Pro unlocks stacks, blends, and deeper tools.
        </p>

        <form onSubmit={onSubmit} className="pt-auth__form">
          <label className="pt-auth__label">
            <span>Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              placeholder="you@domain.com"
              className="pt-auth__input"
              required
            />
          </label>

          <label className="pt-auth__label">
            <span>Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className="pt-auth__input"
              required
            />
          </label>

          {msg && (
            <div className="pt-auth__error">{msg}</div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="pt-auth__submit"
          >
            {busy ? "Creating account…" : "Create account"}
          </button>
        </form>

        <div className="pt-auth__divider" />

        <div className="pt-auth__switch">
          Already have an account?{" "}
          <a href={`/login?next=${encodeURIComponent(nextPath)}`} className="pt-auth__switch-link">
            Sign in
          </a>
        </div>

      </div>
    </main>
  );
}
