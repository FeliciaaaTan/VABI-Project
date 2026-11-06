import { tiers } from "@/content/site";

const swatch: Record<(typeof tiers)[number]["key"], string> = {
  low: "bg-tier-low",
  moderate: "bg-tier-moderate",
  high: "bg-tier-high",
  vhigh: "bg-tier-vhigh",
};

/** Legend for the four BLS AI-exposure tiers, using the same colours as the Tableau workbooks. */
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
