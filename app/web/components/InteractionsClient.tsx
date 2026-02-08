"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Category = { id: string; title: string };
type InteractionItem = {
 slug: string;
 title: string;
 category: string;
 summary?: string;
 count?: number;
};

function normalize(s: string) {
 return (s || "").toLowerCase().trim();
}

export default function InteractionsClient(props: {
 interactions: InteractionItem[];
 categories: Category[];
}) {
 const [q, setQ] = useState("");
 const [cat, setCat] = useState<string>("all");

 const categories = useMemo(() => {
  const base = (props.categories ?? []).filter(Boolean);
  // Ensure we always have "Other"
  const hasOther = base.some((c) => c.id === "other");
  return hasOther ? base : [...base, { id: "other", title: "Other" }];
 }, [props.categories]);

 const filtered = useMemo(() => {
  const query = normalize(q);
  return (props.interactions ?? [])
   .filter(Boolean)
   .filter((it) => (cat === "all" ? true : it.category === cat))
   .filter((it) => {
    if (!query) return true;
    const hay = normalize(`${it.title} ${it.slug} ${it.summary ?? ""}`);
    return hay.includes(query);
   })
   .sort((a, b) => {
    const ca = Number(a.count ?? 0);
    const cb = Number(b.count ?? 0);
    if (cb !== ca) return cb - ca;
    return (a.title || "").localeCompare(b.title || "");
   });
 }, [props.interactions, q, cat]);

 const countsByCat = useMemo(() => {
  const map = new Map<string, number>();
  for (const it of props.interactions ?? []) {
   const k = it?.category ?? "other";
   map.set(k, (map.get(k) ?? 0) + 1);
  }
  return map;
 }, [props.interactions]);

 return (
  <section>
   <div style={{ display: "grid", gap: 10 }}>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
     <input
      value={q}
      onChange={(e) => setQ(e.target.value)}
      placeholder="Search interaction classes (e.g., anticoagulants, SSRIs, stimulants)…"
      style={{
       flex: "1 1 260px",
       padding: "12px 12px",
       borderRadius: 14,
       border: "1px solid rgba(0,0,0,0.12)",
       fontSize: 14,
      }}
     />
     <select
      value={cat}
      onChange={(e) => setCat(e.target.value)}
      style={{
       flex: "0 0 220px",
       padding: "12px 12px",
       borderRadius: 14,
       border: "1px solid rgba(0,0,0,0.12)",
       fontSize: 14,
       background: "#fff",
      }}
     >
      <option value="all">All categories ({props.interactions?.length ?? 0})</option>
      {categories.map((c) => (
       <option key={c.id} value={c.id}>
        {c.title} ({countsByCat.get(c.id) ?? 0})
       </option>
      ))}
     </select>
    </div>

    <div style={{ display: "grid", gap: 10 }}>
     {filtered.map((it) => (
      <Link
       key={it.slug}
       href={`/interaction/${it.slug}`}
       style={{
        textDecoration: "none",
        color: "inherit",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 16,
        padding: 14,
        display: "grid",
        gap: 6,
       }}
      >
       <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between" }}>
        <div style={{ fontSize: 15, fontWeight: 900 }}>{it.title || it.slug}</div>
        <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap", justifyContent: "flex-end" }}>
         <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.65 }}>
          {categories.find((c) => c.id === it.category)?.title ?? it.category}
         </div>
         <div style={{ fontSize: 12, fontWeight: 900, padding: "4px 8px", borderRadius: 999, background: "rgba(0,0,0,0.05)" }}>
          {Number(it.count ?? 0)} peptides
         </div>
        </div>
       </div>
       {it.summary ? (
        <div style={{ fontSize: 13, lineHeight: 1.45, opacity: 0.85 }}>{it.summary}</div>
       ) : (
        <div style={{ fontSize: 13, lineHeight: 1.45, opacity: 0.65 }}>
         Open for rationale, evidence notes, and practical considerations.
        </div>
       )}
      </Link>
     ))}

     {!filtered.length ? (
      <div style={{ padding: 14, borderRadius: 16, background: "rgba(0,0,0,0.03)", fontSize: 13, opacity: 0.85 }}>
       No matches. Try a broader term (e.g., “antidepressant”, “blood thinner”, “stimulant”).
      </div>
     ) : null}
    </div>
   </div>
  </section>
 );
}
