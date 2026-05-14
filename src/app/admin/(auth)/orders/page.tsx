import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { DbOrder, DbOrderStatus } from "@/lib/types";

export const runtime = "edge";

function fmt(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const STATUS_STYLES: Record<DbOrderStatus, string> = {
  new: "bg-accent/10 text-accent border-accent/30",
  shipped: "bg-stock-ok/10 text-stock-ok border-stock-ok/30",
  delivered: "bg-fg-3/20 text-fg-2 border-fg-3/30",
};

const STATUS_LABELS: Record<DbOrderStatus, string> = {
  new: "New",
  shipped: "Shipped",
  delivered: "Delivered",
};

type Props = { searchParams: { status?: string; q?: string } };

export default async function OrdersPage({ searchParams }: Props) {
  const supabase = createSupabaseAdminClient();
  const validStatuses: DbOrderStatus[] = ["new", "shipped", "delivered"];
  const rawStatus = searchParams.status;
  const filterStatus = validStatuses.includes(rawStatus as DbOrderStatus)
    ? (rawStatus as DbOrderStatus)
    : undefined;
  const query = searchParams.q ?? "";

  let dbQuery = supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (filterStatus) {
    dbQuery = dbQuery.eq("order_status", filterStatus);
  }
  if (query) {
    dbQuery = dbQuery.or(
      `customer_email.ilike.%${query}%,customer_name.ilike.%${query}%`
    );
  }

  const { data, error } = await dbQuery.limit(200);
  if (error) console.error("[admin/orders]", error);
  const orders = (data ?? []) as DbOrder[];

  const chips: { label: string; value: string }[] = [
    { label: "All", value: "" },
    { label: "New", value: "new" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <h1 className="font-display text-[24px] uppercase tracking-[-0.01em]">
          Orders
        </h1>
        <span className="font-mono text-[11px] text-fg-3">{orders.length} shown</span>

        {/* Search */}
        <form method="GET" className="ml-auto flex gap-2">
          <input
            name="q"
            defaultValue={query}
            placeholder="Search name / email…"
            className="h-9 rounded-sm border border-ink-4 bg-ink-1 px-3 text-[13px] text-fg-0 placeholder:text-fg-3 focus:border-accent focus:outline-none"
          />
          {filterStatus && (
            <input type="hidden" name="status" value={filterStatus} />
          )}
          <button
            type="submit"
            className="h-9 rounded-sm bg-ink-3 px-4 font-mono text-[11px] uppercase tracking-[0.06em] text-fg-1 transition-colors hover:bg-ink-4"
          >
            Search
          </button>
        </form>
      </div>

      {/* Filter chips */}
      <div className="mb-4 flex gap-2">
        {chips.map((chip) => {
          const isActive = (filterStatus ?? "") === chip.value;
          const href = chip.value
            ? `/admin/orders?status=${chip.value}${query ? `&q=${query}` : ""}`
            : `/admin/orders${query ? `?q=${query}` : ""}`;
          return (
            <Link
              key={chip.value}
              href={href}
              className={`rounded-sm border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors ${
                isActive
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-ink-4 text-fg-2 hover:border-ink-5 hover:text-fg-1"
              }`}
            >
              {chip.label}
            </Link>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-sm border border-ink-4">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-ink-4 bg-ink-1">
              {["Order #", "Date", "Customer", "Email", "Total", "Status", "Tracking"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center font-mono text-[12px] text-fg-3"
                >
                  No orders found.
                </td>
              </tr>
            )}
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-ink-4 transition-colors last:border-0 hover:bg-ink-1"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-mono text-[13px] text-accent hover:underline"
                  >
                    #{order.order_number}
                  </Link>
                </td>
                <td className="px-4 py-3 font-mono text-[12px] text-fg-2">
                  {fmtDate(order.created_at)}
                </td>
                <td className="px-4 py-3 text-[14px] text-fg-1">
                  {order.customer_name ?? "—"}
                </td>
                <td className="px-4 py-3 text-[13px] text-fg-2">
                  {order.customer_email ?? "—"}
                </td>
                <td className="px-4 py-3 font-mono text-[13px] tabular-nums text-fg-0">
                  {fmt(order.total_cents)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] ${STATUS_STYLES[order.order_status]}`}
                  >
                    {STATUS_LABELS[order.order_status]}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-[12px] text-fg-2">
                  {order.tracking_number ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
