export default function LeuprolideOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Leuprolide is one of medicine&rsquo;s most counterintuitive drugs: it mimics the hormone that normally turns on testosterone production, but when given continuously it does the opposite &mdash; it shuts testosterone down to near-zero. That paradox is the entire mechanism, and it&rsquo;s why it&rsquo;s the standard treatment for prostate cancer, endometriosis, and other hormone-driven conditions. It is not a peptide community wellness compound. There is no reasonable self-administration use case.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Patient or Caregiver &mdash; Prostate Cancer, Endometriosis, or a Related Diagnosis</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My father just started Lupron for prostate cancer. What is this drug actually doing, what side effects should we watch for, and how long does each injection last?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why it&rsquo;s prescribed</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It starves hormone-driven cancers and conditions of the fuel they need</strong><br />Prostate cancer cells grow in response to testosterone. Endometriosis grows in response to estrogen. Leuprolide eliminates the fuel by shutting down the entire sex hormone production system. Within a few weeks of the first injection, testosterone falls to castrate levels in men and estrogen drops sharply in women. Tumors and lesions that depend on these hormones stop growing or shrink. One injection lasts 1, 3, 4, or 6 months depending on the formulation &mdash; which is why adherence is not a daily concern.</li>
          <li><strong>It has decades of data and is considered standard of care</strong><br />Leuprolide (Lupron) has been in clinical use since the 1980s. The evidence base for prostate cancer, endometriosis, uterine fibroids, and precocious puberty is among the most extensive of any drug in its class. When a physician prescribes it, they&rsquo;re drawing on one of the most thoroughly studied hormone-modifying treatments in medicine.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The side effects of leuprolide are the direct consequences of sex hormone deprivation &mdash; hot flashes affect most men on it, and they can be severe. Loss of libido, erectile dysfunction, bone density loss with prolonged use, muscle loss, and metabolic changes are expected and real. In prostate cancer, the first week can cause a temporary hormone spike before suppression kicks in, which can worsen bone pain temporarily &mdash; oncologists manage this with a short course of anti-androgen medication. Net: highly effective for its indicated uses; the side effect burden is significant and requires active management as part of treatment.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Curious Reader &mdash; Understanding the GnRH Agonist Paradox</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I keep seeing leuprolide come up in discussions about hormones. How does a drug that activates the same receptor as the body&rsquo;s own hormone-triggering signal end up suppressing hormones instead of raising them?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why it&rsquo;s worth understanding</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The paradox explains an entire class of hormone therapies &mdash; and a common community mistake</strong><br />Your brain releases a signal (GnRH) in rhythmic pulses that tell the pituitary to make hormones that stimulate the gonads. Leuprolide mimics that signal &mdash; but it does so continuously instead of in pulses. The pituitary receptor for this signal becomes overwhelmed, stops responding, and shuts down. The result is the opposite of stimulation. This is why GnRH agonist drugs like leuprolide suppress testosterone rather than raise it. Community users who believe leuprolide will help restore testosterone after a steroid cycle have this mechanism exactly backward.</li>
          <li><strong>The pulsatile vs. continuous distinction has consequences across the whole hormone axis</strong><br />The same principle applies to kisspeptin (the signal upstream of GnRH) and explains why gonadorelin stimulates the axis when given in pulses but suppresses it when given continuously. Understanding leuprolide&rsquo;s paradox gives you the framework to understand an entire class of hormone pharmacology: continuous activation of a pulsatile signaling receptor causes desensitization and effective shutdown, not amplification.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">There is no community wellness application for leuprolide. Anyone self-administering depot leuprolide outside of physician-supervised clinical care is committing to months of testosterone or estrogen suppression that cannot be reversed once the injection is given &mdash; the depot has no off switch. The axis recovery after prolonged leuprolide use takes 3&ndash;18 months and is not guaranteed to be complete. Net: one of the most important drugs to understand in the hormone pharmacology space; zero legitimate self-administration use case.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Researcher &mdash; Hormonal Cancer Treatment and GnRH Receptor Pharmacology</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I want to understand how androgen deprivation therapy with leuprolide fits into the modern prostate cancer treatment landscape and how GnRH antagonists like degarelix compare mechanistically.&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why it&rsquo;s worth understanding</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The initial flare is a clinically significant pharmacological feature that requires management</strong><br />In the first days after leuprolide injection, before receptor desensitization takes hold, there is a transient spike in LH, FSH, and testosterone. In prostate cancer, this flare can cause temporary disease worsening &mdash; bone pain, urinary obstruction. Standard clinical practice covers the flare period with a short course of anti-androgen medication (bicalutamide or enzalutamide). GnRH antagonists like degarelix avoid the flare entirely because they block the receptor directly rather than overstimulating it. The agonist vs. antagonist distinction in this class has real clinical consequences.</li>
          <li><strong>Long-term ADT management has become a subspecialty of oncology</strong><br />The cardiovascular risk, bone density loss, metabolic syndrome, and quality-of-life burden of prolonged androgen deprivation therapy require active co-management. Bone density monitoring with DEXA scans, calcium and vitamin D supplementation, cardiovascular risk assessment, and exercise prescription are all part of evidence-based ADT management. The drug itself is one component of a clinical management program.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The debate between GnRH agonists (leuprolide, triptorelin) and antagonists (degarelix, relugolix) in prostate cancer management is active and nuanced &mdash; antagonists avoid the flare and may have cardiovascular advantages, but agonists have longer track records and available long-duration depots. The choice is clinical and context-dependent, not a simple answer. Relugolix (Orgovyx) as a daily oral GnRH antagonist has added another dimension to this comparison. Net: a drug class where the pharmacology is well-understood and the clinical management has become sophisticated; self-administration context is not applicable.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Leuprolide is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Not a testosterone booster or axis stimulator &mdash; it suppresses the axis; PCT use is pharmacologically backward</li>
              <li>Not reversible within the injection window &mdash; 1, 3, or 6-month depot has no off switch once administered</li>
              <li>Not a wellness or optimization compound &mdash; the side effect burden of sex hormone deprivation is clinically significant</li>
              <li>Not something to self-administer &mdash; requires physician oversight for initiation, flare management, and ongoing monitoring</li>
              <li>Not the same as pulsatile GnRH agonists like gonadorelin &mdash; the pulsatile vs. continuous distinction is the entire explanation for opposite hormonal outcomes</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>Illustrates the GnRH agonist paradox &mdash; continuous receptor activation causes suppression rather than stimulation</li>
              <li>Decades of clinical use and one of the broadest FDA indication sets of any hormone-modifying drug</li>
              <li>The agonist vs. antagonist class comparison (leuprolide vs. degarelix) is a clean example of how mechanism determines clinical consequences</li>
              <li>Understanding leuprolide explains why community PCT reasoning about GnRH agonist class drugs is mechanistically wrong</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
