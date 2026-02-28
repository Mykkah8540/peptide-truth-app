/**
 * CagrilintideSafetyPanel — safety intelligence for Cagrilintide.
 * Key frame: GI tolerability is the primary issue (gastric slowing mechanism);
 * class contraindications apply (thyroid/MEN2); no long-term safety data.
 * The combination with semaglutide amplifies GI effects from both mechanisms.
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
    id: "nausea-gi",
    name: "Nausea, vomiting, and GI effects",
    tier: "watch",
    prevalence: "Common during initiation — dose-dependent",
    mechanism: "Amylin receptor agonism slows gastric emptying and signals satiety through the area postrema (a brainstem nausea center). Combined with semaglutide's GLP-1 gastric slowing, the CagriSema combination amplifies GI effects relative to either alone.",
    management: [
      "Titrate dose slowly — starting at full dose without titration substantially increases GI side effects",
      "Eat smaller, low-fat meals during initiation; avoid large volumes that stress a gastroparetic-like stomach",
      "GI effects typically improve with time as the body adapts; persistence beyond 8 weeks warrants dose reduction",
      "In the CagriSema combination: if already on semaglutide, adding cagrilintide adds a second gastric-slowing mechanism — anticipate amplified initiation effects",
    ],
  },
  {
    id: "thyroid-men2",
    name: "Thyroid C-cell concerns and MEN2 — class contraindication",
    tier: "flag",
    prevalence: "Contraindication — stop signal regardless of prevalence",
    mechanism: "The calcitonin receptor (CALCR) component of the amylin receptor complex is related to the calcitonin receptor that is implicated in the thyroid C-cell carcinoma concern for the GLP-1/GIP class. The amylin analog class carries a related structural concern. MEN2 (multiple endocrine neoplasia type 2) and thyroid C-cell carcinoma history are contraindications for amylin analog therapy.",
    management: [
      "Personal or family history of medullary thyroid carcinoma (MTC) or MEN2: do not use cagrilintide — this is a class contraindication, not a dose-adjustable risk",
      "If you develop a neck mass, difficulty swallowing, or hoarseness while using cagrilintide: stop and seek medical evaluation",
    ],
  },
  {
    id: "appetite-lean-mass",
    name: "Appetite suppression and lean mass loss",
    tier: "watch",
    prevalence: "Expected — mechanism-driven",
    mechanism: "Sustained appetite suppression from amylin agonism reduces caloric intake. Without intentional protein intake and resistance training, caloric restriction produces proportional lean mass loss alongside fat mass loss. This is the same mechanism-driven concern as the GLP-1 class.",
    management: [
      "Prioritize protein intake (1.2–1.6 g/kg body weight) — appetite suppression makes protein targets harder to hit without intentional tracking",
      "Resistance training during the weight loss phase preserves lean mass — appetite suppression does not reduce the anabolic response to resistance training",
      "The combination with semaglutide amplifies appetite suppression; lean mass management is more important at higher appetite suppression levels",
    ],
  },
  {
    id: "pancreatitis",
    name: "Pancreatitis — class concern",
    tier: "watch",
    prevalence: "Rare — but class association exists for amylin/GLP-1 agents",
    mechanism: "Both amylin and GLP-1 receptor agonists carry a class-level association with pancreatitis. The causal relationship remains debated, but the signal exists across the drug class. Combination use amplifies the class exposure.",
    management: [
      "Severe or persistent abdominal pain (especially radiating to the back) during cagrilintide use: stop immediately and seek emergency evaluation for pancreatitis",
      "History of pancreatitis or gallbladder disease: discuss risk-benefit with a physician before starting",
    ],
  },
  {
    id: "injection-site",
    name: "Injection site reactions",
    tier: "low",
    prevalence: "Common — most resolve with rotation",
    mechanism: "Subcutaneous injection of a weekly peptide produces local reactions — redness, induration, itching, bruising. Rotating injection sites reduces accumulation and local tissue effects.",
    management: [
      "Rotate injection sites (abdomen, thigh, upper arm) with each injection",
      "Persistent local reactions or nodule formation at injection sites warrants switching away from that region",
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
    heading: "Before starting: contraindication screen",
    items: [
      "Thyroid: any personal or family history of medullary thyroid carcinoma or MEN2 — stop here, class contraindication",
      "Pancreatitis history: assess risk-benefit; active or recent pancreatitis is a contraindication",
      "If using in combination with semaglutide: ensure established tolerability on semaglutide before adding cagrilintide — the combination amplifies GI effects",
    ],
  },
  {
    heading: "Titration protocol — the GI tolerability window",
    items: [
      "Start at the lowest dose (Phase 2 used 0.3 mg as starting dose) — full-dose initiation causes substantially worse GI side effects",
      "Escalate slowly — 4-week intervals between dose increases is a reasonable minimum",
      "If nausea is severe at a given dose, hold that dose rather than escalating — GI adaptation takes weeks, not days",
    ],
  },
  {
    heading: "Lean mass protection protocol",
    items: [
      "Track protein intake actively — appetite suppression makes it easy to fall below protein targets while losing weight",
      "Maintain resistance training — this is the primary lean mass protection tool; cardio alone does not preserve lean mass during caloric restriction",
      "Monitor body composition periodically if possible — scale weight alone does not distinguish fat vs. lean mass changes",
    ],
  },
];

const RED_LINES = [
  "MTC or MEN2 history — class contraindication, no dose threshold makes this safe",
  "Severe abdominal pain radiating to the back — emergency evaluation for pancreatitis required",
  "Pregnancy — no safety data; metabolic effects incompatible with nutritional demands of pregnancy",
  "Active pancreatitis — discontinue immediately; do not restart without medical guidance",
  "Neck mass, difficulty swallowing, or hoarseness — stop and seek thyroid evaluation",
];

export default function CagrilintideSafetyPanel() {
  return (
    <div className="reta-safety">

      {/* ── Context note ── */}
      <div className="reta-safety__context">
        Cagrilintide&apos;s primary safety considerations are GI tolerability (the gastric-slowing mechanism, amplified in the combination with semaglutide) and the class contraindications shared with GLP-1/amylin agents (thyroid C-cell, MEN2, pancreatitis history). There is no long-term safety data — Phase 2 at 32 weeks is the current data ceiling.
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
