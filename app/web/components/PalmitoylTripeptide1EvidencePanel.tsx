const signals = [
  {
    label: "Collagen synthesis stimulation in vitro",
    grade: "Strong",
    body:
      "Cell culture studies show palmitoyl tripeptide-1 (GHK-based) stimulates collagen I " +
      "and III production in human dermal fibroblasts. The GHK fragment has a long published " +
      "history\u2014predating the palmitoylated form\u2014as a pro-collagen and wound-repair " +
      "signal. In vitro evidence for this mechanism is well-established, though largely " +
      "industry-generated for the palmitoylated form specifically.",
  },
  {
    label: "Skin texture and firmness in combination formulas",
    grade: "Moderate",
    body:
      "Clinical trials using Matrixyl 3000 (palmitoyl tripeptide-1 + palmitoyl " +
      "pentapeptide-4) report statistically significant improvements in skin texture, " +
      "firmness, and wrinkle appearance over 8\u201316 weeks. The combination\u2019s results " +
      "are consistent across multiple supplier-funded studies. Effect sizes are modest. " +
      "Isolating palmitoyl tripeptide-1\u2019s specific contribution within the combination " +
      "has not been done rigorously.",
  },
  {
    label: "Standalone efficacy isolated from palmitoyl pentapeptide-4",
    grade: "No evidence",
    body:
      "There are almost no controlled trials that evaluate palmitoyl tripeptide-1 alone " +
      "versus placebo in a cosmetic formulation context. The ingredient is virtually always " +
      "studied as part of the Matrixyl 3000 combination. Whether it contributes independently " +
      "or whether palmitoyl pentapeptide-4 is doing the heavy lifting is unknown.",
  },
  {
    label: "Transdermal delivery depth in vivo",
    grade: "No evidence",
    body:
      "As with palmitoyl pentapeptide-4, the dermal bioavailability of intact palmitoyl " +
      "tripeptide-1 in living human skin has not been robustly demonstrated in independent " +
      "studies. The palmitoyl modification improves lipophilicity, but quantitative " +
      "penetration data from human skin under real-world use conditions is absent.",
  },
  {
    label: "Systemic effects via topical application",
    grade: "No evidence",
    body:
      "No evidence for meaningful systemic absorption or systemic pharmacological effects " +
      "from topical use. This is a cosmetic ingredient formulated for local skin application " +
      "only. No systemic claims are supported or appropriate.",
  },
];

const gradeClass = (grade: string) => {
  if (grade === "Strong") return "reta-evidence__grade--strong";
  if (grade === "Moderate") return "reta-evidence__grade--moderate";
  return "reta-evidence__grade--none";
};

export default function PalmitoylTripeptide1EvidencePanel() {
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
