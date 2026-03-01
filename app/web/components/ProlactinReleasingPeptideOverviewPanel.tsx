export default function ProlactinReleasingPeptideOverviewPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { label: "Size", value: "PrRP20 / PrRP31", sub: "20 or 31 amino acid forms", accent: "#2c5282" },
          { label: "FDA Status", value: "Not Approved", sub: "Research compound only", accent: "#9e3800" },
          { label: "Primary Receptor", value: "GPR10", sub: "Energy balance, appetite suppression", accent: "#2c5282" },
        ].map((c) => (
          <div key={c.label} style={{
            flex: "1 1 160px", background: "rgba(255,255,255,0.80)",
            border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14,
            padding: "14px 16px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: c.accent, lineHeight: 1.2 }}>{c.value}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Overview */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 10px" }}>What it is</h3>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: 0 }}>
          Prolactin-releasing peptide (PrRP) is a neuropeptide that exists in two naturally occurring forms: PrRP20 (20 amino acids) and PrRP31 (31 amino acids). Despite its name, PrRP\u2019s most characterized physiological role is not prolactin secretion \u2014 it is energy balance and appetite suppression. It acts primarily through GPR10 receptors in the hypothalamus and brainstem, with emerging data on NPFF2 receptor activity. Its role in prolactin regulation in humans appears to be secondary to other pathways.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: "10px 0 0" }}>
          The translational interest in PrRP is its potential as an obesity treatment, particularly in the context of GLP-1/PrRP dual agonist conjugates being developed by pharmaceutical companies. Standalone PrRP analogue research exists in preclinical and very early clinical stages. There is no FDA-approved therapeutic use. Anyone using PrRP independently is working with a compound that has no established clinical safety profile.
        </p>
      </div>

      {/* What makes it unique */}
      <div style={{
        background: "linear-gradient(135deg,rgba(44,82,130,0.07) 0%,rgba(15,26,46,0.04) 100%)",
        border: "1px solid rgba(44,82,130,0.15)", borderRadius: 14, padding: "16px 20px",
        boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: "#2c5282", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>The name is misleading</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#334155", margin: 0 }}>
          PrRP was named based on its initial identification as a prolactin-releasing factor in rodent pituitary studies. Subsequent research has established that its primary physiological role is in energy homeostasis, food intake suppression, and stress responses \u2014 not prolactin regulation. The naming is a historical artifact. In humans, prolactin secretion is predominantly controlled by dopamine and TRH, not PrRP. This distinction matters for understanding both the compound\u2019s likely effects and its interaction profile.
        </p>
      </div>

      {/* Is it a fit? */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Is it a fit?</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { icon: "\u25b3", color: "#7c5200", bg: "#fffbf0", label: "Early-adopter research interest in novel obesity mechanisms", note: "GLP-1/PrRP conjugates are a real pharmaceutical pipeline \u2014 but standalone community PrRP use is ahead of the evidence by a very wide margin" },
            { icon: "\u2717", color: "#9e3800", bg: "#fff7f5", label: "Expecting an established safety profile", note: "No human clinical safety data for standalone PrRP exists. Source quality and contamination risk dominate real-world risk" },
            { icon: "\u2717", color: "#9e3800", bg: "#fff7f5", label: "People on dopamine-active medications (antipsychotics, dopamine agonists)", note: "Potential prolactin-modulating effects interact with drugs that already affect the dopamine-prolactin axis" },
            { icon: "\u2717", color: "#9e3800", bg: "#fff7f5", label: "People on GLP-1 agonists", note: "GLP-1/PrRP conjugates are in development precisely because these pathways interact \u2014 combining standalone agents is unstudied and potentially duplicative" },
          ].map((row) => (
            <div key={row.label} style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              background: row.bg, borderRadius: 10, padding: "10px 14px",
            }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: row.color, flexShrink: 0, marginTop: 1 }}>{row.icon}</span>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1e293b" }}>{row.label}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{row.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What people discuss */}
      <div style={{
        background: "linear-gradient(135deg,rgba(26,92,58,0.07) 0%,rgba(15,26,46,0.04) 100%)",
        border: "1px solid rgba(26,92,58,0.15)", borderRadius: 14, padding: "18px 20px",
        boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 10px" }}>What people discuss</h3>
        <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "Appetite suppression and weight loss \u2014 the GPR10 energy balance mechanism is the main hook",
            "The GLP-1/PrRP dual agonist pipeline \u2014 watching pharmaceutical development with interest",
            "Confusion about the prolactin angle \u2014 the name frequently misleads people about what it does",
            "Sourcing quality concerns \u2014 very limited vendor supply and verification options",
            "Speculation about synergy with GLP-1 agonists (semaglutide) \u2014 an unstudied combination",
          ].map((t) => (
            <li key={t} style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>{t}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
