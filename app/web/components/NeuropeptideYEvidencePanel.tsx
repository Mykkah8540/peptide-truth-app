/**
 * NeuropeptideYEvidencePanel — calibrated evidence for Neuropeptide Y (NPY).
 * Key frame: NPY pharmacology (appetite, vasoconstriction, stress resilience) is
 * extensively characterized in animal models; human observational data (PTSD/stress
 * resilience) is moderate-strength; no human RCTs for any Y-receptor targeting
 * drug in a wellness indication; community injection has no evidence base.
 */

type Tier = "strong" | "moderate" | "none";

interface Signal {
  id: string;
  claim: string;
  tier: Tier;
  tierLabel: string;
  body: string;
  sources: string;
}

const SIGNALS: Signal[] = [
  {
    id: "appetite-pharmacology",
    claim: "NPY is a potent appetite stimulator via Y1R and Y5R in the hypothalamic arcuate nucleus",
    tier: "strong",
    tierLabel: "Strong — extensively characterized animal pharmacology; hypothalamic injection produces massive feeding; Y1/Y5 knockout confirms mechanism",
    body: "The appetite-stimulating effects of NPY via hypothalamic Y1R and Y5R are among the most well-characterized peptide pharmacologies in neuroscience. Intra-arcuate NPY injection in rodents produces immediate, dose-dependent feeding behavior — one of the strongest acute appetite effects of any known compound. Y1R and Y5R knockout mice show reduced food intake and body weight, confirming the receptor-specific mechanism. The physiological role is clear: NPY from arcuate nucleus neurons (the NPY/AGRP co-expressing neurons, also called orexigenic neurons) signals caloric deficit and drives food intake. This circuit is one of the primary targets of GLP-1 receptor agonists, which suppress NPY/AGRP neuron activity.",
    sources: "Clark et al. 1984 (original intra-arcuate NPY feeding effect); Zarjevski et al. 1993; Gehlert 1999 (Y receptor review); Luquet et al. 2005 (NPY/AGRP neuron characterization); Morens et al. 2005 (Y1/Y5 knockout feeding phenotype)",
  },
  {
    id: "vasoconstriction-human",
    claim: "NPY causes peripheral vasoconstriction and blood pressure elevation in humans",
    tier: "strong",
    tierLabel: "Strong — characterized in human IV infusion pharmacology studies; dose-dependent pressor effect",
    body: "Human pharmacological studies with intravenous NPY infusion have characterized the cardiovascular effects. Dahlöf et al. (1986) demonstrated dose-dependent vasoconstriction and blood pressure elevation with IV NPY in healthy volunteers. NPY is co-stored with norepinephrine in sympathetic nerve terminals and co-released during sympathetic activation — its vasoconstrictor effect augments the norepinephrine response. Y1R in vascular smooth muscle mediates the pressor effect. This is not an animal extrapolation — it is characterized human pharmacology. The peripheral vasoconstriction from community NPY injection would be a predictable human pharmacological response.",
    sources: "Dahlöf et al. 1986 (IV NPY in humans — vasoconstriction); Lundberg et al. 1982 (NPY co-release with norepinephrine); Pernow et al. 1986; Zukowska-Grojec et al. 1998 (NPY cardiovascular pharmacology review)",
  },
  {
    id: "stress-resilience",
    claim: "Higher NPY levels are associated with better stress resilience and lower PTSD severity in military personnel",
    tier: "moderate",
    tierLabel: "Moderate — consistent human observational data across multiple cohorts; well-replicated association; causality not established",
    body: "Multiple studies in military personnel, combat veterans, and survivors of traumatic events have found that higher plasma NPY levels are associated with lower PTSD severity, better stress coping, and reduced anxiety response under acute stress. Rasmusson et al. (2000) found that NPY levels increase after special forces selection training and remain higher in individuals who complete the training compared to those who do not — suggesting NPY as a biological marker of stress resilience. Morgan et al. (2000, 2001) demonstrated that NPY release during acute stress correlates inversely with dissociation and PTSD symptom severity in special forces soldiers. The mechanistic basis is plausible: central Y2R activation in the locus coeruleus counters the CRF/norepinephrine-driven stress response. This is an association, not a proven causal mechanism — higher NPY may be a consequence of resilience rather than its cause.",
    sources: "Rasmusson et al. 2000 (NPY and stress resilience in military personnel); Morgan et al. 2000, 2001 (NPY and PTSD/dissociation in special forces); Heilig 2004 (NPY stress resilience review); Morales-Medina et al. 2010",
  },
  {
    id: "y2r-anxiolytic",
    claim: "Y2 receptor activation has anxiolytic effects in animal models",
    tier: "moderate",
    tierLabel: "Moderate — consistent animal pharmacology; no human RCT translation to date",
    body: "Y2R activation in the locus coeruleus and other brainstem and limbic regions produces anxiolytic effects in multiple animal models. Y2R is an autoreceptor on NPY neurons (presynaptic, reducing NPY release) but also a heteroreceptor mediating anxiolytic effects in noradrenergic and other regions. Peptide YY (PYY), which preferentially activates Y2R, has been studied as an anxiolytic candidate. Y2R-knockout mice show increased anxiety. The Y2R anxiolytic mechanism is the pharmacological rationale for interest in NPY in the context of PTSD and anxiety disorders. However, translating this mechanism into an effective Y2R-selective agonist for human anxiety treatment has not succeeded to date — no approved Y2R-targeting drugs exist.",
    sources: "Heilig et al. 1989 (Y2R anxiolytic effects — original animal studies); Sajdyk et al. 2004 (Y2R and fear responses); Bhave et al. 2011; Tasan et al. 2010 (Y2R anxiety review)",
  },
  {
    id: "npy-obesity",
    claim: "NPY antagonism reduces food intake and could treat obesity",
    tier: "moderate",
    tierLabel: "Moderate — validated in preclinical models; failed to translate effectively to approved human drugs",
    body: "The appetite-stimulating role of NPY made Y1R antagonism (blocking appetite-promoting NPY signaling) a major pharmaceutical target for obesity treatment throughout the 1990s-2000s. Multiple Y1R and Y5R antagonists were developed and tested in clinical trials. None reached FDA approval — either the efficacy was insufficient, the trials failed, or the development programs were discontinued as GLP-1 agonists proved more effective. The preclinical evidence is strong (Y1R and Y5R antagonists reduce food intake and body weight in rodents), but the human translation has not produced an approved drug. This is notable: the pharmacological rationale was sound but the therapeutic outcome was not achieved.",
    sources: "Erickson et al. 1996 (Y1 knockout obesity resistance); Marsh et al. 1998 (Y5 knockout); multiple pharmaceutical Y1/Y5 antagonist clinical trial failures; Gehlert 2004 (NPY antagonist clinical development review)",
  },
  {
    id: "community-injection",
    claim: "Community injection of systemic NPY produces therapeutic anxiolytic or stress resilience effects",
    tier: "none",
    tierLabel: "None — receptor selectivity required for therapeutic effect cannot be achieved with systemic NPY; mechanism predicts appetite stimulation and vasoconstriction as dominant effects",
    body: "No human clinical evidence supports community injection of systemic NPY for any wellness, anxiolytic, stress-resilience, or performance-enhancement purpose. The stress resilience correlation with NPY levels is an observational association — it does not translate to a therapeutic direction of systemic NPY injection. Systemic NPY activates Y1, Y2, Y4, and Y5 receptors simultaneously, with the appetite-stimulating (Y1/Y5) and vasoconstricting (peripheral Y1) effects dominating the peripheral pharmacology. The anxiolytic Y2R effect in the locus coeruleus requires CNS penetration and receptor selectivity that systemic NPY does not provide. There are no phase 2 or phase 3 trials of systemic NPY for any human indication.",
    sources: "Absence of human RCT data; peripheral NPY pharmacology literature (vasoconstriction, appetite); failure of Y1/Y5 antagonist programs to establish NPY antagonism as viable obesity therapy",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function NeuropeptideYEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        NPY has a rich evidence base in basic pharmacology — the appetite effects, the vasoconstriction in humans, and the stress resilience associations are all well-characterized. The evidence gaps are in therapeutic translation: no FDA-approved NPY-targeting drug exists (despite extensive pharmaceutical industry effort on Y1/Y5 antagonists for obesity), and no human RCT evidence exists for community NPY injection. The stress resilience correlation is an interesting observational finding but does not translate to a therapeutic rationale for systemic NPY administration — the receptor selectivity required for the anxiolytic Y2R effect cannot be achieved by administering NPY itself.
      </div>
      <div className="reta-evidence__list">
        {SIGNALS.map((s) => {
          const st = TIER_STYLE[s.tier];
          return (
            <div
              key={s.id}
              className="reta-evidence__entry"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-evidence__entry-top">
                <div className="reta-evidence__entry-claim">{s.claim}</div>
                <div
                  className="reta-evidence__entry-tier"
                  style={{ color: st.labelColor, borderColor: st.border }}
                >
                  {s.tierLabel}
                </div>
              </div>
              <div className="reta-evidence__entry-body">{s.body}</div>
              <div className="reta-evidence__entry-sources">{s.sources}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
