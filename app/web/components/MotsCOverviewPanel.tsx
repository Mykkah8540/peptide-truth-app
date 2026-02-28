export default function MotsCOverviewPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { label: "Origin", value: "Mitochondrial DNA", sub: "Naturally encoded in mtDNA", accent: "#2c5282" },
          { label: "Discovered", value: "2015", sub: "Very early-stage research compound", accent: "#7c5200" },
          { label: "Human Evidence", value: "Observational Only", sub: "No human RCTs yet", accent: "#9e3800" },
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
          MOTS-c is a tiny peptide your body produces naturally — specifically from your mitochondria, the energy-generating structures inside every cell. It was only discovered in 2015, and levels rise when you exercise and decline as you age. The interest centers on metabolic health, insulin sensitivity, and longevity — similar territory to NAD+.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: "10px 0 0" }}>
          The honest caveat: this is very early-stage. Unlike NAD+, which has a growing human clinical evidence base, MOTS-c evidence in 2025 is primarily animal studies and observational data in humans. No published human RCTs exist yet. Anyone using it is working ahead of the clinical evidence — worth being clear-eyed about before you start.
        </p>
      </div>

      {/* Why it's distinct */}
      <div style={{
        background: "linear-gradient(135deg,rgba(44,82,130,0.07) 0%,rgba(15,26,46,0.04) 100%)",
        border: "1px solid rgba(44,82,130,0.15)", borderRadius: 14, padding: "16px 20px",
        boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: "#2c5282", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>What makes it unique</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#334155", margin: 0 }}>
          MOTS-c is the only well-known peptide in the wellness community that is encoded by mitochondrial DNA rather than nuclear DNA. This is scientifically meaningful — it suggests a signaling role for mitochondria beyond their energy-production function, acting as a metabolic stress-response messenger. The compound is also genuinely exercise-responsive (levels rise acutely with physical activity), making it conceptually interesting as an "exercise mimetic" — though whether exogenous injection replaces or augments this endogenous response is an open question.
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
            { icon: "△", color: "#7c5200", bg: "#fffbf0", label: "Metabolic health curiosity with realistic expectations", note: "Animal data + observational biomarker data — mechanistically compelling, but human efficacy is not established" },
            { icon: "△", color: "#7c5200", bg: "#fffbf0", label: "Longevity / mitochondrial optimization interest", note: "Early evidence — the narrative is exciting, the proof in humans is not yet there" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Diabetes or unstable blood sugar control", note: "AMPK-mediated insulin sensitization means glucose effects are real — interaction with glucose-lowering medications requires attention" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Expecting human RCT-level evidence — doesn't exist yet", note: "The evidence base is genuinely pre-clinical and observational as of 2025" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Pregnancy, breastfeeding, adolescents", note: "No safety data; metabolic/endocrine development context" },
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
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>How it compares (longevity/metabolic category)</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(15,26,46,0.10)" }}>
                {["", "MOTS-c", "NAD+ (NMN/NR)", "Humanin"].map((h) => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: h ? "center" : "left", fontWeight: 700, color: "#0f1a2e", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Origin", vals: ["Mitochondrial DNA", "Coenzyme (nuclear pathway)", "Mitochondrial DNA"] },
                { label: "Primary mechanism", vals: ["AMPK / insulin sensitization", "NAD+ coenzyme replenishment", "Mitochondrial stress response"] },
                { label: "Human RCT data", vals: ["None (2025)", "Growing (NMN/NR trials)", "Very limited"] },
                { label: "Exercise responsive", vals: ["Yes — rises with exercise", "Indirectly", "Less studied"] },
                { label: "Glucose effects", vals: ["Yes — insulin sensitization", "Minor", "Not established"] },
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
            "Exercise performance and recovery optimization (the 'exercise mimetic' framing)",
            "Insulin sensitivity and metabolic health in the context of longevity protocols",
            "Stacking with NAD+ precursors (NMN or NR) for mitochondrial support themes",
            "Age-related metabolic decline context — MOTS-c levels declining with age is the main hook",
            "Early adopter / cutting-edge research community interest — it's very new and carries the excitement (and uncertainty) of a novel compound",
          ].map((t) => (
            <li key={t} style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>{t}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
