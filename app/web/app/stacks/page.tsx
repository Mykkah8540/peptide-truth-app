import BackHomeLink from "@/components/BackHomeLink";

function ProPill() {
  return (
    <span
      aria-label="Pro"
      title="Pro"
      style={{
        marginLeft: 10,
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid rgba(0,0,0,0.18)",
        borderRadius: 999,
        padding: "2px 8px",
        fontSize: 10,
        fontWeight: 900,
        letterSpacing: 0.9,
        lineHeight: 1,
        opacity: 0.92,
      }}
    >
      PRO
    </span>
  );
}

export default function StacksPage() {
  return (
    <main className="pt-page">
      <section className="pt-card">
        <div style={{ marginBottom: 10 }}>
          <BackHomeLink />
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <h1 className="pt-card-title" style={{ margin: 0 }}>
            Browse Stacks
          </h1>
          <ProPill />
        </div>

        <p className="pt-card-subtext" style={{ marginTop: 10 }}>
          Stacks are curated combinations of peptides built around specific goals — such as recovery, metabolic health, or cognitive support.
        </p>
        <p className="pt-card-subtext">
          These are educational groupings meant to show how compounds are commonly discussed together, not instructions for use.
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
