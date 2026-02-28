/**
 * HCGSafetyPanel — safety calibration for hCG.
 * Key frame: hormone-sensitive cancers are hard stops; OHSS in females is
 * the most serious acute risk; estrogen management is the main ongoing
 * concern in males on TRT + hCG.
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
    id: "hormone-sensitive-cancer",
    heading: "Hormone-sensitive cancers — prostate cancer, testicular cancer, estrogen-sensitive cancers",
    tier: "flag",
    body: "hCG stimulates testosterone production in males. Prostate cancer is driven by androgens — stimulating testosterone production in a man with prostate cancer (diagnosed or undetected) accelerates disease progression. Testicular cancer: hCG is actually produced by some testicular tumors (germ cell tumors) — elevated hCG is a tumor marker; exogenous hCG in the context of undetected testicular cancer is inappropriate. In females, hCG's sex steroid stimulation is relevant in hormone-sensitive conditions.",
    context: "Any male over 40 should have a PSA check before starting hCG. Any history of prostate or testicular cancer is a hard stop. For females: ER-positive breast cancer and estrogen-sensitive conditions are contraindications for the estrogen-stimulating effects of hCG in the ovarian stimulation context.",
  },
  {
    id: "ohss",
    heading: "Ovarian hyperstimulation syndrome (OHSS) in females — serious acute risk in fertility treatment",
    tier: "flag",
    body: "In females undergoing ovarian stimulation (IVF, ovulation induction), hCG trigger can precipitate or worsen OHSS — a potentially life-threatening condition characterized by ovarian enlargement, fluid shifts, hemoconcentration, and thrombosis risk. OHSS risk is highest in women with high antral follicle counts (young, PCOS), many follicles responding to stimulation, or high estradiol levels. This is a clinical risk in supervised fertility treatment — not typically relevant for males using hCG as TRT adjunct.",
    context: "OHSS is managed in supervised fertility treatment settings with strategies including trigger modification (kisspeptin trigger instead of hCG, or reduced hCG dose), 'freeze-all' cycles, and early OHSS monitoring. Community females considering hCG outside fertility treatment supervision should be aware this risk exists.",
  },
  {
    id: "estrogen-elevation-males",
    heading: "Estrogen elevation in males — hCG-stimulated testosterone aromatizes to estradiol",
    tier: "watch",
    body: "hCG substantially stimulates testosterone production. Testosterone is aromatized to estradiol by aromatase (primarily in adipose tissue). High-dose hCG, or hCG in combination with TRT, can produce supraphysiological estradiol elevations. Symptoms: gynecomastia (breast tissue development), water retention, mood changes, reduced libido at high estradiol. Aromatase inhibitor (anastrozole) is commonly co-prescribed by physicians managing TRT + hCG protocols.",
    context: "Monitor estradiol when starting or increasing hCG dose. Target estradiol 20-40 pg/mL in males — significantly above normal range warrants aromatase inhibitor consideration. Symptoms of high estrogen (tender nipples, breast tissue, significant water retention) prompt estradiol check before adding AI.",
  },
  {
    id: "precocious-puberty",
    heading: "Precocious puberty — hCG use in prepubertal children requires strict clinical indication",
    tier: "watch",
    body: "hCG is used clinically for cryptorchidism in prepubertal males (stimulating testicular descent) and occasionally for LH deficiency in pubertal delay. Use in prepubertal children requires strict clinical indication and monitoring — hCG can cause premature virilization, accelerated bone age, and precocious puberty if misused or dosed incorrectly outside supervised clinical management.",
    context: "Pediatric hCG use is exclusively within supervised clinical medicine — not a community use scenario. Flag as context for anyone considering hCG for a child outside clinical management.",
  },
  {
    id: "gynecomastia",
    heading: "Gynecomastia — direct hCG stimulation of breast tissue and indirect estrogen elevation",
    tier: "watch",
    body: "hCG can cause gynecomastia through two mechanisms: direct stimulation of breast tissue (hCG receptors are present in breast tissue) and indirect via increased estradiol from testosterone aromatization. Community males report gynecomastia as one of the more common adverse effects of high-dose hCG. Lower doses (500-1000 IU every 3-4 days rather than high-dose protocols) reduce this risk.",
    context: "Tender nipples or breast tissue development on hCG warrants: (1) estradiol check, (2) dose reduction consideration, (3) aromatase inhibitor discussion with physician. Early intervention prevents progression of gynecomastia.",
  },
  {
    id: "injection-quality",
    heading: "Product quality — pharmaceutical vs. compounded vs. gray-market",
    tier: "low",
    body: "Pharmaceutical hCG (Pregnyl, Novarel) meets FDA manufacturing standards. Compounded hCG is used in many TRT practices and is generally reliable from reputable compounding pharmacies. Community access to hCG through gray-market channels is a quality variable — hCG is a glycoprotein that requires proper manufacturing and cold-chain management.",
    context: "Pharmaceutical preparations are preferred when available. Compounded hCG from an accredited compounding pharmacy is acceptable. Gray-market sources without third-party verification carry standard quality uncertainty for a glycoprotein that requires cold chain integrity.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function HCGSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        hCG has a well-characterized safety profile from decades of clinical use. The primary flags are hormone-sensitive cancers (prostate cancer, testicular cancer) and OHSS in females undergoing ovarian stimulation. For males on TRT + hCG, estrogen management is the main ongoing monitoring requirement — hCG-stimulated testosterone aromatizes and can cause gynecomastia if unmanaged.
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
