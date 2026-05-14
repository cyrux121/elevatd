import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";
import { InventoryRow } from "./_inventory-row";

export const runtime = "edge";

export default async function InventoryPage() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("led_count", { ascending: true });

  if (error) console.error("[admin/inventory]", error);
  const products = (data ?? []) as Product[];

  const { data: logData } = await supabase
    .from("inventory_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div>
      <h1 className="mb-6 font-display text-[24px] uppercase tracking-[-0.01em]">
        Inventory
      </h1>

      {/* SKU grid */}
      <div className="mb-8 overflow-hidden rounded-sm border border-ink-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-ink-4 bg-ink-1">
              {["SKU", "Product", "Stock", "Update"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <InventoryRow key={p.sku} product={p} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent log */}
      <div>
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-3">
          Recent Changes
        </h2>
        <div className="overflow-hidden rounded-sm border border-ink-4">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-ink-4 bg-ink-1">
                {["Time", "SKU", "Change", "Reason"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(logData ?? []).length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center font-mono text-[12px] text-fg-3">
                    No log entries yet.
                  </td>
                </tr>
              )}
              {(logData ?? []).map((entry: Record<string, unknown>) => (
                <tr key={entry.id as string} className="border-b border-ink-4 last:border-0">
                  <td className="px-4 py-2 font-mono text-[11px] text-fg-3">
                    {new Date(entry.created_at as string).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 font-mono text-[12px] text-fg-1">
                    {entry.sku as string}
                  </td>
                  <td
                    className={`px-4 py-2 font-mono text-[13px] tabular-nums ${
                      (entry.change_amount as number) < 0 ? "text-stock-out" : "text-stock-ok"
                    }`}
                  >
                    {(entry.change_amount as number) > 0 ? "+" : ""}
                    {entry.change_amount as number}
                  </td>
                  <td className="px-4 py-2 font-mono text-[11px] text-fg-2">
                    {(entry.reason as string) ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
