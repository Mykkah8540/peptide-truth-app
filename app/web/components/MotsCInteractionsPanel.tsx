export default function MotsCInteractionsPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Framing */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "16px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: 0 }}>
          MOTS-c's primary interaction concern is <strong>glucose-lowering medications</strong> — the AMPK activation mechanism overlaps with metformin and insulin sensitizers. Beyond that, cardiovascular medications warrant monitoring given AMPK's cardiovascular relevance. All interactions are inferred from mechanism biology since no human clinical pharmacokinetic or interaction studies exist.
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
              examples: "Metformin (AMPK activator — direct overlap), insulin, GLP-1 agonists (semaglutide, liraglutide), sulfonylureas, SGLT2 inhibitors",
              why: "MOTS-c activates AMPK — the same primary target as metformin. Combining MOTS-c with metformin is mechanistically similar to doubling a metformin dose without dose titration. In individuals on insulin or sulfonylureas, added insulin sensitization creates hypoglycemia risk. GLP-1 agonists combined with MOTS-c may produce compounded metabolic effects without clinical monitoring.",
            },
            {
              tier: "watch", cls: "Cardiovascular medications",
              examples: "Beta-blockers, statins, antihypertensives",
              why: "AMPK activation has cardioprotective and vascular effects in animal models. In the context of active cardiovascular disease treatment with medication, introducing an AMPK activator could interact with treatment response in ways that are not characterized in human data.",
            },
          ].map((f) => {
            const colors = {
              flag: { bg: "#fff7f5", border: "#9e380022", tag: "#9e3800", tagBg: "#fde8e0" },
              watch: { bg: "#fffbf0", border: "#7c520022", tag: "#7c5200", tagBg: "#fef9ed" },
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
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Peptide / compound combinations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              tier: "watch", name: "NAD+ precursors (NMN, NR)",
              note: "Frequently stacked for 'mitochondrial support' themes. Both target mitochondrial function through different pathways (NAD+ replenishment vs. AMPK/mitokine signaling). The combination has mechanistic rationale for additive effects — but also potentially additive metabolic effects on glucose and energy metabolism that aren't characterized in humans.",
            },
            {
              tier: "watch", name: "AOD-9604",
              note: "Both target fat-loss / metabolic pathways with different mechanisms. MOTS-c (AMPK) + AOD-9604 (lipolytic) could theoretically be additive for metabolic effects. Glucose-metabolism interaction is the shared flag — review for both compounds before combining.",
            },
            {
              tier: "low", name: "BPC-157, TB-500, GHK-Cu",
              note: "Different mechanism classes. No known pharmacological interaction with MOTS-c's AMPK/metabolic pathway.",
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
          <strong>All MOTS-c interaction analysis is mechanistically inferred — no human clinical interaction studies exist.</strong> The diabetes/glucose-lowering medication flag is the most actionable: AMPK activation and insulin sensitization overlap directly with metformin mechanism. Anyone on glucose-lowering therapy should review with a clinician before adding MOTS-c.
        </p>
      </div>

    </div>
  );
}
