import BackHomeLink from "@/components/BackHomeLink";

export default function StacksPage() {
  return (
    <main className="pt-page">
      <section className="pt-card">
        <div style={{ marginBottom: 10 }}>
          <BackHomeLink />
        </div>

        <h1 className="pt-card-title">Browse Stacks</h1>

        <p className="pt-card-subtext">
          Stacks are curated combinations of peptides built around specific goals —
          such as recovery, metabolic health, or cognitive support.
        </p>
        <p className="pt-card-subtext">
          These are educational groupings meant to show how compounds are commonly
          discussed together, not instructions for use.
        </p>
      </section>

      <section className="pt-card">
        <p className="pt-card-subtext">
          Curated stacks will appear here as they are reviewed and published.
        </p>
      </section>
    </main>
  );
}
