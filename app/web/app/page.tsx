import { getSponsors } from "@/lib/sponsors";
import SponsorBanner from "@/components/SponsorBanner";

export default function Home() {
  const sponsors = getSponsors();
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <div style={{ display: "grid", gap: 14 }}>
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
          </div>

          <section style={{ marginTop: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 0.6, textTransform: "uppercase", color: "#555" }}>
              Pro features
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
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
                Blends (Pro)
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
                Browse Stacks (Pro)
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
                Browse Categories (Pro)
              </a>

              <a
                href="/my-peps"
                style={{
                  border: "1px solid #e5e5e5",
                  padding: "10px 12px",
                  borderRadius: 12,
                  fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                My Peps (Pro)
              </a>
            </div>

            <p style={{ marginTop: 10, color: "#666", fontSize: 13, lineHeight: 1.5 }}>
              Educational content remains free. Pro unlocks discovery tools and personal organization.
            </p>
          </section>

            <div style={{ marginTop: 14 }}>
              <SponsorBanner sponsors={sponsors} rotateMs={3000} />
              </div>
              </div>
      </main>
    </div>
  );
}
