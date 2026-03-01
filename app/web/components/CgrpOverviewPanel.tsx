export default function CgrpOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        CGRP is a signaling molecule your nervous system releases during migraine attacks to cause blood vessel dilation and pain amplification in the head. It is one of the most important discoveries in migraine biology of the past 30 years &mdash; not because anyone injects it, but because blocking it led to an entire generation of effective migraine treatments. Nobody uses exogenous CGRP therapeutically. This page exists for the tens of millions of people with migraines who want to understand why the drugs their doctors are prescribing work, and for anyone trying to make sense of a rapidly evolving treatment landscape.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; living with migraines and trying to understand a new prescription</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My neurologist prescribed rimegepant for my migraines and mentioned it works on CGRP. I have no idea what CGRP is. Why does blocking it stop a migraine?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re looking into this</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Understanding the mechanism helps you use the treatment better</strong><br />Knowing that CGRP is released specifically during migraine attacks &mdash; and that blocking it interrupts the biology of the attack itself, not just pain sensation in general &mdash; helps explain why gepants (the class of CGRP-blocking drugs) work differently than older migraine treatments like triptans or just pain relievers. These are the first migraine-specific treatments designed around the actual biology of a migraine, rather than general pain pathways.</li>
          <li><strong>The drug options are genuinely better than a decade ago</strong><br />The CGRP pathway has given rise to two distinct drug classes: monthly or quarterly injections (monoclonal antibodies) that prevent migraines before they start, and on-demand tablets or dissolvable tablets that treat attacks when they happen. Some drugs in the class can do both. This is meaningfully new &mdash; people who didn&rsquo;t respond well to older migraine drugs are responding to CGRP-targeted therapies, and having options that are migraine-specific rather than repurposed from blood pressure or epilepsy drugs is clinically valuable.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">CGRP-targeted therapies are effective for many people with migraines but are not universally effective &mdash; response rates in clinical trials typically show 50% or more reduction in monthly migraine days for roughly half to two-thirds of patients. The prevention injections require monthly or quarterly administration. Gepants for acute treatment are more convenient than some older acute drugs but are also more expensive. The mechanism is genuinely superior in migraine-specificity, but they are not cures and they still need to be matched to your specific migraine pattern with physician guidance. Net: a real therapeutic advance in migraine biology, working as intended for many patients, with the same limitations any treatment has when migraine is heterogeneous.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Health-Curious Reader &mdash; wants to understand migraine biology and why CGRP matters</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;ve heard that CGRP is the key to migraine attacks. What is actually happening in the brain during a migraine and why does this particular molecule show up in so many different drug names?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>CGRP connects peripheral nerve activity to central pain amplification</strong><br />During a migraine, trigeminal nerve fibers (the sensory nerves of the face and head) become activated and release CGRP from their endings into the tissues around blood vessels. This causes the blood vessels to dilate and become inflamed &mdash; the throbbing, pulsing quality of migraine pain. CGRP also signals back into the brainstem, amplifying pain processing there. Blocking CGRP at any point in this chain &mdash; either preventing its release (with antibodies against the peptide) or blocking where it binds (with receptor antagonists) &mdash; interrupts the attack cascade.</li>
          <li><strong>The diversity of approved drugs reflects how well-validated the target is</strong><br />There are now four approved monoclonal antibodies targeting CGRP (erenumab, fremanezumab, galcanezumab, eptinezumab) and three approved gepants for acute and/or preventive use (rimegepant, ubrogepant, atogepant). This is not redundancy &mdash; different formats (monthly injection vs. quarterly vs. daily oral vs. on-demand) serve different patient needs. The fact that multiple drugs across two mechanistic approaches (blocking the peptide vs. blocking its receptor) all work validates the target itself.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">CGRP is not exclusively a migraine molecule &mdash; it is expressed throughout the nervous system and has roles in blood pressure regulation, wound healing, and pain signaling in non-migraine contexts. Long-term CGRP blockade might theoretically affect non-migraine biology. The clinical data so far (several years of post-approval safety data across large populations) has not revealed serious cardiovascular or other systemic concerns, but these are relatively newer drugs and long-term monitoring continues. The biology of why CGRP becomes dysregulated in migraine &mdash; what triggers the cascade in the first place &mdash; is still not fully understood. Net: the target is validated, the drugs work, the long-term safety picture is so far reassuring but still accumulating.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Neurovascular Biohacker &mdash; mapping CGRP receptor pharmacology and its connections to the calcitonin receptor family</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;The CGRP receptor is CLR plus RAMP1 &mdash; a different RAMP partner from the amylin receptor but the same receptor family as calcitonin and amylin. How does this receptor heterodimer biology create selectivity, and what does the pharmacological validation of CGRP as a target tell us about the broader class B GPCR landscape?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>RAMP proteins create receptor selectivity through heterodimer identity</strong><br />Calcitonin receptor-like receptor (CLR) pairs with RAMP1 to form the CGRP receptor; with RAMP2 to form the AM1 receptor (binding adrenomedullin); with RAMP3 to form the AM2 receptor. The calcitonin receptor (CALCR) pairs with RAMP1 or RAMP3 to form the amylin receptor. The RAMP partner determines which ligand the receptor complex recognizes. Erenumab (anti-CGRP receptor antibody) targets CLR+RAMP1 specifically. Understanding this heterodimer pharmacology explains the selectivity of the different approved drugs and why a CGRP-specific drug doesn&rsquo;t also block amylin effects even though both systems use related receptor components.</li>
          <li><strong>The gepant class solved a three-decade selectivity problem</strong><br />CGRP receptor antagonism was known as a target for migraine since the 1990s, but early small-molecule candidates had hepatotoxicity in clinical development. The gepants solved this by achieving sufficient CGRP receptor selectivity and hepatic safety to clear Phase 3 trials &mdash; a pharmacological optimization problem that took 20+ years to crack. The structural basis of their selectivity &mdash; binding to the extracellular domain interface between CLR and RAMP1 &mdash; is a model for targeting RAMP-dependent receptor complexes more broadly.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">CGRP&rsquo;s role as a potent vasodilator throughout the body creates a theoretical concern about sustained blockade affecting cardiovascular regulation, particularly in conditions where CGRP-mediated vasodilation is protective &mdash; such as certain ischemic conditions. The current clinical evidence does not show cardiovascular harm in the migraine populations studied, but the approved drugs carry caution recommendations for people with recent cardiovascular events. The question of whether long-term CGRP suppression affects any non-migraine physiology is a genuine ongoing pharmacovigilance question, not a resolved one. Net: one of the most pharmacologically validated and commercially successful targets in modern neurology; the receptor biology is a model for understanding the RAMP-dependent receptor family that also includes the amylin and calcitonin systems.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What CGRP is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A compound anyone injects as a therapeutic agent &mdash; its effects (vasodilation, pain sensitization) are the target to block, not produce</li>
              <li>A DIY or community peptide in any context</li>
              <li>Exclusive to migraine biology &mdash; it has roles throughout the nervous and cardiovascular systems</li>
              <li>Fully understood mechanistically &mdash; why it becomes dysregulated in migraine is not completely known</li>
              <li>A single receptor &mdash; CGRP receptor biology involves heterodimer pharmacology with RAMP proteins that creates complex selectivity requirements</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>The biological basis for the first migraine-specific treatments ever developed &mdash; a transformative shift in how migraines are treated</li>
              <li>A pharmacologically validated target with multiple successful drug classes from two different mechanistic approaches</li>
              <li>The RAMP-dependent receptor heterodimer biology is a model for understanding the calcitonin, amylin, and adrenomedullin receptor family</li>
              <li>The gepant development story &mdash; solving a selectivity problem that took over 20 years &mdash; is a case study in target validation persistence</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
