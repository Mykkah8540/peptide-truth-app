"use client";

import { useEffect, useState } from "react";

type FlagsState = { force_pro_on: boolean } | null;

export default function AdminFlagsClient() {
  const [flags, setFlags] = useState<FlagsState>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/flags")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setFlags(d.flags);
        else setError("Failed to load flags");
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  }, []);

  async function toggle(key: keyof NonNullable<FlagsState>) {
    if (!flags) return;
    setSaving(true);
    setError(null);
    const next = { ...flags, [key]: !flags[key] };
    try {
      const res = await fetch("/api/admin/flags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      }).then((r) => r.json());

      if (res.ok) {
        setFlags(res.flags);
        setLastSaved(new Date().toLocaleTimeString());
      } else {
        setError(res.error || "Save failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="pt-admin__note">Loading flags…</div>;

  return (
    <>
      {error && (
        <div className="pt-admin__error-card">{error}</div>
      )}

      <div className="pt-admin__card">
        <div className="pt-admin__flag-row">
          <div>
            <div className="pt-admin__flag-name">Force Pro On</div>
            <div className="pt-admin__flag-desc">
              Grants Pro access to every authenticated user regardless of subscription status.
              Use only for development or site-wide testing. Disable before real users subscribe.
            </div>
            <span className={`pt-admin__badge ${flags?.force_pro_on ? "pt-admin__badge--on" : "pt-admin__badge--off"}`}>
              <span className="pt-admin__badge-dot" />
              {flags?.force_pro_on ? "ON — all users are Pro" : "OFF — subscriptions enforced"}
            </span>
          </div>

          <button
            onClick={() => toggle("force_pro_on")}
            disabled={saving}
            className={`pt-admin__btn ${flags?.force_pro_on ? "pt-admin__btn--danger" : "pt-admin__btn--primary"}`}
          >
            {saving ? "Saving…" : flags?.force_pro_on ? "Turn OFF" : "Turn ON"}
          </button>
        </div>
      </div>

      {lastSaved && (
        <div className="pt-admin__saved-note">
          Saved at {lastSaved} — change logged to audit trail.
        </div>
      )}
    </>
  );
}
