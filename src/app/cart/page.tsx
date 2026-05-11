import { CartView } from "@/app/cart/_cart-view";

export const runtime = "edge";

export const metadata = { title: "Cart — Elevated Customs" };

export default function CartPage() {
  return (
    <>
      <section className="border-b border-ink-4 py-16">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            // YOUR BUILD
          </p>
          <h1 className="mt-3 font-display text-[clamp(36px,5vw,64px)] uppercase leading-[0.92] tracking-[-0.03em]">
            Review Your Cart
          </h1>
        </div>
      </section>
      <div className="mx-auto max-w-container px-4 py-12 sm:px-8">
        <CartView />
      </div>
    </>
  );
}
