import { TriangleAlert } from "lucide-react";

/** Reusable reminder that observed differences are not causal estimates. */
export function CausationCallout({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="flex gap-3 rounded-xl border border-signal/30 bg-signal-soft px-4 py-3.5 text-[15px] text-ink">
      <TriangleAlert className="mt-0.5 size-5 shrink-0 text-signal" aria-hidden />
      <p>
        <span className="font-semibold">Correlation, not causation.</span>{" "}
        {children ??
          "These charts show how trends differ across exposure levels. They don't prove that AI caused the differences. Some exposed occupations were already declining before ChatGPT."}
      </p>
    </aside>
  );
}
