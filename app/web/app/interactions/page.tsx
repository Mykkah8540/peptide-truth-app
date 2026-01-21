import Link from "next/link";
import { loadInteractionClassesV1 } from "@/lib/content";

export default function InteractionsHubPage() {
  const doc = loadInteractionClassesV1();

  const drug = doc?.drug_classes ?? [];
  const supp = doc?.supplement_classes ?? [];

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 950, margin: 0 }}>Interactions</h1>
      <p style={{ marginTop: 10, fontSize: 14, opacity: 0.8, lineHeight: 1.5 }}>
        Educational map of interaction risk concepts across medication classes, supplement classes, and other peptides.
        This does not provide medical advice or dosing.
      </p>

      <div style={{ marginTop: 16, padding: 14, borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)", background: "rgba(0,0,0,0.02)" }}>
        <div style={{ fontWeight: 900, fontSize: 14 }}>Safety reference</div>
        <div style={{ marginTop: 6, fontSize: 13, opacity: 0.85 }}>
          Read the safety overview:{" "}
          <Link href="/safety/safety_interactions" style={{ fontWeight: 800, textDecoration: "none" }}>
            Interactions: Drugs, Supplements, and Peptides
          </Link>
        </div>
      </div>

      <section style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0 }}>Medication classes</h2>
        <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
          {drug.map((c) => (
            <Link
              key={c.slug}
              href={`/interaction/${c.slug}?kind=drug`}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 16,
                padding: 14,
                background: "#fff",
              }}
            >
              <div style={{ fontWeight: 950 }}>{c.title}</div>
              {c.notes ? <div style={{ marginTop: 6, fontSize: 13, opacity: 0.8 }}>{c.notes}</div> : null}
              {Array.isArray(c.aka) && c.aka.length ? (
                <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {c.aka.slice(0, 6).map((a) => (
                    <span key={a} style={{ fontSize: 12, fontWeight: 800, padding: "5px 9px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.10)", background: "rgba(0,0,0,0.02)" }}>
                      {a}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0 }}>Supplement classes</h2>
        <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
          {supp.map((c) => (
            <Link
              key={c.slug}
              href={`/interaction/${c.slug}?kind=supplement`}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 16,
                padding: 14,
                background: "#fff",
              }}
            >
              <div style={{ fontWeight: 950 }}>{c.title}</div>
              {c.notes ? <div style={{ marginTop: 6, fontSize: 13, opacity: 0.8 }}>{c.notes}</div> : null}
              {Array.isArray(c.aka) && c.aka.length ? (
                <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {c.aka.slice(0, 6).map((a) => (
                    <span key={a} style={{ fontSize: 12, fontWeight: 800, padding: "5px 9px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.10)", background: "rgba(0,0,0,0.02)" }}>
                      {a}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
