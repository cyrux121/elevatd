import Link from "next/link";

export const runtime = "edge";
export const metadata = { title: "About — Elevated Customs" };

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-ink-4 py-20">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            // THE STORY
          </p>
          <h1 className="mt-3 font-display text-[clamp(48px,7vw,96px)] uppercase leading-[0.92] tracking-[-0.035em]">
            Built By A<br />Truck Guy.
          </h1>
        </div>
      </section>

      {/* Founder story */}
      <section className="border-b border-ink-4 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <div className="space-y-6 text-[16px] leading-[1.7] text-fg-1">
            <p>
              My name is Jacob Holicki. I own an F-250 — Blue Jeans and Caribou
              two-tone, 40-inch tires. A few years back I started looking for rock lights
              and ran into the same thing everyone runs into: the same exact pods on six
              different sites with six completely different prices. One store wanted $836
              for a 12-pack. Another had the same lights for $499. Same brightness, same
              IP68 rating, same install — just a different brand name on the box.
            </p>
            <p>
              I dug into it. Turns out most of the &quot;premium&quot; rock light brands
              are just reselling the same sourced hardware at a massive markup. The
              product itself is good. The pricing is theater.
            </p>
            <p>
              So I started Elevated Customs. I built direct relationships with the
              manufacturers, cut out the middlemen, and started selling the same quality
              lights at honest prices. IP68 waterproof, aluminum housing, true multi-color
              RGB with clean whites, proper wiring harnesses.
            </p>
            <p>
              We ship out of Lyndhurst, NJ. I run these lights on my own truck. Every
              order goes through a quality check before it ships. If something is wrong
              with your order, you&apos;re dealing with me directly — not a chatbot, not
              a call center.
            </p>
            <p className="font-display text-[18px] uppercase tracking-[-0.01em] text-fg-0">
              Same quality. Honest price. Ships from Jersey.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-ink-4 py-16">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <div className="grid grid-cols-1 gap-px border border-ink-4 bg-ink-4 md:grid-cols-3">
            <ValueCell
              num="01"
              title="No Middleman Markup"
              description="Direct manufacturer relationships mean you're paying for the hardware, not someone's brand tax. Same pods, real price."
            />
            <ValueCell
              num="02"
              title="Ships From NJ"
              description="Real inventory, real warehouse in Lyndhurst, New Jersey. Not a dropship operation running out of a spreadsheet."
            />
            <ValueCell
              num="03"
              title="Founder Answers"
              description="Got an issue? Email lands in my inbox. I know the product, I'll make it right, and I won't make you fight for it."
            />
          </div>
        </div>
      </section>

      {/* Featured build */}
      <section className="border-b border-ink-4 py-16">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                // THE BUILD
              </p>
              <h2 className="mt-3 font-display text-[clamp(28px,4vw,52px)] uppercase leading-[0.92] tracking-[-0.03em]">
                Blue Jeans /<br />Caribou F-250
              </h2>
              <p className="mt-4 text-[15px] leading-[1.7] text-fg-1">
                40-inch tires, Blue Jeans and Caribou two-tone. This is the truck the
                lights were designed for. Every SKU we carry has been run on a real build
                — not just validated on a spec sheet.
              </p>
            </div>
            <div className="aspect-video rounded-sm border border-ink-4 bg-[repeating-linear-gradient(45deg,#1a1c22_0_8px,#141519_8px_16px)]" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
            <div>
              <h2 className="font-display text-[clamp(28px,4vw,48px)] uppercase leading-[0.92] tracking-[-0.03em]">
                Ready to light it up?
              </h2>
              <p className="mt-2 text-[15px] text-fg-2">
                Shop the full lineup or reach out with any questions.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link
                href="/shop"
                className="flex h-12 items-center gap-2 rounded-sm bg-accent px-6 text-[13px] font-bold uppercase tracking-[0.08em] text-accent-fg transition-colors hover:bg-accent-hover"
              >
                Shop Lights
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="flex h-12 items-center rounded-sm border border-ink-4 px-6 text-[13px] font-bold uppercase tracking-[0.08em] text-fg-1 transition-colors hover:border-accent hover:text-accent"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ValueCell({ num, title, description }: { num: string; title: string; description: string }) {
  return (
    <div className="bg-ink-1 px-8 py-9">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">{num}</p>
      <p className="mt-3.5 font-display text-[20px] uppercase tracking-[-0.01em]">{title}</p>
      <p className="mt-2 max-w-[36ch] text-[14px] leading-[1.55] text-fg-1">{description}</p>
    </div>
  );
}
