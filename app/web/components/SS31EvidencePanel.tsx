/**
 * SS31EvidencePanel — calibrated evidence for SS-31 (Elamipretide).
 * Key frame: Phase 2 cardiac and renal data is real and meaningful.
 * Athletic performance and healthy aging extrapolations are weaker.
 * Barth syndrome is the strongest disease-specific signal.
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
    id: "cardiolipin-mechanism",
    claim: "SS-31 binds cardiolipin and prevents inner mitochondrial membrane peroxidation",
    tier: "strong",
    tierLabel: "Strong — established biochemistry; structural and mechanistic data",
    body: "The molecular mechanism of SS-31 — selective accumulation in the inner mitochondrial membrane via electrostatic attraction to the negatively charged inner membrane, followed by cardiolipin binding — is established by structural studies and cell biology. The prevention of cardiolipin peroxidation and restoration of electron transport chain complex activity is demonstrated in vitro and in animal models. This is mechanistic science, not pharmacological speculation.",
    sources: "Szeto 2014 (Pharm Res); Birk et al. 2013 (Cell Metab); Zhao et al. mechanistic characterization studies",
  },
  {
    id: "harp-trial",
    claim: "SS-31 improves cardiac energy efficiency in HFpEF (HARP trial)",
    tier: "strong",
    tierLabel: "Strong — Phase 2 RCT with objective cardiac MRI endpoints",
    body: "The HARP trial randomized HFpEF patients to 28-day continuous IV elamipretide vs. placebo. Primary endpoint: myocardial PCr/ATP ratio measured by phosphorus MRI spectroscopy — an objective measure of cardiac bioenergetic efficiency. Results: significant improvement in PCr/ATP ratio in elamipretide-treated patients, indicating improved mitochondrial energy production in the heart. This is a Phase 2 RCT with an objective, mechanistically linked primary endpoint. The trial supports the mechanism and direction of effect.",
    sources: "Daubert et al. 2017 (JACC Heart Fail); HARP trial registration NCT02914665",
  },
  {
    id: "barth-syndrome",
    claim: "SS-31 improves exercise capacity in Barth syndrome (inherited cardiolipin disorder)",
    tier: "strong",
    tierLabel: "Strong — Phase 3 data in a condition defined by cardiolipin dysfunction",
    body: "Barth syndrome is caused by mutations in tafazzin, an enzyme required for cardiolipin remodeling. The condition produces cardiolipin dysfunction directly. A Phase 3 TAZPOWER trial of elamipretide in Barth syndrome showed improvements in exercise capacity (6-minute walk test) and fatigue. This is mechanistically the most direct validation of the cardiolipin hypothesis — treating a disease defined by cardiolipin deficiency with a cardiolipin-protecting peptide.",
    sources: "Bertero et al. 2020; TAZPOWER trial (NCT03098797); Barth Syndrome Foundation elamipretide data",
  },
  {
    id: "renal-ischemia",
    claim: "SS-31 reduces renal ischemia-reperfusion injury in human studies",
    tier: "moderate",
    tierLabel: "Moderate — human pilot data; not large Phase 3",
    body: "Pilot clinical studies in renal artery stenosis and other ischemic kidney conditions showed improved renal function with elamipretide infusion. Kidney tubular cells have extremely high mitochondrial density — consistent with the mechanism. These are small studies (n=20-40) with mechanistically coherent results but insufficient scale for definitive conclusions.",
    sources: "Eirin et al. renal artery stenosis studies; Paetzel et al. renal ischemia-reperfusion data",
  },
  {
    id: "skeletal-muscle-aging",
    claim: "SS-31 reverses age-related skeletal muscle mitochondrial dysfunction",
    tier: "moderate",
    tierLabel: "Moderate — strong animal data; very limited human data",
    body: "In aged mouse models, SS-31 treatment restores skeletal muscle mitochondrial function, reduces mitochondrial peroxidation, and improves exercise capacity. Human muscle aging studies are limited — small pilot data in older adults shows improved muscle mitochondrial function markers. The community performance use case is based on this animal data with limited human extrapolation.",
    sources: "Bhanu et al. aged mouse muscle studies; Siegel et al. 2013; limited human pilot muscle aging data",
  },
  {
    id: "athletic-performance",
    claim: "SS-31 improves athletic performance or endurance in healthy trained subjects",
    tier: "none",
    tierLabel: "None — no data in healthy athletes",
    body: "No studies have examined SS-31 effects on athletic performance in healthy, trained subjects. All clinical evidence comes from disease states (HFpEF, Barth syndrome, renal disease, aging with mitochondrial dysfunction). Whether SS-31 meaningfully improves mitochondrial function when baseline mitochondrial function is not impaired (as in trained athletes) is unknown and mechanistically uncertain.",
    sources: "Absence of athletic performance data; all published trials in disease populations",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function SS31EvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        SS-31 has the most compelling human Phase 2 data of any mitochondria-targeted peptide. The HARP trial (HFpEF), Barth syndrome Phase 3, and renal ischemia data are genuine clinical signals from mechanistically appropriate patient populations. The gap is community use: no studies in healthy subjects, athletes, or aging without diagnosed mitochondrial dysfunction. The disease-context data supports the mechanism but does not establish benefit in the optimization context.
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
