/**
 * OrexinAOverviewPanel — decision-oriented overview for Orexin-A (Hypocretin-1).
 * Key frame: wakefulness neuropeptide; deficiency causes narcolepsy Type 1; orexin
 * antagonists (suvorexant, lemborexant) are FDA-approved sleep drugs; intranasal
 * (but not subcutaneous) administration has been studied for CNS effects; BBB
 * penetration from subcutaneous injection is not established.
 */

const STAT_CARDS = [
  {
    value: "OX1R / OX2R dual agonist",
    label: "mechanism — 33-AA neuropeptide; lateral hypothalamus origin; wakefulness and arousal regulation",
    sub: "Orexin-A (hypocretin-1) is a 33-amino-acid neuropeptide produced exclusively by a small cluster of neurons (~70,000 in humans) in the lateral hypothalamus. It activates both OX1R (orexin receptor 1) and OX2R (orexin receptor 2) with roughly equal potency (orexin-B preferentially activates OX2R). OX1R is expressed in the locus coeruleus (norepinephrine), dorsal raphe (serotonin), and prefrontal cortex; OX2R is expressed in the histaminergic tuberomammillary nucleus, locus coeruleus, and raphe nuclei. Together, orexin-A activation of these projection targets promotes wakefulness, arousal, cognitive alertness, and feeding behavior. The orexin system is the key stabilizer of the sleep-wake switch — it holds the brain in the wake state and prevents inappropriate transitions to sleep.",
    note: "The dual receptor pharmacology has important implications. OX2R is the primary mediator of the sleep-wake effects — suvorexant (Belsomra) and lemborexant (Dayvigo) are OX1R/OX2R dual antagonists, and their sleep-promoting effects are primarily through OX2R blockade. OX1R has a stronger role in arousal and stress responses. Orexin-A activating both receptors produces the full wakefulness profile; selective OX2R antagonism is sufficient for sleep promotion.",
  },
  {
    value: "Narcolepsy Type 1 = orexin deficiency",
    label: "clinical connection — loss of orexin neurons causes narcolepsy with cataplexy; CSF orexin is the diagnostic test",
    sub: "The connection between orexin and narcolepsy Type 1 (with cataplexy) is one of the most dramatic neuropeptide-disease associations in neuroscience. In 1998-2000, two parallel discoveries showed that loss of orexin signaling — whether through hypocretin gene knockout in mice, mutations in the OX2R gene in dogs, or (in humans) autoimmune destruction of orexin-producing neurons — causes narcolepsy with cataplexy. Virtually all narcolepsy Type 1 patients have CSF orexin-A levels below 110 pg/mL (the diagnostic threshold). The mechanism is established: without orexin stabilizing the wake state, the brain experiences inappropriate transitions to REM sleep, resulting in cataplexy (sudden muscle weakness triggered by emotion), sleep attacks, and disturbed nighttime sleep.",
    note: "The narcolepsy-orexin connection immediately suggests orexin replacement as a rational therapy. The challenge is delivery: the orexin peptide must reach OX1R/OX2R in the brainstem and hypothalamus to restore wakefulness. Intravenous orexin-A does not cross the blood-brain barrier efficiently. Intracerebroventricular (directly into CSF) administration has been studied in narcoleptic dogs and produces dramatic restoration of wakefulness. Intranasal administration has been studied in both narcoleptic animals and humans as a non-invasive CNS delivery route. Subcutaneous injection does not have established CNS penetration.",
  },
  {
    value: "Orexin antagonists are FDA-approved",
    label: "suvorexant (Belsomra) and lemborexant (Dayvigo) — approved insomnia treatments; block the same system",
    sub: "The therapeutic direction successfully translated to FDA approval is orexin receptor ANTAGONISM for insomnia. Suvorexant (Belsomra, Merck) was FDA-approved in 2014 for insomnia — the first orexin receptor antagonist approved. Lemborexant (Dayvigo, Eisai) was approved in 2019. Both block OX1R and OX2R, reducing wake-promoting signals and facilitating sleep onset and maintenance. Their approval validated the orexin system as a druggable sleep target. The existence of these antagonists also confirms that blocking the orexin system in humans clearly promotes sleep — which is the inverse of what orexin-A itself does.",
    note: "The FDA-approved orexin antagonists provide pharmacological proof-of-concept for the orexin system's role in human sleep: blocking the system promotes sleep, activating the system (what orexin-A does) promotes wakefulness. This is mechanistically coherent. The gap in approved therapeutics is on the agonist side — an FDA-approved orexin-A replacement for narcolepsy does not yet exist, despite the clear rationale. The challenge is CNS delivery.",
  },
  {
    value: "BBB penetration: intranasal yes, subcutaneous uncertain",
    label: "route matters critically — subcutaneous injection has not demonstrated CNS penetration; intranasal has been studied",
    sub: "The key pharmacokinetic question for orexin-A community use is blood-brain barrier penetration. Native orexin-A is a 33-amino-acid peptide — at the upper size limit for passive BBB penetration. The literature on peripheral orexin administration shows: (1) Intranasal orexin-A — the nasal-to-brain pathway (olfactory and trigeminal nerves providing direct CNS access) has been studied in narcoleptic dogs, narcoleptic humans, and healthy sleep-deprived adults; small studies show CNS effects. (2) Intravenous orexin-A — does not produce clear CNS wakefulness effects in healthy animals despite peripheral effects, consistent with limited BBB penetration. (3) Subcutaneous injection — no controlled studies demonstrating CNS penetration or CNS-mediated wakefulness effects. The community use assumption that subcutaneous injection delivers orexin-A to OX1R/OX2R in the brain is not evidence-supported.",
    note: "If subcutaneous orexin-A does not cross the BBB, the peripheral effects of circulating orexin-A are the relevant pharmacology: peripheral OX1R/OX2R activation (cardiovascular — OX1R increases heart rate and blood pressure; gastrointestinal motility; energy metabolism). These peripheral effects are not the wakefulness effects community users are seeking and represent an uncharacterized pharmacological action at doses used for community injection.",
  },
];

