/**
 * CalcitoninOverviewPanel — decision-oriented overview for Calcitonin.
 * Key frame: 32-AA thyroid C-cell peptide; anti-resorptive bone agent; salmon calcitonin
 * is 40-50x more potent than human calcitonin at the receptor; FDA withdrew the nasal
 * spray osteoporosis formulation in 2013 due to a cancer signal. FDA-approved for Paget's
 * disease and hypercalcemia of malignancy. Not a community use compound.
 */

const STAT_CARDS = [
  {
    value: "Calcitonin receptor (CALCR)",
    label: "mechanism — osteoclast inhibition, calcium lowering, renal calcium handling",
    sub: "Calcitonin is a 32-amino-acid peptide hormone secreted by parafollicular C cells of the thyroid gland. It acts on the calcitonin receptor (CALCR), a class B G-protein-coupled receptor. The primary pharmacological effects: osteoclast inhibition (reduces bone resorption — osteoclasts have CALCR and retract their ruffled border in response to calcitonin, halting bone matrix degradation); serum calcium lowering (secondary to reduced bone calcium efflux); renal calcium and phosphate effects at high pharmacological doses. Salmon calcitonin (from Atlantic salmon) has 40-50x higher receptor affinity than human calcitonin due to structural differences at receptor-binding residues, which is why salmon calcitonin is the clinically used formulation rather than human sequence.",
    note: "The anti-resorptive mechanism positions calcitonin alongside bisphosphonates and denosumab in the anti-resorptive drug class. However, calcitonin is a weaker anti-resorptive than bisphosphonates — the fracture reduction evidence for calcitonin in osteoporosis is less robust than for bisphosphonates, and bisphosphonates have become the preferred anti-resorptive. The malignancy signal that led to withdrawal of the osteoporosis nasal spray further limits calcitonin's role in bone disease management.",
  },
  {
    value: "Salmon > human: 40-50x potency",
    label: "formulation — salmon calcitonin (Miacalcin, Fortical) is the clinical compound; higher receptor affinity than human calcitonin",
    sub: "Commercial calcitonin preparations use salmon calcitonin (salcatonin) rather than human calcitonin because of substantially higher receptor affinity. Salmon and human calcitonin share about 50% amino acid sequence homology, but the salmon molecule fits the human calcitonin receptor with much higher affinity, producing equivalent clinical effects at substantially lower doses. This cross-species receptor affinity is a pharmacological curiosity that was exploited commercially. Antibody development against salmon calcitonin (a foreign protein) occurs in a proportion of patients with prolonged use, potentially reducing efficacy over time — not an issue with human calcitonin but a real consideration for salmon calcitonin immunogenicity.",
    note: "The immunogenicity issue — neutralizing antibodies against salmon calcitonin — is clinically relevant for long-term Paget's disease management. A proportion of patients (estimates range from 5-30%) develop antibodies that reduce calcitonin efficacy. Human calcitonin does not trigger these antibodies but is less potent. If a patient on salmon calcitonin shows apparent loss of efficacy over time, antibody testing can help distinguish true treatment failure from disease progression.",
  },
  {
    value: "FDA-approved (Paget's, hypercalcemia)",
    label: "regulatory status — approved for Paget's disease, hypercalcemia of malignancy; nasal spray osteoporosis use withdrawn 2013",
    sub: "Calcitonin has FDA-approved indications for: Paget's disease of bone (injectable salmon calcitonin, Miacalcin injection); hypercalcemia of malignancy (injectable — for acute management); and post-menopausal osteoporosis (nasal spray, Miacalcin nasal, Fortical nasal — but this indication has been effectively discontinued in the US after the FDA's 2013 recommendation). The injectable formulations for Paget's and hypercalcemia remain available. The withdrawal of the osteoporosis indication based on a cancer signal is the key regulatory event that defines the current standing of calcitonin in clinical medicine.",
    note: "The 2013 FDA advisory committee recommendation (and subsequent manufacturer withdrawal of the nasal spray for osteoporosis) is not a minor regulatory formality. Pooled analysis of multiple clinical trials showed higher rates of malignancy in calcitonin-treated subjects compared to placebo — the signal was not attributed to a specific cancer type but was consistent across studies. This represents a real regulatory finding that has effectively removed calcitonin from osteoporosis management in most contexts. Paget's disease and acute hypercalcemia uses remain because the risk-benefit calculation is different (serious diseases with no adequate alternatives).",
  },
  {
    value: "2013 cancer signal (nasal spray withdrawn)",
    label: "regulatory event — FDA withdrew calcitonin nasal spray osteoporosis approval; non-fatal malignancy rates higher in treated subjects",
    sub: "In 2012-2013, the FDA conducted a review of pooled clinical trial data from salmon calcitonin nasal spray trials for osteoporosis. The analysis found statistically higher rates of malignancies in calcitonin-treated subjects compared to placebo — approximately 2.4% malignancy rate in calcitonin vs 1.9% in placebo across pooled data. The finding was for non-fatal malignancies (various cancer types, no single type predominating). The FDA advisory committee voted that the benefit-risk profile no longer supported the osteoporosis indication. Most manufacturers withdrew the nasal spray osteoporosis formulations. The injectable formulations for Paget's and hypercalcemia were not withdrawn.",
    note: "The cancer signal magnitude is not enormous in absolute terms (0.5% excess malignancy in clinical trials), but the implication that calcitonin might promote malignancy through a receptor-mediated mechanism is a legitimate concern given that CALCR is expressed in various tissues including some tumors. The mechanism is not fully characterized. The lesson is that 'FDA-approved' status at a point in time is not permanent — regulatory safety evaluations continue after approval, and signals from post-marketing or pooled trial data can change the risk-benefit calculation.",
  },
];

