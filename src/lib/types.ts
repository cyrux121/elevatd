export type Product = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  description: string;
  led_count: number;
  price_single_cents: number;
  price_kit_cents: number;
  inventory_count: number;
  image_url: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type Variant = "single" | "kit";

export type CartLine = {
  productId: string;
  sku: string;
  slug: string;
  name: string;
  variant: Variant;
  unitPriceCents: number;
  quantity: number;
};

export type OrderStatus = "pending" | "paid" | "fulfilled" | "cancelled" | "refunded";

export type Order = {
  id: string;
  stripe_session_id: string | null;
  stripe_payment_intent: string | null;
  customer_email: string;
  customer_name: string | null;
  shipping_address: Record<string, unknown> | null;
  subtotal_cents: number;
  shipping_cents: number;
  total_cents: number;
  status: OrderStatus;
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  sku: string;
  name: string;
  variant: Variant;
  unit_price_cents: number;
  quantity: number;
  units_sold: number; // 1 for single, 12 for kit — what we deduct from inventory
};
