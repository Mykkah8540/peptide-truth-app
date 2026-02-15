// app/web/components/SupportLayerSection.tsx
import type { SupportPack } from "@/lib/supportLayer";
import { AlertTriangle, Sparkles } from "lucide-react";

export default function SupportLayerSection({ pack }: { pack: SupportPack }) {
  return (
    <section className="pt-card">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div
          aria-hidden
          style={{
            width: 34,
            height: 34,
            borderRadius: 999,
            display: "grid",
            placeItems: "center",
            border: "1px solid rgba(0,0,0,0.10)",
            background: "rgba(255,255,255,0.7)",
          }}
        >
          <Sparkles size={16} style={{ opacity: 0.85 }} />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 850, letterSpacing: 0.2, opacity: 0.72 }}>Support Layer</div>
          <h2 className="pt-card-title" style={{ marginTop: 2 }}>{pack.title}</h2>
        </div>
      </div>
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
        <div
          style={{
            marginTop: 16,
            padding: 14,
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.10)",
            background: "rgba(255, 245, 245, 0.6)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <AlertTriangle size={16} style={{ opacity: 0.9 }} />
            <div style={{ fontSize: 13, fontWeight: 950 }}>Red flags (don’t ignore)</div>
          </div>
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
