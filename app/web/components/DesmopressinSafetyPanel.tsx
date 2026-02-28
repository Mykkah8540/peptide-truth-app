/**
 * DesmopressinSafetyPanel — safety calibration for Desmopressin (DDAVP).
 * Key frame: hyponatremia from water retention is the primary serious adverse effect —
 * clinically significant, dose-dependent on fluid restriction compliance. Heart failure
 * and edematous states are contraindications. Elderly are highest risk. The compound
 * itself is safe when fluid restriction protocol is followed.
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
    id: "hyponatremia",
    heading: "Hyponatremia — dangerously low sodium from water retention; can cause seizures and death",
    tier: "flag",
    body: "The antidiuretic effect of desmopressin prevents excretion of free water. If fluid intake is not restricted, retained water dilutes serum sodium causing hyponatremia. Severe hyponatremia (Na+ < 125 mEq/L) causes cerebral edema, altered mental status, seizures, coma, and death. Multiple case reports of desmopressin-associated hyponatremia deaths exist — primarily in children with enuresis whose caregivers were not adequately counseled on fluid restriction, and in elderly adults on nocturia formulations without sodium monitoring. This is the most clinically dangerous adverse effect and is entirely preventable with fluid restriction protocol adherence.",
    context: "Fluid restriction is mandatory, not optional: for enuresis dosing, limit fluid intake to 240 mL at dinner and nothing further until the morning after desmopressin administration. For nocturia, restrict fluids from 1 hour before through 8 hours after dosing. Sodium check before starting and at 7 days after initiation (particularly for elderly); repeat with any dose increase. Stop desmopressin if serum sodium falls below 130 mEq/L. Teach patients and caregivers the symptoms of hyponatremia: headache, nausea, confusion, lethargy — these require same-day medical evaluation.",
  },
  {
    id: "heart-failure-edema",
    heading: "Heart failure and volume-overloaded states — absolute contraindication",
    tier: "flag",
    body: "Desmopressin causes water retention through V2-mediated aquaporin-2 upregulation. In patients with heart failure, cirrhosis with ascites, nephrotic syndrome, or other volume-overloaded states, this additional water retention worsens volume overload — increasing pulmonary edema, peripheral edema, and cardiac strain. Heart failure patients who retain additional free water from desmopressin face worsening dyspnea, fluid accumulation, and potential acute decompensation. This is not a theoretical interaction — volume retention in cardiac-compromised patients is a genuine and serious clinical risk.",
    context: "Heart failure (any ejection fraction), moderate-to-severe hepatic impairment, nephrotic syndrome, and known hyponatremia are contraindications to desmopressin. Before prescribing for nocturia (the indication where this is most commonly encountered), explicitly rule out nocturia due to heart failure or peripheral edema — treating nocturia from these causes with desmopressin will worsen the underlying condition.",
  },
  {
    id: "elderly-vulnerability",
    heading: "Elderly patients — highest hyponatremia risk; blunted thirst; impaired water handling",
    tier: "watch",
    body: "Elderly patients face compounded hyponatremia risk from desmopressin: age-related decline in renal water handling (reduced ability to concentrate and dilute urine), blunted thirst response (may not compensate appropriately for hypernatremia but also may drink excessively by habit), higher baseline SIADH prevalence, and concomitant use of SIADH-promoting medications (SSRIs, NSAIDs). The FDA required lower dosing for the nocturia indication in women 65+ specifically due to hyponatremia risk in clinical trials. Elderly patients require more frequent sodium monitoring and lower starting doses.",
    context: "For nocturia indication in patients 65+: start at the lowest approved dose; serum sodium at baseline, 7 days, 1 month, then every 3 months. For any elderly patient on desmopressin: explicit caregiver counseling on hyponatremia symptoms. Consider whether nocturia has a reversible cause (diuretics taken too late in day, excessive evening fluid intake, poorly controlled diabetes) that should be addressed before or instead of desmopressin.",
  },
  {
    id: "hyponatremia-seizures",
    heading: "Hyponatremia-associated seizures — rapid correction risk (osmotic demyelination)",
    tier: "watch",
    body: "If desmopressin-associated hyponatremia becomes severe and requires treatment, sodium correction must be done carefully. Rapid correction of chronic hyponatremia causes osmotic demyelination syndrome (central pontine myelinolysis) — a devastating neurological complication. Acute hyponatremia (developing over < 48 hours, as is typical with desmopressin in the context of excessive fluid intake) can be corrected more rapidly, but even here, rate of correction matters. This risk is a reason why hyponatremia prevention (fluid restriction) is preferable to hyponatremia treatment.",
    context: "Desmopressin-associated hyponatremia that causes neurological symptoms (seizures, confusion) requires emergency medical care. Do not attempt to treat hyponatremia with aggressive fluid restriction at home if neurological symptoms are present — this is an emergency. Prevention through fluid restriction protocol is the correct approach.",
  },
  {
    id: "nasal-congestion-cdI",
    heading: "Nasal congestion affecting intranasal absorption — breakthrough CDI symptoms during illness",
    tier: "watch",
    body: "Intranasal desmopressin bioavailability depends on intact nasal mucosa. Nasal congestion from upper respiratory infections, allergic rhinitis, or nasal surgery significantly impairs absorption, causing unpredictable and reduced antidiuretic effect. For CDI patients dependent on intranasal desmopressin, a URI can precipitate breakthrough polyuria and polydipsia as absorption drops. This is not a safety concern per se but a clinically important management issue.",
    context: "CDI patients on intranasal desmopressin should have a plan for illness: temporary switch to oral tablets or injectable desmopressin during nasal congestion. Educate patients to recognize breakthrough CDI symptoms (rapidly increasing urine output, thirst) during respiratory illness and to switch formulations promptly rather than waiting for severe dehydration.",
  },
  {
    id: "local-nasal",
    heading: "Nasal irritation — intranasal formulation local effects",
    tier: "low",
    body: "Intranasal desmopressin commonly causes local nasal effects: rhinitis, nasal congestion, epistaxis (nosebleeds), nasal dryness, headache. These are typically mild and do not require cessation of therapy. The incidence is formulation-dependent — the higher-concentration Stimate spray may cause more local irritation than the lower-concentration DDAVP nasal spray.",
    context: "Local nasal irritation is the most commonly reported adverse effect and is rarely serious. If significant nasal irritation occurs, switching to oral tablet formulation is an option for CDI and enuresis indications. For nocturia, the approved nasal spray formulation (Noctiva) is the only approved route.",
  },
  {
    id: "headache",
    heading: "Headache — dose-dependent; may reflect water retention",
    tier: "low",
    body: "Headache is reported in a significant minority of desmopressin users across all formulations. Mild headache may reflect the antidiuretic effect or transient blood pressure changes. Severe or rapidly worsening headache during desmopressin use should prompt consideration of hyponatremia (water intoxication) and sodium check — headache is one of the early symptoms of developing hyponatremia.",
    context: "Mild headache after desmopressin is common and typically benign. Severe, new, or worsening headache, particularly accompanied by nausea or confusion, warrants same-day sodium check to rule out hyponatremia. Ensure fluid restriction was followed if headache occurs.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function DesmopressinSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Desmopressin is a safe compound when used correctly with fluid restriction — it has been used in children, adults, and the elderly for 50 years. The one serious adverse effect — hyponatremia — is predictable, dose-dependent on fluid restriction adherence, and entirely preventable. Heart failure and volume-overloaded states are absolute contraindications. Elderly patients require closer sodium monitoring. Nasal and headache effects are minor. The safety profile is excellent when the fluid restriction protocol is understood and followed.
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
