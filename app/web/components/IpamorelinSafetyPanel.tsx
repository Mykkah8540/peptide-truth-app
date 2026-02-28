/**
 * IpamorelinSafetyPanel — proactive safety intelligence for Ipamorelin.
 * Key frame: GH-axis compound with the same systemic considerations as CJC-1295,
 * plus ipamorelin-specific effects: appetite stimulation (ghrelin receptor),
 * and a meaningful sleep apnea caution due to GH + fluid dynamics.
 */

const SIDE_EFFECTS = [
  {
    name: "Glucose dysregulation",
    detail: "GH counter-regulation to insulin — worsened glucose control in susceptible users",
    frequency: "Population-specific — significant risk in prediabetes/insulin resistance; low in metabolically healthy adults",
    timing: "Develops over weeks of sustained GH elevation",
    tier: "flag",
    note: "Same mechanism as CJC-1295: GH is counter-regulatory to insulin. If you have any metabolic history, baseline glucose monitoring is the minimum responsible check before starting.",
  },
  {
    name: "Cancer history — IGF-1 growth signal concern",
    detail: "IGF-1 is mitogenic — same concern as CJC-1295, same mechanism, same recommendation",
    frequency: "Population-specific — not a general side effect",
    timing: "Mechanistically relevant throughout sustained use",
    tier: "flag",
    note: "Active cancer or active treatment: stop and consult oncologist. The route to IGF-1 is different from CJC-1295 (ghrelin vs GHRH receptor) — the downstream risk is identical.",
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
    name: "Increased appetite",
    detail: "Hunger stimulation — ghrelin receptor agonism reliably increases appetite",
    frequency: "Common — mechanistically expected, not a side effect to push through",
    timing: "Often noticed within the first week; may persist throughout use",
    tier: "watch",
    note: "This is the ghrelin receptor mechanism working as expected. Most users manage it by timing the injection before sleep. If appetite stimulation is counterproductive for your goals, this is a signal ipamorelin may not fit.",
  },
  {
    name: "Sleep apnea worsening",
    detail: "GH elevation and fluid retention can worsen sleep-disordered breathing",
    frequency: "Population-specific — relevant for untreated or poorly controlled OSA",
    timing: "Can develop or worsen over weeks of use",
    tier: "watch",
    note: "GH increases fluid retention and can affect upper airway tone. For people with untreated sleep apnea, this is a real concern. If you have OSA, confirm it's treated and controlled before adding a GH secretagogue.",
  },
  {
    name: "Water retention / edema",
    detail: "Mild puffiness, especially face, hands, feet — early GH response",
    frequency: "Common, especially weeks 1–4",
    timing: "Usually early; typically resolves as the body adapts",
    tier: "watch",
    note: "Expected GH-axis response. Mild edema is manageable. Significant or persistent swelling warrants dose reduction or stopping.",
  },
  {
    name: "Headache / lethargy",
    detail: "Non-specific, typically mild — common across GH secretagogues",
    frequency: "Moderate — especially early or at higher doses",
    timing: "Shortly after administration; often fades with time",
    tier: "low",
    note: "Usually resolves with dose reduction or as the body adapts. Persistent or severe headache warrants reassessment.",
  },
  {
    name: "Injection site reactions",
    detail: "Redness, bruising, soreness; infection rare with proper technique",
    frequency: "Common (mild)",
    timing: "Immediate to 24 hours",
    tier: "low",
    note: "Standard injectable peptide profile. Sterile technique and site rotation resolve most issues.",
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
    title: "Metabolic baseline — glucose check before starting",
    body: "GH counter-regulation to insulin is established physiology — not a drug-specific side effect. Ipamorelin amplifies GH release through the ghrelin receptor; the downstream metabolic consequence (reduced insulin sensitivity) is the same as any GH secretagogue. Get a baseline fasting glucose before starting if you have any metabolic history. This takes 5 minutes and meaningfully changes your risk profile.",
    flags: [
      "Baseline fasting glucose or HbA1c before starting — especially if you have metabolic history",
      "On diabetes medications: do not add ipamorelin without medical supervision",
      "Monitor for glucose dysregulation symptoms: unusual thirst, frequent urination, unexplained fatigue",
      "Fasting glucose rising noticeably from baseline: stop and evaluate",
    ],
  },
  {
    icon: "😴",
    title: "Sleep apnea check — ipamorelin-specific concern",
    body: "This is the safety consideration most specific to ipamorelin that doesn't apply as strongly to CJC-1295 alone. GH elevation from any secretagogue can affect fluid balance and upper airway dynamics. For people with untreated or poorly controlled obstructive sleep apnea, adding a GH secretagogue can worsen breathing during sleep. This isn't a theoretical concern — it's mechanistically grounded in GH physiology and fluid retention.",
    flags: [
      "If you have untreated sleep apnea: do not start ipamorelin without addressing the OSA first",
      "If you're on CPAP: confirm your therapy is effective before adding a GH secretagogue",
      "Watch for: worsening daytime sleepiness, partner reports of increased snoring, morning headaches",
      "New sleep-disordered breathing symptoms during a cycle: stop and consult a sleep medicine provider",
    ],
  },
  {
    icon: "🍽️",
    title: "Appetite management — it's ghrelin, not a side effect",
    body: "Ipamorelin acts on the ghrelin receptor. Ghrelin is a hunger hormone. Appetite stimulation is not an adverse effect — it's a direct consequence of the mechanism. For people trying to gain lean mass, this can be an asset. For people with other goals, it requires active management. The most common community strategy: time the injection immediately before sleep (appetite effect is present but sleep suppresses it).",
    flags: [
      "Timing before sleep is the most common approach to managing appetite stimulation",
      "If appetite stimulation conflicts with your goals (e.g., fat loss while stacking with CJC): factor this into your decision",
      "Don't interpret hunger as a sign of under-dosing — it's the receptor doing what it does",
      "If appetite increases are disruptive and don't improve after 2–3 weeks: consider whether ipamorelin fits your current goals",
    ],
  },
  {
    icon: "🎗️",
    title: "Cancer history — identical concern to CJC-1295",
    body: "The route to IGF-1 is different (ghrelin receptor vs GHRH receptor). The downstream IGF-1 elevation and the associated cancer history concern are identical. Active cancer, recent treatment, or high hereditary cancer risk requires oncology discussion before starting either compound — or the stack.",
    flags: [
      "Active cancer diagnosis: stop immediately — do not use without oncology clearance",
      "Cancer in remission (last 2–3 years): consult your oncologist before starting",
      "High hereditary cancer risk: personal risk/benefit assessment with a provider",
      "Hormone-sensitive cancers: particular attention warranted — IGF-1 axis interactions are direct",
    ],
  },
  {
    icon: "💉",
    title: "Injection technique and timing",
    body: "Standard subcutaneous injection protocol. Bedtime timing is the community convention — aligns the injection with the body's primary GH pulse window and manages appetite stimulation simultaneously.",
    flags: [
      "New needle and syringe every injection — never re-use",
      "Alcohol swab on vial septum and injection site before every use",
      "Proper SC insertion at 45° into a pinched skin fold; rotate sites",
      "Reconstituted: refrigerate, use within 30 days, discard if cloudy",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Active cancer diagnosis or currently in cancer treatment",
    action: "Stop immediately. IGF-1 is a direct mitogen. Do not use while in active cancer treatment without explicit oncology clearance.",
  },
  {
    signal: "Fasting glucose noticeably elevated or symptoms of glucose dysregulation",
    action: "Stop and check glucose. GH-driven glucose effects are real — don't push through worsening metabolic symptoms.",
  },
  {
    signal: "Worsening sleep quality, new or worsening sleep apnea symptoms, or significant morning fatigue",
    action: "Stop and evaluate for OSA worsening. GH secretagogues can worsen sleep-disordered breathing. This is ipamorelin-specific and warrants prompt attention.",
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

export default function IpamorelinSafetyPanel() {
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
          Ipamorelin&apos;s risk profile is similar to CJC-1295 with two ipamorelin-specific variables: appetite stimulation (manageable with timing) and sleep apnea concern (requires assessment if relevant). Metabolic baseline, cancer history gate, and cycling awareness are identical to any GH-axis compound.
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
          Ipamorelin is broadly well-tolerated in community use — the selective profile (less cortisol/prolactin than older GHRPs) tracks with real experience. For a metabolically healthy adult with no cancer history, treated sleep apnea (or no OSA), and a verified source: the risk is manageable with appropriate monitoring.
        </p>
        <p>
          The three variables that most determine individual risk: metabolic status (glucose), cancer history, and sleep apnea status. Address all three before starting — not during.
        </p>
      </div>

    </div>
  );
}
