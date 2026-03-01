export default function BrainNatriureticPeptideOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        BNP &mdash; brain natriuretic peptide, though it&rsquo;s made in the heart, not the brain &mdash; is a hormone the heart releases when it&rsquo;s under pressure or overloaded with fluid. Your doctor measures it as a blood test to diagnose and monitor heart failure. A drug version called nesiritide exists but is rarely used. Nobody is injecting BNP as a wellness compound; this page exists for the millions of people navigating heart failure, elevated BNP test results, or cardiovascular health research.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; just told their BNP level is elevated</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My doctor ordered a BNP test and said my number is high. Does this mean I have heart failure? What does this actually tell us?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re looking into this</p>
        <ol className="reta-overview__profile-why">
          <li><strong>BNP is the heart&rsquo;s distress signal</strong><br />When the heart&rsquo;s pumping chambers are under excess pressure or fluid overload, they release BNP into the bloodstream &mdash; it&rsquo;s essentially the heart sending a call for help. A higher BNP level means the heart is working harder than it should be. Doctors use it to diagnose heart failure, figure out how serious it is, and track whether treatment is working. Your BNP number is a snapshot of cardiac stress at that moment in time.</li>
          <li><strong>It helps distinguish cardiac from lung problems</strong><br />Shortness of breath can come from heart problems or lung problems, and they look similar initially. A BNP test is one of the fastest ways to tell them apart &mdash; a very elevated BNP in someone with shortness of breath strongly suggests the heart is the cause, which changes the entire treatment approach. That&rsquo;s a clinically valuable distinction made by a simple blood test.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">A high BNP does not automatically mean you have severe heart failure. BNP rises with age, obesity, kidney disease, and atrial fibrillation even without heart failure, and what counts as &ldquo;elevated&rdquo; is interpreted in clinical context, not as an absolute cutoff. Conversely, a normal BNP essentially rules out significant cardiac fluid overload &mdash; that negative predictive value is part of why the test is useful. The number needs to be interpreted alongside symptoms, physical exam findings, and imaging. Net: BNP is a powerful clinical signal, not a standalone diagnosis, and the trend over time often matters more than any single reading.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Curious Reader &mdash; interested in cardiovascular biology</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I keep hearing BNP mentioned alongside heart failure. What does the heart actually do with this hormone, and why does it matter beyond just being a test number?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>BNP is the heart&rsquo;s built-in pressure relief system</strong><br />When ventricular pressure rises, BNP is released to counteract the problem: it causes the kidneys to excrete sodium and water (reducing fluid load), relaxes blood vessels (lowering the pressure the heart pumps against), and suppresses some of the hormonal stress responses that worsen heart failure. It&rsquo;s an elegant feedback loop &mdash; the organ under stress releases a hormone designed to reduce that exact stress.</li>
          <li><strong>The drug version taught us important lessons about heart failure biology</strong><br />Nesiritide (Natrecor) is recombinant human BNP &mdash; the exact same molecule, made in a lab and given by IV infusion to hospitalized heart failure patients. It works the way you&rsquo;d expect: reduces filling pressures, relieves symptoms. A massive 7,141-patient trial called ASCEND-HF tested it rigorously and found it didn&rsquo;t improve survival or reduce readmissions. This was a humbling result: a drug with the right mechanism, short-term symptom benefits, and it still didn&rsquo;t change outcomes. That lesson is relevant to how we think about heart failure biology.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The nesiritide story is a useful example of why short-term hemodynamic improvements don&rsquo;t automatically translate to better long-term outcomes. Heart failure is driven by many interacting systems, and addressing one acute measurement doesn&rsquo;t necessarily change the underlying trajectory. The therapies that actually reduce mortality in heart failure &mdash; ACE inhibitors, beta-blockers, certain diuretics, newer agents like sacubitril/valsartan &mdash; work through different, and in some cases less immediately intuitive, mechanisms. Net: BNP is genuinely interesting cardiac biology; the drug story is a cautionary tale about translating mechanism to outcomes.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Cardiovascular Health Optimizer &mdash; tracking biomarkers for longevity</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I run a full biomarker panel every quarter. Should BNP or NT-proBNP be part of my cardiovascular monitoring, and what would an optimal level look like for someone without heart failure?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>BNP and NT-proBNP have population-level cardiovascular risk data</strong><br />Large epidemiological studies show that BNP and NT-proBNP levels predict future cardiovascular events even in people without overt heart disease. Higher levels within the &ldquo;normal&rdquo; range are associated with greater long-term cardiac risk. This has led some longevity-oriented clinicians to include NT-proBNP in comprehensive cardiovascular panels as an early signal of subclinical cardiac stress.</li>
          <li><strong>NT-proBNP has better assay stability for outpatient monitoring</strong><br />Technically, NT-proBNP (the inactive cleavage fragment released alongside BNP) has better laboratory stability than active BNP because it has a longer half-life and doesn&rsquo;t degrade as rapidly in blood tubes. Most high-sensitivity longevity panels now use NT-proBNP rather than BNP for this reason. Both reflect the same underlying biology &mdash; ventricular wall stress &mdash; but NT-proBNP is more reproducible for repeat tracking.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">BNP and NT-proBNP are useful signals of cardiac health but do not give you an actionable intervention target the way, say, LDL does. If your NT-proBNP is creeping up over years without symptoms, the appropriate response is cardiology evaluation, echocardiography, blood pressure optimization, and exercise &mdash; not targeting the BNP number itself. BNP is a downstream result of cardiac wall stress; you want to address the causes, not the marker. No supplement, peptide, or biohack directly and safely modulates BNP production in the way cardiovascular medications do. Net: worthwhile biomarker to track, not a direct optimization target, and rising trends warrant clinical evaluation not self-treatment.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What BNP is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A community peptide compound &mdash; nobody is self-injecting BNP for any purpose</li>
              <li>Made in the brain, despite the name &mdash; it is primarily produced in cardiac ventricles</li>
              <li>A definitive diagnosis on its own &mdash; BNP levels require clinical context to interpret</li>
              <li>Directly optimizable through lifestyle or peptide intervention</li>
              <li>Equivalent to NT-proBNP in assay terms &mdash; different fragments, different stability, both reflecting the same biology</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>One of the most clinically useful biomarkers in medicine &mdash; rapidly distinguishes cardiac from non-cardiac dyspnea</li>
              <li>The heart&rsquo;s endogenous counter-regulatory system against pressure overload &mdash; elegant feedback biology</li>
              <li>The nesiritide story is a master class in why mechanism does not guarantee outcomes</li>
              <li>Rising NT-proBNP in otherwise healthy people is an early cardiac stress signal with real longitudinal predictive value</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
