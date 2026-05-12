import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia",
    // @ts-ignore
    httpClient: Stripe.createFetchHttpClient(),
  });

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret);
  } catch (err) {
    console.error("[stripe-webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(
      "[stripe-webhook] checkout.session.completed",
      JSON.stringify(
        {
          id: session.id,
          customer_email: session.customer_details?.email,
          amount_total: session.amount_total,
          shipping: session.shipping_details,
          metadata: session.metadata,
        },
        null,
        2
      )
    );
    // TODO: save order to Supabase, send confirmation email via Resend
  }

  return NextResponse.json({ received: true });
}
