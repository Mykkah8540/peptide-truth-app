import { Suspense } from "react";
import BackHomeLink from "@/components/BackHomeLink";
import UpgradeClient from "./upgradeClient";

const FEATURES = [
  {
    icon: "⚗️",
    label: "Commercial Blends",
    desc: "Pre-formulated compounds with full ingredient breakdowns and sourcing context.",
  },
  {
    icon: "🧬",
    label: "Wellness Paths",
    desc: "Goal-guided discovery across fat loss, recovery, cognition, sleep, and longevity.",
  },
  {
    icon: "⚙️",
    label: "Stack Builder",
    desc: "Build multi-compound protocols with smart suggestions and redundancy detection.",
  },
  {
    icon: "📋",
    label: "Browse Stacks",
    desc: "Community-curated protocols with rationale, compounds, and cautions explained.",
  },
  {
    icon: "💾",
    label: "My Peps",
    desc: "Save peptides, blends, and stacks to your personal cross-device workspace.",
  },
  {
    icon: "⚠️",
    label: "Interaction Checker",
    desc: "Full drug, supplement, and peptide interaction matrix with severity ratings.",
  },
];

export default function UpgradePage() {
  return (
    <main className="pt-upgrade">
      <div className="pt-upgrade__inner">

        <div className="pt-upgrade__back">
          <BackHomeLink />
        </div>

        {/* Hero */}
        <div className="pt-upgrade__hero">
          <p className="pt-upgrade__eyebrow">Peptide Truth Pro</p>
          <h1 className="pt-upgrade__title">
            The full picture,<br className="pt-upgrade__br" />
            for serious researchers.
          </h1>
          <p className="pt-upgrade__sub">
            Every peptide profile is free. Pro unlocks the synthesis, discovery,
            and comparison tools built for people who go deeper.
          </p>
        </div>

        {/* Body: features + pricing card */}
        <div className="pt-upgrade__body">

          {/* Left: feature list */}
          <div className="pt-upgrade__features">
            <div className="pt-upgrade__features-heading">What Pro unlocks</div>
            <div className="pt-upgrade__feature-list">
              {FEATURES.map((f) => (
                <div key={f.label} className="pt-upgrade__feature">
                  <span className="pt-upgrade__feature-icon">{f.icon}</span>
                  <div className="pt-upgrade__feature-text">
                    <div className="pt-upgrade__feature-label">{f.label}</div>
                    <div className="pt-upgrade__feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-upgrade__free-note">
              Peptide profiles, evidence summaries, and educational resources remain free — always.
            </div>
          </div>

          {/* Right: pricing card */}
          <div className="pt-upgrade__card">
            <div className="pt-upgrade__card-plan">Pro Plan</div>
            <div className="pt-upgrade__price-row">
              <span className="pt-upgrade__price-amount">$4.99</span>
              <span className="pt-upgrade__price-period">&thinsp;/ month</span>
            </div>
            <div className="pt-upgrade__price-note">Cancel anytime. No commitment.</div>

            <div className="pt-upgrade__card-divider" />

            <div className="pt-upgrade__checklist">
              {FEATURES.map((f) => (
                <div key={f.label} className="pt-upgrade__check-row">
                  <span className="pt-upgrade__check">✓</span>
                  <span className="pt-upgrade__check-label">{f.label}</span>
                </div>
              ))}
            </div>

            <Suspense fallback={<div className="pt-upgrade__cta-loading">Loading offer…</div>}>
              <UpgradeClient />
            </Suspense>
          </div>

        </div>

        {/* Footer links */}
        <div className="pt-upgrade__footer">
          <span className="pt-upgrade__footer-label">Free to explore:</span>
          <a href="/peptides" className="pt-upgrade__footer-link">92 Peptide Profiles</a>
          <span className="pt-upgrade__footer-sep">·</span>
          <a href="/resources" className="pt-upgrade__footer-link">Resources</a>
          <span className="pt-upgrade__footer-sep">·</span>
          <a href="/" className="pt-upgrade__footer-link">Home</a>
        </div>

      </div>
    </main>
  );
}
