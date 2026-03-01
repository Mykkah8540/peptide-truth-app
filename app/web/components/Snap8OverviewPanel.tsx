export default function Snap8OverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        SNAP-8 is a synthetic octapeptide sold in cosmetic serums and creams as a topical alternative to Botox &mdash; it claims to reduce expression lines like crow&rsquo;s feet and forehead creases by interfering with the molecular signal that makes facial muscles contract. The mechanism is scientifically interesting, the safety profile is clean, but the critical question of whether it actually penetrates skin deeply enough to reach its target is genuinely unresolved.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Skincare Person &mdash; Wants wrinkle reduction without needles</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I don&rsquo;t want to get Botox injections &mdash; are there topical ingredients that actually do something similar for expression lines?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>A scientifically coherent mechanism &mdash; not just marketing</strong><br />SNAP-8 isn&rsquo;t just buzzword ingredients. It targets a specific molecular complex called the SNARE complex that nerve cells use to release the signal that makes muscles contract. If that signal is dampened, facial muscles relax slightly and expression lines soften. This is the same general concept as Botox, but applied topically rather than injected. The biological logic is real.</li>
          <li><strong>Used twice daily, some people report softer expression lines within a few weeks</strong><br />Cosmetic ingredient studies (though small and industry-funded) have shown modest reductions in wrinkle depth measurements after 28-60 days of consistent use. Some users notice genuine improvement in how deep their expression lines appear. It may be working partially through surface-level skin hydration effects or mild local effects rather than true neuromuscular action &mdash; but the visible result is what most people care about.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The fundamental problem: the SNARE complex that SNAP-8 targets is deep in nerve terminals, beneath the skin&rsquo;s surface. For SNAP-8 to work as claimed, it would need to cross multiple skin layers and penetrate a nerve cell &mdash; an extremely difficult journey for a molecule of this size applied to intact skin. No independent study has confirmed it actually reaches the target in sufficient concentrations. If it&rsquo;s working at all, the mechanism might be more surface-level than the &ldquo;topical Botox&rdquo; framing suggests. Net: safe to use, worth trying if curious, but expect modest effects &mdash; not Botox-equivalent results.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Aesthetics-Focused User &mdash; Maximizing a skincare routine</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I already have a solid routine with retinol, vitamin C, and SPF &mdash; does adding SNAP-8 actually layer on top of that, or is it redundant?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Different mechanism from retinoids and antioxidants</strong><br />Retinol works on skin cell turnover and collagen synthesis. Vitamin C works on oxidative stress and collagen cross-linking. SNAP-8 targets a completely different pathway &mdash; muscle signal transmission &mdash; which means if it works at all, it adds something that your existing actives don&rsquo;t provide. It&rsquo;s not redundant with the standard powerhouse ingredients.</li>
          <li><strong>Good tolerability &mdash; no irritation, no downtime</strong><br />Unlike retinol (which causes peeling and irritation at higher concentrations) or acids (which require careful pH management), SNAP-8 is essentially non-irritating at cosmetic concentrations. It can layer into an existing routine without disrupting the rest of it. If it contributes something, great; if not, it doesn&rsquo;t subtract anything.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">For a sophisticated skincare user, the evidence hierarchy matters. Retinol and SPF have mountains of double-blind clinical trial evidence. SNAP-8 has small, industry-funded studies without independent replication. If you&rsquo;re optimizing budget, SNAP-8 is a lower-priority add-on than ensuring your retinoid, sunscreen, and antioxidant are high-quality and consistently used. Net: a reasonable experiment if you&rsquo;re interested, but not where incremental skincare budget should go first.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Anti-Aging Biohacker &mdash; Topical peptide skin biology</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I want to understand the actual penetration problem &mdash; does the molecular weight and polarity of SNAP-8 make transdermal delivery mechanistically impossible, or just difficult? Are there formulation approaches that change this?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The SNARE complex inhibition concept is genuinely interesting</strong><br />Botox (botulinum toxin) works by cleaving SNARE complex proteins in nerve terminals, permanently preventing vesicle docking until new proteins are synthesized. SNAP-8 mimics part of the SNAP-25 protein that Botox targets, potentially competing with it and interfering with vesicle docking less dramatically. The mechanistic concept &mdash; competitive inhibition of neuromuscular signaling via a peptide fragment &mdash; is pharmacologically coherent. The problem is delivery, not concept.</li>
          <li><strong>Formulation advances may change the penetration picture</strong><br />Encapsulation technologies (liposomes, niosomes, nanotransporters) and penetration enhancers can meaningfully improve transdermal delivery of peptides compared to simple aqueous formulations. Some higher-end SNAP-8 products use these approaches. Whether they close the gap enough to achieve functional concentrations at the neuromuscular junction is not established, but the question is live.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The penetration problem is real and not trivially solved. Skin is specifically designed to keep things out &mdash; the stratum corneum barrier is highly effective against hydrophilic molecules of SNAP-8&rsquo;s size. Even with advanced formulation, reaching sub-dermal nerve terminals at therapeutically meaningful concentrations through intact facial skin has not been demonstrated in independent, peer-reviewed research. The mechanism may produce surface-level benefits (film-forming, hydration-related line reduction) without achieving true neuromuscular effect. Net: mechanistically interesting, delivery-limited, and honest assessment requires distinguishing surface effects from the claimed deep mechanism.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What SNAP-8 is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Botox &mdash; not even close in terms of evidence or depth of effect</li>
              <li>Backed by independent, double-blind, placebo-controlled clinical trials</li>
              <li>Proven to reach its claimed target (neuromuscular junctions) through intact skin</li>
              <li>Systemically absorbed at cosmetic use concentrations &mdash; no systemic safety concern</li>
              <li>A substitute for medical aesthetic procedures if those results are the goal</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>A scientifically coherent mechanism unlike most cosmetic marketing</li>
              <li>Excellent tolerability &mdash; no irritation, no recovery time, safe for all skin types</li>
              <li>Different pathway from retinoids and antioxidants &mdash; non-redundant if effective</li>
              <li>Modest evidence of wrinkle depth reduction in industry studies after consistent use</li>
              <li>Advanced formulation approaches may improve delivery &mdash; an evolving area</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
