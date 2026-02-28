/**
 * HCGEvidencePanel — calibrated evidence for hCG.
 * Key frame: decades of reproductive medicine data in approved indications;
 * TRT adjunct evidence is extensive though largely observational/clinical;
 * hCG diet claims have no evidence.
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
    id: "leydig-stimulation",
    claim: "hCG stimulates testicular testosterone production in males",
    tier: "strong",
    tierLabel: "Strong — established endocrinology; decades of clinical data",
    body: "hCG's Leydig cell stimulation via LHCGR is textbook reproductive endocrinology. Testosterone rises predictably following hCG injection, peaking at 24-48 hours. The dose-response relationship is well-characterized. This is the pharmacological basis for hCG's multiple clinical applications — not a speculative mechanism.",
    sources: "Reproductive endocrinology textbooks; clinical pharmacology data from Pregnyl/Novarel prescribing information; decades of reproductive medicine literature",
  },
  {
    id: "hypogonadotropic-hypogonadism",
    claim: "hCG restores testosterone and fertility in hypogonadotropic hypogonadism",
    tier: "strong",
    tierLabel: "Strong — FDA-approved indication; controlled clinical data",
    body: "In males with hypogonadotropic hypogonadism (low LH/FSH, low testosterone, intact testes), hCG produces testosterone normalization and, with or without FSH supplementation, spermatogenesis restoration. This is an FDA-approved indication with multiple controlled studies. The effect requires intact, responsive Leydig cells — primary gonadal failure (testicular dysfunction) does not respond.",
    sources: "FDA approval data; Liu et al. hypogonadotropic hypogonadism treatment reviews; Rastrelli et al. 2014",
  },
  {
    id: "ovulation-induction",
    claim: "hCG triggers ovulation and final oocyte maturation in females",
    tier: "strong",
    tierLabel: "Strong — FDA-approved; decades of IVF/ART data",
    body: "hCG's LH-like action triggers the ovulatory LH surge in follicle-stimulated women. It is used as the 'trigger shot' in IVF cycles to induce final oocyte maturation 34-36 hours before egg retrieval. Decades of ART data support its safety and efficacy in this application. Kisspeptin is being studied as an alternative trigger to reduce OHSS risk.",
    sources: "IVF clinical practice literature; Cohlen et al. ovulation induction systematic review; ART outcome databases",
  },
  {
    id: "trt-testicular-preservation",
    claim: "hCG prevents testicular atrophy and maintains intratesticular testosterone during TRT",
    tier: "strong",
    tierLabel: "Strong — multiple controlled studies; clinically established practice",
    body: "Multiple studies have demonstrated that hCG coadministration during TRT maintains testicular volume, intratesticular testosterone, and spermatogenic potential. Coviello et al. 2005 (JCEM) is the landmark study showing that 125-500 IU hCG every other day with TRT maintained intratesticular testosterone levels. This is the evidence basis for hCG as standard TRT adjunct practice.",
    sources: "Coviello et al. 2005 (J Clin Endocrinol Metab); Liu et al. 2005; Hsieh et al. 2013; Kaminetsky et al. 2013",
  },
  {
    id: "fertility-restoration-post-trt",
    claim: "hCG (with or without FSH) restores fertility after TRT cessation",
    tier: "moderate",
    tierLabel: "Moderate — multiple case series; not large RCTs",
    body: "Multiple case series and cohort studies have documented fertility restoration in men after stopping TRT, using hCG with or without FSH supplementation. Time to spermatogenesis restoration varies widely (3-18 months). Starting hCG before or with TRT (rather than after cessation) improves outcomes. The evidence is primarily observational — large RCTs are lacking but the clinical approach is well-established in reproductive urology.",
    sources: "Sigman et al. 2013; Wenker et al. 2015; Crosnoe et al. case series; reproductive urology clinical practice literature",
  },
  {
    id: "hcg-diet",
    claim: "hCG injections or oral preparations produce weight loss beyond caloric restriction",
    tier: "none",
    tierLabel: "None — no evidence; FDA has issued warnings",
    body: "The 'hCG diet' (very low calorie diet + hCG injections or oral products) claims that hCG reduces hunger and causes fat loss beyond caloric restriction. Multiple controlled trials have shown no difference in weight loss, hunger, or body composition between hCG and placebo when caloric restriction is held constant. The weight loss occurs from extreme caloric restriction, not hCG. The FDA has issued warning letters to hCG diet product sellers. Oral hCG has zero bioavailability for the intact glycoprotein.",
    sources: "Lijesen et al. 1995 systematic review; FDA consumer warnings on hCG diet products; controlled trials consistently showing no hCG effect beyond placebo",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function HCGEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        hCG has pharmaceutical-grade evidence for its approved reproductive indications — Leydig cell stimulation, hypogonadotropic hypogonadism, ovulation induction, and IVF trigger are textbook endocrinology supported by decades of controlled clinical data. The TRT adjunct evidence is strong though primarily observational. The hCG diet claim is explicitly unsupported — controlled trials show no effect beyond caloric restriction.
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
