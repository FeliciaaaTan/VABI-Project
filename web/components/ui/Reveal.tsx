"use client";

import { motion, MotionConfig } from "motion/react";

type Props = {
  children: React.ReactNode;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
  /** Distance (px) the element rises while fading in. */
  y?: number;
  className?: string;
  /** Render as a list item (for staggering cards inside <ul>/<ol>). */
  as?: "div" | "li";
};

const EASE = [0.22, 1, 0.36, 1] as const; // ease-out-quint: quick start, gentle settle

/**
 * Fades and lifts its children into place the first time they scroll into view.
 * Visitors with "reduce motion" turned on get a plain fade (MotionConfig "user").
 */
export function Reveal({ children, delay = 0, y = 28, className, as = "div" }: Props) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <MotionConfig reducedMotion="user">
      <Tag
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.7, ease: EASE, delay }}
      >
        {children}
      </Tag>
    </MotionConfig>
  );
}