const FIT_YES = [
  "You have Paget's disease of bone with active disease (elevated alkaline phosphatase, bone pain) and your physician has determined injectable calcitonin is appropriate — this is an FDA-approved indication with established evidence",
  "You have hypercalcemia of malignancy and are receiving acute management including injectable calcitonin — this is an FDA-approved indication for rapid calcium lowering in the emergency setting",
  "You have post-menopausal osteoporosis and cannot tolerate bisphosphonates or denosumab (the preferred anti-resorptive agents), and your physician is considering calcitonin as an alternative under close monitoring",
];

const FIT_NO = [
  "You are considering community self-injection of calcitonin for bone density, anti-aging, or any other purposes without physician oversight — the 2013 cancer signal makes the risk-benefit calculation for non-medical use unfavorable",
  "You have osteoporosis and bisphosphonates or denosumab are available and tolerated — calcitonin is inferior as an anti-resorptive and carries the cancer signal; other agents are preferred",
  "You are looking for a community peptide for bone optimization or athletic recovery — calcitonin is a pharmaceutical agent with documented regulatory safety concerns, not a performance compound",
  "You believe the withdrawn nasal spray is still an acceptable osteoporosis treatment choice on its own — the FDA withdrawal reflects a real safety signal that changed the benefit-risk calculation for this indication",
];

const TIMELINE = [
  {
    phase: "Hours (acute hypercalcemia)",
    heading: "Rapid calcium lowering — injectable calcitonin acts within hours",
    body: "For hypercalcemia of malignancy, injectable calcitonin is among the fastest-acting calcium-lowering agents — serum calcium begins falling within 2-4 hours of IV or subcutaneous injection. This rapid onset is the primary reason for its use in acute hypercalcemic crises (pending bisphosphonate effect onset, which requires 2-4 days). The calcium-lowering effect from a single dose is transient (24-48 hours), and tachyphylaxis develops rapidly with repeated doses. For sustained calcium management, bisphosphonates are used alongside calcitonin for the acute phase.",
  },
  {
    phase: "Days to weeks (Paget's)",
    heading: "Biochemical response in Paget's disease — alkaline phosphatase normalization over weeks",
    body: "For Paget's disease management, the response is measured biochemically by reduction in serum alkaline phosphatase (a marker of osteoclast activity and bone turnover). Symptom improvement (bone pain) may begin within days, but biochemical normalization of alkaline phosphatase takes weeks to months of regular calcitonin injection. Unlike bisphosphonates (which provide prolonged suppression from a single IV infusion or short oral course), calcitonin must be administered repeatedly to maintain suppression.",
  },
  {
    phase: "Months (bone density)",
    heading: "Modest anti-resorptive effect on bone density — slower, weaker than bisphosphonates",
    body: "For osteoporosis, calcitonin's anti-resorptive effect on bone mineral density is modest and slower than bisphosphonates. Studies showed small increases in lumbar spine BMD (approximately 1-2% per year) with nasal calcitonin, with inconsistent evidence for fracture reduction. Bisphosphonates typically produce 5-8% BMD improvement over 3 years with stronger fracture data. The weaker bone density effect combined with the 2013 cancer signal makes calcitonin a last-resort option rather than a first-line anti-resorptive.",
  },
  {
    phase: "Long-term",
    heading: "Antibody development — neutralizing antibodies may reduce efficacy in some patients",
    body: "With prolonged salmon calcitonin use (months to years), a proportion of patients develop neutralizing antibodies against the foreign salmon protein. These antibodies can reduce or eliminate the clinical response — apparent treatment failure in a patient who initially responded should prompt antibody testing. Antibody development does not occur with human calcitonin (self-protein) but human calcitonin's lower potency limits its practical utility. If antibodies develop to salmon calcitonin, switching to bisphosphonates or denosumab is the appropriate management.",
  },
];

