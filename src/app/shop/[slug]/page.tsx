import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { ProductImage } from "@/components/product-image";
import { AddToCart } from "@/app/shop/[slug]/_add-to-cart";

export const runtime = "edge";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  return { title: product ? `${product.name} — Elevated Customs` : "Product" };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-container px-4 py-10 sm:px-8 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/shop"
          className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-2 transition-colors hover:text-accent"
        >
          ← Shop
        </Link>
      </nav>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* Image */}
        <div>
          <ProductImage
            src={product.image_url}
            alt={product.name}
            label={product.name}
            ledCount={product.led_count}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                aria-hidden
                className="aspect-square rounded-sm bg-[repeating-linear-gradient(45deg,#1a1c22_0_6px,#16181d_6px_12px)]"
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            {product.led_count} LED · SKU {product.sku}
          </p>
          <h1 className="mt-2 font-display text-[clamp(32px,4vw,56px)] uppercase leading-[0.92] tracking-[-0.03em]">
            {product.name}
          </h1>

          <p className="mt-5 text-[15px] leading-[1.65] text-fg-1">
            {product.description}
          </p>

          <div className="mt-8">
            <AddToCart product={product} />
          </div>

          {/* Specs */}
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink-4 pt-8">
            <Spec label="LED Count" value={`${product.led_count} per pod`} />
            <Spec label="Waterproof" value="IP68 Rated" />
            <Spec label="Voltage" value="12V DC" />
            <Spec label="Housing" value="Aluminum Alloy" />
            <Spec label="Kit Contents" value="12 pods + controller + harness" />
            <Spec label="Warranty" value="2 Year (pods lifetime)" />
          </dl>

          {/* Trust signals */}
          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-ink-4 pt-6">
            <TrustItem icon="IP68" label="Waterproof" />
            <TrustItem icon="NJ" label="Ships From NJ" />
            <TrustItem icon="2YR" label="Warranty" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-2">
        {label}
      </dt>
      <dd className="mt-1 text-[14px] font-medium text-fg-0">{value}</dd>
    </div>
  );
}

function TrustItem({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-sm border border-ink-4 bg-ink-2 py-3 text-center">
      <span className="font-display text-[16px] uppercase tracking-[-0.01em] text-accent">
        {icon}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-2">
        {label}
      </span>
    </div>
  );
}
