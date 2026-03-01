/**
 * EptifibatideOverviewPanel — decision-oriented overview for Eptifibatide (Integrilin).
 * Key frame: eptifibatide is a hospital IV anticoagulant for ACS/PCI, not a community peptide.
 * Included for pharmacological education on cyclic peptide anticoagulants.
 * Mechanism: GPIIb/IIIa inhibition — blocks the final common pathway of platelet aggregation.
 */

const STAT_CARDS = [
  {
    value: "GPIIb/IIIa",
    label: "receptor blockade \u2014 the final common pathway of platelet aggregation",
    sub: "Eptifibatide (Integrilin) is a cyclic heptapeptide that competitively inhibits the glycoprotein IIb/IIIa (GPIIb/IIIa) receptor on platelets. GPIIb/IIIa is an integrin receptor that, when activated, binds fibrinogen and von Willebrand factor (vWF) \u2014 the molecular bridges that link activated platelets to each other and to damaged vessel walls. Blocking GPIIb/IIIa blocks platelet aggregation at its final obligatory step, regardless of which upstream pathway (collagen, thrombin, ADP, thromboxane) triggered platelet activation.",
    note: "GPIIb/IIIa inhibition is mechanistically comprehensive: it doesn\u2019t matter whether a platelet was activated by collagen from a disrupted plaque, by thrombin from the coagulation cascade, or by ADP released from other activated platelets \u2014 if GPIIb/IIIa is blocked, the platelet cannot aggregate. This makes GPIIb/IIIa inhibitors the most potent antiplatelet agents available, but also the most bleeding-prone.",
  },
  {
    value: "~2.5 h",
    label: "half-life \u2014 short and rapidly reversible after stopping the infusion",
    sub: "Eptifibatide has a plasma half-life of approximately 2.5 hours and is cleared primarily by the kidneys. Platelet aggregation returns to near-normal within 4\u20138 hours of stopping the infusion \u2014 a key clinical advantage for managing bleeding complications or emergent surgery. This rapid reversibility distinguishes eptifibatide from abciximab (which binds GPIIb/IIIa irreversibly and has clinical effects lasting 12\u201348+ hours despite a short plasma half-life).",
    note: "Renal clearance of eptifibatide has direct dosing implications: renal impairment requires dose reduction because reduced clearance extends drug exposure and amplifies bleeding risk. Patients with severe renal impairment (creatinine clearance <25\u201330 mL/min) or on dialysis have markedly increased bleeding risk and require special dosing consideration or alternative antiplatelet strategies.",
  },
  {
    value: "ACS / PCI",
    label: "FDA-approved indications \u2014 acute coronary syndrome and percutaneous coronary intervention",
    sub: "Eptifibatide is FDA-approved for: (1) acute coronary syndromes (ACS) including unstable angina and NSTEMI in patients managed medically or with PCI; and (2) PCI (percutaneous coronary intervention) to reduce thrombotic complications of coronary stenting and balloon angioplasty. It is administered as an IV bolus followed by a continuous infusion in the hospital setting under hemodynamic monitoring.",
    note: "The clinical context is an acute care hospital environment with real-time hemodynamic monitoring, access to blood products, and capacity to manage major bleeding events. This is not a drug for any outpatient or self-administration context. Its inclusion here is strictly for pharmacological education \u2014 understanding how synthetic cyclic peptides can function as precision anticoagulants targeting specific integrin receptors.",
  },
  {
    value: "Class",
    label: "GPIIb/IIIa inhibitor class \u2014 eptifibatide, abciximab, tirofiban",
    sub: "Eptifibatide is one of three FDA-approved GPIIb/IIIa inhibitors. Abciximab (ReoPro) is a chimeric monoclonal antibody fragment (not a peptide) that binds GPIIb/IIIa irreversibly. Tirofiban (Aggrastat) is a small-molecule peptidomimetic (not a true peptide) that, like eptifibatide, competitively inhibits the fibrinogen-binding site reversibly. Eptifibatide\u2019s cyclic heptapeptide structure mimics the KGD (lysine-glycine-aspartate) sequence that fibrinogen uses to bind GPIIb/IIIa, giving it high receptor specificity.",
    note: "The choice between GPIIb/IIIa inhibitors in clinical practice depends on indication, reversibility needs, cost, and institutional protocols. The class as a whole has declined in use with the advent of potent P2Y12 inhibitors (ticagrelor, prasugrel) which provide more predictable antiplatelet effects with a better-characterized bleeding profile for ACS management. GPIIb/IIIa inhibitors are now used primarily as a bail-out strategy during PCI for high-thrombosis-burden lesions.",
  },
];

