export default function OrexinAOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Orexin-A is the wakefulness neuropeptide &mdash; when the neurons that make it are destroyed,
        the result is narcolepsy with sudden muscle collapse triggered by emotion. Orexin-blocking
        drugs are FDA-approved sleep medicines. Orexin-A replacement for narcolepsy is the rational
        therapeutic target that hasn&rsquo;t been solved yet, and the problem is delivery: the peptide
        needs to reach the brain, and subcutaneous injection hasn&rsquo;t been shown to get it there.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; narcolepsy or excessive daytime sleepiness</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I have narcolepsy or severe daytime sleepiness &mdash; orexin is the system involved. Is there anything I should know about where treatments stand?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The biology of narcolepsy is orexin deficiency &mdash; the connection is direct and established</strong><br />Type 1 narcolepsy is caused by the immune system destroying the small cluster of orexin-producing neurons in the hypothalamus. Without orexin stabilizing the brain in the wake state, the sleep-wake switch becomes unstable &mdash; which is why narcoleptics have sleep attacks, and why strong emotion can trigger sudden muscle weakness (cataplexy) that resembles REM muscle paralysis. This is one of the clearest examples of a neurological disease with a known, specific biological cause.</li>
          <li><strong>Orexin replacement is the mechanistically logical treatment that doesn&rsquo;t fully exist yet</strong><br />Modafinil, sodium oxybate, and stimulants help with symptoms but don&rsquo;t address the underlying orexin deficit. Several pharmaceutical companies are developing orexin receptor agonists that can actually restore the missing signal &mdash; some of which are in late-stage clinical trials. For someone with narcolepsy, following this drug development pipeline is genuinely relevant: orexin agonist approval would represent a different category of treatment than anything currently available.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Orexin-A as a peptide for injection is not an available treatment for narcolepsy &mdash; the delivery problem (getting the peptide to the brain from a peripheral injection) hasn&rsquo;t been solved for subcutaneous administration. Intranasal orexin-A has been studied in small human trials with positive results, which is the closest thing to orexin replacement currently investigated in humans. If you have narcolepsy and are curious about research participation or emerging treatments, a sleep specialist with expertise in narcolepsy is the right conversation partner. <strong>Net: the biology fully explains narcolepsy; the replacement therapy is coming but not yet here; current treatment is symptom management.</strong></p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Athlete &mdash; sleep quality and wakefulness optimization</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;m interested in optimizing my sleep and daytime alertness &mdash; the orexin system drives wakefulness, so is there something here worth paying attention to?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The orexin system is the wakefulness architecture worth understanding</strong><br />Orexin doesn&rsquo;t just create alertness &mdash; it stabilizes the transition between sleep and wake, preventing inappropriate intrusions of either state into the other. Athletes who understand this appreciate why sleep quality and daytime alertness are connected at the same circuit level. The orexin-blocking sleep drugs (suvorexant, lemborexant) work by deliberately dampening this stabilizing signal, which is mechanistically different from traditional sedative approaches.</li>
          <li><strong>The opposite direction &mdash; blocking orexin for sleep &mdash; is an FDA-approved option worth knowing</strong><br />If an athlete struggles with sleep onset despite good sleep hygiene, the orexin antagonist class (suvorexant, lemborexant) is an interesting option precisely because it works through the wakefulness circuit rather than through general sedation. Understanding the orexin system explains why these sleep drugs have a different feel than benzodiazepines or antihistamines.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Subcutaneous orexin-A injection for wakefulness enhancement in a healthy athlete is not pharmacologically supported. If the peptide doesn&rsquo;t cross the blood-brain barrier from a subcutaneous injection &mdash; and there&rsquo;s no evidence it does &mdash; then you&rsquo;re getting the peripheral cardiovascular effects (heart rate, blood pressure increase from orexin receptor activation in the autonomic nervous system) without the central wakefulness effect you intended. Modafinil has a well-established CNS delivery mechanism and decades of wakefulness evidence; it&rsquo;s the better-grounded tool for anyone wanting legitimate wakefulness pharmacology. <strong>Net: the orexin system is valuable educational context; the compound itself doesn&rsquo;t have an established athlete use case.</strong></p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; wakefulness pharmacology and CNS delivery</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I want to understand whether subcutaneous orexin-A actually reaches orexin receptors in the brain and what the pharmacokinetic case for or against this route actually looks like.&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The blood-brain barrier question for orexin-A is genuinely interesting and unresolved</strong><br />Orexin-A is a 33-amino acid peptide &mdash; larger than most peptides with established CNS effects from peripheral injection. Intravenous orexin-A does not produce clear CNS wakefulness effects, which is consistent with limited BBB penetration. Intranasal orexin-A bypasses the BBB via the olfactory nerve pathway and has produced measurable wakefulness effects in narcoleptic humans in small studies. Subcutaneous has never been studied for CNS penetration. The pharmacokinetic case for why subcutaneous might or might not work involves thinking through peptide size, lipophilicity, active transport, and the nose-to-brain literature as an analogous model.</li>
          <li><strong>The orexin agonist drug development pipeline is worth tracking</strong><br />Several small molecules that activate orexin receptors (unlike the peptide itself, small molecules can often cross the BBB from peripheral administration) are in clinical development for narcolepsy. TAK-994 (Takeda) showed remarkable phase 2 results in narcolepsy before safety halting; subsequent candidates are advancing. For a biohacker interested in wakefulness pharmacology at the frontier, the orexin agonist drug development story is one of the more active and scientifically grounded areas of CNS pharmacology to follow.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The community use of subcutaneous orexin-A for wakefulness rests on an unverified assumption of CNS delivery. Without that assumption, you have peripheral orexin receptor activation &mdash; cardiovascular sympathetic stimulation, potential GI and energy metabolism effects &mdash; without the intended wakefulness benefit. The scientific community studying orexin-A for narcolepsy uses intranasal delivery, not subcutaneous, for exactly this reason. Anyone using subcutaneous orexin-A should acknowledge they&rsquo;re working from an evidence gap, not a pharmacological rationale. The long-term receptor desensitization question for chronic exogenous use is also entirely unaddressed in the literature. <strong>Net: fascinating neuroscience with a genuine therapeutic frontier; the community subcutaneous use case lacks pharmacokinetic justification.</strong></p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Orexin-A is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A compound with established CNS delivery from subcutaneous injection &mdash; BBB penetration via this route is not demonstrated</li>
              <li>An approved or available narcolepsy treatment &mdash; orexin replacement is a therapeutic goal, not a current option</li>
              <li>A better wakefulness tool than modafinil for healthy users &mdash; modafinil has established CNS mechanism and decades of evidence</li>
              <li>Characterized for long-term use or receptor desensitization dynamics in humans</li>
              <li>Safe to assume produces the wakefulness effects if CNS delivery is not occurring</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>The cleanest neuropeptide-disease causal story in neuroscience &mdash; loss of orexin neurons directly causes narcolepsy</li>
              <li>FDA-approved orexin antagonists prove the system is pharmacologically targetable in humans</li>
              <li>Intranasal delivery has been studied in human narcolepsy with positive signals &mdash; represents a real frontier in CNS peptide delivery</li>
              <li>The orexin agonist drug development pipeline is active and potentially near approval for narcolepsy</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
