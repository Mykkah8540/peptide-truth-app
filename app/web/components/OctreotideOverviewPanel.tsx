export default function OctreotideOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Octreotide (Sandostatin) is a real medicine with strong clinical evidence &mdash; FDA-approved
        for acromegaly, carcinoid syndrome, and VIPomas. If you have one of those conditions, this is
        a core treatment option your doctor should have discussed. If you don&rsquo;t, the community
        framing around octreotide for growth hormone suppression or longevity gets the pharmacology
        exactly backwards from what people who actually use GH-stimulating peptides would want.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; patient with an octreotide prescription</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My doctor just told me I need Sandostatin &mdash; what is this drug actually doing and what should I expect?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why this is the right compound for them</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It mimics a natural hormone your body uses to turn down growth signals</strong><br />Your body makes a hormone called somatostatin that tells the pituitary gland to slow down growth hormone production and tells the gut to reduce certain secretions. Octreotide is a synthetic version engineered to last much longer than the natural hormone &mdash; hours instead of minutes. In acromegaly, where GH is chronically too high, octreotide brings it back down. In carcinoid syndrome, it suppresses the excess serotonin that causes flushing and diarrhea. It&rsquo;s addressing a measurable hormone excess with a targeted pharmacological tool.</li>
          <li><strong>Monthly injection vs daily injections &mdash; the LAR formulation</strong><br />The standard long-term form (Sandostatin LAR) is a depot injection your doctor or clinic gives you once a month. The drug is embedded in microspheres that slowly release over 28 days. This replaces the older three-times-daily subcutaneous injection approach. Once stable on the LAR, most patients have significantly lower treatment burden than the initial titration period.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">About half to two-thirds of acromegaly patients get meaningful GH and IGF-1 normalization on octreotide &mdash; not everyone responds equally, and it depends on tumor characteristics. Gallstones are a real long-term concern (15&ndash;20% develop them over years of use) because octreotide slows gallbladder emptying. Your doctor should be monitoring gallbladder function. Blood sugar changes are also possible in both directions &mdash; octreotide affects insulin secretion. These are physician-managed monitoring requirements, not things to self-track without guidance. <strong>Net: effective, well-characterized medicine; requires ongoing monitoring for known side effects.</strong></p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Curious Reader &mdash; cardiovascular or GI context</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I saw octreotide mentioned in something about variceal bleeding or carcinoid tumors &mdash; why does a hormone suppress bleeding from the gut?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The variceal bleeding application is a beautiful example of mechanism-driven drug use</strong><br />In liver disease, portal hypertension causes varices &mdash; fragile enlarged veins in the esophagus that can rupture and bleed severely. Octreotide reduces portal blood pressure by constricting splanchnic (gut) blood vessels through somatostatin receptor activation. It&rsquo;s not treating the liver; it&rsquo;s reducing blood pressure in the specific vascular bed that&rsquo;s causing the bleeding. This off-label use, supported by multiple trials, is standard emergency management alongside endoscopic treatment.</li>
          <li><strong>Carcinoid syndrome shows how a hormone-blocking drug can control tumor symptoms</strong><br />Neuroendocrine tumors often secrete serotonin and other vasoactive molecules, causing flushing, diarrhea, and sometimes heart disease. Octreotide doesn&rsquo;t shrink the tumor, but it dramatically reduces hormone secretion &mdash; which means patients can live more comfortably even with a tumor present. This is the palliative pharmacology concept in action.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Both the variceal bleeding and carcinoid syndrome applications are hospital or specialist-managed clinical uses &mdash; not things with any self-administration angle. Understanding the mechanism is genuinely interesting pharmacological education. If you have a neuroendocrine tumor or cirrhosis and want to understand what the treatment options are doing, this page is appropriate context. If you encountered octreotide in a community peptide context, it&rsquo;s worth knowing it&rsquo;s a GH-suppressing drug, not a GH-enhancing one. <strong>Net: illuminating mechanism story; clinical drug with no community use angle.</strong></p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; GH/IGF-1 axis and somatostatin pharmacology</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;ve been using GH secretagogues and I want to understand where octreotide fits in the axis &mdash; is there any legitimate reason to use it alongside or in opposition to a GH-stimulating protocol?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Understanding the somatostatin side of the axis completes the GH regulation picture</strong><br />GH is regulated by two opposing hypothalamic signals: GHRH (growth hormone releasing hormone) stimulates GH release and somatostatin suppresses it. Most community GH compounds &mdash; CJC-1295, ipamorelin, MK-677 &mdash; work on the stimulating side. Octreotide works on the suppressing side. Understanding this axis completely means understanding both arms, which gives real context for why GH secretagogue timing strategies (like avoiding somatostatin troughs) are discussed in the literature and community protocols.</li>
          <li><strong>The somatostatin receptor subtypes and selectivity story is pharmacologically instructive</strong><br />Somatostatin acts on five receptor subtypes (SSTR1&ndash;5) with different tissue distributions. Octreotide preferentially binds SSTR2 and SSTR5, which is why it suppresses GH (pituitary SSTR2) and gut hormones (GI SSTR2/5) but less so the pancreatic insulin effects of SSTR1/3. Pasireotide, the third-generation somatostatin analogue, hits more subtypes and consequently causes worse hyperglycemia. This receptor subtype selectivity story is a clean example of how GPCR subtype pharmacology translates to clinical effect profiles.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">There is no legitimate use case for octreotide in someone pursuing GH optimization or GH secretagogue protocols. Octreotide blocks GH release at the pituitary &mdash; it directly opposes CJC-1295, ipamorelin, and MK-677. Using both simultaneously is pharmacological cancellation, not synergy. The community framing of octreotide for IGF-1 reduction for longevity purposes misses that GH and IGF-1 suppression in GH-normal adults has no established benefit and potential harms including metabolic and bone effects. The longevity-IGF-1 hypothesis is far more nuanced than &ldquo;lower IGF-1 is always better.&rdquo; <strong>Net: essential context for understanding the GH axis; directly counterproductive to GH secretagogue use; requires clinical indication and physician management.</strong></p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Octreotide is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A compound compatible with GH secretagogue use &mdash; it blocks GH release and directly opposes CJC-1295, ipamorelin, and MK-677</li>
              <li>A longevity optimization tool for healthy people &mdash; suppressing GH/IGF-1 without clinical indication has no established benefit</li>
              <li>Safe for self-administration without physician monitoring for gallstones, glucose, and cardiac effects</li>
              <li>Something with a plausible community use case &mdash; it requires either monthly clinic-administered depot or physician-managed SC injection protocols</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>FDA-approved with strong clinical trial evidence for three distinct indications</li>
              <li>The pharmacological engineering story &mdash; how octreotide improved on natural somatostatin through structural modification for longer half-life</li>
              <li>The variceal bleeding application is a elegant example of targeting a specific vascular bed through systemic hormone receptor pharmacology</li>
              <li>The receptor subtype selectivity differences between octreotide, lanreotide, and pasireotide are a model case in clinical pharmacology</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
