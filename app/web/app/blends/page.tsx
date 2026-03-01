import Link from "next/link";
import BackHomeLink from "@/components/BackHomeLink";
import { listBlends } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function BlendsPage() {
  const all = listBlends();

  return (
    <main className="pt-page">

      {/* ── Header card ── */}
      <section className="pt-card">
        <div style={{ marginBottom: 10 }}>
          <BackHomeLink />
        </div>
        <h1 className="pt-card-title">Commercial Blends</h1>
        <p className="pt-card-subtext" style={{ marginTop: 8 }}>
          Pre-assembled peptide products sold by suppliers — not user-built stacks.
          Each page explains why the combination exists, what the synergy is, and
          where the fixed ratios may or may not fit your specific goal.
        </p>
        <div className="pt-blend-list__note">
          <span className="pt-blend-list__note-label">Keep in mind:</span> A
          commercial blend is optimized for general use — not personalized for you.
          If you need different ratios or a custom combination,{" "}
          <Link href="/stack-builder" style={{ fontWeight: 800, color: "inherit" }}>
            the Stack Builder
          </Link>{" "}
          is where to start.
        </div>
      </section>

      {/* ── Blend list ── */}
      <section className="pt-card">
        <div className="pt-blend-list__grid">
          {all.map((b) => {
            const href = b.route || `/blend/${b.slug}`;
            const componentCount = Array.isArray((b as any).components)
              ? (b as any).components.length
              : null;
            const intentLabel: string = (b as any).intent_label ?? "";

            return (
              <Link key={b.slug} href={href} className="pt-blend-list__item">
                <div className="pt-blend-list__item-hd">
                  <span className="pt-blend-list__item-name">{b.name}</span>
                  {componentCount !== null && (
                    <span className="pt-blend-list__item-count">
                      {componentCount}{" "}
                      {componentCount === 1 ? "compound" : "compounds"}
                    </span>
                  )}
                </div>
                {intentLabel && (
                  <div className="pt-blend-list__item-tag">{intentLabel}</div>
                )}
                <div className="pt-blend-list__item-arrow">Explore blend →</div>
              </Link>
            );
          })}
        </div>
      </section>

    </main>
  );
}
