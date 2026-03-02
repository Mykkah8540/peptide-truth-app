export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const tiles = [
    { href: "/admin/billing",  title: "Billing",        sub: "Subscribers, revenue, entitlements" },
    { href: "/admin/ugc",      title: "UGC Moderation", sub: "Review, approve, reject, archive, triage" },
    { href: "/admin/flags",    title: "Flags",          sub: "Site control switches (safe + audited)" },
    { href: "/admin/ops",      title: "Ops",            sub: "Health, jobs, system status" },
    { href: "/admin/audit",    title: "Audit",          sub: "Admin events + traceability" },
    { href: "/admin/roles",    title: "Roles",          sub: "Grant/remove admin + moderator access" },
  ];

  return (
    <>
      <div className="pt-admin__page-header">
        <div className="pt-admin__page-title">Dashboard</div>
        <div className="pt-admin__page-sub">
          Protected control panel. Moderators authenticate via normal login and are granted access via database roles.
        </div>
      </div>

      <div className="pt-admin__tile-grid">
        {tiles.map((t) => (
          <a key={t.href} className="pt-admin__tile" href={t.href}>
            <div className="pt-admin__tile-title">{t.title}</div>
            <div className="pt-admin__tile-sub">{t.sub}</div>
          </a>
        ))}
      </div>
    </>
  );
}
