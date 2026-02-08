import { readFileSync } from "node:fs";
import path from "node:path";

function repoRoot(): string {
  return path.resolve(process.cwd(), "..", "..");
}

export default async function SafetyPage({ params }: { params: Promise<{ safetyId: string }> }) {
  const { safetyId } = await params;

  const root = repoRoot();
  const fp = path.join(root, "content", "safety", `${safetyId}.md`);

  let md = "";
  try {
    md = readFileSync(fp, "utf-8");
  } catch {
    md = "";
  }

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Safety: {safetyId}</h1>
      <p style={{ opacity: 0.75 }}></p>

      {md ? (
        <pre style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{md}</pre>
      ) : (
        <p style={{ marginTop: 14 }}>Safety markdown not found for this safety_id.</p>
      )}
    </main>
  );
}
