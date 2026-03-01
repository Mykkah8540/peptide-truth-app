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
    id: "amylin-mech",
    claim: "Amylin receptor pharmacology and glucose regulation",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "Amylin acts on calcitonin receptor / RAMP heterodimers in the area postrema and hypothalamus to suppress postprandial glucagon, slow gastric emptying, and reduce caloric intake. Co-secretion with insulin from beta cells is well-established; the complementary glycemic effects are reproducible and mechanistically characterized across preclinical and clinical pharmacology.",
    sources: "Cooper et al., Endocrine Reviews 1995; Hay et al., British Journal of Pharmacology 2015",
  },
  {
    id: "amylin-pramlintide",
    claim: "Pramlintide (synthetic amylin analogue) efficacy in T1DM and T2DM",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "Pramlintide (Symlin) is FDA-approved (2005) based on multiple Phase 3 RCTs demonstrating significant reductions in HbA1c, postprandial glucose excursions, and body weight versus placebo in both T1DM and insulin-requiring T2DM. Postprandial glucagon suppression is the primary glycemic driver; 1–1.5 kg weight loss over 26 weeks is consistent across trials.",
    sources: "Ratner et al., Diabetes Care 2004; Hollander et al., Diabetes Care 2003",
  },
  {
    id: "amylin-deficiency",
    claim: "Amylin deficiency in T1DM and advanced T2DM as pharmacological rationale",
    tier: "moderate",
    tierLabel: "Moderate evidence",
    body:
      "Circulating amylin is undetectable in T1DM (beta cell destruction) and markedly reduced in advanced T2DM. This deficit is proposed to account for exaggerated postprandial glucagon and accelerated gastric emptying in these populations. The deficiency rationale is well-supported pathophysiologically, though causation for specific clinical outcomes is inferred from replacement trials rather than direct mechanistic studies.",
    sources: "Enoki et al., Diabetologia 1992; Kruger et al., Diabetes Technol Ther 2004",
  },
  {
    id: "amylin-cagrilintide",
    claim: "Long-acting amylin analogues (cagrilintide) combined with GLP-1 agonists for weight loss",
    tier: "moderate",
    tierLabel: "Moderate evidence",
    body:
      "Cagrilintide (once-weekly amylin analogue) combined with semaglutide (\u201cCagriSema\u201d) demonstrated greater weight loss than either agent alone in Phase 2 trials (>15% weight reduction). Phase 3 REDEFINE trials are underway. The combination addresses complementary satiety pathways (hypothalamic GLP-1 vs. area postrema amylin), providing additive efficacy not seen with dose escalation of either drug alone.",
    sources: "Lau et al., The Lancet 2021 (cagrilintide Phase 2); Friedrichsen et al., Cell Metab 2021",
  },
  {
    id: "amylin-community",
    claim: "Community amylin injection protocols using non-pramlintide amylin",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "There is no published evidence supporting community use of recombinant human amylin (IAPP). Human amylin readily forms amyloid fibrils under physiological conditions and at injection sites. Sourcing unformulated human amylin outside pharmaceutical channels introduces severe fibrillation risk with no approved safety profile. Pramlintide — which has proline substitutions specifically to prevent fibrillation — is the only appropriate pharmaceutical option.",
    sources: "Westermark et al., PNAS 1990 (IAPP fibrillation); FDA Symlin label 2005",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function AmylinEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Amylin pharmacology is well-characterized through decades of research and one FDA-approved
        analogue (pramlintide). Evidence for community use of raw amylin is nonexistent — and
        the fibrillation risk makes it an inappropriate research target. The most promising clinical
        development is in combination amylin–GLP-1 therapy for obesity.
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
