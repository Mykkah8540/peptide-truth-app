type Props = {
  score: number; // 1..10
  tier?: "low" | "moderate" | "high" | null;
};

function label(score: number, tier?: Props["tier"]): string {
  if (tier === "low") return "Low";
  if (tier === "moderate") return "Moderate";
  if (tier === "high") return "High";

  // Fallback for older indexes
  if (score <= 3) return "Low";
  if (score <= 6) return "Moderate";
  return "High";
}

function gradeColor(score: number): string {
  // 1-3 green, 4-6 orange, 7-10 red
  if (score <= 3) return "#16a34a";
  if (score <= 6) return "#f97316";
  return "#dc2626";
}

export default function RiskBadge({ score, tier }: Props) {
  const s = Math.max(1, Math.min(10, Number(score) || 1));
  const color = gradeColor(s);

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid rgba(0,0,0,0.10)", borderRadius: 12, padding: "10px 12px" }}>
      <span style={{ width: 10, height: 10, borderRadius: 999, background: color, display: "inline-block" }} />
      <div style={{ fontSize: 12, opacity: 0.7 }}>Safety grade</div>
      <div style={{ fontSize: 18, fontWeight: 800 }}>{s}/10</div>
      <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 700 }}>{label(s, tier)}</div>
    </div>
  );
}
