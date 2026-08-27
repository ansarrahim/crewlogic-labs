import { Resend } from "resend";
import { NextResponse } from "next/server";
import { SITE } from "@/lib/data";
import { isRateLimited } from "@/lib/rate-limit";
import { recordCourseSignup } from "@/lib/course-signups";

export const runtime = "nodejs";

// Called cross-origin from the course artifact hosted on claude.ai — unlike
// the main contact form (same-origin), this route needs explicit CORS.
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const MAX_FIELD_LENGTH = 200;
const FROM_ADDRESS = process.env.CONTACT_FROM_EMAIL?.trim() || "CrewLogic Labs <onboarding@resend.dev>";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: Request) {
  const identifier = getClientIdentifier(request);
  if (isRateLimited(identifier)) {
    return NextResponse.json(
      { error: "Too many submissions right now — please wait a moment and try again." },
      { status: 429, headers: { ...CORS_HEADERS, "Retry-After": "30" } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400, headers: CORS_HEADERS });
  }

  const { email, course } = body as Record<string, unknown>;

  if (typeof email !== "string" || !email.trim() || email.length > MAX_FIELD_LENGTH) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400, headers: CORS_HEADERS });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400, headers: CORS_HEADERS });
  }

  const safeEmail = email.trim().toLowerCase();
  const safeCourse = typeof course === "string" ? course.slice(0, 100) : "n8n Agent Engineering";

  let count = 0;
  try {
    count = await recordCourseSignup(safeEmail);
  } catch (error) {
    console.error("recordCourseSignup error:", error);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: SITE.email,
        subject: `New course signup — ${safeCourse}`,
        text: `New signup for "${safeCourse}":\n\n${safeEmail}\n\nTotal signups so far: ${count}`,
      });
    } catch (error) {
      // Don't fail the signup just because the notification email didn't send —
      // the entry is already recorded in Redis above.
      console.error("course-signup notification error:", error);
    }
  }

  return NextResponse.json({ ok: true, count }, { headers: CORS_HEADERS });
}
