"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

/** Regular tab shows a panel. Scroll tab (content: null) scrolls to an element by id. */
type Tab = { id: string; label: string; content: React.ReactNode | null };
type Props = { tabs: Tab[] };

function isScrollTab(tab: Tab) {
  return tab.content === null;
}

export default function PDPTabs({ tabs }: Props) {
  const panelTabs = tabs.filter((t) => !isScrollTab(t));
  const defaultId = panelTabs[0]?.id ?? "";
  const [activeTab, setActiveTab] = useState<string>(defaultId);
  const stickyUnitRef = useRef<HTMLDivElement>(null);

  const activateTab = useCallback(
    (id: string, scroll = false) => {
      const match = panelTabs.find((t) => t.id === id);
      if (!match) return;
      setActiveTab(id);
      if (scroll) {
        setTimeout(() => {
          const unit = stickyUnitRef.current;
          if (!unit) return;
          const unitDocTop = unit.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: unitDocTop - 70, behavior: "smooth" });
        }, 50);
      }
    },
    [panelTabs],
  );

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) activateTab(hash, false);

    function onHashChange() {
      const h = window.location.hash.slice(1);
      if (!h) return;
      const tab = tabs.find((t) => t.id === h);
      if (tab && isScrollTab(tab)) {
        document.getElementById(h)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        activateTab(h, true);
      }
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [activateTab, tabs]);

  function handleTabClick(tab: Tab) {
    if (isScrollTab(tab)) {
      document.getElementById(tab.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    history.replaceState(null, "", "#" + tab.id);
    activateTab(tab.id, false);
  }

  return (
    <div className="reta-tabs">
      {/* Sticky unit: bar + swipe hint travel together */}
      <div className="reta-tabs__sticky-unit" ref={stickyUnitRef}>
        <div className="reta-tabs__bar">
          <div className="reta-tabs__bar-scroll">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`reta-tabs__btn${!isScrollTab(tab) && activeTab === tab.id ? " reta-tabs__btn--active" : ""}${isScrollTab(tab) ? " reta-tabs__btn--scroll" : ""}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="reta-tabs__hint" aria-hidden="true">
          <span className="reta-tabs__hint-arrow">›</span>
          <span className="reta-tabs__hint-text">swipe tabs</span>
        </div>
      </div>

      {panelTabs.map((tab) => (
        <div
          key={tab.id}
          id={tab.id}
          className={`reta-tabs__panel${activeTab !== tab.id ? " reta-tabs__panel--hidden" : ""}`}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
