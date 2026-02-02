import { getRiskForPeptide } from "@/lib/riskIndex";
import RiskBadge from "@/components/RiskBadge";
import SafetyLinks from "@/components/SafetyLinks";
import VialImage from "@/components/VialImage";
import AliasSequenceMini from "@/components/AliasSequenceMini";
import { loadPeptideBySlug, getAliasesForSlug } from "@/lib/content";

import ContentBlocks from "@/components/ContentBlocks";
import EvidenceList from "@/components/EvidenceList";
import OutlookSection from "@/components/OutlookSection";
import DisclaimerSection from "@/components/DisclaimerSection";
import InteractionsSection from "@/components/InteractionsSection";
import FavoriteButton from "@/components/FavoriteButton";
import CollapsibleSection from "@/components/CollapsibleSection";

export default async function PeptidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const riskHit = getRiskForPeptide(slug);
  const doc = await loadPeptideBySlug(slug);
  const p = doc?.peptide ?? {};
  const sections = p?.sections ?? {};

  const mergedAliases = Array.from(
    new Set([...(Array.isArray(p?.aliases) ? p.aliases : []), ...getAliasesForSlug(slug)])
  );

  const pr = doc?.practical ?? null;

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

  // We do NOT derive "outlookText" from overview (it creates duplication + weird tone).
  const outlookText = "";

  // Keep any formal disclaimers out of the narrative flow; show them in DisclaimerSection only.
  function isPendingText(s?: string | null): boolean {
    const t = String(s ?? "").trim();
    if (!t) return false;
    const low = t.toLowerCase();
    return (
      low.includes("pep-talk curation pending") ||
      low.includes("we’re reviewing the evidence") ||
      low.includes("we're reviewing the evidence") ||
      low.includes("will expand this section soon")
    );
  }

  function uniqSentences(text: string): string {
    const parts = String(text || "")
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const seen = new Set<string>();
    const out: string[] = [];
    for (const s of parts) {
      const key = s.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(s);
    }
    return out.join(" ");
  }

  const disclaimerTextRaw = [p?.status?.human_use_note, p?.classification?.notes].filter(Boolean).join(" ");
  const disclaimerText = uniqSentences(disclaimerTextRaw.split(/\s+/).join(" "));
  const disclaimerTextClean = disclaimerText;

  const DEBUG = process.env.NEXT_PUBLIC_DEBUG_PDP === "1";

  return (
    <main className="pt-page">
      <div className="pt-hero">
        <VialImage kind="peptide" slug={slug} alt={`${p?.canonical_name ?? slug} vial`} />
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1>{p?.canonical_name ?? slug}</h1>
            <p>Educational resource. Not medical advice. No dosing or instructions.</p>
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
      </div>

      {/* ORDER (as prescribed):
          Overview
          Current outlook and intended use
          Practical summary
          Interactions
          Developmental / adolescent risk
          Identity
          Evidence
          Disclaimer
      */}

      <section className="pt-card">
          <CollapsibleSection title="Overview" defaultCollapsedMobile>
            <ContentBlocks
              heading="Overview"
              blocks={sections?.overview ?? null}
              showEmpty
              emptyText="No overview has been added yet."
              wrapCard={false}
              hideHeading
            />
          </CollapsibleSection>
        </section>

      <section className="pt-card">
          <CollapsibleSection title="Current outlook and intended use" defaultCollapsedMobile>
            <OutlookSection
              outlookText={outlookText}
              interestBullets={sections?.current_outlook_bullets ?? null}
              blocks={sections?.use_cases ?? null}
              wrapCard={false}
              hideTitle
            />
          </CollapsibleSection>
        </section>

      {doc?.practical ? (
        <section className="pt-card">
          <CollapsibleSection title="Practical summary" defaultCollapsedMobile={false}>
            <p className="pt-card-subtext">
              {(() => {
                const t = String(doc.practical.bottom_line || "").trim();
                if (!t) {
                  return "A quick, real-world orientation: why people use it, what they report, what to watch for, and how to avoid the most common avoidable mistakes (quality/testing + use context).";
                }
                return t;
              })()}
            </p>

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
                <h3 className="text-sm font-semibold text-neutral-900">Rare but important symptoms to watch for</h3>
                <p className="mt-1 text-xs text-neutral-500">These are uncommon, but if they occur, stop and seek medical care.</p>
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
          </CollapsibleSection>
        </section>
      ) : null}

      <section className="pt-card">
        <CollapsibleSection title="Interactions" defaultCollapsedMobile>
          <InteractionsSection
              hideHeading
            drugClasses={doc?.interactions?.drug_classes}
            supplementClasses={doc?.interactions?.supplement_classes}
            peptides={doc?.interactions?.peptides}
            interactionSummaryBlocks={sections?.interaction_summary}
          />
        </CollapsibleSection>
      </section>

      <section className="pt-card">
        <CollapsibleSection title="Developmental / adolescent risk" defaultCollapsedMobile>
          <ContentBlocks
            heading=""
            blocks={sections?.developmental_risk_block ?? null}
            showEmpty
            emptyText="No developmental/adolescent risk notes have been added yet."
            wrapCard={false}
          />
        </CollapsibleSection>
      </section>
        <section className="pt-card">
        <CollapsibleSection title="Evidence" defaultCollapsedMobile>
          <EvidenceList evidence={p?.evidence ?? []} wrapCard={false} />
        </CollapsibleSection>
      </section>

      <DisclaimerSection text={disclaimerTextClean} />

      {DEBUG && riskHit ? <SafetyLinks safetyIds={riskHit.safety_links} label="Risk references" /> : null}
    </main>
  );
}
