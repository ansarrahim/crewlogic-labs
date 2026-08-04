"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const STRONG_EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: STRONG_EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
