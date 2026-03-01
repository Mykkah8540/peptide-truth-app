export default function ZiconotideOverviewPanel() {
  return (
    <div className="reta-overview">
      <h2 className="reta-overview__heading">Overview</h2>
      <p className="reta-overview__lede">
        Ziconotide (brand name Prialt) is an FDA-approved intrathecal analgesic derived
        from omega-conotoxin MVIIA, a peptide toxin from the cone snail{" "}
        <em>Conus magus</em>. It blocks N-type voltage-gated calcium channels (Cav2.2)
        in the spinal cord, inhibiting pain signal transmission. It is only approved for
        intrathecal (spinal) delivery via an implanted pump\u2014this is not a community
        peptide and self-administration would be catastrophically dangerous.
      </p>
      <div className="reta-overview__body">
        <p>
          The mechanism is well-characterized: ziconotide selectively blocks Cav2.2
          channels at presynaptic terminals in the dorsal horn of the spinal cord,
          preventing release of pain neurotransmitters (substance P, glutamate,
          calcitonin gene-related peptide). This produces analgesia without opioid
          receptor activity\u2014making it uniquely useful for patients with refractory
          pain who have failed opioid therapy.
        </p>
        <p>
          Route of administration is non-negotiable. Ziconotide\u2019s therapeutic effect
          depends on direct delivery to the intrathecal space (cerebrospinal fluid)
          surrounding the spinal cord. Systemic administration\u2014intravenous,
          subcutaneous, or intramuscular\u2014would activate voltage-gated calcium channels
          throughout the body, including in cardiac muscle, autonomic neurons, and the
          brain. The resulting neurological and cardiovascular effects would be severe
          and potentially fatal.
        </p>
        <p>
          Delivery requires a surgically implanted intrathecal drug delivery system
          (IDDS)\u2014a pump and catheter placed under general anesthesia by a neurosurgeon
          or pain specialist, with ongoing management including dose titration and refill
          procedures. This is a specialized intervention for patients with severe,
          refractory chronic pain (cancer pain, CRPS, failed back surgery syndrome,
          intractable spasticity). It is not accessible, appropriate, or safe outside
          that clinical context.
        </p>
        <p>
          Community interest in ziconotide appears to be misinformation-driven. The
          compound\u2019s origin as a \u201cnatural\u201d cone snail peptide toxin has created
          mistaken associations with the broader peptide community. This is a licensed
          Schedule V controlled substance (in some contexts) requiring prescription and
          specialist management. If you are reading this page while considering
          self-administration: the answer is an unambiguous no.
        </p>
      </div>
    </div>
  );
}
