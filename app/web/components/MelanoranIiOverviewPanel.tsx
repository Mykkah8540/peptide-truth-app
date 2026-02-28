export default function MelanoranIiOverviewPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { label: "Primary Effect", value: "Non-Selective MC Agonist", sub: "Pigmentation + libido + appetite — cannot be separated", accent: "#2c5282" },
          { label: "Key Risk Signal", value: "Melanoma Association", sub: "Case reports (association, not proven causation)", accent: "#9e3800" },
          { label: "Regulatory Status", value: "NOT Approved", sub: "Research chemical; unregulated market; no major jurisdiction approval", accent: "#9e3800" },
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
          Melanotan II (MT-II) is a synthetic compound that produces tanning without sun exposure and increases sexual desire — at the same time, involuntarily. These aren&apos;t separate effects you can select; the same mechanism drives all of them. It also suppresses appetite. The core issue: it activates multiple body systems at once, some desirable and some not.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: "10px 0 0" }}>
          MT-II is unregulated and not approved for human use in any major jurisdiction. It&apos;s sold as a research chemical and widely used for tanning and libido purposes, often with significant uncertainty about what you&apos;re actually getting. It was the research predecessor to bremelanotide (PT-141/Vyleesi) — a drug developed specifically to refine the libido effect while reducing nausea, cardiovascular risk, and unwanted tanning. If your interest is libido improvement specifically and bremelanotide is accessible, that&apos;s the more targeted and better-characterized option.
        </p>
      </div>

      {/* MT-II vs Bremelanotide distinction */}
      <div style={{
        background: "linear-gradient(135deg,rgba(158,56,0,0.06) 0%,rgba(15,26,46,0.04) 100%)",
        border: "1px solid rgba(158,56,0,0.15)", borderRadius: 14, padding: "16px 20px",
        boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: "#9e3800", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>MT-II vs Bremelanotide (PT-141) — critical distinction</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#334155", margin: 0 }}>
          Bremelanotide (Vyleesi) is the FDA-approved successor developed from MT-II research. It was specifically engineered for improved selectivity and tolerability — reduced nausea (≈40% vs MT-II's higher rate), lower cardiovascular signal, and no lasting hyperpigmentation. MT-II is the older, non-selective, unregulated predecessor with a meaningfully different safety profile. If you're thinking of using MT-II for libido purposes, bremelanotide is the FDA-approved version of that mechanism. The tanning effect of MT-II has no equivalent approved product.
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
            { icon: "△", color: "#7c5200", bg: "#fffbf0", label: "Tanning/pigmentation interest with no prescription access", note: "No approved alternative exists for this effect — but melanoma signal, nausea, and sourcing quality are real concerns" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Personal history of melanoma, atypical moles, or strong family history of melanoma", note: "Melanocortin activation in someone with pigmentation risk history — the case report association signal is serious enough to be a hard stop" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Sexual function / HSDD interest where bremelanotide is accessible", note: "Bremelanotide (PT-141) is FDA-approved for this exact purpose with better tolerability and regulatory oversight" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Cardiovascular disease or uncontrolled hypertension", note: "Blood pressure elevation is a real effect — not managed context like bremelanotide's FDA prescribing" },
            { icon: "✗", color: "#9e3800", bg: "#fff7f5", label: "Pregnancy, breastfeeding, adolescents", note: "Melanocortin system plays roles in development and puberty; no safety data" },
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
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>How it compares</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(15,26,46,0.10)" }}>
                {["", "Melanotan II", "Bremelanotide", "Self-tanning products"].map((h) => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: h ? "center" : "left", fontWeight: 700, color: "#0f1a2e", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Regulatory status", vals: ["Unregulated research chem", "FDA-approved (HSDD)", "OTC cosmetic"] },
                { label: "Melanocortin selectivity", vals: ["Non-selective (MC1-4R)", "Selective (MC3R/MC4R)", "N/A"] },
                { label: "Tanning effect", vals: ["Yes — significant", "Yes — side effect", "Yes — surface only"] },
                { label: "Nausea rate", vals: ["~70-80%", "~40% (trials)", "None"] },
                { label: "Melanoma signal", vals: ["Case reports (association)", "Not reported", "None"] },
                { label: "Sourcing quality", vals: ["Gray market — variable", "Pharmacy — regulated", "OTC — standardized"] },
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
            "Cosmetic tanning without sun exposure — the primary use case and why it circulates despite no approval",
            "Libido and sexual function effects (often the stated secondary or primary motivation)",
            "Appetite suppression — commonly reported as a side effect that some users seek",
            "Nausea management protocols — antiemetics before dosing is a standard community practice",
            "The melanoma risk discussion — this is actively debated in communities and should not be dismissed",
          ].map((t) => (
            <li key={t} style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>{t}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
