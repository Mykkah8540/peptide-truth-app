/**
 * GlutathioneEvidencePanel — honest evidence for Glutathione.
 * Key frame: the endogenous GSH biology is well-established. Clinical evidence
 * for exogenous supplementation is route-dependent and narrower than marketed.
 * IV has the best evidence. Oral standard has essentially none for systemic effects.
 * Skin brightening evidence is weak across all routes.
 */

const SIGNALS = [
  {
    label: "IV glutathione for platinum-based chemotherapy neuropathy protection",
    value: "Limited — some RCT evidence, clinical use in oncology settings",
    note: "Several RCTs have examined IV glutathione (1,500-3,000mg before platinum chemotherapy) for protection against peripheral neuropathy. Some data supports benefit in reducing neurotoxicity severity. This is the strongest clinical evidence base for IV glutathione — and it is in a specific clinical context, administered intravenously under physician supervision, not a wellness supplementation context.",
    tier: "moderate",
  },
  {
    label: "Liver disease — non-alcoholic fatty liver disease and alcoholic liver disease support",
    value: "Limited — small studies, some clinical use",
    note: "IV glutathione has been studied in NAFLD and alcoholic liver disease, with some small studies showing improvements in liver enzyme markers. Oral glutathione efficacy for liver support is significantly less established. The mechanistic rationale (GSH is highly concentrated in the liver and central to hepatic detoxification) is sound; the clinical evidence is limited in scale.",
    tier: "moderate",
  },
  {
    label: "Parkinson's disease — early IV evidence for symptom management",
    value: "Preliminary — small trials, not replicated at scale",
    note: "Small studies (primarily Sechi et al., 1996 and subsequent small trials) showed improvements in Parkinson's motor symptoms with IV glutathione. These early findings generated significant interest. Larger, controlled trials have not replicated consistent significant benefit. The evidence base is not strong enough to support a clinical recommendation but the neurological antioxidant mechanism is plausible.",
    tier: "moderate",
  },
  {
    label: "Skin brightening — melanin inhibition mechanism",
    value: "Weak — in vitro mechanism exists; clinical evidence inconsistent",
    note: "Glutathione inhibits tyrosinase (the rate-limiting enzyme in melanin synthesis) in cell culture. This is the basis for the skin brightening claim. Multiple clinical studies have examined oral and IV glutathione for skin lightening — results are inconsistent, effect sizes are modest, and study quality is variable. The Philippines (where skin brightening is culturally significant) has studied this most actively. The mechanism is real; the clinical evidence for predictable, significant skin tone change is not.",
    tier: "none",
  },
  {
    label: "Athletic performance and recovery — antioxidant exercise benefit",
    value: "Very weak — no consistent evidence",
    note: "The rationale: exercise produces oxidative stress; glutathione is the primary antioxidant defense; supplementing GSH could support recovery. The actual evidence: no consistent benefit in athletic performance or recovery has been demonstrated in well-designed human studies. Paradoxically, some evidence suggests that exercise-induced oxidative stress is itself a signaling mechanism for beneficial adaptation — excessive antioxidant supplementation may blunt these adaptations.",
    tier: "none",
  },
  {
    label: "Oral bioavailability — the central evidence problem",
    value: "Established: standard oral form has poor bioavailability",
    note: "Studies directly measuring GSH levels after oral standard glutathione supplementation show minimal or no increase in blood or tissue GSH. The gut degrades glutathione before absorption. Liposomal form significantly improves this — the encapsulated GSH survives gut degradation better. The oral bioavailability problem is why clinical medicine uses IV and why NAC (which has good oral bioavailability and is converted to GSH intracellularly) is the clinical standard for GSH support.",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "IV",     label: "route has the strongest evidence — oral standard has essentially none for systemic effects",     note: "Route determines almost everything about what evidence applies to your situation" },
  { stat: "Weak",   label: "skin brightening evidence — the most marketed claim has the weakest clinical support",          note: "Inconsistent results across multiple small trials; effect sizes modest at best" },
  { stat: "NAC",    label: "the more evidence-supported approach to raising intracellular GSH via oral supplementation",    note: "Better oral bioavailability; established clinical use; works via endogenous synthesis" },
  { stat: "Liver",  label: "the best-characterized therapeutic context — some RCT evidence in liver disease",              note: "IV glutathione in specific liver conditions has the most consistent clinical support" },
];

