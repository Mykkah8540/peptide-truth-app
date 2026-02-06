"use client";

import { useEffect, useState } from "react";
import { configureRevenueCat } from "@/lib/billing/revenuecatClient";
import { fetchCurrentOffering } from "@/lib/billing/revenuecatOffering";

type MeResponse = {
  ok: boolean;
  isAuthed: boolean;
  userId: string | null;
  email: string | null;
  isPro: boolean;
  forceProOn: boolean;
};

type OfferingView = {
  offeringId: string;
  packageId: string;
  productId: string;
  title: string;
  price: string;
};

export default function UpgradeClient() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [status, setStatus] = useState<string>("Loading…");
  const [error, setError] = useState<string | null>(null);
  const [offering, setOffering] = useState<OfferingView | null>(null);

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

        setStatus("Loading offering…");
        const current = await fetchCurrentOffering();

        if (!current) {
          setOffering(null);
          setStatus("No current offering configured in RevenueCat.");
          return;
        }

        const first = current.availablePackages?.[0];
        if (!first) {
          setOffering(null);
          setStatus("Offering has no packages.");
          return;
        }

        const p: any = (first as any).product ?? {};
        setOffering({
          offeringId: current.identifier,
          packageId: first.identifier,
          productId: p.identifier ?? "unknown",
          title: p.title ?? "Pep-Talk Pro",
          price: p.priceString ?? "—",
        });

        setStatus("Offering loaded.");
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

  const boxStyle: React.CSSProperties = {
    border: "1px solid #e5e5e5",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    background: "#fff",
  };

  return (
    <div style={{ marginTop: 12 }}>
      <div style={pillStyle}>
        <span>Status:</span>
        <span style={{ fontWeight: 700 }}>{status}</span>
      </div>

      {offering ? (
        <div style={boxStyle}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Current Offer</div>
          <div style={{ fontWeight: 800 }}>{offering.title}</div>
          <div className="pt-card-subtext" style={{ marginTop: 6 }}>
            {offering.price}
          </div>
          <div className="pt-card-subtext" style={{ marginTop: 10 }}>
            Offering: <code>{offering.offeringId}</code> · Package: <code>{offering.packageId}</code> · Product:{" "}
            <code>{offering.productId}</code>
          </div>

          <button
            type="button"
            disabled
            style={{
              marginTop: 12,
              border: "1px solid #e5e5e5",
              padding: "10px 12px",
              borderRadius: 12,
              fontWeight: 900,
              background: "#f5f5f5",
              cursor: "not-allowed",
            }}
          >
            Continue (purchase next)
          </button>
        </div>
      ) : null}

      {me?.isPro ? (
        <p className="pt-card-subtext" style={{ marginTop: 10 }}>
          Your account is PRO. If anything still looks locked, refresh or sign out/in.
        </p>
      ) : (
        <p className="pt-card-subtext" style={{ marginTop: 10 }}>
          Next: enable purchase on the Continue button and poll <code>/api/viewer</code> until <code>isPro</code> flips.
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
