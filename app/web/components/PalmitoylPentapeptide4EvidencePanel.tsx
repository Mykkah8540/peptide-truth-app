const signals = [
  {
    label: "Collagen synthesis stimulation in vitro",
    grade: "Strong",
    body:
      "Cell culture studies consistently show palmitoyl pentapeptide-4 upregulates collagen I, " +
      "collagen III, and fibronectin production in human dermal fibroblasts. The mechanism\u2014" +
      "mimicking the collagen-derived KTTKS signaling fragment\u2014is well characterized. Caveat: " +
      "most of this work is industry-funded and conducted under controlled cell culture conditions " +
      "that may not reflect in vivo penetration realities.",
  },
  {
    label: "Skin appearance and firmness (topical use)",
    grade: "Moderate",
    body:
      "Small controlled trials and split-face studies using photographic and profilometric " +
      "assessment report improvements in skin texture, firmness, and overall appearance over " +
      "12\u201316 weeks. Effect sizes are modest. Most trials were funded by ingredient suppliers " +
      "and used proprietary formulations, making it difficult to isolate the peptide\u2019s " +
      "contribution from vehicle effects.",
  },
  {
    label: "Reduction in wrinkle depth",
    grade: "Moderate",
    body:
      "Photographic and self-reported endpoints show statistically significant but clinically " +
      "modest reductions in fine line depth compared to vehicle. Replica-based profilometry " +
      "results are more convincing than self-report alone. Independent replication with " +
      "standardized methodology is limited.",
  },
  {
    label: "Transdermal delivery reaching live fibroblasts in vivo",
    grade: "No evidence",
    body:
      "The core pharmacokinetic question\u2014how much intact palmitoyl pentapeptide-4 penetrates " +
      "through the stratum corneum and reaches viable fibroblasts in the dermis under real-world " +
      "topical application conditions\u2014has not been robustly answered in independent human " +
      "studies. The palmitoyl chain improves lipophilicity, but dermal bioavailability of intact " +
      "peptide remains unconfirmed.",
  },
  {
    label: "Systemic effect via topical use",
    grade: "No evidence",
    body:
      "There is no evidence that topically applied palmitoyl pentapeptide-4 achieves meaningful " +
      "systemic concentrations or produces effects beyond the application site. This is a topical " +
      "cosmetic ingredient; systemic pharmacology is neither claimed nor supported.",
  },
];

const gradeClass = (grade: string) => {
  if (grade === "Strong") return "reta-evidence__grade--strong";
  if (grade === "Moderate") return "reta-evidence__grade--moderate";
  return "reta-evidence__grade--none";
};

export default function PalmitoylPentapeptide4EvidencePanel() {
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
