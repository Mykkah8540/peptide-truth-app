"use client";

import { useState, useMemo } from "react";

/**
 * OctreotideInteractionsPanel — interaction intelligence for Octreotide (Sandostatin).
 * Key concerns: cyclosporine (reduced absorption), insulin/antidiabetics (glucose effects),
 * bromocriptine (additive GH suppression), GH secretagogues (pharmacological opposition).
 * Well-characterized interaction profile given the FDA-approved status.
 */

type Tier = "flag" | "watch" | "low";

type Entry = {
  name: string;
  tier: Tier;
  detail: string;
  why: string;
  action: string;
};

const ENTRIES: Entry[] = [
  // ── WATCHES ──
  {
    name: "Cyclosporine (immunosuppressant)",
    tier: "watch",
    detail: "Reduced cyclosporine bioavailability \u2014 transplant rejection risk",
    why: "Octreotide reduces cyclosporine absorption from the GI tract, potentially by reducing intestinal motility and altering the absorptive window. This is a documented pharmacokinetic interaction that has caused subtherapeutic cyclosporine levels and transplant rejection in case reports. Cyclosporine has a narrow therapeutic index \u2014 even modest absorption changes have clinical consequences.",
    action: "If on cyclosporine (transplant immunosuppression): close cyclosporine level monitoring is mandatory when starting, adjusting, or stopping octreotide. Dose adjustment of cyclosporine may be required. Do not make changes without your transplant team\u2019s guidance.",
  },
  {
    name: "Insulin and oral antidiabetics (sulfonylureas, meglitinides, GLP-1 agonists)",
    tier: "watch",
    detail: "Bidirectional glucose effects \u2014 both hypoglycemia and hyperglycemia risk",
    why: "Octreotide suppresses both insulin and glucagon secretion via SSTR2/5. The net glycemic effect depends on which predominates in a given patient. In most non-acromegalic patients, insulin suppression causes hyperglycemia, requiring adjustment of antidiabetic doses. However, glucagon suppression can impair the counterregulatory response to hypoglycemia in patients on insulin or sulfonylureas. In acromegaly, normalizing GH/IGF-1 often improves insulin sensitivity, requiring antidiabetic dose reduction.",
    action: "Glucose monitoring is mandatory when initiating or adjusting octreotide in patients on any antidiabetic therapy. Both hypoglycemia (if antidiabetics not reduced as insulin sensitivity improves) and hyperglycemia (from insulin secretion suppression) are real risks. Work with your physician or endocrinologist to adjust the antidiabetic regimen.",
  },
  {
    name: "GH secretagogues (CJC-1295, ipamorelin, GHRP-2, GHRP-6, hexarelin, MK-677)",
    tier: "watch",
    detail: "Pharmacological opposition \u2014 octreotide suppresses GH release that secretagogues stimulate",
    why: "GH secretagogues stimulate GH release from pituitary somatotrophs by activating GHRH receptors (GHRH analogues like CJC-1295) or ghrelin/GHSR receptors (GHRPs, MK-677). Octreotide suppresses GH release at the pituitary via SSTR2 agonism. These are directly opposing mechanisms acting on the same endpoint. Using both simultaneously means one pharmacology is fighting the other \u2014 the net GH effect is unpredictable and you are creating opposing endocrine signals simultaneously.",
    action: "Do not combine. If you are using GH secretagogues for GH optimization and also considering octreotide for another purpose, discuss with your endocrinologist. The combination creates pharmacological opposition that serves neither goal.",
  },
  {
    name: "Bromocriptine (dopamine agonist, used in acromegaly and hyperprolactinemia)",
    tier: "watch",
    detail: "Additive GH suppression in acromegaly \u2014 combination sometimes used clinically",
    why: "Bromocriptine (and other dopamine agonists like cabergoline) suppresses GH in acromegaly via D2 receptor activation at pituitary somatotrophs. Octreotide suppresses GH via SSTR2. The combination has additive GH-suppressing effects and is sometimes used in octreotide-partial-responders in acromegaly. However, the combination also adds the adverse effect profiles of both: GI effects from both, potential hypotension from bromocriptine, cardiac valve effects from cabergoline.",
    action: "This combination is sometimes clinically appropriate in acromegaly under endocrinologist guidance. It is not appropriate for self-administration or for non-acromegaly indications. The combined adverse effect burden requires physician management.",
  },
  {
    name: "QT-prolonging medications (antiarrhythmics, some antipsychotics, certain antibiotics)",
    tier: "watch",
    detail: "Octreotide has cardiac conduction effects \u2014 additive QT prolongation potential",
    why: "Octreotide can prolong the QT interval and slow cardiac conduction (bradycardia, PR prolongation). Adding other QT-prolonging drugs increases the risk of ventricular arrhythmia. This is particularly relevant in patients on antiarrhythmics (amiodarone, sotalol), some antipsychotics (haloperidol, ziprasidone), fluoroquinolone antibiotics, or azole antifungals.",
    action: "Baseline ECG before initiating octreotide in patients on QT-prolonging medications. Ongoing cardiac monitoring if the combination is necessary. Avoid adding QT-prolonging drugs to octreotide without cardiology awareness.",
  },

  // ── LOWS ──
  {
    name: "Standard supplements (vitamins, minerals, omega-3)",
    tier: "low",
    detail: "No pharmacodynamic interaction with SSTR2/3/5 agonism pathway",
    why: "Standard supplements do not interact with the somatostatin receptor system. The relevant safety endpoints for octreotide (gallstones, glucose, cardiac) are not affected by standard supplements.",
    action: "No specific supplement interaction concern. Verify supplements independently.",
  },
  {
    name: "Levothyroxine (hypothyroidism management)",
    tier: "low",
    detail: "Octreotide suppresses TSH \u2014 may require levothyroxine dose adjustment",
    why: "TSH suppression by octreotide can reduce thyroid hormone production in patients with normal thyroid function or increase levothyroxine requirements in patients already on thyroid replacement. This is a mild interaction requiring thyroid function monitoring rather than a contraindication.",
    action: "Monitor TSH and free T4 during chronic octreotide therapy. Levothyroxine dose adjustment may be needed if hypothyroidism develops or worsens.",
  },
  {
    name: "Beta-blockers (for cardiac indications)",
    tier: "low",
    detail: "Additive bradycardia \u2014 generally mild but worth noting",
    why: "Both octreotide (somatostatin receptor effect on cardiac pacemaker cells) and beta-blockers reduce heart rate. The additive bradycardia is generally clinically insignificant in most patients but warrants baseline heart rate awareness.",
    action: "Monitor resting heart rate when combining. If symptomatic bradycardia develops (HR < 50, dizziness), discuss dose adjustment with your physician.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.06)",  border: "rgba(158,56,0,0.22)",  dot: "#9e3800", label: "Flag",        labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.05)",  border: "rgba(124,82,0,0.18)",  dot: "#7c5200", label: "Watch",       labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.04)", border: "rgba(21,100,58,0.15)", dot: "#155e38", label: "Low concern", labelColor: "#155e38" },
};

