/**
 * Bpc157ArginateEvidencePanel — calibrated evidence for BPC-157 Arginate.
 * Key frame: all evidence is BPC-157 evidence — no arginate-specific studies exist.
 * The arginate salt form is assumed pharmacologically equivalent. 30+ years of
 * animal model data; zero human RCTs for any form. The arginate evidence is
 * essentially a formulation chemistry question sitting on top of the BPC-157 base.
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
    id: "formulation-equivalence",
    claim: "BPC-157 arginate delivers the same active peptide as standard BPC-157 and is pharmacologically equivalent",
    tier: "strong",
    tierLabel: "Strong — pharmaceutical chemistry first principles; salt dissociation is established science",
    body: "The pharmacological equivalence of BPC-157 arginate and standard BPC-157 is grounded in fundamental pharmaceutical chemistry: salt forms of peptides dissociate in aqueous solution and in vivo, delivering the same active peptide. This is the same principle behind sodium salt vs free acid forms of common medications (e.g., sodium valproate vs valproic acid). The arginate counterion provides no receptor-binding activity and is cleared independently as arginine. No study has directly compared BPC-157 arginate to standard BPC-157 in animal models, but the equivalence assumption is pharmacologically sound.",
    sources: "Pharmaceutical chemistry first principles; salt form dissociation in vivo; BPC-157 peptide sequence identity across salt forms",
  },
  {
    id: "animal-wound-healing",
    claim: "BPC-157 promotes wound healing and tissue repair in animal models",
    tier: "strong",
    tierLabel: "Strong — consistent across 30+ years of animal model data in multiple injury types",
    body: "The BPC-157 animal model evidence base for tissue repair is the largest and most consistent finding in BPC-157 research. Studies across rodent models of tendon injury, ligament repair, muscle tears, cutaneous wounds, and corneal lesions consistently show accelerated healing with BPC-157 treatment vs saline controls. The effect has been replicated across multiple research groups, primarily from the laboratory of Sikiric et al. at the University of Zagreb. The mechanism involves upregulation of growth factor receptor expression (VEGFR, FGFR), modulation of the nitric oxide system, and promotion of angiogenesis and fibroblast proliferation. This evidence applies equally to arginate form.",
    sources: "Sikiric et al. (multiple studies 1990s-2020s — tendon, ligament, muscle, wound healing); Chang et al. 2011 (wound healing mechanism); BPC-157 repair literature review studies",
  },
  {
    id: "gi-cytoprotection",
    claim: "BPC-157 protects GI tract mucosa from NSAID, alcohol, and stress-induced injury in animal models",
    tier: "strong",
    tierLabel: "Strong — replicated GI protection in multiple animal models; mechanistically characterized",
    body: "BPC-157 was originally isolated as a pentapeptide fragment from gastric juice and exhibits robust gastroprotective effects in rodent models. Protection against NSAID-induced gastropathy, alcohol-induced GI damage, stress ulcers, and inflammatory bowel disease models is consistently demonstrated. The mechanism involves NO system modulation and upregulation of cytoprotective pathways. This is one of the most replicated findings in BPC-157 research — the GI protection data is the most compelling evidence base, and it applies to arginate form through pharmacological equivalence.",
    sources: "Sikiric et al. 1993 (original GI protection); Sikiric et al. (IBD models, NSAIDs); Stable gastric pentapeptide BPC-157 — review by Sikiric group; multiple GI protection replication studies",
  },
  {
    id: "arginate-solubility",
    claim: "BPC-157 arginate has improved aqueous solubility compared to standard BPC-157 acetate",
    tier: "moderate",
    tierLabel: "Moderate — pharmaceutical chemistry basis; not directly comparative in vivo data",
    body: "The improved solubility of arginate salt forms of peptides is an established pharmaceutical chemistry principle. Arginine's positively charged guanidinium group at physiological pH helps stabilize the peptide in aqueous solution. This advantage is real in principle but has not been formally demonstrated in published comparative studies for BPC-157 specifically. The practical clinical significance — whether it meaningfully improves bioavailability, injection tolerability, or reconstitution ease for community users — has not been directly tested.",
    sources: "Pharmaceutical salt form solubility principles; arginate salt use in drug formulation (general pharmaceutical chemistry literature); no BPC-157-specific comparative solubility studies",
  },
  {
    id: "arginate-superiority",
    claim: "BPC-157 arginate is more effective or bioavailable than standard BPC-157",
    tier: "none",
    tierLabel: "None — no comparative pharmacokinetic or pharmacodynamic data; supplier claim not validated",
    body: "No published study has directly compared the pharmacokinetics, bioavailability, or pharmacodynamics of BPC-157 arginate versus standard BPC-157 in any animal or human model. Supplier claims of arginate superiority lack scientific support. The pharmaceutical chemistry rationale for improved solubility does not automatically translate to improved in vivo bioavailability — absorption from subcutaneous injection sites, peptide stability, and receptor binding are determined by the BPC-157 peptide itself, not the counterion. Without head-to-head data, superiority claims are speculative.",
    sources: "Absence of comparative data; no published pharmacokinetic comparison of BPC-157 salt forms in any model",
  },
  {
    id: "human-rct",
    claim: "BPC-157 (any form) produces measurable benefits in human controlled trials",
    tier: "none",
    tierLabel: "None — no human RCT data for any BPC-157 form",
    body: "Despite 30+ years of animal model evidence, no randomized controlled trial of BPC-157 in human subjects has been published. The peptide has not entered formal Phase 2 clinical trial development for any indication. Community use is entirely extrapolated from animal model data and anecdotal human reports. All efficacy claims for BPC-157 arginate — like standard BPC-157 — rest on this animal model foundation without human validation.",
    sources: "Absence of any published human RCT for BPC-157 in any form; ClinicalTrials.gov search confirms no completed RCTs",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",         labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",       labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence",    labelColor: "#9e3800" },
};

export default function Bpc157ArginateEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        BPC-157 arginate&apos;s evidence base is identical to standard BPC-157: strong animal model evidence for wound healing and GI cytoprotection, pharmacological equivalence established by first principles, and zero human RCTs for any form. The arginate-specific claim — improved solubility — has a pharmaceutical chemistry basis but no published comparative in vivo data. Anyone citing arginate superiority over standard BPC-157 is making a claim that has not been empirically tested.
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
