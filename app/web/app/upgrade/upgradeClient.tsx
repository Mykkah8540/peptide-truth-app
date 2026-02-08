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
  // Only allow internal paths
  if (!raw.startsWith("/")) return "/";
  return raw;
 }, [sp]);

 const [me, setMe] = useState<MeResponse | null>(null);
 const [status, setStatus] = useState<string>("Loading…");
 const [error, setError] = useState<string | null>(null);
 const [offering, setOffering] = useState<OfferingView | null>(null);
 const [purchasing, setPurchasing] = useState<boolean>(false);

 useEffect(() => {
  let cancelled = false;

  async function init() {
   try {
    setStatus("Loading account…");
    const res = await fetch("/api/me", { cache: "no-store" });
    const data = (await res.json()) as MeResponse;
    if (cancelled) return;
    setMe(data);

     if (data.isPro) {
      setStatus("You are PRO. Redirecting…");
      router.replace(nextUrl);
      return;
     }


    if (!data.isAuthed || !data.userId) {
     setStatus("Please log in to continue.");
     return;
    }

    setStatus("Initializing billing…");
    await configureRevenueCat(data.userId);

    setStatus("Loading offer…");
    const current = await fetchCurrentOffering();
    if (!current) {
     setStatus("No offering configured.");
     return;
    }

    const pkg = current.availablePackages?.[0];
    if (!pkg) {
     setStatus("Offering has no packages.");
     return;
    }

    const p: any = pkg.product ?? {};
    setOffering({
     offeringId: current.identifier,
     packageId: pkg.identifier,
     productId: p.identifier ?? "unknown",
     title: p.title ?? "Pep-Talk Pro",
     price: p.priceString ?? "—",
     pkg,
    });

    setStatus("Ready.");
   } catch (e: any) {
    if (!cancelled) {
     setError(String(e?.message || e));
     setStatus("Error.");
    }
   }
  }

  init();
  return () => {
   cancelled = true;
  };
 }, []);

 async function handlePurchase() {
  if (!offering || purchasing) return;
  try {
   setPurchasing(true);
   setStatus("Processing purchase…");

   const rc = Purchases.getSharedInstance();
   await rc.purchasePackage(offering.pkg);

   setStatus("Finalizing…");

   // Poll until entitlement flips
   for (let i = 0; i < 10; i++) {
    await new Promise((r) => setTimeout(r, 1500));
    const v = await fetch("/api/viewer", { cache: "no-store" }).then((r) => r.json());
    if (v?.isPro) {
     setStatus("PRO unlocked 🎉");
     return;
    }
   }

   setStatus("Purchase complete, syncing… (refresh if needed)");
  } catch (e: any) {
   setError(String(e?.message || e));
   setStatus("Purchase failed.");
  } finally {
   setPurchasing(false);
  }
 }

 return (
  <div style={{ marginTop: 12 }}>
   <div style={{ fontWeight: 900, marginBottom: 8 }}>Status: {status}</div>

   
    {!me?.isAuthed ? (
     <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
      <a
       href={`/login?next=${encodeURIComponent(nextUrl)}`}
       style={{ border: "1px solid #e5e5e5", padding: "10px 12px", borderRadius: 12, fontWeight: 900, textDecoration: "none", background: "#fff" }}
      >
       Sign in
      </a>
      <a
       href={`/signup?next=${encodeURIComponent(nextUrl)}`}
       style={{ border: "1px solid #e5e5e5", padding: "10px 12px", borderRadius: 12, fontWeight: 900, textDecoration: "none", background: "#fff" }}
      >
       Create account
      </a>
     </div>
    ) : null}

{offering && !me?.isPro ? (
    <div style={{ border: "1px solid #e5e5e5", borderRadius: 12, padding: 12 }}>
     <div style={{ fontWeight: 900 }}>{offering.title}</div>
     <div style={{ marginTop: 6 }}>{offering.price}</div>

     <button
      onClick={handlePurchase}
      disabled={purchasing}
      style={{
       marginTop: 12,
       border: "1px solid #000",
       padding: "10px 14px",
       borderRadius: 12,
       fontWeight: 900,
       background: purchasing ? "#eee" : "#fff",
       cursor: purchasing ? "wait" : "pointer",
      }}
     >
      {purchasing ? "Processing…" : "Continue"}
     </button>
    </div>
   ) : null}

   {me?.isPro ? <div style={{ marginTop: 10 }}>You are PRO.</div> : null}
   {error ? <div style={{ marginTop: 10 }}>Error: {error}</div> : null}
  </div>
 );
}
