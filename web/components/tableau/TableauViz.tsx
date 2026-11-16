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

type Size = { width: number; height: number };
/** The bits of the Tableau Embedding API v3 element we read. */
type TableauVizElement = HTMLElement & {
  workbook?: { activeSheet?: { size?: { behavior?: string; maxSize?: Size } } };
};

const DEFAULT_HEIGHT = { desktop: 780, mobile: 600 };
/** Don't blow small dashboards up by more than this. */
const MAX_SCALE = 1.5;
/** Height ÷ width for "Automatic" dashboards (matches the 1366 × 768 layout). */
const AUTO_ASPECT = 768 / 1366;
/** Minimum frame height for "Automatic" dashboards on desktop. */
const AUTO_MIN_DESKTOP = 560;

/**
 * Embeds a Tableau Public view with the Embedding API v3 <tableau-viz> element.
 * - Lazy: only mounts when scrolled near the viewport.
 * - Shows a skeleton until Tableau fires `firstinteractive`.
 * - Fixed-size dashboards are scaled to fill the card's full width (keeping
 *   their aspect ratio).
 * - "Automatic" dashboards fill the card's width, with the height following
 *   AUTO_ASPECT (and a minimum height so phones still get a usable frame).
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
  const vizRef = useRef<TableauVizElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [native, setNative] = useState<Size | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Lazy-mount when near the viewport.
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

  // Track the card's width so the dashboard can be scaled to fill it.
  useEffect(() => {
    const el = wrapRef.current;
    if (!src || !el) return;
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [src]);

  useEffect(() => {
    const el = vizRef.current;
    if (!visible || !el) return;
    const onReady = () => {
      const size = el.workbook?.activeSheet?.size;
      const max = size?.maxSize;
      if (size?.behavior !== "automatic" && max && max.width > 0 && max.height > 0) {
        setNative({ width: max.width, height: max.height });
      }
      setReady(true);
    };
    const onError = () => setFailed(true);
    el.addEventListener("firstinteractive", onReady);
    el.addEventListener("vizloaderror", onError);
    return () => {
      el.removeEventListener("firstinteractive", onReady);
      el.removeEventListener("vizloaderror", onError);
    };
  }, [visible]);

  // Give the iframe the dashboard's real size; the wrapper then scales it.
  useEffect(() => {
    const el = vizRef.current;
    const frame = el?.querySelector("iframe") ?? el?.shadowRoot?.querySelector("iframe");
    if (!native || !frame) return;
    frame.style.width = `${native.width}px`;
    frame.style.height = `${native.height}px`;
  }, [native]);

  const h = isMobile ? height.mobile : height.desktop;
  const autoHeight = containerWidth
    ? Math.max(isMobile ? height.mobile : AUTO_MIN_DESKTOP, Math.round(containerWidth * AUTO_ASPECT))
    : h;

  // Automatic dashboards reflow to the iframe's size, so keep it matched to the frame.
  useEffect(() => {
    const el = vizRef.current;
    const frame = el?.querySelector("iframe") ?? el?.shadowRoot?.querySelector("iframe");
    if (native || !ready || !frame) return;
    frame.style.width = "100%";
    frame.style.height = `${autoHeight}px`;
  }, [native, ready, autoHeight]);

  if (!src) {
    return (
      <div style={{ height: h }}>
        <VizPlaceholder id={id} title={title} label={placeholderLabel} />
      </div>
    );
  }

  const scale = native && containerWidth ? Math.min(containerWidth / native.width, MAX_SCALE) : 1;
  const frameHeight = native && containerWidth ? Math.round(native.height * scale) : autoHeight;

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden rounded-xl"
      style={{ height: frameHeight, background: "var(--viz-surface)" }}
    >
      {!ready && !failed && (
        <div className="absolute inset-0 z-10 overflow-hidden bg-slate-100" aria-hidden>
          <div className="absolute inset-0 animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          <p className="absolute inset-x-0 top-1/2 text-center text-sm text-slate-500">Loading interactive viz…</p>
        </div>
      )}
      {failed && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-slate-50 p-6 text-center text-sm text-slate-600">
          <p>
            This viz couldn&apos;t load here.{" "}
            <a className="font-medium text-indigo-700 underline" href={src} target="_blank" rel="noreferrer">
              Open it in Tableau Public ↗
            </a>
          </p>
        </div>
      )}
      {visible && (
        <div
          style={
            native
              ? { width: native.width, height: native.height, transform: `scale(${scale})`, transformOrigin: "top left" }
              : { width: "100%", height: autoHeight }
          }
        >
          <tableau-viz
            ref={vizRef}
            src={src}
            title={title}
            toolbar={toolbar}
            device={isMobile ? "phone" : "default"}
            width={native ? `${native.width}px` : "100%"}
            height={`${native ? native.height : autoHeight}px`}
            {...(hideTabs ? { "hide-tabs": "" } : {})}
            style={{ display: "block" }}
          />
        </div>
      )}
    </div>
  );
}
