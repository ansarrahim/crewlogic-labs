import { redis } from "./redis";

const LIST_KEY = "crewlogic:course-signups:n8n-agent-engineering";

function isConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

export type CourseSignup = { email: string; at: string };

export async function recordCourseSignup(email: string): Promise<number> {
  if (!isConfigured()) return 0;
  const entry: CourseSignup = { email, at: new Date().toISOString() };
  await redis.lpush(LIST_KEY, JSON.stringify(entry));
  return redis.llen(LIST_KEY);
}

export async function getCourseSignups(): Promise<CourseSignup[]> {
  if (!isConfigured()) return [];
  const raw = await redis.lrange<string>(LIST_KEY, 0, -1);
  return raw
    .map((r) => {
      try {
        return JSON.parse(r) as CourseSignup;
      } catch {
        return null;
      }
    })
    .filter((v): v is CourseSignup => v !== null);
}
