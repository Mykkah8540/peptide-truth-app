import { listPending, moderatePost } from "@/lib/ugc/store";

function authed(searchParams: any): boolean {
  const token = process.env.PEP_TALK_ADMIN_TOKEN || "";
  const got = String(searchParams?.token || "").trim();
  return !!token && got === token;
}

async function moderateAction(formData: FormData) {
  "use server";
  const token = process.env.PEP_TALK_ADMIN_TOKEN || "";
  const got = String(formData.get("token") || "").trim();
  if (!token || got !== token) return;

  const id = String(formData.get("id") || "").trim();
  const status = String(formData.get("status") || "").trim();
  const reasonRaw = formData.get("reason");
  const reason = reasonRaw ? String(reasonRaw).trim() : null;

  if (!id) return;
  if (status !== "approved" && status !== "rejected") return;

  moderatePost({ id, status: status as any, reason: reason && reason.length ? reason : null });
}

export default async function UgcAdminPage({ searchParams }: { searchParams: any }) {
  if (!authed(searchParams)) {
    return (
      <main className="pt-page">
        <section className="pt-card">
          <h1 style={{ fontSize: 22, fontWeight: 900 }}>UGC Moderation</h1>
          <p className="pt-card-subtext" style={{ marginTop: 8 }}>
            Unauthorized. Add <code>?token=PEP_TALK_ADMIN_TOKEN</code> to the URL.
          </p>
        </section>
      </main>
    );
  }

  const posts = listPending(500);

  return (
    <main className="pt-page">
      <section className="pt-card">
        <h1 style={{ fontSize: 22, fontWeight: 900 }}>UGC Moderation</h1>
        <p className="pt-card-subtext" style={{ marginTop: 8 }}>
          Pending posts: <b>{posts.length}</b>
        </p>

        {!posts.length ? (
          <div className="pt-item-note" style={{ marginTop: 12 }}>
            Nothing pending right now.
          </div>
        ) : (
          <div className="pt-stack" style={{ marginTop: 14 }}>
            {posts.map((p: any) => (
              <div key={p.id} className="pt-item">
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ fontSize: 13, fontWeight: 900 }}>
                    {p.entityType}/{p.entitySlug}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.75 }}>
                    {p.username} · {new Date(p.createdAt).toLocaleString()}
                  </div>
                </div>

                <div style={{ marginTop: 10, whiteSpace: "pre-wrap", lineHeight: 1.35 }}>{p.text}</div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
                  <form action={moderateAction} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                    <input type="hidden" name="token" value={String(searchParams?.token || "")} />
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="status" value="approved" />
                    <button
                      type="submit"
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        padding: "8px 10px",
                        borderRadius: 10,
                        border: "1px solid rgba(0,0,0,0.15)",
                        background: "rgba(0,0,0,0.02)",
                      }}
                    >
                      Approve
                    </button>
                  </form>

                  <form action={moderateAction} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                    <input type="hidden" name="token" value={String(searchParams?.token || "")} />
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="status" value="rejected" />
                    <input
                      name="reason"
                      placeholder="Rejection reason (optional)"
                      style={{
                        fontSize: 12,
                        padding: "8px 10px",
                        borderRadius: 10,
                        border: "1px solid rgba(0,0,0,0.15)",
                        minWidth: 220,
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        padding: "8px 10px",
                        borderRadius: 10,
                        border: "1px solid rgba(0,0,0,0.15)",
                        background: "rgba(0,0,0,0.02)",
                      }}
                    >
                      Reject
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
