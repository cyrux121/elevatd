import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-muted-border bg-paper">
      <div className="mx-auto flex max-w-container flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-lg font-bold tracking-tight">ELEVATED CUSTOMS</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Premium LED rock lights for trucks. Honest prices. No brand tax.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-4">
          <FooterCol title="Shop">
            <FooterLink href="/shop">All products</FooterLink>
            <FooterLink href="/shop?led=108">108 LED</FooterLink>
            <FooterLink href="/shop?led=219">219 LED</FooterLink>
          </FooterCol>
          <FooterCol title="Company">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterCol>
          <FooterCol title="Support">
            <FooterLink href="/contact#faq">FAQ</FooterLink>
            <FooterLink href="/contact#shipping">Shipping</FooterLink>
            <FooterLink href="/contact#returns">Returns</FooterLink>
            <FooterLink href="/contact#warranty">Warranty</FooterLink>
          </FooterCol>
          <FooterCol title="Follow">
            <FooterLink href="#" external>Instagram</FooterLink>
            <FooterLink href="#" external>TikTok</FooterLink>
          </FooterCol>
        </div>
      </div>
      <div className="border-t border-muted-border">
        <div className="mx-auto max-w-container px-4 py-6 text-xs text-muted-foreground sm:px-6">
          © 2026 Elevated Customs. Built in New Jersey.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink">
        {title}
      </p>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-muted-foreground transition-colors hover:text-accent"
      >
        {children}
      </Link>
    </li>
  );
}
