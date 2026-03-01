export default function ProlactinReleasingPeptideEvidencePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat tiles */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
          { label: "Best study type", value: "Preclinical", color: "#7c5200" },
          { label: "Human RCTs", value: "None", color: "#9e3800" },
          { label: "FDA Approval", value: "None", color: "#9e3800" },
          { label: "Pipeline stage", value: "Early clinical", color: "#7c5200" },
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
              claim: "PrRP/GPR10 role in appetite suppression and energy balance",
              status: "Moderate \u2014 rodent + early human data",
              color: "#7c5200",
              bg: "rgba(124,82,0,0.06)",
              borderColor: "rgba(124,82,0,0.17)",
              note: "Central administration of PrRP in rodent models consistently reduces food intake and body weight. GPR10 knockout mice develop obesity, establishing GPR10 signaling as relevant to energy homeostasis. Early human data from genetic association studies (GPR10 variants linked to BMI) provide translational support. The mechanism is biologically credible, but rodent-to-human translation in appetite neurobiology has a poor historical track record.",
            },
            {
              tier: "moderate",
              claim: "GLP-1/PrRP conjugates for obesity treatment",
              status: "Moderate \u2014 preclinical + early clinical pipeline",
              color: "#7c5200",
              bg: "rgba(124,82,0,0.06)",
              borderColor: "rgba(124,82,0,0.17)",
              note: "Pharmaceutical development of GLP-1/PrRP dual agonist conjugates (combining GLP-1 receptor agonism with PrRP/GPR10 agonism) has advanced into early clinical trials. Preclinical data in obese mouse models shows additive or synergistic effects on body weight compared to GLP-1 agonism alone. This represents the most clinically relevant evidence context for PrRP \u2014 though it is conjugate-specific, not standalone PrRP.",
            },
            {
              tier: "none",
              claim: "FDA approval or established clinical use",
              status: "None",
              color: "#9e3800",
              bg: "rgba(158,56,0,0.06)",
              borderColor: "rgba(158,56,0,0.18)",
              note: "PrRP has no FDA-approved therapeutic use in any indication. No standalone PrRP analogue has completed Phase 3 trials or received regulatory authorization anywhere.",
            },
            {
              tier: "none",
              claim: "Community use evidence or established human dosing",
              status: "None",
              color: "#9e3800",
              bg: "rgba(158,56,0,0.06)",
              borderColor: "rgba(158,56,0,0.18)",
              note: "Community injection use of PrRP is anecdotal with no case series, no established dosing protocol, and no verified sourcing standards. The evidence base for how standalone PrRP behaves in humans at any dose is absent.",
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

      {/* Mechanism pathways */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Mechanism pathways</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { pathway: "GPR10 receptor agonism in hypothalamus and brainstem", detail: "PrRP binds GPR10 (also called UHR1) in the dorsomedial hypothalamus and nucleus tractus solitarius. These regions are central to energy balance regulation. GPR10 activation reduces food intake in rodent models through satiety signaling pathways." },
            { pathway: "NPFF2 receptor activity", detail: "PrRP also binds NPFF2 receptors (neuropeptide FF receptors), which are involved in pain modulation and energy homeostasis. This secondary receptor activity may contribute to both energy balance effects and potential neuromodulatory effects." },
            { pathway: "Stress response and autonomic regulation", detail: "PrRP neurons in the medulla project to hypothalamic regions involved in stress-induced anorexia and autonomic nervous system regulation. PrRP may serve as a stress-responsive satiety signal \u2014 mechanistically distinct from GLP-1\u2019s primarily peripheral gut hormone origin." },
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
            { id: "E1", title: "Prolactin-releasing peptide and energy balance (Hinuma et al., 1998 \u2014 discovery)", grade: "Discovery paper \u2014 GPR10 receptor identification", url: "https://pubmed.ncbi.nlm.nih.gov/9721103/" },
            { id: "E2", title: "GPR10 knockout mice develop obesity \u2014 Watanabe et al.", grade: "Animal study \u2014 energy balance mechanism", url: "https://pubmed.ncbi.nlm.nih.gov/15703210/" },
            { id: "E3", title: "PrRP analogues and obesity treatment (review)", grade: "Preclinical and early pipeline review", url: "https://pubmed.ncbi.nlm.nih.gov/31801693/" },
            { id: "E4", title: "GLP-1/PrRP dual agonist preclinical data", grade: "Preclinical \u2014 conjugate obesity pipeline context", url: "https://pubmed.ncbi.nlm.nih.gov/36351476/" },
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
