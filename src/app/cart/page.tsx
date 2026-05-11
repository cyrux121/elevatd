import { CartView } from "@/app/cart/_cart-view";

export const runtime = "edge";

export const metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-container px-4 py-12 sm:px-6 md:py-16">
      <p className="reveal text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Your cart
      </p>
      <h1 className="reveal mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Review your build
      </h1>
      <CartView />
    </div>
  );
}
