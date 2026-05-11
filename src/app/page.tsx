import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-muted-border">
        <div className="mx-auto max-w-container px-4 pb-12 pt-10 sm:px-6 sm:pt-14 md:pb-20 md:pt-20">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="reveal">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Premium LED rock lights
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Honest prices.
                <br />
                Bright as hell.
              </h1>
              <p className="mt-5 max-w-md text-base text-ink/70 sm:text-lg">
                The same premium IP68 LED rock lights the big sellers charge $836 for.
                We sell them for $499. No brand tax. Just lights that work.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/shop"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 text-sm font-semibold text-paper transition-colors hover:bg-accent-hover"
                >
                  Shop Rock Lights
                </Link>
                <Link
                  href="/about"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-muted-border bg-paper px-6 text-sm font-semibold text-ink transition-colors hover:border-ink"
                >
                  Our story
                </Link>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                Free shipping over $250 · 30-day returns · IP68 waterproof
              </p>
            </div>

            {/* Hero placeholder image */}
            <div className="reveal aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted md:aspect-square">
              <div className="flex h-full w-full items-center justify-center px-6 text-center">
                <span className="text-2xl font-bold tracking-[0.18em] text-ink sm:text-3xl">
                  ELEVATED CUSTOMS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured grid */}
      <section className="mx-auto max-w-container px-4 py-16 sm:px-6 md:py-24">
        <div className="reveal flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Featured rock lights
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The most popular configurations.
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden text-sm font-semibold text-accent hover:underline sm:inline"
          >
            View all →
          </Link>
        </div>

        <div className="reveal mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="reveal mt-10 sm:hidden">
          <Link
            href="/shop"
            className="text-sm font-semibold text-accent hover:underline"
          >
            View all products →
          </Link>
        </div>
      </section>

      {/* Brand story */}
      <section className="border-t border-muted-border bg-muted/40">
        <div className="mx-auto max-w-container px-4 py-16 sm:px-6 md:py-24">
          <div className="reveal grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Why we exist
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                The rock light market is broken.
              </h2>
              <div className="mt-5 space-y-4 text-base text-ink/80 sm:text-lg">
                <p>
                  Big sellers charge $836 for a 12-pack of lights that cost a fraction of
                  that to make.
                </p>
                <p>
                  Elevated Customs sells the same premium IP68 waterproof LED rock lights —
                  same brightness, same controllers, same install — at honest prices.
                </p>
                <p className="font-semibold text-ink">
                  No brand tax. Just lights that work, priced fair.
                </p>
              </div>
              <div className="mt-7">
                <Link
                  href="/about"
                  className="text-sm font-semibold text-accent hover:underline"
                >
                  Read the full story →
                </Link>
              </div>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              <Stat label="The big-brand price" value="$836" muted />
              <Stat label="Our price" value="$499" accent />
              <Stat label="Waterproof rating" value="IP68" />
              <Stat label="Voltage" value="12V" />
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({
  label,
  value,
  accent,
  muted,
}: {
  label: string;
  value: string;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <li className="rounded-xl border border-muted-border bg-paper p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={
          "mt-2 text-3xl font-bold tracking-tight " +
          (accent ? "text-accent" : muted ? "text-ink/40 line-through" : "text-ink")
        }
      >
        {value}
      </p>
    </li>
  );
}
