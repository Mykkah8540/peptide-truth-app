export default function OxytocinInteractionsPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Framing */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "16px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: 0 }}>
          Oxytocin interactions fall into two main categories: <strong>serotonergic medications</strong> (oxytocin and serotonin systems interact, especially in social cognition and uterine contexts) and <strong>cardiovascular / fluid-regulation medications</strong> given oxytocin's antidiuretic cross-activity and cardiovascular effects. The pregnancy context is absolute — see Safety for that framing.
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
              tier: "flag", cls: "Labor-inducing / uterotonic drugs",
              examples: "Prostaglandins (misoprostol, dinoprostone), ergometrine, syntocinon (IV oxytocin)",
              why: "Combining oxytocin with other uterotonic agents outside of clinical monitoring creates risk of uterine tachysystole (excessive contractions) and fetal distress. These combinations exist in obstetric protocols but require clinical management — not relevant to wellness use.",
            },
            {
              tier: "flag", cls: "Diuretics / agents affecting sodium balance",
              examples: "Hydrochlorothiazide, furosemide, SGLT2 inhibitors",
              why: "Oxytocin's antidiuretic-like effects combined with diuretics that alter sodium/fluid balance create risk of hyponatremia. The interaction is most relevant with high or repeated dosing.",
            },
            {
              tier: "watch", cls: "Serotonergic medications",
              examples: "SSRIs, SNRIs, MAOIs, triptans, lithium",
              why: "Serotonin and oxytocin systems have documented interactions in uterine contractions (serotonin facilitates oxytocin-induced contractions), social behavior circuits, and autonomic function. The clinical interaction significance for intranasal wellness use is not well-characterized, but the biological overlap warrants flagging, particularly for anyone already managing a serotonergic medication regimen.",
            },
            {
              tier: "watch", cls: "Cardiovascular medications (antihypertensives, vasodilators)",
              examples: "Nitrates, calcium channel blockers, beta-blockers",
              why: "IV oxytocin can cause transient hypotension and cardiovascular changes in clinical settings. Intranasal has lower systemic absorption but the cardiovascular interaction flag applies for anyone on medications managing hemodynamic instability.",
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

      {/* Compound combinations */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Compound combinations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              tier: "watch", name: "MDMA / recreational empathogen context",
              note: "Oxytocin + MDMA is discussed in harm-reduction and therapeutic communities (MDMA releases endogenous oxytocin as part of its mechanism). Using exogenous oxytocin alongside MDMA introduces unpredictable serotonergic + oxytocin pathway additive effects. Not recommended without clinical context.",
            },
            {
              tier: "watch", name: "Selank / Semax (CNS peptides)",
              note: "Common co-use in social/mood optimization stacks. No direct pharmacological conflict but CNS-active combinations always warrant thinking through the additive effect profile. Selank's anxiolytic + oxytocin's social framing are commonly combined.",
            },
            {
              tier: "low", name: "GH-axis peptides (CJC-1295, ipamorelin, etc.)",
              note: "Different mechanism classes. No known pharmacological interaction between oxytocin and GH-axis compounds.",
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
          <strong>These are category flags, not a complete interaction list.</strong> If you are pregnant, trying to conceive, have a seizure disorder, or are on serotonergic medications, oxytocin requires clinical review before use. The pregnancy contraindication is not a caution — it is a hard stop.
        </p>
      </div>

    </div>
  );
}
