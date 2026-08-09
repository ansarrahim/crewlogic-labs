import { redis } from "./redis";

const DAY_TTL_SECONDS = 60 * 60 * 24 * 60;

function isConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function dayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export async function recordLead(): Promise<void> {
  if (!isConfigured()) return;
  try {
    const key = `crewlogic:leads:day:${dayKey(new Date())}`;
    await redis.incr(key);
    await redis.expire(key, DAY_TTL_SECONDS);
  } catch (err) {
    console.error("recordLead error:", err);
  }
}

export type DailyCount = { date: string; count: number };

export async function getLeadsDaily(days: number): Promise<DailyCount[] | null> {
  if (!isConfigured()) return null;
  try {
    const now = new Date();
    const dates = Array.from({ length: days }, (_, i) => {
      const d = new Date(now);
      d.setUTCDate(d.getUTCDate() - (days - 1 - i));
      return dayKey(d);
    });
    const counts = await Promise.all(
      dates.map((date) => redis.get<number>(`crewlogic:leads:day:${date}`))
    );
    return dates.map((date, i) => ({ date, count: counts[i] ?? 0 }));
  } catch (err) {
    console.error("getLeadsDaily error:", err);
    return null;
  }
}
