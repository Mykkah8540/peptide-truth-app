"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const supa = supabaseBrowser();
        await supa.auth.signOut();
      } finally {
        router.replace("/");
        router.refresh();
      }
    })();
  }, [router]);

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ color: "#666" }}>Signing you out…</div>
    </main>
  );
}
