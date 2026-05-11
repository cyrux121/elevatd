"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import { formatPrice, calcShipping, SHIPPING_THRESHOLD_CENTS } from "@/lib/format";

export function CartView() {
  const hydrated = useCart((s) => s.hydrated);
  const lines = useCart((s) => s.lines);
  const setQuantity = useCart((s) => s.setQuantity);
  const removeLine = useCart((s) => s.removeLine);
  const subtotal = useCart((s) => s.subtotalCents());

  if (!hydrated) {
    return <p className="mt-10 text-sm text-muted-foreground">Loading…</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="mt-10 rounded-xl border border-muted-border p-10 text-center">
        <p className="text-lg font-semibold">Your cart is empty.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Add some lights and they&apos;ll show up here.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-paper hover:bg-accent"
        >
          Shop rock lights
        </Link>
      </div>
    );
  }

  const shipping = calcShipping(subtotal);
  const total = subtotal + shipping;
  const remainingForFree = Math.max(0, SHIPPING_THRESHOLD_CENTS - subtotal);

  return (
    <div className="mt-8 grid gap-10 md:grid-cols-3 md:gap-12">
      <ul className="md:col-span-2 divide-y divide-muted-border border-y border-muted-border">
        {lines.map((l) => (
          <li
            key={`${l.productId}-${l.variant}`}
            className="flex gap-4 py-5 sm:gap-6"
          >
            <div className="aspect-square w-20 shrink-0 rounded-md bg-muted sm:w-24" />
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link
                    href={`/shop/${l.slug}`}
                    className="font-semibold tracking-tight hover:text-accent"
                  >
                    {l.name}
                  </Link>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {l.variant === "kit" ? "12-pack kit" : "Single"} · {l.sku}
                  </p>
                </div>
                <p className="font-semibold tabular-nums">
                  {formatPrice(l.unitPriceCents * l.quantity)}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="inline-flex items-center rounded-full border border-muted-border">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(l.productId, l.variant, l.quantity - 1)
                    }
                    className="flex h-9 w-9 items-center justify-center hover:text-accent"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-semibold tabular-nums">
                    {l.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(l.productId, l.variant, l.quantity + 1)
                    }
                    className="flex h-9 w-9 items-center justify-center hover:text-accent"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeLine(l.productId, l.variant)}
                  className="text-xs font-medium text-muted-foreground hover:text-ink"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="rounded-xl border border-muted-border p-6 md:sticky md:top-24 md:self-start">
        <h2 className="text-base font-bold">Order summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <Row label="Subtotal" value={formatPrice(subtotal)} />
          <Row
            label="Shipping"
            value={shipping === 0 ? "Free" : formatPrice(shipping)}
          />
        </dl>
        {remainingForFree > 0 && (
          <p className="mt-3 text-xs text-muted-foreground">
            Add {formatPrice(remainingForFree)} for free shipping.
          </p>
        )}
        <div className="mt-4 flex items-baseline justify-between border-t border-muted-border pt-4">
          <span className="text-sm font-medium">Total</span>
          <span className="text-lg font-bold tabular-nums">
            {formatPrice(total)}
          </span>
        </div>
        <button
          type="button"
          disabled
          title="Stripe Checkout — wired up next phase"
          className="mt-5 inline-flex h-12 w-full cursor-not-allowed items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground"
        >
          Checkout (wired next phase)
        </button>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Apple Pay, Google Pay, and cards accepted via Stripe.
        </p>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
