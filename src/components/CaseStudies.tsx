import { Gauge } from "lucide-react";
import { CASE_STUDIES } from "@/lib/data";

export default function CaseStudies() {
  return (
    <section id="case-studies" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
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
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {CASE_STUDIES.map((project) => (
            <div
              key={project.id}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-cyan-500/40"
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

              <div className="mt-5 flex items-center gap-2 border-t border-slate-800 pt-4 text-sm font-medium text-cyan-400">
                <Gauge className="h-4 w-4" />
                {project.metric}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
