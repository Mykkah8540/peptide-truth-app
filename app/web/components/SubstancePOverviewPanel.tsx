/**
 * SubstancePOverviewPanel — decision-oriented overview for Substance P (SP).
 * Key frame: pro-inflammatory pain mediator whose clinical value is in its ANTAGONISTS
 * (NK1 receptor antagonists: aprepitant for CINV; studied for depression), not in
 * exogenous administration. Injecting SP produces pain and inflammation — this is the
 * pharmacological mechanism, not an adverse effect to avoid.
 */

const STAT_CARDS = [
  {
    value: "NK1 receptor agonist",
    label: "mechanism — 11-amino-acid tachykinin neuropeptide; potent NK1R agonist; pro-nociceptive",
    sub: "Substance P is an 11-amino-acid peptide of the tachykinin family (alongside neurokinin A and neurokinin B). It is the primary endogenous agonist at the NK1 receptor (neurokinin-1 receptor, also called tachykinin receptor 1). NK1 receptors are expressed widely: in C-fiber nociceptive neurons (primary sensory neurons for pain), in blood vessels (vasodilation), in immune cells (mast cells, T cells — immune activation), and in the CNS (limbic system, brainstem — mood and stress regulation). Substance P released from C-fiber neurons is a key mediator of pain signal transmission from the periphery to the dorsal horn of the spinal cord.",
    note: "The NK1 receptor is both the mediator of pain and the therapeutic target — but in opposite directions. Endogenous SP released from nociceptive neurons mediates pain. Exogenous SP administration activates NK1 receptors and therefore produces pain and inflammation. NK1 receptor ANTAGONISTS (aprepitant, netupitant, fosaprepitant) block this pathway and are FDA-approved for chemotherapy-induced nausea and vomiting. The therapeutic direction is antagonism, not agonism. This is the central insight for understanding substance P's clinical relevance.",
  },
  {
    value: "Pro-inflammatory / pro-nociceptive",
    label: "biological role — pain signaling, vasodilation, mast cell activation, neurogenic inflammation",
    sub: "Substance P performs multiple pro-inflammatory and pro-nociceptive functions: (1) Nociception: released from C-fiber terminals in the dorsal horn, activates NK1 receptors on second-order neurons and glial cells, amplifying pain signal transmission; (2) Neurogenic inflammation: peripheral release from C-fiber endings causes vasodilation (via direct vessel effects and mast cell histamine release), plasma extravasation (edema), and mast cell activation (itch, urticaria); (3) Immune activation: NK1R on immune cells promotes T-cell proliferation, mast cell degranulation, and cytokine release; (4) CNS effects: SP in limbic areas modulates mood, stress, and emesis circuitry (which is why NK1 antagonists treat CINV).",
    note: "Neurogenic inflammation is the aggregate peripheral effect of SP release: vasodilation + plasma extravasation + mast cell degranulation. This is the mechanism of the flare-and-wheal response (triple response of Lewis) visible when a histamine or allergen is injected into skin — SP is one of the key mediators. Community injection of exogenous SP would reproduce these effects at the injection site: pain, redness, swelling, and histamine-like local reactions.",
  },
  {
    value: "NK1 antagonists are FDA-approved",
    label: "therapeutic direction — aprepitant/Emend, netupitant/Akynzeo, fosaprepitant for CINV",
    sub: "The clinically actionable pharmacology of the NK1 receptor system is in antagonism, not agonism. Aprepitant (Emend) was FDA-approved in 2003 for chemotherapy-induced nausea and vomiting (CINV), followed by fosaprepitant (IV formulation) and netupitant (fixed combination with palonosetron — Akynzeo). These NK1 antagonists work by blocking SP's action at NK1 receptors in the emesis circuit (area postrema, nucleus tractus solitarius). NK1 antagonists are also under active clinical investigation for depression — the SP/NK1 system in limbic areas modulates mood, and blocking it may have antidepressant effects independent of monoamine pathways.",
    note: "The depression application of NK1 antagonists is scientifically interesting: early trials by Kramer et al. (1998, Science) found that the NK1 antagonist MK-869 had antidepressant efficacy comparable to paroxetine with fewer sexual side effects. Subsequent trials had mixed results. The mechanistic logic is that high SP levels in limbic areas during stress and depression drive NK1R-mediated adverse effects that can be blocked. Whether SP levels in depressed patients represent a causal pathway or an epiphenomenon remains debated.",
  },
  {
    value: "No therapeutic community use",
    label: "exogenous SP injection — pro-inflammatory, pro-nociceptive; no legitimate therapeutic rationale",
    sub: "There is no clinical or research rationale for community injection of substance P. The compound is a pain-promoting, inflammatory neuropeptide. Injecting it subcutaneously would produce local pain, vasodilation, and inflammatory response at the injection site — these are not side effects of a therapeutic compound, they are the direct pharmacological mechanism of the compound in peripheral tissue. The community interest in peptide self-experimentation sometimes extends to compounds with no therapeutic direction, and substance P is the clearest example of a compound where the pharmacological mechanism itself is counterproductive.",
    note: "Comparing substance P to other investigational peptides in this community: BPC-157, TB-500, and similar peptides have at least a mechanistic rationale for tissue repair or anti-inflammatory effects. Substance P has the opposite profile — it is pro-inflammatory and promotes pain. The research value is in understanding pain physiology and NK1 antagonist development, not in SP administration itself.",
  },
];

