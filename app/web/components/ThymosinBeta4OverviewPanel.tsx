/**
 * ThymosinBeta4OverviewPanel — decision-oriented overview for Thymosin Beta-4 (TB4).
 * Key frame: TB4 is the full 43-amino acid protein; TB-500 is the synthetic active
 * fragment (Ac-SDKP, residues 17-23). The research is largely on TB4; community
 * use is largely TB-500. Cardiac repair has the most advanced human data.
 * Angiogenesis concern (cancer vasculature) applies to the full protein and fragment.
 */

const STAT_CARDS = [
  {
    value: "Actin sequestration",
    label: "primary mechanism — sequesters G-actin, modulates cytoskeletal dynamics and cell migration",
    sub: "Thymosin Beta-4 (Tβ4) is a 43-amino acid protein that binds G-actin (monomeric, unpolymerized actin), preventing it from forming F-actin filaments. This actin sequestration role affects cell migration, wound healing, and inflammatory signaling. The Ac-SDKP tetrapeptide fragment (residues 17-23, the basis of TB-500) retains a significant portion of this activity.",
    note: "The actin sequestration mechanism has downstream effects on cell motility and migration — which is why TB4 promotes wound healing (cells migrate to repair tissue) and also has the theoretical cancer vasculature concern (the same migration is needed for tumor angiogenesis). The mechanism does not selectively promote beneficial migration over pathological migration.",
  },
  {
    value: "TB4 vs TB-500",
    label: "the critical distinction — full protein vs. synthetic fragment; most community use is TB-500",
    sub: "TB4 is the full 43-amino acid naturally occurring protein. TB-500 is a synthetic peptide corresponding to residues 17-23 (the Ac-SDKP fragment), which is the portion of TB4 believed to be responsible for its wound-healing and anti-inflammatory effects. The research literature is predominantly on TB4; community use is predominantly TB-500. These are not interchangeable — different size, different formulation concerns, overlapping but not identical pharmacology.",
    note: "When reading TB4 research and applying it to TB-500 use, there is a translation gap: the studies were conducted on the full protein; the community uses the fragment. The fragment's bioavailability profile and safety data are not derived from the same trials as the full protein. This extrapolation is reasonable but not validated.",
  },
  {
    value: "Cardiac trials",
    label: "most advanced human evidence — ischemic cardiac repair (REVERT trial, RegenAGE program)",
    sub: "The most rigorous human evidence for TB4 is in the context of cardiac injury — specifically promoting myocardial repair after ischemic damage. The REVERT Phase 2 trial (terminated early due to enrollment challenges, not safety signals) and the subsequent RegenAGE program represent the most advanced clinical development. This evidence is not applicable to the musculoskeletal injury-healing context that dominates community use.",
    note: "The cardiac evidence is important but it does not validate the injury-healing community use case. The cardiac application involves clinical-grade TB4 administered under medical supervision to patients with documented ischemic heart disease. The community use extrapolation to musculoskeletal tendon/ligament repair is mechanistically plausible but separately unvalidated in human trials.",
  },
  {
    value: "Research-grade",
    label: "regulatory status — no FDA approval; cardiac indication in clinical development only",
    sub: "TB4 has no FDA approval for any indication. TB-500 (the synthetic fragment) has no regulatory status as a pharmaceutical. Both are available through research peptide suppliers with highly variable quality. The cardiac development program uses pharmaceutical-grade recombinant TB4 — not research-grade peptide.",
    note: "Source quality is particularly important for the full TB4 protein given its larger size — protein stability, correct folding, and absence of degradation products are quality concerns that are harder to verify with research-grade suppliers than with smaller synthetic peptides.",
  },
];

const FIT_YES = [
  "You are evaluating TB-500 (the synthetic fragment) and want to understand the full protein context — TB4 research informs the mechanism but doesn't directly validate TB-500 dosing",
  "You have musculoskeletal injury recovery goals, have already evaluated BPC-157 (different mechanism — angiogenesis/GI protection vs. actin sequestration), and are comparing recovery tools",
  "You have no cancer history — the angiogenesis and cell migration promotion concern is the same dual-edge that applies to TB-500",
  "You have verified source quality with a CoA — full protein formulations are more sensitive to stability issues than small synthetic peptides",
];

const FIT_NO = [
  "You have any personal or family history of cancer — the angiogenesis promotion mechanism applies to both TB4 and TB-500; cancer history is a hard stop for both",
  "You expect the cardiac repair evidence to apply to your injury healing goals — the cardiac trials used clinical-grade TB4 in heart disease patients, not research-grade peptide in athletes",
  "You are pregnant — no safety data; the cell migration and angiogenic activity in a pregnancy context is unknown",
  "You expect TB4 to work faster than TB-500 — the fragment retains the key active portion; full-protein vs. fragment is not primarily a potency question for typical community use goals",
  "You are using this to avoid physician evaluation of a serious injury — TB4/TB-500 do not substitute for structural injury assessment; tendon tears, fractures, and joint damage require diagnostic evaluation",
];

