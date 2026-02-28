/**
 * Follistatin344SafetyPanel — safety calibration for Follistatin-344.
 * Key frame: two hard stops (cancer, certain reproductive conditions), one expected
 * consequence (FSH/fertility suppression), and a product quality concern that is
 * higher than average for this compound due to its complexity as a glycoprotein.
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
    id: "cancer-activin",
    heading: "Active cancer or high cancer risk — activin suppression removes a tumor-suppressive brake",
    tier: "flag",
    body: "Activin A has tumor-suppressive signaling documented in endometrial, ovarian, colorectal, and prostate cancer. Follistatin overexpression is found in endometrial carcinoma, ovarian cancer, prostate cancer, and other malignancies — indicating that cancer cells exploit follistatin to escape activin-mediated growth suppression. Using exogenous follistatin in someone with active or undetected cancer may facilitate progression by removing the activin brake on cancer cell growth.",
    context: "This is not theoretical speculation — it is documented in peer-reviewed oncology literature. Any history of hormone-sensitive cancers (prostate, breast, ovarian, endometrial) is a hard stop. Strong family history of these cancers warrants serious consideration. This concern applies regardless of whether the follistatin injection is achieving its intended muscle effect.",
  },
  {
    id: "estrogen-sensitive",
    heading: "Estrogen-sensitive conditions (ER+ breast cancer, endometriosis, uterine fibroids)",
    tier: "flag",
    body: "Follistatin suppresses activin, which affects the entire reproductive hormone axis. In females, activin stimulates FSH, which drives estrogen production. Follistatin suppression of activin reduces FSH, which should reduce estrogen — but the relationship is not simply linear in the context of existing pathology. Endometriosis and uterine fibroids are driven by estrogen; disrupting the activin/FSH/estrogen axis in these conditions has unpredictable consequences.",
    context: "ER-positive breast cancer: follistatin use is contraindicated given the cancer concern above plus reproductive hormone disruption. Endometriosis/fibroids: avoid follistatin — activin/FSH axis disruption in these contexts is unstudied and potentially harmful.",
  },
  {
    id: "fsH-fertility",
    heading: "FSH suppression and fertility effects — expected, not speculative",
    tier: "watch",
    body: "Follistatin's endogenous role includes suppression of FSH via activin blockade. Exogenous follistatin would be expected to suppress FSH. In males, FSH suppression reduces Sertoli cell support for spermatogenesis, impairing sperm production. In females, FSH suppression impairs follicular development and ovulation. This is predictable from the mechanism, not a rare side effect. Whether injected follistatin-344 achieves sufficient systemic exposure to meaningfully suppress FSH in practice is uncertain given the pharmacokinetic unknowns.",
    context: "If fertility is a concern, follistatin-344 is inadvisable. The FSH suppression mechanism is real and the exposure level required is lower than the myostatin suppression threshold. Anyone planning conception in the near term should not use this compound.",
  },
  {
    id: "product-quality",
    heading: "Product quality — follistatin-344 is a large glycoprotein; most community sources cannot manufacture it correctly",
    tier: "watch",
    body: "Follistatin-344 is a 344-amino-acid glycoprotein with disulfide bonds and glycosylation sites that are essential for proper folding and bioactivity. Standard solid-phase peptide synthesis used for small peptides cannot produce correctly folded, glycosylated follistatin. Legitimate production requires mammalian cell expression systems with quality control for proper folding. Most research peptide suppliers do not have this capability. Community products sold as 'follistatin-344' are frequently inactive misfolded protein, truncated peptide fragments, or something other than what is labeled.",
    context: "This is a particularly important quality concern — worse than for most compounds in this category. The risk is not primarily harm from contaminants; it is paying for and injecting an inactive product while believing you are achieving follistatin activity. The risk profile of injecting what may be random protein fragments is not characterized.",
  },
  {
    id: "injection-site",
    heading: "Injection site reactions — large protein volume and potential immune response",
    tier: "watch",
    body: "Injecting a large glycoprotein raises the potential for injection site reactions beyond what smaller peptides cause. Proteins can trigger local inflammatory responses and, with repeated dosing, potentially anti-drug antibodies (ADA). If the community product contains misfolded protein or aggregates, the immune response risk increases. ADAs against follistatin could potentially affect endogenous follistatin function.",
    context: "Standard injection site monitoring applies. Unusual local reactions — pronounced swelling, nodule formation, persistent pain — warrant stopping use. The anti-drug antibody concern is theoretical but mechanistically real for any large protein.",
  },
  {
    id: "off-target-gdf11",
    heading: "GDF-11 and other TGF-β ligands — follistatin is not selective",
    tier: "low",
    body: "Follistatin binds multiple TGF-β superfamily members beyond myostatin and activin, including GDF-11. GDF-11 has been studied as a potential 'rejuvenation factor' (circulating levels decline with age in some studies), though this area is controversial. Nonselective TGF-β ligand suppression could have unanticipated effects on tissue remodeling, fibrosis regulation, and other processes where these ligands have normal signaling roles.",
    context: "The off-target effects are not well-characterized for the peptide injection route. Lower concern than the cancer and fertility flags, but worth noting that follistatin's binding profile is broad.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function Follistatin344SafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Two hard stops define follistatin-344: active or high-risk cancer (activin suppression removes documented tumor-suppressive signaling), and estrogen-sensitive conditions (ER+ cancer, endometriosis). FSH suppression is a mechanistically expected consequence — not a rare side effect — and affects fertility in both sexes. Product quality is a specific concern because follistatin-344 requires mammalian cell expression for correct folding, which most research peptide suppliers cannot provide.
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
