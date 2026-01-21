import { listPeptides, listBlends, listTopics } from "@/lib/content";
import HomeSearch from "@/components/HomeSearch";

export default function Home() {
  const peptides = listPeptides();
  const blends = listBlends();
  const topics = listTopics();

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <div style={{ display: "grid", gap: 12 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.4 }}>Pep-Talk</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a href="/peptides" style={{ border: "1px solid #e5e5e5", padding: "10px 12px", borderRadius: 12, fontWeight: 800, textDecoration: "none" }}>Browse Peptides</a>
            <a href="/blends" style={{ border: "1px solid #e5e5e5", padding: "10px 12px", borderRadius: 12, fontWeight: 800, textDecoration: "none" }}>Browse Stacks / Blends</a>
            <a href="/topics" style={{ border: "1px solid #e5e5e5", padding: "10px 12px", borderRadius: 12, fontWeight: 800, textDecoration: "none" }}>Browse Topics</a>
            <a href="/stack-builder" style={{ border: "1px solid #e5e5e5", padding: "10px 12px", borderRadius: 12, fontWeight: 800, textDecoration: "none" }}>Stack Builder</a>
          </div>

          <div style={{ marginTop: 8 }}>
            <HomeSearch peptides={peptides} blends={blends} topics={topics} />
          </div>
        </div>
      </main>
    </div>
  );
}
