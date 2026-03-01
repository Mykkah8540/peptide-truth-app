export default function NesiritideOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Nesiritide is a hospital IV drug for acute heart failure &mdash; it&rsquo;s what doctors give
        when someone comes in unable to breathe from fluid buildup. It&rsquo;s FDA-approved, it works
        on hemodynamic endpoints, and a major 2011 trial showed it helped with breathlessness but not
        survival. This is a reference page for patients, caregivers, and people who want to understand
        the pharmacology &mdash; not a community compound.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; heart failure patient or caregiver</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My family member was just given Natrecor in the hospital &mdash; what is this drug actually doing and why are they using it?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re looking into it</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It&rsquo;s being used right now in a hospital setting</strong><br />Nesiritide (brand name Natrecor) is a synthetic version of a peptide your heart normally makes when it&rsquo;s under strain &mdash; called BNP (B-type natriuretic peptide). In acute heart failure, when fluid is backing up and the patient can&rsquo;t breathe comfortably even at rest, nesiritide relaxes blood vessels and helps the kidneys excrete excess sodium and fluid. It reduces the pressure and filling load the heart is struggling against.</li>
          <li><strong>Understanding the difference between symptom relief and survival benefit</strong><br />The large 2011 ASCEND-HF trial &mdash; the definitive study &mdash; showed nesiritide improved breathlessness modestly (patients felt better sooner) but did not reduce 30-day mortality or rehospitalization. That distinction matters: it&rsquo;s a drug that makes people more comfortable in an acute crisis, not one that changes their disease trajectory.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">After ASCEND-HF, nesiritide use declined significantly because the symptomatic benefit didn&rsquo;t clearly justify the cost and the concern about kidney function. If a patient received it, it was likely because they had inadequate response to IV diuretics and vasodilators, or there was a specific clinical reason the care team preferred it. The right questions to ask the medical team are about the specific clinical rationale and what the discharge plan looks like &mdash; nesiritide is an acute hospital tool, not a chronic management strategy. <strong>Net: real benefit for breathlessness; no mortality benefit; use has narrowed since 2011.</strong></p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Curious Reader &mdash; cardiovascular pharmacology</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I saw nesiritide mentioned in a cardiovascular context &mdash; how does a synthetic version of a heart peptide actually work as a drug?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It&rsquo;s a direct peptide replacement strategy &mdash; the logic is elegant</strong><br />Your heart releases BNP as a stress signal when it&rsquo;s volume-overloaded or under pressure. BNP naturally causes vasodilation, sodium excretion, and mild diuresis &mdash; a self-protective response. Nesiritide is a synthetic BNP that mimics this response pharmacologically. The drug development logic (replace a beneficial endogenous peptide that isn&rsquo;t compensating enough) is one of the cleaner examples of rational peptide drug design based on endogenous physiology.</li>
          <li><strong>The natriuretic peptide system is a useful model for peptide cardiovascular pharmacology</strong><br />The ANP/BNP/CNP family of natriuretic peptides &mdash; all acting on guanylyl cyclase-linked receptors to raise intracellular cGMP &mdash; is a well-characterized cardiovascular signaling system. Understanding how nesiritide works gives meaningful context for how the body regulates fluid balance, blood pressure, and cardiac load through peptide signaling.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The nesiritide story is also a cautionary tale about the gap between hemodynamic endpoints and clinical outcomes. The drug demonstrably improves filling pressures and cardiac output in heart failure &mdash; measurably, reliably. But those hemodynamic improvements didn&rsquo;t translate to patients living longer or staying out of the hospital longer. This is a recurring theme in cardiovascular pharmacology: surrogate endpoints and clinical outcomes can diverge. <strong>Net: elegant pharmacology; instructive clinical trial story; not a direct action item for non-patients.</strong></p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; cardiac peptides and the natriuretic system</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;How does the BNP/natriuretic peptide system relate to cardiovascular optimization, and is there any legitimate interest in this outside of acute heart failure?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>BNP as a biomarker for cardiac stress is genuinely useful context</strong><br />Plasma BNP (and NT-proBNP, the inactive fragment) is one of the most clinically validated cardiac biomarkers &mdash; elevated in heart failure, pulmonary hypertension, and significant left ventricular dysfunction. For someone tracking cardiovascular health with labs, understanding what BNP represents &mdash; a heart stress signal, not a generic inflammation marker &mdash; helps interpret results meaningfully. Elevations worth paying attention to, elevations that are noise, and what drives them: this is useful context.</li>
          <li><strong>The guanylyl cyclase pathway is a cardiovascular signaling node worth understanding</strong><br />Nesiritide&rsquo;s mechanism &mdash; natriuretic peptide receptor-A activation raising intracellular cGMP &mdash; is the same pathway that nitric oxide and sildenafil work through in vascular smooth muscle. Understanding how multiple cardiovascular-relevant compounds converge on cGMP signaling builds a coherent picture of how vascular tone and fluid balance are regulated.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">There is no legitimate biohacking or enhancement use case for nesiritide. It requires continuous IV infusion with hemodynamic monitoring. Self-administration is not possible or safe. The natriuretic peptide system is relevant as educational context and for biomarker interpretation, but the drug itself has no plausible community use outside acute hospital management of heart failure. Anyone who encounters nesiritide in a community context should treat it as a serious red flag. <strong>Net: important reference pharmacology; strictly a hospital drug with zero community use case.</strong></p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Nesiritide is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A community peptide &mdash; it requires continuous IV infusion with hospital monitoring</li>
              <li>A mortality-reducing drug &mdash; the ASCEND-HF trial showed no 30-day survival benefit</li>
              <li>A first-line heart failure drug &mdash; use has narrowed significantly since 2011 because benefits didn&rsquo;t justify cost and renal concerns</li>
              <li>Safe for self-administration under any circumstances</li>
              <li>A cardiovascular optimization tool for healthy people &mdash; it addresses acute disease, not enhancement</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>Elegant pharmacological design &mdash; a synthetic version of an endogenous cardiac stress peptide</li>
              <li>FDA-approved with a real clinical evidence base for its approved indication</li>
              <li>The ASCEND-HF trial is an instructive case study in hemodynamic surrogate endpoints vs clinical outcomes</li>
              <li>The BNP/natriuretic peptide biomarker system is clinically meaningful context for cardiovascular health monitoring</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
