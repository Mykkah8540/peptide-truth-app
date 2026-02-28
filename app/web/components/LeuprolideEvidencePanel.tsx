/**
 * LeuprolideEvidencePanel — calibrated evidence for Leuprolide (Lupron).
 * Key frame: strong Phase 3 RCT and FDA-approval evidence for prostate cancer,
 * endometriosis, precocious puberty, and IVF trigger. Community PCT or testosterone
 * optimization use has zero evidence — it is mechanistically backward.
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
    id: "prostate-cancer",
    claim: "Leuprolide achieves castrate-level testosterone suppression in advanced prostate cancer",
    tier: "strong",
    tierLabel: "Strong — multiple Phase 3 RCTs; cornerstone FDA-approved ADT; decades of clinical evidence",
    body: "Androgen deprivation therapy with leuprolide is one of the most extensively studied interventions in oncology. Multiple Phase 3 randomized controlled trials established leuprolide's efficacy in suppressing testosterone to castrate levels (< 50 ng/dL) in men with advanced prostate cancer. Combined analysis across thousands of patients confirms the endpoint — testosterone suppression is achieved in 95%+ of patients within 3-4 weeks of depot initiation. Disease outcomes (PSA response, symptom palliation, overall survival in metastatic disease) are well-documented. Multiple depot durations (1, 3, 4, 6 months) have been individually validated.",
    sources: "Crawford et al. 1989 (NEJM — leuprolide vs orchiectomy); Vogelzang et al. pivotal trials; FDA NDA for Lupron Depot prostate cancer indications; ASCO/EAU prostate cancer guidelines",
  },
  {
    id: "endometriosis",
    claim: "Leuprolide reduces endometriosis-associated pain",
    tier: "strong",
    tierLabel: "Strong — Phase 3 RCTs; FDA-approved indication; established clinical standard",
    body: "Multiple randomized placebo-controlled trials established leuprolide depot (3.75 mg/month or 11.25 mg/3 months) as effective for reducing dysmenorrhea, pelvic pain, and dyspareunia associated with endometriosis. The mechanism is estrogen deprivation — endometriotic lesions are estrogen-dependent. Clinical response rates (significant pain reduction) exceed placebo by 30-50 percentage points in controlled trials. The FDA approved leuprolide for endometriosis pain management. Bone density loss with extended therapy requires co-management (add-back hormone therapy). Treatment duration is typically limited to 6 months for this indication.",
    sources: "Henzl et al. 1988; Dlugi et al. 1990 (Fertility and Sterility); FDA NDA for Lupron Depot endometriosis indication; Cochrane review on GnRH agonists for endometriosis",
  },
  {
    id: "uterine-fibroids",
    claim: "Leuprolide shrinks uterine fibroids preoperatively",
    tier: "strong",
    tierLabel: "Strong — FDA-approved; multiple controlled trials; well-established preoperative use",
    body: "Leuprolide depot reduces uterine fibroid volume by 35-65% during 3-6 months of treatment through estrogen deprivation. FDA approval covers preoperative management of anemia from uterine fibroids. Controlled trials demonstrate improvements in hemoglobin, reduced menorrhagia, and fibroid volume reduction. The effect is reversible — fibroids regrow after cessation. The preoperative use allows anemia correction before surgery, reduces intraoperative blood loss, and may facilitate minimally invasive surgery. Hypoestrogenic effects (hot flashes, bone density loss) are the adverse effect tradeoff.",
    sources: "Filicori et al. 1983; Friedman et al. 1987 (NEJM); FDA NDA for Lupron Depot uterine fibroids indication",
  },
  {
    id: "precocious-puberty",
    claim: "Leuprolide arrests pubertal development in central precocious puberty",
    tier: "strong",
    tierLabel: "Strong — FDA-approved; controlled pediatric trials; long-term outcome data",
    body: "Central precocious puberty (CPP) — early activation of the HPG axis before age 8 in girls, 9 in boys — is effectively arrested by leuprolide depot. Continuous GnRH agonism suppresses premature LH/FSH secretion, halting pubertal development and allowing linear growth to continue without advanced bone age maturation. Multiple pediatric studies and long-term outcome data confirm safety and efficacy. Pubertal development resumes after cessation with normal timing. This is one of the most evidence-rich pediatric endocrine interventions.",
    sources: "Styne et al. 1985; FDA NDA for Lupron Depot precocious puberty indication; Pediatric Endocrine Society CPP guidelines; long-term safety data from treated cohorts",
  },
  {
    id: "ivf-downregulation",
    claim: "Leuprolide provides pituitary downregulation for controlled ovarian hyperstimulation in IVF",
    tier: "strong",
    tierLabel: "Strong — established IVF protocol; extensive reproductive medicine evidence",
    body: "In the long-protocol IVF approach, leuprolide is used to suppress endogenous LH surges that would otherwise interfere with controlled ovarian hyperstimulation (COH). By downregulating pituitary GnRH receptors before gonadotropin stimulation, leuprolide prevents premature ovulation and allows more predictable follicle development. Multiple controlled reproductive medicine trials and decades of clinical use confirm the utility of this application. This is standard practice in reproductive endocrinology.",
    sources: "Porter et al. 1984 (original GnRH agonist IVF concept); multiple IVF protocol comparisons; SART data reflecting long-protocol prevalence",
  },
  {
    id: "quality-of-life-adt",
    claim: "Quality of life is preserved during androgen deprivation therapy with leuprolide",
    tier: "moderate",
    tierLabel: "Moderate — QOL impacts are substantial; mitigation strategies partially effective",
    body: "ADT with leuprolide produces measurable quality-of-life impairment — hot flashes affect 50-80% of men and are frequently rated as significantly bothersome. Sexual dysfunction (loss of libido, erectile dysfunction) is near-universal. Cognitive effects and mood changes are reported in controlled studies. Fatigue is common. Exercise interventions (resistance training, aerobic exercise) have the best evidence for partially mitigating ADT adverse effects on muscle mass, bone density, and cardiovascular risk. The overall QOL burden of leuprolide ADT is real and well-documented.",
    sources: "Shahinian et al. cardiovascular ADT data; Galvão et al. exercise in ADT; Basaria et al. 2002 (Cancer — ADT metabolic effects); patient-reported outcomes in ADT trials",
  },
  {
    id: "gender-affirming",
    claim: "Leuprolide is effective for sex hormone suppression in gender-affirming care",
    tier: "moderate",
    tierLabel: "Moderate — clinical evidence growing; used widely under physician oversight; evidence base less robust than oncology indications",
    body: "GnRH agonists including leuprolide are used in gender-affirming hormone therapy to suppress endogenous sex hormones before or alongside cross-sex hormone administration. In adolescents, they serve as puberty-blocking agents while gender identity is consolidated. In adults, they may be used to reduce endogenous hormone production. The evidence base for gender-affirming hormone use specifically is growing but less methodologically rigorous than the oncology and pediatric endocrinology evidence. Clinical guidelines from WPATH and Endocrine Society support physician-supervised use.",
    sources: "WPATH Standards of Care Version 8 (2022); Endocrine Society Clinical Practice Guideline on gender dysphoria; Coleman et al. 2022",
  },
  {
    id: "pct-testosterone-stimulation",
    claim: "Leuprolide stimulates testosterone recovery or LH/FSH production for PCT",
    tier: "none",
    tierLabel: "None — mechanistically impossible; community use is pharmacologically backward",
    body: "There is no evidence, theoretical basis, or plausible mechanism by which leuprolide could stimulate testosterone production, LH release, or FSH secretion in the context of post-cycle therapy. Continuous GnRH receptor agonism causes the opposite: receptor downregulation, LH/FSH suppression, and testosterone reduction to castrate levels. PCT protocols require compounds that stimulate gonadotropin release (clomiphene, hCG, gonadorelin in pulsatile doses). Using leuprolide for this purpose would deepen axis suppression, not facilitate recovery. This is a categorical pharmacological error.",
    sources: "Mechanism: Conn & Crowley 1994 (NEJM — GnRH agonist paradox); FDA leuprolide prescribing information; no clinical literature supports PCT use because the mechanism is suppressive",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function LeuprolideEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Leuprolide has one of the strongest evidence bases of any compound in this category for its approved indications — multiple Phase 3 RCTs, FDA approval, and decades of clinical experience for prostate cancer, endometriosis, uterine fibroids, and precocious puberty. The evidence base for community PCT or testosterone optimization is exactly zero, and the mechanism makes any such use pharmacologically impossible. The key education point is the paradox: a GnRH agonist that suppresses rather than stimulates the axis through continuous receptor desensitization.
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
