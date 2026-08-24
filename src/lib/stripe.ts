import Stripe from "stripe";

let cachedClient: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (cachedClient) return cachedClient;
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error("STRIPE_SECRET_KEY is not configured.");
  cachedClient = new Stripe(secretKey);
  return cachedClient;
}

export async function createTemplateCheckoutSession(params: {
  templateId: string;
  name: string;
  priceCents: number;
  successUrl: string;
  cancelUrl: string;
}): Promise<string> {
  const stripe = getStripeClient();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${params.name} — n8n Workflow Template`,
            description: "Workflow JSON + setup guide, delivered by email after purchase.",
          },
          unit_amount: params.priceCents,
        },
        quantity: 1,
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: { templateId: params.templateId },
  });

  if (!session.url) throw new Error("Stripe did not return a checkout URL.");
  return session.url;
}
