/**
 * SelankSafetyPanel — proactive safety intelligence for Selank.
 * Key frame: favorable safety profile in available data; primary concerns are
 * CNS drug interactions (benzos, opioids, alcohol), nasal mucosal irritation,
 * and adolescent/pregnancy hard stops. No severe adverse events documented in clinical use.
 */

const SIDE_EFFECTS = [
  {
    name: "CNS drug interactions — the primary real risk",
    detail: "Additive GABAergic and opioid peptide effects with benzodiazepines, opioids, alcohol",
    frequency: "Population-specific — relevant only if on CNS-active medications",
    timing: "Concurrent use — synergistic CNS depression is the concern",
    tier: "flag",
    note: "Selank's mechanism involves GABAergic modulation and enkephalinase inhibition (raising enkephalins). Combining with benzodiazepines adds direct GABA-A agonism to selank's modulatory effect — unpredictable CNS synergy. Combining with opioids adds mu-receptor agonism to the endogenous opioid peptide elevation from enkephalinase inhibition. Alcohol adds additional GABAergic CNS depression. This is the primary safety risk — not from selank alone, but from selank in the context of other CNS depressants.",
  },
  {
    name: "Adolescent / pregnant use",
    detail: "CNS neurodevelopmental concern — hard stop",
    frequency: "Population-specific",
    timing: "At any point during use",
    tier: "flag",
    note: "Selank acts on CNS signaling pathways (GABA, enkephalin, serotonin, BDNF) that are involved in neurodevelopment. Adolescent CNS development is an established hard stop for compounds with these mechanisms. Pregnancy safety data is absent.",
  },
  {
    name: "Nasal mucosal irritation",
    detail: "Mild nasal irritation, stinging, or runny nose with intranasal use",
    frequency: "Common with repeated intranasal use",
    timing: "Onset with each administration; usually mild and brief",
    tier: "low",
    note: "The most commonly reported minor adverse effect in community use. Intranasal peptides can irritate the nasal mucosa with repeated administration. Site rotation is not as applicable (it's a nasal spray) but reducing concentration or frequency is the management approach if irritation becomes significant.",
  },
  {
    name: "Mild drowsiness (some individuals)",
    detail: "Mild sedation at higher doses or in individuals more sensitive to GABAergic compounds",
    frequency: "Minority of users — the 'no sedation' characterization holds for most but not all",
    timing: "During active window",
    tier: "low",
    note: "The 'anxi-smart, no sedation' profile is accurate for most users at community-reported doses. A subset report mild drowsiness — consistent with GABAergic mechanism. Individuals with baseline sensitivity to GABAergic compounds (or who have previously experienced sedation with low-dose benzodiazepines) may have higher personal risk for this effect.",
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
    title: "CNS medication check — the primary screening step",
    body: "Before using selank, screen for CNS-active medications. Benzodiazepines, opioid medications, and alcohol are the three primary interaction risks — all via additive CNS depressant mechanisms. Psychiatric medications (SSRIs, SNRIs, antipsychotics) are less clearly characterized interaction risks but warrant awareness. Selank alone in a person without CNS-active medications has a favorable safety profile. Selank with CNS depressants creates unpredictable synergy.",
    flags: [
      "Currently on benzodiazepines: do not add selank without discussing with your prescribing physician",
      "On opioid medications: the enkephalinase inhibition mechanism adds to opioid system tone — physician guidance required",
      "Heavy alcohol use: additive CNS depression is the concern; avoid co-use",
      "On psychiatric medications (SSRIs, SNRIs, antipsychotics): note the neuropsychiatric interaction landscape is incompletely characterized — discuss with your prescribing physician",
    ],
  },
  {
    icon: "›",
    title: "Intranasal route management",
    body: "Intranasal selank is a peptide delivered to a mucous membrane — the pharmacokinetics are favorable (fast CNS access) but the mucosal surface requires some care. Saline rinse before administration can help with absorption and reduce irritation. If significant nasal irritation develops, the injectable route is an alternative — but requires standard injectable peptide sterile technique.",
    flags: [
      "Nasal irritation that persists or worsens: consider reducing frequency or switching to injectable route",
      "Active nasal congestion, sinusitis, or mucosal disease: absorption and tolerability may be affected",
      "Verify product purity — nasal administration of impure peptides carries mucosal and CNS risk",
    ],
  },
  {
    icon: "›",
    title: "Source quality — the practical safety variable",
    body: "Selank is not FDA-regulated for human use in the US. Product quality varies widely across research peptide suppliers. The safety profile from Russian clinical studies assumes pharmaceutical-grade selank. Gray-market selank may contain impurities, incorrect concentrations, or contamination. Source quality is the most actionable safety lever for compounds in this regulatory status.",
    flags: [
      "Only source from suppliers with third-party certificate of analysis (CoA) covering purity, sterility, and concentration",
      "Concentration verification matters for intranasal dosing — incorrect concentration affects both efficacy and safety",
      "If uncertain about source quality: do not proceed until you have a CoA",
    ],
  },
];

const RED_LINES = [
  {
    signal: "On benzodiazepines or opioid medications",
    action: "Do not add selank without physician guidance. Additive CNS depressant effects from GABAergic modulation and enkephalinase inhibition are a real mechanism-based risk.",
  },
  {
    signal: "Adolescent use",
    action: "Hard stop. CNS-active compounds with GABAergic, opioid peptide, serotonergic, and BDNF mechanisms are contraindicated in neurodevelopmental contexts.",
  },
  {
    signal: "Pregnant or planning pregnancy",
    action: "Stop immediately. No safety data during pregnancy; CNS mechanism makes this a hard stop.",
  },
  {
    signal: "Unexpected severe drowsiness or disorientation after use",
    action: "Stop use. This is beyond the expected profile — if on any other CNS medications, seek medical evaluation.",
  },
  {
    signal: "Product without a verifiable third-party CoA",
    action: "Do not administer. Gray-market peptide quality is the primary real-world safety variable for intranasal use.",
  },
];

export default function SelankSafetyPanel() {
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
          Selank&apos;s safety profile is favorable in available clinical data — no severe adverse events are documented in Russian clinical literature or community use at community doses. The primary risk is iatrogenic: selank combined with benzodiazepines, opioids, or alcohol creates CNS interaction risk that selank alone does not. The practical safety checklist is short: screen for CNS-active medications, verify source quality, and observe the hard stops.
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
          Selank is among the lower-risk peptides in community use for a healthy adult without CNS-active medications. The safety profile from Russian clinical studies and community experience is favorable — no severe adverse events at typical doses, no tolerance or dependence reported, minimal side effect burden beyond nasal irritation.
        </p>
        <p>
          The honest safety framing: the risk from selank is primarily the risk from its CNS interaction context, not from selank itself. Verify CNS medication status before use, verify product quality, and observe the hard stops. If all those check out, the remaining risk profile is significantly milder than most compounds discussed in enhancement communities.
        </p>
      </div>

    </div>
  );
}
