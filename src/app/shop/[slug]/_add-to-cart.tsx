"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-store";
import type { Product, Variant } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { clsx } from "@/lib/clsx";

export function AddToCart({
  product,
  disabled,
}: {
  product: Product;
  disabled?: boolean;
}) {
  const [variant, setVariant] = useState<Variant>("single");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addLine = useCart((s) => s.addLine);

  const unitPriceCents =
    variant === "single" ? product.price_single_cents : product.price_kit_cents;

  function handleAdd() {
    if (disabled) return;
    addLine({
      productId: product.id,
      sku: product.sku,
      slug: product.slug,
      name: product.name,
      variant,
      unitPriceCents,
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div>
      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Option
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <VariantOption
            label="Single light"
            sub={formatPrice(product.price_single_cents)}
            selected={variant === "single"}
            onClick={() => setVariant("single")}
          />
          <VariantOption
            label="12-pack kit"
            sub={formatPrice(product.price_kit_cents)}
            selected={variant === "kit"}
            onClick={() => setVariant("kit")}
            badge="Save $$$"
          />
        </div>
      </fieldset>

      <div className="mt-6 flex items-center gap-4">
        <div className="inline-flex items-center rounded-full border border-muted-border">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-11 w-11 items-center justify-center text-lg hover:text-accent"
            aria-label="Decrease quantity"
            disabled={disabled}
          >
            −
          </button>
          <span className="w-10 text-center font-semibold tabular-nums">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="flex h-11 w-11 items-center justify-center text-lg hover:text-accent"
            aria-label="Increase quantity"
            disabled={disabled}
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={disabled}
          className={clsx(
            "inline-flex h-12 flex-1 items-center justify-center rounded-full text-sm font-semibold transition-colors",
            disabled
              ? "cursor-not-allowed bg-muted text-muted-foreground"
              : added
              ? "bg-accent text-paper"
              : "bg-ink text-paper hover:bg-accent"
          )}
        >
          {disabled
            ? "Sold out"
            : added
            ? "Added to cart ✓"
            : `Add to cart — ${formatPrice(unitPriceCents * qty)}`}
        </button>
      </div>
    </div>
  );
}

function VariantOption({
  label,
  sub,
  selected,
  onClick,
  badge,
}: {
  label: string;
  sub: string;
  selected: boolean;
  onClick: () => void;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={clsx(
        "relative rounded-xl border p-4 text-left transition-colors",
        selected
          ? "border-ink ring-2 ring-ink"
          : "border-muted-border hover:border-ink"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold">{label}</span>
        {badge && (
          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-paper">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{sub}</div>
    </button>
  );
}
