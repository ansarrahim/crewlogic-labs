"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const STRONG_EASE_OUT = [0.23, 1, 0.32, 1] as const;

// Reduced-motion handling is global — see <MotionRoot reducedMotion="user">
// in the root layout. No need to check useReducedMotion() per-component.
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: STRONG_EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
