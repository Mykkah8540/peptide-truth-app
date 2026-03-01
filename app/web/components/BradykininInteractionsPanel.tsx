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
    id: "ace-inhibitors",
    name: "ACE Inhibitors",
    aliases: ["enalapril", "lisinopril", "ramipril", "benazepril", "captopril", "perindopril", "quinapril"],
    category: "Cardiovascular",
    tier: "flag",
    summary:
      "ACE inhibitors block kininase II (ACE), the enzyme responsible for bradykinin degradation. This causes " +
      "bradykinin to accumulate in tissues, producing B2-receptor-mediated vasodilation and increased vascular " +
      "permeability. The result can be angioedema \u2014 swelling of the face, tongue, or larynx \u2014 which " +
      "is life-threatening if the airway is involved. This is a class-effect of all ACE inhibitors.",
    mitigation: [
      "Angioedema on an ACE inhibitor is a contraindication to all ACE inhibitors \u2014 switch permanently to an ARB",
      "Laryngeal or tongue angioedema requires emergency airway management; call 911 immediately",
      "Icatibant (Firazyr) can reverse ACE inhibitor\u2013induced angioedema by blocking B2 receptors",
      "ARBs (losartan, valsartan) do not inhibit bradykinin metabolism and are the safe alternative",
    ],
  },
  {
    id: "arbs",
    name: "ARBs (Angiotensin Receptor Blockers)",
    aliases: ["losartan", "valsartan", "irbesartan", "olmesartan", "telmisartan", "candesartan"],
    category: "Cardiovascular",
    tier: "watch",
    summary:
      "ARBs block angiotensin II at the AT1 receptor and do NOT inhibit bradykinin metabolism. They are " +
      "the recommended switch for patients who develop angioedema on ACE inhibitors. Angioedema risk with ARBs " +
      "is substantially lower (estimated 10-fold lower), though rare cases have been reported, likely due to " +
      "separate mechanisms. Worth understanding the distinction \u2014 not all \u201cblood pressure meds\u201d " +
      "carry the same bradykinin interaction.",
    mitigation: [
      "ARBs are the standard replacement for ACE inhibitors in angioedema-prone patients",
      "Rare ARB angioedema cases exist; monitor newly switched patients for 4\u20138 weeks",
      "Cross-reactivity between ACE inhibitor and ARB angioedema is uncommon but documented",
    ],
  },
  {
    id: "nsaids",
    name: "NSAIDs",
    aliases: ["ibuprofen", "naproxen", "aspirin", "diclofenac", "celecoxib", "indomethacin"],
    category: "Anti-inflammatory / Pain",
    tier: "watch",
    summary:
      "Bradykinin sensitizes peripheral pain receptors (nociceptors) through B2 receptor activation and " +
      "downstream prostaglandin production via COX pathways. NSAIDs reduce this sensitization by inhibiting " +
      "COX-1 and COX-2. This means NSAIDs and bradykinin signaling are mechanistically intertwined \u2014 " +
      "NSAIDs attenuate bradykinin-induced pain sensitization, which is relevant in inflammatory states " +
      "and postoperative pain models.",
    mitigation: [
      "No acute interaction risk \u2014 this is a pharmacodynamic intersection, not a drug\u2013drug safety issue",
      "Relevant context for understanding why NSAIDs reduce inflammatory pain (bradykinin is a key sensitizer)",
      "In HAE: NSAIDs do not treat bradykinin-mediated angioedema and should not be substituted for targeted therapy",
    ],
  },
  {
    id: "supplements",
    name: "Standard supplements",
    aliases: ["vitamin D", "magnesium", "zinc", "fish oil", "omega-3"],
    category: "Supplements",
    tier: "low",
    summary:
      "No clinically relevant interactions between standard supplements and the bradykinin system are " +
      "established. Fish oil and omega-3 fatty acids have mild anti-inflammatory effects but do not " +
      "meaningfully alter bradykinin synthesis, degradation, or receptor sensitivity at typical supplement doses.",
    mitigation: [
      "No action needed \u2014 standard supplement use is unrelated to bradykinin pharmacology",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag: {
    bg: "rgba(158,56,0,0.07)",
    border: "rgba(158,56,0,0.20)",
    dot: "#9e3800",
    label: "Stop signal",
    labelColor: "#9e3800",
  },
  watch: {
    bg: "rgba(124,82,0,0.06)",
    border: "rgba(124,82,0,0.17)",
    dot: "#7c5200",
    label: "Worth watching",
    labelColor: "#7c5200",
  },
  low: {
    bg: "rgba(21,100,58,0.05)",
    border: "rgba(21,100,58,0.13)",
    dot: "#155e38",
    label: "Low concern",
    labelColor: "#155e38",
  },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function BradykininInteractionsPanel() {
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
        Bradykinin is not used as an injected compound. Interactions here describe how drugs that affect the
        bradykinin system \u2014 especially ACE inhibitors \u2014 interact with bradykinin physiology, and why
        that matters clinically.
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
