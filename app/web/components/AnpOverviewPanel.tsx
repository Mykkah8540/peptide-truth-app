/**
 * AnpOverviewPanel — decision-oriented overview for Atrial Natriuretic Peptide (ANP).
 * Key frame: 28-AA cardiac hormone with a 2-3 minute half-life; endogenous
 * volume regulator used clinically only as IV infusion for acute heart failure.
 * Subcutaneous injection of native ANP is pharmacokinetically irrational.
 */

const STAT_CARDS = [
  {
    value: "NPR-A receptor",
    label: "natriuretic peptide receptor A — cGMP-mediated natriuresis, vasodilation, RAAS inhibition",
    sub: "ANP (atrial natriuretic peptide) is a 28-amino-acid endogenous hormone released from atrial cardiomyocytes in response to atrial wall stretch from volume overload. It acts primarily on NPR-A (natriuretic peptide receptor A), a guanylyl cyclase receptor. NPR-A activation produces cGMP, which drives natriuresis (sodium excretion in the kidney), diuresis, vasodilation (vascular smooth muscle relaxation), and inhibition of the renin-angiotensin-aldosterone system (RAAS). The net physiological effect is volume reduction, blood pressure lowering, and relief of the volume overload that caused ANP release — a classical negative feedback loop.",
    note: "NPR-A receptor signaling is well-characterized. The downstream cGMP production, natriuresis via NKCC2 and NHE3 inhibition in the kidney, and RAAS suppression are mechanistic ground truth. This is not investigational pharmacology — it is the established physiology of one of the best-characterized cardiac hormones. The clinical applications build on this solid mechanism.",
  },
  {
    value: "2–3 minute half-life",
    label: "the defining pharmacokinetic constraint — IV context only; subcutaneous injection is pharmacokinetically irrational",
    sub: "Native ANP is cleared from circulation by two mechanisms: NPR-C (clearance receptor) internalization and neutral endopeptidase (neprilysin) degradation. The combined effect is a plasma half-life of approximately 2-3 minutes. This extreme brevity means that native ANP cannot maintain physiological concentrations from any intermittent dosing route — by the time subcutaneous injection achieves any peak, the peptide is largely cleared before systemic circulation delivers it to target organs. Clinical applications use continuous IV infusion, which maintains steady-state drug levels. Neprilysin inhibitor development (sacubitril/valsartan, Entresto) was specifically designed to extend endogenous natriuretic peptide half-life by blocking their clearance.",
    note: "The 2-minute half-life is not a modifiable characteristic of native ANP — it is determined by the clearance receptor and neprilysin enzyme that are constitutively active. Community subcutaneous injection of native ANP is pharmacokinetically analogous to injecting something that degrades completely within 2-3 minutes. The effective dose reaching target organs after subcutaneous injection, accounting for this degradation during absorption, is expected to be negligible. This is the same constraint that makes native somatostatin impractical for injection — and why octreotide (a stable analog) replaced it clinically.",
  },
  {
    value: "Carperitide / Nesiritide (analogs)",
    label: "clinical analogs — carperitide (Japan approval for heart failure); nesiritide (FDA-approved, withdrawn 2013)",
    sub: "The clinical applications of ANP pharmacology use synthetic analogs or recombinant human ANP, not native peptide: carperitide (recombinant human ANP) is approved in Japan for acute heart failure and is used as IV infusion; nesiritide (recombinant human BNP, a related natriuretic peptide) was FDA-approved for acute heart failure decompensation but was withdrawn from the market in 2013 following safety concerns from the ASCEND-HF trial (no mortality benefit, potential renal harm at higher doses). The clinical context is IV infusion in ICU/hospital settings for acute heart failure — emphatically not community injection.",
    note: "Nesiritide's market withdrawal is a clinically important data point. Even with IV-administered natriuretic peptide therapy under close hospital monitoring, safety concerns emerged. This underscores that the natriuretic peptide axis, while clearly important for volume regulation, has a narrow therapeutic window when pharmacologically augmented.",
  },
  {
    value: "BNP / ANP axis physiology",
    label: "natriuretic peptide family — ANP (atrial), BNP (ventricular), CNP (endothelial); distinct sources and clinical applications",
    sub: "ANP is produced by atrial cardiomyocytes; BNP (B-type natriuretic peptide) is produced primarily by ventricular cardiomyocytes in response to ventricular wall stress; CNP (C-type natriuretic peptide) is produced by endothelial cells and acts locally. BNP is the clinical biomarker for heart failure — elevated BNP levels diagnose and grade heart failure severity. The analog nesiritide (recombinant BNP) was used clinically. ANP and BNP have overlapping natriuretic effects but different clinical measurement utilities. Community interest sometimes conflates these peptides because they are functionally related.",
    note: "BNP measurement in clinical practice is for heart failure diagnosis and monitoring — not for self-measurement as a supplement target. ANP and BNP are important as biomarkers and as targets for drug development (neprilysin inhibitors that protect endogenous natriuretic peptides), but their use as injectable compounds for volume management outside of clinical settings is without rational support.",
  },
];

