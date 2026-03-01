"use client";
import { useState, useMemo } from "react";

type Tier = "flag" | "watch" | "low";

interface Entry {
  id: string;
  name: string;
  aliases: string[];
  category: string;
  tier: Tier;
  summary: string;
  mitigation: string[];
}

const INTERACTIONS: Entry[] = [
  {
    id: "bival-anticoagulants-antiplatelets",
    name: "Anticoagulants and antiplatelet drugs",
    aliases: ["aspirin", "clopidogrel", "ticagrelor", "prasugrel", "warfarin", "apixaban", "rivaroxaban", "heparin", "Eliquis", "Xarelto", "Plavix", "Brilinta"],
    category: "Anticoagulants / Antiplatelets",
    tier: "flag",
    summary:
      "Combination use of bivalirudin with antiplatelet drugs is standard in PCI (aspirin + P2Y12 inhibitor dual antiplatelet therapy is required for coronary stenting). However, the combination materially increases bleeding risk compared to bivalirudin alone. Adding warfarin, NOACs, or additional anticoagulants on top of bivalirudin creates compounding hemorrhagic risk. In PCI, the combination is monitored intensively; outside this setting, it is potentially catastrophic.",
    mitigation: [
      "Dual antiplatelet therapy (aspirin + P2Y12 inhibitor) is mandatory with PCI stenting regardless of bivalirudin use &mdash; do not discontinue.",
      "Do not add warfarin, NOACs, or other anticoagulants to bivalirudin without specialist guidance and explicit indication.",
      "Post-PCI anticoagulation (e.g., for AFib or mechanical valve) requires careful bridging planning with the interventional cardiology and anticoagulation team.",
      "Monitor access sites and vital signs continuously during and for several hours after bivalirudin infusion cessation.",
    ],
  },
  {
    id: "bival-thrombolytics",
    name: "Thrombolytics",
    aliases: ["tPA", "alteplase", "tenecteplase", "reteplase", "streptokinase", "Activase", "TNKase"],
    category: "Thrombolytics",
    tier: "watch",
    summary:
      "Simultaneous or near-simultaneous use of bivalirudin and thrombolytics dramatically increases hemorrhagic risk. In facilitated PCI strategies (thrombolytic followed by PCI), the timing of bivalirudin initiation relative to the thrombolytic must be carefully managed. The short bivalirudin half-life is relatively favorable in this context, but the combination still requires expert management.",
    mitigation: [
      "Do not initiate bivalirudin simultaneously with thrombolytic therapy without explicit cardiology guidance.",
      "In facilitated or rescue PCI post-thrombolysis, follow published antithrombotic protocols for the timing of DTI initiation.",
      "Monitor for signs of bleeding (neurological changes, hemodynamic instability, access site bleeding) intensively during any combination period.",
      "No community use context for this combination exists; it is managed exclusively by interventional cardiologists.",
    ],
  },
  {
    id: "bival-nsaids-ssris",
    name: "NSAIDs and SSRIs",
    aliases: ["ibuprofen", "naproxen", "aspirin", "sertraline", "fluoxetine", "escitalopram", "Advil", "Aleve", "Zoloft", "Prozac", "Lexapro"],
    category: "NSAIDs / SSRIs",
    tier: "watch",
    summary:
      "NSAIDs inhibit platelet thromboxane A2 synthesis, producing mild antiplatelet effects that compound bivalirudin&apos;s anticoagulation. SSRIs reduce platelet serotonin uptake, impairing platelet aggregation and modestly increasing bleeding risk. Neither interaction is typically dose-limiting in clinical practice, but both add incrementally to the bleeding risk profile, particularly at access sites and for GI bleeding.",
    mitigation: [
      "Avoid non-cardiac NSAIDs (ibuprofen, naproxen) immediately before and after PCI with bivalirudin; they are also generally not recommended post-PCI for cardiac reasons.",
      "Do not discontinue chronic SSRI therapy for cardiac procedures; the risk of SSRI discontinuation (depression, withdrawal) exceeds the modest bleeding risk addition.",
      "Report all NSAID and SSRI use to the procedural team before PCI so overall bleeding risk can be assessed.",
    ],
  },
  {
    id: "bival-standard-meds",
    name: "Standard medications without anticoagulant effects",
    aliases: ["beta-blockers", "statins", "ACE inhibitors", "calcium channel blockers", "proton pump inhibitors"],
    category: "Standard medications",
    tier: "low",
    summary:
      "The vast majority of cardiovascular medications co-administered with bivalirudin in PCI patients (statins, beta-blockers, ACE inhibitors, calcium channel blockers, PPIs) have no clinically significant pharmacokinetic or pharmacodynamic interaction with bivalirudin. Bivalirudin&apos;s target (thrombin active site) and clearance mechanism (enzymatic + renal) are not affected by these drug classes.",
    mitigation: [
      "No dose adjustments required for standard cardiovascular medications.",
      "Continue all chronic cardiac medications through PCI unless specifically instructed otherwise by the procedural team.",
      "PPIs are often co-prescribed in the post-PCI period to reduce GI bleeding risk with dual antiplatelet therapy; this is additive to, not interactive with, bivalirudin&apos;s mechanism.",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function BivalirudinInteractionsPanel() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return INTERACTIONS.filter((e) => {
      const matchCat = activeCat === "All" || e.category === activeCat;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        e.name.toLowerCase().includes(q) ||
        e.aliases.some((a) => a.toLowerCase().includes(q)) ||
        e.summary.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
      );
    });
  }, [query, activeCat]);

  return (
    <div className="reta-interactions">
      <div className="reta-interactions__context">
        Bivalirudin&apos;s interactions are dominated by additive bleeding risk from other
        anticoagulants and antiplatelet agents &mdash; which are paradoxically required
        simultaneously in PCI. The clinical art is in managing that necessary combination with
        continuous monitoring. All other medications used in cardiac patients are unlikely to
        interact pharmacologically.
      </div>
      <div className="reta-interactions__controls">
        <input
          className="reta-interactions__search"
          placeholder="Search drug, supplement, or compound&hellip;"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="reta-interactions__cats">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`reta-interactions__cat${activeCat === cat ? " reta-interactions__cat--active" : ""}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="reta-interactions__list">
        {results.length === 0 ? (
          <div className="reta-interactions__empty">No interactions found for that search.</div>
        ) : (
          results.map((entry) => {
            const st = TIER_STYLE[entry.tier];
            return (
              <div
                key={entry.id}
                className="reta-interactions__entry"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <div className="reta-interactions__entry-top">
                  <div className="reta-interactions__entry-name">{entry.name}</div>
                  <div className="reta-interactions__entry-meta">
                    <span className="reta-interactions__entry-cat">{entry.category}</span>
                    <span
                      className="reta-interactions__entry-tier"
                      style={{ color: st.labelColor, borderColor: st.border }}
                    >
                      {st.label}
                    </span>
                  </div>
                </div>
                <div className="reta-interactions__entry-summary">{entry.summary}</div>
                <ul className="reta-interactions__entry-mit">
                  {entry.mitigation.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
