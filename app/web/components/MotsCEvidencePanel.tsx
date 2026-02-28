export default function MotsCEvidencePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat tiles */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
          { label: "Best study type", value: "Animal + Obs", color: "#7c5200" },
          { label: "Human RCTs", value: "0 (as of 2025)", color: "#9e3800" },
          { label: "Discovery year", value: "2015", color: "#2c5282" },
          { label: "Evidence ceiling", value: "Pre-clinical", color: "#9e3800" },
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
              claim: "AMPK activation and insulin sensitization",
              status: "Confirmed — animal + cellular",
              color: "#1a5c3a", bg: "#f0fdf4",
              note: "The original 2015 discovery paper demonstrated that MOTS-c targets the AMPK pathway in skeletal muscle and improves insulin sensitivity in mouse models, including high-fat diet-induced insulin resistance. The mechanism is well-characterized in animal and cell biology contexts.",
            },
            {
              claim: "Endogenous levels rise with exercise",
              status: "Confirmed — human observational",
              color: "#1a5c3a", bg: "#f0fdf4",
              note: "Human observational studies have measured circulating MOTS-c levels before and after both aerobic and resistance exercise. Levels increase acutely with physical activity, supporting the 'exercise-induced signal' characterization. This doesn't prove exogenous MOTS-c has the same effects.",
            },
            {
              claim: "MOTS-c levels decline with aging",
              status: "Observed — human biomarker data",
              color: "#7c5200", bg: "#fffbf0",
              note: "Circulating MOTS-c levels are lower in older adults than younger adults in observational studies. This forms the basis of the age-related decline narrative. Correlation with age does not establish whether declining MOTS-c causes metabolic decline or is simply a marker of it.",
            },
            {
              claim: "Exogenous MOTS-c injection improves metabolic outcomes in humans",
              status: "Not established — no human RCTs",
              color: "#9e3800", bg: "#fff7f5",
              note: "As of 2025, no published human randomized controlled trials have evaluated exogenous MOTS-c supplementation or injection in humans. All human evidence is observational (measuring endogenous levels). The gap between measuring a biomarker and injecting the peptide is large and not yet bridged by clinical data.",
            },
            {
              claim: "Exercise performance and physical decline in aging (animal data)",
              status: "Supported in animal models",
              color: "#7c5200", bg: "#fffbf0",
              note: "A 2021 paper demonstrated that exogenous MOTS-c improved age-dependent physical performance and muscle homeostasis in mice. These results are compelling mechanistically but do not directly predict human outcomes at equivalent doses.",
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
            { pathway: "AMPK activation in skeletal muscle", detail: "MOTS-c translocates to the nucleus during metabolic stress and activates AMPK (AMP-activated protein kinase), a key sensor of cellular energy status. AMPK activation improves glucose uptake, fatty acid oxidation, and mitochondrial biogenesis." },
            { pathway: "Mitochondrial-to-nuclear signaling (retrograde signaling)", detail: "MOTS-c represents a new class of mitochondria-to-nucleus signaling molecules (mitokines). Its exercise-responsive release suggests it serves as a metabolic stress sensor, signaling to the rest of the body that cellular energy demands are high." },
            { pathway: "Insulin sensitization via AMPK/AICAR pathway", detail: "By activating AMPK through mechanisms related to the AICAR pathway, MOTS-c mimics some effects of metformin at the cellular level — improving insulin sensitivity and glucose disposal in muscle tissue. This is why the diabetes-glucose interaction flag applies." },
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
            { id: "E1", title: "A 16-amino-acid peptide named MOTS-c regulates insulin sensitivity and metabolic homeostasis (2015)", grade: "Animal + cellular — discovery paper", url: "https://pubmed.ncbi.nlm.nih.gov/25738459/" },
            { id: "E2", title: "MOTS-c is an exercise-induced mitochondrial-encoded regulator of age-dependent physical decline (2021)", grade: "Animal study — exercise performance", url: "https://pubmed.ncbi.nlm.nih.gov/33473109/" },
            { id: "E3", title: "Effect of aerobic and resistance exercise on the mitochondrial-derived peptide MOTS-c (2021)", grade: "Human observational — biomarker context", url: "https://www.nature.com/articles/s41598-021-96419-z" },
            { id: "E4", title: "MOTS-c: A promising mitochondrial-derived peptide (review, 2023)", grade: "Review synthesis", url: "https://pubmed.ncbi.nlm.nih.gov/36761202/" },
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
