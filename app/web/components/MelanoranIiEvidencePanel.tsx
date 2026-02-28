export default function MelanoranIiEvidencePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat tiles */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
          { label: "Evidence type", value: "Human Obs + Cases", color: "#7c5200" },
          { label: "Tanning effect", value: "Real", color: "#1a5c3a" },
          { label: "Melanoma signal", value: "Case Reports", color: "#9e3800" },
          { label: "Approved product?", value: "No", color: "#9e3800" },
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
              claim: "Skin tanning / melanin production",
              status: "Confirmed — human pharmacology",
              color: "#1a5c3a", bg: "#f0fdf4",
              note: "MC1R activation by MT-II drives melanogenesis (melanin production) in a dose-dependent manner. The tanning effect is well-established in human pharmacology studies. Skin darkening is real and predictable — but it's also a marker that systemic melanocortin activation has occurred.",
            },
            {
              claim: "Sexual function / libido effects",
              status: "Confirmed in human studies",
              color: "#1a5c3a", bg: "#f0fdf4",
              note: "MT-II activates MC3R and MC4R, which mediate sexual arousal pathways. This is the same mechanism exploited by bremelanotide (PT-141), the FDA-approved successor. Effects in men and women are reported in both clinical research and community use.",
            },
            {
              claim: "Appetite suppression",
              status: "Reported — mechanism plausible",
              color: "#7c5200", bg: "#fffbf0",
              note: "MC4R activation suppresses appetite. Commonly reported by MT-II users as a side effect that some seek. Not a studied endpoint in MT-II-specific clinical trials; mechanism supported by broader melanocortin biology.",
            },
            {
              claim: "Melanoma association",
              status: "Signal — case reports (association not causation)",
              color: "#9e3800", bg: "#fff7f5",
              note: "Multiple case reports link MT-II use to melanoma development, including a 2025 case report of oral mucosal malignant melanoma in a nasal spray user (PMID 40210573) and a 2019 melanoma in-situ case report. Case reports cannot establish causation. However: accelerating melanin production in pre-existing atypical nevi or in genetically susceptible individuals is mechanistically plausible as a risk-amplifying factor. This cannot be dismissed.",
            },
            {
              claim: "Blood pressure / cardiovascular effects",
              status: "Documented — transient elevation",
              color: "#9e3800", bg: "#fff7f5",
              note: "Melanocortin receptor activation can elevate blood pressure transiently. This was a noted concern in the MT-II research that led to more selective analog development (bremelanotide), which still carries a cardiovascular use caution.",
            },
            {
              claim: "Priapism",
              status: "Documented — rare, serious",
              color: "#9e3800", bg: "#fff7f5",
              note: "Case reports of prolonged erection (priapism) with MT-II use in men — a urological emergency. The mechanism is MC4R agonism in the erectile tissue pathways. This is why bremelanotide was developed with a controlled-dose intranasal administration framework.",
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
            { pathway: "MC1R — melanogenesis (tanning)", detail: "MC1R is expressed on melanocytes. Activation increases melanin synthesis and transfer to keratinocytes. The tanning effect is real, significant, and associated with darkening of existing pigmented lesions (freckles, moles)." },
            { pathway: "MC3R / MC4R — sexual function and appetite", detail: "MC3R and MC4R are expressed in the brain and peripheral tissues. MC4R agonism drives the sexual arousal and appetite suppression effects. This is the same pathway targeted by bremelanotide — MT-II is simply less selective." },
            { pathway: "MC2R avoidance (intended) / MC5R off-target activation", detail: "MT-II was designed to avoid MC2R (the ACTH receptor, which regulates adrenal cortisol). MC5R is involved in exocrine gland secretion. Non-selective activation of MC5R contributes to flushing, yawning, and other autonomic effects reported with MT-II." },
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
            { id: "E2", title: "Melanocortin peptide therapeutics: historical milestones, clinical studies and commercialization (2006)", grade: "Review — human observational / mechanism", url: "https://pubmed.ncbi.nlm.nih.gov/16412534/" },
            { id: "E3", title: "Melanotan II nasal spray: a possible risk factor for oral mucosal malignant melanoma? (2025)", grade: "Case report — melanoma association signal", url: "https://pubmed.ncbi.nlm.nih.gov/40210573/" },
            { id: "E5", title: "Melanoma in-situ associated with Melanotan II use (2019)", grade: "Case report — melanoma in-situ association", url: "https://scientificliterature.org/Casereports/Casereports-20-147.pdf" },
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
