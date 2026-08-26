"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, ShieldCheck } from "lucide-react";
import { AVAILABILITY, CEO, SITE } from "@/lib/data";

const BADGES = [
  { icon: ShieldCheck, label: `Led by Engr. ${CEO.name}` },
  { icon: MapPin, label: SITE.location },
  { icon: ShieldCheck, label: "Production-Grade Engineering" },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 15%, rgba(184,147,90,0.16), transparent 45%), radial-gradient(circle at 80% 10%, rgba(184,147,90,0.14), transparent 40%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mb-6 flex flex-wrap items-center justify-center gap-2"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {SITE.tagline}
          </div>

          <div
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide ${
              AVAILABILITY.open
                ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
                : "border-slate-700 bg-slate-900/60 text-slate-400"
            }`}
          >
            <span className="relative flex h-2 w-2">
              {AVAILABILITY.open && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${AVAILABILITY.open ? "bg-cyan-500" : "bg-slate-500"}`}
              />
            </span>
            {AVAILABILITY.open ? AVAILABILITY.label : AVAILABILITY.closedLabel}
          </div>
        </motion.div>

        <motion.h1
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.06 }}
          className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-100 sm:text-5xl lg:text-6xl"
        >
          Engineering Enterprise Systems with{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Human Leadership
          </span>{" "}
          &amp; Autonomous AI Crews.
        </motion.h1>

        <motion.p
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          We architect Web3 dApps, complex backend microservices, and
          LLM-powered automation pipelines. Software engineering standards
          backed by virtual AI specialists.
        </motion.p>

        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.18 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {BADGES.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-300"
            >
              <badge.icon className="h-3.5 w-3.5 text-cyan-400" />
              {badge.label}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.24 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#squad"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_25px_rgba(184,147,90,0.4)] transition-[background-color,transform] active:scale-[0.97] hover:bg-emerald-400 sm:w-auto"
          >
            Explore Virtual Squad
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-100 transition-[color,border-color,transform] active:scale-[0.97] hover:border-cyan-500/50 hover:text-cyan-400 sm:w-auto"
          >
            <Calendar className="h-4 w-4" />
            Schedule Tech Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