const FIT_YES = [
  "Narcolepsy Type 1 research context — orexin replacement is the mechanistically rational therapy; intranasal administration (not subcutaneous) has been studied in small human trials with positive results in narcoleptic patients; this is a legitimate research direction",
  "Understanding the wakefulness pharmacology of the orexin system — foundational knowledge for comprehending how approved drugs (suvorexant, lemborexant) work and why narcolepsy treatments target orexin pathways",
  "Scientific interest in the sleep-wake switch mechanism — the orexin system's stabilizing role in sleep-wake transitions is among the most well-characterized in sleep neuroscience",
  "Evaluating intranasal delivery as a CNS access route — the orexin-A intranasal literature is one of the more instructive examples of nasal-to-brain delivery pharmacokinetics",
];

const FIT_NO = [
  "Community subcutaneous injection for wakefulness enhancement — BBB penetration from subcutaneous injection is not established; if orexin-A does not reach OX1R/OX2R in the brain, you are experiencing the peripheral cardiovascular and GI effects without the intended wakefulness benefit",
  "Expecting narcolepsy-level wakefulness restoration from subcutaneous injection — the narcolepsy human data used intranasal delivery; subcutaneous is a different route with different CNS access",
  "Anyone with psychiatric history of psychosis, bipolar mania, or severe anxiety — orexin promotes arousal and may exacerbate hyperarousal states; the interaction with psychiatric conditions is not characterized for community dosing",
  "Replacing established wakefulness interventions (modafinil, armodafinil) — these have established CNS mechanisms and evidence bases for wakefulness; orexin-A subcutaneous lacks the CNS delivery evidence to compare",
];

const TIMELINE = [
  {
    phase: "Acute (minutes to hours, intranasal)",
    heading: "Intranasal route — wakefulness effects in narcolepsy studies",
    body: "The intranasal orexin-A studies that showed positive effects used doses of approximately 200-400 mcg intranasally, with onset of effects within 30-60 minutes and duration of several hours. In narcoleptic humans, intranasal orexin-A reduced inappropriate sleep episodes and improved performance on vigilance tests. In healthy sleep-deprived adults, one small study (Deadwyler et al. 2007) found improved vigilance performance. These effects are consistent with CNS orexin delivery via the olfactory-trigeminal nasal pathway bypassing the BBB. This is the evidence basis that exists — for intranasal delivery in specific populations.",
  },
  {
    phase: "Acute (subcutaneous route)",
    heading: "Subcutaneous route — peripheral effects; CNS effects unestablished",
    body: "No controlled studies have examined CNS effects (wakefulness, alertness, sleep architecture) specifically after subcutaneous orexin-A injection in humans. Peripheral orexin-A has known cardiovascular effects (OX1R promotes sympathetic activation — heart rate increase, blood pressure elevation) and may affect GI motility and energy metabolism. Community users report varied subjective effects, which may reflect peripheral cardiovascular arousal rather than CNS wakefulness enhancement. Without PET imaging or CSF sampling studies, the question of whether subcutaneous orexin-A crosses the BBB at community doses is empirically unresolved.",
  },
  {
    phase: "Long-term considerations",
    heading: "Unknown long-term profile — orexin system compensation and receptor desensitization",
    body: "Long-term effects of repeated exogenous orexin-A administration on the orexin system are not characterized. Whether OX1R/OX2R desensitize with repeated stimulation (reducing effectiveness over time), whether endogenous orexin system regulation compensates (reducing endogenous orexin output), or whether receptor regulation changes are relevant at community doses is entirely unknown. The orexin system's role in the HPA axis and stress responses means that chronic activation has potential for complex downstream effects on cortisol regulation and autonomic tone.",
  },
];

