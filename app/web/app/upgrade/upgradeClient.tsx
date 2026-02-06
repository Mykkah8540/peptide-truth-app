"use client";

import { useEffect, useState } from "react";
import { configureRevenueCat } from "@/lib/billing/revenuecatClient";

type MeResponse = {
  ok: boolean;
  isAuthed: boolean;
  userId: string | null;
  email: string | null;
  isPro: boolean;
  forceProOn: boolean;
};

export default function UpgradeClient() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [status, setStatus] = useState<string>("Loading…");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setError(null);
        setStatus("Loading account…");

        const res = await fetch("/api/me", { cache: "no-store" });
        const data = (await res.json()) as MeResponse;
        if (cancelled) return;

        setMe(data);

        if (!data?.isAuthed || !data.userId) {
          setStatus("Please log in to continue.");
          return;
        }

        setStatus("Initializing billing…");
        await configureRevenueCat(data.userId);

        setStatus("Billing initialized. (Paywall next.)");
      } catch (e: any) {
        if (cancelled) return;
        setError(String(e?.message || e));
        setStatus("Error.");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const pillStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid #e5e5e5",
    borderRadius: 999,
    padding: "8px 12px",
    fontWeight: 900,
    background: "#fff",
    marginTop: 14,
  };

  return (
    <div style={{ marginTop: 12 }}>
      <div style={pillStyle}>
        <span>Status:</span>
        <span style={{ fontWeight: 700 }}>{status}</span>
      </div>

      {me?.isPro ? (
        <p className="pt-card-subtext" style={{ marginTop: 10 }}>
          Your account is PRO. If anything still looks locked, refresh or sign out/in.
        </p>
      ) : (
        <p className="pt-card-subtext" style={{ marginTop: 10 }}>
          Next: connect RevenueCat Offering/Package(s) to a “Continue” button here, then after purchase we’ll poll <code>/api/viewer</code>{" "}
          until <code>isPro</code> flips.
        </p>
      )}

      {error ? (
        <p className="pt-card-subtext" style={{ marginTop: 10 }}>
          Error: {error}
        </p>
      ) : null}
    </div>
  );
}
