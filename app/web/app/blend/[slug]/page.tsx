import Link from "next/link";
import { getRiskForBlend } from "@/lib/riskIndex";
import RiskBadge from "@/components/RiskBadge";
import VialImage from "@/components/VialImage";
import EvidenceList from "@/components/EvidenceList";
import CollapsibleSection from "@/components/CollapsibleSection";
import UgcNotesSection from "@/components/UgcNotesSection";
import { loadBlendBySlug, loadPeptideBySlug, getAliasesForSlug } from "@/lib/content";
import { isPendingText } from "@/lib/isPendingText";

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */

function notPending(v: any): boolean {
  const t = String(v ?? "").trim();
  return !!t && !isPendingText(t);
}

function pickPractical(authored: any) {
  if (!authored || typeof authored !== "object") return null;
  const bottom = String(authored?.bottom_line ?? "").trim();
  if (
    isPendingText(bottom) &&
    !(
      (authored?.benefits ?? []).length ||
      (authored?.common_downsides ?? []).length ||
      (authored?.serious_red_flags ?? []).length ||
      (authored?.who_should_be_cautious ?? []).length
    )
  )
    return null;
  return authored;
}

async function resolveComponentNames(
  components: string[],
  loader: (s: string) => Promise<any | null>
): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const slug of components) {
    const doc = await loader(slug);
    const p = doc?.peptide ?? doc;
    const name =
      String(p?.display_name ?? p?.canonical_name ?? "").trim() ||
      slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join("-");
    out[slug] = name;
  }
  return out;
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */

