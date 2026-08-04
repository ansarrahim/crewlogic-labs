import { NextResponse } from "next/server";
import { getUsageStats } from "@/lib/usage-stats";

export const runtime = "nodejs";

export async function GET() {
  const stats = await getUsageStats();
  return NextResponse.json({ stats });
}
