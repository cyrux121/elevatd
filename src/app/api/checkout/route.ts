import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "edge";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://elevatd-3s4.pages.dev";
const SHIPPING_THRESHOLD_CENTS = 25000;
const FLAT_SHIPPING_CENTS = 1500;

type CartLineInput = {
  name: string;
  unitPriceCents: number;
  quantity: number;
  variant: "single" | "kit";
  sku: string;
};

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia",
    // @ts-ignore
    httpClient: Stripe.createFetchHttpClient(),
  });

  let lines: CartLineInput[];

  try {
    const body = await req.json();
    lines = body.lines;
    if (!Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const subtotal = lines.reduce(
    (sum, l) => sum + l.unitPriceCents * l.quantity,
    0
  );
  const shippingAmount =
    subtotal >= SHIPPING_THRESHOLD_CENTS ? 0 : FLAT_SHIPPING_CENTS;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lines.map((l) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name:
            l.variant === "kit"
              ? `${l.name} — 12-Pack Kit`
              : l.name,
          metadata: { sku: l.sku, variant: l.variant },
        },
        unit_amount: l.unitPriceCents,
      },
      quantity: l.quantity,
    })),
    shipping_address_collection: { allowed_countries: ["US"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: shippingAmount, currency: "usd" },
          display_name:
            shippingAmount === 0 ? "Free Shipping" : "Standard Shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 1 },
            maximum: { unit: "business_day", value: 3 },
          },
        },
      },
    ],
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    success_url: `${SITE_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/cart`,
  });

  return NextResponse.json({ url: session.url });
}
