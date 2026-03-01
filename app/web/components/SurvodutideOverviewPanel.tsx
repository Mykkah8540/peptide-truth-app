export default function SurvodutideOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Survodutide is a pipeline drug from Boehringer Ingelheim that combines two metabolic levers: the appetite-suppressing, insulin-boosting signal of the GLP-1 system with the fat-burning, liver-targeting signal of the glucagon system. It&rsquo;s not approved yet, but Phase 2 data shows strong weight loss and a compelling liver fat reduction signal &mdash; potentially the first drug to make a serious dent in metabolic liver disease.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; Watching the pipeline after Ozempic</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;ve heard there are newer weight loss drugs coming that might be even better than Ozempic &mdash; what is survodutide and should I be paying attention to it?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Weight loss results comparable to semaglutide, with a liver angle semaglutide doesn&rsquo;t match</strong><br />Survodutide&rsquo;s Phase 2 trials showed 14-19% body weight loss over about a year &mdash; in the same range as semaglutide (Ozempic/Wegovy). What makes it stand out is the liver data: it meaningfully reduced fatty liver disease in a way that pure GLP-1 drugs do only modestly. If you or someone you know has been told they have fatty liver, that signal is worth watching.</li>
          <li><strong>A different mechanism than what&rsquo;s approved</strong><br />Adding glucagon signaling on top of GLP-1 creates a drug that works in two distinct ways simultaneously &mdash; calming appetite through GLP-1 while telling the liver to burn fat through glucagon. That combination may help people who don&rsquo;t respond as strongly to GLP-1 drugs alone, or who have significant liver disease alongside their metabolic issues.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Survodutide is not available. Phase 3 trials are running and results are years away from FDA approval. The glucagon component adds a blood sugar risk that pure GLP-1 drugs don&rsquo;t have &mdash; glucagon raises blood sugar in addition to burning fat, which requires the GLP-1 side to keep insulin up enough to balance it. GI side effects (nausea, vomiting, diarrhea) are at least as common as with semaglutide. Net: a genuinely interesting pipeline compound worth following, especially if liver health is a concern; don&rsquo;t expect availability soon.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Athlete &mdash; Metabolic efficiency and body composition</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;m interested in metabolic optimization for body composition &mdash; does survodutide&rsquo;s glucagon component actually accelerate fat oxidation in a way that changes the athletic recomp picture?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Glucagon drives fat oxidation and lipolysis &mdash; not just appetite suppression</strong><br />The glucagon component of survodutide adds a metabolic mechanism that pure GLP-1 drugs lack: direct promotion of fat breakdown and burning in adipose and liver tissue. This is theoretically relevant for athletes who care about the rate of fat mobilization during a cut, not just about caloric reduction through appetite suppression. Glucagon also promotes hepatic fat clearance, which improves insulin sensitivity in a different way than GLP-1 alone.</li>
          <li><strong>Liver fat clearance matters for energy metabolism and recovery</strong><br />Excess liver fat (even in seemingly healthy, athletic people) impairs glucose metabolism and insulin sensitivity. Survodutide&rsquo;s demonstrated ability to reduce liver fat fraction in Phase 2 is relevant beyond clinical NASH &mdash; athletes with high-carb diets or high alcohol intake can accumulate subclinical liver fat that blunts metabolic efficiency.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Everything here is inference from Phase 2 data in people with obesity and metabolic disease &mdash; not athletic populations. The glucagon component raises blood glucose, which in a healthy athlete with normal insulin sensitivity is handled by the body but creates an additional layer of complexity. The drug is not available and won&rsquo;t be for years. Net: mechanistically interesting for fat oxidation biology; not a near-term tool for athletic use.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; Metabolic longevity and the MASH treatment gap</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;What does the dual GLP-1/glucagon mechanism actually do differently at the liver level compared to GLP-1 monotherapy, and is survodutide potentially the first drug that could actually reverse MASH at scale?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Glucagon receptor agonism on the liver does something GLP-1 can&rsquo;t</strong><br />Glucagon has a direct action on hepatocytes (liver cells): it promotes fatty acid oxidation, reduces lipogenesis (new fat creation), and drives clearance of lipid droplets. GLP-1 receptor agonism has indirect liver effects (primarily via weight loss and improved insulin sensitivity), but the glucagon arm acts directly on the liver&rsquo;s fat metabolism machinery. In the MASH Phase 2 data, survodutide produced histological improvements &mdash; actual microscopic changes in liver tissue &mdash; that exceeded what GLP-1 monotherapy typically achieves. That&rsquo;s a meaningful signal.</li>
          <li><strong>MASH is the largest unmet need in metabolic medicine</strong><br />Metabolic dysfunction-associated steatohepatitis (MASH, formerly called NASH) affects an estimated 1.5-6% of adults globally and has essentially no approved pharmacological treatment as of early 2026 (resmetirom received approval for MASH in 2024, the first). The disease progresses to cirrhosis and liver failure. If survodutide&rsquo;s Phase 2 liver histology data hold at scale in Phase 3, it could become one of only a handful of drugs that reverse liver disease rather than just slow its progression.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Phase 2 to Phase 3 translation in MASH has been notoriously difficult &mdash; many drugs that showed great liver histology in Phase 2 failed to replicate at scale. The SYNCHRONIZE Phase 3 program and the MASH-focused program will be the real tests. The glucagon component adds cardiovascular and glucose complexity that will need careful characterization in larger, longer trials. Net: one of the most interesting pipeline metabolic drugs as of early 2026, particularly for liver disease; real approval is years out and Phase 3 is the genuine question mark.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Survodutide is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Available &mdash; Phase 3 trials are ongoing as of early 2026; no approval yet</li>
              <li>The strongest weight loss drug in the pipeline &mdash; retatrutide (triple agonist) shows higher weight loss</li>
              <li>Free of the GI side effects common to GLP-1 drugs &mdash; nausea and vomiting are at least as common</li>
              <li>A proven MASH treatment yet &mdash; Phase 2 liver data is compelling but Phase 3 is where MASH drugs often stumble</li>
              <li>Something accessible outside of clinical trials</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>Dual GLP-1/glucagon mechanism adds direct liver fat-burning that GLP-1 monotherapy can&rsquo;t match</li>
              <li>Phase 2 MASH data showed actual histological improvement &mdash; one of the stronger liver signals in the pipeline</li>
              <li>Weight loss results competitive with semaglutide in Phase 2</li>
              <li>Potentially the best-positioned drug for the huge unmet need in metabolic liver disease</li>
              <li>Represents a meaningful mechanistic step beyond pure GLP-1 agonism</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
