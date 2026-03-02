import Link from "next/link";
import BackHomeLink from "@/components/BackHomeLink";
import { listBlends } from "@/lib/content";
import BlendGrid from "@/components/BlendGrid";

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
        <BlendGrid items={all} />
      </div>

    </main>
  );
}
