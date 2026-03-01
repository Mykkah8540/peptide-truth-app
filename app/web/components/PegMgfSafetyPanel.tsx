/**
 * PegMgfSafetyPanel — proactive safety intelligence for PEG-MGF.
 * Key frame: no human clinical safety data; IGF-1 pathway activation with oncogenesis
 * and insulin resistance concerns; PEGylation accumulation uncharacterized.
 * Community stacking with anabolic steroids adds compounded unknowns.
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
    id: "no-human-data",
    heading: "No human clinical trial safety data \u2014 completely uncharacterized",
    tier: "watch",
    body: "No human clinical trials of PEG-MGF have been conducted. No pharmacokinetic studies, no dose-escalation safety data, no adverse event reporting from controlled use. The safety profile of PEG-MGF in humans is completely unknown. This is not a compound with a safety profile to weigh against benefits \u2014 it is a compound with no human safety data at all.",
    context: "The preclinical data in animal models establishes biological plausibility but does not characterize human safety. Rodent toxicology does not predict human adverse events with reliability, particularly for complex hormonal effects. The absence of human data is the primary safety concern.",
  },
  {
    id: "igf-pathway-oncogenesis",
    heading: "IGF-1 pathway activation \u2014 oncogenesis and tumor growth concern",
    tier: "watch",
    body: "IGF-1 receptor signaling is a well-established driver of cell proliferation, survival, and tumor growth across multiple cancer types (breast, prostate, colorectal, lung). Elevated circulating IGF-1 is associated with increased cancer risk in epidemiological studies. Whether PEG-MGF activates IGF-1R (the primary growth-promoting signaling pathway) or a distinct pathway as claimed is not definitively established. If it activates IGF-1R, the oncogenesis concern applies directly. If it acts via a distinct pathway, that pathway has not been characterized for tumor-promoting effects.",
    context: "The oncogenesis concern applies with particular force to chronic use in individuals with pre-malignant conditions, family history of hormone-sensitive cancers (breast, prostate), or existing tumors. This is not a fringe concern \u2014 the IGF-1 pathway is a validated oncology target and is also the pathway community uses this compound to perturb.",
  },
  {
    id: "insulin-resistance",
    heading: "Insulin resistance and metabolic dysregulation",
    tier: "watch",
    body: "IGF-1 axis activation can interfere with insulin signaling through receptor cross-talk and downstream pathway overlap (PI3K/Akt signaling is shared). Chronic dysregulation of IGF-1 signaling in metabolic contexts has been linked to insulin resistance. Whether PEG-MGF produces meaningful effects on glucose metabolism in humans is unknown. In the context of anabolic steroid stacking (common in community use), the combination of IGF-1 axis perturbation and steroid-induced insulin resistance is particularly concerning.",
    context: "This is a theoretical concern with mechanistic basis \u2014 it has not been specifically documented for PEG-MGF in humans. However, it would not be detected without glucose and insulin monitoring, which no one doing gray-market PEG-MGF use is systematically conducting.",
  },
  {
    id: "peg-accumulation",
    heading: "PEG accumulation with repeated dosing \u2014 theoretical concern, uncharacterized",
    tier: "watch",
    body: "PEG polymers can accumulate in tissues with chronic dosing. For pharmaceutical PEGylated drugs, body burden is characterized during clinical development. For PEG-MGF, no data on PEG accumulation exists. The molecular weight and branching pattern of the PEG used in gray-market PEG-MGF is not standardized or verified. PEG anti-PEG antibody formation has been documented with some PEGylated drugs, creating the potential for reduced efficacy and allergic reactions with repeated administration.",
    context: "Anti-PEG antibodies have been identified in general populations with increasing frequency, potentially from exposure to PEG in consumer products and medicines. Pre-existing anti-PEG antibodies could cause immune reactions to PEG-MGF administration. This is a theoretically real concern that is completely uncharacterized for this compound.",
  },
  {
    id: "source-quality",
    heading: "Gray-market product identity \u2014 what you inject may not be what is claimed",
    tier: "watch",
    body: "PEG-MGF from research peptide suppliers has no regulatory oversight for identity, purity, concentration, sterility, or PEGylation quality. The PEGylation process (attaching PEG chains to the MGF peptide) is chemically complex. Improperly PEGylated product, incorrectly sequenced peptide, incorrect concentration, or contamination are all real possibilities. A certificate of analysis from a third-party lab is the minimum baseline, and even that depends on the testing methodology and what was actually tested.",
    context: "The 2013 outbreak of fungal meningitis from contaminated compounded methylprednisolone injections killed 64 people in the US. Sterility and contamination risks from non-pharmaceutical injectable compounds are not hypothetical. For any gray-market injectable: third-party sterility testing is the minimum standard.",
  },
  {
    id: "no-acute-toxicity",
    heading: "No established acute toxicity profile",
    tier: "low",
    body: "There are no documented cases of acute severe toxicity from PEG-MGF in the literature or in community reports. However, the absence of documented toxicity reflects absence of systematic monitoring rather than confirmed safety. Community use does not include systematic adverse event reporting. Acute toxicity from injection site contamination, immune reactions, or cardiovascular events would not be captured by current evidence.",
    context: "Low concern classification here refers to the absence of documented acute toxicity \u2014 not to a characterized safety ceiling. The compound is not safe; it is simply not sufficiently studied to have a documented acute harm profile.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

const RED_LINES = [
  {
    signal: "Personal or family history of cancer \u2014 any type, but particularly hormone-sensitive (breast, prostate, colorectal)",
    action: "Do not proceed. IGF-1 pathway activation with a tumor growth-promoting history creates unacceptable unquantifiable risk. Oncogenesis concern is mechanism-based and not theoretical.",
  },
  {
    signal: "Pregnant or planning pregnancy",
    action: "Hard stop. Growth factor signaling perturbation during pregnancy has unknown effects on fetal development. No safety data exists.",
  },
  {
    signal: "Adolescent use",
    action: "Hard stop. IGF-1 pathway compounds are contraindicated in individuals whose growth plates have not closed. Excess IGF-1 axis activation during development can disrupt endocrine and growth regulation.",
  },
  {
    signal: "Product without a third-party certificate of analysis for identity, purity, and sterility",
    action: "Do not inject. Unverified injectable peptides carry infection and contamination risks that are not managed by any other precaution.",
  },
  {
    signal: "Injection site reaction beyond normal (significant redness, swelling, warmth, fever)",
    action: "Stop use and seek medical evaluation. Injection site infection from contaminated product is a serious risk. Fever after injection is a medical emergency flag.",
  },
];

export default function PegMgfSafetyPanel() {
  return (
    <div className="reta-safety">

      <div>
        <div className="reta-safety__section-label">What actually happens \u2014 and the real risk hierarchy</div>
        <div className="reta-safety__effects">
          {SAFETY_ITEMS.map((item) => {
            const st = TIER_STYLE[item.tier];
            return (
              <div
                key={item.id}
                className="reta-safety__effect"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <div className="reta-safety__effect-top">
                  <div className="reta-safety__effect-name">{item.heading}</div>
                  <span
                    className="reta-safety__effect-badge"
                    style={{ color: st.labelColor, borderColor: st.border }}
                  >
                    {st.label}
                  </span>
                </div>
                <div className="reta-safety__effect-note">{item.body}</div>
                <div className="reta-safety__effect-detail">{item.context}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="reta-safety__redlines-block">
        <div className="reta-safety__section-label" style={{ opacity: 1, color: "#9e3800" }}>
          When to stop and get help
        </div>
        <div className="reta-safety__redlines-sub">
          These aren&apos;t &ldquo;maybe check in with your doctor&rdquo; situations. They&apos;re stop-now signals.
        </div>
        <div className="reta-safety__redlines">
          {RED_LINES.map((r, i) => (
            <div key={i} className="reta-safety__redline">
              <div className="reta-safety__redline-signal">{r.signal}</div>
              <div className="reta-safety__redline-action">{r.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="reta-safety__proportion">
        <div className="reta-safety__proportion-heading">Risk in proportion</div>
        <p>
          PEG-MGF presents a different risk profile than most compounds in this database because it combines absence of human safety data with a mechanism (IGF-1 pathway) that carries specific oncogenesis concern. This is not a compound where the risks are well-characterized and manageable \u2014 it is a compound where the risks are unknown and the theoretical concerns are serious.
        </p>
        <p>
          The cancer concern deserves to be stated plainly: the IGF-1 signaling pathway is a validated oncology target, meaning pharmaceutical companies spend billions trying to block it in cancer patients. A community peptide that activates this pathway without human safety data is not a compound to take lightly based on rodent data. If you have a family history of any cancer \u2014 particularly hormone-sensitive cancers \u2014 this is a hard stop. If you don\u2019t, the risks remain uncharacterized but the oncogenesis concern does not disappear.
        </p>
      </div>

    </div>
  );
}
