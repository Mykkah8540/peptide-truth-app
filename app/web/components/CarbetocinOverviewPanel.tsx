export default function CarbetocinOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Carbetocin is a synthetic, longer-lasting version of oxytocin used in hospitals to prevent life-threatening bleeding after childbirth. Its primary advantage over natural oxytocin is that it works long enough with a single dose rather than requiring prolonged IV infusion. It is listed as a WHO essential medicine and is approved across most of the world except the United States, where oxytocin remains standard. Nobody uses carbetocin outside its obstetric indication, and it is not available through gray markets. This page exists because oxytocin biology &mdash; social bonding, trust, and its broader neurological role &mdash; generates genuine curiosity, and carbetocin is the pharmacological relative that illuminates that biology.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; interested in oxytocin as the &ldquo;bonding hormone&rdquo;</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I keep hearing oxytocin called the love hormone or bonding hormone. Is carbetocin the same thing? Can you take something to boost it for social connection or trust?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Oxytocin genuinely plays a role in social bonding and trust</strong><br />The &ldquo;love hormone&rdquo; framing isn&rsquo;t invented &mdash; oxytocin is released during physical touch, eye contact, and close social interaction. It is involved in the neurobiology of trust and social bonding. The question of whether you can meaningfully enhance these feelings pharmacologically is genuinely interesting to people who want stronger social connections or are navigating relationship difficulties.</li>
          <li><strong>Intranasal oxytocin is a real research area</strong><br />Researchers have studied intranasal oxytocin sprays in clinical trials for autism, social anxiety, and postpartum depression. The existing research context creates reasonable curiosity about whether the related compound carbetocin might have similar or enhanced effects given its longer duration of action compared to native oxytocin.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Carbetocin is not the same thing as intranasal oxytocin and is not available for self-directed use. The intranasal oxytocin research for social effects has produced mixed results &mdash; some studies show social benefit, many others do not replicate, and the consensus in the field is that the effects are smaller and more context-dependent than early headlines suggested. Carbetocin&rsquo;s hospital use is for a completely different purpose (uterine contraction) and its pharmacological profile is not evaluated for social or psychological effects. Net: the oxytocin biology is real and interesting; carbetocin is a surgical obstetric tool, not a social bonding compound.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Health-Curious Reader &mdash; researching postpartum care and oxytocin&rsquo;s role after birth</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;m either pregnant or supporting someone who is. What is carbetocin actually used for and why do hospitals use it instead of regular oxytocin in some countries?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Postpartum hemorrhage is the leading cause of maternal death worldwide</strong><br />After delivery, the uterus must contract firmly to prevent excessive bleeding. If it fails to contract &mdash; a condition called uterine atony &mdash; blood loss can become life-threatening very quickly. Giving oxytocin-class drugs after delivery to cause uterine contraction is one of the most important interventions in obstetrics. Carbetocin is one of the drugs used for this purpose in countries where it is approved.</li>
          <li><strong>The single-dose advantage is clinically meaningful</strong><br />Natural oxytocin has a half-life of about 3 minutes and requires continuous IV infusion to maintain its effect. Carbetocin&rsquo;s structural modifications extend its half-life to about 40 minutes, which is long enough that a single injection (either IV or intramuscular) can provide sufficient uterine tone without an infusion. In busy delivery settings and particularly in lower-resource environments, a single-injection alternative to an oxytocin infusion has significant practical advantages.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The CHAMPION trial &mdash; a 29,645-patient study across 23 countries &mdash; showed carbetocin is as effective as oxytocin for preventing postpartum hemorrhage after cesarean section, with a comparable safety profile. This is a solidly established clinical result. The reason carbetocin is not FDA-approved in the US is not a safety concern &mdash; it is a regulatory pathway and market economics question. Oxytocin infusion is the standard of care in the US and works well; there was no FDA approval pathway pursued for carbetocin. In clinical practice outside the US, carbetocin and oxytocin are both appropriate options. Net: well-evidenced obstetric drug with a pragmatic advantage in delivery settings, not approved in the US for regulatory rather than safety reasons.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Neuroendocrine Biohacker &mdash; mapping the oxytocin receptor system and related peptide pharmacology</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I want to understand the structural modifications that distinguish carbetocin from oxytocin, what they do to receptor selectivity and half-life, and how this connects to the broader OTR vs. AVP receptor pharmacology landscape.&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The structural modifications are a pharmacology lesson in half-life engineering</strong><br />Oxytocin is a 9-amino-acid cyclic peptide with a disulfide bond between cysteines at positions 1 and 6. Carbetocin modifies oxytocin at three positions: the disulfide bond is replaced with a more stable thioether linkage at position 1; the N-terminus is blocked with a 1-butanoic acid group; and tyrosine at position 2 is replaced with O-methyltyrosine. These changes dramatically reduce enzymatic degradation by aminopeptidases and oxytocinase, extending the half-life from ~3 minutes to ~40 minutes while maintaining oxytocin receptor agonism. This is a textbook example of metabolic stability engineering in peptide drug development.</li>
          <li><strong>Oxytocin receptor vs. vasopressin receptor selectivity is clinically important</strong><br />Oxytocin and vasopressin (also called ADH) share a similar peptide structure and have overlapping receptor affinities. High-dose oxytocin can activate vasopressin receptors, causing water retention and potentially dangerous hyponatremia. Carbetocin&rsquo;s structural modifications affect its receptor selectivity profile &mdash; understanding the OTR vs. V1a/V1b/V2 receptor cross-reactivity for carbetocin compared to oxytocin has clinical implications for its side effect profile and for understanding why structural optimization matters beyond just half-life.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The intranasal oxytocin research for social and psychological applications &mdash; which is the area most relevant to biohacker interest in this peptide family &mdash; has not translated carbetocin into a viable off-label social compound. The 40-minute half-life makes carbetocin less appropriate for intranasal CNS delivery than native oxytocin (which is specifically short-acting in ways that may be important for the pulsatile nature of oxytocin&rsquo;s physiological signaling). The robust clinical literature on carbetocin is entirely in the obstetric context. There are no pharmacokinetic studies of intranasal carbetocin for CNS delivery or social applications. Net: excellent pharmacology education on peptide half-life engineering; not a practical target for biohacker application given both the obstetric-only approval context and the availability-through-hospitals-only supply chain.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Carbetocin is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A social bonding or trust-enhancing compound available outside of clinical obstetric settings</li>
              <li>Available through gray markets or for community self-administration</li>
              <li>FDA-approved &mdash; not because of safety concerns but because the US regulatory pathway was not pursued</li>
              <li>An enhanced version of intranasal oxytocin for psychological applications &mdash; different use case entirely</li>
              <li>Interchangeable with oxytocin at an equivalent dose &mdash; longer half-life changes the entire dosing context</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>A textbook example of rational peptide half-life engineering through structural modification of a natural hormone</li>
              <li>WHO essential medicine with a large global RCT (29,645 patients) demonstrating non-inferiority to oxytocin</li>
              <li>Single-dose administration advantage has real impact on maternal health in lower-resource delivery settings</li>
              <li>The oxytocin receptor pharmacology it illustrates is relevant to understanding the broader neuroendocrine bonding system</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
