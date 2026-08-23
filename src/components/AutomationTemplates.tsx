"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";
import { AUTOMATION_TEMPLATES } from "@/lib/data";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function AutomationTemplates() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {AUTOMATION_TEMPLATES.map((template, i) => (
        <motion.div
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.08 }}
          whileHover={{ y: -3 }}
          className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-[border-color] hover:border-emerald-500/40"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            n8n Workflow Template
          </span>
          <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-100">
            {template.title}
          </h3>
          <p className="mt-2 text-sm font-medium leading-snug text-emerald-400">
            {template.tagline}
          </p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
            {template.description}
          </p>

          <ul className="mt-5 space-y-2">
            {template.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm leading-relaxed text-slate-400"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {template.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-slate-700 bg-slate-950/60 px-2 py-1 text-[11px] text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
            <span className="text-lg font-bold text-slate-100">{template.price}</span>
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
              <Clock className="h-3.5 w-3.5" />
              {template.setupTime}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
