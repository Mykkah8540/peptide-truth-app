/**
 * DesmopressinEvidencePanel — calibrated evidence for Desmopressin (DDAVP).
 * Key frame: strong evidence for all FDA-approved indications (CDI, enuresis,
 * nocturia, vWD Type 1, hemophilia A). Moderate evidence for memory/cognition
 * in small studies — inconsistent and not clinically applied. No evidence for
 * athletic or antidiuretic non-medical use.
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
    id: "central-di",
    claim: "Desmopressin controls polyuria and polydipsia in central diabetes insipidus",
    tier: "strong",
    tierLabel: "Strong — FDA-approved; well-established; decades of clinical evidence",
    body: "Central diabetes insipidus — caused by inadequate vasopressin production or release from the posterior pituitary — results in massive urine output (polyuria, 3-20+ liters/day) and compensatory excessive thirst (polydipsia). Desmopressin is the primary pharmacological treatment, replacing the deficient ADH effect at V2 receptors. Multiple clinical studies across congenital and acquired CDI have established that appropriate desmopressin dosing normalizes urine osmolality and reduces urine output to near-normal. The clinical response (reduced polyuria, resolution of polydipsia) is rapid and dramatic in responders. This is one of the most clearly defined receptor-replacement therapies in endocrinology.",
    sources: "Bichet et al. CDI management reviews; Richardson & Robinson 1985; Robertson 1984 (NEJM — CDI physiology and treatment); FDA prescribing information for DDAVP",
  },
  {
    id: "nocturnal-enuresis",
    claim: "Desmopressin reduces bedwetting episodes in primary nocturnal enuresis in children",
    tier: "strong",
    tierLabel: "Strong — FDA-approved; multiple RCTs; Cochrane review evidence",
    body: "Primary nocturnal enuresis (PNE) is characterized by inadequate nocturnal vasopressin surge with resulting excessive nighttime urine production. Desmopressin reduces nighttime urine production by concentrating it, giving children the opportunity to remain dry. Multiple randomized controlled trials and meta-analyses confirm significant reduction in wet nights compared to placebo. Cochrane review evidence supports short-term efficacy. The effect is present during treatment (treatment-dependent) — relapse after cessation is common, though some children achieve sustained dryness after a treatment course. It is less effective if enuresis is due to non-vasopressin mechanisms (small bladder capacity, deep sleep).",
    sources: "Glazener & Evans 2002 (Cochrane Review — desmopressin for nocturnal enuresis); Rittig et al. 1989; multiple enuresis RCTs; FDA prescribing information for DDAVP enuresis indication",
  },
  {
    id: "nocturia",
    claim: "Desmopressin reduces nighttime voiding in adults with nocturia",
    tier: "strong",
    tierLabel: "Strong — FDA-approved (Noctiva, 2017); multiple adult RCTs; confirmed for nocturnal polyuria",
    body: "Nocturia (waking 2+ times per night to void) due to nocturnal polyuria (excess nighttime urine production) is the primary indication for Noctiva (desmopressin acetate nasal spray, 1.66 mcg in men, lower in women). FDA approval was based on two Phase 3 RCTs showing significant reduction in nighttime voids and increased time to first void in adults with documented nocturnal polyuria. The patient selection criterion (nocturnal polyuria index > 33%) is important — the drug works for nocturia caused by insufficient ADH production at night, not for nocturia from overactive bladder or small bladder capacity.",
    sources: "Chapple et al. 2013 (European Urology — desmopressin for nocturia); IXOTEN and VENUS trial data; FDA approval package for Noctiva (2017); ICS nocturia guidelines",
  },
  {
    id: "vwd-hemophilia",
    claim: "Desmopressin achieves hemostasis in von Willebrand disease Type 1 and mild hemophilia A",
    tier: "strong",
    tierLabel: "Strong — FDA-approved (Stimate); well-established hemostatic mechanism; hematology guideline recommended",
    body: "V2 receptor activation in vascular endothelial cells releases stored von Willebrand factor (vWF) and Factor VIII from Weibel-Palade bodies. In Type 1 vWD (partial quantitative deficiency) and mild hemophilia A (Factor VIII > 5%), this release effect is sufficient to achieve hemostatic levels for minor procedures and bleeding episodes. Desmopressin (via IV infusion at 0.3 mcg/kg or high-concentration intranasal spray Stimate at 150 mcg/nostril) achieves 2-4x baseline increases in vWF and Factor VIII within 30-60 minutes. This effect is well-characterized and avoids blood product exposure. Tachyphylaxis with repeated doses limits use to 2-3 consecutive doses.",
    sources: "Mannucci et al. 1977 (original desmopressin hemostatic use); Rodeghiero et al. vWD treatment guidelines; ASH vWD guidelines; FDA prescribing information for Stimate",
  },
  {
    id: "memory-cognition",
    claim: "Desmopressin improves memory and cognitive function",
    tier: "moderate",
    tierLabel: "Moderate — small studies; inconsistent; not a clinical application",
    body: "Vasopressin receptors (V1a) are expressed in brain regions involved in learning and memory — amygdala, hippocampus, septum. Early studies in the 1970s-1980s found that vasopressin and desmopressin could enhance memory consolidation and recall in rodents and in small human studies. However, subsequent research produced inconsistent results — some studies showed memory enhancement, others showed no effect or even memory impairment at higher doses. The clinical significance of any memory effect from the minimal CNS penetration achieved by peripheral desmopressin administration is uncertain. No clinical application for cognitive enhancement has been developed.",
    sources: "De Wied 1976 (original vasopressin memory research); Weingartner et al. 1981; Beckwith et al. 1982 (conflicting human data); lack of consistent clinical evidence despite initial interest",
  },
  {
    id: "athletic-masking",
    claim: "Desmopressin improves athletic performance or effectively masks banned substances in urine",
    tier: "none",
    tierLabel: "None — no performance evidence; banned by WADA; hyponatremia risk",
    body: "Desmopressin has no established mechanism for athletic performance enhancement and no evidence of ergogenic benefit in controlled studies. Its antidiuretic effect could theoretically concentrate urine (potentially complicating some doping tests) and reduce weight temporarily through water retention — neither of which provides athletic performance benefit. WADA explicitly bans desmopressin and all V2 vasopressin receptor agonists in sport. Using desmopressin for this purpose creates real hyponatremia risk without monitoring and the ban violation without performance benefit.",
    sources: "WADA Prohibited List — peptide hormones section including desmopressin; no performance evidence in sport literature",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function DesmopressinEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Desmopressin has strong evidence for all five of its FDA-approved indications — central DI, nocturnal enuresis, nocturia, von Willebrand disease Type 1, and hemophilia A. The evidence quality is high because desmopressin has been in clinical use for 50 years with substantial controlled trial data. The memory enhancement hypothesis from early vasopressin research has not translated into a clinical application. Athletic or antidiuretic non-medical use has no evidence and carries real hyponatremia risk.
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
