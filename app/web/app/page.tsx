import { getSponsors } from "@/lib/sponsors";
import { requirePaid } from "@/lib/gate";
import { listPeptides } from "@/lib/content";
import Link from "next/link";
import DisclaimerSection from "@/components/DisclaimerSection";
import SponsorBanner from "@/components/SponsorBanner";

export const dynamic = "force-dynamic";

async function isPaid(): Promise<boolean> {
  try {
    await requirePaid();
    return true;
  } catch {
    return false;
  }
}

const CATEGORIES = [
  { key: "metabolic_weight",              label: "Metabolic & Weight",         color: "#3b82f6" },
  { key: "muscle_performance",            label: "Muscle & Performance",       color: "#f59e0b" },
  { key: "regenerative_repair",           label: "Recovery & Repair",          color: "#10b981" },
  { key: "endocrine_hormonal",            label: "Hormonal",                   color: "#8b5cf6" },
  { key: "neurocognitive_mood",           label: "Brain & Mood",               color: "#6366f1" },
  { key: "mitochondrial_longevity",       label: "Longevity",                  color: "#ef4444" },
  { key: "immunomodulatory_inflammation", label: "Immune & Anti-Inflammatory", color: "#f97316" },
  { key: "sexual_health_reproduction",    label: "Sexual Health",              color: "#ec4899" },
  { key: "cosmetic_topical",              label: "Skin & Cosmetic",            color: "#14b8a6" },
  { key: "sleep_circadian",              label: "Sleep",                      color: "#7c3aed" },
  { key: "antimicrobial_innate",          label: "Antimicrobial",              color: "#84cc16" },
] as const;

const DISCLAIMER =
  "Pep-Talk is an educational resource. It is not medical advice, diagnosis, or treatment. Always use your judgment and consult a qualified clinician for personal medical decisions.";

