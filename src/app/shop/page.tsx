import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ShopFilter } from "@/app/shop/_filter";

export const runtime = "edge";

export const metadata = { title: "Shop — Elevated Customs" };

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
    <>
      {/* Page header */}
      <section className="border-b border-ink-4 py-16">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            // THE LINEUP
          </p>
          <h1 className="mt-3 font-display text-[clamp(40px,6vw,80px)] uppercase leading-[0.92] tracking-[-0.03em]">
            All Rock Lights
          </h1>
          <p className="mt-4 max-w-[50ch] text-[15px] leading-[1.55] text-fg-1">
            IP68 waterproof · 12V · RGB+W · Available as singles or complete
            12-pack kits. Same M6 bolt, same harness, same app — every truck.
          </p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-[61px] z-30 border-b border-ink-4 bg-ink-0/95 backdrop-blur-sm">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <ShopFilter ledCounts={ledCounts} active={ledFilter} />
        </div>
      </div>

      {/* Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          {products.length === 0 ? (
            <p className="py-20 text-center font-mono text-[13px] uppercase tracking-[0.1em] text-fg-2">
              No products match this filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