const FIT_YES = [
  "You are a patient who received eptifibatide during a cardiac catheterization or ACS hospitalization and want to understand what you were given and why",
  "You are researching the pharmacology of cyclic peptide drugs as precision receptor antagonists \u2014 eptifibatide is an elegant example of peptide engineering mimicking a natural protein-binding sequence (KGD) to block a specific integrin receptor",
  "You are a healthcare professional or student studying antiplatelet pharmacology and want to understand GPIIb/IIIa inhibitor class mechanisms and evidence",
  "You are researching the distinction between different antithrombotic strategies in ACS management (anticoagulants vs. antiplatelet agents vs. fibrinolytics)",
];

const FIT_NO = [
  "You are considering any non-hospital use of eptifibatide \u2014 this is a hospital-administered IV drug requiring continuous infusion and monitoring; there is no outpatient, self-injection, or community use context",
  "You are looking for an antiplatelet supplement or peptide for cardiovascular \u201coptimization\u201d \u2014 eptifibatide is not appropriate for this; the bleeding risk with GPIIb/IIIa inhibition outside ACS/PCI indications is not clinically justified",
  "You are on any existing anticoagulant or antiplatelet medication and are wondering whether to add eptifibatide \u2014 this is a hospital-initiated decision with risk stratification and monitoring that cannot be self-managed",
];

const TIMELINE = [
  {
    phase: "Initiation (hospital ACS/PCI setting)",
    heading: "IV bolus followed by continuous infusion \u2014 under continuous hemodynamic monitoring",
    body: "Eptifibatide is initiated as a weight-based IV bolus followed by a continuous infusion. In the ACS indication, the infusion runs for up to 72 hours. In the PCI indication, the infusion typically runs for 18\u201324 hours post-procedure. Concurrent anticoagulation (unfractionated heparin or bivalirudin) is standard. Platelet count monitoring at baseline, 2\u20136 hours after initiation, and then daily is standard practice to detect the rare but serious thrombocytopenia that can occur.",
  },
  {
    phase: "During infusion",
    heading: "Bleeding monitoring, femoral access site management, and renal dose adjustment",
    body: "The primary risk during infusion is bleeding \u2014 particularly at the femoral arterial access site used for cardiac catheterization. Vascular access site management (sheaths, compression, ambulation restrictions) is a major focus of post-PCI nursing care when GPIIb/IIIa inhibitors are used. Platelet count drops \u2014 if thrombocytopenia occurs (usually within the first 24 hours) \u2014 require prompt discontinuation. Renal function monitoring guides dosing; creatinine clearance-based dose adjustment is essential.",
  },
  {
    phase: "Discontinuation and recovery",
    heading: "Platelet aggregation returns to normal within 4\u20138 hours \u2014 rapid offset",
    body: "The rapid reversibility of eptifibatide is its key practical advantage over abciximab. When the infusion is stopped, eptifibatide dissociates from GPIIb/IIIa receptors within hours and platelet function recovers. If urgent surgery becomes necessary during an eptifibatide infusion, stopping the infusion and waiting 4\u20136 hours is often sufficient to restore adequate platelet function. No reversal agent exists (unlike some newer anticoagulants), so the management strategy is infusion discontinuation and supportive care (platelet transfusion if clinically needed for severe bleeding).",
  },
];

