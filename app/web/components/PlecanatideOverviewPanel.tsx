export default function PlecanatideOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Plecanatide (Trulance) is a prescription pill for people with chronic constipation or IBS with constipation &mdash; it works entirely inside your gut, mimicking a hormone your intestinal cells already produce to regulate fluid secretion. No systemic absorption, no systemic effects. It has solid Phase 3 trial backing for its approved uses and is an alternative to the better-known linaclotide (Linzess), with a modestly different tolerability profile that some people find easier.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Person with IBS-C or Chronic Constipation &mdash; looking for something that actually works</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;ve tried everything for constipation and IBS &mdash; what makes this different from other options, and will it give me the same diarrhea problem as Linzess?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It has real FDA-approved evidence for exactly this problem</strong><br />Multiple Phase 3 randomized controlled trials demonstrated that plecanatide improves bowel frequency, stool consistency, and IBS-C symptoms. This is not a supplement or community compound &mdash; it went through the full pharmaceutical development process specifically for your condition.</li>
          <li><strong>The diarrhea might be less severe than with linaclotide</strong><br />Plecanatide activates more strongly in the acidic proximal small intestine &mdash; closer to physiologic behavior &mdash; compared to linaclotide which activates throughout the intestine. Some people who found linaclotide&rsquo;s diarrhea side effect intolerable have done better on plecanatide, though clinical experience is mixed.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Diarrhea is still the most common side effect &mdash; the pH-dependent mechanism doesn&rsquo;t eliminate it, it may just shift it. This is a brand-name drug with no generic, so cost and insurance coverage can be significant barriers. If linaclotide worked but was tolerable, there&rsquo;s no strong reason to switch. If linaclotide was intolerable, plecanatide is a reasonable next step. Net: solid evidence, real alternative for the right patient, talk to your doctor about whether switching makes sense for you.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Gut Health Curious Person &mdash; microbiome, motility, digestive optimization</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;m interested in gut health optimization &mdash; is plecanatide relevant to anything beyond treating diagnosed constipation?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It mimics an endogenous intestinal hormone</strong><br />Uroguanylin &mdash; what plecanatide is modeled after &mdash; is a hormone your intestinal cells actually produce. The concept of restoring or supporting a physiological fluid-regulation signal is relevant to people interested in gut physiology, not just those with diagnosed disease.</li>
          <li><strong>Motility affects everything downstream in gut health</strong><br />Transit time, fermentation patterns, and microbiome composition are all connected to gut motility. Someone focused on gut health optimization might be curious whether improving motility in this specific way has downstream effects.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Plecanatide works locally in the gut with negligible systemic absorption &mdash; there is no mechanism for systemic optimization effects, and it has no studied benefit in people without constipation or IBS-C. Using a prescription GI drug without a diagnosed indication is not a gut health optimization strategy; it&rsquo;s introducing unnecessary risk of diarrhea with no benefit. The pediatric black box warning (no use under age 6) reflects that GC-C agonists can cause severe diarrhea and dehydration in young children. Net: strictly a treatment for documented constipation conditions, not a general gut health tool.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The GI and Microbiome Biohacker &mdash; GC-C receptor biology, intestinal fluid regulation</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;What&rsquo;s the actual difference between uroguanylin and guanylin receptor kinetics, and why does pH-dependent activation matter for GC-C agonists?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re interested</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The pH-dependent mechanism is genuinely distinct pharmacology</strong><br />Uroguanylin (what plecanatide mimics) activates the GC-C receptor preferentially in the acidic duodenum, whereas guanylin (what linaclotide mimics) activates throughout the intestine without that pH gating. This is designed to create a more physiologic intestinal fluid response concentrated where it naturally begins. The design rationale is mechanistically elegant.</li>
          <li><strong>GC-C receptor biology has emerging implications beyond constipation</strong><br />GC-C signaling influences intestinal cell proliferation, inflammation, and barrier function &mdash; areas directly relevant to longevity and gut health research. Uroguanylin has been proposed as a weight-regulating signal with central appetite effects in some animal models, adding a layer of interest beyond local gut function.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The interesting pharmacology doesn&rsquo;t translate to off-label use value &mdash; plecanatide has negligible systemic absorption by design, so the central appetite effects seen with uroguanylin in rodent studies are not something this oral tablet is doing. The comparison to linaclotide is the most practically relevant question: in head-to-head real-world use, the tolerability advantage of plecanatide is real for some patients but not universal. For a biohacker interested in GC-C biology, the research literature on uroguanylin and GC-C in intestinal homeostasis is worth reading; the drug itself as a personal tool is constrained to its approved GI indications. Net: intellectually interesting receptor pharmacology, clinically constrained to constipation treatment.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Plecanatide is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>A systemic compound &mdash; it works locally in the gut with negligible absorption; no systemic effects</li>
              <li>A gut health optimization tool for people without constipation &mdash; no benefit and real diarrhea risk</li>
              <li>Safe for children under 6 &mdash; black box warning; same restriction as linaclotide</li>
              <li>A significant improvement over linaclotide for most patients &mdash; modest tolerability difference, not a categorical upgrade</li>
              <li>A weight loss or appetite-regulating drug &mdash; the systemic uroguanylin biology doesn&rsquo;t apply to this locally-acting tablet</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>The only GC-C agonist designed around pH-dependent activation &mdash; mechanistically distinct from linaclotide</li>
              <li>Solid Phase 3 RCT evidence for IBS-C and chronic idiopathic constipation</li>
              <li>Uroguanylin-based design means it mimics an endogenous intestinal physiological signal</li>
              <li>A real alternative for people who found linaclotide&rsquo;s diarrhea intolerable</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