export default async function Home() {
  const [sponsors, paid] = await Promise.all([getSponsors(), isPaid()]);

  const all = listPeptides();
  const catCounts = new Map<string, number>();
  for (const p of all) {
    for (const key of p.taxonomy_keys ?? []) {
      catCounts.set(key, (catCounts.get(key) ?? 0) + 1);
    }
  }

  return (
    <div className="pt-home">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="pt-home__hero">
        <div className="pt-home__hero-inner">
          <p className="pt-home__hero-eyebrow">Peptide Intelligence</p>
          <h1 className="pt-home__hero-headline">
            Know what you&rsquo;re<br />
            putting in your body.
          </h1>
          <p className="pt-home__hero-sub">
            Clear, practical peptide profiles — without the hype, fear, or gatekeeping.
            Built so you can understand what you&rsquo;re looking at and decide with confidence.
          </p>
          <div className="pt-home__hero-ctas">
            <Link href="/peptides" className="pt-home__hero-cta-primary">
              Browse Peptides
            </Link>
            <Link href="/blends" className="pt-home__hero-cta-secondary">
              Commercial Blends
            </Link>
          </div>
          <Link href="/resources" className="pt-home__hero-resources-link">
            New here? Start with Resources &rarr;
          </Link>
          <p className="pt-home__hero-stat">
            {all.length} compounds &middot; 11 categories &middot; free to explore
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CATEGORY GRID
      ══════════════════════════════════════════ */}
      <section className="pt-home__section">
        <div className="pt-home__section-inner">
          <h2 className="pt-home__section-heading">Explore by goal</h2>
          <p className="pt-home__section-sub">
            Every compound is tagged to a primary goal area. Start here if you know what you&rsquo;re after.
          </p>
          <div className="pt-home__cats">
            {CATEGORIES.map((cat) => {
              const count = catCounts.get(cat.key) ?? 0;
              return (
                <Link
                  key={cat.key}
                  href={`/peptides?cat=${cat.key}`}
                  className="pt-home__cat"
                >
                  <span className="pt-home__cat-accent" style={{ background: cat.color }} />
                  <span className="pt-home__cat-name">{cat.label}</span>
                  <span className="pt-home__cat-count">
                    {count} {count === 1 ? "compound" : "compounds"}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FREE vs PRO
      ══════════════════════════════════════════ */}
      <section className="pt-home__section">
        <div className="pt-home__section-inner">
          <h2 className="pt-home__section-heading">Built for every level of curiosity</h2>
          <p className="pt-home__section-sub">
            The fundamentals are free. Pro unlocks the deeper layer — community signal, guided discovery, and decision tools.
          </p>

          <div className="pt-home__split">

            {/* ── Free ── */}
            <div className="pt-home__tier">
              <div className="pt-home__tier-badge">Free</div>
              <div className="pt-home__tier-title">Explore &amp; Learn</div>
              <ul className="pt-home__tier-list">
                <li className="pt-home__tier-item">Full compound profiles — evidence, safety, interactions</li>
                <li className="pt-home__tier-item">Commercial blend breakdowns &amp; ingredient analysis</li>
                <li className="pt-home__tier-item">Education library &amp; contextual resources</li>
                <li className="pt-home__tier-item">Community commenting (free account required)</li>
              </ul>
              <Link href="/peptides" className="pt-home__tier-cta pt-home__tier-cta--outline">
                Start exploring &rarr;
              </Link>
            </div>

            {/* ── Pro ── */}
            <div className="pt-home__tier pt-home__tier--pro">
              <div className="pt-home__tier-badge">Pro</div>
              <div className="pt-home__tier-title">Discover &amp; Decide</div>
              <ul className="pt-home__tier-list">
                <li className="pt-home__tier-item pt-home__tier-item--all">Everything in Free</li>
                <li className="pt-home__tier-item">Community Insights — what real users report, distilled</li>
                <li className="pt-home__tier-item">Wellness Paths — topic-driven guided discovery</li>
                <li className="pt-home__tier-item">Stack Builder — explore &amp; build compound combinations</li>
                <li className="pt-home__tier-item">My Peps — save and quickly revisit compounds</li>
                <li className="pt-home__tier-item">UGC submissions — publish your own stacks &amp; blends</li>
              </ul>
              <Link
                href={paid ? "/account" : "/upgrade"}
                className="pt-home__tier-cta"
              >
                {paid ? "You\u2019re on Pro" : "Upgrade to Pro \u2192"}
              </Link>
              {!paid && (
                <p className="pt-home__tier-note">
                  No free trial. Pro is built for ongoing discovery — not one-time extraction.
                </p>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="pt-home__section">
        <div className="pt-home__section-inner">
          <h2 className="pt-home__section-heading">How it works</h2>
          <div className="pt-home__how">
            <div className="pt-home__how-step">
              <div className="pt-home__how-step-num">01</div>
              <div className="pt-home__how-step-title">Find what you&rsquo;re considering</div>
              <div className="pt-home__how-step-body">
                Search by name, browse by category, or follow a wellness path. Every compound has a full evidence profile built for real-world use.
              </div>
            </div>
            <div className="pt-home__how-step">
              <div className="pt-home__how-step-num">02</div>
              <div className="pt-home__how-step-title">Understand the full picture</div>
              <div className="pt-home__how-step-body">
                What it does, why people use it, what to watch for, and what the community actually experiences — not just the abstract mechanism.
              </div>
            </div>
            <div className="pt-home__how-step">
              <div className="pt-home__how-step-num">03</div>
              <div className="pt-home__how-step-title">Decide with confidence</div>
              <div className="pt-home__how-step-body">
                Use stacks, wellness paths, and contextual tools to make decisions that fit your goals, your situation, and your risk tolerance.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMMUNITY
      ══════════════════════════════════════════ */}
      <section className="pt-home__section pt-home__section--tight">
        <div className="pt-home__section-inner">
          <div className="pt-home__community">
            <div className="pt-home__community-body">
              <h3 className="pt-home__community-heading">Built with community signal</h3>
              <p className="pt-home__community-sub">
                Every compound page surfaces real discussion. Free users can comment after creating an account.
                Pro members unlock curated insight summaries — what the community consistently reports, separated from anecdote.
              </p>
            </div>
            <Link href="/resources#community" className="pt-home__community-cta">
              How the community works &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SPONSORS
      ══════════════════════════════════════════ */}
      {sponsors.length > 0 && (
        <section className="pt-home__sponsors-section">
          <div className="pt-home__section-inner">
            <p className="pt-home__sponsor-label">Partners</p>
            <SponsorBanner sponsors={sponsors} rotateMs={3200} />
            <p className="pt-home__sponsor-note">
              Sponsored placements support Pep-Talk. Sponsors do not control or edit educational content.
            </p>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          DISCLAIMER
      ══════════════════════════════════════════ */}
      <div className="pt-home__section pt-home__section--tight">
        <div className="pt-home__section-inner">
          <DisclaimerSection text={DISCLAIMER} />
        </div>
      </div>

    </div>
  );
}
