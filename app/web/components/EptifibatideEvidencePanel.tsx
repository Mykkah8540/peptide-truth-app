/**
 * EptifibatideEvidencePanel — honest, layered evidence for eptifibatide.
 * Key frame: the clinical evidence is strong for the approved ACS/PCI indications.
 * PURSUIT (ACS) and ESPRIT (PCI) are landmark trials.
 * Mortality benefit is mixed across trials.
 * No community use evidence (not applicable).
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
    id: "mechanism",
    claim: "GPIIb/IIIa inhibition prevents platelet aggregation via the final common pathway",
    tier: "strong",
    tierLabel: "Strong",
    body: "The mechanism of eptifibatide is thoroughly characterized and pharmacologically elegant. GPIIb/IIIa (integrin \u03b1IIb\u03b23) is expressed exclusively on platelets and megakaryocytes and undergoes conformational activation during platelet stimulation. Activated GPIIb/IIIa binds fibrinogen and vWF, creating the molecular bridges for platelet-platelet and platelet-subendothelium aggregation. Eptifibatide\u2019s KGD sequence mimics the fibrinogen-binding sequence and competitively blocks this interaction with high affinity and specificity. At therapeutic concentrations, >80% GPIIb/IIIa receptor occupancy is achieved, producing near-complete inhibition of ADP-stimulated platelet aggregation. The mechanism is as well-characterized as any antiplatelet pharmacology.",
    sources: "Scarborough RM et al. J Biol Chem 1993 (eptifibatide pharmacology); Phillips DR et al. Cell 1991 (GPIIb/IIIa activation mechanism); Coller BS. Thromb Haemost 1999 (GPIIb/IIIa biology).",
  },
  {
    id: "pursuit",
    claim: "PURSUIT trial: eptifibatide reduces death or non-fatal MI in ACS (NSTEMI/unstable angina)",
    tier: "strong",
    tierLabel: "Strong",
    body: "The PURSUIT trial (Platelet Glycoprotein IIb/IIIa in Unstable Angina: Receptor Suppression Using Integrilin Therapy) enrolled 10,948 patients with ACS (non-ST-elevation ACS: unstable angina and NSTEMI). Eptifibatide significantly reduced the primary endpoint of death or non-fatal myocardial infarction at 30 days compared to placebo (14.2% vs 15.7%; OR 0.91; p=0.04). The absolute risk reduction was modest (~1.5 percentage points), reflecting the heterogeneous ACS population. Benefit was greater in the subgroup proceeding to early PCI. Bleeding complications were higher with eptifibatide (10.5% vs 9.3% for any bleeding; major bleeding rates also higher).",
    sources: "The PURSUIT Trial Investigators. N Engl J Med 1998;339:436\u2013443.",
  },
  {
    id: "esprit",
    claim: "ESPRIT trial: eptifibatide reduces ischemic complications during elective coronary stenting",
    tier: "strong",
    tierLabel: "Strong",
    body: "The ESPRIT trial (Enhanced Suppression of the Platelet IIb/IIIa Receptor with Integrilin Therapy) evaluated eptifibatide vs placebo during elective coronary stent implantation in 2,064 patients. Eptifibatide significantly reduced the primary composite endpoint (death, MI, urgent target vessel revascularization, or bailout GPIIb/IIIa inhibitor use) at 48 hours: 6.6% vs 10.5% (OR 0.63; p<0.001). Significant benefit was maintained at 30 days and 1 year. Major bleeding was higher with eptifibatide. The ESPRIT result established eptifibatide as a standard adjunct for elective PCI, particularly before routine use of potent P2Y12 inhibitors.",
    sources: "The ESPRIT Investigators. Lancet 2000;356:2037\u20132044.",
  },
  {
    id: "mortality",
    claim: "Mortality benefit: mixed across trials, not consistently demonstrated",
    tier: "moderate",
    tierLabel: "Moderate",
    body: "While eptifibatide reduces composite ischemic endpoints (death + MI), the isolated mortality benefit is less consistently demonstrated. In PURSUIT, the 30-day mortality rate was 3.5% vs 3.8% \u2014 a non-significant difference. The composite endpoint reduction is driven substantially by MI reduction rather than mortality reduction. This pattern is common across the GPIIb/IIIa inhibitor class: robust reduction in acute thrombotic complications, less consistent mortality benefit, particularly in the modern era of dual antiplatelet therapy with potent P2Y12 inhibitors (ticagrelor, prasugrel) that have their own mortality-reducing evidence.",
    sources: "PURSUIT Trial Investigators. N Engl J Med 1998; Tricoci P. Circulation 2009 (contemporary GPIIb/IIIa inhibitor use review).",
  },
  {
    id: "community-use",
    claim: "Community use for enhancement or non-ACS purposes",
    tier: "none",
    tierLabel: "No evidence",
    body: "There is no community use of eptifibatide and no theoretical basis for any enhancement application. Systemic GPIIb/IIIa inhibition in a healthy person without ACS would produce a bleeding-prone state without any benefit. The drug is administered IV in hospital settings under continuous monitoring for exactly this reason \u2014 the therapeutic window exists only in the context of acute coronary thrombosis where the benefit of preventing platelet aggregation outweighs the elevated bleeding risk. Outside this context, the risk-benefit ratio is definitionally unfavorable.",
    sources: "No community evidence. Pharmacological rationale: Scarborough RM et al. J Biol Chem 1993; ESPRIT Investigators. Lancet 2000.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function EptifibatideEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Eptifibatide has some of the best-characterized clinical trial evidence of any drug in this library \u2014 for its approved indication. PURSUIT and ESPRIT are landmark cardiovascular trials with large sample sizes and hard endpoints. The evidence for the approved ACS/PCI indications is strong. The complexity is in interpretation: composite endpoints dominated by MI reduction, modest absolute risk reduction, and a drug class that is less central to modern ACS care since potent P2Y12 inhibitors became standard. No community evidence exists because there is no community use rationale.
      </div>
      <div className="reta-evidence__list">
        {SIGNALS.map((s) => {
          const st = TIER_STYLE[s.tier];
          return (
            <div key={s.id} className="reta-evidence__entry" style={{ background: st.bg, border: `1px solid ${st.border}` }}>
              <div className="reta-evidence__entry-top">
                <div className="reta-evidence__entry-claim">{s.claim}</div>
                <div className="reta-evidence__entry-tier" style={{ color: st.labelColor, borderColor: st.border }}>{s.tierLabel}</div>
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
