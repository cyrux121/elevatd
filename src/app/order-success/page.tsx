import { redirect } from "next/navigation";
import Link from "next/link";
import Stripe from "stripe";
import { ClearCart } from "@/app/order-success/_clear-cart";

export const runtime = "edge";

function fmt(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia",
    // @ts-ignore
    httpClient: Stripe.createFetchHttpClient(),
  });

  const sessionId = searchParams.session_id;
  if (!sessionId) redirect("/");

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
  } catch {
    redirect("/");
  }

  if (session.payment_status !== "paid") redirect("/cart");

  const subtotal = session.amount_subtotal ?? 0;
  const shipping = session.total_details?.amount_shipping ?? 0;
  const total = session.amount_total ?? 0;
  const email = session.customer_details?.email;

  return (
    <>
      <ClearCart />

      {/* Header */}
      <section className="border-b border-ink-4 py-20">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            // ORDER CONFIRMED
          </p>
          <h1 className="mt-3 font-display text-[clamp(40px,6vw,80px)] uppercase leading-[0.92] tracking-[-0.03em]">
            You&apos;re All Set.
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            {/* Left: order details */}
            <div className="space-y-4 md:col-span-2">
              {/* Order number */}
              <div className="rounded-sm border border-ink-4 bg-ink-1 px-6 py-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-2">
                  Order Number
                </p>
                <p className="mt-1 break-all font-mono text-[12px] text-fg-1">
                  {session.id}
                </p>
              </div>

              {/* Email */}
              {email && (
                <div className="rounded-sm border border-ink-4 bg-ink-1 px-6 py-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-2">
                    Confirmation sent to
                  </p>
                  <p className="mt-1 text-[15px] text-fg-0">{email}</p>
                </div>
              )}

              {/* Line items */}
              <div className="rounded-sm border border-ink-4 bg-ink-1 px-6 py-5">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-2">
                  Items Ordered
                </p>
                <ul className="divide-y divide-ink-4">
                  {session.line_items?.data.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-baseline justify-between py-3"
                    >
                      <span className="text-[14px] text-fg-1">
                        {item.description}
                        {item.quantity && item.quantity > 1 && (
                          <span className="ml-2 font-mono text-[11px] text-fg-3">
                            × {item.quantity}
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-[13px] tabular-nums text-fg-0">
                        {fmt(item.amount_total ?? 0)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: summary */}
            <aside className="rounded-sm border border-ink-4 bg-ink-1 p-6 md:sticky md:top-24 md:self-start">
              <h2 className="font-display text-[18px] uppercase tracking-[-0.01em]">
                Order Summary
              </h2>
              <dl className="mt-5 space-y-3">
                <SummaryRow label="Subtotal" value={fmt(subtotal)} />
                <SummaryRow
                  label="Shipping"
                  value={shipping === 0 ? "Free" : fmt(shipping)}
                />
              </dl>
              <div className="mt-5 flex items-baseline justify-between border-t border-ink-4 pt-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-2">
                  Total
                </span>
                <span className="font-display text-[24px] tracking-[-0.02em] tabular-nums text-accent">
                  {fmt(total)}
                </span>
              </div>

              <p className="mt-6 text-[13px] leading-[1.65] text-fg-2">
                We&apos;ll email you when your order ships. Lights leave our
                New Jersey warehouse next business day.
              </p>

              <Link
                href="/shop"
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-accent text-[13px] font-bold uppercase tracking-[0.08em] text-accent-fg transition-colors hover:bg-accent-hover"
              >
                Shop More
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-[14px] text-fg-2">{label}</dt>
      <dd className="font-mono text-[13px] tabular-nums text-fg-1">{value}</dd>
    </div>
  );
}
