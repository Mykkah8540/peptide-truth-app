"use client";

import Link from "next/link";
import type { EntityListItem } from "@/lib/content";
import { useFavorites } from "@/lib/favoritesContext";

const CATEGORY_COLORS: Record<string, string> = {
  regenerative_blend:     "#10b981",
  gh_axis_blend:          "#f59e0b",
  metabolic_weight_blend: "#3b82f6",
};

function blendColor(taxonomyKeys: string[]): string {
  for (const k of taxonomyKeys) {
    if (CATEGORY_COLORS[k]) return CATEGORY_COLORS[k];
  }
  return "#6366f1";
}

export default function BlendGrid({ items }: { items: EntityListItem[] }) {
  const { isSaved, toggle, isAuthed, isPro } = useFavorites();

  return (
    <div className="pt-blends__grid">
      {items.map((b) => {
        const href       = b.route || `/blend/${b.slug}`;
        const color      = blendColor(b.taxonomy_keys ?? []);
        const components = Array.isArray((b as any).components)
          ? (b as any).components as string[]
          : [];
        const intentLabel = (b as any).intent_label as string ?? "";
        const saved = isSaved("blend", b.slug);
        const gated = isAuthed && !isPro;

        return (
          <div key={b.slug} className="pt-favcard">
            <Link href={href} className="pt-blends__card">
              <span
                className="pt-blends__card-accent"
                style={{ background: color }}
              />
              <div className="pt-blends__card-body">
                <div className="pt-blends__card-hd">
                  <span className="pt-blends__card-name">{b.name}</span>
                  {components.length > 0 && (
                    <span className="pt-blends__card-count">
                      {components.length}{" "}
                      {components.length === 1 ? "compound" : "compounds"}
                    </span>
                  )}
                </div>
                {intentLabel && (
                  <div className="pt-blends__card-tag">{intentLabel}</div>
                )}
                {components.length > 0 && (
                  <div className="pt-blends__card-compounds">
                    {components.map((c, i) => (
                      <span key={c}>
                        {c
                          .split("-")
                          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                          .join("-")}
                        {i < components.length - 1 && (
                          <span className="pt-blends__card-sep"> · </span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
                <div className="pt-blends__card-arrow">Explore blend →</div>
              </div>
            </Link>
            <button
              type="button"
              onClick={async (e) => {
                e.stopPropagation();
                if (!isAuthed) {
                  window.location.href = `/login?next=${encodeURIComponent(window.location.pathname)}`;
                  return;
                }
                if (!isPro) {
                  window.location.href = "/upgrade";
                  return;
                }
                await toggle("blend", b.slug);
              }}
              aria-label={`${saved ? "Remove" : "Save"} ${b.name}`}
              className={`pt-favcard__btn${saved ? " pt-favcard__btn--on" : ""}${gated ? " pt-favcard__btn--gated" : ""}`}
            >
              {saved ? "♥" : "♡"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
