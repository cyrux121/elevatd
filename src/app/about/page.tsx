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
              A couple years back I was shopping for rock lights for my truck.
              I wanted something that would hold up — IP68 waterproof, bright,
              RGB with real white. I kept finding the same pods on every site,
              just slapped with a different brand name and a totally different
              price tag.
            </p>
            <p>
              One store wanted $836 for a 12-pack. Another was selling the same
              lights for $499. Same brightness, same ratings, same install. The
              only difference was the logo on the box.
            </p>
            <p>
              So I started Elevated Customs. I source the same premium
              IP68-rated LED rock light pods, pair them with quality wiring
              harnesses and Bluetooth controllers, and sell them at honest
              prices. No brand tax, no reseller markup.
            </p>
            <p>
              We ship out of New Jersey. I run these lights on my own truck. If
              something&apos;s wrong with your order, you&apos;re texting me
              directly — not a chatbot, not a call center. Just a guy who cares
              about getting it right.
            </p>
            <p className="font-display text-[18px] uppercase tracking-[-0.01em] text-fg-0">
              Same lights. Same install. Half the price.
            </p>
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="py-16">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <div className="grid grid-cols-1 gap-px bg-ink-4 border border-ink-4 md:grid-cols-3">
            <ValueCell
              num="01"
              title="No Brand Tax"
              description="We don't charge you for a logo. You're paying for the hardware — IP68 pods, marine-grade harness, Bluetooth controller."
            />
            <ValueCell
              num="02"
              title="Ships From NJ"
              description="Real inventory, real warehouse, next-business-day shipping. Not a dropship operation."
            />
            <ValueCell
              num="03"
              title="Text The Founder"
              description="Got an issue? Text me. I answer fast, I know the product, and I'll make it right."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ValueCell({
  num,
  title,
  description,
}: {
  num: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-ink-1 px-8 py-9">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
        {num}
      </p>
      <p className="mt-3.5 font-display text-[20px] uppercase tracking-[-0.01em]">
        {title}
      </p>
      <p className="mt-2 max-w-[36ch] text-[14px] leading-[1.55] text-fg-1">
        {description}
      </p>
    </div>
  );
}
