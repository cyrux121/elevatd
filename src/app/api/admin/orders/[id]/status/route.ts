import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";
import type { DbOrderStatus } from "@/lib/types";

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

  const { status } = await req.json();
  const validStatuses: DbOrderStatus[] = ["new", "shipped", "delivered"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const update: Record<string, unknown> = { order_status: status };
  if (status === "delivered") update.delivered_at = new Date().toISOString();

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("orders")
    .update(update)
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
