export default function AcetylHexapeptide8OverviewPanel() {
  return (
    <div className="reta-overview">
      <p className="reta-overview__lead">
        Acetyl hexapeptide-8 (AH8), commercially known as Argireline, is a synthetic cosmetic hexapeptide
        designed to reduce the appearance of expression lines. It is applied topically in skincare
        formulations and is not an approved drug. No systemic use, injectable formulation, or clinical
        drug application exists.
      </p>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">Proposed Mechanism</h3>
        <p>
          AH8 is designed to mimic the N-terminal fragment of SNAP-25, a protein in the SNARE complex
          that mediates neurotransmitter vesicle fusion at the neuromuscular junction. The hypothesis is
          that it competes with SNAP-25 for binding sites within the SNARE complex, partially inhibiting
          acetylcholine vesicle release and thereby reducing muscle contraction intensity at the site of
          application — leading to a softening of dynamic expression lines.
        </p>
        <p>
          This mechanism is pharmacologically plausible in principle, but the critical question is whether
          topically applied AH8 reaches the neuromuscular junction at meaningful concentrations. The
          molecular weight (~889 Da) and hydrophilicity of AH8 make significant transdermal penetration
          through intact stratum corneum unlikely, and no credible human pharmacokinetic data demonstrate
          neuromuscular junction concentrations from topical application.
        </p>
      </div>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">Regulatory and Approval Status</h3>
        <p>
          AH8 is classified and sold as a cosmetic ingredient, not a drug. In the United States it is
          regulated by the FDA as a cosmetic, not subject to pre-market efficacy requirements. It is not
          FDA-approved for any indication. Published studies are predominantly small, short-duration, and
          industry-funded cosmetic trials measuring surface parameters (profilometry, self-reported
          wrinkle appearance) rather than clinical endpoints.
        </p>
      </div>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">The &quot;Topical Botox&quot; Framing</h3>
        <p>
          AH8 is widely marketed using &quot;topical Botox&quot; language. This framing is pharmacologically
          misleading. Botulinum toxin type A (Botox) is injected directly into the target muscle,
          bypassing the skin barrier entirely, and cleaves SNAP-25 irreversibly with documented,
          quantified clinical effect. AH8&apos;s proposed mechanism targets a similar system but via
          topical delivery with no established bioavailability at the neuromuscular junction. The
          magnitudes of effect are not comparable, and the claim should be treated as marketing
          language rather than scientific equivalence.
        </p>
      </div>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">Community and Off-Label Use</h3>
        <p>
          AH8 use is entirely within the cosmetic skincare domain. There is no documented community
          practice of injection use, systemic use, or performance enhancement use. Unlike most peptides
          of interest on this platform, AH8 has no pathway to systemic effect and no rationale for
          use outside topical skincare formulations.
        </p>
      </div>
    </div>
  );
}
