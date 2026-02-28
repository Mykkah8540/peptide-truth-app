/**
 * Ghrp2SafetyPanel — proactive safety intelligence for GHRP-2.
 * Key frame: same GH-axis flags as ipamorelin plus cortisol/prolactin elevation
 * as GHRP-2-specific concerns. Cardiovascular caution (in side_effects_serious from JSON).
 */

const SIDE_EFFECTS = [
  {
    name: "Glucose dysregulation — compounded by cortisol",
    detail: "GH counter-regulation to insulin plus cortisol's glucose-raising effect — double mechanism",
    frequency: "Population-specific — significant risk in prediabetes/insulin resistance; more significant than with ipamorelin due to cortisol contribution",
    timing: "Develops over weeks of sustained use",
    tier: "flag",
    note: "GHRP-2 creates a compounded glucose-raising mechanism: GH counter-regulation to insulin AND cortisol glucocorticoid effect. Both independently raise blood glucose. If you have any metabolic history, the glucose concern here is more significant than with ipamorelin — baseline monitoring is essential.",
  },
  {
    name: "Cancer history — IGF-1 growth signal concern",
    detail: "IGF-1 is mitogenic — same concern as all GH-axis compounds",
    frequency: "Population-specific — not a general side effect",
    timing: "Mechanistically relevant throughout sustained use",
    tier: "flag",
    note: "Same flag as CJC-1295, ipamorelin, sermorelin — active cancer or active treatment requires oncology clearance. GHRP-2's cortisol elevation doesn't change the IGF-1 mitogenic concern; if anything, the combined endocrine disruption in cancer contexts warrants even more caution.",
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
    name: "Cortisol elevation — catabolic counter-pressure",
    detail: "Documented cortisol elevation — catabolic, affects glucose, can disrupt sleep and mood",
    frequency: "Common — pharmacologically expected with GHRP-2 (not a side effect to push through; it's the mechanism)",
    timing: "Follows GH pulse — present during active GHRP-2 use",
    tier: "watch",
    note: "Cortisol elevation from GHRP-2 is confirmed in human pharmacology, not theoretical. Cortisol is catabolic — it promotes protein breakdown and opposes the anabolic GH signal. For recovery and muscle goals, this counter-pressure is clinically meaningful. Mood changes, sleep disruption, and glucose elevation can all follow cortisol elevation.",
  },
  {
    name: "Prolactin elevation",
    detail: "Documented prolactin elevation — can affect sexual function, mood, and potentially libido",
    frequency: "Expected pharmacologically — part of GHRP-2's non-selective profile",
    timing: "Present during active use",
    tier: "watch",
    note: "Prolactin elevation is documented for GHRP-2 and is part of what distinguishes it from ipamorelin. Chronic prolactin elevation can affect libido, sexual function, and mood. If you're on medications that already affect prolactin (antipsychotics, some antidepressants), this interaction warrants attention.",
  },
  {
    name: "Cardiovascular symptoms",
    detail: "Chest pain, fainting, severe shortness of breath — listed in safety profile",
    frequency: "Rare in healthy adults; more significant in those with cardiovascular disease",
    timing: "Can occur during or after injection",
    tier: "watch",
    note: "Cardiovascular caution appears in GHRP-2's safety documentation. This may relate to GH-driven fluid dynamics, cortisol's cardiovascular effects, or hypotensive responses. Anyone with cardiovascular disease, uncontrolled hypertension, or significant cardiac history should treat this as a flag, not a watch.",
  },
  {
    name: "Water retention / edema",
    detail: "Mild puffiness — standard early GH response",
    frequency: "Common, especially weeks 1–4",
    timing: "Usually early; typically resolves",
    tier: "low",
    note: "Same as other GH-axis compounds. Mild edema is manageable. Significant or persistent swelling warrants dose reduction.",
  },
  {
    name: "Headache / injection site reactions",
    detail: "Mild headache; standard injectable site reactions with proper technique",
    frequency: "Moderate (headache); Common/mild (injection site)",
    timing: "Shortly after administration",
    tier: "low",
    note: "Standard injectable GHRP profile. Sterile technique and site rotation resolve most injection site issues. Persistent or severe headache warrants reassessment.",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; labelColor: string; label: string }> = {
  low:   { bg: "rgba(21,100,58,0.06)",  border: "rgba(21,100,58,0.15)",  labelColor: "#155e38", label: "Low concern" },
  watch: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.16)",   labelColor: "#7c5200", label: "Worth watching" },
  flag:  { bg: "rgba(158,56,0,0.07)",   border: "rgba(158,56,0,0.18)",   labelColor: "#9e3800", label: "Stop signal" },
};

