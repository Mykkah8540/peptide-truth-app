export default function VasopressinOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Vasopressin is a hormone your hypothalamus produces that controls water retention, blood pressure, and certain stress responses. It&rsquo;s FDA-approved for diabetes insipidus and vasodilatory shock — both serious medical conditions. Community interest centers on intranasal vasopressin for memory and social cognition, extrapolating from oxytocin research, but the human evidence is inconsistent and the vasoconstriction risk that doesn&rsquo;t exist with oxytocin is real here.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; Water Regulation and Hyponatremia Curiosity</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My doctor mentioned my sodium is low or my kidneys aren&rsquo;t concentrating urine normally. I&rsquo;ve seen references to vasopressin and desmopressin. What&rsquo;s actually happening here?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re looking into it</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Diabetes insipidus (the non-sugar kind) is a vasopressin deficiency</strong><br />There are two kinds of diabetes insipidus. The central form involves insufficient vasopressin production from the hypothalamus. The result: the kidneys can&rsquo;t concentrate urine, so people produce enormous volumes of dilute urine and are constantly thirsty. Vasopressin or its analog desmopressin (DDAVP) is the treatment — it restores the signal the kidneys need to retain water.</li>
          <li><strong>Hyponatremia — low sodium — has a well-characterized vasopressin connection</strong><br />When vasopressin is chronically elevated (from illness, certain medications, or endurance sports), the kidneys retain too much water, diluting sodium levels dangerously. Understanding vasopressin&rsquo;s role clarifies why hyponatremia management often involves fluid restriction rather than sodium supplementation alone.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">For someone with diabetes insipidus, the appropriate treatment is desmopressin (DDAVP), not native vasopressin. Desmopressin was specifically engineered to be more selective for the water-retention receptor (V2) with reduced blood pressure effects (V1a). Native vasopressin hits all three receptor subtypes simultaneously — water retention, vasoconstriction, and cortisol stimulation — which desmopressin avoids. Management of DI is through a physician with ongoing sodium and urine osmolality monitoring. Net: the pharmacology is well-characterized and the clinical treatment pathway is clear — desmopressin, not native vasopressin, for DI management.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Athlete &mdash; Hydration Physiology and Performance</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I train hard in the heat and worry about sodium and hydration during long sessions. I keep seeing references to vasopressin and ADH. What should I actually understand about this?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Vasopressin is the hormone that actually controls water retention during exercise</strong><br />When you sweat and become dehydrated, plasma osmolality rises and vasopressin secretion from the pituitary increases — telling your kidneys to retain water. This is the core mechanism behind why dehydrated runners produce concentrated dark urine. Understanding this axis is fundamental to understanding why hydration strategies work or don&rsquo;t.</li>
          <li><strong>Exercise-associated hyponatremia is a real and dangerous phenomenon</strong><br />Long-distance athletes who drink excessive plain water during events can develop dangerously low sodium — not from too little salt, but from dilution driven partly by vasopressin-mediated water retention combined with excess water intake. Deaths have occurred. Understanding vasopressin&rsquo;s role makes this risk physiologically comprehensible and preventable.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">There is no established role for exogenous vasopressin supplementation in athletic performance or hydration optimization. Athletes should understand the physiological system, not try to manipulate it pharmacologically. The practical takeaway is about sports drink formulation and sodium intake during long events — not about vasopressin supplementation. Any exogenous vasopressin will also activate the vasoconstriction pathway, elevating blood pressure in a way that is not beneficial during exercise. Net: essential physiology to understand, wrong pharmacological conclusion to draw from it.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; Memory, Social Cognition, and Receptor Pharmacology</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;The rodent memory consolidation data for vasopressin is interesting, and it&rsquo;s structurally close to oxytocin. But the human evidence for intranasal vasopressin is inconsistent. What does the actual pharmacology tell us about whether this could work?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The rodent memory and spatial cognition data is more consistent than the human data</strong><br />Animal studies show vasopressin facilitates memory consolidation and social recognition through central nervous system pathways. These findings are relatively robust in rodents, and the vasopressin-immunoreactive neurons in hippocampus and amygdala are real anatomical features. The data created legitimate research interest, even if the human story is less clean.</li>
          <li><strong>The receptor divergence from oxytocin is pharmacologically meaningful</strong><br />Vasopressin and oxytocin differ by two amino acids, but those differences produce distinct receptor binding profiles. Vasopressin has meaningful activity at V1a (vasoconstriction) and V1b (ACTH/cortisol) receptors; oxytocin has much less V1a activity and a distinct receptor distribution. That&rsquo;s not just a technical detail — it&rsquo;s why vasopressin and oxytocin have different risk profiles despite their structural similarity.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Human intranasal vasopressin studies for social cognition have produced genuinely inconsistent results — including some studies where vasopressin impaired facial emotion processing rather than improving it. The &ldquo;vasopressin is the social bonding peptide for men&rdquo; narrative significantly overstates what the evidence supports. The V1a vasoconstriction pathway creates a blood pressure effect that doesn&rsquo;t exist with oxytocin — at any dose that produces a meaningful cognitive or social effect, you&rsquo;re also likely producing a cardiovascular effect. And the short half-life (10-20 minutes) means you&rsquo;re fighting pharmacokinetics constantly with intranasal delivery. Net: interesting mechanistic territory, but the human evidence doesn&rsquo;t support confident self-administration, and the cardiovascular signal makes the risk-benefit calculation unfavorable compared to the evidence base.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Vasopressin is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>The same as oxytocin — two amino acid differences produce meaningfully different receptor selectivity and safety profiles</li>
              <li>Proven for memory or social cognition in humans — the evidence is inconsistent, with some studies showing unexpected negative effects</li>
              <li>Safe for people with hypertension or cardiovascular disease — vasoconstriction is a real pharmacological effect, not a theoretical risk</li>
              <li>Equivalent to desmopressin — desmopressin was engineered specifically to reduce the vasoconstriction of native vasopressin</li>
              <li>A community peptide with an established optimization use case — the approved indications are DI and vasodilatory shock, both serious medical conditions</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>The three-receptor divergence (V1a, V1b, V2) is one of the more mechanistically rich examples of a single hormone producing functionally distinct physiological effects</li>
              <li>The ADH/water retention mechanism is fundamental to understanding exercise-associated hyponatremia and renal physiology</li>
              <li>Rodent memory consolidation and social recognition data created legitimate research interest in CNS vasopressin function</li>
              <li>FDA-approved for real clinical indications — the pharmacology is well-characterized in DI and shock contexts</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
