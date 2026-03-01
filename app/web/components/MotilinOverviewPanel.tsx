export default function MotilinOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Motilin is a hormone your small intestine makes to trigger the &ldquo;housekeeping waves&rdquo;
        that sweep your gut clean between meals. It&rsquo;s not a community peptide and there is no
        formulation you can actually take &mdash; but understanding what it does explains a lot about
        why your digestion works the way it does, and why certain drugs work on gut motility.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; trying to understand gut issues</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My doctor mentioned something about motility and I want to understand what&rsquo;s actually happening in my gut between meals.&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It explains the stomach growling and emptying between meals</strong><br />Motilin is what triggers the migrating motor complex &mdash; the rhythmic waves of muscle contractions that sweep your small intestine clean roughly every 90 minutes when you&rsquo;re fasting. That gurgling sound your stomach makes when you&rsquo;re hungry? That&rsquo;s largely motilin doing its job. Understanding this hormone helps people with gastroparesis or slow motility understand why their symptoms follow the pattern they do.</li>
          <li><strong>It explains why certain antibiotics help with stomach emptying</strong><br />Erythromycin &mdash; an antibiotic most people have heard of &mdash; mimics motilin in the gut and was used for decades at low doses to treat gastroparesis before better options emerged. This connection between an antibiotic and stomach motility is genuinely useful context for patients who have been prescribed it for GI reasons and didn&rsquo;t understand why.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">There is no motilin supplement, injection, or product you can take. This page exists to explain the biology, not to help you source a compound. If you have gastroparesis or a motility disorder, the motilin story is background context for understanding what&rsquo;s happening physiologically &mdash; your actual treatment options are things like metoclopramide, domperidone, or low-dose erythromycin, all of which work through different pathways. <strong>Net: useful biology to understand; no action to take based on it.</strong></p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Athlete &mdash; gut health and performance nutrition</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;ve been reading about gut health and performance &mdash; what does motilin actually have to do with how quickly I digest food before training?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It explains fasted training physiology</strong><br />The migrating motor complex that motilin controls is active during the fasted state and suppressed when you eat. Athletes who train fasted are effectively in the phase when motilin is driving gut housekeeping cycles. Understanding this explains why eating close to a workout can disrupt motility &mdash; food suppresses the MMC and triggers a different motility pattern for digestion, which is why gut discomfort during exercise is often timing-related.</li>
          <li><strong>Context for prokinetic interventions</strong><br />Athletes dealing with GI issues during events &mdash; bloating, slow gastric emptying, nausea &mdash; sometimes encounter prokinetic strategies in sports nutrition literature. Motilin biology is the mechanism behind those interventions. Knowing it exists helps filter which claims about gut motility are mechanistically grounded.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">There is nothing you can take to directly supplement or boost motilin &mdash; no product, no gray-market peptide with any evidence base. The practical takeaway for athletes is timing: the MMC that motilin triggers is disrupted by eating, so pre-workout food timing matters for gut comfort during exercise. If you have actual motility symptoms affecting training, that&rsquo;s a GI physician conversation, not a peptide sourcing question. <strong>Net: good mechanistic context; no supplementation action follows from it.</strong></p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; GI physiology and the motilin-ghrelin relationship</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I want to understand the motilin receptor pharmacology, why synthetic motilin agonists failed in clinical trials, and what the structural relationship between motilin and ghrelin actually means.&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The motilin-ghrelin receptor family relationship is pharmacologically meaningful</strong><br />Motilin and ghrelin share both structural similarity and receptor family membership &mdash; the motilin receptor and ghrelin receptor are related GPCRs, and ghrelin itself has motilin-like prokinetic effects in the gut. This overlap is why GH-stimulating compounds like ipamorelin (a ghrelin receptor agonist) also affect GI motility. Understanding the motilin-ghrelin relationship contextualizes why &ldquo;GH peptides&rdquo; sometimes cause GI side effects and why ghrelin agonists are being studied for gastroparesis.</li>
          <li><strong>The clinical failure story of synthetic motilin agonists is instructive</strong><br />Several pharmaceutical programs developed synthetic motilin agonists specifically for gastroparesis &mdash; camicinal and GSK962040 among them. Despite compelling mechanism and early signals, most failed to show durable efficacy in Phase 3. This failure story is a useful case study in how receptor tachyphylaxis (the receptor stops responding with repeated stimulation) can undermine a pharmacologically rational drug, and why endogenous hormonal signaling doesn&rsquo;t always translate to therapeutic drug targets.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Motilin itself is a reference compound &mdash; it exists in some research peptide supplier catalogs, but its endogenous role is as a local hormonal signal in the gut wall, not a systemic pharmacological agent. The tachyphylaxis that killed clinical motilin agonist programs would apply to exogenous motilin as well. The practical biohacking application here is zero &mdash; the value is understanding the mechanistic relationships that explain why compounds you might actually use (ghrelin receptor agonists, prokinetics) behave the way they do. <strong>Net: reference biology with genuine mechanistic value; no usable compound follows from it.</strong></p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Motilin is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A compound you can buy, inject, or supplement &mdash; no therapeutic formulation exists</li>
              <li>A community peptide with any use protocol or track record</li>
              <li>Something synthetic motilin agonists could reliably replicate &mdash; pharmaceutical programs largely failed due to receptor tachyphylaxis</li>
              <li>Directly supplementable through diet or lifestyle (the MMC responds to fasting timing, but motilin itself isn&rsquo;t a target for supplementation)</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>Explains the migrating motor complex &mdash; why your gut behaves differently fasted vs fed</li>
              <li>The motilin-ghrelin receptor family relationship contextualizes GI side effects of GH-stimulating peptides</li>
              <li>The clinical failure of motilin agonists is a useful case study in receptor tachyphylaxis and drug development</li>
              <li>Explains why low-dose erythromycin (an antibiotic) helps gastroparesis &mdash; it mimics motilin</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
