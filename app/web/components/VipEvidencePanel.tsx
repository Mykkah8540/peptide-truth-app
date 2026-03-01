const signals = [
  {
    label: "VIP receptor pharmacology (VPAC1, VPAC2)",
    grade: "Strong",
    body:
      "The receptor pharmacology of VIP is extensively characterized. VPAC1 and VPAC2 " +
      "receptor binding, downstream cAMP signaling, and tissue distribution are well " +
      "established in the scientific literature. This is textbook-level receptor biology " +
      "with decades of published data\u2014not disputed.",
  },
  {
    label: "Vasodilatory and bronchodilatory effects",
    grade: "Strong",
    body:
      "VIP\u2019s vasodilatory and bronchodilatory effects are well established in preclinical " +
      "models and human tissue studies. Intravenous VIP infusion studies have documented " +
      "dose-dependent reductions in pulmonary vascular resistance and systemic vasodilation. " +
      "This is a pharmacologically confirmed and clinically consequential effect\u2014which is " +
      "precisely why uncontrolled self-injection is dangerous.",
  },
  {
    label: "Immune modulation and anti-inflammatory effects",
    grade: "Moderate",
    body:
      "Preclinical data and ex vivo human tissue studies support VIP\u2019s role in suppressing " +
      "pro-inflammatory cytokine production (TNF-\u03b1, IL-6, IL-12) and modulating T-cell " +
      "function. Some human studies in inflammatory conditions exist. Evidence is solid at " +
      "the mechanistic level but translating this to a clinical self-administration protocol " +
      "with meaningful anti-inflammatory benefit has not been established.",
  },
  {
    label: "Aviptadil (VIP analog) in ARDS and critical care",
    grade: "Moderate",
    body:
      "Aviptadil, a synthetic VIP analog, has been studied in small trials for ARDS and " +
      "respiratory failure. Some COVID-19 trial data generated interest but results have " +
      "been mixed and contested. This data applies to aviptadil administered in controlled " +
      "clinical settings\u2014it does not transfer directly to conclusions about native VIP " +
      "self-injection.",
  },
  {
    label: "Community injection use for immune or anti-inflammatory benefit",
    grade: "No evidence",
    body:
      "There are no controlled trials, case series with systematic outcome reporting, or " +
      "pharmacokinetic studies supporting community self-injection of VIP for immune " +
      "modulation or anti-inflammatory benefit. Given the sub-2-minute plasma half-life, " +
      "the pharmacological rationale for typical injection protocols is not established.",
  },
  {
    label: "Neurological or cognitive benefit from exogenous VIP",
    grade: "No evidence",
    body:
      "Community claims about cognitive or neurological benefit from injectable VIP are " +
      "not supported by clinical evidence. While VIP receptors are present in the CNS, " +
      "there is no human trial data supporting cognitive benefit from exogenous VIP " +
      "administration, and the blood-brain barrier presents an additional delivery obstacle.",
  },
];

const gradeClass = (grade: string) => {
  if (grade === "Strong") return "reta-evidence__grade--strong";
  if (grade === "Moderate") return "reta-evidence__grade--moderate";
  return "reta-evidence__grade--none";
};

export default function VipEvidencePanel() {
  return (
    <div className="reta-evidence">
      <h2 className="reta-evidence__heading">Evidence</h2>
      <div className="reta-evidence__list">
        {signals.map((s, i) => (
          <div key={i} className="reta-evidence__entry">
            <div className="reta-evidence__entry-top">
              <span className="reta-evidence__label">{s.label}</span>
              <span className={`reta-evidence__grade ${gradeClass(s.grade)}`}>{s.grade}</span>
            </div>
            <div className="reta-evidence__entry-body">{s.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
