"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";
const STORAGE_KEY = "theme";
const CHANGE_EVENT = "themechange";
const DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * Inline script for <head>: marks JS as available (used by TypingText) and
 * applies a saved theme before first paint (no flash).
 */
export const themeInitScript = `document.documentElement.classList.add("js");try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

/** The theme in effect: the user's pick if any, otherwise the system setting. */
const getTheme = (): Theme =>
  (document.documentElement.dataset.theme as Theme | undefined) ??
  (window.matchMedia(DARK_QUERY).matches ? "dark" : "light");

const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(DARK_QUERY);
  mq.addEventListener("change", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
};

/** Switches between light and dark. Until clicked, the site follows the system setting. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  // null on the server, so the first client render matches the static HTML.
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);

  const toggle = () => {
    const next: Theme = getTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode): the choice lasts for this visit */
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`grid size-10 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-ink ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="size-5" aria-hidden />
      ) : theme === "light" ? (
        <Moon className="size-5" aria-hidden />
      ) : (
        <span className="size-5" />
      )}
    </button>
  );
}
