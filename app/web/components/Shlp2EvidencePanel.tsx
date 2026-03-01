export default function Shlp2EvidencePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat tiles */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
          { label: "Best study type", value: "Cell + Animal", color: "#7c5200" },
          { label: "Human RCTs", value: "None", color: "#9e3800" },
          { label: "FDA Approval", value: "None", color: "#9e3800" },
          { label: "Discovery year", value: "2016", color: "#2c5282" },
        ].map((t) => (
          <div key={t.label} style={{
            flex: "1 1 110px", background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12,
            padding: "12px 14px", textAlign: "center",
            boxShadow: "0 1px 4px rgba(15,26,46,0.06)",
          }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: t.color, lineHeight: 1.2 }}>{t.value}</div>
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
              tier: "moderate",
              claim: "Mitochondrial-derived peptide biology \u2014 SHLP-2 identified in mitochondrial genome",
              status: "Moderate \u2014 established molecular biology",
              color: "#7c5200",
              bg: "rgba(124,82,0,0.06)",
              borderColor: "rgba(124,82,0,0.17)",
              note: "SHLP-2 was identified in 2016 as part of a family of six humanin-like peptides encoded in small open reading frames within the mitochondrial 16S rRNA gene (Cobb et al., 2016). Its existence as an endogenous mitochondrial-derived peptide with measurable circulating levels in humans is established. The molecular biology is solid \u2014 what is not established is whether exogenous SHLP-2 administration produces clinically meaningful effects in humans.",
            },
            {
              tier: "none",
              claim: "Human clinical trials of exogenous SHLP-2",
              status: "None",
              color: "#9e3800",
              bg: "rgba(158,56,0,0.06)",
              borderColor: "rgba(158,56,0,0.18)",
              note: "As of 2026, no human clinical trials of exogenous SHLP-2 administration have been published. All human evidence is observational \u2014 measuring endogenous circulating SHLP-2 levels and correlating them with health markers. The gap between observational biomarker associations and therapeutic injection is enormous and not yet bridged.",
            },
            {
              tier: "none",
              claim: "Established human safety profile",
              status: "None \u2014 completely uncharacterized",
              color: "#9e3800",
              bg: "rgba(158,56,0,0.06)",
              borderColor: "rgba(158,56,0,0.18)",
              note: "SHLP-2 has no clinical safety data. No Phase 1 dose-escalation trial exists. No pharmacokinetic data in humans (half-life, distribution, elimination) has been published for exogenous SHLP-2. Safe dose ranges are entirely unknown.",
            },
            {
              tier: "none",
              claim: "Approved clinical use",
              status: "None",
              color: "#9e3800",
              bg: "rgba(158,56,0,0.06)",
              borderColor: "rgba(158,56,0,0.18)",
              note: "SHLP-2 has no regulatory approval in any jurisdiction for any indication. It is not a pharmaceutical product and is not in late-stage clinical development as of 2026.",
            },
          ].map((e) => (
            <div key={e.claim} style={{
              background: e.bg, border: `1px solid ${e.borderColor}`,
              borderRadius: 10, padding: "12px 14px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b" }}>{e.claim}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: e.color, background: `${e.color}15`, borderRadius: 6, padding: "2px 8px", whiteSpace: "nowrap" }}>{e.status}</span>
              </div>
              <div className="reta-evidence__entry-body" style={{ fontSize: 12.5, color: "#475569", margin: "8px 0 0", lineHeight: 1.55 }}>{e.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Preclinical findings */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Preclinical and mechanistic findings</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { pathway: "Anti-apoptotic and cytoprotective effects in cell models", detail: "SHLP-2 has demonstrated anti-apoptotic activity in cellular models \u2014 protecting cells from programmed death in conditions of metabolic stress or injury. These effects are similar to humanin but appear to operate through partially distinct receptor pathways, potentially including formyl peptide receptor-like 1 (FPRL1/FPR2)." },
            { pathway: "Insulin sensitization in cell and animal models", detail: "Like humanin, SHLP-2 has shown insulin-sensitizing effects in cell-based assays and early animal models. This is the primary basis for the concern about additive hypoglycemia risk in people on antidiabetic medications." },
            { pathway: "Cardioprotective effects in early research", detail: "Preliminary animal and cell data suggest SHLP-2 may protect cardiac cells from ischemic injury. The mechanism may involve mitochondrial membrane potential preservation and inhibition of apoptotic cascades. This is speculative in the human context." },
            { pathway: "Longevity biomarker association in cohort studies", detail: "Observational data show that higher circulating SHLP-2 levels are associated with markers of healthier aging in some human cohort studies. This correlation is interesting but does not establish causality \u2014 SHLP-2 may be a marker of good mitochondrial health rather than a cause of it." },
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
            { id: "E1", title: "Mitochondrial-derived peptides MOTS-c and SHLPs: Emerging protagonists of aging (Cobb et al., 2016)", grade: "Discovery paper \u2014 SHLP family identification", url: "https://pubmed.ncbi.nlm.nih.gov/27018024/" },
            { id: "E2", title: "Small humanin-like peptides (SHLPs): Identification, functional characterization (review)", grade: "Mechanistic review \u2014 anti-apoptotic and metabolic effects", url: "https://pubmed.ncbi.nlm.nih.gov/28512037/" },
            { id: "E3", title: "Association of circulating SHLPs with longevity markers in human cohorts", grade: "Observational \u2014 human biomarker association", url: "https://pubmed.ncbi.nlm.nih.gov/32209295/" },
            { id: "E4", title: "Mitochondrial-derived peptides in aging and disease (review, 2022)", grade: "Review synthesis \u2014 MDP family context", url: "https://pubmed.ncbi.nlm.nih.gov/35036975/" },
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
