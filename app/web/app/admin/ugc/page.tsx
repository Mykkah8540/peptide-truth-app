"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type UgcStatus = "pending" | "approved" | "rejected" | "archived" | "trash";
type EntityType = "peptide" | "blend" | "stack";

type UgcPost = {
 id: string;
 entityType: EntityType;
 entitySlug: string;
 username: string;
 text: string;
 status: UgcStatus;
 createdAt?: number | string | null;
 updatedAt?: number | string | null;
 flags?: Record<string, any> | null;
 reason?: string | null;
 statusReason?: string | null;
 status_reason?: string | null;
 seenAt?: number | string | null;
};


const QUEUES: Array<{
 key: UgcStatus | "flagged";
 label: string;
 icon: string;
 hint: string;
}> = [
 { key: "pending", label: "Inbox", icon: "📥", hint: "New, unreviewed submissions" },
 { key: "flagged", label: "Flagged", icon: "🚩", hint: "Needs attention (rule risk / questionable)" },
 { key: "approved", label: "Approved", icon: "✅", hint: "Visible to users" },
 { key: "rejected", label: "Denied", icon: "⛔", hint: "Not visible" },
 { key: "archived", label: "Archived", icon: "🗄️", hint: "Out of the way" },
 { key: "trash", label: "Trash", icon: "🗑️", hint: "Deleted / discarded" },


];

type StackSuggestionV1 = {
 name: string;
 goal: string;
 includes: Array<{ type: "peptide" | "blend"; slug: string; title: string }>;
 description: string;
 outcomes: string[];
};

function parseStackSuggestionV1(text: string): StackSuggestionV1 | null {
 if (!text || !text.includes("[STACK_SUGGESTION_V1]")) return null;

 const out: StackSuggestionV1 = { name: "", goal: "", includes: [], description: "", outcomes: [] };

 const lines = String(text).split(/\r?\n/);
 let mode: "none" | "includes" | "description" | "outcomes" = "none";

 for (const raw of lines) {
  const line = raw.trim();

  if (line === "[STACK_SUGGESTION_V1]" || line === "[/STACK_SUGGESTION_V1]") continue;
  if (!line) continue;

  if (line.startsWith("Name:")) {
   out.name = line.replace(/^Name:\s*/, "").trim();
   mode = "none";
   continue;
  }
  if (line.startsWith("Goal:")) {
   out.goal = line.replace(/^Goal:\s*/, "").trim();
   mode = "none";
   continue;
  }
  if (line.startsWith("Includes:")) {
   mode = "includes";
   continue;
  }
  if (line.startsWith("Description:")) {
   mode = "description";
   continue;
  }
  if (line.startsWith("Expected outcomes")) {
   mode = "outcomes";
   continue;
  }

  if (mode === "includes") {
   const mm = raw.match(/-\s*(peptide|blend)\s*:\s*([a-z0-9-_]+)\s*(?:\((.*?)\))?\s*$/i);
   if (mm) {
    const type = (mm[1].toLowerCase() === "blend" ? "blend" : "peptide") as "peptide" | "blend";
    const slug = String(mm[2] || "").trim();
    const title = String(mm[3] || "").trim();
    if (slug) out.includes.push({ type, slug, title });
   }
   continue;
  }

  if (mode === "outcomes") {
   const mm = raw.match(/^-\s*(.*)$/);
   if (mm) {
    const v = String(mm[1] || "").trim();
    if (v) out.outcomes.push(v);
   }
   continue;
  }

  if (mode === "description") {
   if (raw.trim()) out.description += (out.description ? "\n" : "") + raw.trim();
   continue;
  }
 }

 return out;
}

