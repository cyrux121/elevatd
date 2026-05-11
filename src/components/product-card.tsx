import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductImage } from "@/components/product-image";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.inventory_count <= 0;
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block rounded-xl border border-transparent transition-colors hover:border-muted-border"
    >
      <div className="relative">
        <ProductImage
          src={product.image_url}
          alt={product.name}
          label={product.name}
        />
        {soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-xs font-semibold text-paper">
            Sold out
          </span>
        )}
      </div>
      <div className="px-1 py-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight">{product.name}</h3>
          <span className="text-sm font-medium text-ink/70">
            {product.led_count} LED
          </span>
        </div>
        <div className="mt-1 flex items-baseline gap-2 text-sm text-muted-foreground">
          <span>From {formatPrice(product.price_single_cents)}</span>
          <span aria-hidden>·</span>
          <span>
            Kit{" "}
            <span className="font-medium text-ink">
              {formatPrice(product.price_kit_cents)}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
