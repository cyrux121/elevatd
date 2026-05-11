import Link from "next/link";
import { CartBadge } from "@/components/cart-badge";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-muted-border bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-base font-bold tracking-tight sm:text-lg"
          aria-label="Elevated Customs home"
        >
          ELEVATED CUSTOMS
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-ink/80 transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/shop"
            className="text-sm font-medium md:hidden text-ink/80 hover:text-accent"
          >
            Shop
          </Link>
          <CartBadge />
        </div>
      </div>
    </header>
  );
}
