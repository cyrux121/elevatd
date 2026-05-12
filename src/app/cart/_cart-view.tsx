"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import {
  formatPrice,
  calcShipping,
  SHIPPING_THRESHOLD_CENTS,
} from "@/lib/format";

export function CartView() {
  const hydrated = useCart((s) => s.hydrated);
  const lines = useCart((s) => s.lines);
  const setQuantity = useCart((s) => s.setQuantity);
  const removeLine = useCart((s) => s.removeLine);
  const subtotal = useCart((s) => s.subtotalCents());
  const [checkingOut, setCheckingOut] = useState(false);

  if (!hydrated) {
    return (
      <p className="py-10 font-mono text-[12px] uppercase tracking-[0.1em] text-fg-3">
        Loading…
      </p>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-sm border border-ink-4 bg-ink-1 py-20 text-center">
        <p className="font-display text-[20px] uppercase tracking-[-0.01em]">
          Your cart is empty.
        </p>
        <p className="mt-2 text-[14px] text-fg-2">
          Add some lights and they&apos;ll show up here.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-sm bg-accent px-6 text-[13px] font-bold uppercase tracking-[0.08em] text-accent-fg transition-colors hover:bg-accent-hover"
        >
          Shop Rock Lights
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    );
  }

  const shipping = calcShipping(subtotal);
  const total = subtotal + shipping;
  const remainingForFree = Math.max(0, SHIPPING_THRESHOLD_CENTS - subtotal);

  return (
    <div className="grid gap-10 md:grid-cols-3 md:gap-12">
      {/* Line items */}
      <ul className="divide-y divide-ink-4 border-y border-ink-4 md:col-span-2">
        {lines.map((l) => (
          <li
            key={`${l.productId}-${l.variant}`}
            className="flex gap-5 py-6 sm:gap-6"
          >
            <div className="aspect-square w-20 shrink-0 rounded-sm bg-[repeating-linear-gradient(45deg,#1a1c22_0_6px,#16181d_6px_12px)] sm:w-24" />
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link
                    href={`/shop/${l.slug}`}
                    className="font-display text-[16px] uppercase tracking-[-0.01em] transition-colors hover:text-accent"
                  >
                    {l.name}
                  </Link>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.06em] text-fg-2">
                    {l.variant === "kit" ? "12-pack kit" : "Single"} · {l.sku}
                  </p>
                </div>
                <p className="font-display text-[18px] tracking-[-0.01em] tabular-nums">
                  {formatPrice(l.unitPriceCents * l.quantity)}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4">
                <div className="inline-flex items-center rounded-sm border border-ink-4">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(l.productId, l.variant, l.quantity - 1)
                    }
                    className="flex h-9 w-9 items-center justify-center text-fg-1 transition-colors hover:text-accent"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-mono text-[13px] tabular-nums">
                    {l.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(l.productId, l.variant, l.quantity + 1)
                    }
                    className="flex h-9 w-9 items-center justify-center text-fg-1 transition-colors hover:text-accent"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeLine(l.productId, l.variant)}
                  className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3 transition-colors hover:text-fg-1"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Order summary */}
      <aside className="rounded-sm border border-ink-4 bg-ink-1 p-6 md:sticky md:top-24 md:self-start">
        <h2 className="font-display text-[18px] uppercase tracking-[-0.01em]">
          Order Summary
        </h2>
        <dl className="mt-5 space-y-3">
          <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
          <SummaryRow
            label="Shipping"
            value={shipping === 0 ? "Free" : formatPrice(shipping)}
          />
        </dl>
        {remainingForFree > 0 && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
            Add {formatPrice(remainingForFree)} for free shipping
          </p>
        )}
        <div className="mt-5 flex items-baseline justify-between border-t border-ink-4 pt-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-2">
            Total
          </span>
          <span className="font-display text-[24px] tracking-[-0.02em] tabular-nums">
            {formatPrice(total)}
          </span>
        </div>
        <button
          type="button"
          disabled={checkingOut}
          onClick={async () => {
            setCheckingOut(true);
            try {
              const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lines }),
              });
              const data = await res.json();
              if (data.url) window.location.href = data.url;
            } finally {
              setCheckingOut(false);
            }
          }}
          className={`mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-sm text-[12px] font-bold uppercase tracking-[0.08em] transition-colors ${
            checkingOut
              ? "cursor-wait bg-ink-3 text-fg-3"
              : "bg-accent text-accent-fg hover:bg-accent-hover"
          }`}
        >
          {checkingOut ? "Redirecting…" : "Checkout"}
        </button>
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3">
          Apple Pay · Google Pay · All major cards
        </p>
      </aside>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-[14px] text-fg-2">{label}</dt>
      <dd className="font-mono text-[13px] tabular-nums text-fg-1">{value}</dd>
    </div>
  );
}
