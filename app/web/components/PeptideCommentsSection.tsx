"use client";

import { useEffect, useMemo, useState } from "react";

type Comment = {
  id: string;
  peptide_slug: string;
  user_id: string;
  display_name: string | null;
  content: string;
  created_at: string;
};

export default function PeptideCommentsSection(props: { slug: string }) {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [meId, setMeId] = useState<string | null>(null);

  const [text, setText] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const key = useMemo(() => `peptide-comments:${props.slug}`, [props.slug]);

  async function refresh() {
    setLoading(true);
    setErrorMsg("");

    const [meRes, listRes] = await Promise.all([
      fetch("/api/me").catch(() => null),
      fetch(`/api/peptide-comments/list?slug=${encodeURIComponent(props.slug)}`).catch(() => null),
    ]);

    // /api/me returns ok + viewer etc in this codebase; we only need the id if present
    try {
      const mj = meRes ? await meRes.json() : null;
      const id = mj?.user?.id || mj?.viewer?.user?.id || mj?.viewer?.id || null;
      setMeId(id ? String(id) : null);
    } catch {
      setMeId(null);
    }

    try {
      const lj = listRes ? await listRes.json() : null;
      setComments(Array.isArray(lj?.comments) ? lj.comments : []);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let ok = true;
    (async () => {
      if (!ok) return;
      await refresh();
    })();
    return () => {
      ok = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  async function submitNew() {
    if (!text.trim()) {
      setErrorMsg("Please write a short note about what you noticed.");
      setSubmitState("error");
      return;
    }

    setSubmitState("submitting");
    setErrorMsg("");

    const res = await fetch("/api/peptide-comments/create", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug: props.slug, content: text.trim() }),
    });

    const j = await res.json().catch(() => ({}));
    if (!res.ok || !j?.ok) {
      const err = String(j?.error || "submit_failed");
      if (err === "unauthorized") setErrorMsg("Sign in to add your experience.");
      else if (err === "too_long") setErrorMsg("Keep it under 2000 characters.");
      else setErrorMsg("Could not submit. Please try again.");
      setSubmitState("error");
      return;
    }

    setSubmitState("ok");
    setText("");
    await refresh();
    setTimeout(() => setSubmitState("idle"), 1500);
  }

  async function saveEdit(id: string) {
    if (!editText.trim()) {
      setErrorMsg("Edit text can't be empty.");
      setSubmitState("error");
      return;
    }

    setSubmitState("submitting");
    setErrorMsg("");

    const res = await fetch("/api/peptide-comments/update", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, content: editText.trim() }),
    });

    const j = await res.json().catch(() => ({}));
    if (!res.ok || !j?.ok) {
      setErrorMsg("Could not update. Make sure you're signed in and this is your comment.");
      setSubmitState("error");
      return;
    }

    setEditId(null);
    setEditText("");
    setSubmitState("idle");
    await refresh();
  }

  async function deleteMine(id: string) {
    if (!confirm("Delete your comment?")) return;

    setSubmitState("submitting");
    setErrorMsg("");

    const res = await fetch("/api/peptide-comments/delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const j = await res.json().catch(() => ({}));
    if (!res.ok || !j?.ok) {
      setErrorMsg("Could not delete. Make sure you're signed in and this is your comment.");
      setSubmitState("error");
      return;
    }

    setSubmitState("idle");
    await refresh();
  }

  const authed = !!meId;

  return (
    <section id="community" className="pt-card" style={{ marginTop: 18 }}>
      <h2 className="pt-card-title">Join the Conversation</h2>

      <div className="pt-card-subtext" style={{ marginTop: 8 }}>
        <div>People respond differently to the same peptide.</div>
        <div>Share what you noticed — your experience helps build clarity for others.</div>
      </div>

      <div style={{ marginTop: 14 }}>
        {loading ? (
          <div className="pt-item-note">Loading…</div>
        ) : comments.length ? (
          <div className="pt-stack">
            {comments.map((c) => {
              const mine = meId && String(c.user_id) === String(meId);
              const name = (c.display_name && String(c.display_name).trim()) || "Member";
              const isEditing = editId === c.id;

              return (
                <div key={c.id} className="pt-item">
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                    <div style={{ fontSize: 13, fontWeight: 900 }}>{name}</div>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>{new Date(c.created_at).toLocaleDateString()}</div>
                  </div>

                  {isEditing ? (
                    <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows={5}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: 10,
                          border: "1px solid rgba(0,0,0,0.15)",
                          fontSize: 14,
                          resize: "vertical",
                        }}
                      />
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <button
                          onClick={() => saveEdit(c.id)}
                          disabled={submitState === "submitting"}
                          style={{
                            padding: "10px 12px",
                            borderRadius: 10,
                            border: "1px solid rgba(0,0,0,0.2)",
                            fontSize: 14,
                            fontWeight: 900,
                            background: "rgba(0,0,0,0.03)",
                            cursor: "pointer",
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditId(null);
                            setEditText("");
                          }}
                          style={{
                            padding: "10px 12px",
                            borderRadius: 10,
                            border: "1px solid rgba(0,0,0,0.2)",
                            fontSize: 14,
                            fontWeight: 900,
                            background: "rgba(0,0,0,0.03)",
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-item-note" style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>
                      {c.content}
                    </div>
                  )}

                  {mine && !isEditing ? (
                    <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <button
                        onClick={() => {
                          setEditId(c.id);
                          setEditText(c.content);
                        }}
                        style={{
                          padding: "8px 10px",
                          borderRadius: 10,
                          border: "1px solid rgba(0,0,0,0.2)",
                          fontSize: 13,
                          fontWeight: 900,
                          background: "rgba(0,0,0,0.03)",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMine(c.id)}
                        style={{
                          padding: "8px 10px",
                          borderRadius: 10,
                          border: "1px solid rgba(0,0,0,0.2)",
                          fontSize: 13,
                          fontWeight: 900,
                          background: "rgba(0,0,0,0.03)",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="pt-item-note">
            <div style={{ fontWeight: 900 }}>Be the first to share your experience</div>
            <div style={{ marginTop: 6, opacity: 0.85 }}>
              If you’ve explored this peptide, even a short note helps others learn.
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 18, borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 14 }}>
        {authed ? (
          <>
            <div style={{ fontSize: 13, fontWeight: 900 }}>Add your experience</div>

            <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What did you notice? Keep it personal — avoid giving directions to others."
                rows={5}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.15)",
                  fontSize: 14,
                  resize: "vertical",
                }}
              />

              <div style={{ fontSize: 13, opacity: 0.9 }}>
                Personal experience is welcome. Please avoid instructions, schedules, or directives.
              </div>

              <div style={{ fontSize: 13, opacity: 0.85 }}>
                The comments below reflect individual perspectives and individual experiential knowledge. People’s responses can vary, so these experiences are best understood as personal observations rather than universal outcomes.
              </div>

              {submitState === "ok" ? <div style={{ fontSize: 13, fontWeight: 800 }}>Posted.</div> : null}
              {submitState === "error" ? <div style={{ fontSize: 13, fontWeight: 800 }}>{errorMsg}</div> : null}

              <button
                onClick={() => submitNew()}
                disabled={submitState === "submitting"}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.2)",
                  fontSize: 14,
                  fontWeight: 900,
                  background: "rgba(0,0,0,0.03)",
                  cursor: "pointer",
                }}
              >
                {submitState === "submitting" ? "Posting…" : "Add your experience"}
              </button>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div className="pt-item-note">Sign in to add your experience.</div>
            <a
              href="/login"
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.2)",
                fontSize: 14,
                fontWeight: 900,
                background: "rgba(0,0,0,0.03)",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Sign in
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
