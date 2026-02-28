"use client";

/**
 * SomatostatinInteractionsPanel — interaction intelligence for Somatostatin (SRIF).
 * Key frame: insulin/hypoglycemic agents are the hardest stop due to the glucagon
 * counter-regulatory impairment; beta-blockers and other cardiac agents interact
 * via SSTR cardiac effects; GH secretagogues are the opposite-direction interaction.
 * Most interactions apply to analogs more than native somatostatin given the
 * 90-second half-life — but the mechanism applies to any SSTR activation.
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
    id: "insulin-hypoglycemics",
    name: "Insulin and hypoglycemic agents — insulin, sulfonylureas, GLP-1 agonists, SGLT2 inhibitors",
    aliases: ["insulin", "sulfonylurea", "glipizide", "glyburide", "glimepiride", "metformin", "GLP-1", "semaglutide", "liraglutide", "SGLT2", "empagliflozin", "dapagliflozin", "diabetes", "hypoglycemic", "blood sugar"],
    category: "Medications",
    tier: "flag",
    summary: "This is the most pharmacologically dangerous interaction for somatostatin compounds. Somatostatin inhibits glucagon secretion — glucagon is the primary counter-regulatory hormone that rescues the body from hypoglycemia. In someone already taking insulin or sulfonylureas (which can cause hypoglycemia), SSTR activation impairs the glucagon rescue response. The result: hypoglycemia that develops under somatostatin exposure loses its primary physiological rescue mechanism. Additionally, somatostatin inhibits insulin itself — in euglycemia, this can cause hyperglycemia, which then leads to reactive hypoglycemia when somatostatin clears. The net glucose effect is unpredictable and context-dependent. This interaction is the same reason octreotide use in diabetics requires specialist monitoring.",
    mitigation: [
      "On insulin (type 1 or 2 diabetes): do not use any somatostatin compound without explicit endocrinology oversight — the glucagon counter-regulatory impairment during hypoglycemia is a documented, serious risk",
      "On sulfonylureas (glipizide, glyburide, glimepiride): same concern — sulfonylureas can independently cause hypoglycemia, and somatostatin removes the glucagon rescue signal",
      "On GLP-1 agonists: GLP-1 agonists also suppress glucagon — somatostatin adds a second layer of glucagon suppression; the combined effect on counter-regulatory responses is uncharacterized",
      "Continuous glucose monitoring (CGM) is essential if any somatostatin analog is used alongside glucose-lowering therapy — glucose can swing in either direction",
    ],
  },
  {
    id: "cyclosporine",
    name: "Cyclosporine (and other calcineurin inhibitors)",
    aliases: ["cyclosporine", "ciclosporin", "Sandimmune", "Neoral", "tacrolimus", "Prograf", "calcineurin inhibitor", "transplant medication"],
    category: "Medications",
    tier: "watch",
    summary: "Somatostatin analogs (octreotide primarily) reduce cyclosporine absorption from the GI tract by approximately 30% through effects on GI motility and bile secretion. This interaction is documented in transplant patients on octreotide for GI complications and has caused subtherapeutic cyclosporine levels and acute rejection episodes. For native somatostatin with a 90-second half-life, acute GI absorption effects would be transient and unlikely to cause significant cyclosporine level changes. The interaction is documented for analogs but the mechanism applies to any SSTR2-mediated GI motility inhibition.",
    mitigation: [
      "On cyclosporine for organ transplant: do not use any somatostatin analog without transplant team oversight — subtherapeutic cyclosporine from reduced absorption has caused rejection in documented cases",
      "If octreotide or another analog is required in a transplant patient, cyclosporine levels must be monitored more frequently and doses adjusted",
      "For native somatostatin: the interaction risk is lower due to the half-life, but any combined use should be disclosed to the transplant team",
    ],
  },
  {
    id: "beta-blockers",
    name: "Beta-blockers — metoprolol, atenolol, propranolol, carvedilol",
    aliases: ["beta-blocker", "metoprolol", "atenolol", "propranolol", "carvedilol", "bisoprolol", "Lopressor", "Toprol", "Tenormin", "Coreg"],
    category: "Medications",
    tier: "watch",
    summary: "Beta-blockers impair the cardiac response to hypoglycemia by blunting tachycardia (the main symptom alerting patients to low blood sugar) and also impair glycogenolysis (a counter-regulatory response to hypoglycemia). Combined with somatostatin's impairment of glucagon counter-regulation, a patient on both a beta-blocker and a somatostatin compound has two of the three physiological responses to hypoglycemia impaired. The cardiac effect of somatostatin (bradycardia via SSTR cardiac receptors) also adds to the bradycardic effect of beta-blockers. This stacking of bradycardic mechanisms requires caution particularly in patients with baseline conduction issues.",
    mitigation: [
      "On beta-blockers for hypertension or cardiac indications with any glucose-lowering medication: the combination of somatostatin + beta-blocker + hypoglycemic agent creates triple impairment of hypoglycemia response — requires endocrinology and cardiology oversight",
      "Monitor resting heart rate when combining somatostatin analog with beta-blocker — additive bradycardia from two different mechanisms",
      "Any symptoms of hypoglycemia (shakiness, confusion, anxiety) may be masked by beta-blocker-induced blunting of tachycardia; CGM is important in this combination",
    ],
  },
  {
    id: "gh-secretagogues",
    name: "GH secretagogues — ipamorelin, CJC-1295, sermorelin, GHRP-6, MK-677",
    aliases: ["ipamorelin", "CJC-1295", "sermorelin", "GHRP-6", "GHRP-2", "MK-677", "ibutamoren", "GH secretagogue", "growth hormone", "GHRH", "GHRP"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "GH secretagogues stimulate GH release by activating GHRH receptors or ghrelin receptors — the exact opposite direction from somatostatin's SSTR-mediated GH suppression. In theory, using somatostatin to 'clear' or 'sensitize' the GH axis before a GH secretagogue pulse has been discussed in community circles. This concept has some basis in pulsatile GH physiology (GH pulses are triggered by somatostatin withdrawal), but using native somatostatin subcutaneously to time this effect is pharmacokinetically irrational. If somatostatin is cleared in 90 seconds, any timing protocol based on subcutaneous injection cannot be reliably controlled.",
    mitigation: [
      "Do not attempt somatostatin + GH secretagogue stacking with subcutaneous native somatostatin — the pharmacokinetics do not support any rational timing protocol",
      "The physiological insight (somatostatin withdrawal triggers GH pulses) is real, but it cannot be operationalized with native somatostatin by subcutaneous injection",
      "Any combined GH axis intervention should involve octreotide (not native somatostatin) if SSTR modulation is the goal, and should be done under physician supervision with IGF-1 monitoring",
    ],
  },
  {
    id: "thyroid-medications",
    name: "Thyroid medications — levothyroxine, methimazole, PTU",
    aliases: ["levothyroxine", "synthroid", "methimazole", "propylthiouracil", "PTU", "thyroid", "hypothyroid", "hyperthyroid", "T4", "T3"],
    category: "Medications",
    tier: "watch",
    summary: "Somatostatin inhibits TSH secretion from the pituitary, which reduces the drive to thyroid hormone production. In people with hypothyroidism on levothyroxine replacement, TSH suppression by somatostatin could interfere with TSH-based monitoring of levothyroxine dosing. In hyperthyroid patients, the TSH-suppressing effect of somatostatin overlaps with the existing TSH suppression from excess thyroid hormones, making monitoring more complex. This is a documented analog class effect; native somatostatin's half-life limits the duration of the TSH effect.",
    mitigation: [
      "On levothyroxine for hypothyroidism: any somatostatin analog use should be disclosed to the treating endocrinologist — TSH monitoring may need to be adjusted",
      "For native somatostatin: the TSH effect is transient (half-life 90 seconds) and unlikely to cause meaningful thyroid axis disruption from community dosing",
      "For analog use: baseline and periodic thyroid function panels (TSH, Free T4) are appropriate",
    ],
  },
  {
    id: "standard-supplements",
    name: "Standard supplements — vitamins, magnesium, zinc, omega-3",
    aliases: ["vitamin", "multivitamin", "magnesium", "zinc", "omega-3", "fish oil", "supplement"],
    category: "Supplements",
    tier: "low",
    summary: "No meaningful interactions between native somatostatin and standard supplements are anticipated. The mechanism of somatostatin (Gi-coupled SSTR inhibitory signaling) does not directly interact with common supplements. The brief half-life of native somatostatin further limits any potential for interaction during the exposure window.",
    mitigation: [
      "No adverse interaction between somatostatin and standard supplements",
      "Standard supplement regimens can be continued without modification based on somatostatin use",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function SomatostatinInteractionsPanel() {
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
        Somatostatin&apos;s interactions are driven by its pharmacodynamics — SSTR-mediated inhibition of insulin, glucagon, GH, TSH, and GI secretions. Insulin and hypoglycemic agents are the hardest stop: somatostatin removes the glucagon counter-regulatory response to hypoglycemia, creating a documented, serious risk. Beta-blockers compound this by blunting additional counter-regulatory responses and adding bradycardic effects. GH secretagogues work in the opposite direction. Most interactions apply more severely to long-acting analogs than native somatostatin given the 90-second half-life — but the mechanism is the same.
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
