export default function MyPepsPage() {
  return (
    <main className="pt-page">
      <section className="pt-card">
        <h1 className="pt-card-title">My Peps</h1>
        <p className="pt-card-subtext">
          My Peps is your personal workspace — a place to save peptides,
          blends, and stacks you want to revisit.
        </p>
        <p className="pt-card-subtext">
          Favorites and saved items will appear here as personalization features
          are rolled out.
        </p>
      </section>

      <section className="pt-card">
        <p className="pt-card-subtext">
          No saved items yet.
        </p>
      </section>
    </main>
  );
}
