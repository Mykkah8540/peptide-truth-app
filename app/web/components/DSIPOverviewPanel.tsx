/**
 * DSIPOverviewPanel — decision-oriented overview for DSIP (Delta Sleep-Inducing Peptide).
 * Key frame: isolated from rabbit sleep states in 1977; the original "sleep induction"
 * claim is weaker than commonly presented; stress modulation and anxiety effects may
 * be more reproducible than sleep per se. The evidence base is old, limited, and mixed.
 */

const STAT_CARDS = [
  {
    value: "Unknown / multiple",
    label: "receptor — no dedicated DSIP receptor identified; multiple proposed binding sites",
    sub: "DSIP (Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu) is a 9-amino-acid peptide first isolated from rabbit cerebral venous blood during electrically-induced slow-wave sleep in 1977 (Monnier et al.). Unlike most characterized neuropeptides, no specific high-affinity DSIP receptor has been definitively identified. Proposed binding partners include opioid receptors, GABA-B receptors, and unspecified membrane binding sites. The mechanism of action remains unclear after 45+ years of research.",
    note: "The absence of a characterized receptor is a meaningful scientific red flag. Most neuropeptides with real biological effects have identifiable receptors with defined binding kinetics. DSIP's receptor story is unresolved, which makes mechanism-based reasoning about its effects difficult and raises questions about whether the original isolate was a true active principle or an artifact of the isolation method.",
  },
  {
    value: "Sleep + stress modulation",
    label: "claimed effects — slow-wave sleep promotion; stress axis normalization; anxiety reduction",
    sub: "DSIP was named for its purported ability to induce delta (slow-wave) sleep in rabbits. Human studies from the 1980s-1990s showed mixed results for sleep induction — some positive effects on sleep architecture in insomnia and narcolepsy, some null results. The stress modulation effects (reducing ACTH/cortisol responses, normalizing HPA axis reactivity) may be more reproducible than sleep induction per se. Anxiolytic effects are reported in some animal models. Community use targets sleep quality, stress, and recovery.",
    note: "The naming bias is real — DSIP was named 'Delta Sleep-Inducing Peptide' based on a specific experimental context in 1977. Subsequent research has repeatedly failed to reliably reproduce the original dramatic sleep-induction effect. The name creates expectation that outpaces the evidence. Whether DSIP has genuine anxiolytic/stress-modulating effects independent of sleep induction is a different question with somewhat better (but still limited) support.",
  },
  {
    value: "Opioid withdrawal",
    label: "niche clinical evidence — some controlled studies in opioid withdrawal; not approved",
    sub: "The most clinically interesting DSIP data is in opioid withdrawal — several small controlled European studies (primarily German) in the 1980s-1990s found that IV or subcutaneous DSIP reduced withdrawal symptoms in heroin-dependent patients. The sample sizes were small (10-40 patients) and the methodology varied, but the results were more consistent than the sleep induction data. This niche application has not been developed into an approved therapy.",
    note: "The opioid withdrawal data is old (1980s-90s), small, and not replicated with modern methodology. It represents the most controlled human evidence for any DSIP effect. Whether this translates to community use for sleep or stress in non-opioid-dependent individuals is a significant extrapolation.",
  },
  {
    value: "Investigational",
    label: "regulatory status — no FDA approval; no active clinical development pipeline",
    sub: "DSIP has no FDA approval for any indication. Unlike many compounds in this category, there is no active drug development pipeline pursuing DSIP. The research interest peaked in the 1980s-1990s (primarily in European sleep medicine) and has largely faded. Current community access is through gray-market peptide suppliers. The peptide can be synthesized by standard solid-phase methods (9 amino acids) — product quality is easier to achieve than for large complex proteins.",
    note: "The research trajectory for DSIP is different from most compounds here — it is not an early-stage exciting new molecule; it is a 1977 isolate whose research momentum has largely stalled. The absence of active development reflects scientific skepticism about the mechanism, not regulatory obstacles. Community interest has revived it in a different context (sleep optimization) than its original research focused on.",
  },
];

const FIT_YES = [
  "You have non-restorative sleep, particularly shallow sleep or poor slow-wave sleep, and have exhausted more established interventions (sleep hygiene, CBT-I, melatonin) — DSIP is investigational with small positive sleep studies",
  "You are interested in HPA axis normalization and stress modulation specifically — the ACTH/cortisol-modulating effects have some supporting data across multiple studies",
  "You are in the longevity/biohacking community exploring investigational sleep peptides with full awareness that evidence is old, mixed, and based on small studies",
  "You understand DSIP is a fringe investigational compound with stalled research momentum — not a compound with an active evidence-building pipeline",
];

const FIT_NO = [
  "You are expecting reliable, potent sleep induction — the original sleep-induction claim that names this compound has not held up as reliably as the name implies; community anecdotes vary widely",
  "You have a diagnosed sleep disorder requiring treatment — insomnia, sleep apnea, circadian rhythm disorders should be treated with established approaches (CBT-I, CPAP, chronotherapy); DSIP is not a substitute",
  "You have opioid dependence — the withdrawal data is the most consistent evidence; this should be handled in a clinical setting with physician oversight, not with gray-market DSIP",
  "You are looking for a sleep peptide with any modern human RCT data — that does not exist for DSIP; if evidence quality matters to you, melatonin, magnesium glycinate, or CBT-I have vastly more support",
];