const COMPARISON = [
  {
    name: "Calcitonin (salmon)",
    badge: "Anti-resorptive peptide / limited role post-2013",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.08)",
    rows: [
      { label: "Mechanism", value: "Calcitonin receptor (CALCR) → osteoclast inhibition; rapid calcium lowering; weaker anti-resorptive than bisphosphonates" },
      { label: "FDA status", value: "Approved for Paget's disease, hypercalcemia of malignancy; osteoporosis nasal spray withdrawn 2013 (cancer signal)" },
      { label: "Fracture data", value: "Weaker and more inconsistent than bisphosphonates for osteoporosis; fracture evidence not as robust" },
      { label: "Cancer signal", value: "2013 FDA pooled analysis showed higher malignancy rates in calcitonin-treated subjects — primary reason for osteoporosis withdrawal" },
      { label: "Current role", value: "Paget's disease, acute hypercalcemia; last-resort osteoporosis option only when preferred agents are not tolerated" },
    ],
    highlight: true,
  },
  {
    name: "Bisphosphonates (alendronate, zoledronic acid)",
    badge: "Anti-resorptive / first-line osteoporosis",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.08)",
    rows: [
      { label: "Mechanism", value: "Farnesyl pyrophosphate synthase inhibition → osteoclast apoptosis; more potent and durable anti-resorptive than calcitonin" },
      { label: "FDA status", value: "Approved for osteoporosis, Paget's disease, bone metastases, multiple indications — broader and more robust than calcitonin" },
      { label: "Fracture data", value: "Strong: alendronate reduces vertebral fracture by 47-70%, hip fracture by 40-50%; superiority over calcitonin well-documented" },
      { label: "Cancer signal", value: "No malignancy signal; long-term safety well-established over decades; atypical femur fracture risk with very prolonged use" },
      { label: "Current role", value: "First-line anti-resorptive for osteoporosis; Paget's disease (preferred over calcitonin); bone metastases" },
    ],
    highlight: false,
  },
  {
    name: "Denosumab (Prolia)",
    badge: "Anti-resorptive / RANK-L inhibitor",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.08)",
    rows: [
      { label: "Mechanism", value: "RANK-L monoclonal antibody → prevents osteoclast formation; fully different mechanism from calcitonin; injected every 6 months" },
      { label: "FDA status", value: "Approved for postmenopausal osteoporosis, male osteoporosis, glucocorticoid-induced osteoporosis, bone metastases" },
      { label: "Fracture data", value: "Strong: 68% vertebral fracture reduction, 40% hip fracture reduction (FREEDOM trial); superior to calcitonin" },
      { label: "Cancer signal", value: "No malignancy signal from denosumab mechanism; long-term safety data from large RCTs and extensions" },
      { label: "Current role", value: "Second-line after bisphosphonates or first-line when bisphosphonates are contraindicated; rebound fracture risk on discontinuation" },
    ],
    highlight: false,
  },
];

export default function CalcitoninOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The osteoclast-inhibiting thyroid hormone — anti-resorptive bone agent with FDA-approved uses in Paget&apos;s disease and hypercalcemia; the nasal spray osteoporosis use was withdrawn in 2013 following a pooled clinical trial cancer signal; bisphosphonates are the preferred anti-resorptives.
        </div>
        <div className="reta-overview__headline-sub">
          Calcitonin is a 32-amino-acid peptide hormone that inhibits osteoclast activity through the calcitonin receptor, acutely lowers serum calcium, and reduces bone resorption. Salmon calcitonin is the clinical formulation due to its 40-50x higher receptor affinity compared to human calcitonin. FDA approval exists for Paget&apos;s disease and hypercalcemia of malignancy. The osteoporosis nasal spray (Miacalcin, Fortical) was effectively withdrawn from the market following the FDA&apos;s 2013 finding of higher malignancy rates in pooled clinical trial data. Calcitonin is a pharmaceutical compound with a documented safety signal — not a community optimization compound. When anti-resorptive therapy is clinically indicated, bisphosphonates and denosumab have substantially stronger evidence and no cancer signal.
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
      <div className="reta-overview__section-label">Calcitonin vs Bisphosphonates vs Denosumab</div>
      <div className="reta-overview__compare-note">
        All three are anti-resorptive agents targeting osteoclast activity through different mechanisms. Calcitonin is the weakest with a cancer signal that limits its osteoporosis role. Bisphosphonates are first-line for osteoporosis with decades of fracture reduction evidence. Denosumab is the most potent anti-resorptive with strong fracture data but a rebound risk on discontinuation. For any clinical anti-resorptive indication, bisphosphonates or denosumab are preferred over calcitonin.
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
