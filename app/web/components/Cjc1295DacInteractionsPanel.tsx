"use client";

/**
 * Cjc1295DacInteractionsPanel — interaction intelligence for CJC-1295 with DAC.
 * Key frame: same interaction classes as CJC-1295 no-DAC but amplified by continuous
 * elevated IGF-1 and the 8-day half-life. Active cancer therapy is the hardest stop.
 * Insulin/diabetes medications require physician oversight due to continuous counter-
 * regulatory GH. Corticosteroids and thyroid medications have complex GH axis interactions.
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
    id: "cancer-therapy",
    name: "Active cancer therapy — chemotherapy, anti-hormonal therapy, GH/IGF-1-sensitive regimens",
    aliases: ["cancer", "chemotherapy", "tamoxifen", "aromatase inhibitor", "letrozole", "anastrozole", "anti-estrogen", "prostate cancer", "hormone therapy", "oncology", "IGF-1 sensitivity", "tumor"],
    category: "Medications",
    tier: "flag",
    summary: "CJC-1295 DAC produces continuous IGF-1 elevation for the duration of weekly dosing — at steady state, IGF-1 is never allowed to return to baseline. Many cancer types express IGF-1 receptor (IGF-1R) and are sensitive to IGF-1 as a proliferative signal: breast cancer (particularly ER+), prostate cancer, colorectal cancer, and many others. Anti-hormonal cancer therapies (tamoxifen, aromatase inhibitors) specifically target hormone-driven cancer growth — adding a continuous IGF-1 elevation through GH stimulation creates an alternative proliferative pathway that can undermine anti-hormonal therapy. The continuous elevation profile of DAC makes this more concerning than pulsatile GHRH analogs.",
    mitigation: [
      "Active cancer treatment of any kind: CJC-1295 DAC is absolutely contraindicated — disclose all GH axis peptide use to your oncologist immediately",
      "On anti-hormonal therapy (tamoxifen, letrozole, anastrozole, enzalutamide): continuous IGF-1 from DAC can provide alternative proliferative signaling; discuss with oncologist",
      "Post-cancer surveillance period: avoid continuous IGF-1-elevating compounds; if GH axis compounds are being considered, shorter-acting pulsatile options require oncology discussion first",
    ],
  },
  {
    id: "insulin-diabetes",
    name: "Insulin and diabetes medications — insulin, metformin, sulfonylureas, GLP-1 agonists",
    aliases: ["insulin", "metformin", "Glucophage", "sulfonylurea", "glipizide", "glyburide", "GLP-1", "semaglutide", "Ozempic", "liraglutide", "Victoza", "diabetes", "blood sugar", "hypoglycemic"],
    category: "Medications",
    tier: "watch",
    summary: "CJC-1295 DAC's continuous GH elevation creates sustained insulin counter-regulation — GH promotes hepatic glucose production, reduces peripheral glucose uptake, and progressively impairs insulin sensitivity. This is amplified versus pulsatile GHRH analogs because the counter-regulatory effect is continuous rather than transient. In individuals on insulin or glucose-lowering medications, the sustained GH counter-regulation can: (1) increase insulin requirements substantially; (2) make glucose management less predictable; (3) potentially reduce the efficacy of metformin's insulin-sensitizing mechanism. The interaction is not acute and immediate — it builds progressively as DAC accumulates to steady state over weeks.",
    mitigation: [
      "On insulin: do not start CJC-1295 DAC without endocrinologist consultation — insulin requirements may need significant adjustment as steady-state GH elevation develops",
      "On metformin or other insulin sensitizers: GH counter-regulation progressively opposes insulin sensitization; fasting glucose and A1c monitoring every 4-8 weeks during dose titration",
      "On GLP-1 agonists: GLP-1 agonists suppress GH and IGF-1 (a pharmacological effect); CJC-1295 DAC directly opposes this — the combined GH axis effects are complex",
      "Continuous glucose monitoring (CGM) is strongly recommended for any diabetic or pre-diabetic using CJC-1295 DAC",
    ],
  },
  {
    id: "corticosteroids",
    name: "Corticosteroids — prednisone, dexamethasone, hydrocortisone, methylprednisolone",
    aliases: ["prednisone", "dexamethasone", "hydrocortisone", "methylprednisolone", "Medrol", "cortisone", "corticosteroid", "steroid", "Decadron", "inflammatory bowel", "asthma", "autoimmune"],
    category: "Medications",
    tier: "watch",
    summary: "Corticosteroids suppress the GH axis at multiple levels — they reduce GHRH release, impair GH receptor signaling, and suppress IGF-1 production. Exogenous corticosteroid use (particularly at pharmacological doses — prednisone >5 mg/day equivalents) can substantially blunt the GH/IGF-1 response to CJC-1295 DAC, making the compound less effective. Conversely, abrupt corticosteroid withdrawal in a patient on stable CJC-1295 DAC could unmask GH/IGF-1 responses that were previously suppressed. Additionally, both corticosteroids and GH excess elevate blood glucose — the combination compounds glucose management challenges.",
    mitigation: [
      "On long-term corticosteroid therapy: CJC-1295 DAC's efficacy may be substantially blunted — assess IGF-1 levels to determine if meaningful GH response is occurring",
      "Monitor glucose carefully: corticosteroids + GH excess from CJC-1295 DAC are additive in causing hyperglycemia; this combination requires close glucose surveillance",
      "If tapering corticosteroids while on DAC: GH/IGF-1 response may increase as the corticosteroid suppression is removed — reassess dosing with endocrinology",
    ],
  },
  {
    id: "thyroid-medications",
    name: "Thyroid medications — levothyroxine, liothyronine (T3), methimazole",
    aliases: ["levothyroxine", "Synthroid", "liothyronine", "Cytomel", "T3", "T4", "thyroid", "hypothyroid", "methimazole", "hyperthyroid"],
    category: "Medications",
    tier: "watch",
    summary: "GH and thyroid hormones have bidirectional interactions. GH increases peripheral conversion of T4 to T3 (via deiodinase activity), which can increase T3 levels and change thyroid hormone requirements. Hypothyroid patients on levothyroxine may need dose adjustments as GH-stimulated T4-to-T3 conversion alters thyroid hormone dynamics. Conversely, thyroid hormone status significantly affects GH axis responsiveness — hypothyroidism blunts IGF-1 production and may reduce the efficacy of CJC-1295 DAC. Uncontrolled hyperthyroidism elevates GH secretion independently and can compound DAC's effects.",
    mitigation: [
      "On levothyroxine for hypothyroidism: monitor TSH and free T3/T4 levels 6-8 weeks after starting CJC-1295 DAC — GH-mediated T4→T3 conversion may shift thyroid hormone balance",
      "Thyroid function should be optimized before starting CJC-1295 DAC — untreated hypothyroidism blunts the IGF-1 response and makes the compound less effective",
      "Disclose CJC-1295 DAC use to the prescribing endocrinologist managing thyroid disease",
    ],
  },
  {
    id: "ipamorelin-ghrp",
    name: "GHRPs and ghrelin analogs — ipamorelin, GHRP-6, GHRP-2, hexarelin",
    aliases: ["ipamorelin", "GHRP-6", "GHRP-2", "hexarelin", "ghrelin", "GHRP", "growth hormone releasing peptide", "GHS"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "CJC-1295 DAC combined with a GHRP (particularly ipamorelin) is one of the most common community GH axis stacks. The combination targets two different mechanisms of GH secretion: GHRH receptor activation (CJC-1295 DAC) + ghrelin receptor activation (ipamorelin/GHRP). This combination is synergistic in GH release — the combination produces greater GH responses than either compound alone. With CJC-1295 DAC's continuous IGF-1 elevation as the base, adding a GHRP for pulsatile GH spikes creates a complex GH pattern with continuously elevated IGF-1 background plus intermittent acute GH pulses. This amplifies all DAC-associated side effects and the cancer contraindication.",
    mitigation: [
      "The DAC + ipamorelin stack is widely used — but understand that DAC provides the continuous IGF-1 elevation that ipamorelin does not substantially affect between injections",
      "Cancer contraindication: the combination amplifies both continuous (DAC) and acute (GHRP) GH/IGF-1 stimulation — the cancer hard stop is stronger in combination",
      "Glucose monitoring: the combined GH elevation from GHRH + GHRP is substantially higher than either alone; glucose monitoring is essential",
      "Start DAC alone first, characterize your steady-state IGF-1 response, then add ipamorelin — do not start both simultaneously if you want to understand individual compound effects",
    ],
  },
  {
    id: "anabolic-steroids-sarms",
    name: "Anabolic steroids and SARMs — testosterone, nandrolone, SARMs",
    aliases: ["testosterone", "anabolic steroid", "SARM", "RAD-140", "LGD-4033", "MK-2866", "ostarine", "nandrolone", "Deca", "trenbolone", "primobolan", "oxandrolone", "Anavar"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "Anabolic steroids and SARMs are often combined with GH axis compounds in community use. Testosterone and other androgens increase IGF-1 production through hepatic effects — combining with CJC-1295 DAC's GH-stimulated IGF-1 creates additive IGF-1 elevation. The combination can amplify anabolic effects but also amplifies the risks: glucose dysregulation from combined GH + androgen effects, cardiovascular effects (left ventricular hypertrophy from combined GH + androgen), and the mitogenic IGF-1 concerns are compounded. The continuous IGF-1 from DAC combined with androgen-driven IGF-1 creates higher sustained IGF-1 levels than either alone.",
    mitigation: [
      "Cancer history: combining GH axis peptides with androgens in any cancer-relevant context is doubly contraindicated",
      "Cardiovascular monitoring: combined GH excess + androgen use requires more careful cardiovascular surveillance (echocardiogram, lipid panel) than either alone",
      "Glucose management: androgens can improve insulin sensitivity while GH reduces it — the net glucose effect of the combination requires monitoring, not assumption",
      "Physician oversight is strongly recommended for any GH axis + anabolic steroid combination protocol",
    ],
  },
  {
    id: "standard-supplements",
    name: "Standard supplements — vitamins, minerals, protein, creatine",
    aliases: ["vitamin", "mineral", "protein powder", "creatine", "magnesium", "zinc", "omega-3", "vitamin D", "multivitamin"],
    category: "Supplements",
    tier: "low",
    summary: "No meaningful adverse interactions between CJC-1295 DAC and standard supplements are anticipated. Standard nutritional supplements do not directly affect the GH/IGF-1 axis in ways that would interact with CJC-1295 DAC's mechanism. Creatine and protein are commonly combined with GH axis compounds — no pharmacological conflict.",
    mitigation: [
      "No adverse interaction between CJC-1295 DAC and standard supplement regimens",
      "Protein and creatine supplementation are compatible and complementary to GH axis compounds in an anabolic support context",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function Cjc1295DacInteractionsPanel() {
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
        CJC-1295 DAC shares the same interaction categories as no-DAC CJC-1295 — but the 8-day half-life and continuous IGF-1 elevation amplify every interaction. Active cancer therapy is a hard stop due to continuous IGF-1 stimulation. Insulin and diabetes medications require physician oversight — GH counter-regulation builds progressively to steady state over weeks. Corticosteroids and thyroid medications have bidirectional GH axis interactions. The popular ipamorelin + DAC stack compounds both GH effects and the cancer contraindication.
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
