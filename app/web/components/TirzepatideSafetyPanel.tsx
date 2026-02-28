/**
 * TirzepatideSafetyPanel — proactive safety intelligence for Tirzepatide.
 * Key frame: safety profile largely overlaps with semaglutide (same GLP-1 class).
 * Primary differences: generally lower nausea than semaglutide; same class contraindications
 * (thyroid C-cell/MEN2, pancreatitis, pregnancy); same lean mass management imperative.
 * Hard stops are identical to semaglutide — this is the same drug class.
 */

const SIDE_EFFECTS = [
  {
    name: "Nausea and vomiting — less common than semaglutide, still the primary tolerability challenge",
    detail: "Nausea ~17-31% (varies by dose), vomiting ~9-16% in SURMOUNT trials — lower than semaglutide's ~40-44% nausea rate",
    frequency: "Common during titration; generally less severe than semaglutide at equivalent weight loss effect",
    timing: "Peaks in first few days after each dose escalation; improves within 1-2 weeks of each escalation",
    tier: "watch",
    note: "The GIPR co-agonism in tirzepatide appears to attenuate the GLP-1R-mediated nausea — this is why tirzepatide's nausea rate is lower despite greater efficacy. The pattern is similar to semaglutide: worst at escalation points, improving at stable dose. Meal strategy and titration discipline still matter even with the better tolerability profile.",
  },
  {
    name: "GI: diarrhea and constipation",
    detail: "Diarrhea ~17%, constipation ~11% in SURMOUNT-1 — lower rates than semaglutide but same class mechanism",
    frequency: "Common, particularly during titration",
    timing: "Variable — can occur at any point",
    tier: "watch",
    note: "Gastric motility effects (slowed gastric emptying) from GLP-1R activation are present with tirzepatide — constipation and diarrhea occur via the same mechanism as semaglutide. Rates are lower but not absent. Fiber, hydration, and meal predictability are the primary management tools.",
  },
  {
    name: "Pancreatitis — rare, same class signal as semaglutide",
    detail: "Rare; same class-level mechanism concern as all GLP-1 drugs",
    frequency: "Rare — but personal history of pancreatitis is a prescribing information contraindication",
    timing: "Can occur at any point; presents as severe upper abdominal pain",
    tier: "flag",
    note: "The pancreatitis signal applies to tirzepatide as it does to semaglutide — via the same GLP-1 receptor mechanism on pancreatic tissue. Personal history of pancreatitis is a prescribing information contraindication. Severe upper abdominal pain during tirzepatide use is an urgent evaluation signal regardless of cause.",
  },
  {
    name: "Lean mass loss — the same management imperative as semaglutide",
    detail: "Occurs without active protein anchoring and resistance training; magnitude depends on protein intake and exercise",
    frequency: "Common when nutrition and training are not managed actively",
    timing: "Accumulates over months of treatment",
    tier: "watch",
    note: "The appetite suppression from tirzepatide is more powerful than semaglutide on average — which means the lean mass management challenge is more acute, not less. Greater appetite suppression means greater protein displacement risk. The same management approach applies: deliberate protein targeting (1.2-1.6g/kg), resistance training, and monitoring for strength changes over time.",
  },
  {
    name: "Thyroid C-cell tumor risk — same animal signal as semaglutide",
    detail: "GLP-1 class rodent finding; human population surveillance ongoing",
    frequency: "Human incidence not established; rodent signal present",
    timing: "Long-term theoretical concern; not an acute risk",
    tier: "watch",
    note: "The GLP-1 class thyroid C-cell signal from rodent studies applies to tirzepatide, though tirzepatide's primary published rodent data is from GIPR as well. Medullary thyroid carcinoma history or MEN2 syndrome is a prescribing information contraindication, same as semaglutide. The human significance remains under surveillance.",
  },
  {
    name: "Injection site reactions",
    detail: "Mild redness, bruising, or small nodules at injection site; usually transient",
    frequency: "Common — particularly without site rotation",
    timing: "Acute (minutes to hours post-injection); typically resolves without intervention",
    tier: "low",
    note: "Same as semaglutide: rotate injection sites (abdomen, thigh, upper arm), avoid same exact spot repeatedly, inject into subcutaneous fat layer. Technique is the primary variable.",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; labelColor: string; label: string }> = {
  low:   { bg: "rgba(21,100,58,0.06)",  border: "rgba(21,100,58,0.15)",  labelColor: "#155e38", label: "Low concern" },
  watch: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.16)",   labelColor: "#7c5200", label: "Worth watching" },
  flag:  { bg: "rgba(158,56,0,0.07)",   border: "rgba(158,56,0,0.18)",   labelColor: "#9e3800", label: "Stop signal" },
};