const PLAYBOOK = [
  {
    icon: "📊",
    title: "Metabolic baseline — more critical than with ipamorelin",
    body: "GHRP-2 creates a compounded glucose-raising mechanism: GH counter-regulation to insulin AND cortisol's glucocorticoid glucose effect. Both are documented, not theoretical. For anyone with metabolic history, this makes baseline glucose monitoring more important than with ipamorelin — not less. Get a baseline fasting glucose before starting. If you have any prediabetes, insulin resistance, or metabolic syndrome history, the glucose concern here is amplified.",
    flags: [
      "Baseline fasting glucose or HbA1c before starting — more important here than with ipamorelin due to cortisol glucose contribution",
      "On diabetes medications: do not add GHRP-2 without physician supervision",
      "Monitor for glucose dysregulation symptoms: unusual thirst, frequent urination, unexplained fatigue",
      "Fasting glucose rising noticeably from baseline: stop and evaluate",
    ],
  },
  {
    icon: "🧠",
    title: "Cortisol management — the unique GHRP-2 concern",
    body: "GHRP-2's cortisol elevation is documented and meaningful. Cortisol affects sleep, mood, glucose, and body composition. If you're running GHRP-2 for recovery or muscle goals, the cortisol counter-pressure is working against those goals throughout the cycle. Monitor sleep quality — elevated cortisol from GHRP-2 can worsen the recovery that the GH effect is trying to support. If mood changes, sleep disruption, or irritability emerge, cortisol elevation is a likely contributor.",
    flags: [
      "Monitor sleep quality throughout the cycle — cortisol-related sleep disruption is a meaningful signal",
      "Mood changes (irritability, anxiety, low mood) emerging during use: cortisol elevation is a likely contributor",
      "If running for recovery goals: assess whether the cortisol catabolic effect is offsetting the GH anabolic benefit",
      "On corticosteroid medications: do not add GHRP-2 without physician supervision — additive cortisol effects",
    ],
  },
  {
    icon: "🎗️",
    title: "Cancer history — identical concern to all GH-axis compounds",
    body: "Same flag as ipamorelin and CJC-1295. Active cancer, recent treatment, or high hereditary cancer risk requires oncology discussion before starting any GHRH or GHRP compound. GHRP-2's cortisol elevation doesn't change this — if anything, the combined endocrine perturbation in cancer contexts warrants extra caution.",
    flags: [
      "Active cancer diagnosis: stop immediately — do not use without oncology clearance",
      "Cancer in remission (last 2–3 years): consult your oncologist before starting",
      "High hereditary cancer risk: personal risk/benefit assessment with a provider",
      "Hormone-sensitive cancers: particular attention warranted",
    ],
  },
  {
    icon: "💉",
    title: "Injection technique and the ipamorelin question",
    body: "Standard subcutaneous injection protocol. Before committing to GHRP-2: if your goal is GH-axis stimulation for recovery or body composition, consider whether ipamorelin — which produces similar GH release without the cortisol/prolactin elevation — better fits your objectives. The injection technique is the same; the pharmacological profile is meaningfully different.",
    flags: [
      "New needle and syringe every injection — never re-use",
      "Alcohol swab on vial septum and injection site before every use",
      "Proper SC insertion at 45° into a pinched skin fold; rotate sites",
      "Consider ipamorelin as an alternative if you haven't already — same mechanism, better selectivity",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Active cancer diagnosis or currently in cancer treatment",
    action: "Stop immediately. IGF-1 is a direct mitogen. Do not use during active cancer treatment without explicit oncology clearance.",
  },
  {
    signal: "Fasting glucose noticeably elevated or symptoms of glucose dysregulation",
    action: "Stop and check glucose. GHRP-2's compounded glucose-raising mechanism (GH + cortisol) makes metabolic worsening a real risk — don't push through.",
  },
  {
    signal: "Chest pain, fainting, or severe shortness of breath",
    action: "Stop immediately and seek medical evaluation. Cardiovascular symptoms are listed in GHRP-2's safety profile. This is a stop-now signal.",
  },
  {
    signal: "Hives, facial swelling, throat tightness, or difficulty breathing",
    action: "Stop immediately. Anaphylaxis protocol — epinephrine if available, emergency services if severe.",
  },
  {
    signal: "Pregnant, planning pregnancy, or possibly pregnant",
    action: "Stop immediately. No safety data for GH-axis compounds during pregnancy.",
  },
  {
    signal: "Adolescent use",
    action: "Stop. GH secretagogue use during adolescent development carries real risks to endocrine setpoints. Hard stop.",
  },
];

export default function Ghrp2SafetyPanel() {
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
          GHRP-2&apos;s risk profile shares the GH-axis flags with a documented addition: cortisol and prolactin elevation create a compounded glucose-raising mechanism and a catabolic counter-pressure that ipamorelin avoids. Metabolic monitoring matters more here than with ipamorelin. The cardiovascular caution in the safety profile warrants attention in anyone with cardiac history.
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
          GHRP-2 is broadly used in research and older community protocols — the GH release is real and the compound is pharmacologically characterized. For a metabolically healthy adult with no cancer history and no cardiovascular disease: the risk profile is manageable. The cortisol and prolactin elevation are the honest tradeoffs vs ipamorelin — not safety-stopping concerns in most users, but meaningful limitations for the goals most people pursue.
        </p>
        <p>
          The key question before starting GHRP-2: have you considered ipamorelin? Same receptor, cleaner profile, same GH-axis safety gates. If the answer is yes and you have a specific reason to use GHRP-2 instead, the glucose monitoring and cortisol monitoring playbook applies.
        </p>
      </div>

    </div>
  );
}
