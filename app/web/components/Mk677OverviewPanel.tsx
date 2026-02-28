/**
 * Mk677OverviewPanel — decision-oriented overview for MK-677 (Ibutamoren).
 * Key frame: oral, long-acting ghrelin receptor agonist — not a peptide, not injectable.
 * Sustained ~24hr GH elevation (not pulsatile) amplifies appetite, glucose, edema, and
 * carpal tunnel risk vs injectable GHRPs. The oral convenience is real; the tradeoffs are real.
 */

const STAT_CARDS = [
  {
    value: "Oral",
    label: "small molecule — not a peptide",
    sub: "MK-677 is taken as a capsule or tablet — no reconstitution, no syringes. It's a synthetic small molecule that mimics ghrelin, not a peptide compound",
    note: "The oral route makes it accessible but also means sustained systemic exposure. The same GH-axis safety gates apply — oral delivery doesn't reduce the endocrine load.",
  },
  {
    value: "~24 hr",
    label: "half-life — sustained, not pulsatile",
    sub: "the long half-life means daily dosing produces sustained GH elevation throughout the day — fundamentally different from the pulsatile pattern of injectable GHRPs like ipamorelin",
    note: "Sustained GH elevation amplifies the glucose counter-regulation effect. The 'natural GH pulse' rationale used for bedtime injectable dosing doesn't apply the same way here.",
  },
  {
    value: "Ghrelin R",
    label: "receptor — appetite and GH, both persistent",
    sub: "acts on the ghrelin receptor (GHSR1a) — the same receptor as ipamorelin, but sustained. Appetite stimulation lasts throughout the day, not just post-injection",
    note: "The persistent ghrelin receptor activation means hunger, cravings, and caloric intake pressure are present through the day — a significant practical challenge for body composition goals.",
  },
];

const FIT_YES = [
  "You have lean mass or appetite goals that align with persistent appetite stimulation — MK-677's ghrelin mechanism is an asset if you want to eat more and need help doing it",
  "You want GH-axis stimulation in an oral form and are aware the tradeoffs (appetite, glucose, fluid) are amplified vs injectable GHRPs",
  "You have no diabetes, prediabetes, or insulin resistance — sustained GH elevation from MK-677 produces more persistent insulin counter-regulation than pulsatile injectable GHRPs",
  "You have no heart failure, significant edema, or conditions that make fluid retention a clinical concern",
  "You have no active or recent cancer diagnosis — the GH/IGF-1 mitogenic concern applies to MK-677 exactly as it does to any GH secretagogue",
  "You understand 'oral GH secretagogue' does not mean 'lower risk than injectable' — the endocrine load is the same; the delivery route is different",
];

const FIT_NO = [
  "You have diabetes, prediabetes, or significant insulin resistance — sustained (not pulsatile) GH elevation from MK-677 produces more persistent glucose counter-regulation than injectable GHRPs",
  "You have heart failure, significant edema, or fluid-retention-prone conditions — sustained GH elevation and fluid retention from a 24hr compound is a real clinical concern",
  "Your primary goal is fat loss or body recomposition — persistent appetite stimulation from chronic ghrelin receptor activation actively works against caloric restriction goals",
  "You have an active cancer diagnosis or are in active treatment — IGF-1 is mitogenic; oncology clearance required before starting any GH secretagogue",
  "You're pregnant, breastfeeding, or an adolescent — endocrine axis perturbation during development is a hard stop",
  "You're expecting the convenience of oral dosing to mean fewer GH-axis considerations — it doesn't. Same flags, more sustained exposure.",
];

