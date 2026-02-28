"use client";

/**
 * GonadorelinInteractionsPanel — interaction intelligence for Gonadorelin.
 * Key frame: interactions follow from downstream sex steroid effects.
 * GnRH agonists are the primary conflict (same receptor, opposite goal).
 * TRT context creates the most complex interaction landscape.
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
    id: "gnrh-agonists",
    name: "GnRH agonists — leuprolide, triptorelin, nafarelin, buserelin, histrelin",
    aliases: ["leuprolide", "Lupron", "triptorelin", "Decapeptyl", "nafarelin", "Synarel", "buserelin", "histrelin", "Vantas", "GnRH agonist", "LHRH agonist"],
    category: "Medications",
    tier: "flag",
    summary: "Direct mechanistic conflict — GnRH agonists continuously stimulate the GnRH receptor to cause desensitization and axis suppression. Gonadorelin targets the same receptor for pulsatile stimulation. Using gonadorelin while on a long-acting GnRH agonist is mechanistically futile: the receptor is occupied and being continuously desensitized; additional short-acting gonadorelin pulses cannot overcome continuous agonist receptor occupation.",
    mitigation: [
      "On leuprolide or other long-acting GnRH agonists for prostate cancer, endometriosis, or precocious puberty: gonadorelin is contraindicated — the receptor is being suppressed, not stimulated",
      "Gonadorelin is not a reversal agent for GnRH agonist therapy — the suppression is at the receptor level and requires the agonist to clear before the receptor recovers",
    ],
  },
  {
    id: "exogenous-testosterone",
    name: "Exogenous testosterone (TRT)",
    aliases: ["testosterone", "TRT", "testosterone cypionate", "testosterone enanthate", "testosterone propionate", "testosterone gel", "Androgel"],
    category: "Medications",
    tier: "watch",
    summary: "The primary intended combination — gonadorelin as TRT adjunct. Exogenous testosterone suppresses the HPG axis; gonadorelin partially counteracts this suppression at the pituitary level. The combination is the clinical rationale for gonadorelin in TRT protocols. The interaction is intentional. The monitoring requirement: confirm that gonadorelin is producing LH/FSH response and not causing receptor desensitization under the TRT-suppressed axis environment.",
    mitigation: [
      "This is the primary intended combination — gonadorelin as TRT adjunct for testicular preservation",
      "Monitor LH 30-60 minutes post-injection to confirm pituitary is responding — TRT suppression may blunt gonadorelin effectiveness",
      "Maintain standard twice-daily dosing; do not increase frequency to compensate for TRT suppression — this risks receptor desensitization",
    ],
  },
  {
    id: "serms",
    name: "SERMs — clomiphene, enclomiphene, tamoxifen",
    aliases: ["clomiphene", "clomid", "enclomiphene", "tamoxifen", "Nolvadex", "SERM"],
    category: "Medications",
    tier: "watch",
    summary: "Mechanistically adjacent — SERMs block estrogen's negative feedback at the hypothalamus and pituitary, producing additive LH/FSH stimulation. Combined with gonadorelin's direct GnRH receptor stimulation, the combination produces two independent axis stimulation mechanisms simultaneously. Often used together in post-TRT axis recovery protocols. The combined LH stimulation may be more than necessary for some users.",
    mitigation: [
      "The gonadorelin + SERM combination is mechanistically additive — monitor LH and testosterone to confirm physiological (not supraphysiological) response",
      "This combination is used in post-TRT PCT protocols; the two mechanisms are complementary but the combined effect warrants monitoring",
    ],
  },
  {
    id: "aromatase-inhibitors",
    name: "Aromatase inhibitors (anastrozole, letrozole, exemestane)",
    aliases: ["anastrozole", "Arimidex", "letrozole", "Femara", "exemestane", "Aromasin", "aromatase inhibitor", "AI"],
    category: "Medications",
    tier: "watch",
    summary: "Reducing estrogen removes negative feedback, amplifying HPG axis activity. Combined with gonadorelin's direct pituitary stimulation, aromatase inhibitors can produce elevated LH and testosterone above the intended target. Used in some TRT protocols to manage estrogen — the combination requires hormone monitoring to avoid excess axis stimulation.",
    mitigation: [
      "Aromatase inhibitors + gonadorelin: monitor estradiol and testosterone together — reducing estrogen too far removes normal feedback and can cause testosterone to rise unpredictably",
      "Females on AIs for ER-positive breast cancer: gonadorelin is contraindicated regardless of AI use",
    ],
  },
  {
    id: "hcg",
    name: "hCG (human chorionic gonadotropin)",
    aliases: ["hCG", "human chorionic gonadotropin", "Pregnyl", "Novarel"],
    category: "Medications",
    tier: "watch",
    summary: "Mechanistically adjacent but distinct — hCG mimics LH at the Leydig cell (bypassing the pituitary); gonadorelin stimulates the pituitary to produce LH. Combined use creates two LH-like signals reaching the Leydig cell: one from hCG directly, one from gonadorelin-stimulated LH. The combination is sometimes used when gonadorelin alone is insufficient for testicular preservation. The additive Leydig cell stimulation is generally tolerated but warrants monitoring.",
    mitigation: [
      "The gonadorelin + hCG combination provides dual LH-pathway stimulation at different levels — generally well-tolerated but monitor testosterone to avoid excessive stimulation",
      "If hCG is available through legitimate channels (not compounded), some clinicians prefer hCG + FSH supplementation over gonadorelin alone for fertility preservation during TRT",
    ],
  },
  {
    id: "opioids",
    name: "Chronic opioids — causing opioid-induced androgen deficiency (OPIAD)",
    aliases: ["opioid", "oxycodone", "hydrocodone", "morphine", "fentanyl", "methadone", "buprenorphine", "OPIAD", "opioid-induced hypogonadism"],
    category: "Medications",
    tier: "watch",
    summary: "Opioids suppress the HPG axis through mu-opioid receptor effects on hypothalamic GnRH neurons. Gonadorelin acts at the pituitary (downstream of the hypothalamus) — it may partially bypass opioid-induced hypothalamic suppression by directly stimulating pituitary GnRH receptors. Whether gonadorelin adequately overcomes opioid-induced axis suppression is not well-characterized.",
    mitigation: [
      "Chronic opioid-induced hypogonadism: gonadorelin may be more effective than kisspeptin since it acts downstream of the opioid-suppressed hypothalamic GnRH neurons",
      "Discuss opioid-induced hypogonadism management with the prescribing physician — optimizing opioid therapy is the primary intervention; axis stimulants are adjuncts",
    ],
  },
  {
    id: "kisspeptin",
    name: "Kisspeptin",
    aliases: ["kisspeptin", "KP-10", "KP-54", "kisspeptin-10", "kisspeptin-54"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "Kisspeptin acts upstream of gonadorelin (hypothalamus → GnRH → pituitary). Combining both provides stimulation at two levels of the axis. The combination is mechanistically rational for post-TRT recovery — kisspeptin restores hypothalamic GnRH pulsatility; gonadorelin directly stimulates the pituitary. The combined effect on LH/FSH may exceed what either alone provides. Monitoring is required to confirm stimulation rather than desensitization.",
    mitigation: [
      "The kisspeptin + gonadorelin combination provides dual-level axis stimulation — both require pulsatile administration; avoid over-frequent dosing of either",
      "Monitor LH and testosterone to confirm additive stimulation, not paradoxical suppression from receptor overload at either level",
    ],
  },
  {
    id: "vitamin-d-zinc",
    name: "Vitamin D and zinc",
    aliases: ["vitamin D", "D3", "cholecalciferol", "zinc", "zinc supplement"],
    category: "Supplements",
    tier: "low",
    summary: "Vitamin D and zinc support HPG axis function — vitamin D has receptors in hypothalamic and gonadal tissue; zinc is required for steroidogenesis. No direct pharmacological interaction with gonadorelin. Addressing nutritional deficiencies supports the axis that gonadorelin is stimulating.",
    mitigation: [
      "No adverse interaction with gonadorelin",
      "Adequate vitamin D and zinc support optimal axis responsiveness to gonadorelin stimulation",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function GonadorelinInteractionsPanel() {
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
        Gonadorelin&apos;s interaction profile is shaped by its role in the HPG axis. Long-acting GnRH agonists (leuprolide, triptorelin) are a hard stop — same receptor, opposite intent. TRT is the primary intended combination context. SERMs, aromatase inhibitors, and hCG all interact at adjacent points of the same axis and require hormone monitoring when combined.
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
