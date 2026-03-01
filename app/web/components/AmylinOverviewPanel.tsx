export default function AmylinOverviewPanel() {
  return (
    <div className="reta-overview">
      <p className="reta-overview__lead">
        Amylin is a 37-amino acid peptide co-secreted with insulin from pancreatic beta cells. It
        complements insulin&apos;s action by suppressing postprandial glucagon, slowing gastric
        emptying, and reducing food intake via area postrema and hypothalamic receptors &mdash;
        a full metabolic partner that healthy beta cells provide automatically with every meal.
      </p>

      <h3>Mechanism</h3>
      <p>
        Amylin binds amylin receptors, which are heterodimers of the calcitonin receptor and
        receptor activity-modifying proteins (RAMPs 1&ndash;3). Receptor expression in the area
        postrema (outside the blood&ndash;brain barrier) mediates nausea and satiety signaling;
        hypothalamic projections suppress glucagon and reduce meal size. The net effect is a
        slower, flatter postprandial glucose excursion that insulin alone cannot replicate.
      </p>

      <h3>Indications and clinical use</h3>
      <p>
        In Type 1 diabetes, beta cells are destroyed and amylin secretion is absent. In advanced
        Type 2 diabetes, progressive beta cell dysfunction produces the same deficit. Pramlintide
        (Symlin) &mdash; a synthetic analogue engineered to resist amyloid fibrillation &mdash; is
        the FDA-approved pharmaceutical for both populations. It is given as a subcutaneous
        injection before major meals alongside insulin, with a mandatory reduction in prandial
        insulin dose to prevent hypoglycemia.
      </p>

      <h3>The fibrillation problem</h3>
      <p>
        Human amylin (also called IAPP, islet amyloid polypeptide) spontaneously forms amyloid
        fibrils under physiological conditions. Pancreatic IAPP deposits are a pathological
        hallmark of Type 2 diabetes and contribute to beta cell toxicity. Any attempt to inject
        unformulated recombinant human amylin would risk amyloid deposition at the injection site
        and potentially systemically. Pramlintide contains proline substitutions that prevent
        fibrillation &mdash; it is not interchangeable with human amylin.
      </p>

      <h3>Pipeline context</h3>
      <p>
        Cagrilintide is a long-acting amylin analogue (once-weekly) in late-stage development.
        Combined with semaglutide as &ldquo;CagriSema,&rdquo; Phase 3 trials have demonstrated
        weight loss exceeding either agent alone, with additive effects on satiety and gastric
        emptying. This combination represents the most clinically relevant future application of
        amylin pharmacology.
      </p>
    </div>
  );
}
