export default function CategoriesPage() {
  return (
    <main className="pt-page">
      <section className="pt-card">
        <h1 className="pt-card-title">Browse Categories</h1>
        <p className="pt-card-subtext">
          Categories organize peptides by shared context — such as risk considerations,
          interaction patterns, or physiological systems — to help you explore the database
          more intelligently than browsing one compound at a time.
        </p>
        <p className="pt-card-subtext">
          This view is designed for discovery and comparison, not protocols or dosing.
        </p>
      </section>

      <section className="pt-card">
        <p className="pt-card-subtext">
          Category browsing will expand here as curation continues.
        </p>
      </section>
    </main>
  );
}
