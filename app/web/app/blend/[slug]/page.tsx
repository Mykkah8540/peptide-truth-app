import { getRiskForBlend, evidenceGradeLabel } from "@/lib/riskIndex";
import RiskBadge from "@/components/RiskBadge";
import SafetyLinks from "@/components/SafetyLinks";
import VialImage from "@/components/VialImage";
import IdentityPanel from "@/components/IdentityPanel";
import ContentBlocks from "@/components/ContentBlocks";
import DisclaimerSection from "@/components/DisclaimerSection";
import EvidenceList from "@/components/EvidenceList";
import { loadBlendBySlug, getAliasesForSlug } from "@/lib/content";

export default async function BlendPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const riskHit = getRiskForBlend(slug);
  const doc = await loadBlendBySlug(slug);
  const b = doc?.blend ?? {};

  const sections = b?.sections ?? {};
  const overviewBlocks = sections?.overview ?? null;
  const safetyBlocks = sections?.safety ?? null;
  const claimsBlocks = sections?.claims ?? null;

  const pr = b?.practical ?? null;

  function isCurationPendingText(v: any): boolean {
    const s = String(v ?? "").toLowerCase();
    return s.includes("pep-talk curation pending");
  }

  const isPracticalPlaceholder =
    !!pr &&
    isCurationPendingText(pr?.bottom_line) &&
    !(
      (pr?.benefits ?? []).length ||
      (pr?.side_effects_common ?? []).length ||
      (pr?.side_effects_serious ?? []).length ||
      (pr?.who_should_be_cautious ?? []).length
    );

  const mergedAliases = Array.from(
    new Set([...(Array.isArray(b?.aliases) ? b.aliases : []), ...getAliasesForSlug(slug)])
  );

  // Some blends may store evidence differently; render if present.
  const evidence = Array.isArray(b?.evidence) ? b.evidence : [];

  const disclaimerText =
    typeof b?.disclaimer?.text === "string" && b.disclaimer.text.trim()
      ? b.disclaimer.text.trim()
      : "Educational resource. No protocols, dosing, or instructions are provided.";

  const DEBUG = process.env.NEXT_PUBLIC_DEBUG_PDP === "1";


  return (
    <main className="pt-page">
      <div className="pt-hero">
        <VialImage kind="blend" slug={slug} alt={`${b?.display_name ?? slug} vial`} />
        <div>
          <h1>{b?.display_name ?? b?.canonical_name ?? `Blend: ${slug}`}</h1>
          <p className="pt-card-subtext" style={{ marginBottom: 0 }}>
            Educational only. No protocols, dosing, or instructions.
          </p>
        </div>
      </div>

      {riskHit ? (
        <div style={{ marginTop: 16 }}>
          <RiskBadge score={riskHit.risk.risk_score} tier={riskHit.risk.risk_tier ?? null} />

          {riskHit.risk.computed_from_components && Array.isArray(riskHit.risk.component_slugs) ? (
            <div className="pt-card-subtext" style={{ marginTop: 10 }}>
              Computed from components: {riskHit.risk.component_slugs.join(", ")}
            </div>
          ) : null}

          {DEBUG ? (
            <div style={{ marginTop: 10 }}>
              <SafetyLinks safetyIds={riskHit.safety_links} />
            </div>
          ) : null}
        </div>
      ) : (
        <p style={{ marginTop: 14 }}>No risk data found for this blend.</p>
      )}

      {/* ORDER (blend v1):
          Overview
          Practical summary (if present)
          What's inside (components)
          Claims (if present)
          Safety / cautions
          Identity
          Evidence
          Disclaimer
      */}

      <section className="pt-card">
        <ContentBlocks
          heading="Overview"
          blocks={overviewBlocks}
          showEmpty
          emptyText="No overview has been added yet."
        />
      </section>

      {pr ? (
        <section className="pt-card">
          <h2 className="pt-card-title">Practical summary</h2>

          <p className="pt-card-subtext">
            {(() => {
              const t = String(pr?.bottom_line ?? "").trim();
              if (!t || isPracticalPlaceholder || isCurationPendingText(t)) {
                return "Pep-Talk curation pending. This section will be populated with practical, real-world use patterns, common downsides, and red flags as evidence is reviewed.";
              }
              return t;
            })()}
          </p>

          {!isPracticalPlaceholder && Array.isArray(pr?.benefits) && pr.benefits.length ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-neutral-900">Why people use it</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                {pr.benefits.map((x: string, i: number) => (
                  <li key={"b" + i}>{x}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {!isPracticalPlaceholder && Array.isArray(pr?.side_effects_common) && pr.side_effects_common.length ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-neutral-900">Common downsides</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                {pr.side_effects_common.map((x: string, i: number) => (
                  <li key={"c" + i}>{x}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {!isPracticalPlaceholder && Array.isArray(pr?.side_effects_serious) && pr.side_effects_serious.length ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-neutral-900">Rare but important symptoms to watch for</h3>
              <p className="mt-1 text-xs text-neutral-500">These are uncommon, but if they occur, stop and seek medical care.</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                {pr.side_effects_serious.map((x: string, i: number) => (
                  <li key={"s" + i}>{x}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {!isPracticalPlaceholder && Array.isArray(pr?.who_should_be_cautious) && pr.who_should_be_cautious.length ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-neutral-900">Who should be cautious</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                {pr.who_should_be_cautious.map((x: string, i: number) => (
                  <li key={"w" + i}>{x}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="pt-card">
        <h2 className="pt-card-title">What’s inside</h2>

        {Array.isArray(b?.components) && b.components.length ? (
          <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
            {b.components.map((c: string) => (
              <li key={c}>
                <a className="underline" href={`/peptide/${c}`}>
                  {c}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="pt-card-subtext">No components listed.</p>
        )}

        {Array.isArray(b?.components_unresolved) && b.components_unresolved.length ? (
          <div className="mt-3">
            <p className="pt-card-subtext">Unresolved components: {b.components_unresolved.join(", ")}</p>
          </div>
        ) : null}
      </section>

      {Array.isArray(claimsBlocks) && claimsBlocks.length ? (
        <section className="pt-card">
          <ContentBlocks heading="Claims (needs evidence)" blocks={claimsBlocks} showEmpty={false} />
        </section>
      ) : null}

      <section className="pt-card">
        <ContentBlocks
          heading="Safety and cautions"
          blocks={safetyBlocks}
          showEmpty
          emptyText="No safety notes have been added yet."
        />
      </section>

      <section className="pt-card">
        <IdentityPanel
          kind="blend"
          slug={slug}
          riskScore={riskHit ? riskHit.risk.risk_score : null}
          riskTier={riskHit ? riskHit.risk.risk_tier ?? null : null}
          evidenceGradeLabel={evidenceGradeLabel(riskHit?.risk.evidence_grade ?? null)}
          canonicalName={b?.canonical_name ?? null}
          shortName={b?.short_name ?? null}
          aliases={mergedAliases}
          aminoAcidSeq={null}
          molecularFormula={null}
          molecularWeight={null}
        />
      </section>

      {evidence.length ? (
        <section className="pt-card">
          <EvidenceList evidence={evidence} />
        </section>
      ) : null}

      <section className="pt-card">
        <DisclaimerSection text={disclaimerText} />
      </section>
    </main>
  );
}
