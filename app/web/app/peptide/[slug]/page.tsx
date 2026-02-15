import { getRiskForPeptide, evidenceGradeLabel } from "@/lib/riskIndex";
import RiskBadge from "@/components/RiskBadge";
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
  const doc = await loadPeptideBySlug(slug);
  const supportPack = getSupportPack(doc as any);

  const p = doc?.peptide ?? {};
  const sections = p?.sections ?? {};

  const peptideName = String(p?.canonical_name ?? slug);

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
              <p className="reta-hero__sub">
                The benchmark PDP. Built with stability-first editorial hierarchy and clear evidence posture.
              </p>

              <div className="reta-hero__meta">
                <AliasSequenceMini aliases={mergedAliases} aminoAcidSeq={p?.structure?.amino_acid_seq} />
              </div>

              <a className="reta-hero__cta" href="#community">
                Join the Conversation →
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
                  </a>
                </div>
              </div>

              <div className="w-full sm:max-w-[420px] flex flex-col gap-3">
                {riskHit ? (
                  <div>
                    <MaturityPostureLabel evidenceGrade={riskHit?.risk?.evidence_grade ?? null} />
                  </div>
                ) : null}
                <AliasSequenceMini aliases={mergedAliases} aminoAcidSeq={p?.structure?.amino_acid_seq} />
              </div>
            </div>
          </>
        )}
      </div>
      <div className={isRetatrutide ? "pt-benchmark-grid" : "grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start"}>
        <div className="grid gap-6">
          {/* moved: SupportLayer -> utility zone */}
          <section className={isRetatrutide ? "pt-section pt-section--primary" : "pt-card"}>
            <ContentBlocks
              heading="Overview"
              blocks={sections?.overview ?? null}
              showEmpty
              emptyText="No overview has been added yet."
              wrapCard={false}
            />
          </section>


