"use client";

import Link from "next/link";
import { useState } from "react";

type StackItem = { slug: string; kind: string };

type UserStack = {
  id: string;
  name: string;
  goal_id: string | null;
  items: StackItem[];
  created_at: string;
  updated_at: string;
};

interface Props {
  initialStacks: Record<string, unknown>[] | null;
}

function toUserStack(raw: Record<string, unknown>): UserStack {
  return {
    id: String(raw.id ?? ""),
    name: String(raw.name ?? "Unnamed Stack"),
    goal_id: raw.goal_id != null ? String(raw.goal_id) : null,
    items: Array.isArray(raw.items) ? (raw.items as StackItem[]) : [],
    created_at: String(raw.created_at ?? ""),
    updated_at: String(raw.updated_at ?? ""),
  };
}

export default function SavedStacksSection({ initialStacks }: Props) {
  const [stacks, setStacks] = useState<UserStack[]>(
    initialStacks ? initialStacks.map(toUserStack) : []
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    setErrorMsg("");
    try {
      const res = await fetch("/api/stacks/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.ok) {
        setStacks((prev) => prev.filter((s) => s.id !== id));
      } else {
        setErrorMsg("Could not delete stack. Try again.");
      }
    } catch {
      setErrorMsg("Could not delete stack. Try again.");
    } finally {
      setDeletingId(null);
    }
  }

  // Not signed in
  if (initialStacks === null) {
    return (
      <section className="pt-card" style={{ marginTop: 16 }}>
        <div className="pt-card-title" style={{ marginBottom: 6 }}>Saved stacks</div>
        <p className="pt-card-subtext">
          Sign in to save stacks and access them across devices.
        </p>
        <Link href="/login" className="pt-btn" style={{ textDecoration: "none", marginTop: 12, display: "inline-block" }}>
          Sign in &rarr;
        </Link>
      </section>
    );
  }

  return (
    <section className="pt-card" style={{ marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "baseline" }}>
        <div>
          <div className="pt-card-title" style={{ marginBottom: 6 }}>Saved stacks</div>
          <div className="pt-card-subtext">
            Stacks you&rsquo;ve saved in the Stack Builder. Synced to your account.
          </div>
        </div>
        <Link href="/stack-builder" className="pt-btn" style={{ textDecoration: "none" }}>
          Open Stack Builder &rarr;
        </Link>
      </div>

      {stacks.length === 0 ? (
        <div className="pt-item-note" style={{ marginTop: 12 }}>
          No saved stacks yet. Build one in the Stack Builder and save it here.
        </div>
      ) : (
        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          {stacks.map((s) => (
            <div key={s.id} className="pt-item" style={{ padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "baseline" }}>
                <div style={{ fontSize: 15, fontWeight: 950 }}>{s.name}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Link
                    href={`/stack-builder?load=${encodeURIComponent(s.id)}`}
                    className="pt-btn"
                    style={{ textDecoration: "none" }}
                  >
                    Load
                  </Link>
                  <button
                    className="pt-btn"
                    disabled={deletingId === s.id}
                    onClick={() => handleDelete(s.id)}
                  >
                    {deletingId === s.id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>

              {s.goal_id && (
                <div className="pt-item-note" style={{ marginTop: 6 }}>
                  Goal: <strong>{s.goal_id.replace(/_/g, " ")}</strong>
                </div>
              )}

              {s.items.length > 0 && (
                <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.items.map((it) => (
                    <Link
                      key={`${it.kind}:${it.slug}`}
                      href={it.kind === "blend" ? `/blend/${it.slug}` : `/peptide/${it.slug}`}
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "5px 10px",
                        borderRadius: 999,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "rgba(0,0,0,0.02)",
                        display: "inline-flex",
                        gap: 6,
                        alignItems: "center",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {it.slug}
                      <span style={{ fontSize: 10, opacity: 0.55 }}>{it.kind}</span>
                    </Link>
                  ))}
                </div>
              )}

              <div className="pt-item-note" style={{ marginTop: 10, opacity: 0.6 }}>
                Updated {new Date(s.updated_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {errorMsg && (
        <div className="pt-item-note" style={{ marginTop: 12, color: "#ef4444" }}>
          {errorMsg}
        </div>
      )}
    </section>
  );
}
