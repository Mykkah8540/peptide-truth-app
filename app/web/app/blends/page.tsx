import Link from "next/link";
import BackHomeLink from "@/components/BackHomeLink";
import { listBlends } from "@/lib/content";

export const dynamic = "force-dynamic";

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

export default async function BlendsPage() {
  const all = listBlends();

  return (
    <main className="pt-blends">

      {/* ── Hero ── */}
      <div className="pt-blends__hero">
        <div className="pt-blends__hero-inner">
          <div className="pt-blends__hero-back">
            <BackHomeLink />
          </div>
          <h1 className="pt-blends__hero-title">Commercial Blends</h1>
          <p className="pt-blends__hero-sub">
            Pre-assembled peptide products sold by suppliers. Each page explains
            why the combination exists, how the compounds work together, and where
            a fixed ratio may or may not match your goal.
          </p>
          <div className="pt-blends__hero-note">
            <span className="pt-blends__hero-note-label">Keep in mind:</span>{" "}
            A commercial blend is optimized for general use — not personalized for
            you. If you need different ratios or a custom combination,{" "}
            <Link href="/stack-builder" className="pt-blends__hero-note-link">
              the Stack Builder
            </Link>{" "}
            is where to start.
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="pt-blends__body">
        <div className="pt-blends__grid">
          {all.map((b) => {
            const href        = b.route || `/blend/${b.slug}`;
            const color       = blendColor(b.taxonomy_keys ?? []);
            const components  = Array.isArray((b as any).components)
              ? (b as any).components as string[]
              : [];
            const intentLabel = (b as any).intent_label as string ?? "";

            return (
              <Link key={b.slug} href={href} className="pt-blends__card">
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
            );
          })}
        </div>
      </div>

    </main>
  );
}
