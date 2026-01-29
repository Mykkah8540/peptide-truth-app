export const dynamic = "force-dynamic";

export default function ResourcesPage() {
  const items = [
    {
      title: "Peptide purity, testing, and manufacturing contaminants",
      desc: "Why third-party testing matters, what ‘purity’ does (and doesn’t) mean, and the practical risks of dirty supply chains.",
    },
    {
      title: "What is a peptide, and how do peptides work?",
      desc: "A plain-English primer on what peptides are, why they’re different from typical supplements, and how people think about mechanisms.",
    },
    {
      title: "Understanding evidence grades",
      desc: "How Pep-Talk evaluates evidence quality and why confidence varies across compounds and use-cases.",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Resources</h1>
      <p className="mt-3 text-base leading-7 text-muted-foreground">
        This is the long-form education hub: foundational concepts, safety context, and practical frameworks that apply across many peptides.
      </p>

      <div className="mt-8 grid gap-4">
        {items.map((it) => (
          <div key={it.title} id={it.title.startsWith("Peptide purity") ? "purity-testing" : undefined} className="rounded-2xl border bg-card p-5">
            <div className="text-base font-semibold">{it.title}</div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{it.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm leading-6 text-muted-foreground">
        Note: These pages will be expanded and linked into relevant peptide pages (ex: purity/testing guidance) as the resource library grows.
      </p>
    </main>
  );
}
