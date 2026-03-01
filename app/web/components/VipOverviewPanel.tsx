export default function VipOverviewPanel() {
  return (
    <div className="reta-overview">
      <h2 className="reta-overview__heading">Overview</h2>
      <p className="reta-overview__lede">
        Vasoactive intestinal peptide (VIP) is an endogenous 28-amino acid neuropeptide
        with profound vasodilatory, bronchodilatory, and immunomodulatory properties. It is
        not an FDA-approved therapeutic in its native form. Community interest in VIP for
        immune modulation is research-driven\u2014there is no established clinical protocol
        for self-administration, and the pharmacology makes injectable regimens deeply
        questionable.
      </p>
      <div className="reta-overview__body">
        <p>
          VIP is expressed throughout the body\u2014gut, brain, lung, and immune tissue. Its
          receptors (VPAC1, VPAC2) are widely distributed and mediate diverse functions:
          smooth muscle relaxation, vasodilation, bronchodilation, suppression of
          pro-inflammatory cytokines, and modulation of T-cell activity. Endogenous VIP
          acts locally as a neurotransmitter and paracrine signal; it is not a circulating
          hormone in the traditional sense.
        </p>
        <p>
          The defining pharmacokinetic constraint: VIP has a plasma half-life of under
          two minutes. It is rapidly cleaved by circulating peptidases (primarily dipeptidyl
          peptidase IV and neutral endopeptidase). This means that injected VIP is
          pharmacologically inactivated almost immediately after reaching the bloodstream.
          Any injectable regimen claiming sustained systemic VIP effect must contend with
          this fundamental limitation.
        </p>
        <p>
          Aviptadil\u2014a synthetic VIP analog\u2014has been studied in clinical trials for
          ARDS and respiratory failure, including some COVID-19 trial work. Results are
          mixed and controversial. Aviptadil is not the same compound as native VIP, and
          clinical data from aviptadil trials does not directly transfer to conclusions
          about injectable native VIP.
        </p>
        <p>
          Community reports of VIP self-injection exist. These are anecdotal, poorly
          characterized, and pharmacologically difficult to reconcile with the known
          half-life. The primary safety concern with any injectable VIP preparation is
          profound vasodilation and hypotension\u2014effects that are dose-dependent,
          rapid-onset, and potentially severe.
        </p>
        <p>
          Bottom line: VIP is a fascinating endogenous regulator with well-characterized
          receptor biology. As a self-administered injectable compound, the pharmacology
          is unfavorable, the risk profile is poorly defined, and no clinical protocol
          exists. This is a research compound\u2014not a community peptide.
        </p>
      </div>
    </div>
  );
}
