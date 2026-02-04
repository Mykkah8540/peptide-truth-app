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

export default function CategoriesPage() {
  return (
    <main className="pt-page">
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <BackHomeLink />
      </div>

      <section className="pt-card">
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <h1 className="pt-card-title" style={{ margin: 0 }}>
            Browse Categories
          </h1>
          <ProPill />
        </div>

        <p className="pt-card-subtext" style={{ marginTop: 10 }}>
          Categories organize peptides by shared context — such as risk considerations, interaction patterns, or physiological systems —
          to help you explore the database more intelligently than browsing one compound at a time.
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
