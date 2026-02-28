export default function Aod9604EvidencePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat tiles */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
          { label: "Highest study type", value: "Phase II RCT", color: "#2c5282" },
          { label: "Fat-loss outcome", value: "Not significant", color: "#9e3800" },
          { label: "GH-sparing design", value: "Confirmed", color: "#1a5c3a" },
          { label: "Safety profile", value: "Short-term OK", color: "#7c5200" },
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
              claim: "GH receptor non-binding / GH-sparing design",
              status: "Confirmed (mechanistic + trial data)",
              color: "#1a5c3a", bg: "#f0fdf4",
              note: "AOD-9604 does not bind the GH receptor, does not elevate IGF-1, and does not produce anabolic growth effects. This was confirmed in the Phase II clinical program and is the central design feature distinguishing it from full hGH.",
            },
            {
              claim: "Lipolytic activity (fat cell metabolism activation)",
              status: "Mechanistically plausible — animal + Phase II support",
              color: "#7c5200", bg: "#fffbf0",
              note: "The 176–191 fragment activates lipolytic signaling in fat cells (β3-adrenergic and lipase mechanisms) in preclinical models. The Phase II trial was designed to test whether this translated to clinically meaningful weight loss in obese humans.",
            },
            {
              claim: "Clinically significant weight loss in humans",
              status: "Not demonstrated — Phase II negative",
              color: "#9e3800", bg: "#fff7f5",
              note: "The Phase II double-blind RCT (PMID 15615612) showed no statistically significant weight loss advantage over placebo at the doses tested (250–500mcg/day SC, 12 weeks). The FDA did not approve the drug. This is the honest evidence ceiling and should anchor expectations.",
            },
            {
              claim: "Short-term safety profile",
              status: "Acceptable in Phase II range",
              color: "#1a5c3a", bg: "#f0fdf4",
              note: "No serious adverse events were reported at Phase II doses in 12-week trials. Common reported AEs: headache, nausea, injection-site reactions. This provides a real (if limited) human safety reference point that most research peptides do not have.",
            },
            {
              claim: "Long-term safety / effects beyond 12 weeks",
              status: "Not studied",
              color: "#9e3800", bg: "#fff7f5",
              note: "The clinical development program did not generate long-term safety data. Research-peptide users who run extended cycles are operating without any human evidence anchor beyond the 12-week trial period.",
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
            { pathway: "β3-adrenergic receptor activation in adipose tissue", detail: "The 176–191 fragment activates β3-adrenergic signaling in fat cells, which stimulates lipolysis (breakdown of stored triglycerides into free fatty acids). This is the mechanism identified in the original lipolytic domain research." },
            { pathway: "Hormone-sensitive lipase (HSL) upregulation", detail: "AOD-9604 appears to upregulate hormone-sensitive lipase activity in adipocytes, increasing the rate of fat mobilization. This is distinct from IGF-1 or GH receptor pathways." },
            { pathway: "No GH receptor binding — no anabolic or growth signaling", detail: "The full hGH molecule binds the GH receptor and triggers both lipolytic and anabolic/IGF-1 cascades. AOD-9604 selectively lacks the binding domain for GH receptor activation. In both animal and human Phase II data, IGF-1 elevation was not observed." },
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
            { id: "E1", title: "A double-blind, placebo-controlled study of AOD-9604 for obesity (PMID 15615612, 2004/2005)", grade: "Phase II RCT — human weight-loss and safety data", url: "https://pubmed.ncbi.nlm.nih.gov/15615612/" },
            { id: "E2", title: "Lipolytic domain of human growth hormone (PMID 12183452, 2002)", grade: "Mechanistic — identified 176–191 lipolytic fragment", url: "https://pubmed.ncbi.nlm.nih.gov/12183452/" },
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
