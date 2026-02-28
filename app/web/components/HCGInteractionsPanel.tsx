"use client";

/**
 * HCGInteractionsPanel — interaction intelligence for hCG.
 * Key frame: exogenous testosterone is the primary combination context;
 * aromatase inhibitors are frequently co-prescribed; GnRH agonists are
 * a mechanistic conflict.
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
    name: "GnRH agonists (leuprolide, triptorelin) — for prostate cancer or endometriosis",
    aliases: ["leuprolide", "Lupron", "triptorelin", "Decapeptyl", "GnRH agonist", "LHRH agonist"],
    category: "Medications",
    tier: "flag",
    summary: "GnRH agonists cause pituitary desensitization and LH/FSH suppression — used medically to reduce testosterone to castrate levels for prostate cancer or to suppress estrogen for endometriosis. The purpose is sex steroid suppression. hCG directly stimulates Leydig cell testosterone production, working against this suppression. Using hCG in prostate cancer management to 'maintain testicular function' is mechanistically contraindicated — it defeats the purpose of the GnRH agonist therapy.",
    mitigation: [
      "On GnRH agonist for prostate cancer: hCG is contraindicated — the treatment goal is testosterone suppression",
      "On GnRH agonist for endometriosis or other indications: discuss with prescribing physician before considering hCG",
    ],
  },
  {
    id: "exogenous-testosterone",
    name: "Exogenous testosterone (TRT)",
    aliases: ["testosterone", "TRT", "testosterone cypionate", "testosterone enanthate", "Androgel", "testosterone gel"],
    category: "Medications",
    tier: "watch",
    summary: "The primary intended combination. Exogenous testosterone suppresses LH via feedback; hCG provides LH-like stimulation to bypass this suppression and maintain Leydig cell function. The combination is the standard clinical approach for testicular preservation during TRT. The interaction is intentional — the monitoring requirement is estradiol (hCG-stimulated testosterone aromatizes significantly, often requiring aromatase inhibitor management).",
    mitigation: [
      "This is the primary intended combination — monitor estradiol, not just total testosterone",
      "Target estradiol 20-40 pg/mL; significant elevation warrants aromatase inhibitor discussion with physician",
      "Monitor testicular volume and semen parameters if fertility is a goal",
      "hCG dose should be established with physician: typical range 250-500 IU every other day or 500-1000 IU twice weekly",
    ],
  },
  {
    id: "aromatase-inhibitors",
    name: "Aromatase inhibitors (anastrozole, letrozole, exemestane)",
    aliases: ["anastrozole", "Arimidex", "letrozole", "Femara", "exemestane", "Aromasin", "AI"],
    category: "Medications",
    tier: "watch",
    summary: "Aromatase inhibitors are frequently co-prescribed with hCG (and TRT) to manage hCG-stimulated estradiol elevation. hCG causes significant testosterone production; aromatase converts testosterone to estradiol; aromatase inhibitors block this conversion. The combination is clinically common and intended. The risk: overcorrection — suppressing estradiol too aggressively causes joint pain, mood dysregulation, and increased cardiovascular risk. Target physiological estradiol, not zero.",
    mitigation: [
      "AI + hCG is a common clinical combination — the goal is estradiol management, not estradiol elimination",
      "Monitor estradiol during combined use; target 20-40 pg/mL in males",
      "Low estradiol symptoms (joint pain, low libido, mood changes) prompt estradiol check — overcorrection is as problematic as undercorrection",
    ],
  },
  {
    id: "gonadorelin",
    name: "Gonadorelin (GnRH)",
    aliases: ["gonadorelin", "GnRH", "Factrel"],
    category: "Medications",
    tier: "watch",
    summary: "hCG (Leydig cell LH mimetic) and gonadorelin (pituitary GnRH stimulation) work at different levels of the HPG axis. The combination provides LH-like stimulation at both pituitary (via GnRH-stimulated LH) and gonadal levels (via hCG directly). This produces additive Leydig cell stimulation. The combination may produce more testosterone stimulation than either alone and can elevate estradiol significantly. Some physicians use this combination when gonadorelin alone is insufficient for testicular preservation.",
    mitigation: [
      "hCG + gonadorelin: additive LH pathway stimulation — monitor testosterone and estradiol together",
      "The combination may produce supraphysiological testosterone in Leydig cells; estradiol management becomes more important",
    ],
  },
  {
    id: "serms",
    name: "SERMs (clomiphene, enclomiphene, tamoxifen)",
    aliases: ["clomiphene", "clomid", "enclomiphene", "tamoxifen", "Nolvadex", "SERM"],
    category: "Medications",
    tier: "watch",
    summary: "SERMs block estrogen feedback to raise endogenous LH/FSH; hCG directly stimulates Leydig cells. In post-TRT recovery protocols, both are sometimes used together — SERMs raise the body's own LH/FSH, while hCG continues direct Leydig stimulation. The combination can produce additive testosterone and estrogen elevation. Tamoxifen specifically can block gynecomastia from hCG-stimulated estradiol.",
    mitigation: [
      "hCG + SERM combination in PCT protocols: monitor LH, testosterone, and estradiol — the combined axis stimulation warrants surveillance",
      "Tamoxifen specifically: blocks gynecomastia from hCG-stimulated estrogen at breast tissue, even when estradiol is elevated",
    ],
  },
  {
    id: "thyroid-medications",
    name: "Thyroid medications (levothyroxine)",
    aliases: ["levothyroxine", "Synthroid", "Armour Thyroid", "thyroid medication", "T4", "T3"],
    category: "Medications",
    tier: "low",
    summary: "No direct pharmacological interaction between hCG and thyroid medications. Testosterone from hCG stimulation can affect thyroid hormone binding proteins (SHBG, thyroxine-binding globulin), but the clinical significance is minimal for stable thyroid management.",
    mitigation: [
      "No dose adjustment needed for thyroid medications when starting hCG in standard protocols",
      "If thyroid symptoms change after starting TRT + hCG, check thyroid function — testosterone affects hormone binding proteins",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function HCGInteractionsPanel() {
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
        hCG&apos;s interaction profile centers on the HPG axis. GnRH agonists (leuprolide) are the hard stop — sex steroid suppression and hCG stimulation are directly opposed. TRT is the primary intended combination requiring estradiol monitoring. Aromatase inhibitors are frequently co-prescribed to manage hCG-stimulated estrogen elevation.
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
