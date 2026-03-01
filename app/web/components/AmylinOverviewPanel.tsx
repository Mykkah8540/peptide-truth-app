export default function AmylinOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Amylin is a hormone your pancreas releases alongside insulin every time you eat — it slows how fast food moves out of your stomach, signals your brain that you&rsquo;re getting full, and prevents your liver from dumping extra sugar into the blood after meals. People with type 1 diabetes produce no amylin at all, and people with advanced type 2 diabetes lose it progressively. The compound itself is not community-used — it&rsquo;s pharmacology reference territory — but its role in hunger, glucose, and weight is central to understanding the next generation of metabolic drugs.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Person Managing Diabetes — Trying to understand their own biology or a treatment option</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;m on insulin and my blood sugar still spikes a lot after meals. My doctor mentioned pramlintide but I&rsquo;ve never heard of it. What is amylin and why does it matter for my situation?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It addresses the post-meal spike that insulin alone can&rsquo;t fully prevent</strong><br />When you have type 1 diabetes, you replace insulin but not amylin. Amylin normally slows gastric emptying — meaning food enters the bloodstream more gradually — and suppresses a hormone that otherwise raises blood sugar after meals. Without amylin, meals hit the bloodstream faster and the liver adds more sugar on top, making post-meal control harder even with perfect insulin dosing.</li>
          <li><strong>It may reduce how much insulin you need at meals</strong><br />Amylin suppresses glucagon (the liver-stimulating signal) and slows food absorption. Both effects mean less glucose entering the blood, which in turn means less insulin is needed to manage the same meal. For people who find insulin management difficult, replacing the amylin signal represents a genuine additional lever.</li>
          <li><strong>The approved synthetic version has real clinical evidence</strong><br />Pramlintide (Symlin) is an FDA-approved synthetic amylin analogue used alongside insulin in both type 1 and type 2 diabetes. Clinical trials show it reduces HbA1c, reduces post-meal glucose spikes, and is associated with modest weight loss — all meaningful outcomes for someone managing either condition.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Pramlintide adds complexity to an already complex regimen. It requires a mandatory reduction in prandial insulin dose when starting (because it adds glucose control and hypoglycemia is a real risk), it is a separate injection before major meals, and nausea is common especially at the start. It also cannot be mixed with insulin in the same syringe. It is not appropriate for everyone and requires medical supervision to introduce safely. Amylin itself cannot be injected — the natural human version spontaneously forms protein aggregates that are toxic, which is why pramlintide uses a modified sequence. Net: a real therapeutic option that addresses a genuine gap in insulin-only management, but it adds injection burden and complexity and must be initiated carefully with a provider.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Health-Curious Person — Interested in appetite and satiety science</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I keep reading about GLP-1 drugs for weight loss, but now I&rsquo;m seeing amylin come up too. Is amylin another hunger hormone? How does it fit into the picture?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Amylin is a satiety signal that works differently from GLP-1</strong><br />GLP-1 drugs like semaglutide reduce hunger primarily through brain signals and delayed gastric emptying. Amylin works through a different brain region — one that sits outside the blood-brain barrier — and signals satiety through its own distinct pathway. The fact that these are different mechanisms means they can stack: combining a GLP-1 with an amylin analogue produces more weight loss than either alone.</li>
          <li><strong>The combination approach is the frontier of metabolic medicine</strong><br />CagriSema — a once-weekly combination of a GLP-1 analogue and cagrilintide, a long-acting amylin analogue — is in late-stage clinical trials and has produced weight loss exceeding what semaglutide achieves alone. Understanding amylin is understanding where obesity treatment is heading.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Amylin itself has no community use case — the natural form cannot be safely injected, and pramlintide is a prescription drug for diabetes, not a wellness compound. The next-generation amylin analogue cagrilintide is in clinical trials and not yet available outside of them. For someone simply curious about appetite and hunger, understanding amylin is valuable context for why GLP-1 drugs work the way they do and why combination approaches are being developed — but there&rsquo;s no currently accessible amylin product for someone without diabetes to use. Net: important foundational science for understanding metabolic medicine, but not an actionable intervention for a healthy person at this time.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Metabolic Biohacker — Interested in the full hormonal architecture of glucose and appetite regulation</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I understand GLP-1 and GIP pretty well. Where does amylin fit into the hormonal cascade of a meal response, and why does cagrilintide produce additive rather than just incremental weight loss when combined with semaglutide?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Amylin acts on a complementary node in the satiety network</strong><br />GLP-1 acts via receptors in the hypothalamus and brainstem vagal pathways. Amylin acts via the area postrema — a different brainstem region outside the blood-brain barrier — and projects to distinct hypothalamic circuits. The neuroanatomy predicts that co-stimulating both pathways would produce additive effects, and the CagriSema trial data confirms it. This is a real example of synergistic satiety signaling rather than redundancy.</li>
          <li><strong>The fibrillation problem is pharmacologically important</strong><br />Human amylin spontaneously forms amyloid-like protein aggregates — the same structural problem implicated in type 2 diabetes beta cell damage. This is why you cannot simply inject recombinant human amylin: it would aggregate at the injection site and potentially elsewhere. Pramlintide avoids this by substituting specific amino acids that break up the aggregation tendency. Cagrilintide uses fatty acid conjugation for half-life extension. These engineering solutions matter for understanding the class.</li>
          <li><strong>Upstream amylin deficiency may contribute to weight regain after bariatric surgery</strong><br />Some research suggests amylin secretion is impaired in obesity independently of beta cell mass. Post-bariatric weight regain may in part reflect failure to restore amylin signaling, which GLP-1 alone does not address. The amylin axis represents an underappreciated node in long-term weight regulation that is just now being systematically studied.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Cagrilintide is not available outside clinical trials as of early 2026, and pramlintide is approved for diabetes management, not metabolic optimization in non-diabetic individuals. The idea of stacking amylin signaling with GLP-1 is compelling and mechanistically grounded, but the clinical data for that combination in non-diabetic populations is still being generated. For someone without diabetes, there is no currently accessible amylin analogue to deploy, and pramlintide&rsquo;s short duration (injection before each meal) and modest half-life make it impractical compared to weekly GLP-1 analogues. Net: the mechanistic picture is sophisticated and the combinatorial pharmacology is genuinely the leading edge of the field — but the accessible interventions for non-diabetic use are not yet here.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Amylin is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Not a community peptide — no off-label or enhancement use case</li>
              <li>Not injectable in its natural form — human amylin forms toxic protein aggregates</li>
              <li>Not a weight loss drug for people without diabetes (pramlintide is approved for diabetes management)</li>
              <li>Not a standalone intervention — always used alongside insulin in its clinical applications</li>
              <li>Not the same compound as pramlintide or cagrilintide — those are engineered analogues, not amylin itself</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>A distinct satiety pathway that is additive with GLP-1 — explains why CagriSema outperforms semaglutide alone</li>
              <li>Critical missing signal in type 1 diabetes that insulin replacement does not restore</li>
              <li>The fibrillation engineering challenge produced pharmacologically important solutions (pramlintide, cagrilintide)</li>
              <li>Central to understanding where metabolic medicine is heading — amylin combination therapy is the near-term frontier</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
