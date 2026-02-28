/**
 * HexarelinOverviewPanel — decision-oriented overview for Hexarelin.
 * Key frame: the most potent GHRP by GH release amplitude, but two defining limitations —
 * tachyphylaxis (GH response attenuates faster than any other GHRP) and CD36 cardiac receptor
 * binding (unique among GHRPs, clinically ambiguous in enhancement context).
 * Cortisol + prolactin profile same as GHRP-2/GHRP-6. Community replaced it with ipamorelin.
 */

const STAT_CARDS = [
  {
    value: "Highest-potency",
    label: "acute GH release",
    sub: "Hexarelin produces the largest acute GH pulse of any GHRP — stronger than ipamorelin, GHRP-2, or GHRP-6 at comparable doses; the ceiling is real",
    note: "High potency doesn't translate to better outcomes. Larger GH pulses don't linearly improve body composition — and the tachyphylaxis limitation means the potency advantage erodes faster than with other GHRPs.",
  },
  {
    value: "Tachyphylaxis",
    label: "rapid desensitization",
    sub: "hexarelin's GH response attenuates faster than other GHRPs — within weeks of continuous use; cycling is not optional, it's mechanistically required",
    note: "This isn't a theoretical concern. The ghrelin receptor downregulates with hexarelin faster than ipamorelin or GHRP-2, making the 'potency advantage' temporary. Users who don't cycle lose most of the effect.",
  },
  {
    value: "CD36 binding",
    label: "cardiac receptor activity",
    sub: "hexarelin binds the CD36 scavenger receptor independently of GH release — the only GHRP with this activity; cardiac implications are unclear in enhancement contexts",
    note: "CD36 binding has been studied in heart failure models where it showed cardioprotective effects. Whether this matters in healthy adults, or creates risk in people with cardiac conditions, is uncharacterized. It's a differentiating unknown.",
  },
];

const FIT_YES = [
  "You have a specific short-term goal where maximum GH pulse amplitude matters and you've planned a cycle with mandatory off periods",
  "You have no history of cardiovascular disease, cardiac arrhythmias, or cardiac conditions — CD36 activity makes cardiac history a meaningful screening point",
  "You have no diabetes, prediabetes, or insulin resistance — hexarelin elevates cortisol alongside GH, creating the same compounded glucose-raising mechanism as GHRP-2",
  "You have no history of eating disorders or binge eating — hexarelin's ghrelin receptor activation produces appetite stimulation, though less extreme than GHRP-6",
  "You have no active or recent cancer diagnosis — IGF-1 mitogenic concern applies identically",
  "You understand and accept the tachyphylaxis constraint — the potency advantage is temporary without structured cycling",
];

const FIT_NO = [
  "You have any cardiovascular history (cardiac disease, arrhythmias, uncontrolled hypertension) — CD36 receptor binding creates a unique cardiac consideration not present with other GHRPs",
  "You want sustained, stable GH elevation — hexarelin's tachyphylaxis makes it unsuitable for continuous protocols; ipamorelin or CJC-1295 maintain a more stable response",
  "You want the GH pulse without cortisol or prolactin burden — ipamorelin provides similar GH release without the non-selective hormonal burden hexarelin shares with GHRP-2",
  "You have diabetes, prediabetes, or insulin resistance — GH + cortisol creates the same compounded glucose-raising mechanism as GHRP-2",
  "You have an active cancer diagnosis — IGF-1 is mitogenic; oncology clearance required",
  "You're pregnant, breastfeeding, or an adolescent — hard stop",
  "You want a well-characterized compound with established community protocols — hexarelin has less modern use data than ipamorelin",
];

const TIMELINE = [
  {
    phase: "Weeks 1–3",
    heading: "Peak GH response — before tachyphylaxis sets in",
    body: "Hexarelin's GH response is at its highest in the early weeks — before receptor downregulation begins attenuating the pulse. Water retention and the standard early GH-axis effects (edema, appetite stimulation, cortisol-related mood and sleep changes) are present. If the goal is acute GH pulse amplitude, this window is when it's most pronounced. The response won't remain at this level with continued use.",
  },
  {
    phase: "Weeks 4–8",
    heading: "Tachyphylaxis becomes the primary management challenge",
    body: "By weeks 4–8, most users experience measurable attenuation of the GH response. This is not dose-dependent in the usual sense — increasing dose doesn't reverse receptor downregulation meaningfully. The clinical implication: continuous-use hexarelin protocols lose their primary pharmacological effect. Cycling off for 4–6 weeks is the established mechanism to restore receptor sensitivity. Unlike ipamorelin or CJC-1295, there's no viable 'sustained use' protocol for hexarelin.",
  },
  {
    phase: "Long-term",
    heading: "Cycling is the only viable structure",
    body: "Long-term hexarelin use is functionally a series of short cycles — use for 4–8 weeks, off for 4–6 weeks, repeat. Continuous use delivers diminishing returns faster than any other GHRP. For most enhancement goals, ipamorelin with CJC-1295 provides similar GH benefits with a sustainable protocol. If hexarelin has a role, it's for specific short-cycle peak GH amplitude goals — not ongoing protocols.",
  },
];

