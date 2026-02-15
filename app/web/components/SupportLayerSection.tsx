// app/web/components/SupportLayerSection.tsx
import type { SupportPack } from "@/lib/supportLayer";

export default function SupportLayerSection({ pack }: { pack: SupportPack }) {
  return (
    <section className="pt-card">
      <h2 className="pt-card-title">{pack.title}</h2>
      {pack.subtitle ? <p className="pt-card-subtext">{pack.subtitle}</p> : null}

      <div style={{ marginTop: 12 }}>
        <ul style={{ paddingLeft: 22, margin: 0, listStyleType: "disc", listStylePosition: "outside" }}>
          {pack.bullets.map((b, i) => (
            <li key={i} style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.45 }}>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {pack.redFlags?.length ? (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 950, marginBottom: 8 }}>Red flags (don’t ignore)</div>
          <ul style={{ paddingLeft: 22, margin: 0, listStyleType: "disc", listStylePosition: "outside" }}>
            {pack.redFlags.map((b, i) => (
              <li key={i} style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.45 }}>
                {b}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
