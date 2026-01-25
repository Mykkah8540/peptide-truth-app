import { getRiskForPeptide, evidenceGradeLabel } from "@/lib/riskIndex";
import RiskBadge from "@/components/RiskBadge";
import SafetyLinks from "@/components/SafetyLinks";
import VialImage from "@/components/VialImage";
import IdentityPanel from "@/components/IdentityPanel";
import { loadPeptideBySlug, getAliasesForSlug } from "@/lib/content";

import ContentBlocks from "@/components/ContentBlocks";
import EvidenceList from "@/components/EvidenceList";
import OutlookSection from "@/components/OutlookSection";
import DisclaimerSection from "@/components/DisclaimerSection";
import InteractionsSection from "@/components/InteractionsSection";

export default async function PeptidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const riskHit = getRiskForPeptide(slug);
  const doc = await loadPeptideBySlug(slug);
  const p = doc?.peptide ?? {};
  const sections = p?.sections ?? {};

  const mergedAliases = Array.from(
    new Set([...(Array.isArray(p?.aliases) ? p.aliases : []), ...getAliasesForSlug(slug)])
  );

  // We do NOT derive "outlookText" from overview (it creates duplication + weird tone).
  const outlookText = "";

  // Keep any formal disclaimers out of the narrative flow; show them in DisclaimerSection only.
  const disclaimerText = [p?.status?.human_use_note, p?.classification?.notes].filter(Boolean).join(" ");

  const DEBUG = process.env.NEXT_PUBLIC_DEBUG_PDP === "1";

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <VialImage kind="peptide" slug={slug} alt={`${p?.canonical_name ?? slug} vial`} />
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 900, margin: 0 }}>{p?.canonical_name ?? slug}</h1>
          <p style={{ opacity: 0.75, marginTop: 6 }}>Educational resource. Not medical advice. No dosing or instructions.</p>
        </div>
      </div>

      {riskHit && (
        <div style={{ marginTop: 16 }}>
          <RiskBadge score={riskHit.risk.risk_score} tier={riskHit.risk.risk_tier ?? null} />
        </div>
      )}

      {/* Put practical summary early (what people actually want) */}
      {doc?.practical ? (
        <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold">Practical summary</h2>
          <p className="mt-2 text-sm text-neutral-700">{String(doc.practical.bottom_line || "").trim()}</p>

          {Array.isArray(doc.practical.benefits) && doc.practical.benefits.length ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-neutral-900">Common reasons people consider it</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                {doc.practical.benefits.map((b: string, i: number) => (
                  <li key={"b" + i}>{b}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {Array.isArray(doc.practical.side_effects_common) && doc.practical.side_effects_common.length ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-neutral-900">Most commonly reported downsides</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                {doc.practical.side_effects_common.map((b: string, i: number) => (
                  <li key={"c" + i}>{b}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {Array.isArray(doc.practical.side_effects_serious) && doc.practical.side_effects_serious.length ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-neutral-900">Serious red flags to know</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                {doc.practical.side_effects_serious.map((b: string, i: number) => (
                  <li key={"s" + i}>{b}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {Array.isArray(doc.practical.who_should_be_cautious) && doc.practical.who_should_be_cautious.length ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-neutral-900">Who should be cautious</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                {doc.practical.who_should_be_cautious.map((b: string, i: number) => (
                  <li key={"w" + i}>{b}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      {/* Overview should be real content blocks (not metadata leaks) */}
      <ContentBlocks heading="Overview" blocks={sections?.overview ?? null} />

      <OutlookSection
        outlookText={outlookText}
        interestBullets={sections?.current_outlook_bullets ?? null}
        blocks={sections?.use_cases ?? null}
      />

      <InteractionsSection
        drugClasses={doc?.interactions?.drug_classes}
        supplementClasses={doc?.interactions?.supplement_classes}
        peptides={doc?.interactions?.peptides}
        interactionSummaryBlocks={sections?.interaction_summary}
      />

      <IdentityPanel
        kind="peptide"
        slug={slug}
        riskScore={riskHit ? riskHit.risk.risk_score : null}
        riskTier={riskHit ? riskHit.risk.risk_tier ?? null : null}
        evidenceGradeLabel={evidenceGradeLabel(riskHit?.risk.evidence_grade ?? null)}
        canonicalName={p?.canonical_name}
        shortName={p?.short_name}
        aliases={mergedAliases}
        aminoAcidSeq={p?.structure?.amino_acid_seq}
      />

      <ContentBlocks heading="Developmental / adolescent risk" blocks={sections?.developmental_risk_block ?? null} />

      <EvidenceList evidence={p?.evidence ?? []} />

      <DisclaimerSection text={disclaimerText} />

      {DEBUG && riskHit && <SafetyLinks safetyIds={riskHit.safety_links} label="Risk references" />}
    </main>
  );
}
