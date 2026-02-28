/**
 * HumaninOverviewPanel — decision-oriented overview for Humanin.
 * Key frame: mitochondria-derived peptide with neuroprotection signal in
 * animal/cell data; declining endogenous levels with age; thin human evidence
 * but mechanistically coherent story. MOTS-c is the sibling peptide from same
 * mitochondrial gene region.
 */

const STAT_CARDS = [
  {
    value: "FSAP1 / SH3BP5 / CNTFR",
    label: "receptors — humanin binds multiple receptor complexes including CNTFR/WSX-1/gp130 tripartite complex",
    sub: "Humanin (HN) is a 21-amino-acid peptide encoded in the 16S rRNA region of mitochondrial DNA — the first mitochondria-derived peptide identified. It signals through multiple receptor systems: the CNTFR/WSX-1/gp130 tripartite complex (a cytokine receptor), FPRL1 (formyl peptide receptor-like 1), and intracellular targets. The mitochondrial origin is unusual — nuclear-encoded genes regulate most mitochondrial proteins, but humanin is encoded and produced within mitochondria. Circulating humanin is detectable in human blood and declines significantly with age.",
    note: "The mitochondrial origin is a key differentiator — humanin represents communication from mitochondria to the broader cell and potentially systemic circulation. This 'mitokine' concept (mitochondria-derived signaling molecules) is an active area of aging biology research. Humanin levels are measurable and age-associated, which provides a biomarker rationale for intervention that most peptides lack.",
  },
  {
    value: "Neuroprotection + metabolic",
    label: "primary effects — neuroprotection in Alzheimer models; insulin sensitivity; anti-apoptotic signaling",
    sub: "Humanin was discovered through a screen for Alzheimer's disease protective factors — it prevents neuronal death from amyloid-beta toxicity in cell culture and animal models. The anti-apoptotic mechanism involves binding to pro-apoptotic proteins (BAD, IGFBP3) and activating JAK2/STAT3 survival signaling. Metabolic effects include improved insulin sensitivity, glucose tolerance, and adiponectin levels in rodent models. In C. elegans, humanin extends lifespan. In mice, exogenous humanin improves multiple aging-related metabolic parameters.",
    note: "The Alzheimer connection is the origin story for humanin research — it was found by screening for factors that protect neurons from amyloid-beta toxicity. Whether this translates to clinical Alzheimer's disease modification is a giant leap from cell culture. The metabolic effects (insulin sensitivity, adiponectin) are also mechanistically coherent but primarily rodent-level evidence. Human data is limited to correlation studies between endogenous humanin levels and disease associations.",
  },
  {
    value: "Declining with age",
    label: "endogenous trajectory — circulating humanin levels fall with aging; lower in multiple age-related diseases",
    sub: "Human observational studies have found that circulating humanin levels decline with age and are lower in individuals with cardiovascular disease, Alzheimer's disease, and type 2 diabetes. Centenarians (100+ year-old individuals) and their children have higher humanin levels than age-matched controls — this is one of the few aging biomarker associations with longevity offspring. Whether declining humanin contributes to age-related disease or is simply a biomarker of cellular health is not established causally in humans.",
    note: "The centenarian data is genuinely interesting — it suggests that maintaining humanin levels may be a feature of exceptional longevity lineages. But correlation in observational studies does not establish that supplementing humanin in individuals with lower levels would produce the outcomes seen in centenarians. The mechanistic case for supplementation is stronger than for most anti-aging interventions, but still requires human interventional data to validate.",
  },
  {
    value: "Investigational",
    label: "regulatory status — no FDA approval; research peptide category; human trials limited",
    sub: "Humanin has no FDA approval for any indication. Human interventional studies are limited — there are no published RCTs establishing efficacy for any indication. Published human data consists mainly of observational associations between endogenous humanin levels and disease states, plus early small studies examining exogenous humanin pharmacology. The research peptide community accesses it through gray-market suppliers with variable quality and purity.",
    note: "The quality concern for humanin is moderate — it is a 21-amino-acid peptide that can be synthesized by standard solid-phase methods, unlike follistatin. However, a potent synthetic analog (HNG — Gly14-humanin) is more commonly studied in preclinical research and may be what some community products contain. Whether a product labeled 'humanin' contains native HN or HNG (or something else) matters for interpreting any effect.",
  },
];

const FIT_YES = [
  "You have documented low endogenous humanin levels (measurable on some specialty panels) and are working with a longevity medicine physician who is familiar with the mitokine literature",
  "You are investigating neuroprotection or metabolic optimization from a longevity framework and understand this is early-signal investigational — no proven human efficacy",
  "You have risk factors for Alzheimer's disease (APOE4 carrier, family history) and are exploring mechanistically coherent investigational approaches with physician oversight",
  "You understand you are acting on animal model and observational human data — not established clinical evidence — and are comfortable with that evidence tier",
];

const FIT_NO = [
  "You are expecting cognitive improvement comparable to established medications — humanin has cell-culture and rodent neuroprotection data; it has not been shown to improve cognition in humans in RCTs",
  "You have active malignancy — humanin activates pro-survival JAK2/STAT3 signaling, which has potential anti-apoptotic effects in cancer cells; active cancer is a caution requiring oncology guidance",
  "You are looking for the best-supported metabolic intervention — metformin, GLP-1 agonists, and NMN/NR all have more human evidence for metabolic outcomes than humanin",
  "You have PCOS — JAK2/STAT3 signaling activation has theoretical reproductive axis implications; this is poorly characterized but humanin is not well-studied in female reproductive contexts",
];

