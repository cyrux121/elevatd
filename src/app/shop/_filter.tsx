"use client";

import Link from "next/link";
import { clsx } from "@/lib/clsx";

export function ShopFilter({
  ledCounts,
  active,
}: {
  ledCounts: number[];
  active: number | null;
}) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div className="flex items-center gap-2 py-3">
        <span className="mr-2 shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-2">
          LED Count
        </span>
        <FilterChip href="/shop" label="All" active={active === null} />
        {ledCounts.map((n) => (
          <FilterChip
            key={n}
            href={`/shop?led=${n}`}
            label={`${n} LED`}
            active={active === n}
          />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-sm border px-3 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors",
        active
          ? "border-accent bg-accent/10 text-accent"
          : "border-ink-4 bg-ink-2 text-fg-1 hover:border-ink-5 hover:text-fg-0"
      )}
    >
      {label}
    </Link>
  );
}
