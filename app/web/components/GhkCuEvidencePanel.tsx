export default function GhkCuEvidencePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat tiles */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
          { label: "Study type", value: "Small RCTs", color: "#7c5200" },
          { label: "Route studied", value: "Topical", color: "#1a5c3a" },
          { label: "Mechanism", value: "Copper / ECM", color: "#2c5282" },
          { label: "Effect size", value: "Modest", color: "#7c5200" },
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
              claim: "Skin appearance improvement (wrinkles, texture, firmness)",
              status: "Modest human evidence",
              color: "#7c5200", bg: "#fffbf0",
              note: "Clinical cosmetic studies (including a small RCT in photoaged skin) show some improvement in objective skin parameters. Effect sizes are modest and patient-reported outcomes sometimes exceed measured changes. Results vary by formulation.",
            },
            {
              claim: "Collagen synthesis and ECM remodeling (mechanistic)",
              status: "Confirmed — preclinical + in vitro",
              color: "#1a5c3a", bg: "#f0fdf4",
              note: "GHK-Cu stimulates fibroblast activity, collagen and elastin production, and extracellular matrix remodeling in vitro and in animal models. This is the mechanistic backbone of the cosmetic evidence. Human translation is directionally consistent but effect magnitude is uncertain.",
            },
            {
              claim: "Skin penetration and delivery to target layers",
              status: "Formulation-dependent — studied in vitro",
              color: "#7c5200", bg: "#fffbf0",
              note: "In vitro penetration studies show GHK-Cu can reach the dermis under some delivery conditions but absorption varies significantly by formulation, vehicle, and skin condition. Product quality is a major variable in real-world outcomes.",
            },
            {
              claim: "Hair/scalp effects",
              status: "Limited — mixed evidence",
              color: "#7c5200", bg: "#fffbf0",
              note: "Discussed widely in hair loss communities. Some in vitro data on follicle stimulation. Human clinical evidence is minimal and often confounded by combination products. Used anecdotally, with modest expectations.",
            },
            {
              claim: "Wound healing acceleration",
              status: "Preclinical support — limited human data",
              color: "#7c5200", bg: "#fffbf0",
              note: "Strong preclinical evidence for wound healing in animal models. Human clinical data is sparse and largely from case reports or small observational studies. Biologially plausible; not established as a clinical intervention.",
            },
            {
              claim: "Systemic or injectable effects",
              status: "Not established",
              color: "#9e3800", bg: "#fff7f5",
              note: "Injectable GHK-Cu is used in biohacker circles. Systemic pharmacology is poorly characterized. The extensive topical safety and cosmetic literature does not transfer to injectable use, which carries higher absorption variability and unknown systemic risk.",
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
            { pathway: "Copper delivery to ECM-remodeling enzymes", detail: "GHK-Cu acts as a copper chaperone — it delivers copper ions to lysyl oxidase and other copper-dependent enzymes that crosslink collagen and elastin. This is the core structural mechanism driving skin remodeling interest." },
            { pathway: "Fibroblast activation and proliferation", detail: "GHK-Cu stimulates fibroblast activity in vitro, increasing collagen I, elastin, and glycosaminoglycan synthesis. The tripeptide portion (GHK) has receptor-mediated effects independent of copper." },
            { pathway: "Anti-inflammatory and antioxidant activity", detail: "Some evidence for suppression of inflammatory cytokine signaling and free radical scavenging. Relevant to aging skin contexts where oxidative damage contributes to degradation of ECM components." },
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
            { id: "E1", title: "Regenerative and Protective Actions of the GHK-Cu Peptide in the Skin (PMC, 2018)", grade: "Review — mechanism + human evidence", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6073405/" },
            { id: "E2", title: "Human skin penetration of a copper tripeptide in vitro (PMC, 2010)", grade: "In vitro — delivery and absorption study", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3016279/" },
            { id: "E3", title: "Effects of topical copper tripeptide complex on photoaged skin (clinical cosmetic study, 2006)", grade: "Human interventional — cosmetic outcomes", url: "https://www.liebertpub.com/abs/doi/10.1001/archfaci.8.4.252" },
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
