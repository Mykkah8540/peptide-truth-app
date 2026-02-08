"use client";

import { useEffect, useMemo, useState } from "react";
import type { Sponsor } from "@/lib/sponsors";

export default function SponsorBanner({
 sponsors,
 rotateMs = 3000,
}: {
 sponsors: Sponsor[];
 rotateMs?: number;
}) {
 const items = Array.isArray(sponsors) ? sponsors.filter(Boolean) : [];
 const canRotate = items.length > 1;

 const [idx, setIdx] = useState(0);

 const current = useMemo(() => {
  if (!items.length) return null;
  const safeIdx = Math.max(0, Math.min(idx, items.length - 1));
  return items[safeIdx];
 }, [items, idx]);

 useEffect(() => {
  if (!canRotate) return;
  const t = window.setInterval(() => {
   setIdx((v) => (v + 1) % items.length);
  }, Math.max(1200, rotateMs));
  return () => window.clearInterval(t);
 }, [canRotate, rotateMs, items.length]);

 if (!current) return null;

 return (
  <aside
   aria-label="Sponsored"
   style={{
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 16,
    padding: "12px 14px",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
   }}
  >
   <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 0.2, color: "#777" }}>Sponsored</div>
    <div style={{ fontSize: 13, fontWeight: 900, color: "#111" }}>{current.name}</div>
   </div>

   <a
    href={current.href}
    target="_blank"
    rel="noopener noreferrer nofollow"
    aria-label={`Visit sponsor: ${current.name}`}
    style={{
     display: "inline-flex",
     alignItems: "center",
     justifyContent: "center",
     minHeight: 40,
     minWidth: 120,
     borderRadius: 12,
     border: "1px solid rgba(0,0,0,0.10)",
     background: "#fafafa",
     padding: "8px 10px",
     textDecoration: "none",
     color: "inherit",
     fontWeight: 900,
     gap: 8,
    }}
   >
    {current.logoSrc ? (
     // eslint-disable-next-line @next/next/no-img-element
     <img
      src={current.logoSrc}
      alt={current.name}
      style={{ maxHeight: 22, maxWidth: 140, objectFit: "contain", display: "block" }}
     />
    ) : (
     <span style={{ fontSize: 13 }}>{current.label || "Visit"}</span>
    )}
    <span aria-hidden="true" style={{ opacity: 0.55 }}>↗</span>
   </a>
  </aside>
 );
}
