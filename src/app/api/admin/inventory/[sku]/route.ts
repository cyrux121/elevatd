import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";

export const runtime = "edge";

export async function POST(
  req: NextRequest,
  { params }: { params: { sku: string } }
) {
  const authClient = createSupabaseServerClient();
  const { data: { session } } = await authClient.auth.getSession();
  if (!session || session.user.email !== env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { count } = await req.json();
  if (typeof count !== "number" || count < 0) {
    return NextResponse.json({ error: "Invalid count" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  const { data: product } = await supabase
    .from("products")
    .select("inventory_count")
    .eq("sku", params.sku)
    .single();

  const { error } = await supabase
    .from("products")
    .update({ inventory_count: count, updated_at: new Date().toISOString() })
    .eq("sku", params.sku);

  if (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  if (product) {
    const diff = count - (product.inventory_count as number);
    await supabase.from("inventory_log").insert({
      sku: params.sku,
      change_amount: diff,
      reason: "manual_adjustment",
    });
  }

  return NextResponse.json({ ok: true, count });
}
