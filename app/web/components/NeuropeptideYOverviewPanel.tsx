/**
 * NeuropeptideYOverviewPanel — decision-oriented overview for Neuropeptide Y (NPY).
 * Key frame: most abundant neuropeptide in the brain; potent appetite stimulator (Y1/Y5);
 * stress resilience signal centrally (Y2 anxiolytic); vasoconstrictor peripherally;
 * receptor selectivity for therapeutic effect is not achievable with systemic NPY;
 * no FDA-approved NPY-targeting drugs exist.
 */

const STAT_CARDS = [
  {
    value: "Y1/Y2/Y4/Y5 receptor family",
    label: "mechanism — Y-receptor family activation; effects depend on which receptor subtype is engaged",
    sub: "NPY is a 36-amino-acid peptide that is one of the most abundant neuropeptides in the mammalian brain. It signals through a family of G-protein coupled receptors: Y1R (appetite stimulation, anxiogenic, vasoconstriction), Y2R (appetite inhibition at presynaptic sites, anxiolytic, cardiovascular), Y4R (satiety, pancreatic function), and Y5R (appetite stimulation, energy balance). The physiological effects of NPY are therefore receptor-subtype-dependent and anatomically dependent — the same peptide produces opposing effects depending on which receptor in which tissue is activated. Y1R and Y5R in the hypothalamic arcuate nucleus drive appetite; Y2R in the same region acts presynaptically to reduce NPY release (autoreceptor inhibition). This complexity means systemic NPY administration activates all receptor subtypes simultaneously, producing a mixed pharmacological profile.",
    note: "The receptor subtype complexity is the central pharmacological challenge for NPY therapeutics. Pharmaceutical companies have attempted to develop Y1R antagonists (for obesity — blocking appetite), Y2R agonists (for appetite suppression and anxiolytic effects), and Y4R analogs (for satiety). None have reached FDA approval. The inability to achieve receptor selectivity without subtype-selective synthetic molecules means that systemic exogenous NPY produces a non-selective activation of Y1/Y2/Y4/Y5 — with appetite stimulation from Y1/Y5 and vasoconstriction from Y1 being the primary peripheral effects.",
  },
  {
    value: "Most potent appetite stimulator known",
    label: "Y1/Y5 arcuate nucleus activation — injection into the hypothalamus produces massive feeding behavior",
    sub: "NPY is one of the most potent appetite stimulators known in biology. Injection of NPY directly into the arcuate nucleus of the hypothalamus in rodents produces immediate, massive feeding behavior — far stronger than other known appetite-stimulating compounds. Y1R and Y5R in the hypothalamic appetite circuits drive this effect. The physiological role of NPY in appetite is to signal caloric deficit — NPY is released from arcuate nucleus neurons when the brain detects low nutrient availability (low leptin, high ghrelin). This appetite-stimulating signal is part of the fasting response. In practical terms: community injection of NPY would be expected to strongly stimulate appetite. For most community use cases (weight management, metabolic optimization), this is directly counterproductive.",
    note: "The NPY/AGRP neuron population in the arcuate nucleus (which co-expresses NPY and AgRP) is the primary hunger-driving circuit in the hypothalamus. These neurons are the same neurons that GLP-1 receptor agonists suppress — one of the mechanisms by which semaglutide and tirzepatide reduce appetite is by reducing NPY/AGRP neuron activity. NPY injection would directly oppose GLP-1 drug mechanisms in the appetite circuit, which is highly relevant to anyone using GLP-1 agonists.",
  },
  {
    value: "Stress resilience signal (central Y2/Y5)",
    label: "counterintuitive: higher NPY levels correlate with better stress coping in military/PTSD cohorts",
    sub: "The stress-resilience story for NPY is one of the more counterintuitive findings in stress neuroscience. Multiple studies in military personnel and combat veterans have found that higher NPY plasma levels correlate with lower PTSD severity, better stress coping, and reduced anxiety response during stress exposure. Rasmusson et al. (2000) found that NPY levels increase in soldiers after special forces training and remain elevated in those with better stress resilience. NPY appears to counteract CRF (corticotropin-releasing factor) in the locus coeruleus — NPY is anxiolytic at Y2R in noradrenergic nuclei while CRF is anxiogenic. This makes NPY a stress buffer — an endogenous resilience mechanism.",
    note: "The stress resilience data creates a misleading therapeutic logic: if high NPY is associated with good stress coping, perhaps raising NPY would be therapeutic. The problem is that systemic NPY injection does not selectively activate Y2R in the locus coeruleus — it activates all Y receptors, including Y1R (appetite, anxiogenic in some contexts) and peripheral Y1R (vasoconstriction). The anxiolytic Y2R effect from systemic NPY would be confounded by Y1R appetite stimulation and cardiovascular effects. Y2R selective agonists would be the therapeutic direction for anxiolytic purposes — not systemic NPY.",
  },
  {
    value: "Peripheral vasoconstriction (Y1R)",
    label: "cardiovascular risk — NPY co-released with norepinephrine from sympathetic neurons; direct vasoconstriction",
    sub: "NPY is co-stored and co-released with norepinephrine from sympathetic nerve terminals throughout the cardiovascular system. Peripheral Y1R activation causes direct arterial vasoconstriction — NPY is one of the most potent endogenous vasoconstrictors known. During sympathetic stress responses, NPY augments the vasoconstriction from norepinephrine. Community injection of NPY would produce significant peripheral Y1R activation: vasoconstriction, blood pressure elevation, and coronary artery constriction. This is not a theoretical concern — it is the characterized peripheral pharmacology of NPY acting on the abundant Y1R receptors in vascular smooth muscle.",
    note: "The co-release of NPY with norepinephrine during sympathetic activation means that endogenous NPY levels are already elevated during stress responses. Adding exogenous NPY on top of an already sympathetically activated state (exercise, stress) would produce additive vasoconstriction. The pressor effects of NPY have been studied in human volunteers with intravenous infusions — blood pressure and vascular resistance increase with NPY administration. This is a documented human pharmacological effect, not an animal extrapolation.",
  },
];

