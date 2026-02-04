"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { isStackSaved, saveStack, removeStack } from "@/lib/savedStacks";
import UgcNotesSection from "@/components/UgcNotesSection";

type StackV1 = {
  schema_version: "stack_v1";
  stack_id: string;
  slug: string;
  title: string;
  summary: string;
  goals: string[];
  peptides: string[];
  blends?: string[];
  cautions?: string[];
  goes_well_with?: string[];
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 900,
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid rgba(0,0,0,0.12)",
        background: "rgba(0,0,0,0.02)",
        lineHeight: 1.1,
      }}
    >
      {children}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 900, marginBottom: 10, opacity: 0.85 }}>{title}</div>
      {children}
    </section>
  );
}

export default function StackViewer(props: { stack: StackV1 }) {
  
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      setSaved(isStackSaved(props.stack.slug));
    } catch {
      setSaved(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.stack.slug]);

  function onToggleSave() {
    try {
      if (saved) {
        removeStack(props.stack.slug);
        setSaved(false);
      } else {
        saveStack({
          slug: props.stack.slug,
          title: props.stack.title,
          summary: props.stack.summary,
          peptides: Array.isArray(props.stack.peptides) ? props.stack.peptides : [],
          blends: Array.isArray(props.stack.blends) ? props.stack.blends : [],
        });
        setSaved(true);
      }
    } catch {}
  }

const s = props.stack;
  const peptides = Array.isArray(s.peptides) ? s.peptides : [];
  const blends = Array.isArray(s.blends) ? s.blends : [];
  const goals = Array.isArray(s.goals) ? s.goals : [];
  const cautions = Array.isArray(s.cautions) ? s.cautions : [];
  const goes = Array.isArray(s.goes_well_with) ? s.goes_well_with : [];

  return (
    <main className="pt-page">
      <section className="pt-card">
        <h1 className="pt-card-title" style={{ marginBottom: 8 }}>
          {s.title}
        </h1>

        <div className="pt-card-subtext" style={{ marginTop: 0 }}>
          {s.summary}
        </div>

        <div className="pt-card-subtext" style={{ marginTop: 10 }}>
          Educational only. No dosing, protocols, schedules, or instructions.
        </div>

        {goals.length ? (
          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {goals.map((g) => (
              <Pill key={g}>{g}</Pill>
            ))}
          </div>
        ) : null}
      </section>

      <section className="pt-card">
        <Section title="Stack">
          {peptides.length || blends.length ? (
            <div style={{ display: "grid", gap: 12 }}>
              {peptides.length ? (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 900, opacity: 0.7, marginBottom: 8 }}>Peptides</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {peptides.map((slug) => (
                      <Link key={slug} href={`/peptide/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <Pill>{slug}</Pill>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              {blends.length ? (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 900, opacity: 0.7, marginBottom: 8 }}>Blends</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {blends.map((slug) => (
                      <Link key={slug} href={`/blend/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <Pill>{slug}</Pill>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="pt-card-subtext">No linked items yet.</div>
          )}
        </Section>

        {cautions.length ? (
          <Section title="Cautions">
            <div style={{ display: "grid", gap: 8 }}>
              {cautions.map((t, i) => (
                <div key={i} className="pt-item-note">
                  {t}
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        {goes.length ? (
          <Section title="Goes well with">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {goes.map((slug) => (
                <Link key={slug} href={`/stack/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <Pill>{slug}</Pill>
                </Link>
              ))}
            </div>
          </Section>
        ) : null}
      </section>
          <UgcNotesSection type="stack" slug={props.stack.slug} />
    </main>
  );
}