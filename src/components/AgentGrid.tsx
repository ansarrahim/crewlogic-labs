"use client";

import { CheckCircle2, Contrast, Gauge, MessageSquare, ScanSearch, ShieldAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AGENTS } from "@/lib/data";
import { OPEN_NEXUS_CHAT_EVENT } from "@/components/NexusChatWidget";
import { openAgentTool, type ToolAgentId } from "@/components/tools/AgentToolsHost";

const TOOL_CTA: Record<ToolAgentId, { label: string; icon: LucideIcon }> = {
  "sentinel-sec": { label: "Run Security Scan (Live)", icon: ShieldAlert },
  "solis-33": { label: "Analyze Smart Contract (Live)", icon: ScanSearch },
  "stack-core": { label: "Check System Status (Live)", icon: Gauge },
  "pixel-ux": { label: "Check Color Contrast (Live)", icon: Contrast },
};

function isToolAgent(id: string): id is ToolAgentId {
  return id in TOOL_CTA;
}

function ToolCtaButton({ toolId }: { toolId: ToolAgentId }) {
  const { label, icon: Icon } = TOOL_CTA[toolId];
  return (
    <button
      type="button"
      onClick={() => openAgentTool(toolId)}
      className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

export default function AgentGrid() {
  return (
    <section id="squad" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
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
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-emerald-500/40"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <agent.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  {agent.status}
                </div>
              </div>

              <h3 className="mt-4 font-mono text-lg font-bold tracking-tight text-slate-100">
                {agent.name}
              </h3>
              <p className="text-sm font-medium text-cyan-400">{agent.role}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">
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
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    {cap}
                  </li>
                ))}
              </ul>

              {agent.id === "nexus-ai" ? (
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event(OPEN_NEXUS_CHAT_EVENT))}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
                >
                  <MessageSquare className="h-4 w-4" />
                  Chat with NEXUS-AI (Live)
                </button>
              ) : isToolAgent(agent.id) ? (
                <ToolCtaButton toolId={agent.id} />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
