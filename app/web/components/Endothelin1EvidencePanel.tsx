/**
 * Endothelin1EvidencePanel — honest, layered evidence for Endothelin-1 / ERA pharmacology.
 * Key frame: ET-1 physiology is very well characterized; ERA clinical evidence is strong
 * in PAH. No community use evidence exists (exogenous ET-1 as agonist has no therapeutic
 * or enhancement application). Evidence for ET-1 role in heart failure and CKD: moderate.
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
    id: "et1-vasoconstriction",
    claim: "ET-1 is the most potent endogenous vasoconstrictor \u2014 ~10\u00d7 more potent than angiotensin-II",
    tier: "strong",
    tierLabel: "Strong",
    body: "Endothelin-1\u2019s vasoconstrictor potency is extremely well-established in vascular pharmacology. ETA receptor activation on vascular smooth muscle causes prolonged, concentration-dependent vasoconstriction with a potency roughly 10-fold higher than angiotensin-II on a molar basis. The mechanism (ETA \u2192 Gq \u2192 IP3 \u2192 Ca\u00b2\u207a release \u2192 smooth muscle contraction) is fully characterized. ETB receptor biology (endothelial vasodilation via NO and prostacyclin; ET-1 clearance; smooth muscle constriction at high concentrations) is equally well documented.",
    sources: "Yanagisawa M et al. Nature 1988 (ET-1 discovery); Masaki T. J Cardiovasc Pharmacol 1989; Davenport AP et al. Pharmacol Rev 2016; Barton M & Yanagisawa M. Can J Physiol Pharmacol 2019.",
  },
  {
    id: "era-pah",
    claim: "ERA therapy (bosentan, ambrisentan, macitentan) improves outcomes in pulmonary arterial hypertension",
    tier: "strong",
    tierLabel: "Strong",
    body: "Multiple large RCTs establish ERA efficacy in PAH. The BREATHE-1 trial (bosentan) demonstrated significant improvement in 6-minute walk distance (6MWD) and time to clinical worsening vs placebo. ARIES-1/2 trials (ambrisentan) replicated the 6MWD benefit with a superior hepatic safety profile vs bosentan. The SERAPHIN trial (macitentan) used an event-driven endpoint \u2014 morbidity/mortality \u2014 and demonstrated a 45% relative risk reduction in the combined morbidity/mortality endpoint vs placebo. The AMBITION trial showed superiority of upfront ambrisentan + tadalafil combination vs monotherapy in treatment-naive PAH patients.",
    sources: "Rubin LJ et al. BREATHE-1. N Engl J Med 2002; Gali\u00e8 N et al. ARIES-1/2. Circulation 2008; Pulido T et al. SERAPHIN. N Engl J Med 2013; Gali\u00e8 N et al. AMBITION. N Engl J Med 2015.",
  },
  {
    id: "et1-heart-failure",
    claim: "ET-1 is elevated in heart failure and contributes to vascular and cardiac remodeling",
    tier: "moderate",
    tierLabel: "Moderate",
    body: "Plasma ET-1 levels correlate with NYHA functional class, pulmonary capillary wedge pressure, and prognosis in heart failure. The mechanistic case for ET-1 contribution to HF pathophysiology is strong: ET-1 drives vasoconstriction (increasing afterload), promotes cardiac hypertrophy and fibrosis via ETA receptors in cardiomyocytes, and stimulates aldosterone secretion. However, ERA trials in systolic heart failure have been largely negative or neutral (REACH-1 with bosentan was stopped for hepatotoxicity; ENABLE with bosentan showed no mortality benefit). ET-1 measurement is prognostically valuable in HF, but ERA therapy is not an established HF treatment despite the compelling biology.",
    sources: "Pacher R et al. Circulation 1996; Cody RJ et al. Circulation 1992; Anand IS et al. ENABLE. Lancet 2004; Teerlink JR. Pharmacol Ther 2009.",
  },
  {
    id: "et1-ckd",
    claim: "ET-1 drives renal vasoconstriction and contributes to CKD progression",
    tier: "moderate",
    tierLabel: "Moderate",
    body: "ET-1 is highly expressed in the kidney \u2014 particularly in collecting duct cells, where it acts on ETB receptors to regulate sodium excretion and water reabsorption. Pathological ET-1 elevation in CKD promotes renal vasoconstriction, mesangial cell proliferation, and fibrosis. ERA therapy for CKD has been explored in trials (particularly in diabetic nephropathy), but sodium and fluid retention caused by ETB blockade has limited clinical development. Atrasentan (ETA-selective ERA) showed promising signals in diabetic nephropathy in the SONAR trial and represents ongoing clinical investigation.",
    sources: "Kohan DE et al. Kidney Int 2011; de Zeeuw D et al. SONAR. Lancet 2019; Dhaun N & Webb DJ. Nat Rev Nephrol 2019.",
  },
  {
    id: "et1-community",
    claim: "Community use as an injectable peptide agonist",
    tier: "none",
    tierLabel: "No evidence",
    body: "There is no community use of exogenous ET-1 as an agonist, nor any theoretical basis for beneficial enhancement use. ET-1 as an agonist would cause severe, prolonged vasoconstriction \u2014 the pharmacological opposite of any wellness or performance goal. The community peptide context for ET-1 is entirely about understanding ERA medications (for patients who are prescribed them) and vascular peptide biology (for researchers and educators). Any representation of ET-1 as a usable \u201ccommunity peptide\u201d is pharmacologically incoherent.",
    sources: "No clinical or community evidence for ET-1 agonist use. Mechanism: Yanagisawa M et al. Nature 1988; Davenport AP et al. Pharmacol Rev 2016.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function Endothelin1EvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        ET-1 physiology is among the most well-characterized vasoactive peptide systems in human biology \u2014 the 1988 discovery paper by Yanagisawa et al. is one of the most cited in cardiovascular science. ERA clinical trial evidence in PAH is robust: multiple large RCTs with functional, hemodynamic, and event-driven endpoints. The evidence gap is in heart failure (negative trials despite strong biology) and enhancement use (no evidence, wrong mechanism for any enhancement purpose).
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
