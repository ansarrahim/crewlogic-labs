import { kv } from "@vercel/kv";

export const TRACKED_TOOLS = ["nexus-ai", "sentinel-sec", "solis-33", "stack-core", "pixel-ux"] as const;
export type TrackedTool = (typeof TRACKED_TOOLS)[number];

function isConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function incrementUsage(tool: TrackedTool): Promise<void> {
  if (!isConfigured()) return;
  try {
    await kv.incr(`usage:${tool}`);
  } catch (err) {
    console.error("usage-stats increment error:", err);
  }
}

export async function getUsageStats(): Promise<{ total: number; byTool: Record<string, number> } | null> {
  if (!isConfigured()) return null;
  try {
    const counts = await Promise.all(TRACKED_TOOLS.map((tool) => kv.get<number>(`usage:${tool}`)));
    const byTool: Record<string, number> = {};
    let total = 0;
    TRACKED_TOOLS.forEach((tool, i) => {
      const count = counts[i] ?? 0;
      byTool[tool] = count;
      total += count;
    });
    return { total, byTool };
  } catch (err) {
    console.error("usage-stats read error:", err);
    return null;
  }
}
