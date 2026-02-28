export default function AbaloparatideOverviewPanel() {
  return (
    <div className="reta-overview">
      <p className="reta-overview__lead">
        Abaloparatide (brand name Tymlos) is a 34-amino-acid synthetic analogue of parathyroid hormone-related
        protein (PTHrP). It is FDA-approved for the treatment of osteoporosis in postmenopausal women at high
        risk of fracture, administered as a daily 80 mcg subcutaneous injection.
      </p>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">Mechanism</h3>
        <p>
          Abaloparatide is a selective agonist at the PTH1 receptor (PTH1R). A key pharmacological distinction
          from teriparatide (PTH 1-34) is its preferential binding to the RG conformation of PTH1R rather than
          the RB conformation. This conformation selectivity is associated with a more anabolic (bone-forming)
          and less catabolic (bone-resorbing) signaling profile, though both agents increase bone turnover.
          Daily pulsatile dosing drives net bone formation; continuous stimulation would produce the opposite
          catabolic effect.
        </p>
      </div>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">Approved Indication</h3>
        <p>
          FDA-approved (2017) for postmenopausal women with osteoporosis at high fracture risk, defined as
          those with a history of osteoporotic fracture, multiple risk factors, or who have failed or are
          intolerant of other available osteoporosis therapy. Cumulative use of PTH/PTHrP analogues (abaloparatide
          plus teriparatide combined) is limited to a lifetime maximum of 2 years due to the osteosarcoma
          black box warning derived from rat studies.
        </p>
      </div>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">Clinical Evidence Basis</h3>
        <p>
          The pivotal ACTIVE trial (N=2,463, 18 months) compared abaloparatide, teriparatide, and placebo.
          Abaloparatide significantly reduced new vertebral fractures (0.58% vs. 4.22% placebo) and
          non-vertebral fractures vs. placebo. The ATOM extension study demonstrated that transitioning to
          alendronate after abaloparatide consolidates and extends gains in bone mineral density.
        </p>
      </div>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">Sequential Therapy</h3>
        <p>
          Abaloparatide is used as an anabolic &quot;builder&quot; phase, typically 18–24 months, followed by an
          antiresorptive agent (bisphosphonate or denosumab) to maintain the gains in bone mineral density.
          Using abaloparatide alone and stopping without antiresorptive follow-up results in rapid loss of
          accrued bone density.
        </p>
      </div>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">Community and Enhancement Use</h3>
        <p>
          There is no documented community or performance-enhancement use of abaloparatide. Its mechanism,
          risk profile (osteosarcoma black box), and daily injection requirement make it unsuitable and
          unattractive for off-label use. Any use outside of supervised osteoporosis treatment should
          be considered medically unjustified.
        </p>
      </div>
    </div>
  );
}
