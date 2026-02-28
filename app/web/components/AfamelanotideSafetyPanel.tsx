type Tier = "flag" | "watch" | "low";

interface SafetyItem {
  id: string;
  heading: string;
  tier: Tier;
  body: string;
  context: string;
}

const SAFETY_ITEMS: SafetyItem[] = [
  {
    id: "melanoma-risk",
    heading: "Melanoma risk and MC1R agonism",
    tier: "flag",
    body:
      "MC1R is a recognized melanoma risk locus — certain MC1R variants are associated with increased melanoma susceptibility. Whether pharmacological MC1R agonism with afamelanotide affects melanoma risk is not definitively established, but the concern is sufficient that afamelanotide&apos;s clinical trials required mandatory melanoma surveillance protocols. The FDA label includes requirements for dermatological monitoring. In EPP patients, where the drug is used under medical supervision with this monitoring in place, the benefit-risk calculation has been deemed favorable. For general population off-label use, the monitoring infrastructure does not exist.",
    context:
      "The FDA-mandated REMS program for afamelanotide (Scenesse) requires prescribers and pharmacies to be certified, and patients must be enrolled in a monitoring program. This is not incidental — it reflects a recognized safety concern requiring active surveillance.",
  },
  {
    id: "nausea-flushing",
    heading: "Nausea and flushing after implant insertion",
    tier: "watch",
    body:
      "Nausea, flushing, and headache are the most commonly reported adverse effects in clinical trials, typically occurring in the first few days following implant insertion and resolving spontaneously. These are expected pharmacological effects of MC1R agonism. They are generally mild to moderate and not a reason for discontinuation in most cases.",
    context:
      "In EPP trials, nausea was reported in approximately 29% of afamelanotide-treated patients vs. 16% of placebo recipients. Flushing was similarly more common with active treatment. Symptoms are typically transient and manageable.",
  },
  {
    id: "hyperpigmentation",
    heading: "Skin darkening and diffuse hyperpigmentation",
    tier: "watch",
    body:
      "Afamelanotide produces the expected pharmacological effect of increased melanin synthesis, resulting in diffuse skin darkening and potential for uneven hyperpigmentation — particularly at and near the implant insertion site. In EPP patients seeking photoprotection, this is the desired therapeutic effect. In any non-EPP user, diffuse unwanted skin darkening is a predictable adverse outcome.",
    context:
      "Hyperpigmentation at the implant site was noted in trials. Cosmetic concern from diffuse darkening may be particularly unwanted in fair-skinned individuals who are considering afamelanotide for reasons other than EPP. Pigmentation changes may not be fully reversible immediately after discontinuation.",
  },
  {
    id: "implant-site",
    heading: "Implant insertion site reactions",
    tier: "watch",
    body:
      "As a subcutaneous implant, afamelanotide carries the standard risks of insertion: bruising, erythema, pain, infection risk at the insertion site, and rarely implant migration. These are procedure-related risks rather than systemic pharmacological effects.",
    context:
      "Insertion is performed by a trained healthcare provider. Self-insertion is not a standard or validated practice. Community melanotan use — which involves self-administered injections of different compounds (MT-I or MT-II) — is procedurally distinct from the approved afamelanotide implant.",
  },
  {
    id: "cardiovascular-systemic",
    heading: "Cardiovascular and major organ toxicity",
    tier: "low",
    body:
      "At therapeutic doses in EPP clinical trials, afamelanotide did not demonstrate significant cardiovascular, hepatic, or renal toxicity. No major organ safety signals emerged from phase II or phase III trial data.",
    context:
      "This low-concern rating applies to the approved dose and schedule (16 mg implant every 60 days). Safety at higher doses, more frequent administration, or combined with other melanocortin-active compounds is not characterized.",
  },
];

const TIER_STYLE: Record<
  Tier,
  { bg: string; border: string; label: string; labelColor: string }
> = {
  flag: {
    bg: "rgba(158,56,0,0.07)",
    border: "rgba(158,56,0,0.20)",
    label: "Stop signal",
    labelColor: "#9e3800",
  },
  watch: {
    bg: "rgba(124,82,0,0.06)",
    border: "rgba(124,82,0,0.17)",
    label: "Worth watching",
    labelColor: "#7c5200",
  },
  low: {
    bg: "rgba(21,100,58,0.05)",
    border: "rgba(21,100,58,0.13)",
    label: "Low concern",
    labelColor: "#155e38",
  },
};

export default function AfamelanotideSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Afamelanotide is an FDA-approved drug with a managed safety profile in EPP — the melanoma
        monitoring requirement is the most significant concern and is addressed through an active
        REMS program. The common adverse effects (nausea, flushing, skin darkening) are expected
        pharmacological effects. Off-label use in the general population removes the monitoring
        safeguards without removing the risks.
      </div>
      <div className="reta-safety__list">
        {SAFETY_ITEMS.map((item) => {
          const st = TIER_STYLE[item.tier];
          return (
            <div
              key={item.id}
              className="reta-safety__entry"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-safety__entry-top">
                <div className="reta-safety__entry-heading">{item.heading}</div>
                <div
                  className="reta-safety__entry-tier"
                  style={{ color: st.labelColor, borderColor: st.border }}
                >
                  {st.label}
                </div>
              </div>
              <div className="reta-safety__entry-body">{item.body}</div>
              <div className="reta-safety__entry-context">{item.context}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
