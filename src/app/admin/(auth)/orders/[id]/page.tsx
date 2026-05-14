import { notFound } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { DbOrder } from "@/lib/types";
import { OrderActions } from "./_order-actions";

export const runtime = "edge";

function fmt(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

function fmtDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) notFound();
  const order = data as DbOrder;

  const addrParts = order.shipping_address
    ? [
        order.shipping_address.line1,
        order.shipping_address.line2,
        order.shipping_address.city,
        order.shipping_address.state,
        order.shipping_address.postal_code,
      ].filter(Boolean)
    : [];

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">
          <a href="/admin/orders" className="hover:text-accent">Orders</a> / #{order.order_number}
        </p>
        <h1 className="font-display text-[28px] uppercase tracking-[-0.01em]">
          Order #{order.order_number}
        </h1>
        <p className="mt-1 font-mono text-[12px] text-fg-3">
          {fmtDate(order.created_at)} · Stripe: {order.stripe_session_id}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left col */}
        <div className="space-y-4">
          {/* Customer */}
          <section className="rounded-sm border border-ink-4 bg-ink-1 p-5">
            <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">
              Customer
            </h2>
            <p className="text-[15px] text-fg-0">{order.customer_name ?? "—"}</p>
            <p className="text-[14px] text-fg-2">{order.customer_email ?? "—"}</p>
          </section>

          {/* Shipping address */}
          <section className="rounded-sm border border-ink-4 bg-ink-1 p-5">
            <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">
              Ship To
            </h2>
            {addrParts.length > 0 ? (
              <p className="text-[14px] leading-[1.6] text-fg-1">
                {addrParts.join(", ")}
              </p>
            ) : (
              <p className="text-[14px] text-fg-3">No address</p>
            )}
          </section>

          {/* Line items */}
          <section className="rounded-sm border border-ink-4 bg-ink-1 p-5">
            <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">
              Items
            </h2>
            <ul className="divide-y divide-ink-4">
              {order.line_items.map((item, i) => (
                <li key={i} className="flex items-baseline justify-between py-2.5">
                  <div>
                    <p className="text-[14px] text-fg-1">{item.name}</p>
                    <p className="font-mono text-[11px] text-fg-3">
                      {item.sku} · ×{item.quantity}
                    </p>
                  </div>
                  <span className="font-mono text-[13px] tabular-nums text-fg-0">
                    {fmt(item.total_cents)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 space-y-1 border-t border-ink-4 pt-3">
              <div className="flex justify-between text-[13px]">
                <span className="text-fg-2">Subtotal</span>
                <span className="font-mono tabular-nums text-fg-1">{fmt(order.subtotal_cents)}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-fg-2">Shipping</span>
                <span className="font-mono tabular-nums text-fg-1">
                  {order.shipping_cents === 0 ? "Free" : fmt(order.shipping_cents)}
                </span>
              </div>
              <div className="flex justify-between border-t border-ink-4 pt-2 text-[15px]">
                <span className="font-bold text-fg-0">Total</span>
                <span className="font-mono font-bold tabular-nums text-accent">
                  {fmt(order.total_cents)}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Right col — actions */}
        <div>
          <OrderActions order={order} />
        </div>
      </div>
    </div>
  );
}
