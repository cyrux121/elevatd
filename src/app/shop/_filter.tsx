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
    <div className="reveal mt-8 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div className="flex items-center gap-2">
        <span className="mr-2 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          LED count
        </span>
        <FilterChip href="/shop" label="All" active={active === null} />
        {ledCounts.map((n) => (
          <FilterChip
            key={n}
            href={`/shop?led=${n}`}
            label={`${n}`}
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
        "inline-flex h-9 shrink-0 items-center justify-center rounded-full border px-4 text-sm font-medium transition-colors",
        active
          ? "border-ink bg-ink text-paper"
          : "border-muted-border bg-paper text-ink hover:border-ink"
      )}
    >
      {label}
    </Link>
  );
}
