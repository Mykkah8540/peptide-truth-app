export default function Aod9604SafetyPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Risk flags */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Risk flags</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              tier: "flag", label: "Diabetes or unstable blood sugar control",
              detail: "AOD-9604 activates lipolytic signaling, which releases free fatty acids into circulation. This metabolic shift can affect glucose regulation, particularly in insulin-resistant or diabetic individuals. The Phase II trial monitored glucose; community users typically do not. Diabetes medications and blood sugar monitoring status should be reviewed before starting.",
            },
            {
              tier: "flag", label: "Pregnancy and breastfeeding",
              detail: "No safety data. AOD-9604 is derived from human growth hormone — despite GH-receptor non-binding, any hGH-derived peptide during pregnancy introduces unknown variables into fetal development and metabolic programming.",
            },
            {
              tier: "flag", label: "Adolescents",
              detail: "The Phase II trial enrolled adults with obesity. Adolescent metabolic and endocrine development is actively regulated — introducing a fragment of hGH into this context, even one designed to spare growth signaling, carries risks that have not been studied and may be irreversible.",
            },
            {
              tier: "watch", label: "Cardiovascular disease or uncontrolled blood pressure",
              detail: "β3-adrenergic receptor activation (part of the proposed mechanism) has cardiovascular relevance. The Phase II data did not show cardiovascular safety signals at studied doses, but this was in a controlled setting with exclusion criteria. Community users with uncontrolled hypertension or established heart disease should treat this as a precautionary flag.",
            },
            {
              tier: "watch", label: "Extended use beyond 12-week trial reference",
              detail: "The entirety of the human safety database ends at 12 weeks. Any use beyond this duration is without human evidence. Research-peptide cycles that extend this are operating in unstudied territory.",
            },
            {
              tier: "low", label: "Headache, nausea, injection-site reactions",
              detail: "The most commonly reported AEs in the Phase II trial. All were mild and transient. Injection-site irritation is managed with site rotation and standard injection hygiene.",
            },
            {
              tier: "low", label: "Sleep disruption in sensitive users",
              detail: "Reported anecdotally in wellness community. Not a prominent finding in the Phase II trial but consistently mentioned in real-world reports. Morning administration is the standard community mitigation.",
            },
          ].map((f) => {
            const colors = {
              flag: { bg: "#fff7f5", border: "#9e380022", tag: "#9e3800", tagBg: "#fde8e0" },
              watch: { bg: "#fffbf0", border: "#7c520022", tag: "#7c5200", tagBg: "#fef9ed" },
              low: { bg: "rgba(15,26,46,0.03)", border: "rgba(15,26,46,0.08)", tag: "#155e38", tagBg: "#f0fdf4" },
            }[f.tier] ?? { bg: "rgba(15,26,46,0.03)", border: "rgba(15,26,46,0.08)", tag: "#155e38", tagBg: "#f0fdf4" };
            return (
              <div key={f.label} style={{
                background: colors.bg, border: `1px solid ${colors.border}`,
                borderRadius: 10, padding: "12px 14px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, background: colors.tagBg, color: colors.tag, borderRadius: 6, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.tier}</span>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b" }}>{f.label}</span>
                </div>
                <p style={{ fontSize: 12.5, color: "#475569", margin: 0, lineHeight: 1.55 }}>{f.detail}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Serious symptoms */}
      <div style={{
        background: "#fff7f5", border: "1px solid rgba(158,56,0,0.15)",
        borderRadius: 14, padding: "16px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#9e3800", margin: "0 0 10px" }}>Serious symptoms — seek care</h3>
        <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "Chest pain, severe shortness of breath, or fainting",
            "Severe allergic reaction (hives, facial swelling, difficulty breathing)",
            "Significant blood sugar symptoms: confusion, unusual sweating, rapid heart rate (especially in diabetics on glucose-lowering medications)",
          ].map((s) => (
            <li key={s} style={{ fontSize: 13.5, color: "#9e3800", lineHeight: 1.5 }}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Playbook cards */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Before you start</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              title: "Metabolic baseline check",
              items: [
                "Fasting glucose and HbA1c: lipolytic activation affects glucose dynamics, especially in those with prediabetes or insulin resistance",
                "If on any diabetes medication (metformin, GLP-1 agonists, insulin, sulfonylureas): review before adding any metabolic peptide",
                "Body composition context: the Phase II enrolled obese patients — the metabolic response may differ in lean individuals",
              ],
            },
            {
              title: "Blood sugar monitoring (if diabetic or prediabetic)",
              items: [
                "Monitor fasting glucose and post-meal glucose during initial use — the metabolic mechanism creates real potential for glucose variability",
                "Do not adjust diabetes medication dosing without clinical guidance",
                "Watch for hypoglycemia symptoms if on insulin or sulfonylureas and adding AOD-9604",
              ],
            },
            {
              title: "Expectation anchoring — the Phase II lesson",
              items: [
                "The Phase II trial did not show significant weight loss vs placebo at 250–500mcg/day SC over 12 weeks",
                "Community-reported effects often exceed what the clinical data supports",
                "The real-world value of AOD-9604 (if any) is likely as a low-risk adjunct, not a primary fat-loss driver",
                "Source quality is the primary variable outside of pharmacological effect: peptide purity and sterility determine injection safety as much as the compound itself",
              ],
            },
          ].map((card) => (
            <div key={card.title} style={{
              background: "rgba(15,26,46,0.03)", borderRadius: 10,
              padding: "12px 14px", borderLeft: "3px solid rgba(15,26,46,0.15)",
            }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0f1a2e", marginBottom: 6 }}>{card.title}</div>
              <ul style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: 4 }}>
                {card.items.map((item) => (
                  <li key={item} style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.55 }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
