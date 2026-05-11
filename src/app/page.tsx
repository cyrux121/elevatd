import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const runtime = "edge";

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden border-b border-ink-4 bg-ink-0">
        {/* Striped + glow background */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: [
              "radial-gradient(80% 60% at 70% 60%, rgba(58,141,255,0.16), transparent 60%)",
              "linear-gradient(180deg, rgba(6,7,10,0.2) 0%, rgba(6,7,10,0.9) 80%, #06070a 100%)",
              "repeating-linear-gradient(135deg, #0e1014 0 2px, #0a0b0e 2px 12px)",
            ].join(","),
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-1/2 w-4/5 -translate-x-1/2 blur-[20px]"
          style={{
            background: "radial-gradient(60% 80% at 50% 100%, rgba(58,141,255,0.55) 0%, transparent 65%)",
            opacity: 0.55,
          }}
        />

        <div className="mx-auto max-w-container px-4 sm:px-8">
          <div className="pb-24 pt-20 md:pt-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
              · TRUCK TESTED · IP68 RATED · SHIPS FROM NEW JERSEY ·
            </p>
            <h1 className="mt-4 font-display text-[clamp(48px,8vw,120px)] uppercase leading-[0.92] tracking-[-0.035em]">
              ELEVATION,
              <br />
              NOT&nbsp;<span className="text-accent">INFLATION.</span>
            </h1>
            <p className="mt-7 max-w-[52ch] text-[clamp(15px,1.4vw,18px)] leading-[1.55] text-fg-1">
              Premium LED rock lights for trucks that work. Same pods, same controllers,
              same install as the brands charging&nbsp;$836 — for&nbsp;$499.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex h-12 items-center gap-2 rounded-sm bg-accent px-6 text-[13px] font-bold uppercase tracking-[0.08em] text-accent-fg transition-colors hover:bg-accent-hover"
              >
                Shop All Kits <ArrowIcon />
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center rounded-sm border border-ink-5 px-6 text-[13px] font-bold uppercase tracking-[0.08em] text-fg-0 transition-colors hover:bg-ink-2"
              >
                The Story
              </Link>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <div className="grid grid-cols-1 border-t border-ink-4 bg-ink-0/55 sm:grid-cols-3">
            <HeroStat
              value={
                <>
                  <span className="mr-2 text-[18px] font-normal text-fg-3 line-through">$836</span>
                  $499
                </>
              }
              label="12-Pack 108-LED Kit"
              bordered
            />
            <HeroStat value="IP68" label="Truck-Wash Proof" bordered />
            <HeroStat value="2 YR" label="No-BS Warranty" />
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="overflow-hidden border-b border-t border-ink-4 bg-ink-1">
        <div className="flex animate-marquee gap-12 whitespace-nowrap py-[18px] font-display text-[22px] uppercase tracking-[-0.01em] text-fg-1">
          {[
            "F-250","F-150","Silverado","Ram 2500","Sierra","Tacoma","Tundra","Powerwagon",
            "F-250","F-150","Silverado","Ram 2500","Sierra","Tacoma","Tundra","Powerwagon",
          ].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              {t}
              <span className="text-accent">●</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured kits ── */}
      <section className="border-b border-ink-4 py-24">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                // FEATURED RIGS
              </p>
              <h2 className="mt-3 font-display text-[clamp(34px,4.4vw,56px)] uppercase leading-[0.95] tracking-[-0.03em]">
                Built To<br />Get&nbsp;Seen.
              </h2>
            </div>
            <p className="max-w-[44ch] text-[15px] leading-[1.55] text-fg-1">
              Three kits running on rigs across the country. Pick your output —
              install is the same M6 bolt, same harness, same app, every truck.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/shop"
              className="inline-flex h-12 items-center gap-2 rounded-sm border border-ink-5 px-6 text-[13px] font-bold uppercase tracking-[0.08em] text-fg-0 transition-colors hover:bg-ink-2"
            >
              See All 5 Models <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Story + Price compare ── */}
      <section className="border-b border-ink-4 bg-ink-1 py-24">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <div className="grid items-center gap-16 md:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                // THE STORY
              </p>
              <h2 className="mt-3 font-display text-[clamp(36px,5vw,72px)] uppercase leading-[0.92] tracking-[-0.03em]">
                The rock light<br />market is broken.
              </h2>
              <p className="mt-6 text-[16px] leading-[1.65] text-fg-1">
                Big sellers charge{" "}
                <strong className="text-fg-0">$836</strong>{" "}
                for a 12-pack of lights that cost a fraction of that to make.
                Elevated Customs sells the same premium IP68 waterproof LED rock lights —
                same brightness, same controllers, same install — at honest prices.
              </p>
              <p className="mt-4 text-[16px] leading-[1.65] text-fg-1">
                No brand tax. No reseller markup. Just lights that work, priced fair,
                shipped by a guy who runs them on his own truck.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="inline-flex h-12 items-center gap-2 rounded-sm bg-accent px-6 text-[13px] font-bold uppercase tracking-[0.08em] text-accent-fg transition-colors hover:bg-accent-hover"
                >
                  Shop The Lineup
                </Link>
                <Link
                  href="/about"
                  className="inline-flex h-12 items-center rounded-sm border border-ink-5 px-6 text-[13px] font-bold uppercase tracking-[0.08em] text-fg-0 transition-colors hover:bg-ink-2"
                >
                  Meet The Founder
                </Link>
              </div>
            </div>

            {/* Price comparison card */}
            <div className="rounded-md border border-ink-4 bg-ink-2 p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-2">
                // 108-LED · 12-PACK KIT
              </p>
              <div className="divide-y divide-dashed divide-ink-4">
                <div className="grid grid-cols-[1fr_auto] items-baseline py-[18px]">
                  <div>
                    <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-fg-2">Competitor</p>
                    <p className="mt-1 font-display text-[18px] uppercase tracking-[-0.01em]">&ldquo;Premium&rdquo; Brand</p>
                  </div>
                  <p className="font-display text-[28px] tracking-[-0.02em] text-fg-3 line-through">$836</p>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-baseline py-[18px]">
                  <div>
                    <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-fg-2">Us</p>
                    <p className="mt-1 font-display text-[18px] uppercase tracking-[-0.01em]">Elevated Customs</p>
                  </div>
                  <p className="font-display text-[28px] tracking-[-0.02em] text-accent">$499</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-ink-4 pt-5 mt-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-2">YOU KEEP</p>
                <p className="font-display text-[22px] tracking-[-0.01em] text-accent">$337 SAVED · 40% OFF</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Spec trio ── */}
      <section className="border-b border-ink-4">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <SpecCell num="01 / IP68" title="Waterproof, Mudproof, Run-It-Through-The-Wash-Proof." bordered>
              Sealed pods rated for full submersion. Powder-coated bracket, marine-grade harness.
            </SpecCell>
            <SpecCell num="02 / RGB+W" title="All The Colors. Real White. App + Remote." bordered>
              16M colors plus dedicated cold-white channel for actual visibility — not blue pretending to be white.
            </SpecCell>
            <SpecCell num="03 / SUPPORT" title="A Truck Guy On The Other End Of The Phone.">
              Text the founder. No call centers, no chatbots. Lifetime LED warranty on the pods themselves.
            </SpecCell>
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="border-b border-ink-4 py-24">
        <div className="mx-auto max-w-container px-4 text-center sm:px-8">
          <h2 className="font-display text-[clamp(40px,7vw,96px)] uppercase leading-[0.92] tracking-[-0.04em]">
            LIGHT YOUR RIG.<br />
            <span className="text-accent">KEEP YOUR CASH.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] leading-[1.6] text-fg-1">
            Free shipping on orders over $250. Apple Pay, Google Pay, all major cards.
            Ships next business day from New Jersey.
          </p>
          <div className="mt-7 flex justify-center">
            <Link
              href="/shop"
              className="inline-flex h-12 items-center gap-2 rounded-sm bg-accent px-8 text-[13px] font-bold uppercase tracking-[0.08em] text-accent-fg transition-colors hover:bg-accent-hover"
            >
              Shop Now <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function HeroStat({
  value,
  label,
  bordered,
}: {
  value: React.ReactNode;
  label: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`px-7 py-[22px] ${
        bordered ? "border-b border-ink-4 sm:border-b-0 sm:border-r sm:border-ink-4" : ""
      }`}
    >
      <p className="font-display text-[30px] leading-none tracking-[-0.02em]">{value}</p>
      <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.08em] text-fg-2">{label}</p>
    </div>
  );
}

function SpecCell({
  num,
  title,
  children,
  bordered,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
  bordered?: boolean;
}) {
  return (
    <div
      className={`px-8 py-9 ${
        bordered ? "border-b border-ink-4 md:border-b-0 md:border-r md:border-ink-4" : ""
      }`}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">{num}</p>
      <p className="mt-3.5 font-display text-[20px] uppercase tracking-[-0.01em]">{title}</p>
      <p className="mt-2 max-w-[36ch] text-[14px] leading-[1.55] text-fg-1">{children}</p>
    </div>
  );
}
