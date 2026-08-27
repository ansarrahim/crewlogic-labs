import { Resend } from "resend";
import { NextResponse } from "next/server";
import { SITE } from "@/lib/data";
import { isRateLimited } from "@/lib/rate-limit";
import { recordCourseSignup } from "@/lib/course-signups";

export const runtime = "nodejs";

// Called cross-origin from the course artifact hosted on claude.ai — kept for
// direct API testing and any future JS-capable caller. The artifact itself
// can't actually reach this via fetch (its sandbox blocks cross-origin
// fetch/XHR), so its real path is the plain form-POST handling below.
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const MAX_FIELD_LENGTH = 200;
const FROM_ADDRESS = process.env.CONTACT_FROM_EMAIL?.trim() || "CrewLogic Labs <onboarding@resend.dev>";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Open-redirect guard: only ever redirect back to claude.ai (where the
// course artifact is served), never to an arbitrary attacker-supplied URL.
const ALLOWED_RETURN_PREFIXES = ["https://claude.ai/", "https://preview.claude.ai/"];

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isSafeReturnTo(url: string): boolean {
  return ALLOWED_RETURN_PREFIXES.some((prefix) => url.startsWith(prefix));
}

async function notifyAndRecord(email: string, course: string): Promise<number> {
  let count = 0;
  try {
    count = await recordCourseSignup(email);
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
        subject: `New course signup — ${course}`,
        text: `New signup for "${course}":\n\n${email}\n\nTotal signups so far: ${count}`,
      });
    } catch (error) {
      // Don't fail the signup just because the notification email didn't send —
      // the entry is already recorded in Redis above.
      console.error("course-signup notification error:", error);
    }
  }
  return count;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: Request) {
  const identifier = getClientIdentifier(request);
  const contentType = request.headers.get("content-type") ?? "";
  const isFormSubmit = contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");

  // --- Plain <form> submission path: a real page navigation, not fetch/XHR,
  // so it isn't blocked by the artifact sandbox's CSP the way a JS call
  // would be. Success and failure are both communicated by redirecting back
  // to the artifact with a query flag, since there's no JS on the other end
  // to read a JSON body.
  if (isFormSubmit) {
    const form = await request.formData();
    const email = String(form.get("email") ?? "").trim();
    const course = String(form.get("course") ?? "n8n Agent Engineering").slice(0, 100);
    const returnTo = String(form.get("return_to") ?? "");

    if (!isSafeReturnTo(returnTo)) {
      return NextResponse.json({ error: "Invalid return_to." }, { status: 400 });
    }

    if (isRateLimited(identifier)) {
      return NextResponse.redirect(`${returnTo}${returnTo.includes("?") ? "&" : "?"}joined=0&error=rate_limited`, 303);
    }
    if (!email || email.length > MAX_FIELD_LENGTH || !EMAIL_PATTERN.test(email)) {
      return NextResponse.redirect(`${returnTo}${returnTo.includes("?") ? "&" : "?"}joined=0&error=invalid_email`, 303);
    }

    const safeEmail = email.toLowerCase();
    await notifyAndRecord(safeEmail, course);

    return NextResponse.redirect(`${returnTo}${returnTo.includes("?") ? "&" : "?"}joined=1`, 303);
  }

  // --- JSON path (direct API testing / any JS-capable caller) ---
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
  const count = await notifyAndRecord(safeEmail, safeCourse);

  return NextResponse.json({ ok: true, count }, { headers: CORS_HEADERS });
}
