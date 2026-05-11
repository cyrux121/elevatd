export const runtime = "edge";

export const metadata = { title: "Contact — Elevated Customs" };

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-ink-4 py-20">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            // SUPPORT
          </p>
          <h1 className="mt-3 font-display text-[clamp(48px,7vw,96px)] uppercase leading-[0.92] tracking-[-0.035em]">
            Hit Us Up.
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <div className="grid gap-16 md:grid-cols-2">
            {/* Contact info */}
            <div className="space-y-8">
              <ContactBlock
                label="Email"
                value="support@elevatedcustoms.com"
                href="mailto:support@elevatedcustoms.com"
                note="Typically replies within a few hours"
              />
              <ContactBlock
                label="Instagram"
                value="@elevatedcustoms"
                href="#"
                note="DMs open — tag us in your install"
              />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-2">
                  Hours
                </p>
                <p className="mt-2 text-[15px] text-fg-1">
                  Mon – Fri, 9am – 6pm ET
                </p>
                <p className="mt-1 text-[14px] text-fg-2">
                  Orders ship next business day from New Jersey
                </p>
              </div>
            </div>

            {/* Quick info cards */}
            <div className="space-y-4">
              <InfoCard
                title="Shipping"
                body="Flat $15 on orders under $250. Free shipping over $250. Ships next business day from New Jersey."
              />
              <InfoCard
                title="Returns"
                body="30 days, no questions asked. Lights must be in resellable condition. We cover return shipping on defects."
              />
              <InfoCard
                title="Warranty"
                body="2-year warranty on kits. Lifetime warranty on the LED pods themselves. Email with photo + order number."
              />
              <InfoCard
                title="Install"
                body="12V system. Plug into any switched accessory line. Full wiring harness and controller included with every 12-pack kit."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactBlock({
  label,
  value,
  href,
  note,
}: {
  label: string;
  value: string;
  href: string;
  note: string;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-2">
        {label}
      </p>
      <a
        href={href}
        className="mt-2 block font-display text-[20px] uppercase tracking-[-0.01em] text-accent transition-colors hover:text-accent-hover"
      >
        {value}
      </a>
      <p className="mt-1 text-[13px] text-fg-2">{note}</p>
    </div>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-sm border border-ink-4 bg-ink-2 px-6 py-5">
      <p className="font-display text-[16px] uppercase tracking-[-0.01em]">
        {title}
      </p>
      <p className="mt-2 text-[13px] leading-[1.55] text-fg-1">{body}</p>
    </div>
  );
}
