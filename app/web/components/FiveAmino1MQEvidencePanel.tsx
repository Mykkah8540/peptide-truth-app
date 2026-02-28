/**
 * FiveAmino1MQEvidencePanel — honest evidence for 5-Amino-1MQ.
 * Key frame: the mechanism is pharmacologically real and interesting.
 * The mouse fat loss data is peer-reviewed. The human evidence is absent.
 * This is as early-stage as a compound gets in community use.
 */

const SIGNALS = [
  {
    label: "NNMT inhibition raises intracellular NAD+ and SAM — mechanism established in vitro",
    value: "Mechanistically established in cell culture and biochemistry",
    note: "5-Amino-1MQ inhibits NNMT at nanomolar concentrations in cell culture. NNMT inhibition reduces nicotinamide methylation, sparing nicotinamide for NAD+ synthesis. The biochemical mechanism — NNMT inhibition raises NAD+ and SAM — is established at the enzyme and cell level. This is not disputed. The question is whether this mechanism produces meaningful fat loss when applied systemically in humans.",
    tier: "strong",
  },
  {
    label: "Fat loss without caloric restriction — mouse high-fat diet studies",
    value: "Animal studies — real peer-reviewed signal; human translation unconfirmed",
    note: "The primary preclinical evidence: mice treated with 5-Amino-1MQ or earlier NNMT inhibitors showed reduced fat mass and improved metabolic markers (glucose tolerance, insulin sensitivity) in high-fat diet models, even with ad libitum food access. These are real experiments published in peer-reviewed journals (Kannt et al., PNAS; Espada et al. and related work). The human translation question is whether mouse adipose NNMT biology predicts human adipose response to NNMT inhibition — this is specifically not validated.",
    tier: "moderate",
  },
  {
    label: "Adipocyte metabolic reprogramming — 'browning' of white adipose tissue",
    value: "Animal and in vitro — mechanism plausible, human confirmation absent",
    note: "NNMT inhibition in mice appears to promote a shift in white adipose tissue toward a brown-fat-like metabolic phenotype — increased mitochondrial activity, uncoupling protein expression, and thermogenic activity. This is the proposed mechanism for the caloric-independent fat loss: more energy is expended as heat rather than stored as fat. Whether this browning effect occurs in human subcutaneous or visceral adipose tissue from NNMT inhibition is not established.",
    tier: "moderate",
  },
  {
    label: "Human fat loss — clinical evidence",
    value: "No published human RCTs — this is the defining gap",
    note: "There are no published peer-reviewed human clinical trials of 5-Amino-1MQ. The compound has not entered formal regulatory-tracked clinical development. All human use is community experimentation without controlled conditions, blinding, or standardized outcome measurement. This is not a minor gap — it is the entire evidence gap. The compound's efficacy in humans is genuinely unknown.",
    tier: "none",
  },
  {
    label: "Longevity and NAD+ pathway effects — sirtuin activation hypothesis",
    value: "Theoretical extrapolation from NAD+ biology — not directly studied for 5-Amino-1MQ",
    note: "Because 5-Amino-1MQ raises cellular NAD+, it is theorized to activate NAD+-dependent sirtuins (SIRT1, SIRT3, etc.) — the same targets pursued by NMN and NR supplementation. Whether sirtuin activation from NNMT inhibition produces longevity effects is a theory layered on top of the already-unvalidated human fat loss claim. These are separate claims with separate evidence requirements.",
    tier: "none",
  },
  {
    label: "Glucose and insulin metabolism effects",
    value: "Animal data positive; human data absent",
    note: "Mouse studies showed improved glucose tolerance and insulin sensitivity with NNMT inhibition. These are metabolic outcomes relevant to the community use case (metabolic health). The mechanism (improved mitochondrial function via NAD+, reduced adipose inflammation) is plausible. No human metabolic trial data for 5-Amino-1MQ exists.",
    tier: "moderate",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "0",         label: "published human RCTs — the defining evidence gap",                                      note: "No regulatory-tracked or peer-reviewed human clinical trials exist for 5-Amino-1MQ" },
  { stat: "Mouse",     label: "evidence standard for fat loss claims — high-fat diet rodent models",                    note: "Real peer-reviewed animal data; poor track record of translating metabolic mouse findings to human outcomes" },
  { stat: "Preclinical", label: "development stage — no IND filing, no Phase 1 safety trial in humans",               note: "The compound has not cleared even Phase 1 (safety) in humans under formal trial conditions" },
  { stat: "NNMT",      label: "target enzyme — well-characterized, elevated in obese adipose tissue",                  note: "The NNMT target is pharmacologically validated; whether inhibiting it produces meaningful human fat loss is the open question" },
];

