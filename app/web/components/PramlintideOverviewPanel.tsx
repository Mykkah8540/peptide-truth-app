export default function PramlintideOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Pramlintide (Symlin) is the only approved synthetic version of amylin &mdash; a hormone that&rsquo;s supposed to be released alongside insulin after meals to slow digestion, cap glucagon, and signal &ldquo;you can stop eating now.&rdquo; People with diabetes lose this signal when their beta cells fail. Pramlintide restores it, with real Phase 3 clinical trial evidence. The catch that matters most: if you&rsquo;re using it with insulin, you must cut your insulin dose in half when you start, or you risk severe low blood sugar.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Person Managing Diabetes &mdash; post-meal glucose spikes, insulin adjunct</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My insulin handles fasting glucose okay but my after-meal numbers are still a mess &mdash; is there something specifically for that?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It specifically targets the post-meal glucose problem</strong><br />Pramlintide works at the meal level: it slows how fast food leaves your stomach, suppresses the glucagon spike that raises blood sugar after eating, and reduces how much you eat. These three effects together are specifically aimed at the after-meal glucose surge that insulin alone often handles poorly.</li>
          <li><strong>It&rsquo;s based on replacing something that&rsquo;s actually missing</strong><br />In type 1 diabetes, amylin is gone along with insulin. In type 2 diabetes using insulin, amylin secretion is blunted. Pramlintide is a physiological replacement, not a new pharmacological trick &mdash; you&rsquo;re getting back a signal your body is supposed to have.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The HbA1c reduction is real but modest &mdash; about 0.4 to 0.6 percentage points in clinical trials. The weight loss is also real but modest, around 1 to 2 kg over 6 months. This is not a dramatic weight loss drug &mdash; GLP-1 agonists do 10 to 17 times more on weight. The most important practical point: when you add pramlintide to insulin, you cut your mealtime insulin dose by 50% immediately. Not gradually &mdash; immediately. Clinical trials documented severe hypoglycemia in people who skipped that adjustment. Net: a real tool for post-meal glucose management in diabetes, with a critical safety step that is not optional.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Metabolic Health Athlete &mdash; glucose control, satiety, performance nutrition</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;Could pramlintide help with meal size control and post-meal glucose management even without diabetes? How does it compare to just using a GLP-1?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The satiety mechanism is real and mechanistically distinct from GLP-1</strong><br />GLP-1 agonists work partly through fasting appetite suppression and partly post-meal. Amylin&rsquo;s satiety signal is specifically post-meal &mdash; it kicks in after you start eating, not before. For someone who eats fine during the day but overeats at specific meals, that timing difference is meaningful.</li>
          <li><strong>The CagriSema concept validates the amylin + GLP-1 combination logic</strong><br />Pharmaceutical companies are developing combined amylin/GLP-1 drugs because the two pathways are additive &mdash; amylin handles post-meal satiety and gastric emptying, GLP-1 handles fasting suppression and insulin secretion. The clinical interest in combining them is evidence that amylin&rsquo;s contribution is real and complementary.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Pramlintide off-label for non-diabetics is an entirely different evidence picture &mdash; the Phase 3 trials were done in people with diabetes who had a genuine amylin deficiency. In people with normal amylin secretion, there&rsquo;s no established basis for the same benefit, and the hypoglycemia risk changes (lower without insulin, but not zero). For metabolic optimization, the weight loss is modest compared to GLP-1 options. For athletes specifically, the gastric emptying delay could impair carbohydrate absorption around training &mdash; important timing consideration. Net: interesting mechanistic addition to GLP-1, modest standalone effect, evidence is almost entirely diabetes-specific.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Metabolic Biohacker &mdash; amylin axis, appetite neuroscience, GLP-1 combinations</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;What&rsquo;s the actual amylin receptor signaling &mdash; CALCR plus RAMP &mdash; and how does it interact with the GLP-1 pathway? Is the CagriSema story just marketing or genuinely additive?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The CALCR/RAMP complex biology is underappreciated</strong><br />Amylin works through the calcitonin receptor plus receptor activity-modifying proteins (RAMP1 or RAMP3) in the hypothalamus and brainstem &mdash; a different receptor complex from GLP-1R. The two pathways act on overlapping but distinct neural circuits, which is why combining them produces additive effects rather than redundant ones. This receptor complex biology is worth understanding for anyone thinking about metabolic peptide science.</li>
          <li><strong>Pramlintide has uniquely clean clinical data for an amylin compound</strong><br />Everything else in the amylin-axis community discussion &mdash; cagrilintide, AC187 &mdash; is either in development or research. Pramlintide has the only real human Phase 3 data with a controlled comparison group. If you want to understand what amylin receptor activation actually does in humans, pramlintide is the only dataset you have.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The CagriSema combination evidence (roughly 25% weight loss in Phase 3) is not pramlintide evidence &mdash; cagrilintide is a long-acting amylin analog designed for once-weekly dosing, fundamentally different pharmacokinetics from pramlintide&rsquo;s pre-meal injection approach. Extrapolating from cagrilintide data to pramlintide effects is a pharmacokinetic error. For someone using GLP-1 and curious about adding amylin signaling: the combination logic is sound, but pramlintide requires pre-meal injection timing and produces gastric emptying effects that may conflict with exercise windows. The approved GLP-1 + pramlintide combination is not well characterized. Net: fascinating receptor biology, the only human amylin dataset, modest standalone effects that make most sense in the diabetes context.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Pramlintide is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A weight loss drug in the GLP-1 class &mdash; 1 to 2 kg vs. 10 to 17+ kg; entirely different magnitude</li>
              <li>Safe to use with insulin without cutting your mealtime insulin dose by 50% &mdash; this is not optional</li>
              <li>A good fit with gastroparesis &mdash; the gastric slowing effect worsens delayed stomach emptying</li>
              <li>Evidence-backed for people without diabetes &mdash; the trials were done in people with genuine amylin deficiency</li>
              <li>The same as cagrilintide &mdash; CagriSema data does not translate directly to pramlintide expectations</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>The only FDA-approved amylin analog &mdash; the only clean human dataset for amylin receptor activation</li>
              <li>Mechanistically distinct from GLP-1: post-meal satiety timing, glucagon suppression, gastric slowing</li>
              <li>Validates the amylin + GLP-1 combination logic that drives the CagriSema development story</li>
              <li>A physiological replacement approach for a hormone that is genuinely lost in diabetes, not a supraphysiological intervention</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
