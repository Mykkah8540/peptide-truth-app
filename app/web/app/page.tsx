export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <div style={{ display: "grid", gap: 12 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.4 }}>Pep-Talk</h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a
              href="/peptides"
              style={{
                border: "1px solid #e5e5e5",
                padding: "10px 12px",
                borderRadius: 12,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Browse Peptides
            </a>

            <a
              href="/resources"
              style={{
                border: "1px solid #e5e5e5",
                padding: "10px 12px",
                borderRadius: 12,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Resources
            </a>

            <a
              href="/blends"
              style={{
                border: "1px solid #e5e5e5",
                padding: "10px 12px",
                borderRadius: 12,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Blends <span style={{ fontSize: 12, opacity: 0.6 }}>(Pro)</span>
            </a>

            <a
              href="/stacks"
              style={{
                border: "1px solid #e5e5e5",
                padding: "10px 12px",
                borderRadius: 12,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Browse Stacks <span style={{ fontSize: 12, opacity: 0.6 }}>(Pro)</span>
            </a>

            <a
              href="/categories"
              style={{
                border: "1px solid #e5e5e5",
                padding: "10px 12px",
                borderRadius: 12,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Browse Categories <span style={{ fontSize: 12, opacity: 0.6 }}>(Pro)</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
