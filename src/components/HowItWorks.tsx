"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, PackageCheck, PhoneCall } from "lucide-react";
import Reveal from "@/components/Reveal";

const STEPS = [
  {
    icon: PhoneCall,
    title: "A real conversation, not a form",
    body: "We talk through what's actually costing you time or leads — a missed call, a support inbox nobody triages, whatever it is. If there's nothing worth automating yet, I'll tell you that too.",
  },
  {
    icon: Code2,
    title: "Built and tested against real accounts",
    body: "Every workflow gets built in n8n and run against real APIs — your AI provider, your email, your CRM — before you see it. Not a diagram, not a demo video standing in for a working system.",
  },
  {
    icon: PackageCheck,
    title: "Handed off, then tuned for a week",
    body: "You get the workflow JSON, a setup guide, and a week where I'm watching real executions with you to fix whatever the real world throws at it that testing didn't.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-900/20 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            From Call to Running Automation
          </h2>
          <p className="mt-4 text-slate-400">
            No proposal decks, no six-week discovery phase. Three steps, and
            most of the work happens before you ever see an invoice.
          </p>
        </Reveal>

        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-2">
          {STEPS.map((step, i) => (
            <Fragment key={step.title}>
              <Reveal
                delay={i * 0.1}
                className="flex flex-1 flex-col items-center text-center md:items-start md:text-left"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="mt-4 font-mono text-xs font-semibold tracking-widest text-muted">
                  STEP 0{i + 1}
                </span>
                <h3 className="mt-1.5 text-base font-semibold text-slate-100">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {step.body}
                </p>
              </Reveal>
              {i < STEPS.length - 1 && (
                <div className="hidden shrink-0 items-center justify-center pt-5 md:flex">
                  <ArrowRight className="h-5 w-5 text-slate-700" />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <Reveal
          delay={0.24}
          className="mt-10 grid grid-cols-1 gap-6 rounded-2xl border border-slate-800 bg-slate-900/30 p-6 lg:grid-cols-5 lg:items-center"
        >
          <div className="lg:col-span-2">
            <p className="text-sm text-slate-400">
              5 automations already built this way — tested live against
              real Gemini, Resend, and Airtable calls before they were
              listed.
            </p>
            <Link
              href="/automations"
              className="mt-4 inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-[color,border-color,transform] active:scale-[0.97] hover:border-emerald-500/50 hover:text-emerald-400"
            >
              See one run
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40 p-3 lg:col-span-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Real n8n Canvas — Missed-Call Text-Back
            </p>
            <Image
              src="/proof/n8n-missed-call-canvas.png"
              alt="Real n8n workflow canvas: Missed Call Webhook, Parse Call Event, Draft Text-Back via Gemini, Build Message, Send Text-Back via Resend, Respond"
              width={1600}
              height={1000}
              className="w-full rounded-lg border border-slate-800"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
