import { Resend } from "resend";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { AUTOMATION_TEMPLATES } from "@/lib/data";
import { getStripeClient } from "@/lib/stripe";

export const runtime = "nodejs";

const FROM_ADDRESS = process.env.CONTACT_FROM_EMAIL?.trim() || "CrewLogic Labs <onboarding@resend.dev>";

const REPO_BASE = "https://raw.githubusercontent.com/ansarrahim/n8n-templates/master/workflows";
const WORKFLOW_FILES: Record<string, string> = {
  "ai-lead-autoresponder": "1-ai-lead-autoresponder.json",
  "review-sentiment-alert": "2-review-sentiment-alert.json",
  "new-order-sync": "3-new-order-sync.json",
};

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripeClient();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const templateId = session.metadata?.templateId;
    const buyerEmail = session.customer_details?.email;

    const template = AUTOMATION_TEMPLATES.find((t) => t.id === templateId);
    const filename = templateId ? WORKFLOW_FILES[templateId] : undefined;

    if (template && filename && buyerEmail) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        const resend = new Resend(apiKey);
        const downloadUrl = `${REPO_BASE}/${filename}`;
        const { error } = await resend.emails.send({
          from: FROM_ADDRESS,
          to: buyerEmail,
          subject: `Your workflow: ${template.title}`,
          text: `Thanks for buying ${template.title}!\n\nDownload the workflow: ${downloadUrl}\n\nSetup guide: https://github.com/ansarrahim/n8n-templates#setup-per-workflow-5-minutes\n\nImport the JSON into your n8n instance (Workflows -> Import from File), wire up your own Gemini/Resend/Airtable credentials per the README, and activate it. Reply to this email if you get stuck anywhere.\n\n— CrewLogic Labs`,
        });
        if (error) console.error("Failed to send delivery email:", error);
      } else {
        console.error("RESEND_API_KEY not configured — could not deliver purchased workflow.");
      }
    }
  }

  return NextResponse.json({ received: true });
}
