export default function GlutathioneOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Glutathione is the main antioxidant your cells make to protect themselves from oxidative damage. It&rsquo;s real, important biology &mdash; but what you actually get from supplementing it depends almost entirely on how you take it. Oral capsules deliver very little to your cells. IV infusions deliver real systemic levels. Liposomal forms sit in between. Most of the marketing glosses over this distinction entirely.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Wellness-Seeker &mdash; detox, skin glow, anti-aging</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My esthetician recommended glutathione IV drips for skin brightening and detox. Is this actually a thing or is it just a spa upsell?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>IV glutathione does reach your blood &mdash; it&rsquo;s not just water</strong><br />Unlike oral pills, IV glutathione bypasses the gut entirely and delivers the compound directly into circulation. Something real is happening pharmacologically, even if the marketed outcomes aren&rsquo;t fully proven.</li>
          <li><strong>The skin brightening mechanism is real in the lab</strong><br />Glutathione inhibits an enzyme involved in melanin production. The mechanism exists. Some people do notice skin tone changes with IV sessions. The biology is not invented.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The gap between &ldquo;the mechanism exists&rdquo; and &ldquo;clinical evidence for consistent skin brightening in humans&rdquo; is large. Multiple studies have looked at this; results are inconsistent and effect sizes are modest. &ldquo;Detox&rdquo; in the marketing sense &mdash; as if glutathione flushes specific toxins &mdash; is not what the biology supports. Glutathione supports your cells&rsquo; own protective systems; it does not target or remove specific toxins the way that claim implies. Net: if you want to try it, IV is the route that actually delivers real levels, but calibrate your expectations away from the marketing language.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Athlete &mdash; recovery, oxidative stress from training</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;Hard training creates oxidative stress. If glutathione is the main antioxidant, does supplementing it speed recovery or reduce muscle damage?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Exercise genuinely depletes glutathione</strong><br />Intense training temporarily reduces intracellular glutathione levels as the antioxidant system is consumed fighting exercise-induced oxidative stress. Restoring those levels faster could theoretically support recovery.</li>
          <li><strong>IV delivery means actual systemic availability</strong><br />For athletes who have access to IV sessions &mdash; common in professional sports and well-resourced training environments &mdash; the delivery route guarantees something real reaches circulation, unlike oral supplements.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Here&rsquo;s the counterintuitive problem: some oxidative stress from exercise is actually the signal that triggers adaptation. Aggressively suppressing it with antioxidants may blunt training gains, not enhance them &mdash; this is a documented concern with high-dose vitamin C and vitamin E supplementation in athletes. Whether glutathione creates the same problem is not well-established. If the goal is support your antioxidant system without potentially interfering with adaptation, N-acetylcysteine (NAC) taken away from training &mdash; not as a direct post-workout suppression &mdash; is the better-studied approach. Net: the biology is relevant to athletes, but routine high-dose glutathione supplementation may not be the right lever.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; longevity, cellular redox, protocol depth</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I understand intracellular GSH is the actual metric. What&rsquo;s the best way to actually raise it &mdash; oral glutathione, NAC, liposomal, or something else entirely?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Intracellular glutathione is a meaningful longevity-adjacent biomarker</strong><br />Glutathione levels decline with age and are lower in multiple chronic disease states. The redox balance between oxidized and reduced glutathione (GSH/GSSG ratio) reflects mitochondrial and cellular health in ways that are measurable and mechanistically relevant to aging biology.</li>
          <li><strong>Multiple evidence-supported routes exist for actually raising intracellular GSH</strong><br />NAC is the rate-limiting precursor for cellular glutathione synthesis and has substantially better oral bioavailability than glutathione itself. Alpha lipoic acid recycles oxidized glutathione back to its active form. Together they address the system from two angles &mdash; upstream synthesis and downstream recycling &mdash; rather than trying to force exogenous GSH through gut degradation.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">For most longevity-oriented protocols, NAC is the better primary intervention for intracellular glutathione support &mdash; more bioavailable orally, clinical evidence from acetaminophen poisoning and respiratory conditions, and it works through the cell&rsquo;s own synthesis machinery. Liposomal glutathione meaningfully improves on standard oral forms and may make sense as an addition. Standard oral glutathione capsules are largely a waste of money for systemic effects. If IV glutathione is accessible and the goal is acute systemic delivery, it does what it claims &mdash; but sustainability and cost are real constraints for ongoing use. Net: NAC first, liposomal GSH as an adjunct, IV for specific acute contexts; don&rsquo;t build your protocol around standard oral glutathione capsules.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Glutathione is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Not a &ldquo;detox&rdquo; agent that removes specific toxins &mdash; that&rsquo;s not the biology</li>
              <li>Not equivalent across delivery routes &mdash; standard oral capsules and IV are not the same intervention</li>
              <li>Not well-evidenced for dramatic, consistent skin brightening</li>
              <li>Not the first choice for raising intracellular GSH orally &mdash; NAC is better for that</li>
              <li>Not safe for inhaled use in people with asthma &mdash; bronchospasm is a documented risk</li>
              <li>Not appropriate during pregnancy without physician guidance &mdash; safety data is insufficient</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>Genuinely central to cellular antioxidant defense &mdash; the biology is real and important</li>
              <li>IV delivery actually reaches systemic circulation &mdash; the route question is solvable</li>
              <li>Specific clinical evidence exists for liver disease and platinum chemotherapy neuroprotection</li>
              <li>The GSH/GSSG redox ratio is a meaningful window into cellular and mitochondrial health</li>
              <li>Liposomal formulations represent a real improvement over standard oral forms</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
