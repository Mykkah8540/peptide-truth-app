import { getRiskForBlend } from "@/lib/riskIndex";
import RiskBadge from "@/components/RiskBadge";
import SafetyLinks from "@/components/SafetyLinks";

export default async function BlendPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const risk = getRiskForBlend(slug);

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Blend: {slug}</h1>
      <p style={{ opacity: 0.75 }}>Educational resource. Not medical advice. No dosing or instructions.</p>

      {risk ? (
        <>
          <RiskBadge score={risk.risk.risk_score} />
          <SafetyLinks safetyIds={risk.safety_links} />
          {risk.risk.computed_from_components && Array.isArray(risk.risk.component_slugs) ? (
            <div style={{ marginTop: 14, fontSize: 13, opacity: 0.8 }}>
              Computed from components: {risk.risk.component_slugs.join(", ")}
            </div>
          ) : null}
        </>
      ) : (
        <p style={{ marginTop: 14 }}>No risk data found for this blend.</p>
      )}
    </main>
  );
}
