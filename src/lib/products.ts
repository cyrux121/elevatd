import type { Product } from "@/lib/types";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

// Static fallback used when Supabase isn't configured yet (so the dev UI still
// renders). Mirrors the seed data — keep in sync with scripts/seed.ts.
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "fb-24",
    sku: "EC-RL-24",
    slug: "24-led-rock-light",
    name: "24 LED Rock Light",
    led_count: 24,
    price_single_cents: 3499,
    price_kit_cents: 34900,
    inventory_count: 0,
    image_url: "/images/24-led-rock-light.jpg.png",
    active: true,
    description: BASE_DESCRIPTION(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "fb-36",
    sku: "EC-RL-36",
    slug: "36-led-rock-light",
    name: "36 LED Rock Light",
    led_count: 36,
    price_single_cents: 4499,
    price_kit_cents: 44900,
    inventory_count: 0,
    image_url: "/images/image-1778561014080.jpg",
    active: true,
    description: BASE_DESCRIPTION(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "fb-108",
    sku: "EC-RL-108",
    slug: "108-led-rock-light",
    name: "108 LED Rock Light",
    led_count: 108,
    price_single_cents: 4999,
    price_kit_cents: 49900,
    inventory_count: 0,
    image_url: "/images/108-led-rock-light.jpg.png",
    active: true,
    description: BASE_DESCRIPTION(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "fb-219",
    sku: "EC-RL-219",
    slug: "219-led-rock-light",
    name: "219 LED Rock Light",
    led_count: 219,
    price_single_cents: 6499,
    price_kit_cents: 67900,
    inventory_count: 0,
    image_url: "/images/219-led-rock-light.jpg",
    active: true,
    description: BASE_DESCRIPTION(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

function BASE_DESCRIPTION() {
  return "Premium IP68 waterproof LED rock lights built for trucks, SUVs, and off-road vehicles. Aluminum housing, 12V, easy install. Available as single units or complete 12-piece underbody kits.";
}

const EXCLUDED_SLUGS = ["144-led-rock-light"];

export async function getAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) return FALLBACK_PRODUCTS;
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("led_count", { ascending: true });
  if (error) {
    console.error("[getAllProducts]", error);
    return FALLBACK_PRODUCTS;
  }
  return ((data as Product[]) ?? FALLBACK_PRODUCTS).filter(
    (p) => !EXCLUDED_SLUGS.includes(p.slug)
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured) {
    return FALLBACK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("[getProductBySlug]", error);
    return null;
  }
  return (data as Product) ?? null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  // Show three featured tiers on home — 36 / 108 / 219.
  const featuredSkus = ["EC-RL-36", "EC-RL-108", "EC-RL-219"];
  const picked = featuredSkus
    .map((sku) => all.find((p) => p.sku === sku))
    .filter((p): p is Product => !!p);
  return picked.length ? picked : all.slice(0, 3);
}
