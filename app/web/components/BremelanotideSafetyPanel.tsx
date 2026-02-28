/**
 * BremelanotideSafetyPanel — proactive safety intelligence for Bremelanotide.
 * Key frame: FDA prescribing information safety data is detailed and rigorous.
 * Primary concerns: cardiovascular (BP elevation + CV contraindication), nausea management,
 * hyperpigmentation (repeated use). Hard stops: uncontrolled hypertension, pregnancy, adolescents.
 */

const SIDE_EFFECTS = [
  {
    name: "Uncontrolled hypertension / high cardiovascular risk",
    detail: "Transient BP elevation documented; major adverse cardiac events flagged in prescribing information",
    frequency: "Population-specific — not a general risk for healthy adults, but a hard stop for high-CV-risk individuals",
    timing: "BP elevation peaks ~30 min post-injection, resolves within 12 hours",
    tier: "flag",
    note: "The prescribing information specifically flags cardiovascular risk. Uncontrolled hypertension is a contraindication. People with known cardiovascular disease or multiple cardiac risk factors require physician evaluation before use — this is stated explicitly in the prescribing information, not inferred.",
  },
  {
    name: "Nausea — most common adverse event",
    detail: "Nausea occurring in ~40% of trial participants — the primary tolerability challenge",
    frequency: "Very common — ~40% in Phase III trials; the leading cause of early discontinuation",
    timing: "Onset within first hour post-injection; typically resolves within 12 hours",
    tier: "watch",
    note: "Nausea is not a rare adverse event — it's the most commonly reported one. Having a management plan before first use is the practical standard. Community practice (pre-treatment antiemetics) reduces the burden; the formal trials didn't include antiemetics as protocol. Nausea in the context of sexual activity is the primary real-world usability problem.",
  },
  {
    name: "Focal hyperpigmentation (repeated use)",
    detail: "Darkening of face, gums, and breast areas — direct MC1R melanocortin effect; not reversible on short notice",
    frequency: "Develops with repeated use — documented in Phase III safety data",
    timing: "Gradual onset with cumulative use; not immediately reversible after stopping",
    tier: "watch",
    note: "Hyperpigmentation is a cosmetic adverse event, but it's a real and potentially lasting one. People with darker skin tones may see more pronounced or faster changes. The prescribing information lists it as a documented adverse event. Management: limit cumulative use frequency; monitor skin changes during ongoing use.",
  },
  {
    name: "Flushing and headache",
    detail: "Facial flushing and headache — common but typically mild and time-limited",
    frequency: "Common in trial data",
    timing: "Occurs within first hours post-injection; resolves within the day",
    tier: "low",
    note: "Both are documented in the prescribing information as common adverse events. Less disruptive than nausea for most users. Flushing is also a direct melanocortin receptor effect.",
  },
  {
    name: "Injection site reactions",
    detail: "Local reactions at SC injection site — pain, redness, bruising",
    frequency: "Common",
    timing: "Immediate post-injection; typically resolves within hours",
    tier: "low",
    note: "Standard injectable peptide management: site rotation, sterile technique, proper SC insertion angle.",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; labelColor: string; label: string }> = {
  low:   { bg: "rgba(21,100,58,0.06)",  border: "rgba(21,100,58,0.15)",  labelColor: "#155e38", label: "Low concern" },
  watch: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.16)",   labelColor: "#7c5200", label: "Worth watching" },
  flag:  { bg: "rgba(158,56,0,0.07)",   border: "rgba(158,56,0,0.18)",   labelColor: "#9e3800", label: "Stop signal" },
};

