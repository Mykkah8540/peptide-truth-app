"use client";

/**
 * SemaglutideInteractionsPanel — interaction intelligence for Semaglutide.
 * Primary concerns: insulin/sulfonylureas (hypoglycemia), other GLP-1 agents (duplication),
 * oral medications (delayed absorption from gastric emptying), pregnancy/contraception.
 * Well-characterized interaction profile given the large post-market evidence base.
 */

import { useState, useMemo } from "react";

type Tier = "flag" | "watch" | "low";
type Category = "medications" | "supplements" | "stimulants" | "recreational" | "peptides";

type Entry = {
  id: string;
  name: string;
  aliases: string[];
  category: Category;
  tier: Tier;
  summary: string;
  mitigation: string[];
};

const INTERACTIONS: Entry[] = [
  // ── FLAGS ──
  {
    id: "insulin",
    name: "Insulin (all types)",
    aliases: ["basal insulin", "bolus insulin", "glargine", "detemir", "degludec", "lispro", "aspart", "glulisine", "NPH"],
    category: "medications",
    tier: "flag",
    summary: "Additive glucose-lowering — hypoglycemia risk requires insulin dose reduction when starting semaglutide",
    mitigation: [
      "Insulin dose reduction is typically required when starting semaglutide — coordinate with prescribing physician before starting",
      "Glucose monitoring is required: fasting glucose and post-meal glucose monitoring during the first 4-8 weeks",
      "Hypoglycemia symptoms (shakiness, sweating, confusion, palpitations, rapid heart rate): fast-acting carbohydrates immediately",
      "Do not adjust insulin dose independently — work with your physician for a coordinated reduction plan",
    ],
  },
  {
    id: "sulfonylureas",
    name: "Sulfonylureas",
    aliases: ["glipizide", "glyburide", "glimepiride", "glibenclamide", "tolbutamide", "chlorpropamide"],
    category: "medications",
    tier: "flag",
    summary: "Additive insulin secretagogue effect — hypoglycemia risk with semaglutide co-use",
    mitigation: [
      "Sulfonylurea dose reduction is often recommended when adding semaglutide — discuss with prescribing physician",
      "Glucose monitoring: sulfonylurea-induced hypoglycemia risk is amplified by semaglutide's glucose-lowering",
      "Hypoglycemia symptoms: fast-acting carbohydrates; if severe or loss of consciousness, call emergency services",
    ],
  },
  {
    id: "other-glp1",
    name: "Other GLP-1 receptor agonists",
    aliases: ["liraglutide", "dulaglutide", "exenatide", "albiglutide", "tirzepatide", "retatrutide", "ozempic", "victoza", "trulicity", "byetta"],
    category: "medications",
    tier: "flag",
    summary: "Same receptor class — do not combine GLP-1 drugs; redundant mechanism and additive GI and safety risks",
    mitigation: [
      "Do not use two GLP-1 receptor agonists simultaneously — mechanism duplication with no additive benefit and increased GI and safety risk",
      "Tirzepatide contains GLP-1R agonism — switching between semaglutide and tirzepatide requires a proper transition, not overlap",
      "Discuss any transition between GLP-1 drugs with your prescribing physician",
    ],
  },
  {
    id: "oral-meds-timing",
    name: "Oral medications requiring consistent absorption (narrow therapeutic index)",
    aliases: ["warfarin", "levothyroxine", "phenytoin", "digoxin", "cyclosporine", "tacrolimus", "lithium"],
    category: "medications",
    tier: "flag",
    summary: "Gastric emptying delay from semaglutide alters oral drug absorption — narrow therapeutic index drugs require monitoring",
    mitigation: [
      "Gastric emptying delay slows the rate at which oral drugs leave the stomach and reach absorption — this can alter peak concentration timing and magnitude",
      "Drugs with narrow therapeutic index (warfarin, levothyroxine, cyclosporine, digoxin, lithium) are most concerning — plasma level monitoring may need to be more frequent after starting semaglutide",
      "Alert all prescribing physicians managing narrow therapeutic index medications when starting semaglutide",
      "Do not assume stable pre-semaglutide doses of narrow therapeutic index drugs remain appropriate after starting semaglutide",
    ],
  },
  {
    id: "pregnancy",
    name: "Pregnancy / conception planning",
    aliases: ["pregnant", "trying to conceive", "IVF", "fertility"],
    category: "medications",
    tier: "flag",
    summary: "Animal fetal harm data — semaglutide must be stopped before conception",
    mitigation: [
      "Stop semaglutide at least 2 months before planned conception — this is the prescribing information guidance based on pharmacokinetic washout period",
      "Discuss contraception needs with your prescribing physician — pregnancy during semaglutide use requires immediate stopping",
      "If pregnant while on semaglutide: stop immediately and inform your OB",
    ],
  },

  // ── WATCHES ──
  {
    id: "metformin",
    name: "Metformin",
    aliases: ["glucophage", "fortamet", "glumetza"],
    category: "medications",
    tier: "watch",
    summary: "Common and often intentional combination in T2D — additive glucose lowering, monitor for GI additive effects",
    mitigation: [
      "Semaglutide + metformin is a standard T2D combination — not a contraindication",
      "GI side effects (nausea, diarrhea) from both drugs can compound, particularly early — meal timing and slow escalation help",
      "Hypoglycemia from the combination is lower risk than with insulin/sulfonylureas — metformin alone does not cause hypoglycemia",
      "Consistent glucose monitoring is still appropriate during the first 4-8 weeks of adding semaglutide to metformin",
    ],
  },
  {
    id: "oral-contraceptives",
    name: "Oral contraceptives",
    aliases: ["birth control pill", "combined OCP", "progestin-only pill", "OCP"],
    category: "medications",
    tier: "watch",
    summary: "Gastric emptying delay may affect OCP absorption timing and reliability — backup contraception during dose escalation",
    mitigation: [
      "Gastric emptying delay from semaglutide can alter the absorption timing of oral contraceptives",
      "Consider backup contraception (condoms) during the titration period and for 4 weeks after any dose escalation",
      "Long-acting reversible contraception (IUD, implant) avoids the absorption interaction entirely — discuss with your physician if OCP reliability is a concern",
    ],
  },
  {
    id: "nsaids",
    name: "NSAIDs (ibuprofen, naproxen, diclofenac, celecoxib)",
    aliases: ["ibuprofen", "advil", "motrin", "naproxen", "aleve", "diclofenac", "celecoxib", "meloxicam"],
    category: "medications",
    tier: "watch",
    summary: "Additive GI irritation potential — NSAIDs and GLP-1-associated GI effects can compound",
    mitigation: [
      "Both NSAIDs and semaglutide can cause GI irritation independently — co-use amplifies GI risk (nausea, discomfort)",
      "Avoid taking NSAIDs on an empty stomach, particularly during semaglutide titration",
      "Acetaminophen/paracetamol is preferred over NSAIDs for pain management during semaglutide use if possible",
      "Regular or daily NSAID use alongside semaglutide warrants discussion with your physician",
    ],
  },
  {
    id: "alcohol",
    name: "Alcohol",
    aliases: ["wine", "beer", "spirits", "ethanol"],
    category: "recreational",
    tier: "watch",
    summary: "Amplifies GI side effects; alcohol caloric content conflicts with weight management goals; rare hypoglycemia risk in T2D context",
    mitigation: [
      "Alcohol directly worsens GI symptoms on semaglutide — nausea and discomfort are amplified, particularly during titration",
      "In T2D context with concurrent glucose-lowering medications: alcohol can cause paradoxical hypoglycemia — monitor glucose if drinking with T2D medications",
      "Many users note reduced alcohol tolerance on semaglutide — the GI and sedating effects of alcohol appear amplified",
      "Some evidence suggests GLP-1 drugs reduce alcohol cravings — this is an observed pattern, not a therapeutic indication",
    ],
  },
  {
    id: "sglt2",
    name: "SGLT-2 inhibitors",
    aliases: ["empagliflozin", "dapagliflozin", "canagliflozin", "jardiance", "farxiga", "invokana"],
    category: "medications",
    tier: "watch",
    summary: "Common T2D combination — generally safe, but DKA risk with extreme caloric restriction on semaglutide requires awareness",
    mitigation: [
      "Semaglutide + SGLT-2 inhibitor is a frequently used combination in T2D management — not a contraindication",
      "SGLT-2 inhibitors carry a rare risk of diabetic ketoacidosis (DKA), which can occur at normal or near-normal glucose levels — this risk may increase during prolonged very low caloric intake on semaglutide",
      "If experiencing severe GI intolerance (prolonged vomiting/not eating), SGLT-2 inhibitor should be held — discuss sick-day management with your physician",
      "Ketone monitoring during prolonged very low caloric intake is prudent with this combination",
    ],
  },
  {
    id: "statin",
    name: "Statins",
    aliases: ["atorvastatin", "rosuvastatin", "simvastatin", "pravastatin", "lipitor", "crestor"],
    category: "medications",
    tier: "watch",
    summary: "No direct pharmacological interaction — but oral statin absorption may be slightly altered by gastric emptying delay",
    mitigation: [
      "No clinically significant pharmacokinetic interaction established between semaglutide and statins",
      "Gastric emptying delay could theoretically alter statin absorption timing — not established as clinically meaningful but worth knowing",
      "Statin monitoring (LFTs, CK if symptomatic) doesn't require any change specifically due to semaglutide",
    ],
  },
  {
    id: "bpc157",
    name: "BPC-157",
    aliases: ["body protection compound", "bpc"],
    category: "peptides",
    tier: "watch",
    summary: "No established interaction — GI protective effects of BPC-157 may theoretically help with semaglutide GI side effects, but this is entirely anecdotal",
    mitigation: [
      "No pharmacological interaction between BPC-157 and semaglutide is established",
      "Community anecdotes suggest BPC-157 may help with GI tolerability on GLP-1 drugs — this is anecdotal, not clinically studied",
      "Verify peptide source quality independently — BPC-157 is research-grade only",
    ],
  },

  // ── LOWS ──
  {
    id: "vitamin-d",
    name: "Vitamin D",
    aliases: ["cholecalciferol", "ergocalciferol"],
    category: "supplements",
    tier: "low",
    summary: "No direct interaction — fat-soluble vitamin, take with a small fat-containing meal for absorption",
    mitigation: [
      "No pharmacological interaction with semaglutide",
      "Fat-soluble vitamins (D, A, E, K) should be taken with food containing some fat for absorption — semaglutide's effect on appetite doesn't interfere with this",
    ],
  },
  {
    id: "magnesium",
    name: "Magnesium",
    aliases: ["mag glycinate", "mag citrate", "magnesium oxide"],
    category: "supplements",
    tier: "low",
    summary: "No direct interaction — magnesium citrate has mild laxative effect, which may help with semaglutide-related constipation",
    mitigation: [
      "No pharmacological interaction with semaglutide",
      "Magnesium citrate in particular may help with constipation — a common semaglutide side effect — at standard supplement doses",
    ],
  },
  {
    id: "protein-supplements",
    name: "Protein supplements (whey, casein, plant protein)",
    aliases: ["protein powder", "whey protein", "casein", "collagen", "pea protein"],
    category: "supplements",
    tier: "low",
    summary: "Not an interaction — actively recommended to meet protein targets when appetite is suppressed",
    mitigation: [
      "No interaction. Protein supplementation is encouraged on semaglutide to meet protein targets when appetite suppression reduces food intake",
      "Liquid protein (shakes) may be better tolerated than solid protein during periods of high nausea",
    ],
  },
  {
    id: "caffeine",
    name: "Caffeine (coffee, tea, energy drinks)",
    aliases: ["coffee", "tea", "energy drinks", "espresso"],
    category: "stimulants",
    tier: "low",
    summary: "No direct pharmacological interaction — but caffeine on an empty stomach may worsen GI symptoms during semaglutide titration",
    mitigation: [
      "No pharmacological interaction with semaglutide",
      "Caffeine on an empty stomach can worsen nausea and GI discomfort — common during semaglutide titration periods",
      "Coffee with small food intake is better tolerated than coffee alone during early titration",
    ],
  },
  {
    id: "berberine",
    name: "Berberine",
    aliases: [],
    category: "supplements",
    tier: "low",
    summary: "Additive glucose-lowering — low risk of clinically significant hypoglycemia unless combined with insulin or sulfonylureas",
    mitigation: [
      "Berberine has modest glucose-lowering activity via AMPK — additive with semaglutide but unlikely to cause clinically significant hypoglycemia in non-diabetic users",
      "In T2D context on other medications: the additive glucose-lowering is another layer to monitor",
    ],
  },
  {
    id: "cannabis",
    name: "Cannabis / THC",
    aliases: ["marijuana", "weed", "THC", "CBD", "edibles"],
    category: "recreational",
    tier: "low",
    summary: "Appetite-stimulating effect of THC directly counteracts semaglutide's appetite suppression — reduces weight management efficacy",
    mitigation: [
      "No pharmacological interaction, but THC stimulates appetite through CB1 receptor pathways — this directly competes with semaglutide's appetite suppression",
      "Heavy or regular cannabis use may meaningfully reduce semaglutide's weight management efficacy",
    ],
  },
  {
    id: "retatrutide",
    name: "Retatrutide",
    aliases: ["LY3437943"],
    category: "peptides",
    tier: "low",
    summary: "Same class (GLP-1 agonist component) — do not combine; switching from semaglutide to retatrutide requires a proper transition",
    mitigation: [
      "Retatrutide contains GLP-1R agonism — do not run concurrently with semaglutide",
      "Switching to retatrutide from semaglutide requires coordination with a physician — not a simple swap",
    ],
  },
];

