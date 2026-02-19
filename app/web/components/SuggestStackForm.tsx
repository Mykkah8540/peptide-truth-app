"use client";

import { useEffect, useMemo, useState } from "react";

type Option = { type: "peptide" | "blend"; slug: string; title: string };

type IncludeRow = { id: string; type: "peptide" | "blend"; slug: string };

function uid() {
 return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function normalize(s: string) {
 return String(s || "").trim().toLowerCase();
}

function generateOutcomes(goal: string, includes: Option[]): string[] {
 const g = normalize(goal);
 const out: string[] = [];

 if (!g) {
  out.push("Improved overall well-being and resilience (educational discussion).");
 } else {
  if (g.includes("sleep")) out.push("Improved sleep quality and recovery (subjective).");
   }

 // NOTE: keep generator simple + safe (no prescriptive directives / no personalized instruction). Keyword-based only.
 if (g.includes("sleep")) out.push("Improved sleep quality and recovery (subjective).");
 if (g.includes("recovery") || g.includes("injury") || g.includes("heal")) out.push("Support for recovery processes and comfort (educational).");
 if (g.includes("focus") || g.includes("cognitive") || g.includes("brain")) out.push("Improved focus/clarity (subjective).");
 if (g.includes("fat") || g.includes("weight") || g.includes("cut")) out.push("Support for weight-management goals (context varies).");
 if (g.includes("skin") || g.includes("hair") || g.includes("beauty")) out.push("Support for skin/hair appearance goals (subjective).");
 if (g.includes("immune")) out.push("Support for immune resilience (educational).");
 if (g.includes("energy") || g.includes("motivation")) out.push("Improved day-to-day energy and motivation (subjective).");

 // Always include a synergy framing line
 if (includes.length >= 2) out.push("Synergy-first combination: each component supports a distinct angle toward the goal.");

 // De-dupe + cap
 const seen = new Set<string>();
 const final = [];
 for (const v of out) {
  const k = normalize(v);
  if (k && !seen.has(k)) {
   seen.add(k);
   final.push(v);
  }
  if (final.length >= 6) break;
 }
 return final;
}

export default function SuggestStackForm() {
 const [loadingOptions, setLoadingOptions] = useState(true);
 const [options, setOptions] = useState<Option[]>([]);

 const [username, setUsername] = useState("");
 const [stackName, setStackName] = useState("");
 const [goal, setGoal] = useState("");
 const [description, setDescription] = useState("");

 const [ack, setAck] = useState(false);

 const [rows, setRows] = useState<IncludeRow[]>([
  { id: uid(), type: "peptide", slug: "" },
 ]);

 const [outcomes, setOutcomes] = useState<string[]>([]);
 const [includeOutcomes, setIncludeOutcomes] = useState(true);

 const [submitState, setSubmitState] = useState<"idle" | "submitting" | "ok" | "error">("idle");
 const [errorMsg, setErrorMsg] = useState("");

 useEffect(() => {
  let ok = true;
  setLoadingOptions(true);

  Promise.all([
   fetch("/api/content/peptides").then((r) => r.json()).catch(() => null),
   fetch("/api/content/blends").then((r) => r.json()).catch(() => null),
  ])
   .then(([peps, blends]) => {
    if (!ok) return;

    const pepList: Option[] = Array.isArray(peps?.items)
     ? peps.items
       .map((x: any) => ({
        type: "peptide" as const,
        slug: String(x?.slug || "").trim(),
        title: String(x?.title || x?.name || x?.slug || "").trim(),
       }))
       .filter((x: Option) => Boolean(x.slug && x.title))
     : [];

    const blendList: Option[] = Array.isArray(blends?.items)
     ? blends.items
       .map((x: any) => ({
        type: "blend" as const,
        slug: String(x?.slug || "").trim(),
        title: String(x?.title || x?.name || x?.slug || "").trim(),
       }))
       .filter((x: Option) => Boolean(x.slug && x.title))
     : [];

    // Stable sort by title
    const combined = [...pepList, ...blendList].sort((a, b) => a.title.localeCompare(b.title));
    setOptions(combined);
   })
   .finally(() => {
    if (!ok) return;
    setLoadingOptions(false);
   });

  return () => {
   ok = false;
  };
 }, []);

 const optionsByType = useMemo(() => {
  const peps = options.filter((o) => o.type === "peptide");
  const blends = options.filter((o) => o.type === "blend");
  const map = new Map<string, Option>();
  for (const o of options) map.set(`${o.type}:${o.slug}`, o);
  return { peps, blends, map };
 }, [options]);

 function addRow() {
  setRows((prev) => [...prev, { id: uid(), type: "peptide", slug: "" }]);
 }

 function removeRow(id: string) {
  setRows((prev) => (prev.length <= 1 ? prev : prev.filter((r) => r.id !== id)));
 }

 function setRow(id: string, patch: Partial<IncludeRow>) {
  setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
 }

 function buildStructuredText(validIncludes: Option[]) {
  const lines: string[] = [];
  lines.push("[STACK_SUGGESTION_V1]");
  lines.push(`Name: ${stackName.trim()}`);
  lines.push(`Goal: ${goal.trim()}`);
  lines.push("Includes:");
  for (const inc of validIncludes) {
   lines.push(`- ${inc.type}: ${inc.slug} (${inc.title})`);
  }
  lines.push("Description:");
  lines.push(description.trim() || "(none)");
  if (includeOutcomes && outcomes.length) {
   lines.push("Expected outcomes:");
   for (const v of outcomes) lines.push(`- ${v}`);
  }
  lines.push("[/STACK_SUGGESTION_V1]");
  return lines.join("\n");
 }

 async function submit() {
  
  // NOTE: Stack community submissions are not wired yet.
  // UGC backend currently supports entityType: "peptide" | "blend" only.
  setErrorMsg("Stack community is coming soon. For now, stack submissions are disabled while the data model + moderation flow are finalized.");
  setSubmitState("error");
  return;

  setErrorMsg("");

  if (!username.trim()) {
   setErrorMsg("Username is required.");
   setSubmitState("error");
   return;
  }
  if (!ack) {
   setErrorMsg("You must acknowledge the non-directive rule to submit.");
   setSubmitState("error");
   return;
  }
  if (!stackName.trim()) {
   setErrorMsg("Stack name is required.");
   setSubmitState("error");
   return;
  }
  if (!goal.trim()) {
   setErrorMsg("Goal is required.");
   setSubmitState("error");
   return;
  }

  // Validate includes against canonical options to avoid typos
  const validIncludes: Option[] = [];
  for (const r of rows) {
   const slug = String(r.slug || "").trim();
   if (!slug) continue;
   const hit = optionsByType.map.get(`${r.type}:${slug}`);
   if (hit !== undefined) validIncludes.push(hit as Option);
  }

  if (!validIncludes.length) {
   setErrorMsg("Pick at least one peptide or blend from the list.");
   setSubmitState("error");
   return;
  }

  const payload = {
   type: "stack",
   slug: "__global__",
   username: username.trim(),
   text: buildStructuredText(validIncludes),
   ack_no_dosing: true,
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
    setErrorMsg("Looks like your text contains prescriptive or how-to language (dosing, schedules, reconstitution, injection). Remove it to submit.");
   } else if (err === "ack_required") {
    setErrorMsg("You must acknowledge the non-directive rule to submit.");
   } else {
    setErrorMsg("Could not submit. Check required fields.");
   }
   setSubmitState("error");
   return;
  }

  setSubmitState("ok");

  // Reset form (keep username)
  setStackName("");
  setGoal("");
  setDescription("");
  setRows([{ id: uid(), type: "peptide", slug: "" }]);
  setOutcomes([]);
  setIncludeOutcomes(true);
  setAck(false);

  setTimeout(() => setSubmitState("idle"), 2500);
 }

 function onGenerateOutcomes() {
  // Build from currently selected canonical includes
  const picked: Option[] = [];
  for (const r of rows) {
   const slug = String(r.slug || "").trim();
   if (!slug) continue;
   const hit = optionsByType.map.get(`${r.type}:${slug}`);
   if (hit) picked.push(hit);
  }
  const gen = generateOutcomes(goal, picked);
  setOutcomes(gen);
  setIncludeOutcomes(true);
 }

 return (
  <section className="pt-card">
   <h2 className="pt-card-title">Suggest a stack</h2>
   <div className="pt-card-subtext" style={{ marginTop: 8 }}>

   </div>

   <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
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
     placeholder="Stack name (required)"
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
     placeholder="Goal (required) — e.g., sleep recovery, injury recovery, skin support"
     style={{
      width: "100%",
      padding: "10px 12px",
      borderRadius: 10,
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
     }}
    />

    <div style={{ display: "grid", gap: 10 }}>
     <div style={{ fontSize: 13, fontWeight: 900 }}>Includes</div>

     {loadingOptions ? (
      <div className="pt-item-note">Loading peptide/blend list…</div>
     ) : (
      <div style={{ display: "grid", gap: 10 }}>
       {rows.map((r, idx) => (
        <div key={r.id} style={{ display: "grid", gap: 8, padding: 12, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)" }}>
         <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 900 }}>Item {idx + 1}</div>

          <select
           value={r.type}
           onChange={(e) => setRow(r.id, { type: e.target.value === "blend" ? "blend" : "peptide", slug: "" })}
           style={{
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.15)",
            fontSize: 13,
            fontWeight: 800,
           }}
          >
           <option value="peptide">Peptide</option>
           <option value="blend">Blend</option>
          </select>

          <button
           onClick={() => removeRow(r.id)}
           disabled={rows.length <= 1}
           style={{
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.15)",
            fontSize: 13,
            fontWeight: 900,
            background: "rgba(0,0,0,0.03)",
            cursor: rows.length <= 1 ? "not-allowed" : "pointer",
            opacity: rows.length <= 1 ? 0.6 : 1,
           }}
           title="Remove this row"
          >
           Remove
          </button>
         </div>

         {/* Searchable selection (datalist). Value stored as slug to keep it canonical. */}
         <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 900 }}>Pick from list (prevents typos)</div>

          <input
           list={`pt-opt-${r.id}`}
           value={r.slug}
           onChange={(e) => setRow(r.id, { slug: e.target.value })}
           placeholder={r.type === "blend" ? "Start typing a blend slug…" : "Start typing a peptide slug…"}
           style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.15)",
            fontSize: 14,
           }}
          />
          <datalist id={`pt-opt-${r.id}`}>
           {(r.type === "blend" ? optionsByType.blends : optionsByType.peps).map((o) => (
            <option key={`${o.type}:${o.slug}`} value={o.slug}>
             {o.title}
            </option>
           ))}
          </datalist>

          <div className="pt-item-note" style={{ marginTop: 2 }}>
           Tip: choose an option from the dropdown so the slug is guaranteed correct.
          </div>
         </div>
        </div>
       ))}

       <button
        onClick={() => addRow()}
        style={{
         padding: "10px 12px",
         borderRadius: 12,
         border: "1px solid rgba(0,0,0,0.2)",
         fontSize: 14,
         fontWeight: 900,
         background: "rgba(0,0,0,0.03)",
         cursor: "pointer",
         justifySelf: "start",
        }}
       >
        Add another peptide/blend →
       </button>
      </div>
     )}
    </div>

    <textarea
     value={description}
     onChange={(e) => setDescription(e.target.value)}
     placeholder="Description (why this stack, synergy logic, cautions at a high level — no prescriptive directives)"
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

    <div style={{ display: "grid", gap: 10, padding: 12, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)" }}>
     <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <div style={{ fontSize: 13, fontWeight: 900 }}>Expected outcomes (optional)</div>

      <button
       onClick={() => onGenerateOutcomes()}
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
       Generate outcomes →
      </button>
     </div>

     <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, opacity: 0.9 }}>
      <input type="checkbox" checked={includeOutcomes} onChange={(e) => setIncludeOutcomes(e.target.checked)} />
      <span>Include outcomes in submission</span>
     </label>

     {outcomes.length ? (
      <div style={{ display: "grid", gap: 6 }}>
       {outcomes.map((v, i) => (
        <div key={i} style={{ fontSize: 13, opacity: 0.9 }}>
         • {v}
        </div>
       ))}
      </div>
     ) : (
      <div className="pt-item-note">No generated outcomes yet.</div>
     )}
    </div>

    <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, opacity: 0.9 }}>
     <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />
     <span>I understand: no prescriptive directives or personalized instruction (including dosing, schedules, reconstitution, injection).</span>
    </label>

    {submitState === "ok" ? <div style={{ fontSize: 13, fontWeight: 900 }}>Submitted for review.</div> : null}
    {submitState === "error" ? <div style={{ fontSize: 13, fontWeight: 900 }}>{errorMsg}</div> : null}

    <button
     onClick={() => submit()}
     disabled={submitState === "submitting" || loadingOptions}
     style={{
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid rgba(0,0,0,0.2)",
      fontSize: 14,
      fontWeight: 900,
      background: "rgba(0,0,0,0.03)",
      cursor: "pointer",
      justifySelf: "start",
     }}
    >
     {submitState === "submitting" ? "Submitting…" : "Submit suggestion"}
    </button>
   </div>
  </section>
 );
}
