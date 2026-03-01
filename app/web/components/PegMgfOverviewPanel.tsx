/**
 * PegMgfOverviewPanel — decision-oriented overview for PEG-MGF.
 * Key frame: PEGylated IGF-1 splice variant peptide with preclinical muscle biology.
 * No human clinical trial data. Unverified research chemical in community use.
 * IGF-1 pathway activation carries real oncogenesis and metabolic concerns.
 */

const STAT_CARDS = [
  {
    value: "Preclinical only",
    label: "muscle satellite cell biology is real \u2014 human evidence is absent",
    sub: "PEG-MGF is a PEGylated synthetic peptide derived from the E domain of IGF-1Ec \u2014 the mechano growth factor (MGF) splice variant of IGF-1 induced by mechanical load. The non-PEGylated peptide (MGF) is a 24-amino-acid C-terminal peptide. PEGylation is intended to extend half-life. Animal model research shows MGF can activate muscle satellite cells and promote repair. None of this is characterized in humans.",
    note: "The distinction between IGF-1 and MGF biology matters: MGF is proposed to act via a mechanism distinct from IGF-1R activation \u2014 activating satellite cells (muscle stem cells) specifically following mechanical damage. Whether this is meaningfully different from IGF-1 signaling at the receptor level, and whether it works the same way in humans as in rodents, is not established.",
  },
  {
    value: "PEGylation",
    label: "half-life extension strategy \u2014 with its own uncharacterized concerns",
    sub: "PEGylation (attachment of polyethylene glycol chains) is a standard pharmaceutical strategy to extend peptide half-life by reducing renal clearance and enzymatic degradation. For MGF, it substantially extends the short half-life of the unmodified peptide. However, PEG accumulation with repeated dosing is a theoretical concern that has been raised for PEGylated biologics; for PEG-MGF specifically, this has not been characterized.",
    note: "PEGylated biologics (PEG-interferon, PEG-filgrastim) have well-established safety profiles because they went through proper clinical development. PEG-MGF has not. The PEGylation concern for PEG-MGF is theoretical \u2014 but it is a real concern that is not resolved by preclinical data.",
  },
  {
    value: "Research chemical",
    label: "community sources are unverified \u2014 product identity is a real risk",
    sub: "PEG-MGF purchased from gray-market research peptide suppliers has no regulatory oversight, no verified synthesis process, and no third-party identity verification that is standardized. The compound sold as PEG-MGF may or may not be correctly sequenced, correctly PEGylated, correctly concentrated, or free from contamination. These are not theoretical concerns \u2014 they affect every batch from every supplier.",
    note: "Unlike octreotide or semaglutide (which are pharmaceutical-grade, FDA-approved, and manufactured under GMP), research peptides exist in a regulatory void where product quality is highly variable. A certificate of analysis from a third-party lab is the minimum standard, and even that has limitations depending on the lab\u2019s methodology.",
  },
];

const FIT_YES = [
  "You are conducting preclinical research on IGF-1 splice variant biology, satellite cell activation, or muscle repair signaling \u2014 MGF/PEG-MGF is a legitimate research tool in animal models",
  "You understand the evidence is entirely preclinical and have made a fully informed decision about the unknowns \u2014 particularly IGF-1 pathway and oncogenesis concerns",
];

const FIT_NO = [
  "You want a muscle recovery compound with evidence of benefit in humans \u2014 PEG-MGF has no human clinical trial data at any level",
  "You are in an anabolic stack and looking for an IGF-1-axis add-on \u2014 the safety characterization for PEG-MGF in combination with anabolic steroids is completely absent",
  "You have any personal or family history of cancer \u2014 IGF-1 pathway dysregulation and growth factor signaling is mechanistically linked to oncogenesis; an uncharacterized IGF-1-axis compound adds unquantifiable risk",
  "You want certainty about what you are injecting \u2014 gray-market PEG-MGF has no verified product identity guarantee",
  "You are pregnant, breastfeeding, or an adolescent \u2014 hard stop; growth factor signaling in developmental contexts is specifically concerning",
  "You want to use this long-term \u2014 PEG accumulation with repeated dosing is uncharacterized; no long-term safety data at any time horizon",
];