const FIT_YES = [
  "You want to understand pain signal transduction and the role of C-fiber nociception in chronic pain conditions — substance P physiology is foundational knowledge for understanding why pain medications work as they do",
  "You are researching NK1 receptor antagonists (aprepitant, netupitant) for CINV management or the emerging antidepressant applications — understanding SP is required to understand why NK1 antagonists are therapeutically useful",
  "You have a scientific interest in neurogenic inflammation mechanisms — the SP/NK1R system underlies the inflammatory component of many pain conditions (fibromyalgia, IBS, migraine, complex regional pain syndrome) where elevated SP levels have been documented",
  "You are a healthcare professional or researcher understanding the pharmacological basis of tachykinin-related drug development",
];

const FIT_NO = [
  "Community injection for any purpose — subcutaneous SP injection produces pain, local vasodilation, and inflammatory response; this is not a therapeutic compound to inject; it is a pain mediator",
  "Pain management — injecting substance P would worsen, not improve, pain; the therapeutic application of the NK1 system in pain is NK1 antagonism, not agonism",
  "Any wellness, recovery, or performance application — there is no mechanistic basis for a positive therapeutic effect of exogenous SP administration",
  "Mood or antidepressant applications — the antidepressant direction in the NK1 system is NK1 antagonism (blocking SP's action); administering SP would activate the pathway associated with adverse mood effects",
];

const TIMELINE = [
  {
    phase: "Immediate (seconds to minutes)",
    heading: "Peripheral injection: pain, vasodilation, flare — the mechanism, not the side effect",
    body: "If substance P were injected subcutaneously, the immediate effect would be NK1R activation in peripheral tissue: local pain (via nociceptor activation), vasodilation, and plasma extravasation (edema/wheal). These effects are the direct pharmacological mechanism of SP acting on peripheral NK1 receptors, not adverse effects to be avoided. The histamine-like local reaction (flare-and-wheal) would likely follow within minutes as mast cell degranulation occurs. This is not a research or therapeutic starting point — it is an expected harm from injecting a pro-inflammatory mediator.",
  },
  {
    phase: "Minutes to hours",
    heading: "Neurogenic inflammation sustained — inflammatory cascade from mast cell activation",
    body: "SP-induced mast cell degranulation releases histamine, prostaglandins, and cytokines that sustain the inflammatory response beyond the initial NK1R activation. The neurogenic inflammation may persist for hours. Repeated injections would sensitize local nociceptors (central and peripheral sensitization is a hallmark of sustained SP release in pain physiology — this is part of why chronic pain conditions with elevated SP are self-perpetuating). There is no recovery or repair rationale that overcomes this fundamental pain-promoting mechanism.",
  },
  {
    phase: "Therapeutic context",
    heading: "NK1 antagonists — the clinically relevant timeframe for this pharmacological system",
    body: "The relevant timeline for the NK1 system in therapeutic use is the NK1 antagonist context: aprepitant for CINV is given before and after chemotherapy over a 3-day cycle; NK1 antagonists studied for depression have been examined in 6-8 week trials. Understanding the therapeutic potential of the NK1 system through its antagonists is the clinically meaningful direction. SP itself has no therapeutic timeline because there is no therapeutic indication for its administration.",
  },
];

