/**
 * VasopressinSafetyPanel — safety calibration for Vasopressin (ADH/AVP).
 * Key frame: V1a vasoconstriction is a real cardiovascular signal that
 * distinguishes vasopressin from oxytocin. Hyponatremia from V2 water
 * retention is dose-dependent and clinically documented.
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
    id: "cardiovascular",
    heading: "Cardiovascular disease or hypertension — V1a vasoconstriction is a real pharmacological effect",
    tier: "flag",
    body: "V1a receptor-mediated vasoconstriction is not a theoretical concern — it is the established mechanism behind vasopressin's FDA-approved use in vasodilatory shock. Exogenous vasopressin at any dose will produce some degree of V1a activation, raising peripheral vascular resistance and blood pressure. In patients with hypertension, coronary artery disease, angina, or any pre-existing cardiovascular condition, this vasoconstriction can precipitate angina, increase cardiac oxygen demand, and in severe cases cause myocardial ischemia. Vasopressin infusion in clinical settings is associated with documented cardiac adverse events, including myocardial infarction, when used without concurrent vasodilator (nitroglycerin) coverage in patients with CAD.",
    context: "Any cardiovascular condition including hypertension, coronary artery disease, angina, heart failure, peripheral artery disease, or cerebrovascular disease: do not use vasopressin without explicit cardiologist or physician guidance. The V1a vasoconstriction is not separable from other vasopressin effects with native peptide. This is not a compound for community use in people with cardiovascular risk factors.",
  },
  {
    id: "hyponatremia",
    heading: "Hyponatremia — V2 water retention + high fluid intake = dangerous sodium dilution",
    tier: "flag",
    body: "V2 receptor activation in the kidney causes water retention by upregulating aquaporin-2 channels. If fluid intake is not restricted in proportion to the antidiuretic effect, sodium is progressively diluted in a fixed blood volume — causing hyponatremia (low serum sodium). Hyponatremia is a clinically serious condition: mild symptoms include nausea, headache, and lethargy; severe hyponatremia (sodium below 120 mEq/L) can cause seizures, coma, brain herniation, and death. Desmopressin (a V2-selective analog) is associated with documented hyponatremia in clinical settings, particularly in children and the elderly. Native vasopressin carries the same V2-mediated risk.",
    context: "Anyone using vasopressin outside of DI replacement (where the dose replaces deficient endogenous AVP) must understand the hyponatremia risk. Do not drink excess water while using vasopressin. Community use for cognitive effects creates a scenario where V2 activation occurs in a person with normal ADH function — the net effect is excess water retention. Electrolyte monitoring (serum sodium, osmolality) is warranted before and during any vasopressin use.",
  },
  {
    id: "pregnancy",
    heading: "Pregnancy — uterine contractions; use is contraindicated outside specific clinical contexts",
    tier: "flag",
    body: "Vasopressin at high doses causes uterine contractions via smooth muscle V1a receptors. This is the same pharmacological family as oxytocin-induced contractions (though through different receptors). During pregnancy, uterine contractile stimulation creates risk of preterm labor, placental abruption, and fetal distress. Vasopressin is used in specific clinical obstetric emergencies only under physician supervision. Community use during pregnancy is contraindicated.",
    context: "Absolutely avoid vasopressin during pregnancy outside of physician-managed clinical indications. The uterotonic risk at higher doses, combined with the V1a vasoconstriction reducing uterine blood flow, creates compounding fetal risk.",
  },
  {
    id: "angina-precipitation",
    heading: "Angina precipitation at higher doses — coronary vasoconstriction",
    tier: "watch",
    body: "In addition to peripheral V1a vasoconstriction, vasopressin can constrict coronary arteries — reducing myocardial blood supply while simultaneously increasing cardiac afterload (more work to pump against higher resistance). This combination can precipitate angina in individuals with coronary artery disease, even those not previously symptomatic. Clinical vasopressin protocols for variceal bleeding have historically used concurrent nitroglycerin to mitigate this coronary risk.",
    context: "Individuals with known or suspected coronary artery disease: vasopressin is contraindicated without physician oversight. Even in people without known CAD, higher doses of vasopressin create coronary constriction risk. Any chest discomfort or pressure during vasopressin use should prompt immediate medical evaluation.",
  },
  {
    id: "ssri-hyponatremia",
    heading: "SSRI or psychotropic use — additive hyponatremia risk via SIADH",
    tier: "watch",
    body: "SSRIs and SNRIs are independently associated with syndrome of inappropriate antidiuretic hormone secretion (SIADH) — a form of dilutional hyponatremia similar to vasopressin's V2-mediated effect. Combining exogenous vasopressin with SSRI-induced SIADH creates additive risk of clinically significant hyponatremia. This interaction is particularly important because SSRI use is common and the community interest in vasopressin for cognitive/mood effects may overlap with SSRI-treated conditions.",
    context: "On SSRIs (fluoxetine, sertraline, escitalopram, paroxetine, etc.) or SNRIs (venlafaxine, duloxetine): do not use vasopressin without physician oversight. The hyponatremia risk from SSRI-induced SIADH is additive with vasopressin's V2-mediated water retention. Electrolyte monitoring is essential if vasopressin is used in this context.",
  },
  {
    id: "nasal-irritation",
    heading: "Nasal irritation — intranasal formulation",
    tier: "low",
    body: "Intranasal vasopressin can cause local nasal irritation, congestion, and rhinorrhea. These effects are generally mild and self-limiting. The intranasal route is used in research settings because it may achieve CNS delivery via olfactory/trigeminal routes, but systemic absorption producing V1a and V2 effects also occurs.",
    context: "Nasal irritation is manageable and not a serious concern. However, nasal irritation does not indicate absence of systemic absorption — V1a and V2 effects from intranasal vasopressin should not be assumed to be absent simply because the route is nasal rather than injectable.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function VasopressinSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Vasopressin has a more significant safety profile than oxytocin despite structural similarity — the V1a vasoconstriction effect creates real cardiovascular risk absent with oxytocin. Hyponatremia from V2 water retention is clinically documented with synthetic analogs and applies to native vasopressin. The three hard stops are cardiovascular disease (V1a vasoconstriction), hyponatremia risk (V2 water retention with excess fluid intake), and pregnancy (uterotonic effect). SSRIs add additive hyponatremia risk. This is not a casually safe compound for community cognitive enhancement use.
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
