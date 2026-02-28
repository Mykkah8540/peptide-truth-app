export default function ThymosinA1EvidencePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat tiles */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
          { label: "Study type", value: "RCT / Review", color: "#1a5c3a" },
          { label: "Approved contexts", value: "HBV / HCV", color: "#1a5c3a" },
          { label: "Wellness data", value: "Extrapolated", color: "#7c5200" },
          { label: "Serious AEs", value: "Rare", color: "#1a5c3a" },
        ].map((t) => (
          <div key={t.label} style={{
            flex: "1 1 110px", background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12,
            padding: "12px 14px", textAlign: "center",
            boxShadow: "0 1px 4px rgba(15,26,46,0.06)",
          }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: t.color }}>{t.value}</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 3, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.label}</div>
          </div>
        ))}
      </div>

      {/* Evidence signals */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Evidence signals</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              claim: "Immune activation in chronic viral hepatitis (HBV/HCV)",
              status: "Confirmed — RCT-supported",
              color: "#1a5c3a", bg: "#f0fdf4",
              note: "Multiple RCTs in hepatitis B and C populations. Reduced viral load and improved immune markers in some studies. This is the approved clinical context.",
            },
            {
              claim: "T-cell maturation and dendritic cell enhancement",
              status: "Confirmed mechanistically",
              color: "#1a5c3a", bg: "#f0fdf4",
              note: "Well-characterized in vitro and animal data. The thymic biology is consistent and plausible. Human clinical translation in well-validated disease contexts.",
            },
            {
              claim: "Oncology adjunct (immune support alongside conventional therapy)",
              status: "Studied — mixed, context-dependent",
              color: "#7c5200", bg: "#fffbf0",
              note: "RCTs and reviews exist in cancer contexts (particularly in China). Effects are modest and population-specific. Not a first-line intervention anywhere.",
            },
            {
              claim: "COVID-19 immune support",
              status: "Studied — inconclusive",
              color: "#7c5200", bg: "#fffbf0",
              note: "Several trials ran during COVID-19 pandemic. Some signals of benefit in severe disease; methodological heterogeneity limits conclusions.",
            },
            {
              claim: "Wellness/immune optimization in healthy adults",
              status: "Not established",
              color: "#9e3800", bg: "#fff7f5",
              note: "No RCTs specifically targeting healthy-adult immune optimization. Effects extrapolated from disease populations with very different immune baseline. Evidence does not transfer cleanly.",
            },
          ].map((e) => (
            <div key={e.claim} style={{
              background: e.bg, border: `1px solid ${e.color}22`,
              borderRadius: 10, padding: "12px 14px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b" }}>{e.claim}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: e.color, background: `${e.color}15`, borderRadius: 6, padding: "2px 8px", whiteSpace: "nowrap" }}>{e.status}</span>
              </div>
              <p style={{ fontSize: 12.5, color: "#475569", margin: "8px 0 0", lineHeight: 1.55 }}>{e.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mechanism pathways */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Mechanism pathways</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { pathway: "T-cell maturation", detail: "Thymosin Alpha-1 accelerates maturation of precursor T-cells into functional CD4+ and CD8+ effectors — the core thymic signaling function for which it is named." },
            { pathway: "Dendritic cell + toll-like receptor activation", detail: "Activates dendritic cells and upregulates toll-like receptor signaling, improving antigen presentation and early innate immune response to pathogens." },
            { pathway: "Cytokine modulation (Th1/Th2 balance)", detail: "Shifts cytokine balance toward Th1-dominant responses (IL-2, IFN-γ), which is relevant in viral and intracellular pathogen contexts. This same shift is the mechanism of concern in autoimmune conditions." },
          ].map((p) => (
            <div key={p.pathway} style={{
              background: "rgba(15,26,46,0.03)", borderRadius: 10,
              padding: "12px 14px", borderLeft: "3px solid rgba(15,26,46,0.15)",
            }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0f1a2e", marginBottom: 4 }}>{p.pathway}</div>
              <p style={{ fontSize: 12.5, color: "#475569", margin: 0, lineHeight: 1.55 }}>{p.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "16px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "#0f1a2e", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Key sources</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { id: "E1", title: "Thymosin alpha 1: A comprehensive review of the literature (2020)", grade: "Review / Clinical", url: "https://pubmed.ncbi.nlm.nih.gov/33362999/" },
            { id: "E2", title: "Thymosin α1 and Its Role in Viral Infectious Diseases (2023)", grade: "Review / Mechanism + Clinical", url: "https://pubmed.ncbi.nlm.nih.gov/37110771/" },
            { id: "E3", title: "FDA document referencing Thymosin alpha-1 bulk drug substances (2024)", grade: "Regulatory / Compounding context", url: "https://www.fda.gov/media/183892/download" },
          ].map((s) => (
            <div key={s.id} style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              background: "rgba(15,26,46,0.03)", borderRadius: 10, padding: "10px 12px",
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, background: "#0f1a2e", color: "#fff", borderRadius: 5, padding: "2px 6px", flexShrink: 0, marginTop: 1 }}>{s.id}</span>
              <div>
                <div style={{ fontSize: 13, color: "#1e293b", fontWeight: 600 }}>{s.title}</div>
                <div style={{ fontSize: 11.5, color: "#64748b", marginTop: 2 }}>{s.grade}</div>
                <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11.5, color: "#2563eb", marginTop: 2, display: "block", wordBreak: "break-all" }}>{s.url}</a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
