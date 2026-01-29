import { requirePaid } from "@/lib/gate";

export default async function MyPepsPage() {
  await requirePaid();

  return (
    <main className="pt-page">
      <section className="pt-card">
        <h1 className="pt-card-title">My Peps</h1>
        <p className="pt-card-subtext">
          Paid area for favorites and saved stacks. Next: implement favorites + saved stacks storage.
        </p>
      </section>
    </main>
  );
}