const FIT_YES = [
  "Research understanding of the natriuretic peptide axis — ANP physiology is foundational cardiology, and understanding how volume overload is sensed and corrected by cardiac hormones is genuinely interesting and relevant to heart failure pathophysiology",
  "Cardiology or cardiovascular medicine context — understanding carperitide (Japan-approved) and the natriuretic peptide axis pharmacology for heart failure management at the academic or clinical level",
  "Neprilysin inhibitor pharmacology context — the mechanism of sacubitril/valsartan (Entresto) is specifically to protect endogenous ANP and BNP from neprilysin degradation; understanding ANP is essential to understanding this drug class",
];

const FIT_NO = [
  "Any community injection of native ANP — the 2-3 minute half-life makes subcutaneous injection pharmacokinetically irrational; the peptide degrades before achieving meaningful systemic effect; this is not a compound with a viable injection use case",
  "Volume or blood pressure management outside of clinical/hospital settings — acute heart failure requiring natriuretic peptide therapy is a medical emergency requiring IV infusion under continuous monitoring; community management of cardiovascular conditions with peptides is categorically inappropriate",
  "Blood pressure reduction in a community context — vasodilation and natriuresis from ANP would require continuous IV infusion to maintain; any subcutaneous dose produces a transient effect measured in minutes at best",
  "Anyone conflating ANP with BNP with carperitide — these are related but distinct peptides with different clinical applications; natriuretic peptide pharmacology requires the right agent in the right clinical context",
];

const TIMELINE = [
  {
    phase: "Seconds to 2-3 minutes",
    heading: "Rapid onset and clearance — the entire pharmacological window of native ANP",
    body: "Native ANP's entire plasma half-life is 2-3 minutes. In IV infusion, this means that peak effect and offset occur within minutes of starting or stopping the infusion — allowing tight clinical titration in the ICU. In any intermittent dosing scenario (subcutaneous injection), this half-life means the compound is substantially degraded before absorption is complete. The clinical utility of native ANP depends entirely on the continuous IV infusion route that maintains steady-state levels.",
  },
  {
    phase: "During IV infusion (clinical context only)",
    heading: "Dose-dependent natriuresis, vasodilation, and RAAS suppression",
    body: "In the clinical setting with IV ANP or analog infusion, effects are dose-dependent and include: increased urine sodium excretion, increased urine output, systemic vasodilation with blood pressure reduction, and suppression of renin, aldosterone, and endothelin. These effects are predictable from the NPR-A mechanism and are continuously titrated based on blood pressure, urine output, and hemodynamic monitoring in the hospital setting. These are not effects achievable or manageable outside of clinical monitoring.",
  },
  {
    phase: "After infusion cessation (clinical context only)",
    heading: "Rapid offset — effects resolve within minutes of stopping infusion",
    body: "The 2-3 minute half-life means ANP's pharmacological effects resolve rapidly after IV infusion is stopped. Blood pressure returns toward baseline, natriuresis decreases, and RAAS resuppression lifts — within minutes. This rapid reversibility is both a clinical advantage (precise control) and evidence of why intermittent dosing makes no pharmacological sense. The effects cannot be sustained by periodic injection.",
  },
];

