/**
 * Bpc157ArginaleSafetyPanel — safety calibration for BPC-157 Arginate.
 * Key frame: same safety profile as standard BPC-157; the arginate form does not
 * create new safety considerations. Arginine component at peptide doses is not
 * a meaningful independent risk. The BPC-157 base safety considerations apply:
 * cancer history is the hard stop; supply quality is the primary practical concern.
 */

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
    id: "cancer-history",
    heading: "Cancer history — angiogenesis and growth factor promotion applies to arginate form equally",
    tier: "flag",
    body: "BPC-157's mechanisms include upregulation of VEGF receptor expression, promotion of angiogenesis, and stimulation of growth factor pathways (EGF, FGF, PDGF). These are the same mechanisms that drive tumor vascularization and growth. The arginate form delivers the same active peptide with the same angiogenic mechanism. Cancer history — active disease, history of cancer, or known genetic predispositions — is a hard stop for BPC-157 in any form. The arginate salt does not change the peptide's receptor interactions or its angiogenesis-promoting properties.",
    context: "Active cancer, cancer remission, or personal history of cancer: do not use BPC-157 in any form (standard, arginate, or oral) without explicit oncology oversight. The angiogenic mechanism is not theoretical — it is the documented pharmacology of BPC-157. This is not a reversible precaution based on missing data; it is an identified mechanism-based contraindication.",
  },
  {
    id: "supply-quality",
    heading: "Supply quality — same CoA requirements as standard BPC-157; purity and endotoxin testing essential",
    tier: "watch",
    body: "Gray-market BPC-157 arginate supply quality varies substantially between suppliers. The peptide is 15 amino acids — complex enough that synthesis errors (truncated sequences, racemization, incomplete deprotection) can occur, and these impurities are not detectable by visual inspection. Endotoxin contamination from gram-negative bacteria in the synthesis environment causes pyrogenic reactions (fever, chills, rigors) and can be serious. The arginate form's improved solubility may make it slightly easier for suppliers to produce well-dissolved preparations, but it does not guarantee purity or endotoxin safety.",
    context: "Request a Certificate of Analysis (CoA) from any peptide supplier — ideally from an independent third-party lab, not just the supplier's internal testing. Look for: HPLC purity (>98%), mass spectrometry confirmation of molecular weight, endotoxin testing (<1 EU/mg or per supplier specification). Suppliers who cannot provide independent CoAs should not be used regardless of form (arginate or standard).",
  },
  {
    id: "arginine-component",
    heading: "Arginine component — generally safe at BPC-157 peptide doses; herpes simplex consideration is not relevant at these amounts",
    tier: "watch",
    body: "Arginine is a conditionally essential amino acid and is generally considered safe in supplement and food contexts. At high-dose supplementation (3-9 grams/day), arginine has been associated with herpes simplex virus (HSV) reactivation in susceptible individuals — this is because HSV replication requires arginine and high arginine availability may favor viral replication. However, the quantity of arginine present as the counterion in a BPC-157 arginate dose (typically 200-500 mcg of BPC-157 arginate) is minuscule — fractions of a milligram. This is orders of magnitude below any dose of arginine associated with HSV reactivation. The arginine component in BPC-157 arginate is not a meaningful independent safety concern.",
    context: "The HSV reactivation concern from arginine is relevant to gram-level arginine supplementation — not to the trace arginine present as a counterion in a microgram-level peptide dose. People with active HSV who are concerned about arginine can consult their physician, but the BPC-157 arginate dose does not represent meaningful arginine supplementation.",
  },
  {
    id: "injection-site",
    heading: "Injection site reactions — potentially improved tolerability vs standard BPC-157 due to solubility",
    tier: "low",
    body: "BPC-157 standard form can occasionally cause injection site discomfort, redness, or mild irritation — partly attributed to the limited solubility of the peptide if not fully reconstituted. The improved solubility of the arginate form may reduce this risk by ensuring the peptide remains in solution at the injection site. No comparative study has formally tested this. Standard subcutaneous injection tolerability otherwise applies: site rotation, proper needle gauge, slow injection technique.",
    context: "If you have experienced injection site reactions with standard BPC-157, the arginate form is a reasonable alternative to try — the solubility advantage is the most plausible explanation for and solution to injection site irritation from under-dissolved peptide. Standard sterile technique and site rotation apply to both forms.",
  },
  {
    id: "peptide-interactions",
    heading: "Peptide stacking — no new interaction concerns from the arginate form",
    tier: "low",
    body: "BPC-157 arginate does not create any new drug interactions beyond those applicable to standard BPC-157. The arginine counterion at peptide doses does not meaningfully affect any co-administered medications. Standard BPC-157 interaction considerations (NSAIDs, anticoagulants, immunosuppressants — via angiogenesis and growth factor pathways) apply identically.",
    context: "Evaluate interactions based on BPC-157 pharmacology, not the arginate designation. The arginate form is pharmacologically identical to standard BPC-157 once dissociated in solution.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function Bpc157ArginaleSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        BPC-157 arginate has the same safety profile as standard BPC-157 — the arginate salt form does not introduce new safety considerations. Cancer history is the hard stop across all BPC-157 forms due to the angiogenesis mechanism. Supply quality (purity, endotoxin testing) is the most important practical safety consideration for gray-market peptides in either form. The arginine component at peptide doses is not a meaningful independent risk. Any safety evaluation should focus on BPC-157&apos;s pharmacology, not the arginate distinction.
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
