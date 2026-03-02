"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string; sub?: string };

const ITEMS: Item[] = [
  { href: "/admin",          label: "Dashboard" },
  { href: "/admin/billing",  label: "Billing",    sub: "Subscribers & revenue" },
  { href: "/admin/ugc",      label: "Moderation", sub: "UGC queue" },
  { href: "/admin/flags",    label: "Flags",      sub: "Site controls" },
  { href: "/admin/ops",      label: "Ops",        sub: "Jobs & health" },
  { href: "/admin/audit",    label: "Audit",      sub: "Admin events" },
  { href: "/admin/roles",    label: "Roles",      sub: "Access control" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="pt-admin__nav">
      {ITEMS.map((it) => {
        const active =
          it.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`pt-admin__nav-item${active ? " pt-admin__nav-item--active" : ""}`}
          >
            <div className="pt-admin__nav-item-label">{it.label}</div>
            {it.sub ? (
              <div className="pt-admin__nav-item-sub">{it.sub}</div>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
