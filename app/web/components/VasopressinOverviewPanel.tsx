/**
 * VasopressinOverviewPanel — decision-oriented overview for Vasopressin (ADH).
 * Key frame: FDA-approved antidiuretic hormone with V1a/V1b/V2 receptor divergence;
 * community interest in intranasal analogs for cognition/social bonding is a significant
 * extrapolation from the oxytocin research paradigm — the receptor profiles differ.
 */

const STAT_CARDS = [
  {
    value: "V1a / V1b / V2",
    label: "receptor divergence — vasoconstriction, ACTH/cortisol, and renal water retention are separate pharmacological axes",
    sub: "Vasopressin (arginine vasopressin, AVP) is a 9-amino-acid cyclic peptide produced in the hypothalamus and released from the posterior pituitary. V1a receptors mediate vasoconstriction (vascular smooth muscle) and glycogenolysis; V1b (also called V3) receptors mediate ACTH and cortisol release from the pituitary; V2 receptors mediate renal water reabsorption by upregulating aquaporin-2 water channels in collecting duct cells. These three receptor axes produce very different physiological effects and different clinical applications — understanding which receptor is being targeted clarifies both the use case and the risk profile.",
    note: "The V1a/V2 receptor divergence is essential context for community interest in vasopressin. The cognitive and social bonding research interest centers on V1b/CNS receptors, which are pharmacologically distinct from V2 (water retention) and V1a (vasoconstriction). These receptor-specific effects cannot be separated with native vasopressin — any exogenous vasopressin will hit all three receptor populations. This is a fundamental limitation of comparing vasopressin to oxytocin in the social cognition context.",
  },
  {
    value: "ADH / water retention",
    label: "primary endogenous role — antidiuretic hormone; V2-mediated renal water reabsorption",
    sub: "Vasopressin's most well-characterized physiological role is as antidiuretic hormone (ADH). V2 receptor activation in renal collecting duct cells triggers aquaporin-2 insertion into the apical membrane, dramatically increasing water permeability and concentrating urine. Deficiency causes diabetes insipidus (DI) — polyuria and polydipsia from inability to concentrate urine. This mechanism is FDA-approved with vasopressin injection for DI management. The analog desmopressin (DDAVP) is more selective for V2 (reduced V1a vasoconstriction) and is the preferred clinical agent for DI.",
    note: "The ADH function is why hyponatremia is a real risk with excess vasopressin activity — excess water retention dilutes serum sodium. This V2-mediated effect is not separable from other receptor effects with native vasopressin. Anyone taking vasopressin and drinking excess water risks clinically dangerous sodium dilution.",
  },
  {
    value: "Memory consolidation (research)",
    label: "V1b/CNS research interest — memory and stress response; less consistent than oxytocin parallel narrative",
    sub: "Community interest in vasopressin focuses on V1b/CNS receptors and rodent research showing AVP facilitates memory consolidation, spatial memory, and social recognition. AVP-immunoreactive neurons in the hippocampus and amygdala contribute to these proposed effects. Some human studies have examined intranasal vasopressin for social cognition — results are inconsistent. The comparison to oxytocin research is frequently made but misrepresents the pharmacology: vasopressin and oxytocin are structurally similar (two amino acid differences) but have distinct receptor selectivity profiles. Oxytocin research showing social bonding effects does not translate directly to vasopressin.",
    note: "The rodent memory consolidation data for AVP is more consistent than the human data. Human studies with intranasal vasopressin for social cognition have produced mixed results — some positive, some null, some showing unexpected effects (vasopressin reduced facial emotion processing in some studies). The narrative that vasopressin is 'like oxytocin but for men' or 'the social bonding peptide' significantly overstates the current evidence.",
  },
  {
    value: "FDA-approved (DI, shock)",
    label: "regulatory status — approved for diabetes insipidus and vasodilatory shock; intranasal cognitive use is entirely off-label",
    sub: "Vasopressin has FDA approval for: (1) diabetes insipidus (deficiency replacement); (2) vasodilatory shock (vasopressin injection in critical care — V1a vasoconstriction to restore blood pressure when catecholamines are insufficient); and (3) control of bleeding from esophageal varices. The cognitive/social interest is extrapolation from research, not an approved indication. The preferred clinical DI agent is desmopressin (DDAVP), which has better V2 selectivity. Community use of intranasal vasopressin for cognition is not supported by approved indications.",
    note: "FDA approval for DI and shock reflects well-characterized V2 and V1a pharmacology, respectively. These are serious medical conditions managed in clinical contexts. The community interest in cognitive enhancement is a research-stage extrapolation without a comparable evidence base.",
  },
];

