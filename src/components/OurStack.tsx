"use client";

import { Blocks, Brain, Database, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";

const CATEGORIES = [
  {
    icon: Brain,
    label: "AI Models",
    tags: ["Gemini 2.5 Flash", "Claude", "OpenAI"],
  },
  {
    icon: Blocks,
    label: "Automation Engine",
    tags: ["n8n", "Webhooks", "REST APIs"],
  },
  {
    icon: Database,
    label: "Data & Delivery",
    tags: ["Airtable", "Resend", "Postgres", "Redis"],
  },
  {
    icon: ShieldCheck,
    label: "Blockchain & Security",
    tags: ["Solidity", "Hardhat", "OpenZeppelin", "Slither"],
  },
];

export default function OurStack() {
  return (
    <section className="relative overflow-hidden bg-slate-900/20 px-4 py-24 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,theme(colors.slate.800)_1px,transparent_0)] bg-[size:32px_32px] opacity-50"
      />
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Real Stack, Not a Buzzword List
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            The Exact Tools Behind Every Shipped Project
          </h2>
          <p className="mt-4 text-slate-400">
            Every tool below has a real, tested project attached to it — see the case
            studies for proof, not a marketing slide.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category, i) => (
            <Reveal
              key={category.label}
              delay={i * 0.08}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <category.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-100">
                {category.label}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {category.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-slate-700 bg-slate-950/60 px-2 py-1 text-[11px] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
