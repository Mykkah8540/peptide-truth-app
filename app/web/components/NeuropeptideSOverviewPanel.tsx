/**
 * NeuropeptideSOverviewPanel — decision-oriented overview for Neuropeptide S.
 * Key frame: research-stage neuropeptide with no human therapeutic formulation.
 * NPSR1 genetics link it to anxiety and sleep — but exogenous use is uncharacterized.
 * No safety profile, no pharmacokinetic data in humans, no approved formulation.
 */

const STAT_CARDS = [
  {
    value: "Research only",
    label: "no therapeutic formulation exists — this is not a usable compound",
    sub: "Neuropeptide S (NPS) is a 20-amino-acid neuropeptide identified in 2004. It acts on the NPS receptor (NPSR1) and promotes wakefulness, reduces anxiety, and suppresses food intake in animal models. No approved therapeutic formulation exists. No pharmacokinetic data in humans. No established community use protocol.",
    note: "This is the most important framing: NPS is a research molecule, not a usable peptide. The NPSR1 genetic association studies are interesting science — they connect this receptor to anxiety, panic disorder, and sleep disturbances in human populations. But that is passive genetic epidemiology, not evidence that exogenous NPS administration does anything useful or safe in humans.",
  },
  {
    value: "NPSR1 genetics",
    label: "panic disorder and anxiety — genetic association, not a treatment target yet",
    sub: "NPSR1 polymorphisms (SNPs in the NPS receptor gene) are associated with panic disorder, anxiety disorders, and sleep disturbances in genetic association studies. This has made NPS a drug discovery target — NPSR1 antagonists are in early development for panic and PTSD. NPS itself is not the drug candidate; the receptor is the target.",
    note: "The genetic evidence is scientifically valid and interesting: NPSR1 variants alter receptor sensitivity and are correlated with anxiety phenotypes. But this creates interest in NPSR1 antagonists (blocking the receptor) — not necessarily in exogenous NPS agonism. The directionality of what you would want to do pharmacologically is not settled.",
  },
  {
    value: "Wakefulness + anxiolytic",
    label: "animal model effects — dual, potentially paradoxical profile",
    sub: "In animal models, NPS promotes arousal and wakefulness while simultaneously showing anxiolytic effects — a profile similar to stimulant-anxiolytic combinations. The effects are dose-dependent and brain-region-specific. Higher doses or administration to specific brain regions can produce anxiogenic effects. This complexity is not characterized in humans.",
    note: "The dose-dependent paradox is the key mechanistic complexity: NPS can be anxiolytic or anxiogenic depending on dose, brain region, and context. This is pharmacologically interesting but creates real uncertainty about what exogenous administration would do — the effect is not unidirectionally anxiolytic.",
  },
];

const FIT_YES = [
  "You are a researcher studying NPSR1 biology, anxiety neuroscience, or wakefulness circuits — NPS is a valid research tool in animal models",
  "You want to understand the genetic basis of anxiety vulnerability — NPSR1 polymorphism research is legitimate and informative",
  "You are following the NPSR1 antagonist drug development pipeline — the legitimate clinical target from this biology",
];

const FIT_NO = [
  "You want to use exogenous NPS for anxiety reduction, wakefulness, or appetite suppression — no human safety data exists; no formulation exists; no pharmacokinetic profile in humans",
  "You are looking for a novel anxiolytic peptide to try — NPS has no established community protocol and no characterized human dose-response relationship",
  "You want a compound with any established human evidence — strong evidence, moderate evidence, or even preliminary human data: NPS has none for exogenous use",
  "You have an anxiety disorder and are exploring peptide options — Selank, BPC-157, and other peptides with at least some human data are more appropriate research starting points",
  "You are pregnant, breastfeeding, or an adolescent — hard stop for any uncharacterized CNS compound",
];

