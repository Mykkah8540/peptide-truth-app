"use client";

/**
 * KisspeptinInteractionsPanel — interaction intelligence for Kisspeptin.
 * Key frame: interactions follow from the downstream sex steroid effects.
 * Exogenous testosterone is the most important (mechanistic conflict).
 * Estrogen-modulating drugs and sex steroid-sensitive drugs warrant attention.
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
    id: "exogenous-testosterone",
    name: "Exogenous testosterone (TRT — testosterone cypionate, enanthate, propionate, gel, patch)",
    aliases: ["testosterone", "TRT", "testosterone cypionate", "testosterone enanthate", "testosterone propionate", "testosterone gel", "Androgel", "Testogel", "Aveed"],
    category: "Medications",
    tier: "flag",
    summary: "Mechanistic conflict — exogenous testosterone suppresses the very HPG axis that kisspeptin is meant to stimulate. Exogenous testosterone provides strong negative feedback at the hypothalamic kisspeptin neuron level, reducing endogenous GnRH pulsatility. Using kisspeptin while actively on TRT is working against the TRT-induced suppression, not with it. The axis cannot be optimized from above (kisspeptin) while it is simultaneously suppressed from below (exogenous testosterone). Post-TRT kisspeptin use (after stopping TRT) is mechanistically rational — concurrent use is mechanistically conflicted.",
    mitigation: [
      "Do not use kisspeptin concurrently with active TRT as a testosterone optimization strategy — the exogenous testosterone is suppressing the axis that kisspeptin is trying to stimulate",
      "Post-TRT axis recovery: stop TRT first, allow initial washout, then consider kisspeptin as a potential axis recovery tool — concurrent use does not achieve axis recovery",
      "If testosterone is being maintained by exogenous administration, kisspeptin is not the appropriate tool — the axis is suppressed by design",
    ],
  },
  {
    id: "gnrh-agonists-antagonists",
    name: "GnRH agonists and antagonists (leuprolide, triptorelin, degarelix, cetrorelix)",
    aliases: ["leuprolide", "Lupron", "triptorelin", "Decapeptyl", "degarelix", "Firmagon", "cetrorelix", "Cetrotide", "GnRH agonist", "GnRH antagonist"],
    category: "Medications",
    tier: "flag",
    summary: "Direct mechanistic conflict — GnRH agonists suppress the axis by continuous stimulation (the same desensitization mechanism that too-frequent kisspeptin use creates); GnRH antagonists block the GnRH receptor directly. Kisspeptin acts upstream of GnRH. Using kisspeptin while on a GnRH agonist or antagonist is mechanistically futile — the axis is suppressed downstream from where kisspeptin acts.",
    mitigation: [
      "On GnRH agonists (leuprolide, triptorelin) for prostate cancer, endometriosis, or precocious puberty: kisspeptin is contraindicated — the GnRH receptor is being continuously stimulated to desensitize; adding kisspeptin has no meaningful effect and is mechanistically inappropriate",
      "On GnRH antagonists: the GnRH receptor is blocked downstream of kisspeptin's action; kisspeptin cannot produce LH release in this context",
    ],
  },
  {
    id: "aromatase-inhibitors",
    name: "Aromatase inhibitors (anastrozole, letrozole, exemestane)",
    aliases: ["anastrozole", "Arimidex", "letrozole", "Femara", "exemestane", "Aromasin", "aromatase inhibitor", "AI"],
    category: "Medications",
    tier: "watch",
    summary: "Mechanistically interacting. Aromatase inhibitors reduce estrogen by blocking the conversion of testosterone to estradiol. Reduced estrogen removes negative feedback from the HPG axis, potentially increasing GnRH/LH/FSH pulsatility. Combining kisspeptin with an aromatase inhibitor could produce amplified LH and testosterone elevation — the effects are potentially additive. For males using both: combined axis stimulation may push LH higher than intended, with unpredictable downstream effects on testosterone and estrogen balance.",
    mitigation: [
      "The combination of kisspeptin + aromatase inhibitor produces additive HPG axis stimulation — monitor LH, testosterone, and estradiol levels carefully",
      "Females on aromatase inhibitors for ER-positive breast cancer: do not use kisspeptin — kisspeptin drives estrogen production and the aromatase inhibitor is reducing it for cancer treatment",
    ],
  },
  {
    id: "serms",
    name: "SERMs — clomiphene, enclomiphene, tamoxifen",
    aliases: ["clomiphene", "clomid", "enclomiphene", "tamoxifen", "Nolvadex", "SERM", "selective estrogen receptor modulator"],
    category: "Medications",
    tier: "watch",
    summary: "Mechanistically overlapping — SERMs block estrogen's negative feedback at the hypothalamus and pituitary, producing the same downstream effect as endogenous axis stimulation (raising LH/FSH → testosterone). Kisspeptin stimulates the axis from upstream. The combination of SERM + kisspeptin produces additive LH stimulation through different mechanisms — potentially excessively elevating LH and testosterone above physiological normal.",
    mitigation: [
      "The SERM + kisspeptin combination is used in some community post-TRT protocols — be aware that this creates additive axis stimulation",
      "Monitor LH and testosterone to ensure values are in physiological range, not supraphysiological — the combination can push LH to levels that may cause other effects (bone density, prostate effects)",
      "Females on tamoxifen for breast cancer treatment: do not add kisspeptin — the estrogen manipulation creates complex hormone environment not appropriate for additional axis stimulation",
    ],
  },
  {
    id: "opioids",
    name: "Opioids — chronic opioid use causing hypogonadism (opioid-induced androgen deficiency)",
    aliases: ["opioid", "oxycodone", "hydrocodone", "morphine", "fentanyl", "methadone", "buprenorphine", "opioid-induced hypogonadism"],
    category: "Medications",
    tier: "watch",
    summary: "Opioids suppress the HPG axis through mu-opioid receptor activation on KNDy neurons — specifically, dynorphin (one component of KNDy neurons) mediates the opioid-induced suppression of kisspeptin release. Chronic opioid use causes opioid-induced androgen deficiency (OPIAD). Kisspeptin targets the same neurons that opioids suppress. Whether exogenous kisspeptin can overcome opioid-induced KNDy neuron suppression is not established — the opioid-induced signaling may reduce kisspeptin's effectiveness.",
    mitigation: [
      "Chronic opioid use causes axis suppression that kisspeptin may not fully overcome — this is an understudied interaction",
      "Opioid-induced hypogonadism (OPIAD): discuss with the prescribing physician; the management is typically optimizing or replacing opioid therapy, not adding axis stimulants",
    ],
  },
  {
    id: "gonadorelin",
    name: "Gonadorelin (GnRH, pulsatile)",
    aliases: ["gonadorelin", "GnRH", "gonadotropin-releasing hormone", "Factrel", "pulsatile GnRH"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "Mechanistically adjacent — gonadorelin acts one step downstream of kisspeptin (GnRH receptor, not GPR54). Both require pulsatile administration to maintain axis stimulation. The combination is sometimes used in community post-TRT protocols. Additive LH stimulation is the intended effect. Excessive combined dosing frequency risks desensitization at the GnRH receptor level (gonadorelin) or GPR54 level (kisspeptin).",
    mitigation: [
      "The kisspeptin + gonadorelin combination amplifies HPG axis stimulation — both compounds require pulsatile administration; using both daily is likely producing desensitization",
      "Monitor LH and testosterone to confirm the axis is stimulated, not suppressed",
    ],
  },
  {
    id: "hcg",
    name: "hCG (human chorionic gonadotropin)",
    aliases: ["hCG", "human chorionic gonadotropin", "Pregnyl", "Novarel", "Ovidrel"],
    category: "Medications",
    tier: "watch",
    summary: "hCG mimics LH at the Leydig cell — it acts downstream of kisspeptin's mechanism. hCG is commonly used in TRT protocols to maintain testicular function and testosterone production alongside exogenous testosterone. Using kisspeptin alongside hCG creates two LH-like stimulation pathways — one at the testis level (hCG) and one at the hypothalamic level (kisspeptin). The combined effect on Leydig cells is not characterized.",
    mitigation: [
      "hCG in TRT protocol + kisspeptin: understand that hCG bypasses the axis that kisspeptin is targeting; they act at different levels",
      "If the goal is axis recovery, hCG maintains testicular function but does not restore the HPG axis; kisspeptin addresses the hypothalamic component",
    ],
  },
  {
    id: "vitamin-d-zinc",
    name: "Vitamin D and zinc — testosterone-supporting nutritional factors",
    aliases: ["vitamin D", "vitamin D3", "cholecalciferol", "zinc", "zinc supplement"],
    category: "Supplements",
    tier: "low",
    summary: "Vitamin D and zinc both support HPG axis function — vitamin D has receptors in hypothalamic and gonadal tissue; zinc deficiency impairs testosterone synthesis. These nutritional factors support the axis that kisspeptin is targeting. No direct pharmacological interaction.",
    mitigation: [
      "No adverse interaction between vitamin D/zinc supplementation and kisspeptin",
      "Adequate vitamin D and zinc are nutritional prerequisites for optimal HPG axis function — addressing deficiencies before or alongside kisspeptin use is rational",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function KisspeptinInteractionsPanel() {
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

      {/* ── Context note ── */}
      <div className="reta-interactions__context">
        Kisspeptin&apos;s interactions follow from its mechanism: it stimulates sex steroid production. Anything that uses, requires, or is disrupted by sex steroid changes is a potential interaction. Exogenous testosterone (mechanistic conflict) and GnRH agonists (downstream suppression) are hard stops. SERMs, aromatase inhibitors, and hCG all operate at adjacent points of the same axis — combining these with kisspeptin amplifies axis stimulation in ways that require hormone monitoring.
      </div>

      {/* ── Search + filter ── */}
      <div className="reta-interactions__controls">
        <input
          className="reta-interactions__search"
          placeholder="Search drug, supplement, or compound…"
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

      {/* ── Results ── */}
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
