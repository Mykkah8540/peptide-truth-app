/**
 * SS31OverviewPanel — decision-oriented overview for SS-31 (Elamipretide).
 * Key frame: mitochondria-targeted cardioprotective peptide with the most
 * compelling real human Phase 2 data of any mitochondrial peptide in this
 * space. The cardioprotection and renal function evidence is meaningful.
 * Community use extrapolates from disease-context trials.
 */

const STAT_CARDS = [
  {
    value: "Cardiolipin / inner mitochondrial membrane",
    label: "mechanism — binds cardiolipin on the inner mitochondrial membrane to restore bioenergetics",
    sub: "SS-31 (elamipretide; D-Arg-Dmt-Lys-Phe-NH₂) is a Szeto-Schiller peptide that selectively concentrates in the inner mitochondrial membrane, where it binds cardiolipin — the signature phospholipid of the inner membrane. Cardiolipin is essential for the electron transport chain complexes (I, III, IV) and for mitochondrial membrane potential. In aged or damaged mitochondria, cardiolipin becomes oxidized and peroxidized, disrupting ETC function. SS-31 prevents and reverses this cardiolipin peroxidation, restoring electron transport efficiency.",
    note: "The cardiolipin mechanism is unusually specific and well-characterized for a peptide this size. Unlike general antioxidants (vitamin E, vitamin C), SS-31 concentrates specifically in the mitochondria where oxidative damage occurs, rather than distributing throughout the cell or body. This targeted antioxidant mechanism is the scientific basis for the cardiometabolic interest.",
  },
  {
    value: "Phase 2 human data",
    label: "evidence tier — cardiomyopathy (HARP trial) and renal protection trials; meaningful clinical signals",
    sub: "SS-31/elamipretide has the strongest human clinical data of any mitochondria-targeted peptide in this space. The HARP trial (Heart failure with pReserved ejection fraction, Aldosterone Receptor blockade, Protective effects of elamipretide) showed improved cardiac bioenergetics (PCr/ATP ratio) measured by MRI spectroscopy in HFpEF patients. Renal protection studies (ischemia-reperfusion, Barth syndrome) have also shown signals. Phase 2 data across multiple cardiovascular and renal indications has been accumulated by Stealth BioTherapeutics.",
    note: "Phase 2 data is meaningful but not approval-level. The HARP trial used 4-week IV infusion in hospitalized HFpEF patients — a very different context from community subcutaneous injection for performance or longevity. The evidence supports the mechanism and direction of effect in disease states; extrapolation to healthy subjects via subcutaneous injection for optimization is a significant leap.",
  },
  {
    value: "Cardiac + renal + skeletal muscle",
    label: "target tissues — highest mitochondrial density tissues are primary targets",
    sub: "SS-31 primarily benefits tissues with high mitochondrial content and energy demands: heart muscle (cardiomyocytes), kidney proximal tubule cells, and skeletal muscle. In disease models and early human trials, improvement in cardiac energy efficiency, renal function preservation, and skeletal muscle mitochondrial function have been demonstrated. The longevity/aging community interest is based on the premise that age-related mitochondrial dysfunction in these same tissues is an important aging mechanism.",
    note: "The skeletal muscle angle is the community performance use case — mitochondrial function is rate-limiting for endurance performance, and SS-31 in muscle aging models improves mitochondrial function. Whether this translates to performance improvement in healthy trained athletes (where mitochondrial function may not be the limiting factor) is not established.",
  },
  {
    value: "Investigational",
    label: "regulatory status — Phase 2/3 trials; no FDA approval; elamipretide development ongoing",
    sub: "Stealth BioTherapeutics developed elamipretide for multiple indications. The Barth syndrome (tafazzin mutation causing cardiolipin remodeling defect) trial showed clinical benefit, with orphan drug designation. Phase 3 trials in Barth syndrome and other indications have been pursued. Community access is through gray-market suppliers under the SS-31 or elamipretide name. Synthesis is feasible (4 amino acids) but the D-form amino acids (D-Arg, D-Phe) and N-methylation (Dmt) require specialized synthesis.",
    note: "The D-amino acid content of SS-31 is pharmacologically important — D-amino acids resist proteolytic degradation, extending half-life. Community products sold as 'SS-31' should contain D-Arg and D-Phe, not the L-form equivalents. A product using standard L-amino acids would have entirely different pharmacokinetics and reduced activity. Quality verification is particularly important for this compound.",
  },
];

const FIT_YES = [
  "You have diagnosed heart failure with preserved ejection fraction (HFpEF) or are in a clinical trial context — this is the most evidence-supported application and should involve cardiologist oversight",
  "You are investigating mitochondrial support for aging biology from a longevity framework with a physician familiar with the elamipretide literature",
  "You have documented mitochondrial dysfunction (e.g., Barth syndrome, genetic mitochondrial disease) — SS-31 is in active clinical development for these conditions",
  "You are an endurance athlete specifically interested in mitochondrial function optimization and understand this is early-investigational without athlete-specific RCTs",
];

