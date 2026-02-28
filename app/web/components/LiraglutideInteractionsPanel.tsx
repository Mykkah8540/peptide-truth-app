"use client";

/**
 * LiraglutideInteractionsPanel — interaction intelligence for Liraglutide.
 * Key frame: same class interaction profile as semaglutide and tirzepatide.
 * Glucose-lowering combination risk (insulin, sulfonylureas), oral medication
 * absorption timing (gastric emptying effect), thyroid/MEN2 history screening.
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
    category: "Diabetes Medications",
    tier: "flag",
    summary: "Additive hypoglycemia risk. Liraglutide augments glucose-dependent insulin secretion; combining with exogenous insulin adds a glucose-independent insulin source. The combined glucose-lowering effect can produce hypoglycemia, particularly when food intake is reduced by appetite suppression.",
    mitigation: [
      "Insulin dose reduction is typically required when adding liraglutide — this is a physician-managed transition, not a self-management adjustment",
      "Self-monitoring of blood glucose (SMBG) multiple times daily during the transition period is the minimum",
      "Know hypoglycemia symptoms: shakiness, sweating, confusion, rapid heart rate — and have fast-acting glucose available",
    ],
  },
  {
    id: "sulfonylureas",
    name: "Sulfonylureas",
    aliases: ["glipizide", "glyburide", "glimepiride", "Glucotrol", "DiaBeta", "Amaryl"],
    category: "Diabetes Medications",
    tier: "flag",
    summary: "Additive hypoglycemia. Sulfonylureas force insulin secretion regardless of blood glucose level. When combined with liraglutide (which also augments insulin response), the combination lowers glucose more than either alone and increases hypoglycemia risk.",
    mitigation: [
      "Sulfonylurea dose reduction is standard when adding liraglutide — physician adjustment required",
      "Monitor blood glucose regularly during the combination period",
      "The combination is clinically managed when prescribed together — self-management of this combination is not appropriate",
    ],
  },
  {
    id: "other-glp1",
    name: "Other GLP-1 receptor agonists (semaglutide, exenatide, dulaglutide, albiglutide)",
    aliases: ["semaglutide", "Ozempic", "Wegovy", "exenatide", "Byetta", "Bydureon", "dulaglutide", "Trulicity", "albiglutide", "Tanzeum"],
    category: "Diabetes Medications",
    tier: "flag",
    summary: "Do not combine GLP-1 agonists. Using two GLP-1R agonists simultaneously provides no additional benefit and significantly amplifies GI side effects (nausea, vomiting, diarrhea). This is a pharmacological redundancy, not a stack.",
    mitigation: [
      "Never combine liraglutide with another GLP-1 agonist simultaneously",
      "When switching between GLP-1 agents: follow prescribing physician's transition instructions; typically requires a wash-out period",
    ],
  },
  {
    id: "oral-meds-narrow-ti",
    name: "Oral medications with narrow therapeutic index",
    aliases: ["warfarin", "levothyroxine", "cyclosporine", "digoxin", "phenytoin", "lithium", "thyroid", "blood thinner"],
    category: "Drug Interactions",
    tier: "flag",
    summary: "Liraglutide slows gastric emptying, which alters the absorption timing and potentially the peak concentration of oral medications. For drugs with narrow therapeutic windows (warfarin, levothyroxine, cyclosporine, digoxin), delayed absorption can mean clinical differences in drug effect.",
    mitigation: [
      "Notify your prescribing physicians about liraglutide when you're on narrow therapeutic index drugs",
      "Warfarin: more frequent INR monitoring during liraglutide initiation and dose changes",
      "Levothyroxine: TSH monitoring on schedule — liraglutide does not block absorption but may alter timing",
      "Take time-sensitive medications at consistent times relative to liraglutide injections",
    ],
  },
  {
    id: "pregnancy",
    name: "Pregnancy",
    aliases: ["pregnant", "pregnancy", "breastfeeding", "nursing", "lactation"],
    category: "Reproductive",
    tier: "flag",
    summary: "Absolute contraindication. Liraglutide is teratogenic in animal models. It must be discontinued before conception (or immediately upon discovering pregnancy) and is contraindicated during breastfeeding due to unknown transfer to breast milk.",
    mitigation: [
      "If planning pregnancy: discuss liraglutide discontinuation timeline with prescribing physician; a wash-out period before conception is recommended",
      "If pregnant: stop immediately and notify your OB",
      "Effective contraception is required during liraglutide treatment in people of reproductive potential who are not planning pregnancy",
    ],
  },
  {
    id: "metformin",
    name: "Metformin",
    aliases: ["metformin", "Glucophage", "Fortamet", "Glumetza", "Riomet"],
    category: "Diabetes Medications",
    tier: "watch",
    summary: "The most common clinical combination with liraglutide — generally well-tolerated with complementary mechanisms. Metformin reduces hepatic glucose output; liraglutide augments glucose-dependent insulin secretion and reduces appetite. No significant additive hypoglycemia risk (neither causes hypoglycemia as a single agent in most contexts). GI side effects may be additive.",
    mitigation: [
      "GI side effects (nausea, diarrhea) are common with both drugs — staggering the timing or starting one at a time helps establish which drug is causing what",
      "Hypoglycemia risk with metformin + liraglutide alone (no insulin or sulfonylurea) is low but not zero — monitor glucose if any concerning symptoms",
    ],
  },
  {
    id: "oral-contraceptives",
    name: "Oral contraceptives",
    aliases: ["birth control pill", "oral contraceptive", "OCP", "estrogen", "progesterone", "combined pill"],
    category: "Drug Interactions",
    tier: "watch",
    summary: "Gastric emptying effects from liraglutide can potentially alter oral contraceptive absorption timing. Studies show the overall absorption (AUC) is not significantly affected, but peak concentration may be shifted. Contraceptive efficacy is not expected to be meaningfully compromised, but awareness is appropriate.",
    mitigation: [
      "For maximum confidence in contraceptive efficacy during liraglutide treatment: oral contraceptive effectiveness is not expected to be significantly reduced, but discussing with your prescribing physician is appropriate",
      "If breakthrough bleeding or other contraceptive concerns arise, evaluate contraceptive method",
    ],
  },
  {
    id: "nsaids",
    name: "NSAIDs (ibuprofen, naproxen, aspirin at anti-inflammatory doses)",
    aliases: ["ibuprofen", "Advil", "Motrin", "naproxen", "Aleve", "aspirin", "NSAID", "anti-inflammatory"],
    category: "Over-the-Counter",
    tier: "watch",
    summary: "NSAIDs can increase GI irritation risk (gastric mucosa); liraglutide's GI side effect profile adds GI stress in the same direction. Occasional NSAID use is generally manageable; regular NSAID use during liraglutide treatment deserves attention given the overlapping GI burden.",
    mitigation: [
      "Occasional NSAID use during liraglutide treatment is generally fine — the GI risk is not dramatically amplified by single doses",
      "Chronic NSAID use: consider discussing gastroprotective options (proton pump inhibitor) with your physician",
      "If NSAID use is causing worsening GI symptoms during liraglutide: discuss alternatives with your physician",
    ],
  },
  {
    id: "sglt2-inhibitors",
    name: "SGLT2 inhibitors (empagliflozin, dapagliflozin, canagliflozin)",
    aliases: ["empagliflozin", "Jardiance", "dapagliflozin", "Farxiga", "canagliflozin", "Invokana", "SGLT2"],
    category: "Diabetes Medications",
    tier: "watch",
    summary: "A commonly used combination in T2D — complementary mechanisms with generally manageable safety profile. SGLT2 inhibitors increase urinary glucose excretion; liraglutide enhances glucose-dependent insulin secretion. The combination can be more effective for HbA1c reduction than either alone. Hypoglycemia risk is low when combined (without insulin or sulfonylurea), but dehydration risk with SGLT2 inhibitors + liraglutide-mediated appetite suppression may compound.",
    mitigation: [
      "Hydration is the key management variable: liraglutide reduces intake, SGLT2 inhibitors cause urinary fluid loss — both push toward dehydration",
      "If on this combination: monitor hydration status, especially in hot weather or during exercise",
      "DKA risk with SGLT2 inhibitors is low in T2D but exists; liraglutide doesn't add to this risk, but be aware of the DKA symptoms if on the combination",
    ],
  },
  {
    id: "alcohol",
    name: "Alcohol",
    aliases: ["alcohol", "ethanol", "drinking", "beer", "wine", "spirits"],
    category: "Lifestyle",
    tier: "watch",
    summary: "Alcohol adds to the nausea and GI side effect burden from liraglutide, particularly during the titration phase. Alcohol also contributes to hypoglycemia in people on glucose-lowering medications by impairing hepatic gluconeogenesis. The practical interaction is manageable for moderate alcohol use; heavy use amplifies both concerns.",
    mitigation: [
      "During the titration phase (weeks 1-5): alcohol is likely to significantly worsen nausea — this is the period to reduce alcohol use most",
      "On insulin or sulfonylurea + liraglutide: alcohol amplifies hypoglycemia risk — monitor glucose and don't drink on an empty stomach",
      "Moderate alcohol use after the titration phase: manageable for most people; appetite suppression may make alcohol effects more pronounced per drink",
    ],
  },
  {
    id: "protein-supplements",
    name: "Protein supplements",
    aliases: ["whey protein", "casein", "protein powder", "protein shake", "amino acids", "EAAs"],
    category: "Supplements",
    tier: "low",
    summary: "Actively complements liraglutide treatment. The primary dietary challenge on liraglutide is maintaining adequate protein when total appetite is suppressed. Protein supplements help hit protein targets (1.2-1.6g/kg) when whole food meals feel unappealing.",
    mitigation: [
      "Protein supplementation is a positive behavior during liraglutide treatment — no adverse interaction",
      "Whey protein consumed with meals may slightly augment the GLP-1 response (protein is a GLP-1 secretagogue) — complementary to the drug mechanism",
    ],
  },
  {
    id: "fiber-supplements",
    name: "Fiber supplements (psyllium, methylcellulose, inulin)",
    aliases: ["fiber", "psyllium", "Metamucil", "methylcellulose", "Citrucel", "inulin", "prebiotic fiber"],
    category: "Supplements",
    tier: "low",
    summary: "Complements liraglutide's GI side effect management. Constipation is a common liraglutide side effect; soluble fiber supplementation supports bowel regularity. No pharmacokinetic interaction of concern.",
    mitigation: [
      "Take fiber supplements with adequate water — fiber without hydration worsens constipation",
      "No timing concern with liraglutide injections",
    ],
  },
  {
    id: "berberine",
    name: "Berberine",
    aliases: ["berberine", "berberine HCl"],
    category: "Supplements",
    tier: "low",
    summary: "Additive glucose-lowering effects — modest but real. Berberine activates AMPK (similar to metformin's mechanism) and reduces hepatic glucose output. The combination with liraglutide produces additive glucose lowering. For people using berberine at meaningful doses (500-1000mg/day), the combined effect is worth monitoring if glucose symptoms arise.",
    mitigation: [
      "Monitor glucose if using berberine at significant doses alongside liraglutide — the additive effect is real but usually modest in non-diabetic people",
      "If using berberine for T2D-adjacent metabolic reasons alongside liraglutide: discuss with prescribing physician",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function LiraglutideInteractionsPanel() {
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
        Liraglutide&apos;s interaction profile is the same class as semaglutide and tirzepatide. The two primary risk categories: (1) glucose-lowering drug combinations that increase hypoglycemia risk (insulin, sulfonylureas) — physician-managed, not self-managed; and (2) oral medication absorption timing changes from gastric emptying slowing (warfarin, levothyroxine, cyclosporine deserve explicit attention).
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