const PLAYBOOK = [
  {
    icon: "🤢",
    title: "Nausea management — plan before first use",
    body: "Nausea is the number-one reason people stop bremelanotide. In ~40% of Phase III participants, it was significant. The practical mitigation: pre-treatment with an antiemetic approximately 30 minutes before the bremelanotide injection. Ondansetron (Zofran) is the most commonly used option — it's effective and not sedating. Ginger preparations are used as a milder alternative. Eating lightly (but not a large fatty meal) before use may also reduce severity. The nausea is typically transient — timing sexual activity for after the nausea window resolves (2–3 hours post-injection) is another practical adaptation.",
    flags: [
      "Plan your antiemetic approach before first use — don't discover the nausea unprepared",
      "Start with a lower exposure context (timing when nausea would be less problematic) to assess your personal response",
      "Nausea that is severe, prolonged beyond 12 hours, or includes vomiting that can't hold down fluids: stop use",
      "If ondansetron is required every time for tolerability: discuss with a physician whether the benefit/tolerability balance makes sense for continued use",
    ],
  },
  {
    icon: "❤️",
    title: "Cardiovascular screening — not skippable",
    body: "The BP elevation from bremelanotide is a direct pharmacological effect. For healthy adults with normal baseline blood pressure, the transient elevation is generally tolerable. For anyone with hypertension, cardiovascular disease, or multiple cardiac risk factors — this is a prescribing information contraindication, not a preference. Check your blood pressure before first use. Know your cardiovascular history. If you're on antihypertensives, the combination requires physician guidance.",
    flags: [
      "Check blood pressure baseline before first use — if elevated, consult physician before proceeding",
      "Known cardiovascular disease (CAD, prior MI, arrhythmias): do not use without explicit physician clearance",
      "Uncontrolled hypertension: contraindicated per prescribing information",
      "On antihypertensive medications: discuss with your physician — BP interaction with bremelanotide is a relevant drug interaction",
    ],
  },
  {
    icon: "🎨",
    title: "Hyperpigmentation monitoring — for repeated use",
    body: "Focal hyperpigmentation develops gradually with repeated use — it's not an acute event. The practical approach: monitor your face, gum line, and breasts periodically during ongoing use. If you notice changes, that's a signal to discuss frequency of use or to take a break. People with darker skin tones have higher baseline melanin and may see more pronounced or faster changes. This isn't a life-threatening concern — it's a real, cosmetically meaningful, and potentially lasting adverse event.",
    flags: [
      "Photograph baseline skin tone of face, gums, and breast areas before starting repeated use",
      "Check every 4–6 weeks of ongoing use — gradual darkening is the early signal",
      "Darker skin tones: monitor more frequently; changes may be more pronounced",
      "Noticeable darkening: discuss with dermatologist and reconsider use frequency",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Uncontrolled hypertension or known significant cardiovascular disease",
    action: "Do not use. This is a prescribing information contraindication. Physician evaluation required before any use in high-CV-risk individuals.",
  },
  {
    signal: "Chest pain, significant palpitations, or severe shortness of breath after injection",
    action: "Stop immediately and seek medical evaluation. Cardiovascular adverse events are flagged in prescribing information.",
  },
  {
    signal: "Severe nausea with vomiting that prevents fluid intake for more than a few hours",
    action: "Stop use. Prolonged nausea/vomiting is not the expected tolerability profile — seek medical evaluation if severe.",
  },
  {
    signal: "Pregnant or planning pregnancy",
    action: "Stop immediately. No safety data during pregnancy — bremelanotide should not be used.",
  },
  {
    signal: "Adolescent use",
    action: "Hard stop. Not studied in adolescents; melanocortin system is involved in developmental physiology.",
  },
];

export default function BremelanotideSafetyPanel() {
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
          Bremelanotide&apos;s safety profile is defined by three dimensions: nausea (common, manageable with planning), cardiovascular caution (real, requires screening, prescribing information contraindication for high-CV-risk individuals), and hyperpigmentation (gradual with repeated use, not reversible quickly). The FDA approval means the adverse event data is from rigorous trials — this is one of the better-characterized safety profiles of any peptide in community use.
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
          Bremelanotide is one of the safest compounds in community enhancement use from a regulatory standpoint — it&apos;s an FDA-approved drug with Phase III safety data. The adverse events are real but well-characterized: nausea (high frequency, manageable), BP elevation (transient, relevant for CV-risk populations), hyperpigmentation (cumulative, cosmetically meaningful).
        </p>
        <p>
          For a healthy adult without cardiovascular risk, the safety profile is manageable with planning. The nausea management step is not optional — going in unprepared for that 40% risk is the most common reason people have a bad first experience. Cardiovascular screening before first use is genuinely important, not bureaucratic box-checking.
        </p>
      </div>

    </div>
  );
}
