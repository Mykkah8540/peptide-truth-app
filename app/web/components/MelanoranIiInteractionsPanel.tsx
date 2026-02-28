export default function MelanoranIiInteractionsPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Framing */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "16px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: 0 }}>
          Melanotan II's interactions are dominated by two concerns: <strong>cardiovascular medications</strong> given the blood pressure effects, and <strong>anything that amplifies CNS melanocortin activity</strong>. The broader context is that MT-II is a non-selective CNS-active melanocortin agonist in an unregulated form — all interaction considerations apply in the absence of clinical monitoring.
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
              tier: "flag", cls: "Antihypertensives / cardiovascular medications",
              examples: "ACE inhibitors, ARBs, calcium channel blockers, beta-blockers, nitrates",
              why: "MT-II can transiently elevate blood pressure through melanocortin receptor-mediated autonomic effects. In someone whose blood pressure is actively managed with medication, adding MT-II creates unpredictable cardiovascular stress. This was the primary cardiovascular concern in the bremelanotide development program.",
            },
            {
              tier: "flag", cls: "PDE5 inhibitors",
              examples: "Sildenafil (Viagra), tadalafil (Cialis), vardenafil",
              why: "PDE5 inhibitors are vasodilatory and can cause significant blood pressure drops, especially in positions changes. Combined with MT-II's blood pressure effects, the combination creates unpredictable cardiovascular dynamics. Also: combining two sexual function compounds amplifies the priapism risk in men.",
            },
            {
              tier: "watch", cls: "Serotonergic medications",
              examples: "SSRIs, SNRIs, triptans, MAOIs",
              why: "Serotonergic and melanocortin pathways interact in CNS circuits governing mood, appetite, and autonomic function. The interaction is pharmacologically plausible but not well characterized for MT-II specifically.",
            },
            {
              tier: "watch", cls: "Anticoagulants / antiplatelets",
              examples: "Warfarin, rivaroxaban, clopidogrel, aspirin",
              why: "Uncharacterized interaction potential in injectable use context. The cardiovascular effects of MT-II (blood pressure, autonomic stimulation) combined with anticoagulation creates a monitoring concern worth flagging.",
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

      {/* Peptide / compound combinations */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Compound combinations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              tier: "flag", name: "Bremelanotide (PT-141)",
              note: "Two melanocortin agonists simultaneously — one FDA-approved with prescribing controls, one unregulated. There is no legitimate reason to combine these, and additive melanocortin activation compounds nausea, blood pressure, and priapism risk.",
            },
            {
              tier: "watch", name: "Alcohol",
              note: "Alcohol is vasodilatory and lowers blood pressure. Combined with MT-II's autonomic cardiovascular effects and possible blood pressure elevation, the hemodynamic interaction is unpredictable. Community reports of pronounced nausea with alcohol combination are common.",
            },
            {
              tier: "low", name: "GHK-Cu (topical), BPC-157, other non-CNS peptides",
              note: "No known pharmacological interaction. Different mechanism classes without overlapping cardiovascular or CNS receptor activity.",
            },
          ].map((p) => {
            const colors = {
              flag: { bg: "#fff7f5", border: "#9e380022", tag: "#9e3800", tagBg: "#fde8e0" },
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
          <strong>These are category flags to help surface questions, not a complete interaction list.</strong> Melanotan II has no FDA-approved product, no standardized prescribing information, and no regulatory framework for interaction disclosure. If you are on any cardiovascular, serotonergic, or sexual-function medication, these interactions require clinical evaluation — not community protocol management.
        </p>
      </div>

    </div>
  );
}
