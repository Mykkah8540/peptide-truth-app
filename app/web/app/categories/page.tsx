import { requirePaid } from "@/lib/gate";

export default async function CategoriesPage() {
  await requirePaid();

  return (
    <main className="pt-page">
      <section className="pt-card">
        <h1 className="pt-card-title">Browse categories</h1>
        <p className="pt-card-subtext">
          Paid area for taxonomy browsing. Next: category groups + filtered entity lists.
        </p>
      </section>
    </main>
  );
}
