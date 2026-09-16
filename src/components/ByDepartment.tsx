"use client";

import Link from "next/link";
import { ArrowRight, Headset, Megaphone, TrendingUp } from "lucide-react";
import Reveal from "@/components/Reveal";

const DEPARTMENTS = [
  {
    icon: Megaphone,
    name: "Marketing",
    subtitle: "Reputation + Response Time",
    tags: ["Reviews", "Sentiment", "Alerts"],
    body: "Know about a bad review the moment it lands, not weeks later — before it costs you the next ten customers who search your name.",
    color: "emerald",
  },
  {
    icon: TrendingUp,
    name: "Sales",
    subtitle: "Speed to Lead",
    tags: ["Lead Response", "Missed Calls", "Follow-Up"],
    body: "Every inbound lead and missed call gets a real, AI-drafted reply in seconds — the single biggest lever on close rate nobody automates.",
    color: "cyan",
  },
  {
    icon: Headset,
    name: "Operations",
    subtitle: "Repetitive Work, Handled",
    tags: ["Support Triage", "Order Sync", "FAQ"],
    body: "The questions you answer every week and the orders that need logging by hand both run themselves — grounded in your real FAQ, never guessing.",
    color: "indigo",
  },
];

const COLOR_CLASSES: Record<string, { icon: string; iconWrap: string; tag: string }> = {
  emerald: {
    icon: "text-emerald-400",
    iconWrap: "border-emerald-500/30 bg-emerald-500/10",
    tag: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  },
  cyan: {
    icon: "text-cyan-400",
    iconWrap: "border-cyan-500/30 bg-cyan-500/10",
    tag: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
  },
  indigo: {
    icon: "text-indigo-400",
    iconWrap: "border-indigo-500/30 bg-indigo-500/10",
    tag: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
  },
};

export default function ByDepartment() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Browse by Department
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            The Same Automations, Organized by Who Feels the Pain
          </h2>
          <p className="mt-4 text-slate-400">
            Not sure which template fits? Start from whichever team is drowning right
            now.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {DEPARTMENTS.map((dept, i) => {
            const colors = COLOR_CLASSES[dept.color];
            return (
              <Reveal
                key={dept.name}
                delay={i * 0.1}
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${colors.iconWrap} ${colors.icon}`}>
                  <dept.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-100">{dept.name}</h3>
                <p className={`mt-1 text-sm font-medium ${colors.icon}`}>{dept.subtitle}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                  {dept.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {dept.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${colors.tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/automations"
                  className="mt-5 flex items-center gap-1 border-t border-slate-800 pt-4 text-xs font-medium text-muted transition-colors hover:text-emerald-400"
                >
                  Explore {dept.name}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
