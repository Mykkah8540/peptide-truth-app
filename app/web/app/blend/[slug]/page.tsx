import { getRiskForBlend } from "@/lib/riskIndex";
import RiskBadge from "@/components/RiskBadge";
import SafetyLinks from "@/components/SafetyLinks";
import VialImage from "@/components/VialImage";
import ContentBlocks from "@/components/ContentBlocks";
import DisclaimerSection from "@/components/DisclaimerSection";
import EvidenceList from "@/components/EvidenceList";
import CollapsibleSection from "@/components/CollapsibleSection";
import { loadBlendBySlug, getAliasesForSlug } from "@/lib/content";
import { isPendingText } from "@/lib/isPendingText";
import { requirePaid } from "@/lib/gate";

export default async function BlendPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  await requirePaid();

  const riskHit = getRiskForBlend(slug);
  const doc = await loadBlendBySlug(slug);
  const b = doc?.blend ?? {};

  const sections = b?.sections ?? {};
  const overviewBlocks = sections?.overview ?? null;
  const safetyBlocks = sections?.safety ?? null;
  const claimsBlocks = sections?.claims ?? null;

  const pr = b?.practical ?? null;

  const isPracticalPlaceholder =
    !!pr &&
    isPendingText(pr?.bottom_line) &&
    !(
      (pr?.benefits ?? []).length ||
      (pr?.common_downsides ?? []).length ||
      (pr?.serious_red_flags ?? []).length ||
      (pr?.who_should_be_cautious ?? []).length
    );

  const mergedAliases = Array.from(
    new Set([...(Array.isArray(b?.aliases) ? b.aliases : []), ...getAliasesForSlug(slug)])
  );

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
          <CollapsibleSection title="Overview" defaultCollapsedMobile>
            <ContentBlocks
              heading="Overview"
              blocks={overviewBlocks}
              showEmpty
              emptyText="No overview has been added yet."
              wrapCard={false}
              hideHeading
            />
          </CollapsibleSection>
        </section>

      {pr ? (
        <section className="pt-card">
          <CollapsibleSection title="Practical summary" defaultCollapsedMobile>
            <p className="pt-card-subtext">
              {(() => {
                const t = String(pr?.bottom_line ?? "").trim();
                if (!t || isPracticalPlaceholder || isPendingText(t)) {
                  return "Not available yet.";
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

            {!isPracticalPlaceholder && Array.isArray(pr?.common_downsides) && pr.common_downsides.length ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-neutral-900">Common downsides</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                  {pr.common_downsides.map((x: string, i: number) => (
                    <li key={"c" + i}>{x}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {!isPracticalPlaceholder && Array.isArray(pr?.serious_red_flags) && pr.serious_red_flags.length ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-neutral-900">Rare but important symptoms to watch for</h3>
                <p className="mt-1 text-xs text-neutral-500">These are uncommon, but if they occur, stop and seek medical care.</p>
                <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                  {pr.serious_red_flags.map((x: string, i: number) => (
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
          </CollapsibleSection>
        </section>
      ) : null}

      <section className="pt-card">
        <CollapsibleSection title="What’s inside" defaultCollapsedMobile={false}>
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
        </CollapsibleSection>
      </section>

      {Array.isArray(claimsBlocks) && claimsBlocks.length ? (
        <section className="pt-card">
          <CollapsibleSection title="Claims (needs evidence)" defaultCollapsedMobile>
            <ContentBlocks heading="" blocks={claimsBlocks} showEmpty={false} wrapCard={false} />
          </CollapsibleSection>
        </section>
      ) : null}

      <section className="pt-card">
        <CollapsibleSection title="Safety and cautions" defaultCollapsedMobile>
          <ContentBlocks
            heading=""
            blocks={safetyBlocks}
            showEmpty
            emptyText="No safety notes have been added yet."
            wrapCard={false}
          />
        </CollapsibleSection>
      </section>

      {evidence.length ? (
        <section className="pt-card">
          <CollapsibleSection title="Evidence" defaultCollapsedMobile>
            <EvidenceList evidence={evidence} wrapCard={false} />
          </CollapsibleSection>
        </section>
      ) : null}

      <DisclaimerSection text={disclaimerText} />
    </main>
  );
}
