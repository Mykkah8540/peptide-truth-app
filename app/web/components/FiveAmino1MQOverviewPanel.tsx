/**
 * FiveAmino1MQOverviewPanel — decision-oriented overview for 5-Amino-1MQ.
 * Key frame: NNMT inhibitor that raises cellular NAD+ and SAM by blocking
 * the enzyme that degrades nicotinamide. Compelling preclinical fat loss data.
 * Essentially zero human clinical trials. Community use outpaces science by a
 * wide margin. Not a peptide — a small molecule, but community-categorized here.
 */

const STAT_CARDS = [
  {
    value: "NNMT inhibitor",
    label: "nicotinamide N-methyltransferase inhibitor — blocks NAD+ consumption, shifts adipocyte metabolism",
    sub: "5-Amino-1-methylquinolinium (5-Amino-1MQ) is a cell-permeable small molecule that inhibits NNMT — the enzyme that methylates nicotinamide to 1-methylnicotinamide. NNMT is highly expressed in adipose tissue and liver. By blocking NNMT, 5-Amino-1MQ reduces NAD+ consumption (making more NAD+ available for cellular metabolism), reduces SAM depletion (S-adenosylmethionine, the methyl donor), and shifts the metabolic phenotype of adipocytes.",
    note: "NNMT's role in obesity is pharmacologically interesting: NNMT activity is elevated in obese adipose tissue; it consumes NAD+ and SAM; high NNMT creates a 'metabolically inefficient' fat storage phenotype. Inhibiting NNMT in mouse adipose tissue reverses some of this — fat cells become more metabolically active. The mechanism is real. The human translation is the gap.",
  },
  {
    value: "NAD+ / SAM",
    label: "the metabolic shift — raises both NAD+ and SAM by blocking the enzyme that consumes both",
    sub: "NNMT uses SAM (S-adenosylmethionine) to methylate nicotinamide — consuming both SAM and driving NAD+ precursor flux. Inhibiting NNMT simultaneously raises intracellular NAD+ (by sparing nicotinamide for NAD+ synthesis) and raises SAM (by not consuming it). NAD+ supports mitochondrial energy and sirtuin activity; SAM is the primary methyl donor for epigenetic regulation. Both metabolic pools are elevated by NNMT inhibition.",
    note: "This is mechanistically distinct from NAD+ precursor supplementation (NMN, NR, niacin). Those approaches add NAD+ substrate from the outside; 5-Amino-1MQ reduces the drain on the system. The effect on the same downstream pathways (sirtuins, AMPK, mitochondrial function) is theoretically similar but through a different mechanism — and the human evidence gap is the same: larger for 5-Amino-1MQ than for NMN/NR.",
  },
  {
    value: "Preclinical",
    label: "evidence stage — compelling mouse data; no published human clinical trials",
    sub: "The primary evidence for 5-Amino-1MQ's fat loss effects is a mouse study showing that NNMT inhibition prevented diet-induced obesity and reduced fat mass without caloric restriction (Kannt et al. and Espada et al. animal studies). This is a real finding in a real peer-reviewed context. There are no published human RCTs. The compound has not entered formal clinical trials. Community use is entirely extrapolated from animal data.",
    note: "Mouse fat loss studies have a poor track record of human translation. Many compounds that produced dramatic fat loss in mice failed in human trials. 5-Amino-1MQ is at the bottom of the evidence ladder for human use. The mechanism is interesting and the preclinical data is real — but 'interesting preclinical data' is not 'evidence of human efficacy.' These are different claims.",
  },
  {
    value: "Research chemical",
    label: "regulatory status — not FDA approved, no pharmaceutical grade, no clinical development pathway",
    sub: "5-Amino-1MQ has no FDA approval. It is not a peptide (it's a small molecule quinolinium salt). It is available through research chemical suppliers and some peptide vendors. No pharmaceutical-grade product exists. The purity, dose accuracy, and stability of research-grade product are not regulated or validated.",
    note: "The research chemical supply chain for 5-Amino-1MQ is less mature than for established peptides like BPC-157 or semaglutide — supplier quality is even more variable. The community has been using this compound without the quality control infrastructure that exists for longer-established research peptides.",
  },
];

const FIT_YES = [
  "You have metabolic goals, have addressed diet and exercise fundamentals, and are interested in a mechanistically distinct (non-GLP-1) approach based on preclinical data you've read and calibrated accurately",
  "You understand the evidence ceiling is animal studies and community anecdote — there are no human clinical trials; you are not treating this as equivalent to evidence-based medicine",
  "You have no serious liver or kidney conditions that could be affected by altered NAD+ and methylation metabolism",
  "You have verified source quality with a third-party CoA — the research chemical supply chain for this compound has notable purity variability",
];

