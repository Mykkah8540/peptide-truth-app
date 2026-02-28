/**
 * SelankOverviewPanel — decision-oriented overview for Selank.
 * Key frame: Russian-developed anxiolytic peptide. GABAergic + enkephalinase inhibition.
 * "Anxi-smart" profile — reduces anxiety without sedation; often reported as clarity-promoting.
 * Evidence: Russian clinical literature + mechanistic work. Not FDA-approved.
 * Nasal spray is primary route. Low side effect profile in community experience.
 */

const STAT_CARDS = [
  {
    value: "Anxiolytic",
    label: "without sedation — the defining clinical profile",
    sub: "selank's proposed primary effect is anxiety reduction without the sedation or cognitive impairment of benzodiazepines — it modulates GABAergic and opioid peptide pathways without strongly depressing CNS output",
    note: "The 'anxi-smart' framing in community use captures something real about the mechanism — GABAergic modulation at this receptor subset without benzodiazepine-level sedation is pharmacologically plausible. Whether the magnitude of clinical effect matches what community reports describe is the honest evidence question.",
  },
  {
    value: "Russian origin",
    label: "clinical evidence — heterogeneous quality",
    sub: "selank was developed at Russia's Institute of Molecular Genetics in the 1990s; clinical evidence includes Russian-published studies and limited Western independent replication; quality and methodology vary across the literature",
    note: "This is the most important context for understanding the evidence. Russian clinical literature is real science — but it hasn't consistently been replicated in large, independent, Western RCTs. The mechanism is plausible and pharmacologically grounded; the clinical effect size in human studies is less precisely characterized than FDA-approved comparators.",
  },
  {
    value: "Intranasal",
    label: "primary route — fast onset, low systemic exposure",
    sub: "nasal spray is the standard route for selank — direct CNS access via nasal mucosa; onset within minutes; lower systemic exposure than injection for a comparable CNS effect",
    note: "The intranasal route is meaningful pharmacologically — it allows direct mucosal absorption near CNS tissue and produces faster onset than oral (which faces peptide degradation). Injectable selank is also used but is less common in community protocols.",
  },
];

const FIT_YES = [
  "You're seeking anxiety reduction without the sedation or cognitive blunting of benzodiazepines — selank's proposed profile is anxiolytic without strong sedation",
  "You want a short-acting, on-demand anxiolytic — intranasal onset is fast; it's not a daily-pill structure",
  "Your anxiety context is situational or performance-related (rather than severe clinical anxiety disorder requiring daily medication)",
  "You're not on benzodiazepines, opioids, or other GABAergic/opioid-active medications — the interaction risk is the primary pharmacological concern",
  "You're not pregnant, breastfeeding, or an adolescent — hard stops",
  "You understand the evidence is from Russian clinical literature without FDA-level independent replication",
];

const FIT_NO = [
  "You have severe clinical anxiety disorder requiring daily scheduled medication — selank's on-demand, non-FDA evidence profile is not a replacement for physician-managed anxiety pharmacotherapy",
  "You're on benzodiazepines or opioid medications — additive GABAergic and opioid pathway modulation creates unpredictable CNS synergy",
  "You want a compound with FDA RCT-level evidence for anxiety — flibanserin, buspirone, and SSRIs have better-characterized evidence for anxiety disorders",
  "You have a CNS condition or are on psychiatric medications — the neuropsychiatric interaction profile is insufficiently characterized",
  "You're pregnant, breastfeeding, or an adolescent — hard stop; neurodevelopmental effects not studied",
];

const TIMELINE = [
  {
    phase: "Minutes after intranasal administration",
    heading: "Fast onset — the anxiolytic window begins quickly",
    body: "Intranasal peptides reach CNS tissue rapidly via nasal mucosal absorption. Selank's onset is reported as fast — within minutes in community experience, consistent with the pharmacokinetic route. The anxiolytic effect window is relatively short (hours), making it more of an on-demand tool than a sustained-baseline compound. The lack of sedation is the key reported quality — effects are described as calm focus rather than drowsiness.",
  },
  {
    phase: "Hours of active window",
    heading: "Calm, not sedated — the reported effect quality",
    body: "Community reports consistently describe selank's effect as anxiolytic without cognitive blunting — reduced anxiety with maintained mental clarity, in contrast to benzodiazepines which impair cognition. Whether this characterization holds up at higher doses or in individuals more sensitive to GABAergic effects is less clear. Russian clinical data suggests therapeutic effects in anxiety contexts with a favorable tolerability profile vs benzodiazepines.",
  },
  {
    phase: "Long-term",
    heading: "No tolerance buildup — proposed advantage over benzodiazepines",
    body: "One claimed advantage of selank vs benzodiazepines is the absence of tolerance development and physical dependence. Benzodiazepine tolerance (requiring dose escalation to maintain effect) and physical dependence (withdrawal syndrome) are major clinical concerns. Selank's mechanism (GABA modulation via a different pathway; enkephalinase inhibition rather than direct GABA-A agonism) is proposed to avoid these. This is plausible mechanistically and supported by Russian data, but long-term use in Western populations isn't well-characterized.",
  },
];

