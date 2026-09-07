"use client";

import Link from "next/link";
import { ClipboardCheck, MessageSquareText, SearchCheck } from "lucide-react";
import Reveal from "@/components/Reveal";

const STEPS = [
  {
    icon: MessageSquareText,
    text: "Send me one process that's eating your time — a form, a phone line, a support inbox.",
  },
  {
    icon: SearchCheck,
    text: "I look at it and tell you honestly whether it's worth automating, and roughly what it'd take.",
  },
  {
    icon: ClipboardCheck,
    text: "No pitch deck, no obligation. If it's not worth automating, I'll say so.",
  },
];

export default function FreeAuditSection() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-slate-900/50 to-slate-900/50 p-8 sm:p-10">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Free Automation Audit
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
            Not Sure What&apos;s Worth Automating? Find Out for Free.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
            Before you spend anything, send me one specific process and I&apos;ll tell
            you straight whether automating it is worth your money.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.text} className="flex flex-col items-center text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <step.icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_25px_rgba(184,147,90,0.4)] transition-[background-color,transform] active:scale-[0.97] hover:bg-emerald-400"
          >
            Get My Free Audit
          </Link>
        </div>
      </div>
    </section>
  );
}
