/**
 * BremelanotideEvidencePanel — honest, layered evidence for Bremelanotide.
 * Key frame: FDA approval based on Phase III RCTs for HSDD in premenopausal women.
 * Desire improvement: RCT-confirmed in that population. Men: off-label, less data.
 * Nausea: documented. Hyperpigmentation: documented. BP elevation: documented.
 * Off-label use in men and postmenopausal women: extrapolated from approved-indication data.
 */

const SIGNALS = [
  {
    label: "Sexual desire improvement (HSDD — premenopausal women)",
    value: "RCT-confirmed",
    note: "Phase III multicenter RCTs showed statistically significant improvement in sexual desire scores and satisfying sexual events vs placebo — the basis for FDA approval; effect size was clinically modest but meaningful for the responder subgroup",
    tier: "strong",
  },
  {
    label: "Nausea as adverse event",
    value: "Documented — ~40% in trials",
    note: "Nausea occurring in approximately 40% of participants is among the most consistently documented findings from Phase III trials — it's a real, high-frequency adverse event requiring active management planning",
    tier: "strong",
  },
  {
    label: "Transient blood pressure elevation",
    value: "Documented in trials",
    note: "BP elevation peaking approximately 30 minutes post-injection and resolving within 12 hours was documented in clinical trials — the prescribing information includes CV contraindications based on this finding",
    tier: "strong",
  },
  {
    label: "Focal hyperpigmentation (repeated use)",
    value: "Documented in trials",
    note: "Focal darkening of face, gums, and breasts with repeated use is documented in Phase III safety data — a direct melanocortin receptor effect on pigmentation; not immediately reversible",
    tier: "strong",
  },
  {
    label: "Sexual desire improvement in men (off-label)",
    value: "Limited data — extrapolated",
    note: "Some small studies and anecdotal/community evidence suggest melanocortin mechanism may also increase desire in men; the FDA-approved indication is exclusively premenopausal women with HSDD; off-label use in men is an extrapolation",
    tier: "moderate",
  },
  {
    label: "Long-term safety beyond 12 months",
    value: "Limited data",
    note: "Phase III trials were 12 weeks; longer-term safety data is limited — cumulative hyperpigmentation and sustained cardiovascular effects are not fully characterized beyond the trial period",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "RCT",    label: "Phase III data for HSDD in premenopausal women",    note: "FDA approval based on two Phase III trials; desire improvement and satisfying sexual events as co-primary endpoints" },
  { stat: "FDA",    label: "approved 2019 as Vyleesi — second HSDD drug",       note: "Second FDA-approved drug for HSDD (after flibanserin); different mechanism and route" },
  { stat: "~40%",   label: "nausea rate in Phase III trials",                   note: "The most common adverse event — documented in prescribing information; tolerability management is central to use" },
  { stat: "?",      label: "controlled data in men — off-label extrapolation",  note: "Community use in men is prevalent; RCT data in men is limited; mechanism is plausible but evidence gap is real" },
];

const MECHANISMS = [
  {
    receptor: "Melanocortin receptors (MC3R / MC4R) — CNS desire signaling",
    label: "Brain-based sexual desire modulation — not hormonal, not vascular",
    tier: "strong",
    body: "Bremelanotide is a cyclic peptide analog of α-MSH (alpha-melanocyte-stimulating hormone) that binds melanocortin receptors — specifically MC3R and MC4R in the brain. These receptors are expressed in hypothalamic circuits involved in sexual motivation, reward, and appetite behavior. Activating MC4R in the medial hypothalamus is the proposed pathway for the pro-sexual desire effect. The mechanism is independent of sex hormone levels and independent of genital blood flow — it doesn't work by raising testosterone or by vasodilating. This is why it was developed for desire disorders specifically (HSDD) rather than arousal or performance.",
    evidence: "Melanocortin receptor pharmacology: established. MC4R hypothalamic role in sexual behavior: supported by animal and clinical evidence. GH elevation: Phase III RCTs confirmed desire improvement vs placebo. Mechanism in men: plausible, less trialed.",
  },
  {
    receptor: "MC1R (melanocyte-stimulating receptor) — pigmentation effect",
    label: "Hyperpigmentation — direct melanocortin receptor effect on skin",
    tier: "strong",
    body: "MC1R is the primary melanocortin receptor involved in skin pigmentation — it's activated by α-MSH endogenously to stimulate melanin production. Bremelanotide activates MC1R alongside the CNS receptors, which explains the focal hyperpigmentation documented with repeated use. This isn't a drug interaction or an off-target effect in the usual sense — it's the expected consequence of activating the same receptor family that controls skin color. The pigmentation affects face, gums, and breasts preferentially. It develops gradually with repeated use and is not immediately reversible on discontinuation.",
    evidence: "MC1R pigmentation mechanism: established biology. Bremelanotide-induced hyperpigmentation: documented in Phase III trials and prescribing information. Reversibility timeline: not fully characterized.",
  },
  {
    receptor: "Autonomic nervous system — cardiovascular effect",
    label: "Transient BP elevation — mechanistic consequence of MC3R/MC4R activation",
    tier: "strong",
    body: "Melanocortin receptors in the brain regulate autonomic tone — MC4R activation affects blood pressure homeostasis in addition to sexual behavior. Bremelanotide's BP elevation (peaking ~30 min post-injection, resolving within 12 hours) is a direct mechanistic consequence of receptor activation, not a coincidental side effect. The prescribing information includes a contraindication for uncontrolled hypertension and flagging for major adverse cardiac events. For people with normal cardiovascular function, the transient elevation is generally tolerable. For people with hypertension or cardiac disease, the risk is real.",
    evidence: "BP elevation: documented in Phase III trials and prescribing information. Cardiovascular contraindication: stated formally in prescribing information. Mechanism: MC4R autonomic regulation — established pharmacology.",
  },
];