const TIMELINE = [
  {
    phase: "Acute",
    heading: "Pharmacokinetic unknowns — half-life and tissue distribution in humans",
    body: "Humanin is a 21-amino-acid peptide. Subcutaneous pharmacokinetics in humans are not well-characterized. Endogenous humanin has a short circulating half-life. Exogenous peptide injection would be expected to produce a transient elevation in circulating humanin followed by clearance. Whether this transient elevation is sufficient to activate protective signaling in target tissues (brain, mitochondria) is not established.",
  },
  {
    phase: "Weeks",
    heading: "Metabolic markers — rodent data suggests glucose/insulin effects; human timeline unknown",
    body: "In rodent models, humanin treatment improves insulin sensitivity and glucose tolerance over days to weeks of treatment. If these effects translate to humans, metabolic markers (fasting glucose, insulin, HOMA-IR) would be the most tractable endpoint to monitor. No human data establishes an expected timeline or magnitude for metabolic effects from exogenous humanin injection.",
  },
  {
    phase: "Long-term",
    heading: "The longevity hypothesis — mechanistically coherent but no interventional human lifespan data",
    body: "The longevity case for humanin rests on: declining levels with age, centenarian associations, lifespan extension in C. elegans, and multiple aging-related disease associations. This is a coherent circumstantial case for a role in aging. It does not constitute evidence that supplementing humanin in humans extends lifespan or healthspan. Long-term safety of exogenous humanin in humans is entirely uncharacterized.",
  },
];

const COMPARISON = [
  {
    name: "Humanin",
    badge: "Mitokine peptide / Investigational",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "CNTFR/WSX-1/gp130 → JAK2/STAT3 → neuroprotection, anti-apoptosis, insulin sensitization" },
      { label: "Evidence", value: "Cell culture + rodent: neuroprotection strong; human: observational association only; RCTs: absent" },
      { label: "Aging biomarker", value: "Endogenous levels decline with age; lower in CVD/AD/T2D; higher in centenarians/offspring" },
      { label: "Administration", value: "Subcutaneous injection; pharmacokinetics in humans not characterized" },
      { label: "Status", value: "No FDA approval; research peptide; no published human RCTs" },
    ],
    highlight: true,
  },
  {
    name: "MOTS-c",
    badge: "Sibling mitokine / Investigational",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Also mitochondria-encoded; activates AMPK; metabolic effects in skeletal muscle; less neuroprotection focus" },
      { label: "Evidence", value: "Rodent: insulin sensitivity, exercise performance; human: observational only; RCTs: absent" },
      { label: "Aging biomarker", value: "Also declines with age; different tissue distribution than humanin; metabolic focus" },
      { label: "Administration", value: "Subcutaneous injection; same PK unknowns as humanin" },
      { label: "Status", value: "No FDA approval; research peptide; slightly less community traction than humanin" },
    ],
    highlight: false,
  },
  {
    name: "NMN / NR (NAD+ precursors)",
    badge: "Mitochondrial support / Established supplement",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "NAD+ precursors → raises NAD+ → sirtuin/PARP/CD38 pathway activation → mitochondrial function" },
      { label: "Evidence", value: "Multiple human RCTs; NAD+ elevation confirmed; functional outcomes in humans mixed but more data than humanin" },
      { label: "Aging biomarker", value: "NAD+ declines with age; this is the mechanistic basis for supplementation; well-documented" },
      { label: "Administration", value: "Oral; well-tolerated; no injection required" },
      { label: "Status", value: "Dietary supplement (FDA notified); widely available; better evidence base than humanin for mitochondrial support" },
    ],
    highlight: false,
  },
];

export default function HumaninOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The first mitochondria-derived signaling peptide with a genuine age-association story and compelling rodent data — and no human RCTs to validate either.
        </div>
        <div className="reta-overview__headline-sub">
          Humanin is a 21-amino-acid peptide encoded in mitochondrial DNA — one of the first identified mitokines (mitochondria-derived signaling molecules). Endogenous humanin declines with age and is lower in people with Alzheimer&apos;s disease, cardiovascular disease, and type 2 diabetes. Centenarians and their offspring have higher levels. It protects neurons from amyloid-beta toxicity in cell culture and rodent models, improves insulin sensitivity in mice, and extends lifespan in C. elegans. The gap: no human RCTs exist. Community use is premature by conventional evidence standards, but the mechanistic story is more coherent than most investigational compounds in this space.
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
      <div className="reta-overview__section-label">Humanin vs MOTS-c vs NMN/NR</div>
      <div className="reta-overview__compare-note">
        Three approaches to mitochondrial support and aging biology. Humanin and MOTS-c are sibling mitokines from the same mitochondrial genome region — humanin is more neuroprotection-focused, MOTS-c more metabolic. NMN/NR raise NAD+ through a different mechanism and have more human evidence. All are investigational in the longevity sense — none has established efficacy in human aging outcomes.
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
