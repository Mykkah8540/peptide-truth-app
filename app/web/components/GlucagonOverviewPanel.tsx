export default function GlucagonOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Glucagon is a hormone your pancreas makes to raise blood sugar when it drops too low. It is FDA-approved as a life-saving rescue treatment for severe low blood sugar episodes. It is not an enhancement compound &mdash; but understanding it explains a key piece of how GLP-1 weight loss drugs work and why some newer obesity drugs are designed the way they are.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Diabetic or Caregiver &mdash; insulin user who needs the emergency picture</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My doctor mentioned a glucagon kit but I&rsquo;m not totally sure when to use it or which one to get. What do I actually need to know?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Modern formulations are actually easy to use in a crisis</strong><br />The old glucagon kit required mixing powder with liquid under emergency conditions &mdash; hard to do when someone is barely conscious. Baqsimi is a nasal powder that a bystander can use without any preparation. Gvoke is a prefilled autoinjector. These are meaningful improvements that make rescue actually accessible.</li>
          <li><strong>Blood sugar rises within minutes</strong><br />After administration, glucagon signals the liver to release stored glucose. Blood sugar typically starts rising within 5&ndash;10 minutes. For a severe hypoglycemia event, that speed matters.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Glucagon works by releasing glucose already stored in the liver &mdash; which means if the liver&rsquo;s stores are depleted (from fasting, alcohol, or prolonged hypoglycemia), it may work less well or not at all. After any rescue, the person needs to eat to replenish those stores and sustain blood sugar. Glucagon rescue is not a substitute for getting to the ER if the person doesn&rsquo;t recover quickly. Net: every insulin user and their household should have a modern rescue formulation available and know how to use it &mdash; no exceptions.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Curious Reader &mdash; trying to understand metabolic physiology</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I keep seeing glucagon mentioned when people explain how GLP-1 drugs like Ozempic work. What exactly is glucagon doing in that story?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Glucagon is the key to understanding how GLP-1 drugs lower blood sugar</strong><br />GLP-1 drugs don&rsquo;t just boost insulin &mdash; they also suppress glucagon. After a meal in type 2 diabetes, glucagon is often too high, which drives excess glucose release from the liver and makes blood sugar worse. GLP-1 drugs fix that. Understanding glucagon makes the whole mechanism click.</li>
          <li><strong>It explains why newer drugs like retatrutide target glucagon directly</strong><br />Retatrutide is a triple agonist that targets the glucagon system alongside GLP-1 and GIP. In the obesity context, glucagon receptor activation appears to increase energy expenditure and fat burning. That seems to contradict glucagon&rsquo;s glucose-raising role &mdash; understanding why it&rsquo;s not actually a contradiction requires knowing the dose and context story.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">This is metabolic physiology education, not a compound to take. Glucagon itself has no community use case &mdash; there is no reason to inject it for any optimization or wellness purpose. The glucagon-axis pharmacology of real clinical interest lives in GLP-1 drugs (which suppress glucagon) and next-generation triple agonists (which activate it in a very specific engineered way). Net: essential background knowledge for understanding the most important drug class in obesity medicine; not something you use yourself.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; metabolic systems thinker, frontier pharmacology</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;If glucagon raises blood sugar but triple agonists use it for fat loss, what&rsquo;s the actual mechanism? And is there any angle on glucagon for metabolic optimization outside of triple agonist drugs?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The glucagon receptor&rsquo;s role in fat metabolism is genuinely interesting</strong><br />In adipose tissue, glucagon receptor activation promotes fat oxidation and thermogenesis &mdash; separate from its glucose-raising function in the liver. Triple agonists exploit this in a carefully engineered context where GLP-1 co-activity prevents net hyperglycemia. Understanding the tissue-specific glucagon receptor biology is frontier pharmacology.</li>
          <li><strong>The paradox of glucagon in obesity treatment reveals real systems complexity</strong><br />A hormone that raises blood sugar being used for fat loss is counterintuitive &mdash; until you understand that the fat-burning and thermogenic effects can dominate when other parts of the system are simultaneously controlled. This is the kind of systems-level pharmacology that retatrutide represents.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">There is no standalone glucagon injection protocol for any optimization purpose. The context in which glucagon receptor activation benefits fat metabolism requires GLP-1 co-activity to prevent the glucose-raising effects from dominating &mdash; which is exactly why triple agonists exist as engineered molecules, not as glucagon injection plus a GLP-1 drug. Any community attempt to recreate this independently would require pharmaceutical-grade engineering that does not exist in self-administration protocols. Net: deeply interesting biology, zero practical DIY application; the real application is in approved triple-agonist drugs coming through the clinical pipeline.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Glucagon is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Not an enhancement or optimization compound &mdash; no community use protocol exists or makes sense</li>
              <li>Not a weight loss drug &mdash; the glucagon-axis fat-burning effect requires engineered triple-agonist context</li>
              <li>Not a substitute for addressing the underlying cause of recurrent hypoglycemia</li>
              <li>Not interchangeable with GLP-1 drugs &mdash; they work in opposite directions on the glucagon axis</li>
              <li>Not effective as an oral product &mdash; any oral &ldquo;glucagon&rdquo; supplement is not bioavailable</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>FDA-approved life-saving rescue medication for severe low blood sugar &mdash; every insulin user should have a modern formulation available</li>
              <li>Central to understanding how GLP-1 drugs work (they suppress it)</li>
              <li>Explains the mechanism behind next-generation triple agonists like retatrutide</li>
              <li>The tissue-specific glucagon biology (liver vs. fat vs. heart) is a window into how the same hormone can have opposite effects depending on context</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
