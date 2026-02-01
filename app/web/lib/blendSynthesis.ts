type PracticalV1 = {
  bottom_line?: string;
  benefits?: string[];
  side_effects_common?: string[];
  side_effects_serious?: string[];
  who_should_be_cautious?: string[];
};

function s(v: any): string {
  return typeof v === "string" ? v.trim() : "";
}

function arr(v: any): string[] {
  return Array.isArray(v) ? v.map((x) => s(x)).filter(Boolean) : [];
}

function uniq(xs: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const x of xs) {
    const k = x.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(x);
  }
  return out;
}

function cap(xs: string[], n: number): string[] {
  return xs.slice(0, Math.max(0, n));
}

function isPendingText(v: any): boolean {
  const x = String(v ?? "").trim().toLowerCase();
  if (!x) return false;
  return (
    x.includes("pep-talk curation pending") ||
    x.includes("we’re reviewing the evidence") ||
    x.includes("we're reviewing the evidence") ||
    x.includes("will expand this section soon")
  );
}

// Extract “topic_*” ids, but keep as human-ish labels (you can later map these properly if you want).
function topicLabelsFromPeptideDoc(p: any): string[] {
  const t = p?.topics?.primary;
  const ids = Array.isArray(t) ? t : [];
  return ids
    .map((id: any) => String(id || "").trim())
    .filter(Boolean)
    .map((id: string) =>
      id
        .replace(/^topic_/, "")
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (m) => m.toUpperCase())
    );
}

function displayNameFromPeptide(p: any, slug: string): string {
  return s(p?.display_name) || s(p?.canonical_name) || slug;
}

function practicalFromPeptideDoc(p: any): PracticalV1 | null {
  const pr = p?.practical;
  if (!pr || typeof pr !== "object") return null;
  const bottom = s(pr?.bottom_line);
  // If bottom line is pending and everything else is empty, treat as missing.
  const benefits = arr(pr?.benefits);
  const cautious = arr(pr?.who_should_be_cautious);
  const serious = arr(pr?.side_effects_serious);
  const common = arr(pr?.side_effects_common);
  const hasAny = !!bottom || benefits.length || cautious.length || serious.length || common.length;
  if (!hasAny) return null;
  return {
    bottom_line: bottom,
    benefits,
    who_should_be_cautious: cautious,
    side_effects_serious: serious,
    side_effects_common: common,
  };
}

// Blend “overview blocks” format used by ContentBlocks is {title?, text?}. Your peptide overview uses {heading, body}.
// We synthesize blocks in the ContentBlocks format so it renders cleanly.
export async function synthesizeBlendFromComponents(args: {
  blendSlug: string;
  components: string[];
  loadPeptideBySlug: (slug: string) => Promise<any | null>;
}): Promise<{
  overviewBlocks: { title?: string; text?: string }[] | null;
  claimsBlocks: { title?: string; text?: string }[] | null;
  safetyBlocks: { title?: string; text?: string }[] | null;
  practical: PracticalV1 | null;
}> {
  const { components, loadPeptideBySlug } = args;

  const peptideDocs: { slug: string; p: any }[] = [];
  for (const c of components) {
    const doc = await loadPeptideBySlug(c);
    const p = doc?.peptide && typeof doc.peptide === "object" ? doc.peptide : doc;
    if (p) peptideDocs.push({ slug: c, p });
  }

  const names = peptideDocs.map(({ slug, p }) => displayNameFromPeptide(p, slug));
  const topicsAll = uniq(peptideDocs.flatMap(({ p }) => topicLabelsFromPeptideDoc(p)));

  // Pull practical blocks (best-quality inputs), but we will not claim synergy.
  const prs = peptideDocs
    .map(({ p }) => practicalFromPeptideDoc(p))
    .filter(Boolean) as PracticalV1[];

  const bottomLines = prs
    .map((pr) => s(pr.bottom_line))
    .filter(Boolean)
    .filter((t) => !isPendingText(t));

  const benefitPool = uniq(prs.flatMap((pr) => arr(pr.benefits)));
  const cautiousPool = uniq(prs.flatMap((pr) => arr(pr.who_should_be_cautious)));
  const seriousPool = uniq(prs.flatMap((pr) => arr(pr.side_effects_serious)));

  // --- Synthesized Overview (blend-first rationale) ---
  const why = (() => {
    const base =
      names.length >= 2
        ? `This blend pairs ${names.join(" + ")} because they’re commonly grouped in real-world use discussions where people want broader coverage than a single compound.`
        : `This blend groups component peptides that are commonly discussed together in real-world use contexts.`;

    const theme = topicsAll.length ? `Most often discussed in contexts like: ${cap(topicsAll, 4).join(", ")}.` : "";

    const limits =
      "Human evidence for blends is usually limited. Treat this as an educational summary of why the combination is popular, not proof of compounded benefit.";

    const risk =
      "The biggest real-world risk is sourcing/identity (mislabeling, contamination) and the added uncertainty that comes from stacking multiple compounds.";

    return [base, theme, limits, risk].filter(Boolean).join(" ");
  })();

  const componentRoles = (() => {
    // Use each peptide’s bottom line as its “role” without inventing anything.
    const lines: string[] = [];
    for (const { slug, p } of peptideDocs) {
      const pr = practicalFromPeptideDoc(p);
      const bl = pr ? s(pr.bottom_line) : "";
      if (bl && !isPendingText(bl)) {
        lines.push(`${displayNameFromPeptide(p, slug)}: ${bl}`);
      }
    }
    if (!lines.length) return null;
    return lines;
  })();

  const overviewBlocks: { title?: string; text?: string }[] = [
    { title: "Why this blend exists", text: why },
  ];

  if (componentRoles?.length) {
    overviewBlocks.push({
      title: "What each component contributes",
      text: componentRoles.slice(0, 4).join("\n\n"),
    });
  }

  // --- Synthesized Practical (blend-level, conservative) ---
  const practical: PracticalV1 | null = (() => {
    // If we have no high-quality inputs, return null (page will show empty state).
    const hasAny = bottomLines.length || benefitPool.length || cautiousPool.length || seriousPool.length;
    if (!hasAny) return null;

    const bottom =
      bottomLines.length
        ? `Why people choose it: ${bottomLines[0]}`
        : `This blend is discussed as a convenience combination; evidence quality varies and sourcing matters.`;

    return {
      bottom_line: bottom,
      benefits: cap(benefitPool, 8),
      who_should_be_cautious: cap(cautiousPool, 8),
      side_effects_serious: cap(seriousPool, 6),
      side_effects_common: [], // optional later if you want
    };
  })();

  // Claims + Safety blocks:
  // We’ll keep claims null (avoid speculative “claims”) and put cautions in safetyBlocks.
  const safetyBlocks =
    cautiousPool.length || seriousPool.length
      ? [
          {
            title: "Cautions that matter most",
            text:
              [
                ...cap(cautiousPool, 8).map((x) => `• ${x}`),
                ...(seriousPool.length ? ["", "Rare but serious symptoms to watch for:", ...cap(seriousPool, 6).map((x) => `• ${x}`)] : []),
                "",
                "Blend note: stacking increases uncertainty. When possible, evaluate one component at a time before combining.",
              ].join("\n"),
          },
        ]
      : null;

  return {
    overviewBlocks: overviewBlocks.length ? overviewBlocks : null,
    claimsBlocks: null,
    safetyBlocks,
    practical,
  };
}
