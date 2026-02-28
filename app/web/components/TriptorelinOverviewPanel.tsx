/**
 * TriptorelinOverviewPanel — decision-oriented overview for Triptorelin.
 * Key frame: continuous GnRH agonism produces receptor desensitization and
 * sex hormone suppression — the pharmacological OPPOSITE of gonadorelin.
 * This is a chemical castration agent with months-long depot formulations.
 */

const STAT_CARDS = [
  {
    value: "Continuous GnRH agonism → axis suppression",
    label: "mechanism — paradoxical suppression of the reproductive axis via receptor desensitization",
    sub: "Triptorelin is a synthetic GnRH agonist with a D-Trp6 substitution that extends its half-life relative to native GnRH. The critical pharmacological insight is that continuous GnRH receptor stimulation produces the opposite effect from pulsatile stimulation. Native GnRH is released in pulses every 60-90 minutes — this pulsatile pattern is required for maintained LH/FSH secretion. Continuous agonist stimulation causes GnRH receptor downregulation and desensitization, collapsing LH/FSH secretion and consequently collapsing testosterone (men) or estrogen (women) to castrate levels within 2-4 weeks.",
    note: "The paradox — that a GnRH agonist suppresses the axis rather than stimulating it — is frequently misunderstood in community contexts. This is not a subtle distinction. Triptorelin and gonadorelin (pulsatile GnRH) work at the same receptor in diametrically opposite ways because of administration timing. Anyone confusing triptorelin with a testosterone-stimulating compound has the pharmacology inverted.",
  },
  {
    value: "Depot formulations (1–6 months)",
    label: "formulation specifics — long-acting depot injections; effects persist weeks after the last dose",
    sub: "Triptorelin is available as depot microsphere formulations releasing drug over 1 month, 3 months, or 6 months after a single injection. This is clinically designed for patient convenience in prostate cancer and precocious puberty — but it creates a serious implication for community use: a single dose commits the individual to weeks to months of testosterone/estrogen suppression. Unlike oral medications or short-acting peptides, there is no 'stop taking it and wait a day' option. The hormonal suppression persists until the depot is exhausted.",
    note: "The depot duration is one of the most important practical safety considerations for any community use of triptorelin. Anyone considering off-label triptorelin use must understand that they are committing to 4-24 weeks of chemical castration with a single injection. Reversibility exists — axis recovery occurs after depot exhaustion — but the timeline is measured in months, not days.",
  },
  {
    value: "FDA-approved (Trelstar)",
    label: "regulatory status — approved for prostate cancer (all stages), precocious puberty; EU/UK approved for endometriosis, uterine fibroids",
    sub: "Triptorelin (brand: Trelstar in the US) is FDA-approved for: palliative treatment of advanced prostate cancer; and central precocious puberty. In Europe and other markets, it is also approved for endometriosis and uterine fibroids. Gender-affirming hormone therapy protocols use GnRH agonists including triptorelin under physician oversight as puberty blockers and for feminizing/masculinizing hormone management. All of these are serious medical indications managed by specialists (oncologists, pediatric endocrinologists, gynecologists, or gender medicine specialists).",
    note: "The FDA approval for prostate cancer reflects the pharmacological reality — this is a chemical castration agent for oncological purposes. Community access outside of these clinical indications is off-label and requires understanding that the intended therapeutic effect is hormone suppression, with all associated consequences.",
  },
  {
    value: "Testosterone flare (initiation risk)",
    label: "initiation pharmacology — initial agonist surge before desensitization; clinically managed with anti-androgens in prostate cancer",
    sub: "The first 1-2 weeks of triptorelin therapy produce a paradoxical testosterone surge before receptor downregulation takes effect. This is the 'flare' phenomenon: the agonist initially stimulates LH/FSH release before receptor desensitization collapses the axis. In prostate cancer patients, this testosterone flare can cause bone pain flare, urinary symptoms, and spinal cord compression risk. Standard prostate cancer protocols use anti-androgen cover (bicalutamide, cyproterone) for the first 2-4 weeks of GnRH agonist therapy to block the testosterone flare effect.",
    note: "The testosterone flare is managed in oncological clinical settings specifically because the risk is recognized and significant. Community use without anti-androgen flare coverage replicates a known clinical risk without the management protocol that makes it acceptable in clinical practice.",
  },
];

