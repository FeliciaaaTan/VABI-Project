import { tiers } from "@/content/site";

const swatch: Record<(typeof tiers)[number]["key"], string> = {
  high: "bg-tier-high",
  moderate: "bg-tier-moderate",
  low: "bg-tier-low",
  none: "bg-tier-none",
};

/** Legend for the AI-exposure levels, using the same colours as the Tableau workbook. */
export function TierLegend({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm ${className}`}>
      <span className="text-xs font-semibold tracking-wider text-muted uppercase">AI exposure</span>
      {tiers.map((t) => (
        <span key={t.key} className="inline-flex items-center gap-1.5 text-ink">
          <span className={`size-3 rounded-sm ring-1 ring-ink/45 ring-inset ${swatch[t.key]}`} aria-hidden />
          {t.label}
        </span>
      ))}
    </div>
  );
}
