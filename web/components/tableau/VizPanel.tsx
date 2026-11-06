import { ExternalLink, MousePointerClick } from "lucide-react";
import type { Viz } from "@/content/vizzes";
import { TableauViz } from "./TableauViz";
import { VizSwitcher } from "./VizSwitcher";
import { TierLegend } from "../ui/TierLegend";

const kindLabel = { sheet: "Chart", dashboard: "Dashboard", story: "Story" } as const;

/** A card that holds one viz plus its "What / Insight / Why" annotations. */
export function VizPanel({ viz }: { viz: Viz }) {
  const openHref = viz.src ?? viz.variants?.find((v) => v.src)?.src;

  return (
    <article id={viz.id} className="theme-base scroll-mt-24 rounded-2xl border border-line bg-surface p-4 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)] sm:p-6">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="mb-1 inline-block rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold tracking-wide text-primary uppercase">
            {kindLabel[viz.kind]}
          </span>
          <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{viz.title}</h3>
        </div>
        {openHref && (
          <a
            href={openHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-muted hover:border-primary hover:text-primary"
          >
            Open in Tableau Public <ExternalLink className="size-3.5" aria-hidden />
          </a>
        )}
      </header>

      {viz.tierLegend && <TierLegend className="mb-3" />}

      {viz.variants ? (
        <VizSwitcher viz={viz} variants={viz.variants} />
      ) : (
        <TableauViz
          id={viz.id}
          title={viz.title}
          src={viz.src}
          height={viz.height}
          hideTabs={viz.kind !== "story"}
          toolbar={viz.kind === "story" ? "top" : "bottom"}
        />
      )}

      {viz.interact && (
        <p className="mt-3 flex items-start gap-2 text-sm text-muted">
          <MousePointerClick className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>
            <span className="font-medium text-ink">How to explore:</span> {viz.interact}
          </span>
        </p>
      )}

      <dl className="mt-5 grid gap-4 border-t border-line pt-5 md:grid-cols-3">
        {[
          ["What this shows", viz.what],
          ["Key insight", viz.insight],
          ["Why it matters", viz.why],
        ].map(([label, text]) => (
          <div key={label}>
            <dt className="mb-1 text-xs font-semibold tracking-wider text-primary uppercase">{label}</dt>
            <dd className="text-[15px] leading-relaxed text-ink/85">{text}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