const TIMELINE = [
  {
    phase: "Weeks 1–4",
    heading: "Anti-inflammatory and acute repair signals — the most plausible early window",
    body: "TB4's anti-inflammatory activity (reducing NF-κB signaling, modulating macrophage activity) and promotion of cell migration to injury sites are the proposed acute mechanisms. Community users report reduced inflammation and injury site pain in weeks 1-4. This is consistent with the mechanism but not clinically validated in musculoskeletal contexts. Acute tissue repair biology operates on this timescale in animal models.",
  },
  {
    phase: "Weeks to months",
    heading: "Structural tissue repair — the longer-horizon claim",
    body: "Tendon, ligament, and muscle repair operates on weeks-to-months timescales regardless of the intervention. TB4's promotion of angiogenesis (new blood vessel formation supporting tissue repair) and cell migration contributes to the repair process on this scale. Whether TB4/TB-500 meaningfully accelerates this process compared to standard rehabilitation is not established by human clinical trials in musculoskeletal contexts.",
  },
  {
    phase: "Long-term",
    heading: "The evidence gap — no long-term musculoskeletal outcome data",
    body: "The cardiac repair evidence has the longest follow-up in the TB4 literature. Musculoskeletal outcomes in community use are largely anecdotal. Long-term use of a compound that promotes angiogenesis and cell migration carries the uncharacterized risk of contributing to existing microscopic cancer growth — the same unknown that exists for BPC-157 in the injury-healing space.",
  },
];

const COMPARISON = [
  {
    name: "Thymosin Beta-4",
    badge: "Full protein / Research-grade",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Actin sequestration (G-actin binding), anti-inflammatory, angiogenesis, cell migration" },
      { label: "Evidence", value: "Phase 2 cardiac trials (most advanced); animal wound healing; community musculoskeletal (extrapolated)" },
      { label: "Fragment", value: "TB-500 (Ac-SDKP, residues 17-23) is the community-used synthetic version" },
      { label: "Cancer concern", value: "Angiogenesis promotion applies — cancer history is a hard stop" },
      { label: "Status", value: "Research-grade; cardiac clinical development ongoing (RegenAGE)" },
    ],
    highlight: true,
  },
  {
    name: "TB-500",
    badge: "Synthetic fragment / Research-grade",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Ac-SDKP fragment of TB4 — retains actin-sequestration and anti-inflammatory activity" },
      { label: "Evidence", value: "Animal models; anecdotal community evidence; no independent human clinical trials" },
      { label: "Fragment", value: "Is the fragment — designed as a more stable, smaller synthetic alternative to TB4" },
      { label: "Cancer concern", value: "Same as TB4 — angiogenesis promotion concern; cancer history hard stop" },
      { label: "Status", value: "Research-grade; no clinical development pathway as standalone compound" },
    ],
    highlight: false,
  },
  {
    name: "BPC-157",
    badge: "Synthetic peptide / Research-grade",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Angiogenesis (VEGFR2/NO pathway), GI protection, nitric oxide modulation" },
      { label: "Evidence", value: "Strong animal evidence; no published human RCTs; most animal-to-human evidence gap" },
      { label: "Fragment", value: "Synthetic pentadecapeptide fragment of stomach body protection factor — not related to thymosin" },
      { label: "Cancer concern", value: "Angiogenesis promotion concern — same class of theoretical risk" },
      { label: "Status", value: "Research-grade; FDA Phase 2 approved for human trials (PL-10)" },
    ],
    highlight: false,
  },
];

export default function ThymosinBeta4OverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The full protein behind TB-500 — with cardiac repair evidence, an angiogenesis concern, and a community use case that outpaces the clinical data.
        </div>
        <div className="reta-overview__headline-sub">
          Thymosin Beta-4 (Tβ4) is a naturally occurring 43-amino acid protein that sequesters G-actin, modulates cell migration, reduces inflammation, and promotes angiogenesis. TB-500 — the synthetic fragment corresponding to residues 17-23 — is what most community users actually inject. The most rigorous human evidence is in cardiac ischemia repair (REVERT Phase 2, RegenAGE program), not the musculoskeletal injury-healing context that drives community use. The angiogenesis mechanism applies to both the full protein and the fragment: it promotes beneficial tissue repair vasculature and theoretically promotes cancer vasculature through the same pathway. Cancer history is a hard stop.
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
      <div className="reta-overview__section-label">Thymosin Beta-4 vs TB-500 vs BPC-157</div>
      <div className="reta-overview__compare-note">
        TB4 and TB-500 share the actin sequestration mechanism; BPC-157 works via angiogenesis/VEGFR2 — different mechanism, similar healing community use case. All three carry the angiogenesis/cancer vasculature concern.
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