const FIT_YES = [
  "Research education context — understanding NPY pharmacology is foundational to understanding appetite regulation, stress neuroscience, the hypothalamic energy balance circuits, and why GLP-1 drugs work (they suppress NPY/AGRP neurons)",
  "Understanding stress resilience neuroscience — the NPY/CRF balance in the locus coeruleus is one of the mechanistic substrates of stress resilience; this is important context for PTSD research and stress biology",
  "Investigating Y receptor subtype pharmacology — the Y1/Y2/Y4/Y5 receptor family is a druggable target class; understanding which subtype does what is relevant to evaluating future NPY-targeting drugs as they emerge from clinical development",
  "Context for interpreting GLP-1 drug mechanisms — GLP-1 receptor agonists (semaglutide, tirzepatide) suppress appetite partly through hypothalamic NPY/AGRP circuit inhibition; NPY knowledge contextualizes this mechanism",
];

const FIT_NO = [
  "Community injection for any purpose — systemic NPY activates all Y receptors simultaneously; the appetite-stimulating effect (Y1/Y5) is the dominant peripheral outcome and directly counterproductive for most community use cases",
  "Weight management or metabolic optimization — NPY is the strongest appetite stimulator known; injecting it is the opposite of what GLP-1 drugs and most metabolic optimization strategies aim to achieve",
  "Anxiolytic or stress-relief purposes — Y2R anxiolytic effects from systemic NPY would be mixed with Y1R appetite and cardiovascular effects; Y2R-selective agonists would be required for therapeutic anxiolytic effect, and these do not exist as approved compounds",
  "Cardiovascular or hypertensive context — NPY is a potent vasoconstrictor via peripheral Y1R; injection produces blood pressure elevation; this directly opposes antihypertensive therapy and is dangerous in cardiovascular disease",
];

const TIMELINE = [
  {
    phase: "Acute (minutes, IV infusion studies)",
    heading: "Peripheral Y1R vasoconstriction — blood pressure and vascular resistance increase",
    body: "Human pharmacokinetic studies of intravenous NPY infusion have characterized acute effects: blood pressure elevation, increased vascular resistance, and reduced peripheral blood flow from Y1R-mediated vasoconstriction. These effects begin within minutes of administration and are dose-dependent. The appetite-stimulating effects of central NPY require CNS penetration — whether subcutaneous NPY reaches hypothalamic appetite circuits is unclear (same BBB penetration question as orexin-A). If NPY does not cross the BBB, the acute effects would be dominated by peripheral Y1R vasoconstriction.",
  },
  {
    phase: "Acute to subacute (appetite effects)",
    heading: "Appetite stimulation — if CNS penetration occurs; hypothalamic Y1/Y5 activation",
    body: "If subcutaneous NPY reaches hypothalamic NPY receptors (which requires BBB penetration of this 36-amino-acid peptide — uncertain), the effect would be potent appetite stimulation via Y1R and Y5R in the arcuate nucleus. This would manifest as intense hunger and food-seeking behavior. The magnitude in animal studies is among the largest appetite effects of any known compound — animals injected with NPY intra-arcuately eat enormous meals. Whether similar magnitudes occur with subcutaneous injection and partial BBB penetration is not established.",
  },
  {
    phase: "Long-term considerations",
    heading: "Y receptor desensitization and compensatory responses — unknown for community dosing",
    body: "The Y receptor system has complex regulatory dynamics — repeated NPY stimulation can cause Y1R desensitization at some sites, potentially reducing vasoconstriction over time but also potentially reducing the stress-resilience Y2R effects. Long-term cardiovascular consequences of repeated NPY-driven vasoconstriction and sympathetic activation are not characterized for community dosing patterns. NPY's role in the HPA axis (NPY inhibits CRF release in the PVN — a stress-buffering effect) means that chronic exogenous NPY could alter cortisol regulation through HPA axis modulation.",
  },
];

