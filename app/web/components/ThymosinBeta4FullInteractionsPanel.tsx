"use client";

/**
 * ThymosinBeta4FullInteractionsPanel — interaction intelligence for Thymosin Beta-4 Full.
 * Key frame: anti-angiogenic cancer therapy is a direct mechanism conflict and hard stop.
 * Anticoagulants warrant monitoring due to angiogenesis promotion. BPC-157 combination
 * creates overlapping repair mechanisms with unknown additive/synergistic effects.
 * Immunosuppressants in transplant context require disclosure.
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
    name: "Anti-angiogenic cancer therapies — bevacizumab, sunitinib, sorafenib, pazopanib, ramucirumab",
    aliases: ["bevacizumab", "Avastin", "sunitinib", "Sutent", "sorafenib", "Nexavar", "pazopanib", "Votrient", "ramucirumab", "Cyramza", "anti-angiogenic", "VEGF inhibitor", "tyrosine kinase inhibitor", "cancer therapy", "oncology", "chemotherapy"],
    category: "Medications",
    tier: "flag",
    summary: "Full thymosin beta-4 potently upregulates VEGF expression and promotes angiogenesis — the direct opposing mechanism to anti-angiogenic cancer therapy. Bevacizumab, sunitinib, sorafenib, and similar drugs work by blocking VEGF signaling or VEGF receptor tyrosine kinase activity specifically to prevent tumor vascularization. Using full Tβ4 alongside these therapies directly antagonizes the therapeutic mechanism. Beyond the pharmacological conflict, any pro-angiogenic compound is contraindicated in cancer contexts regardless of specific interactions with anti-angiogenic drugs. This is a mechanism-based hard stop, not a speculative interaction.",
    mitigation: [
      "On any anti-angiogenic cancer therapy: full thymosin beta-4 is absolutely contraindicated — the mechanisms are directly opposed",
      "Cancer diagnosis of any kind: disclose all peptide use to your oncologist immediately; do not attempt to manage this interaction yourself",
      "This is not reversible by spacing doses or reducing dose — the mechanism-based contraindication applies regardless of timing or amount",
    ],
  },
  {
    id: "anticoagulants",
    name: "Anticoagulants and antiplatelets — warfarin, apixaban, rivaroxaban, clopidogrel",
    aliases: ["anticoagulant", "warfarin", "Coumadin", "apixaban", "Eliquis", "rivaroxaban", "Xarelto", "clopidogrel", "Plavix", "dabigatran", "Pradaxa", "heparin", "blood thinner", "antiplatelet"],
    category: "Medications",
    tier: "watch",
    summary: "Full Tβ4 promotes angiogenesis and new vessel formation — which involves endothelial cell proliferation and remodeling. New vessel formation can affect local hemostatic balance. In the cardiac context, promoting neo-angiogenesis in post-MI territory is the therapeutic goal, but this same angiogenic activity in a patient on anticoagulants for atrial fibrillation or thromboembolic history creates uncertain hemostatic effects. Additionally, Tβ4's effects on platelet behavior (via ILK signaling in platelets) have been studied and may affect anticoagulant management.",
    mitigation: [
      "On warfarin: more frequent INR monitoring when starting or stopping full Tβ4 therapy; angiogenesis-promoting effects could alter INR stability",
      "On antiplatelets post-cardiac event: discuss with cardiologist before adding full Tβ4; the cardiac repair goal of Tβ4 and the antiplatelet indication may be aligned (post-MI context), but coordination is important",
      "Monitor for any unusual bleeding or bruising, which could indicate shifts in coagulation balance",
    ],
  },
  {
    id: "immunosuppressants",
    name: "Immunosuppressants — cyclosporine, tacrolimus, mycophenolate, azathioprine",
    aliases: ["immunosuppressant", "cyclosporine", "tacrolimus", "Prograf", "mycophenolate", "CellCept", "azathioprine", "Imuran", "transplant", "autoimmune", "rejection"],
    category: "Medications",
    tier: "watch",
    summary: "Full Tβ4 has characterized immune-modulatory effects beyond simple immunosuppression — it influences T-cell differentiation, macrophage polarization, and inflammatory cytokine profiles. Thymosin alpha-1 (a related thymosin) is actually used as an immune stimulant. Full Tβ4 modulates the immune environment in ways that could either enhance or reduce immunosuppressant efficacy. In transplant patients, any immune activation carries rejection risk. In autoimmune disease, immune system effects are unpredictable in the context of pharmaceutical immunosuppression.",
    mitigation: [
      "On immunosuppressants for organ transplant: disclose full Tβ4 use to transplant team; immune modulation could affect rejection surveillance",
      "On immunosuppressants for autoimmune disease: discuss with prescribing physician before adding full Tβ4; thymosin-mediated immune activation could destabilize autoimmune conditions",
      "Full Tβ4 has thymic-derived immune effects that overlap with the endocrine function of the thymus — interactions with immune-modifying medications are complex",
    ],
  },
  {
    id: "bpc157-stack",
    name: "BPC-157 (pentadecapeptide) — repair peptide combination",
    aliases: ["BPC-157", "BPC157", "body protection compound", "GEPPPGKPADDAGLV", "repair peptide", "healing peptide"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "BPC-157 and full thymosin beta-4 are both repair-context peptides, but with different primary mechanisms: BPC-157 acts primarily through the NO system and growth factor receptor upregulation; full Tβ4 acts through G-actin sequestration, ILK activation, and VEGF-mediated angiogenesis. In a repair context, these mechanisms are potentially additive — covering different aspects of the healing cascade. In animal models, this combination has been studied with some additive healing benefit reported. The cancer contraindication applies additively: both promote angiogenesis through overlapping pathways, compounding the cancer risk.",
    mitigation: [
      "Cancer history: the combination of BPC-157 + full Tβ4 compounds the angiogenesis promotion from both mechanisms — the contraindication is stronger in combination",
      "If combining for repair applications without cancer history: establish response to each compound individually before combining; stacked adverse effects cannot be attributed to the correct compound",
      "The combination has theoretical additive rationale for repair contexts but no controlled human data; monitor for any unexpected effects and do not start both simultaneously",
    ],
  },
  {
    id: "tb500-combination",
    name: "TB-500 (Ac-SDKP fragment) — redundant thymosin mechanism stacking",
    aliases: ["TB-500", "TB500", "thymosin fragment", "Ac-SDKP", "LKKTETQ"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "Combining full thymosin beta-4 with TB-500 creates redundant mechanism overlap — TB-500 is a fragment of the full protein and shares the actin-sequestration thymosin motif. There may be additive effects through different binding contexts (intracellular full Tβ4 vs extracellular TB-500 fragment), but the rationale for combining them is not established. The combination creates additive angiogenesis promotion. Practical consideration: verify whether you actually have both compounds distinctly — most community 'thymosin beta-4' is TB-500, making the combination a single compound rather than two.",
    mitigation: [
      "Verify product identity by mass spectrometry before combining — if either product is mislabeled, you may be using the same compound twice at double dose",
      "The combination has overlapping mechanisms with no clear additive rationale over using the appropriate single compound at full dose",
      "Cancer contraindication applies to both; combining does not create a new risk but does not reduce the existing one",
    ],
  },
  {
    id: "standard-supplements",
    name: "Standard supplements — vitamins, omega-3, collagen peptides, magnesium",
    aliases: ["vitamin", "omega-3", "fish oil", "collagen", "magnesium", "zinc", "vitamin D", "vitamin C", "supplement"],
    category: "Supplements",
    tier: "low",
    summary: "No meaningful adverse interactions between full thymosin beta-4 and standard supplements are anticipated. Standard supplements operate through different pathways (nutritional, antioxidant, mineral cofactor) than the ILK/angiogenesis mechanisms of full Tβ4. Collagen peptides are sometimes combined with repair-context peptides for connective tissue support — no adverse interaction with full Tβ4.",
    mitigation: [
      "No adverse interaction between full Tβ4 and standard supplement regimens",
      "Continue standard nutritional supplementation; it does not conflict with full Tβ4 mechanisms",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function ThymosinBeta4FullInteractionsPanel() {
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
        Full thymosin beta-4&apos;s interactions are dominated by its angiogenesis mechanism. Anti-angiogenic cancer therapies are a direct pharmacological conflict and hard stop. Anticoagulants and immunosuppressants warrant disclosure and monitoring given the vascular and immune effects. BPC-157 combination is potentially additive for repair but compounds the cancer contraindication from both mechanisms. TB-500 combination may be redundant — verify product identity before combining thymosin compounds.
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
