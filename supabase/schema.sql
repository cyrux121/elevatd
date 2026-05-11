-- Elevated Customs — Supabase schema
-- Run this in the Supabase SQL editor (or `psql`) once.

create extension if not exists "uuid-ossp";

-- ─── products ──────────────────────────────────────────────────────────
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  sku text not null unique,
  slug text not null unique,
  name text not null,
  description text not null default '',
  led_count int not null,
  price_single_cents int not null,
  price_kit_cents int not null,
  inventory_count int not null default 0,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_led_count_idx on public.products(led_count);
create index if not exists products_active_idx on public.products(active);

-- ─── orders ────────────────────────────────────────────────────────────
create type order_status as enum ('pending', 'paid', 'fulfilled', 'cancelled', 'refunded');

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  stripe_session_id text unique,
  stripe_payment_intent text,
  customer_email text not null,
  customer_name text,
  shipping_address jsonb,
  subtotal_cents int not null,
  shipping_cents int not null,
  total_cents int not null,
  status order_status not null default 'pending',
  created_at timestamptz not null default now()
);

create index if not exists orders_created_idx on public.orders(created_at desc);
create index if not exists orders_status_idx on public.orders(status);

-- ─── order_items ───────────────────────────────────────────────────────
create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  sku text not null,
  name text not null,
  variant text not null check (variant in ('single', 'kit')),
  unit_price_cents int not null,
  quantity int not null,
  units_sold int not null
);

create index if not exists order_items_order_idx on public.order_items(order_id);

-- ─── RLS ───────────────────────────────────────────────────────────────
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Public can read active products (anon + authenticated)
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products
  for select using (active = true);

-- Orders + order_items are private. Server uses the service role key to bypass
-- RLS for writes; admin reads happen through the service role client too.
-- No anon policies needed.

-- ─── updated_at trigger ────────────────────────────────────────────────
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.tg_set_updated_at();

-- ─── Storage bucket for product images ─────────────────────────────────
-- Run this once via the Supabase dashboard or:
--   insert into storage.buckets (id, name, public)
--   values ('product-images', 'product-images', true)
--   on conflict (id) do nothing;
