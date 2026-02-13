export default async function AdminHome() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border p-4">
        <div className="text-lg font-semibold">Admin</div>
        <div className="text-sm text-muted-foreground">
          Use this area for moderation and ops tools. Access is controlled by database roles, not source code.
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <a className="rounded-xl border p-4 hover:bg-muted" href="/admin/ugc">
          <div className="font-medium">UGC Moderation</div>
          <div className="text-sm text-muted-foreground">Review, approve, reject, archive, triage</div>
        </a>
      </div>
    </div>
  );
}
