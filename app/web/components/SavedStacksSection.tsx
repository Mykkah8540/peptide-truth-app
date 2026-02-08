"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { deleteSavedStack, readSavedStacks, type SavedStack } from "@/lib/savedStacks";

function pillStyle() {
 return {
  fontSize: 12,
  fontWeight: 900,
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(0,0,0,0.02)",
  display: "inline-flex",
  gap: 8,
  alignItems: "center",
  textDecoration: "none",
  color: "inherit",
 } as const;
}

function itemHref(type: string, slug: string) {
 return type === "blend" ? `/blend/${slug}` : `/peptide/${slug}`;
}

export default function SavedStacksSection() {
 const [stacks, setStacks] = useState<SavedStack[]>([]);
 const [errorMsg, setErrorMsg] = useState<string>("");

 function refresh() {
  setStacks(readSavedStacks());
 }

 useEffect(() => {
  refresh();
 }, []);

 const hasAny = stacks.length > 0;

 const top = useMemo(() => stacks.slice(0, 50), [stacks]);

 return (
  <section className="pt-card" style={{ marginTop: 16 }}>
   <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "baseline" }}>
    <div>
     <div className="pt-card-title" style={{ marginBottom: 6 }}>Saved stacks</div>
     <div className="pt-card-subtext">
      Local-first saved stacks. You can load them back into the builder anytime.
     </div>
    </div>

    <Link href="/stack-builder" className="pt-btn" style={{ textDecoration: "none" }}>
     Open Stack Builder →
    </Link>
   </div>

   {!hasAny ? (
    <div className="pt-item-note" style={{ marginTop: 12 }}>
     No saved stacks yet. Build one in Stack Builder and save it here.
    </div>
   ) : (
    <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
     {top.map((s) => (
      <div key={s.id} className="pt-item" style={{ padding: 14 }}>
       <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "baseline" }}>
        <div style={{ fontSize: 15, fontWeight: 950 }}>{s.name}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
         <Link href={`/stack-builder?load=${encodeURIComponent(s.id)}`} className="pt-btn" style={{ textDecoration: "none" }}>
          Load
         </Link>
         <button
          className="pt-btn"
          onClick={() => {
           setErrorMsg("");
           const ok = deleteSavedStack(s.id);
           if (!ok) setErrorMsg("Could not delete stack.");
           refresh();
          }}
         >
          Delete
         </button>
        </div>
       </div>

       {s.goal_id ? (
        <div className="pt-item-note" style={{ marginTop: 6 }}>
         Goal: <b>{s.goal_id}</b>
        </div>
       ) : null}

       <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {s.items.map((it) => (
         <Link key={`${it.type}:${it.slug}`} href={itemHref(it.type, it.slug)} style={pillStyle()}>
          {it.slug}
          <span style={{ fontSize: 11, opacity: 0.65 }}>{it.type === "blend" ? "blend" : "peptide"}</span>
         </Link>
        ))}
       </div>

       <div className="pt-item-note" style={{ marginTop: 10, opacity: 0.7 }}>
        Updated {new Date(s.updatedAt).toLocaleDateString()}
       </div>
      </div>
     ))}
    </div>
   )}

   {errorMsg ? (
    <div className="pt-item-note" style={{ marginTop: 12 }}>
     {errorMsg}
    </div>
   ) : null}
  </section>
 );
}
