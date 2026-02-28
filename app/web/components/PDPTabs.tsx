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
  const [showHint, setShowHint] = useState(true);
  const tabBarRef = useRef<HTMLDivElement>(null);

  const activateTab = useCallback(
    (id: string, scroll = false) => {
      const match = panelTabs.find((t) => t.id === id);
      if (!match) return;
      setActiveTab(id);
      if (scroll) {
        // Defer until after React re-renders the now-visible panel so layout
        // is stable before we measure. Target: tab bar sits just below the
        // sticky nav (nav = 70px, matching .reta-tabs__bar { top: 70px }).
        // scrollTo(barDocTop - 70) puts the bar at exactly 70px from the
        // viewport top so the panel content is immediately visible below it.
        setTimeout(() => {
          const bar = tabBarRef.current;
          if (!bar) return;
          const barDocTop = bar.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: barDocTop - 70, behavior: "smooth" });
        }, 50);
      }
    },
    [panelTabs],
  );

  useEffect(() => {
    // Activate from initial hash (skip scroll tabs)
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
    setShowHint(false);
    if (isScrollTab(tab)) {
      document.getElementById(tab.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    history.replaceState(null, "", "#" + tab.id);
    activateTab(tab.id, false);
  }

  return (
    <div className="reta-tabs">
      <div className="reta-tabs__bar" ref={tabBarRef}>
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
      {showHint && (
        <div className="reta-tabs__hint" aria-hidden="true">
          <span className="reta-tabs__hint-arrow">›</span>
          <span className="reta-tabs__hint-text">swipe to navigate</span>
        </div>
      )}
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
