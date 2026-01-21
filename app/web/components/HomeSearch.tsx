"use client";

import { useMemo, useState } from "react";
import type { EntityListItem, TopicListItem } from "@/lib/content";

function norm(s: string) {
  return (s || "").toLowerCase();
}

export default function HomeSearch(props: {
  peptides: EntityListItem[];
  blends: EntityListItem[];
  topics: TopicListItem[];
}) {
  const [q, setQ] = useState("");

  const peptides = useMemo(() => {
    const query = norm(q).trim();
    if (!query) return props.peptides;
    return props.peptides.filter((p) => norm(`${p.slug} ${p.name}`).includes(query));
  }, [q, props.peptides]);

  const blends = useMemo(() => {
    const query = norm(q).trim();
    if (!query) return props.blends;
    return props.blends.filter((b) => norm(`${b.slug} ${b.name}`).includes(query));
  }, [q, props.blends]);

  const topics = useMemo(() => {
    const query = norm(q).trim();
    if (!query) return props.topics;
    return props.topics.filter((t) => norm(`${t.slug} ${t.title} ${t.summary || ""}`).includes(query));
  }, [q, props.topics]);

  return (
    <div style={{ display: "grid", gap: 16, width: "100%" }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search peptides, blends, topics…"
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 12,
          border: "1px solid rgba(0,0,0,0.10)",
          background: "rgba(0,0,0,0.02)",
          outline: "none",
        }}
      />

      <Section title={`Peptides (${peptides.length})`}>
        {peptides.slice(0, 40).map((p) => (
          <Row key={p.slug} href={`/peptide/${p.slug}`} label={p.name} sub={p.slug} />
        ))}
      </Section>

      <Section title={`Stacks / Blends (${blends.length})`}>
        {blends.slice(0, 40).map((b) => (
          <Row key={b.slug} href={`/blend/${b.slug}`} label={b.name} sub={b.slug} />
        ))}
      </Section>

      <Section title={`Topics (${topics.length})`}>
        {topics.slice(0, 40).map((t) => (
          <Row key={t.slug} href={`/topic/${t.slug}`} label={t.title} sub={t.slug} />
        ))}
      </Section>
    </div>
  );
}

function Section(props: { title: string; children: any }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ fontSize: 12, opacity: 0.7, letterSpacing: 0.2 }}>{props.title}</div>
      <div style={{ display: "grid", gap: 8 }}>{props.children}</div>
    </div>
  );
}

function Row(props: { href: string; label: string; sub?: string }) {
  return (
    <a
      href={props.href}
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        padding: "10px 12px",
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.08)",
        background: "rgba(0,0,0,0.02)",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <span>{props.label}</span>
      <span style={{ opacity: 0.55, fontSize: 12 }}>{props.sub || ""}</span>
    </a>
  );
}
