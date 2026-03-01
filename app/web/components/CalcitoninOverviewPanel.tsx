export default function CalcitoninOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Calcitonin is a hormone the thyroid gland releases to slow bone breakdown and lower blood calcium levels. It was used as a treatment for osteoporosis for decades until the FDA found that people in clinical trials who took calcitonin nasal spray had higher rates of cancer than those on placebo &mdash; leading manufacturers to pull the osteoporosis formulation in 2013. It still has FDA-approved uses for Paget&rsquo;s disease of bone and for rapidly lowering dangerously elevated calcium. Nobody uses it as a community peptide. This page is for people navigating bone disease treatment decisions and wanting to understand where calcitonin stands today.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; recently diagnosed with osteoporosis or Paget&rsquo;s disease</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My doctor mentioned calcitonin as a possible treatment. I&rsquo;ve also heard that it was pulled from the market. Is it safe, and is it still used?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re looking into this</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Calcitonin was the mainstay osteoporosis treatment for years</strong><br />For a long time, calcitonin nasal spray was widely prescribed for postmenopausal bone loss. Millions of people used it. It&rsquo;s still mentioned in older patient materials and some doctor conversations, so people naturally want to understand its current status and whether the concerns they heard are real.</li>
          <li><strong>The cancer signal changed its standing</strong><br />The FDA reviewed pooled data from multiple calcitonin clinical trials and found that patients taking calcitonin had higher rates of various cancers compared to placebo &mdash; roughly 2.4% vs. 1.9%. That difference led the advisory committee to conclude the risk-benefit no longer supported its use for osteoporosis. The nasal spray formulations were withdrawn. The injectable formulation for Paget&rsquo;s disease and hypercalcemia was not withdrawn because those conditions are serious enough that the calculation is different.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">For osteoporosis specifically: bisphosphonate drugs (alendronate, zoledronic acid) and denosumab have substantially stronger fracture reduction evidence and no cancer signal. They are the appropriate first-line choices, and calcitonin is not recommended for osteoporosis in current clinical guidelines. For Paget&rsquo;s disease or acute hypercalcemia, the injectable remains in use under physician supervision because the alternatives are limited and the disease severity justifies the risk. Net: not appropriate for self-directed use in any form; if your physician recommends it for Paget&rsquo;s or hypercalcemia, that is a context-specific clinical decision with appropriate monitoring.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Athlete &mdash; interested in bone density optimization</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I want to optimize my bone density long-term. Is calcitonin something athletes or active people use for bone health, and does it actually work for that purpose?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Bone density matters for athletic longevity</strong><br />Stress fractures, bone stress injuries, and long-term skeletal health are real concerns for athletes &mdash; especially those with high training loads, low body weight, or hormonal changes (the female athlete triad context). Understanding what drugs affect bone biology is a reasonable thing to research even if the answer is that the drug isn&rsquo;t appropriate for your situation.</li>
          <li><strong>Anti-resorptive agents do affect bone density measurements</strong><br />Calcitonin does slow bone breakdown and produce small increases in measured bone density. The clinical question is whether those measured density improvements translate to fracture protection &mdash; and for calcitonin, the fracture evidence was always weaker than for bisphosphonates.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Calcitonin is not appropriate for an athlete pursuing bone density optimization. The 2013 cancer signal makes the risk-benefit calculation unfavorable for non-clinical use. Calcitonin produced only 1-2% BMD improvement per year in trials &mdash; substantially less than bisphosphonates &mdash; and fracture reduction evidence was inconsistent. For athletes concerned about bone density, the evidence-based interventions are weight-bearing exercise, adequate calcium and vitamin D, hormonal optimization (where relevant), and addressing any underlying energy availability deficit. If bone loss is clinically significant, bisphosphonates or denosumab under physician guidance are the appropriate pharmacological options. Net: calcitonin is a clinical drug with a documented cancer signal &mdash; not a bone optimization compound for athletes.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; interested in bone biology and the calcitonin receptor family</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;The calcitonin receptor is also the RAMP partner for the amylin receptor in cagrilintide and related compounds. How does calcitonin&rsquo;s receptor biology connect to those peptides, and what does the 2013 cancer signal tell us about the receptor&rsquo;s broader biology?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The calcitonin receptor is the anchor of a receptor family with broad tissue expression</strong><br />The calcitonin receptor (CALCR) forms functional heterodimers with RAMP proteins to create the amylin receptor (CALCR + RAMP1/3) and the intermedin/CGRP receptor variants. Calcitonin itself activates CALCR directly. Understanding calcitonin&rsquo;s pharmacology &mdash; including osteoclast inhibition through CALCR and the downstream signaling pathways &mdash; provides context for understanding why drugs targeting adjacent receptors in this family carry the same thyroid C-cell tumor warning in their prescribing information.</li>
          <li><strong>Salmon calcitonin&rsquo;s immunogenicity is a useful pharmacology lesson</strong><br />The clinical formulation uses salmon calcitonin rather than human calcitonin because salmon calcitonin binds the human receptor with 40-50x higher affinity &mdash; a cross-species receptor optimization that is pharmacologically elegant. But the foreign protein triggers antibody formation in some patients over time, reducing efficacy. This antibody development is a real clinical problem in Paget&rsquo;s disease management that distinguishes calcitonin from synthetic small molecules and more recently engineered biologics.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The 2013 cancer signal from calcitonin nasal spray is not fully mechanistically explained &mdash; it was a pooled statistical finding across multiple cancer types with no dominant single cancer type, which makes it harder to attribute to a specific receptor-mediated mechanism. The calcitonin receptor is expressed in various tissues including some tumors, and CALCR agonism could theoretically promote certain tumor-relevant pathways, but the mechanism is not characterized. The class-level thyroid C-cell warning that applies to GLP-1 and amylin analogs is related to CALCR activation in thyroid tissue &mdash; calcitonin&rsquo;s history provides some empirical background for why that warning exists. Net: important receptor family to understand for anyone following the GLP-1 and amylin drug landscape; the calcitonin cancer signal is a real regulatory event with incompletely characterized mechanism.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Calcitonin is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>An appropriate osteoporosis treatment in current guidelines &mdash; withdrawn due to cancer signal; bisphosphonates are preferred</li>
              <li>A safe community or biohacker bone optimization compound</li>
              <li>Equivalent in anti-resorptive strength to bisphosphonates &mdash; calcitonin produces weaker fracture protection</li>
              <li>Risk-free because it&rsquo;s a hormone &mdash; the 2013 cancer signal is a real regulatory finding</li>
              <li>A different compound from its approved injectable version (Miacalcin) vs. the withdrawn nasal spray &mdash; same active molecule, different route, both carry the underlying concern</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>Anchor compound for the CALCR receptor family that includes the amylin and CGRP receptor variants</li>
              <li>Salmon calcitonin&rsquo;s 40-50x receptor affinity over human calcitonin is a remarkable cross-species pharmacology example</li>
              <li>Still has genuine clinical utility for Paget&rsquo;s disease and acute hypercalcemia where alternatives are limited</li>
              <li>The 2013 cancer signal is a real-world example of post-approval pharmacovigilance changing an established drug&rsquo;s role</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
