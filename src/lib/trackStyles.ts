import type { CaseStudy } from "@/lib/data";

export const TRACK_META: Record<
  CaseStudy["track"],
  {
    label: string;
    eyebrow: string;
    metricBadge: string;
    metricText: string;
    liveBadge: string;
    liveText: string;
    hoverBorder: string;
    numberText: string;
    cta: string;
    checkIcon: string;
  }
> = {
  automation: {
    label: "Automation",
    eyebrow: "text-emerald-400",
    metricBadge: "border-emerald-500/30 bg-emerald-500/10",
    metricText: "text-emerald-400",
    liveBadge: "border-cyan-500/30 bg-cyan-500/10 hover:border-cyan-400/50",
    liveText: "text-cyan-300 hover:text-cyan-200",
    hoverBorder: "hover:border-cyan-500/40",
    numberText: "text-emerald-400",
    cta: "group-hover:text-emerald-400",
    checkIcon: "text-emerald-500",
  },
  engineering: {
    label: "Custom Engineering",
    eyebrow: "text-indigo-300",
    metricBadge: "border-indigo-500/30 bg-indigo-500/10",
    metricText: "text-indigo-400",
    liveBadge: "border-indigo-500/30 bg-indigo-500/10 hover:border-indigo-400/50",
    liveText: "text-indigo-300 hover:text-indigo-200",
    hoverBorder: "hover:border-indigo-500/40",
    numberText: "text-indigo-400",
    cta: "group-hover:text-indigo-400",
    checkIcon: "text-indigo-400",
  },
};
