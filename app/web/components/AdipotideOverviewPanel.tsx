export default function AdipotideOverviewPanel() {
  return (
    <div className="reta-overview">
      <p className="reta-overview__lead">
        Adipotide (FTPP — Fat Targeting Proapoptotic Peptide) is a chimeric research peptide designed
        to selectively destroy the blood vessels feeding white adipose tissue, causing adipose regression
        through vascular apoptosis and ischemia. It has never been tested in a completed human clinical
        trial and has no approved medical use.
      </p>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">Mechanism</h3>
        <p>
          Adipotide is a bifunctional chimeric peptide composed of two linked sequences. The targeting
          domain binds prohibitin, a protein overexpressed on the endothelial cells of blood vessels
          supplying white adipose tissue. The effector domain is D[KLAKLAK]2, a pro-apoptotic peptide
          that disrupts mitochondrial membranes. The design intent is to concentrate the apoptotic signal
          specifically in adipose vasculature, causing ischemic death of adipose tissue while sparing
          other tissues.
        </p>
        <p>
          The selectivity depends on the specificity of prohibitin expression for adipose vasculature.
          In the primate study, the targeting was imperfect — renal vasculature was also affected,
          producing kidney toxicity. The selectivity assumption is thus not robustly validated in
          higher mammals.
        </p>
      </div>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">Evidence Base</h3>
        <p>
          The primary and most-cited evidence for adipotide is a single study in obese Rhesus macaques
          (Barnhart et al., Science Translational Medicine, 2011). Treated monkeys lost approximately
          11% of body weight and 27% of abdominal fat over a 4-week treatment period. This was a
          dramatic result. The same study documented significant renal toxicity — elevated creatinine,
          BUN, and histopathological kidney damage — that partially reversed after treatment cessation.
        </p>
        <p>
          No human phase I safety trial has been completed and published. The compound is not in active
          clinical development as of early 2026.
        </p>
      </div>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">Community Interest and Status</h3>
        <p>
          Adipotide has attracted attention in peptide enthusiast communities because of the dramatic
          primate results. It is sourced as a research chemical from online vendors. Community use
          represents entirely uncontrolled human experimentation — there is no established human dose,
          no safety monitoring protocol, no pharmaceutical-grade formulation, and no informed consent
          framework. The renal toxicity observed in primates is not a resolved concern.
        </p>
      </div>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">Regulatory Status</h3>
        <p>
          Adipotide is not FDA-approved for any indication. It is not an IND-cleared investigational
          agent in active human trials. Any human use is outside any regulatory or clinical framework.
          Research-chemical sourcing introduces additional risks of contamination, incorrect peptide
          sequence, incorrect concentration, and non-sterile preparation.
        </p>
      </div>
    </div>
  );
}
