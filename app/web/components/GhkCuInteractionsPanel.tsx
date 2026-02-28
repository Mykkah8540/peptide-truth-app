export default function GhkCuInteractionsPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Framing */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "16px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: 0 }}>
          GHK-Cu's interaction risk is genuinely low for topical use. The concern areas are <strong>anticoagulant herb supplements</strong> in the injectable context, <strong>formulation incompatibilities</strong> in topical stacking, and the special case of copper metabolism disorders. The injectable route changes the risk profile significantly.
        </p>
      </div>

      {/* Drug class flags */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Drug and supplement flags</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              tier: "watch", cls: "Anticoagulant herbs (supplement class)",
              examples: "Fish oil, turmeric/curcumin, garlic extract, ginkgo biloba, bromelain",
              why: "GHK-Cu has some in vitro data suggesting platelet and coagulation effects. When combined with anticoagulant herbs in injectable contexts, additive anticoagulant risk is theoretical but flagged. Topical use: low relevance. Injectable use: review all anticoagulant/antiplatelet supplements.",
            },
            {
              tier: "watch", cls: "Chelation therapy or high-dose mineral supplementation",
              examples: "Zinc supplementation, copper supplements, EDTA chelation",
              why: "GHK-Cu is a copper-binding peptide. High-dose zinc supplementation competes with copper absorption and can affect copper status. EDTA chelation therapy may interact with the copper-delivery mechanism of GHK-Cu.",
            },
            {
              tier: "watch", cls: "Prescription retinoids (topical context)",
              examples: "Tretinoin, adapalene, tazarotene",
              why: "Strong retinoids alter skin barrier function and increase penetration of co-applied actives. Layering GHK-Cu with prescription retinoids warrants barrier management — not a pharmacological conflict, but a formulation/timing interaction worth thinking through.",
            },
            {
              tier: "low", cls: "Immunosuppressants (minor topical relevance)",
              examples: "General immune context flag",
              why: "Flagged for injectable context only. Topical GHK-Cu has minor anti-inflammatory properties that are not clinically relevant alongside systemic immunosuppressive therapy.",
            },
          ].map((f) => {
            const colors = {
              flag: { bg: "#fff7f5", border: "#9e380022", tag: "#9e3800", tagBg: "#fde8e0" },
              watch: { bg: "#fffbf0", border: "#7c520022", tag: "#7c5200", tagBg: "#fef9ed" },
              low: { bg: "rgba(15,26,46,0.03)", border: "rgba(15,26,46,0.08)", tag: "#155e38", tagBg: "#f0fdf4" },
            }[f.tier] ?? { bg: "rgba(15,26,46,0.03)", border: "rgba(15,26,46,0.08)", tag: "#155e38", tagBg: "#f0fdf4" };
            return (
              <div key={f.cls} style={{
                background: colors.bg, border: `1px solid ${colors.border}`,
                borderRadius: 10, padding: "12px 14px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, background: colors.tagBg, color: colors.tag, borderRadius: 6, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.tier}</span>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b" }}>{f.cls}</span>
                </div>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}><strong>Examples:</strong> {f.examples}</div>
                <p style={{ fontSize: 12.5, color: "#475569", margin: 0, lineHeight: 1.55 }}>{f.why}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topical stacking considerations */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Topical skincare stacking</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              tier: "watch", name: "Vitamin C (ascorbic acid)",
              note: "Low pH vitamin C formulations can reduce copper complex stability. If stacking, allow separation time between applications or use at different times of day.",
            },
            {
              tier: "low", name: "Hyaluronic acid / niacinamide",
              note: "No known compatibility issues. Common combination in skincare routines. No pharmacological concern.",
            },
            {
              tier: "low", name: "Peptide serums (other cosmetic peptides)",
              note: "Common co-use. No known conflicts. Matrixyl, argireline, and other cosmetic peptides have different mechanisms and are frequently combined with GHK-Cu in routine stacking.",
            },
          ].map((p) => {
            const colors = {
              watch: { bg: "#fffbf0", border: "#7c520022", tag: "#7c5200", tagBg: "#fef9ed" },
              low: { bg: "rgba(15,26,46,0.03)", border: "rgba(15,26,46,0.08)", tag: "#155e38", tagBg: "#f0fdf4" },
            }[p.tier] ?? { bg: "rgba(15,26,46,0.03)", border: "rgba(15,26,46,0.08)", tag: "#155e38", tagBg: "#f0fdf4" };
            return (
              <div key={p.name} style={{
                background: colors.bg, border: `1px solid ${colors.border}`,
                borderRadius: 10, padding: "12px 14px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, background: colors.tagBg, color: colors.tag, borderRadius: 6, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{p.tier}</span>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b" }}>{p.name}</span>
                </div>
                <p style={{ fontSize: 12.5, color: "#475569", margin: 0, lineHeight: 1.55 }}>{p.note}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        background: "rgba(15,26,46,0.04)", border: "1px solid rgba(15,26,46,0.10)",
        borderRadius: 12, padding: "14px 18px",
      }}>
        <p style={{ fontSize: 12.5, color: "#475569", margin: 0, lineHeight: 1.6 }}>
          <strong>These are category flags for the purpose of surfacing questions, not a complete interaction list.</strong> For topical GHK-Cu in standard skincare use, the interaction profile is genuinely low. If you are considering injectable use, treat it as a research peptide with an incompletely characterized systemic profile and screen all anticoagulant and mineral supplements accordingly.
        </p>
      </div>

    </div>
  );
}
