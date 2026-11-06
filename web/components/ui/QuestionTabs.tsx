"use client";

import { useEffect, useRef, useState } from "react";
import { MousePointerClick } from "lucide-react";

type Tab = { id: string; num: number; short: string; title: string; audience: string };

/**
 * Research questions as a tab bar; the selected question's dashboards render below.
 * Inactive panels stay mounted (just hidden) so Tableau vizzes keep their state.
 * Links to #q1 / #q2 / #q3 open the matching tab.
 */
export function QuestionTabs({ tabs, panels }: { tabs: Tab[]; panels: Record<string, React.ReactNode> }) {
  const [active, setActive] = useState(tabs[0].id);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (tabs.some((t) => t.id === id)) {
        setActive(id);
        barRef.current?.scrollIntoView({ block: "start" });
      }
    };
    // Menu links dispatch this so re-clicking the current hash still works.
    const fromMenu = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (tabs.some((t) => t.id === id)) {
        setActive(id);
        barRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    window.addEventListener("question:select", fromMenu);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      window.removeEventListener("question:select", fromMenu);
    };
  }, [tabs]);

  // Let the menu highlight the open question.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("question:change", { detail: active }));
  }, [active]);

  const select = (id: string) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
    const bar = barRef.current;
    // If the user has scrolled down into a long panel, bring the new panel's top into view.
    if (bar && bar.getBoundingClientRect().top <= 72) bar.scrollIntoView({ block: "start" });
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    select(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <div>
      <p id="question-tabs-hint" className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        <MousePointerClick className="size-4 text-primary" aria-hidden />
        <span>
          <span className="font-semibold text-ink">Select a question</span> to switch the dashboards shown below.
        </span>
        <span className="hidden items-center gap-1 text-xs sm:inline-flex">
          · or use
          <kbd className="rounded border border-line px-1.5 py-0.5 font-sans text-[11px] text-ink">←</kbd>
          <kbd className="rounded border border-line px-1.5 py-0.5 font-sans text-[11px] text-ink">→</kbd>
        </span>
      </p>
      <div ref={barRef} className="sticky top-16 z-30 -mx-4 scroll-mt-16 bg-bg/90 px-4 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 2xl:-mx-16 2xl:px-16">
        <div role="tablist" aria-label="Research questions" aria-describedby="question-tabs-hint" className="grid grid-cols-3 gap-2 sm:gap-3">
          {tabs.map((t, i) => {
            const on = t.id === active;
            return (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                role="tab"
                aria-selected={on}
                aria-controls={`panel-${t.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => select(t.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`theme-base group flex items-start gap-3 rounded-xl border p-3 text-left transition sm:p-4 ${
                  on ? "border-primary bg-surface shadow-lg ring-2 ring-primary" : "border-transparent bg-surface/90 hover:bg-surface"
                }`}
              >
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-lg font-display text-sm font-bold ${
                    on ? "bg-primary text-on-primary" : "bg-surface-2 text-muted group-hover:text-primary"
                  }`}
                >
                  Q{t.num}
                </span>
                <span className="min-w-0">
                  <span className={`block font-display text-sm font-semibold sm:text-base ${on ? "text-primary" : "text-ink"}`}>
                    {t.short}
                  </span>
                  <span className="mt-0.5 hidden text-sm leading-snug text-muted lg:block">{t.audience}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map((t) => (
        <div
          key={t.id}
          id={`panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${t.id}`}
          hidden={t.id !== active}
          className="pt-8"
        >
          {panels[t.id]}
        </div>
      ))}
    </div>
  );
}
