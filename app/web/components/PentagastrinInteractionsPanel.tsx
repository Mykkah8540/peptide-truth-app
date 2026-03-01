"use client";

import { useState, useMemo } from "react";

/**
 * PentagastrinInteractionsPanel — interaction intelligence for Pentagastrin.
 * Key frame: interactions are only relevant in the diagnostic test context.
 * PPIs, H2 blockers, and antacids reduce the gastric acid response in acid testing.
 * No therapeutic or community use interactions to characterize.
 */

type Tier = "flag" | "watch" | "low";

type Entry = {
  name: string;
  tier: Tier;
  detail: string;
  why: string;
  action: string;
};

const ENTRIES: Entry[] = [
  // ── LOWS ──
  {
    name: "Proton pump inhibitors (omeprazole, pantoprazole, esomeprazole, lansoprazole)",
    tier: "low",
    detail: "Reduce pentagastrin-stimulated acid output \u2014 relevant for acid stimulation test interpretation",
    why: "PPIs irreversibly inhibit the H2/K+-ATPase (the proton pump) on parietal cells, reducing gastric acid secretion regardless of stimulation. Pentagastrin stimulates acid secretion via CCK-B receptors that ultimately activate this same proton pump. If a patient is on PPIs during the gastric acid stimulation test, the measured acid output will be suppressed \u2014 potentially producing a falsely low result that mimics achlorhydria or underestimates secretory capacity. This interaction is relevant only in the diagnostic test context.",
    action: "For gastric acid stimulation testing: PPIs should be held for an appropriate washout period before the test (typically 2 weeks for complete H2/K+-ATPase regeneration). This is a diagnostic test methodology consideration, not a therapeutic drug interaction.",
  },
  {
    name: "H2 receptor antagonists (ranitidine, famotidine, cimetidine)",
    tier: "low",
    detail: "Reduce histamine-mediated component of acid secretion \u2014 may attenuate pentagastrin response",
    why: "Gastric acid secretion involves three converging stimuli: acetylcholine (vagal), gastrin (CCK-B receptor), and histamine (H2 receptor). These pathways are interdependent \u2014 histamine from ECL cells amplifies parietal cell response to gastrin/CCK-B stimulation. H2 blockers reduce the histamine amplification, attenuating the pentagastrin-stimulated acid response. The interaction is pharmacological and relevant to acid stimulation test interpretation.",
    action: "For gastric acid stimulation testing: H2 blockers should be held before the test (typically 48\u201372 hours for complete washout). This is a diagnostic methodology consideration.",
  },
  {
    name: "Antacids (calcium carbonate, aluminum hydroxide, magnesium hydroxide)",
    tier: "low",
    detail: "Neutralize gastric acid \u2014 affect acid measurement in stimulation test context",
    why: "Antacids neutralize gastric acid after secretion but do not block parietal cell secretory capacity. They affect the measurement of acid output in stimulation testing by altering gastric pH during sample collection. This is a test methodology interaction rather than a pharmacodynamic drug interaction with pentagastrin\u2019s mechanism.",
    action: "Hold antacids before gastric acid stimulation testing per protocol. Standard pre-test preparation includes overnight fasting and suspension of acid-modifying medications.",
  },
  {
    name: "Standard medications without GI or calcitonin pathway overlap",
    tier: "low",
    detail: "No pharmacodynamic interaction with CCK-B/gastrin receptor agonism for most medications",
    why: "Most medications do not interact with the CCK-B/gastrin receptor signaling pathway. Pentagastrin is administered as a single dose for a short diagnostic window \u2014 pharmacokinetic interactions are not clinically relevant at typical diagnostic doses and duration.",
    action: "No specific interaction concern for medications outside the acid-modifying or calcitonin-pathway classes. Standard diagnostic pre-test preparation applies.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.06)",  border: "rgba(158,56,0,0.22)",  dot: "#9e3800", label: "Flag",        labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.05)",  border: "rgba(124,82,0,0.18)",  dot: "#7c5200", label: "Watch",       labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.04)", border: "rgba(21,100,58,0.15)", dot: "#155e38", label: "Low concern", labelColor: "#155e38" },
};

const TIER_ORDER: Tier[] = ["flag", "watch", "low"];
const TIER_HEADING: Record<Tier, string> = {
  flag:  "Flags \u2014 stop and consult before combining",
  watch: "Worth watching \u2014 monitor and use judgment",
  low:   "Low concern \u2014 proceed with standard awareness",
};

export default function PentagastrinInteractionsPanel() {
  const [filter, setFilter] = useState<Tier | "all">("all");
  const [committed, setCommitted] = useState<Tier | "all">("all");

  const filtered = useMemo(
    () => (committed === "all" ? ENTRIES : ENTRIES.filter((e) => e.tier === committed)),
    [committed],
  );

  const tiersPresent = TIER_ORDER.filter((t) => filtered.some((e) => e.tier === t));

  return (
    <div className="reta-interactions">

      <div className="reta-interactions__intro">
        Pentagastrin\u2019s interaction profile is simple because its use is simple: a single-dose diagnostic agent with a 30\u201360 minute effect window. The only meaningful interactions are medications that blunt the gastric acid response in the acid stimulation test context (PPIs, H2 blockers, antacids) \u2014 and these are test methodology considerations, not therapeutic drug interactions. There is no therapeutic or community use context in which ongoing drug interactions would be relevant.
      </div>

      <div className="reta-interactions__filter-bar">
        {(["all", ...TIER_ORDER] as const).map((t) => (
          <button
            key={t}
            className={`reta-interactions__filter-btn${(filter === t) ? " reta-interactions__filter-btn--active" : ""}`}
            onClick={() => { setFilter(t); setCommitted(t); }}
          >
            {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tiersPresent.map((tier) => {
        const entries = filtered.filter((e) => e.tier === tier);
        const cfg = TIER_STYLE[tier];
        return (
          <div key={tier} className="reta-interactions__group">
            <div
              className="reta-interactions__group-heading"
              style={{ color: cfg.labelColor, borderLeft: `3px solid ${cfg.dot}` }}
            >
              {TIER_HEADING[tier]}
            </div>
            <div className="reta-interactions__entries">
              {entries.map((e) => (
                <div
                  key={e.name}
                  className="reta-interactions__entry"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                >
                  <div className="reta-interactions__entry-top">
                    <div className="reta-interactions__entry-name">{e.name}</div>
                    <span
                      className="reta-interactions__entry-badge"
                      style={{ color: cfg.labelColor, borderColor: cfg.border }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <div className="reta-interactions__entry-detail">{e.detail}</div>
                  <div className="reta-interactions__entry-why">{e.why}</div>
                  <div className="reta-interactions__entry-action">{e.action}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="reta-interactions__footer">
        The interaction list for pentagastrin is the shortest in this database \u2014 and for the most unambiguous reason: there is no ongoing therapeutic use context to characterize interactions for. If you encounter pentagastrin in a diagnostic testing setting, the relevant pre-test preparation (holding acid-suppressing medications) is the complete interaction management required.
      </div>

    </div>
  );
}
