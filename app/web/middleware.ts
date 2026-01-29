import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const GATED_PREFIXES = [
  "/stack-builder",
  "/stacks",
  "/favorites",
  "/account",
];

export function middleware(req: NextRequest) {
  const enabled = process.env.NEXT_PUBLIC_GATES_ENABLED === "1";
  if (!enabled) return NextResponse.next();

  const path = req.nextUrl.pathname;

  // Never gate public PDPs / core browsing.
  if (path.startsWith("/peptide/")) return NextResponse.next();
  if (path.startsWith("/blend/")) return NextResponse.next();
  if (path.startsWith("/interactions")) return NextResponse.next();
  if (path.startsWith("/upgrade")) return NextResponse.next();

  // Dev bypass cookie (set by dev unlock route)
  const hasBypass = req.cookies.get("pt_gate")?.value === "1";
  if (hasBypass) return NextResponse.next();

  const shouldGate = GATED_PREFIXES.some((p) => path === p || path.startsWith(p + "/"));
  if (!shouldGate) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/upgrade";
  url.searchParams.set("next", path);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/:path*"],
};
