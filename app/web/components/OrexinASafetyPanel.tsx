/**
 * OrexinASafetyPanel — safety calibration for Orexin-A (Hypocretin-1).
 * Key frame: psychiatric conditions (psychosis, mania) are the highest concern
 * due to orexin's arousal-promoting mechanism; cardiovascular effects from
 * peripheral OX1R activation; BBB penetration uncertainty means unknown
 * risk profile for subcutaneous community dosing.
 */

type Tier = "flag" | "watch" | "low";

interface SafetyItem {
  id: string;
  heading: string;
  tier: Tier;
  body: string;
  context: string;
}

const SAFETY_ITEMS: SafetyItem[] = [
  {
    id: "psychiatric",
    heading: "Psychosis history, bipolar mania, or severe anxiety — orexin promotes hyperarousal",
    tier: "flag",
    body: "The orexin system promotes wakefulness and arousal by activating multiple aminergic arousal systems (norepinephrine via locus coeruleus, dopamine, histamine, serotonin). Dysregulation of these same arousal systems is implicated in psychosis and bipolar mania — states characterized by pathological hyperarousal, reduced need for sleep, and excessive activation of reward and arousal circuits. Exogenous orexin-A activating OX1R/OX2R in the locus coeruleus and other arousal centers could theoretically exacerbate hyperarousal states in vulnerable individuals. Additionally, the orexin system modulates dopamine release in the ventral tegmental area — excessive dopaminergic activation is a core feature of psychosis pathophysiology.",
    context: "Anyone with a history of schizophrenia, schizoaffective disorder, bipolar type 1 with mania, or any psychotic episode should not use exogenous orexin-A. The arousal-promoting mechanism is directly opposed to the therapeutic goal in these conditions (which typically involve antipsychotics and mood stabilizers that reduce arousal and dopaminergic activity). This is a mechanistic contraindication, not a speculation.",
  },
  {
    id: "cardiovascular",
    heading: "Cardiovascular effects from peripheral OX1R activation — sympathomimetic profile",
    tier: "flag",
    body: "OX1R is expressed in the peripheral cardiovascular system. Orexin-A activating peripheral OX1R has sympathomimetic cardiovascular effects: increased heart rate, increased blood pressure, and enhanced sympathetic tone. These peripheral effects are what subcutaneous orexin-A injection would primarily produce if the compound does not cross the BBB. In patients with hypertension, cardiac arrhythmias, or coronary artery disease, exogenous sympathomimetic stimulation is a meaningful safety concern. Peripheral orexin-A's cardiovascular profile has been characterized in animal studies — the sympathomimetic effect is real and measurable at relevant doses.",
    context: "Patients with hypertension (especially poorly controlled), cardiac arrhythmias (particularly supraventricular tachycardia or atrial fibrillation), coronary artery disease, or heart failure should not use exogenous orexin-A. The peripheral sympathomimetic mechanism creates cardiovascular risk even without CNS penetration. Monitor blood pressure and heart rate if any use is being considered in otherwise healthy individuals.",
  },
  {
    id: "bbb-uncertainty",
    heading: "Unknown risk profile from uncharacterized CNS delivery — subcutaneous route",
    tier: "watch",
    body: "The most significant general safety concern for community orexin-A injection is that the CNS pharmacokinetics for subcutaneous administration are unknown. If orexin-A crosses the BBB from the periphery at some concentration — even partially — the CNS effects would depend on which receptors are activated at what levels, in what brain regions, with what dose-response relationship. This is entirely uncharacterized. The intranasal human studies used specific doses via a specific route in specific populations (narcoleptic patients). Extrapolating safety from those studies to subcutaneous injection in healthy individuals at community doses is not supported by the evidence. The unknown CNS pharmacokinetics represent a genuine uncertainty in the safety profile.",
    context: "This is not a specific contraindication but a statement of scientific uncertainty. There is no evidence that subcutaneous orexin-A is safe from a CNS perspective because the CNS delivery from this route has not been characterized. Those choosing to use orexin-A subcutaneously should understand they are operating without any pharmacokinetic safety data for the relevant route.",
  },
  {
    id: "insomnia-paradox",
    heading: "Sleep timing — orexin promotes wakefulness; evening dosing could cause significant insomnia",
    tier: "watch",
    body: "Orexin-A's mechanism promotes wakefulness and arousal. Dosing orexin-A in the evening or at night would be expected to suppress sleep onset and maintenance — the inverse of the therapeutic goal for most community users. Even if the community use goal is daytime wakefulness, timing errors (late injections, prolonged action) could cause sleep disruption that accumulates over days. The half-life of orexin-A in the periphery is relatively short, but if any central effects occur, the duration of wakefulness-promoting action is not characterized for the subcutaneous route.",
    context: "Timing of orexin-A use (if used at all) is critical given the wakefulness-promoting mechanism. Morning dosing only. Avoid any dosing within 6-8 hours of intended sleep onset. Track sleep quality — any increase in sleep onset difficulty, middle-of-night waking, or reduced total sleep time should prompt discontinuation.",
  },
  {
    id: "seizure-threshold",
    heading: "Seizure history — orexin and seizure threshold interaction",
    tier: "watch",
    body: "The orexin system interacts with seizure threshold regulation. Orexin promotes arousal and affects the balance of excitatory/inhibitory neurotransmission in several brain regions. Animal models show that orexin can lower seizure threshold in some contexts. While this is primarily based on animal pharmacology, patients with epilepsy using drugs that are carefully titrated to maintain seizure control should approach any compound that might affect CNS arousal circuits with caution. The relevance of peripheral subcutaneous orexin-A to seizure threshold depends on CNS penetration — if it does not reach the CNS, the seizure threshold concern is minimal.",
    context: "Patients with epilepsy or a history of seizures should discuss with their neurologist before considering any CNS-active compound, including orexin-A. The interaction between orexin and anticonvulsant medication regimens is not characterized for community dosing.",
  },
  {
    id: "intranasal-small-studies",
    heading: "Intranasal administration — no major safety signals in small studies",
    tier: "low",
    body: "The small human studies of intranasal orexin-A in narcoleptic patients and healthy volunteers did not report major adverse events. Intranasal peptide delivery is generally considered a low-risk administration route from an acute safety perspective. The doses used in the human studies (200-400 mcg intranasally) appeared well-tolerated. The absence of adverse events in small studies does not constitute a complete safety profile, but it is reassuring for the intranasal route specifically.",
    context: "Intranasal administration in the dose ranges used in published studies appears to have low acute risk based on available data. This is route-specific — the safety of intranasal administration does not inform the safety of subcutaneous injection, which has a different pharmacokinetic profile and potentially different CNS exposure.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function OrexinASafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Orexin-A safety for community use is shaped by two distinct concerns: (1) The established pharmacological mechanism — orexin promotes arousal and sympathetic activation, making it contraindicated in psychiatric conditions involving hyperarousal (psychosis, mania) and cardiovascular conditions where sympathomimetic stimulation is dangerous. (2) The unknown — subcutaneous injection does not have characterized CNS pharmacokinetics; the risk profile for the community route is unestablished. The small intranasal human studies in narcolepsy showed acceptable tolerability for that specific route and population. Subcutaneous injection operates outside the characterized evidence base entirely.
      </div>
      <div className="reta-safety__list">
        {SAFETY_ITEMS.map((item) => {
          const st = TIER_STYLE[item.tier];
          return (
            <div
              key={item.id}
              className="reta-safety__entry"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-safety__entry-top">
                <div className="reta-safety__entry-heading">{item.heading}</div>
                <div
                  className="reta-safety__entry-tier"
                  style={{ color: st.labelColor, borderColor: st.border }}
                >
                  {st.label}
                </div>
              </div>
              <div className="reta-safety__entry-body">{item.body}</div>
              <div className="reta-safety__entry-context">{item.context}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
