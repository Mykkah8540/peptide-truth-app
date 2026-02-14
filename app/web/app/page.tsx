import { getSponsors } from "@/lib/sponsors";
import { requirePaid } from "@/lib/gate";
import Link from "next/link";
import DisclaimerSection from "@/components/DisclaimerSection";
import SponsorBanner from "@/components/SponsorBanner";

async function isPaid(): Promise<boolean> {
  try {
    await requirePaid();
    return true;
  } catch {
    return false;
  }
}

function ProPill() {
  return (
    <span
      aria-label="Pro"
      title="Pro"
      style={{
        marginLeft: 8,
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

function HomeLink(props: { href: string; label: string; pro?: boolean; subtext: string }) {
  const { href, label, pro, subtext } = props;

  return (
    <a
      href={href}
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        background: "#fff",
        padding: "12px 12px",
        borderRadius: 14,
        fontWeight: 900,
        textDecoration: "none",
        display: "grid",
        gap: 4,
      }}
    >
      <div style={{ display: "inline-flex", alignItems: "center" }}>
        <span>{label}</span>
        {pro ? <ProPill /> : null}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#666", lineHeight: 1.35 }}>{subtext}</div>
    </a>
  );
}

function SectionTitle({ k }: { k: string }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 0.6, textTransform: "uppercase", color: "#555" }}>
      {k}
    </div>
  );
}

export default async function Home() {
  const sponsors = await getSponsors();
  const paid = await isPaid();

  const proHref = (href: string) => (paid ? href : `/upgrade?next=${encodeURIComponent(href)}`);

  const disclaimer =
    "Pep-Talk is an educational resource. It is not medical advice, diagnosis, or treatment. Always use your judgment and consult a qualified clinician for personal medical decisions.";

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-3xl px-4 py-10" style={{ display: "grid", gap: 14 }}>
        <section className="pt-card" style={{ padding: 18 }}>
          <h1 style={{ fontSize: 30, fontWeight: 950, letterSpacing: -0.6, margin: 0 }}>Pep-Talk</h1>

          <p style={{ margin: "10px 0 0", color: "#555", fontSize: 14, lineHeight: 1.55, fontWeight: 700 }}>
            Your source of truth for peptides — clear, practical, and built for real-world decision-making.
          </p>

          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 950, letterSpacing: -0.2 }}>Know what it is. Know how it works. Decide confidently.</div>
            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.55 }}>
              People are already using regulated and unregulated peptides. Pep-Talk exists so you can understand what you’re looking at — without hype, fear,
              or gatekeeping.
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 4 }}>
              <Link
                href="/peptides"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 44,
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "#111",
                  color: "#fff",
                  fontWeight: 950,
                  textDecoration: "none",
                }}
              >
                Browse Peptides
              </Link>

              <Link
                href="/blends"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 44,
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "#fff",
                  color: "#111",
                  fontWeight: 950,
                  textDecoration: "none",
                }}
              >
                Commercial Blends
              </Link>
            </div>

            <div style={{ marginTop: 2 }}>
              <Link href="/resources" style={{ fontSize: 13, fontWeight: 900, textDecoration: "none", color: "#111", opacity: 0.9 }}>
                New here? Start with Resources →
              </Link>
            </div>
          </div>
        </section>

        {sponsors.length ? (
          <div>
            <SponsorBanner sponsors={sponsors} rotateMs={3200} />
            <div style={{ marginTop: 8, fontSize: 12, color: "#666", lineHeight: 1.45 }}>
              Sponsored placements support Pep-Talk. Sponsors do not control or edit educational content.
            </div>
          </div>
        ) : null}

        <section className="pt-card" style={{ padding: 18 }}>
          <SectionTitle k="How to use Pep-Talk" />
          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            <div className="pt-item" style={{ padding: 14 }}>
              <div className="pt-item-title">1) Find what you’re considering</div>
              <div className="pt-item-note">Search in the top bar, or browse peptides and blends.</div>
            </div>
            <div className="pt-item" style={{ padding: 14 }}>
              <div className="pt-item-title">2) Understand outcomes + context</div>
              <div className="pt-item-note">Learn what it does, why people use it, what to watch for, and how it shows up in the real world.</div>
            </div>
            <div className="pt-item" style={{ padding: 14 }}>
              <div className="pt-item-title">3) Compare combinations</div>
              <div className="pt-item-note">Use stacks to see how peptides are commonly grouped and discussed by goal.</div>
            </div>
          </div>
        </section>

        <section className="pt-card" style={{ padding: 18 }}>
          <SectionTitle k="Explore (Free)" />
          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            <HomeLink href="/peptides" label="Peptides" subtext="Compound profiles with clear explanations and practical context." />
            <HomeLink href="/blends" label="Commercial Blends" subtext="Branded combinations, what’s inside, and how they’re positioned." />
            <HomeLink href="/resources" label="Resources" subtext="Definitions, guides, and platform context." />
          </div>
        </section>

        <section className="pt-card" style={{ padding: 18 }}>
          <SectionTitle k="Pro (Monthly)" />
          <div style={{ marginTop: 10, fontSize: 13, color: "#666", lineHeight: 1.55 }}>
            Pro is for people who want deeper guided discovery, comparison tools, and creation workflows.
          </div>

          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            <HomeLink href={proHref("/categories")} label="Wellness Paths" pro subtext="Topic-driven discovery that connects peptides, blends, and goals." />
            <HomeLink href={proHref("/stack-builder")} label="Stack Builder" pro subtext="Explore combinations and build your own stacks." />
            <HomeLink href={proHref("/stacks")} label="Explore Stacks" pro subtext="Browse Pep-Talk curated stacks and UGC stacks." />
            <HomeLink href={proHref("/my-peps")} label="My Peps" pro subtext="Favorite peptides, blends, and stacks for quick recall." />
          </div>

          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            <div className="pt-item" style={{ padding: 14 }}>
              <div className="pt-item-title">Community Insights (Pro)</div>
              <div className="pt-item-note">A gated layer that summarizes what the community discusses most consistently.</div>
            </div>
            <div className="pt-item" style={{ padding: 14 }}>
              <div className="pt-item-title">UGC Stacks + Blends</div>
              <div className="pt-item-note">Pro users can build and submit UGC blends/stacks for review and publication.</div>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <Link
              href="/upgrade"
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                height: 44,
                width: "100%",
                borderRadius: 14,
                border: "1px solid rgba(0,0,0,0.12)",
                background: "#111",
                color: "#fff",
                fontWeight: 950,
                textDecoration: "none",
              }}
            >
              See Pro
            </Link>
            <div style={{ marginTop: 10, fontSize: 12, color: "#666", lineHeight: 1.45 }}>
              No free trial. Pro is built for ongoing discovery and iteration — not one-time extraction.
            </div>
          </div>
        </section>

        <section className="pt-card" style={{ padding: 18 }}>
          <SectionTitle k="The Community" />
          <div style={{ marginTop: 10, fontSize: 13, color: "#666", lineHeight: 1.55 }}>
            Pep-Talk combines structured education with real-world discussion. Free users can comment after creating an account. Pro members unlock community
            insight summaries and submission workflows.
          </div>
          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            <Link
              href="/resources#community"
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                height: 44,
                borderRadius: 14,
                border: "1px solid rgba(0,0,0,0.12)",
                background: "#fff",
                color: "#111",
                fontWeight: 950,
                textDecoration: "none",
              }}
            >
              How the Community Works →
            </Link>
          </div>
        </section>

        <DisclaimerSection text={disclaimer} />
      </main>
    </div>
  );
}