const FIT_YES = [
  "Diabetes insipidus management under physician prescription — V2-mediated water retention is well-characterized; desmopressin (DDAVP) is the preferred V2-selective analog but vasopressin injection is also approved",
  "Understanding the ADH/water retention axis — V2 pharmacology is among the most well-characterized receptor mechanisms in clinical endocrinology",
  "Research context for V1b/CNS effects — if engaging with the memory consolidation literature and primary research rather than community narratives",
  "Vasodilatory shock management in critical care — V1a vasoconstriction mechanism is well-established for this indication under physician oversight",
];

const FIT_NO = [
  "Anyone substituting vasopressin for oxytocin expecting equivalent social bonding or emotional effects — they differ by two amino acids but have distinct receptor selectivity profiles; the pharmacology is not equivalent",
  "Cognitive or social bonding enhancement without physician oversight — the human intranasal vasopressin for cognition literature is inconsistent, and V1a vasoconstriction and hyponatremia risk are real at any dose affecting V2",
  "Anyone with hypertension or cardiovascular disease — V1a vasoconstriction is a real pharmacological effect that will elevate blood pressure; this is not a safe compound for unmonitored use with pre-existing cardiovascular conditions",
  "Expecting vasopressin to work like desmopressin — desmopressin is a synthetic analog specifically engineered to reduce V1a vasoconstriction while maintaining V2 selectivity; native vasopressin activates all three receptor populations",
];

const TIMELINE = [
  {
    phase: "Acute (minutes to 1 hour)",
    heading: "Rapid V1a and V2 onset — vasoconstriction and antidiuretic effects",
    body: "Vasopressin has a short half-life in circulation (10-20 minutes for native peptide). IV administration produces rapid vasoconstriction via V1a. Intranasal delivery achieves variable CNS vs. peripheral distribution — intranasal vasopressin studies measure cognitive/behavioral effects within 30-60 minutes. The antidiuretic V2 effect is more sustained when V2 receptors are activated. Community protocols for cognitive effects use intranasal delivery where CNS penetration is the proposed mechanism, but systemic absorption producing V1a and V2 effects simultaneously occurs.",
  },
  {
    phase: "Hours to days",
    heading: "V2 water retention effects — hyponatremia risk window",
    body: "V2-mediated water retention continues beyond the peptide half-life due to aquaporin-2 upregulation in renal cells. Hyponatremia risk (sodium dilution from excess water retention) is a real concern, especially with high fluid intake. This is the window during which electrolyte monitoring would be relevant for anyone using vasopressin. The acute V1a vasoconstriction diminishes faster than the V2 renal effect.",
  },
  {
    phase: "Long-term",
    heading: "No established long-term community use data",
    body: "Long-term use of exogenous vasopressin outside of diabetes insipidus replacement context is not characterized. Chronic V2 stimulation with adequate fluid intake risks recurrent dilutional hyponatremia. Cardiovascular effects from recurrent V1a stimulation have not been studied in healthy individuals. The cognitive/memory effects that motivate community interest have no long-term human efficacy or safety characterization.",
  },
];

