"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartBadge } from "@/components/cart-badge";

const navLinks = [
  { href: "/shop",    label: "Shop"    },
  { href: "/about",   label: "About"   },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-4 bg-ink-0/85 backdrop-blur-[14px]">
      <div className="mx-auto flex h-16 max-w-container items-center gap-8 px-4 sm:px-8">

        {/* Logo */}
        <Link
          href="/"
          aria-label="Elevated Customs home"
          className="flex items-center gap-2.5 font-display text-[15px] tracking-[0.04em] text-fg-0"
        >
          <span
            className="grid h-7 w-7 place-items-center bg-accent font-display text-[13px] text-accent-fg"
            style={{ clipPath: "polygon(15% 0, 100% 0, 85% 100%, 0 100%)" }}
          >
            E
          </span>
          <span>ELEVATED&nbsp;CUSTOMS</span>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-4 hidden items-center gap-7 md:flex">
          {navLinks.map((l) => {
            const active =
              pathname === l.href ||
              (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-[13px] font-semibold uppercase tracking-[0.02em] transition-colors ${
                  active ? "text-fg-0" : "text-fg-1 hover:text-fg-0"
                }`}
              >
                {l.label}
                {active && (
                  <span
                    className="absolute left-0 right-0 h-0.5 bg-accent"
                    style={{ bottom: "-22px" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            className="grid h-[38px] w-[38px] place-items-center rounded-sm border border-ink-4 text-fg-1 transition-all hover:border-ink-5 hover:bg-ink-2 hover:text-fg-0"
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.8" strokeLinecap="square">
              <circle cx="11" cy="11" r="6" />
              <path d="M16 16l5 5" />
            </svg>
          </button>

          <CartBadge />

          <button
            className="grid h-[38px] w-[38px] place-items-center rounded-sm border border-ink-4 text-fg-1 transition-all hover:border-ink-5 hover:bg-ink-2 hover:text-fg-0 md:hidden"
            aria-label="Menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.8" strokeLinecap="square">
              <path d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
