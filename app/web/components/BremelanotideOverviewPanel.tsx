/**
 * BremelanotideOverviewPanel — decision-oriented overview for Bremelanotide.
 * Key frame: FDA-approved melanocortin agonist (Vyleesi) for HSDD in premenopausal women.
 * PT-141 is the research name. Off-label use in men is common but less studied.
 * Mechanism is CNS-based desire signaling — not hormonal, not blood flow.
 * Nausea is the primary clinical management challenge (40% in trials).
 * Cardiovascular caution is real — BP elevation documented.
 */

const STAT_CARDS = [
  {
    value: "CNS desire pathway",
    label: "melanocortin receptor mechanism — not hormonal, not blood flow",
    sub: "bremelanotide acts on melanocortin receptors (MC3R, MC4R) in the brain to modulate sexual desire signaling — this is a CNS mechanism, not a hormonal mechanism and not a blood flow mechanism like PDE5 inhibitors",
    note: "This distinction matters for understanding who it helps and how. It doesn't work by raising testosterone or improving blood flow — it acts on brain circuits involved in desire and motivation. That's why it targets desire specifically rather than erectile function per se.",
  },
  {
    value: "~40% nausea rate",
    label: "in clinical trials — the primary management challenge",
    sub: "nausea is the most common adverse event from bremelanotide Phase III trials — occurring in roughly 40% of patients; flushing and headache are also documented; taking it without a management plan leads to poor tolerability",
    note: "Nausea is the defining clinical challenge. In the trials, it was most common in the first hours after injection and typically resolved within 12 hours. Having a plan for managing it (timing, antiemetics) is the difference between tolerable use and stopping.",
  },
  {
    value: "Prescription (Vyleesi)",
    label: "FDA-approved for HSDD — off-label use in men is common",
    sub: "bremelanotide (Vyleesi) carries FDA approval for HSDD in premenopausal women; off-label use in men is prevalent in community contexts with the same mechanism but less clinical trial support for that population",
    note: "Approval is for a specific population and indication. Off-label use in men extrapolates the mechanism — which is plausible but less rigorously studied in that context.",
  },
];

const FIT_YES = [
  "Your goal is increased sexual desire and motivation — bremelanotide acts on brain desire pathways specifically, not hormonal or blood flow mechanisms",
  "You've discussed it with a physician and have a prescription or informed approach to the off-label context",
  "You have normal cardiovascular function — no uncontrolled hypertension, no significant cardiac history",
  "You have a management plan for nausea — the most common and disruptive side effect",
  "You're seeking improvement in desire/motivation specifically — not primarily improved blood flow or performance",
  "You have no history of significant hyperpigmentation concerns — repeated use can cause focal darkening",
];

const FIT_NO = [
  "You have uncontrolled hypertension or significant cardiovascular disease — bremelanotide causes transient BP elevation and is contraindicated in these contexts per prescribing information",
  "You're looking for an erectile function drug — bremelanotide targets desire pathways, not blood flow; PDE5 inhibitors (sildenafil, tadalafil) address a different mechanism",
  "You're postmenopausal — the approved indication is specifically premenopausal women; postmenopausal HSDD has different hormonal context and is not the studied population",
  "You have high cardiovascular risk — the prescribing information flags major adverse cardiac events as a risk requiring evaluation before use",
  "You're pregnant or breastfeeding — no safety data; not for use",
  "You're an adolescent — hard stop",
];

