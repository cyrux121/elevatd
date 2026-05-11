"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-store";

export function CartBadge() {
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.quantity, 0));
  return (
    <Link
      href="/cart"
      className="relative grid h-[38px] w-[38px] place-items-center rounded-sm border border-ink-4 text-fg-1 transition-all hover:border-ink-5 hover:bg-ink-2 hover:text-fg-0"
      aria-label={`Cart, ${count} items`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" aria-hidden>
        <path d="M3 4h2.5L7 14h11l2-7H7" />
        <circle cx="9" cy="19" r="1.5" />
        <circle cx="17" cy="19" r="1.5" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-ink-0 bg-accent px-1 font-mono text-[10px] font-semibold text-accent-fg">
          {count}
        </span>
      )}
    </Link>
  );
}
