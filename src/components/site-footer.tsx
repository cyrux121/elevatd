import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-4 bg-ink-1">
      <div className="mx-auto max-w-container px-4 pb-6 pt-14 sm:px-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 md:grid-cols-4 md:gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-display text-[26px] leading-none tracking-tight uppercase transition-colors hover:text-accent"
            >
              ELEVATED<br />CUSTOMS
            </Link>
            <p className="mt-3 max-w-[28ch] text-[13px] leading-relaxed text-fg-2">
              Premium LED rock lights at honest prices. No brand tax. Ships from Lyndhurst, NJ.
            </p>
            <div className="mt-4 flex gap-2">
              <SocialLink href="#" label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                </svg>
              </SocialLink>
              <SocialLink href="#" label="TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 3v3.2a4.8 4.8 0 0 0 4 4.8v3a7.8 7.8 0 0 1-4-1.2V16a5 5 0 1 1-5-5v3a2 2 0 1 0 2 2V3z" />
                </svg>
              </SocialLink>
            </div>
          </div>

          {/* Column 1: Navigate */}
          <FooterCol title="Navigate">
            <FooterLink href="/shop">Shop</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
          </FooterCol>

          {/* Column 2: Legal */}
          <FooterCol title="Legal">
            <FooterLink href="/legal/terms">Terms of Service</FooterLink>
            <FooterLink href="/legal/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/legal/refunds">Refund Policy</FooterLink>
            <FooterLink href="/legal/shipping">Shipping Policy</FooterLink>
          </FooterCol>

          {/* Column 3: Company */}
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-2">
              Company
            </p>
            <div className="space-y-2 text-[13px] leading-relaxed text-fg-2">
              <p>© Elevated Customs 2026</p>
              <p>Lyndhurst, NJ</p>
              <a
                href="mailto:orders@[YOUR DOMAIN]"
                className="block transition-colors hover:text-accent"
              >
                orders@[YOUR DOMAIN]
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-4 pt-5 font-mono text-[10px] uppercase tracking-[0.06em] text-fg-3">
          <span>© 2026 Elevated Customs — Lyndhurst, NJ</span>
          <span>IP68 · Off-Road Use Only</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-2">
        {title}
      </p>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-[13px] text-fg-1 transition-colors hover:text-accent">
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-sm border border-ink-4 text-fg-1 transition-all hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  );
}
