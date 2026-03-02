"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

type Plan = "free" | "pro";

const PLAN_FEATURES: Record<Plan, string[]> = {
  free: ["All 92+ peptide profiles", "Evidence summaries", "Safety & interaction data"],
  pro:  ["Everything in Free", "Stack Builder", "Commercial Blends", "Wellness Paths", "My Peps (saved lists)"],
};

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

  const [plan, setPlan] = useState<Plan>("free");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Where to send the user after they confirm email and log in
  const postConfirmPath = plan === "pro"
    ? `/upgrade?next=${encodeURIComponent(nextPath)}`
    : nextPath;

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
        // Auto-confirmed (e.g. local dev with email confirm disabled)
        router.replace(postConfirmPath);
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
            Click it to activate your account
            {plan === "pro" ? ", then complete your Pro subscription." : ", then sign in."}
          </p>
          {plan === "pro" && (
            <div className="pt-auth__pro-note">
              After confirming, you&rsquo;ll be taken directly to checkout — $4.99/mo, cancel anytime.
            </div>
          )}
          <a href={`/login?next=${encodeURIComponent(postConfirmPath)}`} className="pt-auth__submit">
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
          Choose a plan, then enter your details.
        </p>

        {/* Plan selector */}
        <div className="pt-auth__plans">
          {(["free", "pro"] as Plan[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlan(p)}
              className={`pt-auth__plan${plan === p ? " pt-auth__plan--selected" : ""}${p === "pro" ? " pt-auth__plan--pro" : ""}`}
            >
              <div className="pt-auth__plan-header">
                <span className="pt-auth__plan-name">{p === "free" ? "Free" : "Pro"}</span>
                {p === "pro" && <span className="pt-auth__plan-price">$4.99/mo</span>}
              </div>
              <ul className="pt-auth__plan-features">
                {PLAN_FEATURES[p].map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </button>
          ))}
        </div>

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
            {busy
              ? "Creating account…"
              : plan === "pro"
              ? "Create account & upgrade →"
              : "Create free account"}
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
