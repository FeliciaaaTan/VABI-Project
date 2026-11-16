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
 * drawn as spans and ChatGPT's release marked. Each span shows the employment
 * index for high-exposure jobs (2013–2016 = 100) and its change from the
 * previous period.
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

        {/* period spans (above the marker line so it doesn't cross their text) */}
        <div className="relative z-20 h-16">
          {periods.map((p, i) => {
            const prev = periods[i - 1];
            const change = prev ? (p.highIndex / prev.highIndex - 1) * 100 : null;
            return (
              <div
                key={`${p.from}-${p.to}`}
                className={`absolute top-0 flex h-full flex-col items-center justify-center overflow-hidden rounded-md px-1 text-center whitespace-nowrap ${tone[p.tone]}`}
                style={{ left: `calc(${x(p.from)}% + 2px)`, width: `calc(${x(p.to) - x(p.from)}% - 4px)` }}
                title={`${p.label} ${p.from}–${p.to}: employment index ${p.highIndex}`}
              >
                <span className="max-w-full truncate text-[11px] font-semibold sm:text-xs">
                  <span className="hidden md:inline">{p.label} · </span>
                  {p.from}–{String(p.to).slice(2)}
                </span>
                <span className="mt-0.5 flex items-baseline gap-1.5">
                  <span className="font-display text-base font-bold tabular-nums sm:text-lg">{p.highIndex.toFixed(1)}</span>
                  {change !== null && (
                    <span className="hidden text-[11px] font-semibold tabular-nums sm:inline">
                      {change >= 0 ? "▲" : "▼"}
                      {Math.abs(change).toFixed(1)}%
                    </span>
                  )}
                </span>
              </div>
            );
          })}
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
        <span className="basis-full sm:basis-auto sm:ml-auto">
          Numbers: employment in high-exposure jobs, index 2013–2016 = 100
        </span>
      </figcaption>
    </figure>
  );
}
