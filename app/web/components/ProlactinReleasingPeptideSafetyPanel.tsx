export default function ProlactinReleasingPeptideSafetyPanel() {
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
              tier: "watch",
              label: "No human safety profile established for standalone PrRP",
              detail: "Prolactin-releasing peptide has no clinical safety data in humans for therapeutic use. No Phase 1 safety trial for a standalone PrRP analogue in humans has been published as of 2026. Anyone using PrRP independently is operating with zero established safety parameters \u2014 no known safe dose range, no characterized adverse effect profile, no toxicity thresholds. This is not a theoretical gap; it is a complete absence of the foundation that safety assessment requires.",
            },
            {
              tier: "watch",
              label: "Potential prolactin effects (variable and uncertain)",
              detail: "Despite the naming confusion, PrRP can influence prolactin secretion in some contexts, particularly through hypothalamic pathways. The degree of prolactin effect in humans using exogenous PrRP is unknown. Elevated prolactin (hyperprolactinemia) causes galactorrhea, menstrual irregularities, reduced libido, and bone density effects. Suppressed prolactin has separate implications. Without human data, the direction and magnitude of any prolactin effect from standalone community use cannot be predicted.",
            },
            {
              tier: "low",
              label: "Research compound quality \u2014 no pharmaceutical-grade formulation",
              detail: "PrRP is not manufactured to pharmaceutical standards for human use anywhere. Community-sourced research peptide PrRP carries the same quality risks as any unverified injectable: endotoxin contamination, incorrect peptide sequence, inaccurate concentration, sterility failures. These sourcing risks dominate the real-world risk profile.",
            },
          ].map((f) => {
            const colors = {
              flag: { bg: "rgba(158,56,0,0.07)", border: "rgba(158,56,0,0.20)", tag: "#9e3800", tagBg: "rgba(158,56,0,0.10)", label: "Stop signal" },
              watch: { bg: "rgba(124,82,0,0.06)", border: "rgba(124,82,0,0.17)", tag: "#7c5200", tagBg: "rgba(124,82,0,0.10)", label: "Worth watching" },
              low: { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", tag: "#155e38", tagBg: "rgba(21,100,58,0.10)", label: "Low concern" },
            }[f.tier] ?? { bg: "rgba(15,26,46,0.03)", border: "rgba(15,26,46,0.08)", tag: "#155e38", tagBg: "#f0fdf4", label: "Low concern" };
            return (
              <div key={f.label} style={{
                background: colors.bg, border: `1px solid ${colors.border}`,
                borderRadius: 10, padding: "12px 14px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, background: colors.tagBg, color: colors.tag, borderRadius: 6, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{colors.label}</span>
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
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#9e3800", margin: "0 0 10px" }}>Serious symptoms \u2014 seek care</h3>
        <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "Severe allergic reaction (hives, facial swelling, difficulty breathing) \u2014 injection site or systemic",
            "Unexpected galactorrhea (milk discharge unrelated to nursing) \u2014 potential prolactin signal",
            "Menstrual cycle disruption or sudden libido changes \u2014 neuroendocrine involvement",
            "Severe nausea, headache, or loss of consciousness",
          ].map((s) => (
            <li key={s} style={{ fontSize: 13.5, color: "#9e3800", lineHeight: 1.5 }}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Before you start */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Before you start</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              title: "The honest framing: this compound has no human safety data",
              items: [
                "PrRP has no Phase 1 or Phase 2 safety trial data for standalone human use as of 2026",
                "The pharmaceutical development focus is on GLP-1/PrRP conjugates \u2014 not standalone PrRP injection",
                "There is no established dose, no known safe dose range, and no characterized adverse effect profile",
                "You would be among the first humans using this compound therapeutically \u2014 that is not hyperbole",
              ],
            },
            {
              title: "Neuroendocrine baseline",
              items: [
                "Baseline prolactin level before use (and monitoring during) is prudent given the naming and potential prolactin pathway effects",
                "Disclose use to prescriber if on any medications that affect prolactin (antipsychotics, dopamine agonists, dopamine antagonist antiemetics)",
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
