"use client";

import { motion } from "framer-motion";
import { Handshake, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import Reveal from "@/components/Reveal";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function Testimonials() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Client Voices
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            What Teams Say
          </h2>
        </Reveal>

        {TESTIMONIALS.length === 0 ? (
          <Reveal delay={0.1} className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <Handshake className="h-6 w-6" />
            </div>
            <p className="text-sm text-slate-400">
              CrewLogic Labs is newly live — testimonials will appear here as we deliver for
              real clients. If you&apos;d like to be the first, scope a project below.
            </p>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.08 }}
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
              >
                <Quote className="h-5 w-5 text-emerald-500" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 border-t border-slate-800 pt-4">
                  <p className="text-sm font-semibold text-slate-100">{t.name}</p>
                  <p className="text-xs text-slate-500">
                    {t.role}, {t.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
