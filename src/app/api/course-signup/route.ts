import { Resend } from "resend";
import { NextResponse } from "next/server";
import { SITE } from "@/lib/data";
import { isRateLimited } from "@/lib/rate-limit";
import { recordCourseSignup } from "@/lib/course-signups";

export const runtime = "nodejs";

// Called cross-origin from the course artifact hosted on claude.ai — kept for
// direct API testing and any future JS-capable caller. The artifact itself
// can't actually reach this via fetch (its sandbox blocks cross-origin
// fetch/XHR), so its real path is the plain form-POST handling below, which
// opens in a background tab rather than trying to redirect back into the
// artifact's own URL (verified: a redirect into claude.ai/code/artifact/...
// from an external POST doesn't resolve — the platform serves a "not found"
// page instead of the course).
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

function confirmationPage(opts: { ok: boolean; heading: string; message: string }): NextResponse {
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${opts.ok ? "You're in" : "Something went wrong"}</title>
<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: #0b0f0c; color: #eef1ea; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; padding: 1.5rem; }
  .card { max-width: 380px; text-align: center; }
  .icon { font-size: 2.2rem; margin-bottom: 0.75rem; }
  h1 { font-size: 1.3rem; margin: 0 0 0.6rem; }
  p { color: #a3ab98; font-size: 0.95rem; line-height: 1.5; margin: 0; }
</style></head>
<body>
  <div class="card">
    <div class="icon">${opts.ok ? "✅" : "⚠️"}</div>
    <h1>${opts.heading}</h1>
    <p>${opts.message}</p>
  </div>
</body></html>`;
  return new NextResponse(html, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });
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

  // --- Plain <form> submission path: a real page navigation (opened in a
  // background tab by the course page), not fetch/XHR, so it isn't blocked
  // by the artifact sandbox's CSP the way a JS call would be. Responds with
  // a real confirmation page — this tab isn't the course, so there's
  // nothing to redirect back into.
  if (isFormSubmit) {
    const form = await request.formData();
    const email = String(form.get("email") ?? "").trim();
    const course = String(form.get("course") ?? "n8n Agent Engineering").slice(0, 100);

    if (isRateLimited(identifier)) {
      return confirmationPage({
        ok: false,
        heading: "Too many attempts",
        message: "Wait a moment and try again from the course tab.",
      });
    }
    if (!email || email.length > MAX_FIELD_LENGTH || !EMAIL_PATTERN.test(email)) {
      return confirmationPage({
        ok: false,
        heading: "That email didn't look right",
        message: "Go back to the course tab and try again with a valid email address.",
      });
    }

    const safeEmail = email.toLowerCase();
    await notifyAndRecord(safeEmail, course);

    return confirmationPage({
      ok: true,
      heading: "You're in",
      message: "Signed up. You can close this tab and go back to the course — it's already unlocked there.",
    });
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
