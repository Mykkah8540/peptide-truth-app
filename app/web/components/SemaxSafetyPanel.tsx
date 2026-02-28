/**
 * SemaxSafetyPanel — proactive safety intelligence for Semax.
 * Key frame: favorable safety profile in available data; primary concerns are
 * psychiatric medication interactions (dopamine/serotonin pathways), anxiety worsening
 * in predisposed individuals, nasal irritation (intranasal route), and hard stops.
 */

const SIDE_EFFECTS = [
  {
    name: "Psychiatric medication interactions — dopaminergic/serotonergic context",
    detail: "Dopaminergic and serotonergic pathway activation interacting with psychiatric medications",
    frequency: "Population-specific — relevant if on psychiatric medications",
    timing: "Concurrent use",
    tier: "flag",
    note: "Semax produces measurable dopaminergic and serotonergic pathway activation. Antidepressants (SSRIs, SNRIs, MAOIs), antipsychotics, and mood stabilizers all act on these same pathways. The combined effect in a person on psychiatric medications is insufficiently characterized. Dopaminergic drugs can interact unpredictably with antipsychotics. Serotonergic activation adds to SSRI/SNRI serotonin burden — at high SSRI doses, serotonin syndrome risk is a real consideration.",
  },
  {
    name: "Adolescent / pregnant use",
    detail: "CNS neurodevelopmental concern — hard stop",
    frequency: "Population-specific",
    timing: "At any point during use",
    tier: "flag",
    note: "Semax acts on BDNF, dopaminergic, and serotonergic CNS pathways involved in neurodevelopment. Adolescent CNS development is an established hard stop. Pregnancy safety data is absent.",
  },
  {
    name: "Anxiety / agitation worsening (anxiety-prone individuals)",
    detail: "Dopaminergic stimulation can increase anxious arousal in predisposed individuals",
    frequency: "Minority of users — risk is higher in anxiety-prone individuals",
    timing: "During active window — acute",
    tier: "watch",
    note: "Semax's stimulatory profile can worsen anxiety in people with baseline anxiety, anxiety disorders, or anxiety-prone temperament. This is mechanistically consistent with dopaminergic stimulation. Community reports consistently flag this — it's why the Selank + Semax combination is commonly recommended. Starting at lower doses and assessing personal anxiety response is the practical mitigation.",
  },
  {
    name: "Mild stimulatory effects — insomnia if timed wrong",
    detail: "Stimulatory CNS activation can interfere with sleep if used late in the day",
    frequency: "Common if timing is poor",
    timing: "If administered in the evening",
    tier: "watch",
    note: "Semax's dopaminergic activation can interfere with sleep if used later in the day. Most community protocols use semax in the morning. This is a manageable timing issue — not a fundamental contraindication.",
  },
  {
    name: "Nasal mucosal irritation",
    detail: "Mild nasal irritation, stinging with intranasal administration",
    frequency: "Common with repeated intranasal use",
    timing: "Onset with each administration",
    tier: "low",
    note: "Same consideration as selank intranasal. Manageable. Consider lower-concentration formulation if irritation is significant.",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; labelColor: string; label: string }> = {
  low:   { bg: "rgba(21,100,58,0.06)",  border: "rgba(21,100,58,0.15)",  labelColor: "#155e38", label: "Low concern" },
  watch: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.16)",   labelColor: "#7c5200", label: "Worth watching" },
  flag:  { bg: "rgba(158,56,0,0.07)",   border: "rgba(158,56,0,0.18)",   labelColor: "#9e3800", label: "Stop signal" },
};

