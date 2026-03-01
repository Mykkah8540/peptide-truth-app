/**
 * EptifibatideSafetyPanel — proactive safety intelligence for eptifibatide.
 * Key frame: bleeding is the primary risk; thrombocytopenia is the key monitoring target.
 * Renal dose adjustment is mandatory. Acute thrombocytopenia can be severe and rapid.
 */

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
    id: "major-bleeding",
    heading: "Major bleeding \u2014 including intracranial hemorrhage in high-risk patients",
    tier: "flag",
    body: "Major bleeding is the primary safety concern with eptifibatide. In the PURSUIT trial, major bleeding (using TIMI major bleeding criteria) occurred more frequently with eptifibatide than placebo, particularly at the femoral vascular access site used for cardiac catheterization. Intracranial hemorrhage, while rare, is a documented complication in patients at highest bleeding risk \u2014 those with prior stroke, severe hypertension, older age, low body weight, or concurrent aggressive anticoagulation. TIMI major bleeding from the PURSUIT trial: eptifibatide 10.5% vs placebo 9.3% (all bleeding); fatal bleeding was rare but higher in the eptifibatide arm. The ESPRIT trial (elective PCI) showed similar major bleeding rate increases (1.3% vs 0.4% TIMI major bleeding in eptifibatide vs placebo).",
    context: "The management framework for eptifibatide bleeding is: stop the infusion, apply manual compression to access sites, transfuse platelets if bleeding is severe (platelet function will recover as drug redistributes), and assess for the bleeding source. There is no pharmacological reversal agent. Proton pump inhibitor co-therapy reduces GI bleeding risk. Vascular access site management (radial vs femoral, early sheath removal, compression techniques) is the most preventable major bleeding risk factor.",
  },
  {
    id: "thrombocytopenia",
    heading: "Acute severe thrombocytopenia \u2014 rapid platelet count drop within 24 hours",
    tier: "flag",
    body: "Acute severe thrombocytopenia is an uncommon but serious complication occurring in approximately 0.5\u20131% of patients within 24 hours of starting eptifibatide (\u201cwhite clot syndrome\u201d). The mechanism involves pre-formed antibodies to drug-occupied GPIIb/IIIa receptors that cause immune-mediated platelet destruction. Platelet count can drop to <20,000/\u03bcL within hours, paradoxically increasing both bleeding risk and thrombotic risk (platelet fragments can be thrombogenic). This is distinct from heparin-induced thrombocytopenia (HIT) but requires prompt recognition and management. Unlike some drug-induced thrombocytopenias, it does not require prior sensitization \u2014 it can occur on first exposure.",
    context: "Monitoring protocol: platelet count at baseline, 2\u20136 hours after initiation (to catch acute thrombocytopenia), and then daily. If platelet count drops below 100,000/\u03bcL: evaluate the patient, consider whether the drop is drug-related. Platelet count <50,000/\u03bcL: strongly consider discontinuation. Platelet count <20,000/\u03bcL: discontinue eptifibatide and any concurrent heparin; platelet transfusion if there is active bleeding or before any procedural intervention.",
  },
  {
    id: "renal-dosing",
    heading: "Renal impairment \u2014 mandatory dose adjustment; dialysis patients may not tolerate",
    tier: "watch",
    body: "Eptifibatide is predominantly renally cleared. Renal impairment increases plasma half-life and exposure, amplifying bleeding risk. FDA-approved dosing includes specific reductions for patients with creatinine clearance (CrCl) between 25\u201350 mL/min: infusion rate is reduced from 2.0 to 1.0 mcg/kg/min. Patients with CrCl <25\u201330 mL/min were excluded from the major clinical trials and should be considered at very high bleeding risk if eptifibatide is used at all. Dialysis patients are generally not candidates due to the inability to control drug exposure through standard renal clearance.",
    context: "Practical renal assessment before eptifibatide: estimate CrCl using the Cockcroft-Gault equation with actual body weight in elderly and low-weight patients. Serum creatinine alone is misleading in elderly, female, and low-muscle-mass patients. A creatinine of 1.3 mg/dL in an 80-year-old woman represents much worse renal function than in a 40-year-old man. When in doubt, use the reduced infusion rate.",
  },
  {
    id: "hypersensitivity",
    heading: "Hypersensitivity reactions \u2014 rare but documented",
    tier: "low",
    body: "Hypersensitivity reactions (urticaria, anaphylaxis) to eptifibatide are rare but documented in post-marketing surveillance. The cyclic peptide structure can elicit immune responses, particularly in patients with prior exposure. Pre-formed antibodies to GPIIb/IIIa-drug complexes are the same mechanism responsible for acute thrombocytopenia; anaphylaxis is a distinct, less common immune response to the peptide itself.",
    context: "Standard anaphylaxis management (epinephrine, antihistamines, corticosteroids, airway management) applies if hypersensitivity occurs. In the setting of acute coronary intervention where eptifibatide is being used, monitoring and resuscitation equipment are already in place. Any prior reaction to eptifibatide or other GPIIb/IIIa inhibitors should be documented and the treating team notified before any future interventional procedure.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function EptifibatideSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Eptifibatide safety is managed in the hospital setting where continuous monitoring, blood count checks, and access to blood products are available. The two primary active monitoring targets are: (1) bleeding, particularly at the vascular access site; and (2) acute thrombocytopenia, which can develop within hours and requires platelet count monitoring at 2\u20136 hours post-initiation. Renal function drives dosing \u2014 underdosing for renal impairment is a clinical mandate, not a preference.
      </div>
      <div className="reta-safety__list">
        {SAFETY_ITEMS.map((item) => {
          const st = TIER_STYLE[item.tier];
          return (
            <div key={item.id} className="reta-safety__entry" style={{ background: st.bg, border: `1px solid ${st.border}` }}>
              <div className="reta-safety__entry-top">
                <div className="reta-safety__entry-heading">{item.heading}</div>
                <div className="reta-safety__entry-tier" style={{ color: st.labelColor, borderColor: st.border }}>{st.label}</div>
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
