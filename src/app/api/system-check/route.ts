import { NextResponse } from "next/server";
import { assertPublicHostname, checkTls } from "@/lib/system-check";
import { isRateLimited } from "@/lib/rate-limit";
import { incrementUsage } from "@/lib/usage-stats";

export const runtime = "nodejs";

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const identifier = getClientIdentifier(request);
  if (isRateLimited(identifier)) {
    return NextResponse.json(
      { error: "Too many checks right now — please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": "30" } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const rawUrl = (body as { url?: unknown })?.url;
  if (typeof rawUrl !== "string" || rawUrl.trim().length === 0 || rawUrl.length > 500) {
    return NextResponse.json({ error: "Provide a valid URL." }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(rawUrl.includes("://") ? rawUrl : `https://${rawUrl}`);
  } catch {
    return NextResponse.json({ error: "That doesn't look like a valid URL." }, { status: 400 });
  }

  if (target.protocol !== "http:" && target.protocol !== "https:") {
    return NextResponse.json({ error: "Only http:// and https:// URLs are supported." }, { status: 400 });
  }

  try {
    await assertPublicHostname(target.hostname);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "That host isn't allowed." },
      { status: 400 }
    );
  }

  const start = Date.now();
  try {
    const res = await fetch(target.toString(), {
      method: "GET",
      redirect: "manual",
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "CrewLogicLabs-StackCore-StatusCheck/1.0" },
    });
    const responseTimeMs = Date.now() - start;
    const tlsInfo = target.protocol === "https:" ? await checkTls(target.hostname) : null;

    const securityHeaders = [
      "content-security-policy",
      "strict-transport-security",
      "x-frame-options",
      "x-content-type-options",
      "referrer-policy",
      "permissions-policy",
    ].map((name) => ({ name, present: res.headers.has(name) }));

    void incrementUsage("stack-core");

    return NextResponse.json({
      statusCode: res.status,
      statusText: res.statusText,
      responseTimeMs,
      server: res.headers.get("server"),
      contentType: res.headers.get("content-type"),
      tls: tlsInfo,
      securityHeaders,
    });
  } catch (error) {
    console.error("STACK-CORE status check error:", error);
    return NextResponse.json(
      { error: "Could not reach that host — it may be down, blocking requests, or too slow to respond." },
      { status: 502 }
    );
  }
}