const FIT_YES = [
  "Prescribed for prostate cancer (any stage) — triptorelin is FDA-approved for this indication; the axis suppression that constitutes 'chemical castration' is the intended therapeutic mechanism",
  "Prescribed for central precocious puberty — GnRH agonist suppression of premature puberty is a well-established pediatric endocrine indication under specialist management",
  "Gender-affirming hormone therapy protocol under physician oversight — GnRH agonists are used as puberty blockers and for hormone management in gender-affirming care when prescribed and monitored by a physician",
  "Endometriosis or uterine fibroids under gynecological management — estrogen suppression reduces endometrial lesions; approved in multiple markets with bone density monitoring",
];

const FIT_NO = [
  "Anyone expecting triptorelin to work like gonadorelin (pulsatile GnRH stimulation that supports testosterone production) — they work at the same receptor in pharmacologically opposite ways; continuous stimulation suppresses where pulsatile stimulation maintains",
  "Anyone using triptorelin as post-cycle therapy (PCT) off-label — PCT requires axis stimulation (SERMs like clomiphene, or gonadorelin) to restart testosterone production; triptorelin would suppress the axis further, producing the exact opposite of PCT goals",
  "Anyone who has not carefully considered the depot duration — a single injection commits to weeks or months of hormonal suppression with no quick reversal; this is not a short-acting compound",
  "Unmonitored testosterone suppression for any purpose — the downstream effects of testosterone suppression (bone density, cardiovascular risk, mood, muscle mass) require physician monitoring, especially with depot formulations lasting months",
];

const TIMELINE = [
  {
    phase: "Week 1–2 (initiation flare)",
    heading: "Paradoxical testosterone surge before axis suppression",
    body: "The first 1-2 weeks of triptorelin produce increased LH/FSH and testosterone/estrogen before receptor desensitization takes hold. In prostate cancer, this 'flare' is managed with anti-androgen co-administration. In other contexts, the flare produces a temporary hormonal surge with associated effects before suppression begins. Community users should be aware that symptoms or effects in the first 1-2 weeks may not represent the drug's long-term effect.",
  },
  {
    phase: "Week 2–4 (transition to suppression)",
    heading: "Receptor downregulation and axis suppression — testosterone/estrogen approach castrate levels",
    body: "As GnRH receptors downregulate and desensitize, LH/FSH secretion collapses and sex hormone production follows. Testosterone in men reaches castrate levels (typically below 50 ng/dL) within 2-4 weeks. Estrogen in women approaches castrate levels similarly. This is the intended therapeutic effect for the approved indications — and the pharmacological reality that makes off-label use for any purpose other than intended axis suppression conceptually misguided.",
  },
  {
    phase: "Months (depot duration)",
    heading: "Sustained chemical castration — bone density loss begins within months",
    body: "During sustained axis suppression, sex hormone deficiency drives multiple systemic effects: bone density loss begins within months (clinically significant with > 3-6 months of suppression); muscle mass atrophy; cardiovascular risk changes (androgen deprivation increases cardiovascular event rates in men with prostate cancer); mood and cognitive effects; hot flashes; sexual dysfunction. In clinical prostate cancer settings, these effects are accepted trade-offs for oncological benefit. In community settings without medical oversight, these effects are unmonitored sequelae.",
  },
  {
    phase: "After depot exhaustion (recovery)",
    heading: "Axis recovery — timeline measured in months, not weeks",
    body: "After the depot is exhausted, the GnRH receptor gradually resensitizes and the hypothalamic-pituitary-gonadal axis recovers. Full testosterone recovery can take 3-12 months after a single 1-month depot, longer after 3- or 6-month formulations. Recovery is not guaranteed in all cases, particularly with repeated dosing or underlying HPG axis dysfunction. This prolonged recovery timeline is distinct from short-acting compounds where recovery occurs over days.",
  },
];

