"use client";

import { useEffect, useMemo, useState } from "react";
import BackHomeLink from "@/components/BackHomeLink";

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */

export type CompoundOption = {
  slug: string;
  name: string;
  kind: "peptide" | "blend";
  taxonomy_keys: string[];
  risk_score: number;
  risk_tier: "low" | "moderate" | "high" | null;
  evidence_grade: string | null;
};

type GoalOption = { goal_id: string; title: string };

type InitialStack = {
  id: string;
  name: string;
  goal_id: string | null;
  items: { slug: string; kind: string }[];
};

interface Props {
  compounds: CompoundOption[];
  goals: GoalOption[];
  initialStack?: InitialStack | null;
}

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */

const TAXONOMY_LABELS: Record<string, string> = {
  metabolic_weight:              "Metabolic & Weight",
  muscle_performance:            "Muscle & Performance",
  regenerative_repair:           "Recovery & Repair",
  endocrine_hormonal:            "Hormonal",
  neurocognitive_mood:           "Brain & Mood",
  mitochondrial_longevity:       "Longevity",
  immunomodulatory_inflammation: "Immune",
  sexual_health_reproduction:    "Sexual Health",
  cosmetic_topical:              "Skin & Cosmetic",
  sleep_circadian:               "Sleep",
  antimicrobial_innate:          "Antimicrobial",
};

const TAXONOMY_ORDER = Object.keys(TAXONOMY_LABELS);

const GOAL_TAXONOMY_MAP: Record<string, string[]> = {
  fat_loss:       ["metabolic_weight"],
  recovery:       ["regenerative_repair", "muscle_performance"],
  gut:            ["immunomodulatory_inflammation", "regenerative_repair"],
  cognition_mood: ["neurocognitive_mood"],
  sleep:          ["sleep_circadian", "neurocognitive_mood"],
  skin_hair:      ["cosmetic_topical", "regenerative_repair"],
  longevity:      ["mitochondrial_longevity", "endocrine_hormonal"],
};

const GRADE_SHORT: Record<string, string> = {
  regulatory_label:     "Approved",
  rct_meta:             "Meta-RCT",
  rct:                  "RCT",
  human_interventional: "Human",
  human_observational:  "Observational",
  animal:               "Animal",
  in_vitro:             "In vitro",
  mechanistic_only:     "Mechanistic",
  unknown:              "Unknown",
};

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */

function suggestionScore(
  c: CompoundOption,
  stackItems: CompoundOption[],
  goalId: string | null
): number {
  let score = 0;
  const inStackKeys = new Set(stackItems.flatMap((s) => s.taxonomy_keys));

  const newKeys = c.taxonomy_keys.filter((k) => !inStackKeys.has(k));
  score += newKeys.length * 3;

  if (stackItems.length > 0 && c.taxonomy_keys.every((k) => inStackKeys.has(k))) {
    score -= 5;
  }

  if (c.risk_tier === "low") score += 2;
  if (c.risk_tier === "high") score -= 2;

  if (goalId) {
    const goalKeys = GOAL_TAXONOMY_MAP[goalId] ?? [];
    if (goalKeys.some((k) => c.taxonomy_keys.includes(k))) score += 4;
  }

  return score;
}

function RiskDot({ tier }: { tier: "low" | "moderate" | "high" | null }) {
  const cls = tier === "low"
    ? "sb2__risk-dot sb2__risk-dot--low"
    : tier === "high"
    ? "sb2__risk-dot sb2__risk-dot--high"
    : "sb2__risk-dot sb2__risk-dot--moderate";
  const label = tier ?? "unknown";
  return <span className={cls} title={`Risk: ${label}`} aria-label={`Risk ${label}`} />;
}

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */

