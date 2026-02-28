export default function Aod9604InteractionsPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Framing */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "16px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: 0 }}>
          AOD-9604's interaction profile is narrower than most GH-axis compounds because it avoids IGF-1 elevation and anabolic signaling. The primary concern is <strong>glucose-lowering medications</strong> — the metabolic mechanism still creates glucose variability even without the full GH-axis involvement. Fat-loss stacking combinations are a secondary consideration.
        </p>
      </div>

      {/* Drug class flags */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Drug class flags</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              tier: "flag", cls: "Diabetes / glucose-lowering medications",
              examples: "Insulin, metformin, GLP-1 receptor agonists (semaglutide, liraglutide), sulfonylureas, SGLT2 inhibitors",
              why: "AOD-9604 activates lipolytic signaling which releases free fatty acids and can affect glucose regulation. In individuals on glucose-lowering therapy, adding an agent that shifts metabolic balance can create hypoglycemia risk (especially with insulin or sulfonylureas) or complicate glucose management. GLP-1 agonists are additionally notable because they are also used for weight loss — combining two metabolic agents with different mechanisms without clinical oversight is not well-characterized.",
            },
            {
              tier: "watch", cls: "β-adrenergic medications (cardiovascular)",
              examples: "Beta-blockers (metoprolol, atenolol, carvedilol), beta-agonists (albuterol, salmeterol)",
              why: "AOD-9604's proposed lipolytic mechanism involves β3-adrenergic activation. Beta-blockers could theoretically blunt this effect (blocking the receptor); beta-agonists could create additive adrenergic stimulation. The clinical significance is uncertain at the doses studied.",
            },
            {
              tier: "watch", cls: "Thyroid medications",
              examples: "Levothyroxine (T4), liothyronine (T3), methimazole",
              why: "Metabolic rate and fat metabolism are sensitive to thyroid status. AOD-9604 in a person with thyroid disease or on thyroid replacement adds a variable to an already metabolically sensitive context. Not a direct pharmacological conflict but a monitoring consideration.",
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

      {/* Peptide combinations */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Peptide combinations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              tier: "watch", name: "CJC-1295 + Ipamorelin (GH-axis stack)",
              note: "The most common combination with AOD-9604. The rationale is layering lipolytic-only action (AOD) with broader GH-axis effects (CJC/ipa). The GH-axis compounds introduce all the IGF-1, glucose, and cancer-history considerations that AOD-9604 alone avoids — so the combined stack's safety profile is dominated by the GH-axis compounds. Review CJC-1295 and Ipamorelin pages for full safety considerations.",
            },
            {
              tier: "watch", name: "MK-677",
              note: "MK-677 is an oral ghrelin agonist with sustained GH elevation and significant glucose effects. Adding AOD-9604 (which also has metabolic effects) creates compounded metabolic complexity. Not a direct pharmacological conflict, but the glucose-metabolism interaction warrants monitoring.",
            },
            {
              tier: "low", name: "BPC-157 / TB-500",
              note: "Frequently co-used in comprehensive recovery stacks. Different mechanisms; no known pharmacological interaction with AOD-9604's lipolytic pathway.",
            },
          ].map((p) => {
            const colors = ({
              watch: { bg: "#fffbf0", border: "#7c520022", tag: "#7c5200", tagBg: "#fef9ed" },
              low: { bg: "rgba(15,26,46,0.03)", border: "rgba(15,26,46,0.08)", tag: "#155e38", tagBg: "#f0fdf4" },
            } as Record<string, { bg: string; border: string; tag: string; tagBg: string }>)[p.tier] ?? { bg: "rgba(15,26,46,0.03)", border: "rgba(15,26,46,0.08)", tag: "#155e38", tagBg: "#f0fdf4" };
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
          <strong>These are category flags to help surface questions, not a complete interaction list.</strong> If you are on any diabetes medication, glucose-lowering therapy, or a GLP-1 agonist for weight management, review with a clinician before adding AOD-9604. The metabolic interaction is the real concern here — not the compound's other properties.
        </p>
      </div>

    </div>
  );
}