const COMPARISON = [
  {
    name: "Triptorelin",
    badge: "GnRH agonist / Chemical castration / Depot",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Continuous GnRH agonism → receptor desensitization → LH/FSH collapse → testosterone/estrogen suppression" },
      { label: "Effect on axis", value: "SUPPRESSION — chemical castration; the intended effect for prostate cancer and precocious puberty" },
      { label: "Duration", value: "1-month, 3-month, or 6-month depot formulations — cannot be stopped once injected" },
      { label: "FDA status", value: "Approved (Trelstar) — prostate cancer, precocious puberty; EU approved for endo/fibroids" },
      { label: "Community PCT use", value: "Pharmacologically irrational — PCT requires axis stimulation; triptorelin suppresses the axis" },
    ],
    highlight: true,
  },
  {
    name: "Gonadorelin (GnRH)",
    badge: "Pulsatile GnRH / Axis stimulation / Short-acting",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Mechanism", value: "Pulsatile GnRH receptor stimulation → maintained LH/FSH secretion → testosterone production" },
      { label: "Effect on axis", value: "STIMULATION — maintains axis function; used in hypogonadism and for axis preservation on TRT" },
      { label: "Duration", value: "Short-acting (minutes); requires pulsatile dosing to maintain axis stimulation" },
      { label: "FDA status", value: "Approved for specific diagnostic/therapeutic indications; community use for testosterone preservation" },
      { label: "Community PCT use", value: "Pharmacologically rational — axis stimulation supports testosterone recovery post-suppression" },
    ],
    highlight: false,
  },
  {
    name: "Leuprolide (Lupron)",
    badge: "GnRH agonist / Same class as triptorelin / Depot",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Continuous GnRH agonism → same suppression mechanism as triptorelin" },
      { label: "Effect on axis", value: "SUPPRESSION — identical pharmacological class and effect to triptorelin" },
      { label: "Duration", value: "1-month, 3-month, 6-month depot formulations; also available as daily injection" },
      { label: "FDA status", value: "Approved — prostate cancer, endometriosis, precocious puberty, uterine fibroids (broader than triptorelin)" },
      { label: "Community use", value: "Same pharmacological profile as triptorelin — not appropriate as axis stimulant or PCT agent" },
    ],
    highlight: false,
  },
];

export default function TriptorelinOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          A GnRH agonist used for chemical castration — continuous receptor stimulation suppresses the axis; this is the pharmacological opposite of gonadorelin.
        </div>
        <div className="reta-overview__headline-sub">
          Triptorelin (Trelstar) is a synthetic GnRH agonist with FDA approval for prostate cancer and precocious puberty. Its defining pharmacological feature is that continuous GnRH receptor stimulation suppresses the hypothalamic-pituitary-gonadal axis rather than stimulating it — receptor desensitization collapses LH/FSH and drives testosterone/estrogen to castrate levels within 2-4 weeks. Depot formulations lasting 1 to 6 months mean a single injection commits to weeks or months of hormonal suppression. Community interest sometimes involves confusion between triptorelin and gonadorelin — they work at the same receptor but produce opposite effects on the axis. PCT or testosterone-stimulating use of triptorelin is pharmacologically inverted and will worsen post-suppression axis recovery, not improve it.
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
      <div className="reta-overview__section-label">Triptorelin vs Gonadorelin vs Leuprolide</div>
      <div className="reta-overview__compare-note">
        The agonist vs. pulsatile stimulator distinction is the most important pharmacological clarification in community GnRH peptide discussions. Triptorelin and leuprolide are both GnRH agonists that suppress the axis via continuous stimulation. Gonadorelin mimics pulsatile GnRH release and maintains or stimulates the axis. These are opposite effects at the same receptor — the distinction determines whether the compound supports or suppresses testosterone production.
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
