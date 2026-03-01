export default function PlecanatideOverviewPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { label: "Brand Name", value: "Trulance", sub: "FDA-approved oral tablet", accent: "#2c5282" },
          { label: "FDA Status", value: "Approved", sub: "CIC and IBS-C (2017/2018)", accent: "#155e38" },
          { label: "Mechanism", value: "GC-C Agonist", sub: "Uroguanylin analogue", accent: "#2c5282" },
        ].map((c) => (
          <div key={c.label} style={{
            flex: "1 1 160px", background: "rgba(255,255,255,0.80)",
            border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14,
            padding: "14px 16px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: c.accent, lineHeight: 1.2 }}>{c.value}</div>
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
          Plecanatide (Trulance) is a synthetic 16-amino-acid peptide analogue of uroguanylin \u2014 a hormone your intestinal cells naturally produce to regulate fluid and electrolyte secretion. It targets the guanylate cyclase-C (GC-C) receptor, the same receptor as linaclotide (Linzess), but its structure is distinct. It is FDA-approved for chronic idiopathic constipation (CIC) and irritable bowel syndrome with constipation (IBS-C).
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: "10px 0 0" }}>
          A defining feature of plecanatide is its pH-dependent activation. It is most active in the acidic microenvironment of the duodenum \u2014 essentially mimicking the behavior of natural uroguanylin, which activates preferentially where the gut is most acidic right after stomach emptying. This is proposed to produce a somewhat smoother tolerability profile compared to linaclotide, though both can cause diarrhea. Systemic absorption is negligible: plecanatide works locally in the gut.
        </p>
      </div>

      {/* Why it\u2019s distinct */}
      <div style={{
        background: "linear-gradient(135deg,rgba(44,82,130,0.07) 0%,rgba(15,26,46,0.04) 100%)",
        border: "1px solid rgba(44,82,130,0.15)", borderRadius: 14, padding: "16px 20px",
        boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: "#2c5282", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>What makes it unique</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#334155", margin: 0 }}>
          Plecanatide is the only GC-C agonist designed to exploit pH-dependent receptor activation \u2014 directly modeling the behavior of endogenous uroguanylin. This is different from linaclotide, which activates GC-C throughout the intestine without the same pH gating. The practical implication is a theoretically more physiologic secretory response concentrated in the proximal small intestine, with a modestly different side effect footprint. Both are local-acting (negligible absorption) with overlapping contraindications, including a black box warning against use in pediatric patients under age 6.
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
            { icon: "\u2713", color: "#155e38", bg: "#f0fdf4", label: "Chronic idiopathic constipation (CIC)", note: "FDA-approved for this indication with multiple Phase 3 RCT support" },
            { icon: "\u2713", color: "#155e38", bg: "#f0fdf4", label: "IBS with constipation (IBS-C)", note: "FDA-approved; alternative or successor if linaclotide caused intolerable diarrhea" },
            { icon: "\u25b3", color: "#7c5200", bg: "#fffbf0", label: "Tried linaclotide but had excessive diarrhea", note: "pH-dependent activation is proposed to be modestly better tolerated \u2014 clinical experience is mixed" },
            { icon: "\u2717", color: "#9e3800", bg: "#fff7f5", label: "Children under age 6", note: "Black box contraindication \u2014 absolute; same restriction as linaclotide class" },
            { icon: "\u2717", color: "#9e3800", bg: "#fff7f5", label: "Systemic or enhancement goals", note: "No systemic absorption; no mechanism for systemic effects" },
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
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>How it compares (GC-C agonist class)</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(15,26,46,0.10)" }}>
                {["", "Plecanatide", "Linaclotide", "Lubiprostone"].map((h) => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: h ? "center" : "left", fontWeight: 700, color: "#0f1a2e", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Receptor", vals: ["GC-C", "GC-C", "ClC-2 chloride channel"] },
                { label: "Analogue of", vals: ["Uroguanylin", "Guanylin", "Prostanoid (not a peptide)"] },
                { label: "pH activation", vals: ["Yes \u2014 duodenal-preferring", "No", "No"] },
                { label: "FDA indications", vals: ["CIC, IBS-C", "CIC, IBS-C, OIC", "CIC, IBS-C"] },
                { label: "Systemic absorption", vals: ["Negligible", "Negligible", "Minimal"] },
                { label: "Peds black box", vals: ["Yes (<6)", "Yes (<6)", "No"] },
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
        background: "linear-gradient(135deg,rgba(26,92,58,0.07) 0%,rgba(15,26,46,0.04) 100%)",
        border: "1px solid rgba(26,92,58,0.15)", borderRadius: 14, padding: "18px 20px",
        boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 10px" }}>What people discuss</h3>
        <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "Plecanatide vs. linaclotide comparison \u2014 tolerability differences and whether to switch",
            "Diarrhea management: dose timing, dietary adjustments, whether to take with food",
            "Long-term use questions: does it lose efficacy over time?",
            "Cost and insurance coverage barriers (brand-name drug with no generic)",
            "Use in IBS-C when first-line options failed or caused unacceptable side effects",
          ].map((t) => (
            <li key={t} style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>{t}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
