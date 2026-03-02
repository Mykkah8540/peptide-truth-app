"use client";

import Link from "next/link";
import type { EntityListItem } from "@/lib/content";
import { useFavorites } from "@/lib/favoritesContext";
import FavoriteButton from "@/components/FavoriteButton";

function bySlugMap(list: EntityListItem[]): Map<string, EntityListItem> {
  const m = new Map<string, EntityListItem>();
  for (const it of list) m.set(it.slug, it);
  return m;
}

function CardList({
  title,
  items,
  kind,
  emptyText,
}: {
  title: string;
  items: EntityListItem[];
  kind: "peptide" | "blend";
  emptyText: string;
}) {
  if (!items.length) {
    return <p className="pt-card-subtext">{emptyText}</p>;
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ fontWeight: 900, fontSize: 14 }}>{title}</div>
      {items.map((hit) => {
        const href = hit.route || "#";
        return (
          <div key={hit.slug} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link
              href={href}
              style={{
                flex: 1,
                display: "block",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 14,
                padding: "12px 14px",
                textDecoration: "none",
                color: "inherit",
                background: "#fff",
              }}
            >
              <div style={{ fontWeight: 900 }}>{hit.name}</div>
              <div style={{ color: "#777", fontSize: 13 }}>{hit.slug}</div>
            </Link>
            <FavoriteButton kind={kind} slug={hit.slug} compact />
          </div>
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
  const { isSaved, isPro, isAuthed, ready } = useFavorites();

  if (!ready) return null;

  // Not signed in
  if (!isAuthed) {
    return (
      <div style={{ display: "grid", gap: 14 }}>
        <p className="pt-card-subtext">
          <a href="/login" style={{ fontWeight: 800, color: "inherit" }}>Sign in</a>{" "}
          to see your saved peptides and blends.
        </p>
      </div>
    );
  }

  // Signed in but not Pro
  if (!isPro) {
    return (
      <div style={{ display: "grid", gap: 14 }}>
        <p className="pt-card-subtext">
          Saving peptides and blends is a Pro feature.{" "}
          <a href="/upgrade" style={{ fontWeight: 800, color: "inherit" }}>
            Upgrade to Pro →
          </a>
        </p>
      </div>
    );
  }

  const savedPeps = peptides.filter((p) => isSaved("peptide", p.slug));
  const savedBlends = blends.filter((b) => isSaved("blend", b.slug));

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <CardList
        title="Saved peptides"
        items={savedPeps}
        kind="peptide"
        emptyText="No saved peptides yet — tap ♡ on any peptide page or listing."
      />
      <CardList
        title="Saved blends"
        items={savedBlends}
        kind="blend"
        emptyText="No saved blends yet — tap ♡ on any blend page or listing."
      />
    </div>
  );
}
