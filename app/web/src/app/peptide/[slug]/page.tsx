import { getRiskForPeptide } from "@/lib/riskIndex";
import RiskBadge from "@/components/RiskBadge";
import SafetyLinks from "@/components/SafetyLinks";

export default async function PeptidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const risk = getRiskForPeptide(slug);

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Peptide: {slug}</h1>
      <p style={{ opacity: 0.75 }}>Educational resource. Not medical advice. No dosing or instructions.</p>

      {risk ? (
        <>
          <RiskBadge score={risk.risk.risk_score} />
          <SafetyLinks safetyIds={risk.safety_links} />
        </>
      ) : (
        <p style={{ marginTop: 14 }}>No risk data found for this peptide.</p>
      )}
    </main>
  );
}