const COMPARISON = [
  {
    name: "Vasopressin (AVP)",
    badge: "Endogenous / FDA-approved (DI, shock) / Multi-receptor",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Receptor profile", value: "V1a (vasoconstriction), V1b (ACTH/cortisol), V2 (water retention) — cannot selectively target one receptor" },
      { label: "Clinical use", value: "FDA-approved: DI, vasodilatory shock, esophageal variceal bleeding; cognitive use is off-label research extrapolation" },
      { label: "Key risk", value: "V1a vasoconstriction (hypertension); V2 hyponatremia (water retention + high fluid intake = sodium dilution)" },
      { label: "Half-life", value: "~10-20 minutes (native peptide); intranasal achieves CNS delivery with variable systemic absorption" },
      { label: "Cognitive evidence", value: "Inconsistent human data; some positive, some null, some unexpected negative effects on emotion processing" },
    ],
    highlight: true,
  },
  {
    name: "Oxytocin",
    badge: "Endogenous / FDA-approved (labor, lactation) / Distinct receptor",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Receptor profile", value: "OTR (oxytocin receptor) — structurally related to V1/V2 but distinct; minimal vasopressin receptor activity" },
      { label: "Clinical use", value: "FDA-approved: labor induction, postpartum hemorrhage, lactation; community intranasal use for social bonding" },
      { label: "Key risk", value: "Hyponatremia (same V2-adjacent mechanism); uterine hyperstimulation in pregnancy; less vasoconstriction than vasopressin" },
      { label: "Half-life", value: "~1-6 minutes IV; intranasal achieves CNS delivery via olfactory/trigeminal routes" },
      { label: "Cognitive evidence", value: "More human data than vasopressin for social cognition; also inconsistent — trust effects, fear reduction mixed" },
    ],
    highlight: false,
  },
  {
    name: "Desmopressin (DDAVP)",
    badge: "Synthetic analog / FDA-approved / V2-selective",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Receptor profile", value: "V2-selective — engineered to reduce V1a vasoconstriction; preferred DI clinical agent" },
      { label: "Clinical use", value: "FDA-approved: diabetes insipidus, nocturnal enuresis, hemophilia A (von Willebrand factor release via V2)" },
      { label: "Key risk", value: "Hyponatremia (V2-mediated water retention without V1a counterbalance); children and elderly at higher risk" },
      { label: "Half-life", value: "~3 hours — significantly longer than native vasopressin; V2 selectivity maintained" },
      { label: "Cognitive evidence", value: "Not studied for cognition — clinical use is specifically for V2 indications; cognitive interest is for native AVP" },
    ],
    highlight: false,
  },
];

export default function VasopressinOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The antidiuretic hormone with separate vasoconstriction and memory effects — V1 and V2 receptor divergence defines both the clinical uses and the community interest.
        </div>
        <div className="reta-overview__headline-sub">
          Vasopressin is an endogenous 9-amino-acid cyclic peptide with FDA approval for diabetes insipidus, vasodilatory shock, and esophageal variceal bleeding. Its three receptor subtypes produce pharmacologically distinct effects that cannot be selectively targeted with native vasopressin: V1a drives vasoconstriction (the mechanism behind its shock indication), V1b modulates ACTH/cortisol stress responses, and V2 drives renal water reabsorption (the mechanism behind its DI indication). Community interest centers on intranasal vasopressin for cognition and social bonding, extrapolating from the oxytocin research paradigm — but vasopressin and oxytocin differ by two amino acids in ways that matter pharmacologically. The cognitive evidence in humans is inconsistent, and V1a vasoconstriction creates a real cardiovascular signal that does not exist with oxytocin.
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
      <div className="reta-overview__section-label">Vasopressin vs Oxytocin vs Desmopressin</div>
      <div className="reta-overview__compare-note">
        Three structurally related peptides with meaningfully different receptor selectivity and clinical applications. Vasopressin hits all three receptor populations simultaneously. Oxytocin has a distinct receptor and is the more studied compound for social cognition — but results are also inconsistent. Desmopressin is the synthetic V2-selective analog preferred for DI management, with reduced vasoconstriction liability.
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
