export default function SubstancePOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Substance P is your body&rsquo;s primary pain signal &mdash; a tiny molecule released from pain-sensing nerve fibers that amplifies pain signals and triggers inflammation. Its medical relevance is enormous, but the clinically useful direction is blocking it, not adding more of it. The drugs built on this biology (NK1 receptor antagonists) treat nausea and are being studied for depression. Substance P itself is not a therapeutic compound to inject.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Chronic Pain Sufferer &mdash; Wanting to understand why pain persists</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My doctor says my chronic pain involves central sensitization &mdash; I&rsquo;ve read about Substance P being elevated in fibromyalgia and chronic pain. What is it actually doing?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Understanding Substance P explains why chronic pain self-amplifies</strong><br />In many chronic pain conditions &mdash; fibromyalgia, complex regional pain syndrome, IBS, migraine &mdash; Substance P levels are chronically elevated in the spinal cord and brain. That elevation keeps the pain signaling system turned up even when the original injury or trigger is gone. This is central sensitization: your nervous system has learned to amplify pain signals, and Substance P is a key mediator. Understanding this mechanism helps make sense of why chronic pain responds differently than acute pain.</li>
          <li><strong>Points toward where actual treatments are heading</strong><br />Because Substance P drives pain sensitization, its receptor (NK1) is an active drug target. NK1 receptor antagonists that block this signaling are being studied for chronic pain conditions. Understanding Substance P biology is the foundation for understanding what&rsquo;s in the development pipeline.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">This is a reference page, not a treatment guide. Substance P itself is not something you would take to improve your chronic pain &mdash; injecting it would cause pain and inflammation, because that&rsquo;s its function. The therapeutic direction is blocking it, and the drugs that do that (aprepitant, netupitant) are approved for chemotherapy nausea, not chronic pain yet. Net: essential biology for understanding chronic pain mechanisms; not a compound to ever administer.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Pain-Curious Person &mdash; Learning how pain neuroscience works</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;ve heard Substance P is somehow involved in pain and also in nausea from chemo &mdash; how does one molecule connect to such different things?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Substance P connects pain, inflammation, and nausea through a single receptor</strong><br />The NK1 receptor that Substance P activates is expressed in multiple places: in pain-sensing neurons of the spinal cord (pain), in blood vessels (inflammation and vasodilation), in immune cells (mast cell activation and histamine release), and in the brainstem nausea circuit (which is why NK1 antagonists treat chemotherapy-induced vomiting). One receptor, distributed widely, explains how blocking it helps with such different conditions.</li>
          <li><strong>It&rsquo;s a window into how drugs like aprepitant were developed</strong><br />Aprepitant (Emend), which prevents severe nausea from chemotherapy, works by blocking Substance P from reaching its receptor in the nausea control center of the brain. Understanding Substance P explains why this drug works, and also explains why researchers are now testing NK1 antagonists for depression &mdash; the same receptor exists in brain areas that regulate mood under stress.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The science here is genuinely interesting and well-established &mdash; this is textbook neuropharmacology, not frontier research. But the clinical action is entirely in antagonist drugs, not in Substance P itself. There is no wellness, recovery, or enhancement reason to be interested in exogenous Substance P administration. Net: learn about it to understand pain and nausea biology; stop there.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Pain Neuroscience Biohacker &mdash; NK1 pharmacology and the antidepressant angle</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;The early NK1 antagonist antidepressant trials by Kramer et al. showed compelling data but then had mixed Phase 3 results. What happened, and is the SP/NK1 system still a viable antidepressant target?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>A mechanistically distinct antidepressant pathway &mdash; not serotonin, not norepinephrine</strong><br />The 1998 Science paper by Kramer and colleagues showed that the NK1 antagonist MK-869 had antidepressant efficacy comparable to paroxetine with fewer sexual side effects in a Phase 2 trial. That finding generated enormous excitement because it suggested a completely non-monoamine antidepressant mechanism: blocking the limbic Substance P / NK1 system that mediates stress-related mood deterioration. The hypothesis is that elevated Substance P in limbic areas during chronic stress actively drives depressive states through NK1R signaling.</li>
          <li><strong>The Phase 3 story reveals how complex depression trials are</strong><br />Subsequent Phase 3 NK1 antagonist trials had inconsistent results &mdash; not because the mechanism is wrong, but likely because depression is heterogeneous and NK1 antagonism may benefit specific subtypes (stress-related, anxiety-prominent) more than others. Aprepitant itself showed antidepressant signals in some studies. The target is not dead &mdash; it&rsquo;s being revisited with better patient stratification approaches.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Administering Substance P to modulate the NK1 system in the direction of antidepressant effect is pharmacologically backwards. More Substance P activates NK1 in limbic areas &mdash; the opposite direction from what the antidepressant hypothesis requires. If someone is experimenting in this space, the interesting compound is an NK1 antagonist, not Substance P. Aprepitant is FDA-approved, has been studied in mood contexts, and is pharmacologically accessible. Net: the NK1 system is a live and interesting antidepressant target; Substance P itself is not the compound of interest.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Substance P is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A therapeutic compound to inject &mdash; it is a pain mediator; injecting it causes pain and inflammation</li>
              <li>A pain reliever &mdash; the opposite; it amplifies pain signaling</li>
              <li>An antidepressant &mdash; the antidepressant direction in this system is blocking it, not administering it</li>
              <li>A recovery or wellness compound with any mechanistic rationale</li>
              <li>Something with a beneficial community use case &mdash; there is none</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>Central to understanding why chronic pain self-amplifies and persists</li>
              <li>Explains the mechanism behind FDA-approved chemotherapy nausea drugs (aprepitant, netupitant)</li>
              <li>The NK1 antagonist antidepressant story is a compelling and ongoing area of neuroscience</li>
              <li>Connects pain, inflammation, mast cell activation, and nausea through a single receptor system</li>
              <li>Understanding it clarifies why blocking it &mdash; not adding more &mdash; is the pharmacological opportunity</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
