"use client";

/**
 * GlucagonInteractionsPanel — interaction intelligence for Glucagon.
 * Key frame: beta-blockers and CCBs are specifically treated with glucagon in overdose
 * (the interaction is the therapeutic use); insulin is counter-regulatory (both
 * for hypoglycemia physiology and rescue context); warfarin levels are enhanced at
 * pharmacological glucagon doses. Most medications have no clinically relevant
 * interaction with glucagon in its rescue context.
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
    id: "beta-blockers-ccb",
    name: "Beta-blockers and calcium channel blockers — glucagon is specifically the antidote in overdose",
    aliases: ["beta-blocker", "metoprolol", "Lopressor", "atenolol", "propranolol", "Inderal", "carvedilol", "Coreg", "labetalol", "bisoprolol", "calcium channel blocker", "CCB", "amlodipine", "Norvasc", "diltiazem", "Cardizem", "verapamil", "Calan", "nifedipine"],
    category: "Medications",
    tier: "flag",
    summary: "Glucagon is specifically used to treat beta-blocker and calcium channel blocker overdose — the interaction is the clinical indication, not a hazard to avoid. In beta-blocker overdose: heart rate and contractility fall due to blocked adrenergic signaling. Glucagon generates cardiac cAMP through GCGR, bypassing the beta-receptor blockade and restoring cardiac function. The 'flag' tier is used here because the combination is clinically significant and requires physician management — not because it should be avoided, but because using glucagon in the presence of these agents is the high-stakes emergency context where the interaction is actively exploited. For community users: if you take beta-blockers or CCBs at therapeutic doses, glucagon is not relevant to your daily medications — this interaction is only important in overdose toxicology.",
    mitigation: [
      "This interaction is the therapeutic use of glucagon — in beta-blocker or CCB overdose, glucagon (1-10 mg IV) is a standard antidote component",
      "Community context: if you take beta-blockers or CCBs at prescribed therapeutic doses, there is no relevant glucagon interaction in daily life — glucagon rescue kits are still appropriate to have if you use insulin",
      "In overdose management: glucagon dose requirement may be higher than rescue doses due to the competing cardiac effects; continuous infusion is often needed after the initial bolus",
      "High-dose insulin euglycemic therapy is an emerging alternative to glucagon for beta-blocker/CCB overdose with comparable or potentially superior evidence — discuss with toxicology/ICU team",
    ],
  },
  {
    id: "insulin",
    name: "Insulin — counter-regulatory; glucagon restores glucose when insulin causes hypoglycemia",
    aliases: ["insulin", "rapid-acting insulin", "basal insulin", "Novolog", "Humalog", "Apidra", "Fiasp", "Levemir", "Lantus", "Basaglar", "Tresiba", "Toujeo"],
    category: "Medications",
    tier: "watch",
    summary: "Insulin and glucagon are the principal counter-regulatory pair in glucose homeostasis. In the context of glucagon rescue kits: insulin-induced hypoglycemia is the primary scenario requiring glucagon rescue. The interaction between insulin and glucagon is physiological and therapeutic: too much insulin → hypoglycemia → glucagon rescue raises glucose. After glucagon rescue, the patient still has insulin on board (the hypoglycemia-causing dose is still present); blood glucose rises with glucagon, then may re-fall as glucagon's effect wanes and insulin continues acting. This dynamic requires careful post-rescue glucose monitoring and carbohydrate administration.",
    mitigation: [
      "Every insulin user should have a glucagon rescue kit — the insulin-glucagon interaction in hypoglycemia rescue is the primary clinical use case",
      "After glucagon rescue: give oral carbohydrates once the patient is conscious; monitor blood glucose every 15-30 minutes for potential re-hypoglycemia as glucagon effect wanes",
      "Do not give a correction insulin dose immediately after rescue — wait until blood glucose is clearly rising and stabilized before assessing correction needs",
      "Call emergency services after any glucagon rescue — IV glucose may be needed if re-hypoglycemia occurs",
    ],
  },
  {
    id: "warfarin",
    name: "Warfarin — glucagon enhances anticoagulant effect at pharmacological doses",
    aliases: ["warfarin", "Coumadin", "anticoagulant", "blood thinner", "INR"],
    category: "Medications",
    tier: "watch",
    summary: "At pharmacological doses used for beta-blocker/CCB overdose management or GI radiology (not typical rescue doses), glucagon has been reported to enhance the anticoagulant effect of warfarin, potentially increasing INR. The mechanism is not fully characterized — possible CYP2C9 or albumin binding interactions. For the emergency rescue dose (1 mg), this interaction is unlikely to be clinically significant during the acute emergency. It becomes relevant if glucagon is being used as a continuous infusion (overdose management) in a warfarin-anticoagulated patient.",
    mitigation: [
      "For a single rescue dose: no clinically relevant warfarin interaction in the acute setting",
      "For continuous glucagon infusion (overdose management): monitor INR and consider warfarin dose adjustment if glucagon infusion extends beyond 24-48 hours",
      "Alert the clinical team to concurrent warfarin use in any patient requiring prolonged glucagon infusion",
    ],
  },
  {
    id: "sulfonylureas",
    name: "Sulfonylureas — insulin secretagogues; hypoglycemia risk context",
    aliases: ["sulfonylurea", "glipizide", "Glucotrol", "glimepiride", "Amaryl", "glyburide", "Diabeta", "Micronase", "chlorpropamide"],
    category: "Medications",
    tier: "watch",
    summary: "Sulfonylureas stimulate pancreatic insulin secretion independently of blood glucose — causing hypoglycemia risk similar to (but pharmacologically distinct from) insulin. Glucagon rescue kits are relevant for sulfonylurea-induced severe hypoglycemia, but the response may differ from insulin-induced hypoglycemia: sulfonylureas continue stimulating insulin secretion after glucagon rescue raises glucose, potentially causing re-hypoglycemia faster than after insulin-induced hypoglycemia. The glucose-raising effect of glucagon may be blunted by the concurrent insulin secretion driven by the sulfonylurea.",
    mitigation: [
      "Glucagon rescue kits are appropriate for people on sulfonylureas at risk for severe hypoglycemia — same availability and training advice applies",
      "Post-rescue monitoring is particularly important with sulfonylurea-induced hypoglycemia — re-hypoglycemia can occur as the sulfonylurea continues stimulating insulin secretion",
      "Sulfonylurea-induced hypoglycemia often requires sustained glucose administration (continuous IV dextrose) in addition to glucagon rescue — emergency medical services are important to contact",
    ],
  },
  {
    id: "glp1-agonists",
    name: "GLP-1 receptor agonists — semaglutide, liraglutide, dulaglutide, exenatide",
    aliases: ["GLP-1", "semaglutide", "Ozempic", "Wegovy", "liraglutide", "Victoza", "Saxenda", "dulaglutide", "Trulicity", "exenatide", "Byetta", "Bydureon", "tirzepatide", "Mounjaro", "retatrutide"],
    category: "Medications",
    tier: "low",
    summary: "GLP-1 receptor agonists suppress endogenous glucagon secretion from pancreatic alpha cells — this is part of their glucose-lowering mechanism. When a GLP-1 agonist user becomes severely hypoglycemic (e.g., if also using insulin), the normal alpha-cell glucagon counter-regulatory response may be blunted by the GLP-1 drug. This means GLP-1 agonist users who also use insulin have a doubly relevant reason to maintain glucagon rescue kits: the natural counter-regulatory glucagon response may be suppressed, and exogenous glucagon rescue becomes even more important. The interaction does not prevent glucagon rescue from working — exogenous glucagon still activates hepatic GCGR and raises glucose; it is the endogenous response that is blunted.",
    mitigation: [
      "If you use a GLP-1 agonist AND insulin: maintain glucagon rescue kit — the GLP-1 drug's suppression of endogenous glucagon makes exogenous rescue potentially more important, not less",
      "Exogenous glucagon rescue kits work independently of GLP-1 agonist effects — the rescue uses direct GCGR activation at the liver, which is not affected by GLP-1-mediated alpha-cell suppression",
    ],
  },
  {
    id: "standard-supplements",
    name: "Standard supplements — vitamins, minerals, protein, creatine",
    aliases: ["supplement", "vitamin", "mineral", "protein powder", "creatine", "magnesium", "zinc", "omega-3", "fish oil"],
    category: "Supplements",
    tier: "low",
    summary: "No clinically relevant interactions between glucagon rescue kits and standard supplements. Glucagon is an acute-use rescue medication, not a chronically administered compound — the concept of supplement interactions with glucagon is not clinically meaningful in the rescue context. Standard supplements do not affect hepatic GCGR signaling or glucagon's glucose-raising mechanism.",
    mitigation: [
      "No adverse interactions between glucagon rescue and standard supplements",
      "Glucagon rescue kits should be available regardless of what supplements are being used",
    ],
  },
  {
    id: "epinephrine",
    name: "Epinephrine (adrenaline) — additive glucose-raising and cardiovascular effects",
    aliases: ["epinephrine", "adrenaline", "EpiPen", "epinephrine auto-injector"],
    category: "Medications",
    tier: "low",
    summary: "Epinephrine and glucagon both raise blood glucose (epinephrine through hepatic glycogenolysis via alpha and beta-adrenergic receptors; glucagon through GCGR). In anaphylaxis management, epinephrine is the first-line drug. If a patient with anaphylaxis also has severe hypoglycemia requiring glucagon rescue, the additive glucose-raising effect of both compounds is relevant — but post-rescue hyperglycemia is manageable, and the acute emergencies take priority. No harmful pharmacodynamic interaction; additive effects are expected but manageable.",
    mitigation: [
      "In the context of simultaneous anaphylaxis and hypoglycemia: treat both emergencies with appropriate agents (epinephrine for anaphylaxis, glucagon for hypoglycemia) — additive glucose-raising is a manageable consequence",
      "No adverse interaction beyond expected additive glucose elevation; post-management glucose monitoring applies",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function GlucagonInteractionsPanel() {
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
        Glucagon&apos;s interactions are primarily pharmacological education: beta-blockers and CCBs are specifically treated with glucagon in overdose (the interaction is the indication). Insulin is counter-regulatory and the primary hypoglycemia rescue context. GLP-1 agonists suppress endogenous glucagon, making rescue kits more important for insulin users on GLP-1 drugs. Warfarin requires monitoring with prolonged glucagon infusions. Standard supplements and most medications have no clinically relevant interaction with glucagon rescue kits.
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
