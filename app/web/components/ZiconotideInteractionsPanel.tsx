"use client";
import { useState, useMemo } from "react";

const TIER_STYLE = {
  stop: {
    bg: "rgba(220,38,38,0.06)",
    border: "rgba(220,38,38,0.25)",
    dot: "#dc2626",
    label: "Stop",
    labelColor: "#b91c1c",
  },
  watch: {
    bg: "rgba(234,179,8,0.07)",
    border: "rgba(234,179,8,0.35)",
    dot: "#ca8a04",
    label: "Watch",
    labelColor: "#92400e",
  },
  low: {
    bg: "rgba(34,197,94,0.06)",
    border: "rgba(34,197,94,0.25)",
    dot: "#16a34a",
    label: "Low Risk",
    labelColor: "#166534",
  },
};

const interactions = [
  {
    name: "CNS depressants (benzodiazepines, barbiturates, sedatives) \u2014 intrathecal context",
    tier: "stop" as const,
    body:
      "In the intrathecal setting, co-administration of CNS depressants with ziconotide " +
      "amplifies central nervous system depression. This is a clinically documented concern " +
      "in intrathecal pain management. The ziconotide prescribing information explicitly " +
      "notes additive CNS effects with concurrent systemic CNS depressants. In the " +
      "community self-injection context, this interaction is moot\u2014because ziconotide " +
      "self-injection is itself a stop-level event regardless of co-administration.",
  },
  {
    name: "Intrathecal opioids (morphine, hydromorphone)",
    tier: "watch" as const,
    body:
      "Ziconotide is sometimes combined with intrathecal opioids in clinical practice " +
      "for refractory pain, as the two mechanisms are complementary and non-overlapping. " +
      "However, additive CNS depression requires careful titration and specialist " +
      "management. This combination is clinically used but demands ongoing monitoring " +
      "for sedation, respiratory depression, and psychiatric effects.",
  },
  {
    name: "Intrathecal local anesthetics (bupivacaine)",
    tier: "watch" as const,
    body:
      "Intrathecal bupivacaine is occasionally combined with ziconotide in clinical " +
      "pain management. Both agents act at the spinal level but via different mechanisms. " +
      "Combined use may produce additive hemodynamic and neurological effects. Stability " +
      "and compatibility of the combination in infusion systems has been studied to a " +
      "limited degree. Requires specialist compounding and oversight.",
  },
  {
    name: "Intrathecal baclofen",
    tier: "watch" as const,
    body:
      "Baclofen (GABA-B agonist) is used intrathecally for spasticity. Combination with " +
      "ziconotide is occasionally considered for patients with both pain and spasticity " +
      "indications. Additive CNS depression is the primary concern. Compatibility " +
      "in admixture and long-term stability data in the pump reservoir is limited. " +
      "Requires specialist oversight and careful titration.",
  },
  {
    name: "Systemic VGCC-affecting drugs (gabapentin, pregabalin, verapamil)",
    tier: "watch" as const,
    body:
      "Gabapentin and pregabalin bind to the alpha-2-delta subunit of voltage-gated " +
      "calcium channels, partially overlapping with ziconotide\u2019s mechanism. Verapamil " +
      "and diltiazem block L-type VGCCs. Whether systemic co-administration of these " +
      "agents with intrathecal ziconotide produces clinically meaningful additive effects " +
      "has not been well studied, but the mechanistic overlap is relevant to discuss with " +
      "the managing pain specialist.",
  },
  {
    name: "Community peptide stacks (BPC-157, TB-500, GHK-Cu, etc.)",
    tier: "low" as const,
    body:
      "This question is asked and deserves a direct answer: ziconotide is not a community " +
      "peptide and does not belong in any community peptide stack. There is no meaningful " +
      "pharmacokinetic or pharmacodynamic interaction between intrathecally delivered " +
      "ziconotide and commonly used community peptides\u2014because the delivery context, " +
      "mechanism, and clinical setting are entirely different categories. The question " +
      "is closed: if you are asking about ziconotide in the context of community peptide " +
      "use, the answer is that ziconotide is not in that category and self-administration " +
      "is not a rational option.",
  },
];

export default function ZiconotideInteractionsPanel() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      interactions.filter(
        (i) =>
          i.name.toLowerCase().includes(q.toLowerCase()) ||
          i.body.toLowerCase().includes(q.toLowerCase())
      ),
    [q]
  );

  return (
    <div className="reta-interactions">
      <h2 className="reta-interactions__heading">Interactions</h2>
      <input
        className="reta-interactions__search"
        placeholder="Filter interactions..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="reta-interactions__list">
        {filtered.map((item, i) => {
          const t = TIER_STYLE[item.tier];
          return (
            <div
              key={i}
              className="reta-interactions__item"
              style={{ background: t.bg, border: `1px solid ${t.border}` }}
            >
              <div className="reta-interactions__item-top">
                <span className="reta-interactions__dot" style={{ background: t.dot }} />
                <span className="reta-interactions__item-label" style={{ color: t.labelColor }}>
                  {t.label}
                </span>
                <span className="reta-interactions__item-name">{item.name}</span>
              </div>
              <p className="reta-interactions__item-body">{item.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
