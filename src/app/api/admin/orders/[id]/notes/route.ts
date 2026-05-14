import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";

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

  const { notes } = await req.json();
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("orders")
    .update({ internal_notes: notes ?? null })
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
