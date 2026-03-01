/**
 * OctreotideEvidencePanel — honest evidence landscape for Octreotide (Sandostatin).
 * Key frame: strong FDA-approved evidence for approved indications.
 * The PROMID trial (GEP-NET) is moderate-level evidence for anti-tumor activity.
 * No evidence for anti-aging, longevity, or enhancement uses.
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
    id: "acromegaly",
    claim: "GH and IGF-1 suppression in acromegaly",
    tier: "strong",
    tierLabel: "Strong",
    body: "Multiple randomized controlled trials and large observational studies demonstrate octreotide\u2019s efficacy in acromegaly. GH normalization (GH < 2.5 \u00b5g/L) achieved in approximately 50\u201360% of patients; IGF-1 normalization in 50\u201370%. Sandostatin LAR delivers durable biochemical control over years of treatment. This is an FDA-approved indication with the clinical evidence base to support it.",
    sources: "Sandostatin LAR pivotal trials: Newman et al. 1995; Arosio et al. 2000; ACROSTUDY registry. FDA approval: 1988 (immediate-release), 1998 (LAR). Mechanism: SSTR2 agonism at pituitary somatotroph cells suppresses GH secretion.",
  },
  {
    id: "carcinoid",
    claim: "Carcinoid syndrome symptom control (diarrhea, flushing)",
    tier: "strong",
    tierLabel: "Strong",
    body: "FDA-approved for carcinoid syndrome symptom control. Multiple RCTs and large clinical series demonstrate octreotide\u2019s efficacy in reducing secretory diarrhea and flushing episodes from neuroendocrine tumor serotonin and other hormone overproduction. The TELESTAR trial (telotristat, a TPH inhibitor co-treatment) established the treatment landscape in which octreotide is standard of care.",
    sources: "FDA approval for carcinoid syndrome: 1988. Kvols et al. 1986 (original landmark study). Rubin et al. 1992. Arnold et al. 2005. The PROMID trial also captured carcinoid patients in the GEP-NET cohort.",
  },
  {
    id: "variceal-bleeding",
    claim: "Esophageal variceal bleeding \u2014 portal pressure reduction",
    tier: "strong",
    tierLabel: "Strong",
    body: "Multiple RCTs demonstrate octreotide IV reduces portal pressure and variceal bleeding, decreasing transfusion requirements and improving outcomes in acute variceal hemorrhage. Used as a bridge to definitive endoscopic management (banding) and TIPS. This is an off-label use with RCT-level evidence \u2014 standard of care in upper GI bleeding from portal hypertension.",
    sources: "Imperiale and Teran 1995 (meta-analysis); Corley et al. 2001; Banares et al. 2002. Mechanism: SSTR2/5-mediated splanchnic vasoconstriction reduces portal blood flow and pressure.",
  },
  {
    id: "gep-net",
    claim: "GEP-NET anti-proliferative effect (PROMID trial)",
    tier: "moderate",
    tierLabel: "Moderate",
    body: "The PROMID trial (2009) demonstrated that octreotide LAR significantly prolonged time to tumor progression in midgut neuroendocrine tumors compared to placebo (median 14.3 vs 6.0 months). This established anti-tumor activity \u2014 not just symptom control \u2014 for octreotide in GEP-NETs. This evidence was foundational for subsequent SSA anti-tumor trials (CLARINET trial for lanreotide).",
    sources: "Rinke et al. PROMID trial, NEJM 2009. Octreotide LAR 30 mg monthly vs placebo in midgut NETs. Time to progression primary endpoint. OS benefit trend but not statistically significant at initial analysis.",
  },
  {
    id: "vipoma",
    claim: "VIPoma secretory diarrhea control",
    tier: "strong",
    tierLabel: "Strong",
    body: "FDA-approved for VIPoma (vasoactive intestinal peptide-secreting tumor) \u2014 severe secretory diarrhea from VIP overproduction. Octreotide suppresses VIP-stimulated intestinal secretion via SSTR2/5 agonism, dramatically reducing diarrhea volume in the majority of VIPoma patients.",
    sources: "FDA approval: 1988. Maton et al. 1989. Case series and small trials in the rare VIPoma population. Standard of care in a rare but devastating GI secretory syndrome.",
  },
  {
    id: "anti-aging",
    claim: "Anti-aging, longevity, or enhancement applications",
    tier: "none",
    tierLabel: "No evidence",
    body: "No evidence supports octreotide use for anti-aging, longevity framing, or enhancement in GH-normal individuals. The community framing of \u201cIGF-1 suppression for longevity\u201d misapplies the epidemiology of GH/IGF-1 deficiency syndromes to healthy adults and ignores the adverse metabolic and body composition effects of iatrogenic GH suppression in a GH-normal person.",
    sources: "No registered trials, no published evidence for octreotide as an enhancement compound. Literature on GH deficiency in adults (hypopituitarism) documents adverse body composition, metabolic, and cardiovascular effects of GH insufficiency \u2014 the opposite of a longevity intervention.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function OctreotideEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Octreotide has one of the stronger evidence profiles in this database for its approved indications \u2014 FDA approval backed by multiple RCTs across acromegaly, carcinoid syndrome, and VIPomas, plus RCT-level off-label evidence for variceal bleeding. The PROMID trial adds moderate evidence for anti-tumor activity in GEP-NETs. What does not exist is any evidence for non-clinical indications: the longevity and IGF-1 suppression framing in community contexts has no evidentiary basis and misunderstands the pharmacological consequence of GH suppression in a healthy person.
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
