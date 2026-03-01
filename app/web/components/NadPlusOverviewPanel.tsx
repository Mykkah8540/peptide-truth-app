export default function NadPlusOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        NAD+ is a molecule every cell in your body uses to convert food into energy and run its DNA
        repair machinery &mdash; and levels drop significantly as you age. The science behind the decline
        is real and well-established. The clinical evidence that supplementing NAD+ actually improves
        your health outcomes is still catching up to the hype. That gap is what you&rsquo;re navigating.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; energy and feeling better</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;m tired all the time and I keep seeing NAD+ for energy &mdash; is this actually worth trying or is it just expensive nonsense?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The mechanism connecting NAD+ to energy is real</strong><br />NAD+ sits at the center of cellular energy production &mdash; it&rsquo;s the molecule that shuttles electrons through the process your cells use to make ATP from food. When NAD+ levels decline, cellular energy production becomes less efficient. This isn&rsquo;t a supplement marketing claim; it&rsquo;s established biochemistry. Whether that mechanism translates to you feeling more energetic from supplementation is a different, harder question.</li>
          <li><strong>OTC access and no prescription needed</strong><br />NAD+ precursors like NMN and NR (which convert to NAD+ inside cells) are available over the counter as supplements. IV NAD+ infusions are available at wellness clinics. Unlike most longevity-adjacent compounds, you don&rsquo;t need a doctor to access the primary forms &mdash; which means you can try them without a lot of friction.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Most people who take oral NAD+ precursors describe the effects as subtle &mdash; &ldquo;a bit more energy&rdquo; or &ldquo;I think I&rsquo;m sleeping better,&rdquo; not a dramatic shift. IV infusions produce more noticeable acute sensations (flushing, warmth, sometimes nausea) but whether that translates to lasting benefit beyond the session is genuinely unclear. If you&rsquo;re on PARP-inhibitor chemotherapy, this is a direct drug conflict &mdash; NAD+ is involved in the same pathway those drugs target. For everyone else, the risk profile is low and the mechanism is reasonable; the uncertainty is just whether it does what you hope. <strong>Net: the biology is real; the personal outcome is uncertain and usually subtle.</strong></p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Athlete &mdash; performance, recovery, and cellular repair</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I push hard in training and recovery is my limiting factor &mdash; can NAD+ actually help with cellular repair after exercise?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>DNA repair and cellular recovery are NAD+-dependent processes</strong><br />Exercise creates real cellular stress &mdash; oxidative damage, micro-tears, and the kind of cellular disruption that requires active repair to adapt and strengthen. NAD+ is required by the enzymes (sirtuins and PARPs) that perform much of this repair work. The hypothesis that optimizing NAD+ levels supports better recovery is mechanistically grounded in how those repair pathways actually function.</li>
          <li><strong>Mitochondrial function and endurance efficiency</strong><br />NAD+ is central to how mitochondria produce energy during aerobic exercise. Higher NAD+ availability could theoretically improve mitochondrial efficiency during sustained efforts. Some small studies have shown improvements in muscle function and endurance markers, though the effect sizes are modest and the study populations often older adults rather than trained athletes.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The athlete-specific evidence is thin. Most human studies on NAD+ precursors have been done in sedentary or older populations, not in trained athletes already optimizing nutrition and recovery. The incremental benefit of NAD+ optimization on top of a well-designed training and nutrition program is genuinely unknown. Cost-benefit matters here: IV NAD+ sessions are expensive, and oral NMN/NR at effective doses is a recurring supplement cost. Before layering this in, the foundational recovery variables (sleep, protein intake, periodization) matter more and are better evidenced. <strong>Net: mechanistically plausible as a recovery support; evidence specific to trained athletes is thin; cost matters.</strong></p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; longevity, sirtuins, and the NAD+ stack</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;m building a longevity protocol &mdash; should I be taking direct NAD+, NMN, or NR? And how does this interact with sirtuins and everything else I&rsquo;m stacking?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The sirtuin connection makes NAD+ a longevity pathway hub</strong><br />Sirtuins &mdash; the enzymes most directly linked to caloric restriction and longevity research in model organisms &mdash; require NAD+ to function. Without adequate NAD+, sirtuins slow down regardless of activation. This makes NAD+ a rate-limiting input for one of the most-studied longevity pathways, which is why researchers like David Sinclair have positioned it as foundational. The mechanism linking NAD+ to sirtuin activity to aging biology is well-documented at the cellular level.</li>
          <li><strong>The NMN vs NR vs direct NAD+ question has a nuanced answer</strong><br />These three forms are not interchangeable in practice. Oral NAD+ is largely degraded before reaching cells. NR has the most confirmed human bioavailability data &mdash; it demonstrably raises blood NAD+ in human trials. NMN has similar or slightly better cell penetration in some studies and growing human trial evidence. Direct IV NAD+ bypasses the bioavailability problem entirely. Understanding the differences matters for making rational choices about form, dose, and cost.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The core problem with longevity NAD+ research is that the outcomes that matter &mdash; actually living longer, reduced age-related disease, maintained cognitive function &mdash; take decades to measure and haven&rsquo;t been measured in large human trials. The mechanism is compelling. The cellular and biomarker evidence is growing. But the clinical endpoint evidence doesn&rsquo;t yet exist at the scale that would constitute proof. Stacking NMN, NR, and direct IV NAD+ simultaneously is redundant &mdash; they&rsquo;re competing for the same metabolic pathway. Pick a form based on bioavailability and cost, not the assumption that more pathways equals more benefit. <strong>Net: the best-evidenced longevity molecule below the clinical proof threshold; rational to include in a serious stack with appropriate expectations.</strong></p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What NAD+ is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A compound with proven longevity outcomes in humans &mdash; the mechanism is established, the clinical endpoint evidence is not</li>
              <li>Something that produces dramatic, fast-acting results you&rsquo;ll clearly feel &mdash; effects when they happen are typically subtle and cumulative</li>
              <li>Safe to combine with PARP-inhibitor chemotherapy &mdash; this is a direct pharmacological conflict requiring oncology review</li>
              <li>Something where stacking all three forms (NAD+, NMN, NR) simultaneously adds benefit &mdash; it&rsquo;s redundant, not additive</li>
              <li>Uniquely powerful compared to lifestyle interventions that also raise NAD+ &mdash; exercise is one of the most effective ways to elevate NAD+ endogenously</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>Real, well-documented age-related decline in NAD+ levels &mdash; not a manufactured problem</li>
              <li>Central role in DNA repair machinery, mitochondrial function, and sirtuin activity &mdash; genuine longevity biology convergence</li>
              <li>OTC access with no prescription required, giving low-friction entry</li>
              <li>Growing human bioavailability and biomarker trial data for NMN and NR, unlike most longevity compounds</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
