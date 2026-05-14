import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase/server";
import { sendShippingNotification } from "@/lib/email";
import { env } from "@/lib/env";
import type { DbOrder } from "@/lib/types";

export const runtime = "edge";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authClient = createSupabaseServerClient();
  const { data: { session } } = await authClient.auth.getSession();
  if (!session || session.user.email !== env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { trackingNumber, carrier } = await req.json();
  if (!trackingNumber || !carrier) {
    return NextResponse.json({ error: "trackingNumber and carrier required" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .update({
      order_status: "shipped",
      tracking_number: trackingNumber,
      carrier,
      shipped_at: new Date().toISOString(),
    })
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    console.error("[admin/ship]", error);
    return NextResponse.json({ error: "Database update failed" }, { status: 500 });
  }

  try {
    await sendShippingNotification(data as DbOrder);
  } catch (emailErr) {
    console.error("[admin/ship] Shipping email failed:", emailErr);
    // Return success even if email fails — order is updated
  }

  return NextResponse.json({ ok: true, order: data });
}
