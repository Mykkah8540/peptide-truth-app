export const dynamic = "force-dynamic";
import AdminFlagsClient from "./AdminFlagsClient";

export default async function AdminFlags() {
  return (
    <>
      <div className="pt-admin__page-header">
        <div className="pt-admin__page-title">Flags</div>
        <div className="pt-admin__page-sub">
          Site control switches. Changes are audited and take effect immediately for all users.
        </div>
      </div>
      <AdminFlagsClient />
    </>
  );
}
