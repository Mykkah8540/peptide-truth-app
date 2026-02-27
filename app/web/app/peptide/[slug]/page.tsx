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
import PDPTabs from "@/components/PDPTabs";
import BodyClass from "@/components/BodyClass";

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
      {isRetatrutide ? (
        /* RETA_HERO_V2_GLASS — full-width gradient container with 3-column inner grid */
        <div className="reta-hero-v2">
          <div className="reta-hero-v2__inner">
            {/* Column 1: Vial */}
            <div className="reta-hero-v2__vial">
              <VialImage kind="peptide" slug={slug} alt={`${peptideName} vial`} size={190} />
            </div>

            {/* Column 2: Title + Frame + Quick jumps */}
            <div className="reta-hero-v2__main">
              {/* Mobile: small vial inline with title */}
              <div className="reta-hero-v2__title-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="reta-hero-v2__vial-sm"
                  src="/vials/peptide/retatrutide-sm.png"
                  alt=""
                  aria-hidden="true"
                  width={70}
                  height={105}
                />
                <h1 className="reta-hero-v2__title">{peptideName}</h1>
              </div>
              <p className="reta-hero-v2__frame">
                What it is, why people care, what to watch for, and what&apos;s still uncertain — presented calmly and with explicit uncertainty where evidence is thin.
              </p>
              <nav className="reta-hero-v2__jumps">
                <span className="reta-hero-v2__jumps-label">Quick jumps:</span>
                <a className="reta-hero-v2__jump" href="#evidence">Evidence</a>
                <a className="reta-hero-v2__jump" href="#safety">Safety</a>
                <a className="reta-hero-v2__jump" href="#interactions">Interactions</a>
                <a className="reta-hero-v2__jump" href="#community">Community</a>
              </nav>
            </div>

            {/* Column 3: Single posture glass card */}
            <div className="reta-hero-v2__rail">
              <div className="reta-glass-card">
                {statusLabel ? (
                  <div className="reta-glass-card__row">
                    <span className="reta-glass-card__label">Status</span>
                    <span className="reta-glass-card__chip">{statusLabel}</span>
                  </div>
                ) : null}
                {topicLabel ? (
                  <div className="reta-glass-card__row">
                    <span className="reta-glass-card__label">Context</span>
                    <span className="reta-glass-card__chip">{topicLabel}</span>
                  </div>
                ) : null}
                <div className="reta-glass-card__body">
                  <div className="reta-glass-card__evidence">{evidenceLabel}.</div>
                  <p className="reta-glass-card__disclaimer">
                    This page is a descriptive overview — it does not provide protocols or personalized instruction.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 2: Consider banner — spans cols 1-2, extends under vial */}
            <a className="reta-hero-v2__consider-btn" href="#considerations">
              <span className="reta-hero-v2__consider-main">For your situation</span>
              <span className="reta-hero-v2__consider-sub">Thyroid, SSRIs, autoimmune, older adults&hellip;</span>
              <span className="reta-hero-v2__consider-arrow">→</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="pt-hero">
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
              <nav className="pt-hero-jumps">
                <a className="pt-hero-jump" href="#evidence">Evidence</a>
                <a className="pt-hero-jump" href="#interactions">Interactions</a>
                <a className="pt-hero-jump" href="#considerations">For your situation</a>
                <a className="pt-hero-jump" href="#community">Community</a>
              </nav>
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
        </div>
      )}

      {/* ── BODY ── */}
      {isRetatrutide && <BodyClass className="reta-page" />}
      {isRetatrutide ? (
        <div className="reta-body-tabs">
          {/* Start Here strip — full width, above tabs */}
          <div className="reta-start-strip">
            <h2 className="reta-start-strip__heading">Start here</h2>
            <ul className="reta-start-strip__list">
              <li>Investigational incretin drug being studied for weight and metabolic outcomes.</li>
              <li>What matters most: real effects vs. tolerability, and what long-term data still hasn&apos;t been proven.</li>
              <li>How to use this page: pick a tab, skim what&apos;s open, expand when you want detail.</li>
            </ul>
          </div>

          <PDPTabs tabs={[
            {
              id: "overview",
              label: "Overview",
              content: (
                <>
                  <section className="reta-g-card">
                    <div className="reta-overview-heading">
                      <h2>Overview</h2>
                    </div>
                    <ContentBlocks
                      heading="Overview"
                      hideHeading
                      blocks={sections?.overview ?? null}
                      showEmpty
                      emptyText="No overview has been added yet."
                      wrapCard={false}
                    />
                  </section>
                  <section className="reta-g-card reta-g-card--discuss">
                    <ContentBlocks
                      heading="What people discuss and why it matters"
                      blocks={sections?.use_cases ?? null}
                      showEmpty
                      emptyText="No discussion framing has been added yet."
                      wrapCard={false}
                    />
                  </section>
                </>
              ),
            },
            {
              id: "evidence",
              label: "Evidence",
              content: (
                <section className="reta-g-card">
                  <div style={{ display: "grid", gap: 10 }}>
                    <div>
                      <h2 style={{ margin: 0 }}>Evidence</h2>
                      <p style={{ marginTop: 8, marginBottom: 0, fontSize: 13, lineHeight: 1.55, opacity: 0.78, maxWidth: 760 }}>
                        This is a living snapshot of what&apos;s been studied, what&apos;s been observed, and what remains unclear — without hype framing. Expand &ldquo;Deep dive&rdquo; for the full structure and nuance.
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
                        <CollapsibleSection title="What&apos;s missing" defaultCollapsedMobile defaultCollapsed titleClassName="pt-collapse-title--nested">
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
              ),
            },
            ...(hasSafetyFlags ? [{
              id: "safety",
              label: "Safety",
              content: (
                <section className="reta-g-card">
                  <div className="pt-safety__head">
                    <h2 className="pt-safety__title">Safety</h2>
                    <p className="pt-safety__sub">
                      Calm context — what&apos;s known, what&apos;s uncertain, and when to pause. Not a score.
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
                        If you&apos;re seeing strong side effects or something feels &ldquo;off,&rdquo; that&apos;s a signal to slow down and reassess.
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
                        <li>If you can&apos;t keep fluids/food down, or you&apos;re getting persistently lightheaded.</li>
                        <li>If you notice severe, persistent abdominal pain, confusion, chest pain, or fainting.</li>
                        <li>If something feels meaningfully &ldquo;off&rdquo; compared with your normal baseline.</li>
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
              ),
            }] : []),
            {
              id: "interactions",
              label: "Interactions",
              content: (
                <section className="reta-g-card">
                  <InteractionsSection
                    hideHeading={false}
                    drugClasses={doc?.interactions?.drug_classes}
                    supplementClasses={doc?.interactions?.supplement_classes}
                    peptides={doc?.interactions?.peptides}
                    interactionSummaryBlocks={sections?.interaction_summary}
                  />
                </section>
              ),
            },
            {
              id: "considerations",
              label: "For You",
              content: (
                <>
                  <section className="reta-g-card">
                    <PDPContextualConsiderations peptideName={peptideName} noWrap />
                  </section>
                  {supportPack ? <SupportLayerSection pack={supportPack} /> : null}
                </>
              ),
            },
            {
              id: "community",
              label: "Community",
              content: null,
            },
          ]} />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Left / main column */}
          <div className="grid gap-6">
            <section className="pt-card">
              <ContentBlocks
                heading="Overview"
                blocks={sections?.overview ?? null}
                showEmpty
                emptyText="No overview has been added yet."
                wrapCard={false}
              />
            </section>
            <a className="pt-mid-cta" href="#community">
              Join the conversation →
              <span className="pt-mid-cta__sub">Real-world notes from people who&apos;ve tried it</span>
            </a>
            <section className="pt-card">
              <ContentBlocks
                heading="What people discuss and why it matters"
                blocks={sections?.use_cases ?? null}
                showEmpty
                emptyText="No discussion framing has been added yet."
                wrapCard={false}
              />
            </section>
            <section id="evidence" className="pt-card">
              <div style={{ display: "grid", gap: 10 }}>
                <div>
                  <h2 style={{ margin: 0 }}>Evidence</h2>
                  <p style={{ marginTop: 8, marginBottom: 0, fontSize: 13, lineHeight: 1.55, opacity: 0.78, maxWidth: 760 }}>
                    This is a living snapshot of what&apos;s been studied, what&apos;s been observed, and what remains unclear — without hype framing. Expand &ldquo;Deep dive&rdquo; for the full structure and nuance.
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
                    <CollapsibleSection title="What&apos;s missing" defaultCollapsedMobile defaultCollapsed titleClassName="pt-collapse-title--nested">
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
            <section id="interactions" className="pt-card">
              <InteractionsSection
                hideHeading={false}
                drugClasses={doc?.interactions?.drug_classes}
                supplementClasses={doc?.interactions?.supplement_classes}
                peptides={doc?.interactions?.peptides}
                interactionSummaryBlocks={sections?.interaction_summary}
              />
            </section>
            <section id="considerations" className="pt-card">
              <PDPContextualConsiderations peptideName={peptideName} noWrap={false} />
            </section>
          </div>
          {/* Right column */}
          <div className="grid gap-6">
            {supportPack ? <SupportLayerSection pack={supportPack} /> : null}
          </div>
        </div>
      )}

      {/* NOTE: Community read is public; write requires auth. */}
      <div className={isRetatrutide ? "reta-community" : ""}>
        <PeptideCommentsSection slug={slug} />
      </div>
    </main>
  );
}
