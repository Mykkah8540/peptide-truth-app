export default function DesmopressinOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Desmopressin (DDAVP) is a synthetic version of the body&rsquo;s antidiuretic hormone, engineered to retain its water-retention and hemostatic effects while eliminating the blood-pressure-raising activity of the natural molecule. It is an FDA-approved clinical drug used for diabetes insipidus, bedwetting, nocturia, and certain bleeding disorders &mdash; not a community wellness compound. The central safety fact everyone on it needs to understand: if you drink too much fluid while this drug is active, your sodium can drop to dangerous levels.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Person on the Medication &mdash; Prescribed for DI, bedwetting, or nocturia</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My doctor prescribed DDAVP and I just want to actually understand what it&rsquo;s doing in my body and what I need to watch out for.&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re on it</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It replaces or supplements a hormone the body isn&rsquo;t making enough of</strong><br />Central diabetes insipidus, the primary indication, happens when the brain doesn&rsquo;t produce enough antidiuretic hormone &mdash; resulting in extreme urination and thirst. Desmopressin replaces that signal. For bedwetting and nocturia, it temporarily suppresses overnight urine production so sleep isn&rsquo;t disrupted.</li>
          <li><strong>It was engineered specifically to be safer than the natural hormone</strong><br />The original antidiuretic hormone also constricts blood vessels and raises blood pressure. Desmopressin was redesigned to eliminate that effect while keeping the water-retention effect. That&rsquo;s why it can be prescribed for children with bedwetting without cardiovascular concern.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The antidiuretic effect that makes this drug useful is also its main risk. If you drink more fluid than your body can handle while the drug is active, water accumulates in your blood and dilutes your sodium &mdash; a condition called hyponatremia that at its worst causes seizures and brain swelling. Fluid restriction after dosing is not optional advice. If you have nasal congestion when using the nasal spray, absorption drops and your dose may not work &mdash; this matters for people with diabetes insipidus. Net: well-established medication with a clear mechanism, but the fluid restriction protocol is the safety behavior everyone on it needs to own.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Curious Reader &mdash; Interested in ADH biology and how the kidney handles water</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;ve been reading about how the kidney regulates water and I&rsquo;m fascinated by the antidiuretic hormone axis. How does desmopressin specifically compare to the natural version?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Desmopressin is an elegant example of precision pharmacology</strong><br />Two small structural changes to the natural hormone &mdash; removing a nitrogen at one end and substituting a D-amino acid in the middle &mdash; completely eliminated the blood vessel constriction while preserving and actually amplifying the kidney effect. That level of pharmacological precision from minor structural tweaks is genuinely impressive chemistry.</li>
          <li><strong>The hemostatic effect is a separate, surprising mechanism</strong><br />Desmopressin also causes blood vessel walls to release von Willebrand factor and Factor VIII &mdash; proteins that help blood clot. This is mediated by the same receptor type as the kidney effect but in a completely different tissue. One drug, two clinically useful effects, same molecular switch.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Desmopressin is a prescribed clinical drug for specific diagnosed conditions &mdash; it has no wellness or enhancement application. The hyponatremia risk that makes it require physician oversight is real and can be severe, especially in elderly people or anyone who drinks heavily. Understanding the biology is valuable; using it without diagnosis and monitoring would be pointless at best and actively dangerous at worst. Net: one of the more instructive examples of rational drug design in peptide pharmacology &mdash; understand it as science, not as something to explore recreationally.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Systems-Physiology Biohacker &mdash; Water balance, receptor selectivity, drug design</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;m interested in vasopressin receptor subtypes and how selectivity engineering changed the clinical profile. Walk me through the V1a vs V2 distinction and why it matters.&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The V1a/V2 receptor selectivity story is a clean lesson in pharmacological engineering</strong><br />Native vasopressin activates both V1a receptors (smooth muscle &mdash; vasoconstriction, blood pressure) and V2 receptors (kidney collecting ducts &mdash; water reabsorption; endothelium &mdash; factor release). Desmopressin&rsquo;s structural modifications eliminate V1a activation entirely while preserving V2 activity. The result: 10x the antidiuretic potency of the natural hormone with essentially zero cardiovascular effect. This is V2-selectivity achieved through stereochemistry, not through a receptor-binding domain redesign.</li>
          <li><strong>The hemostatic tachyphylaxis is mechanistically distinct from the antidiuretic tachyphylaxis</strong><br />Repeat desmopressin doses cause the endothelial hemostatic response (vWF/Factor VIII release) to diminish within 24&ndash;48 hours &mdash; the stored pools are depleted faster than they replenish. The kidney antidiuretic response shows slower tachyphylaxis. Same receptor, different downstream resource pools, different time constants. For procedure planning in bleeding disorders this mechanistic distinction is clinically important.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Desmopressin has no biohacking application &mdash; it is a tool for specific deficiency states and clinical bleeding management. The sodium-water equilibrium disturbance from improper use is not a minor inconvenience; severe hyponatremia from desmopressin has caused deaths. The receptor selectivity story is worth understanding as a model for rational drug design, but the practical lesson is that V2-selective water retention without sodium co-retention is a physiologically destabilizing intervention outside its clinical context. Net: excellent pharmacology study object, zero legitimate enhancement angle.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Desmopressin is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Not a wellness or biohacking compound &mdash; it is a clinical drug for diagnosed medical conditions</li>
              <li>Not appropriate for use without physician oversight &mdash; the hyponatremia risk requires monitoring, especially in elderly people</li>
              <li>Not effective for nephrogenic diabetes insipidus &mdash; if the kidney doesn&rsquo;t respond to ADH signals, desmopressin won&rsquo;t work</li>
              <li>Not safe if you ignore fluid restriction &mdash; drinking freely while the antidiuretic effect is active is how the dangerous hyponatremia happens</li>
              <li>Not a substitute for factor replacement products in major bleeding when hemostatic tachyphylaxis has developed after 2&ndash;3 doses</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>One of the clearest examples of precision receptor-selectivity engineering in peptide pharmacology</li>
              <li>Two structurally minor changes eliminated an entire receptor class&rsquo;s activity while amplifying the therapeutic effect tenfold</li>
              <li>Dual utility from a single V2 receptor mechanism &mdash; antidiuresis in the kidney and hemostasis in the vasculature</li>
              <li>Five FDA-approved indications spanning pediatric bedwetting to adult nocturia to surgical bleeding management</li>
              <li>The hemostatic tachyphylaxis vs. antidiuretic tachyphylaxis distinction illustrates how the same receptor can have very different downstream resource constraints</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
