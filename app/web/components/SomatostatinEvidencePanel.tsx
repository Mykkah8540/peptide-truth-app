/**
 * SomatostatinEvidencePanel — calibrated evidence for Somatostatin (SRIF).
 * Key frame: SSTR pharmacology is robustly characterized; octreotide/lanreotide
 * evidence is FDA-level strong. IV somatostatin infusion studies are solid research-
 * grade evidence. Subcutaneous native somatostatin for community GH modulation has
 * zero evidence base — the pharmacokinetic argument alone disqualifies it.
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
    id: "sstr-pharmacology",
    claim: "SSTR1-5 receptor family is well characterized; somatostatin is a Gi-coupled inhibitory peptide at all five subtypes",
    tier: "strong",
    tierLabel: "Strong — foundational receptor pharmacology; decades of characterization",
    body: "The molecular pharmacology of somatostatin receptors is among the best-characterized in peptide endocrinology. SSTR1-5 cloning, expression mapping, downstream signaling cascades, and binding affinities of native somatostatin and synthetic analogs are fully established in the literature. This pharmacological foundation is not in doubt — somatostatin inhibits GH, glucagon, insulin, TSH, and GI secretions through Gi-coupled receptor signaling across five subtypes. The question is not whether somatostatin works, but whether native somatostatin with a 90-second half-life is a practical route to those effects outside of IV infusion.",
    sources: "Patel 1999 (Frontiers in Neuroendocrinology — receptor pharmacology review); Reisine & Bell 1995 (Endocrine Reviews); Dournaud et al. (receptor distribution); multiple molecular pharmacology studies 1990s-2000s",
  },
  {
    id: "octreotide-lanreotide-fda",
    claim: "Octreotide and lanreotide (somatostatin analogs) effectively suppress GH and IGF-1 in acromegaly and carcinoid syndrome",
    tier: "strong",
    tierLabel: "Strong — FDA-approved; multiple Phase 3 RCTs; decades of clinical use",
    body: "The clinical evidence for somatostatin analog efficacy is the strongest in the entire somatostatin pharmacology field. Octreotide (Sandostatin LAR) achieves GH normalization in 50-60% of acromegaly patients and biochemical response in >70% of carcinoid syndrome patients. Lanreotide (Somatuline Autogel) has similar efficacy. Pasireotide, with broader SSTR subtype coverage, is used in Cushing's disease. These compounds have decades of post-marketing safety data. This robust evidence base applies to the SSTR pathway — but it applies to analogs, not to native somatostatin.",
    sources: "Melmed et al. (multiple acromegaly treatment guidelines); Caplin et al. CLARINET trial (lanreotide in NETs, NEJM 2014); Rinke et al. PROMID trial; FDA approval data for Sandostatin LAR and Somatuline",
  },
  {
    id: "iv-infusion-gh-suppression",
    claim: "IV somatostatin infusion acutely suppresses GH, glucagon, and insulin in human subjects",
    tier: "strong",
    tierLabel: "Strong — well-replicated IV infusion pharmacology; research-grade evidence",
    body: "Multiple human physiology studies have demonstrated that continuous IV somatostatin infusion (typically 250-500 mcg/hour) reliably suppresses GH, glucagon, and insulin secretion acutely. These studies established the GH suppression mechanism, characterized the glucose effects (complex — both insulin and glucagon inhibited, with variable net glucose effect depending on baseline state), and defined the half-life of native somatostatin in vivo. This evidence is strong but applies specifically to IV infusion — the evidence that subcutaneous injection achieves any sustained effect is absent.",
    sources: "Gerich et al. 1974 (J Clin Invest — original IV glucose/glucagon/insulin suppression); Koerker et al. 1974 (Science — GH suppression); multiple 1970s-80s physiology studies establishing half-life and IV effects",
  },
  {
    id: "gi-motility-iv",
    claim: "IV somatostatin infusion reduces gastrointestinal secretions and motility in controlled human models",
    tier: "moderate",
    tierLabel: "Moderate — IV physiology studies; clinically relevant but not community-applicable",
    body: "Somatostatin and its analogs significantly reduce GI secretions — gastric acid, pancreatic enzymes, bile — and slow GI motility. This has clinical utility in acute GI bleeding (octreotide is used in variceal bleeding), dumping syndrome, and pancreatitis management. The native somatostatin IV data established these GI effects, which are then translated to octreotide clinical use. The GI evidence is solid but is for IV native somatostatin or analog administration — not community subcutaneous use of native somatostatin.",
    sources: "Bloom et al. (GI effects review); Kowalewski & Mehler (gastric effects); octreotide GI bleeding RCTs; pancreatitis management literature",
  },
  {
    id: "sc-community-gh",
    claim: "Subcutaneous native somatostatin injection produces meaningful GH suppression in community use",
    tier: "none",
    tierLabel: "None — pharmacokinetically implausible; no supporting evidence",
    body: "This claim has no evidence and is pharmacokinetically implausible. Native somatostatin's 90-second plasma half-life means a subcutaneous injection would produce a brief concentration spike cleared within minutes. Achieving sustained GH suppression requires continuous infusion at rates that maintain plasma concentrations above the inhibitory threshold — a subcutaneous bolus cannot do this. No community evidence exists for this use case because it has not been studied, and the pharmacology predicts it would not work. The question is settled by basic pharmacokinetics, not by absence of evidence alone.",
    sources: "Pharmacokinetic first principles; Brazeau et al. 1973 (original somatostatin half-life characterization); absence of any community or clinical evidence for SC native somatostatin efficacy",
  },
  {
    id: "rebound-gh",
    claim: "Rebound GH surge occurs after stopping somatostatin infusion or analog withdrawal",
    tier: "moderate",
    tierLabel: "Moderate — observed in infusion studies and analog withdrawal; clinically characterized",
    body: "Both during and after IV somatostatin infusion and with analog discontinuation, a rebound GH surge above baseline has been documented. This is consistent with the pulsatile GH physiology model — somatostatin withdrawal is one driver of GH pulse initiation. The rebound is generally transient but can be significant in acromegaly patients during analog switches. For community users considering any somatostatin pathway modulation, the rebound effect is a relevant pharmacological consequence that should be anticipated.",
    sources: "Giustina & Veldhuis 1998 (GH pulsatility review); rebound surge literature in acromegaly analog management; somatostatin infusion physiology studies",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",         labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",       labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence",    labelColor: "#9e3800" },
};

export default function SomatostatinEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Somatostatin receptor pharmacology and the analog evidence (octreotide, lanreotide) are among the strongest in peptide endocrinology — FDA-approved, decades of clinical use. IV native somatostatin infusion pharmacology is well-characterized in human physiology studies. The critical gap is between this strong IV/analog evidence and the community use case: subcutaneous native somatostatin has no evidence and is pharmacokinetically implausible as a GH modulation strategy. The evidence supports the mechanism (SSTR inhibition suppresses GH) and the analogs (octreotide works) — not the community delivery method.
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
