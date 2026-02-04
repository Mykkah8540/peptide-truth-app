"use client";

import { useEffect, useMemo, useState } from "react";

type EntityType = "peptide" | "blend" | "stack";

type Post = {
  id: string;
  username: string;
  text: string;
  createdAt: string;
};

export default function UgcNotesSection(props: { type: EntityType; slug: string; hideSubmit?: boolean }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [ack, setAck] = useState(false);

  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const key = useMemo(() => `${props.type}:${props.slug}`, [props.type, props.slug]);

  useEffect(() => {
    let ok = true;
    setLoading(true);
    fetch(`/api/ugc/list?type=${encodeURIComponent(props.type)}&slug=${encodeURIComponent(props.slug)}`)
      .then((r) => r.json())
      .then((j) => {
        if (!ok) return;
        setPosts(Array.isArray(j?.posts) ? j.posts : []);
      })
      .catch(() => {
        if (!ok) return;
        setPosts([]);
      })
      .finally(() => {
        if (!ok) return;
        setLoading(false);
      });
    return () => {
      ok = false;
    };
  }, [key]);

  async function submit() {
    setSubmitState("submitting");
    setErrorMsg("");

    const payload = {
      type: props.type,
      slug: props.slug,
      username,
      text,
      ack_no_dosing: ack,
    };

    const res = await fetch("/api/ugc/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    const j = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = String(j?.error || "submit_failed");
      if (err === "contains_dosing_or_protocol") {
        setErrorMsg("Looks like your note contains dosing/protocol language. Remove it to submit.");
      } else if (err === "ack_required") {
        setErrorMsg("You must acknowledge the no-dosing rule to submit.");
      } else {
        setErrorMsg("Could not submit. Check required fields.");
      }
      setSubmitState("error");
      return;
    }

    setSubmitState("ok");
    setUsername("");
    setText("");
    setAck(false);

    // Do not append immediately (pending moderation). Just show confirmation.
    setTimeout(() => setSubmitState("idle"), 2500);
  }

  return (
    <section className="pt-card" style={{ marginTop: 18 }}>
      <h2 className="pt-card-title">Community notes</h2>
      <div className="pt-card-subtext" style={{ marginTop: 8 }}>
        Educational discussion only. No dosing, protocols, schedules, or instructions. Submissions are moderated before appearing.
      </div>

      <div style={{ marginTop: 14 }}>
        {loading ? (
          <div className="pt-item-note">Loading…</div>
        ) : posts.length ? (
          <div className="pt-stack">
            {posts.map((p) => (
              <div key={p.id} className="pt-item">
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <div style={{ fontSize: 13, fontWeight: 900 }}>{p.username}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="pt-item-note" style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>
                  {p.text}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pt-item-note">No approved community notes yet.</div>
        )}
      </div>

      <div style={{ marginTop: 18, borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 900 }}>Submit a note</div>

        <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username (required)"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.15)",
              fontSize: 14,
            }}
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your note (no dosing/protocols)"
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

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, opacity: 0.9 }}>
            <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />
            <span>I understand: dosing/protocol details are not allowed and will be rejected.</span>
          </label>

          {submitState === "ok" ? (
            <div style={{ fontSize: 13, fontWeight: 800 }}>Submitted for review.</div>
          ) : null}

          {submitState === "error" ? (
            <div style={{ fontSize: 13, fontWeight: 800 }}>{errorMsg}</div>
          ) : null}

          <button
            onClick={() => submit()}
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
            {submitState === "submitting" ? "Submitting…" : "Submit"}
          </button>
        </div>
      </div>
        ) : null}
    </section>
  );
}
