/**
 * Ghrp6SafetyPanel — proactive safety intelligence for GHRP-6.
 * Key frame: same GH-axis flags as GHRP-2, plus eating disorder history as a hard stop
 * and extreme appetite as the defining clinical management challenge.
 */

const SIDE_EFFECTS = [
  {
    name: "Glucose dysregulation — compounded by cortisol",
    detail: "GH counter-regulation to insulin plus cortisol's glucose-raising effect — same double mechanism as GHRP-2",
    frequency: "Population-specific — significant risk in prediabetes/insulin resistance; more significant than with ipamorelin",
    timing: "Develops over weeks of sustained use",
    tier: "flag",
    note: "GHRP-6 creates the same compounded glucose-raising mechanism as GHRP-2: GH counter-regulation to insulin AND cortisol's glucocorticoid glucose effect. Both are documented pharmacological effects. Metabolic monitoring is essential — this concern is amplified vs ipamorelin.",
  },
  {
    name: "Cancer history — IGF-1 growth signal concern",
    detail: "IGF-1 is mitogenic — same concern as all GH-axis compounds",
    frequency: "Population-specific — not a general side effect",
    timing: "Mechanistically relevant throughout sustained use",
    tier: "flag",
    note: "Same flag as CJC-1295, ipamorelin, GHRP-2 — active cancer or active treatment requires oncology clearance. The cortisol and prolactin elevation don't change the IGF-1 mitogenic concern.",
  },
  {
    name: "Severe allergic reaction",
    detail: "Hives, facial swelling, throat tightness, difficulty breathing",
    frequency: "Rare",
    timing: "Rapid onset if it occurs",
    tier: "flag",
    note: "As with any injectable peptide. Know the signs before starting.",
  },
  {
    name: "Extreme appetite / overeating risk",
    detail: "Intense, persistent hunger — the most prominent and defining GHRP-6 effect; overeating risk is real",
    frequency: "Very common — pharmacologically expected and intense",
    timing: "Begins within hours of injection; present throughout active use",
    tier: "watch",
    note: "GHRP-6's appetite stimulation is not a side effect to manage around — it's the ghrelin receptor working at high intensity. For caloric restriction goals, this is a direct conflict. For eating disorder history, this is a hard stop. For aggressive bulking, it's an asset. Know which situation you're in before starting.",
  },
  {
    name: "Cortisol elevation — catabolic counter-pressure",
    detail: "Documented cortisol elevation — catabolic, affects glucose, sleep, and mood",
    frequency: "Expected pharmacologically with GHRP-6",
    timing: "Follows GH pulse during active use",
    tier: "watch",
    note: "Same as GHRP-2. Cortisol is catabolic — it opposes the anabolic GH signal. For recovery and muscle goals, this counter-pressure is clinically meaningful. Mood disruption and sleep interference can follow cortisol elevation.",
  },
  {
    name: "Prolactin elevation",
    detail: "Documented prolactin elevation — can affect sexual function, libido, and mood",
    frequency: "Expected pharmacologically — non-selective GHRP profile",
    timing: "Present during active use",
    tier: "watch",
    note: "Same as GHRP-2. If you're on prolactin-affecting medications, this interaction warrants attention. Chronic prolactin elevation can affect libido, sexual function, and mood.",
  },
  {
    name: "Cardiovascular symptoms",
    detail: "Chest pain, fainting, severe shortness of breath — listed in safety profile",
    frequency: "Rare in healthy adults; higher concern in cardiovascular disease",
    timing: "Can occur during or after injection",
    tier: "watch",
    note: "Same caution as GHRP-2. Anyone with cardiovascular disease, uncontrolled hypertension, or significant cardiac history should treat this as a flag.",
  },
  {
    name: "Water retention / edema",
    detail: "Mild puffiness — standard GH response",
    frequency: "Common, especially weeks 1–4",
    timing: "Usually early; typically resolves",
    tier: "low",
    note: "Standard GH-axis compound response. Manageable. Significant or persistent swelling warrants dose reduction.",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; labelColor: string; label: string }> = {
  low:   { bg: "rgba(21,100,58,0.06)",  border: "rgba(21,100,58,0.15)",  labelColor: "#155e38", label: "Low concern" },
  watch: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.16)",   labelColor: "#7c5200", label: "Worth watching" },
  flag:  { bg: "rgba(158,56,0,0.07)",   border: "rgba(158,56,0,0.18)",   labelColor: "#9e3800", label: "Stop signal" },
};

