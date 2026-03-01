export default function BradykininOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Bradykinin is a small peptide your body makes naturally &mdash; it causes blood vessels to dilate, makes you feel pain more intensely, and triggers swelling when you have an injury or infection. Nobody injects it as a wellness compound. This page exists because bradykinin is the molecule responsible for a serious side effect of one of the most commonly prescribed blood pressure drugs, and understanding it helps make sense of ACE inhibitor cough, angioedema, and hereditary angioedema &mdash; conditions that affect millions of people.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; on a blood pressure medication and scared by a swelling episode</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My doctor put me on lisinopril six months ago and now my lips keep swelling for no reason. My doctor said it might be the medication, but I don&rsquo;t understand why a blood pressure pill would cause my face to swell up.&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re looking into this</p>
        <ol className="reta-overview__profile-why">
          <li><strong>ACE inhibitors block the enzyme that breaks down bradykinin</strong><br />Lisinopril and other drugs in the ACE inhibitor class work by blocking an enzyme called ACE. That enzyme has two jobs: it raises blood pressure by a separate pathway, and it also degrades bradykinin &mdash; meaning it breaks bradykinin down and gets rid of it. When you block ACE, bradykinin builds up. Accumulated bradykinin causes the blood vessels under your skin to leak fluid into the surrounding tissue &mdash; that&rsquo;s the swelling you see, called angioedema. It can happen to the lips, tongue, face, or throat.</li>
          <li><strong>The throat-swelling version is a medical emergency</strong><br />Angioedema that involves the airway &mdash; the throat and tongue &mdash; can be life-threatening if the swelling blocks breathing. This is why any lip, tongue, or throat swelling while on an ACE inhibitor needs immediate medical attention. The drug class needs to be stopped and usually switched to a different type of blood pressure medication.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">ACE inhibitor-induced angioedema affects roughly 0.1-0.7% of people on these drugs, but ACE inhibitors are prescribed so commonly that it represents a meaningful number of real cases. It can occur at any point during treatment &mdash; even after years of taking the medication without problems. If you&rsquo;ve had any episode of unexplained swelling while on an ACE inhibitor, that medication needs to be reviewed with your doctor. Bradykinin angioedema does not respond to antihistamines or steroids the way allergic swelling does. Net: this is a known drug mechanism, not a rare allergy, and switching drug class resolves it.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Health-Curious Reader &mdash; saw bradykinin mentioned and wants to understand the biology</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;ve seen bradykinin come up in articles about COVID-19, ACE inhibitors, and hereditary angioedema. What does it actually do and why does it keep showing up in these different contexts?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Bradykinin sits at a crossroads of inflammation, pain, and blood pressure regulation</strong><br />It&rsquo;s produced from a protein called kininogen when tissue is injured or inflamed. Once made, it dilates blood vessels, makes them leaky (causing swelling), sensitizes pain nerve endings (making injured tissue hurt more), and helps coordinate the inflammatory response. Understanding bradykinin helps explain why injured tissue is painful and swollen &mdash; bradykinin is a key mediator of that experience.</li>
          <li><strong>It connects multiple important disease mechanisms</strong><br />The same bradykinin biology underlies ACE inhibitor side effects, hereditary angioedema, and aspects of pain signaling. Targeted therapies for hereditary angioedema &mdash; including injectable drugs that block specific parts of the bradykinin pathway &mdash; are now approved treatments that have transformed what was previously a life-threatening episodic disease.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Bradykinin is a useful biology concept rather than a target for self-directed intervention. You cannot meaningfully modulate your own bradykinin levels through supplementation or lifestyle in a way that would treat any condition. The therapeutic interest is in blocking bradykinin or its production when it&rsquo;s overactive &mdash; which is what the hereditary angioedema drugs do. The biology is genuinely interesting; the practical takeaway is mostly about understanding drug mechanisms and disease explanations. Net: great biology to understand, no direct DIY application.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Pharmacology-Curious Reader &mdash; mapping the kallikrein-kinin system and its drug targets</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I want to understand the full kallikrein-kinin cascade &mdash; how bradykinin is produced, how it signals through B1 vs. B2 receptors, and what the approved therapeutics that target this system actually do mechanistically.&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The receptor biology distinguishes acute from chronic inflammatory contexts</strong><br />Bradykinin primarily signals through two receptor subtypes. The B2 receptor is constitutively expressed and mediates most acute effects &mdash; the immediate pain and vasodilation from injury or ACE inhibitor accumulation. The B1 receptor is upregulated in inflammatory conditions and mediates chronic pain sensitization. This distinction explains why icatibant, the B2 receptor antagonist approved for hereditary angioedema attacks, works in the acute context and why B1 receptor involvement is relevant to chronic pain research.</li>
          <li><strong>The approved drug targets span the full pathway</strong><br />Icatibant (Firazyr) blocks the B2 receptor directly. Lanadelumab (Takhzyro) is a monoclonal antibody that prevents HAE attacks by inhibiting plasma kallikrein &mdash; blocking bradykinin production upstream rather than its receptor. Berotralstat (Orladeyo) is an oral plasma kallikrein inhibitor for chronic HAE prevention. The pathway has now been successfully targeted at three distinct levels: the protease, the receptor, and replacement of the deficient C1-inhibitor. This is a pharmacologically mature target area.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Bradykinin&rsquo;s role in pain sensitization, particularly B1 receptor upregulation in chronic inflammatory states, has been an active analgesic drug target area for decades without yielding an approved pain drug. The specificity problem &mdash; blocking bradykinin signaling in pain pathways without disrupting its protective cardiovascular and tissue repair functions &mdash; has been difficult to solve. HAE is the clearest therapeutic success story because the disease involves a specific overactivation of the pathway with no competing protective role in that context. Net: mechanistically rich, one major approved indication, decades of pain pharmacology research that has not yet translated to a drug.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Bradykinin is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A compound anyone injects as a wellness or performance tool &mdash; it causes pain and swelling by design</li>
              <li>Relevant to DIY peptide protocols in any practical way</li>
              <li>Modifiable through supplements or lifestyle interventions in any meaningful clinical sense</li>
              <li>A single-function molecule &mdash; it does very different things depending on receptor subtype and tissue context</li>
              <li>Something that antihistamines or steroids will block &mdash; bradykinin angioedema is a distinct mechanism from allergic angioedema</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>Explains one of the most important drug side effects in cardiology: ACE inhibitor angioedema</li>
              <li>The biology behind hereditary angioedema, a rare but serious disease with multiple now-approved targeted treatments</li>
              <li>A key mediator of why injured tissue hurts &mdash; the pain sensitization role is relevant to understanding inflammation</li>
              <li>A pharmacologically mature target: three different approved drugs attacking different points in the same cascade</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
