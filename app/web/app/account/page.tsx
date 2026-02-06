import BackHomeLink from "@/components/BackHomeLink";
import Link from "next/link";
import { getViewer } from "@/lib/viewer";

function initialsFallback(email: string | null): string {
  const e = (email || "").trim();
  if (!e) return "ME";
  const name = e.split("@")[0] || "";
  const parts = name.split(/[._-]+/g).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  if (parts.length === 1 && parts[0].length >= 2) return (parts[0][0] + parts[0][1]).toUpperCase();
  if (parts.length === 1 && parts[0].length === 1) return (parts[0][0] + "X").toUpperCase();
  return "ME";
}

export default async function AccountPage() {
  const v = await getViewer();

  const isAuthed = !!v.user;
  const email = v.user?.email ?? null;

  const displayName = v.profile?.display_name ?? null;
  const initials = (v.profile?.initials ?? initialsFallback(email)).slice(0, 2).toUpperCase();

  const isPro = Boolean(v.forceProOn || v.profile?.is_pro);
  const isAdmin = Boolean(v.profile?.is_admin);
  const planLabel = isPro ? "Pep-Talk Pro" : "Free";
  const badgeLabel = isPro ? "PRO" : "FREE";

  const nextPath = "/account";
  const upgradeHref = `/upgrade?next=${encodeURIComponent(nextPath)}`;
  const loginHref = `/login?next=${encodeURIComponent(nextPath)}`;

  return (
    <main className="pt-page">
      <section className="pt-card">
        <BackHomeLink />

        <h1 className="pt-card-title" style={{ marginTop: 12 }}>
          Account
        </h1>

        {!isAuthed ? (
          <>
            <p className="pt-card-subtext" style={{ marginTop: 10 }}>
              Sign in to view your account details and manage your subscription.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
              <Link
                href={loginHref}
                style={{
                  border: "1px solid #000",
                  padding: "10px 12px",
                  borderRadius: 12,
                  fontWeight: 900,
                  textDecoration: "none",
                  background: "#fff",
                  color: "inherit",
                }}
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                style={{
                  border: "1px solid #e5e5e5",
                  padding: "10px 12px",
                  borderRadius: 12,
                  fontWeight: 900,
                  textDecoration: "none",
                  background: "#fff",
                  color: "inherit",
                }}
              >
                Create account
              </Link>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                marginTop: 14,
                border: "1px solid rgba(0,0,0,0.10)",
                borderRadius: 14,
                padding: 14,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <div
                  aria-label="Avatar"
                  title={email || "Account"}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 999,
                    border: "1px solid rgba(0,0,0,0.15)",
                    background: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 950,
                    letterSpacing: 0.4,
                  }}
                >
                  {initials}
                </div>

                <div style={{ minWidth: 220 }}>
                  <div style={{ fontWeight: 950, fontSize: 16 }}>{displayName || email || "Account"}</div>
                  <div style={{ opacity: 0.7, fontWeight: 800, marginTop: 2 }}>{email || "—"}</div>
                </div>

                <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      border: "1px solid rgba(0,0,0,0.18)",
                      borderRadius: 999,
                      padding: "6px 10px",
                      fontSize: 12,
                      fontWeight: 950,
                      background: "#fff",
                    }}
                    title={planLabel}
                  >
                    {badgeLabel}
                  </span>

                  {v.forceProOn ? (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        border: "1px solid rgba(0,0,0,0.12)",
                        borderRadius: 999,
                        padding: "6px 10px",
                        fontSize: 12,
                        fontWeight: 900,
                        opacity: 0.75,
                      }}
                      title="Admin flag: force_pro_on"
                    >
                      Dev unlock
                    </span>
                  ) : null}

                  {isAdmin ? (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        border: "1px solid rgba(0,0,0,0.12)",
                        borderRadius: 999,
                        padding: "6px 10px",
                        fontSize: 12,
                        fontWeight: 900,
                        opacity: 0.75,
                      }}
                      title="Admin"
                    >
                      Admin
                    </span>
                  ) : null}
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 12 }}>
                <div style={{ minWidth: 260 }}>
                  <div style={{ fontWeight: 950, fontSize: 12, letterSpacing: 0.6, opacity: 0.7 }}>SUBSCRIPTION</div>
                  <div style={{ fontWeight: 900, marginTop: 2 }}>{planLabel}</div>
                  <div className="pt-card-subtext" style={{ marginTop: 6 }}>
                    Educational peptide information is always free. Pro unlocks discovery, organization, and synthesis tools.
                  </div>
                </div>

                <div style={{ minWidth: 260 }}>
                  <div style={{ fontWeight: 950, fontSize: 12, letterSpacing: 0.6, opacity: 0.7 }}>SECURITY</div>
                  <div style={{ fontWeight: 900, marginTop: 2 }}>Email-based login</div>
                  <div className="pt-card-subtext" style={{ marginTop: 6 }}>
                    If you didn’t initiate changes to your account, contact support.
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
                <Link
                  href={upgradeHref}
                  style={{
                    border: "1px solid #000",
                    padding: "10px 12px",
                    borderRadius: 12,
                    fontWeight: 900,
                    textDecoration: "none",
                    background: "#fff",
                    color: "inherit",
                  }}
                >
                  {isPro ? "Manage subscription" : "Upgrade to Pro"}
                </Link>

                <Link
                  href="/logout"
                  style={{
                    border: "1px solid #e5e5e5",
                    padding: "10px 12px",
                    borderRadius: 12,
                    fontWeight: 900,
                    textDecoration: "none",
                    background: "#fff",
                    color: "inherit",
                  }}
                >
                  Log out
                </Link>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
