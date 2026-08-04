"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps the app once so every framer-motion animation site-wide
 * automatically respects the OS-level prefers-reduced-motion setting
 * (transform-based motion is swapped for instant/cross-fade — no need
 * to check useReducedMotion() in every individual component).
 */
export default function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
