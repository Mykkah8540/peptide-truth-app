export default function OxytocinSafetyPanel() {
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
              tier: "flag", label: "Pregnancy — absolute contraindication for non-medical use",
              detail: "Oxytocin causes uterine contractions. This is why it is used clinically for labor induction and postpartum hemorrhage — in a monitored hospital setting with dosing control. Using oxytocin (including intranasal) during pregnancy outside of clinical supervision can cause uterine hyperstimulation, fetal distress, or premature labor. This is an absolute contraindication for wellness use.",
            },
            {
              tier: "flag", label: "Seizure disorders (epilepsy)",
              detail: "Oxytocin has antidiuretic-like effects via vasopressin receptor cross-reactivity, which can cause water retention and hyponatremia (low blood sodium). Hyponatremia is a well-documented trigger for seizures. In individuals with pre-existing seizure disorders, this risk is elevated meaningfully.",
            },
            {
              tier: "flag", label: "Significant cardiovascular disease",
              detail: "IV oxytocin causes transient hypotension and cardiovascular stress in clinical settings. Intranasal administration has substantially lower systemic absorption, but in individuals with significant cardiac disease, arrhythmias, or hemodynamic instability, the cardiovascular effects warrant caution.",
            },
            {
              tier: "watch", label: "Trying to conceive / early pregnancy not yet confirmed",
              detail: "If pregnancy has not been definitively excluded, using a uterotonic agent introduces risk of undetected pregnancy-related complications. The pregnancy contraindication extends to the peri-conceptional period.",
            },
            {
              tier: "watch", label: "Postpartum complications or significant gynecologic history",
              detail: "Abnormal uterine anatomy, prior cesarean sections, or postpartum complications change how the uterus responds to oxytocin. Non-clinical use in these contexts is unmonitored.",
            },
            {
              tier: "watch", label: "Children and adolescents",
              detail: "Oxytocin systems are actively developing during adolescence. No safety data exists for off-label use in this population.",
            },
            {
              tier: "low", label: "Headache, nausea, dizziness",
              detail: "Most commonly reported AEs in clinical and intranasal research contexts. Generally mild and transient.",
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
            "Uterine cramping or contractions in anyone who could be pregnant",
            "Seizure or altered consciousness",
            "Severe chest pain, fainting, or significant blood pressure symptoms",
            "Severe confusion or agitation — may indicate hyponatremia (hyponatremia can progress rapidly)",
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
              title: "Pregnancy must be excluded first",
              items: [
                "If you are trying to conceive, have recently been sexually active, or have any reason to suspect pregnancy: pregnancy test and clinical evaluation before any oxytocin use",
                "The uterotonic risk is not hypothetical — it is the mechanism of the FDA-approved drug",
                "No community dosing protocol can substitute for clinical monitoring in pregnancy",
              ],
            },
            {
              title: "Seizure history and sodium balance",
              items: [
                "Anyone with epilepsy or a history of seizures should not use oxytocin without explicit neurological review",
                "The hyponatremia risk is most relevant with high doses or prolonged use — but 'low dose' intranasal use is not zero-risk in seizure-prone individuals",
                "Symptoms of hyponatremia: unusual headache, nausea, confusion, fatigue, muscle cramps — report immediately if these occur",
              ],
            },
            {
              title: "Evidence calibration for social effects",
              items: [
                "The social bonding effect in healthy adults is the primary motivation — and also the least consistent evidence signal",
                "Large pre-registered studies have not replicated early small-study findings",
                "If the primary goal is anxiolytic or social-anxiety relief, Selank has more consistent evidence from Russian clinical programs, different mechanism, lower systemic safety concerns",
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
