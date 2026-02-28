"use client";

/**
 * Igf1InteractionsPanel — interaction intelligence for IGF-1.
 * Key frame: hypoglycemia amplification is the primary interaction risk class.
 * Cancer medications are a hard stop. GH secretagogue stacking is common
 * but poorly characterized. Source quality amplifies all risks.
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
    id: "insulin",
    name: "Insulin (exogenous)",
    aliases: ["insulin", "rapid-acting insulin", "basal insulin", "NovoLog", "Humalog", "Lantus", "Tresiba"],
    category: "Glucose / Metabolic",
    tier: "flag",
    summary: "Direct additive hypoglycemia. IGF-1 lowers glucose via insulin receptor cross-reactivity; combining with exogenous insulin stacks two independent glucose-lowering mechanisms with no floor. Severe hypoglycemia is the expected outcome without precise medical management of the combined dose.",
    mitigation: [
      "Do not combine IGF-1 with exogenous insulin outside physician-supervised protocols with continuous glucose monitoring",
      "If combining is medically indicated: insulin dose reduction is required — the IGF-1 glucose-lowering contribution must be accounted for",
      "Have fast-acting glucose (gel, tabs, juice) and glucagon kit accessible during the full active window of both compounds",
    ],
  },
  {
    id: "sulfonylureas",
    name: "Sulfonylureas",
    aliases: ["glipizide", "glyburide", "glimepiride", "Glucotrol", "DiaBeta", "Amaryl"],
    category: "Glucose / Metabolic",
    tier: "flag",
    summary: "Additive hypoglycemia via independent mechanisms. Sulfonylureas force pancreatic insulin secretion regardless of glucose level; IGF-1 adds insulin receptor cross-reactivity on top. The combination creates unpredictable glucose lows that neither drug alone would produce at the same dose.",
    mitigation: [
      "IGF-1 with sulfonylureas requires physician management — this is not a self-management combination",
      "Sulfonylurea dose reduction is typically required if IGF-1 is added for any medical purpose",
      "Self-monitoring of blood glucose multiple times daily is the minimum; continuous glucose monitoring is appropriate",
    ],
  },
  {
    id: "cancer-medications",
    name: "Cancer treatments (chemotherapy, targeted therapy, immunotherapy)",
    aliases: ["chemo", "chemotherapy", "oncology", "cancer treatment", "immunotherapy", "targeted therapy", "monoclonal antibody", "checkpoint inhibitor"],
    category: "Oncology",
    tier: "flag",
    summary: "Hard stop — not an interaction to manage, but an absolute contraindication. IGF-1 is a direct mitogenic signal (IGF-1R activation drives cancer cell proliferation via PI3K/AKT and RAS/MAPK). Any active cancer or cancer treatment is a categorical exclusion from IGF-1 use regardless of cancer type or treatment mechanism.",
    mitigation: [
      "Any current or recent cancer diagnosis: do not use IGF-1 — this is a categorical exclusion, not a dose-management question",
      "Remission does not change this — IGF-1 can promote growth of residual malignant cells",
      "IGF-1R is an active cancer drug target; using IGF-1 in an oncology context is pharmacologically counterproductive",
    ],
  },
  {
    id: "igf1r-inhibitors",
    name: "IGF-1R inhibitors (cancer drugs)",
    aliases: ["linsitinib", "figitumumab", "ganitumab", "dalotuzumab", "cixutumumab", "IGF-1R inhibitor"],
    category: "Oncology",
    tier: "flag",
    summary: "Directly antagonistic pharmacology. IGF-1R inhibitors are used in oncology to block the same receptor that exogenous IGF-1 activates. Combining them is incoherent and places IGF-1 in an active cancer treatment context — which is itself a hard stop.",
    mitigation: [
      "Any IGF-1R inhibitor use means you are in an oncology treatment context — do not use exogenous IGF-1",
      "Pharmacological antagonism aside, the underlying cancer diagnosis is the controlling contraindication",
    ],
  },
  {
    id: "gh-secretagogues",
    name: "GH secretagogues (ipamorelin, CJC-1295, sermorelin, GHRP-2, GHRP-6)",
    aliases: ["ipamorelin", "CJC-1295", "sermorelin", "GHRP-2", "GHRP-6", "tesamorelin", "GH releasing peptide", "GHRH", "growth hormone secretagogue"],
    category: "GH / Growth Axis",
    tier: "watch",
    summary: "Common community stack — additive GH/IGF-1 axis stimulation, poorly characterized safety interaction. GH secretagogues raise endogenous IGF-1 through the natural GH/liver axis. Adding exogenous IGF-1 on top bypasses feedback while the secretagogue is also pushing IGF-1 production higher. The combined IGF-1 exposure is uncharacterized and the interactions are not studied.",
    mitigation: [
      "Combined GH secretagogue + exogenous IGF-1 use is common but not safety-characterized — the combined IGF-1 burden is additive and unquantified",
      "If stacking: IGF-1 levels at baseline (before exogenous) and during combined use are the minimum monitoring",
      "The GH secretagogue rationale (feedback regulation intact) is undermined by adding exogenous IGF-1 that bypasses all feedback",
      "Consider whether secretagogue-only protocols achieve your goal before adding exogenous IGF-1",
    ],
  },
  {
    id: "exogenous-gh",
    name: "Exogenous growth hormone (HGH)",
    aliases: ["HGH", "growth hormone", "rHGH", "somatropin", "Norditropin", "Genotropin", "Humatrope", "Omnitrope"],
    category: "GH / Growth Axis",
    tier: "watch",
    summary: "The highest-risk GH-axis stack. Exogenous GH drives liver IGF-1 production (endogenous raise) while exogenous IGF-1 adds direct receptor activation on top. Combined organ hypertrophy risk, mitogenic burden, and IGF-1 exposure are substantially higher than either alone. This combination is acromegaly pharmacology.",
    mitigation: [
      "Combining exogenous GH with exogenous IGF-1 is the pharmacological equivalent of acromegaly — the same end-organ effects are the mechanism",
      "Cardiac monitoring (EKG, echocardiogram) is appropriate given additive cardiac hypertrophy risk from combined GH + IGF-1R activation",
      "IGF-1 levels during the combination are the minimum monitoring; tumor marker surveillance is appropriate given the additive mitogenic burden",
    ],
  },
  {
    id: "metformin",
    name: "Metformin",
    aliases: ["metformin", "Glucophage", "Fortamet", "Glumetza"],
    category: "Glucose / Metabolic",
    tier: "watch",
    summary: "Additive glucose-lowering with less risk than insulin or sulfonylureas, but not negligible. Metformin primarily reduces hepatic glucose output; IGF-1 adds insulin receptor cross-reactivity. Combined effect lowers glucose more than either alone. Relevant mostly in diabetics (for whom IGF-1 is already contraindicated) but also relevant for people using metformin off-label for longevity.",
    mitigation: [
      "Off-label metformin use for longevity + IGF-1: monitor fasting glucose and note increased hypoglycemia risk during the active window",
      "If on metformin for diabetes or prediabetes: IGF-1 is contraindicated by the underlying glucose dysregulation, not just by metformin co-use",
      "Symptoms of hypoglycemia (shakiness, sweating, confusion) warrant immediate glucose response",
    ],
  },
  {
    id: "alcohol",
    name: "Alcohol",
    aliases: ["alcohol", "ethanol", "drinking", "beer", "wine", "spirits"],
    category: "Lifestyle / Recreational",
    tier: "watch",
    summary: "Amplifies hypoglycemia risk. Alcohol impairs gluconeogenesis (the liver's backup glucose production) while IGF-1 actively lowers blood glucose via insulin receptor cross-reactivity. The combination creates compounded hypoglycemia risk — the liver cannot compensate for the glucose lowering because alcohol is blocking hepatic glucose production.",
    mitigation: [
      "Do not drink alcohol during the active window of IGF-1 injection (roughly 2-4 hours post-injection)",
      "If drinking: eat a carbohydrate-containing meal regardless of injection timing and monitor for hypoglycemia symptoms",
      "Heavy alcohol use: avoid IGF-1 use entirely on drinking days",
    ],
  },
  {
    id: "fasting",
    name: "Fasted state / intermittent fasting",
    aliases: ["fasting", "intermittent fasting", "IF", "extended fast", "fasted injection", "skip breakfast"],
    category: "Lifestyle / Recreational",
    tier: "watch",
    summary: "The single most preventable hypoglycemia amplifier. Injecting IGF-1 in a fasted state removes the primary glucose buffer — glycogen stores are lower, blood glucose is at or near baseline, and the insulin receptor cross-reactivity from IGF-1 acts on an already-lean system. This is why 'always eat before injecting' is universal community guidance.",
    mitigation: [
      "Never inject IGF-1 in a fasted state — this is the baseline safety rule",
      "Eat a carbohydrate-containing meal 20-30 minutes before injection, every injection",
      "Intermittent fasting protocols: time injections to occur within the eating window, not the fasting window",
      "If a fasted injection occurs accidentally: consume fast-acting carbohydrates immediately and monitor for 2-3 hours",
    ],
  },
  {
    id: "igf1-lr3",
    name: "IGF-1 LR3 (Long R3 IGF-1)",
    aliases: ["IGF-1 LR3", "Long R3", "LR3", "des(1-3) IGF-1", "des-IGF-1"],
    category: "GH / Growth Axis",
    tier: "watch",
    summary: "Same mechanism, dramatically longer half-life. IGF-1 LR3 is a modified analog with ~20-30x longer half-life than standard IGF-1. All the same risks apply (hypoglycemia, mitogenic, organ hypertrophy) but the duration of exposure is extended substantially. Dosing errors carry proportionally longer consequences — hypoglycemia from an overdose lasts hours, not 30-60 minutes.",
    mitigation: [
      "All IGF-1 safety protocols apply to LR3 with extended duration — the risk window is much longer",
      "First injection: observe with glucose monitoring for at least 4-6 hours given the longer active window",
      "Source quality even more critical — a concentration error means the overshoot lasts much longer",
    ],
  },
  {
    id: "bpc-157",
    name: "BPC-157",
    aliases: ["BPC-157", "BPC157", "body protection compound"],
    category: "Peptide Stacks",
    tier: "low",
    summary: "Common recovery stack — no clinically characterized interaction. BPC-157 and IGF-1 are both used for tissue repair and are commonly stacked in the community. Their mechanisms are distinct (BPC-157: angiogenesis + gut protection; IGF-1: systemic IGF-1R agonism). No documented pharmacokinetic or pharmacodynamic interaction. Stacking amplifies the general IGF-1 risk profile without adding specific interaction risk.",
    mitigation: [
      "No specific interaction between BPC-157 and IGF-1 is documented",
      "Stacking with IGF-1 means the IGF-1 safety protocol (glucose management, cancer screening, source quality) applies fully to the combined protocol",
    ],
  },
  {
    id: "tb-500",
    name: "TB-500 (Thymosin Beta-4)",
    aliases: ["TB-500", "TB500", "thymosin beta-4", "thymosin"],
    category: "Peptide Stacks",
    tier: "low",
    summary: "Common tissue repair stack — no characterized interaction. TB-500 and IGF-1 are both used for healing protocols; their mechanisms are distinct. Some concern exists about TB-500's potential to promote angiogenesis in tumors, which is a separate mitogenic consideration from IGF-1 — in the context of cancer history, both compounds are individually contraindicated.",
    mitigation: [
      "No direct pharmacokinetic interaction between TB-500 and IGF-1",
      "Both are individually contraindicated in cancer history — if the cancer hard stop applies to IGF-1, it applies to this stack",
    ],
  },
  {
    id: "creatine",
    name: "Creatine",
    aliases: ["creatine", "creatine monohydrate", "creatine HCl"],
    category: "Supplements",
    tier: "low",
    summary: "Commonly stacked for muscle and strength goals — no known interaction with IGF-1. Creatine acts on phosphocreatine energy storage in muscle cells; IGF-1 acts on IGF-1R signaling. Mechanistically independent. No pharmacokinetic or pharmacodynamic interaction is documented.",
    mitigation: [
      "No specific precaution for creatine + IGF-1 co-use",
      "Ensure adequate hydration — IGF-1 can cause fluid retention; creatine has osmotic effects on muscle water; combined fluid dynamics worth monitoring",
    ],
  },
  {
    id: "protein-supplements",
    name: "Protein supplements",
    aliases: ["whey protein", "casein", "protein powder", "protein shake", "leucine", "amino acids", "EAAs", "BCAAs"],
    category: "Supplements",
    tier: "low",
    summary: "Complements IGF-1's anabolic mechanism — no adverse interaction. IGF-1R activation promotes protein synthesis; adequate protein substrate amplifies the downstream effect. Protein intake before injection also provides glucose and amino acids simultaneously, which contributes to the pre-injection carbohydrate buffer practice.",
    mitigation: [
      "Protein supplementation is consistent with IGF-1's anabolic goals — no adverse interaction",
      "Using a protein+carb meal 20-30 minutes before injection satisfies both the glucose buffer requirement and protein substrate optimization",
    ],
  },
  {
    id: "zinc",
    name: "Zinc",
    aliases: ["zinc", "zinc gluconate", "zinc picolinate", "zinc citrate"],
    category: "Supplements",
    tier: "low",
    summary: "Zinc is involved in IGF-1 synthesis and GH receptor signaling; deficiency impairs the GH/IGF-1 axis. Supplementing adequate zinc supports baseline IGF-1 physiology. No clinically significant interaction with exogenous IGF-1 is documented — the relationship is nutritional, not pharmacological.",
    mitigation: [
      "No adverse interaction between zinc supplementation and exogenous IGF-1",
      "Zinc adequacy (not excess) is appropriate for anyone manipulating the GH/IGF-1 axis",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function Igf1InteractionsPanel() {
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
        IGF-1 has two primary interaction risk classes: glucose-lowering drugs that amplify hypoglycemia (the acute life-safety risk), and anything related to cancer or oncology (categorical hard stop). Everything else is secondary. If you are on insulin, sulfonylureas, or any cancer treatment, stop here — those interactions are not dose-management questions.
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