const FIT_NO = [
  "You expect GLP-1-level evidence — 5-Amino-1MQ has essentially no human clinical evidence; the preclinical data is interesting but not equivalent to the SURMOUNT or SCALE trial evidence base",
  "You expect dramatic fat loss without caloric deficit — the mouse data showed fat loss with ad libitum feeding, but mouse metabolic biology is substantially different from human; no human study has confirmed caloric-independent fat loss",
  "You are on medications that alter NAD+ metabolism or methylation (high-dose NAD+ precursors, methionine-restricted diets, MTHFR-related supplements) — the SAM/NAD+ interaction adds complexity",
  "You have active liver disease — NNMT is highly expressed in liver; the metabolic effects on a diseased liver are not characterized",
  "You are pregnant — no safety data; NAD+ and methylation pathway perturbations during pregnancy are unknown in humans",
];

const TIMELINE = [
  {
    phase: "Weeks 1–4",
    heading: "Early metabolic effects — if any acute signal exists, it's likely energy",
    body: "Some community users report increased energy or mild thermogenic sensation in the early weeks of use, consistent with the NAD+/sirtuin activation hypothesis. Others report nothing noticeable. The fat loss signal in mice was measured over weeks — the human equivalent timeline (if the mechanism translates) is unknown. There is no validated short-term biomarker for NNMT inhibition in humans.",
  },
  {
    phase: "Weeks to months",
    heading: "The evidence window — fat loss timeline is unknown",
    body: "In mouse studies, meaningful fat mass reduction was observed over weeks of treatment with caloric access maintained. Whether this timescale translates to humans is not established. Community users report body composition changes over months of use — but without control groups, blinding, or standardized outcome measurement, these reports cannot be separated from diet/exercise changes, expectation bias, or natural variation.",
  },
  {
    phase: "Long-term",
    heading: "The honest unknown — no long-term human data",
    body: "Long-term NNMT inhibition in humans has not been studied. NNMT plays roles in multiple metabolic pathways beyond NAD+ and SAM — epigenetic regulation (methylation), homocysteine metabolism, and tissue-specific metabolic programming. The long-term consequences of sustained NNMT inhibition in humans are genuinely unknown. The community convention of cycling the compound reflects appropriate uncertainty about continuous long-term use.",
  },
];

const COMPARISON = [
  {
    name: "5-Amino-1MQ",
    badge: "NNMT inhibitor / Research chemical",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "NNMT inhibition → NAD+ and SAM elevation → adipocyte metabolic shift" },
      { label: "Evidence", value: "Mouse studies — no human RCTs; community anecdote only" },
      { label: "Fat loss", value: "~preclinical only; human fat loss not clinically established" },
      { label: "Status", value: "Research chemical — no FDA approval, no pharmaceutical grade" },
      { label: "Metabolic class", value: "NAD+ pathway modifier (not GLP-1, not stimulant)" },
    ],
    highlight: true,
  },
  {
    name: "Berberine",
    badge: "AMPK activator / OTC",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "AMPK activation, mild GLP-1R sensitization, gut microbiome modulation" },
      { label: "Evidence", value: "Multiple small human RCTs — more human evidence than 5-Amino-1MQ, less than semaglutide" },
      { label: "Fat loss", value: "Modest (~2-3% body weight in trials); primarily used for glucose regulation" },
      { label: "Status", value: "OTC supplement — widely available, more supply chain maturity" },
      { label: "Metabolic class", value: "AMPK activator (overlapping with metformin mechanism)" },
    ],
    highlight: false,
  },
  {
    name: "Semaglutide",
    badge: "GLP-1 agonist / FDA-approved",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GLP-1R agonism — appetite suppression, gastric slowing, satiety signaling" },
      { label: "Evidence", value: "Multiple Phase 3 RCTs — strongest evidence base in weight management" },
      { label: "Fat loss", value: "~15% body weight (STEP 1, n=1,961 at 68 weeks)" },
      { label: "Status", value: "FDA-approved (Wegovy for weight, Ozempic for T2D)" },
      { label: "Metabolic class", value: "Incretin hormone — completely different mechanism from NNMT inhibition" },
    ],
    highlight: false,
  },
];

export default function FiveAmino1MQOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          An NNMT inhibitor with compelling mouse fat loss data and essentially no human clinical trials — mechanistically interesting, evidence-thin.
        </div>
        <div className="reta-overview__headline-sub">
          5-Amino-1MQ inhibits NNMT (nicotinamide N-methyltransferase), the enzyme that consumes NAD+ precursor and SAM in adipose tissue. By blocking this enzyme, it raises both cellular NAD+ and SAM — shifting adipocytes toward a more metabolically active phenotype. The preclinical fat loss data in mice is real. There are no published human clinical trials. The compound is a research chemical without pharmaceutical-grade production or regulatory status. Community use is occurring entirely ahead of clinical validation.
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
      <div className="reta-overview__section-label">5-Amino-1MQ vs Berberine vs Semaglutide</div>
      <div className="reta-overview__compare-note">
        Three metabolic interventions from different mechanism families. Semaglutide has the strongest evidence and largest effect size. Berberine has more human evidence than 5-Amino-1MQ. 5-Amino-1MQ has the most mechanistically distinct (NAD+/methylation) approach but the weakest evidence base.
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
