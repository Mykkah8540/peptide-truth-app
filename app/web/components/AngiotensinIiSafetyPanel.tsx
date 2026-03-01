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
    id: "ang2-thrombosis",
    heading: "Thrombosis (black box warning)",
    tier: "flag",
    body:
      "Giapreza carries an FDA black box warning for deep vein thrombosis and arterial thrombosis. In the ATHOS-3 trial, thrombotic events occurred in 12.9% of angiotensin-II patients versus 5.1% with placebo. The mechanism likely involves AT1 receptor-mediated upregulation of plasminogen activator inhibitor-1 (PAI-1) and direct prothrombotic signaling in vascular endothelium.",
    context:
      "Concurrent VTE prophylaxis with heparin or low-molecular-weight heparin is required per the prescribing information. Patients must be assessed for thrombotic risk at initiation, and anticoagulation status must be confirmed before angiotensin-II is started. This is a non-negotiable component of safe use.",
  },
  {
    id: "ang2-hypertension",
    heading: "Hypertension overshoot",
    tier: "watch",
    body:
      "Angiotensin-II is a potent vasoconstrictor requiring continuous dose titration to maintain target MAP (65&ndash;75 mmHg in most shock protocols). Excessive vasoconstriction can raise MAP above target, increasing cardiac afterload and reducing organ perfusion in a paradoxically harmful direction. Post-hoc analyses have associated MAP &gt; 90 mmHg with worse outcomes in some shock subgroups.",
    context:
      "Continuous arterial line monitoring and frequent MAP assessments are mandatory. Starting doses should be conservative (20 ng/kg/min) with titration in small increments. The vasopressor is typically run as a continuous infusion on a dedicated pump with nursing 1:1 ratios in the ICU.",
  },
  {
    id: "ang2-digital-ischemia",
    heading: "Digital ischemia and peripheral vasoconstriction",
    tier: "watch",
    body:
      "High-dose vasopressor therapy with angiotensin-II, particularly in combination with catecholamines, can compromise distal perfusion to fingers, toes, and skin. Digital ischemia and skin necrosis have been reported, consistent with all vasopressor agents used in severe shock states.",
    context:
      "Peripheral perfusion (capillary refill, limb temperature, mottling) should be assessed regularly. Vasopressor minimization as hemodynamics improve is the primary mitigation. Arterial line placement in radial (not digital) arteries reduces local ischemia risk.",
  },
  {
    id: "ang2-tachyphylaxis",
    heading: "Tachyphylaxis with continuous infusion",
    tier: "low",
    body:
      "Some patients develop reduced vasopressor response to angiotensin-II with continuous infusion, requiring catecholamine re-escalation. The mechanism is likely AT1 receptor downregulation with sustained agonist exposure. Tachyphylaxis is observed with most vasopressor agents used long-term.",
    context:
      "Clinical management involves vasopressor weaning as early as hemodynamics allow, alternating vasopressor agents when tachyphylaxis is suspected, and treating the underlying shock state to reduce overall vasopressor requirements.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function AngiotensinIiSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        The black box thrombosis warning is the defining safety concern for Giapreza. Concurrent
        anticoagulation is mandatory. All other safety considerations (hypertension overshoot,
        digital ischemia, tachyphylaxis) are managed through continuous hemodynamic monitoring in
        the ICU setting where this drug is exclusively used.
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
