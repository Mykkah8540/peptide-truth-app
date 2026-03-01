export default function Shlp2SafetyPanel() {
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
              label: "No human safety data \u2014 completely uncharacterized in clinical settings",
              detail: "SHLP-2 has not been administered to humans in any controlled clinical study as of 2026. There is no Phase 1 safety trial, no pharmacokinetic characterization in humans, no established safe dose range, and no characterized adverse effect profile. This is not a small gap \u2014 it is the complete absence of clinical safety data. Anyone injecting SHLP-2 is operating entirely without a safety framework.",
            },
            {
              tier: "watch",
              label: "Research compound quality \u2014 community sources unverified",
              detail: "SHLP-2 is not manufactured to pharmaceutical or clinical-grade standards for human use. Community-sourced SHLP-2 carries all the risks of unverified research peptides: incorrect peptide sequence, inaccurate concentration labeling, endotoxin contamination from bacterial synthesis, sterility failures. The 12-amino-acid structure is short enough to synthesize but small enough that quality verification requires specialized analytical chemistry unavailable to most buyers.",
            },
            {
              tier: "low",
              label: "Preclinical anti-apoptotic profile is generally favorable mechanistically",
              detail: "In cell and animal models, SHLP-2\u2019s characterized effects (cytoprotection, anti-apoptosis, insulin sensitization) are directionally favorable. No oncogenic, toxic, or pro-apoptotic mechanisms have been described in preclinical literature. This is a weak positive signal \u2014 preclinical safety profiles do not reliably predict human safety.",
            },
            {
              tier: "low",
              label: "No known acute toxicity in animal models",
              detail: "Published preclinical studies have not reported acute toxicity signals at doses used in animal models. This is a minimal reassurance \u2014 animal toxicity studies and human safety are substantially different domains, especially for peptides administered at different doses and routes.",
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
            "Severe allergic or anaphylactic reaction (hives, facial swelling, throat tightening, difficulty breathing)",
            "Cardiovascular symptoms: chest pain, palpitations, syncope",
            "Blood sugar symptoms in people on antidiabetic medications: confusion, sweating, rapid heart rate (hypoglycemia screen)",
            "Fever or rigors after injection (potential endotoxin contamination from sourcing)",
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
              title: "Calibrate expectations to the evidence ceiling",
              items: [
                "SHLP-2 is among the least-studied peptides in community use. The discovery paper is from 2016.",
                "Circulating SHLP-2 biomarker associations with longevity are observational \u2014 they do not establish that injecting more SHLP-2 improves outcomes",
                "You are working entirely without a clinical safety or efficacy framework",
                "Source quality is the most immediately practical concern",
              ],
            },
            {
              title: "Metabolic baseline if on antidiabetics",
              items: [
                "SHLP-2\u2019s putative insulin-sensitizing effects overlap with antidiabetic medications",
                "If you take metformin, insulin, GLP-1 agonists, or SGLT2 inhibitors, the interaction is unstudied but mechanistically plausible",
                "Fasting glucose monitoring is prudent if proceeding despite this uncertainty",
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