const MECHANISMS = [
  {
    receptor: "NNMT (nicotinamide N-methyltransferase) — the metabolic enzyme target",
    label: "Blocking the NAD+ and SAM consumer in adipose tissue",
    tier: "strong",
    body: "NNMT catalyzes the methylation of nicotinamide (a NAD+ precursor) to 1-methylnicotinamide (1-MNA), using S-adenosylmethionine (SAM) as the methyl donor. In obese adipose tissue, NNMT is upregulated — creating a state of excessive NAD+ precursor consumption and SAM depletion. By inhibiting NNMT, 5-Amino-1MQ reduces this metabolic drain: nicotinamide accumulates (and is rerouted to NAD+ synthesis), SAM is spared (supporting methylation reactions), and the overall metabolic state of adipocytes shifts. The enzyme target is well-established; the physiological consequences of pharmacological inhibition in humans are not fully characterized.",
    evidence: "NNMT biochemistry: well-established. NNMT upregulation in obesity: multiple studies in humans and rodents. 5-Amino-1MQ IC50 for NNMT inhibition: published (low nanomolar range). Downstream metabolic effects in humans from 5-Amino-1MQ: not directly studied.",
  },
  {
    receptor: "NAD+ and sirtuin pathway — downstream metabolic effects",
    label: "The shared endpoint with NMN and NR — via a different upstream mechanism",
    tier: "moderate",
    body: "NAD+ is a required cofactor for sirtuins (SIRT1, SIRT3, SIRT5) — the enzymes that regulate mitochondrial biogenesis, fatty acid oxidation, and cellular stress responses. By raising NAD+ through NNMT inhibition, 5-Amino-1MQ is theorized to activate these same sirtuin pathways — the same rationale behind NMN and NR supplementation. The difference: NMN/NR add NAD+ precursor from outside; 5-Amino-1MQ reduces the enzyme that drains it internally. Whether this difference in mechanism produces a different or more potent NAD+ effect in adipose tissue specifically is an interesting mechanistic question without a human answer.",
    evidence: "Sirtuin NAD+ dependence: established biochemistry. NAD+ raising by NNMT inhibition in cells: in vitro confirmed. Sirtuin activation by 5-Amino-1MQ in human tissue: not directly measured. Human longevity or metabolic outcomes from sirtuin activation via NNMT inhibition: not studied.",
  },
];

const GAPS = [
  "Human clinical trials: absent — the entire human evidence base is zero published RCTs; community use is conducted without any clinical safety or efficacy data",
  "Human pharmacokinetics: not characterized — bioavailability, half-life, tissue distribution, and metabolite profile in humans are not published",
  "Long-term NNMT inhibition effects: unknown — NNMT plays roles in epigenetic regulation (SAM is the primary methyl donor for DNA and histone methylation); sustained inhibition could affect methylation patterns in ways not anticipated from short-term animal data",
  "Dose-response in humans: entirely convention-based; community dosing is extrapolated from mouse studies without the pharmacokinetic scaling that Phase 1 trials would establish",
  "Cancer-relevant considerations: NNMT is overexpressed in many cancer types where it supports cancer cell survival; the effect of 5-Amino-1MQ on cancer cell NNMT is unexplored in the context of human cancer",
  "Drug interactions: not systematically characterized; SAM and NAD+ pathway perturbation could theoretically affect any medication that depends on methylation metabolism",
];

const OBSERVED = [
  "Increased energy and mild thermogenic sensation are the most commonly reported acute effects — consistent with the NAD+/mitochondrial activation hypothesis but not clinically validated",
  "'Nothing noticeable' is also commonly reported — particularly for fat loss; many users report no observable body composition change in expected timeframes",
  "Community dosing ranges vary widely — 50-250 mg/day is commonly discussed without pharmacokinetic basis; dosing is convention, not validated",
  "Source purity concerns are significant in community discussion — this is a relatively new research chemical with less supply chain maturity than established peptides",
  "The compound is increasingly used in combination with GLP-1 agonists under the hypothesis that different mechanisms produce additive effects — this combination is unstudied",
];

