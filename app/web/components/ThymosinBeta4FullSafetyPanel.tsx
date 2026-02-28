/**
 * ThymosinBeta4FullSafetyPanel — safety calibration for Thymosin Beta-4 Full.
 * Key frame: cancer history is an absolute hard stop due to angiogenesis mechanism.
 * Full 43-AA protein requires cold chain — degradation is a silent safety concern.
 * Authentication (is this actually full Tβ4 vs TB-500?) is the practical first step.
 * Phase 2 clinical trials found good safety profile in medical contexts.
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
    heading: "Cancer history — angiogenesis mechanism is an absolute hard stop for full Tβ4 and all thymosin forms",
    tier: "flag",
    body: "Full thymosin beta-4's mechanism centrally involves VEGF upregulation, endothelial cell proliferation, and new blood vessel formation (angiogenesis). ILK activation drives AKT-mediated cell survival signaling. These are precisely the pathways that tumor cells exploit for growth and vascularization. Anti-angiogenic therapies (bevacizumab, sunitinib) are FDA-approved specifically because blocking VEGF/angiogenesis reduces tumor growth and metastasis. Using a compound that potently upregulates VEGF and promotes angiogenesis in any context involving cancer — active disease, remission, genetic predisposition, family history — directly opposes cancer control strategy. Unlike some speculative mechanism-based concerns, the angiogenesis pathway in cancer is one of the most validated mechanisms in oncology.",
    context: "Active cancer, cancer remission, or meaningful cancer family history: thymosin beta-4 in any form is absolutely contraindicated without explicit oncology oversight. This is not a theoretical concern based on incomplete data — it is the established mechanism of a pathway that multiple FDA-approved drugs target specifically to prevent. If you have had any cancer in the past 5 years, discuss with your oncologist before considering any thymosin form or angiogenesis-promoting peptide.",
  },
  {
    id: "cold-chain",
    heading: "Cold chain requirement — full 43-AA protein degrades without proper refrigeration; degradation is invisible",
    tier: "watch",
    body: "Full thymosin beta-4 is a 43-amino acid protein with secondary and tertiary structure that is sensitive to temperature, pH, and freeze-thaw cycles. Unlike the smaller TB-500 peptide (7 amino acids, more stable), full Tβ4 requires consistent cold chain storage (typically 2-8°C for short-term, -20°C or below for long-term). Degradation can occur through deamidation, oxidation, aggregation, or proteolysis — and degraded protein is not visually distinguishable from intact protein by the appearance of the solution. Injecting degraded protein wastes at minimum and may cause immune reactions at worst.",
    context: "Verify your supplier has cold chain logistics from synthesis through shipping. Full Tβ4 vials should arrive cold (with ice pack or dry ice for longer shipping). Store at -20°C for long-term storage; 2-8°C for use within 2-4 weeks after reconstitution. Verify product authenticity with mass spectrometry — molecular weight of intact full Tβ4 is ~4964 Da; any significant deviation indicates degradation or a different compound. Never use reconstituted full Tβ4 protein that has been left at room temperature for more than a few hours.",
  },
  {
    id: "authenticity-verification",
    heading: "Product authenticity — most gray-market 'thymosin beta-4' is TB-500, not full Tβ4; undetectable by visual inspection",
    tier: "watch",
    body: "This is the most practically important safety-adjacent consideration for anyone seeking full Tβ4. The molecular weight of full Tβ4 is ~4964 Da. TB-500 (the 7-amino acid fragment Ac-LKKTETQ) has a molecular weight of ~886 Da. These are different by a factor of ~5.6 — completely distinguishable by mass spectrometry, completely indistinguishable by appearance, price alone, or supplier claims. The majority of community products labeled 'thymosin beta-4' from gray-market peptide suppliers are TB-500, not the full 43-AA protein. This is not necessarily fraudulent in all cases — many suppliers use 'thymosin beta-4' as a common name for both — but it determines whether you are getting the compound supported by the clinical trial evidence.",
    context: "If cardiac repair or dry eye disease clinical trial evidence is the basis for your interest in full Tβ4, verify that what you receive is actually full Tβ4. Request mass spectrometry from an independent third-party lab. If the supplier cannot provide independent MS confirmation with the correct molecular weight (approximately 4964 Da), treat it as TB-500 (not full Tβ4) for all clinical expectation purposes. This is not just a theoretical concern — it is the practical reality of the gray-market supply chain for thymosin products.",
  },
  {
    id: "immune-response",
    heading: "Potential immune response to protein immunogenicity — relevant for the full 43-AA protein",
    tier: "watch",
    body: "Full thymosin beta-4 is an endogenous human protein — which generally reduces immunogenicity. However, recombinant or synthetically produced full-length Tβ4 from gray-market suppliers may have impurities, aggregates, or incorrect folding that increases immunogenicity compared to endogenous Tβ4. In the Phase 2 clinical trials (which used pharmaceutical-grade preparations under strict QC), the safety profile was favorable with no significant immune-related adverse events reported. Community supply with variable quality does not carry the same safety guarantee. Protein aggregates in particular can trigger immune reactions.",
    context: "Any injection reaction beyond mild redness at the site (particularly systemic symptoms: fever, chills, rash, joint pain, fatigue developing within hours of injection) could indicate immune reaction to the protein preparation. Discontinue use and seek medical evaluation if systemic symptoms occur. Starting with a very small test dose before full dosing is prudent for any protein-based compound.",
  },
  {
    id: "injection-site",
    heading: "Injection site tolerability — larger protein vs TB-500; proper reconstitution important",
    tier: "low",
    body: "Full Tβ4 as a larger protein (43 AA) has somewhat more demanding reconstitution requirements than small peptides. The protein should be fully dissolved before injection, reconstituted with bacteriostatic water for injection, and allowed to dissolve gently (do not shake vigorously — shaking can cause protein aggregation). Injection site reactions with properly reconstituted pharmaceutical-grade Tβ4 in clinical trials were mild and transient. Community supply quality determines most of the injection tolerability experience.",
    context: "Reconstitute full Tβ4 by adding bacteriostatic water to the lyophilized vial and swirling gently — do not vortex or shake. Allow full dissolution (may take a few minutes for a larger protein than for smaller peptides). The solution should be clear without particulates. Subcut injection with a 27-29 gauge insulin needle is standard. Rotate injection sites to minimize local tissue reaction.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function ThymosinBeta4FullSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Full thymosin beta-4&apos;s safety profile in Phase 2 clinical trials was favorable — no serious adverse events were reported in the cardiac repair or dry eye studies at clinical doses. The primary safety concerns for community use are: (1) cancer history — the angiogenesis mechanism is an absolute hard stop; (2) cold chain requirements — protein degradation is invisible and must be prevented; (3) product authenticity — most gray-market &apos;thymosin beta-4&apos; is actually TB-500, and your clinical expectations should match the actual compound you have. Immune reactions are possible with protein preparations; test dose recommended.
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
