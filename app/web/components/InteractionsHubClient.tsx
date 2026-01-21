"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

function firstText(blocks: any): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";
  const t = blocks?.[0]?.text;
  return typeof t === "string" ? t : "";
}

type Normalized = {
  slug: string;
  title: string;
  category: string;
  description: string;
};

function normalize(doc: any): Normalized[] {
  const raw =
    doc?.interaction_classes ??
    doc?.classes ??
    doc?.items ??
    doc?.data ??
    doc?.interactionClasses ??
    [];

  if (!Array.isArray(raw)) return [];

  return raw
    .map((it: any) => {
      const slug =
        (it?.slug ?? it?.id ?? it?.interaction_id ?? it?.key ?? "").toString().trim();
      const title =
        (it?.title ?? it?.name ?? slug ?? "Interaction").toString().trim() || "Interaction";
      const category =
        (it?.category ?? it?.group ?? it?.type ?? "Other").toString().trim() || "Other";

      const desc =
        (it?.description ?? it?.short_description ?? "").toString().trim() ||
        firstText(it?.summary_blocks ?? it?.summaryBlocks ?? it?.summary ?? it?.overview_blocks ?? it?.overviewBlocks) ||
        "";

      if (!slug) return null;
      return { slug, title, category, description: desc };
    })
    .filter(Boolean) as Normalized[];
}

export default function InteractionsHubClient(props: { doc: any }) {
  const [q, setQ] = useState("");

  const items = useMemo(() => normalize(props.doc), [props.doc]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return items;
    return items.filter((x) => {
      const hay = `${x.title} ${x.slug} ${x.category} ${x.description}`.toLowerCase();
      return hay.includes(qq);
    });
  }, [items, q]);

  const grouped = useMemo(() => {
    const map = new Map<string, Normalized[]>();
    for (const it of filtered) {
      const key = it.category || "Other";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(it);
    }
    // stable sort within groups
    for (const [k, arr] of map.entries()) {
      arr.sort((a, b) => a.title.localeCompare(b.title));
      map.set(k, arr);
    }
    // sort categories by size desc then alpha
    const entries = Array.from(map.entries());
    entries.sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
    return entries;
  }, [filtered]);

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "20px 16px" }}>
      <div style={{ display: "grid", gap: 10 }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Interactions</h1>
        <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.5, fontSize: 13 }}>
          Browse interaction classes used across the app. These are educational risk concepts—each page summarizes what’s known,
          what’s uncertain, and what to watch for.
        </p>

        <div
          style={{
            position: "sticky",
            top: 62,
            zIndex: 20,
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(10px)",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search interactions (e.g., anticoagulants, SSRIs, stimulants)…"
            style={{
              width: "100%",
              padding: "12px 12px",
              borderRadius: 14,
              border: "1px solid rgba(0,0,0,0.12)",
              fontSize: 14,
              outline: "none",
            }}
          />
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.75 }}>
            Showing <strong>{filtered.length}</strong> of <strong>{items.length}</strong>
          </div>
        </div>

        {grouped.length === 0 ? (
          <div style={{ padding: 14, borderRadius: 16, background: "rgba(0,0,0,0.03)", fontSize: 13, opacity: 0.85 }}>
            No interaction classes found.
          </div>
        ) : (
          <div style={{ display: "grid", gap: 16 }}>
            {grouped.map(([category, arr]) => (
              <section key={category} style={{ display: "grid", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                  <h2 style={{ margin: 0, fontSize: 16, fontWeight: 900 }}>{category}</h2>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>{arr.length}</div>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  {arr.map((it) => (
                    <Link
                      key={it.slug}
                      href={`/interaction/${it.slug}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: 16,
                        padding: 14,
                        background: "#fff",
                      }}
                    >
                      <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 6 }}>{it.title}</div>
                      {it.description ? (
                        <div style={{ fontSize: 13, opacity: 0.8, lineHeight: 1.45 }}>{it.description}</div>
                      ) : (
                        <div style={{ fontSize: 13, opacity: 0.6, lineHeight: 1.45 }}>
                          Tap to view the summary, evidence notes, and what’s uncertain.
                        </div>
                      )}
                      <div style={{ marginTop: 10, fontSize: 12, opacity: 0.65 }}>
                        /interaction/{it.slug}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
