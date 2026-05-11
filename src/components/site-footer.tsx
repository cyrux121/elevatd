import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-4 bg-ink-1">
      <div className="mx-auto max-w-container px-4 pb-6 pt-16 sm:px-8">

        {/* Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-12 pb-14">

          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-display text-[28px] leading-none tracking-tight uppercase">
              ELEVATED<br />CUSTOMS
            </p>
            <p className="mt-3 max-w-[28ch] text-sm text-fg-2 leading-relaxed">
              Elevation, not inflation. Premium LED rock lights at honest prices, built for trucks that earn their dirt.
            </p>
          </div>

          {/* Shop */}
          <FooterCol title="Shop">
            <FooterLink href="/shop">All Products</FooterLink>
            <FooterLink href="/shop">12-Pack Kits</FooterLink>
            <FooterLink href="/shop">Singles</FooterLink>
            <FooterLink href="/shop">New Arrivals</FooterLink>
          </FooterCol>

          {/* Brand */}
          <FooterCol title="Brand">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/contact#warranty">Warranty</FooterLink>
            <FooterLink href="/contact#shipping">Returns &amp; Shipping</FooterLink>
          </FooterCol>

          {/* Follow */}
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-2">
              Follow
            </p>
            <div className="flex gap-2">
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
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-3 leading-relaxed">
              SHIPS FROM<br />NEW JERSEY
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-4 pt-6 font-mono text-[11px] uppercase tracking-[0.06em] text-fg-3">
          <span>© 2026 ELEVATED CUSTOMS</span>
          <span>IP68 · DOT-FRIENDLY · LIFETIME LED WARRANTY</span>
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
      <Link href={href} className="text-sm text-fg-1 transition-colors hover:text-accent">
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
