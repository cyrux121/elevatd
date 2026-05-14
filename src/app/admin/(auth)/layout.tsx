import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";

export const runtime = "edge";

const NAV_TABS = [
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/inventory", label: "Inventory" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/analytics", label: "Analytics" },
];

export default async function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/admin/login");
  if (session.user.email !== env.ADMIN_EMAIL) redirect("/");

  return (
    <div className="min-h-screen bg-ink-0">
      {/* Top bar */}
      <header className="border-b border-ink-4 bg-ink-1">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-3">
          <span className="font-display text-[14px] uppercase tracking-[-0.01em]">
            Elevated Customs{" "}
            <span className="font-mono text-[11px] text-fg-3">/ Admin</span>
          </span>
          <form action="/api/admin/signout" method="POST">
            <button
              type="submit"
              className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3 transition-colors hover:text-fg-1"
            >
              Sign out
            </button>
          </form>
        </div>
        {/* Tab nav */}
        <div className="mx-auto flex max-w-[1600px] gap-6 px-6">
          {NAV_TABS.map((tab) => (
            <AdminNavLink key={tab.href} href={tab.href} label={tab.label} />
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 py-8">{children}</main>
    </div>
  );
}

function AdminNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="border-b-2 border-transparent py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-2 transition-colors hover:border-accent hover:text-fg-0"
    >
      {label}
    </Link>
  );
}
