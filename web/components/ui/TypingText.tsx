"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  /** Milliseconds per character. */
  speed?: number;
  /** Delay before typing starts, in milliseconds. */
  delay?: number;
};

/**
 * Types `text` out character by character with a blinking caret.
 * - The full text is laid out invisibly underneath, so nothing shifts while typing.
 * - Screen readers get the full text at once (the animated copy is aria-hidden).
 * - Respects prefers-reduced-motion (shows the text immediately).
 * - Without JavaScript the full text simply shows; with JS it's hidden until
 *   typing starts (via the `js` class set in <head>), so there's no flash.
 */
export function TypingText({ text, speed = 70, delay = 300 }: Props) {
  // null = not started yet (server render / before hydration).
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCount(text.length);
        return;
      }
      let i = 0;
      setCount(0);
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay]);

  const pending = count === null;
  const done = count !== null && count >= text.length;

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="grid">
        {/* reserves the final size */}
        <span className="invisible col-start-1 row-start-1">{text}</span>
        <span className="typing-text col-start-1 row-start-1" data-pending={pending ? "" : undefined}>
          {pending ? text : text.slice(0, count)}
          <span
            className={`typing-caret ml-[0.04em] inline-block h-[0.85em] w-[0.07em] translate-y-[0.1em] rounded-full bg-primary align-baseline ${
              done ? "typing-caret-done" : ""
            } ${pending ? "opacity-0" : ""}`}
          />
        </span>
      </span>
    </>
  );
}
