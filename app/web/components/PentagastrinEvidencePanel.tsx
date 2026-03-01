/**
 * PentagastrinEvidencePanel — honest evidence landscape for Pentagastrin.
 * Key frame: strong evidence for GI pharmacology (foundational science);
 * moderate for calcitonin stimulation in MTC (now largely obsolete);
 * no evidence for therapeutic or community use (none exists or is sought).
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
    id: "gastric-acid-mechanism",
    claim: "Gastric acid secretion via CCK-B/gastrin receptor \u2014 foundational GI pharmacology",
    tier: "strong",
    tierLabel: "Strong",
    body: "Pentagastrin\u2019s mechanism of action \u2014 stimulating parietal cell acid secretion via CCK-B/gastrin receptor agonism \u2014 is foundational GI pharmacology established through decades of research. The C-terminal tetrapeptide sequence (-Trp-Met-Asp-Phe-NH2, also called tetragastrin) is the minimal active sequence that reproduces the full gastric acid-stimulating effect of endogenous gastrin. This mechanism is not in question.",
    sources: "Gregory and Tracy 1964 (gastrin structure identification). Tracey and Gregory 1964 (pentagastrin synthesis and pharmacology). Subsequent parietal cell physiology: H2/K+-ATPase activation via cAMP and intracellular calcium. CCK-B/gastrin receptor cloning and characterization: multiple groups 1990s.",
  },
  {
    id: "acid-stimulation-test",
    claim: "Pentagastrin gastric acid stimulation test \u2014 maximal acid output measurement",
    tier: "strong",
    tierLabel: "Strong",
    body: "As a diagnostic tool, the pentagastrin gastric acid stimulation test produced reliable, reproducible measurements of maximal acid output (MAO) and peak acid output (PAO) in clinical studies. It was validated against the Histalog (betazole) test, which it replaced, and demonstrated superiority in reliability and tolerability. MAO measurement has established clinical utility in diagnosing achlorhydria and hypersecretory states. The test itself is well-characterized.",
    sources: "Baron 1963 (pentagastrin vs Histalog comparison). Fordtran and Walsh 1973 (acid secretion studies). Multiple GI physiology studies 1960s\u20131990s using pentagastrin stimulation as a reference standard. Current clinical practice: largely replaced by secretin stimulation and serum gastrin measurement for ZE syndrome.",
  },
  {
    id: "calcitonin-stimulation",
    claim: "Calcitonin provocative test for medullary thyroid carcinoma (MTC)",
    tier: "moderate",
    tierLabel: "Moderate",
    body: "Pentagastrin stimulation for calcitonin release from MTC (and C-cell hyperplasia) was an established diagnostic procedure with documented sensitivity and specificity for MTC detection in MEN2 families. Multiple studies validated its utility in this context. However, its clinical role has been substantially displaced by RET genetic testing and calcium gluconate stimulation, and it is now largely of historical rather than current clinical significance. Sensitivity and specificity were documented but varied across studies and cut-off values.",
    sources: "Wells et al. 1994 (pentagastrin-stimulated calcitonin in MEN2). Ghillani et al. 1988. Niccoli et al. 1997 (calcitonin cut-off values). ATA guidelines for MTC management: pentagastrin largely replaced by genetic testing and calcium stimulation. Calcium stimulation vs pentagastrin comparison: Colombo et al. 2012.",
  },
  {
    id: "therapeutic-use",
    claim: "Therapeutic application \u2014 any indication",
    tier: "none",
    tierLabel: "No evidence",
    body: "Pentagastrin has no therapeutic application. It was developed as and remained exclusively a pharmacological tool for diagnostic testing. No evidence supports any therapeutic use, and no therapeutic development programs have been pursued. Its mechanism (gastric acid stimulation) is pharmacologically the opposite direction of therapeutic GI benefit in most clinical contexts.",
    sources: "No therapeutic clinical trials registered or published. Pharmacological rationale for therapeutic use: absent.",
  },
  {
    id: "community-use",
    claim: "Community use \u2014 any enhancement or non-diagnostic application",
    tier: "none",
    tierLabel: "No evidence",
    body: "There is no community use of pentagastrin. Unlike some diagnostic peptides that have been repurposed or investigated in community contexts, pentagastrin has no proposed mechanism of benefit for enhancement, recovery, or longevity purposes. Its GI adverse effect profile (nausea, flushing, cramping) in diagnostic doses makes unsupervised use additionally unattractive.",
    sources: "Community peptide forums: no significant discussion or protocols involving pentagastrin. Research peptide markets: pentagastrin is not a commonly traded or sought compound.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function PentagastrinEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Pentagastrin has a clear and honest evidence profile: strong evidence for what it was designed and used for (GI pharmacology characterization and diagnostic acid testing), moderate evidence for its role in MTC calcitonin stimulation (now mostly displaced by better tools), and no evidence for anything beyond its historical diagnostic applications. This is a pharmacological tool with a well-documented history and a clear trajectory toward obsolescence in its specific niche, replaced by genetic testing that makes repeated provocative testing unnecessary.
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