const COMPARISON = [
  {
    name: "Selank",
    badge: "Investigational (Russian)",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GABAergic modulation + enkephalinase inhibition (raises endogenous enkephalins)" },
      { label: "Route", value: "Intranasal (primary) or injectable — not oral" },
      { label: "Effect profile", value: "Anxiolytic without sedation — 'anxi-smart'; cognitive clarity maintained" },
      { label: "Evidence", value: "Russian clinical literature — plausible mechanism; limited Western RCT replication" },
      { label: "Tolerance / dependence", value: "Not reported in available literature — proposed advantage over benzos" },
    ],
    highlight: true,
  },
  {
    name: "Benzodiazepines (diazepam, lorazepam, clonazepam)",
    badge: "FDA-approved (controlled)",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Mechanism", value: "GABA-A receptor positive allosteric modulator — strong sedation + anxiolysis" },
      { label: "Route", value: "Oral primarily; injectable for acute use" },
      { label: "Effect profile", value: "Strong anxiolytic + sedation; cognitive impairment is a documented effect" },
      { label: "Evidence", value: "FDA-approved RCT data for anxiety disorders; extensive safety record" },
      { label: "Tolerance / dependence", value: "High risk — tolerance and physical dependence are major clinical concerns" },
    ],
    highlight: false,
  },
  {
    name: "Semax",
    badge: "Investigational (Russian)",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Mechanism", value: "ACTH fragment — BDNF upregulation, dopaminergic/serotonergic activation" },
      { label: "Route", value: "Intranasal primarily" },
      { label: "Effect profile", value: "Cognitive enhancement, neuroprotection — more stimulatory than anxiolytic" },
      { label: "Evidence", value: "Russian clinical data for stroke recovery and cognition; same heterogeneous quality" },
      { label: "vs Selank", value: "Selank is calming/anxiolytic; Semax is stimulatory/cognitive — often used together for balance" },
    ],
    highlight: false,
  },
];

export default function SelankOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          Russian anxiolytic peptide — calm without sedation, GABAergic mechanism, intranasal route. Evidence is real but from a single research tradition.
        </div>
        <div className="reta-overview__headline-sub">
          Selank is a synthetic heptapeptide derived from tuftsin, developed at Russia&apos;s Institute of Molecular Genetics as a non-sedating anxiolytic. Its proposed mechanism — GABAergic modulation plus enkephalinase inhibition (raising endogenous enkephalins) — is pharmacologically grounded and distinct from benzodiazepines. Community reports consistently describe anxiolytic effects without cognitive blunting. The honest constraint is the evidence base: Russian clinical literature with limited independent Western replication. The mechanism is plausible and the safety profile appears favorable; the precise clinical effect size in Western populations is less established.
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="reta-overview__stats">
        {STAT_CARDS.map((s) => (
          <div key={s.value} className="reta-overview__stat">
            <div className="reta-overview__stat-value">{s.value}</div>
            <div className="reta-overview__stat-label">{s.label}</div>
            <div className="reta-overview__stat-sub">{s.sub}</div>
            <div className="reta-overview__stat-note">{s.note}</div>
          </div>
        ))}
      </div>

      {/* ── Fit matrix ── */}
      <div className="reta-overview__section-label">Is this the right call for you?</div>
      <div className="reta-overview__fit">
        <div className="reta-overview__fit-col reta-overview__fit-col--yes">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">✓</span> Fits your situation if…
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_YES.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="reta-overview__fit-col reta-overview__fit-col--no">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">✗</span> Look elsewhere if…
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_NO.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="reta-overview__section-label">What to actually expect</div>
      <div className="reta-overview__timeline">
        {TIMELINE.map((t, i) => (
          <div key={i} className="reta-overview__timeline-item">
            <div className="reta-overview__timeline-phase">{t.phase}</div>
            <div className="reta-overview__timeline-heading">{t.heading}</div>
            <div className="reta-overview__timeline-body">{t.body}</div>
          </div>
        ))}
      </div>

      {/* ── Comparison ── */}
      <div className="reta-overview__section-label">Selank vs Benzodiazepines vs Semax</div>
      <div className="reta-overview__compare-note">
        Selank is often compared to benzodiazepines (the standard anxiolytic class) and to Semax (its common Russian companion peptide). The key contrasts: selank avoids benzo sedation and dependence at the proposed cost of less evidence certainty. Semax has a more stimulatory profile and is sometimes combined with selank for an anxiolytic + cognitive enhancement stack.
      </div>
      <div className="reta-overview__compare">
        {COMPARISON.map((col) => (
          <div
            key={col.name}
            className={`reta-overview__compare-col${col.highlight ? " reta-overview__compare-col--active" : ""}`}
          >
            <div className="reta-overview__compare-name">
              {col.name}
              <span
                className="reta-overview__compare-badge"
                style={{ color: col.badgeColor, background: col.badgeBg }}
              >
                {col.badge}
              </span>
            </div>
            {col.rows.map((row) => (
              <div key={row.label} className="reta-overview__compare-row">
                <div className="reta-overview__compare-row-label">{row.label}</div>
                <div className="reta-overview__compare-row-value">{row.value}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}
