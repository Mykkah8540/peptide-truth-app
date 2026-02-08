"use client";

import { useEffect, useState } from "react";

export default function CollapsibleSection(props: {
 title: string;
 defaultCollapsedMobile?: boolean;
 children: React.ReactNode;
}) {
 const { title, defaultCollapsedMobile = true, children } = props;

 const [collapsed, setCollapsed] = useState(false);

 useEffect(() => {
  try {
   const isMobile = window.matchMedia("(max-width: 640px)").matches;
   setCollapsed(isMobile ? defaultCollapsedMobile : false);
  } catch {
   setCollapsed(false);
  }
 }, [defaultCollapsedMobile]);

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
    <h2 className="pt-card-title" style={{ margin: 0 }}>
     {title}
    </h2>
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