const TIMELINE = [
  {
    phase: "Theoretical mechanism \u2014 what preclinical models suggest",
    heading: "Satellite cell activation and muscle repair signaling",
    body: "In rodent models of muscle injury, MGF administration (typically via injection or gene delivery near the injured site) increases satellite cell proliferation and differentiation. Satellite cells are the muscle stem cell population that regenerates damaged muscle fibers. The proposed mechanism is that MGF acts as a local repair signal, distinct from the growth-promoting effects of IGF-1 at the systemic level. PEGylation of MGF is intended to allow systemic injection with slower clearance, creating a sustained signal rather than requiring local administration.",
  },
  {
    phase: "Community use window \u2014 post-workout injection protocol",
    heading: "What community protocols describe \u2014 without human evidence to validate",
    body: "Community protocols typically describe PEG-MGF injection 30\u201360 minutes post-workout, on rest days, or in a defined post-exercise recovery window. Doses range widely in community reports. The rationale is to activate satellite cells during the repair window following mechanical stress. Whether subcutaneous or intramuscular PEG-MGF injection actually reaches muscle tissue at concentrations that activate satellite cells \u2014 and whether the satellite cell response in a healthy, trained human athlete is meaningfully different from what endogenous IGF-1 and MGF already produce in response to training \u2014 is completely untested.",
  },
  {
    phase: "Long-term \u2014 entirely uncharacterized",
    heading: "No long-term safety data exists at any time horizon",
    body: "Chronic administration of an uncharacterized IGF-1-axis peptide carries theoretical oncogenesis concern. The IGF-1 signaling pathway is a well-established driver of tumor growth and progression across multiple cancer types. Whether PEG-MGF\u2019s proposed distinct mechanism (satellite cell activation rather than systemic IGF-1R agonism) meaningfully separates it from oncogenesis concerns is not tested. PEG accumulation with chronic dosing is also uncharacterized.",
  },
];

const COMPARISON = [
  {
    name: "PEG-MGF",
    badge: "Research chemical only",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Mechanism", value: "IGF-1Ec E-domain peptide \u2014 proposed satellite cell activation; distinct MGF receptor not confirmed" },
      { label: "Human evidence", value: "None \u2014 entirely preclinical (animal models)" },
      { label: "Formulation", value: "Gray-market research chemical; no pharmaceutical-grade formulation" },
      { label: "IGF-1 axis risk", value: "Real \u2014 IGF-1 pathway activation has oncogenesis and insulin resistance implications" },
      { label: "PEGylation safety", value: "Uncharacterized for this compound specifically" },
    ],
    highlight: true,
  },
  {
    name: "IGF-1 LR3 (insulin-like growth factor-1 long arg3)",
    badge: "Research chemical",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Mechanism", value: "IGF-1R agonist \u2014 full-length IGF-1 analogue with reduced IGF-BP binding (longer half-life)" },
      { label: "Human evidence", value: "Minimal \u2014 primarily preclinical; limited legitimate human trials" },
      { label: "Community use", value: "More established community use history than PEG-MGF" },
      { label: "vs PEG-MGF", value: "Both are IGF-1-axis compounds; IGF-1 LR3 is better-characterized in community use but still not human-trialed for enhancement" },
    ],
    highlight: false,
  },
  {
    name: "Training-induced MGF (endogenous)",
    badge: "Physiological",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Source", value: "Endogenous \u2014 produced in muscle in response to mechanical load/damage" },
      { label: "Evidence", value: "Strong \u2014 exercise-induced muscle repair is well-characterized" },
      { label: "Safety", value: "Physiological \u2014 the endogenous system is what training already leverages" },
      { label: "vs exogenous PEG-MGF", value: "Heavy mechanical loading (progressive overload) maximizes endogenous MGF expression without any of the uncharacterized risks of exogenous administration" },
    ],
    highlight: false,
  },
];

export default function PegMgfOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          Interesting muscle biology, no human evidence, and real IGF-1 pathway concerns. Training already maximizes the endogenous signal.
        </div>
        <div className="reta-overview__headline-sub">
          PEG-MGF is a PEGylated peptide derived from the mechano growth factor splice variant of IGF-1 \u2014 a naturally occurring local muscle repair signal produced in response to mechanical stress. In animal models, MGF activates muscle satellite cells (stem cells that regenerate damaged muscle fibers). The PEGylation is intended to extend its half-life for systemic injection. Community use centers on post-workout injection for muscle recovery. What doesn\u2019t exist: any human clinical data, any characterized safety profile, any certainty about what the gray-market compound actually is. The additional concern is the IGF-1 pathway: growth factor signaling dysregulation has well-established links to tumor growth and insulin resistance. Progressive mechanical loading already maximizes the endogenous MGF signal without the uncharacterized risks.
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
      <div className="reta-overview__section-label">PEG-MGF vs IGF-1 LR3 vs endogenous training response</div>
      <div className="reta-overview__compare-note">
        PEG-MGF is often discussed alongside IGF-1 LR3 in the same community contexts (anabolic peptide stacks for muscle growth and recovery). Both are IGF-1 axis compounds without human trial evidence. The most important comparison is against the endogenous MGF response to heavy training \u2014 which is what PEG-MGF is attempting to amplify, and which progressive overload already maximizes without the risk profile of an uncharacterized exogenous peptide.
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