const MECHANISMS = [
  {
    receptor: "Glutathione peroxidase (GPx) — the primary antioxidant mechanism",
    label: "GSH is the essential cofactor for neutralizing hydrogen peroxide and lipid peroxides",
    tier: "moderate",
    body: "Glutathione peroxidase (GPx) uses reduced glutathione (GSH) as a co-substrate to neutralize hydrogen peroxide (H₂O₂) and lipid peroxides — the reactive oxygen species (ROS) that damage cellular proteins, lipids, and DNA. In this reaction, two GSH molecules donate electrons to neutralize the peroxide, forming oxidized glutathione (GSSG). GSSG is then converted back to GSH by glutathione reductase (using NADPH). This cycle — GPx oxidation + reductase regeneration — is the core of cellular antioxidant defense. The endogenous pool of GSH is the rate-limiting variable; exogenous supplementation can theoretically replenish this pool if it reaches the cell.",
    evidence: "GPx/GSH antioxidant cycle: textbook biochemistry, extremely well-established. Depletion of GSH in disease states (liver disease, HIV, aging): documented. Clinical benefit of raising GSH via exogenous supplementation: route-dependent; IV has some evidence; oral standard has poor evidence.",
  },
  {
    receptor: "Melanin synthesis inhibition — the skin brightening mechanism",
    label: "Tyrosinase inhibition reduces melanin production — real in vitro, inconsistent clinically",
    tier: "moderate",
    body: "Melanin synthesis depends on the enzyme tyrosinase, which catalyzes the rate-limiting oxidation of tyrosine to DOPA (and then to dopaquinone, which becomes melanin). Glutathione can inhibit tyrosinase activity and also shift the balance from eumelanin (dark) to phaeomelanin (lighter) production via its interaction with dopaquinone. The result in cell culture is reduced melanin production. Clinical translation is inconsistent: the effect depends on achieving adequate GSH concentrations in melanocytes, which requires effective delivery. Oral standard form likely doesn't achieve this; IV form may.",
    evidence: "Tyrosinase inhibition by GSH: established in vitro. Clinical skin brightening from oral glutathione: inconsistent in RCTs; effect sizes modest; Filipino studies most active in this area. IV glutathione for skin tone: same inconsistency pattern.",
  },
];

const GAPS = [
  "Large RCTs for oral glutathione supplementation in healthy adults for any wellness claim: essentially absent — most evidence is IV, clinical, or small studies",
  "Liposomal glutathione bioavailability and clinical effect: better characterized than standard oral, but large-scale clinical outcome data is limited",
  "Long-term supplementation effects in healthy adults: not studied adequately to establish safety or efficacy for ongoing use",
  "Athletic performance and recovery: no consistent evidence; the 'antioxidant paradox' (that exercise-induced ROS may be beneficial adaptive signals) complicates the rationale",
  "Skin brightening: mechanism is real, clinical consistency is not — the predictability, durability, and uniformity of any skin tone change are not well-established",
  "Interaction with cancer treatment: IV glutathione in some oncology contexts is protective; in others, antioxidant supplementation may reduce chemotherapy efficacy — this requires oncology guidance, not self-management",
];

const OBSERVED = [
  "The skin 'glow' after IV glutathione sessions is the most consistently reported acute experience — patients in wellness IV clinics commonly describe brighter, more even skin within days of sessions",
  "Oral supplement users frequently report 'nothing noticeable' — consistent with poor oral bioavailability of standard forms; liposomal users report slightly more consistent effects",
  "The comparison to NAC is increasingly common in informed community discussions — users who research the bioavailability issue often shift from oral glutathione to NAC for intracellular GSH support",
  "Athletic community use is declining as the antioxidant paradox has become more widely understood — excessive antioxidant supplementation may blunt training adaptations",
  "IV glutathione protocols in wellness clinics are not standardized — dose, frequency, and indications vary widely; patients often receive variable protocols without clear clinical guidance",
];

export default function GlutathioneEvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — route determines everything</div>
        <div className="reta-evidence__trial-header">
          Glutathione&apos;s evidence picture is fundamentally bifurcated by route. IV glutathione has some legitimate clinical evidence (chemotherapy neuropathy protection, liver disease) and the delivery is real. Oral standard glutathione has essentially no evidence for meaningful systemic GSH elevation — the bioavailability problem is established. Liposomal oral form bridges this gap partially. The skin brightening evidence — the most marketed wellness use — is weak across all routes. Understanding which route applies to which evidence claim is the most important framing for evaluating glutathione products.
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
          If the evidence you find for glutathione is from an IV study, it does not apply to oral supplementation, and vice versa.
        </div>
      </div>

      {/* ── Mechanism breakdown ── */}
      <div>
        <div className="reta-evidence__section-label">The mechanism — what we know</div>
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
          Community and patient reports across IV clinic users, oral supplement users, and the athletic community.
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