function renderStackSuggestionV1(parsed: StackSuggestionV1) {
 return (
  <div style={{ display: "grid", gap: 10 }}>
         <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 900 }}>Stack suggestion (structured)</div>

   <div style={{ display: "grid", gap: 6 }}>
    <div style={{ fontSize: 13, fontWeight: 900 }}>Name</div>
    <div style={{ fontSize: 13, opacity: 0.9 }}>{parsed.name || "(no name provided)"}</div>
   </div>

   <div style={{ display: "grid", gap: 6 }}>
    <div style={{ fontSize: 13, fontWeight: 900 }}>Goal</div>
    <div style={{ fontSize: 13, opacity: 0.9 }}>{parsed.goal || "(no goal provided)"}</div>
   </div>

   <div style={{ display: "grid", gap: 6 }}>
    <div style={{ fontSize: 13, fontWeight: 900 }}>Includes</div>
    {parsed.includes.length ? (
     <div style={{ display: "grid", gap: 6 }}>
      {parsed.includes.map((x, i) => (
       <div key={i} style={{ fontSize: 13, opacity: 0.9 }}>
        • {x.title || x.slug} <span style={{ opacity: 0.7, fontWeight: 700 }}>({x.type}:{x.slug})</span>
       </div>
      ))}
     </div>
    ) : (
     <div style={{ fontSize: 13, opacity: 0.8 }}>(none selected)</div>
    )}
   </div>

   {parsed.description ? (
    <div style={{ display: "grid", gap: 6 }}>
     <div style={{ fontSize: 13, fontWeight: 900 }}>Description</div>
     <div style={{ fontSize: 13, opacity: 0.9, whiteSpace: "pre-wrap" }}>{parsed.description}</div>
    </div>
   ) : null}

   {parsed.outcomes.length ? (
    <div style={{ display: "grid", gap: 6 }}>
     <div style={{ fontSize: 13, fontWeight: 900 }}>Expected outcomes</div>
     <div style={{ display: "grid", gap: 6 }}>
      {parsed.outcomes.map((v, i) => (
       <div key={i} style={{ fontSize: 13, opacity: 0.9 }}>
        • {v}
       </div>
      ))}
     </div>
    </div>
   ) : null}
  </div>
 );
}

function renderUgcBody(post: any) {
 const text = String(post?.text || "");
 const parsed = parseStackSuggestionV1(text);
 if (parsed && String(post?.entityType || "") === "stack" && String(post?.entitySlug || "") === "__global__") {
  return renderStackSuggestionV1(parsed);
 }
 return <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>;
}



function fmtTime(v: any): string {
 if (v === null || v === undefined) return "";

 // numbers (ms since epoch)
 if (typeof v === "number" && Number.isFinite(v)) {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleString();
 }

 // ISO string dates
 if (typeof v === "string") {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleString();
 }

 // fallback
 const n = Number(v || 0);
 if (!n) return "";
 const d = new Date(n);
 return Number.isNaN(d.getTime()) ? "" : d.toLocaleString();
}

function pickBestTime(p: UgcPost): any {
 return p.createdAt ?? null;
}

function pickBestReason(p: UgcPost): string | null {
 const r = (p.reason ?? p.statusReason ?? p.status_reason) as any;
 const t = String(r ?? "").trim();
 return t ? t : null;
}

function hasFlags(p: UgcPost): boolean {
 const f = p?.flags || {};
 return !!(f.flagged || f.possibleDosing || f.ruleRisk || f.needsReview);
}

function badgeDot(n: number) {
 if (!n) return null;
 return (
  <div
   style={{
    position: "absolute",
    top: 8,
    right: 8,
    minWidth: 22,
    height: 22,
    borderRadius: 999,
    background: "black",
    color: "white",
    fontSize: 12,
    fontWeight: 900,
    display: "grid",
    placeItems: "center",
    padding: "0 6px",
   }}
  >
   {n > 99 ? "99+" : n}
  </div>
 );
}