export default async function BlendPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const riskHit = getRiskForBlend(slug);
  const doc = await loadBlendBySlug(slug);
  const b = doc?.blend ?? {};

  const components: string[] = Array.isArray(b?.components) ? b.components : [];
  const componentRoles: Record<string, string> = b?.component_roles ?? {};
  const isSingleCompound = b?.is_single_compound === true;
  const intentLabel: string = b?.intent_label ?? "";
  const rationale: string = b?.rationale ?? "";
  const synergyNote: string = b?.synergy_note ?? "";
  const whoItsFor: string = b?.who_its_for ?? "";

  const displayNames = await resolveComponentNames(components, loadPeptideBySlug);

  const pr = pickPractical(b?.practical);
  const evidence = Array.isArray(b?.evidence) ? b.evidence : [];

  const mergedAliases = Array.from(
    new Set([
      ...(Array.isArray(b?.aliases) ? b.aliases : []),
      ...getAliasesForSlug(slug),
    ])
  );

  const displayName = b?.display_name ?? b?.canonical_name ?? `Blend: ${slug}`;

  return (
    <main className="pt-page">

      {/* ── Hero ── */}
      <div className="pt-hero">
        <VialImage kind="blend" slug={slug} alt={`${displayName} vial`} />
        <div>
          <h1>{displayName}</h1>
          {intentLabel && (
            <div className="pt-blend__intent-tag">{intentLabel}</div>
          )}
          {mergedAliases.length > 0 && (
            <div className="pt-card-subtext" style={{ marginTop: 6 }}>
              Also known as: {mergedAliases.join(", ")}
            </div>
          )}
        </div>
      </div>

      {/* Risk badge */}
      {riskHit && (
        <div style={{ marginTop: 12 }}>
          <RiskBadge
            score={riskHit.risk.risk_score}
            tier={riskHit.risk.risk_tier ?? null}
          />
        </div>
      )}

      {/* ── Why this blend exists ── */}
      {notPending(rationale) && (
        <section className="pt-card pt-blend__rationale-card">
          <h2 className="pt-blend__section-heading">
            {isSingleCompound ? "What this product is" : "Why this blend exists"}
          </h2>
          <p className="pt-blend__rationale-text">{rationale}</p>
          {notPending(whoItsFor) && (
            <div className="pt-blend__who">
              <span className="pt-blend__who-label">Who reaches for it:</span>{" "}
              <span className="pt-blend__who-text">{whoItsFor}</span>
            </div>
          )}
        </section>
      )}

      {/* ── What's inside ── */}
      <section className="pt-card">
        <h2 className="pt-blend__section-heading">What&rsquo;s inside</h2>
        {components.length ? (
          <div className="pt-blend__components">
            {components.map((c) => {
              const role = componentRoles[c];
              const name = displayNames[c] ?? c;
              return (
                <div key={c} className="pt-blend__component">
                  <div className="pt-blend__component-hd">
                    <Link href={`/peptide/${c}`} className="pt-blend__component-name">
                      {name}
                    </Link>
                    <Link
                      href={`/peptide/${c}`}
                      className="pt-blend__component-view"
                    >
                      View profile →
                    </Link>
                  </div>
                  {role && <p className="pt-blend__component-role">{role}</p>}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="pt-card-subtext">No components listed.</p>
        )}
        {Array.isArray(b?.components_unresolved) &&
          b.components_unresolved.length > 0 && (
            <p
              className="pt-card-subtext"
              style={{ marginTop: 10, opacity: 0.55 }}
            >
              Not in our index yet: {b.components_unresolved.join(", ")}
            </p>
          )}
      </section>

      {/* ── The synergy ── */}
      {!isSingleCompound && notPending(synergyNote) && (
        <section className="pt-card pt-blend__synergy-card">
          <h2 className="pt-blend__section-heading">The synergy</h2>
          <p className="pt-blend__synergy-text">{synergyNote}</p>
        </section>
      )}

      {/* ── Optimized, not optimal ── */}
      <section className="pt-card pt-blend__limit-card">
        <div className="pt-blend__limit-inner">
          <div className="pt-blend__limit-body">
            <div className="pt-blend__limit-heading">
              {isSingleCompound
                ? "One compound, one fixed profile"
                : "Optimized — but not optimal for everyone"}
            </div>
            <p className="pt-blend__limit-text">
              {isSingleCompound
                ? "This is a commercially branded single compound. The profile is fixed. If you want to combine this with other peptides at specific ratios, the Stack Builder is where to build that."
                : "This blend ships at fixed ratios — convenient, but ratios aren't universal. Depending on your goal, you may need more of one compound, less of another, or a different combination entirely. Think of this as a well-designed starting point, not a personalized protocol."}
            </p>
          </div>
          <Link href="/stack-builder" className="pt-blend__limit-cta">
            Build a custom stack &rarr;
          </Link>
        </div>
      </section>

      {/* ── Practical summary ── */}
      {pr && (
        <section className="pt-card">
          <CollapsibleSection title="Practical summary" defaultCollapsedMobile>
            {notPending(pr?.bottom_line) && (
              <p className="pt-card-subtext">{pr.bottom_line}</p>
            )}
            {Array.isArray(pr?.benefits) && pr.benefits.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-neutral-900">
                  Why people use it
                </h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                  {pr.benefits.map((x: string, i: number) => (
                    <li key={"b" + i}>{x}</li>
                  ))}
                </ul>
              </div>
            )}
            {Array.isArray(pr?.common_downsides) &&
              pr.common_downsides.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    Common downsides
                  </h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                    {pr.common_downsides.map((x: string, i: number) => (
                      <li key={"c" + i}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}
            {Array.isArray(pr?.serious_red_flags) &&
              pr.serious_red_flags.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    Rare but important symptoms to watch for
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">
                    These are uncommon, but if they occur, stop and seek medical
                    care.
                  </p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                    {pr.serious_red_flags.map((x: string, i: number) => (
                      <li key={"s" + i}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}
            {Array.isArray(pr?.who_should_be_cautious) &&
              pr.who_should_be_cautious.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    Who should be cautious
                  </h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                    {pr.who_should_be_cautious.map((x: string, i: number) => (
                      <li key={"w" + i}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}
          </CollapsibleSection>
        </section>
      )}

      {/* ── Evidence ── */}
      {evidence.length > 0 && (
        <section className="pt-card">
          <CollapsibleSection title="Evidence" defaultCollapsedMobile>
            <EvidenceList evidence={evidence} wrapCard={false} />
          </CollapsibleSection>
        </section>
      )}

      {/* ── Community ── */}
      <UgcNotesSection type="blend" slug={slug} />

    </main>
  );
}
