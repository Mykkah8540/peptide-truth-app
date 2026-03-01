import { listPeptides } from "@/lib/content";
import Link from "next/link";

export const dynamic = "force-dynamic";

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

const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS);

export default async function PeptidesPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const all = listPeptides();
  const activeCat = cat && CATEGORY_LABELS[cat] ? cat : null;
  const shown = activeCat
    ? all.filter((p) => p.taxonomy_keys?.includes(activeCat))
    : all;

  return (
    <main className="pt-peptides">
      <div className="pt-peptides__inner">

        <div className="pt-peptides__header">
          <h1 className="pt-peptides__title">Peptides</h1>
          <p className="pt-peptides__subtitle">
            {activeCat
              ? `${shown.length} of ${all.length} compounds — ${CATEGORY_LABELS[activeCat]}`
              : `${all.length} compounds`}
          </p>
        </div>

        <div className="pt-peptides__filter-bar">
          <Link
            href="/peptides"
            className={`pt-peptides__chip${!activeCat ? " pt-peptides__chip--active" : ""}`}
          >
            All
          </Link>
          {CATEGORY_ORDER.map((key) => (
            <Link
              key={key}
              href={`/peptides?cat=${key}`}
              className={`pt-peptides__chip${activeCat === key ? " pt-peptides__chip--active" : ""}`}
            >
              {CATEGORY_LABELS[key]}
            </Link>
          ))}
        </div>

        <div className="pt-peptides__grid">
          {shown.map((p) => {
            const primaryKey = p.taxonomy_keys?.[0];
            const badge = primaryKey ? CATEGORY_LABELS[primaryKey] : null;
            return (
              <Link
                key={p.slug}
                href={p.route || `/peptide/${p.slug}`}
                className="pt-peptides__card"
              >
                <span className="pt-peptides__card-name">{p.name}</span>
                {badge ? (
                  <span className="pt-peptides__card-badge">{badge}</span>
                ) : null}
              </Link>
            );
          })}
        </div>

        {shown.length === 0 && (
          <p className="pt-peptides__empty">No compounds in this category yet.</p>
        )}

      </div>
    </main>
  );
}
