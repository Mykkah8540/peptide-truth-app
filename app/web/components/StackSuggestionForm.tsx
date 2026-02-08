"use client";

import { useEffect, useMemo, useState } from "react";

type EntityType = "peptide" | "blend";

type Option = { slug: string; title: string };

function norm(s: string) {
 return s.trim().toLowerCase();
}

function makeAutoOutcomes(goal: string, items: { type: EntityType; slug: string; title: string }[]) {
 const g = goal.trim();
 const names = items.map((x) => x.title || x.slug).filter(Boolean);

 const lines: string[] = [];
 if (g) lines.push(`Goal-aligned: ${g}`);
 if (names.length) lines.push(`Synergy narrative: how ${names.slice(0, 5).join(", ")} may complement each other (education only).`);
 lines.push("Expected outcomes are not guaranteed; responses vary by person and context.");
 lines.push("");
 return lines;
}

export default function StackSuggestionForm(props: { ugcSlug: string }) {
 const [peptides, setPeptides] = useState<Option[]>([]);
 const [blends, setBlends] = useState<Option[]>([]);
 const [loadingLists, setLoadingLists] = useState(true);

 const [stackName, setStackName] = useState("");
 const [goal, setGoal] = useState("");
 const [description, setDescription] = useState("");

 const [picked, setPicked] = useState<Array<{ type: EntityType; slug: string; title: string }>>([]);

 const [search, setSearch] = useState("");
 const [includeAuto, setIncludeAuto] = useState(true);

 const [username, setUsername] = useState("");
 const [ack, setAck] = useState(false);

 const [submitState, setSubmitState] = useState<"idle" | "submitting" | "ok" | "error">("idle");
 const [errorMsg, setErrorMsg] = useState("");

 useEffect(() => {
  let ok = true;
  setLoadingLists(true);
  Promise.all([
   fetch("/api/content/peptides").then((r) => r.json()).catch(() => ({})),
   fetch("/api/content/blends").then((r) => r.json()).catch(() => ({})),
  ])
   .then(([pj, bj]) => {
    if (!ok) return;
    setPeptides(Array.isArray(pj?.peptides) ? pj.peptides : []);
    setBlends(Array.isArray(bj?.blends) ? bj.blends : []);
   })
   .finally(() => {
    if (!ok) return;
    setLoadingLists(false);
   });

  return () => {
   ok = false;
  };
 }, []);

 const options = useMemo(() => {
  const q = norm(search);
  const merged: Array<{ type: EntityType; slug: string; title: string }> = [
   ...peptides.map((p) => ({ type: "peptide" as const, slug: p.slug, title: p.title })),
   ...blends.map((b) => ({ type: "blend" as const, slug: b.slug, title: b.title })),
  ];

  const already = new Set(picked.map((x) => `${x.type}:${x.slug}`));

  return merged
   .filter((x) => !already.has(`${x.type}:${x.slug}`))
   .filter((x) => {
    if (!q) return true;
    return norm(x.slug).includes(q) || norm(x.title).includes(q);
   })
   .slice(0, 30);
 }, [search, peptides, blends, picked]);

 const autoOutcomes = useMemo(() => makeAutoOutcomes(goal, picked), [goal, picked]);

 function addItem(x: { type: EntityType; slug: string; title: string }) {
  setPicked((prev) => [...prev, x]);
  setSearch("");
 }

 function removeItem(idx: number) {
  setPicked((prev) => prev.filter((_, i) => i !== idx));
 }

 function buildUgcText() {
  const lines: string[] = [];
  lines.push("[STACK_SUGGESTION_V1]");
  lines.push(`Name: ${stackName.trim() || "(no name provided)"}`);
  lines.push(`Goal: ${goal.trim() || "(no goal provided)"}`);

  if (picked.length) {
   lines.push("Includes:");
   for (const x of picked) {
    lines.push(`- ${x.type}:${x.slug} (${x.title || x.slug})`);
   }
  } else {
   lines.push("Includes: (none selected)");
  }

  if (description.trim()) {
   lines.push("Description:");
   lines.push(description.trim());
  }

  if (includeAuto) {
   lines.push("Expected outcomes (auto-generated):");
   for (const l of autoOutcomes) lines.push(`- ${l}`);
  }

  lines.push("[/STACK_SUGGESTION_V1]");
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
  if (!ack) {
   setErrorMsg("You must acknowledge the no-dosing rule to submit.");
   setSubmitState("error");
   return;
  }

  const payload = {
   type: "stack",
   slug: props.ugcSlug,
   username: username.trim(),
   text: buildUgcText(),
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

  // Keep user's typed idea visible after submit? For now: keep it so they can tweak/submit again.
  setTimeout(() => setSubmitState("idle"), 2500);
 }

 return (
  <section className="pt-card" style={{ marginTop: 14 }}>
   <h2 className="pt-card-title">Your suggestion</h2>
   <div className="pt-card-subtext" style={{ marginTop: 8 }}>
    
   </div>

   <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
    <input
     value={stackName}
     onChange={(e) => setStackName(e.target.value)}
     placeholder="Stack name (creative + searchable)"
     style={{
      width: "100%",
      padding: "10px 12px",
      borderRadius: 10,
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
     }}
    />

    <input
     value={goal}
     onChange={(e) => setGoal(e.target.value)}
     placeholder="Goal (what is this stack trying to do?)"
     style={{
      width: "100%",
      padding: "10px 12px",
      borderRadius: 10,
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
     }}
    />

    <div>
     <div style={{ fontSize: 13, fontWeight: 900, marginBottom: 8 }}>Peptides / blends in this stack</div>

     <div style={{ display: "grid", gap: 10 }}>
      {picked.length ? (
       <div className="pt-stack">
        {picked.map((x, i) => (
         <div key={`${x.type}:${x.slug}`} className="pt-item" style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div>
           <div style={{ fontSize: 13, fontWeight: 900 }}>
            {x.title || x.slug} <span style={{ opacity: 0.7, fontWeight: 700 }}>({x.type}:{x.slug})</span>
           </div>
          </div>
          <button
           onClick={() => removeItem(i)}
           style={{
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.2)",
            background: "rgba(0,0,0,0.03)",
            padding: "6px 10px",
            fontWeight: 900,
            cursor: "pointer",
           }}
          >
           Remove
          </button>
         </div>
        ))}
       </div>
      ) : (
       <div className="pt-item-note">No items added yet.</div>
      )}

      <div style={{ display: "grid", gap: 8 }}>
       <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={loadingLists ? "Loading peptides/blends…" : "Search peptides/blends (type to filter)"}
        disabled={loadingLists}
        style={{
         width: "100%",
         padding: "10px 12px",
         borderRadius: 10,
         border: "1px solid rgba(0,0,0,0.15)",
         fontSize: 14,
        }}
       />

       <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 12, overflow: "hidden" }}>
        {options.length ? (
         <div style={{ maxHeight: 260, overflow: "auto" }}>
          {options.map((o) => (
           <button
            key={`${o.type}:${o.slug}`}
            onClick={() => addItem(o)}
            style={{
             width: "100%",
             textAlign: "left",
             border: 0,
             background: "transparent",
             padding: "10px 12px",
             cursor: "pointer",
             borderBottom: "1px solid rgba(0,0,0,0.08)",
            }}
           >
            <div style={{ fontSize: 13, fontWeight: 900 }}>
             {o.title || o.slug} <span style={{ opacity: 0.7, fontWeight: 700 }}>({o.type})</span>
            </div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>{o.slug}</div>
           </button>
          ))}
         </div>
        ) : (
         <div style={{ padding: "10px 12px", fontSize: 12, opacity: 0.75 }}>
          {loadingLists ? "Loading…" : search.trim() ? "No matches." : "Type to search and add an item."}
         </div>
        )}
       </div>

       <div className="pt-item-note" style={{ marginTop: 6 }}>
        Tip: use search, then click to add. This avoids typos and keeps slugs consistent.
       </div>
      </div>
     </div>
    </div>

    <textarea
     value={description}
     onChange={(e) => setDescription(e.target.value)}
     placeholder="Description (why these pair well, what context, what to watch for — no protocols)"
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

    <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 12, padding: 12 }}>
     <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <div style={{ fontSize: 13, fontWeight: 900 }}>Expected outcomes (auto-generated)</div>
      <label style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13, opacity: 0.9 }}>
       <input type="checkbox" checked={includeAuto} onChange={(e) => setIncludeAuto(e.target.checked)} />
       <span>Include this in submission</span>
      </label>
     </div>

     <div style={{ marginTop: 10 }}>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
       {autoOutcomes.map((l, i) => (
        <li key={i} style={{ fontSize: 13, opacity: 0.9, marginBottom: 6 }}>
         {l}
        </li>
       ))}
      </ul>
     </div>
    </div>

    <div style={{ marginTop: 4 }}>
     <div style={{ fontSize: 13, fontWeight: 900, marginBottom: 8 }}>Submit</div>

     <div style={{ display: "grid", gap: 10 }}>
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
       {submitState === "submitting" ? "Submitting…" : "Submit suggestion"}
      </button>

      <details style={{ marginTop: 6 }}>
       <summary style={{ fontSize: 12, opacity: 0.8, cursor: "pointer" }}>Preview what gets submitted</summary>
       <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, opacity: 0.9, marginTop: 10 }}>
{buildUgcText()}
       </pre>
      </details>
     </div>
    </div>
   </div>
  </section>
 );
}
