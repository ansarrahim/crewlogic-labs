"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gauge } from "lucide-react";
import { CASE_STUDIES } from "@/lib/data";
import Reveal from "@/components/Reveal";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function CaseStudies() {
  return (
    <section id="case-studies" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Case Studies
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            Systems We&apos;ve Engineered
          </h2>
          <p className="mt-4 text-slate-400">
            A sample of production-grade delivery across AI, Web3, and
            enterprise full-stack domains.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {CASE_STUDIES.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
            >
              <Link
                href={`/case-studies/${project.id}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-[border-color,transform] active:scale-[0.99] hover:border-cyan-500/40"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
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
                  <div className="flex items-center gap-2 text-sm font-medium text-cyan-400">
                    <Gauge className="h-4 w-4" />
                    {project.metric}
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-muted transition-colors group-hover:text-emerald-400">
                    Read case study
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
