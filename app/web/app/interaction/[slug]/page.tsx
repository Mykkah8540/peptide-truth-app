import InteractionDetail from "@/components/InteractionDetail";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadInteractionClassesV1, loadInteractionsIndexV1, loadInteractionsToPeptidesIndexV1 } from "@/lib/content";

function pickFromDoc(doc: any, slug: string) {
  const list =
    doc?.interaction_classes ??
    doc?.classes ??
    doc?.items ??
    doc?.data ??
    doc?.interactionClasses ??
    [];
  if (!Array.isArray(list)) return null;
  return list.find((x: any) => (x?.slug ?? x?.id ?? x?.interaction_id ?? x?.key) === slug) ?? null;
}

function pickUsedBy(indexDoc: any, slug: string) {
  // We don't assume a single schema. Look for a mapping like:
  // { by_interaction_slug: { [slug]: [{slug,name}...] } } or similar.
  const candidates = [
    indexDoc?.by_interaction_slug,
    indexDoc?.byInteractionSlug,
    indexDoc?.used_by,
    indexDoc?.usedBy,
    indexDoc?.interaction_to_peptides,
    indexDoc?.interactionToPeptides,
  ].filter(Boolean);

  for (const c of candidates) {
    const arr = c?.[slug];
    if (Array.isArray(arr)) {
      return arr
        .map((x: any) => ({
          slug: (x?.slug ?? x?.peptide_slug ?? x?.id ?? "").toString().trim(),
          name: (x?.name ?? x?.title ?? x?.canonical_name ?? "").toString().trim(),
        }))
        .filter((x: any) => x.slug && x.name);
    }
  }
  return [];
}

export default function InteractionPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const classesDoc = loadInteractionClassesV1();
  const interaction = pickFromDoc(classesDoc, slug);
  if (!interaction) return notFound();
  const indexDoc = loadInteractionsIndexV1();
  const revDoc = loadInteractionsToPeptidesIndexV1();
  const usedBy = pickUsedBy(indexDoc, slug);
  const related = revDoc?.mapping?.[params.slug] || [];
  return (
    <div className="space-y-8">
      <InteractionDetail interaction={interaction} usedBy={usedBy} />

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Peptides mentioning this interaction class</h2>

        {related.length === 0 ? (
          <p className="text-sm text-muted-foreground">None yet. This section will populate as interactions are added to peptide pages.</p>
        ) : (
          <ul className="space-y-2">
            {related.map((p: any) => (
              <li key={p.peptide_slug}>
                <Link className="underline underline-offset-4" href={`/peptide/${p.peptide_slug}`}>
                  {p.peptide_name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
