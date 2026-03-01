"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { EntityListItem, TopicListItem } from "@/lib/content";

type SearchItem = { kind: "peptide" | "blend" | "topic" | "interaction"; slug: string; route: string };






export default function HomeSearch(props: {
 peptides: EntityListItem[];
 blends: EntityListItem[];
 topics: TopicListItem[];
}) {
 const router = useRouter();
 const wrapRef = useRef<HTMLDivElement | null>(null);
 const inputRef = useRef<HTMLInputElement | null>(null);

 const [q, setQ] = useState("");
 const [open, setOpen] = useState(false);
 const [activeIdx, setActiveIdx] = useState(0);

const [results, setResults] = useState<SearchItem[]>([]);

// Debounced governed search
useEffect(() => {
  const query = q.trim();
  if (!query) {
    setResults([]);
    return;
  }

  const t = setTimeout(async () => {
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const json = await res.json();
      const arr = Array.isArray(json?.results) ? json.results : [];
      setResults(arr.slice(0, 12));
    } catch {
      setResults([]);
    }
  }, 180);

  return () => clearTimeout(t);
}, [q]);

 const peptideTitle = useMemo(() => {
  const m = new Map<string, string>();
  for (const p of props.peptides || []) m.set(p.slug, p.name);
  return m;
 }, [props.peptides]);

 const blendTitle = useMemo(() => {
  const m = new Map<string, string>();
  for (const b of props.blends || []) m.set(b.slug, b.name);
  return m;
 }, [props.blends]);

 const topicTitle = useMemo(() => {
  const m = new Map<string, string>();
  for (const t of props.topics || []) m.set(t.slug, t.title);
  return m;
 }, [props.topics]);
 // Close on outside click
 useEffect(() => {
  function onDown(e: MouseEvent) {
   const el = wrapRef.current;
   if (!el) return;
   if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
  }
  document.addEventListener("mousedown", onDown);
  return () => document.removeEventListener("mousedown", onDown);
 }, []);

 // Reset active index when results change
 useEffect(() => {
  setActiveIdx(0);
 }, [q]);

 function go(it: SearchItem) {
  setOpen(false);
  router.push(it.route);
 }

 return (
  <div ref={wrapRef} style={{ position: "relative", width: "100%" }}>
   <input
    ref={inputRef}
    value={q}
    onChange={(e) => {
     setQ(e.target.value);
     setOpen(true);
    }}
    onFocus={() => setOpen(true)}
    placeholder="Search peptides, blends, topics…"
    className="pt-nav__search-input"
    onKeyDown={(e) => {
     if (!open) return;

     if (e.key === "Escape") {
      setOpen(false);
      return;
     }

     if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!results.length) return;
      setActiveIdx((i) => Math.min(results.length - 1, i + 1));
      return;
     }

     if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!results.length) return;
      setActiveIdx((i) => Math.max(0, i - 1));
      return;
     }

     if (e.key === "Enter") {
      e.preventDefault();
      const it = results[activeIdx];
      if (it) go(it);
     }
    }}
   />

   {open && q.trim() && (
    <div className="pt-nav__search-dropdown">
     {results.length === 0 ? (
      <div className="pt-nav__search-no-results">No matches.</div>
     ) : (
      <div style={{ display: "grid" }}>
       {results.map((it, idx) => {
        const active = idx === activeIdx;
        return (
         <button
          key={`${it.kind}:${it.slug}`}
          onMouseEnter={() => setActiveIdx(idx)}
          onClick={() => go(it)}
          className={`pt-nav__search-result${active ? " pt-nav__search-result--active" : ""}`}
         >
          <span style={{ display: "grid", gap: 2 }}>
           <span className="pt-nav__search-result-name">
            {it.kind === "peptide"
              ? (peptideTitle.get(it.slug) || it.slug)
              : it.kind === "blend"
              ? (blendTitle.get(it.slug) || it.slug)
              : it.kind === "topic"
              ? (topicTitle.get(it.slug) || it.slug)
              : it.slug}
           </span>
           <span className="pt-nav__search-result-meta">{it.kind} · {it.slug}</span>
          </span>
          <span className="pt-nav__search-result-kind">
           {it.kind === "blend" ? "Blend" : it.kind === "peptide" ? "Peptide" : it.kind === "topic" ? "Topic" : "Interaction"}
          </span>
         </button>
        );
       })}
      </div>
     )}
    </div>
   )}
  </div>
 );
}
