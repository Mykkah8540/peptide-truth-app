"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Goal = {
 goal_id: string;
 title: string;
 description?: string;
 topic_ids: string[];
};

type TopicGroup = {
 group_id?: string;
 title: string;
 description?: string;
 peptides?: string[];
 blends?: string[];
};

type TopicCard = {
 slug: string;
 title: string;
 introText?: string;
 groups: TopicGroup[];
 missing?: boolean;
};

function Pill({ children }: { children: React.ReactNode }) {
 return (
  <span
   style={{
    fontSize: 12,
    fontWeight: 800,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(0,0,0,0.02)",
   }}
  >
   {children}
  </span>
 );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
 return (
  <section style={{ marginTop: 18 }}>
   <h2 style={{ margin: "0 0 10px 0", fontSize: 16, fontWeight: 900 }}>{title}</h2>
   {children}
  </section>
 );
}

export default function StackBuilderClient(props: {
 goals: Goal[];
 topics: TopicCard[];
}) {
 const [selectedGoalId, setSelectedGoalId] = useState<string>(props.goals[0]?.goal_id ?? "");
 const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

 const selectedGoal = useMemo(
  () => props.goals.find((g) => g.goal_id === selectedGoalId) ?? null,
  [props.goals, selectedGoalId]
 );

 const selectedTopics = useMemo(() => {
  const ids = new Set(selectedGoal?.topic_ids ?? []);
  return props.topics.filter((t) => ids.has(t.slug));
 }, [props.topics, selectedGoal]);

 const missingTopics = useMemo(() => {
  const ids = selectedGoal?.topic_ids ?? [];
  const present = new Set(props.topics.map((t) => t.slug));
  return ids.filter((id) => !present.has(id));
 }, [props.topics, selectedGoal]);

 return (
  <main style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px" }}>
   <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Stack Builder</h1>
   <p style={{ opacity: 0.75, marginTop: 8 }}>
    This is an educational recommender. It routes you to topic pages + peptide groups and highlights safety context.
    
   </p>

   <Section title="Pick a goal">
    <div style={{ display: "grid", gap: 10 }}>
     {props.goals.map((g) => {
      const active = g.goal_id === selectedGoalId;
      return (
       <button
        key={g.goal_id}
        onClick={() => setSelectedGoalId(g.goal_id)}
        style={{
         textAlign: "left",
         padding: 14,
         borderRadius: 14,
         border: active ? "2px solid rgba(0,0,0,0.35)" : "1px solid rgba(0,0,0,0.12)",
         background: active ? "rgba(0,0,0,0.03)" : "#fff",
         cursor: "pointer",
        }}
       >
        <div style={{ fontWeight: 900, fontSize: 15 }}>{g.title}</div>
        {g.description ? <div style={{ marginTop: 4, opacity: 0.75, fontSize: 13 }}>{g.description}</div> : null}
        <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 8 }}>
         {(g.topic_ids ?? []).map((t) => (
          <Pill key={t}>{t}</Pill>
         ))}
        </div>
       </button>
      );
     })}
    </div>
   </Section>

   <Section title="Recommended topic routes">
    {selectedGoal ? (
     <div style={{ display: "grid", gap: 12 }}>
      {selectedTopics.map((t) => (
       <div
        key={t.slug}
        style={{
         padding: 14,
         borderRadius: 14,
         border: "1px solid rgba(0,0,0,0.12)",
         background: "#fff",
        }}
       >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
         <div style={{ fontWeight: 900, fontSize: 15 }}>{t.title}</div>
         <Link href={`/topic/${t.slug}`} style={{ fontSize: 13, fontWeight: 800, textDecoration: "none" }}>
          Open →
         </Link>
        </div>

        {t.introText ? <div style={{ marginTop: 6, opacity: 0.8, fontSize: 13 }}>{t.introText}</div> : null}

        {t.groups?.length ? (
         <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          {t.groups.map((g, idx) => {
           const key = `${t.slug}::${g.group_id ?? idx}`;
           const isOpen = !!openGroups[key];
           const peptides = Array.isArray(g.peptides) ? g.peptides : [];
           const blends = Array.isArray(g.blends) ? g.blends : [];

           return (
            <div
             key={key}
             style={{
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.10)",
              background: "rgba(0,0,0,0.015)",
             }}
            >
             <button
              onClick={() => setOpenGroups((s) => ({ ...s, [key]: !s[key] }))}
              style={{
               width: "100%",
               textAlign: "left",
               padding: "10px 12px",
               border: "none",
               background: "transparent",
               cursor: "pointer",
               display: "flex",
               justifyContent: "space-between",
               gap: 10,
               alignItems: "baseline",
              }}
             >
              <div style={{ fontWeight: 900, fontSize: 14 }}>{g.title}</div>
              <div style={{ fontWeight: 900, fontSize: 12, opacity: 0.7 }}>{isOpen ? "Hide" : "Show"}</div>
             </button>

             {isOpen ? (
              <div style={{ padding: "0 12px 12px 12px", display: "grid", gap: 10 }}>
               {g.description ? (
                <div style={{ fontSize: 13, opacity: 0.8 }}>{g.description}</div>
               ) : null}

               {peptides.length ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                 {peptides.map((s) => (
                  <Link
                   key={s}
                   href={`/peptide/${s}`}
                   style={{ textDecoration: "none", color: "inherit" }}
                  >
                   <Pill>{s}</Pill>
                  </Link>
                 ))}
                </div>
               ) : null}

               {blends.length ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                 {blends.map((s) => (
                  <Link
                   key={s}
                   href={`/blend/${s}`}
                   style={{ textDecoration: "none", color: "inherit" }}
                  >
                   <Pill>{s}</Pill>
                  </Link>
                 ))}
                </div>
               ) : null}

               {!peptides.length && !blends.length ? (
                <div style={{ fontSize: 13, opacity: 0.7 }}>No linked peptides/blends in this group yet.</div>
               ) : null}
              </div>
             ) : null}
            </div>
           );
          })}
         </div>
        ) : (
         <div style={{ marginTop: 10, fontSize: 13, opacity: 0.7 }}>
          No peptide groups found for this topic yet.
         </div>
        )}
       </div>
      ))}

      {missingTopics.length ? (
       <div style={{ padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)", background: "#fff" }}>
        <div style={{ fontWeight: 900, fontSize: 14, marginBottom: 8 }}>Missing topic pages</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
         {missingTopics.map((t) => (
          <Pill key={t}>{t}</Pill>
         ))}
        </div>
        <div style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>
         These are referenced by the goal mapping but don’t exist under <code>content/topics/pages</code> yet.
        </div>
       </div>
      ) : null}
     </div>
    ) : (
     <p style={{ opacity: 0.7 }}>No goal selected.</p>
    )}
   </Section>
  </main>
 );
}
