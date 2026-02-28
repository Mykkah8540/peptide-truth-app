/**
 * TriptorelinEvidencePanel — calibrated evidence for Triptorelin.
 * Key frame: strong FDA-approved evidence for prostate cancer and precocious
 * puberty. The mechanism of axis suppression is well-characterized. Community
 * PCT use is pharmacologically irrational — the mechanism produces opposite
 * effects from what PCT requires.
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
    claim: "Triptorelin reduces testosterone to castrate levels for prostate cancer treatment",
    tier: "strong",
    tierLabel: "Strong — FDA-approved; multiple RCTs; decades of clinical evidence",
    body: "Triptorelin (Trelstar) is FDA-approved for the palliative treatment of advanced prostate cancer. Multiple randomized controlled trials have demonstrated that triptorelin depot formulations achieve medical castration (testosterone < 50 ng/dL) in > 90% of patients within 4 weeks. Head-to-head comparisons with other GnRH agonists (leuprolide, goserelin) demonstrate equivalent castration efficacy. Survival outcomes, PSA suppression, and disease control are well-characterized across patient populations. The mechanism — continuous GnRH receptor stimulation causing LH/FSH collapse — is the definitive evidence base for GnRH agonist pharmacology.",
    sources: "Crawford et al. 2002 (Trelstar registration trials); Heyns et al. 2003 (head-to-head vs. leuprolide); multiple EAU/AUA prostate cancer guideline citations",
  },
  {
    id: "precocious-puberty",
    claim: "Triptorelin suppresses premature puberty in children with central precocious puberty",
    tier: "strong",
    tierLabel: "Strong — FDA-approved; controlled clinical evidence; pediatric endocrine guideline standard",
    body: "Central precocious puberty (CPP) is caused by premature activation of the hypothalamic-pituitary-gonadal axis. Triptorelin depot suppresses this premature activation, halting pubertal progression and allowing age-appropriate development. Multiple controlled clinical trials demonstrate efficacy in halting bone age advancement, reducing gonadotropin levels, and preserving adult height potential. This is a standard pediatric endocrine indication managed by pediatric endocrinologists with long-term monitoring protocols.",
    sources: "FDA approval for CPP; Carel et al. (European consensus on CPP treatment); Klein et al. pediatric endocrinology GnRH agonist guidelines",
  },
  {
    id: "chemical-castration-mechanism",
    claim: "Continuous GnRH agonism produces receptor desensitization and axis suppression — the pharmacological opposite of pulsatile GnRH",
    tier: "strong",
    tierLabel: "Strong — foundational neuroendocrinology; mechanism confirmed in humans and animal models",
    body: "The paradox of GnRH agonist pharmacology — that continuous stimulation suppresses rather than stimulates the axis — is among the most well-characterized observations in reproductive endocrinology. Receptor desensitization, downregulation, and uncoupling from intracellular signaling cascades have been characterized in detail. The differential effect of pulsatile vs. continuous GnRH was established in the 1980s through pioneering work by Knobil and colleagues. This is foundational endocrinology, not investigational pharmacology.",
    sources: "Knobil 1980 (Science — pulsatile GnRH requirement); Conn & Crowley 1994 (GnRH agonist endocrinology review); Belchetz et al. 1978 (original pulsatile vs. continuous GnRH observations in primates)",
  },
  {
    id: "endometriosis",
    claim: "Triptorelin reduces endometriosis-associated pain and lesions via estrogen suppression",
    tier: "moderate",
    tierLabel: "Moderate — EU/UK approved; multiple controlled trials; bone density loss limits long-term use",
    body: "Endometriosis is an estrogen-dependent condition. Triptorelin's estrogen suppression reduces endometrial lesion activity and associated pain. Multiple randomized trials have demonstrated efficacy comparable to other GnRH agonists for endometriosis. The limitation is bone density loss with prolonged estrogen suppression — clinical protocols use 'add-back' hormone therapy (low-dose estrogen/progestogen) to mitigate bone loss while maintaining therapeutic estrogen suppression. Triptorelin is approved for this indication in EU and UK but not in the US (where leuprolide has approval).",
    sources: "Vercellini et al. endometriosis GnRH agonist meta-analyses; ESHRE endometriosis management guidelines; add-back therapy literature",
  },
  {
    id: "gender-affirming",
    claim: "Triptorelin is used as puberty blocker and gonadotropin suppressor in gender-affirming care",
    tier: "moderate",
    tierLabel: "Moderate — established clinical use in GAHT protocols; monitoring required",
    body: "GnRH agonists including triptorelin are used in gender-affirming hormone therapy (GAHT) as puberty blockers in adolescents and as part of feminizing hormone regimens in adults (suppressing endogenous testosterone to allow lower estrogen doses). This is a recognized clinical indication in gender medicine guidelines from endocrine societies in multiple countries. The evidence base for specific GAHT protocols is evolving — bone density monitoring, fertility counseling, and mental health support are components of responsible clinical management.",
    sources: "Endocrine Society GAHT guidelines 2017; WPATH Standards of Care 8; Coleman et al. 2022",
  },
  {
    id: "pct-use",
    claim: "Triptorelin can be used as post-cycle therapy to restart testosterone production after anabolic steroid use",
    tier: "none",
    tierLabel: "None — pharmacologically irrational; mechanism produces the opposite of PCT goals",
    body: "Post-cycle therapy (PCT) after anabolic steroid use requires stimulating endogenous testosterone production — the HPG axis needs activation and upregulation. Triptorelin suppresses the axis via continuous GnRH receptor desensitization. Using triptorelin as PCT would worsen post-cycle axis suppression, not improve it. The appropriate PCT pharmacological approaches are SERMs (clomiphene, tamoxifen — block estrogen feedback, allowing LH/FSH to rise) or pulsatile GnRH analogs (gonadorelin — maintains axis function). Triptorelin does the opposite of what PCT requires. Any claim that triptorelin 'restarts' the HPTA post-cycle contradicts established GnRH agonist pharmacology.",
    sources: "GnRH agonist pharmacology (Conn & Crowley 1994); contrast with SERM PCT mechanism (Kaminetsky et al.); gonadorelin pulsatile stimulation literature",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",         labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",       labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence",    labelColor: "#9e3800" },
};

export default function TriptorelinEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Triptorelin&apos;s evidence base is strong for its approved indications — prostate cancer, precocious puberty, and endometriosis (in markets where approved). The mechanism of axis suppression via continuous GnRH agonism is foundational endocrinology with decades of characterization. The community use case of triptorelin as PCT is pharmacologically impossible — the mechanism produces suppression, not stimulation. Any evidence discussion of triptorelin must start from this pharmacological ground truth.
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
