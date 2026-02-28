/**
 * AnpEvidencePanel — calibrated evidence for Atrial Natriuretic Peptide (ANP).
 * Key frame: NPR-A mechanism and natriuretic peptide axis physiology are among
 * the best-characterized in cardiovascular medicine. Clinical evidence exists
 * for IV carperitide in acute heart failure. Community subcutaneous injection
 * has zero evidence — the half-life makes it pharmacokinetically impossible.
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
    id: "npr-a-mechanism",
    claim: "ANP activates NPR-A to produce cGMP-mediated natriuresis, vasodilation, and RAAS inhibition",
    tier: "strong",
    tierLabel: "Strong — foundational cardiovascular endocrinology; Nobel Prize-adjacent physiology",
    body: "The NPR-A mechanism is among the most thoroughly characterized in cardiovascular medicine. ANP binding to NPR-A's guanylyl cyclase domain produces cGMP, which activates protein kinase G and drives: sodium excretion by inhibiting NKCC2 and NHE3 transporters in the kidney's thick ascending limb and proximal tubule; vascular smooth muscle relaxation (vasodilation) through cGMP-mediated calcium handling; and RAAS suppression by reducing renin release from juxtaglomerular cells. Robert Furchgott's work on cGMP in vascular biology (Nobel Prize 1998) is adjacent to the natriuretic peptide cGMP signaling. This mechanism has been characterized in molecular, cellular, animal, and human studies across decades.",
    sources: "de Bold et al. 1981 (Science — original ANP isolation and biological activity); Nakao et al. NPR-A characterization; cGMP natriuretic signaling reviews (Brenner 2008 Cell); Nobel Prize 1998 NO/cGMP signaling context",
  },
  {
    id: "atrial-volume-sensing",
    claim: "ANP release from atrial cardiomyocytes is triggered by atrial wall stretch (volume overload)",
    tier: "strong",
    tierLabel: "Strong — physiological sensing mechanism well-characterized; clinical biomarker foundation",
    body: "Atrial cardiomyocytes synthesize and store pre-pro-ANP, which is cleaved to ANP and released when atrial wall tension increases from volume overload. This mechano-sensitive release mechanism is the basis for ANP's role as a cardiac biomarker of volume status and filling pressure. ANP plasma levels correlate with atrial pressure — a key diagnostic relationship in heart failure assessment. The atrial stretch sensing and ANP release mechanism is characterized at the cellular level, including the mechanosensitive channels and intracellular signaling that link stretch to secretion.",
    sources: "de Bold et al. 1981 (original isolation); Levin et al. 1998 (NEJM — natriuretic peptides in clinical practice); Yandle 1994 (biochemistry of natriuretic peptides review)",
  },
  {
    id: "carperitide-heart-failure",
    claim: "IV carperitide (recombinant human ANP) improves hemodynamics in acute heart failure",
    tier: "strong",
    tierLabel: "Strong — regulatory approval in Japan; multiple controlled clinical trials; IV context only",
    body: "Carperitide (recombinant human ANP, brand: Hanp) has been used in Japan since 1995 for acute decompensated heart failure. Multiple Japanese clinical trials and real-world data show: reduction in pulmonary capillary wedge pressure (cardiac filling pressure), increased cardiac index, natriuresis, and symptom relief in acute heart failure. The clinical context is strictly IV infusion in hospital settings under hemodynamic monitoring. Carperitide is not FDA-approved and has not undergone the large-scale international RCTs that led to nesiritide's US approval (and subsequent withdrawal). The Japanese experience provides controlled evidence for IV ANP pharmacology in heart failure.",
    sources: "Carperitide Japanese regulatory approval 1995; Suwa et al. carperitide clinical studies; Nakamura et al. 2011 (carperitide vs. nesiritide comparison); Japanese Heart Failure guidelines",
  },
  {
    id: "cardioprotection-ischemia",
    claim: "ANP has cardioprotective effects in ischemia and reperfusion injury",
    tier: "moderate",
    tierLabel: "Moderate — animal model and small human study data; IV administration context",
    body: "Multiple animal studies and small human studies have shown that ANP administration during cardiac ischemia (e.g., during cardiac surgery or coronary intervention) reduces infarct size and ischemia-reperfusion injury. The proposed mechanism is cGMP-mediated protection of cardiomyocytes during ischemic stress — the same pathway targeted by phosphodiesterase-5 inhibitors (sildenafil) in cardioprotection research. Small human trials using IV ANP during percutaneous coronary intervention or cardiac surgery have shown promising trends in cardiac enzyme markers. These are not definitive large RCTs but suggest mechanistically plausible cardioprotective effects in the IV administration context.",
    sources: "Kitakaze et al. 2007 (Lancet — IV ANP during percutaneous coronary intervention); multiple cardiac surgery cardioprotection ANP studies; cGMP ischemic preconditioning mechanistic literature",
  },
  {
    id: "nesiritide-safety-concerns",
    claim: "Natriuretic peptide IV therapy (nesiritide) improves heart failure outcomes",
    tier: "moderate",
    tierLabel: "Moderate — FDA was approved but withdrawn; complex safety/efficacy picture",
    body: "Nesiritide (recombinant human BNP, same NPR-A mechanism as ANP) was FDA-approved in 2001 for acute decompensated heart failure. Its initial approval was based on hemodynamic improvement data. The ASCEND-HF trial (2011, NEJM) — a 7,141-patient RCT — found no mortality benefit and suggested possible renal harm at higher doses, leading to significant market withdrawal. The nesiritide story illustrates that even well-characterized natriuretic peptide axis pharmacology with clear hemodynamic effects may not translate to improved clinical outcomes or safety at a population level. This is directly relevant to community claims about natriuretic peptide use.",
    sources: "O'Connor et al. 2011 (NEJM — ASCEND-HF trial); nesiritide FDA withdrawal history; Sackner-Bernstein et al. 2005 renal concerns meta-analysis",
  },
  {
    id: "subcutaneous-injection",
    claim: "Subcutaneous injection of native ANP produces meaningful cardiovascular or natriuretic effects",
    tier: "none",
    tierLabel: "None — pharmacokinetically impossible; 2-3 minute half-life precludes any effect from intermittent dosing",
    body: "Native ANP's plasma half-life of 2-3 minutes is the defining pharmacokinetic constraint. Subcutaneous injection requires 15-30+ minutes for absorption — during which time the peptide is continuously cleared by NPR-C and neprilysin. The amount reaching systemic circulation after subcutaneous injection in sufficient concentration to produce pharmacological NPR-A activation is expected to be negligible. There are no human pharmacokinetic or pharmacodynamic studies of subcutaneous native ANP demonstrating any effect. All clinical evidence for ANP pharmacology is from IV infusion contexts. Claiming subcutaneous ANP produces cardiovascular effects is equivalent to claiming a drug with a 2-minute half-life works when you inject it over 20 minutes — the drug is gone before the injection is complete.",
    sources: "ANP pharmacokinetic literature (NPR-C clearance, neprilysin degradation kinetics); absence of subcutaneous ANP human pharmacokinetic data; contrast with octreotide (stable somatostatin analog replacing native somatostatin because of identical half-life problem)",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",         labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",       labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence",    labelColor: "#9e3800" },
};

export default function AnpEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        ANP has exceptionally strong mechanism evidence — the NPR-A/cGMP natriuretic axis is foundational cardiovascular physiology. Clinical evidence for IV carperitide in acute heart failure (Japan-approved) is solid, and the cardioprotective IV data is interesting but limited. The nesiritide story (FDA-approved BNP analog, ultimately withdrawn) illustrates that even mechanistically validated natriuretic peptide therapy is complicated by clinical reality. Community subcutaneous injection of native ANP has zero evidence — not weak evidence, but zero, because the 2-3 minute half-life makes pharmacological effect from intermittent dosing physically impossible.
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