const TIMELINE = [
  {
    phase: "Pre-use — what is actually available",
    heading: "No formulation exists for human use — this is the baseline",
    body: "Unlike many community-used peptides (BPC-157, Selank, CJC-1295), NPS does not have a gray-market research peptide ecosystem with any meaningful track record. Even if a supplier synthesizes something labeled NPS, there is no reference human dose, no established route of administration that crosses the blood-brain barrier meaningfully, and no pharmacokinetic data to work from. The compound may or may not be what it claims to be; there is no community experience to ground dosing in.",
  },
  {
    phase: "Theoretical mechanism window",
    heading: "What animal models suggest — with significant caveats",
    body: "In rodent models, intracerebral or intracerebroventricular NPS administration produces wakefulness, reduced anxiety, and suppressed food intake. The NPSR1 receptor mediates these effects. However, systemic delivery of a 20-AA peptide faces the blood-brain barrier problem — how much reaches CNS NPSR1 receptors after peripheral injection is unknown. Central delivery (intracerebroventricular) is not a community-accessible route. The animal model effects are real science; the translation to human peripheral administration is not characterized.",
  },
  {
    phase: "Long-term — entirely unknown",
    heading: "No long-term data exists at any time horizon",
    body: "There are no human trials, no safety follow-up data, and no community use history to draw on. Long-term effects of exogenous NPS administration in humans are completely uncharacterized. The NPSR1 receptor\u2019s involvement in panic disorder suggests that chronic perturbation of this system is not trivially safe.",
  },
];

const COMPARISON = [
  {
    name: "Neuropeptide S (NPS)",
    badge: "Research molecule only",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Mechanism", value: "NPSR1 agonism \u2014 wakefulness, anxiolysis, appetite suppression in animal models" },
      { label: "Human evidence", value: "None for exogenous use \u2014 NPSR1 genetics only (passive association studies)" },
      { label: "Formulation", value: "No approved or established formulation for human use" },
      { label: "Community use", value: "Not established \u2014 no meaningful use track record or dosing protocol" },
      { label: "Safety profile", value: "Completely uncharacterized in humans" },
    ],
    highlight: true,
  },
  {
    name: "Selank (anxiolytic comparison)",
    badge: "Investigational (Russian data)",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GABAergic modulation + enkephalinase inhibition" },
      { label: "Human evidence", value: "Russian clinical studies for anxiety \u2014 real evidence, limited Western replication" },
      { label: "Formulation", value: "Nasal spray (primary route); injectable available" },
      { label: "Community use", value: "Established community use with reasonable safety track record" },
      { label: "vs NPS", value: "Selank has actual human evidence and community use history; NPS has neither" },
    ],
    highlight: false,
  },
  {
    name: "NPSR1 antagonists (drug pipeline)",
    badge: "Early development",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Mechanism", value: "NPSR1 antagonism \u2014 blocking the receptor rather than activating it" },
      { label: "Target indication", value: "Panic disorder, PTSD \u2014 early-stage drug development programs" },
      { label: "Status", value: "Early development \u2014 not approved; not community-accessible" },
      { label: "vs NPS exogenous use", value: "The legitimate pharmacological program targets NPSR1 antagonism, not agonism" },
    ],
    highlight: false,
  },
];

export default function NeuropeptideSOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          Interesting receptor biology, no usable compound. NPS is a research target, not a peptide you can actually use.
        </div>
        <div className="reta-overview__headline-sub">
          Neuropeptide S is scientifically interesting: it acts on the NPSR1 receptor, and genetic variants of that receptor are linked to panic disorder and anxiety disorders in humans. In animal models, NPS promotes wakefulness while reducing anxiety \u2014 an unusual dual profile. But none of that translates into a compound you can use. There is no human safety data, no established formulation, no pharmacokinetic profile, and no community use track record. What the genetics suggest is that NPSR1 antagonists (blocking the receptor) may be useful for panic disorder \u2014 which is a real drug development program, but has nothing to do with taking exogenous NPS.
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
      <div className="reta-overview__section-label">NPS vs Selank vs NPSR1 antagonist pipeline</div>
      <div className="reta-overview__compare-note">
        NPS is often encountered in discussions about anxiolytic peptides and novel wakefulness compounds. The honest comparison: Selank has actual human data and community use history and is the legitimate anxiolytic peptide comparator. The real pharmacological program built on NPSR1 biology targets receptor antagonism \u2014 not exogenous NPS agonism.
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