const COMPARISON = [
  {
    name: "Eptifibatide (Integrilin)",
    badge: "Cyclic heptapeptide \u2014 competitive, reversible",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Molecule type", value: "Cyclic heptapeptide mimicking KGD fibrinogen-binding sequence" },
      { label: "Binding", value: "Competitive, reversible GPIIb/IIIa inhibition" },
      { label: "Half-life", value: "~2.5 hours; platelet function recovery 4\u20138 hours after stopping" },
      { label: "Clearance", value: "Renal; dose adjustment required for CrCl <50 mL/min" },
      { label: "Key trial", value: "PURSUIT (ACS), ESPRIT (PCI)" },
    ],
    highlight: true,
  },
  {
    name: "Tirofiban (Aggrastat)",
    badge: "Small-molecule peptidomimetic \u2014 competitive, reversible",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Molecule type", value: "Non-peptide small molecule mimicking RGD sequence (peptidomimetic)" },
      { label: "Binding", value: "Competitive, reversible GPIIb/IIIa inhibition" },
      { label: "Half-life", value: "~2 hours; similar rapid reversibility to eptifibatide" },
      { label: "Clearance", value: "Renal; dose adjustment for renal impairment" },
      { label: "Key trial", value: "PRISM-PLUS (ACS), RESTORE (PCI)" },
    ],
    highlight: false,
  },
  {
    name: "Abciximab (ReoPro)",
    badge: "Chimeric monoclonal antibody fragment \u2014 irreversible",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.09)",
    rows: [
      { label: "Molecule type", value: "Chimeric human-murine monoclonal antibody Fab fragment" },
      { label: "Binding", value: "Irreversible, non-competitive GPIIb/IIIa inhibition" },
      { label: "Half-life", value: "Plasma half-life ~30 min; platelet function impaired 12\u201348+ hours" },
      { label: "Clearance", value: "Not renally cleared; no dose adjustment for renal impairment" },
      { label: "Reversal", value: "Platelet transfusion can restore aggregation (drug redistributes to new platelets)" },
    ],
    highlight: false,
  },
];

export default function EptifibatideOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          A hospital IV anticoagulant, not a community peptide \u2014 included here to illustrate how cyclic peptides become precision receptor antagonists.
        </div>
        <div className="reta-overview__headline-sub">
          Eptifibatide (Integrilin) is a cyclic heptapeptide engineered to mimic the fibrinogen sequence that binds GPIIb/IIIa \u2014 the integrin receptor that is the final obligatory step in platelet aggregation. By blocking GPIIb/IIIa, eptifibatide prevents platelets from aggregating regardless of which upstream trigger activated them. It is FDA-approved for acute coronary syndromes and PCI and is administered by IV infusion in hospital cardiac care units with continuous monitoring. This is not a community peptide and has no enhancement application. Its interest lies in how peptide chemistry enables receptor-specific pharmacology: a 7-amino-acid cyclic peptide that outcompetes fibrinogen for a critical integrin receptor, reversibly, with a 2.5-hour half-life. That precision is the lesson here.
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
      <div className="reta-overview__section-label">Is this relevant to your situation?</div>
      <div className="reta-overview__fit">
        <div className="reta-overview__fit-col reta-overview__fit-col--yes">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">&#x2713;</span> Relevant if&hellip;
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_YES.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="reta-overview__fit-col reta-overview__fit-col--no">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">&#x2717;</span> Not the right frame if&hellip;
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_NO.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="reta-overview__section-label">Clinical use \u2014 what happens in the hospital</div>
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
      <div className="reta-overview__section-label">GPIIb/IIIa inhibitor comparison</div>
      <div className="reta-overview__compare-note">
        The three GPIIb/IIIa inhibitors differ fundamentally in molecular structure and binding reversibility. Eptifibatide and tirofiban are reversible competitive inhibitors with short half-lives; abciximab is an irreversible antibody fragment with prolonged platelet effects. Choice in practice depends on the clinical scenario (need for reversibility, cost, renal function) and institutional protocols. The class as a whole has narrowed in use as potent oral P2Y12 inhibitors have become first-line antiplatelet therapy in ACS.
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
