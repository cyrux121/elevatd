import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";
import { ProductEditRow } from "./_product-edit-row";

export const runtime = "edge";

export default async function ProductsPage() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("led_count", { ascending: true });

  if (error) console.error("[admin/products]", error);
  const products = (data ?? []) as Product[];

  return (
    <div>
      <h1 className="mb-6 font-display text-[24px] uppercase tracking-[-0.01em]">
        Products
      </h1>
      <div className="space-y-4">
        {products.map((p) => (
          <ProductEditRow key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
