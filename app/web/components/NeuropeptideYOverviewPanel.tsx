export default function NeuropeptideYOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Neuropeptide Y is one of the most abundant signaling molecules in your brain and the most
        potent appetite-stimulating compound known in biology. It rises when you diet, drives the
        hunger that derails weight loss, and simultaneously buffers your stress response &mdash; which
        is why chronic dieting and chronic stress interact the way they do. It&rsquo;s not a community
        injection compound. Understanding it explains a lot about why hunger feels the way it does.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; struggling with hunger on a diet</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I keep reading that my body &lsquo;fights back&rsquo; when I diet &mdash; is NPY what&rsquo;s making me so hungry when I&rsquo;m eating less?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Yes &mdash; NPY is literally the fasting hunger signal</strong><br />When your body detects caloric restriction &mdash; falling leptin levels, rising ghrelin &mdash; neurons in your hypothalamus fire off NPY as a hunger alarm. It&rsquo;s one of the primary signals your brain uses to say &ldquo;find food right now.&rdquo; The reason dieting feels like fighting your own brain is that you are: NPY release is part of the biological defense against caloric deficit, and it&rsquo;s powerful. Understanding this is actually validating &mdash; the hunger you feel on a diet isn&rsquo;t a character flaw.</li>
          <li><strong>This is exactly what GLP-1 drugs suppress</strong><br />Semaglutide and tirzepatide reduce appetite partly by suppressing the NPY-producing neurons in the hypothalamus. When people on GLP-1 drugs describe &ldquo;food noise going quiet,&rdquo; they&rsquo;re describing reduced NPY/appetite-circuit activity. Understanding NPY makes the GLP-1 drug mechanism suddenly make intuitive sense.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">There is no way to directly lower NPY in a healthy way without addressing the caloric deficit that causes it to rise &mdash; which creates an obvious chicken-and-egg problem. The practical implications are mostly about strategy: not trying to white-knuckle against a strong biological hunger signal indefinitely, pacing weight loss to avoid the extreme NPY response that comes with very aggressive restriction, and understanding that hunger on a diet is a predictable biological outcome, not a personal failure. <strong>Net: understanding NPY reframes dieting difficulty as biology, not willpower &mdash; which is actually useful.</strong></p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Athlete &mdash; stress, eating, and cutting phases</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;m in a caloric deficit for competition prep and stress makes the hunger so much worse &mdash; what&rsquo;s the connection between training stress and appetite?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>NPY connects caloric deficit and training stress into a compounding hunger response</strong><br />Athletes doing high training volume while in a caloric deficit are hitting NPY from two directions simultaneously: the restriction raises hypothalamic NPY appetite drive, and the training stress activates sympathetic NPY release (NPY is co-released with norepinephrine from sympathetic neurons during exercise). This is part of why competitive cut phases feel so much harder than casual dieting &mdash; the biological hunger pressure is amplified by the training load itself.</li>
          <li><strong>Chronic caloric restriction chronically elevates NPY &mdash; explaining rebound hunger</strong><br />Yo-yo dieters and people in extended cuts show chronically elevated NPY that can persist even after restriction ends. This is the biological mechanism behind rebound appetite and the &ldquo;it feels like nothing is enough to feel full&rdquo; experience after a long cut. For athletes, understanding this helps make sense of why returning to maintenance after a competition prep phase often involves a period of feeling insatiably hungry.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">There is no exogenous NPY use case for athletes that makes any sense &mdash; injecting the strongest appetite stimulator known into someone trying to stay lean is obviously counterproductive. The value here is mechanistic understanding that informs strategy: pacing the cut, managing training load relative to the deficit severity, and not interpreting the intense hunger of a cut phase as something that should be pushed through indefinitely without consequence. The NPY system does adapt down with time, but it takes weeks, not days. <strong>Net: explains the cutting phase experience; no supplementation angle; informs pacing and recovery strategy.</strong></p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; appetite circuits and stress resilience</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;NPY is the stress resilience peptide in military studies and the appetite stimulator in the hypothalamus &mdash; how do those functions fit together and what does it tell us about NPY-adjacent drug targets?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The stress resilience data is counterintuitive and compelling</strong><br />Multiple studies in special forces soldiers found that higher NPY plasma levels correlate with lower PTSD severity and better stress coping. NPY appears to counteract the stress-amplifying molecule CRF in the brain&rsquo;s noradrenergic nucleus &mdash; acting as a stress buffer. Higher endogenous NPY doesn&rsquo;t mean more hungry; it means more resilient under stress. This dual-role biology (appetite driver centrally via one receptor subtype; stress buffer via another) is pharmacologically sophisticated and explains why simple manipulation of the system doesn&rsquo;t achieve what you&rsquo;d hope.</li>
          <li><strong>Understanding NPY contextualizes GLP-1 drug mechanisms and appetite pharmacology more broadly</strong><br />GLP-1 receptor agonists reduce appetite partly by suppressing the same NPY/AGRP neuron population in the hypothalamus that drives hunger. Knowing this helps evaluate GLP-1 drug mechanisms, understand why appetite suppression from GLP-1 drugs is so robust compared to older obesity medications, and think about what receptor-selective NPY-targeting drugs might look like if they eventually emerge from development.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The stress resilience association with high NPY creates a misleading logic: if high NPY correlates with resilience, maybe supplementing NPY improves resilience. But systemic NPY injection activates all receptor subtypes across the body simultaneously &mdash; appetite drive (hypothalamic Y1/Y5), vasoconstriction (peripheral Y1 in blood vessels), and stress buffering (central Y2) all happen at once. You can&rsquo;t selectively get the stress buffer effect without also getting significant appetite stimulation and blood pressure elevation. Receptor-selective Y2 agonists would be the pharmacologically rational approach, but no such approved compound exists. <strong>Net: the NPY biology is essential context for understanding appetite and stress pharmacology; the compound itself is not a target for injection use.</strong></p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Neuropeptide Y is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A compound you would ever inject for enhancement &mdash; it&rsquo;s the strongest appetite stimulator known; injecting it undermines almost every body composition goal</li>
              <li>A stress resilience supplement &mdash; systemic injection activates appetite and vasoconstriction receptors simultaneously with the resilience pathway</li>
              <li>Something with FDA-approved drugs targeting it yet &mdash; no NPY-based therapeutics have reached approval</li>
              <li>The cause of dieting difficulty that you can fix by taking something &mdash; it&rsquo;s the biological response to restriction, addressed by managing the restriction itself</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>The primary biological mechanism behind calorie-restriction hunger &mdash; understanding it reframes dieting difficulty as physiology</li>
              <li>The stress resilience association in military cohorts is real, replicated science</li>
              <li>Understanding NPY/AGRP neuron biology explains why GLP-1 drugs are so effective at suppressing appetite</li>
              <li>The Y-receptor subtype complexity is a model case for why receptor selectivity matters in drug design</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
