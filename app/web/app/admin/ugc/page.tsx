"use client";

import { useEffect, useMemo, useState } from "react";

type EntityType = "peptide" | "blend" | "stack";
type ModStatus = "pending" | "approved" | "rejected" | "archived" | "trash" | "flagged";

type UgcPost = {
  id: string;
  entityType: EntityType;
  entitySlug: string;
  username: string;
  text: string;
  status: ModStatus;
  createdAt?: string;
  updatedAt?: string;
  reason?: string | null;
};

const TABS: { key: ModStatus; label: string }[] = [
  { key: "pending", label: "Inbox" },
  { key: "flagged", label: "Flagged" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Denied" },
  { key: "archived", label: "Archived" },
  { key: "trash", label: "Trash" },
];

function nowIso() {
  try { return new Date().toISOString(); } catch { return ""; }
}

export default function AdminUgcPage() {
  const [token, setToken] = useState<string>("");
  const [tab, setTab] = useState<ModStatus>("pending");
  const [posts, setPosts] = useState<UgcPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string>("");

  const tokenKey = "pepTalkAdminToken";

  useEffect(() => {
    try {
      const t = localStorage.getItem(tokenKey) || "";
      if (t) setToken(t);
    } catch {}
  }, []);

  useEffect(() => {
    if (!token) return;
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, token]);

  const groupedCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of posts) m.set(p.status, (m.get(p.status) || 0) + 1);
    return m;
  }, [posts]);

  async function refresh() {
    setErr("");
    setLoading(true);
    try {
      const r = await fetch(`/api/ugc/moderate?status=${encodeURIComponent(tab)}`, {
        headers: { "x-admin-token": token },
        cache: "no-store",
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j?.error || `HTTP ${r.status}`);
      setPosts(Array.isArray(j?.posts) ? j.posts : []);
    } catch (e: any) {
      setErr(String(e?.message || e || "error"));
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: ModStatus, reason?: string) {
    setErr("");
    setLoading(true);
    try {
      const r = await fetch("/api/ugc/moderate", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({ id, status, reason: reason ? reason : null }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j?.error || `HTTP ${r.status}`);
      // Refresh current tab after action
      await refresh();
    } catch (e: any) {
      setErr(String(e?.message || e || "error"));
    } finally {
      setLoading(false);
    }
  }

  function saveToken() {
    setErr("");
    try {
      localStorage.setItem(tokenKey, token.trim());
    } catch {}
    void refresh();
  }

  return (
    <main className="pt-page">
      <div className="pt-hero">
        <div>
          <h1>Moderator</h1>
          <p className="pt-card-subtext" style={{ marginBottom: 0 }}>
            UGC inbox + moderation actions. Token is stored locally in your browser.
          </p>
        </div>
      </div>

      <section className="pt-card">
        <h2 className="pt-card-title">Admin token</h2>
        <div className="pt-stack" style={{ marginTop: 10 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="PEP_TALK_ADMIN_TOKEN"
              style={{
                flex: "1 1 320px",
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.15)",
                fontSize: 14,
              }}
            />
            <button
              onClick={saveToken}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.15)",
                fontWeight: 800,
                background: "rgba(0,0,0,0.02)",
              }}
            >
              Save token
            </button>
            <button
              onClick={() => {
                try { localStorage.removeItem(tokenKey); } catch {}
                setToken("");
                setPosts([]);
              }}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.15)",
                fontWeight: 800,
                background: "rgba(0,0,0,0.02)",
              }}
            >
              Clear
            </button>
          </div>
          <div className="pt-item-note">
            Tip: Start dev, open <code>/admin/ugc</code>, paste token, Save. Then moderate.
          </div>
        </div>
      </section>

      <section className="pt-card">
        <h2 className="pt-card-title">Queues</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: "8px 12px",
                borderRadius: 999,
                border: "1px solid rgba(0,0,0,0.15)",
                fontWeight: 900,
                background: tab === t.key ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.02)",
              }}
            >
              {t.label}
              {groupedCounts.get(t.key) ? ` · ${groupedCounts.get(t.key)}` : ""}
            </button>
          ))}
          <button
            onClick={() => void refresh()}
            style={{
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.15)",
              fontWeight: 900,
              background: "rgba(0,0,0,0.02)",
            }}
          >
            Refresh
          </button>
        </div>

        {err ? (
          <div className="pt-item-note" style={{ marginTop: 10 }}>
            Error: {err}
          </div>
        ) : null}

        <div className="pt-stack" style={{ marginTop: 14 }}>
          {loading ? <div className="pt-item-note">Loading…</div> : null}

          {!loading && !posts.length ? (
            <div className="pt-item-note">Empty.</div>
          ) : null}

          {posts.map((p) => (
            <div key={p.id} className="pt-item">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ fontWeight: 900 }}>
                  {p.entityType}:{p.entitySlug} · @{p.username}
                </div>
                <div style={{ fontSize: 12, opacity: 0.75 }}>
                  {p.status.toUpperCase()} · {p.createdAt || nowIso()}
                </div>
              </div>

              <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.45, whiteSpace: "pre-wrap" }}>
                {p.text}
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                <button
                  onClick={() => updateStatus(p.id, "approved")}
                  style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)", fontWeight: 900 }}
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(p.id, "rejected")}
                  style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)", fontWeight: 900 }}
                >
                  Deny
                </button>
                <button
                  onClick={() => updateStatus(p.id, "flagged")}
                  style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)", fontWeight: 900 }}
                >
                  Flag
                </button>
                <button
                  onClick={() => updateStatus(p.id, "archived")}
                  style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)", fontWeight: 900 }}
                >
                  Archive
                </button>
                <button
                  onClick={() => updateStatus(p.id, "trash")}
                  style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)", fontWeight: 900 }}
                >
                  Trash
                </button>
              </div>

              {p.reason ? <div className="pt-item-note">Reason: {p.reason}</div> : null}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
