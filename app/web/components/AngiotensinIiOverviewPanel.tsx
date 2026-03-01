export default function AngiotensinIiOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Angiotensin II is a hormone your body makes to raise blood pressure when it drops — it constricts blood vessels and tells the kidney to hold onto sodium and water. It&rsquo;s also an FDA-approved emergency ICU drug (Giapreza) for patients in severe shock whose blood pressure won&rsquo;t respond to standard treatments. There is no community use, no off-label application, and no reason anyone outside of an intensive care unit would encounter it as a therapeutic. This page is for understanding the biology.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Patient or Caregiver — Encountered this in a clinical context</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My family member was in the ICU and the team mentioned they were giving them something called angiotensin II. I know what blood pressure is but not what this actually does or why they&rsquo;d use it.&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It addresses a specific problem standard medications can&rsquo;t solve</strong><br />In severe septic shock, blood pressure crashes because blood vessels relax uncontrollably. The standard drugs for this (adrenaline-like medications that squeeze vessels) stop working at high doses in some patients. Angiotensin II works through a completely different mechanism — it contracts blood vessels and tells the kidneys to retain fluid through its own separate pathway. When everything else has failed, adding a drug that works differently can be the intervention that stabilizes a critically ill patient.</li>
          <li><strong>The approval came from a real clinical trial with real outcomes</strong><br />The drug was approved based on a randomized controlled trial showing that patients who received it were more likely to reach blood pressure targets than those who received placebo — and some analyses suggested survival benefit in patients whose natural angiotensin II was abnormally low. That is a meaningful result in a population where the stakes are life and death.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">This is a continuous intravenous infusion that requires moment-to-moment hemodynamic monitoring in an ICU setting. It has a black box warning for blood clots — something that intensivists are aware of and manage, but that underscores this is not a benign drug. It is also not a treatment for general low blood pressure, dehydration, or anything outside of refractory distributive shock. If your family member is receiving it, they are in a critical care context with trained specialists monitoring every parameter. Net: a legitimate and meaningful tool for a narrow and serious emergency application — completely outside the domain of anything someone would use outside of an ICU.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Curious Reader — Interested in understanding blood pressure and the drugs that target it</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I take an ACE inhibitor for blood pressure. My doctor says it works by blocking something called the renin-angiotensin system. Is angiotensin II that thing? What does the system actually do?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Understanding angiotensin II explains how the most commonly prescribed drugs work</strong><br />ACE inhibitors (lisinopril, ramipril) and ARBs (losartan, valsartan) are among the most prescribed medications in the world. Both work by reducing or blocking angiotensin II&rsquo;s effects. Understanding what angiotensin II does — raise blood pressure by constricting vessels and causing the kidney to retain salt — immediately explains why blocking it lowers blood pressure and protects the kidneys.</li>
          <li><strong>It&rsquo;s a master hormone that controls multiple systems at once</strong><br />Angiotensin II doesn&rsquo;t just squeeze blood vessels. It also triggers aldosterone release from the adrenal gland (which makes the kidney hold onto sodium and water), it acts directly on the kidney to reabsorb sodium, and it stimulates thirst. One hormone coordinating vessel tone, kidney function, adrenal output, and fluid intake is a striking example of how tightly integrated cardiovascular regulation is.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">There is nothing actionable here for a typical person managing blood pressure. Angiotensin II itself is not something to take — it raises blood pressure, which is the opposite of what most people managing this condition need. The relevant takeaway is understanding why your blood pressure medications work the way they do. If you take an ACE inhibitor or ARB, understanding that they specifically block this hormone and its kidney effects explains the mechanism and also why they protect kidneys in diabetes. Net: valuable pharmacology context that makes existing blood pressure medications make more sense, with no personal action implied.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Systems Pharmacology Person — Interested in the renin-angiotensin axis as a regulatory network</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;m trying to understand the full renin-angiotensin-aldosterone axis as a regulatory network. Where does angiotensin II sit in that cascade, what are the feedback loops, and what does the approval of exogenous angiotensin II as a vasopressor actually tell us about the system&rsquo;s redundancy in shock states?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Distributive shock reveals a paradox in the system&rsquo;s design</strong><br />In septic shock, you&rsquo;d expect angiotensin II to be elevated — the body is desperately trying to raise blood pressure. Instead, some patients have paradoxically low angiotensin II levels, possibly because the converting enzyme that makes it is consumed or impaired during systemic inflammation. This reveals that the cascade can fail at specific nodes, and that patients with low angiotensin II at baseline respond better to exogenous replacement. That finding enabled the post-hoc subgroup analysis that suggested a mortality benefit in the ATHOS-3 trial and highlights the cascade as a series of potentially independent failure points.</li>
          <li><strong>The ACE2 angle adds contemporary interest</strong><br />The enzyme ACE2 — which became widely known as the SARS-CoV-2 entry receptor — degrades angiotensin II into angiotensin 1-7, which has vasodilatory and generally protective effects. COVID-19 infection therefore disrupts the angiotensin axis by consuming ACE2, shifting the balance toward more angiotensin II and less angiotensin 1-7. This pharmacological context explains some of the cardiovascular pathology in severe COVID-19 and why the axis received intense research attention during the pandemic.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The ATHOS-3 mortality benefit in high-renin subgroups was a post-hoc finding — interesting and hypothesis-generating but requiring prospective confirmation that has not yet come. The RAAAS cascade is also subject to significant redundancy: when one vasoconstrictive mechanism is blocked, others compensate, which is why blood pressure management in practice is complicated and rarely solved by targeting a single node. The angiotensin 1-7 / ACE2 counterbalance also means that simply raising angiotensin II levels has downstream consequences for the regulatory arm of the system. Net: a richly connected regulatory network where single-node thinking underestimates the system&rsquo;s adaptive responses — which is exactly why most successful blood pressure drugs work better as combinations than as monotherapy.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Angiotensin II is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Not a community compound — no off-label, enhancement, or wellness application</li>
              <li>Not something anyone self-administers — requires continuous IV infusion and ICU monitoring</li>
              <li>Not a blood pressure support tool for everyday use — this is for life-threatening shock</li>
              <li>Not benign — carries a black box warning for thromboembolism</li>
              <li>Not the target of ACE inhibitors or ARBs in a way that makes those drugs relevant to angiotensin II as a therapy</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>Master regulator of blood pressure, kidney function, and fluid balance — understanding it explains most blood pressure pharmacology</li>
              <li>The discovery that septic shock patients can have paradoxically low angiotensin II enabled a targeted ICU intervention</li>
              <li>ACE2 connection to COVID-19 cardiovascular pathology put angiotensin axis biology into a global conversation</li>
              <li>Demonstrates that an endogenous hormone can become a precision drug when a specific deficiency state is identified</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
