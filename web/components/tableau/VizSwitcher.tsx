"use client";

import { useState } from "react";
import type { Viz, VizVariant } from "@/content/vizzes";
import { TableauViz } from "./TableauViz";

/** One frame, several Tableau views, picked with a segmented control. */
export function VizSwitcher({ viz, variants }: { viz: Viz; variants: VizVariant[] }) {
  const [active, setActive] = useState(0);
  const current = variants[active];

  return (
    <div className="flex flex-col gap-3">
      <div role="tablist" aria-label={`${viz.title}: choose view`} className="flex flex-wrap gap-1 self-start rounded-lg bg-surface-2 p-1">
        {variants.map((v, i) => (
          <button
            key={v.label}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              i === active ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
      <TableauViz
        key={current.src ?? current.label}
        id={viz.id}
        title={`${viz.title}: ${current.label}`}
        src={current.src}
        height={viz.height}
        placeholderLabel={current.label}
      />
    </div>
  );
}
