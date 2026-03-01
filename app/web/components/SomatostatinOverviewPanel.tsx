export default function SomatostatinOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Somatostatin is your body&rsquo;s own brake signal for growth hormone, glucagon, insulin, and several other hormones. It&rsquo;s real, important physiology &mdash; but as a drug, it has a fatal flaw: it&rsquo;s cleared from the bloodstream in about 90 seconds, making it useless for anything except continuous IV infusion in a research or hospital setting. The clinically useful drugs in this space are its long-acting analogs: octreotide and lanreotide.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; Researching GH and wanting to understand the axis</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I keep seeing somatostatin mentioned when people talk about growth hormone &mdash; what is it exactly, and why does it matter if I&rsquo;m thinking about GH peptides?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It explains how GH pulses actually work</strong><br />Growth hormone isn&rsquo;t released in a constant stream &mdash; it comes in pulses, mostly at night during deep sleep. That pulsatile pattern is controlled by two opposing signals: one that triggers GH release and one that stops it. Somatostatin is the stop signal. Understanding how the brake works is genuinely important context for anyone thinking about GH-stimulating peptides &mdash; you can&rsquo;t understand the gas pedal without knowing there&rsquo;s also a brake.</li>
          <li><strong>Why timing matters for GH peptides</strong><br />When somatostatin levels are low (like just after they naturally withdraw), the GH release signal gets a much bigger response. Experienced GH peptide users time their injections to align with natural somatostatin withdrawal windows. That strategy only makes sense if you understand what somatostatin is doing.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">If you&rsquo;re here because you want to inject somatostatin to modulate your GH axis, that approach doesn&rsquo;t work pharmacologically. The 90-second half-life means it&rsquo;s gone before it can do sustained anything from a subcutaneous injection. This is a compound to understand, not to use. Net: essential context for understanding GH physiology; not a compound to administer yourself.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Curious Reader &mdash; Heard about neuroendocrine tumors or acromegaly</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;Someone in my family has acromegaly and they&rsquo;re on octreotide &mdash; I read that it&rsquo;s a somatostatin analog. What is somatostatin, and why do they need an analog instead of the real thing?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Somatostatin is the hormone that clinical analogs are designed to mimic</strong><br />Octreotide and lanreotide (brand names Sandostatin and Somatuline) are synthetic compounds specifically engineered to do what somatostatin does but last much longer. They&rsquo;re used to treat acromegaly (excess GH), carcinoid syndrome (tumors that overproduce hormones), and other conditions. Understanding somatostatin itself explains why those drugs work the way they do.</li>
          <li><strong>The analog approach solved a real pharmacological problem</strong><br />The reason analogs exist &mdash; rather than just using somatostatin &mdash; is precisely the half-life problem. Researchers engineered analogs with the same receptor-binding but dramatically extended lifespans: hours to weeks instead of seconds. That&rsquo;s pharmaceutical chemistry solving a real biological limitation, and it&rsquo;s a good example of how drugs get developed.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Somatostatin itself is not a treatment for anything in a clinical context &mdash; the analogs are. If a family member is being treated for acromegaly or a neuroendocrine tumor, their physician is using the pharmacologically rational tools. This page is reference education, not treatment guidance. Net: a fascinating piece of endocrine biology that&rsquo;s directly relevant to understanding a large class of FDA-approved drugs.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; GH axis regulation and analog pharmacology</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I want to understand the somatostatin receptor subtypes and what the selectivity differences between octreotide and pasireotide actually mean for GH suppression vs. the glucose side effects.&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Five receptor subtypes with distinct tissue profiles</strong><br />Somatostatin acts through five receptor subtypes (labeled 1 through 5) distributed across different tissues. Octreotide strongly prefers subtypes 2 and 5 &mdash; which dominate in pituitary and GH-secreting tumor cells, making it effective for GH suppression with relatively manageable glucose effects. Pasireotide hits subtypes 1, 2, 3, and 5 &mdash; broader coverage that helps in Cushing&rsquo;s disease but comes with significantly higher diabetes risk from stronger insulin suppression. The selectivity is engineered and clinically meaningful.</li>
          <li><strong>Timing interactions with GH secretagogue protocols</strong><br />For people running GH secretagogue protocols (ipamorelin, CJC-1295), the somatostatin withdrawal model directly informs timing strategy. Natural somatostatin withdrawal in early morning hours is part of why dawn-window injections produce stronger GH pulses. This is the most practically relevant somatostatin knowledge for community GH optimization work.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Community interest in injecting native somatostatin for GH axis timing protocols reflects a pharmacokinetic misunderstanding &mdash; a 90-second half-life means you cannot create a meaningful timed somatostatin withdrawal from subcutaneous injection. The somatostatin withdrawal you&rsquo;re trying to exploit happens endogenously on its own schedule; you cannot meaningfully manipulate it by injecting native somatostatin. If GH axis manipulation is the goal, GH secretagogues timed to natural windows are the pharmacologically rational path. Net: essential endocrine biology knowledge; native somatostatin is a reference compound, not a tool.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Somatostatin is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A practical injectable compound &mdash; 90-second half-life makes subcutaneous use pharmacologically meaningless</li>
              <li>What your physician prescribes &mdash; they prescribe octreotide or lanreotide, the analogs</li>
              <li>A tool for GH axis timing protocols &mdash; you cannot meaningfully manipulate it exogenously</li>
              <li>An FDA-approved drug in any form &mdash; the analogs are approved; native somatostatin is not</li>
              <li>Something to inject for any reason outside a hospital or research IV setting</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>Foundational endocrine biology &mdash; the stop signal in GH pulse physiology</li>
              <li>Explains why GH secretagogue timing protocols are designed as they are</li>
              <li>The template for a major class of FDA-approved drugs (octreotide, lanreotide, pasireotide)</li>
              <li>Five distinct receptor subtypes with clinically meaningful pharmacological selectivity differences</li>
              <li>Relevant context for anyone researching acromegaly, neuroendocrine tumors, or GH axis physiology</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
