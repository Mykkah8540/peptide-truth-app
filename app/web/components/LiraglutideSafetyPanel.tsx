/**
 * LiraglutideSafetyPanel — proactive safety for Liraglutide.
 * Key frame: well-characterized class profile — same contraindications as semaglutide
 * and tirzepatide (thyroid/MEN2, pancreatitis, pregnancy). Lean mass management
 * is the most modifiable ongoing risk.
 */

const SIDE_EFFECTS = [
  {
    name: "Nausea, vomiting, and GI effects — the titration-phase challenge",
    detail: "Nausea (40-50% during titration), vomiting, diarrhea, constipation — most intense during dose escalation; typically improves once dose stabilizes",
    frequency: "Very common during titration; significantly less common at stable dose",
    timing: "Most intense in first 4-6 weeks; usually resolves or substantially improves with dose stabilization",
    tier: "watch",
    note: "The titration schedule (starting at 0.6mg, escalating weekly toward target dose) is specifically designed to manage GI side effects. If nausea is severe, the right response is to hold the current dose for an additional week rather than pushing through or stopping. Most people who discontinue for GI reasons do so in the first 4-6 weeks; most who pass that window tolerate the drug well.",
  },
  {
    name: "Pancreatitis — class-wide concern, hard stop if history present",
    detail: "Cases of acute pancreatitis reported with liraglutide and GLP-1 class agents; severe abdominal pain is the key symptom",
    frequency: "Uncommon — but class-wide precaution; pancreatitis history is a prescribing information precaution",
    timing: "Can occur at any point during use",
    tier: "flag",
    note: "The pancreatitis signal across GLP-1 agonists has been debated in the literature — GLP-1R is expressed in the pancreas and mechanistic plausibility exists, but causality vs coincidence is not fully resolved. Pancreatitis history is the practical stop signal — existing pancreatic disease adds real risk that doesn't need causal certainty to warrant avoiding the compound. Severe, persistent abdominal pain during liraglutide use is 'stop and evaluate' — not 'wait and see.'",
  },
  {
    name: "Lean mass loss — the appetite suppression side effect that requires active management",
    detail: "GLP-1-mediated appetite suppression reduces total caloric intake; without protein anchoring and resistance training, lean mass is lost alongside fat",
    frequency: "Common — the magnitude depends on protein intake and exercise habits during treatment",
    timing: "Accumulates over the treatment period, particularly in the high weight-loss phase",
    tier: "watch",
    note: "GLP-1 drugs suppress appetite broadly — they don't selectively reduce fat intake. If protein intake drops because all food seems less appealing, lean mass loss follows. The mitigation is straightforward: maintain 1.2-1.6g protein/kg body weight even when appetite is suppressed, and keep resistance training in the protocol. These aren't optional — they're how you make the weight loss quality-favorable toward fat rather than muscle.",
  },
  {
    name: "Thyroid C-cell concern — boxed warning, pre-existing history is a hard stop",
    detail: "Rodent data showed thyroid C-cell tumors (medullary thyroid carcinoma) at high exposures — led to class-wide boxed warning; human MTC incidence data is reassuring but not conclusive long-term",
    frequency: "Theoretical at clinical doses in humans; boxed warning exists because the mechanistic concern is real",
    timing: "Long-term cumulative concern",
    tier: "flag",
    note: "The MTC boxed warning is not a documentation formality — it reflects a real mechanistic concern (GLP-1R expression on thyroid C-cells) with rodent carcinogenicity data. Personal or family history of MTC or MEN2 is an absolute contraindication. For people without thyroid cancer history, the human data is not alarming at clinical doses, but monitoring for thyroid symptoms (neck mass, dysphagia, hoarseness) is appropriate for long-term users.",
  },
  {
    name: "Constipation and bowel changes",
    detail: "Slowed gastric motility contributes to constipation; some users experience alternating constipation and diarrhea",
    frequency: "Common, particularly in the first months",
    timing: "Can persist through treatment; often manageable with hydration and fiber",
    tier: "low",
    note: "Slowed gastric emptying is part of the mechanism — it contributes to both satiety and constipation. Adequate hydration and dietary fiber are the primary management tools. If constipation is severe or not responding, osmotic laxatives are an option; discuss with prescribing physician for persistent cases.",
  },
  {
    name: "Injection site reactions",
    detail: "Redness, itching, or bruising at injection site",
    frequency: "Common; reduces with technique and site rotation",
    timing: "Acute post-injection",
    tier: "low",
    note: "Standard injectable medication technique: rotate injection sites (abdomen, thigh, upper arm), use proper SC technique at appropriate angle. Persistent reactions at one site — switch to a different area. Liraglutide pens are prefilled with standard needle size for most users.",
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
    title: "Protein and lean mass management — the modifiable ongoing risk",
    body: "During liraglutide treatment, total appetite decreases — which often means protein intake decreases proportionally with everything else. The result: lean mass loss alongside fat loss. The mitigation requires deliberate effort: target 1.2-1.6g protein per kg of body weight daily even when you're not hungry, use protein supplements to hit targets when whole food feels unappealing, and maintain resistance training at least 2-3x per week. These behaviors determine whether the weight loss is fat-preferential or muscle-depleting.",
    flags: [
      "Rapid strength decline or pronounced weakness: a signal of under-fueling or lean mass loss — evaluate protein intake and training continuity",
      "Can't hit protein targets with whole food: protein supplementation (whey, casein, plant protein) is a practical solution, not a compromise",
      "Sedentary during treatment: lean mass loss is significantly higher without resistance training; this is the most impactful behavior to maintain",
    ],
  },
  {
    icon: "›",
    title: "GI symptom management — the titration protocol exists for a reason",
    body: "The weekly dose escalation schedule (0.6 → 1.2 → 1.8 → 2.4 → 3.0mg) is specifically designed to allow GI adaptation. The biggest mistake is rushing the titration when GI symptoms are significant. Holding at the current dose for an additional 1-2 weeks is appropriate and often enough for symptoms to resolve. Eating smaller, lower-fat meals and avoiding spicy or heavy foods during the titration phase improves tolerance. Staying hydrated matters — nausea often compounds dehydration.",
    flags: [
      "Vomiting that prevents keeping fluids down: stop liraglutide temporarily and seek evaluation — dehydration is a real risk",
      "Severe abdominal pain: stop and seek evaluation — this is a pancreatitis stop signal, not a GI tolerance issue",
      "Nausea not improving after 2+ weeks at a stable dose: discuss dose reduction with prescribing physician — some people do better at lower doses",
    ],
  },
  {
    icon: "›",
    title: "Pre-treatment screening — the hard stops to check first",
    body: "Before starting liraglutide: personal and family history of medullary thyroid carcinoma or MEN2 (absolute contraindication), personal history of pancreatitis or acute pancreatic disease (precaution — discuss with physician), baseline fasting glucose and HbA1c (diabetes management context), and pregnancy exclusion (category X).",
    flags: [
      "Any personal history of medullary thyroid carcinoma or MEN2: do not start — absolute contraindication in prescribing information",
      "Pancreatitis history: discuss explicitly with prescribing physician before starting; this is not a self-management decision",
      "Pregnant or planning pregnancy: liraglutide is contraindicated in pregnancy; ensure effective contraception is in place",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Severe, persistent abdominal pain — especially with nausea and vomiting",
    action: "Stop liraglutide and seek urgent medical evaluation. Pancreatitis presents this way — distinguishing from GI side effects requires clinical assessment. Do not assume it is normal GI intolerance.",
  },
  {
    signal: "Personal or family history of medullary thyroid cancer (MTC) or MEN2",
    action: "Do not start liraglutide. Absolute contraindication from prescribing information — not a clinical nuance to discuss after starting.",
  },
  {
    signal: "Pregnant or any possibility of pregnancy",
    action: "Stop immediately. GLP-1 agonists are teratogenic in animal studies; liraglutide is contraindicated in pregnancy. Effective contraception is required during treatment.",
  },
  {
    signal: "Neck mass, dysphagia, hoarseness developing during treatment",
    action: "Stop and get thyroid evaluation. These are thyroid cancer warning signs. The MTC boxed warning exists because GLP-1R is expressed on thyroid C-cells.",
  },
  {
    signal: "Signs of severe dehydration (lightheadedness, inability to keep fluids down)",
    action: "Stop liraglutide temporarily and seek urgent care. Persistent vomiting causing dehydration is a medical situation — not a titration inconvenience.",
  },
];

export default function LiraglutideSafetyPanel() {
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
          Liraglutide&apos;s safety profile is among the most characterized of any GLP-1 agent — the clinical history is real. The manageable risks are GI tolerance (manageable with titration protocol) and lean mass loss (manageable with protein and training). The hard stops are thyroid/MEN2 history, pancreatitis history, and pregnancy — these belong in the pre-treatment screening, not discovered after starting.
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
          Liraglutide&apos;s safety profile is well-characterized for a pharmaceutical drug — the clinical data spans over 15 years and millions of patient exposures. The thyroid C-cell boxed warning exists because the concern is real, but the human clinical data at standard doses has not shown a significant MTC signal. The pancreatitis concern is class-wide and real at low absolute rates.
        </p>
        <p>
          The most practical ongoing risk for most patients is lean mass loss — not a dramatic safety event, but a clinically meaningful one that compounds over the treatment period without protein and training attention. The GI side effects during titration are the most common reason people stop early; slowing the titration resolves this in most cases.
        </p>
        <p>
          For most people who are appropriate candidates, the risks are manageable and the benefit/risk calculation has been made by an FDA review process. The comparison to semaglutide and tirzepatide is primarily about efficacy, not safety — the class-wide safety profile is substantially similar.
        </p>
      </div>

    </div>
  );
}