const TIER_ORDER: Tier[] = ["flag", "watch", "low"];
const TIER_HEADING: Record<Tier, string> = {
  flag:  "Flags \u2014 stop and consult before combining",
  watch: "Worth watching \u2014 monitor and use judgment",
  low:   "Low concern \u2014 proceed with standard awareness",
};

export default function OctreotideInteractionsPanel() {
  const [filter, setFilter] = useState<Tier | "all">("all");
  const [committed, setCommitted] = useState<Tier | "all">("all");

  const filtered = useMemo(
    () => (committed === "all" ? ENTRIES : ENTRIES.filter((e) => e.tier === committed)),
    [committed],
  );

  const tiersPresent = TIER_ORDER.filter((t) => filtered.some((e) => e.tier === t));

  return (
    <div className="reta-interactions">

      <div className="reta-interactions__intro">
        Octreotide\u2019s interaction profile is well-characterized given its FDA-approved status and decades of clinical use. The key concerns: cyclosporine absorption reduction (transplant patients), bidirectional glucose effects with any antidiabetic medication, and the fundamental pharmacological opposition with GH secretagogues. The GH secretagogue interaction deserves particular emphasis for the community context: you cannot pursue GH optimization and GH suppression simultaneously.
      </div>

      <div className="reta-interactions__filter-bar">
        {(["all", ...TIER_ORDER] as const).map((t) => (
          <button
            key={t}
            className={`reta-interactions__filter-btn${(filter === t) ? " reta-interactions__filter-btn--active" : ""}`}
            onClick={() => { setFilter(t); setCommitted(t); }}
          >
            {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tiersPresent.map((tier) => {
        const entries = filtered.filter((e) => e.tier === tier);
        const cfg = TIER_STYLE[tier];
        return (
          <div key={tier} className="reta-interactions__group">
            <div
              className="reta-interactions__group-heading"
              style={{ color: cfg.labelColor, borderLeft: `3px solid ${cfg.dot}` }}
            >
              {TIER_HEADING[tier]}
            </div>
            <div className="reta-interactions__entries">
              {entries.map((e) => (
                <div
                  key={e.name}
                  className="reta-interactions__entry"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                >
                  <div className="reta-interactions__entry-top">
                    <div className="reta-interactions__entry-name">{e.name}</div>
                    <span
                      className="reta-interactions__entry-badge"
                      style={{ color: cfg.labelColor, borderColor: cfg.border }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <div className="reta-interactions__entry-detail">{e.detail}</div>
                  <div className="reta-interactions__entry-why">{e.why}</div>
                  <div className="reta-interactions__entry-action">{e.action}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="reta-interactions__footer">
        The GH secretagogue pharmacological opposition is the most important interaction for the community context. The cyclosporine interaction is the most important for clinical safety \u2014 a documented, potentially serious interaction in transplant patients. Octreotide\u2019s interaction profile is well-characterized because the drug has been in clinical use for decades: the absence of a specific interaction flag here is based on actual data, not absence of study.
      </div>

    </div>
  );
}
