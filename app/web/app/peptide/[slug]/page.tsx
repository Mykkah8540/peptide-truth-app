import { getRiskForPeptide } from "@/lib/riskIndex";
import RiskBadge from "@/components/RiskBadge";
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
                {riskHit ? (
                  <RiskBadge score={riskHit.risk.risk_score} tier={riskHit.risk.risk_tier ?? null} />
                ) : null}
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
                    <RiskBadge score={riskHit.risk.risk_score} tier={riskHit.risk.risk_tier ?? null} />
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
