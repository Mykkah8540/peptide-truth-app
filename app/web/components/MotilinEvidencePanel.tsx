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
    id: "mot-physiology",
    claim: "Motilin receptor physiology and MMC regulation",
    tier: "strong",
    tierLabel: "Strong",
    body:
      "The role of motilin in triggering the migrating motor complex (MMC) is well-established physiology. Motilin levels rise cyclically in the fasted state, peaking at the onset of phase III MMC contractions approximately every 90\u2013120 minutes. This interdigestive motility pattern has been documented since the 1970s and is not disputed. MLNR expression in GI smooth muscle and enteric neurons is well-characterized.",
    sources:
      "Itoh et al., Gastroenterology (1976); Peeters et al., Gastroenterology (1992); Depoortere et al., Gut (2012).",
  },
  {
    id: "mot-erythromycin",
    claim: "Erythromycin prokinetic effect via MLNR",
    tier: "moderate",
    tierLabel: "Moderate",
    body:
      "Erythromycin\u2019s MLNR agonist activity at low doses (1\u20133 mg/kg IV or 250 mg oral) is well-documented. It accelerates gastric emptying and has been used clinically for gastroparesis for decades. The evidence is moderate rather than strong because: tachyphylaxis develops with repeated dosing (receptor downregulation), response rates in gastroparesis trials are inconsistent, and erythromycin\u2019s use as a prokinetic has declined as QT prolongation concerns from the antibiotic properties emerged.",
    sources:
      "Janssens et al., NEJM (1990); Camilleri et al., Gastroenterology (2006); Parkman et al., Gastroenterology (2004).",
  },
  {
    id: "mot-exogenous",
    claim: "Exogenous motilin therapy (clinical benefit from the peptide itself)",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "There is no approved formulation of exogenous motilin and no clinical trial evidence that administering exogenous motilin peptide produces meaningful or sustained GI motility benefits. The peptide has a very short half-life in circulation, is rapidly degraded, and would require continuous IV infusion for any pharmacological effect \u2014 making it impractical as a therapeutic agent. Research peptide market motilin has no human efficacy data.",
    sources:
      "No approved products. No Phase 2+ trials of exogenous motilin peptide administration identified in clinicaltrials.gov.",
  },
  {
    id: "mot-agonists",
    claim: "Synthetic motilin agonists for gastroparesis (camicinal, GSK962040)",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "Multiple small-molecule motilin receptor agonists have been developed and studied in gastroparesis trials. Camicinal (GSK962040) showed early promise but failed in Phase 2b trials for diabetic gastroparesis \u2014 the primary endpoint (gastric emptying) improved but symptom relief did not, and the program was discontinued. The motilin receptor agonist approach for gastroparesis remains unproven as a durable therapy.",
    sources:
      "Moshiree et al., Lancet Gastroenterology & Hepatology (2021); McCallum et al., Gastroenterology (2012); GSK962040 trial data (NCT01163019).",
  },
];

const TIER_STYLE: Record<
  Tier,
  { bg: string; border: string; label: string; labelColor: string }
> = {
  strong: {
    bg: "rgba(21,100,58,0.05)",
    border: "rgba(21,100,58,0.13)",
    label: "Strong",
    labelColor: "#155e38",
  },
  moderate: {
    bg: "rgba(124,82,0,0.06)",
    border: "rgba(124,82,0,0.17)",
    label: "Moderate",
    labelColor: "#7c5200",
  },
  none: {
    bg: "rgba(158,56,0,0.06)",
    border: "rgba(158,56,0,0.18)",
    label: "No evidence",
    labelColor: "#9e3800",
  },
};

export default function MotilinEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Motilin\u2019s biology is real and well-characterized \u2014 but as an exogenous peptide,
        it has no therapeutic application and no clinical trial evidence. The interesting clinical
        story is in its receptor agonists (erythromycin, and failed synthetic agonists), not in
        the peptide itself.
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
