import { redis } from "./redis";

export const TRACKED_TOOLS = ["nexus-ai", "sentinel-sec", "solis-33", "stack-core", "pixel-ux"] as const;
export type TrackedTool = (typeof TRACKED_TOOLS)[number];

function isConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function monthKey(date: Date): string {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

export async function incrementUsage(tool: TrackedTool): Promise<void> {
  if (!isConfigured()) return;
  try {
    await redis.incr(`usage:${tool}`);
    await redis.incr(`usage:month:${monthKey(new Date())}`);
  } catch (err) {
    console.error("usage-stats increment error:", err);
  }
}

export async function getUsageStats(): Promise<{ total: number; byTool: Record<string, number> } | null> {
  if (!isConfigured()) return null;
  try {
    const counts = await Promise.all(TRACKED_TOOLS.map((tool) => redis.get<number>(`usage:${tool}`)));
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

export async function getUsageThisAndLastMonth(): Promise<{ thisMonth: number; lastMonth: number } | null> {
  if (!isConfigured()) return null;
  try {
    const now = new Date();
    const lastMonthDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
    const [thisMonth, lastMonth] = await Promise.all([
      redis.get<number>(`usage:month:${monthKey(now)}`),
      redis.get<number>(`usage:month:${monthKey(lastMonthDate)}`),
    ]);
    return { thisMonth: thisMonth ?? 0, lastMonth: lastMonth ?? 0 };
  } catch (err) {
    console.error("usage-stats month read error:", err);
    return null;
  }
}
