import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { ProductImage } from "@/components/product-image";
import { formatPrice } from "@/lib/format";
import { AddToCart } from "@/app/shop/[slug]/_add-to-cart";

export const runtime = "edge";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const soldOut = product.inventory_count <= 0;

  return (
    <div className="mx-auto max-w-container px-4 py-8 sm:px-6 md:py-14">
      <nav className="reveal text-sm text-muted-foreground">
        <Link href="/shop" className="hover:text-accent">
          ← Back to shop
        </Link>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-2 md:gap-14">
        {/* Gallery (single image for v1, layout supports more later) */}
        <div className="reveal">
          <ProductImage
            src={product.image_url}
            alt={product.name}
            label={product.name}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Thumbnail strip placeholder — keeps layout in shape for multi-photo later */}
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                aria-hidden
                className="aspect-square rounded-md bg-muted"
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {product.led_count} LED · SKU {product.sku}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold">
              {formatPrice(product.price_single_cents)}
            </span>
            <span className="text-sm text-muted-foreground">/ single</span>
          </div>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="text-xl font-semibold text-accent">
              {formatPrice(product.price_kit_cents)}
            </span>
            <span className="text-sm text-muted-foreground">/ 12-pack kit</span>
          </div>

          {soldOut ? (
            <div className="mt-6 inline-flex items-center rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper">
              Sold out — restocking soon
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              In stock · Ships in 1–2 business days
            </p>
          )}

          <p className="mt-6 max-w-prose text-base text-ink/80">
            {product.description}
          </p>

          <div className="mt-8">
            <AddToCart product={product} disabled={soldOut} />
          </div>

          {/* Specs */}
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-muted-border pt-6 text-sm">
            <Spec label="LED count" value={`${product.led_count}`} />
            <Spec label="Waterproof" value="IP68" />
            <Spec label="Voltage" value="12V DC" />
            <Spec label="Housing" value="Aluminum" />
            <Spec label="Kit contents" value="12 lights + controller + harness" />
            <Spec label="Warranty" value="1 year" />
          </dl>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}
