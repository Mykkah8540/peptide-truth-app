import Link from "next/link";

type Item = { href: string; label: string; sub?: string };

const ITEMS: Item[] = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/billing", label: "Billing", sub: "Subscribers & revenue" },
  { href: "/admin/ugc", label: "Moderation", sub: "UGC queue" },
  { href: "/admin/flags", label: "Flags", sub: "Site controls" },
  { href: "/admin/ops", label: "Ops", sub: "Jobs & health" },
  { href: "/admin/audit", label: "Audit", sub: "Admin events" },
  { href: "/admin/roles", label: "Roles", sub: "Access control" },
];

export default function AdminNav() {
  return (
    <nav className="space-y-1">
      {ITEMS.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="block rounded-lg border px-3 py-2 hover:bg-muted"
        >
          <div className="text-sm font-medium">{it.label}</div>
          {it.sub ? <div className="text-xs text-muted-foreground">{it.sub}</div> : null}
        </Link>
      ))}
    </nav>
  );
}
