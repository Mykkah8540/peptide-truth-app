export default function SemaglutideOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Semaglutide (Ozempic for diabetes, Wegovy for weight loss) is the most-studied weight loss drug available and the benchmark every newer drug gets compared against. It produces about 15% body weight loss on average, it&rsquo;s FDA-approved, and it has years of real-world data &mdash; but it also causes significant muscle loss if you&rsquo;re not deliberate about protein and resistance training, and the majority of weight returns if you stop taking it.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; Heard about it everywhere, wants to know if it&rsquo;s real</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;Everyone&rsquo;s talking about Ozempic &mdash; does it actually work, what are the real downsides, and is it something I should try?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It actually works</strong><br />This isn&rsquo;t hype. The STEP 1 clinical trial showed nearly 15% body weight reduction over 68 weeks in almost 2,000 people &mdash; results that were genuinely unprecedented for a medication. People who have struggled with hunger and weight for years describe it as the first thing that actually quiets the constant noise around food. That&rsquo;s real, and it&rsquo;s the honest reason for the excitement.</li>
          <li><strong>FDA-approved with a real evidence base</strong><br />Unlike most compounds discussed in the peptide community, semaglutide has gone through full clinical trials, has prescribing information, and has cardiovascular outcome data showing it reduces heart attack and stroke risk. That level of evidence is rare and meaningful.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The side effects are real and common: nausea affects roughly 40% of people, especially when doses are being increased, and vomiting affects about 1 in 4. The &ldquo;Ozempic face&rdquo; phenomenon &mdash; a gaunt look from rapid fat loss, especially in the face &mdash; is real and happens when people lose weight too fast without protecting muscle. And when people stop semaglutide, about two-thirds of lost weight comes back within a year. This isn&rsquo;t a course you finish; it may be indefinite treatment. Net: genuinely effective, but not consequence-free and not a quick fix.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Athlete &mdash; Cutting weight or recomping body composition</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I want to get leaner for my sport &mdash; can semaglutide help me cut without sacrificing strength and muscle I&rsquo;ve spent years building?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Appetite control that makes cutting dramatically easier</strong><br />Athletes in cutting phases fight a constant battle against hunger. Semaglutide suppresses appetite in a way that most people describe as making food thoughts genuinely quiet &mdash; not just willpower-suppressed. That changes the math of a caloric deficit for people whose main limiting factor is hunger.</li>
          <li><strong>Metabolic improvements during a cut</strong><br />GLP-1 drugs improve insulin sensitivity alongside weight loss. For athletes carrying any degree of metabolic dysfunction, this can improve energy partitioning and training recovery quality during a caloric deficit, which is typically when recovery is hardest.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The muscle loss risk is the critical concern for athletes. Semaglutide suppresses appetite globally &mdash; it doesn&rsquo;t selectively target fat. Without aggressive, deliberate protein intake (1.6+ g/kg bodyweight minimum) and maintained resistance training throughout the cut, lean mass loss can be substantial. Studies without structured resistance training show 25-40% of lost weight coming from lean mass. For a competitive athlete, that&rsquo;s a serious problem. Net: useful for cutting if you are religious about protein and resistance training, but it will not spare your muscle automatically.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; Metabolic longevity and GLP-1 biology</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;Beyond weight &mdash; what does GLP-1 agonism actually do to cardiovascular risk, inflammation, and metabolic aging? Is the SELECT trial data meaningful for healthy people?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Cardiovascular outcome data is genuinely impressive</strong><br />The SELECT trial (2023) enrolled over 17,000 non-diabetic, obese adults with established cardiovascular disease and showed semaglutide reduced major adverse cardiovascular events by 20% (HR 0.80). That&rsquo;s a hard clinical outcome, not a surrogate. GLP-1 receptors are expressed in heart and blood vessels &mdash; the cardioprotection may be partially independent of weight loss, which has significant longevity implications.</li>
          <li><strong>Anti-inflammatory and potential neuroprotective signals</strong><br />GLP-1 receptors are expressed in the brain, including in areas relevant to neuroinflammation. Observational data associates GLP-1 drug use with lower Alzheimer&rsquo;s and Parkinson&rsquo;s risk. These signals are in active clinical investigation but aren&rsquo;t proven yet. The mechanistic rationale is solid enough to take seriously.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The SELECT cardiovascular data is from people with established CVD &mdash; extrapolating the 20% risk reduction to healthy, metabolically normal people is not directly supported by that trial. GLP-1 receptor agonism has complex effects on bone metabolism (may reduce bone density), muscle mass, and potentially thyroid tissue (animal data flagged thyroid C-cell changes). Long-term effects of decades of GLP-1 agonism in healthy adults are genuinely unknown. Net: the most evidence-backed compound in this entire space for longevity-adjacent outcomes, but the risk-benefit picture in already-healthy people is not yet characterized.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Semaglutide is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A short-term fix &mdash; weight returns when you stop</li>
              <li>A muscle-sparing drug &mdash; lean mass loss is real without resistance training</li>
              <li>The most potent option &mdash; tirzepatide achieves ~20-22% weight loss; retatrutide ~24%</li>
              <li>Side-effect-free &mdash; nausea, vomiting, GI issues are common during titration</li>
              <li>Appropriate for everyone &mdash; pancreatitis history and thyroid cancer family history are contraindications</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>Deepest evidence base of any weight loss drug &mdash; years of real-world data</li>
              <li>FDA-approved with prescribing information and insurance coverage pathways</li>
              <li>Cardiovascular outcome data showing reduced heart attack and stroke risk</li>
              <li>Genuine appetite suppression that people describe as qualitatively different from willpower</li>
              <li>Emerging signals for neuroprotection and metabolic aging under active study</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
