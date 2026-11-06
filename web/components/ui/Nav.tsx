"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { nav } from "@/content/site";

/** Opens a question tab in the Dashboards section (see QuestionTabs). */
const openQuestion = (id: string) => {
  window.dispatchEvent(new CustomEvent("question:select", { detail: id }));
};

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [activeQ, setActiveQ] = useState<string>("q1");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // The footer (Team) is too short to reach the spy band, so mark it at page bottom.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive(nav[nav.length - 1].id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onQuestion = (e: Event) => setActiveQ((e as CustomEvent<string>).detail);
    window.addEventListener("question:change", onQuestion);

    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("question:change", onQuestion);
      io.disconnect();
    };
  }, []);

  const linkCls = (on: boolean) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${on ? "bg-primary-soft text-primary" : "text-muted hover:text-ink"}`;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-8 lg:px-12 2xl:px-16">
        <a href="#home" className="flex items-center gap-2 font-display font-semibold text-ink">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-on-primary">AI</span>
          <span className="hidden sm:inline">Real Impact on Jobs</span>
        </a>

        {/* desktop */}
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) =>
              n.children ? (
                <li key={n.id} className="group relative">
                  <a href={`#${n.id}`} aria-current={active === n.id ? "true" : undefined} className={`${linkCls(active === n.id)} inline-flex items-center gap-1`}>
                    {n.label}
                    <ChevronDown className="size-3.5 transition group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden />
                  </a>
                  {/* pt-2 bridges the gap so the menu stays open while moving the pointer */}
                  <div className="invisible absolute top-full left-1/2 w-72 -translate-x-1/2 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="rounded-xl border border-line bg-surface p-1.5 shadow-xl">
                      {n.children.map((c) => {
                        const on = active === n.id && activeQ === c.id;
                        return (
                          <li key={c.id}>
                            <a
                              href={`#${c.id}`}
                              onClick={() => openQuestion(c.id)}
                              className={`block rounded-lg px-3 py-2 text-sm ${on ? "bg-primary-soft font-semibold text-primary" : "text-ink hover:bg-surface-2"}`}
                            >
                              {c.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={n.id}>
                  <a href={`#${n.id}`} aria-current={active === n.id ? "true" : undefined} className={linkCls(active === n.id)}>
                    {n.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        <button
          className="grid size-10 place-items-center rounded-lg text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* mobile */}
      {open && (
        <nav aria-label="Sections" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line px-4 pb-4 lg:hidden">
          <ul className="flex flex-col gap-0.5 pt-3">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2.5 text-sm font-medium ${active === n.id ? "bg-primary-soft text-primary" : "text-ink"}`}
                >
                  {n.label}
                </a>
                {n.children && (
                  <ul className="mb-1 ml-3 border-l border-line pl-2">
                    {n.children.map((c) => (
                      <li key={c.id}>
                        <a
                          href={`#${c.id}`}
                          onClick={() => {
                            openQuestion(c.id);
                            setOpen(false);
                          }}
                          className={`block rounded-md px-3 py-2 text-sm ${
                            active === n.id && activeQ === c.id ? "font-semibold text-primary" : "text-muted"
                          }`}
                        >
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
