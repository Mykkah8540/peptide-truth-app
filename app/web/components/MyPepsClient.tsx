"use client";

import Link from "next/link";
import type { EntityListItem } from "@/lib/content";
import { useFavoritesDoc } from "@/components/FavoriteButton";

function bySlugMap(list: EntityListItem[]): Map<string, EntityListItem> {
  const m = new Map<string, EntityListItem>();
  for (const it of list) m.set(it.slug, it);
  return m;
}

function CardList({
  title,
  slugs,
  lookup,
  emptyText,
}: {
  title: string;
  slugs: string[];
  lookup: Map<string, EntityListItem>;
  emptyText: string;
}) {
  if (!slugs.length) {
    return <p className="pt-card-subtext">{emptyText}</p>;
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ fontWeight: 900, fontSize: 14 }}>{title}</div>
      {slugs.map((slug) => {
        const hit = lookup.get(slug);
        const href = hit?.route || "#";
        const name = hit?.name || slug;
        return (
          <Link
            key={slug}
            href={href}
            style={{
              display: "block",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 14,
              padding: "12px 14px",
              textDecoration: "none",
              color: "inherit",
              background: "#fff",
            }}
          >
            <div style={{ fontWeight: 900 }}>{name}</div>
            <div style={{ color: "#777", fontSize: 13 }}>{slug}</div>
          </Link>
        );
      })}
    </div>
  );
}

export default function MyPepsClient({
  peptides,
  blends,
}: {
  peptides: EntityListItem[];
  blends: EntityListItem[];
}) {
  const { doc, refresh } = useFavoritesDoc();

  const pepMap = bySlugMap(peptides);
  const blendMap = bySlugMap(blends);

  const pepSlugs = Array.isArray(doc?.peptides) ? doc.peptides : [];
  const blendSlugs = Array.isArray(doc?.blends) ? doc.blends : [];

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <p className="pt-card-subtext">
        Favorites are stored locally on this device for now.
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={refresh}
          style={{
            border: "1px solid rgba(0,0,0,0.10)",
            background: "#fff",
            borderRadius: 12,
            padding: "8px 10px",
            fontWeight: 900,
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Refresh
        </button>
      </div>

      <CardList
        title="Saved peptides"
        slugs={pepSlugs}
        lookup={pepMap}
        emptyText="No saved peptides yet."
      />

      <CardList
        title="Saved blends"
        slugs={blendSlugs}
        lookup={blendMap}
        emptyText="No saved blends yet."
      />
    </div>
  );
}
