import { getStripeClient } from "@/lib/stripe";

export type StripeRevenue = {
  revenueCents: number;
  paidCount: number;
  dailyCents: number[];
};

function startOfMonth(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
}

// Real Stripe Checkout session data for the current calendar month — no
// separate revenue store exists, so this queries the Stripe API directly.
export async function getStripeRevenueThisMonth(): Promise<StripeRevenue | null> {
  if (!process.env.STRIPE_SECRET_KEY) return null;

  try {
    const stripe = getStripeClient();
    const monthStart = startOfMonth();
    const daysElapsed = Math.floor((Date.now() - monthStart.getTime()) / 86_400_000) + 1;
    const dailyCents = new Array<number>(daysElapsed).fill(0);

    let revenueCents = 0;
    let paidCount = 0;

    for await (const session of stripe.checkout.sessions.list({
      created: { gte: Math.floor(monthStart.getTime() / 1000) },
      limit: 100,
    })) {
      if (session.payment_status !== "paid") continue;
      const amount = session.amount_total ?? 0;
      revenueCents += amount;
      paidCount += 1;

      const dayIndex = Math.floor((session.created * 1000 - monthStart.getTime()) / 86_400_000);
      if (dayIndex >= 0 && dayIndex < dailyCents.length) {
        dailyCents[dayIndex] += amount;
      }
    }

    return { revenueCents, paidCount, dailyCents };
  } catch (error) {
    console.error("Stripe revenue fetch failed:", error);
    return null;
  }
}
