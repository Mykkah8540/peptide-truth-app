export default function LanreotideOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Lanreotide is a prescription-only drug that suppresses growth hormone &mdash; it&rsquo;s the pharmacological opposite of what most people in the peptide community are trying to do. It&rsquo;s FDA-approved for serious conditions: a pituitary tumor that produces too much GH, and certain gut tumors. One monthly injection maintains therapeutic levels for a full month. If you&rsquo;re using GH-boosting peptides, this is the brake on the system you&rsquo;re trying to press the gas on.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Patient &mdash; Acromegaly or Neuroendocrine Tumor Context</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My doctor just prescribed Somatuline for my acromegaly. What should I actually expect from this drug and what do I need to watch out for?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re on it</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It turns down a pituitary tumor that&rsquo;s making too much growth hormone</strong><br />Acromegaly means your pituitary has a tumor that keeps producing GH when it shouldn&rsquo;t. Over years, that excess GH causes hands and feet to enlarge, facial features to coarsen, joints to ache, and serious cardiovascular complications. Lanreotide mimics a natural hormone called somatostatin that normally tells the pituitary to stop releasing GH &mdash; so it acts directly on the tumor to suppress its output. One deep injection every 28 days maintains this suppression continuously.</li>
          <li><strong>For neuroendocrine tumors, it slows the tumor down and controls symptoms</strong><br />Some tumors of the gut and pancreas respond to somatostatin signals &mdash; lanreotide can slow their growth and reduce the hormonal secretion that causes carcinoid syndrome (flushing, diarrhea). The CLARINET trial was a landmark study showing it significantly extended time before tumor progression compared to placebo in patients with gut and pancreatic neuroendocrine tumors.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Expect GI symptoms &mdash; loose stools, nausea, and bloating are most common in the first weeks and usually improve. Blood sugar can shift in either direction: lanreotide reduces insulin secretion (raises glucose) but also reduces GH (improves insulin sensitivity) and the net effect varies by person. Gallstones are a long-term concern because the drug reduces gallbladder contractions &mdash; periodic ultrasound monitoring is part of the standard protocol. Net: effective and well-characterized for its approved uses; the side effect profile reflects the drug doing exactly what it&rsquo;s supposed to do, which is suppress a broad set of hormonal signals.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Curious Reader &mdash; Understanding the GH Suppression Axis</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;ve been reading about GH secretagogues and ipamorelin. What exactly is lanreotide and why does it do the opposite of what peptide users are trying to do?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why it&rsquo;s worth understanding</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It explains the natural brake on the GH system</strong><br />Your body regulates GH with two opposing signals: GHRH (growth hormone-releasing hormone) tells the pituitary to release GH; somatostatin tells it to stop. Ipamorelin and CJC-1295 work by amplifying the GHRH signal. Lanreotide mimics somatostatin &mdash; it&rsquo;s chemically turning up the brake. Understanding lanreotide helps you understand what the GH secretagogues are working against, which is why the stack protocols time injections away from the natural somatostatin peak.</li>
          <li><strong>The once-monthly extended-release formulation is a genuine pharmacological achievement</strong><br />The challenge of making a drug that stays at therapeutic levels for a full month is not trivial. Lanreotide Depot accomplishes this through an aqueous gel formulation that slowly releases the drug from the injection site over 28&ndash;42 days. No reconstitution required &mdash; it comes ready to inject. This kind of sustained-release design for a peptide drug is the engineering behind the convenience.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Lanreotide is a prescription drug for serious conditions &mdash; it&rsquo;s not something you experiment with for longevity or body composition. Anyone in the peptide community who encounters suggestions that lowering GH or IGF-1 could be beneficial for longevity (based on animal lifespan data) should know that the human evidence for this strategy is essentially absent and that the side effect burden of lanreotide in healthy adults would be significant. Net: a well-designed drug for the right indications; completely wrong tool for community optimization goals.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; Somatostatin Pharmacology and GH Axis Architecture</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I want to understand SSTR2/5 receptor pharmacology and how long-acting somatostatin analogues relate to the GH secretagogue timing protocols I&rsquo;m already running.&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why it&rsquo;s worth understanding</p>
        <ol className="reta-overview__profile-why">
          <li><strong>SSTR2 is the receptor your GH secretagogues are competing against</strong><br />Somatostatin suppresses GH release through somatostatin receptors on pituitary cells &mdash; primarily SSTR2 and SSTR5. Lanreotide has high affinity for both. Your ipamorelin and CJC-1295 protocols work best when somatostatin tone is naturally low &mdash; which is why pre-bed dosing is recommended (somatostatin tone is lower during early sleep). Understanding this receptor competition explains the timing logic and why the protocols are structured the way they are.</li>
          <li><strong>Pasireotide vs. lanreotide illustrates how SSTR subtype selectivity changes the risk profile</strong><br />The second-generation somatostatin analog pasireotide hits SSTR1, 2, 3, and 5 instead of just 2 and 5 like lanreotide. Broader receptor coverage produces higher GH/IGF-1 suppression in acromegaly &mdash; but also dramatically more hyperglycemia because SSTR5 inhibition of insulin secretion is stronger. This is a clean example of how receptor subtype selectivity engineering changes both efficacy and safety.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The longevity hypothesis around lower IGF-1 is worth knowing about precisely because you can evaluate it critically: the animal model correlations (lower IGF-1 signaling = longer lifespan in some organisms) do not translate cleanly to human clinical benefit, and the side effect profile of pharmacological somatostatin analog therapy in a healthy person would be substantial. For any biohacker using GH secretagogues who is prescribed lanreotide for an actual indication, these are pharmacologically opposed mechanisms &mdash; a conversation with your prescriber is not optional. Net: lanreotide is primarily an intellectual reference point for understanding GH axis pharmacology, not a tool for optimization.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Lanreotide is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Not a performance or optimization compound &mdash; it suppresses GH and IGF-1, which is the opposite of what most community users want</li>
              <li>Not compatible with GH secretagogue use &mdash; combining them is pharmacologically incoherent outside of specific clinical situations</li>
              <li>Not a longevity drug based on current human evidence, despite the IGF-1 lifespan correlations in animal models</li>
              <li>Not available without a prescription &mdash; this is an Rx-only drug with a defined indication set</li>
              <li>Not reversible within the injection window &mdash; once the depot is injected, you commit to a month of somatostatin analog effect</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>FDA-approved with landmark trial data (CLARINET) for neuroendocrine tumors &mdash; a genuinely well-evidenced drug for its indications</li>
              <li>Illustrates the somatostatin side of GH regulation that GH secretagogue protocols work around</li>
              <li>The sustained-release depot formulation is a useful example of how peptide pharmacology engineering works</li>
              <li>SSTR subtype selectivity comparison with pasireotide is a clean teachable example of receptor pharmacology shaping safety profiles</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
