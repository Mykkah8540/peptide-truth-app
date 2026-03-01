type Tier = "flag" | "watch" | "low";

interface SafetyItem {
  id: string;
  heading: string;
  tier: Tier;
  body: string;
  context: string;
}

const SAFETY_ITEMS: SafetyItem[] = [
  {
    id: "cardiovascular",
    heading: "Cardiovascular monitoring for CGRP mAbs \u2014 theoretical vasospasm concern in ischemic disease",
    tier: "watch",
    body:
      "CGRP is a potent vasodilator with a physiological role in maintaining coronary and cerebral " +
      "vascular tone. Blocking CGRP with monoclonal antibodies raises a theoretical concern that " +
      "this protective vasodilation could be blunted, potentially increasing vasospasm risk in " +
      "patients with existing ischemic heart disease, Raynaud\u2019s phenomenon, or prior stroke. " +
      "Post-marketing surveillance and phase 3 trial safety data have been reassuring \u2014 no " +
      "clear cardiovascular signal has emerged \u2014 but patients with significant cardiovascular " +
      "disease were largely excluded from registration trials, leaving a real-world evidence gap.",
    context:
      "If you have coronary artery disease, a history of stroke, or significant peripheral vascular " +
      "disease, discuss the cardiovascular risk-benefit with your neurologist before starting a " +
      "CGRP mAb. The signal is theoretical and so far unconfirmed, but the caution is appropriate " +
      "given the biology. Gepants (small-molecule CGRP antagonists) have shorter duration of action " +
      "and may represent a lower-risk option for acute treatment in high-cardiovascular-risk patients.",
  },
  {
    id: "constipation-gepants",
    heading: "Constipation with gepants (particularly atogepant) \u2014 reported in clinical trials",
    tier: "watch",
    body:
      "CGRP is expressed in enteric neurons and has a role in gastrointestinal motility. CGRP " +
      "receptor antagonism with gepants, particularly atogepant (Qulipta) used daily for prevention, " +
      "was associated with constipation in Phase 3 trials at rates higher than placebo (6\u201311% " +
      "vs. 1\u20133%). Rimegepant and ubrogepant, used acutely rather than daily, have lower rates. " +
      "The effect is dose-dependent and typically mild but can be significant in patients with " +
      "pre-existing GI motility issues.",
    context:
      "If you are starting atogepant for migraine prevention and have a history of constipation or " +
      "IBS, discuss this with your prescriber. Dietary fiber, hydration, and osmotic laxatives can " +
      "mitigate GI effects. If constipation is severe or persistent, dose reduction or switching to " +
      "an alternative preventive (CGRP mAb or non-CGRP agent) is an option.",
  },
  {
    id: "injection-site",
    heading: "Injection site reactions with CGRP mAbs \u2014 common but self-limiting",
    tier: "low",
    body:
      "All subcutaneous CGRP mAbs (erenumab, fremanezumab, galcanezumab) produce injection site " +
      "reactions in 5\u201315% of patients \u2014 pain, erythema, and induration at the injection site. " +
      "These are consistent across CGRP biologics and comparable to other subcutaneous monoclonal " +
      "antibodies. They are generally mild, transient (resolving within hours to a few days), and " +
      "rarely lead to discontinuation. Rotating injection sites reduces recurrence.",
    context:
      "Injection site reactions are expected and manageable. Allowing the autoinjector pen to come " +
      "to room temperature before injection significantly reduces injection pain. Applying an ice " +
      "pack to the site for 1\u20132 minutes before injection also helps. If you experience persistent " +
      "hardening or nodule formation at injection sites, contact your prescriber.",
  },
  {
    id: "bp-changes",
    heading: "Transient blood pressure changes \u2014 generally mild and self-limiting",
    tier: "low",
    body:
      "Given CGRP\u2019s vasodilatory role, blocking it could theoretically raise blood pressure. " +
      "Small BP increases have been reported in some CGRP mAb trials, particularly with erenumab, " +
      "where a higher rate of hypertension-related adverse events was noted in a long-term safety " +
      "study compared to other CGRP mAbs. The absolute magnitude was small and did not result in " +
      "hypertension-related serious adverse events in most cases, but monitoring is appropriate.",
    context:
      "If you have a history of hypertension, baseline BP monitoring before and after initiating " +
      "a CGRP mAb is reasonable. Discuss with your prescriber if you observe a consistent blood " +
      "pressure trend upward after starting therapy. Switching CGRP mAbs within class may resolve " +
      "the issue if erenumab appears to be the driver.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag: {
    bg: "rgba(158,56,0,0.07)",
    border: "rgba(158,56,0,0.20)",
    label: "Stop signal",
    labelColor: "#9e3800",
  },
  watch: {
    bg: "rgba(124,82,0,0.06)",
    border: "rgba(124,82,0,0.17)",
    label: "Worth watching",
    labelColor: "#7c5200",
  },
  low: {
    bg: "rgba(21,100,58,0.05)",
    border: "rgba(21,100,58,0.13)",
    label: "Low concern",
    labelColor: "#155e38",
  },
};

export default function CgrpSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Safety considerations here apply to CGRP-targeted drugs \u2014 monoclonal antibodies (mAbs)
        for prevention and gepants for acute treatment and prevention. These are clinically approved
        medications with substantial trial data. Exogenous CGRP itself is not used therapeutically.
      </div>
      <div className="reta-safety__list">
        {SAFETY_ITEMS.map((item) => {
          const st = TIER_STYLE[item.tier];
          return (
            <div
              key={item.id}
              className="reta-safety__entry"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-safety__entry-top">
                <div className="reta-safety__entry-heading">{item.heading}</div>
                <div
                  className="reta-safety__entry-tier"
                  style={{ color: st.labelColor, borderColor: st.border }}
                >
                  {st.label}
                </div>
              </div>
              <div className="reta-safety__entry-body">{item.body}</div>
              <div className="reta-safety__entry-context">{item.context}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