const TIMELINE = [
  {
    phase: "Weeks 1–4",
    heading: "Appetite surge and water retention — louder than injectable GHRPs",
    body: "Appetite stimulation from MK-677 is persistent throughout the day — not just post-injection as with ipamorelin. Many users report significant increases in hunger and cravings within the first few days. Water retention and puffiness (face, hands, feet) are common and can be more pronounced than with shorter-acting GHRPs. Vivid dreams are frequently reported, consistent with GH's effects on sleep architecture. These early effects are not signs of efficacy to chase — they're the ghrelin receptor working as expected.",
  },
  {
    phase: "Months 1–3",
    heading: "The honest evaluation window — with compounding tradeoffs",
    body: "The GH/IGF-1 body composition effects accumulate over months, not weeks. Sustainable lean mass improvement requires managing the appetite stimulation — users who don't account for caloric pressure often see fat gain alongside any lean mass changes. Glucose monitoring is especially important here: sustained (vs pulsatile) GH elevation means the insulin counter-regulatory effect is ongoing, not time-limited to the hours after injection. If you have any metabolic history, labs matter more here than with injectable GHRPs.",
  },
  {
    phase: "Long-term",
    heading: "No safety map for extended use — and the concerns compound",
    body: "MK-677 has been studied in longer clinical trials than most GH-axis compounds (including in elderly and GHD populations), but healthy adult enhancement use is unstudied. Sustained ghrelin receptor activation over months raises questions about receptor desensitization and metabolic adaptation that aren't answered in the clinical literature. The community convention of cycling applies — continuous long-term use is outside the reference experience base. Carpal tunnel symptoms, if they develop, often require dose reduction or discontinuation.",
  },
];

const COMPARISON = [
  {
    name: "MK-677",
    badge: "Oral / Small molecule",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Route", value: "Oral capsule — no reconstitution, no injections" },
      { label: "Half-life", value: "~24 hr — sustained GH elevation, not pulsatile" },
      { label: "Receptor", value: "Ghrelin receptor (GHSR1a) — same as ipamorelin but sustained" },
      { label: "Appetite effect", value: "Persistent throughout the day — more pronounced than injectable GHRPs" },
      { label: "Distinctive concerns", value: "Glucose (sustained elevation), carpal tunnel/neuropathy, heart failure/edema risk" },
    ],
    highlight: true,
  },
  {
    name: "Ipamorelin",
    badge: "Injectable GHRP",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Route", value: "Subcutaneous injection — reconstitution required" },
      { label: "Half-life", value: "~2 hr — pulsatile GH release aligned with injection timing" },
      { label: "Receptor", value: "Ghrelin receptor (GHSR1a) — same as MK-677, short-acting" },
      { label: "Appetite effect", value: "Pulsatile — most pronounced around injection time; bedtime injection manageable" },
      { label: "Distinctive concerns", value: "Sleep apnea (GH + fluid dynamics), pulsatile appetite manageable with timing" },
    ],
    highlight: false,
  },
  {
    name: "CJC-1295 (no DAC)",
    badge: "Injectable GHRH",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Route", value: "Subcutaneous injection — reconstitution required" },
      { label: "Half-life", value: "~30 min — pulsatile, typically used with ipamorelin" },
      { label: "Receptor", value: "GHRH receptor — different arm from MK-677 / ipamorelin" },
      { label: "Appetite effect", value: "Minimal — no ghrelin pathway; appetite stimulation absent" },
      { label: "Why stack with MK-677?", value: "Complementary receptors produce additive GH — same rationale as CJC+ipa" },
    ],
    highlight: false,
  },
];

export default function Mk677OverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          Oral, long-acting GH secretagogue — the convenience is real, and so are the amplified tradeoffs.
        </div>
        <div className="reta-overview__headline-sub">
          MK-677 is a ghrelin receptor agonist taken as a capsule. The 24-hour half-life means sustained GH elevation — not the physiologic pulses of injectable GHRPs. That sustained exposure amplifies appetite, glucose, fluid, and carpal tunnel concerns. The same GH-axis safety gates apply; they&apos;re not softened by oral delivery.
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
      <div className="reta-overview__section-label">MK-677 vs Ipamorelin vs CJC-1295</div>
      <div className="reta-overview__compare-note">
        MK-677 and ipamorelin share the ghrelin receptor — the key difference is half-life and route. Sustained oral exposure amplifies every ghrelin receptor effect vs a short-acting injectable. CJC-1295 hits a different receptor entirely and can be stacked with MK-677 for additive GH release.
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
