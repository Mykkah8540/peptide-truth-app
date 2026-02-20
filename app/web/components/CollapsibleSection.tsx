"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  title: string;
  /** Mobile-only default (<= 640px). Existing behavior. */
  defaultCollapsedMobile?: boolean;
  /** Desktop/tablet default (> 640px). */
  defaultCollapsed?: boolean;
  /** Optional: override title class for nested sections */
  titleClassName?: string;
  children: React.ReactNode;
};

export default function CollapsibleSection(props: Props) {
  const {
    title,
    defaultCollapsedMobile = true,
    defaultCollapsed = false,
    titleClassName,
    children,
  } = props;

  // SSR-safe: start collapsed if *either* mode might want collapsing.
  // This prevents the "wall of text" flash + alignment jank before hydration.
  const ssrInitial = useMemo(() => {
    return !!(defaultCollapsed || defaultCollapsedMobile);
  }, [defaultCollapsed, defaultCollapsedMobile]);

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      if (typeof window === "undefined") return ssrInitial;
      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      return isMobile ? defaultCollapsedMobile : defaultCollapsed;
    } catch {
      return ssrInitial;
    }
  });

  useEffect(() => {
    try {
      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      setCollapsed(isMobile ? defaultCollapsedMobile : defaultCollapsed);
    } catch {
      setCollapsed(ssrInitial);
    }
  }, [defaultCollapsedMobile, defaultCollapsed, ssrInitial]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setCollapsed((v) => !v)}
        aria-expanded={!collapsed}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          border: "none",
          background: "transparent",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <div className={titleClassName || "pt-collapse-title"} style={{ margin: 0 }}>
          {title}
        </div>

        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            width: 18,
            height: 18,
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.7,
            transform: collapsed ? "rotate(0deg)" : "rotate(90deg)",
            transition: "transform 120ms ease",
            fontWeight: 900,
          }}
        >
          ›
        </span>
      </button>

      {collapsed ? null : <div style={{ marginTop: 10 }}>{children}</div>}
    </div>
  );
}
