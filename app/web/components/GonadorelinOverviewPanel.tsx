export default function GonadorelinOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Gonadorelin is a synthetic version of the hormone your hypothalamus uses to tell the pituitary to produce LH and FSH &mdash; the signals that drive testosterone production and sperm development. It&rsquo;s used primarily as a TRT adjunct to keep the testes functioning while on testosterone therapy, and it&rsquo;s available through compounding pharmacies with a prescription.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Person on TRT &mdash; worried about testicular atrophy and fertility</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I started testosterone and my doctor mentioned gonadorelin to prevent testicular shrinkage. What does it actually do and does it work?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It keeps the signaling pathway to the testes alive</strong><br />When you take testosterone, your body senses the hormone and stops sending the signal to make more &mdash; which means the testes stop getting stimulated and shrink over time. Gonadorelin provides that stimulation externally, keeping testicular tissue active.</li>
          <li><strong>It&rsquo;s accessible through a legitimate medical channel</strong><br />Unlike many compounds on this site, gonadorelin can be obtained through a compounding pharmacy with a physician&rsquo;s prescription. That means real pharmaceutical-grade manufacturing standards, not gray-market research peptides.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Gonadorelin used to be compared directly to hCG for this purpose, but they work differently &mdash; hCG acts directly on the testes (bypassing the pituitary), while gonadorelin works one step upstream through the pituitary. That means gonadorelin requires the pituitary to still be responsive, which it generally is, but the evidence for gonadorelin specifically in TRT testicular preservation is thinner than the decades of hCG data. It&rsquo;s mechanistically sound; it&rsquo;s just newer in this specific role. Net: a legitimate and accessible TRT adjunct that makes biological sense, with the caveat that you&rsquo;re working from extrapolated rather than extensive direct evidence.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Athlete &mdash; managing hormone health while optimizing performance</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;m using testosterone for performance. Is gonadorelin actually worth adding to the protocol, or is it just something TRT clinics push to charge more?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Maintains both testosterone and sperm production pathways</strong><br />hCG only mimics LH at the Leydig cell level &mdash; it doesn&rsquo;t drive FSH, which is what sustains sperm production. Gonadorelin drives the pituitary to produce both LH and FSH, which means it supports more of the natural testicular function than hCG alone.</li>
          <li><strong>Legitimate path to preserving future options</strong><br />If fertility is a consideration now or later, maintaining testicular function throughout TRT is far easier than trying to restart after years of suppression. Gonadorelin used consistently gives the axis a periodic activation signal that keeps things from going dormant.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Gonadorelin has a very short half-life &mdash; minutes &mdash; so the twice-daily injection protocol used in most TRT clinics is an approximation of the body&rsquo;s natural pulsatile signaling, not a perfect replication. Whether twice-daily dosing is frequent enough to avoid partial receptor desensitization isn&rsquo;t definitively answered. Some athletes find the injection burden annoying with only modest payoff relative to hCG, which works with less frequent dosing due to its longer half-life. Net: the FSH advantage over hCG is real and meaningful for fertility; whether it translates to meaningfully better testicular function preservation for someone who doesn&rsquo;t care about sperm production is less clear.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; HPG axis optimization, axis physics</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;Gonadorelin is native GnRH &mdash; short half-life, pulsatile requirement, same axis physics as kisspeptin. What&rsquo;s the optimal approach for using it in a TRT protocol without desensitizing the receptor?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The pulsatile physics are mechanistically elegant</strong><br />The same receptor that, when stimulated continuously, produces axis suppression (the mechanism exploited by prostate cancer drugs) produces axis activation when stimulated in pulses. Gonadorelin&rsquo;s short half-life is a feature that makes physiological pulsatility achievable in a way that long-acting GnRH analogs cannot replicate.</li>
          <li><strong>Most physiological TRT adjunct available through legitimate channels</strong><br />Of the three main TRT adjunct options &mdash; hCG (direct Leydig cell stimulation), gonadorelin (pituitary LH+FSH drive), and SERMs like enclomiphene (estrogen feedback blockade) &mdash; gonadorelin most closely approximates the natural hypothalamic-pituitary signaling pattern. For someone who cares about axis physiology rather than just testicular volume metrics, that distinction matters.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The clinical gold standard for gonadorelin-based axis restoration is pump delivery &mdash; used in hypogonadotropic hypogonadism where continuous pulsatile dosing every 60&ndash;120 minutes is required. Twice-daily subcutaneous injections are a practical compromise, not an equivalent. Whether partial receptor desensitization occurs with twice-daily dosing is not conclusively established. Anyone building a precise axis-optimization protocol should be aware that they are extrapolating from pump-delivery data to injection data, and the equivalence is assumed, not proven. Net: the most physiologically coherent TRT adjunct available; the twice-daily injection limitation is real but practically manageable for most protocols.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Gonadorelin is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Not a direct replacement for hCG &mdash; different mechanism, different site of action</li>
              <li>Not effective for primary hypogonadism where the testes themselves are the problem</li>
              <li>Not appropriate during long-acting GnRH agonist therapy &mdash; the receptor is already being suppressed</li>
              <li>Not a &ldquo;more is better&rdquo; compound &mdash; too-frequent dosing risks paradoxical axis suppression</li>
              <li>Not FDA-approved for the TRT adjunct indication specifically &mdash; it&rsquo;s accessed off-label through compounding</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>The most physiologically natural TRT adjunct &mdash; works through the same hypothalamic-pituitary pathway the body uses</li>
              <li>The only common TRT adjunct that drives FSH as well as LH &mdash; relevant for spermatogenesis preservation</li>
              <li>Accessible through legitimate compounding pharmacies with a prescription</li>
              <li>The pulsatile-vs-continuous pharmacology is one of the clearest examples in medicine of how dosing pattern determines whether a drug activates or suppresses a system</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
