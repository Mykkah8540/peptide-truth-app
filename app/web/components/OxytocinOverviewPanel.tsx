export default function OxytocinOverviewPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { label: "Regulatory Status", value: "FDA-Approved (Rx)", sub: "Pitocin — obstetric indications only", accent: "#1a5c3a" },
          { label: "Wellness Route", value: "Intranasal (off-label)", sub: "Social bonding / mood interest", accent: "#7c5200" },
          { label: "Pregnancy Flag", value: "HARD STOP", sub: "Can cause uterine hyperstimulation", accent: "#9e3800" },
        ].map((c) => (
          <div key={c.label} style={{
            flex: "1 1 160px", background: "rgba(255,255,255,0.80)",
            border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14,
            padding: "14px 16px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: c.accent, lineHeight: 1.2 }}>{c.value}</div>
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
          Oxytocin is a neuropeptide hormone naturally produced in the hypothalamus and released by the posterior pituitary. It plays central roles in social bonding, pair bonding, maternal behavior, childbirth, and breastfeeding. FDA-approved as Pitocin (synthetic oxytocin injection), it is used in hospitals for labor induction and postpartum hemorrhage prevention — strictly in clinical settings with monitoring.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: "10px 0 0" }}>
          The wellness community interest in oxytocin centers on intranasal formulations (often sourced from compounding pharmacies or research peptide markets) for social bonding, stress reduction, anxiety, and relationship enhancement — the so-called "love hormone" effects. The key issue: the research evidence for intranasal oxytocin's social effects in healthy adults is substantially less consistent than the popular narrative suggests, and the approved drug is an intravenous hospital medication with serious contraindications.
        </p>
      </div>

      {/* Evidence vs narrative gap */}
      <div style={{
        background: "linear-gradient(135deg,rgba(124,82,0,0.06) 0%,rgba(15,26,46,0.04) 100%)",
        border: "1px solid rgba(124,82,0,0.18)", borderRadius: 14, padding: "16px 20px",
        boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: "#7c5200", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>The "love hormone" evidence gap</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#334155", margin: 0 }}>
          Early small intranasal oxytocin studies showed impressive social cognition effects — increased trust, improved emotion recognition, enhanced bonding. These results were widely popularized. However, large-scale pre-registered replication studies have produced inconsistent results, and a major 2021 multi-site trial found no significant effects of intranasal oxytocin on social cognition in healthy adults. The "love hormone" narrative significantly overstates the current evidence for off-label intranasal use in healthy individuals.
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
            { icon: "△", color: "#7c5200", bg: "#fffbf0", label: "Social anxiety or bonding interest with realistic expectations", note: "Some real evidence in specific populations (e.g., autism spectrum research); healthy adult effects are inconsistent across studies" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Pregnancy or trying to conceive", note: "Exogenous oxytocin can stimulate uterine contractions — this is how Pitocin is used to induce labor. This is an absolute contraindication for wellness use." },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Recent postpartum period with any complications", note: "The same uterine-stimulating mechanism that makes it useful postpartum clinically is also a risk in unmonitored contexts" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Seizure disorders (epilepsy)", note: "Oxytocin has antidiuretic-like effects and can cause hyponatremia (low sodium) — a known seizure trigger" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Significant cardiovascular disease", note: "IV oxytocin can cause transient hypotension and cardiovascular strain; intranasal has lower systemic absorption but cardiovascular history warrants caution" },
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

      {/* Comparison table */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>How it compares (CNS / bonding context)</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(15,26,46,0.10)" }}>
                {["", "Oxytocin (intranasal)", "Selank", "Semax"].map((h) => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: h ? "center" : "left", fontWeight: 700, color: "#0f1a2e", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "FDA status", vals: ["Approved (IV, Rx only)", "Research peptide", "Research peptide"] },
                { label: "Primary mechanism", vals: ["Oxytocin receptor agonist", "GABAergic / enkephalinase", "BDNF / dopaminergic"] },
                { label: "Social effects evidence", vals: ["Inconsistent in healthy adults", "Anxiolytic — indirect", "Stimulatory — CNS-wide"] },
                { label: "Pregnancy risk", vals: ["Absolute contraindication", "Unknown", "Unknown"] },
                { label: "Seizure risk", vals: ["Yes (hyponatremia)", "Low", "Low"] },
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
        background: "linear-gradient(135deg,rgba(44,82,130,0.07) 0%,rgba(15,26,46,0.04) 100%)",
        border: "1px solid rgba(44,82,130,0.15)", borderRadius: 14, padding: "18px 20px",
        boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 10px" }}>What people discuss</h3>
        <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "Intranasal oxytocin for social bonding and relationship enhancement — the primary off-label interest",
            "Social anxiety management and stress reduction",
            "Post-MDMA recovery protocols (oxytocin + social context is discussed in harm reduction contexts)",
            "The replication crisis around oxytocin social cognition research — communities are generally aware",
            "Compounding pharmacy access — oxytocin nasal sprays are available via prescription in some markets",
          ].map((t) => (
            <li key={t} style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>{t}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
