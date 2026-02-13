export default async function AdminAudit() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border p-4">
        <div className="text-lg font-semibold">Audit</div>
        <div className="text-sm text-muted-foreground">
          Admin event log viewer (moderation actions, role changes, flag toggles).
        </div>
      </div>
      <div className="rounded-xl border p-4 text-sm text-muted-foreground">
        Next: wire a DB-backed admin_events table + list UI (currently parked until post-polish).
      </div>
    </div>
  );
}
