import Link from "next/link";
import BackHomeLink from "@/components/BackHomeLink";
import { listStacks } from "@/lib/content";
import { requirePaid } from "@/lib/gate";

export const dynamic = "force-dynamic";

export default async function StacksPage() {
  await requirePaid();

  const stacks = listStacks();

  return (
    <main className="pt-stacks">

      {/* ── Hero ── */}
      <div className="pt-stacks__hero">
        <div className="pt-stacks__hero-inner">
          <div className="pt-stacks__hero-back">
            <BackHomeLink />
          </div>
          <p className="pt-stacks__hero-eyebrow">Community Protocols</p>
          <h1 className="pt-stacks__hero-title">Browse Stacks</h1>
          <p className="pt-stacks__hero-sub">
            Curated multi-compound protocols built around specific goals. Each stack explains the
            rationale, the compounds, and the cautions — so you can evaluate it, not just copy it.
          </p>
          <div className="pt-stacks__hero-actions">
            <Link href="/stack-builder" className="pt-stacks__hero-cta">
              Build your own stack &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="pt-stacks__body">

        {stacks.length > 0 ? (
          <div className="pt-stacks__grid">
            {stacks.map((s) => (
              <Link key={s.slug} href={`/stack/${s.slug}`} className="pt-stacks__card">
                <div className="pt-stacks__card-inner">
                  <div className="pt-stacks__card-title">{s.title}</div>
                  <div className="pt-stacks__card-arrow">Explore stack &rarr;</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="pt-stacks__empty">
            <p>No curated stacks published yet.</p>
            <Link href="/stack-builder" className="pt-stacks__empty-link">
              Build your own in the Stack Builder &rarr;
            </Link>
          </div>
        )}

        <div className="pt-stacks__suggest-note">
          Built a stack worth sharing?{" "}
          <Link href="/stack/suggest" className="pt-stacks__suggest-link">
            Suggest it for the community
          </Link>{" "}
          — if it&rsquo;s well-reasoned, it may appear here.
        </div>

      </div>
    </main>
  );
}