const TIMELINE = [
  {
    phase: "Acute (minutes to hours)",
    heading: "Onset of sleep-related effects — if active at all",
    body: "In the positive human studies, DSIP was administered intravenously or subcutaneously and effects on sleep architecture were measured the same night or over several days. Whether subcutaneous injection produces the tissue distribution required for CNS effects (crossing the blood-brain barrier) is uncertain for this 9-amino-acid peptide. The half-life of circulating DSIP is short. Community reports describe a range of acute effects from subtle to absent.",
  },
  {
    phase: "Days to weeks",
    heading: "HPA axis normalization — slower, cumulative stress effects",
    body: "The HPA axis-modulating effects (ACTH/cortisol normalization) may have a longer time course than acute sleep effects. In the opioid withdrawal studies, DSIP was administered over several days with progressive symptom reduction. For stress modulation purposes, a multi-week trial may be needed to assess whether effects are occurring. This is speculative given the lack of modern dose-finding studies.",
  },
  {
    phase: "Long-term",
    heading: "Unknown — no long-term human data",
    body: "Long-term safety and efficacy of DSIP in any indication is not established. The original research rarely extended beyond weeks. Whether any effects are sustained, diminish with tolerance, or create receptor adaptations over months is entirely uncharacterized. The community protocols vary widely in duration without a rational evidence base.",
  },
];

const COMPARISON = [
  {
    name: "DSIP",
    badge: "Neuropeptide / Stalled investigational",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Unknown receptor — sleep/HPA axis modulation; no identified dedicated receptor after 45 years" },
      { label: "Evidence", value: "Small human studies (1980s-90s), sleep and opioid withdrawal; largely stalled since; no modern RCTs" },
      { label: "Sleep specificity", value: "Mixed — original SWS induction claim not consistently reproduced; stress/HPA effects may be more reliable" },
      { label: "BBB penetration", value: "Uncertain — no documented CNS pharmacokinetics for subcutaneous injection route" },
      { label: "Status", value: "No FDA approval; no active development; gray-market peptide; 9 AA (standard synthesis quality)" },
    ],
    highlight: true,
  },
  {
    name: "Selank",
    badge: "Anxiolytic peptide / Russian research compound",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Tuftsin analog; GABA-A modulation; anxiolytic/nootropic; approved in Russia for anxiety" },
      { label: "Evidence", value: "More controlled human studies than DSIP; Russian medical approval for generalized anxiety; anxiolytic data stronger" },
      { label: "Sleep specificity", value: "Not primarily a sleep compound — anxiolytic + cognitive; secondary sleep benefit from reduced anxiety" },
      { label: "BBB penetration", value: "Better characterized — intranasal route achieves CNS delivery; subcutaneous also studied" },
      { label: "Status", value: "Russian pharmaceutical approval (Selank); not FDA-approved; available as research peptide" },
    ],
    highlight: false,
  },
  {
    name: "Melatonin / CBT-I",
    badge: "Evidence-based sleep interventions",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Melatonin: MT1/MT2 receptor circadian entrainment. CBT-I: behavioral reconditioning of sleep habits" },
      { label: "Evidence", value: "Multiple meta-analyses; CBT-I is first-line for insomnia per sleep medicine guidelines; melatonin has strong circadian evidence" },
      { label: "Sleep specificity", value: "Directly targets sleep — CBT-I for sleep architecture; melatonin for sleep onset/circadian timing" },
      { label: "Safety", value: "Well-characterized; melatonin is OTC; CBT-I has no adverse effects" },
      { label: "Status", value: "Established interventions; should be tried before investigational peptides" },
    ],
    highlight: false,
  },
];

export default function DSIPOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          A 1977 neuropeptide with a name that overpromises, mixed sleep evidence, and a more credible stress-modulation story — but no receptor, stalled research, and no modern RCTs.
        </div>
        <div className="reta-overview__headline-sub">
          DSIP was isolated from rabbit cerebral blood during electrically-induced slow-wave sleep nearly 50 years ago. The &quot;delta sleep-inducing&quot; name created expectations that subsequent research has not reliably validated — the sleep induction effect in humans is inconsistent. The more durable story is HPA axis modulation: DSIP appears to normalize ACTH and cortisol responses in stressed states, with the most consistent human evidence from opioid withdrawal studies. No dedicated receptor has been identified after 45 years, no drug development is active, and the evidence base is old and limited. Community use has revived interest in sleep quality and stress recovery contexts.
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
      <div className="reta-overview__section-label">DSIP vs Selank vs Melatonin/CBT-I</div>
      <div className="reta-overview__compare-note">
        Three approaches to sleep and anxiety management. DSIP has old, mixed human evidence and no receptor. Selank has more controlled anxiolytic data and Russian medical approval. Melatonin and CBT-I have the strongest evidence base and should be the starting point before any investigational peptide. DSIP is the least well-supported of the three.
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
