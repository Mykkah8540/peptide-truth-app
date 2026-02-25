export const dynamic = "force-dynamic";

export default async function AdminFlags() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border p-4">
        <div className="text-lg font-semibold">Flags</div>
        <div className="text-sm text-muted-foreground">
          Safe site controls (feature flags). Changes should be audited.
        </div>
      </div>
      <div className="rounded-xl border p-4 text-sm text-muted-foreground">
        Next: implement DB-backed flags + /api/admin/flags GET/POST with audit.
      </div>
    </div>
  );
}
