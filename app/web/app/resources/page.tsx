import { requirePaid } from "@/lib/gate";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function isPaid(): Promise<boolean> {
  try {
    await requirePaid();
    return true;
  } catch {
    return false;
  }
}

/* ─── small inline components ─────────────────────────────────── */

function ProBadge() {
  return <span className="pt-res__pro-badge">PRO</span>;
}

function RxBadge({ label }: { label: string }) {
  return <span className="pt-res__rx-badge">{label}</span>;
}

function Callout({ title, children, variant = "info" }: { title: string; children: React.ReactNode; variant?: "info" | "warning" | "case" }) {
  return (
    <div className={`pt-res__callout pt-res__callout--${variant}`}>
      <div className="pt-res__callout-title">{title}</div>
      <div className="pt-res__callout-body">{children}</div>
    </div>
  );
}

function ProGate({ paid }: { paid: boolean }) {
  if (paid) return null;
  return (
    <div className="pt-res__gate">
      <div className="pt-res__gate-inner">
        <div className="pt-res__gate-eyebrow">Pro members only</div>
        <p className="pt-res__gate-body">
          Clinically observed protocols, titration ranges, and category-specific dosing patterns are available to Pro subscribers.
          This is not medical advice — it&rsquo;s a transparent look at what real-world users are actually doing.
        </p>
        <Link href="/upgrade" className="pt-res__gate-cta">
          Unlock with Pro &rarr;
        </Link>
        <p className="pt-res__gate-note">No free trial. Cancel anytime.</p>
      </div>
    </div>
  );
}

/* ─── page ─────────────────────────────────────────────────────── */

