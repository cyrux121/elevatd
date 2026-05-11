import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ShopFilter } from "@/app/shop/_filter";

export const metadata = { title: "Shop" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { led?: string };
}) {
  const all = await getAllProducts();
  const ledCounts = Array.from(new Set(all.map((p) => p.led_count))).sort(
    (a, b) => a - b
  );

  const ledFilter = searchParams.led ? Number(searchParams.led) : null;
  const products = ledFilter
    ? all.filter((p) => p.led_count === ledFilter)
    : all;

  return (
    <div className="mx-auto max-w-container px-4 py-12 sm:px-6 md:py-16">
      <div className="reveal">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Shop
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          All rock lights
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          IP68 waterproof. 12V. Available as singles or complete 12-piece kits.
        </p>
      </div>

      <ShopFilter ledCounts={ledCounts} active={ledFilter} />

      {products.length === 0 ? (
        <p className="mt-12 text-muted-foreground">
          No products match this filter.
        </p>
      ) : (
        <div className="reveal mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
