/**
 * PentagastrinOverviewPanel — decision-oriented overview for Pentagastrin.
 * Key frame: historical pharmacological diagnostic tool, not a therapeutic compound.
 * Used as a calcitonin provocative test for MTC and gastric acid stimulation test.
 * Now largely replaced by genetic testing and calcium gluconate stimulation.
 * No community use. Included as a pharmacological database entry.
 */

const STAT_CARDS = [
  {
    value: "Diagnostic tool",
    label: "provocative test agent \u2014 not a therapeutic compound",
    sub: "Pentagastrin (Boc-\u03b2-Ala-Trp-Met-Asp-Phe-NH2) is a synthetic 5-amino-acid peptide that is a partial sequence of gastrin. It acts on CCK-B/gastrin receptors to stimulate gastric acid secretion. Its clinical applications were (1) the pentagastrin gastric acid stimulation test (measuring maximal acid output to diagnose achlorhydria, Zollinger-Ellison syndrome) and (2) the pentagastrin calcitonin provocative test for medullary thyroid carcinoma (MTC) screening.",
    note: "Pentagastrin\u2019s status as a historical pharmacological tool is the primary framing. It was clinically useful as a diagnostic agent in specific contexts; it was never a therapeutic compound. The shift to genetic testing (RET mutation screening) and calcium gluconate stimulation for MTC has largely displaced pentagastrin in current clinical practice.",
  },
  {
    value: "CCK-B/gastrin receptor",
    label: "foundational GI pharmacology \u2014 gastric acid secretion mechanism",
    sub: "Pentagastrin\u2019s C-terminal tetrapeptide (-Trp-Met-Asp-Phe-NH2) is the pharmacologically active sequence that binds CCK-B (cholecystokinin-B/gastrin) receptors on parietal cells and ECL (enterochromaffin-like) cells to stimulate gastric acid secretion. This mechanism is the basis of both the acid stimulation test (gastric physiology measurement) and the calcitonin stimulation test (pentagastrin stimulates calcitonin release from MTC cells via CCK-B receptors expressed on C-cells).",
    note: "The CCK-B receptor mechanism is historically important: it was the basis for pentagastrin\u2019s dual diagnostic utility. The Zollinger-Ellison syndrome acid secretion studies using pentagastrin helped characterize hypergastrinemia; the MTC calcitonin stimulation test enabled early detection of hereditary MTC before genetic testing was available.",
  },
  {
    value: "Largely obsolete",
    label: "genetic testing and calcium stimulation have replaced pentagastrin in MTC",
    sub: "The primary historical use \u2014 calcitonin stimulation for MTC detection in MEN2 kindreds \u2014 has been largely replaced by RET proto-oncogene genetic testing, which identifies mutation carriers before MTC develops and drives prophylactic thyroidectomy decisions. Calcium gluconate stimulation is preferred over pentagastrin for calcitonin provocative testing where genetic testing is unavailable or supplementary testing is needed.",
    note: "Pentagastrin is not commercially available in many countries, including the US (removed from US market). This obsolescence is the most important practical context for the database entry: the compound\u2019s clinical role has been substantially displaced, and there is no emerging community or enhancement use to evaluate.",
  },
];

const FIT_YES = [
  "You are in a clinical context requiring calcitonin provocative testing and pentagastrin is the available agent \u2014 it has established diagnostic utility in this setting",
  "You are researching the historical pharmacology of gastrin receptor biology, MTC diagnostic development, or the evolution of GI physiology testing",
  "You are a clinician or researcher evaluating gastric acid secretion physiology in a context where pentagastrin stimulation testing is appropriate (rare in current practice)",
];

const FIT_NO = [
  "You are looking for a therapeutic compound to use \u2014 pentagastrin has no therapeutic application; it is a diagnostic agent with very short duration of action",
  "You are considering pentagastrin for any enhancement, recovery, or longevity purpose \u2014 there is no pharmacological rationale and no evidence basis for non-diagnostic use",
  "You expect community use information \u2014 there is no community use of pentagastrin; this database entry is for pharmacological completeness",
  "You are outside a supervised clinical/diagnostic context \u2014 pentagastrin produces GI adverse effects (nausea, cramping, flushing) that are managed in diagnostic settings with monitoring; self-administration has no purpose",
];

