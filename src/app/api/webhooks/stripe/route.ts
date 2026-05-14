import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { sendOrderConfirmation, sendAdminOrderAlert } from "@/lib/email";
import type { DbOrder, DbOrderLineItem, ShippingAddress } from "@/lib/types";

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
    // Always return 200 to Stripe — errors are logged for manual recovery
    await handleCheckoutCompleted(stripe, event.data.object as Stripe.Checkout.Session);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(
  stripe: Stripe,
  session: Stripe.Checkout.Session
): Promise<void> {
  console.log("[stripe-webhook] checkout.session.completed", session.id);

  // Retrieve full session with line items and product metadata
  let fullSession: Stripe.Checkout.Session;
  try {
    fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items.data.price.product"],
    });
  } catch (err) {
    console.error("[stripe-webhook] Failed to retrieve session:", err);
    return;
  }

  // Build line items from the expanded Stripe data
  const lineItems: DbOrderLineItem[] = (fullSession.line_items?.data ?? []).map((item) => {
    const product = item.price?.product as Stripe.Product | null;
    const sku = product?.metadata?.sku ?? "UNKNOWN";
    const variant = (product?.metadata?.variant ?? "single") as "single" | "kit";
    return {
      name: item.description ?? product?.name ?? "Unknown item",
      sku,
      variant,
      quantity: item.quantity ?? 1,
      unit_price_cents: item.price?.unit_amount ?? 0,
      total_cents: item.amount_total ?? 0,
    };
  });

  // Build shipping address from Stripe data
  const stripeAddr = fullSession.shipping_details?.address;
  const shippingAddress: ShippingAddress | null = stripeAddr
    ? {
        line1: stripeAddr.line1 ?? null,
        line2: stripeAddr.line2 ?? null,
        city: stripeAddr.city ?? null,
        state: stripeAddr.state ?? null,
        postal_code: stripeAddr.postal_code ?? null,
        country: stripeAddr.country ?? null,
      }
    : null;

  const orderPayload = {
    stripe_session_id: fullSession.id,
    customer_email: fullSession.customer_details?.email ?? null,
    customer_name: fullSession.customer_details?.name ?? null,
    shipping_address: shippingAddress,
    line_items: lineItems,
    subtotal_cents: fullSession.amount_subtotal ?? 0,
    shipping_cents: fullSession.total_details?.amount_shipping ?? 0,
    total_cents: fullSession.amount_total ?? 0,
    payment_status: "paid",
    order_status: "new",
  };

  const supabase = createSupabaseAdminClient();

  // Save order — idempotent via ON CONFLICT
  let savedOrder: DbOrder | null = null;
  try {
    const { data, error } = await supabase
      .from("orders")
      .upsert(orderPayload, { onConflict: "stripe_session_id", ignoreDuplicates: false })
      .select()
      .single();

    if (error) throw error;
    savedOrder = data as DbOrder;
    console.log("[stripe-webhook] Order saved:", savedOrder.order_number);
  } catch (err) {
    console.error("[stripe-webhook] FAILED to save order — manual recovery needed:", {
      stripe_session_id: session.id,
      error: err,
    });
    return;
  }

  // Decrement inventory for each line item
  for (const item of lineItems) {
    if (item.sku === "UNKNOWN") continue;
    // Kit variant sells 12 physical units per kit quantity
    const unitsToDeduct = item.variant === "kit" ? item.quantity * 12 : item.quantity;

    try {
      const { data: product } = await supabase
        .from("products")
        .select("inventory_count")
        .eq("sku", item.sku)
        .single();

      if (product) {
        const newCount = Math.max(0, (product.inventory_count as number) - unitsToDeduct);
        await supabase
          .from("products")
          .update({ inventory_count: newCount, updated_at: new Date().toISOString() })
          .eq("sku", item.sku);
      }
    } catch (err) {
      console.error(`[stripe-webhook] Inventory decrement failed for SKU ${item.sku}:`, err);
    }

    try {
      await supabase.from("inventory_log").insert({
        sku: item.sku,
        change_amount: -unitsToDeduct,
        reason: "order_fulfilled",
        order_id: savedOrder.id,
      });
    } catch (err) {
      console.error("[stripe-webhook] inventory_log insert failed:", err);
    }
  }

  // Send emails — log errors but don't fail
  try {
    await sendOrderConfirmation(savedOrder);
    console.log("[stripe-webhook] Confirmation email sent to", savedOrder.customer_email);
  } catch (err) {
    console.error("[stripe-webhook] Customer confirmation email failed:", err);
  }

  try {
    await sendAdminOrderAlert(savedOrder);
    console.log("[stripe-webhook] Admin alert sent");
  } catch (err) {
    console.error("[stripe-webhook] Admin alert email failed:", err);
  }
}
