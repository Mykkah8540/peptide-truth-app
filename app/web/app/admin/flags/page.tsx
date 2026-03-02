export const dynamic = "force-dynamic";
import AdminFlagsClient from "./AdminFlagsClient";

export default async function AdminFlags() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border p-4">
        <div className="text-lg font-semibold">Flags</div>
        <div className="text-sm text-muted-foreground">
          Site control switches. Changes are audited and take effect immediately for all users.
        </div>
      </div>
      <AdminFlagsClient />
    </div>
  );
}
