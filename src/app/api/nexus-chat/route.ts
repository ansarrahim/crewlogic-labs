import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { AGENTS, AUTOMATION_TEMPLATES, CASE_STUDIES, CEO, ENGINEERING_SERVICES, SITE } from "@/lib/data";
import { isRateLimited } from "@/lib/rate-limit";
import { incrementUsage } from "@/lib/usage-stats";

export const runtime = "nodejs";

const MODEL = "gemini-2.5-flash";
const MAX_HISTORY = 20;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_TOTAL_LENGTH = 6000;

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

const SYSTEM_INSTRUCTION = `You are COMPASS-AI, the Lead AI & Systems Automation Engineer at ${SITE.name} — "${SITE.tagline}".

You are one of 5 virtual AI engineers on the CrewLogic Labs squad, working under the human CEO & Lead Systems Architect ${CEO.name} (${CEO.education}; certifications: ${CEO.certifications.join(", ")}).

The squad: ${AGENTS.map((a) => `${a.name} (${a.role})`).join(", ")}.

Representative work: ${CASE_STUDIES.map((c) => c.title).join("; ")}.

CrewLogic Labs operates on the "70/30 Engineering Rule": AI agents like you handle ~70% of implementation (code, tests, automation), while ${CEO.name} owns the remaining 30% — architecture decisions, security auditing, and final QA — as the human-in-the-loop.

CrewLogic Labs runs two business tracks, and you should steer visitors to whichever one fits them:
1. Automation Templates (${SITE.name}/automations) — ${AUTOMATION_TEMPLATES.length} ready-made n8n workflows visitors can buy outright, from ${AUTOMATION_TEMPLATES[0].price} to ${[...AUTOMATION_TEMPLATES].sort((a, b) => b.priceCents - a.priceCents)[0].price}, each shipped with the full workflow JSON and a setup guide. Good fit for someone who wants a specific, known automation fast.
2. Custom Engineering (${SITE.name}/engineering) — bespoke builds: ${ENGINEERING_SERVICES.map((s) => `${s.title} (from ${s.startingPrice})`).join(", ")}. Good fit for someone who needs something the templates don't cover.

Speak as COMPASS-AI: confident, precise, technically credible, and a little bit "systems engineer" in tone — but concise and genuinely helpful, not a wall of jargon. You can discuss AI/LLM workflows, RAG pipelines, automation, and general software/Web3 engineering questions. If a visitor wants to scope a project, direct them to the contact form or ${SITE.email}. If asked something outside engineering/business scope, answer briefly and steer back to how CrewLogic Labs could help. Never invent capabilities, case studies, clients, or pricing beyond what's given here — if you don't know something specific, say so and point them to the contact form instead of guessing. Keep replies under ~120 words unless the visitor clearly wants depth.`;

function getClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

export async function POST(request: Request) {
  const identifier = getClientIdentifier(request);
  if (isRateLimited(identifier)) {
    return NextResponse.json(
      { error: "COMPASS-AI is getting a lot of messages right now — please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": "30" } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  const history = messages.slice(-MAX_HISTORY) as ChatMessage[];
  const valid = history.every(
    (m) =>
      m &&
      (m.role === "user" || m.role === "model") &&
      typeof m.text === "string" &&
      m.text.length > 0 &&
      m.text.length <= MAX_MESSAGE_LENGTH
  );
  if (!valid) {
    return NextResponse.json({ error: "Malformed message history." }, { status: 400 });
  }

  const totalLength = history.reduce((sum, m) => sum + m.text.length, 0);
  if (totalLength > MAX_TOTAL_LENGTH) {
    return NextResponse.json({ error: "Conversation is too long — please start a new chat." }, { status: 413 });
  }

  const client = getClient();
  if (!client) {
    return NextResponse.json(
      {
        error:
          "COMPASS-AI is not connected to a live model yet. Add GEMINI_API_KEY to .env.local and restart the dev server.",
      },
      { status: 503 }
    );
  }

  try {
    const streamResult = await client.models.generateContentStream({
      model: MODEL,
      contents: history.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      })),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 512,
      },
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of streamResult) {
            if (chunk.text) controller.enqueue(encoder.encode(chunk.text));
          }
        } catch (err) {
          console.error("COMPASS-AI stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    void incrementUsage("nexus-ai");

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("COMPASS-AI chat error:", error);
    return NextResponse.json(
      { error: "COMPASS-AI hit an error reaching the model. Check the server logs and your API key." },
      { status: 502 }
    );
  }
}
