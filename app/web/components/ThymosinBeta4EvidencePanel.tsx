/**
 * ThymosinBeta4EvidencePanel — honest evidence for Thymosin Beta-4.
 * Key frame: cardiac repair has Phase 2 human data; wound healing is
 * animal + limited clinical; musculoskeletal community use is extrapolated.
 * The angiogenesis mechanism is well-established — the dual-edge concern is real.
 */

const SIGNALS = [
  {
    label: "Cardiac repair after ischemia — REVERT Phase 2 and RegenAGE program",
    value: "Phase 2 human data — most rigorous TB4 evidence",
    note: "The REVERT Phase 2 trial enrolled patients with ischemic heart failure and administered recombinant TB4 (Regen Therapeutics). Trial was terminated early due to enrollment challenges during COVID, not safety signals. The RegenAGE successor program has continued development. This is the most scientifically rigorous human evidence for TB4 — clinical-grade protein in a defined disease population. It does not directly validate community use of research-grade TB-500 for musculoskeletal injury.",
    tier: "moderate",
  },
  {
    label: "Wound healing and skin repair — animal models and limited clinical evidence",
    value: "Animal data strong; human clinical evidence limited",
    note: "TB4 promotes wound healing in multiple animal models through cell migration promotion, angiogenesis, and anti-inflammatory signaling. Some clinical wound healing applications (diabetic ulcers, dry eye/corneal healing) have been studied in humans. Dry eye / corneal healing has the most promising human-applicable data outside cardiac. The musculoskeletal healing application — which is the primary community use — is extrapolated from wound healing biology without direct human RCT validation.",
    tier: "moderate",
  },
  {
    label: "Ocular / corneal healing — dry eye and corneal repair",
    value: "Small human studies — most translatable acute human evidence",
    note: "Corneal epithelium repair has been studied in humans as a TB4 application. The actin sequestration mechanism promotes corneal epithelial cell migration and wound closure. Some Phase 2 data exists for dry eye. This application has the clearest human-to-mechanism translation — corneal cells expressing TB4 and responding to it is established. This is a distinct application from the community musculoskeletal use.",
    tier: "moderate",
  },
  {
    label: "Angiogenesis (new blood vessel formation) — documented mechanism, dual-edge",
    value: "Mechanistically established — beneficial in repair, theoretical cancer concern",
    note: "TB4 promotes angiogenesis through interaction with integrin-linked kinase (ILK) and promotion of endothelial cell migration. This is the mechanism through which TB4 supports cardiac repair and wound healing — new blood vessels support tissue repair. The same mechanism is exploited by tumors to build tumor vasculature. This dual-edge is not theoretical: angiogenesis is a defined cancer hallmark, and promoting it non-selectively cannot distinguish repair angiogenesis from tumor angiogenesis.",
    tier: "none",
  },
  {
    label: "Musculoskeletal injury healing — tendon, ligament, muscle",
    value: "Animal data only; no human RCTs for this specific application",
    note: "The primary community use case — accelerating recovery from tendon/ligament/muscle injury — has animal model support but no published human RCTs. Rodent tendon repair models show TB4 acceleration of healing. Translation to human musculoskeletal biology is mechanistically plausible but not validated. The community use represents n-of-1 experimentation on an extrapolated indication.",
    tier: "none",
  },
  {
    label: "Anti-inflammatory activity — NF-κB and inflammatory mediator modulation",
    value: "Mechanistically established in vitro and animal models",
    note: "TB4 reduces inflammatory signaling through multiple pathways including NF-κB suppression and reduction of pro-inflammatory cytokines. This is a consistent finding across in vitro and animal models. The anti-inflammatory activity is likely real and contributes to the injury recovery experience many community users report in the early weeks of use. The clinical significance in human musculoskeletal contexts is not RCT-validated.",
    tier: "moderate",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "Phase 2",   label: "REVERT cardiac trial — most advanced human evidence, terminated early (not safety)",     note: "Early termination due to COVID enrollment challenges; not a safety-driven termination. RegenAGE program successor." },
  { stat: "43 aa",     label: "full TB4 protein length — TB-500 is the 7-amino acid [17-23] fragment (Ac-SDKP)",        note: "TB4 and TB-500 share the active fragment but are different molecules with different bioavailability profiles" },
  { stat: "0",         label: "published human RCTs for musculoskeletal injury healing — the community use gap",          note: "The injury recovery community use case has no dedicated human trial evidence; all data extrapolated from other indications" },
  { stat: "Animal",    label: "evidence standard for musculoskeletal community use — rodent tendon/muscle models",        note: "Strong animal signal, unvalidated human translation for the primary community use case" },
];

