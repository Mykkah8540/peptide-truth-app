/**
 * GlutathioneSafetyPanel — proactive safety for Glutathione.
 * Key frame: generally well-tolerated, but route-specific safety considerations.
 * Inhaled form: bronchospasm in asthma. IV: infusion reactions, chemotherapy
 * interaction complexity. Oral: very low risk, very low effect.
 */

const SIDE_EFFECTS = [
  {
    name: "Inhaled/nebulized form — bronchospasm in asthma and reactive airway disease",
    detail: "Inhaled glutathione can trigger bronchospasm in people with asthma or airway hyperreactivity; not a class concern for oral or IV routes",
    frequency: "Route-specific — common enough in asthma that it's a prescribing precaution for the inhaled form",
    timing: "Acute, within minutes of inhalation",
    tier: "flag",
    note: "This is the most important route-specific safety concern. People with asthma or reactive airway disease should not use inhaled/nebulized glutathione. The bronchospasm mechanism is likely related to the sulfhydryl group — similar to how some people react to sulfur-containing compounds. The flag applies specifically to the inhaled route; oral and IV glutathione do not carry this risk in the same way.",
  },
  {
    name: "Chemotherapy interaction — antioxidant interference with pro-oxidant cancer treatment",
    detail: "Some chemotherapy agents work by generating oxidative stress in cancer cells; antioxidant supplementation (including glutathione) could theoretically reduce their effectiveness",
    frequency: "Mechanism-based concern — not a documented frequent adverse event, but a real pharmacological conflict in specific treatment contexts",
    timing: "Concurrent use during active chemotherapy",
    tier: "flag",
    note: "This is genuinely complex: IV glutathione has evidence for protecting against platinum chemotherapy neuropathy (a benefit in that context), but antioxidant supplementation during other types of chemotherapy that use oxidative stress as their mechanism could theoretically blunt efficacy. This is not a self-management decision — it requires oncology guidance specific to the chemotherapy regimen being used. The general rule: discuss all supplementation with your oncologist during active treatment.",
  },
  {
    name: "IV infusion reactions",
    detail: "Flushing, headache, and occasional GI discomfort during or shortly after IV administration",
    frequency: "Uncommon; more common at higher infusion rates",
    timing: "During or within hours of IV session",
    tier: "watch",
    note: "IV glutathione infusion reactions are mild and manageable in most cases — slowing the infusion rate typically resolves them. More severe reactions (chest tightness, difficulty breathing, rash) are uncommon but are stop-infusion signals. IV administration should occur in a setting where reactions can be appropriately managed.",
  },
  {
    name: "Oral GI effects — nausea and stomach upset",
    detail: "Mild nausea or stomach upset with oral supplementation",
    frequency: "Uncommon; mild when it occurs",
    timing: "Shortly after oral dosing",
    tier: "low",
    note: "Oral glutathione has a very low adverse event profile — the main issue is not safety but efficacy (poor bioavailability means most oral forms don't produce meaningful systemic effects). GI discomfort is the most commonly reported oral side effect and is typically mild.",
  },
  {
    name: "Skin and allergic reactions",
    detail: "Rash, itching, or hives — uncommon; anaphylaxis very rare",
    frequency: "Uncommon",
    timing: "Any route; typically within hours of administration",
    tier: "low",
    note: "Allergic reactions to glutathione are uncommon but documented. Anaphylaxis is rare. People with known hypersensitivity to sulfur-containing compounds may have higher risk. Stop and seek medical evaluation for any significant allergic symptoms (urticaria, facial swelling, difficulty breathing).",
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
    title: "Route-specific safety screening — the safety profile differs by how you take it",
    body: "The safety considerations differ significantly by route. Inhaled/nebulized form: asthma and reactive airway disease are contraindications — bronchospasm is a documented risk. IV form: appropriate clinical setting, reaction monitoring, oncology discussion if on chemotherapy. Oral standard/liposomal: very low direct risk, but also very low evidence for effect. Matching your route choice to your goal (and safety profile) is the primary practical decision.",
    flags: [
      "Asthma or reactive airway disease: do not use inhaled/nebulized glutathione",
      "Active cancer treatment: discuss all glutathione supplementation with your oncologist before starting",
      "IV without clinical oversight: IV infusion should occur in a setting equipped to manage reactions",
    ],
  },
  {
    icon: "›",
    title: "Expectation calibration — matching route to realistic outcomes",
    body: "Oral standard glutathione has poor bioavailability — expecting systemic antioxidant effects from it is not well-supported. Liposomal form is meaningfully better. IV delivers real systemic levels. If the goal is intracellular GSH support via oral supplementation, NAC (N-acetylcysteine) is the more evidence-based approach — it has substantially better oral bioavailability and works via the cell's own synthetic machinery. This comparison is worth making before investing in oral glutathione supplementation.",
    flags: [
      "Expecting oral standard form to produce skin brightening: the evidence doesn't support this expectation",
      "Using oral glutathione for athletic recovery: the antioxidant paradox (ROS as adaptive signals) means this may actually blunt training adaptations",
      "Comparing IV clinic protocols: dose and frequency are not standardized; what you're buying is not standardized",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Asthma or reactive airway disease — inhaled/nebulized form",
    action: "Do not use inhaled glutathione. Bronchospasm is a documented adverse effect in this population — not a manageable risk to titrate through.",
  },
  {
    signal: "Active cancer treatment",
    action: "Do not add glutathione supplementation without oncology guidance. The antioxidant/chemotherapy interaction depends on your specific regimen — this is not a self-management decision.",
  },
  {
    signal: "Severe allergic reaction — urticaria, facial swelling, difficulty breathing",
    action: "Stop immediately and seek emergency care. Anaphylaxis is rare but documented.",
  },
  {
    signal: "Chest tightness or difficulty breathing during IV infusion",
    action: "Stop infusion immediately. Seek evaluation — this is beyond the expected mild flushing/headache infusion response.",
  },
  {
    signal: "Pregnant or breastfeeding",
    action: "Stop and consult physician. Insufficient safety data for supplemental glutathione in pregnancy; clinical use (if any) requires physician management.",
  },
];

export default function GlutathioneSafetyPanel() {
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
          Glutathione&apos;s safety profile is generally favorable — it&apos;s a naturally occurring cellular molecule with low acute toxicity across most routes. The two flag-tier concerns are route-specific: inhaled form in asthma (bronchospasm risk is real) and chemotherapy co-administration (oncology guidance required for the antioxidant interaction). For oral and IV use in healthy adults without asthma or active cancer treatment, the primary issue is efficacy expectations rather than acute safety.
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
          Most of these are route-specific or population-specific stops — not universal.
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
          For most healthy adults taking oral glutathione (standard or liposomal), the safety profile is genuinely very low — this is a molecule the body produces naturally, and oral doses are unlikely to produce systemic GSH levels high enough to cause problems. The primary issue is that low risk and low efficacy go together for the oral standard form.
        </p>
        <p>
          The meaningful safety considerations are route-specific: asthma rules out inhaled form, active cancer treatment requires oncology guidance for any route, and IV should be administered in appropriate clinical settings. Beyond those, glutathione sits in the lower-risk tier of wellness compounds.
        </p>
      </div>

    </div>
  );
}
