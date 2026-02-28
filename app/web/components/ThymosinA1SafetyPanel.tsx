export default function ThymosinA1SafetyPanel() {
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
              tier: "flag", label: "Autoimmune disease (lupus, RA, MS, IBD, psoriasis)",
              detail: "Thymosin Alpha-1 shifts the immune system toward Th1 activation and T-cell proliferation. In autoimmune conditions where the immune system is already overactive against self-tissue, this activation can trigger flares or worsen disease. This is a direct pharmacological conflict — not a general caution.",
            },
            {
              tier: "flag", label: "Organ transplant recipients or immunosuppressive therapy",
              detail: "Anyone on drugs like tacrolimus, cyclosporine, mycophenolate, or rituximab to suppress immune rejection is in direct conflict with a compound designed to upregulate immune activity. This combination is not safe without explicit specialist guidance.",
            },
            {
              tier: "flag", label: "Pregnancy and breastfeeding",
              detail: "No human safety data in pregnancy. Immune modulation during fetal development and lactation carries unknown risks. Developmental immune programming may be sensitive to exogenous thymic peptides.",
            },
            {
              tier: "watch", label: "Active systemic infection with significant symptoms",
              detail: "There is a reasonable hypothesis that immune activation during acute severe infection helps, but there is also a risk of overdriving inflammatory responses. Not a substitute for appropriate medical treatment. Timing matters and clinical guidance is warranted.",
            },
            {
              tier: "watch", label: "Children and adolescents",
              detail: "Developmental thymic function is active and may respond unpredictably to exogenous thymic peptides. No pediatric safety data outside of specific clinical investigations.",
            },
            {
              tier: "low", label: "Injection-site reactions",
              detail: "The most consistently reported side effect in clinical trials: redness, irritation, mild swelling at injection site. Generally mild and transient. Rotate sites.",
            },
            {
              tier: "low", label: "Fatigue, headache, mild flu-like symptoms",
              detail: "Reported in a subset of users — may reflect mild immune activation response. Typically transient and self-limiting.",
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
            "Allergic reaction with hives, facial swelling, or trouble breathing (anaphylaxis protocol)",
            "High fever with severe body aches after injection",
            "Rapid or significant worsening of known autoimmune symptoms (flare)",
            "New or worsening joint pain, swelling, or rash in a person with autoimmune history",
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
              title: "Autoimmune history screen",
              items: [
                "Any diagnosed autoimmune condition (even managed or in remission): full stop until specialist reviewed",
                "If you have a first-degree relative with autoimmune disease and are asymptomatic: note this as a contextual risk factor",
                "Unexplained joint pain, rashes, fatigue, or GI symptoms that haven't been evaluated: investigate before starting anything immune-active",
              ],
            },
            {
              title: "Immune medication screen",
              items: [
                "Corticosteroids (prednisone, dexamethasone): blunts TA1 effect and creates monitoring complexity",
                "Immunosuppressants (tacrolimus, mycophenolate, azathioprine, biologics): direct pharmacological conflict",
                "Anyone on biologics (TNF inhibitors, IL-6 inhibitors, JAK inhibitors): not appropriate without specialist guidance",
              ],
            },
            {
              title: "Source quality — this one matters more than usual",
              items: [
                "Thymalfasin (Zadaxin) is a pharmaceutical product in markets where it is approved — counterfeit and mislabeled peptides circulate extensively in research channels",
                "Research-grade TA1 has no standardized quality guarantee",
                "Endotoxin contamination risk is elevated in injectable peptides from non-pharmaceutical sources — this is a real reason people have injection-site reactions beyond the expected local irritation",
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
