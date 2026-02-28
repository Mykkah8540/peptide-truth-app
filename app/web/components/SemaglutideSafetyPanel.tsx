/**
 * SemaglutideSafetyPanel — proactive safety intelligence for Semaglutide.
 * Key frame: well-characterized safety profile from large RCTs and years of post-market data.
 * Primary concerns: GI tolerability (manageable with titration), pancreatitis (rare, real),
 * thyroid C-cell signal (animal only, human relevance unclear), and lean mass loss.
 * Hard stops: thyroid cancer/MEN2 history, pancreatitis history, pregnancy.
 */

const SIDE_EFFECTS = [
  {
    name: "Nausea and vomiting — the primary tolerability challenge",
    detail: "Nausea ~40-44%, vomiting ~24% in Wegovy trials; most pronounced at dose escalation points",
    frequency: "Very common during titration; often improves at stable dose",
    timing: "Peaks in first few days after each dose escalation; typically reduces within 1-2 weeks",
    tier: "watch",
    note: "Nausea is the primary reason people reduce dose, pause, or discontinue. It is manageable with discipline: eat small meals, avoid high-fat and high-sugar foods, stay upright for 30-60 min after eating, and don't rush the titration schedule. The titration schedule is the nausea management protocol — dose escalation every 4 weeks exists for this reason, not patience.",
  },
  {
    name: "GI: constipation and diarrhea",
    detail: "Constipation ~24%, diarrhea ~30% across trials; often alternating",
    frequency: "Common throughout treatment, particularly early",
    timing: "Variable — can occur at any point; often improves over months",
    tier: "watch",
    note: "Gastric emptying delay is a pharmacological effect of GLP-1R activation — food moves more slowly through the GI tract. This directly causes constipation in some people and paradoxically diarrhea in others. Hydration, fiber intake, and meal patterns matter significantly. Fiber + adequate water reduces constipation; simple, low-fat meals reduce diarrhea.",
  },
  {
    name: "Pancreatitis — rare but real stop signal",
    detail: "Rare (incidence not precisely quantified vs placebo in all trials); mechanism plausible via GLP-1R pancreatic effects",
    frequency: "Rare — but a formal prescribing information contraindication after pancreatitis history",
    timing: "Can occur at any point during treatment; typically presents as severe upper abdominal pain",
    tier: "flag",
    note: "GLP-1 receptor agonists are associated with pancreatitis risk. Personal history of pancreatitis is a prescribing information contraindication. The absolute risk increase in people without pancreatitis history is low — but severe upper abdominal pain radiating to the back during semaglutide use is a stop signal requiring urgent evaluation.",
  },
  {
    name: "Lean mass loss — the under-discussed consequence",
    detail: "Observed in community experience and emerging post-market data; magnitude varies significantly with protein intake and resistance training",
    frequency: "Common when protein intake and resistance training are not maintained",
    timing: "Accumulates over months of treatment",
    tier: "watch",
    note: "Semaglutide suppresses appetite systemically — not selectively for fat. Without deliberate protein anchoring and resistance training, lean mass loss is real. Studies suggest ~25-35% of total weight lost may be lean mass without appropriate intervention. This matters for functional strength, bone density, and metabolic rate. The drug does its job; protecting what's lost alongside fat requires active management.",
  },
  {
    name: "Thyroid C-cell tumor risk — animal signal, uncertain human relevance",
    detail: "Dose-dependent thyroid C-cell adenomas and carcinomas in rodent studies; human signal not established in post-market surveillance",
    frequency: "Rodent finding; human incidence not established",
    timing: "Long-term concern; not an acute risk",
    tier: "watch",
    note: "The thyroid C-cell tumor signal in rodents drove a prescribing information black box warning. Post-market human surveillance has not replicated this signal at a population level — but thyroid cancer surveillance is ongoing, and the observation period may be insufficient to detect a rare, slow-developing cancer. Medullary thyroid carcinoma history or MEN2 syndrome remains a contraindication.",
  },
  {
    name: "Injection site reactions",
    detail: "Mild redness, bruising, itching, or small nodules at injection site; usually transient",
    frequency: "Common — particularly without proper rotation",
    timing: "Acute (minutes to hours post-injection); resolves without intervention",
    tier: "low",
    note: "Technique matters: inject into the subcutaneous fat layer (not muscle), rotate sites (abdomen, thigh, upper arm alternated), and avoid injecting repeatedly into the same exact spot. Lipohypertrophy (hard lumps from repeated injection) is avoidable with rotation and reduces absorption predictability.",
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
    title: "Protein — the most important nutritional anchor",
    body: "Semaglutide suppresses appetite effectively — which means protein intake drops by default unless you actively manage it. Target 1.2-1.6g/kg body weight daily in protein, prioritized in every meal. When you're not hungry, protein is the last thing you want. It's also the first thing that gets skipped. Lean mass loss is not a mandatory side effect — it's a manageable one with deliberate protein intake. Use tracking if needed to confirm you're hitting targets during the periods of maximal appetite suppression.",
    flags: [
      "Protein intake below 1g/kg consistently: lean mass loss becomes progressive",
      "Skipping meals entirely due to appetite suppression: protein anchor disappears",
      "Heavy reliance on liquid calories (shakes, smoothies) without protein: GI tolerance may improve but protein suffers",
    ],
  },
  {
    icon: "›",
    title: "GI management — the titration protocol is the intervention",
    body: "The 4-week titration intervals aren't a suggestion — they're the built-in nausea management protocol. Escalating faster because you 'feel fine' is how you end up needing to drop back a dose. Meal strategy during titration: small portions, low fat, low sugar, high protein content relative to meal size. Avoid eating to the point of fullness. Don't lie down immediately after eating. Ginger products (ginger tea, ginger chews) are commonly used in communities; ondansetron (Zofran) is sometimes prescribed for persistent nausea.",
    flags: [
      "Racing the titration schedule: slower escalation reduces GI burden significantly",
      "High-fat meals during titration: directly worsens nausea and GI symptoms",
      "Nausea preventing hydration: this is the threshold for medical evaluation",
      "Persistent constipation: increase water and fiber; stool softeners are reasonable",
    ],
  },
  {
    icon: "›",
    title: "Glucose monitoring — required if on insulin or sulfonylureas",
    body: "Semaglutide reduces glucose through multiple mechanisms — if you're already on insulin or a sulfonylurea (glipizide, glyburide, glimepiride), adding semaglutide can produce additive glucose-lowering that causes hypoglycemia. This is the drug interaction, not a side effect of semaglutide alone. Your prescribing physician should already be managing insulin/sulfonylurea dose reduction when starting semaglutide — if not, flag this explicitly.",
    flags: [
      "On insulin and starting semaglutide: insulin dose reduction is typically required",
      "On sulfonylureas: hypoglycemia risk increases; glucose monitoring is required",
      "Symptoms of hypoglycemia (shakiness, sweating, confusion, heart racing): fast-acting carbohydrates, check glucose, contact prescriber",
    ],
  },
  {
    icon: "›",
    title: "Resistance training — not optional for lean mass preservation",
    body: "Semaglutide creates a caloric deficit through appetite suppression, not selective fat mobilization. The body draws from both fat and lean mass during caloric restriction — the lean mass-to-fat ratio lost depends heavily on resistance training and protein availability. Three sessions of resistance training per week at adequate intensity, with sufficient protein, substantially reduces lean mass loss. Users who treat semaglutide as a passive weight loss tool without exercise typically report more muscle weakness, slower metabolism, and worse functional outcomes.",
    flags: [
      "Completely sedentary during semaglutide use: lean mass loss is significantly higher",
      "Significant strength loss over months: likely a protein and/or training issue, not a drug effect",
      "Fatigue and 'flat' workouts: often under-fueling — eating enough protein and carbohydrates around training matters",
    ],
  },
  {
    icon: "›",
    title: "Thyroid and cancer history — the screening step",
    body: "Before starting: review personal and family history for medullary thyroid carcinoma and MEN2 syndrome (multiple endocrine neoplasia type 2). These are prescribing information contraindications — not theoretical concerns. Your prescribing physician will check these, but understanding why matters. If you have a history of any thyroid cancer, the GLP-1 class requires explicit oncology discussion. The thyroid C-cell animal finding means this is the relevant history to disclose, even if your current thyroid function is normal.",
    flags: [
      "Personal or family history of medullary thyroid carcinoma: hard stop — prescribing information contraindication",
      "MEN2 syndrome (yourself or first-degree relatives): hard stop",
      "Unexplained neck lump or thyroid nodule developing during treatment: evaluation required",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Severe upper abdominal pain radiating to the back",
    action: "Stop semaglutide and seek urgent evaluation — this is the pancreatitis presentation. Do not wait.",
  },
  {
    signal: "Personal or family history of medullary thyroid carcinoma or MEN2 syndrome",
    action: "Do not start semaglutide (or any GLP-1 drug). This is a black box warning contraindication — regardless of how the prescription was issued.",
  },
  {
    signal: "Persistent vomiting preventing fluid intake",
    action: "Stop escalation, hold dose, and seek medical evaluation. Dehydration from persistent vomiting on GLP-1 drugs is a real clinical event — IV fluid replacement may be needed.",
  },
  {
    signal: "Pregnant or actively planning pregnancy",
    action: "Stop semaglutide at least 2 months before planned conception. Animal studies show fetal harm. Discuss contraception needs with your prescribing physician.",
  },
  {
    signal: "Signs of gallbladder disease: sudden severe right upper quadrant pain, nausea, jaundice",
    action: "Seek urgent evaluation. Cholelithiasis (gallstones) is a documented risk with rapid weight loss on GLP-1 drugs — semaglutide increases risk. This is an emergency if you have fever or jaundice.",
  },
  {
    signal: "Symptoms of severe allergic reaction: hives, swelling, throat tightness, difficulty breathing",
    action: "Stop immediately and call emergency services. Anaphylaxis is rare but documented.",
  },
];

export default function SemaglutideSafetyPanel() {
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
          Semaglutide is a pharmaceutical-grade drug with a formal prescribing information, FDA post-market surveillance, and years of real-world safety data. The safety profile is well-characterized. GI tolerability is the primary day-to-day management challenge — not a rare adverse event. The prescribing information contraindications (thyroid cancer/MEN2 history, pancreatitis history, pregnancy) are the hard stops to respect.
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
          Semaglutide has one of the best-characterized safety profiles of any weight loss drug — the result of large pre-approval trials and years of post-market surveillance. For the vast majority of people who meet the prescribing indications and don&apos;t have the contraindicated history (thyroid cancer/MEN2, pancreatitis history), the GI side effects are the primary practical safety challenge, not serious adverse events.
        </p>
        <p>
          The honest risk picture: GI side effects are common and manageable. Pancreatitis is rare but real — abdominal pain is the signal. The thyroid C-cell concern from animal studies has not materialized in human post-market surveillance, but monitoring is ongoing. Lean mass loss is not a drug adverse effect — it&apos;s a consequence of caloric restriction that&apos;s preventable with protein and resistance training. Respect the contraindications, manage the titration, protect your lean mass.
        </p>
      </div>

    </div>
  );
}