const TIMELINE = [
  {
    phase: "45 minutes before",
    heading: "Injection timing is the primary practical parameter",
    body: "Bremelanotide is injected subcutaneously approximately 45 minutes before anticipated sexual activity. It's an on-demand compound — not taken daily like antidepressants. The nausea onset follows within the first hour. In the Phase III trials, the on-demand structure was used as-needed, not more than once per 24 hours. Getting the timing right (45 min pre-activity, nausea management in place) is the practical management skill.",
  },
  {
    phase: "Hours 1–12",
    heading: "Nausea window — the primary tolerability challenge",
    body: "Nausea typically peaks in the first few hours after injection and resolves within 12 hours. This is the make-or-break tolerability factor. In trials, many participants who discontinued early did so due to nausea. Pre-treatment with antiemetics (ondansetron or similar) reduced the nausea burden in practice, though this was not a formal trial protocol. Flushing and headache may also occur in this window.",
  },
  {
    phase: "Long-term (repeated use)",
    heading: "Hyperpigmentation — the slow-accumulating concern",
    body: "Focal hyperpigmentation (darkening of the face, gums, or breasts) develops with repeated bremelanotide use. This is a direct melanocortin receptor effect — the same receptor system that controls skin pigmentation. It was documented in the Phase III trials as a long-term adverse event. The hyperpigmentation is not immediately reversible. People with darker skin tones may have higher baseline risk of noticeable change.",
  },
];

const COMPARISON = [
  {
    name: "Bremelanotide",
    badge: "FDA-approved (Vyleesi)",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Mechanism", value: "Melanocortin receptor (MC3R/MC4R) — CNS desire pathway" },
      { label: "Indication", value: "HSDD in premenopausal women (approved); off-label in men" },
      { label: "Route / timing", value: "SC injection 45 min before activity — on-demand" },
      { label: "Primary SE", value: "Nausea (~40%), flushing, headache, hyperpigmentation (repeated use)" },
      { label: "Cardiovascular", value: "Transient BP elevation — contraindicated in uncontrolled hypertension" },
    ],
    highlight: true,
  },
  {
    name: "Flibanserin (Addyi)",
    badge: "FDA-approved (HSDD)",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Serotonin/dopamine modulator — different CNS pathway than bremelanotide" },
      { label: "Indication", value: "HSDD in premenopausal women — same indication, different drug class" },
      { label: "Route / timing", value: "Daily oral pill — not on-demand; requires daily use" },
      { label: "Primary SE", value: "Dizziness, somnolence — major alcohol interaction warning (contraindicated)" },
      { label: "Cardiovascular", value: "No direct BP concern; alcohol interaction is the primary safety constraint" },
    ],
    highlight: false,
  },
  {
    name: "PDE5 inhibitors (sildenafil, tadalafil)",
    badge: "Different mechanism",
    badgeColor: "#555",
    badgeBg: "rgba(0,0,0,0.06)",
    rows: [
      { label: "Mechanism", value: "PDE5 inhibition — blood flow / vasodilation; not desire pathway" },
      { label: "Indication", value: "Erectile dysfunction — approved in men; no HSDD indication" },
      { label: "Route / timing", value: "Oral — on-demand or daily (tadalafil)" },
      { label: "Primary SE", value: "Flushing, headache, vision changes; hypotension with nitrates" },
      { label: "vs bremelanotide", value: "Different problem targeted — blood flow vs CNS desire; not interchangeable" },
    ],
    highlight: false,
  },
];

export default function BremelanotideOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          A drug that targets sexual desire in the brain — not hormones, not blood flow. Nausea is the main management challenge.
        </div>
        <div className="reta-overview__headline-sub">
          Bremelanotide (PT-141 / Vyleesi) is an injectable that works by acting on brain pathways that control sexual desire — not by raising hormones or improving blood flow. That makes it a genuinely different category from testosterone or drugs like Viagra. It carries FDA approval for low sexual desire in women and is widely used off-label in men for the same reason. The main challenge is nausea, which affects roughly 40% of users. Blood pressure also rises with each dose — a real consideration if your cardiovascular health is a factor.
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
      <div className="reta-overview__section-label">Bremelanotide vs Flibanserin vs PDE5 inhibitors</div>
      <div className="reta-overview__compare-note">
        These are three different approaches to three different problems. Bremelanotide and flibanserin both target HSDD (desire) via CNS mechanisms — different pathways, different administration structure. PDE5 inhibitors target blood flow in a completely different mechanism. The key question is whether the problem is desire, blood flow, or hormonal — they don&apos;t substitute for each other.
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
