import BackHomeLink from "@/components/BackHomeLink";

export default function UpgradePage() {
  return (
    <main className="pt-page">
      <section className="pt-card">
        <BackHomeLink />

        <h1 className="pt-card-title" style={{ marginTop: 12 }}>
          Pro feature
        </h1>

        <p className="pt-card-subtext">
          This area is part of Pep-Talk Pro.
        </p>

        <p className="pt-card-subtext" style={{ marginTop: 12 }}>
          Educational peptide information is always free. Pro unlocks discovery, organization, and synthesis tools — like blends,
          stacks, categories, and saved items — designed for deeper research and comparison.
        </p>

        <p className="pt-card-subtext" style={{ marginTop: 12 }}>
          No protocols. No dosing. Education first.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
          <a
            href="/peptides"
            style={{
              border: "1px solid #e5e5e5",
              padding: "10px 12px",
              borderRadius: 12,
              fontWeight: 900,
              textDecoration: "none",
              background: "#fff",
            }}
          >
            Browse Peptides (Free)
          </a>

          <a
            href="/resources"
            style={{
              border: "1px solid #e5e5e5",
              padding: "10px 12px",
              borderRadius: 12,
              fontWeight: 900,
              textDecoration: "none",
              background: "#fff",
            }}
          >
            Resources (Free)
          </a>
        </div>

        <p className="pt-card-subtext" style={{ marginTop: 16 }}>
          If you believe you’re seeing this in error, please contact support.
        </p>
      </section>
    </main>
  );
}
