/**
 * ThymosinBeta4SafetyPanel — safety intelligence for Thymosin Beta-4.
 * Key frame: angiogenesis promotion is the primary long-term concern (cancer).
 * Short-term safety profile is generally benign in animal and limited human data.
 * The cardiac trial (REVERT) did not produce safety-driven termination.
 */

type Tier = "flag" | "watch" | "low";

interface SideEffect {
  id: string;
  name: string;
  tier: Tier;
  prevalence: string;
  mechanism: string;
  management: string[];
}

const SIDE_EFFECTS: SideEffect[] = [
  {
    id: "cancer-angiogenesis",
    name: "Cancer promotion through angiogenesis — the mechanism-based long-term concern",
    tier: "flag",
    prevalence: "Not established by incidence data — theoretical mechanism-based concern",
    mechanism: "TB4 promotes angiogenesis (new blood vessel formation) through ILK and endothelial cell signaling. Tumors require angiogenesis to grow beyond a small size — this is a defined hallmark of cancer. Exogenous TB4/TB-500 administration promotes angiogenic signaling non-selectively: it cannot distinguish repair vasculature from tumor vasculature. Whether this translates to meaningful cancer promotion risk in humans is not established by clinical incidence data from the limited trial population — but the mechanism is real and the concern is not dismissible.",
    management: [
      "Cancer history (any type): do not use TB4 or TB-500 — the angiogenesis mechanism applies to both the full protein and the fragment",
      "If using TB4/TB-500: be attentive to any new masses, unexplained growths, or tissue changes — the angiogenesis concern creates an ongoing surveillance obligation",
      "Annual health check including relevant cancer screening is warranted for anyone using angiogenic compounds on a recurring basis",
    ],
  },
  {
    id: "pregnancy",
    name: "Pregnancy — angiogenic and developmental concerns",
    tier: "flag",
    prevalence: "Contraindication — no safety data in pregnancy",
    mechanism: "TB4 plays a role in fetal development and vascular morphogenesis. Exogenous administration during pregnancy could interfere with normal developmental angiogenesis and tissue patterning. No safety data exists for TB4 or TB-500 in pregnancy.",
    management: [
      "Do not use TB4 or TB-500 during pregnancy — the developmental biology implications of exogenous TB4 administration are unknown",
      "If pregnancy is possible, use reliable contraception during TB4/TB-500 use and consider the washout period before conception",
    ],
  },
  {
    id: "injection-site",
    name: "Injection site reactions",
    tier: "watch",
    prevalence: "Common — local redness, pain, swelling at injection site",
    mechanism: "Subcutaneous injection of peptide/protein produces local inflammatory response. TB4 full protein is a larger molecule than typical peptides — local reactions may be more pronounced. Immunogenicity (antibody formation against the injected protein) is a theoretical concern for the full TB4 protein with repeated dosing, though not well characterized for research-grade formulations.",
    management: [
      "Rotate injection sites with each administration",
      "Persistent local nodules, hardening, or worsening reactions over time: consider stopping use and evaluating for local immune reaction",
      "Full TB4 protein formulation: immunogenicity concern is higher than for small synthetic peptides — watch for systemic reactions (unusual fatigue, joint pain) that could indicate immune response",
    ],
  },
  {
    id: "fatigue-headache",
    name: "Fatigue, headache, and transient systemic effects",
    tier: "low",
    prevalence: "Occasionally reported — transient, typically early in use",
    mechanism: "Systemic immune modulation from TB4 can produce transient fatigue or flu-like symptoms in some users. The REVERT trial did not identify these as significant adverse events at trial doses. Community reporting suggests occasional fatigue particularly in the first days of a new dosing cycle.",
    management: [
      "Transient fatigue during the first few days of a dosing cycle is reported and typically self-resolving",
      "Persistent or worsening fatigue warrants stopping use and evaluating for an immune response",
    ],
  },
  {
    id: "quality-stability",
    name: "Research-grade quality and stability concerns",
    tier: "watch",
    prevalence: "Structural risk — variable across suppliers",
    mechanism: "TB4 is a 43-amino acid protein with specific folding requirements. Research-grade products may contain degraded, truncated, or misfolded forms. TB-500 (the synthetic fragment) is smaller and more stable but still subject to purity variation. Community testing has identified significant variability in peptide composition from different suppliers. Degradation products could produce unexpected immune or local tissue reactions.",
    management: [
      "Use only suppliers with third-party CoA showing HPLC purity ≥99% and mass spectrometry identity confirmation",
      "For TB4 full protein: cold chain storage is essential; protein degradation at room temperature is faster than for small synthetic peptides",
      "Discard vials showing visible particulates, cloudiness, or color change",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const PLAYBOOK = [
  {
    heading: "Before starting: cancer and angiogenesis screen",
    items: [
      "Any personal cancer history: do not use — the angiogenesis mechanism applies regardless of cancer type or remission status",
      "Family history of hereditary cancer syndromes: discuss risk-benefit carefully; this is not an absolute contraindication but warrants heightened consideration",
      "Ongoing surveillance for cancer (prior resection, monitoring phase): angiogenesis promotion creates additional theoretical risk during surveillance periods",
    ],
  },
  {
    heading: "Source quality requirements",
    items: [
      "Third-party CoA with HPLC purity and mass spec identity confirmation is the minimum quality gate",
      "Cold chain integrity: TB4 full protein requires refrigeration throughout shipping and storage; room temperature exposure degrades protein integrity",
      "For TB-500 (synthetic fragment): verify that the product actually contains Ac-SDKP [17-23] and not a generic 'TB-500' blend — composition testing has found mislabeled products",
    ],
  },
  {
    heading: "Monitoring during use",
    items: [
      "Annual health assessment including cancer screening appropriate to your age and risk profile",
      "Monitor injection sites for signs of progressive local immune reaction (worsening rather than resolving reactions)",
      "Note any new tissue masses, lymph node enlargement, or unexplained growths — the angiogenesis concern creates a surveillance obligation during use",
    ],
  },
];

const RED_LINES = [
  "Any personal cancer history — angiogenesis promotion applies to the full protein and the fragment; no dose makes this safe in the presence of cancer history",
  "Pregnancy — developmental angiogenesis implications are unknown; stop immediately if pregnancy occurs during use",
  "New unexplained mass or tissue growth during use — stop and seek medical evaluation; the angiogenesis concern makes new growths a higher-priority signal than baseline",
  "Progressive injection site reactions (worsening over multiple doses) — potential immune response to the protein; stop and evaluate",
];

export default function ThymosinBeta4SafetyPanel() {
  return (
    <div className="reta-safety">

      {/* ── Context note ── */}
      <div className="reta-safety__context">
        Thymosin Beta-4&apos;s safety profile is dominated by the angiogenesis mechanism concern (cancer) and the absence of long-term human data. Short-term tolerability in the REVERT cardiac trial was acceptable — the trial was not terminated for safety reasons. The injury-healing community use case lacks the safety monitoring that trial participants received, and the long-term angiogenesis concern cannot be managed by dose limitation alone.
      </div>

      {/* ── Side effects ── */}
      <div className="reta-safety__section-label">Side effects and risk profile</div>
      <div className="reta-safety__effects">
        {SIDE_EFFECTS.map((se) => {
          const st = TIER_STYLE[se.tier];
          return (
            <div
              key={se.id}
              className="reta-safety__effect"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-safety__effect-top">
                <div className="reta-safety__effect-name">{se.name}</div>
                <div className="reta-safety__effect-meta">
                  <span className="reta-safety__effect-prevalence">{se.prevalence}</span>
                  <span
                    className="reta-safety__effect-tier"
                    style={{ color: st.labelColor, borderColor: st.border }}
                  >
                    {st.label}
                  </span>
                </div>
              </div>
              <div className="reta-safety__effect-mechanism">{se.mechanism}</div>
              <ul className="reta-safety__effect-mgmt">
                {se.management.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* ── Playbook ── */}
      <div className="reta-safety__section-label">Safety playbook</div>
      <div className="reta-safety__playbook">
        {PLAYBOOK.map((block) => (
          <div key={block.heading} className="reta-safety__playbook-block">
            <div className="reta-safety__playbook-heading">{block.heading}</div>
            <ul className="reta-safety__playbook-list">
              {block.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Red lines ── */}
      <div className="reta-safety__redlines">
        <div className="reta-safety__redlines-heading">Stop signals — non-negotiable</div>
        <ul className="reta-safety__redlines-list">
          {RED_LINES.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
