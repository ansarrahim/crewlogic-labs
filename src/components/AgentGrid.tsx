"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Contrast, Gauge, MessageSquare, ScanSearch, ShieldAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AGENTS, type Agent } from "@/lib/data";
import { OPEN_NEXUS_CHAT_EVENT } from "@/components/NexusChatWidget";
import { openAgentTool, type ToolAgentId } from "@/components/tools/AgentToolsHost";
import UsageStatsBadge from "@/components/UsageStatsBadge";
import Reveal from "@/components/Reveal";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const TOOL_CTA: Record<ToolAgentId, { label: string; icon: LucideIcon }> = {
  "sentinel-sec": { label: "Run Security Scan (Live)", icon: ShieldAlert },
  "solis-33": { label: "Analyze Smart Contract (Live)", icon: ScanSearch },
  "stack-core": { label: "Check System Status (Live)", icon: Gauge },
  "pixel-ux": { label: "Check Color Contrast (Live)", icon: Contrast },
};

// Every class below must appear literally (Tailwind v4 has no config file —
// class detection is static-text scanning, so `text-${accent}-400` would be
// silently purged from the build).
const ACCENT_STYLES: Record<
  Agent["accent"],
  { border: string; iconWrap: string; icon: string; statusBadge: string; dot: string; role: string; check: string; hoverBorder: string; ctaBorder: string; ctaBg: string; ctaText: string; ctaHoverBg: string }
> = {
  emerald: {
    border: "border-emerald-500/30",
    iconWrap: "border-emerald-500/30 bg-emerald-500/10",
    icon: "text-emerald-400",
    statusBadge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    dot: "bg-emerald-500",
    role: "text-emerald-400",
    check: "text-emerald-500",
    hoverBorder: "hover:border-emerald-500/40",
    ctaBorder: "border-emerald-500/40",
    ctaBg: "bg-emerald-500/10",
    ctaText: "text-emerald-400",
    ctaHoverBg: "hover:bg-emerald-500/20",
  },
  indigo: {
    border: "border-indigo-500/30",
    iconWrap: "border-indigo-500/30 bg-indigo-500/10",
    icon: "text-indigo-400",
    statusBadge: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
    dot: "bg-indigo-500",
    role: "text-indigo-300",
    check: "text-indigo-400",
    hoverBorder: "hover:border-indigo-500/40",
    ctaBorder: "border-indigo-500/40",
    ctaBg: "bg-indigo-500/10",
    ctaText: "text-indigo-300",
    ctaHoverBg: "hover:bg-indigo-500/20",
  },
  sky: {
    border: "border-sky-500/30",
    iconWrap: "border-sky-500/30 bg-sky-500/10",
    icon: "text-sky-400",
    statusBadge: "border-sky-500/30 bg-sky-500/10 text-sky-400",
    dot: "bg-sky-500",
    role: "text-sky-400",
    check: "text-sky-500",
    hoverBorder: "hover:border-sky-500/40",
    ctaBorder: "border-sky-500/40",
    ctaBg: "bg-sky-500/10",
    ctaText: "text-sky-400",
    ctaHoverBg: "hover:bg-sky-500/20",
  },
  rose: {
    border: "border-rose-500/30",
    iconWrap: "border-rose-500/30 bg-rose-500/10",
    icon: "text-rose-400",
    statusBadge: "border-rose-500/30 bg-rose-500/10 text-rose-400",
    dot: "bg-rose-500",
    role: "text-rose-400",
    check: "text-rose-500",
    hoverBorder: "hover:border-rose-500/40",
    ctaBorder: "border-rose-500/40",
    ctaBg: "bg-rose-500/10",
    ctaText: "text-rose-400",
    ctaHoverBg: "hover:bg-rose-500/20",
  },
  amber: {
    border: "border-amber-500/30",
    iconWrap: "border-amber-500/30 bg-amber-500/10",
    icon: "text-amber-400",
    statusBadge: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    dot: "bg-amber-500",
    role: "text-amber-400",
    check: "text-amber-500",
    hoverBorder: "hover:border-amber-500/40",
    ctaBorder: "border-amber-500/40",
    ctaBg: "bg-amber-500/10",
    ctaText: "text-amber-400",
    ctaHoverBg: "hover:bg-amber-500/20",
  },
};

function isToolAgent(id: string): id is ToolAgentId {
  return id in TOOL_CTA;
}

function ToolCtaButton({ toolId, accent }: { toolId: ToolAgentId; accent: Agent["accent"] }) {
  const { label, icon: Icon } = TOOL_CTA[toolId];
  const styles = ACCENT_STYLES[accent];
  return (
    <button
      type="button"
      onClick={() => openAgentTool(toolId)}
      className={`mt-6 inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-[background-color,transform] active:scale-[0.97] ${styles.ctaBorder} ${styles.ctaBg} ${styles.ctaText} ${styles.ctaHoverBg}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

export default function AgentGrid() {
  return (
    <section id="squad" className="bg-slate-900/20 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Virtual Engineering Squad
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            5 Specialized AI Agents. One Chain of Command.
          </h2>
          <p className="mt-4 text-slate-400">
            Each agent operates as a dedicated engineering specialist,
            supervised end-to-end by human leadership.
          </p>
          <UsageStatsBadge />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {AGENTS.map((agent, i) => {
            const styles = ACCENT_STYLES[agent.accent];
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, ease: EASE_OUT, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -3 }}
                className={`group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-colors ${styles.hoverBorder}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${styles.iconWrap} ${styles.icon}`}>
                    <agent.icon className="h-6 w-6" />
                  </div>
                  <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${styles.statusBadge}`}>
                    <span className="relative flex h-1.5 w-1.5">
                      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${styles.dot}`} />
                      <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                    </span>
                    {agent.status}
                  </div>
                </div>

                <h3 className="mt-4 font-mono text-lg font-bold tracking-tight text-slate-100">
                  {agent.name}
                </h3>
                <p className={`text-sm font-medium ${styles.role}`}>{agent.role}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-muted">
                  {agent.domain}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {agent.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-700 bg-slate-950/60 px-2 py-1 text-[11px] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="mt-5 flex-1 space-y-2">
                  {agent.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${styles.check}`} />
                      {cap}
                    </li>
                  ))}
                </ul>

                {agent.id === "nexus-ai" ? (
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event(OPEN_NEXUS_CHAT_EVENT))}
                    className={`mt-6 inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-[background-color,transform] active:scale-[0.97] ${styles.ctaBorder} ${styles.ctaBg} ${styles.ctaText} ${styles.ctaHoverBg}`}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Chat with NEXUS-AI (Live)
                  </button>
                ) : isToolAgent(agent.id) ? (
                  <ToolCtaButton toolId={agent.id} accent={agent.accent} />
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
