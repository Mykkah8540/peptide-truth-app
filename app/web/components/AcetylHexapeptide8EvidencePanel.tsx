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
    id: "topical-fine-lines",
    claim: "Topical application reduces fine line depth in cosmetic studies",
    tier: "moderate",
    tierLabel: "Moderate evidence",
    body:
      "Several published cosmetic studies report statistically significant reductions in wrinkle depth as measured by silicone replica profilometry and photographic grading after 4–8 weeks of topical AH8 application. However, these studies are consistently limited by small sample sizes (typically N=20–60), short durations, lack of independent replication, and primary funding from ingredient manufacturers. The effect sizes reported are real but modest, and publication bias is likely. No large, independent, blinded RCT has established the effect.",
    sources:
      "Llorente Berzal A et al., Int J Cosmet Sci 2007; Argireline product dossiers (Lipotrue/Lipotec); Gorouhi F & Maibach H, Skin Pharmacol Physiol 2009 (review).",
  },
  {
    id: "transdermal-absorption",
    claim: "Meaningful transdermal absorption reaching the neuromuscular junction",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "No published human pharmacokinetic study has demonstrated that topically applied AH8 reaches the neuromuscular junction at concentrations sufficient to inhibit SNARE complex assembly. Given AH8&apos;s molecular weight (~889 Da) and hydrophilic character, passive diffusion through intact stratum corneum is expected to be minimal. The mechanistic hypothesis requires neuromuscular junction concentrations that topical delivery has not been shown to achieve.",
    sources: "No relevant PK literature identified. Theoretical limitation based on established transdermal penetration principles.",
  },
  {
    id: "injectable-enhancement",
    claim: "Injectable or systemic enhancement benefit",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "There is no published evidence of AH8 being used by injection or systemically. No formulations exist for this route. No pharmacological rationale for systemic use has been proposed.",
    sources: "No relevant literature identified.",
  },
  {
    id: "botox-equivalence",
    claim: "Equivalent effect to botulinum toxin type A (Botox)",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "Marketing language describing AH8 as &quot;topical Botox&quot; is not supported by the evidence. Botulinum toxin A irreversibly cleaves SNAP-25 with well-quantified, clinically significant effects at precisely dosed intramuscular sites. AH8 proposes competitive (not irreversible) inhibition from a topical route with no established target-site bioavailability. Effect magnitude comparisons are not scientifically justified.",
    sources: "No comparative clinical studies exist. FDA cosmetic vs. drug regulatory distinction applies.",
  },
];

const TIER_STYLE: Record<
  Tier,
  { bg: string; border: string; label: string; labelColor: string }
> = {
  strong: {
    bg: "rgba(21,100,58,0.05)",
    border: "rgba(21,100,58,0.13)",
    label: "Strong",
    labelColor: "#155e38",
  },
  moderate: {
    bg: "rgba(124,82,0,0.06)",
    border: "rgba(124,82,0,0.17)",
    label: "Moderate",
    labelColor: "#7c5200",
  },
  none: {
    bg: "rgba(158,56,0,0.06)",
    border: "rgba(158,56,0,0.18)",
    label: "No evidence",
    labelColor: "#9e3800",
  },
};

export default function AcetylHexapeptide8EvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        AH8 has modest cosmetic evidence for surface-level fine line reduction from topical use.
        The evidence base is limited by small, industry-funded studies. Claims that go beyond
        surface cosmetic effect — especially the &quot;topical Botox&quot; framing — have no supporting
        evidence. Transdermal bioavailability at the neuromuscular junction is unproven.
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
