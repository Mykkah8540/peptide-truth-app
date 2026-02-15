// app/web/components/SupportLayerSection.tsx
import type { SupportPack } from "@/lib/supportLayer";

function SparklesIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <path d="M12 2l1.2 4.1L17 7.3l-3.8 1.2L12 12l-1.2-3.5L7 7.3l3.8-1.2L12 2z" />
      <path d="M5 13l.7 2.4L8 16l-2.3.6L5 19l-.7-2.4L2 16l2.3-.6L5 13z" />
      <path d="M19 13l.7 2.4L22 16l-2.3.6L19 19l-.7-2.4L16 16l2.3-.6L19 13z" />
    </svg>
  );
}

function AlertTriangleIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <path d="M10.3 3.3l-8.6 15A2 2 0 0 0 3.4 21h17.2a2 2 0 0 0 1.7-2.7l-8.6-15a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

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
          <SparklesIcon style={{ opacity: 0.85 }} />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 850, letterSpacing: 0.2, opacity: 0.72 }}>Support Layer</div>
          <h2 className="pt-card-title" style={{ marginTop: 2 }}>
            {pack.title}
          </h2>
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
            <AlertTriangleIcon style={{ opacity: 0.9 }} />
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