<section className={isRetatrutide ? "pt-section pt-section--secondary" : "pt-card"}>
            <ContentBlocks
              heading="Evidence posture"
              blocks={sections?.evidence_posture ?? null}
              showEmpty
              emptyText="No evidence posture has been added yet."
              wrapCard={false}
            />
          </section>

          <section className={isRetatrutide ? "pt-section pt-section--primary" : "pt-card"}>
            <ContentBlocks
              heading="What people discuss and why it matters"
              blocks={sections?.use_cases ?? null}
              showEmpty
              emptyText="No discussion framing has been added yet."
              wrapCard={false}
            />
          </section>

          {/* PT_SAFETY_REFRAME_V1 */}
          <section className={isRetatrutide ? "pt-section pt-section--secondary" : "pt-card"}>
            <div className="pt-card__inner">
              <h2 style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.2px", marginBottom: 10 }}>Safety & red flags</h2>

              {riskHit ? (
                <>
                  <p style={{ margin: "0 0 10px 0", opacity: 0.82, maxWidth: 760 }}>
                    This is a calm, non-alarmist snapshot of what is known, what is uncertain, and what patterns show up consistently.
                  </p>

                  <ul style={{ margin: "0 0 10px 18px", opacity: 0.9 }}>
                    {riskHit.risk.severity ? <li>Severity tends to be: <strong>{riskHit.risk.severity}</strong>.</li> : null}
                    {riskHit.risk.likelihood ? <li>Likelihood tends to be: <strong>{riskHit.risk.likelihood}</strong>.</li> : null}
                    {riskHit.risk.developmental_risk ? <li>Higher uncertainty due to novelty / developmental risk.</li> : null}
                    {riskHit.risk.unknowns_penalty ? <li>Long-term outcomes are not well established.</li> : null}

                    {(
                      !riskHit.risk.severity &&
                      !riskHit.risk.likelihood &&
                      !riskHit.risk.developmental_risk &&
                      !riskHit.risk.unknowns_penalty
                    ) ? <li>No specific red flags have been added yet.</li> : null}
                  </ul>

                  <div style={{ fontSize: 12, opacity: 0.72, marginTop: 6 }}>
                    Safety is contextual. This page doesn’t provide medical direction.
                  </div>
                </>
              ) : (
                <p style={{ margin: 0, opacity: 0.8 }}>
                  Safety posture has not been classified yet.
                </p>
              )}
            </div>
          </section>


          
          {/* PT_SAFETY_LAYER_V1 */}
          {isRetatrutide ? (
            <section className="pt-section pt-section--secondary">
              <div className="pt-card__inner">
                <h2 style={{ marginBottom: 10 }}>Safety &amp; red flags</h2>

                {riskHit ? (
                  <>
                    <div style={{ fontSize: 14, opacity: 0.92, maxWidth: 760, lineHeight: 1.55 }}>
                      <div style={{ fontWeight: 850, marginBottom: 6 }}>Safety posture</div>
                      <div>
                        {riskHit.risk.evidence_grade ? (
                          <>Based on current evidence: <span style={{ fontWeight: 800 }}>{evidenceGradeLabel(riskHit.risk.evidence_grade)}</span>.</>
                        ) : (
                          <>Evidence posture has not been classified yet.</>
                        )}
                        {(riskHit.risk.developmental_risk || riskHit.risk.unknowns_penalty) ? (
                          <> <span style={{ opacity: 0.85 }}>Uncertainty is higher due to limited long-term data.</span></>
                        ) : null}
                      </div>
                    </div>

                    <div style={{ marginTop: 14, fontSize: 14, maxWidth: 760, lineHeight: 1.55 }}>
                      <div style={{ fontWeight: 850, marginBottom: 6 }}>Red flags to keep in mind</div>
                      <ul style={{ paddingLeft: 18, margin: 0 }}>
                        {riskHit.risk.severity ? <li>Reported severity: {riskHit.risk.severity}</li> : null}
                        {riskHit.risk.likelihood ? <li>Reported likelihood: {riskHit.risk.likelihood}</li> : null}
                        {riskHit.risk.developmental_risk ? <li>Higher uncertainty due to novelty / developmental risk.</li> : null}
                        {riskHit.risk.unknowns_penalty ? <li>Long-term outcomes are not well established.</li> : null}
                        {(!riskHit.risk.severity && !riskHit.risk.likelihood && !riskHit.risk.developmental_risk && !riskHit.risk.unknowns_penalty) ? (
                          <li>No specific red flags have been added yet.</li>
                        ) : null}
                      </ul>
                    </div>

                    {Array.isArray(riskHit.safety_links) && riskHit.safety_links.length ? (
                      <div style={{ marginTop: 14, fontSize: 14, maxWidth: 760, lineHeight: 1.55 }}>
                        <div style={{ fontWeight: 850, marginBottom: 6 }}>Related safety topics</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {riskHit.safety_links.map((sid) => (
                            <a
                              key={sid}
                              href={`/safety/${sid}`}
                              style={{
                                textDecoration: "none",
                                border: "1px solid rgba(0,0,0,0.14)",
                                borderRadius: 999,
                                padding: "7px 10px",
                                fontWeight: 800,
                                fontSize: 13,
                                opacity: 0.92,
                              }}
                            >
                              {sid.replace(/_/g, " ")}
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <div style={{ fontSize: 14, opacity: 0.9, maxWidth: 760, lineHeight: 1.55 }}>
                    Safety posture has not been generated for this peptide yet.
                  </div>
                )}
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
            {isRetatrutide ? (
              <CollapsibleSection title="Evidence details" defaultCollapsedMobile>
                <EvidenceList evidence={p?.evidence ?? []} wrapCard={false} />
              </CollapsibleSection>
            ) : (
              <EvidenceList evidence={p?.evidence ?? []} wrapCard={false} />
            )}
          </section>
        </div>

        <div className={isRetatrutide ? "pt-benchmark-utility" : "grid gap-6"}>
          {supportPack ? <SupportLayerSection pack={supportPack} /> : null}
          <PDPContextualConsiderations peptideName={peptideName} />
        </div>
      </div>

      {/* NOTE: Community read is public; write requires auth. */}
      <div id="community">
        <PeptideCommentsSection slug={slug} />
      </div>
    </main>
  );
}
