// Centralized env access. Throws a clear error if a required server var is missing.

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing env var ${name}. Copy .env.example to .env.local and fill it in.`
    );
  }
  return value;
}

export const env = {
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? "jacobholicki@gmail.com",
  STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
};

export const serverEnv = {
  get SUPABASE_SERVICE_ROLE_KEY() {
    return required("SUPABASE_SERVICE_ROLE_KEY", process.env.SUPABASE_SERVICE_ROLE_KEY);
  },
  get STRIPE_SECRET_KEY() {
    return required("STRIPE_SECRET_KEY", process.env.STRIPE_SECRET_KEY);
  },
  get STRIPE_WEBHOOK_SECRET() {
    return required("STRIPE_WEBHOOK_SECRET", process.env.STRIPE_WEBHOOK_SECRET);
  },
  get RESEND_API_KEY() {
    return required("RESEND_API_KEY", process.env.RESEND_API_KEY);
  },
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL ?? "orders@elevatedcustoms.com",
};

export const isSupabaseConfigured =
  !!env.SUPABASE_URL && !!env.SUPABASE_ANON_KEY;
