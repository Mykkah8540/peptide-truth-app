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
    id: "physiology",
    claim: "Bradykinin and the kallikrein\u2013kinin system are well-established in human physiology",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "The kallikrein\u2013kinin system is one of the most thoroughly characterized peptide cascades in pharmacology. " +
      "Bradykinin\u2019s synthesis from high-molecular-weight kininogen, its actions at B1 and B2 receptors, " +
      "its role in vasodilation and vascular permeability, and its degradation by ACE (kininase II) are " +
      "textbook-grade established science spanning decades of research.",
    sources: "Marceau & Regoli, Nat Rev Drug Discov 2004; Bhoola et al., Pharmacol Rev 1992",
  },
  {
    id: "ace-angioedema",
    claim: "ACE inhibitors cause angioedema via bradykinin accumulation \u2014 mechanism is definitive",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "ACE inhibitors block kininase II, the enzyme that degrades bradykinin. When bradykinin accumulates " +
      "it causes B2-receptor-mediated vasodilation and increased vascular permeability, producing angioedema " +
      "in roughly 0.1\u20130.7% of patients. This is class-effect for all ACE inhibitors. The mechanism is " +
      "so well understood that it directly drove drug development: icatibant (a B2 antagonist) reverses " +
      "ACE inhibitor-induced angioedema in clinical trials.",
    sources: "Kostis et al., Am J Hypertens 2018; Baş et al., J Allergy Clin Immunol 2010",
  },
  {
    id: "hae",
    claim: "B2 receptor antagonism with icatibant is effective for acute hereditary angioedema attacks",
    tier: "moderate",
    tierLabel: "Moderate evidence",
    body:
      "Icatibant (Firazyr), a synthetic B2 receptor antagonist, is FDA-approved for acute HAE attacks. " +
      "Phase 3 data (FAST-3 trial) showed faster symptom relief vs. placebo. Lanadelumab (Takhzyro) " +
      "prevents HAE by inhibiting plasma kallikrein, reducing bradykinin production upstream. " +
      "Evidence is solid for HAE but the patient population is rare and comparative data vs. other " +
      "HAE treatments are still accumulating.",
    sources: "Cicardi et al., NEJM 2010 (FAST-3); Banerji et al., NEJM 2018 (lanadelumab)",
  },
  {
    id: "community",
    claim: "Exogenous bradykinin has therapeutic or performance-enhancement use",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "There is no scientific or anecdotal basis for exogenous bradykinin injection in community peptide use. " +
      "Bradykinin has an extremely short plasma half-life (seconds), acts locally at the site of generation, " +
      "and systemic administration would cause dangerous vasodilation and hypotension. No clinical development " +
      "program exists for exogenous bradykinin as a therapeutic agent.",
    sources: "No relevant literature",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
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

export default function BradykininEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Bradykinin is a pharmacology reference peptide, not a community-use compound. Evidence below covers
        its established physiology, its role in ACE inhibitor side effects, and targeted therapies for
        hereditary angioedema (HAE).
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
