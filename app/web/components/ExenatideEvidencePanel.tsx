/**
 * ExenatideEvidencePanel — calibrated evidence for Exenatide (Byetta / Bydureon).
 * Key frame: FDA-approved with robust T2D RCT data (AMIGO program); strong glycemic
 * evidence; modest weight loss clearly established; CV outcomes neutral (EXSCEL);
 * weight loss inferiority to semaglutide and tirzepatide is the central comparative fact.
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
    id: "t2d-glycemic",
    claim: "Exenatide reduces HbA1c in T2D — FDA-approved indication",
    tier: "strong",
    tierLabel: "Strong — FDA-approved; large RCT program (AMIGO); replicated across trials",
    body: "The AMIGO (Assessment of Weekly AdministRation of LY2189265 in Diabetes — no; specifically the three AMIGO trials: AMIGO 1, 2, and 3) trials demonstrated that exenatide 10 mcg twice daily reduced HbA1c by 0.5-0.9 percentage points from baseline compared to placebo, with additional active comparator arms (metformin, sulfonylurea, thiazolidinedione backgrounds). These are large, well-powered, industry-sponsored Phase 3 trials that formed the FDA approval basis. HbA1c reduction is the primary pharmacodynamic endpoint — exenatide's GLP-1R agonism produces glucose-dependent insulin secretion and glucagon suppression, which is the mechanism directly measured by HbA1c. This is the most robustly supported claim for exenatide.",
    sources: "Buse et al. 2004 (AMIGO 1); Defronzo et al. 2005 (AMIGO 2); Kendall et al. 2005 (AMIGO 3); FDA approval package 2005",
  },
  {
    id: "weight-loss",
    claim: "Exenatide produces modest weight loss (~3–5% body weight) in T2D patients",
    tier: "strong",
    tierLabel: "Strong — consistent across AMIGO trials and extension studies; effect size well-characterized",
    body: "Weight loss is a consistent secondary endpoint across exenatide trials. The AMIGO trials showed 2.8-3.7 kg weight loss over 30 weeks, which corresponds to approximately 3-4% of body weight. Long-term extension studies (up to 3 years) show maintenance of weight loss without further significant reduction — the trajectory plateaus. This is a genuine effect well-supported by RCT data. The limitation is that this ~3-5% loss is modest compared to semaglutide (~15%) and tirzepatide (~22%) — but within the context of T2D management, modest weight loss still provides clinical benefit.",
    sources: "AMIGO trials (Buse 2004, Defronzo 2005, Kendall 2005); Klonoff et al. 2008 (3-year extension); comparative meta-analyses of GLP-1 agonists",
  },
  {
    id: "glp1-pharmacology",
    claim: "Exenatide activates GLP-1 receptors with glucose-dependent insulin secretion and glucagon suppression",
    tier: "strong",
    tierLabel: "Strong — foundational GLP-1R pharmacology; extensively characterized since 1990s",
    body: "GLP-1 receptor pharmacology has been exhaustively characterized. Exenatide's binding affinity for the GLP-1R, its glucose-dependent activation of insulin secretion (which means it does not drive hypoglycemia in euglycemic conditions), its suppression of post-meal glucagon, and its gastric emptying delay are all mechanistically established. The structural basis for DPP-4 resistance (the C-terminal extension that differs from native GLP-1) is well understood. This pharmacological foundation is not in question — it is the mechanistic scaffold for the entire GLP-1 agonist class.",
    sources: "Eng et al. 1992 (exendin-4 isolation); Drucker 2006 (GLP-1R pharmacology review); Exendin-4 structure-activity relationship literature",
  },
  {
    id: "cv-outcomes",
    claim: "Exenatide reduces major adverse cardiovascular events in high-CV-risk patients",
    tier: "moderate",
    tierLabel: "Moderate — EXSCEL trial showed neutral result; does not reduce MACE like semaglutide",
    body: "The EXSCEL trial (Exenatide Study of Cardiovascular Event Lowering) enrolled 14,752 T2D patients with or without prior CV events and randomized them to once-weekly exenatide (Bydureon) vs. placebo over approximately 3.2 years median follow-up. The primary endpoint (MACE: CV death, non-fatal MI, non-fatal stroke) occurred in 11.4% of exenatide patients vs 12.2% of placebo — a hazard ratio of 0.91 (95% CI 0.83-1.00), which met the FDA's pre-specified non-inferiority margin but did not reach statistical superiority. This is a neutral result — exenatide is not harmful to the cardiovascular system, but it did not demonstrate the significant CV benefit that semaglutide showed in SUSTAIN-6 and SELECT.",
    sources: "Holman et al. 2017 (EXSCEL trial — NEJM); FDA CV outcomes trial requirement post-ACCORD guidance",
  },
  {
    id: "bydureon-vs-byetta",
    claim: "Bydureon (once-weekly) is non-inferior to Byetta (twice-daily) for glycemic control with better tolerability",
    tier: "strong",
    tierLabel: "Strong — head-to-head trial (DURATION-1); once-weekly superior GI tolerability",
    body: "The DURATION-1 trial directly compared Bydureon 2 mg once weekly to Byetta 10 mcg twice daily over 30 weeks. Bydureon produced non-inferior HbA1c reduction (Bydureon -1.9% vs Byetta -1.5% from a similar baseline — Bydureon was actually numerically superior) with greater body weight reduction. Nausea was more common with Byetta (41% vs 26%) due to the peak-and-trough pharmacokinetics of the twice-daily formulation vs. the sustained release of the weekly microsphere. This trial established Bydureon as the preferred exenatide formulation for most patients.",
    sources: "Drucker et al. 2008 (DURATION-1 — The Lancet); Bydureon FDA approval 2012",
  },
  {
    id: "weight-superiority",
    claim: "Exenatide produces weight loss equivalent to semaglutide or tirzepatide",
    tier: "none",
    tierLabel: "None — exenatide produces substantially less weight loss than modern GLP-1 drugs",
    body: "Direct and indirect comparisons consistently show exenatide at the bottom of the GLP-1 class for weight loss outcomes. Network meta-analyses and head-to-head trials (semaglutide vs. exenatide in SUSTAIN-3) show semaglutide produces significantly greater weight loss. Tirzepatide vs. exenatide has not been directly compared in a dedicated trial, but the SURMOUNT-1 (tirzepatide ~22%) vs AMIGO (exenatide ~3-5%) data is not comparable. Exenatide users expecting semaglutide-level weight loss outcomes should have their expectations calibrated by this evidence.",
    sources: "SUSTAIN-3 (semaglutide vs exenatide QW — semaglutide superior); network meta-analyses of GLP-1 agonist weight loss (Htike 2017, Zhu 2020)",
  },
  {
    id: "pancreatitis",
    claim: "Exenatide causes pancreatitis",
    tier: "moderate",
    tierLabel: "Moderate — signal exists; causality debated; class effect shared with all GLP-1 agonists",
    body: "Post-marketing surveillance identified a pancreatitis signal with exenatide (and subsequently with all GLP-1 agonists). The FDA added a pancreatitis warning in 2007. However, the absolute risk elevation is small and causality has been debated — T2D itself increases pancreatitis risk, making it difficult to attribute cases specifically to exenatide. The largest prospective trial (EXSCEL) did not find a statistically significant increase in pancreatitis. The clinical guidance is to contraindicate exenatide in patients with prior pancreatitis history as a precaution, which is a reasonable risk-management approach even if absolute causality is uncertain.",
    sources: "FDA safety communication 2007; EXSCEL pancreatitis subanalysis; Egan et al. 2014 (pancreatic safety analysis)",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function ExenatideEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Exenatide has the strongest evidence base of any compound in the GLP-1 investigational community — because it is an FDA-approved drug with large, well-powered Phase 3 trials (AMIGO program, DURATION program, EXSCEL cardiovascular outcomes trial). The glycemic control evidence is unambiguous. The weight loss evidence is also clear — but the number is modest (~3-5%) compared to semaglutide (~15%) and tirzepatide (~22%). The cardiovascular outcomes trial (EXSCEL) was neutral. The central evidence-calibration point for exenatide is not &quot;does it work&quot; — it clearly works for T2D — but whether its degree of effect is sufficient for a given patient&apos;s goals relative to newer alternatives.
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