const FIT_NO = [
  "You have active heart disease without specialist involvement — the HARP trial was in a supervised clinical setting; community self-management of cardiac conditions is not appropriate",
  "You are looking for muscle growth or body composition effects — SS-31's effects are on mitochondrial function, not hypertrophy signaling; the wrong mechanism for this goal",
  "You expect dramatic, quickly perceptible effects — mitochondrial function improvement is a subtle, cumulative process; the clinical trial endpoints (cardiac MRI spectroscopy, VO2 testing) are not subjectively perceptible",
  "You cannot verify D-amino acid content of your product — without D-Arg and D-Phe, the compound degrades rapidly and does not achieve mitochondrial targeting",
];

const TIMELINE = [
  {
    phase: "Hours",
    heading: "Mitochondrial accumulation — subcutaneous SS-31 reaches mitochondria within hours",
    body: "The pharmacokinetics of subcutaneous SS-31 in humans are not extensively published, but animal studies and limited human data suggest rapid distribution to mitochondria-rich tissues. Peak tissue concentrations occur within hours of injection. The D-amino acid composition resists proteolytic degradation and extends circulating half-life compared to L-amino acid peptides of the same size.",
  },
  {
    phase: "Weeks to months",
    heading: "Mitochondrial function improvement — the HARP trial showed 28-day signal",
    body: "The HARP trial used 28-day continuous IV elamipretide and demonstrated improved PCr/ATP ratio (cardiac energy efficiency) at 4 weeks. Whether 28-day subcutaneous injection in community use produces equivalent tissue exposure is unknown. Mitochondrial function improvement is a cumulative process — not a single-dose acute effect.",
  },
  {
    phase: "Long-term",
    heading: "Aging mitochondrial maintenance — theoretical; no human aging longevity data",
    body: "The aging biology case for SS-31 rests on age-related cardiolipin peroxidation contributing to mitochondrial function decline. In aged mice, SS-31 restores mitochondrial function and improves multiple aging-related parameters. Whether this translates to human healthspan or longevity benefit from long-term subcutaneous injection is entirely uncharacterized.",
  },
];

const COMPARISON = [
  {
    name: "SS-31 (Elamipretide)",
    badge: "Cardiolipin-targeting peptide / Phase 2/3",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Inner mitochondrial membrane cardiolipin binding → prevents peroxidation → restores ETC efficiency" },
      { label: "Evidence", value: "HARP trial (HFpEF, Phase 2); Barth syndrome (Phase 3); renal ischemia; most advanced clinical mitochondrial peptide" },
      { label: "Primary target", value: "Heart, kidney, skeletal muscle — high-mitochondrial-density tissues" },
      { label: "Synthesis quality", value: "D-amino acids required (D-Arg, D-Phe) — standard L-amino acid product would be inactive" },
      { label: "Status", value: "No FDA approval; Phase 2/3 data; investigational; gray-market community access" },
    ],
    highlight: true,
  },
  {
    name: "Humanin",
    badge: "Mitokine peptide / Investigational",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Mitochondria-encoded; CNTFR/JAK2/STAT3 → neuroprotection, insulin sensitization" },
      { label: "Evidence", value: "Cell/rodent strong; human observational (centenarian); no RCTs" },
      { label: "Primary target", value: "Neurons, metabolic tissues; neuroprotection + metabolic focus vs. SS-31's cardiac/bioenergetic focus" },
      { label: "Synthesis quality", value: "21 AA; L-amino acids; standard synthesis acceptable" },
      { label: "Status", value: "No FDA approval; no clinical development pipeline; gray-market" },
    ],
    highlight: false,
  },
  {
    name: "CoQ10 / MitoQ",
    badge: "Mitochondrial antioxidant / Supplement",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "CoQ10: ETC complex II cofactor + antioxidant. MitoQ: mitochondria-targeted ubiquinone analog" },
      { label: "Evidence", value: "CoQ10: multiple human RCTs in heart failure, statin myopathy; MitoQ: human data emerging" },
      { label: "Primary target", value: "Same mitochondrial ETC — different approach (cofactor supplementation vs. membrane protection)" },
      { label: "Synthesis quality", value: "N/A — small molecule supplements; standard oral bioavailability concerns" },
      { label: "Status", value: "OTC supplements; established safety data; more human evidence than most mitochondrial peptides" },
    ],
    highlight: false,
  },
];

export default function SS31OverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The most clinically advanced mitochondria-targeted peptide — Phase 2 cardiac and renal data, a specific cardiolipin mechanism, and a synthesis quality requirement that most community products fail.
        </div>
        <div className="reta-overview__headline-sub">
          SS-31 (elamipretide) binds cardiolipin on the inner mitochondrial membrane to prevent peroxidation and restore electron transport chain efficiency. The HARP trial showed improved cardiac energy efficiency in HFpEF patients at 4 weeks — the most compelling human mitochondrial peptide trial published. Community use extrapolates to healthy aging and performance. The synthesis caveat: SS-31 requires D-amino acids (D-Arg, D-Phe) for stability and mitochondrial targeting; a product made with standard L-amino acids would have fundamentally different pharmacokinetics.
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
      <div className="reta-overview__section-label">SS-31 vs Humanin vs CoQ10/MitoQ</div>
      <div className="reta-overview__compare-note">
        Three mitochondrial support approaches with different mechanisms and evidence tiers. SS-31 is the most clinically advanced mitochondrial peptide with Phase 2 human data. Humanin is a mitokine with rodent + observational human data but no RCTs. CoQ10/MitoQ are OTC supplements with more human evidence than most peptides for mitochondrial support. All address mitochondrial function through different mechanisms.
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
