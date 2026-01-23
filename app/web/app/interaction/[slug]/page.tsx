import Link from "next/link";
import { notFound } from "next/navigation";
import { loadInteractionClassesV1, loadInteractionsToPeptidesIndexV1 } from "@/lib/content";

export default function InteractionPage({ params }: { params: { slug: string } }) {
  const slug = (params?.slug || "").toString().trim();
  if (!slug) return notFound();

  const classesDoc = loadInteractionClassesV1();
  const rev = loadInteractionsToPeptidesIndexV1();

  const drug = (classesDoc?.drug_classes ?? []).find((c) => c.slug === slug) ?? null;
  const supp = (classesDoc?.supplement_classes ?? []).find((c) => c.slug === slug) ?? null;

  const klass = drug ?? supp;
  if (!klass) return notFound();

  const categoryLabel = drug ? "Medication class" : "Supplement class";

  const usedBy = (rev?.mapping?.[slug] ?? []).slice();
  usedBy.sort((a, b) => (a.peptide_name || "").localeCompare(b.peptide_name || ""));

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <section className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
        <div className="text-xs font-extrabold opacity-70">{categoryLabel}</div>
        <h1 className="mt-1 text-xl font-black tracking-tight">{klass.title}</h1>

        <p className="mt-3 text-sm leading-relaxed opacity-80">
          Interaction classes are <strong>context tags</strong> used to highlight where extra caution,
          medication-review, or clinical judgment may be relevant. This is <strong>not</strong> medical advice.
        </p>

        {(klass.aka?.length ?? 0) > 0 ? (
          <div className="mt-4">
            <div className="text-xs font-extrabold opacity-70">Also called</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {klass.aka!.map((t) => (
                <span key={t} className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-bold">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {klass.notes ? (
          <div className="mt-4">
            <div className="text-xs font-extrabold opacity-70">Notes</div>
            <div className="mt-2 text-sm leading-relaxed">{klass.notes}</div>
          </div>
        ) : null}
      </section>

      <section className="mt-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-base font-black">Peptides tagged with this class</h2>
          <div className="text-xs font-extrabold opacity-70">{usedBy.length} total</div>
        </div>

        {usedBy.length ? (
          <div className="mt-3 grid gap-2">
            {usedBy.map((p) => (
              <Link
                key={p.peptide_slug}
                href={`/peptide/${p.peptide_slug}`}
                className="rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3 no-underline"
              >
                <div className="text-sm font-black">{p.peptide_name}</div>
                <div className="text-xs opacity-70">{p.peptide_slug}</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-3 rounded-2xl border border-black/10 bg-black/[0.02] p-4 text-sm opacity-80">
            No peptides are currently mapped to this class in the reverse index.
          </div>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-base font-black">Browse</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link className="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-bold no-underline" href="/interactions">
            All interaction classes →
          </Link>
          <Link className="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-bold no-underline" href="/peptides">
            All peptides →
          </Link>
        </div>
      </section>
    </main>
  );
}