const MECHANISMS = [
  {
    receptor: "G-actin sequestration — the primary mechanism for cell migration and cytoskeletal dynamics",
    label: "Binds free actin monomers, modulating filament formation and cell motility",
    tier: "strong",
    body: "TB4 binds G-actin (unpolymerized actin monomers) with high affinity, functioning as the largest intracellular actin-sequestering protein. By controlling the ratio of free to polymerized actin, TB4 modulates cell motility — cells need to reorganize their actin cytoskeleton to migrate. This makes TB4 a pro-migration signal for repair cells (fibroblasts, endothelial cells, immune cells) moving to injury sites. The Ac-SDKP fragment (TB-500) retains a significant portion of this actin-binding activity — it was identified as the minimal active sequence.",
    evidence: "G-actin binding: crystallography and biochemical studies. Cell migration promotion: in vitro and animal data across multiple cell types. Ac-SDKP identification as active fragment: Goldstein et al. and subsequent studies. Human translation of actin sequestration: established mechanism; specific clinical outcome data in musculoskeletal contexts absent.",
  },
  {
    receptor: "Angiogenesis via ILK and endothelial signaling — the repair and cancer dual-edge",
    label: "Promotes new blood vessel formation supporting tissue repair — same mechanism that tumor vasculature exploits",
    tier: "moderate",
    body: "TB4 activates integrin-linked kinase (ILK), which promotes endothelial cell survival and migration — the cellular basis of angiogenesis (new vessel formation). In the cardiac ischemia context, this supports formation of new vessels in damaged heart muscle. In wound healing, this supports tissue revascularization. The same pathway is exploited by tumors to establish their own blood supply. Angiogenesis is a defining cancer hallmark; TB4's pro-angiogenic activity cannot selectively support repair vasculature over tumor vasculature.",
    evidence: "ILK activation by TB4: established in mechanistic studies. Pro-angiogenic activity: animal models and in vitro. Cardiac angiogenesis in REVERT: clinical endpoint in trial design. Theoretical cancer vasculature concern: logical from established angiogenesis hallmark biology; not confirmed by human cancer incidence data from TB4 trials.",
  },
];

const GAPS = [
  "Human RCTs for musculoskeletal injury healing: absent — this is the primary gap between community use and clinical evidence",
  "TB-500 (fragment) pharmacokinetics and dose-response in humans: not characterized; community dosing is convention-based, not trial-derived",
  "Long-term safety of repeated angiogenesis promotion in healthy adults: not studied; the theoretical cancer vasculature concern cannot be resolved by available data",
  "TB4 (full protein) vs. TB-500 (fragment) comparative bioavailability: not characterized in humans — the fragment is assumed to replicate the full protein based on the active sequence identification, not clinical comparison",
  "Optimal dosing and cycling for injury recovery: entirely based on community convention; no dose-finding studies for musculoskeletal applications",
  "Research-grade TB-500 purity and stability: highly variable across suppliers; protein fragments are susceptible to degradation",
];

const OBSERVED = [
  "Reduced injury site inflammation in weeks 1-4 is the most consistently reported acute experience — consistent with the anti-inflammatory mechanism",
  "Tendon injury recovery is the dominant community use case — chronic tendinopathies and post-acute tendon injuries are the primary reported applications",
  "Most users combine TB-500 with BPC-157 for injury recovery — the combination is community convention without clinical evidence; the two mechanisms (actin sequestration vs. angiogenesis/VEGFR2) are theoretically complementary",
  "The cardiac repair evidence is well-known in research-oriented community subsets but the cardiac application is rarely the use case for community injection",
  "Purity concerns are increasing — community testing results showing peptide degradation and incorrect composition are being reported more frequently",
];

export default function ThymosinBeta4EvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — clinical cardiac data, extrapolated injury use</div>
        <div className="reta-evidence__trial-header">
          The TB4 evidence base is more rigorous in cardiac repair than in the musculoskeletal injury context where most community use occurs. The REVERT Phase 2 trial represents real clinical evidence — but it evaluated pharmaceutical-grade recombinant TB4 in cardiac patients, not research-grade TB-500 in athletes. The wound healing literature (animal + limited clinical) supports the mechanism. The community use case (tendon/ligament/muscle recovery) extrapolates from adjacent evidence without its own human trial data.
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
          The TB4 → TB-500 translation (full protein → active fragment) is scientifically grounded. The cardiac evidence → musculoskeletal injury application translation is a larger inferential step with meaningful evidence gaps.
        </div>
      </div>

      {/* ── Mechanism breakdown ── */}
      <div>
        <div className="reta-evidence__section-label">The mechanisms — actin, angiogenesis, and the dual-edge</div>
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
          Community reports from injury recovery and performance-focused users. TB-500 is more commonly used than the full TB4 protein.
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
