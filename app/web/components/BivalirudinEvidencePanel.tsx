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
    id: "bival-pci",
    claim: "Anticoagulation efficacy during PCI",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "Bivalirudin's anticoagulant efficacy during PCI is established by multiple large RCTs. REPLACE-2 (6010 patients, elective/urgent PCI) demonstrated non-inferiority to heparin + GPI for ischemic endpoints. ACUITY (13,819 patients, moderate-to-high-risk ACS) showed non-inferiority for ischemia with significantly reduced major bleeding. FDA approval for PCI indication is based on this trial program. Anticoagulation monitoring (ACT — activated clotting time) reliably tracks effect.",
    sources: "Lincoff et al., JAMA 2003 (REPLACE-2); Stone et al., NEJM 2006 (ACUITY)",
  },
  {
    id: "bival-mechanism",
    claim: "Direct thrombin inhibition mechanism (bivalent active site + exosite-1 binding)",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "The crystal structure of bivalirudin–thrombin complex is solved; the bivalent binding mode (active site D-Phe-Pro-Arg-Pro and hirudin-like N-terminal exosite-1 engagement) is fully characterized. Thrombin's proteolytic cleavage of the bivalirudin linker sequence (causing partial inactivation) is biochemically documented. The mechanism explains the drug's short half-life, predictable dose-response, and lack of need for antithrombin cofactor.",
    sources: "Maraganore et al., Biochemistry 1990; Skrzypczak-Jankun et al., Thromb Haemost 1991",
  },
  {
    id: "bival-bleeding",
    claim: "Reduced bleeding versus heparin + GPI in STEMI (HORIZONS-AMI)",
    tier: "moderate",
    tierLabel: "Moderate evidence",
    body:
      "The HORIZONS-AMI trial (3602 STEMI patients undergoing primary PCI) demonstrated that bivalirudin significantly reduced 30-day major bleeding versus unfractionated heparin plus GPI (4.9% vs. 8.3%; p < 0.001), with lower all-cause and cardiac mortality at 30 days. However, acute stent thrombosis rates were higher with bivalirudin in the periprocedural period. The net clinical benefit and the optimal use context (vs. heparin alone, vs. heparin with selective GPI use) have been debated in subsequent meta-analyses and trials.",
    sources: "Stone et al., NEJM 2008 (HORIZONS-AMI); MATRIX trial, Valgimigli et al., Lancet 2015",
  },
  {
    id: "bival-community",
    claim: "Community, enhancement, or non-hospital use",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "Bivalirudin requires IV administration, ACT monitoring, and a trained cardiac catheterization team. It is an anticoagulant with significant bleeding risk if misused. There is no enhancement, recovery, or community application for a drug whose entire mechanism is preventing blood clotting during arterial procedures. It is categorically outside any reasonable peptide community use case.",
    sources: "Angiomax (bivalirudin) prescribing information; no community use publications",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function BivalirudinEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Bivalirudin has one of the most robust evidence bases of any peptide drug — three
        large RCTs, FDA approval, and a mechanistically characterized active site. The nuance is
        in its comparative position versus heparin-based regimens, where context (STEMI vs. elective
        PCI, GPI use vs. no GPI use) materially affects which anticoagulant is preferred.
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
