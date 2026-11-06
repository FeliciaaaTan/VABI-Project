"use client";

import { useEffect, useRef, useState } from "react";
import { VizPlaceholder } from "./VizPlaceholder";

type Props = {
  id: string;
  title: string;
  src?: string;
  height?: { desktop: number; mobile: number };
  toolbar?: "top" | "bottom" | "hidden";
  hideTabs?: boolean;
  placeholderLabel?: string;
};

const DEFAULT_HEIGHT = { desktop: 780, mobile: 600 };

/**
 * Embeds a Tableau Public view with the Embedding API v3 <tableau-viz> element.
 * - Lazy: only mounts when scrolled near the viewport.
 * - Shows a skeleton until Tableau fires `firstinteractive`.
 * - Shows a placeholder when no `src` is configured yet.
 */
export function TableauViz({
  id,
  title,
  src,
  height = DEFAULT_HEIGHT,
  toolbar = "bottom",
  hideTabs = true,
  placeholderLabel,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const vizRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!src || !wrapRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [src]);

  useEffect(() => {
    const el = vizRef.current;
    if (!visible || !el) return;
    const onReady = () => setReady(true);
    const onError = () => setFailed(true);
    el.addEventListener("firstinteractive", onReady);
    el.addEventListener("vizloaderror", onError);
    return () => {
      el.removeEventListener("firstinteractive", onReady);
      el.removeEventListener("vizloaderror", onError);
    };
  }, [visible]);

  const h = isMobile ? height.mobile : height.desktop;

  if (!src) {
    return (
      <div style={{ height: h }}>
        <VizPlaceholder id={id} title={title} label={placeholderLabel} />
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden rounded-xl"
      style={{ height: h, background: "var(--viz-surface)" }}
    >
      {!ready && !failed && (
        <div className="absolute inset-0 overflow-hidden bg-slate-100" aria-hidden>
          <div className="absolute inset-0 animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          <p className="absolute inset-x-0 top-1/2 text-center text-sm text-slate-500">Loading interactive viz…</p>
        </div>
      )}
      {failed && (
        <div className="absolute inset-0 grid place-items-center bg-slate-50 p-6 text-center text-sm text-slate-600">
          <p>
            This viz couldn&apos;t load here.{" "}
            <a className="font-medium text-indigo-700 underline" href={src} target="_blank" rel="noreferrer">
              Open it in Tableau Public ↗
            </a>
          </p>
        </div>
      )}
      {visible && (
        <tableau-viz
          ref={vizRef}
          src={src}
          title={title}
          toolbar={toolbar}
          device={isMobile ? "phone" : "default"}
          width="100%"
          height={`${h}px`}
          {...(hideTabs ? { "hide-tabs": "" } : {})}
          style={{ display: "block" }}
        />
      )}
    </div>
  );
}
