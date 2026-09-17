"use client";

import { FlaskConical, ScrollText, ShieldCheck, UserCheck } from "lucide-react";
import { CEO } from "@/lib/data";
import Reveal from "@/components/Reveal";

const REASONS = [
  {
    icon: UserCheck,
    title: "No Agency Layer",
    body: `You work directly with ${CEO.name}, the person actually writing the code and making the architecture calls — not a project manager relaying between you and an engineer you'll never talk to.`,
  },
  {
    icon: FlaskConical,
    title: "Verified, Not Just Delivered",
    body: "Real automated test suites and self-audit passes before anything ships — the same process behind Chain Escrow's 34 tests and 3 audit passes, not a demo that only survives the happy path.",
  },
  {
    icon: ScrollText,
    title: "Scoped Honestly",
    body: "Every engagement starts with a real scope call before a real quote — starting prices are a floor, not a bait-and-switch number that grows once you're committed.",
  },
  {
    icon: ShieldCheck,
    title: "Human-in-the-Loop, By Design",
    body: 'The "70/30 Engineering Rule": AI agents accelerate implementation, but architecture decisions, security review, and final QA stay with a human — always.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            The Difference Between a Freelancer and an Agency Layer
          </h2>
          <p className="mt-4 text-slate-400">
            No account managers, no junior devs learning on your project — just the
            engineer who shipped the case studies above.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {REASONS.map((reason, i) => (
            <Reveal
              key={reason.title}
              delay={i * 0.08}
              className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                <reason.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-100">{reason.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{reason.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
