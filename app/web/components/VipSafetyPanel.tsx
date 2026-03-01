const TIER_STYLE = {
  flag: {
    bg: "rgba(220,38,38,0.06)",
    border: "rgba(220,38,38,0.25)",
    label: "Stop",
    labelColor: "#b91c1c",
  },
  watch: {
    bg: "rgba(234,179,8,0.07)",
    border: "rgba(234,179,8,0.35)",
    label: "Watch",
    labelColor: "#92400e",
  },
  low: {
    bg: "rgba(34,197,94,0.06)",
    border: "rgba(34,197,94,0.25)",
    label: "Low Risk",
    labelColor: "#166534",
  },
};

const flags = [
  {
    tier: "flag" as const,
    heading: "Profound vasodilation and hypotension",
    body:
      "The primary and most serious risk of injectable VIP. VIP is a potent vasodilator " +
      "acting on vascular smooth muscle via VPAC1/VPAC2 receptors. Intravenous infusion " +
      "studies consistently document significant blood pressure reductions. In uncontrolled " +
      "self-injection settings, the risk of hypotensive crisis\u2014including syncope, " +
      "cardiovascular collapse, and downstream ischemic events\u2014is real and unpredictable " +
      "without monitoring. This is the primary stop-level concern.",
  },
  {
    tier: "flag" as const,
    heading: "Tachycardia",
    body:
      "Vasodilation-induced reflex tachycardia is expected with VIP administration at " +
      "pharmacologically active doses. In individuals with underlying arrhythmias, " +
      "coronary artery disease, or cardiac vulnerability, this reflex response may be " +
      "dangerous. Self-administration without cardiac monitoring eliminates the ability " +
      "to detect or respond to adverse cardiac events in real time.",
  },
  {
    tier: "flag" as const,
    heading: "No dosing data for self-administration",
    body:
      "There is no established safe dose, injection schedule, concentration, or route for " +
      "self-administration of VIP. Clinical infusion studies use tightly controlled IV " +
      "delivery with continuous monitoring. Translating that to community subcutaneous or " +
      "intramuscular injection protocols is pharmacologically unsupported and clinically " +
      "irresponsible. The absence of dosing data is itself a stop-level concern.",
  },
  {
    tier: "watch" as const,
    heading: "Extreme half-life limitation",
    body:
      "VIP has a plasma half-life of under two minutes due to rapid cleavage by dipeptidyl " +
      "peptidase IV and neutral endopeptidase. This makes sustained systemic exposure from " +
      "bolus injection pharmacologically implausible. Any claimed effect from a community " +
      "injection protocol must contend with this reality. \u201cWorking\u201d effects could " +
      "reflect non-specific responses (vasodilation, flushing) rather than the intended " +
      "immunomodulatory benefit.",
  },
  {
    tier: "watch" as const,
    heading: "Bronchodilation at high doses",
    body:
      "VIP is a potent bronchodilator. While this sounds benign, uncontrolled " +
      "bronchodilation combined with systemic vasodilation creates a complex hemodynamic " +
      "picture. In individuals with reactive airway disease, paradoxical or unpredictable " +
      "bronchopulmonary responses have not been ruled out in self-injection contexts.",
  },
  {
    tier: "watch" as const,
    heading: "Flushing and nausea",
    body:
      "Flushing, warmth, and nausea are commonly reported with VIP infusion in clinical " +
      "settings and represent expected pharmacodynamic effects of vasodilation. These are " +
      "early warning signs of hemodynamic activity that, in a supervised setting, prompt " +
      "dose adjustment or cessation\u2014a response that is not possible during unsupervised " +
      "self-injection.",
  },
];

export default function VipSafetyPanel() {
  return (
    <div className="reta-safety">
      <h2 className="reta-safety__heading">Safety</h2>
      <div className="reta-safety__list">
        {flags.map((f, i) => {
          const t = TIER_STYLE[f.tier];
          return (
            <div
              key={i}
              className="reta-safety__item"
              style={{ background: t.bg, border: `1px solid ${t.border}` }}
            >
              <div className="reta-safety__item-top">
                <span className="reta-safety__item-label" style={{ color: t.labelColor }}>
                  {t.label}
                </span>
                <span className="reta-safety__item-heading">{f.heading}</span>
              </div>
              <p className="reta-safety__item-body">{f.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
