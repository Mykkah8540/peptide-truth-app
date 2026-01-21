"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { EntityListItem, TopicListItem } from "@/lib/content";

type SearchItem =
  | { kind: "peptide" | "blend"; slug: string; title: string; route: string; aliases: string[] }
  | { kind: "topic"; slug: string; title: string; route: string; aliases: string[] };

function normKey(s: string): string {
  return (s || "")
    .toLowerCase()
    .trim()
    .replace(/[_\-\s]+/g, "")
    .replace(/[^a-z0-9+]/g, "");
}

function scoreMatch(queryKey: string, fields: string[]): number {
  // Lower is better. 0..49 = startsWith, 50..99 = includes, 999 = no match
  let best = 999;

  for (const f of fields) {
    const fk = normKey(f);
    if (!fk) continue;

    if (fk.startsWith(queryKey)) {
      // Prefer shorter / tighter match
      best = Math.min(best, 0 + Math.min(49, fk.length));
      continue;
    }

    const idx = fk.indexOf(queryKey);
    if (idx >= 0) {
      best = Math.min(best, 50 + Math.min(49, idx));
    }
  }

  return best;
}


function variantPenalty(slug: string): number {
  const s = (slug || "").toLowerCase();

  // Lower is better (base wins).
  const rules: Array<[RegExp, number]> = [
    [/-arginate$/, 30],
    [/-dac$/, 30],
    [/-lr3$/, 30],
    [/-full$/, 20],
    [/-ii$/, 20],
    [/-y$/, 20],
    [/-s$/, 10],
  ];

  let pen = 0;
  for (const [rx, v] of rules) {
    if (rx.test(s)) pen += v;
  }
  return pen;
}

function variantLabel(slug: string): string {
  const s = (slug || "").toLowerCase();
  if (s.endsWith("-arginate")) return "Arginate";
  if (s.endsWith("-dac")) return "DAC";
  if (s.endsWith("-lr3")) return "LR3";
  if (s.endsWith("-full")) return "Full";
  if (s.endsWith("-ii")) return "II";
  if (s.endsWith("-i")) return "I";
  if (s.endsWith("-y")) return "Y";
  if (s.endsWith("-s")) return "S";
  return "";
}

function buildItems(peptides: EntityListItem[], blends: EntityListItem[], topics: TopicListItem[]): SearchItem[] {
  const out: SearchItem[] = [];

  for (const p of peptides || []) {
    out.push({
      kind: "peptide",
      slug: p.slug,
      title: p.name,
      route: p.route || `/peptide/${p.slug}`,
      aliases: Array.isArray((p as any).aliases) ? ((p as any).aliases as string[]) : [],
    });
  }

  for (const b of blends || []) {
    out.push({
      kind: "blend",
      slug: b.slug,
      title: b.name,
      route: b.route || `/blend/${b.slug}`,
      aliases: Array.isArray((b as any).aliases) ? ((b as any).aliases as string[]) : [],
    });
  }

  for (const t of topics || []) {
    out.push({
      kind: "topic",
      slug: t.slug,
      title: t.title,
      route: `/topic/${t.slug}`,
      aliases: [],
    });
  }

  return out;
}

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

  const items = useMemo(() => buildItems(props.peptides, props.blends, props.topics), [props.peptides, props.blends, props.topics]);

  const results = useMemo(() => {
    const query = q.trim();
    const qk = normKey(query);
    if (!qk) return [];

    const scored = items
      .map((it) => {
        const fields = [it.title, it.slug, ...(it.aliases || [])];
        const s = scoreMatch(qk, fields);
        return { it, s };
      })
      .filter((x) => x.s < 999)
      .sort((a, b) => a.s - b.s || variantPenalty(a.it.slug) - variantPenalty(b.it.slug) || a.it.title.localeCompare(b.it.title) || a.it.slug.localeCompare(b.it.slug))
      .map((x) => x.it);

    return scored.slice(0, 12);
  }, [q, items]);

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
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 12,
          border: "1px solid rgba(0,0,0,0.10)",
          background: "rgba(0,0,0,0.02)",
          outline: "none",
        }}
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
        <div
          style={{
            position: "absolute",
            zIndex: 50,
            top: "calc(100% + 10px)",
            left: 0,
            right: 0,
            borderRadius: 14,
            border: "1px solid rgba(0,0,0,0.10)",
            background: "white",
            boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
            overflow: "hidden",
          }}
        >
          {results.length === 0 ? (
            <div style={{ padding: 12, fontSize: 13, opacity: 0.7 }}>No matches.</div>
          ) : (
            <div style={{ display: "grid" }}>
              {results.map((it, idx) => {
                const active = idx === activeIdx;
                return (
                  <button
                    key={`${it.kind}:${it.slug}`}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => go(it)}
                    style={{
                      textAlign: "left",
                      padding: "10px 12px",
                      border: "none",
                      background: active ? "rgba(0,0,0,0.05)" : "transparent",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <span style={{ display: "grid", gap: 2 }}>
                      <span style={{ fontWeight: 800 }}>{it.title}</span>
                      <span style={{ fontSize: 12, opacity: 0.65 }}>{it.kind} · {it.slug}{variantLabel(it.slug) ? ` · ${variantLabel(it.slug)}` : ``}</span>
                    </span>
                    <span style={{ fontSize: 12, opacity: 0.55, alignSelf: "center" }}>
                      {it.kind === "blend" ? "Blend" : it.kind === "peptide" ? "Peptide" : "Topic"}
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
