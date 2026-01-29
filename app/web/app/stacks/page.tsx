import { requirePaid } from "@/lib/gate";

export default async function StacksPage() {
  await requirePaid();

  return (
    <main className="pt-page">
      <section className="pt-card">
        <h1 className="pt-card-title">Browse stacks</h1>
        <p className="pt-card-subtext">
          Paid area for curated “top stacks by goal”. Next: define goals and render top lists.
        </p>
      </section>
    </main>
  );
}
