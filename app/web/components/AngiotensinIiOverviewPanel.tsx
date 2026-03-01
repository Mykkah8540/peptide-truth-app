export default function AngiotensinIiOverviewPanel() {
  return (
    <div className="reta-overview">
      <p className="reta-overview__lead">
        Angiotensin-II (Giapreza) is the endogenous octapeptide of the
        renin-angiotensin-aldosterone system (RAAS) &mdash; now FDA-approved as a vasopressor for
        distributive shock. It is an IV hospital medication for the ICU, not a community peptide,
        but it illustrates how a circulating hormonal peptide can become a precision drug.
      </p>

      <h3>Mechanism</h3>
      <p>
        Angiotensin-II is generated from angiotensin-I by angiotensin-converting enzyme (ACE).
        It acts on AT1 receptors on vascular smooth muscle cells, causing vasoconstriction and
        raising mean arterial pressure (MAP). It also stimulates aldosterone release from the
        adrenal cortex (sodium and water retention) and promotes renal tubular sodium reabsorption
        &mdash; making it a master regulator of vascular tone and volume simultaneously.
      </p>

      <h3>Indication: distributive shock</h3>
      <p>
        Giapreza received FDA approval in December 2017 for the treatment of septic or other
        distributive shock in adults. In vasodilatory shock, RAAS activity is paradoxically
        depleted despite systemic inflammation, and angiotensin-II levels may be disproportionately
        low relative to the degree of vasodilation. Exogenous angiotensin-II provides a
        catecholamine-sparing vasopressor effect, allowing norepinephrine doses to be reduced in
        patients whose hemodynamics are refractory to catecholamines alone.
      </p>

      <h3>ATHOS-3 trial</h3>
      <p>
        The pivotal ATHOS-3 randomized controlled trial enrolled adults with high-dose
        catecholamine-refractory distributive shock. Angiotensin-II significantly improved MAP
        response at 3 hours versus placebo (primary endpoint). Post-hoc analyses suggested a
        mortality benefit in patients with high renin states (low angiotensin-II levels at
        baseline), though these subgroup findings require prospective confirmation.
      </p>

      <h3>Community relevance</h3>
      <p>
        There is no community use of angiotensin-II. It requires continuous IV infusion with
        invasive hemodynamic monitoring, has a black box warning for thrombosis, and is used
        exclusively in ICU settings by trained intensivists. It is included here for educational
        completeness as a physiologically important peptide in the RAAS system &mdash; one that
        underlies the mechanism of ACE inhibitors, ARBs, and related cardiovascular drugs that
        many people take daily.
      </p>
    </div>
  );
}
