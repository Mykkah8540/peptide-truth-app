export default function Endothelin1OverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Endothelin-1 is the most potent blood vessel constrictor your body produces &mdash; roughly ten times more powerful than angiotensin-II. It is not used therapeutically as something you inject. Its clinical relevance is entirely through the drugs that block it: the endothelin receptor antagonists prescribed for pulmonary arterial hypertension. This is a reference page for understanding a major vasoactive peptide and the medications built around blocking its effects.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Patient or Caregiver &mdash; On an ERA for pulmonary arterial hypertension</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My doctor prescribed bosentan for my PAH. I don&rsquo;t really understand what it does or why I have to get monthly blood tests and use two forms of birth control. Can someone explain this?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why this matters to them</p>
        <ol className="reta-overview__profile-why">
          <li><strong>In PAH, endothelin-1 is chronically elevated and causing damage</strong><br />Pulmonary arterial hypertension involves pathologically high levels of endothelin-1 in the lung&rsquo;s blood vessels. This excess ET-1 causes the blood vessels to constrict, thicken, and gradually narrow &mdash; a progressive process that makes the heart work harder against increasing resistance. The drugs prescribed (bosentan, ambrisentan, macitentan) work by blocking ET-1 from attaching to its receptors, which slows or partially reverses this process.</li>
          <li><strong>The monthly blood tests and contraception requirements are not optional &mdash; they have specific reasons</strong><br />The endothelin receptor antagonists can damage the liver &mdash; bosentan has a formal black box warning for this, which is why monthly liver function tests are required. All three drugs cause severe birth defects, which is why two forms of contraception are required and pregnancy testing is mandatory. These aren&rsquo;t bureaucratic formalities; they are responses to documented harms that happened in trials.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">PAH is a serious progressive disease, and these medications are real treatments with real evidence &mdash; not just symptom managers. The SERAPHIN trial with macitentan showed meaningful reduction in death and disease progression. These are complex drugs with real drug interactions; bosentan in particular is a strong inducer of liver enzymes that reduces the efficacy of many other medications including hormonal contraceptives. If you&rsquo;re on an ERA, knowing your drug interactions and keeping up with monitoring visits is genuinely important to your safety. Net: these medications work and they matter &mdash; take the monitoring requirements seriously because they exist for real reasons.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Cardiovascular Biology Curious &mdash; Wants to understand how blood pressure is regulated</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I keep seeing endothelin mentioned in cardiology literature. What does it actually do in the vascular system, and why is it relevant to more than just PAH?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Endothelin-1 is a master regulator of vascular tone across multiple tissue beds</strong><br />ET-1 is produced by the endothelial cells lining your blood vessels and acts locally to constrict smooth muscle. But the biology is more nuanced than &ldquo;just a constrictor&rdquo; &mdash; ET-1 also binds to a second receptor type on the endothelial cells themselves, triggering nitric oxide and prostacyclin release that produces vasodilation. Whether a tissue bed dilates or constricts in response to ET-1 depends on which receptor type dominates there.</li>
          <li><strong>ET-1 elevation is a biomarker and mediator in multiple cardiovascular and renal conditions</strong><br />Beyond PAH, elevated ET-1 is implicated in systemic hypertension, heart failure, chronic kidney disease, and atherosclerosis. Understanding ET-1 physiology is foundational to understanding why high blood pressure damages vessels over time, and why certain organ systems are particularly vulnerable to vascular remodeling.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The dual-receptor biology makes ET-1 pharmacology genuinely complex &mdash; blocking both receptor types versus blocking only the constrictor receptor produces different clinical outcomes, which is why bosentan (non-selective) and ambrisentan (ETA-selective) have somewhat different profiles. ET-1 research in conditions beyond PAH has been largely disappointing so far &mdash; multiple trials of ERA therapy in heart failure and hypertension have not produced the benefits that the biology suggested. Understanding ET-1 well means understanding why mechanism doesn&rsquo;t always translate to clinical benefit. Net: one of the most important vasoactive peptides in human physiology to understand, especially if you&rsquo;re serious about cardiovascular biology.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Systems Thinker &mdash; Receptor pharmacology, receptor selectivity, and why blocking a vasoconstrictor doesn&rsquo;t always work</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;m interested in the ETA vs ETB receptor selectivity debate and the clinical consequences &mdash; why did non-selective blockade (bosentan) work, what does preserving ETB buy you, and why has ERA therapy failed in heart failure despite compelling ET-1 biology?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The ETA vs ETB selectivity question has real clinical consequences</strong><br />ETB receptors on endothelial cells mediate vasodilation and help clear circulating ET-1 from the bloodstream. When you block ETB (as non-selective antagonists like bosentan and macitentan do), you lose that clearance function and accumulate more ET-1 &mdash; which then has nowhere to act except ETA receptors. The theoretical argument for ETA-selective blockade (preserving ETB&rsquo;s clearance and dilatory functions) seemed compelling, but in clinical practice ambrisentan and bosentan have not shown dramatically different efficacy in PAH. The selectivity story is real biology that has not cleanly translated to differential clinical outcomes.</li>
          <li><strong>Heart failure ERA trials are an important lesson in mechanism-to-outcome translation failure</strong><br />ET-1 is elevated in heart failure and correlates with poor prognosis. Multiple ERA trials in heart failure (EARTH, ENABLE, ENCOR) were stopped early due to worsening outcomes in the treatment groups. This is a clean example of a biologically coherent hypothesis producing clinical harm &mdash; likely because ET-1 in heart failure context is doing something useful, and blocking it removes a compensatory mechanism rather than a pathological one.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Endothelin-1 has no role as an exogenously administered compound &mdash; injecting ET-1 would cause severe, potentially lethal vasoconstriction with no therapeutic benefit. The entire pharmacological value of this peptide&rsquo;s biology is realized through its antagonists. The heart failure failures are a reminder that elevated biomarkers of pathophysiology are not always targets &mdash; they can be compensatory adaptations. The teratogenicity of ERAs (all are pregnancy category X) is a hard stop that the REMS programs enforce for good reason. Net: ET-1 physiology is foundational vascular biology; its clinical pharmacology is a nuanced story of selectivity, context-dependence, and translation failures that reward careful study.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Endothelin-1 is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Not injectable by anyone outside a research laboratory setting &mdash; exogenous ET-1 would cause severe vasoconstriction and acute cardiovascular crisis</li>
              <li>Not a community peptide with any wellness or enhancement application</li>
              <li>Not a &ldquo;natural&rdquo; vasoconstrictor to explore &mdash; it is the most potent one known and has no safe off-label use case</li>
              <li>Not blockable safely without physician oversight &mdash; the ERA drug class has serious monitoring requirements and drug interactions</li>
              <li>Not appropriate in pregnancy under any circumstances &mdash; all ERAs are teratogenic with documented severe birth defects</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>The most potent endogenous vasoconstrictor in human physiology &mdash; 10x more potent than angiotensin-II</li>
              <li>Dual-receptor biology with opposing effects depending on which receptor type and which tissue: vasodilation through ETB on endothelium, vasoconstriction through ETA on smooth muscle</li>
              <li>The ERA drug class built around blocking it has meaningfully changed outcomes in pulmonary arterial hypertension</li>
              <li>The heart failure ERA failure is a canonical case study in why elevated disease biomarkers don&rsquo;t automatically make good drug targets</li>
              <li>Understanding ET-1 is foundational to understanding vascular biology in hypertension, renal disease, and cardiopulmonary physiology</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