const PLAYBOOK = [
  {
    icon: "🍽️",
    title: "Appetite management — the primary GHRP-6 challenge",
    body: "GHRP-6's appetite stimulation is the most intense of any GHRP compound and the defining clinical management challenge. It's not manageable by timing in the same way ipamorelin's appetite is — the hunger signal is intense and present after injection regardless of scheduling. If caloric control matters for your goals, GHRP-6 creates a strong headwind. If eating disorder history is present, this is a hard stop — the appetite trigger risk is real and non-negotiable.",
    flags: [
      "Eating disorder history or binge eating patterns: do not start GHRP-6 — this is a hard stop, not a 'monitor and see'",
      "If using for aggressive caloric surplus: the appetite effect is an asset; plan your intake strategy before starting",
      "If caloric control matters for your goals (cutting, recomposition): reconsider whether GHRP-6 fits; ipamorelin is a better option",
      "Don't interpret overwhelming hunger as efficacy — it's the ghrelin receptor at maximum intensity",
    ],
  },
  {
    icon: "📊",
    title: "Metabolic baseline — more critical than with ipamorelin",
    body: "GHRP-6 creates the same compounded glucose-raising mechanism as GHRP-2: GH counter-regulation to insulin AND cortisol glucocorticoid glucose effect. For anyone with metabolic history, the glucose concern is more significant than with ipamorelin. Baseline fasting glucose before starting is essential, not optional.",
    flags: [
      "Baseline fasting glucose or HbA1c before starting — more important here than with ipamorelin",
      "On diabetes medications: do not add GHRP-6 without physician supervision",
      "Monitor for glucose dysregulation symptoms: unusual thirst, frequent urination, unexplained fatigue",
      "Fasting glucose rising: stop and evaluate",
    ],
  },
  {
    icon: "🧠",
    title: "Cortisol and mood monitoring",
    body: "GHRP-6's cortisol elevation can affect mood, sleep, and recovery — the same concern as GHRP-2. If you're running GHRP-6 for recovery goals, the cortisol catabolic effect is working counter to those goals. Monitor sleep and mood throughout the cycle; if both deteriorate, cortisol is a likely contributor.",
    flags: [
      "Monitor sleep quality — cortisol-related disruption is a meaningful signal",
      "Mood changes (irritability, anxiety) during use: cortisol elevation is a likely contributor",
      "Running for recovery goals: assess whether the catabolic counter-pressure offsets the GH anabolic benefit",
      "On corticosteroid medications: do not combine without physician supervision — additive cortisol",
    ],
  },
  {
    icon: "🎗️",
    title: "Cancer history — same flag as all GH-axis compounds",
    body: "Same stop-and-consult requirement as CJC-1295, ipamorelin, and all GH-axis compounds. Active cancer or recent treatment requires oncology discussion before starting.",
    flags: [
      "Active cancer diagnosis: stop immediately — oncology clearance required",
      "Cancer in remission (last 2–3 years): consult your oncologist",
      "High hereditary cancer risk: personal risk/benefit assessment with a provider",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Eating disorder history, binge eating patterns, or disordered eating relationship",
    action: "Stop immediately (or do not start). GHRP-6's extreme appetite stimulation is a trigger risk — this is a hard stop, not a monitoring situation.",
  },
  {
    signal: "Active cancer diagnosis or currently in cancer treatment",
    action: "Stop immediately. IGF-1 is a direct mitogen. Do not use without oncology clearance.",
  },
  {
    signal: "Fasting glucose noticeably elevated or symptoms of glucose dysregulation",
    action: "Stop and check glucose. The compounded GH + cortisol glucose mechanism makes metabolic worsening real — don't push through.",
  },
  {
    signal: "Chest pain, fainting, or severe shortness of breath",
    action: "Stop immediately and seek medical evaluation. Cardiovascular symptoms appear in GHRP-6's safety documentation.",
  },
  {
    signal: "Hives, facial swelling, throat tightness, or difficulty breathing",
    action: "Stop immediately. Anaphylaxis protocol — emergency services if severe.",
  },
  {
    signal: "Pregnant, planning pregnancy, or possibly pregnant",
    action: "Stop immediately. No safety data for GH-axis compounds during pregnancy.",
  },
  {
    signal: "Adolescent use",
    action: "Stop. GH secretagogue use during adolescent development is a hard stop.",
  },
];

export default function Ghrp6SafetyPanel() {
  return (
    <div className="reta-safety">

      {/* ── Section: What actually happens ── */}
      <div>
        <div className="reta-safety__section-label">What actually happens — and the real risk hierarchy</div>
        <div className="reta-safety__effects">
          {SIDE_EFFECTS.map((se) => {
            const st = TIER_STYLE[se.tier];
            return (
              <div
                key={se.name}
                className="reta-safety__effect"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <div className="reta-safety__effect-top">
                  <div className="reta-safety__effect-name">{se.name}</div>
                  <span
                    className="reta-safety__effect-badge"
                    style={{ color: st.labelColor, borderColor: st.border }}
                  >
                    {st.label}
                  </span>
                </div>
                <div className="reta-safety__effect-detail">{se.detail}</div>
                <div className="reta-safety__effect-timing">{se.timing}</div>
                <div className="reta-safety__effect-note">{se.note}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Section: Mitigation playbook ── */}
      <div>
        <div className="reta-safety__section-label">The mitigation playbook</div>
        <div className="reta-safety__intro">
          GHRP-6&apos;s safety profile adds two GHRP-6-specific dimensions to the standard GH-axis concerns: eating disorder history is a hard stop (extreme appetite stimulation is a trigger risk, not a manageable effect), and caloric intake management is the primary practical challenge throughout the cycle. Cortisol and prolactin concerns are the same as GHRP-2.
        </div>
        <div className="reta-safety__playbook">
          {PLAYBOOK.map((item) => (
            <div key={item.title} className="reta-safety__play">
              <div className="reta-safety__play-header">
                <span className="reta-safety__play-icon" aria-hidden="true">{item.icon}</span>
                <span className="reta-safety__play-title">{item.title}</span>
              </div>
              <div className="reta-safety__play-body">{item.body}</div>
              <ul className="reta-safety__play-flags">
                {item.flags.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section: Red lines ── */}
      <div className="reta-safety__redlines-block">
        <div className="reta-safety__section-label" style={{ opacity: 1, color: "#9e3800" }}>
          When to stop and get help
        </div>
        <div className="reta-safety__redlines-sub">
          These aren&apos;t &ldquo;maybe check in with your doctor&rdquo; situations. They&apos;re stop-now signals.
        </div>
        <div className="reta-safety__redlines">
          {RED_LINES.map((r, i) => (
            <div key={i} className="reta-safety__redline">
              <div className="reta-safety__redline-signal">{r.signal}</div>
              <div className="reta-safety__redline-action">{r.action}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Risk in proportion ── */}
      <div className="reta-safety__proportion">
        <div className="reta-safety__proportion-heading">Risk in proportion</div>
        <p>
          GHRP-6 is pharmacologically characterized and broadly used in older community protocols and specific bulking contexts. For a metabolically healthy adult with no cancer history, no eating disorder history, and aggressive caloric surplus goals: the risk profile is manageable. The extreme appetite effect is an asset in that context.
        </p>
        <p>
          For most other goals — recovery, body recomposition, fat loss — the extreme appetite stimulation and cortisol catabolic burden make GHRP-6 a less favorable choice than ipamorelin. The question before starting: have you considered ipamorelin? Same receptor, cleaner profile. If you have a specific reason to use GHRP-6 instead, the metabolic monitoring and appetite management playbook applies.
        </p>
      </div>

    </div>
  );
}
