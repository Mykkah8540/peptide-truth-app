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
    id: "biomarker",
    claim: "BNP and NT-proBNP are gold-standard biomarkers for heart failure diagnosis and monitoring",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "Elevated BNP and NT-proBNP have been validated in multiple large trials as the most sensitive " +
      "and specific blood tests for identifying heart failure as the cause of dyspnea, and for " +
      "stratifying prognosis. The Breathing Not Properly (BNP) Multinational Study (Maisel et al., " +
      "NEJM 2002) established BNP\u2019s diagnostic superiority over clinical assessment alone. " +
      "Guidelines from ESC and ACC/AHA list natriuretic peptides as Class I recommended biomarkers " +
      "in heart failure diagnosis and management.",
    sources:
      "Maisel et al., NEJM 2002; McDonagh et al., ESC Heart Failure Guidelines 2021; Yancy et al., ACC/AHA HF Guidelines 2022",
  },
  {
    id: "physiology",
    claim: "Natriuretic peptide system physiology (NPR-A, cGMP signaling) is well characterized",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "BNP signals through natriuretic peptide receptor A (NPR-A), activating particulate guanylyl cyclase " +
      "and raising intracellular cGMP. This drives natriuresis via renal tubular effects, vasodilation " +
      "via smooth muscle relaxation, and neurohormonal suppression via RAAS and SNS inhibition. " +
      "The molecular biology, receptor pharmacology, and downstream signaling of the natriuretic peptide " +
      "family (ANP, BNP, CNP) are textbook-grade established science.",
    sources: "de Bold et al., Science 1981; Potter et al., J Biol Chem 2006; Levin et al., NEJM 1998",
  },
  {
    id: "nesiritide",
    claim: "Nesiritide provides acute symptom relief in ADHF but does not improve mortality",
    tier: "moderate",
    tierLabel: "Moderate evidence",
    body:
      "Nesiritide (recombinant human BNP) produces rapid vasodilation, reduces filling pressures, and " +
      "improves dyspnea in acute decompensated heart failure. However, the landmark ASCEND-HF trial " +
      "(7,141 patients) showed no significant improvement in dyspnea, 30-day rehospitalization, or " +
      "mortality compared to placebo. A meta-analysis raised concern about worsening renal function. " +
      "Nesiritide remains approved but is used selectively, not as routine first-line therapy.",
    sources:
      "O\u2019Connor et al., NEJM 2011 (ASCEND-HF); Sackner-Bernstein et al., JAMA 2005 (renal meta-analysis)",
  },
  {
    id: "community",
    claim: "BNP or nesiritide has use in community peptide stacks or wellness contexts",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "There is no scientific basis, anecdotal report, or plausible mechanism supporting community use " +
      "of BNP or nesiritide. Nesiritide causes significant hypotension and requires IV administration " +
      "with hemodynamic monitoring. BNP as a biomarker is a blood test, not an injectable compound. " +
      "No gray-market supply exists and no development program targets wellness or enhancement applications.",
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

export default function BrainNatriureticPeptideEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        BNP evidence spans two distinct domains: its role as a diagnostic biomarker (blood test used
        in clinical care) and nesiritide as a recombinant therapeutic agent. Both are strictly clinical;
        there is no community use dimension.
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
