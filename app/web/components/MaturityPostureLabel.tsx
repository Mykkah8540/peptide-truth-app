type Props = {
  evidenceGrade?: string | null;
  tier?: "low" | "moderate" | "high" | null;
};

function postureLabel(evidenceGrade?: string | null): string {
  if (!evidenceGrade) return "Maturity: Not classified";

  switch (evidenceGrade) {
    case "regulatory_label":
      return "Regulatory approved";
    case "rct_meta":
    case "rct":
      return "Late-stage human evidence";
    case "human_interventional":
    case "human_observational":
      return "Human evidence";
    case "animal":
      return "Preclinical (animal evidence)";
    case "in_vitro":
    case "mechanistic_only":
      return "Early mechanistic evidence";
    default:
      return "Evidence maturity unclear";
  }
}

export default function MaturityPostureLabel({ evidenceGrade }: Props) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        opacity: 0.85,
        fontWeight: 600,
      }}
    >
      {postureLabel(evidenceGrade)}
    </div>
  );
}
