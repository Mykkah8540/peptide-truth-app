"use client";

import { useEffect, useMemo, useState } from "react";

type EntityKind = "peptide" | "blend";

type EntityOption = {
  kind: EntityKind;
  slug: string;
  title: string;
};

type Goal =
  | "sleep"
  | "recovery"
  | "focus"
  | "energy"
  | "metabolic"
  | "inflammation"
  | "gut"
  | "skin_hair"
  | "longevity"
  | "performance"
  | "other";

const GOAL_LABELS: Record<Goal, string> = {
  sleep: "Sleep / Rest",
  recovery: "Recovery",
  focus: "Focus / Cognition",
  energy: "Energy / Motivation",
  metabolic: "Metabolic support",
  inflammation: "Inflammation / Joint support",
  gut: "Gut / GI support",
  skin_hair: "Skin / Hair",
  longevity: "Longevity / Aging",
  performance: "Performance / Training",
  other: "Other",
};

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function makeOutcomesDraft(description: string, stackName: string, selected: EntityOption[], goal: Goal) {
  // This does NOT make medical claims. It summarizes user intent only.
  const desc = description.trim();
  const name = stackName.trim();
  const items = selected.map((x) => x.title).filter(Boolean);

  const parts: string[] = [];
  if (name) parts.push(`"${name}"`);
  if (items.length) parts.push(`(${items.join(", ")})`);

  const header = parts.length ? `Draft summary for ${parts.join(" ")}:` : `Draft summary:`;

  const goalLine = goal ? `User-selected goal: ${GOAL_LABELS[goal]}.` : `User-selected goal: (none).`;

  const t = normalize(desc);
  const intents: string[] = [];
  const add = (label: string, match: RegExp) => {
    if (match.test(t) && !intents.includes(label)) intents.push(label);
  };

  add("recovery", /\brecover|recovery|soreness|fatigue\b/);
  add("sleep", /\bsleep|insomnia|rest\b/);
  add("focus", /\bfocus|cognition|brain|clarity|adhd\b/);
  add("energy", /\benergy|motivation|drive\b/);
  add("metabolic support", /\bmetabolic|glucose|insulin|fat loss|weight\b/);
  add("inflammation support", /\binflammation|pain|joint\b/);
  add("gut support", /\bgut|gi|stomach|ibd|crohn|colitis\b/);
  add("skin/hair support", /\bskin|hair|collagen|glow\b/);

  const intentLine =
    intents.length ? `Keywords detected in description: ${intents.join(", ")}.` : `Keywords detected in description: (none).`;

  return [header, goalLine, intentLine, `User description (verbatim): ${desc ? `"${desc}"` : "(none)"}`].join("\n");
}