const GAPS = [
  "Long-term safety beyond 12 weeks trial periods: not fully characterized — cumulative hyperpigmentation and cardiovascular effects",
  "Efficacy in men: off-label extrapolation — small studies only; no Phase III RCT data in male HSDD",
  "Efficacy in postmenopausal women: different hormonal context from approved indication; not studied in this population with RCT rigor",
  "Combination with testosterone therapy or hormonal treatment for HSDD: not studied",
  "Optimal anti-nausea management protocols: used empirically but not formally trialed as part of the regimen",
  "Reversibility of hyperpigmentation after long-term use: not formally characterized",
];

const OBSERVED = [
  "Nausea management is the most consistently reported practical challenge — community has developed antiemetic pre-treatment practices (ondansetron, ginger) based on experience",
  "Men report positive effects on libido and desire — consistent with the melanocortin mechanism's plausibility in men; not surprising given the CNS receptor is not sex-specific",
  "Hyperpigmentation is reported by users with darker skin tones as appearing faster and more noticeably than in lighter-skinned users",
  "The 'PT-141' research name is more commonly used in community discussion than the brand name 'Vyleesi'",
  "Some users report mood and motivation effects beyond sexual desire — consistent with MC4R's broader hypothalamic role in motivation and reward",
  "The on-demand structure (vs daily flibanserin) is reported as preferable by many users who don't want daily medication",
];

export default function BremelanotideEvidencePanel() {
  return (
    <div className="reta-evidence">

      {/* ── Evidence at a glance ── */}
      <div>
        <div className="reta-evidence__section-label">Evidence at a glance</div>
        <div className="reta-evidence__signals">
          {SIGNALS.map((s) => {
            const st = TIER_STYLE[s.tier];
            return (
              <div
                key={s.label}
                className="reta-evidence__signal"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <div className="reta-evidence__signal-top">
                  <span className="reta-evidence__signal-dot" style={{ color: st.dot }}>●</span>
                  <span className="reta-evidence__signal-value" style={{ color: st.text }}>{s.value}</span>
                </div>
                <div className="reta-evidence__signal-label">{s.label}</div>
                <div className="reta-evidence__signal-note">{s.note}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Evidence landscape ── */}
      <div>
        <div className="reta-evidence__section-label">The evidence landscape — RCT-level data for a narrow indication</div>
        <div className="reta-evidence__trial-header">
          Bremelanotide has the clearest evidence base of any peptide in community enhancement use: FDA approval based on Phase III RCTs for a defined indication (HSDD in premenopausal women). The evidence is real and rigorous — for that specific population. For men and postmenopausal women, the mechanism is plausible but the RCT-level evidence doesn&apos;t transfer. The adverse events (nausea, BP elevation, hyperpigmentation) are as well-documented as the efficacy.
        </div>
        <div className="reta-evidence__trial-stats">
          {TRIAL_STATS.map((s) => (
            <div key={s.stat} className="reta-evidence__trial-stat">
              <div className="reta-evidence__trial-stat-value">{s.stat}</div>
              <div className="reta-evidence__trial-stat-label">{s.label}</div>
              <div className="reta-evidence__trial-stat-note">{s.note}</div>
            </div>
          ))}
        </div>
        <div className="reta-evidence__trial-callout">
          HSDD improvement in premenopausal women: RCT-confirmed. Nausea, BP elevation, hyperpigmentation: all documented in trials. Off-label use in men: mechanism is plausible, RCT support is limited. These facts coexist honestly.
        </div>
      </div>

      {/* ── Mechanism breakdown ── */}
      <div>
        <div className="reta-evidence__section-label">The mechanism pathways — what we know and what it means</div>
        <div className="reta-evidence__mechanisms">
          {MECHANISMS.map((m) => {
            const st = TIER_STYLE[m.tier];
            return (
              <div
                key={m.receptor}
                className="reta-evidence__mechanism"
                style={{ borderTop: `3px solid ${st.dot}` }}
              >
                <div className="reta-evidence__mechanism-receptor" style={{ color: st.dot }}>
                  {m.receptor}
                </div>
                <div className="reta-evidence__mechanism-label">{m.label}</div>
                <div className="reta-evidence__mechanism-body">{m.body}</div>
                <div className="reta-evidence__mechanism-evidence">{m.evidence}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Honest gaps ── */}
      <div>
        <div className="reta-evidence__section-label">What the evidence doesn&apos;t cover</div>
        <ul className="reta-evidence__gaps">
          {GAPS.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </div>

      {/* ── Real-world observations ── */}
      <div className="reta-evidence__observed-block">
        <div className="reta-evidence__observed-heading">
          What people actually report
          <span className="reta-evidence__observed-badge">Observed — not clinical evidence</span>
        </div>
        <div className="reta-evidence__observed-sub">
          These are patterns from community reports and anecdotal accounts. They don&apos;t have the rigor of trials — but they reflect real use experience, which the published trials don&apos;t capture.
        </div>
        <ul className="reta-evidence__observed-list">
          {OBSERVED.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
        <a className="reta-evidence__community-link" href="#community">
          Read community experiences →
        </a>
      </div>

    </div>
  );
}
