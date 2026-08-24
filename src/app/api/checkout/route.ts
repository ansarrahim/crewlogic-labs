import { NextResponse } from "next/server";
import { AUTOMATION_TEMPLATES } from "@/lib/data";
import { createTemplateCheckoutSession } from "@/lib/stripe";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const templateId = searchParams.get("template");

  const template = AUTOMATION_TEMPLATES.find((t) => t.id === templateId);
  if (!template) {
    return NextResponse.json({ error: "Unknown template." }, { status: 404 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.redirect(new URL("/automations?checkout_error=1", origin));
  }

  try {
    const url = await createTemplateCheckoutSession({
      templateId: template.id,
      name: template.title,
      priceCents: template.priceCents,
      successUrl: `${origin}/automations?purchased=${template.id}`,
      cancelUrl: `${origin}/automations`,
    });
    return NextResponse.redirect(url, { status: 303 });
  } catch (error) {
    console.error("Checkout session error:", error);
    return NextResponse.redirect(new URL("/automations?checkout_error=1", origin));
  }
}
