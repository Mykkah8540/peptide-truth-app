/**
 * Cjc1295DacSafetyPanel — safety calibration for CJC-1295 with DAC.
 * Key frame: same safety considerations as CJC-1295 no-DAC but amplified by
 * the 8-day half-life and accumulation dynamics. Cancer history is a hard stop.
 * Glucose monitoring is more important than with shorter-acting GHRH analogs.
 * Side effects persist for ~1 week after last dose — cannot quickly reduce exposure.
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
    heading: "Cancer history — continuous IGF-1 elevation amplifies the cancer contraindication vs pulsatile compounds",
    tier: "flag",
    body: "GH and IGF-1 have well-documented mitogenic effects — they promote cell proliferation and survival through IGF-1 receptor signaling. The connection between GH/IGF-1 and cancer risk is established in both mechanistic studies (IGF-1R drives AKT/mTOR and MEK/ERK proliferative pathways) and epidemiological data (elevated IGF-1 is associated with increased risk of colon, breast, and prostate cancer in prospective studies). CJC-1295 DAC's continuous IGF-1 elevation — rather than the intermittent elevations from pulsatile GHRH analogs — represents an amplified cancer risk context. At steady state with weekly dosing, IGF-1 is never allowed to return to baseline. This continuous mitogenic stimulus is more concerning than acute GH pulses from shorter-acting compounds.",
    context: "Active cancer, cancer remission, or meaningful personal/family history of hormone-responsive cancers (breast, prostate, colon): CJC-1295 DAC is a particularly inappropriate choice given its continuous IGF-1 elevation profile. If a GHRH analog is being considered in any cancer-adjacent context, shorter-acting compounds (sermorelin, no-DAC CJC-1295) with their physiological pulsatile patterns and daily return to baseline are safer. Any GH axis compound in a cancer-adjacent context requires explicit oncology consultation.",
  },
  {
    id: "glucose-monitoring",
    heading: "Glucose dysregulation — continuous GH elevation is counter-regulatory to insulin; amplified vs shorter-acting GHRH analogs",
    tier: "watch",
    body: "Growth hormone is a counter-regulatory hormone that opposes insulin action and promotes glucose production (glycogenolysis, gluconeogenesis). Continuous GH elevation from CJC-1295 DAC at steady state creates a sustained insulin-counter-regulatory state. This is similar to the glucose effects seen in acromegaly (excess GH): progressive insulin resistance, fasting glucose elevation, and in some cases impaired glucose tolerance or frank diabetes. The amplified concern with CJC-1295 DAC versus no-DAC is that the glucose effect is continuous and accumulates over weeks — there is no overnight return to baseline. Users with pre-diabetes, metabolic syndrome, or family history of type 2 diabetes are at increased risk.",
    context: "Fasting glucose monitoring before starting and after 4-8 weeks at steady-state is essential. A continuous glucose monitor (CGM) or hemoglobin A1c measurement after 3 months provides the most useful picture of the chronic glucose effect. If fasting glucose rises above 100 mg/dL (pre-diabetic range) or if A1c rises, reassess the dose or the compound choice. Individuals on insulin or metformin: CJC-1295 DAC can substantially alter insulin requirements — requires physician oversight and close glucose monitoring.",
  },
  {
    id: "persistent-side-effects",
    heading: "Side effects persist ~1 week after last dose — cannot rapidly reduce exposure",
    tier: "watch",
    body: "The critical safety management difference between CJC-1295 DAC and shorter-acting GHRH compounds is exposure reversibility. With no-DAC CJC-1295 or sermorelin, stopping a daily injection reduces plasma levels within hours. With CJC-1295 DAC, stopping the last weekly injection leaves approximately 50% of the active compound still present one week later. Common GH excess side effects — peripheral edema (fluid retention causing swollen hands, feet, ankles), carpal tunnel syndrome symptoms (numbness, tingling, or pain in the hands, particularly at night), arthralgia (joint aches), and headache — cannot be quickly resolved by stopping DAC. Users experiencing these side effects at steady state should expect them to persist for 2+ weeks after the last injection.",
    context: "If carpal tunnel symptoms, significant edema, or glucose elevation develops on CJC-1295 DAC: (1) do not administer the next injection; (2) seek medical evaluation, not just symptom management; (3) be prepared for symptoms to persist for 2-4 weeks during washout. Reducing dose (half-dose weekly) is not a rapid fix — the accumulation dynamics mean partial dose reduction takes weeks to produce a new lower steady state. The 8-day half-life is the fundamental pharmacological constraint on reversibility.",
  },
  {
    id: "edema-carpal-tunnel",
    heading: "Edema and carpal tunnel symptoms — the most common GH excess adverse effects at community doses",
    tier: "watch",
    body: "Fluid retention and carpal tunnel syndrome are the most commonly reported adverse effects of GH axis compounds in community use, and they are particularly relevant for CJC-1295 DAC's continuous elevation profile. GH promotes sodium and water retention via renal effects; this manifests as peripheral edema (rings fitting tightly, shoes feeling snug, morning puffiness). Carpal tunnel syndrome from GH is caused by fluid accumulation in the carpal tunnel space, compressing the median nerve — symptoms include nocturnal hand numbness or tingling, weakness in grip. Both effects are dose-dependent and more likely at steady state with DAC than during the initial dose period.",
    context: "Monitor for: ring/shoe tightness indicating edema; morning hand tingling or numbness (carpal tunnel). If carpal tunnel symptoms develop, dose reduction (or stopping and washout) is the appropriate response — persistent symptoms require physician evaluation and potential occupational therapy or other management. Starting at the lower end of the dose range and allowing 6+ weeks to assess steady-state tolerance before increasing dose is prudent.",
  },
  {
    id: "product-confusion",
    heading: "DAC vs no-DAC product confusion — same name, very different pharmacology and dose",
    tier: "watch",
    body: "CJC-1295 with DAC and CJC-1295 without DAC are not interchangeable. They are sold under overlapping names ('CJC-1295', 'Modified GRF 1-29', 'DAC-GRF') and the distinction is sometimes unclear on gray-market supplier labels. A dose of no-DAC CJC-1295 appropriate for daily injection (100-200 mcg) is not the same as an appropriate dose of DAC. Using DAC at a dose calibrated for no-DAC creates accumulation at doses higher than intended — side effects from overshooting the intended exposure.",
    context: "Verify your product before first use: CJC-1295 with DAC has a molecular weight approximately 500 Da higher than no-DAC CJC-1295 (due to the MPA linker modification). Request CoA with mass spectrometry from your supplier confirming the correct molecular weight for the form you ordered. If you have both DAC and no-DAC products, clearly label them and do not mix up dosing protocols — they require different injection frequencies and dose calibrations.",
  },
  {
    id: "injection-site",
    heading: "Injection site reactions — same as other subcutaneous peptides; no DAC-specific concerns",
    tier: "low",
    body: "CJC-1295 DAC injection site tolerability is similar to other subcutaneous GHRH analogs. The DAC modification does not change the injection site interaction — the MPA-albumin binding occurs after the peptide enters systemic circulation, not at the injection site. Standard subcutaneous injection tolerability applies: occasional mild redness or tenderness at the injection site, no unusual reactions documented specific to DAC.",
    context: "Standard subcutaneous injection technique with a 27-29 gauge insulin needle; site rotation between abdomen, lateral thigh, and deltoid; standard sterile technique. No DAC-specific injection site considerations beyond those applicable to any subcutaneous peptide injection.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function Cjc1295DacSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        CJC-1295 DAC has the same safety considerations as no-DAC CJC-1295 — but amplified by the 8-day half-life and accumulation dynamics. Cancer history is a hard stop, and the continuous IGF-1 elevation from DAC at steady state is more concerning than pulsatile GH from shorter-acting compounds. Glucose monitoring is essential because the counter-regulatory GH effect is sustained, not transient. The most practically important safety distinction: if side effects develop (edema, carpal tunnel, glucose elevation), stopping a DAC injection does not resolve exposure for 2+ weeks. Build in lower starting doses, extended assessment periods, and a physician partnership before relying on DAC as a primary GH axis compound.
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
