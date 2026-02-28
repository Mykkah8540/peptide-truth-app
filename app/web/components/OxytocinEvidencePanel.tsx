export default function OxytocinEvidencePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat tiles */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
          { label: "FDA-approved use", value: "Yes (obstetric)", color: "#1a5c3a" },
          { label: "Social cognition RCTs", value: "Inconsistent", color: "#7c5200" },
          { label: "Large replication", value: "Null / mixed", color: "#9e3800" },
          { label: "Mechanism", value: "Well-characterized", color: "#2c5282" },
        ].map((t) => (
          <div key={t.label} style={{
            flex: "1 1 110px", background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12,
            padding: "12px 14px", textAlign: "center",
            boxShadow: "0 1px 4px rgba(15,26,46,0.06)",
          }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: t.color, lineHeight: 1.2 }}>{t.value}</div>
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
              claim: "Labor induction and postpartum hemorrhage (on-label obstetric use)",
              status: "Confirmed — FDA-approved indication",
              color: "#1a5c3a", bg: "#f0fdf4",
              note: "Synthetic oxytocin (Pitocin, IV injection) is a well-established uterotonic — it induces and augments labor and controls postpartum hemorrhage. This is the only FDA-approved indication and is administered in clinical settings with monitoring.",
            },
            {
              claim: "Social bonding / trust enhancement in healthy adults (intranasal)",
              status: "Inconsistent — replication concerns",
              color: "#9e3800", bg: "#fff7f5",
              note: "Early small studies (2000s–2010s) showed large effects on trust, emotion recognition, and prosocial behavior. Large pre-registered replication attempts (including a multi-site 2021 study) produced null or inconsistent results. Effect sizes from early studies were likely inflated by publication bias and small-N. The evidence is genuinely contested.",
            },
            {
              claim: "Social anxiety / autism spectrum social cognition",
              status: "Studied — population-specific signals",
              color: "#7c5200", bg: "#fffbf0",
              note: "Some positive signals in autism spectrum research and social anxiety contexts. More consistent than healthy adult evidence — likely because baseline oxytocin activity may differ in these populations. Not sufficient to constitute clinical guidance; no regulatory approval for these uses.",
            },
            {
              claim: "Endogenous role in bonding, maternal behavior, pair bonding",
              status: "Confirmed (endogenous physiology)",
              color: "#1a5c3a", bg: "#f0fdf4",
              note: "The endogenous role of oxytocin in social bonding, parturition, milk ejection, and stress response is well-characterized. This underpins the mechanistic rationale for wellness use — but the gap between endogenous physiology and exogenous administration effects in healthy adults is substantial.",
            },
            {
              claim: "Nasal bioavailability / CNS penetration",
              status: "Debated — variable across studies",
              color: "#7c5200", bg: "#fffbf0",
              note: "Whether intranasally administered oxytocin actually reaches the brain in amounts sufficient to produce the studied effects is an ongoing scientific debate. Evidence for direct CNS penetration vs. peripheral effects is inconsistent. This is part of why replication has been difficult.",
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
            { pathway: "Oxytocin receptor (OXTR) — prosocial and bonding", detail: "Oxytocin binds OXTR in the brain (amygdala, hypothalamus, nucleus accumbens) to modulate fear responses, social salience, and bonding. The mechanism for prosocial effects is well-documented in animal models and endogenous human neuroscience — the question is whether exogenous intranasal oxytocin produces the same effects." },
            { pathway: "Uterotonic — smooth muscle contraction (OB indication)", detail: "The FDA-approved mechanism: oxytocin binds OXTR in uterine smooth muscle, causing contractions. This is the clinical use. This same mechanism makes exogenous oxytocin absolutely contraindicated in pregnancy outside of controlled clinical settings." },
            { pathway: "Antidiuretic activity / vasopressin receptor cross-reactivity", detail: "Oxytocin and vasopressin (ADH) are structurally similar and oxytocin has some activity at vasopressin receptors. This produces mild antidiuretic effects — relevant to the seizure risk via hyponatremia, and relevant in cardiac contexts where fluid retention matters." },
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

    </div>
  );
}
