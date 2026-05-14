import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { DbOrder } from "@/lib/types";

export const runtime = "edge";

function fmt(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export default async function AnalyticsPage() {
  const supabase = createSupabaseAdminClient();

  const { data: allOrders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  const orders = (allOrders ?? []) as DbOrder[];

  const now30 = daysAgo(30);
  const now7 = daysAgo(7);

  const totalRevenue = orders.reduce((s, o) => s + o.total_cents, 0);
  const revenue30 = orders
    .filter((o) => o.created_at >= now30)
    .reduce((s, o) => s + o.total_cents, 0);
  const revenue7 = orders
    .filter((o) => o.created_at >= now7)
    .reduce((s, o) => s + o.total_cents, 0);

  const count30 = orders.filter((o) => o.created_at >= now30).length;

  // Top SKUs last 30 days
  const skuMap: Record<string, { name: string; qty: number; revenue: number }> = {};
  for (const order of orders.filter((o) => o.created_at >= now30)) {
    for (const item of order.line_items) {
      if (!skuMap[item.sku]) skuMap[item.sku] = { name: item.name, qty: 0, revenue: 0 };
      skuMap[item.sku].qty += item.quantity;
      skuMap[item.sku].revenue += item.total_cents;
    }
  }
  const topSkus = Object.entries(skuMap)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 10);

  const statCards = [
    { label: "All-time revenue", value: fmt(totalRevenue) },
    { label: "Revenue (30d)", value: fmt(revenue30) },
    { label: "Revenue (7d)", value: fmt(revenue7) },
    { label: "Orders (30d)", value: String(count30) },
    { label: "Total orders", value: String(orders.length) },
  ];

  return (
    <div>
      <h1 className="mb-6 font-display text-[24px] uppercase tracking-[-0.01em]">
        Analytics
      </h1>

      {/* Stat cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-sm border border-ink-4 bg-ink-1 p-5">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3">
              {card.label}
            </p>
            <p className="font-display text-[28px] tracking-[-0.02em] text-accent">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top SKUs */}
        <div>
          <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-3">
            Top SKUs — Last 30 days
          </h2>
          <div className="overflow-hidden rounded-sm border border-ink-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-ink-4 bg-ink-1">
                  {["SKU / Product", "Units Sold", "Revenue"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topSkus.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center font-mono text-[12px] text-fg-3">
                      No orders yet.
                    </td>
                  </tr>
                )}
                {topSkus.map(([sku, info]) => (
                  <tr key={sku} className="border-b border-ink-4 last:border-0">
                    <td className="px-4 py-3">
                      <p className="text-[13px] text-fg-1">{info.name}</p>
                      <p className="font-mono text-[11px] text-fg-3">{sku}</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-[13px] tabular-nums text-fg-1">
                      {info.qty}
                    </td>
                    <td className="px-4 py-3 font-mono text-[13px] tabular-nums text-accent">
                      {fmt(info.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent orders */}
        <div>
          <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-3">
            Recent Orders
          </h2>
          <div className="overflow-hidden rounded-sm border border-ink-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-ink-4 bg-ink-1">
                  {["#", "Customer", "Total"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order) => (
                  <tr key={order.id} className="border-b border-ink-4 last:border-0">
                    <td className="px-4 py-2.5">
                      <a
                        href={`/admin/orders/${order.id}`}
                        className="font-mono text-[12px] text-accent hover:underline"
                      >
                        #{order.order_number}
                      </a>
                    </td>
                    <td className="px-4 py-2.5 text-[13px] text-fg-2">
                      {order.customer_name ?? order.customer_email ?? "—"}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[13px] tabular-nums text-fg-1">
                      {fmt(order.total_cents)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
