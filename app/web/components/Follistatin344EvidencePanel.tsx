/**
 * Follistatin344EvidencePanel — calibrated evidence for Follistatin-344.
 * Key frame: mechanism is established; animal/gene therapy data is real and dramatic;
 * human peptide injection data is absent. The gap is not minor — it is the entire
 * pharmacokinetic and efficacy story for the route of administration used by community.
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
    id: "mechanism-myostatin",
    claim: "Follistatin binds and neutralizes myostatin (GDF-8) and activin",
    tier: "strong",
    tierLabel: "Strong — established biochemistry",
    body: "The molecular interaction between follistatin and TGF-β superfamily ligands (myostatin, activin A/B, GDF-11) is established structural biology and biochemistry. Co-crystal structures exist. The binding affinities (Kd in the picomolar range for myostatin) are well-characterized. This is textbook endocrinology — not speculative. Follistatin acts as a high-affinity extracellular trap for myostatin and activin, preventing them from binding their receptors (ActRIIA/ActRIIB).",
    sources: "Structural studies (Harrington et al. 2006, Thompson et al. 2005); endocrinology biochemistry literature",
  },
  {
    id: "transgenic-muscle",
    claim: "Myostatin loss-of-function produces dramatic muscle hypertrophy in animals",
    tier: "strong",
    tierLabel: "Strong — multiple animal models, rare human cases",
    body: "Myostatin knockout mice have roughly double the muscle mass of wild-type. Double-muscled cattle (Belgian Blue, Piedmontese) have natural myostatin loss-of-function mutations. Rare pediatric cases of myostatin pathway mutations in humans show extreme muscle hypertrophy with normal strength-per-unit-muscle ratios. Follistatin overexpression in mice produces comparable muscle hypertrophy to myostatin knockout. The pathway's role in muscle mass regulation is not in doubt. The question is translation to exogenous peptide injection.",
    sources: "McPherron et al. 1997 (Nature); double-muscled cattle genetics literature; Schuelke et al. 2004 (NEJM, pediatric case)",
  },
  {
    id: "primate-gene-therapy",
    claim: "AAV-delivered follistatin produces muscle gain in non-human primates",
    tier: "moderate",
    tierLabel: "Moderate — NHP gene therapy; not peptide injection",
    body: "Gene therapy studies delivering follistatin via adeno-associated virus (AAV) to non-human primates (cynomolgus macaques) showed significant muscle hypertrophy over months of follow-up. The Nationwide Children's group published NHP data showing sustained muscle gains with acceptable safety profiles, supporting progression to human gene therapy trials in muscular dystrophy. This is real evidence of follistatin's muscle-building capability in primates — but in a gene therapy context that produces sustained, local follistatin expression, not a transient systemic peptide injection.",
    sources: "Rodino-Klapac et al. 2009 (Mol Ther); Mendell et al. muscular dystrophy gene therapy program",
  },
  {
    id: "human-gene-therapy",
    claim: "Follistatin gene therapy in humans (muscular dystrophy) — in clinical development",
    tier: "moderate",
    tierLabel: "Moderate — disease context; gene therapy, not peptide",
    body: "Human follistatin gene therapy trials have been conducted in Becker muscular dystrophy and inclusion body myositis. Results have shown modest but real improvements in muscle function in disease-affected patients. This is clinically supervised gene therapy in patients with established muscle-wasting disease — the safety monitoring, dosing control, and patient population are entirely different from healthy community users injecting follistatin-344 peptide. The evidence is not transferable to peptide injection use.",
    sources: "Mendell et al. 2015 (Mol Ther); Bhagavati et al. inclusion body myositis gene therapy literature",
  },
  {
    id: "peptide-injection-humans",
    claim: "Subcutaneous/intramuscular follistatin-344 peptide injection produces muscle hypertrophy in healthy humans",
    tier: "none",
    tierLabel: "None — no human RCTs; pharmacokinetics uncharacterized",
    body: "There are no published human randomized controlled trials of follistatin-344 peptide injection for muscle hypertrophy. The pharmacokinetics of injected follistatin-344 in humans — bioavailability, half-life, tissue distribution, myostatin suppression duration — are not characterized. The entire pharmacokinetic bridge from gene therapy (sustained intramuscular expression) to subcutaneous peptide injection (transient systemic exposure) has not been established. Community evidence is anecdotal and confounded. This is the central evidence gap.",
    sources: "Absence of published human pharmacokinetic or efficacy data for injected follistatin-344 peptide",
  },
  {
    id: "fsH-activin-suppression",
    claim: "Follistatin suppresses FSH via activin blockade",
    tier: "strong",
    tierLabel: "Strong — established reproductive endocrinology",
    body: "Activin A stimulates FSH secretion from the pituitary. Follistatin is the endogenous activin antagonist that counterbalances this. This FSH regulatory mechanism is established reproductive endocrinology. Exogenous follistatin would be expected to suppress FSH and, downstream, affect spermatogenesis in males and follicular development in females. This is not a theoretical concern — it is predictable from the endocrinology.",
    sources: "Reproductive endocrinology textbook; Vale et al. activin/follistatin axis characterization",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",   labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate", labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function Follistatin344EvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        The mechanism is established and the animal data is dramatic — but the translation to injected peptide in humans is the missing link. Gene therapy and transgenic models produce sustained, high follistatin concentrations in target tissue; subcutaneous peptide injection does not. No human pharmacokinetic or efficacy data exists for follistatin-344 injection. The evidence for FSH suppression (via activin blockade) is strong and represents a predictable consequence, not a speculative risk.
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
