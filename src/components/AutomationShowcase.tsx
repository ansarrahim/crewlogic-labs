"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AutomationTemplates from "@/components/AutomationTemplates";
import Reveal from "@/components/Reveal";
import { INDUSTRIES } from "@/lib/data";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function AutomationShowcase() {
  const [active, setActive] = useState(INDUSTRIES[0].slug);
  const activeIndustry = INDUSTRIES.find((i) => i.slug === active) ?? INDUSTRIES[0];

  return (
    <section className="bg-cyan-500 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
            Browse by Business
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What Do You Want to Automate?
          </h2>
          <p className="mt-3 text-sm text-white/80">
            Pick the shape closest to your business — same real templates either way.
          </p>
        </Reveal>

        <div
          role="tablist"
          aria-label="Business type"
          className="mx-auto mb-10 flex w-fit flex-wrap items-center justify-center gap-1 rounded-full border border-white/25 bg-white/10 p-1 backdrop-blur-sm"
        >
          {INDUSTRIES.map((industry) => {
            const isActive = industry.slug === active;
            return (
              <button
                key={industry.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(industry.slug)}
                className={`relative rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                  isActive ? "text-slate-100" : "text-white/85 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="showcase-pill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  />
                )}
                <span className="relative z-10">{industry.name}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            <AutomationTemplates templateIds={activeIndustry.templateIds} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
