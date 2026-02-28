/**
 * NeuropeptideYSafetyPanel — safety calibration for Neuropeptide Y (NPY).
 * Key frame: cardiovascular risk (vasoconstriction — documented in human IV studies)
 * is the primary safety concern; appetite stimulation makes NPY counterproductive
 * for eating disorder history; central effects uncertain due to BBB question.
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
    id: "hypertension-cardiovascular",
    heading: "Hypertension or cardiovascular disease — NPY is a potent vasoconstrictor in humans",
    tier: "flag",
    body: "NPY's peripheral vasoconstriction via Y1R in vascular smooth muscle is documented in human IV infusion pharmacology studies. Blood pressure and peripheral vascular resistance increase in a dose-dependent manner with IV NPY in healthy volunteers. This is not a theoretical risk — it is a characterized human cardiovascular pharmacological effect. In patients with hypertension, coronary artery disease, peripheral vascular disease, or any condition where vasoconstrictive stress is dangerous (heart failure, recent MI, stroke history), exogenous NPY would be expected to cause direct, measurable cardiovascular harm. NPY is also a powerful coronary vasoconstrictor — Y1R in coronary arteries mediates vasoconstriction that could reduce myocardial perfusion.",
    context: "Any history of hypertension (even well-controlled), coronary artery disease, peripheral artery disease, heart failure, or prior stroke or TIA: do not use NPY. The vasoconstriction mechanism is predictable and dangerous in these conditions. Even in otherwise healthy individuals, the blood pressure elevation from NPY injection represents a pharmacological cardiovascular stress with no therapeutic benefit.",
  },
  {
    id: "eating-disorders",
    heading: "Eating disorder history — NPY produces among the most powerful appetite-stimulating signals known",
    tier: "flag",
    body: "NPY is one of the strongest appetite stimulators in the hypothalamic energy balance circuit. Individuals with a history of binge eating disorder, bulimia nervosa, or other conditions where appetite dysregulation is a core pathological feature would be at significant risk from NPY's appetite-stimulating effects. Y1R and Y5R activation drives intense hunger and food-seeking behavior. For individuals in recovery from eating disorders, a compound that produces powerful appetite stimulation via hypothalamic circuitry represents both a relapse risk and a direct pharmacological challenge to the appetite regulation that recovery requires.",
    context: "Any personal or family history of eating disorders (binge eating disorder, bulimia nervosa, anorexia nervosa with binge-purge subtype) is a contraindication to NPY use. The appetite-stimulating mechanism is too powerful and the eating disorder context too sensitive for any risk-benefit calculation to favor NPY injection.",
  },
  {
    id: "antihypertensive-interaction",
    heading: "Antihypertensive medication — NPY directly opposes blood pressure lowering mechanisms",
    tier: "flag",
    body: "Antihypertensive drugs work through multiple mechanisms to lower blood pressure: ACE inhibitors (reducing angiotensin II), ARBs (blocking angiotensin II receptor), calcium channel blockers (reducing vascular smooth muscle contraction), beta-blockers (reducing cardiac output and renin), and diuretics (reducing blood volume). NPY's vasoconstriction via Y1R in vascular smooth muscle directly opposes the vasodilatory mechanisms of calcium channel blockers, ACE inhibitors, and ARBs. Combined NPY + antihypertensive creates direct pharmacological opposition — NPY vasoconstriction vs. drug-induced vasodilation — in a patient whose blood pressure management depends on the pharmacotherapy working.",
    context: "Anyone on antihypertensive medication should not use NPY under any circumstances. The vasoconstriction from NPY directly undermines the antihypertensive therapeutic mechanism and could cause acute blood pressure elevation in a patient who requires careful blood pressure management.",
  },
  {
    id: "anxiety-complexity",
    heading: "Anxiety disorders — central NPY effects are receptor-subtype-dependent; Y1 may be anxiogenic, Y2 anxiolytic",
    tier: "watch",
    body: "The relationship between NPY and anxiety is pharmacologically complex. The stress resilience association comes from Y2R activation in the locus coeruleus being anxiolytic. But Y1R activation in the amygdala and other limbic regions has been associated with anxiogenic (anxiety-promoting) effects in some animal models. Systemic NPY activates both Y1R and Y2R — the net anxiety effect depends on which receptor, in which brain region, achieves greater activation. In a patient with an existing anxiety disorder, this unpredictable anxiety pharmacology — with both anxiolytic (Y2) and potentially anxiogenic (Y1) components — represents an unacceptable uncertainty in a condition requiring stable management.",
    context: "Patients with generalized anxiety disorder, panic disorder, social anxiety disorder, or PTSD should not use NPY injection — the complex Y-receptor pharmacology (with both anxiogenic and anxiolytic components) makes the anxiety outcome unpredictable, and the risk of worsening anxiety is real. Therapeutic development of Y2R-selective agonists for anxiety remains in early research stages.",
  },
  {
    id: "glp1-opposition",
    heading: "GLP-1 receptor agonists (semaglutide, tirzepatide) — NPY directly opposes GLP-1 appetite mechanisms",
    tier: "watch",
    body: "GLP-1 receptor agonists suppress appetite partly through inhibiting NPY/AGRP neurons in the hypothalamic arcuate nucleus — the same neurons whose NPY output drives appetite. Exogenous NPY would stimulate the very circuit that GLP-1 drugs are suppressing. This is not just a pharmacological opposition — it is a direct counteraction of the therapeutic mechanism that produces the weight loss outcome from GLP-1 drugs. Users on semaglutide or tirzepatide who inject NPY would be pharmacologically undermining their GLP-1 treatment's appetite-reduction mechanism.",
    context: "Anyone on semaglutide, tirzepatide, liraglutide, or any other GLP-1 receptor agonist: do not use NPY injection. The mechanism directly opposes the appetite-reduction that is the primary therapeutic goal of GLP-1 therapy. This is not a standard drug interaction — it is direct pharmacological opposition at the appetite circuit level.",
  },
  {
    id: "bbb-unknown",
    heading: "Unknown CNS pharmacokinetics — BBB penetration of subcutaneous NPY not established",
    tier: "watch",
    body: "Like orexin-A, NPY is a 36-amino-acid peptide at the upper size limit for passive BBB penetration. Whether subcutaneous NPY injection achieves hypothalamic NPY receptor activation (which would produce the central appetite-stimulating and stress-modulating effects) is not characterized in pharmacokinetic studies. If NPY does not cross the BBB from the periphery, the primary effects would be peripheral Y1R vasoconstriction (which is documented in human IV studies) without the central appetite or anxiolytic effects community users might target. If NPY does partially cross the BBB, hypothalamic appetite stimulation would be an additional concern.",
    context: "The BBB uncertainty cuts both ways: without CNS penetration, the central effects are absent (making NPY injection useless for the hypothalamic targets of interest) but the peripheral vasoconstriction remains. With partial CNS penetration, appetite stimulation and the complex anxiety pharmacology are added to the peripheral cardiovascular effects. Neither scenario represents a favorable risk-benefit profile.",
  },
  {
    id: "acute-toxicity",
    heading: "Acute toxicity — low at physiological doses; the safety concern is pharmacological, not toxic",
    tier: "low",
    body: "NPY itself has low acute toxicity at physiological concentrations — it is a normal endogenous neuropeptide present throughout the nervous system and bloodstream. The safety concerns for community injection are pharmacological (vasoconstriction, appetite stimulation) rather than toxic (cell damage, organ dysfunction). This is similar to other endogenous peptides where the hazard from exogenous administration is the pharmacological mechanism rather than direct toxicity. NPY synthesis quality considerations apply: as a 36-amino-acid peptide, it is at the upper range of solid-phase synthesis complexity but remains achievable with high-quality synthesis.",
    context: "Low acute toxicity does not mean low risk — the pharmacological risks (cardiovascular from vasoconstriction; appetite disruption; potential anxiety effects) are the relevant concern. The absence of direct toxic harm at physiological doses should not be interpreted as evidence of safety for community injection purposes.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function NeuropeptideYSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        NPY&apos;s safety profile for community injection is defined by three pharmacological realities: (1) Peripheral Y1R vasoconstriction — documented in human IV pharmacology studies — means cardiovascular risk for anyone with hypertension, heart disease, or on antihypertensive medications is a hard stop. (2) Appetite stimulation — among the most potent known in the hypothalamic energy circuit — makes NPY contraindicated in eating disorder history and directly counterproductive for anyone on GLP-1 appetite-suppression therapy. (3) The complex Y-receptor pharmacology (anxiogenic Y1 vs. anxiolytic Y2) makes anxiety outcomes unpredictable in patients with anxiety disorders. No approved therapeutic exists because the receptor selectivity for beneficial effects cannot be achieved with systemic NPY.
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