const CATEGORY_LABELS: Record<Category, string> = {
  medications:  "Medications",
  supplements:  "Supplements",
  stimulants:   "Stimulants",
  recreational: "Recreational",
  peptides:     "Peptides",
};

const TIER_CONFIG = {
  flag:  { label: "Stop signal",     bg: "rgba(158,56,0,0.09)",  border: "rgba(158,56,0,0.22)",  dot: "#9e3800", text: "#9e3800" },
  watch: { label: "Worth watching",  bg: "rgba(124,82,0,0.07)",  border: "rgba(124,82,0,0.18)",  dot: "#7c5200", text: "#7c5200" },
  low:   { label: "Low concern",     bg: "rgba(21,100,58,0.06)", border: "rgba(21,100,58,0.15)", dot: "#155e38", text: "#155e38" },
};

export default function SemaglutideInteractionsPanel() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return INTERACTIONS.filter((e) => {
      const matchesCategory = activeCategory === "all" || e.category === activeCategory;
      const matchesQuery =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.aliases.some((a) => a.toLowerCase().includes(q)) ||
        e.summary.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: INTERACTIONS.length };
    for (const e of INTERACTIONS) {
      counts[e.category] = (counts[e.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="reta-interactions">

      {/* ── Header ── */}
      <div className="reta-interactions__header">
        <div className="reta-interactions__header-note">
          Semaglutide&apos;s interaction profile is the most well-characterized of the GLP-1 class — years of post-market surveillance and large clinical trials have populated a clear picture. The primary flags are insulin/sulfonylureas (hypoglycemia), other GLP-1 drugs (duplication), and narrow therapeutic index oral medications (absorption timing). The GI additive interactions are common and manageable.
        </div>
      </div>

      {/* ── Search ── */}
      <div className="reta-interactions__search-row">
        <input
          className="reta-interactions__search"
          type="text"
          placeholder="Search interactions (e.g. insulin, metformin, alcohol…)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* ── Category filters ── */}
      <div className="reta-interactions__cats">
        {(["all", ...Object.keys(CATEGORY_LABELS)] as (Category | "all")[]).map((cat) => (
          <button
            key={cat}
            className={`reta-interactions__cat${activeCategory === cat ? " reta-interactions__cat--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === "all" ? "All" : CATEGORY_LABELS[cat as Category]}
            <span className="reta-interactions__cat-count">{categoryCounts[cat] ?? 0}</span>
          </button>
        ))}
      </div>

      {/* ── Entries ── */}
      <div className="reta-interactions__list">
        {filtered.length === 0 && (
          <div className="reta-interactions__empty">No interactions match your search.</div>
        )}
        {filtered.map((e) => {
          const tc = TIER_CONFIG[e.tier];
          return (
            <div
              key={e.id}
              className="reta-interactions__entry"
              style={{ background: tc.bg, border: `1px solid ${tc.border}` }}
            >
              <div className="reta-interactions__entry-top">
                <div className="reta-interactions__entry-name">{e.name}</div>
                <span
                  className="reta-interactions__entry-tier"
                  style={{ color: tc.text, borderColor: tc.border }}
                >
                  <span style={{ color: tc.dot }}>●</span> {tc.label}
                </span>
              </div>
              {e.aliases.length > 0 && (
                <div className="reta-interactions__entry-aliases">
                  Also known as: {e.aliases.join(", ")}
                </div>
              )}
              <div className="reta-interactions__entry-summary">{e.summary}</div>
              <ul className="reta-interactions__entry-mitigation">
                {e.mitigation.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

    </div>
  );
}
