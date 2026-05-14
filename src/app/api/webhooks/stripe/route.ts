import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { sendOrderConfirmation, sendAdminOrderAlert } from "@/lib/email";
import type { DbOrder, DbOrderLineItem, ShippingAddress } from "@/lib/types";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  let currentStep = "start";

  try {
    currentStep = "verify-signature";

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
      return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
    }

    const event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret);

    if (event.type !== "checkout.session.completed") {
      return NextResponse.json({ received: true, skipped: event.type });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    currentStep = "fetch-line-items";

    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items.data.price.product"],
    });

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

    currentStep = "save-order-to-supabase";

    const supabase = createSupabaseAdminClient();

    const { data: savedData, error: saveError } = await supabase
      .from("orders")
      .upsert(orderPayload, { onConflict: "stripe_session_id", ignoreDuplicates: false })
      .select()
      .single();

    if (saveError) throw new Error(`Supabase upsert failed: ${saveError.message} (code: ${saveError.code})`);
    const savedOrder = savedData as DbOrder;

    currentStep = "decrement-inventory";

    for (const item of lineItems) {
      if (item.sku === "UNKNOWN") continue;
      const unitsToDeduct = item.variant === "kit" ? item.quantity * 12 : item.quantity;

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

      await supabase.from("inventory_log").insert({
        sku: item.sku,
        change_amount: -unitsToDeduct,
        reason: "order_fulfilled",
        order_id: savedOrder.id,
      });
    }

    currentStep = "send-customer-email";
    await sendOrderConfirmation(savedOrder);

    currentStep = "send-admin-email";
    await sendAdminOrderAlert(savedOrder);

    currentStep = "complete";

    return NextResponse.json({
      received: true,
      step: currentStep,
      order_number: savedOrder.order_number,
      order_id: savedOrder.id,
    });
  } catch (error: unknown) {
    const err = error as Error & { code?: string };
    return NextResponse.json(
      {
        received: true,
        step: currentStep,
        error: err?.message ?? "unknown error",
        errorName: err?.name,
        errorStack: err?.stack?.split("\n").slice(0, 4),
        env: {
          hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
          hasResend: !!process.env.RESEND_API_KEY,
          hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
          hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
          hasAdminEmail: !!process.env.ADMIN_EMAIL,
        },
      },
      { status: 200 }
    );
  }
}
