export default function TeriparatideOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Teriparatide (Forteo) is the only widely available drug that actually builds new bone rather than just slowing bone loss. It&rsquo;s a prescription daily injection used for severe osteoporosis, and the fracture-reduction data behind it is among the strongest in the field. The treatment window is limited to two years lifetime, after which you must transition to a different medication or the bone you gained comes back off.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person &mdash; Dealing with Bone Loss</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My doctor said my bones are in bad shape and I might need this shot every day. Is it actually worth it?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It actually builds bone, not just protects it</strong><br />Most osteoporosis drugs slow the breakdown of existing bone. Teriparatide does something genuinely different: it stimulates your body to create new bone tissue. For people with severe bone loss, that distinction matters enormously, especially if other treatments haven&rsquo;t worked.</li>
          <li><strong>The fracture numbers are real</strong><br />The landmark clinical trial showed a 65% reduction in vertebral fractures and over 50% reduction in non-vertebral fractures compared to placebo. For someone living in fear of a compression fracture, those are numbers worth paying attention to.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">This is a daily injection for up to two years that requires refrigeration and regular monitoring. The bigger catch: when you stop, your body shifts quickly back toward bone loss unless you immediately start a follow-on drug. People who stop teriparatide without transitioning to a bisphosphonate or denosumab lose much of what they gained within a year. The treatment is only the first half of a two-part strategy. Net: genuinely powerful for the right patient, but it requires a committed physician relationship to do it correctly.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Athlete &mdash; Chasing Bone Density for Longevity</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;ve heard teriparatide can increase bone density. Could it help protect my joints and reduce fracture risk as I push harder in training?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Stress fractures and bone density are real performance limiters</strong><br />Endurance athletes, particularly runners and cyclists, face bone stress injuries that derail careers. The idea of a compound that genuinely builds bone density — not just preserves it — has obvious appeal for someone whose skeletal load is their career.</li>
          <li><strong>The biology is interesting and distinct</strong><br />The mechanism (pulsatile PTH stimulation of osteoblasts) is elegant and well-characterized. Unlike anabolic steroids, which may affect bone indirectly through testosterone, teriparatide works directly on the cells that build bone. For someone who likes understanding the mechanism, this one holds up.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Teriparatide is not studied or used in healthy athletes for performance. It carries a black box warning related to osteosarcoma — derived from rat studies at high doses — and is FDA-approved specifically for people with documented severe osteoporosis, prior fractures, or failure of other treatments. Off-label enhancement use in a healthy athlete is not a risk-benefit calculation the evidence supports. If actual low bone density is the concern, DEXA imaging and a sports medicine physician is the correct first step. Net: intellectually compelling, but not a tool for healthy athlete optimization.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker &mdash; Bone Architecture and Longevity</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;Bone density is one of the most underdiscussed longevity markers. PTH receptor signaling is fascinating. Is teriparatide worth understanding in an optimization context?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Pulsatile vs. continuous PTH is one of medicine&rsquo;s more counterintuitive mechanisms</strong><br />Sustained elevation of parathyroid hormone causes bone loss — that&rsquo;s what happens in primary hyperparathyroidism. But a brief daily spike does the opposite: it activates osteoblasts and drives new bone formation. The same molecule, radically different outcomes based purely on timing. This pharmacological elegance attracts mechanistically curious people for good reason.</li>
          <li><strong>Bone is an endocrine organ with longevity implications</strong><br />Osteocalcin — a protein released by bone-building cells — has emerging connections to metabolism, insulin sensitivity, and cognitive function. The bone remodeling axis is not isolated from systemic biology. Teriparatide sits at an interesting intersection of musculoskeletal and systemic health.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Teriparatide has a lifetime two-year cumulative limit (shared with abaloparatide) that reflects regulatory conservatism around the osteosarcoma signal seen in rodents. Post-marketing surveillance in millions of patient-years has not confirmed elevated osteosarcoma rates in humans, but the regulatory limit is firm. The sequencing requirement — you must follow teriparatide with an antiresorptive or you lose the gains — means this is genuinely a two-drug strategy. For longevity optimization in someone with normal bone density, the risk-benefit calculus is not favorable. Net: mechanistically fascinating, but reserved for people with documented significant bone loss.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Teriparatide is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A standalone treatment — it must be followed by an antiresorptive drug or most of the gains reverse</li>
              <li>A first-line osteoporosis drug — it&rsquo;s reserved for severe disease, prior fractures, or treatment failure</li>
              <li>An unlimited treatment — two years lifetime cumulative maximum</li>
              <li>An enhancement compound — no evidence supporting use in athletes or people with normal bone density</li>
              <li>An easy regimen — daily injections, refrigerated storage, regular lab monitoring required</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>The only widely available anabolic bone agent — it builds bone rather than just slowing loss</li>
              <li>Among the strongest fracture reduction data in osteoporosis medicine (65% vertebral fracture reduction)</li>
              <li>The pulsatile PTH mechanism is pharmacologically elegant and genuinely counterintuitive</li>
              <li>FDA-approved for men, postmenopausal women, and glucocorticoid-induced osteoporosis</li>
              <li>Approved regardless of sex — useful for male osteoporosis, which is underdiagnosed</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
