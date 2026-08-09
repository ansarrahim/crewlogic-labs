import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, signAdminSession } from "@/lib/admin-auth";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function passwordsMatch(submitted: string, expected: string): boolean {
  const a = Buffer.from(submitted);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const identifier = getClientIdentifier(request);
  const loginUrl = new URL("/admin/login", request.url);

  if (isRateLimited(identifier)) {
    loginUrl.searchParams.set("error", "rate-limited");
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const formData = await request.formData();
  const password = formData.get("password");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    loginUrl.searchParams.set("error", "not-configured");
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  if (typeof password !== "string" || !passwordsMatch(password, expected)) {
    loginUrl.searchParams.set("error", "invalid");
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const response = NextResponse.redirect(new URL("/admin/metrics", request.url), { status: 303 });
  response.cookies.set(ADMIN_SESSION_COOKIE, signAdminSession(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
