export default function ThymosinA1OverviewPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { label: "Primary Mechanism", value: "Immune Modulation", sub: "T-cell maturation + DC activation", accent: "#0f1a2e" },
          { label: "Evidence Base", value: "RCT-Supported", sub: "Human controlled trial data in immune contexts", accent: "#2c5282" },
          { label: "Regulatory Status", value: "~35 Countries", sub: "Not US FDA-approved; compounding available", accent: "#1a5c3a" },
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
          Thymosin Alpha-1 is a naturally occurring compound your thymus produces to coordinate immune function. It helps your immune system respond appropriately — neither over-activating nor suppressing — which is why it&apos;s described as an immune modulator rather than an immune stimulant. In wellness contexts, it&apos;s most often used during periods of heavy training, frequent illness, or prolonged stress where immune resilience is the goal.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: "10px 0 0" }}>
          Thymalfasin (brand name Zadaxin) has been commercially available since the 1980s and is approved in approximately 35 countries — including many in Asia and parts of Europe. It is not FDA-approved in the United States but is available via compounding pharmacies and widely discussed in immune optimization communities.
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
            { icon: "✓", color: "#1a5c3a", bg: "#f0fdf4", label: "Immune resilience during high training volume or frequent illness seasons", note: "Core use case in wellness community — immune support without stimulation or suppression" },
            { icon: "✓", color: "#1a5c3a", bg: "#f0fdf4", label: "Recovery-oriented goals: post-illness, high-stress periods, surgery recovery", note: "Thymosin A1's immune modulation is used in recovery and resilience contexts, not as a treatment for acute illness" },
            { icon: "✓", color: "#1a5c3a", bg: "#f0fdf4", label: "Interest in immune calibration: modulating, not suppressing or over-activating", note: "The mechanism — T-cell maturation and dendritic cell activation — supports immune competence, not stimulation per se" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Autoimmune disease (lupus, RA, MS, IBD)", note: "Immune activation can exacerbate autoimmune conditions" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Organ transplant or on immunosuppressive therapy", note: "Direct pharmacological conflict" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Active systemic infection with significant symptoms", note: "Timing and immune status matter — not a treatment for acute illness" },
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

      {/* How it compares */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>How it compares</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(15,26,46,0.10)" }}>
                {["", "Thymosin Alpha-1", "BPC-157", "TB-500"].map((h) => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: h ? "center" : "left", fontWeight: 700, color: "#0f1a2e", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Primary domain", vals: ["Immune modulation", "GI healing / tissue repair", "Tissue repair / angiogenesis"] },
                { label: "Regulatory status", vals: ["Approved ~35 countries", "Research peptide", "Research peptide"] },
                { label: "Human RCT data", vals: ["Yes (hepatitis contexts)", "No", "No"] },
                { label: "Autoimmune concern", vals: ["Yes — can worsen", "Generally low", "Low (monitoring recommended)"] },
                { label: "Route", vals: ["Subcutaneous", "Oral or SC", "Subcutaneous"] },
              ].map((row, i) => (
                <tr key={row.label} style={{ background: i % 2 === 0 ? "rgba(15,26,46,0.03)" : "transparent" }}>
                  <td style={{ padding: "8px 10px", fontWeight: 600, color: "#334155", whiteSpace: "nowrap" }}>{row.label}</td>
                  {row.vals.map((v, j) => (
                    <td key={j} style={{ padding: "8px 10px", textAlign: "center", color: "#475569" }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
            "Immune support during frequent illness seasons or high training volume",
            "Resilience interest during high stress or recovery from surgery/illness",
            "Adjunct interest in chronic infection discussions (Lyme, EBV, post-COVID contexts)",
            "Interest in immune calibration and inflammatory balance",
            "Zadaxin as a brand reference in international availability discussions",
          ].map((t) => (
            <li key={t} style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>{t}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
