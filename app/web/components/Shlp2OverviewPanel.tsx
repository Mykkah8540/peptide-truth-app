export default function Shlp2OverviewPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { label: "Size", value: "12 Amino Acids", sub: "Mitochondrial-derived peptide (MDP)", accent: "#2c5282" },
          { label: "FDA Status", value: "Not Approved", sub: "No human clinical trials", accent: "#9e3800" },
          { label: "Origin", value: "Mitochondrial DNA", sub: "16S rRNA gene-encoded smORF", accent: "#2c5282" },
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
          SHLP-2 (Small Humanin-like Peptide 2) is a 12-amino-acid mitochondrial-derived peptide (MDP). It is one of several peptides encoded within small open reading frames (smORFs) in the 16S ribosomal RNA gene of the mitochondrial genome \u2014 the same genomic region that produces humanin, the most studied MDP. SHLP-2 was identified as part of a family of six humanin-like peptides (SHLP-1 through SHLP-6) and shares structural but not identical features with humanin.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: "10px 0 0" }}>
          Proposed biological actions include cytoprotection, anti-apoptotic signaling, anti-inflammatory effects, and insulin sensitization \u2014 similar territory to humanin and MOTS-c. Early research suggests cardioprotective and neuroprotective potential in cell and animal models. Circulating SHLP-2 levels have been associated with longevity markers in some human cohort studies. There are no human clinical trials as of 2026. Community interest is in the longevity and mitochondrial optimization space.
        </p>
      </div>

      {/* What makes it unique */}
      <div style={{
        background: "linear-gradient(135deg,rgba(44,82,130,0.07) 0%,rgba(15,26,46,0.04) 100%)",
        border: "1px solid rgba(44,82,130,0.15)", borderRadius: 14, padding: "16px 20px",
        boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: "#2c5282", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>The mitochondrial genome angle</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#334155", margin: 0 }}>
          SHLP-2 is encoded by mitochondrial DNA \u2014 the separate, ancient genome carried inside mitochondria. This is the same origin as MOTS-c and humanin. What makes the SHLP family interesting from a biology perspective is that the mitochondrial 16S rRNA gene was long thought to encode only structural RNA. The discovery that it also encodes bioactive peptides \u2014 via small open reading frames \u2014 is a relatively recent paradigm shift. SHLP-2 specifically has shown some of the strongest anti-apoptotic and insulin-sensitizing signals within the SHLP family in early cell-based studies. How this translates to injected exogenous SHLP-2 in humans is entirely unknown.
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
            { icon: "\u25b3", color: "#7c5200", bg: "#fffbf0", label: "Longevity / mitochondrial biology research interest", note: "Genuinely novel biology \u2014 but evidence is entirely preclinical and observational; human benefit from exogenous SHLP-2 is unestablished" },
            { icon: "\u2717", color: "#9e3800", bg: "#fff7f5", label: "Expecting an established safety profile", note: "Completely uncharacterized in clinical settings. No Phase 1 trial, no dose-finding, no human safety data" },
            { icon: "\u2717", color: "#9e3800", bg: "#fff7f5", label: "People on insulin or antidiabetic medications", note: "Putative insulin-sensitizing effects could be additive with glucose-lowering therapy \u2014 an unstudied and potentially meaningful interaction" },
            { icon: "\u2717", color: "#9e3800", bg: "#fff7f5", label: "Expecting pharmaceutical-grade sourcing", note: "No pharmaceutical manufacturer produces SHLP-2. All community sources are unverified research peptide vendors" },
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

      {/* Comparison: MDP family */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>How it compares (mitochondrial-derived peptide family)</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(15,26,46,0.10)" }}>
                {["", "SHLP-2", "Humanin", "MOTS-c"].map((h) => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: h ? "center" : "left", fontWeight: 700, color: "#0f1a2e", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Size", vals: ["12 AA", "21 AA", "16 AA"] },
                { label: "mtDNA locus", vals: ["16S rRNA", "16S rRNA", "12S rRNA"] },
                { label: "Primary mechanism", vals: ["Anti-apoptotic, insulin sensitizing", "Cytoprotection, anti-apoptotic", "AMPK / insulin sensitizing"] },
                { label: "Human RCT data", vals: ["None", "Very limited", "None"] },
                { label: "Community interest", vals: ["Longevity stack", "Neuroprotection, longevity", "Metabolic, longevity"] },
                { label: "Discovery year", vals: ["2016", "2001", "2015"] },
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
            "Longevity stack context \u2014 SHLP-2 alongside humanin, MOTS-c, NAD+ precursors",
            "Cardioprotection and neuroprotection interest from early preclinical data",
            "Biomarker studies associating circulating SHLP-2 levels with longevity markers",
            "Sourcing and verification challenges \u2014 limited vendor availability and purity verification",
            "Stacking with other mitochondrial-support compounds (CoQ10, PQQ, NMN/NR)",
          ].map((t) => (
            <li key={t} style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>{t}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
