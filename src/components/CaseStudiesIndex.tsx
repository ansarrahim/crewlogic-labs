"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gauge } from "lucide-react";
import { CASE_STUDIES, type CaseStudy } from "@/lib/data";
import { TRACK_META } from "@/lib/trackStyles";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const TABS: { value: CaseStudy["track"] | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "automation", label: "Automation" },
  { value: "engineering", label: "Custom Engineering" },
];

export default function CaseStudiesIndex() {
  const [active, setActive] = useState<CaseStudy["track"] | "all">("all");
  const projects = active === "all" ? CASE_STUDIES : CASE_STUDIES.filter((p) => p.track === active);

  return (
    <>
      <div className="mx-auto mb-12 flex w-fit items-center gap-1 rounded-full border border-slate-800 bg-slate-900 p-1">
        {TABS.map((tab) => {
          const isActive = active === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(tab.value)}
              className={`relative rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                isActive ? "text-slate-950" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="case-studies-pill"
                  className="absolute inset-0 rounded-full bg-emerald-400"
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {projects.map((project, i) => {
          const meta = TRACK_META[project.track];
          return (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.05 }}
              whileHover={{ y: -3 }}
            >
              <Link
                href={`/case-studies/${project.id}`}
                className={`group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-[border-color,transform] active:scale-[0.99] ${meta.hoverBorder}`}
              >
                <span className={`text-xs font-semibold uppercase tracking-widest ${meta.eyebrow}`}>
                  {project.category}
                </span>
                <h2 className="mt-3 text-lg font-semibold leading-snug text-slate-100">
                  {project.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-700 bg-slate-950/60 px-2 py-1 text-[11px] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
                  <div className={`flex items-center gap-2 text-sm font-medium ${meta.metricText}`}>
                    <Gauge className="h-4 w-4" />
                    {project.metric}
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-medium text-muted transition-colors ${meta.cta}`}
                  >
                    Read case study
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