export default function StackSuggestionForm(props: { ugcSlug: string }) {
  const [options, setOptions] = useState<EntityOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const [username, setUsername] = useState("");
  const [ack, setAck] = useState(false);

  const [stackName, setStackName] = useState("");
  const [goal, setGoal] = useState<Goal>("recovery");

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<EntityOption[]>([]);
  const [description, setDescription] = useState("");

  const [includeOutcomes, setIncludeOutcomes] = useState(false);
  const outcomesDraft = useMemo(
    () => makeOutcomesDraft(description, stackName, selected, goal),
    [description, stackName, selected, goal]
  );

  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    let ok = true;
    setLoadingOptions(true);

    Promise.all([fetch("/api/content/peptides").then((r) => r.json()), fetch("/api/content/blends").then((r) => r.json())])
      .then(([pj, bj]) => {
        if (!ok) return;

        const peptides = (Array.isArray(pj?.peptides) ? pj.peptides : []).map((p: any) => ({
          kind: "peptide" as const,
          slug: String(p.slug),
          title: String(p.title || p.slug),
        }));

        const blends = (Array.isArray(bj?.blends) ? bj.blends : []).map((b: any) => ({
          kind: "blend" as const,
          slug: String(b.slug),
          title: String(b.title || b.slug),
        }));

        const merged = [...peptides, ...blends].sort((a, b) => a.title.localeCompare(b.title));
        setOptions(merged);
      })
      .catch(() => {
        if (!ok) return;
        setOptions([]);
      })
      .finally(() => {
        if (!ok) return;
        setLoadingOptions(false);
      });

    return () => {
      ok = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return options.slice(0, 50);

    const out = options.filter((o) => {
      const a = normalize(o.title);
      const b = normalize(o.slug);
      return a.includes(q) || b.includes(q);
    });

    return out.slice(0, 80);
  }, [options, query]);

  function addItem(o: EntityOption) {
    if (selected.some((x) => x.kind === o.kind && x.slug === o.slug)) return;
    setSelected((prev) => [...prev, o]);
    setQuery("");
  }

  function removeItem(kind: EntityKind, slug: string) {
    setSelected((prev) => prev.filter((x) => !(x.kind === kind && x.slug === slug)));
  }

  function buildSubmissionText() {
    const peptides = selected.filter((x) => x.kind === "peptide");
    const blends = selected.filter((x) => x.kind === "blend");

    const lines: string[] = [];
    lines.push("STACK SUGGESTION");
    lines.push("");
    lines.push(`Stack name: ${stackName.trim() || "(none)"}`);
    lines.push(`Goal: ${GOAL_LABELS[goal]}`);
    lines.push(
      `Peptides: ${
        peptides.length ? peptides.map((p) => `${p.title} (${p.slug})`).join(", ") : "(none)"
      }`
    );
    lines.push(
      `Blends: ${
        blends.length ? blends.map((b) => `${b.title} (${b.slug})`).join(", ") : "(none)"
      }`
    );
    lines.push("");
    lines.push("Description:");
    lines.push(description.trim() || "(none)");
    if (includeOutcomes) {
      lines.push("");
      lines.push("Expected outcomes (user-intent draft):");
      lines.push(outcomesDraft);
    }
    return lines.join("\n");
  }

  async function submit() {
    setSubmitState("submitting");
    setErrorMsg("");

    if (!username.trim()) {
      setErrorMsg("Username is required.");
      setSubmitState("error");
      return;
    }
    if (!stackName.trim()) {
      setErrorMsg("Stack name is required.");
      setSubmitState("error");
      return;
    }
    if (!selected.length) {
      setErrorMsg("Please select at least one peptide or blend.");
      setSubmitState("error");
      return;
    }
    if (!description.trim()) {
      setErrorMsg("Description is required.");
      setSubmitState("error");
      return;
    }
    if (!ack) {
      setErrorMsg("You must acknowledge the no-dosing rule to submit.");
      setSubmitState("error");
      return;
    }

    const payload = {
      type: "stack",
      slug: props.ugcSlug,
      username: username.trim(),
      text: buildSubmissionText(),
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
        setErrorMsg("Looks like your submission contains dosing/protocol language. Remove it to submit.");
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
    setAck(false);
    setStackName("");
    setGoal("recovery");
    setQuery("");
    setSelected([]);
    setDescription("");
    setIncludeOutcomes(false);

    setTimeout(() => setSubmitState("idle"), 2500);
  }

  return (
    <section className="pt-card">
      <h2 className="pt-card-title" style={{ margin: 0 }}>
        Suggest a Stack
      </h2>

      <p className="pt-card-subtext" style={{ marginTop: 10 }}>
        Suggest a synergy-first combo (peptides and/or blends). Educational only — no dosing, protocols, schedules, or instructions.
        Submissions are moderated before appearing.
      </p>

      <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
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

        <input
          value={stackName}
          onChange={(e) => setStackName(e.target.value)}
          placeholder="Stack name (required) — make it searchable"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.15)",
            fontSize: 14,
          }}
        />

        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 900 }}>Primary goal (required)</div>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as Goal)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.15)",
              fontSize: 14,
              background: "white",
            }}
          >
            {Object.keys(GOAL_LABELS).map((k) => {
              const key = k as Goal;
              return (
                <option key={key} value={key}>
                  {GOAL_LABELS[key]}
                </option>
              );
            })}
          </select>
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 900 }}>Peptides + blends in this stack (required)</div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={loadingOptions ? "Loading options…" : "Search peptides or blends by name or slug"}
            disabled={loadingOptions}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.15)",
              fontSize: 14,
            }}
          />

          {query.trim() && filtered.length ? (
            <div
              style={{
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 10,
                overflow: "hidden",
                background: "rgba(0,0,0,0.02)",
              }}
            >
              {filtered.map((o) => (
                <button
                  key={`${o.kind}:${o.slug}`}
                  type="button"
                  onClick={() => addItem(o)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 12px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                    <div style={{ fontWeight: 900 }}>{o.title}</div>
                    <div style={{ fontSize: 11, fontWeight: 900, opacity: 0.8 }}>{o.kind.toUpperCase()}</div>
                  </div>
                  <div style={{ opacity: 0.7 }}>{o.slug}</div>
                </button>
              ))}
            </div>
          ) : null}

          {selected.length ? (
            <div className="pt-stack" style={{ marginTop: 6 }}>
              {selected.map((o) => (
                <div
                  key={`${o.kind}:${o.slug}`}
                  className="pt-item"
                  style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
                >
                  <div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <div style={{ fontSize: 13, fontWeight: 900 }}>{o.title}</div>
                      <div style={{ fontSize: 11, fontWeight: 900, opacity: 0.75 }}>{o.kind.toUpperCase()}</div>
                    </div>
                    <div className="pt-item-note" style={{ marginTop: 4 }}>
                      {o.slug}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(o.kind, o.slug)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: "1px solid rgba(0,0,0,0.2)",
                      fontSize: 12,
                      fontWeight: 900,
                      background: "rgba(0,0,0,0.03)",
                      cursor: "pointer",
                      height: 36,
                      alignSelf: "center",
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="pt-item-note">Nothing selected yet. Search above, then click to add.</div>
          )}

          <div className="pt-item-note">Tip: add more by searching again — no typing errors.</div>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (required): goal, why these pair well, what you’re trying to support (no dosing/protocols)"
          rows={6}
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
          <input type="checkbox" checked={includeOutcomes} onChange={(e) => setIncludeOutcomes(e.target.checked)} />
          <span>Include “Expected outcomes” draft (auto-generated summary of your description).</span>
        </label>

        {includeOutcomes ? (
          <pre
            style={{
              whiteSpace: "pre-wrap",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.12)",
              padding: "10px 12px",
              background: "rgba(0,0,0,0.02)",
              fontSize: 12,
              lineHeight: 1.35,
              margin: 0,
            }}
          >
            {outcomesDraft}
          </pre>
        ) : null}

        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, opacity: 0.9 }}>
          <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />
          <span>I understand: dosing/protocol details are not allowed and will be rejected.</span>
        </label>

        {submitState === "ok" ? <div style={{ fontSize: 13, fontWeight: 800 }}>Submitted for review.</div> : null}
        {submitState === "error" ? <div style={{ fontSize: 13, fontWeight: 800 }}>{errorMsg}</div> : null}

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
          {submitState === "submitting" ? "Submitting…" : "Submit stack suggestion"}
        </button>
      </div>
    </section>
  );
}
