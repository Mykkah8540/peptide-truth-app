export default function MotsCSafetyPanel() {
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
              detail: "MOTS-c activates AMPK and improves insulin sensitivity. In individuals on glucose-lowering therapy (metformin, insulin, GLP-1 agonists, sulfonylureas), adding an agent that sensitizes tissues to insulin creates additive hypoglycemia risk. The mechanism is directly analogous to metformin — in effect, you're stacking two insulin-sensitizing agents without clinical oversight.",
            },
            {
              tier: "flag", label: "Pregnancy and breastfeeding",
              detail: "No safety data exists. MOTS-c is a recently discovered peptide (2015) and has not been studied in pregnancy. Mitochondrial signaling during embryonic development and lactation is active and potentially sensitive to exogenous mitokines.",
            },
            {
              tier: "flag", label: "Adolescents",
              detail: "Metabolic, hormonal, and mitochondrial development is active during adolescence. Exogenous mitochondrial-derived peptides during this period have not been studied and carry unknown developmental risks.",
            },
            {
              tier: "watch", label: "Significant cardiovascular disease",
              detail: "AMPK activation has cardiovascular effects — generally considered beneficial in animal models (cardioprotective). However, in someone with established cardiac disease or taking cardiac medications, introducing an AMPK activator without clinical context warrants monitoring.",
            },
            {
              tier: "watch", label: "No human safety data — the core uncertainty",
              detail: "MOTS-c has no human clinical trial safety data as of 2025. All use in humans is research-grade without an established safety profile. The community side effect reports (headache, fatigue, nausea) are generic and not well-characterized as MOTS-c-specific vs injection-related vs sourcing-related.",
            },
            {
              tier: "low", label: "Headache, fatigue, nausea",
              detail: "Most commonly reported in community anecdote. Consistent with many injectable peptides — may reflect sourcing quality or injection reaction as much as compound-specific effects.",
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
            "Severe allergic reaction (hives, facial swelling, difficulty breathing)",
            "Chest pain, fainting, or severe shortness of breath",
            "Blood sugar symptoms in diabetics: confusion, unusual sweating, rapid heart rate (hypoglycemia screen)",
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
              title: "Metabolic and blood sugar baseline",
              items: [
                "Fasting glucose and HbA1c: MOTS-c's AMPK-mediated insulin sensitization is pharmacologically meaningful for anyone with diabetes or prediabetes",
                "If on metformin or any other glucose-lowering therapy: you may be layering mechanisms — review with a clinician",
                "MOTS-c + metformin: both activate AMPK through overlapping pathways — additive effects are plausible",
              ],
            },
            {
              title: "Evidence ceiling — calibrate expectations now",
              items: [
                "There are no human RCTs for MOTS-c as of 2025. The evidence is animal studies and human observational biomarker data.",
                "Community reports of effects (energy, recovery) cannot be distinguished from placebo or sourcing variability at this evidence stage",
                "MOTS-c is a genuinely interesting compound with strong mechanistic rationale — but the clinical translation is simply not proven yet",
                "Source quality is the dominant variable in real-world injectable MOTS-c use",
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