const COMPARISON = [
  {
    name: "Substance P (exogenous injection)",
    badge: "NK1 agonist / No therapeutic use / Pro-inflammatory",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Mechanism", value: "NK1R agonist — activates pain signaling, neurogenic inflammation, mast cell degranulation" },
      { label: "Expected effect (injection)", value: "Local pain, vasodilation, flare-and-wheal, inflammatory response — the pharmacological mechanism, not an adverse effect" },
      { label: "Therapeutic direction", value: "None — SP is a pro-inflammatory mediator; exogenous administration has no therapeutic rationale" },
      { label: "Evidence for injection use", value: "None — no clinical evidence, no therapeutic indication, no safety data for community injection" },
      { label: "Status", value: "Research compound for mechanistic studies; not a therapeutic agent; contraindicated for community injection" },
    ],
    highlight: true,
  },
  {
    name: "NK1 Receptor Antagonists (aprepitant, netupitant)",
    badge: "NK1 antagonist / FDA-approved CINV / Studied for depression",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "NK1R antagonist — blocks SP binding; prevents emesis signal in area postrema; modulates limbic SP/NK1 signaling in depression context" },
      { label: "Expected effect", value: "Antiemetic (CINV prevention); potential antidepressant effects in NK1R-rich limbic regions" },
      { label: "Therapeutic direction", value: "This is the correct pharmacological direction for NK1 system intervention — blocking, not activating, the receptor" },
      { label: "Evidence", value: "Strong: aprepitant Phase 3 trials (FDA-approved 2003); Moderate: NK1 antagonists for depression (mixed Phase 2/3 data)" },
      { label: "Status", value: "FDA-approved for CINV (aprepitant/Emend, netupitant/Akynzeo); active antidepressant development programs" },
    ],
    highlight: false,
  },
  {
    name: "Other pain neurotransmitters / modulators",
    badge: "Pain physiology context",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Endorphins / enkephalins", value: "Endogenous opioid peptides — analgesic; opposite pharmacological direction to SP; opioid receptor agonists reduce pain" },
      { label: "CGRP", value: "Calcitonin gene-related peptide — co-released with SP from C-fibers; CGRP antagonists (rimegepant, ubrogepant) are FDA-approved for migraine" },
      { label: "Glutamate / NMDA", value: "Primary fast excitatory neurotransmitter in dorsal horn pain circuits; NMDA receptor ketamine modulation is a pain and depression intervention" },
      { label: "Serotonin", value: "5-HT3 antagonists (ondansetron) treat nausea via a different mechanism than NK1 antagonists; often combined with NK1 antagonists for CINV" },
    ],
    highlight: false,
  },
];

export default function SubstancePOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          A pro-inflammatory pain mediator whose clinical value is in its antagonists, not in administration — NK1 antagonists treat nausea and are studied for depression; substance P itself is not a therapeutic compound.
        </div>
        <div className="reta-overview__headline-sub">
          Substance P is the primary neurotransmitter of C-fiber pain signaling and a potent pro-inflammatory mediator via NK1 receptor activation. It causes vasodilation, mast cell degranulation, and neurogenic inflammation. Its pharmacological relevance to medicine is entirely in its ANTAGONISTS: aprepitant (Emend) and netupitant are FDA-approved NK1 receptor antagonists for chemotherapy-induced nausea and vomiting, and NK1 antagonists are under investigation for depression. Injecting substance P subcutaneously would produce local pain, redness, and inflammatory response — because that is what NK1R agonism in peripheral tissue does. There is no legitimate therapeutic rationale for community administration of substance P.
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
      <div className="reta-overview__section-label">Substance P (injection) vs NK1 antagonists vs other pain neurotransmitters</div>
      <div className="reta-overview__compare-note">
        The NK1 receptor system matters clinically — but in the direction of blockade, not activation. Aprepitant and netupitant are FDA-approved therapeutic successes from this pharmacological system. The compounds that are useful are the antagonists. Substance P itself, injected exogenously, reproduces the pain and inflammatory effects of endogenous SP release — which is the opposite of a therapeutic target.
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
