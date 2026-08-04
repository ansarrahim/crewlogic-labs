"use client";

import { useEffect, useState } from "react";
import { Contrast, Gauge, ShieldAlert, type LucideIcon } from "lucide-react";
import AgentToolModal from "@/components/tools/AgentToolModal";
import SentinelScanTool from "@/components/tools/SentinelScanTool";
import SolisContractTool from "@/components/tools/SolisContractTool";
import StackStatusTool from "@/components/tools/StackStatusTool";
import PixelContrastTool from "@/components/tools/PixelContrastTool";

export const OPEN_AGENT_TOOL_EVENT = "open-agent-tool";

export type ToolAgentId = "sentinel-sec" | "solis-33" | "stack-core" | "pixel-ux";

export function openAgentTool(agentId: ToolAgentId) {
  window.dispatchEvent(new CustomEvent<ToolAgentId>(OPEN_AGENT_TOOL_EVENT, { detail: agentId }));
}

const TOOL_CONFIG: Record<
  ToolAgentId,
  { title: string; subtitle: string; icon: LucideIcon; Component: () => React.JSX.Element }
> = {
  "sentinel-sec": {
    title: "SENTINEL-SEC",
    subtitle: "Live — Static Analysis Engine",
    icon: ShieldAlert,
    Component: SentinelScanTool,
  },
  "solis-33": {
    title: "SOLIS-33",
    subtitle: "Live — Solidity Heuristic Scanner",
    icon: ShieldAlert,
    Component: SolisContractTool,
  },
  "stack-core": {
    title: "STACK-CORE",
    subtitle: "Live — Server-Side Status Check",
    icon: Gauge,
    Component: StackStatusTool,
  },
  "pixel-ux": {
    title: "PIXEL-UX",
    subtitle: "Live — WCAG Contrast Engine",
    icon: Contrast,
    Component: PixelContrastTool,
  },
};

export default function AgentToolsHost() {
  const [activeAgentId, setActiveAgentId] = useState<ToolAgentId | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ToolAgentId>).detail;
      if (detail) setActiveAgentId(detail);
    };
    window.addEventListener(OPEN_AGENT_TOOL_EVENT, handler);
    return () => window.removeEventListener(OPEN_AGENT_TOOL_EVENT, handler);
  }, []);

  if (!activeAgentId) return null;

  const config = TOOL_CONFIG[activeAgentId];
  const ToolComponent = config.Component;

  return (
    <AgentToolModal
      icon={config.icon}
      title={config.title}
      subtitle={config.subtitle}
      onClose={() => setActiveAgentId(null)}
    >
      <ToolComponent />
    </AgentToolModal>
  );
}
