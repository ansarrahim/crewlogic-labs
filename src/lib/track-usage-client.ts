import type { TrackedTool } from "@/lib/usage-stats";

export function trackUsage(tool: TrackedTool) {
  fetch("/api/track-usage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tool }),
    keepalive: true,
  }).catch(() => {
    // Best-effort — usage tracking should never block or break the tool.
  });
}
