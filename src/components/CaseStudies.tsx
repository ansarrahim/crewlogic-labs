"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Gauge } from "lucide-react";
import { CASE_STUDIES, type CaseStudy } from "@/lib/data";
import { TRACK_META } from "@/lib/trackStyles";
import Reveal from "@/components/Reveal";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const TRACKS: CaseStudy["track"][] = ["automation", "engineering"];

export default function CaseStudies() {
  const [track, setTrack] = useState<CaseStudy["track"]>("automation");
  const visible = useMemo(
    () => CASE_STUDIES.filter((project) => project.track === track),
    [track]
  );

  return (
    <section id="case-studies" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Case Studies
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            Systems We&apos;ve Engineered
          </h2>
          <p className="mt-4 text-slate-400">
            Two tracks of real, production-grade delivery — automation
            consulting, and custom blockchain/full-stack engineering.
          </p>
        </Reveal>

        <Reveal
          delay={0.06}
          className="mx-auto mb-10 flex w-fit items-center gap-1 rounded-full border border-slate-800 bg-slate-900/50 p-1"
        >
          <div role="tablist" aria-label="Case study track" className="flex items-center gap-1">
            {TRACKS.map((t) => {
              const meta = TRACK_META[t];
              const active = track === t;
              return (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTrack(t)}
                  className={`relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                    active ? "text-slate-950" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="track-pill"
                      className={`absolute inset-0 rounded-full ${
                        t === "automation" ? "bg-emerald-500" : "bg-indigo-500"
                      }`}
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                    />
                  )}
                  <span className="relative z-10">{meta.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={track}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="grid grid-cols-1 gap-6 lg:grid-cols-3"
          >
            {visible.map((project, i) => {
              const meta = TRACK_META[project.track];
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.08 }}
                  whileHover={{ y: -3 }}
                >
                  <Link
                    href={`/case-studies/${project.id}`}
                    className={`group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-[border-color,transform] active:scale-[0.99] ${meta.hoverBorder}`}
                  >
                    <span className={`text-xs font-semibold uppercase tracking-widest ${meta.eyebrow}`}>
                      {project.category}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-100">
                      {project.title}
                    </h3>
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
