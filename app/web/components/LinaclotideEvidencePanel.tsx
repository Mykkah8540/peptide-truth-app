/**
 * LinaclotideEvidencePanel — honest, layered evidence for linaclotide.
 * Key frame: strong evidence for GC-C mechanism, IBS-C stool endpoints,
 * and CIC benefit. Moderate evidence for visceral pain reduction.
 * No systemic or enhancement use evidence (not systemically absorbed).
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
    id: "mechanism",
    claim: "GC-C receptor activation produces intestinal fluid secretion and accelerated transit",
    tier: "strong",
    tierLabel: "Strong",
    body: "The mechanism of linaclotide is comprehensively characterized. GC-C (guanylate cyclase-C) is a transmembrane receptor on intestinal epithelial cells. Linaclotide binds GC-C with high affinity, causing intracellular cGMP accumulation. cGMP activates protein kinase G-II (PKGII), which phosphorylates CFTR chloride channels and inhibits NHE3 (the sodium-hydrogen exchanger responsible for sodium absorption). The combined effect: increased luminal chloride secretion, reduced sodium absorption, net fluid secretion into the intestinal lumen, softer stool consistency, and faster intestinal transit. The mechanism has been fully characterized at the molecular, cellular, and in vivo levels. The structural basis for linaclotide\u2019s higher affinity than endogenous guanylin is its cyclic structure and disulfide bond pattern mimicking the C-terminal active domain of guanylin.",
    sources: "Hamra FK et al. Proc Natl Acad Sci 1993 (GC-C and guanylin); Busby RW et al. J Pharmacol Exp Ther 2010 (linaclotide mechanism); Rao AS & Camilleri M. Aliment Pharmacol Ther 2012 (linaclotide pharmacology review).",
  },
  {
    id: "ibs-c-trials",
    claim: "IBS-C: Phase 3 trials demonstrate improvement in abdominal pain and bowel habits",
    tier: "strong",
    tierLabel: "Strong",
    body: "Two large Phase 3 RCTs (Lembo AJ et al. and Chey WD et al., NEJM 2012) evaluated linaclotide 290 mcg vs placebo in IBS-C patients (Rome II criteria), each enrolling approximately 800 patients over 26 weeks. The primary endpoint was a composite of concurrent improvement in worst abdominal pain (\u226530% reduction) and complete spontaneous bowel movements (\u22651 CSBMs above baseline), for \u226550% of treatment weeks \u2014 a stringent endpoint. Responder rates: 33.6% vs 13.9% (Lembo trial) and 34.0% vs 17.0% (Chey trial) for linaclotide vs placebo (both p<0.0001). Abdominal pain and bloating were also significantly improved. The dual endpoint captures the IBS-C diagnostic requirement for both bowel and pain components.",
    sources: "Lembo AJ et al. N Engl J Med 2012;367:699\u2013708; Chey WD et al. N Engl J Med 2012;367:709\u2013719.",
  },
  {
    id: "cic-trials",
    claim: "CIC: Phase 3 trials demonstrate significant improvement in stool frequency and consistency",
    tier: "strong",
    tierLabel: "Strong",
    body: "Two Phase 3 RCTs evaluated linaclotide (145 mcg and 290 mcg) vs placebo in chronic idiopathic constipation over 12 weeks (Lembo AJ et al., Am J Gastroenterol 2011). Primary endpoint: CSBMs (complete spontaneous bowel movements) per week. Responder rates (defined as \u22653 CSBMs/week AND an increase of \u22651 CSBM from baseline, for \u226575% of treatment weeks): approximately 19\u201321% for linaclotide vs 3\u20135% for placebo (both doses p<0.001). Stool consistency (Bristol Stool Scale), straining, and constipation severity scores all improved significantly. The effect was sustained over 12 weeks without evidence of tachyphylaxis.",
    sources: "Lembo AJ et al. Am J Gastroenterol 2011;106:2067\u20132075.",
  },
  {
    id: "visceral-pain",
    claim: "Visceral pain reduction in IBS-C: evidence is meaningful but endpoint-dependent",
    tier: "moderate",
    tierLabel: "Moderate",
    body: "The visceral pain mechanism (cGMP modulation of subepithelial afferent nociceptor neurons) is well-characterized in animal models and supported by human trial data as a secondary endpoint. In the Phase 3 IBS-C trials, abdominal pain scores (worst daily abdominal pain rated on an 11-point scale) were significantly improved with linaclotide vs placebo. The magnitude of pain reduction was approximately 2 points on the 11-point scale \u2014 a clinically meaningful but not dramatic change. The pain benefit is robust in IBS-C (where visceral hypersensitivity is a core pathophysiological feature) and is less applicable in CIC (where visceral pain is less prominent). The animal model evidence for a direct neural mechanism (cGMP in afferent neurons via CFTR) is mechanistically compelling; the human dose-response for pain is less cleanly characterized.",
    sources: "Busby RW et al. J Pharmacol Exp Ther 2010 (preclinical pain mechanism); Lembo AJ et al. N Engl J Med 2012 (pain endpoint); Chey WD et al. N Engl J Med 2012 (pain endpoint); Bhatt DL \u2014 no; Castro J et al. J Neurosci 2013 (afferent neuron mechanism).",
  },
  {
    id: "systemic-enhancement",
    claim: "Systemic, enhancement, or non-GI use",
    tier: "none",
    tierLabel: "No evidence",
    body: "Linaclotide is not systemically absorbed at therapeutic doses. Plasma concentrations after oral dosing are below the limit of quantification using sensitive assays. This is not a limitation to overcome \u2014 it is a deliberate design feature. The peptide is engineered to be active in the gut lumen and degraded before absorption. No systemic pharmacology is possible; no enhancement use is pharmacologically conceivable. GC-C receptors are expressed in the kidney, lung, and brain, but linaclotide never reaches them at therapeutic doses. Any community interest in linaclotide for non-GI purposes reflects a fundamental misunderstanding of its pharmacokinetic design.",
    sources: "Busby RW et al. J Pharmacol Exp Ther 2010 (pharmacokinetics); FDA prescribing information for Linzess (pharmacokinetics section).",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function LinaclotideEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Linaclotide has strong, well-designed Phase 3 trial evidence for both approved indications (IBS-C and CIC). The composite endpoint used in the IBS-C trials is stringent \u2014 concurrent pain and bowel improvement required \u2014 making the positive results meaningful. The evidence picture is clear: effective for its GI indications, zero systemic pharmacology, zero enhancement application. The interesting pharmacology is mechanistic: a 14-amino-acid cyclic peptide mimicking an endogenous gut hormone to activate a receptor that controls both secretion and visceral pain.
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
