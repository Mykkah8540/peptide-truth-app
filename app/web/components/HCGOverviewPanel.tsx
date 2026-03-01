export default function HCGOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        hCG is a hormone naturally produced during pregnancy that mimics LH &mdash; the signal that tells the testes to make testosterone. It has decades of clinical evidence in fertility medicine and is the most common TRT adjunct for keeping testicular function intact while on testosterone. Its one meaningful limitation: it doesn&rsquo;t drive FSH, which matters specifically for sperm production.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Person on TRT or Considering It &mdash; testicular preservation, fertility</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I want to go on TRT but I&rsquo;m not ready to give up on the possibility of having kids someday. What does hCG actually do and is it reliable?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It bypasses the part that TRT shuts down</strong><br />Testosterone therapy suppresses the body&rsquo;s own LH signal, which causes the testes to shrink and stop producing testosterone internally. hCG delivers the LH-like signal directly to the testes, bypassing the pituitary suppression entirely. The testes get stimulated even though the pituitary isn&rsquo;t sending the signal.</li>
          <li><strong>The evidence is real and decades deep</strong><br />hCG has been used in fertility medicine and reproductive endocrinology for a long time. It&rsquo;s not an experimental compound for these purposes &mdash; the pharmacology is well-characterized and physicians who specialize in this area have extensive clinical experience with it.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">hCG maintains testicular volume and the internal testosterone production inside the testes, but it does not drive FSH &mdash; and FSH is what sustains sperm development. For most TRT users who just want to prevent atrophy and preserve future options, hCG is sufficient. For someone who actively needs sperm production right now, hCG alone usually isn&rsquo;t enough; FSH supplementation or gonadorelin (which drives both) may be needed. Also: the testosterone hCG-stimulated testes produce aromatizes to estrogen, so estradiol monitoring is standard. Net: well-established, effective for testicular preservation; fertility restoration specifically requires understanding the FSH piece.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Bodybuilder &mdash; PCT after a cycle, or on-cycle testicular support</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;m planning post-cycle therapy after a steroid cycle. Where does hCG fit in &mdash; during the cycle, after, or both?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It keeps Leydig cells from going dormant during a suppressive cycle</strong><br />A long anabolic cycle without any LH stimulation allows Leydig cells to atrophy. Using hCG during the cycle maintains Leydig cell mass, making PCT and axis recovery faster because you&rsquo;re not starting from a state of severe atrophy.</li>
          <li><strong>Used correctly, it shortens the time to natural testosterone recovery</strong><br />When Leydig cells remain active through a cycle (thanks to hCG), they can respond more quickly once the suppressive compounds clear. Trying to restart severely atrophied testes takes longer and is less reliable.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">hCG is typically stopped before PCT begins, not run concurrently with SERMs like clomiphene &mdash; because hCG suppresses the body&rsquo;s LH production and the whole point of PCT is to restart it. The common mistake is running hCG through PCT, which delays recovery rather than accelerating it. There is also a meaningful estrogen concern: hCG-stimulated testosterone aromatizes readily, and without an aromatase inhibitor, elevated estradiol during PCT can create its own hormonal disruption. Net: effective as a PCT preparation tool and on-cycle support, but timing and estradiol management are where the protocol details actually matter.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; HPG axis, fertility preservation, TRT long-term planning</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;hCG is an LH mimetic that bypasses the pituitary. What does that mean long-term for the HPG axis, and how does it compare to gonadorelin as a TRT adjunct mechanistically?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The pituitary bypass is both the strength and the limitation</strong><br />By acting directly on Leydig cells, hCG works even when the pituitary is fully suppressed &mdash; which is exactly the TRT context. But it means the pituitary itself gets no stimulation and continues to atrophy on the LH side. For long-term axis health, that distinction matters when thinking about what happens after TRT.</li>
          <li><strong>Half-life advantage over gonadorelin for practical dosing</strong><br />hCG&rsquo;s ~24&ndash;36 hour half-life means meaningful dosing every 3&ndash;4 days, rather than gonadorelin&rsquo;s twice-daily requirement. From a protocol-design perspective, less frequent dosing reduces burden and error without sacrificing efficacy for testicular preservation goals.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The choice between hCG and gonadorelin comes down to goals: testicular volume and intratesticular testosterone only (hCG is sufficient), vs. both that and FSH-dependent spermatogenesis (gonadorelin adds FSH drive). For very long-term TRT &mdash; decades &mdash; the pituitary atrophy question becomes more relevant; periodically pausing hCG to allow natural pituitary-LH to re-emerge is a consideration some physicians build into protocols. Monitoring estradiol is non-negotiable with hCG &mdash; the aromatization from hCG-stimulated testosterone is real and consistent. Net: the most practically convenient and evidence-backed TRT adjunct, with gonadorelin worth considering specifically when spermatogenesis matters.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What hCG is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Not a substitute for FSH &mdash; it doesn&rsquo;t drive sperm development on its own</li>
              <li>Not a weight loss compound &mdash; oral &ldquo;hCG diet&rdquo; products have no evidence and FDA has warned against them</li>
              <li>Not appropriate for hormone-sensitive cancers &mdash; it drives testosterone production</li>
              <li>Not equivalent to gonadorelin &mdash; different mechanism, different axis site, different dosing frequency</li>
              <li>Not run simultaneously with SERMs in PCT &mdash; timing matters and concurrent use delays recovery</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>FDA-approved pharmaceutical with decades of reproductive medicine data &mdash; real evidence, not just theory</li>
              <li>Bypasses pituitary suppression entirely &mdash; works even on fully suppressed TRT users</li>
              <li>Long half-life means every 3&ndash;4 day dosing is practical</li>
              <li>Maintains intratesticular testosterone and Leydig cell mass during suppressive therapy</li>
              <li>The most established TRT adjunct available before compounded hCG restrictions changed clinic protocols</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
