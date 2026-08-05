import { Resend } from "resend";
import { NextResponse } from "next/server";
import { SITE, STACK_NEEDED_OPTIONS } from "@/lib/data";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_FIELD_LENGTH = 200;
const MAX_DETAILS_LENGTH = 4000;
const FROM_ADDRESS = process.env.CONTACT_FROM_EMAIL?.trim() || "CrewLogic Labs <onboarding@resend.dev>";

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const identifier = getClientIdentifier(request);
  if (isRateLimited(identifier)) {
    return NextResponse.json(
      { error: "Too many submissions right now — please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": "30" } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, stack, details } = body as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof stack !== "string" ||
    typeof details !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !details.trim()
  ) {
    return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
  }

  if (
    name.length > MAX_FIELD_LENGTH ||
    email.length > MAX_FIELD_LENGTH ||
    details.length > MAX_DETAILS_LENGTH
  ) {
    return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!STACK_NEEDED_OPTIONS.includes(stack as (typeof STACK_NEEDED_OPTIONS)[number])) {
    return NextResponse.json({ error: "Please choose a valid stack option." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "The contact form isn't connected to email delivery yet. Add RESEND_API_KEY to .env.local and restart the dev server.",
      },
      { status: 503 }
    );
  }

  const safeName = name.replace(/[\r\n]+/g, " ").trim();

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: SITE.email,
      replyTo: email,
      subject: `New project inquiry from ${safeName} — ${stack}`,
      text: `Name: ${safeName}\nEmail: ${email}\nStack needed: ${stack}\n\nDetails:\n${details}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "The email service rejected this message. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Couldn't send your message right now. Please try again shortly." },
      { status: 502 }
    );
  }
}
