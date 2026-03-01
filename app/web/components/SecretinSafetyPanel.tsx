export default function SecretinSafetyPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Risk flags */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Risk flags</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              tier: "watch",
              label: "GI effects in diagnostic testing \u2014 nausea, flushing, abdominal cramping",
              detail: "In the context of supervised diagnostic secretin stimulation testing, the most common adverse effects are transient nausea, flushing (facial warmth and redness), and mild abdominal cramping. These are short-lived and expected given secretin\u2019s GI secretory mechanism. In clinical practice, these are monitored in a supervised setting and resolve quickly. Hypersensitivity reactions have been reported rarely.",
            },
            {
              tier: "low",
              label: "Short-lived diagnostic test effects",
              detail: "Secretin administered IV for diagnostic purposes has a short half-life and transient pharmacological effects. The safety profile in the diagnostic testing context \u2014 single controlled doses in a clinical setting \u2014 is well-characterized and considered acceptable for the diagnostic benefit obtained.",
            },
            {
              tier: "low",
              label: "No therapeutic use case \u2014 community use safety is unknown",
              detail: "Because secretin has no established therapeutic use and community self-administration is extremely rare, there is essentially no community safety data. The diagnostic testing safety profile does not directly translate to what repeated self-injected doses might produce in terms of chronic GI secretory stimulation or other effects. This is a low-prevalence concern because secretin community use is very uncommon.",
            },
          ].map((f) => {
            const colors = {
              flag: { bg: "rgba(158,56,0,0.07)", border: "rgba(158,56,0,0.20)", tag: "#9e3800", tagBg: "rgba(158,56,0,0.10)", label: "Stop signal" },
              watch: { bg: "rgba(124,82,0,0.06)", border: "rgba(124,82,0,0.17)", tag: "#7c5200", tagBg: "rgba(124,82,0,0.10)", label: "Worth watching" },
              low: { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", tag: "#155e38", tagBg: "rgba(21,100,58,0.10)", label: "Low concern" },
            }[f.tier] ?? { bg: "rgba(15,26,46,0.03)", border: "rgba(15,26,46,0.08)", tag: "#155e38", tagBg: "#f0fdf4", label: "Low concern" };
            return (
              <div key={f.label} style={{
                background: colors.bg, border: `1px solid ${colors.border}`,
                borderRadius: 10, padding: "12px 14px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, background: colors.tagBg, color: colors.tag, borderRadius: 6, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{colors.label}</span>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b" }}>{f.label}</span>
                </div>
                <p style={{ fontSize: 12.5, color: "#475569", margin: 0, lineHeight: 1.55 }}>{f.detail}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Serious symptoms */}
      <div style={{
        background: "#fff7f5", border: "1px solid rgba(158,56,0,0.15)",
        borderRadius: 14, padding: "16px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#9e3800", margin: "0 0 10px" }}>Serious symptoms \u2014 seek care</h3>
        <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "Severe allergic or hypersensitivity reaction (hives, angioedema, difficulty breathing, anaphylaxis)",
            "Severe or persistent abdominal pain after administration",
            "Loss of consciousness or cardiovascular symptoms (rare but reported in diagnostic testing context)",
          ].map((s) => (
            <li key={s} style={{ fontSize: 13.5, color: "#9e3800", lineHeight: 1.5 }}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Before you start */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Context clarification</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              title: "Secretin is a diagnostic agent \u2014 this context matters",
              items: [
                "The safety profile for secretin is characterized in single-dose IV administration in monitored clinical settings",
                "Self-injection for therapeutic or enhancement purposes has no evidence base and no established safety parameters",
                "If you are receiving secretin as part of a legitimate diagnostic test, your clinician will monitor for the expected transient GI effects",
              ],
            },
            {
              title: "The autism use case is not supported and should not drive use",
              items: [
                "The historical interest in secretin for autism was based on an anecdotal observation subsequently refuted by multiple controlled trials",
                "Administering secretin to a child outside of a diagnostic testing context is not medically supported",
                "The Cochrane review (2006, updated) concluded no evidence of benefit for any dose or schedule of secretin for autism symptoms",
              ],
            },
          ].map((card) => (
            <div key={card.title} style={{
              background: "rgba(15,26,46,0.03)", borderRadius: 10,
              padding: "12px 14px", borderLeft: "3px solid rgba(15,26,46,0.15)",
            }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0f1a2e", marginBottom: 6 }}>{card.title}</div>
              <ul style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: 4 }}>
                {card.items.map((item) => (
                  <li key={item} style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.55 }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
