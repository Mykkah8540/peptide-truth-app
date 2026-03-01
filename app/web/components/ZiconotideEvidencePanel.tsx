const signals = [
  {
    label: "Intrathecal analgesia in severe chronic pain",
    grade: "Strong",
    body:
      "Pivotal randomized controlled trials (the PRIZM trial and supporting studies) " +
      "established ziconotide\u2019s efficacy for intrathecal pain control in patients with " +
      "severe, refractory chronic pain\u2014including cancer pain and non-malignant pain " +
      "syndromes. The FDA approved it in 2004 on the basis of this evidence. Effect sizes " +
      "are clinically meaningful in a patient population that has failed other analgesics.",
  },
  {
    label: "Cav2.2 (N-type calcium channel) blockade mechanism",
    grade: "Strong",
    body:
      "The mechanism of action is well established and uncontroversial. Ziconotide " +
      "selectively and potently blocks Cav2.2 channels (N-type voltage-gated calcium " +
      "channels) at presynaptic terminals in the dorsal horn of the spinal cord. This " +
      "prevents neurotransmitter release and inhibits ascending pain signal transmission. " +
      "The selectivity and potency are derived from its omega-conotoxin structural origin.",
  },
  {
    label: "Cognitive and psychiatric side effects",
    grade: "Strong",
    body:
      "Paradoxically, one of the best-evidenced aspects of ziconotide is its serious " +
      "side effect profile. Clinical trials and post-marketing data document significant " +
      "rates of cognitive impairment, confusion, dizziness, psychiatric symptoms " +
      "(including depression with suicidal ideation), and hallucinations. These are " +
      "not rare\u2014they are documented and expected, particularly during dose titration.",
  },
  {
    label: "Systemic injection efficacy or safety",
    grade: "No evidence",
    body:
      "Systemic administration (IV, subcutaneous, IM) has not been studied as a therapeutic " +
      "approach because it is known to be dangerous. Voltage-gated calcium channel blockade " +
      "throughout the body\u2014rather than locally at the spinal cord\u2014would affect cardiac " +
      "conduction, autonomic function, neuromuscular transmission, and cerebral physiology. " +
      "This is not a gap in the literature awaiting study; it is a known harm avoidance.",
  },
  {
    label: "Oral or subcutaneous bioavailability",
    grade: "No evidence",
    body:
      "As a peptide, ziconotide is destroyed by gastrointestinal proteases and has no " +
      "oral bioavailability. Subcutaneous delivery does not achieve intrathecal " +
      "concentrations sufficient for analgesia and would produce systemic VGCC blockade. " +
      "The intrathecal route is the only pharmacologically sound delivery method\u2014this " +
      "is not a limitation waiting to be engineered around.",
  },
];

const gradeClass = (grade: string) => {
  if (grade === "Strong") return "reta-evidence__grade--strong";
  if (grade === "Moderate") return "reta-evidence__grade--moderate";
  return "reta-evidence__grade--none";
};

export default function ZiconotideEvidencePanel() {
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
