"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-store";

export function CartBadge() {
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.quantity, 0));
  return (
    <Link
      href="/cart"
      className="relative inline-flex h-9 items-center gap-2 rounded-full border border-muted-border px-3 text-sm font-medium transition-colors hover:border-ink"
      aria-label={`Cart, ${count} items`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      <span>Cart</span>
      {count > 0 && (
        <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1.5 text-xs font-semibold text-paper">
          {count}
        </span>
      )}
    </Link>
  );
}
