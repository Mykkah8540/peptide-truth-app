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

  if (loading) return <div className="text-sm text-muted-foreground">Loading flags…</div>;

  return (
    <div className="space-y-3">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* force_pro_on */}
      <div className="flex items-start justify-between gap-4 rounded-xl border p-4">
        <div>
          <div className="font-semibold text-sm">Force Pro On</div>
          <div className="text-xs text-muted-foreground mt-1 max-w-sm">
            Grants Pro access to every authenticated user regardless of subscription status.
            Use only for development or site-wide testing. Disable before real users subscribe.
          </div>
          <div className="mt-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-bold ${
                flags?.force_pro_on
                  ? "bg-amber-100 text-amber-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  flags?.force_pro_on ? "bg-amber-500" : "bg-green-500"
                }`}
              />
              {flags?.force_pro_on ? "ON — all users are Pro" : "OFF — subscriptions enforced"}
            </span>
          </div>
        </div>

        <button
          onClick={() => toggle("force_pro_on")}
          disabled={saving}
          className={`shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition-colors disabled:opacity-50 ${
            flags?.force_pro_on
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {saving ? "Saving…" : flags?.force_pro_on ? "Turn OFF" : "Turn ON"}
        </button>
      </div>

      {lastSaved && (
        <div className="text-xs text-muted-foreground text-right">
          Saved at {lastSaved} — change logged to audit trail.
        </div>
      )}
    </div>
  );
}
