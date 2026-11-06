import { ChartNoAxesCombined } from "lucide-react";

/** Shown in place of a Tableau embed until a Tableau Public URL is added. */
export function VizPlaceholder({ id, title, label }: { id: string; title: string; label?: string }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder for viz: ${title}`}
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-line bg-surface-2/60 p-6 text-center"
    >
      {/* faint mock chart */}
      <svg
        className="pointer-events-none absolute inset-x-6 bottom-6 h-1/2 w-[calc(100%-3rem)] opacity-40"
        viewBox="0 0 400 160"
        preserveAspectRatio="none"
        aria-hidden
      >
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="0" x2="400" y1={20 + i * 40} y2={20 + i * 40} stroke="currentColor" strokeWidth="0.5" className="text-muted" />
        ))}
        <path d="M0,120 C60,110 90,95 140,100 S220,70 260,60 330,40 400,30" fill="none" stroke="var(--primary)" strokeWidth="3" />
        <path d="M0,130 C70,125 110,120 160,118 S250,105 300,100 360,92 400,88" fill="none" stroke="var(--muted)" strokeWidth="3" />
        <path d="M0,140 C80,138 140,134 200,133 S300,128 400,124" fill="none" stroke="var(--border)" strokeWidth="3" />
        <line x1="230" x2="230" y1="0" y2="160" stroke="var(--signal)" strokeWidth="2" strokeDasharray="5 5" />
      </svg>

      <div className="relative flex flex-col items-center gap-2">
        <span className="grid size-12 place-items-center rounded-full bg-primary-soft text-primary">
          <ChartNoAxesCombined className="size-6" aria-hidden />
        </span>
        <p className="font-display text-base font-semibold text-ink">
          Tableau viz placeholder{label ? ` · ${label}` : ""}
        </p>
        <p className="max-w-sm text-sm text-muted">
          Add the Tableau Public URL in <code className="rounded bg-surface px-1.5 py-0.5 text-xs">content/vizzes.ts</code>{" "}
          for <code className="rounded bg-surface px-1.5 py-0.5 text-xs">{id}</code>
        </p>
      </div>
    </div>
  );
}
