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
    name: "Antihypertensives (ACE inhibitors, ARBs, calcium channel blockers, diuretics)",
    tier: "stop" as const,
    body:
      "Additive vasodilation is the concern. VIP is a potent vasodilator; antihypertensive " +
      "agents reduce blood pressure through independent mechanisms. Concurrent administration " +
      "creates unpredictable additive or synergistic hypotensive effects. The risk of " +
      "hypotensive crisis\u2014syncope, falls, end-organ ischemia\u2014is real and not " +
      "manageable in an unsupervised self-injection setting. Do not combine.",
  },
  {
    name: "Nitrates (nitroglycerin, isosorbide mononitrate)",
    tier: "stop" as const,
    body:
      "Nitrates produce vasodilation via nitric oxide signaling. Combined with VIP-mediated " +
      "VPAC receptor vasodilation, the hemodynamic effect would be profound and potentially " +
      "catastrophic. This interaction is analogous in risk to the well-documented " +
      "nitrate\u2013PDE5 inhibitor interaction. Absolute contraindication.",
  },
  {
    name: "PDE5 inhibitors (sildenafil, tadalafil, vardenafil)",
    tier: "stop" as const,
    body:
      "PDE5 inhibitors potentiate vasodilation by preventing cGMP degradation. Combined " +
      "with VIP\u2019s vasodilatory mechanism, the risk of severe hypotension is substantial. " +
      "The combination is pharmacologically analogous to the nitrate\u2013PDE5 interaction. " +
      "Do not co-administer.",
  },
  {
    name: "Beta-blockers (metoprolol, atenolol, propranolol)",
    tier: "watch" as const,
    body:
      "Beta-blockers attenuate the reflex tachycardia that compensates for VIP-induced " +
      "vasodilation. This could worsen hypotension by blunting the heart rate response " +
      "that normally maintains cardiac output during vasodilatory events. The interaction " +
      "is complex\u2014beta-blockers also have some vasoconstricting effects via beta-2 " +
      "blockade. Net hemodynamic result is unpredictable without monitoring.",
  },
  {
    name: "VIP analogs (aviptadil)",
    tier: "watch" as const,
    body:
      "Aviptadil is a synthetic VIP analog with similar (though not identical) receptor " +
      "pharmacology. Stacking native VIP with aviptadil creates additive receptor " +
      "activation with compounded vasodilatory risk and no established benefit from " +
      "dual administration. Do not combine.",
  },
  {
    name: "Vasoconstrictors (epinephrine, phenylephrine, midodrine)",
    tier: "watch" as const,
    body:
      "Vasoconstrictors oppose VIP\u2019s vasodilatory effects. This creates pharmacological " +
      "antagonism\u2014not necessarily a simple cancellation. Depending on relative doses, " +
      "receptor selectivity, and timing, the net hemodynamic result could be unpredictable " +
      "cardiac stress. This is also the relevant category for emergency management of " +
      "VIP-induced hypotension: vasopressors would be the treatment, not a co-administration " +
      "strategy.",
  },
  {
    name: "Alpha-1 agonists (clonidine, doxazosin in reverse context)",
    tier: "watch" as const,
    body:
      "Alpha-1 adrenergic tone maintains vascular resistance. Agents that modify alpha-1 " +
      "signaling\u2014including alpha-blockers used for BPH or hypertension\u2014may amplify " +
      "VIP-induced hypotension by further reducing vascular resistance. Alpha-1 agonists " +
      "theoretically counteract VIP vasodilation but this has not been studied in any " +
      "controlled context.",
  },
];

export default function VipInteractionsPanel() {
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
