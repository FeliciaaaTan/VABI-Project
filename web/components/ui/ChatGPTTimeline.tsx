import { analysisWindow, periods } from "@/content/site";

const { start, end } = analysisWindow;
const years = Array.from({ length: end - start + 1 }, (_, i) => start + i);
const x = (year: number) => ((year - start) / (end - start)) * 100;

/** ChatGPT launched 30 Nov 2022 (≈ 2022.91 on a continuous year axis). */
const CHATGPT = 2022 + 334 / 365;

const tone = {
  baseline: "bg-muted/25 text-muted",
  pre: "bg-muted/55 text-ink",
  post: "bg-primary text-on-primary",
} as const;

/**
 * The analysis window on a continuous year axis, with the comparison periods
 * drawn as spans and ChatGPT's release marked. OEWS uses a May reference
 * period, so May 2022 is pre-ChatGPT and May 2023 onward is post.
 */
export function ChatGPTTimeline() {
  return (
    <figure className="w-full">
      <div className="relative mx-2 pt-10 sm:mx-3">
        {/* ChatGPT marker */}
        <div
          className="pointer-events-none absolute top-0 bottom-8 z-10 flex -translate-x-1/2 flex-col items-center"
          style={{ left: `${x(CHATGPT)}%` }}
          aria-hidden
        >
          <span className="rounded-full bg-signal px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-white shadow sm:text-xs">
            ChatGPT · 30 Nov 2022
          </span>
          <span className="w-0.5 flex-1 bg-signal" />
        </div>

        {/* period spans */}
        <div className="relative h-9">
          {periods.map((p) => (
            <div
              key={`${p.from}-${p.to}`}
              className={`absolute top-0 flex h-full items-center justify-center overflow-hidden rounded-md px-1 text-[11px] font-semibold whitespace-nowrap sm:text-xs ${tone[p.tone]}`}
              style={{ left: `calc(${x(p.from)}% + 2px)`, width: `calc(${x(p.to) - x(p.from)}% - 4px)` }}
              title={`${p.label}: ${p.from}–${p.to}`}
            >
              <span className="truncate">
                <span className="hidden md:inline">{p.label} · </span>
                {p.from}–{String(p.to).slice(2)}
              </span>
            </div>
          ))}
        </div>

        {/* year axis */}
        <div className="relative mt-3 h-8 border-t border-line">
          {years.map((y) => {
            const major = periods.some((p) => p.from === y || p.to === y);
            return (
              <div
                key={y}
                className={`absolute top-0 -translate-x-1/2 flex-col items-center ${major ? "flex" : "hidden sm:flex"}`}
                style={{ left: `${x(y)}%` }}
              >
                <span className={`w-px ${major ? "h-2 bg-muted" : "h-1.5 bg-line"}`} aria-hidden />
                <span className={`mt-1 text-[11px] tabular-nums sm:text-xs ${major ? "font-semibold text-ink" : "text-muted"}`}>
                  {y}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <figcaption className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-muted sm:text-sm">
        {periods.map((p) => (
          <span key={`${p.from}-${p.to}`} className="inline-flex items-center gap-1.5">
            <span className={`size-2.5 rounded-sm ${tone[p.tone].split(" ")[0]}`} aria-hidden />
            <span className="font-semibold text-ink">{p.label}</span> {p.from}–{p.to}
          </span>
        ))}
        <span className="basis-full sm:basis-auto sm:ml-auto">OEWS estimates use a May reference period</span>
      </figcaption>
    </figure>
  );
}
