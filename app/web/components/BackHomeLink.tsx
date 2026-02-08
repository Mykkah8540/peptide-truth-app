"use client";

import Link from "next/link";

export default function BackHomeLink({ href = "/" }: { href?: string }) {
 return (
  <Link
   href={href}
   aria-label="Back to home"
   title="Back to home"
   style={{
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    color: "inherit",
    opacity: 0.9,
   }}
  >
   <span style={{ display: "inline-flex", width: 18, height: 18 }}>
    <svg
     width="18"
     height="18"
     viewBox="0 0 24 24"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
     aria-hidden="true"
    >
     <path
      d="M14.5 5.5L8 12l6.5 6.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
     />
    </svg>
   </span>
   <span style={{ fontWeight: 900, letterSpacing: -0.2 }}>Pep-Talk</span>
  </Link>
 );
}
