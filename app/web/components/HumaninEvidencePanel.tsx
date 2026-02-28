/**
 * HumaninEvidencePanel — calibrated evidence for Humanin.
 * Key frame: cell/rodent neuroprotection is solid; observational human associations
 * are genuine; human interventional data is essentially absent. The centenarian
 * correlation is the most compelling human signal.
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
    id: "neuroprotection-cell",
    claim: "Humanin protects neurons from amyloid-beta toxicity in cell culture",
    tier: "strong",
    tierLabel: "Strong — established cell biology",
    body: "Humanin was discovered in a screen for factors that protect neurons from amyloid-beta (1-43) toxicity. In cell culture, humanin and its synthetic analog HNG (Gly14-humanin, ~1000× more potent) robustly prevent neuronal apoptosis induced by amyloid-beta, mutant amyloid precursor protein, and other AD-associated toxins. The protective mechanism involves binding to pro-apoptotic IGFBP3, BAD/BAX pathway inhibition, and JAK2/STAT3 activation. This is reproducible, mechanistically characterized cell biology.",
    sources: "Hashimoto et al. 2001 (Science — original discovery); Guo et al. 2003; Tajima et al. 2005; multiple cell biology studies",
  },
  {
    id: "rodent-neuroprotection",
    claim: "Humanin improves Alzheimer's-related outcomes in rodent models",
    tier: "moderate",
    tierLabel: "Moderate — multiple rodent models; translation uncertain",
    body: "In multiple transgenic Alzheimer's mouse models, humanin (particularly the potent analog HNG) improves memory, reduces amyloid burden, and decreases neuroinflammation. Intracerebroventricular and systemic administration both show effects, though the systemic-to-brain pharmacokinetics (crossing the blood-brain barrier) are incompletely characterized. The rodent data is consistent across multiple labs and models. Translation to human AD, which is complex and multifactorial, is uncertain.",
    sources: "Matsuoka et al. 2006; Muzumdar et al. 2009; multiple AD mouse model studies",
  },
  {
    id: "metabolic-rodent",
    claim: "Humanin improves insulin sensitivity and metabolic parameters in mice",
    tier: "moderate",
    tierLabel: "Moderate — rodent metabolic studies; human data absent",
    body: "In obese and diabetic mouse models, systemic humanin administration improves insulin sensitivity, glucose tolerance, and adiponectin levels. The mechanism involves hepatic insulin sensitization and adipose tissue metabolic effects. Muzumdar et al. 2009 showed that central (intracerebroventricular) humanin improved peripheral insulin sensitivity — implicating a central nervous system metabolic regulatory pathway. Whether these metabolic effects occur in non-obese, non-diabetic humans from subcutaneous injection is not established.",
    sources: "Muzumdar et al. 2009 (Cell Metabolism); Kim et al. humanin metabolic studies",
  },
  {
    id: "age-decline-human",
    claim: "Endogenous humanin declines with age in humans and is lower in age-related diseases",
    tier: "moderate",
    tierLabel: "Moderate — human observational; not interventional",
    body: "Multiple human cross-sectional studies have found lower circulating humanin levels in older individuals compared to younger, and in individuals with cardiovascular disease, Alzheimer's disease, and type 2 diabetes compared to age-matched controls. These associations are consistent across studies. They establish humanin as an age-associated biomarker but do not prove causation — lower humanin may reflect the disease state rather than contribute to it.",
    sources: "Muzumdar et al. 2009; Kim et al. 2018 (cardiovascular study); multiple biomarker studies",
  },
  {
    id: "centenarian",
    claim: "Centenarians and their offspring have higher humanin levels than controls",
    tier: "moderate",
    tierLabel: "Moderate — compelling human longevity signal; observational",
    body: "A study of centenarians (individuals ≥100 years) and their offspring found significantly higher circulating humanin levels compared to age-matched non-centenarian controls. This longevity offspring association is one of the more striking human data points for any mitokine. It suggests that maintaining higher humanin levels across decades may be a feature of exceptional longevity lineages. The mechanism — whether higher humanin production is protective or a downstream marker of superior mitochondrial health — is not resolved.",
    sources: "Yen et al. 2018; centenarian offspring studies at Albert Einstein College of Medicine",
  },
  {
    id: "lifespan-celegans",
    claim: "Humanin extends lifespan in C. elegans",
    tier: "moderate",
    tierLabel: "Moderate — invertebrate model; translation to humans speculative",
    body: "Exogenous humanin treatment extends lifespan in C. elegans by 20-30% in some studies. The mechanism involves DAF-16 (FOXO transcription factor) pathway activation — the same longevity pathway activated by caloric restriction and insulin/IGF-1 signaling reduction. C. elegans lifespan data is often the first step in longevity biology but is a simplified model organism. Translation to mammalian or human lifespan is speculative.",
    sources: "Maximino et al. C. elegans humanin studies; DAF-16/FOXO pathway lifespan literature",
  },
  {
    id: "human-rct",
    claim: "Exogenous humanin injection produces measurable clinical benefit in humans",
    tier: "none",
    tierLabel: "None — no human RCTs published",
    body: "There are no published randomized controlled trials of exogenous humanin injection in humans for any indication. The human interventional data does not exist. Community use is based on extrapolation from rodent efficacy, human observational associations, and the centenarian correlation. This is a standard-of-evidence gap that cannot be bridged by mechanistic plausibility alone.",
    sources: "Absence of published human RCT data as of 2025",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function HumaninEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Humanin has unusually coherent biology for an investigational peptide — a well-characterized mechanism, consistent rodent data, and genuine human observational associations including the centenarian finding. The critical gap is human interventional data: no RCT has established that injecting humanin in humans produces any of the benefits seen in model organisms. The evidence hierarchy is: cell biology (strong) → rodent (moderate, multiple models) → human observational (moderate) → human interventional (absent).
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
