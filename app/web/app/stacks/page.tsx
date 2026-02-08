import Link from "next/link";
import BackHomeLink from "@/components/BackHomeLink";
import { listStacks } from "@/lib/content";
import { requirePaid } from "@/lib/gate";

function ProPill() {
  return (
    <span
      aria-label="Pro"
      title="Pro"
      style={{
        marginLeft: 10,
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid rgba(0,0,0,0.16)",
        borderRadius: 999,
        padding: "2px 6px",
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 0.7,
        lineHeight: 1,
        background: "rgba(255,255,255,0.9)",
        color: "rgba(0,0,0,0.88)",
        whiteSpace: "nowrap",
      }}
    >
      PRO
    </span>
  );
}

export default async function StacksPage() {
  await requirePaid();

  const stacks = listStacks();

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
          Stacks are curated combinations built around a goal — a fast way to explore common pairings and ideas.
        </p>
        </section>

      <section className="pt-card">
        {stacks.length ? (
          <div className="pt-stack">
            {stacks.map((s) => (
              <Link
                key={s.slug}
                href={`/stack/${s.slug}`}
                className="pt-item"
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <div style={{ fontSize: 14, fontWeight: 900 }}>{s.title}</div>
                <div className="pt-item-note" style={{ marginTop: 6 }}>
                  Explore stack →
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="pt-card-subtext">No curated stacks published yet.</p>
        )}

        <div style={{ marginTop: 14 }}>
          <Link href="/stack-builder" style={{ textDecoration: "none", fontWeight: 900 }}>
            Build a stack →
          </Link>
        </div>
        <div style={{ marginTop: 10 }}>
          <Link href="/stack/suggest" style={{ textDecoration: "none", fontWeight: 900 }}>
            Suggest a stack →
          </Link>
        </div>
      </section>
    </main>
  );
}
