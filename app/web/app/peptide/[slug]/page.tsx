import { getRiskForPeptide, evidenceGradeLabel } from "@/lib/riskIndex";
import RiskBadge from "@/components/RiskBadge";
import SafetyLinks from "@/components/SafetyLinks";
import VialImage from "@/components/VialImage";
import IdentityPanel from "@/components/IdentityPanel";
import { loadPeptideBySlug, getAliasesForSlug, loadInteractionClassesV1 } from "@/lib/content";

import Link from "next/link";

import ContentBlocks from "@/components/ContentBlocks";
import EvidenceList from "@/components/EvidenceList";
import OutlookSection from "@/components/OutlookSection";
import DisclaimerSection from "@/components/DisclaimerSection";
import InteractionsSection from "@/components/InteractionsSection";
import type { ReactNode } from "react";

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

// PEP-TALK: interaction hub links
function uniqStrings(xs: string[]) {
  return Array.from(new Set(xs.filter(Boolean)));
}
function titleCase(s: string) {
  return (s || "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c: string) => c.toUpperCase())
    .trim();
}

export default async function PeptidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const riskHit = getRiskForPeptide(slug);
  const doc = await loadPeptideBySlug(slug);
  const p = doc?.peptide ?? {};

  const mergedAliases = Array.from(new Set([...(Array.isArray(p?.aliases) ? p.aliases : []), ...getAliasesForSlug(slug)]));
  const sections = p?.sections ?? {};

  const overviewText = sections?.overview?.[0]?.text ?? "";
  const sentences = overviewText ? splitSentences(overviewText) : [];

  const outlookText = sentences.filter((s) => classifySentence(s) === "outlook").join(" ");
  const disclaimerText = [
    sentences.filter((s) => classifySentence(s) === "disclaimer").join(" "),
    p?.status?.human_use_note,
    p?.classification?.notes,
  ]
    .filter(Boolean)
    .join(" ");

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

      <ContentBlocks heading="Overview" blocks={sections?.overview ?? null} />

      <OutlookSection
        outlookText={outlookText}
        interestBullets={sections?.current_outlook_bullets ?? null}
        blocks={sections?.use_cases ?? null}
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

        {/* Practical, real-world summary (not medical advice) */} {}
        {doc?.practical ? (
          <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">Practical summary</h2>
            <p className="mt-2 text-sm text-neutral-700">
              {String(doc.practical.bottom_line || "").trim()}
            </p>

            {Array.isArray(doc.practical.benefits) && doc.practical.benefits.length ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-neutral-900">Common reasons people consider it</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                  {doc.practical.benefits.map((b: string, i: number) => (
                    <li key={"b"+i}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {Array.isArray(doc.practical.side_effects_common) && doc.practical.side_effects_common.length ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-neutral-900">Most commonly reported downsides</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                  {doc.practical.side_effects_common.map((b: string, i: number) => (
                    <li key={"c"+i}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {Array.isArray(doc.practical.side_effects_serious) && doc.practical.side_effects_serious.length ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-neutral-900">Serious red flags to know</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                  {doc.practical.side_effects_serious.map((b: string, i: number) => (
                    <li key={"s"+i}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {Array.isArray(doc.practical.who_should_be_cautious) && doc.practical.who_should_be_cautious.length ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-neutral-900">Who should be cautious</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                  {doc.practical.who_should_be_cautious.map((b: string, i: number) => (
                    <li key={"w"+i}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}

      <InteractionsSection
        drugClasses={doc?.interactions?.drug_classes}
        supplementClasses={doc?.interactions?.supplement_classes}
        peptides={doc?.interactions?.peptides}
        interactionSummaryBlocks={sections?.interaction_summary}
      />

      {/* PEP-TALK: related interaction class pages */} 
      {(() => { 
        const idx = loadInteractionClassesV1();
        const all = [
          ...((doc?.interactions?.drug_classes ?? []) as any[]),
          ...((doc?.interactions?.supplement_classes ?? []) as any[]),
          ...((doc?.interactions?.peptides ?? []) as any[]),
        ];
        const slugs = uniqStrings(
          all
            .map((it: any) => (it?.interaction_id || it?.id || it?.slug || "").toString().trim())
            .filter(Boolean)
        );

        if (!slugs.length) return null;
          // Use registry titles when available (taxonomy is canonical)
          const classesDoc = loadInteractionClassesV1(); 
          const titleBySlug = new Map<string, string>();
          for (const c of (classesDoc?.drug_classes ?? [])) titleBySlug.set(c.slug, c.title ?? c.slug);
          for (const c of (classesDoc?.supplement_classes ?? [])) titleBySlug.set(c.slug, c.title ?? c.slug);

        return (
          <section style={{ marginTop: 16, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)" }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Related interaction classes</h2>
            <p style={{ marginTop: 8, marginBottom: 0, fontSize: 13, opacity: 0.8, lineHeight: 1.45 }}>
              These are the interaction classes referenced above. Tap to read the class overview and rationale.
            </p>

            <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {slugs.map((slug) => {
                const title = titleBySlug.get(slug) || titleCase(slug);
                return (
                  <Link
                    key={slug}
                    href={`/interaction/${slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 12px",
                      borderRadius: 999,
                      border: "1px solid rgba(0,0,0,0.10)",
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: 13,
                      fontWeight: 800,
                      background: "rgba(0,0,0,0.02)",
                    }}
                  >
                    {title} →
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })() as any} 

      {/* Interaction class links (navigation aid) */}
      {(() => {
        const classes = loadInteractionClassesV1();
        const list = [
          ...((doc?.interactions?.drug_classes ?? []) as any[]),
          ...((doc?.interactions?.supplement_classes ?? []) as any[]),
          ...((doc?.interactions?.peptides ?? []) as any[]),
        ];

        const termToSlug = new Map<string, string>();
        const all = (((classes as any)?.categories ??
          (classes as any)?.classes ??
          (classes as any)?.interaction_classes ??
          []) as any[]);
        for (const c of all) {
          const slug = String(c?.id ?? c?.slug ?? c?.category_id ?? "").trim();
          if (!slug) continue;
          const terms: string[] = [];
          for (const k of ["title", "name", "id", "slug"]) {
            const v = c?.[k];
            if (typeof v === "string" && v.trim()) terms.push(v);
          }
          for (const k of ["synonyms", "aliases", "terms", "candidate_terms", "search_terms"]) {
            const v = c?.[k];
            if (Array.isArray(v)) for (const t of v) if (typeof t === "string") terms.push(t);
          }
          for (const t of terms) {
            const key = String(t).trim().toLowerCase();
            if (key && !termToSlug.has(key)) termToSlug.set(key, slug);
          }
        }

        const slugs = new Map<string, { slug: string; label: string }>();
        for (const it of list) {
          const name = typeof it === "string" ? it : String(it?.name ?? it?.title ?? "").trim();
          if (!name) continue;
          const key = name.toLowerCase();
          const slug = termToSlug.get(key);
          if (slug) slugs.set(slug, { slug, label: name });
        }

        const links = Array.from(slugs.values());
        if (!links.length) return null;

        return (
      {}
);
      })()}

      <ContentBlocks heading="Developmental / adolescent risk" blocks={sections?.developmental_risk_block ?? null} />

      <EvidenceList evidence={p?.evidence ?? []} />

      <DisclaimerSection text={disclaimerText} />

      {riskHit && <SafetyLinks safetyIds={riskHit.safety_links} label="Risk references" />}
    </main>
  );
}