const COMPARISON = [
  {
    name: "Neuropeptide Y (systemic injection)",
    badge: "Y1/Y2/Y4/Y5 pan-agonist / No therapeutic use / Appetite stimulator and vasoconstrictor",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Non-selective Y1/Y2/Y4/Y5 activation — appetite stimulation (Y1/Y5), vasoconstriction (peripheral Y1), stress modulation (central Y2)" },
      { label: "Expected peripheral effects", value: "Vasoconstriction (blood pressure elevation), appetite stimulation if CNS penetration occurs, sympathetic augmentation" },
      { label: "Therapeutic direction", value: "None for systemic administration — receptor selectivity required for any therapeutic benefit cannot be achieved with systemic NPY" },
      { label: "Evidence for injection use", value: "No human RCTs; human IV infusion studies characterize peripheral cardiovascular effects; no wellness or performance indication" },
      { label: "Status", value: "Research compound; no FDA-approved NPY-targeting therapeutics; not a community injection candidate" },
    ],
    highlight: true,
  },
  {
    name: "GLP-1 receptor agonists (semaglutide, tirzepatide)",
    badge: "Opposing appetite mechanism / FDA-approved / NPY/AGRP circuit suppression",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GLP-1R agonism suppresses NPY/AGRP neurons in arcuate nucleus — activating the circuit that opposes NPY's appetite-stimulating effect" },
      { label: "Expected effects", value: "Appetite reduction (15-22% weight loss), glycemic improvement, cardiovascular benefit (semaglutide SELECT trial)" },
      { label: "Therapeutic direction", value: "Opposite to NPY — GLP-1 drugs suppress the very circuit that NPY activates; understanding NPY explains why GLP-1 drugs work" },
      { label: "Evidence", value: "Strong: FDA-approved; Phase 3 RCTs; STEP, SURMOUNT outcome trials" },
      { label: "Status", value: "FDA-approved; standard of care for obesity and T2D; benchmark for appetite modification pharmacology" },
    ],
    highlight: false,
  },
  {
    name: "CRF (Corticotropin-releasing factor) — stress axis comparison",
    badge: "Stress axis counterpart / NPY opposes CRF in locus coeruleus",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "CRF activates HPA axis (cortisol) and noradrenergic arousal (locus coeruleus); NPY counteracts CRF in the locus coeruleus — NPY/CRF balance determines stress response magnitude" },
      { label: "Stress role", value: "CRF is the pro-stress signal; NPY is the buffering signal that limits CRF-driven anxiety and arousal; together they regulate stress response intensity" },
      { label: "Therapeutic interest", value: "CRF receptor antagonists are studied for PTSD and anxiety; NPY-based approaches for stress resilience are in early research; neither is an approved community therapy" },
      { label: "PTSD relevance", value: "Lower NPY / higher CRF ratio is associated with greater PTSD severity and stress vulnerability; this is correlation, not a therapeutic direction for systemic NPY" },
      { label: "Status", value: "Research context only — no approved CRF antagonists or NPY-targeting drugs for stress; remains an active area of drug discovery" },
    ],
    highlight: false,
  },
];

export default function NeuropeptideYOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The brain&apos;s most abundant neuropeptide — appetite stimulator and vasoconstrictor peripherally; stress resilience signal centrally; the therapeutic direction is uncertain and systemic injection counterproductive.
        </div>
        <div className="reta-overview__headline-sub">
          Neuropeptide Y (NPY) is one of the most abundant and multifunctional neuropeptides in the mammalian brain. Through a family of Y receptors (Y1-Y5), it drives appetite (Y1/Y5 in the hypothalamic arcuate nucleus — among the most potent appetite signals known), causes peripheral vasoconstriction (Y1 in vascular smooth muscle — co-released with norepinephrine from sympathetic neurons), and buffers stress responses centrally (Y2 in the locus coeruleus — the anxiolytic/resilience signal associated with lower PTSD severity). Systemic NPY injection activates all receptors simultaneously — the appetite stimulation and vasoconstriction from non-selective Y-receptor activation make systemic NPY counterproductive for virtually all community use cases. No FDA-approved NPY-targeting drugs exist. The receptor subtype selectivity required for therapeutic benefit cannot be achieved with systemic NPY administration.
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
      <div className="reta-overview__section-label">NPY (systemic injection) vs GLP-1 agonists vs CRF stress axis</div>
      <div className="reta-overview__compare-note">
        NPY and GLP-1 agonists are pharmacologically opposing forces in the hypothalamic appetite circuit — GLP-1 drugs work partly by suppressing NPY/AGRP neurons. Understanding NPY illuminates why GLP-1 drugs are effective. The NPY/CRF balance in the locus coeruleus is the stress resilience mechanism — elevated NPY is a resilience marker, not a direction for systemic NPY administration. No therapeutic application of systemic NPY exists; the drug discovery interest is in receptor-selective Y-subtype agents.
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
