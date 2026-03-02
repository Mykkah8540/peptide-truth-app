export default async function AdminOps() {
  return (
    <>
      <div className="pt-admin__page-header">
        <div className="pt-admin__page-title">Ops</div>
        <div className="pt-admin__page-sub">
          System health, queued jobs, and operational tools will live here.
        </div>
      </div>
      <div className="pt-admin__card">
        <div className="pt-admin__note">
          Next: add /api/admin/health and basic checks (env sanity, DB connectivity, content index age).
        </div>
      </div>
    </>
  );
}
