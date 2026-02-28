export default function Aod9604OverviewPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { label: "Structure", value: "hGH Fragment 176–191", sub: "Lipolytic domain only", accent: "#2c5282" },
          { label: "Key Design", value: "GH-Sparing", sub: "No IGF-1 or growth axis stimulation (intended)", accent: "#1a5c3a" },
          { label: "Human Trials", value: "Phase II Completed", sub: "FDA approval not obtained", accent: "#7c5200" },
        ].map((c) => (
          <div key={c.label} style={{
            flex: "1 1 160px", background: "rgba(255,255,255,0.80)",
            border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14,
            padding: "14px 16px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: c.accent, lineHeight: 1.2 }}>{c.value}</div>
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
          AOD-9604 is a synthetic peptide comprising amino acids 176–191 of human growth hormone — specifically the C-terminal region identified as responsible for hGH's lipolytic (fat-metabolizing) effects. It was developed to isolate these fat-burning properties while avoiding the growth-axis effects (IGF-1 elevation, anabolic signaling) associated with full-length hGH.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: "10px 0 0" }}>
          The drug completed Phase II clinical trials for obesity with human safety data showing a reasonable short-term profile. However, clinically meaningful weight loss was not demonstrated at the doses studied, and FDA approval was not obtained. It is now widely sold as a research peptide for fat-loss and metabolic goals, with the Phase II experience providing real but limited human reference points.
        </p>
      </div>

      {/* The GH-sparing distinction */}
      <div style={{
        background: "linear-gradient(135deg,rgba(26,92,58,0.07) 0%,rgba(15,26,46,0.04) 100%)",
        border: "1px solid rgba(26,92,58,0.15)", borderRadius: 14, padding: "16px 20px",
        boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: "#1a5c3a", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Why the "GH-sparing" claim matters</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#334155", margin: 0 }}>
          Full hGH and GH secretagogues (CJC-1295, ipamorelin, MK-677) elevate IGF-1, affect glucose metabolism, and have growth-signaling effects that create endocrine monitoring requirements. AOD-9604 is designed to skip all of this — activating fat metabolism pathways without touching the GH receptor or elevating IGF-1. In the Phase II trials, this was largely confirmed. It changes the risk profile significantly vs GH-axis compounds, though metabolic effects on glucose still warrant attention in diabetics.
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
            { icon: "✓", color: "#1a5c3a", bg: "#f0fdf4", label: "Fat-loss interest without GH-axis concerns (in healthy metabolic baseline)", note: "The GH-sparing design is the core appeal vs CJC-1295 + ipamorelin stacks" },
            { icon: "✓", color: "#1a5c3a", bg: "#f0fdf4", label: "Conservative expectations with human safety reference data", note: "Phase II data provides a real (if limited) human safety anchor" },
            { icon: "△", color: "#7c5200", bg: "#fffbf0", label: "Weight-loss as a primary goal", note: "Clinically meaningful weight loss was not demonstrated in Phase II — expect modest effects at best" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Diabetes or unstable blood sugar control", note: "Metabolic mechanism means glucose effects still possible despite GH-sparing design" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Pregnancy, breastfeeding, adolescents", note: "No safety data; growth/metabolic axis involvement is a developmental concern" },
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
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>How it compares (fat-loss context)</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(15,26,46,0.10)" }}>
                {["", "AOD-9604", "Full hGH", "CJC-1295 + Ipa"].map((h) => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: h ? "center" : "left", fontWeight: 700, color: "#0f1a2e", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Mechanism", vals: ["hGH fragment (lipolysis only)", "Full GH receptor activation", "GH secretagogue stack"] },
                { label: "IGF-1 elevation", vals: ["No (design goal)", "Yes", "Yes"] },
                { label: "Anabolic effects", vals: ["Minimal", "Significant", "Moderate"] },
                { label: "Glucose effects", vals: ["Possible (metabolic)", "Yes — significant", "Yes — significant"] },
                { label: "Human trial data", vals: ["Phase II (obesity)", "Extensive", "Limited (CJC-1295 only)"] },
                { label: "Fat-loss outcome", vals: ["Modest / Not FDA-approved", "Real but GH risks", "Variable / extrapolated"] },
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
            "Fat loss without GH-axis concerns (the primary appeal vs CJC/ipa stacks)",
            "Stubborn fat targeting narratives (abdominal fat, visceral fat discussions)",
            "Stacking with CJC-1295 + ipamorelin for body composition goals (common combination)",
            "Curiosity about a peptide that actually ran human trials — more grounded than fully research-grade compounds",
            "The failure to obtain FDA approval is acknowledged in most community discussions",
          ].map((t) => (
            <li key={t} style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>{t}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