const COMPARISON = [
  {
    name: "ANP (native)",
    badge: "Endogenous cardiac hormone / 2-3 min half-life / IV only",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Mechanism", value: "NPR-A → cGMP → natriuresis, vasodilation, RAAS inhibition" },
      { label: "Half-life", value: "2-3 minutes — makes subcutaneous injection pharmacokinetically irrational" },
      { label: "Clinical use", value: "IV infusion context only; carperitide (recombinant ANP, Japan-approved) for acute heart failure" },
      { label: "Community use", value: "No rational community injection use case — half-life precludes meaningful effect from intermittent dosing" },
      { label: "Regulatory status", value: "Carperitide: Japan-approved; native ANP: no US approval; research compound" },
    ],
    highlight: true,
  },
  {
    name: "BNP / Nesiritide",
    badge: "Ventricular natriuretic peptide / FDA-approved (withdrawn)",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Mechanism", value: "NPR-A (same as ANP) → natriuresis, vasodilation; longer half-life than ANP (~20 minutes)" },
      { label: "Half-life", value: "~18-22 minutes — longer than ANP but still requires IV infusion for clinical effect" },
      { label: "Clinical use", value: "Nesiritide (recombinant BNP): FDA-approved for acute HF, withdrawn 2013 after safety concerns (ASCEND-HF)" },
      { label: "Community use", value: "Withdrawn from market; IV-only regardless; no community use rationale" },
      { label: "Regulatory status", value: "Withdrawn; BNP remains a diagnostic biomarker, not a therapeutic agent in current use" },
    ],
    highlight: false,
  },
  {
    name: "Sacubitril/Valsartan (Entresto)",
    badge: "Neprilysin inhibitor / FDA-approved heart failure therapy",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Mechanism", value: "Sacubitril blocks neprilysin (degrades ANP/BNP) → extends endogenous natriuretic peptide half-life; valsartan blocks AT1R" },
      { label: "Half-life", value: "Oral daily dosing — the approach of blocking ANP degradation rather than injecting ANP itself" },
      { label: "Clinical use", value: "FDA-approved for heart failure with reduced ejection fraction (HFrEF); landmark PARADIGM-HF trial shows mortality benefit" },
      { label: "Community use", value: "Prescription heart failure medication; not a community peptide; the rational pharmacological approach to enhancing ANP effects" },
      { label: "Regulatory status", value: "FDA-approved; first-line for HFrEF per ACC/AHA guidelines" },
    ],
    highlight: false,
  },
];

export default function AnpOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          A 28-AA cardiac hormone with a 2-minute half-life — the endogenous volume regulator with no practical community injection use case.
        </div>
        <div className="reta-overview__headline-sub">
          Atrial natriuretic peptide (ANP) is a 28-amino-acid hormone released from the heart&apos;s atrial cardiomyocytes when they detect volume overload. Its NPR-A receptor mechanism drives natriuresis, vasodilation, and RAAS inhibition — reducing blood volume and pressure in a classic negative feedback loop. But native ANP has a plasma half-life of 2-3 minutes, cleared by the NPR-C receptor and neprilysin. This half-life makes subcutaneous injection pharmacokinetically irrational — the peptide degrades before achieving sustained systemic effect. Clinical applications use continuous IV infusion (carperitide, Japan-approved; or the BNP analog nesiritide, which was FDA-approved but withdrawn in 2013). The rational pharmacological approach to enhancing natriuretic peptide effects is sacubitril (Entresto) — blocking the neprilysin enzyme that degrades endogenous ANP and BNP. Community injection of native ANP has no viable pharmacological rationale.
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
      <div className="reta-overview__section-label">ANP vs BNP/Nesiritide vs Sacubitril/Valsartan</div>
      <div className="reta-overview__compare-note">
        Three natriuretic peptide-axis approaches. Native ANP and nesiritide (BNP analog) are both IV-only clinical compounds with 2-minute and 20-minute half-lives respectively — neither has a community injection use case. Sacubitril/valsartan (Entresto) is the rational pharmacological approach to extending endogenous ANP and BNP effects by blocking their clearance enzyme (neprilysin) — it is an FDA-approved oral heart failure medication with proven mortality benefit.
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
