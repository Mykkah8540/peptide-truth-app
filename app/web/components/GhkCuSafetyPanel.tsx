export default function GhkCuSafetyPanel() {
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
              tier: "flag", label: "Copper sensitivity, Wilson's disease, or copper metabolism disorders",
              detail: "GHK-Cu delivers copper ions; in individuals with impaired copper metabolism (Wilson's disease, Menkes disease), copper accumulation can cause serious toxicity. Copper sensitivity reactions (contact dermatitis, allergy) exist and are worth screening for before broad application.",
            },
            {
              tier: "flag", label: "Applying to broken skin, open wounds, or severe dermatitis",
              detail: "Compromised skin barrier increases systemic absorption unpredictably. Applying any copper-containing active to broken skin is not the intended use. In wound care contexts (a valid discussion), medical-grade products with defined protocols apply — not cosmetic GHK-Cu.",
            },
            {
              tier: "watch", label: "Pregnant or breastfeeding individuals",
              detail: "Systemic absorption through intact topical skin is limited, but copper delivery during pregnancy adds an unknown variable. No human safety data in pregnancy for GHK-Cu specifically.",
            },
            {
              tier: "watch", label: "Layering with strong chemical exfoliants or retinoids",
              detail: "Retinoids and acids thin the skin barrier, which increases absorption of subsequently applied actives. Layering GHK-Cu with high-strength retinoids or AHAs without allowing barrier recovery can elevate local irritation and penetration variability.",
            },
            {
              tier: "watch", label: "Adolescents (cosmetic active use)",
              detail: "No specific contraindication, but long-term cosmetic active use in adolescent skin is poorly studied. The developmental risk block here is cosmetic rather than systemic — setting appropriate expectations for use.",
            },
            {
              tier: "low", label: "Skin irritation or redness (topical)",
              detail: "The most commonly reported adverse effect with topical GHK-Cu. Generally mild and resolves quickly. More likely with higher concentrations or combination with other actives.",
            },
            {
              tier: "low", label: "Itching or contact dermatitis",
              detail: "Possible in individuals with sensitivity to copper or to formulation excipients. Patch testing before broad application is a straightforward mitigation.",
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
            "Severe allergic reaction (hives, facial swelling, difficulty breathing) — anaphylaxis protocol",
            "Rapidly spreading rash or swelling beyond the application area",
            "Nausea, vomiting, or neurological symptoms after injectable use (copper toxicity screen)",
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
              title: "Patch test — always worth doing",
              items: [
                "Apply a small amount to inner arm for 24–48 hours before facial application",
                "If redness, itching, or hives appear, do not proceed with broader use",
                "More important when using high-concentration products or combining with other actives",
              ],
            },
            {
              title: "Formulation quality check",
              items: [
                "GHK-Cu stability is formulation-sensitive — poor storage, high pH, or incompatible vehicle can render the copper complex inactive or irritating",
                "Research-peptide-grade injectable GHK-Cu has no cosmetic quality standard — this is meaningfully different from pharmaceutical topical products",
                "Look for products that address concentration (typically 0.5–2%) and pH (acidic-neutral range for stability)",
              ],
            },
            {
              title: "Topical vs injectable — reset your mental model",
              items: [
                "The topical safety data does not apply to injectable GHK-Cu",
                "Injectable use bypasses the skin barrier absorption variable entirely and delivers copper peptide systemically with unknown pharmacokinetics",
                "If considering injectable GHK-Cu, treat it as a research peptide with unknown systemic profile — not an extension of the cosmetic use case",
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
