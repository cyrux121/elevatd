export function formatPrice(cents: number): string {
  const dollars = cents / 100;
  // Show .00 for whole dollar prices like $499, otherwise normal 2-decimal.
  const isWhole = Number.isInteger(dollars);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(dollars);
}

export const SHIPPING_THRESHOLD_CENTS = 25000;
export const FLAT_SHIPPING_CENTS = 1500;

export function calcShipping(subtotalCents: number): number {
  return subtotalCents >= SHIPPING_THRESHOLD_CENTS ? 0 : FLAT_SHIPPING_CENTS;
}
