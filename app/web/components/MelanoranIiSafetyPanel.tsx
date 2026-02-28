export default function MelanoranIiSafetyPanel() {
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
              tier: "flag", label: "Personal history of melanoma, melanoma in-situ, or strong family melanoma history",
              detail: "Melanocortin activation drives melanogenesis broadly — including in atypical nevi and in individuals with underlying genetic melanoma risk. Case reports linking MT-II use to melanoma development exist. Whether MT-II causes melanoma or simply unmasked existing risk cannot be determined from case reports, but the combination of MC1R agonism and melanoma history is not a risk to dismiss.",
            },
            {
              tier: "flag", label: "Multiple atypical (dysplastic) moles",
              detail: "Dysplastic nevi are abnormal melanocytes with elevated malignancy potential. Stimulating melanin production in tissues that contain dysplastic nevi introduces a theoretical but plausible risk of accelerating changes in concerning lesions. Full skin exam and dermatologist assessment before any melanocortin agonist use is the minimum reasonable step.",
            },
            {
              tier: "flag", label: "Cardiovascular disease or uncontrolled hypertension",
              detail: "MT-II can produce transient blood pressure elevation. In bremelanotide (the approved analogue), this was a prescribing information concern leading to cardiovascular exclusion criteria. MT-II has no such standardized prescribing framework — the blood pressure risk is the same without the managed dose structure.",
            },
            {
              tier: "flag", label: "Pregnancy and breastfeeding",
              detail: "Melanocortin receptors are active during fetal development. No safety data for MT-II in pregnancy exists. The compound has no approved use in any pregnancy context.",
            },
            {
              tier: "watch", label: "Unregulated sourcing — this is a persistent and serious risk",
              detail: "MT-II has no regulated product in the supply chain. Sourcing quality, dose labeling accuracy, and sterility of injectable products are unverified. Underdosing, overdosing, and contamination are real risks that are not separable from the compound's own effects in real-world use.",
            },
            {
              tier: "watch", label: "Nausea — extremely common (higher than bremelanotide)",
              detail: "Nausea is the most consistently reported side effect with MT-II and appears to be more severe and frequent than with bremelanotide (~40%). Without an antiemetic management plan before first use, nausea can be dose-limiting and disruptive.",
            },
            {
              tier: "watch", label: "Changing pigmentation in moles or freckles",
              detail: "Expected with MT-II use — but any mole that changes rapidly in size, shape, color, or develops irregular borders during MT-II use requires dermatological evaluation regardless of assumed tanning causation.",
            },
            {
              tier: "watch", label: "Adolescents",
              detail: "Melanocortin pathways play active roles in puberty, metabolic development, and adolescent hormonal regulation. No safety data exists for this population.",
            },
          ].map((f) => {
            const colors = {
              flag: { bg: "#fff7f5", border: "#9e380022", tag: "#9e3800", tagBg: "#fde8e0" },
              watch: { bg: "#fffbf0", border: "#7c520022", tag: "#7c5200", tagBg: "#fef9ed" },
              low: { bg: "rgba(15,26,46,0.03)", border: "rgba(15,26,46,0.08)", tag: "#155e38", tagBg: "#f0fdf4" },
            }[f.tier] ?? { bg: "rgba(15,26,46,0.03)", border: "rgba(15,26,46,0.08)", tag: "#155e38", tagBg: "#f0fdf4" };
            return (
              <div key={f.label} style={{
                background: colors.bg, border: `1px solid ${colors.border}`,
                borderRadius: 10, padding: "12px 14px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, background: colors.tagBg, color: colors.tag, borderRadius: 6, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.tier}</span>
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
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#9e3800", margin: "0 0 10px" }}>Serious symptoms — seek care</h3>
        <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "Prolonged erection lasting more than 2–4 hours (priapism — urological emergency)",
            "New mole or rapidly changing mole (size, shape, color, irregularity) — dermatologist urgently",
            "Severe chest pain, fainting, or marked blood pressure symptoms",
            "Severe allergic reaction (hives, facial swelling, difficulty breathing)",
          ].map((s) => (
            <li key={s} style={{ fontSize: 13.5, color: "#9e3800", lineHeight: 1.5 }}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Playbook cards */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Before you start</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              title: "Full skin exam before starting",
              items: [
                "Anyone with many moles, atypical moles, or skin cancer history needs dermatologist clearance before using any melanocortin agonist",
                "Photograph baseline moles for comparison — any moles that change during MT-II use require evaluation, not assumption",
                "Family history of melanoma is a meaningful risk factor even without personal history",
              ],
            },
            {
              title: "Nausea management plan",
              items: [
                "Nausea is extremely common — plan for it before first use, not after",
                "Antiemetics (e.g., ondansetron) taken before dosing are the standard community mitigation",
                "Start at the lowest dose to gauge response before any escalation",
              ],
            },
            {
              title: "Sourcing quality — the unavoidable problem",
              items: [
                "MT-II exists only in unregulated research chemical markets. There is no pharmaceutical-grade MT-II product.",
                "Dose labeling accuracy cannot be verified. Sterility cannot be guaranteed.",
                "Injectable MT-II from unverified sources carries infection risk independent of the compound itself.",
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
