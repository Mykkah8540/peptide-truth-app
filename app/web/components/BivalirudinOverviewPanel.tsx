export default function BivalirudinOverviewPanel() {
  return (
    <div className="reta-overview">
      <p className="reta-overview__lead">
        Bivalirudin (Angiomax) is a synthetic 20-amino acid direct thrombin inhibitor &mdash; an
        analogue of hirudin, the anticoagulant peptide secreted by medicinal leeches. FDA-approved
        for anticoagulation during percutaneous coronary intervention (PCI) and in patients with
        or at risk for heparin-induced thrombocytopenia (HIT), it demonstrates how a synthetic
        peptide can achieve precision inhibition of a single coagulation enzyme.
      </p>

      <h3>Mechanism: bivalent direct thrombin inhibition</h3>
      <p>
        Unlike indirect anticoagulants (heparin, LMWH) that require antithrombin as a cofactor,
        bivalirudin binds thrombin directly and simultaneously at two distinct sites: the catalytic
        active site (via its C-terminal D-Phe-Pro-Arg sequence) and exosite 1 (the fibrin-binding
        domain, via its N-terminal hirudin-like sequence). This bivalent engagement produces potent
        and specific thrombin inhibition that is independent of antithrombin levels &mdash; an
        advantage in patients with antithrombin deficiency or consumption.
      </p>

      <h3>Pharmacokinetics</h3>
      <p>
        Bivalirudin has a short half-life of approximately 25 minutes with IV administration.
        Clearance is predominantly enzymatic (thrombin itself cleaves the N-terminal sequence,
        partially inactivating the drug) with a secondary renal component for active metabolite
        clearance. The short half-life is a clinical advantage: anticoagulation reverses rapidly
        upon stopping the infusion, reducing bleeding duration without requiring a reversal agent.
        Dose adjustment is required in significant renal impairment.
      </p>

      <h3>Clinical use</h3>
      <p>
        Bivalirudin is used in cardiac catheterization laboratories as an anticoagulant during PCI,
        particularly in patients with or at risk for HIT (where heparin is contraindicated), and
        in high-bleeding-risk patients where reduced bleeding versus heparin-plus-glycoprotein
        IIb/IIIa inhibitor (GPI) combinations has been demonstrated. Major trials include
        HORIZONS-AMI (STEMI), ACUITY (NSTEMI/UA), and REPLACE-2 (elective PCI). It is administered
        as an IV bolus plus infusion in the cath lab by interventional cardiologists.
      </p>

      <h3>Educational significance</h3>
      <p>
        Bivalirudin illustrates a key design principle in therapeutic peptides: using the minimal
        binding sequence required for specificity rather than a full protein. The hirudin-derived
        sequence targets a unique thrombin exosite, while the active site engagement sequence is
        shared with other DTIs (argatroban). The reversibility &mdash; thrombin cleaves its own
        inhibitor &mdash; is an elegant self-limiting mechanism not seen in small-molecule DTIs.
        There is no community use or enhancement application.
      </p>
    </div>
  );
}
