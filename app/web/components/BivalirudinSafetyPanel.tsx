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
    id: "bival-bleeding",
    heading: "Major bleeding risk",
    tier: "flag",
    body:
      "Bivalirudin is an anticoagulant; major bleeding is its primary and most serious adverse effect. Bleeding can occur at arterial access sites (femoral, radial), retroperitoneally (femoral access), intracranially, or from the GI tract. In HORIZONS-AMI, major bleeding occurred in 4.9% of bivalirudin-treated patients despite it being lower than the comparator arm. There is no reversal agent for bivalirudin (unlike protamine for heparin); management requires drug discontinuation and supportive care.",
    context:
      "Bleeding risk is managed through radial access preference (lower than femoral), hemostasis devices, careful sheath management, and post-procedure monitoring of access site and vital signs. In patients who are not undergoing PCI or cardiac surgery with formal monitoring, the risks of bivalirudin use are entirely unacceptable.",
  },
  {
    id: "bival-hit",
    heading: "Heparin-induced thrombocytopenia (HIT) management",
    tier: "watch",
    body:
      "Bivalirudin is an appropriate anticoagulant alternative when HIT is present or suspected &mdash; it does not cross-react with PF4/heparin antibodies. However, HIT is a complex immunological diagnosis requiring specialist hematology input. Dosing, monitoring (aPTT or ACT targets), and duration require individualized management in a monitored setting. Presumptive HIT treatment should not be self-managed.",
    context:
      "The 4T score is used to risk-stratify HIT probability before starting a DTI. Platelet counts must be monitored throughout treatment. If HIT is confirmed, the transition from bivalirudin to long-term oral anticoagulation requires careful bridging due to the brief half-life of bivalirudin.",
  },
  {
    id: "bival-renal",
    heading: "Dose adjustment in renal impairment",
    tier: "watch",
    body:
      "Bivalirudin&apos;s active metabolite (the cleaved N-terminal fragment) undergoes renal clearance. In moderate-to-severe CKD and dialysis patients, reduced clearance prolongs the anticoagulant effect. The Angiomax label specifies infusion rate reductions for GFR 10&ndash;29 mL/min and for dialysis-dependent patients. aPTT or ACT monitoring is required in impaired renal function to guide dosing.",
    context:
      "This is an important clinical consideration in interventional cardiology because CKD is common in patients with coronary artery disease requiring PCI. Creatinine and GFR should be assessed before setting the bivalirudin infusion rate. Dialysis patients have the most significant drug exposure prolongation.",
  },
  {
    id: "bival-hypersensitivity",
    heading: "Hypersensitivity reactions",
    tier: "low",
    body:
      "Rare hypersensitivity reactions including anaphylaxis have been reported with bivalirudin. Cross-reactivity with hirudin-derived compounds is a theoretical concern given the shared structural basis. The incidence in clinical trials is low (&lt;1%).",
    context:
      "Standard monitoring for anaphylaxis (urticaria, bronchospasm, hypotension) should be in place during the first infusion. For patients with known hirudin hypersensitivity, bivalirudin should be used with caution and appropriate pre-medication discussed with allergy/immunology. This is rarely a practical barrier in the cath lab setting.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function BivalirudinSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Bleeding is the defining safety challenge of bivalirudin, as it is for all anticoagulants.
        The drug&apos;s clinical advantage &mdash; a short half-life that reverses quickly without
        an antidote &mdash; is also its primary safety management tool. All other risks are
        managed through appropriate patient selection, renal dose adjustment, and specialist
        monitoring in the hospital setting where this drug is used.
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
