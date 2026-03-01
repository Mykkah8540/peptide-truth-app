export default function ExenatideOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Exenatide (Byetta / Bydureon) was the first GLP-1 receptor agonist ever approved &mdash; a drug derived from a peptide found in Gila monster venom that launched an entire class of diabetes and weight loss medications. It validated the biology that semaglutide and tirzepatide later refined into far more powerful drugs. Exenatide itself produces modest weight loss (~3&ndash;5%) compared to what modern weekly GLP-1 drugs achieve (~15&ndash;22%), and for most people starting today, it&rsquo;s been largely superseded. But its 20-year safety track record is something no newer drug can match.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Person Comparing GLP-1 Options &mdash; Trying to figure out which drug to discuss with their doctor</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I see Byetta, Ozempic, Wegovy, and Mounjaro mentioned constantly. Is Byetta (exenatide) still relevant, or is it just the outdated version of these newer drugs?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why someone might still consider it</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It has the longest safety track record in the GLP-1 class by a wide margin</strong><br />Exenatide was approved in 2005 &mdash; semaglutide didn&rsquo;t come until 2017, and tirzepatide in 2022. Twenty years of real-world post-marketing data means rare adverse effects that don&rsquo;t show up in clinical trials have had time to emerge and be characterized. For someone with genuine concerns about being an early adopter of newer agents, this track record is a legitimate consideration.</li>
          <li><strong>Cost and formulary access can make it the practical GLP-1 option in some situations</strong><br />Generic exenatide exists. When semaglutide and tirzepatide are unavailable due to shortage, formulary restrictions, or cost, exenatide provides the foundational GLP-1 mechanism with established evidence behind it. It&rsquo;s not the exciting new option, but it&rsquo;s a real option.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">If your primary goal is meaningful weight loss, exenatide is not the right starting point today. The weight loss gap between exenatide (~3&ndash;5%) and semaglutide (~15%) or tirzepatide (~22%) is not a minor pharmacological nuance &mdash; it is a clinically large difference in outcomes. Exenatide also has a neutral cardiovascular outcomes trial while semaglutide has shown significant heart event reduction. If you have T2D and cardiovascular risk, this distinction matters for which drug your doctor should reach for. Net: a legitimate medication with real history, but not the first choice for weight management or CV risk reduction if newer agents are accessible.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Athlete &mdash; Exploring metabolic tools, curious about GLP-1 class for body composition</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;m not diabetic but I&rsquo;m interested in GLP-1 pharmacology for body composition. How does exenatide fit compared to the newer drugs, and is there anything from the older data that&rsquo;s useful?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re looking at it</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The GLP-1 mechanism is interesting for body composition regardless of which version</strong><br />All GLP-1 agonists work by activating the same receptor: slowing gastric emptying (food moves through more slowly, keeping you fuller longer), signaling satiety to the brain, and affecting glucose-dependent insulin release. The foundational mechanism that makes the class interesting for body composition is the same in exenatide as in semaglutide &mdash; just realized less potently.</li>
          <li><strong>Short-acting GLP-1 drugs have a different physiological profile than weekly agents</strong><br />Byetta (twice-daily exenatide) produces peak effects around meals, whereas weekly semaglutide provides more constant receptor activation. Some researchers have pointed to prandial GLP-1 spikes having different downstream effects on gastric motility and meal-linked glucose handling than continuous suppression. Whether this distinction is clinically meaningful for athletes is genuinely uncertain.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">For an athlete who doesn&rsquo;t have T2D, using exenatide or any GLP-1 drug for body composition puts you in off-label territory with real nausea and GI side effects to manage. The muscle preservation question &mdash; whether GLP-1 drugs reduce lean mass alongside fat &mdash; is an active concern with all drugs in this class, exenatide included. The weight loss ceiling with exenatide is so much lower than modern agents that if you&rsquo;re going to explore this space at all, there&rsquo;s little rationale for the older drug. The class contraindications (personal or family history of medullary thyroid carcinoma, pancreatitis history) apply identically across all GLP-1 agents. Net: the mechanism is real, the effect is modest, and there are better modern tools for this goal if you&rsquo;ve decided GLP-1 pharmacology is worth exploring.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker in the GLP-1 Era &mdash; Drug class evolution, receptor pharmacology, mechanistic distinctions</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I want to understand what made the Gila monster peptide the original breakthrough, how GLP-1R agonism was refined from exenatide to semaglutide, and what the jump to dual GIP/GLP-1 agonism in tirzepatide actually adds mechanistically.&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why it&rsquo;s interesting</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Exenatide&rsquo;s discovery is a canonical example of peptide-based drug lead identification from nature</strong><br />Exendin-4 in Gila monster venom was identified as a GLP-1 receptor agonist because the lizard&rsquo;s physiology involves infrequent feeding with pronounced post-prandial insulin responses &mdash; an evolutionary solution to the same metabolic challenge GLP-1 biology addresses in humans. The 53% amino acid homology with human GLP-1 was enough for receptor activation; the non-human sequence conferred DPP-4 resistance that native GLP-1 lacks. This DPP-4 resistance insight became the design principle for all subsequent GLP-1 agonists.</li>
          <li><strong>The exenatide-to-semaglutide evolution illustrates how half-life and receptor affinity drive clinical outcomes</strong><br />Semaglutide added a long-chain fatty acid modification that enables albumin binding, extending half-life to ~one week. Higher receptor binding affinity produces greater central satiety signaling. The combination of continuous receptor occupation and stronger satiety signals is the mechanistic explanation for why semaglutide produces three times the weight loss of exenatide at therapeutic doses. Tirzepatide then adds GIP receptor co-agonism &mdash; a separate incretin receptor that appears to synergize with GLP-1R activation for adipose tissue effects beyond what GLP-1R alone achieves.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The exenatide cardiovascular outcomes trial (EXSCEL) was neutral &mdash; it neither helped nor harmed CV outcomes. Semaglutide&rsquo;s SELECT trial showed significant cardiovascular event reduction even in non-diabetic people with obesity. Understanding why EXSCEL was neutral while SUSTAIN-6 and SELECT were positive requires thinking about dosing, receptor engagement duration, and trial design &mdash; not just mechanism. The 20-year exenatide safety database genuinely adds information about rare adverse events: the pancreatitis signal, the renal effects from dehydration in nausea-prone patients, the medullary thyroid concern (class effect confirmed across all GLP-1 drugs in rodents). Net: the original that validated a class, now scientifically most interesting as the starting point from which the entire incretin pharmacology era evolved.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Exenatide is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Not equivalent to semaglutide or tirzepatide for weight loss &mdash; ~3&ndash;5% vs. ~15&ndash;22% is not a minor gap</li>
              <li>Not the right first choice for cardiovascular risk reduction &mdash; semaglutide has demonstrated CV benefit where exenatide has a neutral trial</li>
              <li>Not a community peptide or research compound &mdash; it is a prescription drug with the same clinical framework as any GLP-1 agent</li>
              <li>Not free from the class-wide contraindications &mdash; pancreatitis history and medullary thyroid carcinoma risk apply equally</li>
              <li>Not outdated in every situation &mdash; it remains appropriate when newer agents are inaccessible or when long-established safety data is specifically valued</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>The first GLP-1 agonist approved anywhere in the world &mdash; a drug discovery story that started with Gila monster venom</li>
              <li>Validated the GLP-1 receptor pharmacology that now anchors a multi-billion-dollar drug class</li>
              <li>Twenty years of post-marketing safety data &mdash; the longest real-world track record in the class</li>
              <li>The DPP-4 resistance insight from exendin-4&rsquo;s non-human origin became the guiding principle for all subsequent GLP-1 drug design</li>
              <li>Its clinical trajectory &mdash; gradual displacement by more potent successors &mdash; is a clear model for how drug class evolution works when the mechanism is right but the pharmacology improves</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
