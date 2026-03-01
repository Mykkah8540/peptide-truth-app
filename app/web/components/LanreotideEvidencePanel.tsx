/**
 * LanreotideEvidencePanel — honest, layered evidence for lanreotide.
 * Key frame: strong evidence for acromegaly and GEP-NETs (FDA-approved indications).
 * CLARINET trial for NETs is landmark. No evidence for community enhancement use
 * (would suppress GH/IGF-1 — counterproductive in typical community context).
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
    id: "acromegaly-gh",
    claim: "Acromegaly: lanreotide suppresses GH and normalizes IGF-1 in 30\u201360% of patients",
    tier: "strong",
    tierLabel: "Strong",
    body: "Multiple RCTs and systematic reviews demonstrate lanreotide\u2019s efficacy in acromegaly. Pooled data suggest GH normalization (<2.5 ng/mL random or <1 ng/mL OGTT-suppressed) in approximately 40\u201360% of patients, and IGF-1 normalization (age-adjusted) in 30\u201350%, depending on tumor characteristics. Responders correlate with higher SSTR2 expression in tumor tissue (assessed by octreoscan/somatostatin receptor scintigraphy or pathology after surgery). The primary Somatuline Depot acromegaly trial (PRIMARYS, Caron P et al.) showed IGF-1 normalization in 34.5% of patients at 12 months as primary therapy. Tumor volume reduction also occurs in approximately 70% of patients, though typically modest (\u2264 25% in most cases).",
    sources: "Melmed S et al. J Clin Endocrinol Metab 2014 (acromegaly guidelines); Caron P et al. PRIMARYS. J Clin Endocrinol Metab 2014; Carmichael JD et al. J Clin Endocrinol Metab 2014 (Somatuline Depot acromegaly, US trial); Giustina A et al. J Clin Endocrinol Metab 2010 (consensus criteria).",
  },
  {
    id: "clarinet-nets",
    claim: "CLARINET trial: lanreotide prolongs progression-free survival in GEP-NETs",
    tier: "strong",
    tierLabel: "Strong",
    body: "The CLARINET trial (Caplin ME et al., NEJM 2014) is the landmark evidence for lanreotide in GEP-NETs. This was a phase 3, double-blind, placebo-controlled trial of 204 patients with well- or moderately-differentiated, SSTR-positive GEP-NETs (intestinal, pancreatic, or unknown primary). Lanreotide 120 mg depot every 28 weeks (approximately monthly) vs placebo. Primary endpoint: progression-free survival (PFS). Median PFS was not reached in the lanreotide arm vs 18.0 months in placebo (HR 0.47; p<0.001; approximately 53% reduction in risk of progression or death). At 24 months, PFS rate was 65.1% vs 33.0%. No significant overall survival difference was observed (immature at trial completion; cross-over allowed). CLARINET established lanreotide as standard of care for stable, SSTR-positive GEP-NETs.",
    sources: "Caplin ME et al. CLARINET. N Engl J Med 2014;371:224\u2013233.",
  },
  {
    id: "carcinoid-symptoms",
    claim: "Control of carcinoid syndrome symptoms (flushing, diarrhea) in functioning NETs",
    tier: "moderate",
    tierLabel: "Moderate",
    body: "Somatostatin analogues (SSAs) \u2014 including both octreotide and lanreotide \u2014 are effective for controlling the hormonal symptoms of carcinoid syndrome: episodic flushing, diarrhea, and wheezing caused by serotonin, histamine, and bradykinin secretion from serotonin-producing NETs. The antisecretory effect is well-established as a class effect. Specific RCT data for lanreotide in carcinoid syndrome symptom control is more limited than for octreotide (which has longer clinical history), but class effect evidence is well-supported. Symptom control does not require tumor progression benefit \u2014 relief of debilitating diarrhea and flushing is itself a meaningful endpoint.",
    sources: "Öberg K et al. Ann Oncol 2012 (ENETS guidelines); Kulke MH et al. J Clin Oncol 2008; Bruns C et al. Eur J Endocrinol 1994 (lanreotide antisecretory).",
  },
  {
    id: "longevity-low-igf1",
    claim: "Community longevity interest: lower GH/IGF-1 via SSA for healthspan extension",
    tier: "none",
    tierLabel: "No evidence",
    body: "Some longevity researchers have noted that lower IGF-1 is associated with longevity in several model organisms (C. elegans, Drosophila, mice with IGF-1 receptor mutations live longer). The hypothesis that pharmacologically reducing GH/IGF-1 via SSA therapy might extend human healthspan is scientifically interesting but has no clinical trial evidence in healthy humans. The model organism data does not translate cleanly to human longevity intervention \u2014 human IGF-1 biology is more complex than in invertebrate or short-lived rodent models, and the optimal IGF-1 range for human longevity is not established. Using lanreotide for longevity purposes in healthy people is not evidence-supported and introduces the safety profile of SSA therapy without established benefit.",
    sources: "No clinical evidence for SSA longevity use in healthy humans. Kenyon C. Nature 2010 (model organism IGF-1/aging review); Bartke A. Front Genet 2012 (GH/IGF-1 longevity in mice).",
  },
  {
    id: "community-enhancement",
    claim: "Community enhancement or performance use",
    tier: "none",
    tierLabel: "No evidence",
    body: "There is no evidence base and no pharmacological rationale for lanreotide as a performance or enhancement compound. Its mechanism is GH/IGF-1 suppression \u2014 the pharmacological opposite of what GH secretagogues, which form the core of the community peptide enhancement stack, are trying to achieve. Lanreotide would suppress the GH axis effects that ipamorelin, CJC-1295, sermorelin, and related peptides are intended to stimulate. The only enhancement-adjacent framing is the speculative longevity hypothesis, which lacks human clinical evidence.",
    sources: "No community evidence. Pharmacological rationale for opposition to GH secretagogues: somatostatin/GHRH antagonism is standard endocrinology.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function LanreotideEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Lanreotide has robust clinical trial evidence for its two approved indications \u2014 acromegaly (multiple RCTs, FDA-approved) and GEP-NETs (CLARINET trial, FDA-approved). The evidence quality matches the standard for a prescription drug with a well-characterized mechanism. The evidence gap is intentional: there are no trials and no rationale for community enhancement use because the mechanism (GH/IGF-1 suppression) is the wrong direction for any typical enhancement goal.
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