const COMPARISON = [
  {
    name: "Orexin-A (intranasal)",
    badge: "OX1R/OX2R agonist / Studied in narcolepsy / CNS delivery via nasal route",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "OX1R/OX2R dual agonist — restores orexin signaling that is absent in narcolepsy Type 1; promotes wakefulness via hypothalamic/brainstem arousal circuits" },
      { label: "CNS delivery", value: "Intranasal: olfactory/trigeminal pathway bypasses BBB; small human studies positive; Subcutaneous: BBB penetration not established" },
      { label: "Evidence", value: "Moderate: intranasal in narcoleptic animals and humans (small studies); one healthy adults sleep-deprivation study; no RCTs; no FDA approval" },
      { label: "Community use concern", value: "Route determines CNS access — subcutaneous injection may produce only peripheral cardiovascular effects without the wakefulness benefit" },
      { label: "Status", value: "Investigational; not FDA-approved; research compound; narcolepsy treatment gap that active pharmaceutical programs are addressing" },
    ],
    highlight: true,
  },
  {
    name: "Suvorexant (Belsomra) / Lemborexant (Dayvigo)",
    badge: "OX1R/OX2R antagonist / FDA-approved insomnia",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "OX1R/OX2R dual antagonist — blocks orexin-A and orexin-B; reduces wakefulness signaling; facilitates sleep onset and maintenance" },
      { label: "CNS delivery", value: "Oral administration; established CNS penetration and pharmacokinetics; proven receptor target engagement" },
      { label: "Evidence", value: "Strong: Phase 3 RCTs; FDA-approved for insomnia; sleep outcome measures validated in regulatory trials" },
      { label: "Pharmacological direction", value: "Opposite to orexin-A: blockade of the orexin system promotes sleep; activation (orexin-A) promotes wakefulness" },
      { label: "Status", value: "FDA-approved; Schedule IV controlled substances (USA); established insomnia treatments" },
    ],
    highlight: false,
  },
  {
    name: "Modafinil / Armodafinil",
    badge: "Wakefulness promoter / FDA-approved narcolepsy / Indirect orexinergic mechanism",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Dopamine transporter inhibition (primary); indirect effects on orexin, norepinephrine, histamine systems; does not directly activate OX1R/OX2R" },
      { label: "CNS delivery", value: "Oral; well-established CNS penetration; decades of pharmacokinetic characterization" },
      { label: "Evidence", value: "Strong: FDA-approved for narcolepsy, shift work disorder, sleep apnea; extensive RCT evidence; widely studied in healthy adults for wakefulness" },
      { label: "Practical comparison", value: "Modafinil produces reliable wakefulness with established CNS delivery; orexin-A subcutaneous injection has uncertain CNS delivery; modafinil is the more evidence-grounded wakefulness option" },
      { label: "Status", value: "FDA-approved; Schedule IV (USA); available in most countries; most practical evidence-based wakefulness compound" },
    ],
    highlight: false,
  },
];

export default function OrexinAOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The wakefulness neuropeptide — loss of orexin neurons causes narcolepsy; orexin antagonists are FDA-approved sleep drugs; intranasal but not subcutaneous administration reaches the CNS.
        </div>
        <div className="reta-overview__headline-sub">
          Orexin-A (hypocretin-1) is the neuropeptide that stabilizes the brain in the wake state. Its loss — through autoimmune destruction of the ~70,000 orexin-producing neurons in the lateral hypothalamus — causes narcolepsy Type 1 with cataplexy. Orexin receptor ANTAGONISTS (suvorexant/Belsomra, lemborexant/Dayvigo) are FDA-approved for insomnia. The rational therapy for narcolepsy is orexin replacement — but delivery is the challenge. Intranasal orexin-A has been studied in small human trials with positive results in narcoleptic patients. Subcutaneous orexin-A has not demonstrated CNS penetration — without crossing the BBB, subcutaneous injection would produce peripheral cardiovascular effects rather than the desired wakefulness enhancement. Community use for wakefulness assumes CNS delivery that has not been established for the subcutaneous route.
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
      <div className="reta-overview__section-label">Orexin-A (intranasal) vs Suvorexant/Lemborexant vs Modafinil</div>
      <div className="reta-overview__compare-note">
        Three points on the orexin pharmacology spectrum: orexin-A replacement (agonist — studied intranasally for narcolepsy), orexin antagonism (suvorexant/lemborexant — FDA-approved sleep drugs), and indirect orexinergic wakefulness promotion (modafinil — FDA-approved narcolepsy treatment with the most practical evidence base for wakefulness in community use). The orexin replacement story is scientifically compelling for narcolepsy but requires CNS delivery — which means intranasal, not subcutaneous.
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