const PLAYBOOK = [
  {
    icon: "›",
    title: "Protein — more critical with tirzepatide than semaglutide",
    body: "Tirzepatide's greater appetite suppression means the protein displacement risk is higher than with semaglutide. When appetite is substantially suppressed, protein is the first macronutrient to disappear — it requires active prioritization. Target 1.2-1.6g/kg body weight in protein daily. Protein-first meal structure (eat protein before anything else in a meal) is a practical tool. Many users find tracking protein intake necessary during the first 3-6 months when appetite suppression is most intense.",
    flags: [
      "Consistent protein intake below 1g/kg: progressive lean mass loss",
      "Meal skipping due to absent appetite: protein anchor disappears entirely",
      "Significant strength decline over months: likely protein and/or training deficit, not the drug",
    ],
  },
  {
    icon: "›",
    title: "GI management — the titration protocol still matters despite better tolerability",
    body: "The lower nausea profile of tirzepatide doesn't make the titration schedule optional — it means fewer people hit the wall that semaglutide users encounter, not that escalation is risk-free. The 4-week escalation intervals are the right pace. Meal strategy: small portions, low-fat, low-sugar foods during dose escalations. The first few days after each escalation are when nausea peaks. Many people who 'felt fine' at one dose and accelerated the schedule regret it at the next dose.",
    flags: [
      "Accelerating titration because nausea isn't severe: slower escalation still protects you at higher doses",
      "High-fat or high-sugar meals at dose escalation: GI symptoms worsen directly",
      "Persistent nausea preventing food or fluid intake: dose hold or reduction and medical guidance",
    ],
  },
  {
    icon: "›",
    title: "Glucose monitoring — mandatory if on insulin or sulfonylureas",
    body: "Same as semaglutide: tirzepatide is a potent glucose-lowering agent. If you're on insulin (any type) or sulfonylureas, adding tirzepatide creates additive glucose-lowering that can cause hypoglycemia. Your prescribing physician typically reduces the insulin/sulfonylurea dose when starting tirzepatide. If this hasn't happened and you're on these medications, flag it explicitly. In T2D patients starting Mounjaro, glucose monitoring in the first 4-6 weeks is important.",
    flags: [
      "On insulin and starting tirzepatide: dose reduction is typically required — coordinate with prescriber",
      "On sulfonylureas: hypoglycemia risk; glucose monitoring is required",
      "Hypoglycemia symptoms (shakiness, sweating, confusion, palpitations): fast-acting carbohydrates, check glucose, contact prescriber",
    ],
  },
  {
    icon: "›",
    title: "Resistance training — non-optional for lean mass preservation",
    body: "The degree of appetite suppression with tirzepatide makes lean mass management a more active responsibility than with semaglutide. The caloric deficit is larger; the muscle preservation window requires more intentional training. Three resistance training sessions per week at sufficient intensity, combined with adequate protein, is the standard approach. Users who rely solely on the drug for body composition improvement without training consistently report more functional muscle loss and worse long-term outcomes.",
    flags: [
      "No resistance training during treatment: lean mass loss is substantially higher",
      "Severe caloric restriction (feeling full on very little): check protein per day, not just overall calories",
      "Declining functional strength over months: a management signal, not a drug effect",
    ],
  },
  {
    icon: "›",
    title: "Thyroid and cancer history — same screening requirement as semaglutide",
    body: "Same class, same contraindications. Screen for personal and family history of medullary thyroid carcinoma and MEN2 syndrome before starting. These are prescribing information contraindications — they exist for the entire GLP-1 class, and tirzepatide is included. Your prescribing physician checks these, but knowing why matters. Any unexplained neck mass or thyroid nodule developing during treatment warrants evaluation before continuing.",
    flags: [
      "Personal or family history of medullary thyroid carcinoma: hard stop — contraindicated",
      "MEN2 syndrome: hard stop",
      "New neck lump or thyroid nodule: evaluation required before continuing",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Severe upper abdominal pain, especially radiating to the back",
    action: "Stop tirzepatide and seek urgent evaluation — pancreatitis presentation. Do not wait for the next clinic appointment.",
  },
  {
    signal: "Personal or family history of medullary thyroid carcinoma or MEN2 syndrome",
    action: "Do not start tirzepatide (or any GLP-1 drug). Prescribing information black box warning contraindication.",
  },
  {
    signal: "Persistent vomiting preventing fluid or food intake",
    action: "Stop escalation, hold at current or lower dose, and seek medical evaluation. Dehydration from GI intolerance requires assessment.",
  },
  {
    signal: "Pregnant or actively planning pregnancy",
    action: "Stop tirzepatide. Animal studies show fetal harm. Coordinate with your prescribing physician — most guidance recommends stopping prior to conception planning.",
  },
  {
    signal: "Sudden severe right upper quadrant pain (possible gallbladder disease)",
    action: "Seek urgent evaluation. Gallstone risk increases with rapid weight loss on GLP-1 drugs. Fever or jaundice with abdominal pain requires emergency evaluation.",
  },
  {
    signal: "Symptoms of severe hypoglycemia while on insulin or sulfonylureas (confusion, loss of consciousness)",
    action: "If conscious: fast-acting carbohydrates immediately. If unconscious: call emergency services. This is a drug interaction, not a standalone tirzepatide adverse effect — the insulin/sulfonylurea dose needs adjustment.",
  },
];

export default function TirzepatideSafetyPanel() {
  return (
    <div className="reta-safety">

      {/* ── Section: What actually happens ── */}
      <div>
        <div className="reta-safety__section-label">What actually happens — and the real risk hierarchy</div>
        <div className="reta-safety__effects">
          {SIDE_EFFECTS.map((se) => {
            const st = TIER_STYLE[se.tier];
            return (
              <div
                key={se.name}
                className="reta-safety__effect"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <div className="reta-safety__effect-top">
                  <div className="reta-safety__effect-name">{se.name}</div>
                  <span
                    className="reta-safety__effect-badge"
                    style={{ color: st.labelColor, borderColor: st.border }}
                  >
                    {st.label}
                  </span>
                </div>
                <div className="reta-safety__effect-detail">{se.detail}</div>
                <div className="reta-safety__effect-timing">{se.timing}</div>
                <div className="reta-safety__effect-note">{se.note}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Section: Mitigation playbook ── */}
      <div>
        <div className="reta-safety__section-label">The mitigation playbook</div>
        <div className="reta-safety__intro">
          Tirzepatide&apos;s safety profile is well-characterized from large SURMOUNT and SURPASS trials and growing post-market experience. The primary improvement vs semaglutide: meaningfully lower nausea rates, likely from the GIP component attenuating GLP-1-mediated emesis. The contraindications are identical to semaglutide (thyroid cancer/MEN2, pancreatitis, pregnancy). The lean mass management responsibility is greater given the more powerful appetite suppression.
        </div>
        <div className="reta-safety__playbook">
          {PLAYBOOK.map((item) => (
            <div key={item.title} className="reta-safety__play">
              <div className="reta-safety__play-header">
                <span className="reta-safety__play-icon" aria-hidden="true">{item.icon}</span>
                <span className="reta-safety__play-title">{item.title}</span>
              </div>
              <div className="reta-safety__play-body">{item.body}</div>
              <ul className="reta-safety__play-flags">
                {item.flags.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section: Red lines ── */}
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

      {/* ── Risk in proportion ── */}
      <div className="reta-safety__proportion">
        <div className="reta-safety__proportion-heading">Risk in proportion</div>
        <p>
          Tirzepatide&apos;s safety profile is strong and well-characterized from large trials. The primary practical advantage over semaglutide is better GI tolerability — more weight loss with fewer people struggling through the titration phase. The contraindications are class-wide: thyroid cancer/MEN2 history, pancreatitis history, and pregnancy are hard stops regardless of which GLP-1 drug is prescribed.
        </p>
        <p>
          The lean mass risk is proportionally more important with tirzepatide than semaglutide — greater appetite suppression means more protein displacement without active management. This is the most under-discussed practical safety consideration. Manage protein, train, and respect the titration schedule. The drug handles the appetite; the user handles what&apos;s protected.
        </p>
      </div>

    </div>
  );
}
