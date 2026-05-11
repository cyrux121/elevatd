/**
 * Seed the products table. Run with: npm run seed
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const DESCRIPTION =
  "Premium IP68 waterproof LED rock lights built for trucks, SUVs, and off-road vehicles. Aluminum housing, 12V, easy install. Available as single units or complete 12-piece underbody kits.";

const products = [
  { sku: "EC-RL-24", led_count: 24, single: 3499, kit: 34900 },
  { sku: "EC-RL-36", led_count: 36, single: 4499, kit: 44900 },
  { sku: "EC-RL-108", led_count: 108, single: 4999, kit: 49900 },
  { sku: "EC-RL-144", led_count: 144, single: 5499, kit: 54900 },
  { sku: "EC-RL-219", led_count: 219, single: 6499, kit: 67900 },
];

async function main() {
  for (const p of products) {
    const row = {
      sku: p.sku,
      slug: `${p.led_count}-led-rock-light`,
      name: `${p.led_count} LED Rock Light`,
      description: DESCRIPTION,
      led_count: p.led_count,
      price_single_cents: p.single,
      price_kit_cents: p.kit,
      inventory_count: 0,
      image_url: null,
      active: true,
    };
    const { error } = await supabase
      .from("products")
      .upsert(row, { onConflict: "sku" });
    if (error) {
      console.error(`Failed ${p.sku}:`, error.message);
      process.exit(1);
    }
    console.log(`  ✓ ${p.sku}`);
  }
  console.log("Seed complete.");
}

main();