export default function UgcAdminPage() {
 const [queue, setQueue] = useState<(typeof QUEUES)[number]["key"]>("pending");
 const [loading, setLoading] = useState(false);
 const [posts, setPosts] = useState<UgcPost[]>([]);
 const [selectedId, setSelectedId] = useState<string | null>(null);
 const [counts, setCounts] = useState<Record<string, number>>({});
 const [readIds, setReadIds] = useState<Record<string, true>>({});
 const [errorMsg, setErrorMsg] = useState<string>("");

 const [isAdmin, setIsAdmin] = useState(false);
 const [adminGateMsg, setAdminGateMsg] = useState<string>("");

 const listPaneRef = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
  let cancelled = false;
  (async () => {
   try {
    const r = await fetch('/api/admin/flags', { cache: 'no-store' as any });
    const j = await r.json().catch(() => null);
    if (cancelled) return;
    if (j?.ok) {
     setIsAdmin(true);
     setAdminGateMsg("");
    } else {
     setIsAdmin(false);
     if (r.status === 401) setAdminGateMsg("Not signed in.");
     else if (r.status === 403) setAdminGateMsg("Admin access required.");
     else setAdminGateMsg("");
    }
   } catch (e) { }
  })();
  return () => {
   cancelled = true;
  };
 }, []);


 const selected = useMemo(() => posts.find((p) => p.id === selectedId) || null, [posts, selectedId]);
 const canOperate = isAdmin;

 function markRead(id?: string | null) {
  if (!id) return;
  setReadIds((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  try {
   const raw = localStorage.getItem("pt_ugc_read_ids") || "{}";
   const obj = JSON.parse(raw);
   obj[id] = true;
   localStorage.setItem("pt_ugc_read_ids", JSON.stringify(obj));
  } catch (e) { }
 }

 function getNextId(currentId: string | null, direction: 1 | -1): string | null {
  if (!posts.length) return null;
  if (!currentId) return posts[0]?.id ?? null;
  const idx = posts.findIndex((p) => p.id === currentId);
  if (idx < 0) return posts[0]?.id ?? null;
  const nextIdx = idx + direction;
  if (nextIdx < 0) return posts[0]?.id ?? null;
  if (nextIdx >= posts.length) return posts[posts.length - 1]?.id ?? null;
  return posts[nextIdx]?.id ?? null;
 }

 async function apiGet(status: UgcStatus): Promise<UgcPost[]> {
  const res = await fetch(`/api/ugc/moderate?status=${encodeURIComponent(status)}&limit=500`, {
   cache: "no-store",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok) { throw new Error(data?.error ? String(data.error) : ("HTTP_" + res.status)); }
  return Array.isArray(data.posts) ? data.posts : [];
 }
  function applySeenLocal(id: string, seenAt: string | null) {
   setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, seenAt } : p)));
  }
  async function markSeenRemote(id?: string | null): Promise<boolean> {
   if (!id) return false;
   try {
    const res = await fetch("/api/ugc/seen", {
     method: "POST",
     headers: { "content-type": "application/json" },
     body: JSON.stringify({ id }),
    });

    if (!res.ok) {
     const j = await res.json().catch(() => null);
     if (res.status === 401) setErrorMsg("Admin session expired or unauthorized (401).");
     else setErrorMsg(j?.error ? String(j.error) : ("Failed to mark seen (HTTP_" + res.status + ")"));
     return false;
    }

    return true;
   } catch (e) {
    setErrorMsg("Failed to mark seen (network).");
    return false;
   }
  }

  function selectPost(id?: string | null) {
   if (!id) return;
   setSelectedId(id);
   markRead(id);

   // Only “seen” matters for triage queues (pending/flagged). Keep other queues immutable.
   if (queue !== "pending" && queue !== "flagged") return;

   const stamp = new Date().toISOString();
   applySeenLocal(id, stamp);

   // If server rejects (auth/tls/network), revert local stamp to keep UI==DB truth.
   void (async () => {
    const ok = await markSeenRemote(id);
    if (!ok) applySeenLocal(id, null);
   })();
  }

 async function refreshCounts() {
  const [pending, approved, rejected, archived, trash] = await Promise.all([
   apiGet("pending"),
   apiGet("approved"),
   apiGet("rejected"),
   apiGet("archived"),
   apiGet("trash"),
  ]);

  const flagged = pending.filter((p) => hasFlags(p));
  setCounts({
   pending: pending.filter((p) => !p.seenAt).length,
   approved: approved.length,
   rejected: rejected.length,
   archived: archived.length,
   trash: trash.length,
   flagged: flagged.length,
  });
 }

 async function loadQueue(nextQueue = queue) {
  setLoading(true);
  setErrorMsg("");
  try {
   if (nextQueue === "flagged") {
    const pending = await apiGet("pending");
    const flagged = pending.filter((p) => hasFlags(p));
    setPosts(flagged);
    const first = flagged[0]?.id ?? null;
    selectPost(first);
   } else {
    const list = await apiGet(nextQueue as UgcStatus);
    setPosts(list);
    const first = list[0]?.id ?? null;
    selectPost(first);
   }
   await refreshCounts();
  } catch (e: any) {
   setErrorMsg(String(e?.message || "Failed to load queue"));
  } finally {
   setLoading(false);
  }
 }


 async function moderate(status: UgcStatus, reason?: string) {
  if (!selected) return;
  setErrorMsg("");

  const res = await fetch("/api/ugc/moderate", {
   method: "POST",
   headers: { "content-type": "application/json" },
   body: JSON.stringify({ id: selected.id, status, reason: reason || null }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok) {
   setErrorMsg(data?.error ? String(data.error) : "Moderation failed");
   return;
  }

  // Email-style: remove from current list and auto-select next (1-by-1 triage)
  setPosts((prev) => prev.filter((p) => p.id !== selected.id));
  setSelectedId((cur) => {
    const next = getNextId(cur, 1);
    selectPost(next);
    return next;
   });

  refreshCounts();
 }

 function askRejectReasonAndDeny() {
  const r = prompt("Reason (optional). Keep it short:");
  moderate("rejected", r || undefined);
 }

 // Keyboard nav: j/k to move, a approve, d deny, r archive, t trash
 useEffect(() => {
  function onKey(e: KeyboardEvent) {
   if (!canOperate) return;
   const tag = (e.target as any)?.tagName?.toLowerCase?.() || "";
   if (tag === "input" || tag === "textarea") return;

   if (e.key === "j") {
    e.preventDefault();
    const next = getNextId(selectedId, 1);
    selectPost(next);
    return;
   }
   if (e.key === "k") {
    e.preventDefault();
    const prev = getNextId(selectedId, -1);
    selectPost(prev);
    return;
   }
   if (e.key === "a") {
    e.preventDefault();
    moderate("approved");
    return;
   }
   if (e.key === "d") {
    e.preventDefault();
    askRejectReasonAndDeny();
    return;
   }
   if (e.key === "r") {
    e.preventDefault();
    moderate("archived");
    return;
   }
   if (e.key === "t") {
    e.preventDefault();
    moderate("trash");
    return;
   }
  }
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [canOperate, selectedId, selected, posts, queue]);

 return (
  <div>
    <div className="pt-admin__page-header" style={{ marginBottom: 14 }}>
      <div className="pt-admin__page-title">UGC Moderation</div>
      <div className="pt-admin__page-sub">
        Inbox-style review for community notes. Shortcuts: j/k (nav), a (approve), d (deny), r (archive), t (trash)
      </div>
    </div>

    <section className="pt-admin__card" style={{ padding: "14px 18px" }}>
     <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <div style={{ fontSize: 13, fontWeight: 800, opacity: 0.8 }}>Admin session</div>
      <div style={{ fontSize: 13, fontWeight: 900 }}>
       {canOperate ? "✅ Admin access confirmed" : "⛔ Not authorized"}
       {adminGateMsg ? <span style={{ marginLeft: 10, fontSize: 12, opacity: 0.7, fontWeight: 800 }}>{adminGateMsg}</span> : null}
      </div>
      <div style={{ flex: "1 1 auto" }} />
      <button
       className="pt-btn"
       onClick={() => loadQueue(queue)}
       disabled={!canOperate || loading}
       style={{ padding: "10px 12px", borderRadius: 12, fontWeight: 900 }}
       title="Reload current queue"
      >
       {loading ? "Loading…" : "Reload"}
      </button>
      <button
       className="pt-btn"
       onClick={() => refreshCounts()}
       disabled={!canOperate || loading}
       style={{ padding: "10px 12px", borderRadius: 12, fontWeight: 900 }}
       title="Refresh sidebar counts"
      >
       Refresh counts
      </button>
     </div>
     {errorMsg ? (
      <div className="pt-item-note" style={{ marginTop: 10 }}>
       {errorMsg}
      </div>
     ) : null}
    </section>

    <section className="pt-card" style={{ marginTop: 16, padding: 0, overflow: "hidden" }}>
     <div
      style={{
       display: "grid",
       gridTemplateColumns: "78px 380px 1fr",
       minHeight: 560,
      }}
     >
      {/* Sidebar (folders) */}
      <div
       style={{
        borderRight: "1px solid rgba(0,0,0,0.08)",
        background: "rgba(0,0,0,0.015)",
        padding: 10,
       }}
      >
       <div style={{ display: "grid", gap: 10 }}>

           {QUEUES.map((q) => {
         const active = queue === q.key;
         const n = counts[q.key] || 0;
         return (
          <button
           key={q.key}
           onClick={() => {
            setQueue(q.key);
            setSelectedId(null);
            loadQueue(q.key);
           }}
           title={q.label}
           disabled={!canOperate}
           style={{
            width: 58,
            height: 58,
            borderRadius: 18,
            border: active ? "2px solid rgba(0,0,0,0.22)" : "1px solid rgba(0,0,0,0.12)",
            background: active ? "rgba(0,0,0,0.06)" : "white",
            display: "grid",
            placeItems: "center",
            position: "relative",
            cursor: canOperate ? "pointer" : "not-allowed",
            opacity: canOperate ? 1 : 0.6,
           }}
          >
           <div style={{ fontSize: 22 }}>{q.icon}</div>
           {badgeDot(n)}
          </button>
         );
        })}
       </div>
      </div>

      {/* List pane */}
      <div style={{ borderRight: "1px solid rgba(0,0,0,0.08)" }}>
       <div style={{ padding: "14px 14px 10px 14px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
         <div style={{ fontSize: 18, fontWeight: 900 }}>
          {QUEUES.find((q) => q.key === queue)?.label || "Queue"}
          <span style={{ marginLeft: 10, fontSize: 12, opacity: 0.65, fontWeight: 800 }}>
           {posts.length ? posts.length : ""}
          </span>
         </div>
         <button
          className="pt-btn"
          onClick={() => loadQueue(queue)}
          disabled={!canOperate || loading}
          style={{ padding: "8px 10px", borderRadius: 12, fontWeight: 900 }}
         >
          Refresh
         </button>
        </div>
        <div style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>
         {QUEUES.find((q) => q.key === queue)?.hint || ""}
        </div>
       </div>

       <div ref={listPaneRef} style={{ padding: 10, display: "grid", gap: 8 }}>
        {!canOperate ? (
         <div className="pt-item-note">Admin access required.</div>
        ) : loading ? (
         <div className="pt-item-note">Loading…</div>
        ) : !posts.length ? (
         <div className="pt-item-note">Empty.</div>
        ) : (
         posts.map((p) => {
           const active = p.id === selectedId;
           const unread = !p.seenAt;
          const flagged = hasFlags(p);

          return (
           <button
            key={p.id}
            onClick={() => {
              selectPost(p.id);
             }}
            style={{
             textAlign: "left",
             padding: 12,
             borderRadius: 14,
             border: active ? "2px solid rgba(0,0,0,0.22)" : "1px solid rgba(0,0,0,0.12)",
             background: active ? "rgba(0,0,0,0.04)" : "white",
                          borderLeft: unread ? "4px solid black" : "4px solid transparent",
}}
           >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
             <div style={{ fontWeight: unread ? 950 : 850, fontSize: 13 }}>
              {flagged ? "🚩 " : ""}
              {p.username}
             </div>
             <div style={{ fontSize: 11, opacity: 0.65 }}>{fmtTime(pickBestTime(p))}</div>
            </div>
            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.8 }}>
             {p.entityType}:{p.entitySlug}
            </div>
            <div style={{ marginTop: 8, fontSize: 13, fontWeight: unread ? 850 : 700, lineHeight: 1.25 }}>
             {String(p.text || "").slice(0, 90)}
             {String(p.text || "").length > 90 ? "…" : ""}
            </div>
           </button>
          );
         })
        )}
       </div>
      </div>

      {/* Reading pane */}
      <div style={{ padding: 18 }}>
       {!selected ? (
        <div className="pt-item-note" style={{ marginTop: 6 }}>
         Select a submission to review.
        </div>
       ) : (
        <div style={{ display: "grid", gap: 14 }}>
         <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <div>
           <div style={{ fontSize: 18, fontWeight: 900 }}>{selected.username}</div>
           <div style={{ marginTop: 4, fontSize: 12, opacity: 0.75 }}>
            {selected.entityType}:{selected.entitySlug} • {fmtTime(pickBestTime(selected))}
           </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
           <button className="pt-btn" onClick={() => moderate("approved")} disabled={!canOperate}>
            Approve (a)
           </button>
           <button className="pt-btn" onClick={() => askRejectReasonAndDeny()} disabled={!canOperate}>
            Deny (d)
           </button>
           <button className="pt-btn" onClick={() => moderate("archived")} disabled={!canOperate}>
            Archive (r)
           </button>
           <button className="pt-btn" onClick={() => moderate("trash")} disabled={!canOperate}>
            Trash (t)
           </button>
          </div>
         </div>

         <div
          style={{
           whiteSpace: "pre-wrap",
           padding: 14,
           borderRadius: 16,
           border: "1px solid rgba(0,0,0,0.12)",
           background: "white",
           fontSize: 14,
           lineHeight: 1.5,
          }}
         >
          {renderUgcBody(selected)}
         </div>

         {pickBestReason(selected) ? (
          <div className="pt-item-note">
           <b>Reason:</b> {pickBestReason(selected)}
          </div>
         ) : null}

         {selected.flags && Object.keys(selected.flags).length ? (
          <div className="pt-item-note">
           <b>Flags:</b> {Object.keys(selected.flags).join(", ")}
          </div>
         ) : null}
        </div>
       )}
      </div>
     </div>
    </section>
  </div>
 );
}
