/**
 * KpvEvidencePanel — calibrated evidence for KPV (Lys-Pro-Val).
 * Key frame: strong in vitro NF-κB and MC1R mechanism data; consistent
 * animal IBD model evidence; zero human RCTs; systemic injection evidence
 * for any indication is absent.
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
    id: "nfkb-inhibition",
    claim: "KPV inhibits NF-κB signaling and reduces pro-inflammatory cytokine production in vitro",
    tier: "strong",
    tierLabel: "Strong — in vitro; consistent across cell types; mechanism well-characterized",
    body: "KPV's inhibition of NF-κB nuclear translocation and transcriptional activity has been demonstrated in multiple cell culture systems including macrophages, epithelial cells, and intestinal cell lines. NF-κB is a central transcription factor driving production of TNF-α, IL-6, IL-1β, and IL-8 — the core pro-inflammatory cytokines in IBD and other inflammatory conditions. KPV reduces these cytokines in LPS-stimulated macrophages and in cytokine-stimulated intestinal epithelial cell models. The NF-κB inhibitory effect is independent of melanocortin receptor activity in some cell systems, suggesting a direct intracellular pathway. This is the mechanistic foundation for all downstream efficacy claims.",
    sources: "Bhatt et al. (NF-κB inhibition in macrophages); Dalmasso et al. intestinal epithelial KPV studies; alpha-MSH C-terminal fragment anti-inflammatory mechanism literature",
  },
  {
    id: "mc1r-partial-agonism",
    claim: "KPV acts as a partial agonist at MC1R on immune cells, producing anti-inflammatory signaling",
    tier: "strong",
    tierLabel: "Strong — receptor pharmacology established in vitro; partial agonism confirmed",
    body: "MC1R (melanocortin 1 receptor) is expressed on macrophages, dendritic cells, NK cells, and other immune cells. Alpha-MSH is the full agonist at MC1R; KPV (the C-terminal fragment) retains partial MC1R agonist activity. MC1R activation on immune cells produces anti-inflammatory effects — reduced pro-inflammatory cytokine secretion, increased anti-inflammatory IL-10, and modulation of dendritic cell function. The partial agonist characterization means KPV has lower intrinsic efficacy than full alpha-MSH but may have fewer melanocortin off-target effects (pigmentation via melanocyte MC1R, appetite effects via MC4R). The receptor binding and partial agonism are confirmed in pharmacological studies.",
    sources: "Getting et al. (MC1R on immune cells); Brzoska et al. melanocortin receptor immune regulation; alpha-MSH fragment receptor pharmacology literature",
  },
  {
    id: "colitis-animal-models",
    claim: "KPV reduces colonic inflammation in murine colitis models",
    tier: "moderate",
    tierLabel: "Moderate — consistent animal model data; multiple colitis models; no human translation yet",
    body: "Multiple independent research groups have tested KPV in murine IBD models — primarily DSS (dextran sulfate sodium)-induced colitis and TNBS (2,4,6-trinitrobenzene sulfonic acid)-induced colitis. Results consistently show: reduced macroscopic colon damage, lower histological inflammation scores, decreased colonic TNF-α and IL-6, and reduced myeloperoxidase activity (marker of neutrophil infiltration). The consistency across models and research groups strengthens the animal model evidence. Whether these findings translate to human IBD is the critical unknown — rodent colitis models have a poor record of predicting human IBD therapeutic success (many therapies effective in mouse colitis failed in human IBD trials).",
    sources: "Dalmasso et al. 2008 (oral KPV nanoparticles in colitis); Borthakur et al. intestinal KPV studies; multiple DSS/TNBS colitis KPV publications",
  },
  {
    id: "oral-delivery",
    claim: "Oral KPV achieves sufficient GI bioavailability to reduce colonic inflammation in animal models",
    tier: "moderate",
    tierLabel: "Moderate — animal model evidence; formulation-dependent; nanoparticle delivery improves efficacy",
    body: "Unlike most peptides, KPV's small size (tripeptide) allows partial survival through GI proteolysis. Studies using free oral KPV and KPV-loaded nanoparticles (PLGA, chitosan) in colitis mice have demonstrated anti-inflammatory effects, suggesting sufficient bioavailability in the colon. Nanoparticle formulations show enhanced efficacy — longer retention in inflamed tissue, reduced degradation. The oral delivery evidence is a key part of KPV's research rationale for IBD, distinguishing it from larger peptides where oral delivery is impractical. Human colonic bioavailability studies do not exist.",
    sources: "Laroui et al. 2010 (PLGA nanoparticle oral KPV colitis); Bhatt et al. nanoparticle delivery studies; oral peptide bioavailability IBD literature",
  },
  {
    id: "intestinal-barrier",
    claim: "KPV supports intestinal barrier function and reduces intestinal permeability",
    tier: "moderate",
    tierLabel: "Moderate — in vitro and animal model data; relevant to IBD and 'leaky gut' contexts",
    body: "Independent of its direct anti-inflammatory effects, KPV appears to support intestinal epithelial barrier function. In vitro studies show KPV reduces tight junction protein disruption (claudin-1, occludin, ZO-1) in cytokine-challenged intestinal epithelial cell monolayers. Animal model studies show reduced intestinal permeability (measured by FITC-dextran flux assay) in colitis mice treated with KPV. This barrier-supportive effect may operate through reduced epithelial NF-κB signaling and reduced inflammatory disruption of tight junctions, rather than a direct tight junction-stabilizing mechanism.",
    sources: "Dalmasso et al. barrier function studies; tight junction protein expression KPV literature; FITC-dextran permeability assay data in KPV colitis studies",
  },
  {
    id: "human-ibd-rct",
    claim: "KPV improves outcomes in human IBD clinical trials",
    tier: "none",
    tierLabel: "None — no human RCTs; no human IBD efficacy data; evidence base is entirely preclinical",
    body: "No randomized controlled trials of KPV for IBD or any other indication have been published in humans. The clinical evidence base is zero — all efficacy data is from cell culture and animal models. Community use extrapolates from preclinical data without any human validation. The history of IBD drug development contains multiple compounds that showed strong animal model efficacy and then failed in human clinical trials — making the absence of human data particularly important to communicate clearly.",
    sources: "Absence of human clinical trial data confirmed in PubMed; IBD drug development failure rates cited in Turner et al. 2020 (Gastroenterology, preclinical-to-clinical translation failure review)",
  },
  {
    id: "systemic-injection",
    claim: "Subcutaneous KPV injection produces systemic anti-inflammatory effects in humans",
    tier: "none",
    tierLabel: "None — no human data; route bypasses the GI delivery rationale; systemic effects uncharacterized",
    body: "The research rationale for KPV in IBD is specifically based on local mucosal delivery to inflamed intestinal tissue — oral or rectal routes. Subcutaneous injection, while used in some animal model studies, bypasses this targeted delivery rationale and exposes the compound systemically. Systemic MC1R and NF-κB effects from subcutaneous KPV in humans have not been studied. The assumption that injectable KPV produces beneficial systemic anti-inflammatory effects is not supported by evidence and introduces the full spectrum of systemic MC1R partial agonism effects without the mucosal targeting rationale.",
    sources: "Absence of human injection study data; systemic vs. local delivery distinction in IBD literature",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",         labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",       labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence",    labelColor: "#9e3800" },
};

export default function KpvEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        KPV has strong in vitro mechanism evidence (NF-κB inhibition, MC1R partial agonism) and consistent animal model data for IBD. The oral delivery mechanism has specific support for the GI indication. But the human evidence is zero — no RCTs exist for any indication. The systemic injection route bypasses the core research rationale (local GI delivery) and has no specific evidence base. Community use should be calibrated to this reality: promising preclinical evidence in a well-defined IBD context, with the standard caveat that animal-to-human translation in IBD is historically unreliable.
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
