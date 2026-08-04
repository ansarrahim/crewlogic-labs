import { NextResponse } from "next/server";
import { incrementUsage, TRACKED_TOOLS, type TrackedTool } from "@/lib/usage-stats";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const identifier = getClientIdentifier(request);
  if (isRateLimited(identifier)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const tool = (body as { tool?: unknown })?.tool;

  if (typeof tool !== "string" || !TRACKED_TOOLS.includes(tool as TrackedTool)) {
    return NextResponse.json({ error: "Unknown tool." }, { status: 400 });
  }

  await incrementUsage(tool as TrackedTool);
  return NextResponse.json({ ok: true });
}
