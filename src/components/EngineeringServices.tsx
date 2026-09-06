"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { ENGINEERING_SERVICES } from "@/lib/data";
import Reveal from "@/components/Reveal";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function EngineeringServices() {
  return (
    <section id="custom-engineering" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Custom Engineering
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            Need Something Custom Built?
          </h2>
          <p className="mt-4 text-slate-400">
            Smart contracts, security audits, and full-stack builds — scoped
            and quoted directly, not sold off a shelf. Indicative starting
            prices below; every project gets a real quote after a scope
            call.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {ENGINEERING_SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-[border-color] hover:border-indigo-500/40"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                Engineering Package
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-100">
                {service.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-snug text-indigo-300">
                {service.tagline}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                {service.description}
              </p>

              <ul className="mt-5 space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm leading-relaxed text-slate-400"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {service.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-slate-700 bg-slate-950/60 px-2 py-1 text-[11px] text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted">{service.scopeNote}</p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
                <span className="text-lg font-bold text-slate-100">
                  Starting at {service.startingPrice}
                </span>
              </div>

              <Link
                href="/#contact"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-indigo-400"
              >
                Get a Quote
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
