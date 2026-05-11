export const metadata = { title: "Contact & FAQ" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <p className="reveal text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Support
      </p>
      <h1 className="reveal mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        Contact & FAQ
      </h1>
      <p className="reveal mt-4 text-lg text-ink/80">
        Got a question? Email{" "}
        <a
          href="mailto:support@elevatedcustoms.com"
          className="text-accent hover:underline"
        >
          support@elevatedcustoms.com
        </a>
        . We answer fast.
      </p>

      <div className="reveal mt-14 space-y-10">
        <Faq id="shipping" q="Shipping">
          Flat $15 shipping on US orders under $250. Free shipping over $250. Orders
          ship in 1–2 business days from New Jersey.
        </Faq>
        <Faq id="returns" q="Returns">
          30 days, no questions asked. Lights must be in resellable condition. We pay
          return shipping on defects.
        </Faq>
        <Faq id="warranty" q="Warranty">
          1-year warranty on all rock lights. If a light fails under normal use, we
          replace it. Email us with photo + order #.
        </Faq>
        <Faq id="install" q="Install">
          12V system. Plug into any switched accessory line. Full wiring harness and
          controller included with every 12-pack kit.
        </Faq>
      </div>
    </div>
  );
}

function Faq({ id, q, children }: { id: string; q: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-muted-border pt-8">
      <h2 className="text-xl font-bold tracking-tight">{q}</h2>
      <p className="mt-3 text-ink/80">{children}</p>
    </section>
  );
}
