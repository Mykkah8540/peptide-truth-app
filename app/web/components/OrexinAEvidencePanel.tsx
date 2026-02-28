/**
 * OrexinAEvidencePanel — calibrated evidence for Orexin-A (Hypocretin-1).
 * Key frame: orexin/narcolepsy pharmacology is very strong foundational science;
 * intranasal orexin-A in narcolepsy has promising small human studies; orexin
 * antagonist approval (suvorexant) validates the system; subcutaneous orexin-A
 * for community wakefulness lacks CNS delivery evidence.
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
    id: "narcolepsy-mechanism",
    claim: "Loss of orexin-producing neurons causes narcolepsy Type 1 with cataplexy",
    tier: "strong",
    tierLabel: "Strong — foundational neuroscience; validated across multiple species and human CSF diagnostic criteria",
    body: "The orexin-narcolepsy connection is one of the most definitively established neuropeptide-disease relationships in neuroscience. The 1998-2000 discoveries established the mechanism from multiple independent directions: Chemelli et al. (1999) showed prepro-orexin knockout mice develop narcolepsy; Lin et al. (1999) showed a mutation in the OX2R gene causes canine narcolepsy; Peyron et al. (2000) and Thannickal et al. (2000) showed dramatic loss of orexin-producing neurons in postmortem human narcolepsy Type 1 brains. Nishino et al. (2000) showed that CSF orexin-A is undetectable or very low in narcolepsy Type 1 patients. CSF orexin-A measurement (<110 pg/mL) is now a diagnostic criterion for narcolepsy Type 1 in the ICSD-3. This is not investigational — it is established clinical neurology.",
    sources: "Chemelli et al. 1999 (Cell); Lin et al. 1999 (Cell); Peyron et al. 2000 (Nature Medicine); Thannickal et al. 2000 (Nature Medicine); Nishino et al. 2000 (The Lancet); ICSD-3 narcolepsy diagnostic criteria",
  },
  {
    id: "ox1r-ox2r-pharmacology",
    claim: "Orexin-A activates OX1R and OX2R, promoting wakefulness via multiple arousal systems",
    tier: "strong",
    tierLabel: "Strong — receptor pharmacology extensively characterized; transgenic models, electrophysiology, in vivo studies",
    body: "OX1R and OX2R pharmacology has been characterized through receptor cloning, binding studies, electrophysiology, and in vivo pharmacology. Orexin-A activates both receptors with comparable potency (OX1R Kd ~20 nM; OX2R Kd ~38 nM); orexin-B preferentially activates OX2R. The downstream consequences of receptor activation are well-mapped: OX2R activation in the tuberomammillary nucleus increases histamine release (a primary wake-promoting neurotransmitter); OX1R and OX2R activation in the locus coeruleus increases norepinephrine; orexin activation of the raphe increases serotonin. The wake-stabilizing function of orexin — holding the brain in a sustained wake state by simultaneously activating multiple arousal systems — is established through electrophysiology, behavioral pharmacology, and confirmed by the narcolepsy phenotype when this signaling is lost.",
    sources: "Sakurai et al. 1998 (Cell — orexin discovery and receptor cloning); Sakurai 2007 (Nature Reviews Neuroscience — orexin physiology review); Willie et al. 2003 (Neuron — OX2R role in narcolepsy)",
  },
  {
    id: "suvorexant-evidence",
    claim: "Orexin receptor antagonism (suvorexant, lemborexant) promotes sleep in insomnia",
    tier: "strong",
    tierLabel: "Strong — FDA-approved; multiple Phase 3 RCTs; validated in large insomnia trials",
    body: "Suvorexant (Belsomra) received FDA approval in 2014 based on Phase 3 trials in approximately 1,000 patients with insomnia. The Phase 3 trials showed significant improvements in subjective sleep onset latency, wake after sleep onset, and total sleep time compared to placebo. Lemborexant (Dayvigo) received FDA approval in 2019 with similar Phase 3 evidence. The approval of two orexin receptor antagonists with robust Phase 3 data validates the orexin system as a sleep-wake regulator in humans — blocking orexin signaling promotes sleep. This is pharmacological proof that the orexin system is a genuine, therapeutically accessible target in human sleep regulation.",
    sources: "Herring et al. 2012 (NEJM — suvorexant Phase 3); Michelson et al. 2014 (The Lancet — suvorexant FDA approval trial); Rosenberg et al. 2019 (lemborexant Phase 3); FDA approval packages",
  },
  {
    id: "intranasal-narcolepsy",
    claim: "Intranasal orexin-A improves wakefulness in patients with narcolepsy",
    tier: "moderate",
    tierLabel: "Moderate — small human studies positive; proof-of-concept for CNS delivery via nasal route",
    body: "Several small studies have examined intranasal orexin-A in humans. Baier et al. (2011) found that intranasal orexin-A (200 mcg) produced measurable wakefulness effects in narcoleptic humans — patients showed reduced sleep tendency (measured by multiple sleep latency tests) and improved vigilance. An older study (Dhuria et al. 2009) characterized the nasal-to-brain delivery pathway for orexin peptides. The mechanism of nasal-to-brain delivery — bypassing the BBB via olfactory and trigeminal nerve pathways — is pharmacokinetically characterized for many peptides. These studies are small (n=10-20 range), lack rigorous placebo controls in some cases, and use doses that may not be replicable in community settings, but they represent proof-of-concept for CNS delivery via the intranasal route.",
    sources: "Baier et al. 2011 (intranasal orexin-A in narcolepsy); Deadwyler et al. 2007 (orexin-A and cognitive performance); Dhuria et al. 2009 (nasal-to-brain orexin delivery); Smith et al. 2022 (review of intranasal orexin for narcolepsy)",
  },
  {
    id: "intranasal-healthy",
    claim: "Intranasal orexin-A improves cognitive performance in sleep-deprived healthy adults",
    tier: "moderate",
    tierLabel: "Moderate — one key study; small sample; methodological limitations; not replicated at scale",
    body: "Deadwyler et al. (2007) examined intranasal orexin-A in healthy rhesus monkeys deprived of sleep for 30-36 hours and found improved performance on a delayed nonmatch-to-sample cognitive task. A human analogue study was conducted with positive findings. These are intriguing proof-of-concept results suggesting that intranasal orexin-A can enhance performance under sleep deprivation — the natural context of orexin deficiency being performance-impairing. However, these studies are small, the cognitive effects are measured on specific tasks (not general wakefulness), and there is no replication at scale or in multiple independent laboratories. The evidence is promising but not conclusive for healthy adults.",
    sources: "Deadwyler et al. 2007 (non-human primate and human intranasal orexin-A cognitive performance study); commentary in the sleep pharmacology literature",
  },
  {
    id: "subcutaneous-cns",
    claim: "Subcutaneous orexin-A injection produces CNS wakefulness effects comparable to intranasal administration",
    tier: "none",
    tierLabel: "None — no evidence for CNS penetration from subcutaneous route; peripheral effects only are expected",
    body: "No controlled studies have demonstrated that subcutaneous orexin-A injection achieves CNS concentrations sufficient for OX1R/OX2R activation in the hypothalamus or brainstem. Peripheral intravenous orexin-A administration in animals does not produce robust wakefulness effects comparable to intracerebroventricular administration, which is consistent with limited BBB penetration of this 33-amino-acid peptide from the bloodstream. The intranasal evidence base that does exist for orexin-A is specifically for the nasal route — extrapolating it to subcutaneous injection assumes CNS delivery that has not been pharmacokinetically characterized. Community users who inject orexin-A subcutaneously and report subjective wakefulness effects may be experiencing peripheral sympathomimetic effects (cardiovascular arousal from OX1R peripheral activation) rather than CNS wakefulness enhancement.",
    sources: "Absence of subcutaneous orexin-A CNS pharmacokinetics data; peripheral vs central orexin-A pharmacology literature; Nishino 2011 (orexin delivery review)",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function OrexinAEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Orexin-A has very strong underlying neuroscience: the orexin-narcolepsy connection is definitively established, the OX1R/OX2R pharmacology is well-characterized, and orexin antagonist FDA approval validates the system in humans. The intranasal orexin-A evidence in narcolepsy is promising but limited (small studies). The critical evidentiary gap for community use is the absence of CNS delivery data for the subcutaneous injection route — without crossing the BBB, subcutaneous orexin-A does not reach the hypothalamic and brainstem targets that produce wakefulness. The strong neuroscience and the weak community-use evidence are in tension here: the biology is compelling, but the delivery for the community route is uncharacterized.
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
