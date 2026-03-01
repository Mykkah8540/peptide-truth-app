export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const tiles = [
    { href: "/admin/billing", title: "Billing", sub: "Subscribers, revenue, entitlements" },
    { href: "/admin/ugc", title: "UGC Moderation", sub: "Review, approve, reject, archive, triage" },
    { href: "/admin/flags", title: "Flags", sub: "Site control switches (safe + audited)" },
    { href: "/admin/ops", title: "Ops", sub: "Health, jobs, system status" },
    { href: "/admin/audit", title: "Audit", sub: "Admin events + traceability" },
    { href: "/admin/roles", title: "Roles", sub: "Grant/remove admin + moderator access" },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border p-4">
        <div className="text-lg font-semibold">Dashboard</div>
        <div className="text-sm text-muted-foreground">
          Protected control panel. Moderators authenticate via normal login and are granted access via database roles.
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {tiles.map((t) => (
          <a key={t.href} className="rounded-xl border p-4 hover:bg-muted" href={t.href}>
            <div className="font-medium">{t.title}</div>
            <div className="text-sm text-muted-foreground">{t.sub}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
