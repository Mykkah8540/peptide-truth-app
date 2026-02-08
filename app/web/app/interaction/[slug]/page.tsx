import { notFound } from "next/navigation";
import { loadInteractionsIndexV1 } from "@/lib/content";
import { requirePaid } from "@/lib/gate";

export const dynamic = "force-dynamic";

type PageProps = {
 params: Promise<{ slug: string }>;
};

export default async function InteractionPage({ params }: PageProps) {
 const { slug: raw } = await params;
 const slug = (raw || "").toString().trim();
 if (!slug) return notFound();

 const idx = loadInteractionsIndexV1();
 const groups = (idx as any)?.by_drug_class_name || {};
 const peptides = groups[slug] || null;
 if (!peptides) return notFound();
return (
  <main className="mx-auto w-full max-w-3xl px-4 py-10">
   <h1 className="text-3xl font-semibold tracking-tight">{slug}</h1>

   <p className="mt-4 text-base leading-7 text-muted-foreground">
    This page groups peptides associated with this interaction class. It is a practical way to explore where this class shows up across the database.
   </p>

   <div className="mt-6 rounded-2xl border bg-card p-5">
    <div className="text-sm font-medium">Peptides in this class</div>
    <ul className="mt-2 list-disc pl-5 text-sm leading-6 text-muted-foreground">
     {(peptides as any[]).map((x: any) => (
      <li key={String(x)}>
       <a className="underline" href={`/peptide/${String(x)}`}>{String(x)}</a>
      </li>
     ))}
    </ul>
   </div>
  </main>
 );
}
