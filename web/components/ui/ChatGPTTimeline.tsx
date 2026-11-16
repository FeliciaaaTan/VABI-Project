import { analysisWindow, periods } from "@/content/site";

const { start, end } = analysisWindow;
const years = Array.from({ length: end - start + 1 }, (_, i) => start + i);
const x = (year: number) => ((year - start) / (end - start)) * 100;

/** Reference lines on a continuous year axis (fraction of the year elapsed). */
const markers = [
  {
    // WHO declared COVID-19 a pandemic on 11 Mar 2020.
    at: 2020 + 70 / 366,
    label: "COVID-19 · Mar 2020",
    short: "COVID-19",
    badge: "bg-ink text-bg",
    line: "border-l-2 border-dashed border-ink/70",
  },
  {
    // ChatGPT launched 30 Nov 2022.
    at: 2022 + 333 / 365,
    label: "ChatGPT · 30 Nov 2022",
    short: "ChatGPT",
    badge: "bg-signal text-white",
    line: "border-l-2 border-signal",
  },
];

// Opaque tints (mixed with the card surface) so reference lines don't show through.
const tone = {
  baseline: "bg-[color-mix(in_srgb,var(--muted)_25%,var(--surface))] text-muted",
  pre: "bg-[color-mix(in_srgb,var(--muted)_55%,var(--surface))] text-ink",
  post: "bg-primary text-on-primary",
} as const;

/**
 * The analysis window on a continuous year axis, with the comparison periods
 * drawn as spans and reference lines for COVID-19 and ChatGPT's release. Each span shows the employment
 * index for high-exposure jobs (2013–2016 = 100) and its change from the
 * previous period.
 */
export function ChatGPTTimeline() {
  return (
    <figure className="w-full">
      <div className="relative mx-2 pt-10 sm:mx-3">
        {/* reference lines: COVID-19 and ChatGPT */}
        {markers.map((m) => (
          <div
            key={m.label}
            className="pointer-events-none absolute top-0 bottom-8 z-10 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${x(m.at)}%` }}
            aria-hidden
          >
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap shadow sm:text-xs ${m.badge}`}>
              <span className="sm:hidden">{m.short}</span>
              <span className="hidden sm:inline">{m.label}</span>
            </span>
            <span className={`flex-1 ${m.line}`} />
          </div>
        ))}

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

      <p className="sr-only">Reference lines: COVID-19 pandemic declared 11 March 2020; ChatGPT released 30 November 2022.</p>
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
