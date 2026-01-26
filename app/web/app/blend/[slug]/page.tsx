import { getRiskForBlend, evidenceGradeLabel } from "@/lib/riskIndex";
import RiskBadge from "@/components/RiskBadge";
import SafetyLinks from "@/components/SafetyLinks";
import VialImage from "@/components/VialImage";
import IdentityPanel from "@/components/IdentityPanel";
import { loadBlendBySlug, getAliasesForSlug } from "@/lib/content";
import EvidenceList from "@/components/EvidenceList";

export default async function BlendPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const riskHit = getRiskForBlend(slug);
    const doc = await loadBlendBySlug(slug);
  const b = doc?.blend ?? {};

  

  const mergedAliases = Array.from(new Set([...(Array.isArray(b?.aliases) ? b.aliases : []), ...getAliasesForSlug(slug)]));
// Some blends may store evidence differently; render if present.
  const evidence = Array.isArray(b?.evidence) ? b.evidence : [];

  const DEBUG = process.env.NEXT_PUBLIC_DEBUG_PDP === "1";

  return (
    <main className="pt-page">
      <div className="pt-hero">
        <VialImage kind="blend" slug={slug} alt={`${b?.canonical_name ?? slug} vial`} />
        <div>
          <h1>{b?.canonical_name ?? `Blend: ${slug}`}</h1>
          <p style={{ marginBottom: 0 }}>
            Educational resource. Not medical advice. No dosing or instructions.
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

          {DEBUG ? <div style={{ marginTop: 10 }}><SafetyLinks safetyIds={riskHit.safety_links} /></div> : null}
        </div>
      ) : (
        <p style={{ marginTop: 14 }}>No risk data found for this blend.</p>
      )}

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

      {evidence.length ? <EvidenceList evidence={evidence} /> : null}
    </main>
  );
}
