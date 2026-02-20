import { getRiskForPeptide, evidenceGradeLabel } from "@/lib/riskIndex";
import MaturityPostureLabel from "@/components/MaturityPostureLabel";
import VialImage from "@/components/VialImage";
import AliasSequenceMini from "@/components/AliasSequenceMini";
import { loadPeptideBySlug, getAliasesForSlug } from "@/lib/content";
import { getSupportPack } from "@/lib/supportLayer";
import SupportLayerSection from "@/components/SupportLayerSection";

import ContentBlocks from "@/components/ContentBlocks";
import EvidenceList from "@/components/EvidenceList";
import InteractionsSection from "@/components/InteractionsSection";
import PDPContextualConsiderations from "@/components/PDPContextualConsiderations";
import PeptideCommentsSection from "@/components/PeptideCommentsSection";
import CollapsibleSection from "@/components/CollapsibleSection";

export default async function PeptidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const isRetatrutide = slug === "retatrutide";

  const riskHit = getRiskForPeptide(slug);
  const safetyLinks = (riskHit?.safety_links ?? []).filter(Boolean);
  const hasSafetyFlags = Boolean(
    riskHit && (
      riskHit.risk?.severity ||
      riskHit.risk?.likelihood ||
      riskHit.risk?.developmental_risk ||
      riskHit.risk?.unknowns_penalty ||
      safetyLinks.length
    )
  );

  const doc = await loadPeptideBySlug(slug);
  const supportPack = getSupportPack(doc as any);

  const p = doc?.peptide ?? {};
  const sections = p?.sections ?? {};

  const peptideName = String(p?.canonical_name ?? slug);

  const statusCategory = String(p?.status?.category ?? p?.classification?.category ?? "").trim();

  function titleize(x: string) {
    return x
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (m) => m.toUpperCase());
  }

  const statusLabel = statusCategory ? titleize(statusCategory) : "";

  const topicSlug = String(p?.topics?.primary?.[0] ?? "").trim();
  function topicLabelFor(slug: string) {
    const clean = slug.replace(/^topic_/, "").trim();
    if (!clean) return "";
    if (clean == "fat_loss_metabolism") return "Fat loss & metabolism";
    return titleize(clean);
  }
  const topicLabel = topicLabelFor(topicSlug);

  const evidenceLabel = evidenceGradeLabel(riskHit?.risk?.evidence_grade ?? null);

  const mergedAliases = Array.from(
    new Set([...(Array.isArray(p?.aliases) ? p.aliases : []), ...getAliasesForSlug(slug)])
  );

  return (
    <main className={`pt-page${isRetatrutide ? " pt-benchmark" : ""}`}>
      <div className={`pt-hero${isRetatrutide ? " pt-hero--open" : ""}`}>
        {isRetatrutide ? (
          <div className="reta-hero">
            <div className="reta-hero__top">
              <h1 className="reta-hero__title">{peptideName}</h1>

              <div className="reta-hero__identity">
                <div className="reta-hero__kicker">
                  {statusLabel ? <span className="reta-chip">Status: {statusLabel}</span> : null}
                  {topicLabel ? <span className="reta-taxonomy">Context: {topicLabel}</span> : null}
                </div>

              <p className="reta-hero__posture">
                <strong>{evidenceLabel}.</strong> This page is a descriptive overview — it does not provide protocols or personalized instruction.
              </p>

              <p className="reta-hero__frame">
                What it is, why people care, what to watch for, and what’s still uncertain — presented calmly and with explicit uncertainty where evidence is thin.
              </p>
              </div>

              <div className="reta-hero__meta">
                  <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <span style={{ fontSize: 12, opacity: 0.72, fontWeight: 800, marginRight: 6 }}>Quick jumps:</span>
                    <a href="#start" style={{ textDecoration: "none", fontSize: 12, fontWeight: 800, opacity: 0.88, border: "1px solid rgba(0,0,0,0.14)", borderRadius: 999, padding: "6px 10px" }}>Start</a>
                    <a href="#evidence" style={{ textDecoration: "none", fontSize: 12, fontWeight: 800, opacity: 0.88, border: "1px solid rgba(0,0,0,0.14)", borderRadius: 999, padding: "6px 10px" }}>Evidence</a>
                    <a href="#safety" style={{ textDecoration: "none", fontSize: 12, fontWeight: 800, opacity: 0.88, border: "1px solid rgba(0,0,0,0.14)", borderRadius: 999, padding: "6px 10px" }}>Safety</a>
                    <a href="#interactions" style={{ textDecoration: "none", fontSize: 12, fontWeight: 800, opacity: 0.88, border: "1px solid rgba(0,0,0,0.14)", borderRadius: 999, padding: "6px 10px" }}>Interactions</a>
                    <a href="#community" style={{ textDecoration: "none", fontSize: 12, fontWeight: 800, opacity: 0.88, border: "1px solid rgba(0,0,0,0.14)", borderRadius: 999, padding: "6px 10px" }}>Community</a>
                  </div>


              </div>

              {/* PT_OVERVIEW_IN_HERO_V1 */}
                <section data-pt="overview-in-hero" className={isRetatrutide ? "pt-section pt-section--primary" : "pt-card"}>
                  <ContentBlocks
                    heading="Overview"
                    blocks={sections?.overview ?? null}
                    showEmpty
                    emptyText="No overview has been added yet."
                    wrapCard={false}
                  />
                </section>
                <a className="reta-hero__cta" href="#community">
                Join the conversation → <span style={{ fontSize: 12, opacity: 0.72, fontWeight: 700, marginLeft: 10 }}>Real-world notes from people who’ve tried it</span>
              </a>
            </div>
          </div>
        ) : (
          <>
            <VialImage kind="peptide" slug={slug} alt={`${peptideName} vial`} />

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1>{peptideName}</h1>

                <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <a
                    href="#community"
                    style={{
                      textDecoration: "none",
                      fontWeight: 900,
                      opacity: 0.88,
                      border: "1px solid rgba(0,0,0,0.12)",
                      borderRadius: 999,
                      padding: "8px 10px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    Join the Conversation →
                    <span style={{ fontSize: 12, opacity: 0.72, fontWeight: 700, marginLeft: 10 }}>
                      See real-world experiences
                    </span>
                  </a>
                </div>
              </div>
              <div className="w-full sm:max-w-[420px] flex flex-col gap-3">
                {riskHit ? (
                  <div>
                    <MaturityPostureLabel evidenceGrade={riskHit?.risk?.evidence_grade ?? null} />
                  </div>
                ) : null}
                <AliasSequenceMini aliases={mergedAliases} />
              </div>
            </div>
          </>
        )}
      </div>
      <div className={isRetatrutide ? "pt-benchmark-grid" : "grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start"}>
        <div className="grid gap-6">
          {/* PT_START_HERE_V1 */}
          {isRetatrutide ? (
            <section id="start" className="pt-section pt-section--primary" aria-label="Start here">
              <div className="pt-start">
                <h2 className="pt-start__title">Start here</h2>
                <ul className="pt-start__list">
                  <li>What it is: an investigational incretin drug being studied for weight and metabolic outcomes.</li>
                  <li>What matters most: real effects vs. tolerability, and what long-term data still hasn’t been proven.</li>
                  <li>How to use this page: skim what’s open, then expand sections when you want detail.</li>
                </ul>
              </div>
            </section>
          ) : null}


          {/* moved: SupportLayer -> utility zone */}
                    {isRetatrutide ? null : (
<section className={isRetatrutide ? "pt-section pt-section--primary" : "pt-card"}>
            <ContentBlocks
              heading="Overview"
              blocks={sections?.overview ?? null}
              showEmpty
              emptyText="No overview has been added yet."
              wrapCard={false}
            />
          </section>
          )}

          <section className={isRetatrutide ? "pt-section pt-section--primary" : "pt-card"}>
            <ContentBlocks
              heading="What people discuss and why it matters"
              blocks={sections?.use_cases ?? null}
              showEmpty
              emptyText="No discussion framing has been added yet."
              wrapCard={false}
            />
          </section>
            <section id="evidence" className={isRetatrutide ? "pt-section pt-section--secondary" : "pt-card"}>
            <div style={{ display: "grid", gap: 10 }}>
              <div>
                <h2 style={{ margin: 0 }}>Evidence</h2>
                <p style={{ marginTop: 8, marginBottom: 0, fontSize: 13, lineHeight: 1.55, opacity: 0.78, maxWidth: 760 }}>
                  This is a living snapshot of what’s been studied, what’s been observed, and what remains unclear — without hype framing. Expand “Deep dive” for the full structure and nuance.
                </p>
              </div>

              {/* PT_EVIDENCE_DEEP_DIVE_V1 */}
              <CollapsibleSection title="Deep dive" defaultCollapsedMobile defaultCollapsed>
                <div style={{ display: "grid", gap: 12 }}>
                  <CollapsibleSection title="What the evidence includes" defaultCollapsedMobile defaultCollapsed titleClassName="pt-collapse-title--nested">
                    <div style={{ marginTop: 10 }}>
                      <ContentBlocks
                        heading="Evidence posture"
                        blocks={sections?.evidence_posture ?? null}
                        showEmpty
                        emptyText="No evidence posture has been added yet."
                        wrapCard={false}
                      />
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="How to read this" defaultCollapsedMobile defaultCollapsed titleClassName="pt-collapse-title--nested">
                    <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.65, opacity: 0.92, maxWidth: 760 }}>
                      Favor human data over animal-only findings. Look for replication, duration, and whether outcomes are clinically meaningful
                      (not just surrogate markers). If results are short-term, single-site, or based on small samples, treat conclusions as provisional.
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="What’s missing" defaultCollapsedMobile defaultCollapsed titleClassName="pt-collapse-title--nested">
                    <ul className="pt-safety__list" style={{ marginTop: 10 }}>
                      <li>Long-duration follow-up in diverse populations.</li>
                      <li>Clear comparisons versus established alternatives on outcomes people actually care about.</li>
                      <li>Better understanding of who benefits most, who tolerates it poorly, and why.</li>
                    </ul>
                  </CollapsibleSection>

                  <CollapsibleSection title="Study list" defaultCollapsedMobile defaultCollapsed titleClassName="pt-collapse-title--nested">
                    <div style={{ marginTop: 10 }}>
                      <EvidenceList evidence={p?.evidence ?? []} wrapCard={false} />
                    </div>
                  </CollapsibleSection>
                </div>
              </CollapsibleSection>


            </div>
          </section>
          {/* PT_SAFETY_REFRAME_V1 */}
          {isRetatrutide && hasSafetyFlags ? (
            <section id="safety" className={isRetatrutide ? "pt-section pt-section--secondary pt-safety" : "pt-card"}>
              <div className="pt-safety__head">
                <h2 className="pt-safety__title">Safety</h2>
                <p className="pt-safety__sub">
                  Calm context — what’s known, what’s uncertain, and when to pause. Not a score.
                </p>
              </div>

              <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.6, opacity: 0.92, maxWidth: 760 }}>
                {riskHit?.risk?.developmental_risk || riskHit?.risk?.unknowns_penalty ? (
                  <>
                    This is a newer compound with real early human data, but the long-term picture is still being defined.
                    The main practical risk is tolerability and unintended under-eating (which can cascade into fatigue,
                    constipation/dehydration, and lean-mass loss if basics slip).
                  </>
                ) : (
                  <>
                    This section summarizes the most relevant safety context currently recorded — without alarm framing.
                    If you’re seeing strong side effects or something feels “off,” that’s a signal to slow down and reassess.
                  </>
                )}
              </div>

              <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                <CollapsibleSection title="Red flags" defaultCollapsedMobile defaultCollapsed titleClassName="pt-collapse-title--nested">
                  <ul className="pt-safety__list">
                    {riskHit?.risk?.severity ? <li><strong>Severity:</strong> {riskHit.risk.severity}</li> : null}
                    {riskHit?.risk?.likelihood ? <li><strong>Likelihood:</strong> {riskHit.risk.likelihood}</li> : null}

                    {!riskHit?.risk?.severity && !riskHit?.risk?.likelihood ? (
                      <li>No red-flag signals have been added yet.</li>
                    ) : null}
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Uncertainty & long-term unknowns" defaultCollapsedMobile defaultCollapsed titleClassName="pt-collapse-title--nested">
                  <ul className="pt-safety__list">
                    {riskHit?.risk?.developmental_risk ? (
                      <li>Higher uncertainty due to novelty / limited long-term follow-up.</li>
                    ) : null}
                    {riskHit?.risk?.unknowns_penalty ? (
                      <li>Long-term outcomes are not well established.</li>
                    ) : null}

                    {!riskHit?.risk?.developmental_risk && !riskHit?.risk?.unknowns_penalty ? (
                      <li>No uncertainty notes have been added yet.</li>
                    ) : null}
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="When to pause & reassess" defaultCollapsedMobile defaultCollapsed titleClassName="pt-collapse-title--nested">
                  <ul className="pt-safety__list">
                    <li>If side effects are escalating instead of settling over time.</li>
                    <li>If you can’t keep fluids/food down, or you’re getting persistently lightheaded.</li>
                    <li>If you notice severe, persistent abdominal pain, confusion, chest pain, or fainting.</li>
                    <li>If something feels meaningfully “off” compared with your normal baseline.</li>
                    <li>In those cases, treat it as a signal to slow down and reassess — and seek medical care if symptoms are severe.</li>
                  </ul>
                </CollapsibleSection>


                {safetyLinks.length ? (
                  <CollapsibleSection title="Related safety notes" defaultCollapsedMobile defaultCollapsed titleClassName="pt-collapse-title--nested">
                    <div className="pt-safety__linksGrid" style={{ marginTop: 6 }}>
                      {safetyLinks.map((id) => (
                        <a key={id} className="pt-safety__link" href={`/safety/${id}`}>
                          View note →
                        </a>
                      ))}
                    </div>
                  </CollapsibleSection>
                ) : null}
              </div>
            </section>
          ) : null}

<section className={isRetatrutide ? "pt-section pt-section--secondary" : "pt-card"}>
            <InteractionsSection
              hideHeading={false}
              drugClasses={doc?.interactions?.drug_classes}
              supplementClasses={doc?.interactions?.supplement_classes}
              peptides={doc?.interactions?.peptides}
              interactionSummaryBlocks={sections?.interaction_summary}
            />
          </section>
          <section className={isRetatrutide ? "pt-section pt-section--secondary" : "pt-card"}>
            <PDPContextualConsiderations peptideName={peptideName} />
          </section>
        </div>

        <div className={isRetatrutide ? "pt-benchmark-utility" : "grid gap-6"}>
          {supportPack ? <SupportLayerSection pack={supportPack} /> : null}</div>
      </div>
        


      {/* NOTE: Community read is public; write requires auth. */}
      <div id="community">
        <PeptideCommentsSection slug={slug} />
      </div>
    </main>
  );
}
