/**
 * NeuropeptideSEvidencePanel — honest evidence landscape for Neuropeptide S.
 * Key frame: legitimate neuroscience in animal models and NPSR1 genetics.
 * Zero human clinical trial data for exogenous NPS use.
 * NPSR1 polymorphism research is real but passive — genetic association, not therapeutic evidence.
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
    id: "npsr1-mechanism",
    claim: "NPS/NPSR1 mechanism in wakefulness and anxiety (animal models)",
    tier: "moderate",
    tierLabel: "Moderate",
    body: "Animal model research (primarily rodents) demonstrates that NPS administration produces wakefulness, reduced anxiety-like behavior, and appetite suppression via NPSR1 agonism. The receptor is well-characterized pharmacologically. These effects are reproducible across multiple animal studies and represent legitimate preclinical science.",
    sources: "Preclinical pharmacology: NPSR1 receptor characterization studies (Xu et al. 2004 identification; multiple rodent model papers). Mechanism: NPSR1 is a Gs/Gq-coupled GPCR; NPS binding produces cAMP elevation and intracellular calcium mobilization.",
  },
  {
    id: "npsr1-genetics",
    claim: "NPSR1 polymorphisms associated with panic disorder and anxiety in humans",
    tier: "moderate",
    tierLabel: "Moderate",
    body: "Genetic association studies have linked NPSR1 single nucleotide polymorphisms (SNPs, particularly Asn107Ile) to panic disorder, anxiety disorders, and sleep disturbances in human populations. This is passive genetic epidemiology \u2014 it identifies NPSR1 as a vulnerability gene for anxiety, not a treatment target via exogenous NPS administration.",
    sources: "GWAS and candidate gene studies: NPSR1 Asn107Ile variant (rs324981) associated with anxiety disorders in multiple European and Asian population studies. Donner et al.; Okamura et al.; Luczak et al. Panic disorder association: replicated in independent cohorts.",
  },
  {
    id: "appetite-suppression",
    claim: "Appetite suppression via NPSR1 in animal models",
    tier: "moderate",
    tierLabel: "Moderate",
    body: "NPS reduces food intake in rodent models, consistent with NPSR1 expression in hypothalamic circuits involved in energy homeostasis. The appetite-suppressing effect is pharmacologically characterized in preclinical models but has not been studied in humans.",
    sources: "Rodent feeding behavior studies: intracerebroventricular NPS administration reduces food intake in fasted and ad libitum-fed rodents. Hypothalamic NPSR1 expression: documented in arcuate nucleus and other feeding-relevant regions.",
  },
  {
    id: "human-clinical",
    claim: "Human clinical trials of exogenous NPS administration",
    tier: "none",
    tierLabel: "No evidence",
    body: "No human clinical trials of exogenous NPS administration exist. No pharmacokinetic studies in humans. No dose-response characterization. No safety or tolerability data from human subjects. This is a complete evidence gap \u2014 not preliminary evidence, not weak evidence, but zero human data.",
    sources: "ClinicalTrials.gov search: no registered trials for NPS or Neuropeptide S as an experimental intervention. Literature: no published human administration studies.",
  },
  {
    id: "community-use",
    claim: "Community use protocols for exogenous NPS",
    tier: "none",
    tierLabel: "No evidence",
    body: "Unlike many research peptides (BPC-157, Selank, CJC-1295), NPS does not have an established community use ecosystem with dosing protocols, route of administration conventions, or accumulated user reports. There is no meaningful gray-market use track record to draw on for risk assessment.",
    sources: "Community peptide forums: NPS is discussed as a theoretical compound of interest; no established dosing protocols or significant user experience reports exist.",
  },
  {
    id: "therapeutic-application",
    claim: "Therapeutic formulation or approved use",
    tier: "none",
    tierLabel: "No evidence",
    body: "No therapeutic formulation of NPS exists. No regulatory approval in any jurisdiction. No clinical development program for NPS as a therapeutic agent (NPSR1 antagonist programs exist \u2014 for blocking the receptor \u2014 but these are not NPS administration programs).",
    sources: "FDA, EMA databases: no NPS IND or approved formulation. Drug pipeline: NPSR1 antagonist programs exist in early development for panic/PTSD; these are mechanistically opposite to exogenous NPS use.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function NeuropeptideSEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Neuropeptide S has legitimate scientific interest built on solid preclinical pharmacology and human genetic association data. The NPSR1 receptor is well-characterized; the genetic link to anxiety and panic disorder is real. What doesn&apos;t exist is any human evidence for exogenous NPS administration \u2014 no trials, no pharmacokinetics, no safety data, no community use history. The science supports studying NPSR1; it does not support using exogenous NPS.
      </div>
      <div className="reta-evidence__list">
        {SIGNALS.map((s) => {
          const st = TIER_STYLE[s.tier];
          return (
            <div key={s.id} className="reta-evidence__entry" style={{ background: st.bg, border: `1px solid ${st.border}` }}>
              <div className="reta-evidence__entry-top">
                <div className="reta-evidence__entry-claim">{s.claim}</div>
                <div className="reta-evidence__entry-tier" style={{ color: st.labelColor, borderColor: st.border }}>{s.tierLabel}</div>
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
