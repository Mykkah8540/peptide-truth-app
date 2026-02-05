import { redirect } from "next/navigation";
import { getViewer } from "@/lib/viewer";

function initialsFrom(email: string | null, name: string | null) {
  const src = (name || email || "").trim();
  if (!src) return "ME";
  const parts = src.split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] || "M";
  const b = parts.length > 1 ? parts[1]?.[0] : (src.includes("@") ? src[1] : "");
  return (a + (b || "")).toUpperCase();
}

export default async function MePage() {
  const v = await getViewer();
  if (!v.user) redirect("/login?next=" + encodeURIComponent("/me"));

  const prof = v.profile;

  const display = prof?.display_name || v.user.email || "Account";
  const initials = prof?.initials || initialsFrom(v.user.email, prof?.display_name || null);
  const avatarUrl = prof?.avatar_url || null;

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 950, margin: 0 }}>My Profile</h1>

      <div style={{ marginTop: 16, display: "flex", gap: 16, alignItems: "center" }}>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Profile photo"
            style={{ width: 72, height: 72, borderRadius: 999, objectFit: "cover", border: "1px solid rgba(0,0,0,0.12)" }}
          />
        ) : (
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 999,
              display: "grid",
              placeItems: "center",
              fontWeight: 950,
              fontSize: 22,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "rgba(0,0,0,0.03)",
            }}
          >
            {initials}
          </div>
        )}

        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontSize: 18, fontWeight: 950 }}>{display}</div>
          <div style={{ color: "#666" }}>{v.user.email}</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {prof?.is_admin ? <span style={{ fontWeight: 900 }}>ADMIN</span> : null}
            {prof?.is_pro ? <span style={{ fontWeight: 900 }}>PRO</span> : null}
            {v.forceProOn ? <span style={{ fontWeight: 900 }}>PRO OVERRIDE ON</span> : null}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, color: "#666", lineHeight: 1.4 }}>
        Profile editing (photo upload / initials override) is next. For now we’re proving auth + profile read is wired.
      </div>
    </main>
  );
}
