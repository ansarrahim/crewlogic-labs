"use client";

import Link from "next/link";
import { Blocks, Brain, Database, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";

type Tag = { name: string; note: string; href?: string };

const CATEGORIES: { icon: typeof Brain; label: string; tags: Tag[] }[] = [
  {
    icon: Brain,
    label: "AI Models",
    tags: [
      { name: "Gemini 2.5 Flash", note: "Powers the live COMPASS-AI chat and every template's AI-drafted replies." },
      { name: "Claude", note: "Used for reasoning and code generation in this project's own build process." },
      { name: "OpenAI", note: "Available as an alternate AI step for automation templates that need it." },
    ],
  },
  {
    icon: Blocks,
    label: "Automation Engine",
    tags: [
      {
        name: "n8n",
        note: "The engine behind every template — see why we picked its boring HTTP Request node over the AI Agent node.",
        href: "/blog/http-request-vs-ai-agent-node",
      },
      { name: "Webhooks", note: "The entry point for every automation template — your form or CRM calls it directly." },
      { name: "REST APIs", note: "How templates talk to your existing tools without a custom integration." },
    ],
  },
  {
    icon: Database,
    label: "Data & Delivery",
    tags: [
      { name: "Airtable", note: "Lightweight CRM/inventory log behind the New Order Sync template." },
      { name: "Resend", note: "Sends the AI-drafted replies and alert emails across the template catalog." },
      { name: "Postgres", note: "Backing store for production builds like Framekit and PulseQueue." },
      { name: "Redis", note: "Powers rate limiting and usage tracking on this site itself." },
    ],
  },
  {
    icon: ShieldCheck,
    label: "Blockchain & Security",
    tags: [
      { name: "Solidity", note: "The contract language behind Chain Escrow's on-chain fund logic." },
      { name: "Hardhat", note: "Test and deploy tooling — 34 real tests behind Chain Escrow." },
      { name: "OpenZeppelin", note: "Audited primitives used on every fund-moving contract path." },
      { name: "Slither", note: "The real static analysis engine behind the Contract Auditor tool." },
    ],
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
                {category.tags.map((tag) => {
                  const chipClass =
                    "group/tag relative rounded-md border border-slate-700 bg-slate-950/60 px-2 py-1 text-[11px] text-slate-300 transition-colors hover:border-emerald-500/40";
                  const tooltip = (
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 scale-95 rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-[11px] font-normal leading-relaxed text-slate-300 opacity-0 shadow-xl transition-[opacity,transform] duration-150 ease-out group-hover/tag:scale-100 group-hover/tag:opacity-100 group-focus-visible/tag:scale-100 group-focus-visible/tag:opacity-100"
                    >
                      {tag.note}
                    </span>
                  );

                  if (tag.href) {
                    return (
                      <Link key={tag.name} href={tag.href} className={chipClass}>
                        {tag.name}
                        {tooltip}
                      </Link>
                    );
                  }

                  return (
                    <span key={tag.name} tabIndex={0} className={chipClass}>
                      {tag.name}
                      {tooltip}
                    </span>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