export default function StackBuilderV2({ compounds, goals, initialStack }: Props) {
  const [stackItems, setStackItems] = useState<CompoundOption[]>([]);
  const [stackName, setStackName] = useState("My Stack");
  const [goalId, setGoalId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const [savedStackId, setSavedStackId] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [showSubmitPanel, setShowSubmitPanel] = useState(false);
  const [mobileView, setMobileView] = useState<"browse" | "stack">("browse");

  // Hydrate from initialStack (loaded via ?load=<id>)
  useEffect(() => {
    if (!initialStack) return;
    const slugSet = new Map(compounds.map((c) => [c.slug, c]));
    const hydrated = initialStack.items
      .map((i) => slugSet.get(i.slug))
      .filter((c): c is CompoundOption => !!c);
    setStackItems(hydrated);
    setStackName(initialStack.name);
    setGoalId(initialStack.goal_id ?? null);
    setSavedStackId(initialStack.id);
  }, [initialStack, compounds]);

  /* ── Derived state ── */

  const slugsInStack = useMemo(() => new Set(stackItems.map((s) => s.slug)), [stackItems]);

  const filteredCompounds = useMemo(() => {
    const q = search.toLowerCase();
    return compounds
      .filter((c) => !slugsInStack.has(c.slug))
      .filter((c) => !catFilter || c.taxonomy_keys.includes(catFilter))
      .filter((c) => !q || c.name.toLowerCase().includes(q))
      .map((c) => ({ ...c, _score: suggestionScore(c, stackItems, goalId) }))
      .sort((a, b) => b._score - a._score);
  }, [compounds, slugsInStack, catFilter, search, stackItems, goalId]);

  const suggestions = useMemo(
    () => filteredCompounds.filter((c) => c._score > 0).slice(0, 5),
    [filteredCompounds]
  );

  const redundancies = useMemo(() => {
    const keyCounts: Record<string, string[]> = {};
    for (const item of stackItems) {
      for (const key of item.taxonomy_keys) {
        keyCounts[key] = [...(keyCounts[key] ?? []), item.name];
      }
    }
    return Object.entries(keyCounts)
      .filter(([, names]) => names.length >= 2)
      .map(([key, names]) => ({ key, label: TAXONOMY_LABELS[key] ?? key, names }));
  }, [stackItems]);

  /* ── Handlers ── */

  function handleAdd(c: CompoundOption) {
    setStackItems((prev) => [...prev, c]);
    // Auto-switch to stack view on mobile after first add
    if (stackItems.length === 0) setMobileView("stack");
  }

  function handleRemove(slug: string) {
    setStackItems((prev) => prev.filter((s) => s.slug !== slug));
  }

  async function handleSave() {
    setSaveState("saving");
    try {
      const res = await fetch("/api/stacks/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: savedStackId ?? undefined,
          name: stackName,
          goal_id: goalId,
          items: stackItems.map((s) => ({ slug: s.slug, kind: s.kind })),
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setSavedStackId(data.stack.id);
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 2500);
      } else {
        setSaveState("error");
        setTimeout(() => setSaveState("idle"), 3000);
      }
    } catch {
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 3000);
    }
  }

  async function handleSubmit() {
    if (!username.trim()) return;
    setSubmitState("submitting");
    const goalLabel = goals.find((g) => g.goal_id === goalId)?.title ?? "General";
    const text = [
      "[STACK_SUGGESTION_V1]",
      `Name: ${stackName}`,
      `Goal: ${goalLabel}`,
      `Compounds: ${stackItems.map((i) => `${i.name} (${i.kind})`).join(", ")}`,
      "[/STACK_SUGGESTION_V1]",
    ].join("\n");

    try {
      const res = await fetch("/api/ugc/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "stack",
          slug: "__builder__",
          username: username.trim(),
          text,
          ack_no_dosing: true,
        }),
      });
      const data = await res.json();
      setSubmitState(data.ok ? "submitted" : "error");
    } catch {
      setSubmitState("error");
    }
  }

  /* ── Render ── */

  return (
    <div className="sb2">

      {/* ── Header ── */}
      <div className="sb2__header">
        <div className="sb2__header-inner">
          <div className="sb2__header-back">
            <BackHomeLink />
          </div>
          <div className="sb2__header-copy">
            <h1 className="sb2__title">Stack Builder</h1>
            <p className="sb2__subtitle">
              Build a multi-compound protocol. Add compounds, watch the smart suggestions update,
              name your stack, and save it to My Peps.
            </p>
          </div>
          <div className="sb2__mobile-tabs">
            <button
              className={`sb2__mobile-tab${mobileView === "browse" ? " sb2__mobile-tab--active" : ""}`}
              onClick={() => setMobileView("browse")}
            >
              Browse
            </button>
            <button
              className={`sb2__mobile-tab${mobileView === "stack" ? " sb2__mobile-tab--active" : ""}`}
              onClick={() => setMobileView("stack")}
            >
              My Stack {stackItems.length > 0 && `(${stackItems.length})`}
            </button>
          </div>
        </div>
      </div>

      {/* ── Two-column body ── */}
      <div className="sb2__body">

        {/* ── LEFT: Compound Browser ── */}
        <div className={`sb2__browser${mobileView === "stack" ? " sb2__browser--hidden-mobile" : ""}`}>

          <div className="sb2__search-wrap">
            <input
              className="sb2__search"
              type="search"
              placeholder="Search compounds…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search compounds"
            />
          </div>

          <div className="sb2__cat-chips">
            <button
              onClick={() => setCatFilter(null)}
              className={`sb2__cat-chip${!catFilter ? " sb2__cat-chip--active" : ""}`}
            >
              All
            </button>
            {TAXONOMY_ORDER.map((key) => (
              <button
                key={key}
                onClick={() => setCatFilter(catFilter === key ? null : key)}
                className={`sb2__cat-chip${catFilter === key ? " sb2__cat-chip--active" : ""}`}
              >
                {TAXONOMY_LABELS[key]}
              </button>
            ))}
          </div>

          <div className="sb2__compound-list">
            {filteredCompounds.length === 0 ? (
              <p className="sb2__empty">No compounds match.</p>
            ) : (
              filteredCompounds.map((c) => (
                <div
                  key={c.slug}
                  className={`sb2__compound-card${c._score > 4 ? " sb2__compound-card--suggested" : ""}`}
                >
                  <div className="sb2__compound-info">
                    <div className="sb2__compound-name-row">
                      <span className="sb2__compound-name">{c.name}</span>
                      {c.kind === "blend" && <span className="sb2__kind-badge">blend</span>}
                    </div>
                    <div className="sb2__compound-meta">
                      <RiskDot tier={c.risk_tier} />
                      {c.evidence_grade && (
                        <span className="sb2__grade-badge">
                          {GRADE_SHORT[c.evidence_grade] ?? c.evidence_grade}
                        </span>
                      )}
                      {c.taxonomy_keys.slice(0, 2).map((k) => (
                        <span key={k} className="sb2__compound-tag">
                          {TAXONOMY_LABELS[k] ?? k}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAdd(c)}
                    className="sb2__add-btn"
                    aria-label={`Add ${c.name} to stack`}
                  >
                    +
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── RIGHT: Stack Canvas ── */}
        <div className={`sb2__canvas${mobileView === "browse" ? " sb2__canvas--hidden-mobile" : ""}`}>

          {/* Name + Goal header */}
          <div className="sb2__canvas-header">
            <input
              className="sb2__stack-name"
              value={stackName}
              onChange={(e) => setStackName(e.target.value)}
              placeholder="Name your stack"
              maxLength={60}
              aria-label="Stack name"
            />
            <select
              className="sb2__goal-picker"
              value={goalId ?? ""}
              onChange={(e) => setGoalId(e.target.value || null)}
              aria-label="Primary goal"
            >
              <option value="">Goal (optional)</option>
              {goals.map((g) => (
                <option key={g.goal_id} value={g.goal_id}>
                  {g.title}
                </option>
              ))}
            </select>
          </div>

          {/* Empty state */}
          {stackItems.length === 0 && (
            <div className="sb2__canvas-empty">
              <div className="sb2__canvas-empty-icon">✦</div>
              <p className="sb2__canvas-empty-text">
                Your stack is empty. Add compounds from the browser on the left.
              </p>
              <p className="sb2__canvas-empty-hint">
                Suggestions will appear here as you build — the engine rewards complementary effects
                and flags redundancy.
              </p>
            </div>
          )}

          {/* Stack items */}
          {stackItems.length > 0 && (
            <div className="sb2__stack-items">
              {stackItems.map((item, i) => (
                <div key={item.slug} className="sb2__stack-item">
                  <div className="sb2__stack-item-left">
                    <span className="sb2__stack-item-num">{i + 1}</span>
                    <RiskDot tier={item.risk_tier} />
                    <div>
                      <div className="sb2__stack-item-name">{item.name}</div>
                      <div className="sb2__stack-item-tags">
                        {item.taxonomy_keys.slice(0, 2).map((k) => (
                          <span key={k} className="sb2__stack-item-tag">
                            {TAXONOMY_LABELS[k] ?? k}
                          </span>
                        ))}
                        {item.kind === "blend" && (
                          <span className="sb2__stack-item-tag sb2__stack-item-tag--blend">blend</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.slug)}
                    className="sb2__remove-btn"
                    aria-label={`Remove ${item.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Smart Insights */}
          {stackItems.length > 0 && (redundancies.length > 0 || suggestions.length > 0) && (
            <div className="sb2__insights">
              {redundancies.length > 0 && (
                <div className="sb2__insight sb2__insight--warn">
                  <span className="sb2__insight-icon">⚠</span>
                  <div className="sb2__insight-body">
                    <div className="sb2__insight-heading">Possible redundancy</div>
                    {redundancies.map((r) => (
                      <p key={r.key} className="sb2__insight-text">
                        {r.names.join(" + ")} both target <strong>{r.label}</strong>. This may be
                        overlap — not necessarily wrong, but consider if both are needed.
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {suggestions.length > 0 && (
                <div className="sb2__insight sb2__insight--suggest">
                  <span className="sb2__insight-icon">✦</span>
                  <div className="sb2__insight-body">
                    <div className="sb2__insight-heading">Suggested additions</div>
                    <p className="sb2__insight-text">
                      These compounds complement your current stack by adding new effect dimensions:
                    </p>
                    <div className="sb2__suggestion-pills">
                      {suggestions.map((s) => (
                        <button
                          key={s.slug}
                          onClick={() => handleAdd(s)}
                          className="sb2__suggestion-pill"
                        >
                          + {s.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          {stackItems.length > 0 && (
            <div className="sb2__actions">
              <button
                onClick={handleSave}
                className={`sb2__save-btn${saveState === "saved" ? " sb2__save-btn--saved" : ""}`}
                disabled={saveState === "saving"}
              >
                {saveState === "saving"
                  ? "Saving…"
                  : saveState === "saved"
                  ? "Saved to My Peps ✓"
                  : saveState === "error"
                  ? "Save failed — try again"
                  : savedStackId
                  ? "Update My Peps"
                  : "Save to My Peps"}
              </button>
              <button
                onClick={() => setShowSubmitPanel((p) => !p)}
                className={`sb2__suggest-btn${showSubmitPanel ? " sb2__suggest-btn--active" : ""}`}
              >
                Suggest for Community
              </button>
            </div>
          )}

          {/* Community submit panel */}
          {showSubmitPanel && stackItems.length > 0 && (
            <div className="sb2__submit-panel">
              <div className="sb2__submit-heading">Suggest for Browse Stacks</div>
              <p className="sb2__submit-desc">
                Submit this stack for editorial review. If it&rsquo;s a well-reasoned combination,
                it may appear in Browse Stacks for the community. No guarantees — it goes through
                moderation first.
              </p>
              {submitState === "submitted" ? (
                <p className="sb2__submit-success">
                  Submitted for review. Thanks — the team will take a look.
                </p>
              ) : (
                <>
                  <input
                    className="sb2__submit-username"
                    placeholder="Your display name (shown if approved)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={40}
                  />
                  <button
                    onClick={handleSubmit}
                    className="sb2__submit-confirm"
                    disabled={!username.trim() || submitState === "submitting"}
                  >
                    {submitState === "submitting" ? "Submitting…" : "Submit for Review"}
                  </button>
                  {submitState === "error" && (
                    <p className="sb2__submit-error">Something went wrong. Try again.</p>
                  )}
                </>
              )}
            </div>
          )}

          {/* Stack summary (count + goal) */}
          {stackItems.length > 0 && (
            <div className="sb2__stack-footer">
              <span className="sb2__stack-count">
                {stackItems.length} compound{stackItems.length !== 1 ? "s" : ""}
              </span>
              {goalId && (
                <span className="sb2__stack-goal">
                  Goal: {goals.find((g) => g.goal_id === goalId)?.title ?? goalId}
                </span>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
