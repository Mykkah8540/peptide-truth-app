import { getRiskForPeptide } from "@/lib/riskIndex";
import RiskBadge from "@/components/RiskBadge";
import SafetyLinks from "@/components/SafetyLinks";
import VialImage from "@/components/VialImage";
import IdentityPanel from "@/components/IdentityPanel";
import { loadPeptideBySlug } from "@/lib/content";
import ContentBlocks from "@/components/ContentBlocks";
import EvidenceList from "@/components/EvidenceList";
import OutlookSection from "@/components/OutlookSection";
import DisclaimerSection from "@/components/DisclaimerSection";
import InteractionsSection from "@/components/InteractionsSection";

function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function classifySentence(s: string): "outlook" | "disclaimer" {
  const t = s.toLowerCase();
  const disclaimerKeywords = [
    "animal",
    "preclinical",
    "limited",
    "not definitive",
    "not approved",
    "unapproved",
    "regulator",
    "fda",
    "anti-doping",
    "uncertainty",
    "unknown",
  ];
  return disclaimerKeywords.some((k) => t.includes(k)) ? "disclaimer" : "outlook";
}

export default async function PeptidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const riskHit = getRiskForPeptide(slug);
  const doc = loadPeptideBySlug(slug);
  const p = doc?.peptide ?? {};
  const sections = p?.sections ?? {};

  const overviewText = sections?.overview?.[0]?.text ?? "";
  const sentences = overviewText ? splitSentences(overviewText) : [];

  const outlookText = sentences.filter(s => classifySentence(s) === "outlook").join(" ");
  const disclaimerText = [
    sentences.filter(s => classifySentence(s) === "disclaimer").join(" "),
    p?.status?.human_use_note,
    p?.classification?.notes
  ].filter(Boolean).join(" ");

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <VialImage kind="peptide" slug={slug} alt={`${p?.canonical_name ?? slug} vial`} />
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 900, margin: 0 }}>
            {p?.canonical_name ?? slug}
          </h1>
          <p style={{ opacity: 0.75, marginTop: 6 }}>
            Educational resource. Not medical advice. No dosing or instructions.
          </p>
        </div>
      </div>

      {riskHit && <div style={{ marginTop: 16 }}><RiskBadge score={riskHit.risk.risk_score} /></div>}

      <ContentBlocks heading="Overview" blocks={sections?.overview ?? null} />

      <OutlookSection
        outlookText={outlookText}
        interestBullets={sections?.current_outlook_bullets ?? null}
        blocks={sections?.use_cases ?? null}
      />

      <IdentityPanel
        canonicalName={p?.canonical_name}
        shortName={p?.short_name}
        aliases={p?.aliases}
        aminoAcidSeq={p?.structure?.amino_acid_seq}
      />

      <InteractionsSection
        drugClasses={p?.interactions?.drug_classes}
        supplementClasses={p?.interactions?.supplement_classes}
        peptides={p?.interactions?.peptides}
        interactionSummaryBlocks={sections?.interaction_summary}
      />

      <ContentBlocks heading="Developmental / adolescent risk" blocks={sections?.developmental_risk_block ?? null} />

      <EvidenceList evidence={p?.evidence ?? []} />

      <DisclaimerSection text={disclaimerText} />

      {riskHit && <SafetyLinks safetyIds={riskHit.safety_links} label="Risk references" />}
    </main>
  );
}
