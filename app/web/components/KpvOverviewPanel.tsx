export default function KpvOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        KPV is a tiny three-amino-acid fragment of a natural anti-inflammatory hormone your body already makes. It has consistent animal data for calming gut inflammation, and it&rsquo;s one of the rare peptides where swallowing it in a capsule actually makes scientific sense &mdash; because the gut is where the evidence points. Community interest has run ahead of human trials, but the basic biology is real and the GI rationale is sound.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; Gut Health, IBD, and &ldquo;Leaky Gut&rdquo;</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I have Crohn&rsquo;s and I keep reading about KPV for gut inflammation. Is there actually anything to this or is it just another wellness thing?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It was specifically researched for IBD &mdash; not just general inflammation</strong><br />KPV isn&rsquo;t just a vague anti-inflammatory; the research is focused on Crohn&rsquo;s and ulcerative colitis specifically. In animal models of colitis, it consistently reduces the inflammatory activity in the intestinal lining and helps repair the gut barrier. The proposed mechanism &mdash; calming down the inflammation signaling pathway that drives IBD flares &mdash; is grounded in real cell biology.</li>
          <li><strong>You can take it as a capsule and it actually survives the stomach</strong><br />Most peptides dissolve in your digestive system before they can do anything. KPV is so small (just three amino acids) that it partially survives the trip through your gut and can reach the colon where IBD inflammation lives. That means oral capsules are a legitimate delivery method &mdash; and they align better with the research rationale than injections do.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">There are no human clinical trials for KPV &mdash; the evidence is animal studies and cell cultures, which is meaningful but not proof it works the same way in people. IBD is a serious condition that requires colonoscopy, doctor monitoring, and proper medical management. KPV is not a replacement for your gastroenterologist or for proven IBD treatments. At best it&rsquo;s an investigational adjunct you explore alongside proper care, not instead of it. Net: the most GI-specific peptide in the space with real preclinical rationale, zero human trial evidence yet.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Athlete &mdash; GI Inflammation and Training Gut</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;High training volume wrecks my gut &mdash; bloating, cramping, the works. Is KPV going to help with exercise-induced gut inflammation or is this not the right compound for that?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Exercise-induced gut inflammation uses some of the same pathways KPV targets</strong><br />Heavy endurance training increases intestinal permeability and activates many of the same inflammatory signals that KPV is proposed to calm. The NF-kB inflammatory pathway that KPV inhibits in IBD models is also involved in exercise-associated gut inflammation. The mechanism is plausibly relevant, even though the research wasn&rsquo;t designed around athletes.</li>
          <li><strong>Gut barrier support is a legitimate training concern</strong><br />Athletes who train at high volumes deal with real intestinal permeability issues. KPV&rsquo;s animal data shows effects on gut barrier function that are independent of its anti-inflammatory effects &mdash; tightening the barrier itself, not just reducing inflammation. For an athlete whose GI problems are barrier-driven, that&rsquo;s a mechanistically interesting target.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Extrapolating from IBD animal models to exercise-induced gut dysfunction in a healthy athlete is a significant leap. The dosing, delivery method, and expected magnitude of effect for this application are completely uncharacterized. Exercise GI issues respond well to simpler interventions first: training load periodization, pre-exercise nutrition timing, and hydration. KPV is an investigational compound with no human data &mdash; it belongs later in the hierarchy of what to try, not at the start. Net: interesting mechanistic logic, no athlete-specific evidence, try the boring stuff first.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; Gut-Brain-Immune Axis and Oral Peptide Pharmacology</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I want to understand the dual MC1R agonism and NF-kB inhibition mechanism, and whether oral vs. injectable KPV produces fundamentally different systemic vs. mucosal effects.&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The dual mechanism is pharmacologically unusual</strong><br />KPV works through two distinct pathways: partial agonism of a melanocortin receptor expressed on immune cells in the gut lining, and direct inhibition of the NF-kB transcription factor independently of any receptor. The second pathway &mdash; direct NF-kB inhibition &mdash; has been demonstrated in cell culture even when the melanocortin receptor is blocked. This receptor-independent anti-inflammatory action makes KPV pharmacologically interesting beyond just being a milder version of its parent molecule.</li>
          <li><strong>Oral peptide delivery to the colon is genuinely underexplored science</strong><br />The question of how to get peptides to specific intestinal locations without systemic absorption is a real pharmaceutical problem. KPV&rsquo;s small size and stability make it one of the few peptides studied in nanoparticle encapsulation, hydrogel delivery, and colonic-release formulations. For someone interested in targeted luminal delivery as a concept, KPV is one of the most developed research examples.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The systemic immunological effects of injectable KPV are genuinely uncharacterized &mdash; you&rsquo;re bypassing the intended local delivery mechanism and activating the compound systemically, where the receptor exposure and risk profile differ from the oral route. Long-term MC1R partial agonism effects, including in the context of melanocytes and cancer biology, have not been studied. The absence of active pharmaceutical development isn&rsquo;t just a commercialization gap &mdash; it also means no Phase I/II safety data exists. Net: one of the more scientifically interesting investigational peptides in the gut space; one of the less characterized in terms of systemic safety.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What KPV is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Not a replacement for proven IBD treatments &mdash; corticosteroids and biologics have decades of human evidence; KPV has animal studies</li>
              <li>Not a systemic anti-inflammatory in the way the community sometimes describes &mdash; the evidence base is GI-specific, not body-wide</li>
              <li>Not validated in any human randomized trial yet &mdash; consistent animal data is promising, not conclusive</li>
              <li>Not a compound to self-treat serious IBD with &mdash; IBD requires physician monitoring regardless of what supplements you add</li>
              <li>Not automatically safer because it&rsquo;s derived from a natural hormone fragment &mdash; &ldquo;natural origin&rdquo; is not the same as characterized safety</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>The most GI-specific anti-inflammatory peptide in the community space, with research explicitly targeting IBD</li>
              <li>Oral delivery is mechanistically appropriate &mdash; one of the rare cases where capsules align with the evidence rather than just being a more convenient injection replacement</li>
              <li>Dual mechanism (receptor-mediated and NF-kB direct inhibition) is pharmacologically unusual and worth understanding</li>
              <li>Small enough that synthesis quality can be verified analytically &mdash; CoA verification is meaningful for this compound</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