export default function FiveAmino1MQEvidencePanel() {
  return (
    <div className="reta-evidence">

      {/* ── Evidence at a glance ── */}
      <div>
        <div className="reta-evidence__section-label">Evidence at a glance</div>
        <div className="reta-evidence__signals">
          {SIGNALS.map((s) => {
            const st = TIER_STYLE[s.tier];
            return (
              <div
                key={s.label}
                className="reta-evidence__signal"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <div className="reta-evidence__signal-top">
                  <span className="reta-evidence__signal-dot" style={{ color: st.dot }}>●</span>
                  <span className="reta-evidence__signal-value" style={{ color: st.text }}>{s.value}</span>
                </div>
                <div className="reta-evidence__signal-label">{s.label}</div>
                <div className="reta-evidence__signal-note">{s.note}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Evidence landscape ── */}
      <div>
        <div className="reta-evidence__section-label">The evidence landscape — pharmacologically real target, zero human trials</div>
        <div className="reta-evidence__trial-header">
          The NNMT mechanism is not speculative — NNMT is a well-studied enzyme, its upregulation in obesity is documented, and 5-Amino-1MQ inhibits it at nanomolar concentrations in cell studies. The mouse fat loss data is real and peer-reviewed. But &apos;pharmacologically interesting with mouse data&apos; is the starting condition for drug development, not the ending condition. An enormous number of compounds that showed dramatic mouse efficacy have failed in human trials. The specific gap here — no Phase 1 safety trial, no human pharmacokinetic data, no human efficacy trial — is not a minor detail. It is the entire evidence gap.
        </div>
        <div className="reta-evidence__trial-stats">
          {TRIAL_STATS.map((s) => (
            <div key={s.stat} className="reta-evidence__trial-stat">
              <div className="reta-evidence__trial-stat-value">{s.stat}</div>
              <div className="reta-evidence__trial-stat-label">{s.label}</div>
              <div className="reta-evidence__trial-stat-note">{s.note}</div>
            </div>
          ))}
        </div>
        <div className="reta-evidence__trial-callout">
          This is the most evidence-thin compound reviewed on this site. The mechanism is interesting. The preclinical data is real. The human evidence is absent. These are separate facts that should not be conflated.
        </div>
      </div>

      {/* ── Mechanism breakdown ── */}
      <div>
        <div className="reta-evidence__section-label">The mechanism — what is established, and what is extrapolated</div>
        <div className="reta-evidence__mechanisms">
          {MECHANISMS.map((m) => {
            const st = TIER_STYLE[m.tier];
            return (
              <div
                key={m.receptor}
                className="reta-evidence__mechanism"
                style={{ borderTop: `3px solid ${st.dot}` }}
              >
                <div className="reta-evidence__mechanism-receptor" style={{ color: st.dot }}>
                  {m.receptor}
                </div>
                <div className="reta-evidence__mechanism-label">{m.label}</div>
                <div className="reta-evidence__mechanism-body">{m.body}</div>
                <div className="reta-evidence__mechanism-evidence">{m.evidence}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Honest gaps ── */}
      <div>
        <div className="reta-evidence__section-label">What the evidence doesn&apos;t cover</div>
        <ul className="reta-evidence__gaps">
          {GAPS.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </div>

      {/* ── Real-world observations ── */}
      <div className="reta-evidence__observed-block">
        <div className="reta-evidence__observed-heading">
          What people actually report
          <span className="reta-evidence__observed-badge">Observed — not clinical evidence</span>
        </div>
        <div className="reta-evidence__observed-sub">
          Community reports from metabolic-focused users. This compound has less community history than most peptides reviewed here — the signal-to-noise ratio in community reporting is lower.
        </div>
        <ul className="reta-evidence__observed-list">
          {OBSERVED.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
        <a className="reta-evidence__community-link" href="#community">
          Read community experiences →
        </a>
      </div>

    </div>
  );
}
