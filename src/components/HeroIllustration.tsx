"use client";

import { motion } from "framer-motion";
import { Bot, Mail, MessageCircle, Zap } from "lucide-react";

const SHAPES = [
  { Icon: MessageCircle, color: "text-emerald-500", pos: "left-[6%] top-[28%]", size: "h-16 w-16 sm:h-20 sm:w-20", radius: "rounded-3xl", delay: 0 },
  { Icon: Zap, color: "text-amber-500", pos: "left-1/2 top-[4%] -translate-x-1/2", size: "h-14 w-14 sm:h-16 sm:w-16", radius: "rounded-2xl", delay: 0.6 },
  { Icon: Bot, color: "text-indigo-500", pos: "right-[8%] top-[32%]", size: "h-16 w-16 sm:h-20 sm:w-20", radius: "rounded-full", delay: 1.2 },
  { Icon: Mail, color: "text-cyan-600", pos: "bottom-[6%] left-1/2 -translate-x-1/2", size: "h-12 w-12 sm:h-14 sm:w-14", radius: "rounded-2xl", delay: 0.3 },
];

export default function HeroIllustration() {
  return (
    <div className="relative mx-auto h-48 max-w-2xl sm:h-56">
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 600 220"
        fill="none"
      >
        <path
          d="M100 130 Q 300 40 500 130"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          strokeDasharray="6 8"
        />
      </svg>

      {SHAPES.map(({ Icon, color, pos, size, radius, delay }, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
          className={`absolute ${pos} flex ${size} items-center justify-center ${radius} bg-slate-900 shadow-lg`}
        >
          <Icon className={`h-1/2 w-1/2 ${color}`} />
        </motion.div>
      ))}
    </div>
  );
}
