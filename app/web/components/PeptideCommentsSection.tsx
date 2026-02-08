"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type CommentRow = {
  id: string;
  peptide_slug: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

const S = {
  title: { fontWeight: 900, fontSize: 18, margin: 0 },
  sub: { opacity: 0.8, marginTop: 10, marginBottom: 0 },
  note: { opacity: 0.75, marginTop: 10, fontSize: 12 },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid rgba(0,0,0,0.16)",
    borderRadius: 12,
    padding: "10px 12px",
    fontWeight: 900,
    textDecoration: "none",
  } as const,
  textArea: {
    width: "100%",
    minHeight: 110,
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.16)",
    padding: 12,
    outline: "none",
  } as const,
  smallBtn: {
    border: "1px solid rgba(0,0,0,0.16)",
    borderRadius: 10,
    padding: "6px 10px",
    fontWeight: 900,
    background: "transparent",
    cursor: "pointer",
  } as const,
};

async function jget(url: string) {
  const res = await fetch(url, { method: "GET" });
  const j = await res.json().catch(() => null);
  return { res, j };
}

async function jpost(url: string, body: any) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const j = await res.json().catch(() => null);
  return { res, j };
}

export default function PeptideCommentsSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Minimal “viewer” signal: if you are logged out, create/update/delete will 401.
  // We keep UX simple: show composer always, and if 401 we prompt sign in.
  const canSubmit = useMemo(() => draft.trim().length > 0 && draft.trim().length <= 2000, [draft]);

  async function refresh() {
    setLoading(true);
    setStatus(null);
    const { j } = await jget(`/api/peptide-comments/list?slug=${encodeURIComponent(slug)}`);
    if (j?.ok) setComments(j.comments ?? []);
    else setStatus("Could not load comments.");
    setLoading(false);
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  async function submit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setStatus(null);

    const content = draft.trim();
    const { res, j } = await jpost("/api/peptide-comments/create", { slug, content });

    if (j?.ok) {
      setDraft("");
      await refresh();
    } else if (res.status === 401) {
      setStatus("Sign in to add your experience.");
    } else if (j?.error === "too_long") {
      setStatus("Please keep this under 2000 characters.");
    } else {
      setStatus("Could not submit. Try again.");
    }
    setSubmitting(false);
  }

  // Author edit/delete UI requires knowing auth.uid, which we do not expose client-side here yet.
  // We’ll add “me” wiring next step once we confirm your existing viewer endpoint patterns.
  // For now we ship public read + auth write (Blueprint minimum), and we’ll add edit/delete immediately after.

  return (
    <section className="pt-card" id="community">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <h2 style={S.title}>Join the Conversation</h2>
        <a href="#community" style={{ opacity: 0.7, textDecoration: "none", fontWeight: 900 }}>
          #community
        </a>
      </div>

      <p className="pt-card-subtext" style={S.sub}>
        People respond differently to the same peptide.
        <br />
        Share what you noticed — your experience helps build clarity for others.
      </p>

      <div style={{ marginTop: 14 }}>
        <div style={{ fontWeight: 900, marginBottom: 8 }}>Add your experience</div>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What did you notice? Keep it personal — avoid giving directions to others."
          style={S.textArea}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 10 }}>
          <div style={S.note}>Personal experience is welcome. Please avoid instructions, schedules, or directives.</div>
          <button onClick={submit} disabled={!canSubmit || submitting} style={S.smallBtn}>
            {submitting ? "Submitting..." : "Post"}
          </button>
        </div>
        {status ? <div style={{ marginTop: 10, opacity: 0.8, fontWeight: 700 }}>{status}</div> : null}
      </div>

      <div style={{ marginTop: 18 }}>
        {loading ? (
          <p className="pt-card-subtext">Loading…</p>
        ) : comments.length ? (
          <div className="pt-stack" style={{ gap: 10 }}>
            {comments.map((c) => (
              <div key={c.id} className="pt-item" style={{ display: "block" }}>
                <div style={{ fontSize: 13, opacity: 0.7 }}>
                  {new Date(c.created_at).toLocaleString()}
                </div>
                <div style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>{c.content}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 900 }}>Be the first to share your experience</div>
            <p className="pt-card-subtext" style={{ marginTop: 8 }}>
              If you’ve explored this peptide, even a short note helps others learn.
            </p>
          </div>
        )}

        <p className="pt-card-subtext" style={{ marginTop: 14 }}>
          The comments below reflect individual perspectives and individual experiential knowledge. People’s responses can vary,
          so these experiences are best understood as personal observations rather than universal outcomes.
        </p>

        <div style={{ marginTop: 10 }}>
          <Link href="/login" style={{ textDecoration: "none", fontWeight: 900 }}>
            Sign in →
          </Link>
        </div>
      </div>
    </section>
  );
}
