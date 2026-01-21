"use client";

import Link from "next/link";

type Item = { label: string; href: string };

export default function MobileMenu({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: Item[];
}) {
  if (!open) return null;

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
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
