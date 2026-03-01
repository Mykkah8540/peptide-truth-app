export default function SelankOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Selank is a nasal spray developed in Russia to reduce anxiety without causing sedation or brain fog &mdash; the defining difference from benzodiazepines like Valium or Xanax. Clinical evidence comes from Russian research and is real, but it hasn&rsquo;t been independently replicated in large Western trials, so the exact strength of effect is less certain than FDA-approved options.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; Anxious without wanting to be sedated</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;m stressed and anxious but I don&rsquo;t want to feel like a zombie &mdash; is there something that actually calms me down without wrecking my focus?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Calming without the fog</strong><br />People consistently describe Selank as reducing anxiety while keeping their thinking clear &mdash; they feel calmer, not slower. That&rsquo;s exactly the opposite of what most people experience with traditional anxiety medications, which tend to make you drowsy and impair thinking.</li>
          <li><strong>Fast onset via nasal spray</strong><br />You spray it in your nose and feel something within minutes. It&rsquo;s an on-demand tool rather than a daily pill you have to take for weeks before noticing anything. For situational anxiety &mdash; a stressful work day, a difficult conversation &mdash; the fast onset matters.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The anxiolytic effect is real and plausible based on how it works, but the evidence comes primarily from Russian clinical studies that haven&rsquo;t been replicated with the rigor of FDA-approved anxiety treatments. If you have significant clinical anxiety that needs daily management, Selank is not a substitute for physician-guided care. For situational or performance-related anxiety in an otherwise healthy person, it&rsquo;s one of the more interesting options with a good safety track record in community experience. Net: worth considering for mild situational anxiety; not a replacement for real anxiety treatment.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Athlete &mdash; Needing calm focus under pressure</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My performance tanks when I&rsquo;m too amped up before competition &mdash; can I take the edge off without slowing down my reaction time?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Anxiolytic without sedation or motor impairment</strong><br />Pre-competition or high-stakes performance anxiety impairs output &mdash; too much cortisol and adrenaline narrows focus and creates muscle tension. Selank&rsquo;s profile (anxiety reduction, no sedation) fits this window well. It doesn&rsquo;t blunt alertness the way beta-blockers can, and it doesn&rsquo;t slow reaction time the way benzodiazepines do.</li>
          <li><strong>On-demand use pattern</strong><br />The short action window (hours) and fast intranasal onset fits athletic use cases: take it a short window before you need it, it does its job, and it&rsquo;s cleared. There&rsquo;s no accumulation or daily-dose dependency for an on-demand approach.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">There&rsquo;s no sports-context RCT for Selank. The anxiety-reduction effect is the relevant one for performance, and community experience broadly supports it. Worth noting: Selank is not on WADA&rsquo;s banned list as of early 2026, but it&rsquo;s categorized as a research peptide and testing programs vary. Check your sport&rsquo;s specific rules. Net: a plausible tool for managing performance anxiety without the side effects that make other anxiolytics problematic in sport.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; Anxiolytic + cognitive clarity stack</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I want to understand the mechanism &mdash; how does it actually modulate GABA and enkephalins differently from benzos, and how does stacking it with Semax change the picture?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Distinct mechanism from benzodiazepines</strong><br />Selank modulates the GABAergic system without being a direct GABA-A agonist like benzodiazepines. It also raises endogenous enkephalins (by inhibiting the enzyme that breaks them down). This combination produces anxiety reduction through a more targeted pathway, avoiding the broad CNS suppression that drives benzodiazepine tolerance and dependence. No meaningful tolerance development has been reported &mdash; mechanistically consistent with how it works.</li>
          <li><strong>Selank + Semax as a balanced stack</strong><br />Semax (its Russian companion peptide) is stimulatory and cognitive-activating but can increase anxiety in susceptible people. Selank as a co-administration buffers that anxiogenic edge while Semax drives cognitive activation. The combination is the most discussed Russian nootropic stack for a reason: the two compounds complement each other across the activation-sedation axis.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The mechanistic picture is genuinely interesting and pharmacologically coherent. What&rsquo;s missing is Western replication &mdash; the Russian clinical literature is real science but hasn&rsquo;t been independently validated at FDA-trial standards. Long-term use in healthy humans is not characterized. The stack logic with Semax is community-derived, not trial-validated. Net: a pharmacologically interesting compound with enough mechanistic grounding to take seriously, but expect that you&rsquo;re working at the frontier of what&rsquo;s actually proven.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Selank is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A replacement for clinical anxiety treatment in people with anxiety disorders</li>
              <li>An FDA-approved compound &mdash; evidence is from Russian research</li>
              <li>A sedative &mdash; that&rsquo;s the defining distinction from benzodiazepines</li>
              <li>A daily maintenance medication for chronic anxiety</li>
              <li>A compound with well-characterized long-term use data in Western populations</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>Genuine anxiolytic effect without the sedation or cognitive impairment of benzodiazepines</li>
              <li>Fast onset via nasal spray &mdash; works in the window you need it</li>
              <li>No reported tolerance development &mdash; mechanistically distinct from benzo dependence</li>
              <li>Good community safety record at standard doses</li>
              <li>Complementary with Semax for a balanced stimulation + calm stack</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
