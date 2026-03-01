export default function MotsCOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        MOTS-c is a tiny peptide your body makes inside its own mitochondria &mdash; the energy
        factories in your cells. It rises when you exercise and declines as you age, and it&rsquo;s
        caught serious research attention for metabolic health and longevity. The honest caveat: this
        is a 2015 discovery with compelling animal data and almost no human clinical trials yet. Anyone
        using it is working ahead of the evidence.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; metabolic health and energy</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I keep hearing about mitochondria and metabolic health &mdash; is MOTS-c actually something that could help me, or is it just hype?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It&rsquo;s something your own body makes less of as you age</strong><br />Unlike compounds that introduce something foreign, MOTS-c is a peptide your mitochondria produce naturally. Levels measurably rise with exercise and fall with aging &mdash; which makes the story intuitive: supplementing something your body is producing less of feels more rational than adding something synthetic. Whether exogenous supplementation replicates the benefit of endogenous production is the open question, but the narrative is genuinely grounded in biology.</li>
          <li><strong>Insulin sensitivity and metabolic flexibility are real mechanistic targets</strong><br />In animal studies, MOTS-c improves how cells respond to insulin, which is foundational for metabolic health, energy regulation, and body composition. For someone managing metabolic health concerns &mdash; blood sugar, weight, energy fluctuations &mdash; the mechanism is in the right territory, even if the human evidence is thin.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">There are no published human randomized trials for MOTS-c. The evidence in 2026 is animal studies and observational biomarker data. Compared to NAD+ precursors like NMN, which have growing human evidence, MOTS-c is a significantly earlier-stage compound. Anyone using it is essentially participating in uncontrolled human experimentation. That&rsquo;s not a reason to say never &mdash; but it is a reason to be clear-eyed about what &ldquo;evidence&rdquo; means here. Also worth noting: the insulin-sensitizing effects are real enough that interactions with diabetes medications deserve attention. <strong>Net: mechanistically exciting; human proof is not yet there.</strong></p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Athlete &mdash; exercise mimetics and mitochondrial performance</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;MOTS-c rises when you exercise &mdash; does injecting it actually replicate those benefits, or is it more of a recovery support tool?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The &ldquo;exercise mimetic&rdquo; framing is backed by real mechanism</strong><br />In mice, injected MOTS-c improves exercise performance, increases running endurance, and activates some of the same metabolic pathways that exercise activates &mdash; specifically through AMPK, a cellular energy sensor. This is the same pathway activated by metformin and by intense physical activity. Whether this translates meaningfully to humans who are already training is the open question, but the mechanism isn&rsquo;t invented.</li>
          <li><strong>Mitochondrial efficiency as a recovery and performance ceiling</strong><br />Athletes pushing training volumes frequently hit recovery limits that seem to relate to mitochondrial capacity. MOTS-c&rsquo;s signaling role in mitochondrial stress response &mdash; it&rsquo;s released when mitochondria are under metabolic stress, like during exercise &mdash; makes it conceptually interesting as a recovery signal. The hypothesis is that supplementing it might support recovery from high training loads.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The exercise mimetic data is almost entirely from mice. Mice given MOTS-c ran more and performed better on metabolic tests &mdash; but mouse exercise physiology does not reliably predict human athletic performance. The insulin sensitization effects also mean glucose monitoring is relevant for athletes doing carbohydrate periodization, where unexpected changes in insulin sensitivity matter. Supply chain for MOTS-c is also narrower than established community peptides &mdash; quality verification is harder than for longer-established compounds. <strong>Net: biologically plausible for athletes; evidence base is thin; works best as a curiosity investment alongside established recovery tools, not instead of them.</strong></p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; mitochondrial peptides and longevity</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;MOTS-c is encoded by mitochondrial DNA &mdash; what does that actually mean mechanistically, and how does it fit into a longevity stack alongside NAD+ precursors?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The mitochondrial DNA origin is scientifically distinct and meaningful</strong><br />MOTS-c is one of the few known peptides encoded not by nuclear DNA but by the mitochondrial genome &mdash; a separate, ancient genetic system that most of your cells&rsquo; proteins don&rsquo;t use. This suggests mitochondria are doing something beyond energy production: they&rsquo;re sending peptide signals to the rest of the cell (and potentially the body) about metabolic stress state. This is a genuinely novel area of cell biology, not established dogma repackaged.</li>
          <li><strong>AMPK activation sits at the convergence of multiple longevity pathways</strong><br />MOTS-c&rsquo;s primary identified mechanism is AMPK activation &mdash; the same pathway activated by exercise, caloric restriction, metformin, and berberine. AMPK suppresses mTOR (reducing anabolic signaling and promoting autophagy), improves mitochondrial biogenesis, and enhances insulin sensitivity. For a biohacker thinking about convergence points in longevity biology, MOTS-c hits the same nodes as established interventions through a novel upstream mechanism.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">MOTS-c was discovered in 2015. That&rsquo;s ten years of research &mdash; which sounds like a lot until you compare it to NAD+ (decades of research, multiple human trials) or metformin (50+ years of human data). Stacking MOTS-c with NMN or other longevity compounds makes theoretical sense based on complementary mechanisms, but there is no human data on combination effects. The AMPK activation that makes MOTS-c interesting also means it could interfere with anabolic phases &mdash; AMPK and mTOR are in tension, so timing matters if you&rsquo;re trying to build muscle and support longevity simultaneously. <strong>Net: genuinely novel and compelling; requires a high tolerance for uncertainty given the early-stage evidence.</strong></p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What MOTS-c is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A compound with human clinical trial evidence &mdash; the evidence base as of 2026 is animal studies and observational biomarker data</li>
              <li>An established community peptide with years of use data &mdash; it was discovered in 2015 and community use is very early</li>
              <li>A substitute for the foundational longevity interventions (exercise, sleep, diet) that actually raise endogenous MOTS-c</li>
              <li>Safe without attention to blood sugar if you&rsquo;re on glucose-lowering medications &mdash; the insulin-sensitizing effects are real</li>
              <li>Equivalent to NAD+ precursors in evidence depth &mdash; NMN and NR have meaningfully more human data</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>Unique origin from mitochondrial DNA &mdash; suggests mitochondria are metabolic signaling organs, not just energy factories</li>
              <li>Exercise-responsive levels make it conceptually meaningful as an exercise mimetic signal</li>
              <li>AMPK pathway convergence with multiple established longevity interventions</li>
              <li>Age-related decline in levels gives a plausible rationale for supplementation as part of a longevity protocol</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