const COMPARISON = [
  {
    name: "Hexarelin",
    badge: "Research-grade",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Receptor", value: "Ghrelin receptor (GHSR1a) + CD36 (unique among GHRPs)" },
      { label: "GH potency", value: "Highest acute GH pulse of any GHRP class" },
      { label: "Tachyphylaxis", value: "Fastest desensitization — cycles required; continuous use loses effect" },
      { label: "Cortisol / prolactin", value: "Elevated — non-selective GHRP profile, same as GHRP-2" },
      { label: "CD36 cardiac binding", value: "Unique to hexarelin — cardiac implications unstudied in enhancement context" },
    ],
    highlight: true,
  },
  {
    name: "GHRP-2",
    badge: "Research-grade",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Receptor", value: "Ghrelin receptor only — no CD36 activity" },
      { label: "GH potency", value: "High — similar cortisol/prolactin profile as hexarelin" },
      { label: "Tachyphylaxis", value: "Present but slower than hexarelin — more viable for extended cycles" },
      { label: "Cortisol / prolactin", value: "Elevated — non-selective GHRP profile" },
      { label: "Key distinction", value: "No CD36 binding; more characterized modern use data than hexarelin" },
    ],
    highlight: false,
  },
  {
    name: "Ipamorelin",
    badge: "Community standard",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Receptor", value: "Ghrelin receptor only — no CD36 activity" },
      { label: "GH potency", value: "Moderate — lower peak than hexarelin but sustained without tachyphylaxis" },
      { label: "Tachyphylaxis", value: "Minimal — stable GH response supports sustained protocols" },
      { label: "Cortisol / prolactin", value: "Low — selective GHRP; designed to avoid hexarelin/GHRP-2 limitations" },
      { label: "Why it replaced hexarelin", value: "Sustainable protocol, no cortisol burden, better community data" },
    ],
    highlight: false,
  },
];

export default function HexarelinOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The most potent injectable GH stimulator in its class — but your body adapts fast, and it has unusual cardiac receptor activity.
        </div>
        <div className="reta-overview__headline-sub">
          Hexarelin stimulates GH release more powerfully than any other compound in its class. The catch: your body adapts within weeks, and the GH response drops off significantly as receptors lose sensitivity — faster than any other injectable in this category. It also has an unusual interaction with cardiac tissue that no other GH-stimulating compound shares, and what that means for long-term use isn&apos;t well understood. For sustainable protocols, ipamorelin is the more practical choice.
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="reta-overview__stats">
        {STAT_CARDS.map((s) => (
          <div key={s.value} className="reta-overview__stat">
            <div className="reta-overview__stat-value">{s.value}</div>
            <div className="reta-overview__stat-label">{s.label}</div>
            <div className="reta-overview__stat-sub">{s.sub}</div>
            <div className="reta-overview__stat-note">{s.note}</div>
          </div>
        ))}
      </div>

      {/* ── Fit matrix ── */}
      <div className="reta-overview__section-label">Is this the right call for you?</div>
      <div className="reta-overview__fit">
        <div className="reta-overview__fit-col reta-overview__fit-col--yes">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">✓</span> Fits your situation if…
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_YES.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="reta-overview__fit-col reta-overview__fit-col--no">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">✗</span> Look elsewhere if…
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_NO.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="reta-overview__section-label">What to actually expect</div>
      <div className="reta-overview__timeline">
        {TIMELINE.map((t, i) => (
          <div key={i} className="reta-overview__timeline-item">
            <div className="reta-overview__timeline-phase">{t.phase}</div>
            <div className="reta-overview__timeline-heading">{t.heading}</div>
            <div className="reta-overview__timeline-body">{t.body}</div>
          </div>
        ))}
      </div>

      {/* ── Comparison ── */}
      <div className="reta-overview__section-label">Hexarelin vs GHRP-2 vs Ipamorelin</div>
      <div className="reta-overview__compare-note">
        All three bind the ghrelin receptor. Hexarelin has the highest peak GH potency but the fastest receptor desensitization. GHRP-2 has a similar non-selective profile but more viable extended cycles. Ipamorelin was developed to provide similar GH release with a sustainable protocol and without cortisol/prolactin burden. Hexarelin&apos;s CD36 binding is unique — no other GHRP shares it.
      </div>
      <div className="reta-overview__compare">
        {COMPARISON.map((col) => (
          <div
            key={col.name}
            className={`reta-overview__compare-col${col.highlight ? " reta-overview__compare-col--active" : ""}`}
          >
            <div className="reta-overview__compare-name">
              {col.name}
              <span
                className="reta-overview__compare-badge"
                style={{ color: col.badgeColor, background: col.badgeBg }}
              >
                {col.badge}
              </span>
            </div>
            {col.rows.map((row) => (
              <div key={row.label} className="reta-overview__compare-row">
                <div className="reta-overview__compare-row-label">{row.label}</div>
                <div className="reta-overview__compare-row-value">{row.value}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}
