export default function GhkCuOverviewPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { label: "Primary Route", value: "Topical", sub: "Injectable = higher risk, less clarity", accent: "#2c5282" },
          { label: "Risk Score", value: "2 / 10", sub: "Lowest systemic risk in this class", accent: "#1a5c3a" },
          { label: "Evidence Base", value: "Small Human Studies", sub: "Formulation-dependent results", accent: "#7c5200" },
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
          GHK-Cu (Copper Tripeptide-1) is a naturally occurring copper-binding tripeptide — Glycine-Histidine-Lysine complexed with copper — produced in human plasma, saliva, and urine. Concentrations decline with age, which forms the basis of interest in supplementation. It has been widely used in cosmetic and skincare formulations since the 1990s.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: "10px 0 0" }}>
          GHK-Cu is classified as <strong>investigational_human</strong> — it is not an FDA-approved drug but is legal as a cosmetic ingredient globally. Its effects are highly formulation-dependent: absorption through skin barrier layers varies significantly by product, and results in small human trials reflect this variability. The systemic risk profile of topical use is genuinely low.
        </p>
      </div>

      {/* Important distinction: topical vs injectable */}
      <div style={{
        background: "linear-gradient(135deg,rgba(124,82,0,0.06) 0%,rgba(15,26,46,0.04) 100%)",
        border: "1px solid rgba(124,82,0,0.18)", borderRadius: 14, padding: "16px 20px",
        boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: "#7c5200", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Route distinction — this matters</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#334155", margin: 0 }}>
          <strong>Topical GHK-Cu</strong> (serums, creams) has a genuinely low risk profile. Systemic absorption through intact skin is limited; the cosmetic evidence, while modest, is real. <strong>Injectable GHK-Cu</strong> exists in research peptide circles — it carries meaningfully higher systemic risk with less supporting real-world data than the topical form. The panels on this page apply primarily to topical use unless otherwise noted.
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
            { icon: "✓", color: "#1a5c3a", bg: "#f0fdf4", label: "Skin appearance and texture interest (topical)", note: "Best-evidenced use case; modest but real signal in small RCTs" },
            { icon: "✓", color: "#1a5c3a", bg: "#f0fdf4", label: "Aging skin, wound healing, barrier support discussions", note: "Mechanistic plausibility is strong; clinical magnitude is mild-to-moderate" },
            { icon: "✓", color: "#1a5c3a", bg: "#f0fdf4", label: "Hair/scalp support (topical formulations)", note: "Discussed in cosmetic communities; evidence is limited but low-risk to explore" },
            { icon: "△", color: "#7c5200", bg: "#fffbf0", label: "Injectable GHK-Cu for systemic effects", note: "Higher risk, much weaker evidence base vs topical; manage expectations significantly" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Copper sensitivity or Wilson's disease", note: "Copper-binding peptide in someone with copper metabolism disorder is a direct contraindication" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Severe active dermatitis or broken skin barrier", note: "Applying actives to compromised skin increases systemic absorption unpredictably" },
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

      {/* Comparison table */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>How it compares (skin actives)</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(15,26,46,0.10)" }}>
                {["", "GHK-Cu", "Retinoids", "Peptide serums"].map((h) => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: h ? "center" : "left", fontWeight: 700, color: "#0f1a2e", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Mechanism", vals: ["Copper-mediated remodeling", "Retinoic acid / gene expression", "Various receptor targets"] },
                { label: "Human evidence", vals: ["Small RCTs (modest)", "Robust (decades of data)", "Variable by formulation"] },
                { label: "Irritation potential", vals: ["Low", "Moderate-High", "Low-Moderate"] },
                { label: "Photosensitivity", vals: ["None known", "Yes (retinoids)", "None known"] },
                { label: "Systemic risk", vals: ["Very low (topical)", "Low (topical)", "Very low"] },
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
        background: "linear-gradient(135deg,rgba(44,82,130,0.07) 0%,rgba(15,26,46,0.04) 100%)",
        border: "1px solid rgba(44,82,130,0.15)", borderRadius: 14, padding: "18px 20px",
        boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 10px" }}>What people discuss</h3>
        <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "Skin texture, firmness, and aging appearance support (the core topical use case)",
            "Hair thinning and scalp health (often stacked with topical minoxidil in hair loss protocols)",
            "Wound healing acceleration (anecdotal; the preclinical data is strong even if human data is thin)",
            "Stacking with retinoids — some community members cycle or layer these; irritation is the key variable",
            "Injectable GHK-Cu discussions (higher risk, fewer data points, emerging from biohacker communities)",
          ].map((t) => (
            <li key={t} style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>{t}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
