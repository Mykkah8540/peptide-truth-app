export default function PlecanatideSafetyPanel() {
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
              tier: "flag",
              label: "Pediatric black box \u2014 contraindicated under age 6",
              detail: "Plecanatide carries an FDA black box warning: it is contraindicated in patients under 6 years of age. This is a class-wide restriction shared with linaclotide. The risk is serious dehydration from GC-C-driven intestinal fluid secretion in young children, whose fluid balance is more sensitive. Use in children 6\u201317 is also not recommended (safety and efficacy not established). This is an absolute contraindication, not a relative one.",
            },
            {
              tier: "watch",
              label: "Diarrhea \u2014 most common adverse effect",
              detail: "Diarrhea is the most frequent adverse event reported in plecanatide trials, occurring in approximately 5% of patients in CIC trials (vs. 1% placebo). The pH-dependent activation mechanism is proposed to give a modestly lower diarrhea rate than linaclotide, but clinically the difference is modest and individual responses vary. Severe diarrhea with dehydration has been reported and warrants dose suspension. Patients with diarrhea-prone GI conditions should use with particular caution.",
            },
            {
              tier: "low",
              label: "Minimal systemic effects \u2014 negligible absorption",
              detail: "Plecanatide has essentially no systemic absorption when taken orally. Plasma concentrations after clinical doses are below the level of quantification. This means systemic adverse effects, drug interactions via absorption, and endocrine or metabolic concerns are not applicable. The safety profile is limited to the GI tract.",
            },
            {
              tier: "low",
              label: "Drug interactions minimal",
              detail: "Because plecanatide is not systemically absorbed and does not undergo significant hepatic metabolism, it has no clinically meaningful pharmacokinetic drug interactions. The relevant consideration is pharmacodynamic: additive GI motility and secretory effects if combined with other laxatives or GI secretagogues.",
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
            "Severe or persistent diarrhea with signs of dehydration (dizziness, dry mouth, reduced urination)",
            "Severe allergic reaction (hives, swelling, difficulty breathing)",
            "Bloody stool or rectal bleeding (not expected \u2014 warrants evaluation)",
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
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Before you start</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              title: "Confirm diagnosis and appropriate indication",
              items: [
                "Plecanatide is indicated for CIC and IBS-C \u2014 not opioid-induced constipation or general bloating",
                "GI evaluation should confirm diagnosis before initiating a prescription secretagogue",
                "Rule out mechanical obstruction \u2014 a contraindication",
              ],
            },
            {
              title: "Pediatric age check is mandatory",
              items: [
                "Never use in children under 6 (black box contraindication)",
                "Safety and efficacy in children 6\u201317 not established \u2014 not recommended",
                "Store out of reach of children (ingestion risk)",
              ],
            },
            {
              title: "Diarrhea management",
              items: [
                "Take with or without food \u2014 food does not significantly affect efficacy",
                "If diarrhea is severe, suspend use and contact prescriber",
                "Avoid combining with other laxatives or GI secretagogues without clinical guidance",
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