const PLAYBOOK = [
  {
    icon: "›",
    title: "Anxiety screening — know your baseline before starting",
    body: "Semax's stimulatory profile is an asset for cognitively-oriented healthy adults without anxiety. It's a liability for anyone with baseline anxiety or anxiety disorder. The practical screen: do you experience anxiety or anxious arousal with caffeine or stimulants? If yes, semax carries elevated risk of worsening anxiety — and Selank may be a better primary choice, or Selank co-use is a reasonable buffer. Starting with a lower dose to assess personal response is the pragmatic approach.",
    flags: [
      "Baseline anxiety disorder: discuss with psychiatrist before adding a dopaminergic stimulatory peptide",
      "Anxiety-prone without diagnosed disorder: consider starting with Selank alone; add Semax cautiously if Selank is well-tolerated",
      "Anxiety worsening after semax use: this is the predicted response — reduce dose or discontinue",
      "Combining Semax + Selank as an anxiety buffer: this is community-standard practice; Selank's anxiolytic profile can offset Semax's stimulatory anxiety risk",
    ],
  },
  {
    icon: "›",
    title: "Timing — morning use for the stimulatory profile",
    body: "The practical timing guidance from community protocols: use semax in the morning to align the stimulatory activation window with waking cognition goals and to avoid sleep disruption. Afternoon use carries higher insomnia risk. The BDNF effect is cumulative and doesn't require specific timing — but the dopaminergic/serotonergic activation window matters for sleep quality.",
    flags: [
      "Standard community protocol: morning administration",
      "Avoid afternoon or evening use if you have any sleep sensitivity",
      "If sleep disruption occurs on morning use: consider dose reduction",
    ],
  },
  {
    icon: "›",
    title: "Psychiatric medication check",
    body: "Semax's dopaminergic and serotonergic mechanism creates the most significant interaction risk with psychiatric medications — antidepressants, antipsychotics, stimulants (ADHD medications), and mood stabilizers all operate on overlapping pathways. The specific interaction profile for each combination is not characterized in the literature. If on psychiatric medications, physician guidance before adding semax is not bureaucratic caution — it's a real pharmacological uncertainty.",
    flags: [
      "On SSRIs or SNRIs: serotonergic pathway interaction; discuss with your prescribing physician",
      "On antipsychotics: dopaminergic interaction can be significant — physician guidance required",
      "On stimulant medications (amphetamines, methylphenidate): additive dopaminergic stimulation; physician guidance required",
      "On MAOIs: potentially significant interaction given serotonergic mechanism — do not combine without physician clearance",
    ],
  },
  {
    icon: "›",
    title: "Source quality",
    body: "Same consideration as selank — not FDA-regulated in the US, quality varies across gray-market suppliers. Third-party CoA covering purity, sterility, and concentration is the minimum standard before intranasal use.",
    flags: [
      "Only use verified CoA sources for any intranasal peptide administration",
      "Concentration accuracy matters for intranasal dosing — verify against CoA",
    ],
  },
];

const RED_LINES = [
  {
    signal: "On psychiatric medications (SSRIs, SNRIs, antipsychotics, MAOIs, stimulants) — before starting",
    action: "Discuss with your prescribing physician before adding semax. Dopaminergic and serotonergic pathway interactions are real and not fully characterized.",
  },
  {
    signal: "Adolescent use",
    action: "Hard stop. CNS peptides affecting BDNF, dopamine, and serotonin pathways are not appropriate during neurodevelopment.",
  },
  {
    signal: "Pregnant or planning pregnancy",
    action: "Stop immediately. No safety data during pregnancy; CNS mechanism makes this a hard stop.",
  },
  {
    signal: "Significant anxiety worsening, racing thoughts, or agitation after use",
    action: "Stop use of semax. This is the predicted adverse response in anxiety-prone individuals. Selank alone may be a better option for your profile.",
  },
  {
    signal: "Product without a verifiable third-party CoA",
    action: "Do not administer. Source quality is the primary practical safety variable for gray-market intranasal peptides.",
  },
];

export default function SemaxSafetyPanel() {
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
          Semax&apos;s safety profile is generally favorable in available data — no severe adverse events documented in Russian clinical use or community experience at typical doses. The primary risk vectors are: psychiatric medication interactions (dopaminergic/serotonergic pathway overlap), anxiety worsening in predisposed individuals, timing-related sleep disruption, and source quality. None of these are exotic concerns — they follow directly from the mechanism.
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
          Semax has a favorable safety profile for a healthy adult without anxiety disorder and without psychiatric medications. The Russian clinical use context and community experience don&apos;t document severe adverse events at typical doses. The risk is pharmacological: dopaminergic/serotonergic activation interacts with medications that act on the same pathways.
        </p>
        <p>
          The practical safety profile: screen for psychiatric medications and baseline anxiety, time administration in the morning, verify source quality, and observe the hard stops. For someone who clears those screens, semax occupies a low-to-moderate risk position — comparable to selank but with higher anxiety risk in susceptible individuals.
        </p>
      </div>

    </div>
  );
}
