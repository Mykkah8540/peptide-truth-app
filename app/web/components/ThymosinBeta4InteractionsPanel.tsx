"use client";

/**
 * ThymosinBeta4InteractionsPanel — interaction intelligence for Thymosin Beta-4.
 * Key frame: the angiogenesis mechanism makes cancer medications the primary
 * interaction concern. The TB4 mechanism is relatively isolated — it doesn't
 * have direct pharmacological conflicts with most common medications.
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
    id: "cancer-medications",
    name: "Cancer treatments — chemotherapy, targeted therapy, anti-angiogenic agents",
    aliases: ["chemotherapy", "chemo", "cancer treatment", "bevacizumab", "Avastin", "anti-angiogenic", "targeted therapy", "VEGF inhibitor", "oncology"],
    category: "Cancer Treatment",
    tier: "flag",
    summary: "Direct mechanistic conflict with anti-angiogenic cancer therapies. Bevacizumab (Avastin) and other VEGF-pathway inhibitors work by blocking tumor angiogenesis — their entire mechanism is to cut off the tumor blood supply. TB4 promotes angiogenesis through ILK and endothelial signaling. Using an angiogenesis promoter alongside an angiogenesis inhibitor in a cancer treatment context creates direct mechanistic opposition. Beyond anti-angiogenics, the cancer promotion concern applies to all cancer treatment contexts.",
    mitigation: [
      "Active cancer diagnosis: do not use TB4 or TB-500 — the angiogenesis mechanism and cancer promotion concern are not manageable with dose adjustment",
      "On anti-angiogenic cancer therapy (bevacizumab, sorafenib, sunitinib): direct mechanistic opposition; explicitly contraindicated",
      "In cancer remission under surveillance: discuss with oncologist before any angiogenesis-promoting compound",
    ],
  },
  {
    id: "nsaids",
    name: "NSAIDs (ibuprofen, naproxen, aspirin)",
    aliases: ["ibuprofen", "Advil", "naproxen", "Aleve", "aspirin", "NSAID", "anti-inflammatory", "COX inhibitor"],
    category: "Medications",
    tier: "watch",
    summary: "Potentially counteracting for injury healing goals. NSAIDs reduce inflammation by inhibiting COX enzymes; TB4 modulates inflammation through different pathways (NF-κB, cytokine modulation). For injury healing specifically: some inflammation is necessary for tissue repair — aggressive NSAID use can impair healing, and TB4's pro-repair signaling may be partially undermined by concurrent NSAID use during the acute repair phase.",
    mitigation: [
      "For injury recovery goals: minimize NSAID use during the acute repair phase — the inflammatory response that TB4 is modulating is partly necessary for repair",
      "Chronic NSAID use alongside TB4: no direct pharmacological interaction, but the anti-inflammatory and pro-repair signals may partially counteract",
      "NSAIDs for pain management outside the injury site: lower concern",
    ],
  },
  {
    id: "bpc-157",
    name: "BPC-157",
    aliases: ["BPC-157", "BPC157", "body protection compound"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "Common injury recovery stack — different mechanisms (TB4/TB-500: actin sequestration and anti-inflammatory; BPC-157: angiogenesis via VEGFR2 and GI protection). Both compounds promote angiogenesis through different pathways, making the combination additive in angiogenic activity. For injury recovery goals, the mechanisms are theoretically complementary. The cancer concern applies to the full stack — both compounds promote angiogenesis.",
    mitigation: [
      "Cancer history applies to the full stack — BPC-157's angiogenesis mechanism + TB4's angiogenesis mechanism create compounded angiogenic activity",
      "For injury recovery without cancer history: the stack is community-conventional and mechanistically plausible; neither compound has human RCT evidence for this use case",
    ],
  },
  {
    id: "immunosuppressants",
    name: "Immunosuppressants (cyclosporine, tacrolimus, corticosteroids)",
    aliases: ["cyclosporine", "tacrolimus", "prednisone", "corticosteroid", "immunosuppressant", "transplant medication"],
    category: "Medications",
    tier: "watch",
    summary: "TB4 has immunomodulatory properties — it affects macrophage activity, T-cell signaling, and inflammatory cytokine profiles. Immunosuppressants create a pharmacological environment that may alter TB4's immunomodulatory effects unpredictably. Transplant recipients on immunosuppressants represent a particularly high-risk group for any immunomodulatory compound.",
    mitigation: [
      "Transplant recipients on immunosuppressants: do not use TB4/TB-500 without physician guidance — immunomodulatory activity in the context of transplant immunosuppression creates uncharacterized interaction risk",
      "High-dose corticosteroids: may blunt TB4's anti-inflammatory and repair effects — the mechanisms are partially counteracting",
    ],
  },
  {
    id: "anticoagulants",
    name: "Anticoagulants (warfarin, rivaroxaban, apixaban)",
    aliases: ["warfarin", "Coumadin", "rivaroxaban", "Xarelto", "apixaban", "Eliquis", "anticoagulant", "blood thinner"],
    category: "Medications",
    tier: "watch",
    summary: "TB4's pro-angiogenic and cell migration activity could theoretically affect wound hemostasis and vascular integrity in ways that interact with anticoagulation. There is no established direct pharmacological interaction with anticoagulant drugs. The concern is more practical: injection site bleeding is more likely in anticoagulated patients, and any vascular effects of TB4 may be amplified.",
    mitigation: [
      "On anticoagulants: increased injection site bleeding risk — inject carefully and apply pressure",
      "Notify your prescribing physician about TB4/TB-500 use if on anticoagulation therapy",
    ],
  },
  {
    id: "gh-peptides",
    name: "GH secretagogues (CJC-1295, ipamorelin, GHRP-2, MK-677)",
    aliases: ["CJC-1295", "ipamorelin", "GHRP-2", "GHRP-6", "MK-677", "sermorelin", "growth hormone secretagogue", "GH secretagogue"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "Common performance and recovery stack — different mechanisms (GH secretagogues increase GH/IGF-1 signaling; TB4 works via actin sequestration and angiogenesis). Both have theoretical angiogenic activity (IGF-1 promotes angiogenesis in addition to muscle/fat metabolism). The combined angiogenic signal is not characterized. For recovery goals, the stack is mechanistically plausible; the cancer concern from additive angiogenesis applies.",
    mitigation: [
      "No direct pharmacological conflict between TB4/TB-500 and GH secretagogues",
      "The combined angiogenic potential from GH/IGF-1 signaling + TB4 angiogenesis creates additive theoretical cancer concern — cancer history is a hard stop for the combined stack",
    ],
  },
  {
    id: "vitamin-c",
    name: "Vitamin C and collagen precursors",
    aliases: ["vitamin C", "ascorbic acid", "collagen supplement", "glycine", "proline"],
    category: "Supplements",
    tier: "low",
    summary: "Vitamin C is required for collagen synthesis — it's a cofactor for prolyl hydroxylase, the enzyme that stabilizes collagen triple helix structure. For connective tissue repair goals, adequate vitamin C supports collagen production independently of TB4's actin/angiogenesis mechanism. No adverse interaction.",
    mitigation: [
      "No adverse interaction between vitamin C supplementation and TB4/TB-500",
      "Adequate vitamin C is a nutritional prerequisite for collagen synthesis — relevant for tendon and ligament repair goals",
    ],
  },
  {
    id: "zinc-magnesium",
    name: "Zinc and magnesium",
    aliases: ["zinc", "magnesium", "ZMA", "zinc supplement", "magnesium supplement"],
    category: "Supplements",
    tier: "low",
    summary: "Zinc and magnesium support tissue repair, immune function, and protein synthesis. No direct interaction with TB4. Zinc deficiency impairs wound healing independently; adequate zinc is a reasonable nutritional co-strategy.",
    mitigation: [
      "No adverse interaction between zinc/magnesium supplementation and TB4/TB-500",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function ThymosinBeta4InteractionsPanel() {
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
        Thymosin Beta-4&apos;s primary interaction concern is with cancer therapies — particularly anti-angiogenic agents where TB4&apos;s mechanism directly opposes the treatment. The TB4 mechanism is relatively pharmacologically isolated otherwise. The primary concern for most people is the cancer history contraindication — if that&apos;s clear, the interaction profile is manageable.
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
