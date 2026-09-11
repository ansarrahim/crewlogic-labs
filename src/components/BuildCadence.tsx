"use client";

import { CalendarCheck, MessagesSquare, PackageCheck } from "lucide-react";
import Reveal from "@/components/Reveal";

const PHASES = [
  {
    icon: CalendarCheck,
    label: "Week 1",
    title: "Scope Call & Architecture",
    body: "A real scope call, then a written technical plan — exact deliverables, exact timeline, locked before any code gets written. No guessing what you're paying for.",
  },
  {
    icon: MessagesSquare,
    label: "Every Week",
    title: "A Real Progress Update",
    body: "What shipped, what's next, and anything blocking it — sent every week the project runs. Not a black box you check in on at the end and hope for the best.",
  },
  {
    icon: PackageCheck,
    label: "Final Week",
    title: "Test, Handoff & Docs",
    body: "Full test suite run and passing, deployed, documented, and one revision round included — so you're not on your own the moment it ships.",
  },
];

export default function BuildCadence() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            How a Build Actually Runs
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            No Black Box Between Scope Call and Delivery
          </h2>
          <p className="mt-4 text-slate-400">
            Custom Engineering projects run for weeks, not minutes — here's the actual
            cadence, not just a delivery date.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PHASES.map((phase, i) => (
            <Reveal
              key={phase.title}
              delay={i * 0.1}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                <phase.icon className="h-5 w-5" />
              </div>
              <span className="mt-4 font-mono text-xs font-semibold uppercase tracking-widest text-muted">
                {phase.label}
              </span>
              <h3 className="mt-1.5 text-base font-semibold text-slate-100">
                {phase.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{phase.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
