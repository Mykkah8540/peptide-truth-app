"use client";

import Link from "next/link";

type Item = {
  label: string;
  href: string;
  pro?: boolean;
};

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

export default function MobileMenu(props: {
  open: boolean;
  onClose: () => void;
  items: Item[];
}) {
  const { open, onClose, items } = props;

  if (!open) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: 20,
          maxWidth: 360,
          height: "100%",
        }}
      >
        <button
          onClick={onClose}
          style={{
            border: "none",
            background: "transparent",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 16,
            cursor: "pointer",
          }}
        >
          ✕ Close
        </button>

        <nav style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{
                fontSize: 16,
                fontWeight: 800,
                textDecoration: "none",
                color: "#000",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <span>{item.label}</span>
              {item.pro ? <ProPill /> : null}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
