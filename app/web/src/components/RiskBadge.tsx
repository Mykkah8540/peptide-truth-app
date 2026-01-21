type Props = {
  score: number; // 1..10
};

function label(score: number): string {
  if (score <= 2) return "Low";
  if (score <= 4) return "Guarded";
  if (score <= 6) return "Moderate";
  if (score <= 8) return "High";
  return "Very High";
}

export default function RiskBadge({ score }: Props) {
  const s = Math.max(1, Math.min(10, Number(score) || 1));
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid #e5e5e5", borderRadius: 10, padding: "10px 12px" }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>Risk</div>
      <div style={{ fontSize: 18, fontWeight: 700 }}>{s}/10</div>
      <div style={{ fontSize: 12, opacity: 0.8 }}>{label(s)}</div>
    </div>
  );
}
