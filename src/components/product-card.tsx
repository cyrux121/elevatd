"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductImage } from "@/components/product-image";
import { useCart } from "@/lib/cart-store";

const QTY_OPTIONS = [1, 4, 8, 12, 16, 20] as const;
type Qty = (typeof QTY_OPTIONS)[number];

function priceForQty(product: Product, qty: Qty): number {
  const single = product.price_single_cents;
  const kit    = product.price_kit_cents;
  if (qty === 1)  return single;
  if (qty === 12) return kit;
  if (qty === 4)  return Math.round(single * 4 * 0.93);
  if (qty === 8)  return Math.round(single * 8 * 0.88);
  return Math.round((kit / 12) * qty);
}

function savingsPct(product: Product, qty: Qty): number {
  const list   = product.price_single_cents * qty;
  const actual = priceForQty(product, qty);
  const pct    = Math.round(((list - actual) / list) * 100);
  return pct >= 5 ? pct : 0;
}

function fmt(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function ProductCard({ product }: { product: Product }) {
  const [qty, setQty]     = useState<Qty>(1);
  const [added, setAdded] = useState(false);
  const addLine = useCart((s) => s.addLine);

  const total     = priceForQty(product, qty);
  const unitCents = Math.round(total / qty);
  const savings   = savingsPct(product, qty);

  function handleAdd() {
    addLine({
      productId:      product.id,
      sku:            product.sku,
      slug:           product.slug,
      name:           product.name,
      variant:        qty === 12 ? "kit" : "single",
      unitPriceCents: qty === 12 ? product.price_kit_cents : unitCents,
      quantity:       qty === 12 ? 1 : qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-ink-4 bg-ink-2 transition-colors hover:border-ink-5">

      {/* Media */}
      <Link href={`/shop/${product.slug}`} className="relative block">
        <ProductImage
          src={product.image_url}
          alt={product.name}
          label={product.name}
          ledCount={product.led_count}
          className="rounded-none"
        />
        <span className="absolute left-3 top-3 rounded-sm border border-ink-5 bg-ink-0/80 px-2 py-1 font-mono text-[11px] font-semibold tracking-[0.06em] text-fg-0">
          {product.led_count} LED
        </span>
        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-sm border border-ink-5 bg-ink-0/80 px-2 py-1 font-mono text-[11px] font-medium text-fg-1">
          <span className="h-[7px] w-[7px] rounded-full bg-stock-ok shadow-[0_0_6px_#4ade80]" />
          In Stock
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2.5 p-[18px]">
        <div>
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-display text-[20px] uppercase leading-tight tracking-[-0.01em] transition-colors hover:text-accent">
              {product.name}
            </h3>
          </Link>
          <p className="mt-0.5 font-mono text-[11px] tracking-[0.06em] text-fg-2">
            {product.sku}
          </p>
        </div>

        <p className="text-[13px] leading-relaxed text-fg-1">
          {product.description.split(".")[0]}.
        </p>

        {/* Qty + price */}
        <div className="mt-1.5 grid grid-cols-2 items-end gap-3">
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-fg-2">
              Quantity
            </label>
            <div className="relative">
              <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value) as Qty)}
                className="h-[42px] w-full cursor-pointer rounded-sm border border-ink-4 bg-ink-3 pl-3 pr-9 font-mono text-[13px] text-fg-0 focus:border-accent focus:outline-none"
              >
                {QTY_OPTIONS.map((q) => (
                  <option key={q} value={q}>
                    {q} {q === 1 ? "piece" : "pieces"}
                    {q === 12 ? " — 12-pack kit" : ""}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 h-2 w-2 -translate-y-[60%] rotate-45 border-b-[1.5px] border-r-[1.5px] border-fg-1" />
            </div>
          </div>

          <div className="text-right">
            <p className="font-display text-[26px] leading-none tracking-[-0.02em]">
              {fmt(total)}
            </p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.04em] text-fg-2">
              {fmt(unitCents)}&nbsp;/&nbsp;ea
            </p>
            {savings > 0 && (
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
                SAVE {savings}%
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`mt-3 flex h-[38px] w-full items-center justify-center gap-2 rounded-sm text-[12px] font-bold uppercase tracking-[0.08em] transition-colors ${
            added
              ? "bg-stock-ok text-ink-0"
              : "bg-accent text-accent-fg hover:bg-accent-hover"
          }`}
        >
          {added ? "Added ✓" : "Add to Cart"}
          {!added && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
        </button>
      </div>
    </article>
  );
}
