"use client";

/**
 * EptifibatideInteractionsPanel — interaction intelligence for eptifibatide.
 * Key frame: all interactions relate to bleeding amplification.
 * Never combine with other GPIIb/IIIa inhibitors.
 * Anticoagulants, other antiplatelet drugs, NSAIDs, SSRIs: additive bleeding.
 */

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
    id: "other-gpiibiia",
    name: "Other GPIIb/IIIa inhibitors (abciximab, tirofiban)",
    aliases: ["abciximab", "ReoPro", "tirofiban", "Aggrastat", "GPIIb/IIIa inhibitor", "glycoprotein IIb/IIIa"],
    category: "Antiplatelet Agents",
    tier: "flag",
    summary: "Absolutely contraindicated \u2014 combining two GPIIb/IIIa inhibitors produces additive receptor occupancy with no additional antithrombotic benefit and substantially increased bleeding risk. The mechanism of action is identical: blocking the same receptor twice does not double efficacy but does meaningfully increase the bleeding complication rate. There is no clinical scenario where concurrent use of two GPIIb/IIIa inhibitors is appropriate.",
    mitigation: [
      "Never combine eptifibatide with abciximab or tirofiban \u2014 this is an absolute contraindication",
      "If a patient is already on one GPIIb/IIIa inhibitor and a change is clinically needed, the first drug must be discontinued and adequate time allowed for reversal before the second is started",
      "Pharmacies and order entry systems in catheterization labs typically have hard alerts for concurrent GPIIb/IIIa inhibitor orders",
    ],
  },
  {
    id: "heparin-anticoagulants",
    name: "Heparin and other anticoagulants (bivalirudin, fondaparinux, enoxaparin)",
    aliases: ["heparin", "unfractionated heparin", "UFH", "bivalirudin", "Angiomax", "fondaparinux", "Arixtra", "enoxaparin", "Lovenox", "LMWH", "anticoagulant"],
    category: "Anticoagulants",
    tier: "flag",
    summary: "Concurrent anticoagulation with eptifibatide is standard practice in ACS/PCI \u2014 heparin or bivalirudin is routinely used alongside GPIIb/IIIa inhibitors. The combination is clinically necessary for adequate antithrombotic effect in ACS/PCI but produces additive bleeding risk compared to either alone. The ESPRIT and PURSUIT protocols used concurrent heparin. Careful heparin dose management (weight-based, with ACT monitoring in the cath lab) is essential to minimize excess anticoagulation.",
    mitigation: [
      "Concurrent heparin with eptifibatide is standard but requires careful dose management \u2014 lower heparin doses are typically used with GPIIb/IIIa inhibitors than without",
      "Activated clotting time (ACT) monitoring during PCI: target ACT 200\u2013250 seconds with GPIIb/IIIa inhibitor (vs 250\u2013300 without)",
      "Bivalirudin is an alternative to heparin with potentially lower overall bleeding risk when combined with eptifibatide; the combination remains more bleeding-prone than bivalirudin alone",
      "Remove femoral sheaths after heparin effect has waned (ACT <170\u2013180 seconds) to minimize access site bleeding",
    ],
  },
  {
    id: "aspirin-p2y12",
    name: "Aspirin and P2Y12 inhibitors (clopidogrel, ticagrelor, prasugrel)",
    aliases: ["aspirin", "clopidogrel", "Plavix", "ticagrelor", "Brilinta", "prasugrel", "Effient", "P2Y12 inhibitor", "antiplatelet", "dual antiplatelet therapy", "DAPT"],
    category: "Antiplatelet Agents",
    tier: "flag",
    summary: "Dual antiplatelet therapy (aspirin + P2Y12 inhibitor) is given concurrently with eptifibatide in ACS/PCI \u2014 triple antiplatelet therapy in effect (aspirin + P2Y12 + GPIIb/IIIa inhibitor). Each agent blocks a distinct platelet activation pathway, and bleeding risk is additive. Modern ACS protocols use potent P2Y12 inhibitors (ticagrelor, prasugrel) whose own antiplatelet efficacy has reduced the incremental benefit of adding GPIIb/IIIa inhibition except in specific high-risk PCI scenarios.",
    mitigation: [
      "Triple antiplatelet therapy in ACS/PCI is a deliberate clinical decision balancing ischemic benefit vs bleeding risk \u2014 not a casual combination",
      "Loading doses of P2Y12 inhibitors before PCI should be completed before GPIIb/IIIa initiation where possible",
      "Radial access for PCI (vs femoral) substantially reduces access site bleeding risk with any antiplatelet combination",
      "After eptifibatide is discontinued, standard DAPT (aspirin + P2Y12) continues per post-ACS or post-stent protocols",
    ],
  },
  {
    id: "nsaids",
    name: "NSAIDs (ibuprofen, naproxen, ketorolac, indomethacin)",
    aliases: ["NSAID", "ibuprofen", "Advil", "Motrin", "naproxen", "Aleve", "ketorolac", "Toradol", "indomethacin", "diclofenac", "celecoxib", "anti-inflammatory"],
    category: "Anti-inflammatory / Analgesics",
    tier: "watch",
    summary: "NSAIDs inhibit thromboxane A2-mediated platelet activation (same mechanism as low-dose aspirin, but less complete and reversible). Adding NSAID antiplatelet effect to eptifibatide\u2019s GPIIb/IIIa blockade produces additional antiplatelet burden. NSAIDs also cause GI mucosal injury, increasing GI bleeding risk. In the acute hospital setting during eptifibatide infusion, NSAIDs should be avoided \u2014 acetaminophen is the preferred analgesic.",
    mitigation: [
      "Avoid NSAIDs during eptifibatide infusion \u2014 use acetaminophen for pain management in the hospital setting",
      "If an NSAID was recently taken before eptifibatide initiation, notify the prescriber; the antiplatelet effect of ibuprofen/naproxen typically resolves within hours (unlike aspirin, which is irreversible)",
      "Ketorolac (IV NSAID) should specifically be avoided as a post-procedure analgesic in patients receiving eptifibatide",
    ],
  },
  {
    id: "ssri-snri",
    name: "SSRIs and SNRIs (sertraline, fluoxetine, duloxetine, venlafaxine)",
    aliases: ["SSRI", "SNRI", "sertraline", "Zoloft", "fluoxetine", "Prozac", "paroxetine", "Paxil", "escitalopram", "Lexapro", "duloxetine", "Cymbalta", "venlafaxine", "Effexor", "antidepressant"],
    category: "Psychiatric Medications",
    tier: "watch",
    summary: "SSRIs and SNRIs reduce platelet serotonin content by blocking the serotonin transporter (SERT) in platelets, which impairs serotonin-mediated platelet activation and release. The antiplatelet effect is modest compared to aspirin or P2Y12 inhibitors, but it adds to the antiplatelet burden of eptifibatide. SSRIs are associated with increased GI bleeding risk in general, and this risk is amplified with concurrent antiplatelet and anticoagulant use.",
    mitigation: [
      "SSRIs/SNRIs should be flagged on the medication list during hospitalization for ACS/PCI \u2014 they add to the overall antiplatelet burden",
      "Proton pump inhibitor (PPI) co-therapy reduces GI bleeding risk with SSRI + antiplatelet combinations",
      "SSRI/SNRI should not be discontinued acutely in the hospital setting for this reason alone \u2014 the incremental bleeding risk does not outweigh the risks of abrupt discontinuation; continued use with awareness and PPI protection is the standard approach",
    ],
  },
  {
    id: "cardiac-standard",
    name: "Standard cardiac medications without antiplatelet activity (beta-blockers, ACE inhibitors, statins)",
    aliases: ["beta-blocker", "metoprolol", "carvedilol", "lisinopril", "ACE inhibitor", "atorvastatin", "statin", "amlodipine", "nitrates", "nitroglycerin"],
    category: "Cardiovascular (Non-antiplatelet)",
    tier: "low",
    summary: "Standard ACS co-medications (beta-blockers, ACE inhibitors, ARBs, statins, nitrates) have no pharmacokinetic or pharmacodynamic interaction with eptifibatide\u2019s platelet GPIIb/IIIa mechanism. These drugs act through entirely different pathways and are standard of care in ACS regardless of which antiplatelet strategy is used. Eptifibatide is compatible with the full standard ACS medical regimen.",
    mitigation: [
      "No specific precautions for eptifibatide with standard cardiac medications",
      "Continue standard ACS co-medications (beta-blocker, statin, ACE inhibitor, nitrates) as clinically indicated alongside eptifibatide",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function EptifibatideInteractionsPanel() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return INTERACTIONS.filter((e) => {
      const matchCat = activeCat === "All" || e.category === activeCat;
      if (!matchCat) return false;
      if (!q) return true;
      return e.name.toLowerCase().includes(q) || e.aliases.some((a) => a.toLowerCase().includes(q)) || e.summary.toLowerCase().includes(q) || e.category.toLowerCase().includes(q);
    });
  }, [query, activeCat]);

  return (
    <div className="reta-interactions">
      <div className="reta-interactions__context">
        Every interaction with eptifibatide is about bleeding amplification. The mechanism is platelet GPIIb/IIIa blockade \u2014 anything else that impairs platelet function or coagulation adds to that effect. Other GPIIb/IIIa inhibitors are absolutely contraindicated. Anticoagulants, aspirin, and P2Y12 inhibitors are given concurrently in the clinical setting as a calculated combination with careful monitoring. NSAIDs and SSRIs add modest additional antiplatelet burden and GI bleeding risk.
      </div>
      <div className="reta-interactions__controls">
        <input
          className="reta-interactions__search"
          placeholder="Search drug, supplement, or compound\u2026"
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
              <div key={entry.id} className="reta-interactions__entry" style={{ background: st.bg, border: `1px solid ${st.border}` }}>
                <div className="reta-interactions__entry-top">
                  <div className="reta-interactions__entry-name">{entry.name}</div>
                  <div className="reta-interactions__entry-meta">
                    <span className="reta-interactions__entry-cat">{entry.category}</span>
                    <span className="reta-interactions__entry-tier" style={{ color: st.labelColor, borderColor: st.border }}>{st.label}</span>
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