export default async function ResourcesPage() {
  const paid = await isPaid();

  return (
    <div className="pt-res">

      {/* ══════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════ */}
      <div className="pt-res__hero">
        <div className="pt-res__inner">
          <p className="pt-res__eyebrow">Education Hub</p>
          <h1 className="pt-res__title">Resources</h1>
          <p className="pt-res__subtitle">
            Everything you need to understand peptides — from what they are and how to source them, to
            interpreting your results and navigating side effects. Built for people who want to make
            informed decisions, not just follow someone else&rsquo;s protocol.
          </p>
          <nav className="pt-res__jumps" aria-label="Jump to section">
            <a href="#what-are-peptides" className="pt-res__jump">What Is a Peptide?</a>
            <a href="#sourcing" className="pt-res__jump">Sourcing Safely</a>
            <a href="#prescription" className="pt-res__jump">Rx vs. Research</a>
            <a href="#supply" className="pt-res__jump">Supply & Equipment</a>
            <a href="#dosing" className="pt-res__jump">Dosing & Protocols <ProBadge /></a>
            <a href="#efficacy" className="pt-res__jump">Efficacy & Variation</a>
            <a href="#side-effects" className="pt-res__jump">Side Effects</a>
            <a href="#safety" className="pt-res__jump">Safety & Titration</a>
            <a href="#community" className="pt-res__jump">Community</a>
          </nav>
        </div>
      </div>

      <div className="pt-res__body">
        <div className="pt-res__inner">

          {/* ══════════════════════════════════════
              1 — WHAT IS A PEPTIDE?
          ══════════════════════════════════════ */}
          <section id="what-are-peptides" className="pt-res__section">
            <div className="pt-res__card">
              <h2 className="pt-res__card-title">What Is a Peptide?</h2>
              <p className="pt-res__text">
                A peptide is a short chain of amino acids — the same building blocks that make up proteins.
                The difference is size: proteins are long chains (50+ amino acids), peptides are short (typically 2–50).
                That size difference matters enormously for how they behave in the body.
              </p>
              <p className="pt-res__text">
                Peptides aren&rsquo;t nutrients your body burns for energy. They&rsquo;re <strong>signaling molecules</strong> — they bind to
                specific receptors and tell your body to do something: release growth hormone, slow gastric emptying,
                repair tissue, modulate inflammation. The specificity is what makes them different from general supplements.
              </p>

              <div className="pt-res__compare-grid">
                <div className="pt-res__compare-card">
                  <div className="pt-res__compare-label">vs. Traditional Supplements</div>
                  <p className="pt-res__compare-body">
                    Vitamins and minerals correct deficiencies or support existing pathways.
                    Peptides actively signal cells to change behavior. The mechanism is more targeted,
                    which means both the effects and the risks are more specific.
                  </p>
                </div>
                <div className="pt-res__compare-card">
                  <div className="pt-res__compare-label">vs. Steroids / Hormones</div>
                  <p className="pt-res__compare-body">
                    Anabolic steroids replace or mimic hormones directly. Most peptides signal the body
                    to produce its own hormones or perform its own repair — they work with your physiology,
                    not around it. The distinction matters for how your body responds and what suppression risks exist.
                  </p>
                </div>
                <div className="pt-res__compare-card">
                  <div className="pt-res__compare-label">vs. Small Molecule Drugs</div>
                  <p className="pt-res__compare-body">
                    Traditional drugs are often small molecules that fit into a receptor like a key. Peptides are
                    larger, more structurally complex, and often more selective — but also more fragile.
                    Most are destroyed by stomach acid, which is why injection is the dominant delivery method.
                  </p>
                </div>
              </div>

              <h3 className="pt-res__subheading">The Regulatory Spectrum</h3>
              <p className="pt-res__text">
                Peptides exist across a wide legal and regulatory spectrum — not a simple "legal vs. illegal" binary.
              </p>
              <div className="pt-res__spectrum">
                <div className="pt-res__spectrum-tier">
                  <RxBadge label="FDA Approved" />
                  <p className="pt-res__text--sm">
                    Prescription-only. Semaglutide, Tirzepatide, Teriparatide, Desmopressin, and others have gone through
                    full clinical trials and are approved for specific indications. Most expensive, highest regulatory assurance.
                  </p>
                </div>
                <div className="pt-res__spectrum-tier">
                  <RxBadge label="Compounding Pharmacy" />
                  <p className="pt-res__text--sm">
                    Some FDA-approved peptides can be compounded when commercially unavailable or a patient needs a specific dose or form.
                    Some investigational peptides are available through 503A/503B compounders with a prescription. Regulated by state pharmacy boards.
                  </p>
                </div>
                <div className="pt-res__spectrum-tier">
                  <RxBadge label="Research Chemical" />
                  <p className="pt-res__text--sm">
                    Sold legally as research chemicals &ldquo;not for human consumption.&rdquo; Most widely used by the community.
                    No regulatory oversight on quality. Legal gray area for personal use varies by jurisdiction.
                    Buyer education is essential.
                  </p>
                </div>
                <div className="pt-res__spectrum-tier">
                  <RxBadge label="Topical / Cosmetic" />
                  <p className="pt-res__text--sm">
                    Cosmetic peptides (GHK-Cu, Palmitoyl Pentapeptide-4, etc.) are formulated for topical application.
                    Different regulatory path than injectables. Generally lower risk profile.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              2 — SOURCING SAFELY
          ══════════════════════════════════════ */}
          <section id="sourcing" className="pt-res__section">
            <div className="pt-res__card">
              <h2 className="pt-res__card-title">How to Source Safely</h2>
              <p className="pt-res__text">
                Where your peptide comes from matters more than almost any other variable. Contaminated,
                mislabeled, or impure product is a serious safety risk — especially for injectables.
                Here&rsquo;s how to think about each supply channel.
              </p>

              <h3 className="pt-res__subheading">Supply Channels</h3>
              <div className="pt-res__channels">

                <div className="pt-res__channel">
                  <div className="pt-res__channel-header">
                    <div className="pt-res__channel-name">Prescription / Licensed Physician</div>
                    <div className="pt-res__channel-safety pt-res__channel-safety--high">Highest Safety</div>
                  </div>
                  <div className="pt-res__tier-row">
                    <div>
                      <div className="pt-res__tier-label pt-res__tier-label--pro">Pros</div>
                      <ul className="pt-res__tier-list">
                        <li>Pharmaceutical-grade manufacturing</li>
                        <li>Physician oversight and clinical guidance</li>
                        <li>Legal — no ambiguity</li>
                        <li>Proper cold chain and storage verified</li>
                        <li>Lab monitoring available</li>
                      </ul>
                    </div>
                    <div>
                      <div className="pt-res__tier-label pt-res__tier-label--con">Cons</div>
                      <ul className="pt-res__tier-list">
                        <li>Requires a clinical relationship and visit</li>
                        <li>Most expensive option by a significant margin</li>
                        <li>Limited to FDA-approved or compoundable peptides</li>
                        <li>Availability varies by state and provider</li>
                        <li>Some physicians are unfamiliar with newer compounds</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-res__channel">
                  <div className="pt-res__channel-header">
                    <div className="pt-res__channel-name">Compounding Pharmacy</div>
                    <div className="pt-res__channel-safety pt-res__channel-safety--high">High Safety</div>
                  </div>
                  <div className="pt-res__tier-row">
                    <div>
                      <div className="pt-res__tier-label pt-res__tier-label--pro">Pros</div>
                      <ul className="pt-res__tier-list">
                        <li>Access to compounds not commercially available</li>
                        <li>Regulated by state pharmacy boards</li>
                        <li>503B compounders meet FDA outsourcing facility standards</li>
                        <li>Physician-supervised use</li>
                        <li>Custom dosing and formulations</li>
                      </ul>
                    </div>
                    <div>
                      <div className="pt-res__tier-label pt-res__tier-label--con">Cons</div>
                      <ul className="pt-res__tier-list">
                        <li>Quality varies significantly — 503A vs. 503B matters</li>
                        <li>Still requires a prescription</li>
                        <li>More expensive than research chemical sources</li>
                        <li>FDA has taken enforcement action on some compounders</li>
                        <li>Not all peptides are available through compounders</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-res__channel">
                  <div className="pt-res__channel-header">
                    <div className="pt-res__channel-name">Research Chemical Vendor</div>
                    <div className="pt-res__channel-safety pt-res__channel-safety--mid">Variable Safety</div>
                  </div>
                  <div className="pt-res__tier-row">
                    <div>
                      <div className="pt-res__tier-label pt-res__tier-label--pro">Pros</div>
                      <ul className="pt-res__tier-list">
                        <li>Most accessible, no prescription required</li>
                        <li>Widest compound selection</li>
                        <li>Lower cost than prescription channels</li>
                        <li>Reputable vendors publish third-party COAs</li>
                      </ul>
                    </div>
                    <div>
                      <div className="pt-res__tier-label pt-res__tier-label--con">Cons</div>
                      <ul className="pt-res__tier-list">
                        <li>No regulatory oversight on quality or purity</li>
                        <li>Quality varies dramatically between vendors</li>
                        <li>Legal gray area — &ldquo;not for human use&rdquo; labeling</li>
                        <li>No physician guidance included</li>
                        <li>Buyer is entirely responsible for due diligence</li>
                        <li>Counterfeit and mislabeled product exists</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-res__channel">
                  <div className="pt-res__channel-header">
                    <div className="pt-res__channel-name">International Pharmacy / Import</div>
                    <div className="pt-res__channel-safety pt-res__channel-safety--low">Higher Risk</div>
                  </div>
                  <div className="pt-res__tier-row">
                    <div>
                      <div className="pt-res__tier-label pt-res__tier-label--pro">Pros</div>
                      <ul className="pt-res__tier-list">
                        <li>Some peptides available OTC that are Rx-only in the US</li>
                        <li>Can be less expensive than domestic options</li>
                        <li>Some countries have established pharmaceutical markets</li>
                      </ul>
                    </div>
                    <div>
                      <div className="pt-res__tier-label pt-res__tier-label--con">Cons</div>
                      <ul className="pt-res__tier-list">
                        <li>Import regulations vary — customs seizure risk</li>
                        <li>Authenticity is difficult to verify</li>
                        <li>Cold chain integrity during shipping uncertain</li>
                        <li>No recourse if product is counterfeit or damaged</li>
                        <li>Regulatory landscape of origin country may differ significantly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="pt-res__subheading">What to Demand From Any Source</h3>
              <p className="pt-res__text">
                Regardless of which channel you use, these are the non-negotiable quality signals for anything going into your body — especially injectables.
              </p>
              <div className="pt-res__checklist">
                <div className="pt-res__check-item">
                  <div className="pt-res__check-name">Third-Party Certificate of Analysis (COA)</div>
                  <div className="pt-res__check-desc">
                    Not the vendor&rsquo;s own internal testing — an independent lab. The lab name should be verifiable.
                    If a vendor won&rsquo;t share their COA or can&rsquo;t tell you which lab ran it, move on.
                  </div>
                </div>
                <div className="pt-res__check-item">
                  <div className="pt-res__check-name">HPLC Purity ≥98%</div>
                  <div className="pt-res__check-desc">
                    High-performance liquid chromatography confirms how pure the compound is. For injectables,
                    anything below 98% introduces meaningful contaminant load. 99%+ is better.
                  </div>
                </div>
                <div className="pt-res__check-item">
                  <div className="pt-res__check-name">Endotoxin / LAL Testing</div>
                  <div className="pt-res__check-desc">
                    Critical for injectables. Endotoxins are bacterial byproducts that survive sterilization and
                    cause severe immune reactions. Limulus Amebocyte Lysate (LAL) testing detects them.
                    Many vendors skip this — it&rsquo;s one of the most important tests they can run.
                  </div>
                </div>
                <div className="pt-res__check-item">
                  <div className="pt-res__check-name">Mass Spectrometry Identity Confirmation</div>
                  <div className="pt-res__check-desc">
                    Confirms that what&rsquo;s in the vial is actually what the label says. HPLC tells you it&rsquo;s pure;
                    mass spec tells you it&rsquo;s the right thing. Both matter.
                  </div>
                </div>
                <div className="pt-res__check-item">
                  <div className="pt-res__check-name">Traceable Batch / Lot Numbers</div>
                  <div className="pt-res__check-desc">
                    Batch numbers let you verify COAs belong to the product you actually received —
                    not a different production run with different quality.
                  </div>
                </div>
              </div>

              <Callout title="Red Flags — Walk Away" variant="warning">
                <ul className="pt-res__flag-list">
                  <li>No COA available, or vendor refuses to share one</li>
                  <li>COA exists but is from the vendor&rsquo;s own internal lab</li>
                  <li>Price dramatically below market (quality costs money)</li>
                  <li>No batch numbers on products or documentation</li>
                  <li>Pressure tactics, limited-time offers, or urgency messaging</li>
                  <li>Website appeared overnight with no community history</li>
                </ul>
              </Callout>
            </div>
          </section>

          {/* ══════════════════════════════════════
              3 — PRESCRIPTION vs. RESEARCH-ONLY
          ══════════════════════════════════════ */}
          <section id="prescription" className="pt-res__section">
            <div className="pt-res__card">
              <h2 className="pt-res__card-title">Prescription vs. Research-Only</h2>
              <p className="pt-res__text">
                The line between &ldquo;legal&rdquo; and &ldquo;research-only&rdquo; is not fixed — it shifts as compounds move through
                clinical trials, as compounding regulations change, and as the FDA takes enforcement action.
                Here&rsquo;s the current landscape.
              </p>

              <div className="pt-res__rx-grid">
                <div className="pt-res__rx-card">
                  <div className="pt-res__rx-card-header">
                    <RxBadge label="FDA Approved — Rx Required" />
                  </div>
                  <p className="pt-res__text--sm">These have completed clinical trials for specific indications. Use outside of indicated conditions is off-label but legal with a prescription.</p>
                  <ul className="pt-res__rx-list">
                    <li><strong>Semaglutide</strong> — Ozempic (T2D), Wegovy (obesity)</li>
                    <li><strong>Tirzepatide</strong> — Mounjaro (T2D), Zepbound (obesity)</li>
                    <li><strong>Liraglutide</strong> — Victoza (T2D), Saxenda (obesity)</li>
                    <li><strong>Teriparatide</strong> — Forteo (osteoporosis)</li>
                    <li><strong>Abaloparatide</strong> — Tymlos (osteoporosis)</li>
                    <li><strong>Desmopressin</strong> — DDAVP (diabetes insipidus, bedwetting)</li>
                    <li><strong>Octreotide</strong> — Sandostatin (acromegaly, carcinoid tumors)</li>
                    <li><strong>Lanreotide</strong> — Somatuline (acromegaly, neuroendocrine tumors)</li>
                    <li><strong>Leuprolide</strong> — Lupron (prostate cancer, endometriosis, precocious puberty)</li>
                    <li><strong>Bremelanotide</strong> — Vyleesi (hypoactive sexual desire disorder)</li>
                    <li><strong>Ziconotide</strong> — Prialt (severe chronic pain)</li>
                    <li><strong>Bivalirudin</strong> — Angiomax (anticoagulation)</li>
                    <li><strong>Linaclotide</strong> — Linzess (IBS-C, CIC)</li>
                  </ul>
                </div>

                <div className="pt-res__rx-card">
                  <div className="pt-res__rx-card-header">
                    <RxBadge label="Compounding Pharmacy (Rx)" />
                  </div>
                  <p className="pt-res__text--sm">Available via compounding pharmacy with a prescription. 503B compounders meet higher standards than 503A. Availability varies and the FDA actively monitors this space.</p>
                  <ul className="pt-res__rx-list">
                    <li><strong>Sermorelin</strong> — GHRH analog, available through many anti-aging clinics</li>
                    <li><strong>CJC-1295 (no DAC)</strong> — often combined with Ipamorelin</li>
                    <li><strong>Ipamorelin</strong> — selective GH secretagogue</li>
                    <li><strong>Gonadorelin</strong> — used for TRT support</li>
                    <li><strong>Thymosin Alpha-1</strong> — immune modulation (limited availability)</li>
                    <li><strong>BPC-157</strong> — compounding status contested; FDA has taken enforcement action against some compounders. Check current status.</li>
                  </ul>
                </div>

                <div className="pt-res__rx-card">
                  <div className="pt-res__rx-card-header">
                    <RxBadge label="Research Chemical — No Approved Human Use" />
                  </div>
                  <p className="pt-res__text--sm">Sold legally as research chemicals. No approved human indication. The majority of the peptide community operates in this space. Quality and legal status vary significantly by jurisdiction.</p>
                  <ul className="pt-res__rx-list">
                    <li><strong>BPC-157</strong> (standard form) — recovery, gut healing</li>
                    <li><strong>TB-500 / Thymosin Beta-4</strong> — recovery, tissue repair</li>
                    <li><strong>Selank / Semax</strong> — nootropic, anxiolytic</li>
                    <li><strong>Melanotan I & II</strong> — tanning, libido</li>
                    <li><strong>GHRP-2 / GHRP-6</strong> — GH secretagogues</li>
                    <li><strong>Epithalon</strong> — longevity, telomere research</li>
                    <li><strong>Humanin / SHLP-2</strong> — mitochondrial peptides</li>
                    <li><strong>AOD-9604</strong> — lipolysis fragment</li>
                    <li><strong>CJC-1295 DAC</strong> — long-acting GHRH analog</li>
                    <li>Most GHRP, modified IGF, and novel longevity peptides</li>
                  </ul>
                </div>
              </div>

              <Callout title="The Landscape Changes" variant="info">
                Regulatory status is not permanent. BPC-157 has moved in and out of compounding availability
                as the FDA has issued guidance letters to specific compounders. Retatrutide and others are in
                active clinical trials. Always verify current status before sourcing — what was available
                six months ago may not be today.
              </Callout>
            </div>
          </section>

          {/* ══════════════════════════════════════
              4 — SUPPLY & EQUIPMENT
          ══════════════════════════════════════ */}
          <section id="supply" className="pt-res__section">
            <div className="pt-res__card">
              <h2 className="pt-res__card-title">Supply & Equipment</h2>
              <p className="pt-res__text">
                The peptide itself is only part of what you need. Proper equipment and technique are
                where most beginners make preventable mistakes.
              </p>

              <div className="pt-res__supply-grid">

                <div className="pt-res__supply-card">
                  <div className="pt-res__supply-card-title">Injectable</div>
                  <p className="pt-res__text--sm">
                    The most common administration route. Most peptides are lyophilized (freeze-dried) powder
                    that must be reconstituted before use.
                  </p>
                  <div className="pt-res__supply-section-label">Reconstitution</div>
                  <ul className="pt-res__supply-list">
                    <li><strong>Bacteriostatic water (BAC water)</strong> — 0.9% benzyl alcohol. The standard reconstitution solvent. Allows multi-use from the same vial (30-day refrigerated shelf life). Do not substitute sterile water unless single-use only.</li>
                    <li><strong>Draw needle (18–21g)</strong> — for pulling BAC water into the syringe. Swap this out before injection — never inject with a draw needle.</li>
                    <li>Add BAC water slowly down the side of the vial. Do not aim the stream directly at the powder. Swirl gently — never shake. Let it dissolve naturally.</li>
                  </ul>
                  <div className="pt-res__supply-section-label">Injection</div>
                  <ul className="pt-res__supply-list">
                    <li><strong>Insulin syringes, 29–31 gauge, 0.3cc or 0.5cc</strong> — standard for subcutaneous peptide injection. Short needle (½ inch) for subcutaneous; longer (⅝ inch) if intramuscular is intended.</li>
                    <li><strong>Alcohol prep swabs</strong> — clean injection site and vial septum before every use.</li>
                    <li><strong>Sharps disposal container</strong> — never recap needles and dispose in household trash. Use a proper sharps container.</li>
                    <li><strong>Rotate injection sites</strong> — repeated injection to the same spot causes lipoatrophy (fat breakdown) and subcutaneous nodules.</li>
                  </ul>
                  <div className="pt-res__supply-section-label">Storage</div>
                  <ul className="pt-res__supply-list">
                    <li>Lyophilized (unreconstituted) peptide: most store at room temperature, away from light and heat. Some require refrigeration — check the specific compound.</li>
                    <li>Reconstituted peptide: refrigerate immediately. Most are stable 30 days refrigerated with BAC water. Do not freeze reconstituted peptide.</li>
                  </ul>
                </div>

                <div className="pt-res__supply-card">
                  <div className="pt-res__supply-card-title">Oral / Sublingual</div>
                  <p className="pt-res__text--sm">
                    Most peptides don&rsquo;t survive oral administration — gastric proteases (digestive enzymes)
                    break them down before they can be absorbed. This is why injection dominates.
                    There are exceptions.
                  </p>
                  <div className="pt-res__supply-section-label">When Oral Works</div>
                  <ul className="pt-res__supply-list">
                    <li><strong>BPC-157 Arginate</strong> — specifically formulated for acid stability and oral bioavailability. Standard BPC-157 (acetate form) is not appropriate for oral use.</li>
                    <li><strong>Enteric-coated capsules</strong> — protect peptide through gastric acid, releases in the small intestine. Used for some GI-targeted applications.</li>
                    <li><strong>MK-677 (Ibutamoren)</strong> — not technically a peptide but a GH secretagogue. Highly orally bioavailable. Often grouped with peptides.</li>
                  </ul>
                  <div className="pt-res__supply-section-label">Sublingual Administration</div>
                  <ul className="pt-res__supply-list">
                    <li>Dissolve under the tongue and hold for 1–2 minutes before swallowing. Mucosal absorption bypasses gastric degradation and first-pass liver metabolism.</li>
                    <li>Selank, Semax, and some other nootropic peptides are commonly used sublingually or intranasally.</li>
                    <li>Bioavailability is still lower than injection — typically 20–40% of subcutaneous dosing — but significantly better than straight swallowing.</li>
                  </ul>
                </div>

                <div className="pt-res__supply-card">
                  <div className="pt-res__supply-card-title">Topical</div>
                  <p className="pt-res__text--sm">
                    Cosmetic and some therapeutic peptides are designed for skin application.
                    Systemic peptides are not appropriate routes for topical application — the skin barrier
                    prevents the absorption needed for systemic effects.
                  </p>
                  <div className="pt-res__supply-section-label">Cosmetic Peptides</div>
                  <ul className="pt-res__supply-list">
                    <li><strong>GHK-Cu, Palmitoyl Pentapeptide-4, Palmitoyl Tripeptide-1</strong> — designed for topical application to stimulate collagen synthesis, skin repair, and anti-aging effects.</li>
                    <li>Apply to clean, dry skin. Cleaner skin = better penetration.</li>
                    <li>Carrier solutions matter — hyaluronic acid serums improve penetration without irritation. DMSO is highly penetrating but requires careful handling and clean skin.</li>
                    <li>Consistent daily application is typically required for visible effects — these work over weeks, not days.</li>
                  </ul>
                  <div className="pt-res__supply-section-label">Intranasal</div>
                  <ul className="pt-res__supply-list">
                    <li>Some neurological peptides (Selank, Semax, PT-141/Bremelanotide) are used intranasally for CNS access via the olfactory route.</li>
                    <li>Requires a nasal spray bottle. Standard saline spray bottles can be repurposed after thorough cleaning.</li>
                    <li>Bioavailability and onset are faster than subcutaneous for these specific compounds due to proximity to the brain.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              5 — DOSING & PROTOCOLS (PRO GATED)
          ══════════════════════════════════════ */}
          <section id="dosing" className="pt-res__section">
            <div className="pt-res__card pt-res__card--gated">
              <div className="pt-res__section-title-row">
                <h2 className="pt-res__card-title">Clinically Observed Dosing &amp; Protocols</h2>
                <ProBadge />
              </div>

              <Callout title="Important Disclosure" variant="warning">
                What follows is a compilation of real-world observed protocols — what practitioners,
                clinicians, and users are actually using. This is <strong>not</strong> medical advice,
                not a prescription, and not a dosing recommendation.
                Individual variation is significant. Consult a qualified clinician before starting any peptide.
                Pep-Talk is an educational resource, not a prescriber.
              </Callout>

              {paid ? (
                <div className="pt-res__dosing-content">
                  <p className="pt-res__text">
                    Protocols are organized by category. Within each category, you&rsquo;ll find the range of doses
                    observed in real-world use, typical administration timing, and notes on titration.
                    These are starting points for informed research conversations — not endpoints.
                  </p>

                  <h3 className="pt-res__subheading">Metabolic & Weight (GLP-1 / GIP class)</h3>
                  <div className="pt-res__protocol-grid">
                    <div className="pt-res__protocol">
                      <div className="pt-res__protocol-name">Semaglutide</div>
                      <div className="pt-res__protocol-route">Subcutaneous injection · Weekly</div>
                      <div className="pt-res__protocol-body">
                        <strong>Observed range:</strong> 0.25mg – 2.4mg weekly. Most users start at 0.25mg and increase by 0.25mg every 4 weeks based on tolerability. Many report meaningful effects at 0.5–1mg. GI side effects (nausea, vomiting) are dose-dependent and typically peak in the first 4 weeks at each new dose level.
                      </div>
                      <div className="pt-res__protocol-note">Note: Appetite suppression typically precedes weight loss by 2–4 weeks. Assess at stable dose for minimum 4 weeks before increasing.</div>
                    </div>
                    <div className="pt-res__protocol">
                      <div className="pt-res__protocol-name">Tirzepatide</div>
                      <div className="pt-res__protocol-route">Subcutaneous injection · Weekly</div>
                      <div className="pt-res__protocol-body">
                        <strong>Observed range:</strong> 2.5mg – 15mg weekly. More potent per mg than semaglutide due to dual GIP/GLP-1 mechanism. Standard titration: start 2.5mg, increase by 2.5mg every 4 weeks. Most community users stabilize at 5–10mg. Nausea is less common than semaglutide for many users, though GI effects still present.
                      </div>
                      <div className="pt-res__protocol-note">Note: Muscle loss risk at aggressive doses — high protein intake and resistance training are essential companions.</div>
                    </div>
                    <div className="pt-res__protocol">
                      <div className="pt-res__protocol-name">Retatrutide</div>
                      <div className="pt-res__protocol-route">Subcutaneous injection · Weekly</div>
                      <div className="pt-res__protocol-body">
                        <strong>Observed range:</strong> 0.5mg – 12mg weekly. Triple agonist (GLP-1/GIP/GCG) means significant individual variability. Early adopters report strong effects at 0.5–2mg. The GCG component adds a metabolic rate component not seen in GLP-1 alone. Titrate slowly — this is a potent compound.
                      </div>
                      <div className="pt-res__protocol-note">Note: Still in Phase 3 trials. Real-world data is limited relative to semaglutide/tirzepatide. Individual response varies dramatically — see the Efficacy section.</div>
                    </div>
                  </div>

                  <h3 className="pt-res__subheading">Muscle & Performance (GH Secretagogues)</h3>
                  <div className="pt-res__protocol-grid">
                    <div className="pt-res__protocol">
                      <div className="pt-res__protocol-name">CJC-1295 (no DAC) + Ipamorelin</div>
                      <div className="pt-res__protocol-route">Subcutaneous injection · Daily or 5-on/2-off</div>
                      <div className="pt-res__protocol-body">
                        <strong>Observed range:</strong> 100–300mcg each, 1–3x daily. The combination mimics natural GH pulse patterns. Most commonly dosed before sleep and/or 30 minutes before training (fasted). The &ldquo;no DAC&rdquo; form of CJC-1295 has a shorter half-life (~30 min) that better mimics natural pulsatile release vs. the DAC version.
                      </div>
                      <div className="pt-res__protocol-note">Note: Inject in a fasted state for maximum GH release — food (especially carbs) blunts the response. Typically run for 3–6 months, then assessed.</div>
                    </div>
                    <div className="pt-res__protocol">
                      <div className="pt-res__protocol-name">IGF-1 LR3</div>
                      <div className="pt-res__protocol-route">Subcutaneous or intramuscular · Daily</div>
                      <div className="pt-res__protocol-body">
                        <strong>Observed range:</strong> 20–100mcg daily. Shorter cycles commonly observed (4–6 weeks on, 4–6 weeks off) due to receptor desensitization. Post-workout administration is common for muscle-directed use. Some protocols use localized intramuscular injection for site-specific effects.
                      </div>
                      <div className="pt-res__protocol-note">Note: IGF-1 LR3 has a significantly longer half-life (~20-30 hours) than native IGF-1. Hypoglycemia risk is real — have fast-acting carbs available, especially early on.</div>
                    </div>
                    <div className="pt-res__protocol">
                      <div className="pt-res__protocol-name">GHRP-2 / GHRP-6</div>
                      <div className="pt-res__protocol-route">Subcutaneous injection · Multiple daily doses</div>
                      <div className="pt-res__protocol-body">
                        <strong>Observed range:</strong> 100–300mcg per dose, 2–3x daily. Often stacked with a GHRH (CJC-1295, Sermorelin) for synergistic GH release. GHRP-6 is well known for significant hunger stimulation — often described as &ldquo;ravenous&rdquo; appetite within 20 minutes of injection. GHRP-2 is considered cleaner with less hunger stimulus.
                      </div>
                    </div>
                  </div>

                  <h3 className="pt-res__subheading">Recovery & Repair</h3>
                  <div className="pt-res__protocol-grid">
                    <div className="pt-res__protocol">
                      <div className="pt-res__protocol-name">BPC-157</div>
                      <div className="pt-res__protocol-route">Subcutaneous, intramuscular, or oral (arginate form only)</div>
                      <div className="pt-res__protocol-body">
                        <strong>Observed range:</strong> 200–800mcg daily. For localized injury: inject near (not into) the injury site — subcutaneous above the area. For systemic effects: inject in the abdomen subcutaneously. Oral protocols (arginate form): 500mcg–1500mcg daily for GI applications. Typical run duration: 4–12 weeks.
                      </div>
                      <div className="pt-res__protocol-note">
                        Warning: BPC-157 is a vasodilator. Titrate up from low doses. Do not increase dose rapidly — see the Safety &amp; Titration section for a real-world case study on this exact compound.
                      </div>
                    </div>
                    <div className="pt-res__protocol">
                      <div className="pt-res__protocol-name">TB-500 (Thymosin Beta-4)</div>
                      <div className="pt-res__protocol-route">Subcutaneous injection · Weekly</div>
                      <div className="pt-res__protocol-body">
                        <strong>Observed range:</strong> Loading phase: 2–4mg weekly for 4–8 weeks. Maintenance: 2mg bi-weekly or monthly. Often stacked with BPC-157 for synergistic recovery effects (&ldquo;The Wolverine Stack&rdquo;). Generally well tolerated — lower reported side effect burden than most peptides.
                      </div>
                    </div>
                  </div>

                  <h3 className="pt-res__subheading">Longevity & Mitochondrial</h3>
                  <div className="pt-res__protocol-grid">
                    <div className="pt-res__protocol">
                      <div className="pt-res__protocol-name">GHK-Cu (Systemic)</div>
                      <div className="pt-res__protocol-route">Subcutaneous injection · 2–3x weekly</div>
                      <div className="pt-res__protocol-body">
                        <strong>Observed range:</strong> 0.5–2mg per injection, 2–3x weekly. Typically cycled — 8–12 weeks on, 4–8 weeks off. Anti-inflammatory, wound healing, collagen synthesis, and neurological regeneration effects are all being studied. Topical GHK-Cu is different and separate (see cosmetic peptides).
                      </div>
                    </div>
                    <div className="pt-res__protocol">
                      <div className="pt-res__protocol-name">Epithalon</div>
                      <div className="pt-res__protocol-route">Subcutaneous injection · Daily cycles</div>
                      <div className="pt-res__protocol-body">
                        <strong>Observed range:</strong> 5–10mg daily for 10–20 days, typically 2–4x per year. Often referenced in the context of telomere biology and longevity. Limited human trial data — most evidence is animal and in vitro. Considered well tolerated in observed use.
                      </div>
                    </div>
                  </div>

                  <h3 className="pt-res__subheading">Brain & Mood (Nootropic)</h3>
                  <div className="pt-res__protocol-grid">
                    <div className="pt-res__protocol">
                      <div className="pt-res__protocol-name">Selank</div>
                      <div className="pt-res__protocol-route">Intranasal · Daily</div>
                      <div className="pt-res__protocol-body">
                        <strong>Observed range:</strong> 250–500mcg per nostril, 1–2x daily. Anxiolytic and nootropic effects. Typically run 10–14 days on, several days off to prevent receptor desensitization. Generally well tolerated. Some users report mild sedation initially.
                      </div>
                    </div>
                    <div className="pt-res__protocol">
                      <div className="pt-res__protocol-name">Semax</div>
                      <div className="pt-res__protocol-route">Intranasal · Daily</div>
                      <div className="pt-res__protocol-body">
                        <strong>Observed range:</strong> 200–600mcg per nostril, 1–2x daily. More stimulating than Selank — often described as clarity and focus without jitteriness. BDNF-upregulating properties make it popular for cognitive enhancement. Cycle recommendations similar to Selank.
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <ProGate paid={paid} />
              )}
            </div>
          </section>

          {/* ══════════════════════════════════════
              6 — EFFICACY & INDIVIDUAL VARIATION
          ══════════════════════════════════════ */}
          <section id="efficacy" className="pt-res__section">
            <div className="pt-res__card">
              <h2 className="pt-res__card-title">Efficacy & Individual Variation</h2>
              <p className="pt-res__text">
                One of the most common and most frustrating experiences with peptides: the same compound,
                the same dose, produces dramatically different results in two people. This is not a product failure.
                It&rsquo;s human biology — and understanding why it happens helps you interpret your results and adjust intelligently.
              </p>

              <Callout title="A Real Example" variant="case">
                Two people on Retatrutide. One reports highly effective appetite suppression and weight loss at 0.5mg weekly.
                The other — same compound, different body — is at 2mg with minimal visible effects, asking &ldquo;why isn&rsquo;t this working?&rdquo;
                Both outcomes are real. Neither is wrong. The 4x dose difference reflects genuine biological variation, not product quality.
              </Callout>

              <h3 className="pt-res__subheading">Why the Same Dose Hits Differently</h3>
              <div className="pt-res__factor-grid">
                <div className="pt-res__factor">
                  <div className="pt-res__factor-title">Receptor Sensitivity</div>
                  <p className="pt-res__factor-body">
                    Genetic variation in receptor density and receptor affinity means some people have more GLP-1, GIP, or growth hormone receptors — or receptors that bind more tightly. A &ldquo;low dose&rdquo; for someone with high receptor sensitivity is a full therapeutic dose. A &ldquo;high dose&rdquo; for someone with lower sensitivity barely moves the needle.
                  </p>
                </div>
                <div className="pt-res__factor">
                  <div className="pt-res__factor-title">Pharmacokinetics</div>
                  <p className="pt-res__factor-body">
                    How fast your body absorbs, distributes, metabolizes, and clears a compound varies by age, body composition, liver and kidney function, and genetics (CYP enzyme variants). Two people at the same dose may have peak blood concentrations that differ by 2–3x based on clearance rate alone.
                  </p>
                </div>
                <div className="pt-res__factor">
                  <div className="pt-res__factor-title">Body Composition & Distribution</div>
                  <p className="pt-res__factor-body">
                    Higher body fat means larger distribution volume — the compound has more tissue to spread through before reaching effective concentration at the receptor. A 200lb person with 30% body fat has meaningfully different pharmacodynamics than a 200lb person with 12% body fat.
                  </p>
                </div>
                <div className="pt-res__factor">
                  <div className="pt-res__factor-title">Baseline Hormone & Metabolic State</div>
                  <p className="pt-res__factor-body">
                    If your endogenous GLP-1 levels are already elevated, you may have partial receptor occupancy before your dose — meaning the drug has less &ldquo;open receptor&rdquo; to bind. Your starting metabolic state (insulin sensitivity, baseline GH levels, existing inflammation) dramatically shapes how much room a peptide has to create change.
                  </p>
                </div>
                <div className="pt-res__factor">
                  <div className="pt-res__factor-title">Injection Technique & Site</div>
                  <p className="pt-res__factor-body">
                    Subcutaneous injection depth, speed of injection, and site rotation all affect absorption rate. Injecting into scar tissue or a fibrosed injection site reduces absorption. Consistent technique produces consistent results — inconsistent technique produces noise in your data.
                  </p>
                </div>
                <div className="pt-res__factor">
                  <div className="pt-res__factor-title">Co-factors: Sleep, Nutrition, Stress</div>
                  <p className="pt-res__factor-body">
                    GH secretagogues need slow-wave sleep to work — injecting before bed into a night of poor sleep undermines the mechanism. GLP-1 agonists work partly through central appetite suppression — chronic stress and cortisol elevation can blunt appetite-related signaling. Your lifestyle context changes what a peptide can do.
                  </p>
                </div>
              </div>

              <h3 className="pt-res__subheading">Interpreting &ldquo;It&rsquo;s Not Working&rdquo;</h3>
              <p className="pt-res__text">
                Before concluding a compound isn&rsquo;t working, work through this checklist systematically:
              </p>
              <div className="pt-res__checklist">
                <div className="pt-res__check-item">
                  <div className="pt-res__check-name">Have you given it adequate time?</div>
                  <div className="pt-res__check-desc">GLP-1 class peptides: 4–6 weeks at a stable dose before assessing. GH secretagogues: 6–12 weeks. Recovery peptides: 4–8 weeks depending on the injury and application. Most people underestimate the timeline.</div>
                </div>
                <div className="pt-res__check-item">
                  <div className="pt-res__check-name">Is your source verified?</div>
                  <div className="pt-res__check-desc">A COA-verified product with confirmed purity eliminates product quality as a variable. If you haven&rsquo;t verified your source, this is the first thing to rule out — you may not have what the label says.</div>
                </div>
                <div className="pt-res__check-item">
                  <div className="pt-res__check-name">Is your technique consistent?</div>
                  <div className="pt-res__check-desc">Are you injecting into the same site repeatedly (absorption impaired)? Is your reconstitution math correct? Have you been injecting air bubbles or losing volume? Technique errors are more common than they get credit for.</div>
                </div>
                <div className="pt-res__check-item">
                  <div className="pt-res__check-name">Are you in the right dose range?</div>
                  <div className="pt-res__check-desc">If you&rsquo;ve confirmed source quality and technique, individual variation may mean you need a higher dose. Gradual, systematic titration upward — not jumping to 4x the dose — is how you find your threshold safely.</div>
                </div>
                <div className="pt-res__check-item">
                  <div className="pt-res__check-name">Are your goals realistic for this compound?</div>
                  <div className="pt-res__check-desc">Not every peptide produces dramatic observable results in every person for every goal. Understanding what the compound actually does — vs. what the community has hype-attributed to it — matters for setting expectations.</div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              7 — EMERGING SIDE EFFECTS
          ══════════════════════════════════════ */}
          <section id="side-effects" className="pt-res__section">
            <div className="pt-res__card">
              <h2 className="pt-res__card-title">Emerging Side Effects by Category</h2>
              <p className="pt-res__text">
                Most peptides have limited long-term human safety data. What we know comes from clinical trials,
                clinical observation, and community reporting — all of which have limitations. What follows represents
                the currently observed side effect landscape by category. This is not exhaustive and will evolve as evidence accumulates.
              </p>

              <div className="pt-res__se-grid">

                <div className="pt-res__se-card">
                  <div className="pt-res__se-card-title">Metabolic / GLP-1 Class</div>
                  <ul className="pt-res__se-list">
                    <li><strong>Nausea & vomiting</strong> — most common, dose-dependent, typically resolves after 2–4 weeks at each dose level</li>
                    <li><strong>Gastroparesis</strong> — severe slowing of stomach emptying. Rare but serious. Risk increases at higher doses and with longer use.</li>
                    <li><strong>Muscle mass loss</strong> — the GLP-1 class produces significant muscle catabolism alongside fat loss. Resistance training and high protein intake are not optional.</li>
                    <li><strong>Rapid heart rate (GIP component)</strong> — particularly notable with tirzepatide and retatrutide. Usually self-limiting.</li>
                    <li><strong>Thyroid C-cell concerns</strong> — rodent studies showed C-cell tumors. Clinical significance in humans unresolved but warrants caution in those with personal or family history of medullary thyroid carcinoma (MEN2).</li>
                    <li><strong>Facial fat loss (&ldquo;Ozempic face&rdquo;)</strong> — rapid fat loss is non-selective. The face loses fat too, creating a gaunt appearance at significant weight loss amounts.</li>
                    <li><strong>Rebound weight gain</strong> — upon discontinuation, appetite returns and weight regain is common without behavioral changes that can sustain the loss.</li>
                  </ul>
                </div>

                <div className="pt-res__se-card">
                  <div className="pt-res__se-card-title">Recovery / Repair (BPC-157, TB-500)</div>
                  <ul className="pt-res__se-list">
                    <li><strong>Vasodilation & blood pressure drop</strong> — BPC-157 is a potent vasodilator. Flushing, warmth, light-headedness, and in excessive doses, syncope (passing out). This is dose-dependent and titration-sensitive. See Safety & Titration for a real-world case study.</li>
                    <li><strong>Temporary fatigue</strong> — reported by some TB-500 users, especially at higher loading doses. Usually self-limiting within 24–48 hours of injection.</li>
                    <li><strong>Transient GI changes</strong> — BPC-157 actively affects GI motility and gut healing. Some users report changes in bowel habits, especially early on.</li>
                    <li><strong>Injection site reactions</strong> — mild redness and swelling common with any peptide. Persistent nodules suggest technique issues or localized immune response.</li>
                  </ul>
                </div>

                <div className="pt-res__se-card">
                  <div className="pt-res__se-card-title">GH Secretagogues</div>
                  <ul className="pt-res__se-list">
                    <li><strong>Water retention</strong> — especially with DAC-form peptides. Hands, face, and ankles most common. Usually resolves with dose reduction or discontinuation.</li>
                    <li><strong>Insulin sensitivity changes</strong> — growth hormone elevation has anti-insulin effects. Morning fasting blood glucose can rise. Monitor if you have metabolic concerns.</li>
                    <li><strong>Carpal tunnel-like symptoms</strong> — tingling, numbness, and weakness in hands and wrists. Classic GH side effect at supra-physiological levels. Dose-dependent.</li>
                    <li><strong>Hunger (GHRP-6 specific)</strong> — GHRP-6 stimulates ghrelin and causes intense hunger within 20 minutes. Factor this into your nutrition plan.</li>
                    <li><strong>Cortisol & prolactin elevation</strong> — GHRP-2 and GHRP-6 at high doses can elevate cortisol and prolactin. Monitored labs are valuable for long-term users.</li>
                  </ul>
                </div>

                <div className="pt-res__se-card">
                  <div className="pt-res__se-card-title">Neurological / Nootropic</div>
                  <ul className="pt-res__se-list">
                    <li><strong>Mood shifts</strong> — Selank and Semax actively modulate neurotransmitter activity. Most experience positive effects; some experience anxiety, irritability, or mood lability, particularly early on.</li>
                    <li><strong>Sleep changes</strong> — both in quality and architecture. Some report deeper sleep; others report disrupted sleep, especially if dosed too late in the day.</li>
                    <li><strong>Stimulant-like effects</strong> — Semax in particular can produce alertness/focus effects that may be unwanted in the evening. Time your doses accordingly.</li>
                    <li><strong>Tolerance & desensitization</strong> — neurological peptides seem to lose efficacy with continuous daily use. Cycling (10–14 days on, break) is the standard approach.</li>
                  </ul>
                </div>

                <div className="pt-res__se-card">
                  <div className="pt-res__se-card-title">Universal / Any Peptide</div>
                  <ul className="pt-res__se-list">
                    <li><strong>Injection site reactions</strong> — redness, swelling, and mild pain are expected and usually resolve within 24–48 hours. Persistent or progressive reactions warrant investigation.</li>
                    <li><strong>Lipoatrophy</strong> — fat breakdown at the injection site with repeated same-site injection. Prevented by rotating sites.</li>
                    <li><strong>Endotoxin reaction</strong> — fever, chills, severe systemic symptoms within hours of injection. This is a product quality issue, not a peptide effect. Indicates contaminated supply.</li>
                    <li><strong>Unknown long-term effects</strong> — most peptides outside of FDA-approved compounds have limited long-term human safety data. All use in this space involves accepting some degree of unknown risk.</li>
                  </ul>
                </div>

              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              8 — SAFETY & TITRATION
          ══════════════════════════════════════ */}
          <section id="safety" className="pt-res__section">
            <div className="pt-res__card">
              <h2 className="pt-res__card-title">Safety & Titration Fundamentals</h2>
              <p className="pt-res__text">
                Titration — starting low and increasing dose gradually — isn&rsquo;t a suggestion. It&rsquo;s the mechanism by which you
                find <em>your</em> therapeutic threshold before your body finds it for you. Here&rsquo;s why it matters,
                illustrated with a real case.
              </p>

              <Callout title="Case Study: BPC-157 & Vasodilation" variant="case">
                <p>A first-time BPC-157 user injected 7.5mg on day one. He felt the vasodilatory effects — warmth, flushing,
                mild light-headedness — and interpreted it as the compound working. Two days later, wanting more effect,
                he increased to 20mg. He passed out.</p>
                <p style={{ marginTop: 10 }}>
                  What happened: BPC-157 is a potent vasodilator. At 7.5mg he was near his tolerance ceiling.
                  The 166% dose increase in 48 hours pushed blood pressure low enough to cause syncope.
                  He had no baseline, no titration, and no understanding of what the vasodilation signal was telling him.
                </p>
                <p style={{ marginTop: 10 }}>
                  Standard observed starting doses for BPC-157 are 200–250mcg — more than 30x lower than his day-one dose.
                  That gap exists for exactly this reason.
                </p>
              </Callout>

              <h3 className="pt-res__subheading">The Non-Negotiable Rules of Titration</h3>
              <div className="pt-res__steps">
                <div className="pt-res__step">
                  <div className="pt-res__step-num">01</div>
                  <div className="pt-res__step-content">
                    <div className="pt-res__step-title">Start at the lowest cited dose — or below it</div>
                    <p className="pt-res__step-body">The lowest commonly observed dose is not the starting point after you feel nothing. It&rsquo;s the starting point before you&rsquo;ve established any baseline. Your first goal is to discover how your body responds, not to achieve an effect.</p>
                  </div>
                </div>
                <div className="pt-res__step">
                  <div className="pt-res__step-num">02</div>
                  <div className="pt-res__step-content">
                    <div className="pt-res__step-title">Wait before you assess</div>
                    <p className="pt-res__step-body">Different compounds have different timelines. GLP-1 agonists: minimum 4 weeks at a stable dose. GH secretagogues: 6–12 weeks. Recovery peptides: 2–4 weeks per application. Most people make dose decisions after days on a compound that takes weeks to show effect. Patience is a methodology.</p>
                  </div>
                </div>
                <div className="pt-res__step">
                  <div className="pt-res__step-num">03</div>
                  <div className="pt-res__step-content">
                    <div className="pt-res__step-title">Never increase by more than 25–50% in one step</div>
                    <p className="pt-res__step-body">A doubling of dose is a significant pharmacological event. A 166% increase (as in the case above) is extreme. Each increase should be small enough that if your response is stronger than expected, the consequences are manageable. The BPC-157 case was survivable. Higher stakes compounds could have worse outcomes.</p>
                  </div>
                </div>
                <div className="pt-res__step">
                  <div className="pt-res__step-num">04</div>
                  <div className="pt-res__step-content">
                    <div className="pt-res__step-title">Log everything</div>
                    <p className="pt-res__step-body">Dose, time of injection, how you felt 30 minutes later, 2 hours later, the next day. Weight, sleep quality, training performance if relevant. You cannot make good adjustments without data. Memory is unreliable — a simple notes app entry is enough.</p>
                  </div>
                </div>
                <div className="pt-res__step">
                  <div className="pt-res__step-num">05</div>
                  <div className="pt-res__step-content">
                    <div className="pt-res__step-title">Effect is not the same as optimal dose</div>
                    <p className="pt-res__step-body">Feeling something does not mean you should increase the dose. It means you&rsquo;ve found an active dose. Stay there for multiple administrations and assess. Many people are chasing stronger effects when they&rsquo;re already in their optimal window.</p>
                  </div>
                </div>
                <div className="pt-res__step">
                  <div className="pt-res__step-num">06</div>
                  <div className="pt-res__step-content">
                    <div className="pt-res__step-title">Know when to stop — immediately</div>
                    <p className="pt-res__step-body">Stop and seek medical attention for: chest pain or palpitations, significant blood pressure change (dizziness, syncope), allergic reaction signs (hives, facial swelling, difficulty breathing), severe headache, prolonged GI distress beyond expected range. These are not &ldquo;side effects to push through.&rdquo;</p>
                  </div>
                </div>
              </div>

              <Callout title="Your Protocol Is Not Someone Else&rsquo;s Protocol" variant="info">
                The BIL started at 7.5mg because he found that number in a forum post. Someone in that forum post had built to 7.5mg over weeks starting at 250mcg. Context matters. The dose someone else is on today reflects their months of titration history — it is not your starting point.
              </Callout>
            </div>
          </section>

          {/* ══════════════════════════════════════
              COMMUNITY
          ══════════════════════════════════════ */}
          <section id="community" className="pt-res__section">
            <div className="pt-res__card">
              <h2 className="pt-res__card-title">The Community</h2>
              <p className="pt-res__text">
                Pep-Talk combines structured education with real-world discussion. Every compound page hosts
                an open comment section where users share experiences, ask questions, and build context around specific peptides.
              </p>
              <p className="pt-res__text">
                Free users can comment after creating an account. Pro members unlock curated community insight summaries —
                the patterns and signals that consistently emerge from discussion, distilled so you don&rsquo;t have to read
                every thread to catch what the community has learned.
              </p>
              <div className="pt-res__community-ctas">
                <Link href="/peptides" className="pt-res__community-cta">
                  Browse Compound Pages &rarr;
                </Link>
                {!paid && (
                  <Link href="/upgrade" className="pt-res__community-cta pt-res__community-cta--outline">
                    Unlock Community Insights with Pro
                  </Link>
                )}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
