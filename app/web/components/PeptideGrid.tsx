"use client";

import Link from "next/link";
import type { EntityListItem } from "@/lib/content";
import { useFavorites } from "@/lib/favoritesContext";

const CATEGORY_LABELS: Record<string, string> = {
  metabolic_weight:              "Metabolic & Weight",
  muscle_performance:            "Muscle & Performance",
  regenerative_repair:           "Recovery & Repair",
  endocrine_hormonal:            "Hormonal",
  neurocognitive_mood:           "Brain & Mood",
  mitochondrial_longevity:       "Longevity",
  immunomodulatory_inflammation: "Immune & Anti-Inflammatory",
  sexual_health_reproduction:    "Sexual Health",
  cosmetic_topical:              "Skin & Cosmetic",
  sleep_circadian:               "Sleep",
  antimicrobial_innate:          "Antimicrobial",
};

export default function PeptideGrid({ items }: { items: EntityListItem[] }) {
  const { isSaved, toggle, isAuthed, isPro } = useFavorites();

  return (
    <div className="pt-peptides__grid">
      {items.map((p) => {
        const primaryKey = p.taxonomy_keys?.[0];
        const badge = primaryKey ? CATEGORY_LABELS[primaryKey] : null;
        const saved = isSaved("peptide", p.slug);
        const gated = isAuthed && !isPro;

        return (
          <div key={p.slug} className="pt-favcard">
            <Link
              href={p.route || `/peptide/${p.slug}`}
              className="pt-peptides__card"
            >
              <span className="pt-peptides__card-name">{p.name}</span>
              {badge ? (
                <span className="pt-peptides__card-badge">{badge}</span>
              ) : null}
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
                await toggle("peptide", p.slug);
              }}
              aria-label={`${saved ? "Remove" : "Save"} ${p.name}`}
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