const TIMELINE = [
  {
    phase: "IV or SC administration \u2014 minutes",
    heading: "Fast onset, short duration \u2014 designed for diagnostic measurement windows",
    body: "Pentagastrin acts within 5\u201310 minutes of IV administration and stimulates peak gastric acid secretion within 30\u201360 minutes. For calcitonin stimulation, the provocative effect is measured at 1\u20135 minutes (IV route) or 10\u201320 minutes (SC route) post-injection. The compound is rapidly cleared, and effects are short-lived. This is a feature for diagnostic use (you want a defined stimulation window for measurement) \u2014 not a characteristic relevant to therapeutic use.",
  },
  {
    phase: "The gastric acid stimulation test \u2014 historical context",
    heading: "Maximal acid output measurement for ZE and achlorhydria diagnosis",
    body: "The pentagastrin gastric acid stimulation test replaced the Histalog (betazole) test as a way to measure maximal gastric acid output (MAO). It was used to diagnose Zollinger-Ellison syndrome (high MAO from gastrin-driven hypersecretion), achlorhydria (absent acid production, relevant for pernicious anemia and atrophic gastritis evaluation), and to monitor surgical vagotomy completeness. Proton pump inhibitors have displaced much of this diagnostic utility \u2014 most suspected ZE cases are evaluated by fasting serum gastrin and secretin stimulation testing.",
  },
  {
    phase: "Calcitonin stimulation for MTC \u2014 the primary historical legacy",
    heading: "Early MTC detection in MEN2 families before genetic testing",
    body: "In MEN2 (multiple endocrine neoplasia type 2) families, prophylactic thyroidectomy decisions were historically guided by calcitonin provocative testing: pentagastrin stimulation would produce an exaggerated calcitonin rise in individuals with C-cell hyperplasia or early MTC, guiding the surgical decision. The introduction of RET mutation testing (which directly identifies mutation-carrying individuals who will develop MTC) replaced the need for repeated provocative calcitonin testing in most MEN2 kindreds. Pentagastrin\u2019s role in this application is now primarily historical.",
  },
];

const COMPARISON = [
  {
    name: "Pentagastrin",
    badge: "Historical diagnostic agent",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Type", value: "5-AA synthetic gastrin partial sequence \u2014 CCK-B/gastrin receptor agonist" },
      { label: "Clinical use", value: "Gastric acid stimulation test; calcitonin provocative test for MTC" },
      { label: "Current status", value: "Largely obsolete \u2014 not commercially available in US; replaced by genetic testing (MTC) and other methods" },
      { label: "Therapeutic use", value: "None \u2014 diagnostic agent only" },
      { label: "Community use", value: "None \u2014 no established or emerging community use" },
    ],
    highlight: true,
  },
  {
    name: "Calcium gluconate stimulation (MTC testing)",
    badge: "Current preferred method",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Mechanism", value: "IV calcium raises serum calcium, directly stimulating calcitonin release from C-cells" },
      { label: "vs Pentagastrin", value: "Preferred over pentagastrin where available; less nausea; more widely available than pentagastrin (which is off-market in US)" },
      { label: "Current role", value: "Supplementary to genetic testing in MEN2 families; used when genetic test results are ambiguous or calcitonin surveillance is required" },
    ],
    highlight: false,
  },
  {
    name: "RET genetic testing (MEN2/MTC)",
    badge: "Current standard",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Mechanism", value: "Direct germline RET proto-oncogene mutation detection" },
      { label: "vs Pentagastrin", value: "Identifies mutation carriers before MTC develops; guides prophylactic thyroidectomy timing; replaces need for repeated provocative calcitonin testing" },
      { label: "Current role", value: "Standard of care for MEN2 family genetic screening; drives management decisions" },
    ],
    highlight: false,
  },
];

export default function PentagastrinOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          A historical diagnostic tool \u2014 important pharmacological heritage, no therapeutic application, no community use.
        </div>
        <div className="reta-overview__headline-sub">
          Pentagastrin is a 5-amino-acid synthetic gastrin partial sequence that was used as a provocative test agent in two clinical applications: gastric acid stimulation testing (to measure maximal acid output in GI physiology evaluation) and calcitonin stimulation testing (to detect early medullary thyroid carcinoma in MEN2 families). Genetic testing for RET mutations and calcium gluconate stimulation have largely replaced pentagastrin in current practice. The compound is off-market in the US. There is no therapeutic application and no community use \u2014 this entry exists for pharmacological completeness in a peptide database.
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
            <span className="reta-overview__fit-icon">&#x2713;</span> Fits your situation if&hellip;
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_YES.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="reta-overview__fit-col reta-overview__fit-col--no">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">&#x2717;</span> Look elsewhere if&hellip;
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
      <div className="reta-overview__section-label">Pentagastrin vs calcium gluconate stimulation vs RET genetic testing</div>
      <div className="reta-overview__compare-note">
        The three-way comparison frames pentagastrin\u2019s place in the historical arc of MTC diagnosis. Pentagastrin was the provocative test before genetic testing changed the paradigm. Calcium gluconate stimulation is the current preferred provocative agent where biochemical testing is still needed. RET genetic testing is the current standard for family screening and has largely made repeated provocative testing unnecessary.
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
