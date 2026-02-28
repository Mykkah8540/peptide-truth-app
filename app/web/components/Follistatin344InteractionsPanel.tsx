"use client";

/**
 * Follistatin344InteractionsPanel — interaction intelligence for Follistatin-344.
 * Key frame: activin suppression creates the most serious interactions (cancer meds,
 * reproductive hormones). Most interactions are mechanism-based without
 * direct pharmacological characterization — follistatin-344 has no clinical
 * drug interaction studies.
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
    id: "anti-angiogenic-cancer",
    name: "Anti-activin / anti-ActRIIB cancer therapies",
    aliases: ["activin", "ActRIIB", "cancer therapy", "luspatercept", "sotatercept", "bimagrumab"],
    category: "Cancer Treatment",
    tier: "flag",
    summary: "Some cancer treatments (luspatercept, sotatercept) work by blocking TGF-β superfamily signaling — the same pathway follistatin affects. Combining follistatin with these drugs creates unpredictable pathway interactions. More fundamentally, follistatin use during cancer treatment removes activin's tumor-suppressive signaling at a time when the disease management context is maximally important. Any cancer treatment context is a hard stop for follistatin use without oncology guidance.",
    mitigation: [
      "Any active cancer treatment: do not use follistatin-344 without oncology guidance — activin's role in the cancer context cannot be predicted without knowing the specific tumor biology",
      "On luspatercept or sotatercept (TGF-β pathway drugs): do not combine — both affect overlapping TGF-β ligand/receptor pathways; pharmacological interaction is uncharacterized and potentially significant",
    ],
  },
  {
    id: "aromatase-inhibitors-cancer",
    name: "Aromatase inhibitors for ER+ breast cancer (anastrozole, letrozole, exemestane)",
    aliases: ["anastrozole", "Arimidex", "letrozole", "Femara", "exemestane", "Aromasin", "aromatase inhibitor", "AI", "breast cancer", "ER-positive"],
    category: "Cancer Treatment",
    tier: "flag",
    summary: "ER-positive breast cancer treatment with aromatase inhibitors: follistatin use is contraindicated in this context on two grounds. First, the cancer concern — activin suppression may facilitate cancer cell progression. Second, follistatin disrupts the activin/FSH/estrogen axis in the context where estrogen management is critical. The interaction between follistatin-mediated FSH suppression and aromatase inhibitor-mediated estrogen reduction in this context is complex and unstudied.",
    mitigation: [
      "ER-positive breast cancer, any treatment phase: follistatin-344 is contraindicated — activin suppression in cancer context + reproductive hormone disruption on top of cancer management is inappropriate",
    ],
  },
  {
    id: "fsH-lh-affecting-drugs",
    name: "FSH / LH-affecting medications — clomiphene, letrozole (fertility), GnRH analogs",
    aliases: ["clomiphene", "clomid", "letrozole", "FSH injection", "gonadotropins", "GnRH", "fertility treatment", "IVF"],
    category: "Reproductive Medications",
    tier: "flag",
    summary: "Follistatin suppresses FSH via activin blockade. Any medication that works by modulating FSH or LH for fertility treatment creates direct mechanistic conflict. Clomiphene and letrozole raise FSH to stimulate ovulation — follistatin counteracts this directly. Injectable FSH (gonadotropin therapy) for IVF: follistatin suppresses the activin that helps FSH drive follicular development. The follistatin/activin axis is directly embedded in the ovarian response to FSH.",
    mitigation: [
      "Fertility treatment using clomiphene, letrozole, or injectable FSH: follistatin-344 is mechanistically antagonistic — do not combine",
      "IVF cycles: activin plays specific roles in follicular development and oocyte maturation; follistatin suppression during an IVF cycle would interfere with the controlled hormonal protocol",
    ],
  },
  {
    id: "anabolic-androgenic",
    name: "Anabolic steroids / SARMs",
    aliases: ["testosterone", "anabolic steroids", "SARM", "YK11", "RAD-140", "LGD-4033", "trenbolone", "nandrolone"],
    category: "Performance",
    tier: "watch",
    summary: "No direct pharmacological interaction. Both follistatin-344 and anabolic steroids/SARMs aim to increase muscle mass through different mechanisms. Community users frequently combine these. The issue: androgen-sensitive cancers (prostate, breast in males) are in the risk profile of anabolic compounds; follistatin adds activin suppression on top of androgen-driven cancer risk. The combined cancer risk profile in long-term users is not characterized.",
    mitigation: [
      "No acute pharmacological interaction between follistatin-344 and androgens/SARMs",
      "Combined cancer risk profile (androgen-driven + activin suppression) is not characterized — anyone with prostate cancer risk should not combine these",
      "Monitor PSA if male and using both classes for extended periods",
    ],
  },
  {
    id: "myostatin-inhibitors",
    name: "Other myostatin pathway inhibitors — bimagrumab, myostatin propeptide, ACE-031",
    aliases: ["bimagrumab", "myostatin propeptide", "ACE-031", "ActRIIB", "myostatin inhibitor"],
    category: "Performance",
    tier: "watch",
    summary: "Combining follistatin-344 with another myostatin pathway inhibitor (bimagrumab blocks ActRIIB receptor; myostatin propeptide binds myostatin specifically) produces redundant pathway blockade. Whether this produces greater muscle hypertrophy or creates more complete TGF-β suppression with expanded off-target effects is unknown. Bimagrumab is an investigational drug with clinical trials — follistatin should not be combined with it outside a clinical context.",
    mitigation: [
      "Do not combine follistatin-344 with bimagrumab (investigational) or other myostatin pathway inhibitors outside a controlled context",
      "Stacking multiple TGF-β pathway blockers amplifies the activin/GDF-11 suppression concerns",
    ],
  },
  {
    id: "igf1-gh",
    name: "Growth hormone (GH) / IGF-1 / peptide secretagogues",
    aliases: ["growth hormone", "GH", "IGF-1", "HGH", "ipamorelin", "GHRP-2", "sermorelin", "CJC-1295", "MK-677"],
    category: "Performance",
    tier: "watch",
    summary: "GH and IGF-1 promote muscle growth through mTOR and satellite cell activation — a mechanistically distinct pathway from myostatin inhibition. Community users combine these on the theory of additive muscle effects from different mechanisms. No direct pharmacological interaction. The combined effect on muscle growth (if follistatin is bioavailable) is additive in theory; the combined effect on cancer risk (IGF-1 is a known growth factor for multiple cancer types, follistatin suppresses activin-mediated tumor suppression) is a meaningful cumulative concern.",
    mitigation: [
      "No acute interaction between follistatin-344 and GH/IGF-1 secretagogues",
      "The cumulative growth factor + activin suppression cancer risk profile of this combination is not characterized — avoid in anyone with elevated cancer risk",
    ],
  },
  {
    id: "vitamin-d-zinc",
    name: "General exercise supplements — creatine, protein, vitamin D",
    aliases: ["creatine", "protein", "whey", "vitamin D", "zinc", "magnesium"],
    category: "Supplements",
    tier: "low",
    summary: "No mechanistic interaction between follistatin-344 and standard training supplements. If follistatin does produce muscle hypertrophy, adequate protein and creatine support the training adaptation. No adverse interaction expected.",
    mitigation: [
      "No adverse interaction between follistatin-344 and standard training supplements",
      "Adequate protein intake (1.6-2.2g/kg) supports muscle protein synthesis regardless of follistatin use",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function Follistatin344InteractionsPanel() {
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
        Follistatin-344 has no clinical pharmacokinetic data, meaning all interactions are mechanism-based. The flags are serious: cancer treatment context and fertility treatment are hard stops due to activin&apos;s tumor-suppressive and FSH-regulatory roles. Anabolic compounds and GH/IGF-1 combinations have no acute interaction but add cumulative cancer risk that is not characterized.
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
