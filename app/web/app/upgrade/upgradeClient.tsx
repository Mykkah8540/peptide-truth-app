"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Purchases } from "@revenuecat/purchases-js";
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
  pkg: any;
};

export default function UpgradeClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const nextUrl = useMemo(() => {
    const raw = sp?.get("next") || "/";
    if (!raw.startsWith("/")) return "/";
    return raw;
  }, [sp]);

  const [me, setMe] = useState<MeResponse | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offering, setOffering] = useState<OfferingView | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<"idle" | "success" | "syncing">("idle");

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        const data = (await res.json()) as MeResponse;
        if (cancelled) return;
        setMe(data);

        if (data.isPro) {
          router.replace(nextUrl);
          return;
        }

        if (!data.isAuthed || !data.userId) {
          setReady(true);
          return;
        }

        await configureRevenueCat(data.userId);
        const current = await fetchCurrentOffering();

        if (!cancelled && current?.availablePackages?.[0]) {
          const pkg = current.availablePackages[0];
          const p: any = pkg.product ?? {};
          setOffering({
            offeringId: current.identifier,
            packageId: pkg.identifier,
            productId: p.identifier ?? "unknown",
            title: p.title ?? "Peptide Truth Pro",
            price: p.priceString ?? "$4.99",
            pkg,
          });
        }

        setReady(true);
      } catch (e: any) {
        if (!cancelled) {
          setError(String(e?.message || e));
          setReady(true);
        }
      }
    }

    init();
    return () => { cancelled = true; };
  }, []);

  async function handlePurchase() {
    if (!offering || purchasing) return;
    try {
      setPurchasing(true);
      const rc = Purchases.getSharedInstance();
      await rc.purchasePackage(offering.pkg);

      // Poll for entitlement sync
      for (let i = 0; i < 10; i++) {
        await new Promise((r) => setTimeout(r, 1500));
        const v = await fetch("/api/viewer", { cache: "no-store" }).then((r) => r.json());
        if (v?.isPro) {
          setPurchaseStatus("success");
          setTimeout(() => router.replace(nextUrl), 1400);
          return;
        }
      }
      setPurchaseStatus("syncing");
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setPurchasing(false);
    }
  }

  if (!ready) {
    return <div className="pt-upgrade__cta-loading">Loading…</div>;
  }

  if (me?.isPro) {
    return <div className="pt-upgrade__cta-success">You already have Pro access.</div>;
  }

  if (purchaseStatus === "success") {
    return <div className="pt-upgrade__cta-success">Pro unlocked — redirecting…</div>;
  }

  if (purchaseStatus === "syncing") {
    return (
      <div className="pt-upgrade__cta-success">
        Purchase complete. Syncing access — refresh if it doesn&rsquo;t appear.
      </div>
    );
  }

  // Not signed in — show auth CTAs
  if (!me?.isAuthed) {
    return (
      <div className="pt-upgrade__auth-cta">
        <a
          href={`/signup?next=${encodeURIComponent(nextUrl)}`}
          className="pt-upgrade__cta-btn"
        >
          Create account &rarr;
        </a>
        <a
          href={`/login?next=${encodeURIComponent(nextUrl)}`}
          className="pt-upgrade__cta-secondary"
        >
          Sign in
        </a>
        {error && <div className="pt-upgrade__error">{error}</div>}
      </div>
    );
  }

  // Signed in, show purchase CTA
  return (
    <div className="pt-upgrade__purchase">
      {error && <div className="pt-upgrade__error">{error}</div>}
      <button
        onClick={handlePurchase}
        disabled={purchasing}
        className={`pt-upgrade__cta-btn${purchasing ? " pt-upgrade__cta-btn--busy" : ""}`}
      >
        {purchasing ? "Processing…" : `Subscribe — ${offering?.price ?? "$4.99"}/mo`}
      </button>
      <p className="pt-upgrade__cta-fine">
        Secure checkout. Cancel anytime from your account.
      </p>
    </div>
  );
}
