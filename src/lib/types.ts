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

export type DbOrderStatus = "new" | "shipped" | "delivered";

export type ShippingAddress = {
  line1: string | null;
  line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
};

export type DbOrderLineItem = {
  name: string;
  sku: string;
  variant: Variant;
  quantity: number;
  unit_price_cents: number;
  total_cents: number;
};

export type DbOrder = {
  id: string;
  order_number: number;
  stripe_session_id: string;
  customer_email: string | null;
  customer_name: string | null;
  shipping_address: ShippingAddress | null;
  line_items: DbOrderLineItem[];
  subtotal_cents: number;
  shipping_cents: number;
  total_cents: number;
  payment_status: string;
  order_status: DbOrderStatus;
  tracking_number: string | null;
  carrier: string | null;
  internal_notes: string | null;
  created_at: string;
  shipped_at: string | null;
  delivered_at: string | null;
};
