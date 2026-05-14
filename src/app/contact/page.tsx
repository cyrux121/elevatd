import Link from "next/link";

export const runtime = "edge";
export const metadata = { title: "Contact — Elevated Customs" };

export default function ContactPage() {
  const subject = encodeURIComponent("Question about my order");
  const body = encodeURIComponent("Order number (if applicable):\n\nMessage:\n");
  const mailtoHref = `mailto:orders@[YOUR DOMAIN]?subject=${subject}&body=${body}`;

  return (
    <>
      {/* Hero */}
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

      <section className="py-16">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">

            {/* Left: contact info */}
            <div className="space-y-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">Email</p>
                <a
                  href="mailto:orders@[YOUR DOMAIN]"
                  className="mt-2 block font-display text-[20px] uppercase tracking-[-0.01em] text-accent transition-colors hover:text-accent-hover"
                >
                  orders@[YOUR DOMAIN]
                </a>
                <p className="mt-1 text-[13px] text-fg-2">
                  Response within 24 hours, Mon–Fri
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">Location</p>
                <p className="mt-2 text-[16px] text-fg-1">Lyndhurst, NJ</p>
                <p className="mt-1 text-[13px] text-fg-2">Orders ship from here</p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">Hours</p>
                <p className="mt-2 text-[16px] text-fg-1">Monday – Friday</p>
                <p className="mt-1 text-[13px] text-fg-2">Closed weekends and federal holidays</p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">Truck Shows</p>
                <p className="mt-2 text-[15px] text-fg-1">DSLNY — September 2026</p>
                <p className="mt-1 text-[13px] text-fg-1">Orange County Fair Speedway</p>
                <p className="mt-1 text-[13px] text-fg-2">Come see the lights in person</p>
              </div>

              <div className="rounded-sm border border-ink-4 bg-ink-1 px-5 py-4">
                <p className="text-[13px] leading-[1.6] text-fg-2">
                  Have a common question?{" "}
                  <Link href="/faq" className="text-accent hover:underline">
                    Check the FAQ →
                  </Link>
                </p>
              </div>
            </div>

            {/* Right: contact form (mailto) */}
            <div>
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-3">
                Send a message
              </p>
              <ContactForm mailtoBase="orders@[YOUR DOMAIN]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactForm({ mailtoBase }: { mailtoBase: string }) {
  return (
    <form
      onSubmit={undefined}
      action={`mailto:${mailtoBase}`}
      method="GET"
      encType="text/plain"
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-admin">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="admin-input"
          />
        </div>
        <div>
          <label htmlFor="email" className="label-admin">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="admin-input"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="label-admin">Subject</label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="Order question, product question, etc."
          className="admin-input"
        />
      </div>
      <div>
        <label htmlFor="body" className="label-admin">Message</label>
        <textarea
          id="body"
          name="body"
          rows={6}
          required
          placeholder="Include your order number if relevant…"
          className="admin-input resize-none"
        />
      </div>
      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-accent text-[13px] font-bold uppercase tracking-[0.08em] text-accent-fg transition-colors hover:bg-accent-hover"
      >
        Open Email Client
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
      <p className="text-center font-mono text-[10px] text-fg-3">
        This opens your email app with the message pre-filled.
      </p>
    </form>
  );
}
