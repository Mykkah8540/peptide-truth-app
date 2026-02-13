export default async function AdminOps() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border p-4">
        <div className="text-lg font-semibold">Ops</div>
        <div className="text-sm text-muted-foreground">
          System health, queued jobs, and operational tools will live here.
        </div>
      </div>
      <div className="rounded-xl border p-4 text-sm text-muted-foreground">
        Next: add /api/admin/health and basic checks (env sanity, DB connectivity, content index age).
      </div>
    </div>
  );
}
