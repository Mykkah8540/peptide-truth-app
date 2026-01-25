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

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <VialImage kind="blend" slug={slug} alt={`${b?.canonical_name ?? slug} vial`} />
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 900, margin: 0 }}>{b?.canonical_name ?? `Blend: ${slug}`}</h1>
          <p style={{ opacity: 0.75, marginTop: 6, marginBottom: 0 }}>
            Educational resource. Not medical advice. No dosing or instructions.
          </p>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        {riskHit ? (
          <>
<SafetyLinks safetyIds={riskHit.safety_links} />
            {riskHit.risk.computed_from_components && Array.isArray(riskHit.risk.component_slugs) ? (
              <div style={{ marginTop: 12, fontSize: 13, opacity: 0.85 }}>
                Computed from components: {riskHit.risk.component_slugs.join(", ")}
              </div>
            ) : null}
          </>
        ) : (
          <p style={{ marginTop: 14 }}>No risk data found for this blend.</p>
        )}
      </div>

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
