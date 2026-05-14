"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";

export function ProductEditRow({ product }: { product: Product }) {
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price_single_cents: product.price_single_cents,
    price_kit_cents: product.price_kit_cents,
    active: product.active,
    image_url: product.image_url ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  function field(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
    };
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setMessage("Saved.");
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-sm border border-ink-4 bg-ink-1">
      {/* Header row */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-4">
          <span className="font-display text-[16px] uppercase tracking-[-0.01em]">
            {product.name}
          </span>
          <span className="font-mono text-[11px] text-fg-3">{product.sku}</span>
          <span
            className={`rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] ${
              product.active
                ? "border-stock-ok/30 bg-stock-ok/10 text-stock-ok"
                : "border-fg-3/30 bg-fg-3/10 text-fg-3"
            }`}
          >
            {product.active ? "Active" : "Inactive"}
          </span>
        </div>
        <span className="font-mono text-[11px] text-fg-3">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="border-t border-ink-4 px-5 pb-5 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label-admin">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={field("name")}
                className="admin-input"
              />
            </div>
            <div>
              <label className="label-admin">Image URL</label>
              <input
                type="text"
                value={form.image_url}
                onChange={field("image_url")}
                className="admin-input font-mono text-[12px]"
                placeholder="/images/filename.jpg"
              />
            </div>
            <div>
              <label className="label-admin">Single Price (cents)</label>
              <input
                type="number"
                value={form.price_single_cents}
                onChange={field("price_single_cents")}
                className="admin-input font-mono"
              />
            </div>
            <div>
              <label className="label-admin">Kit Price (cents)</label>
              <input
                type="number"
                value={form.price_kit_cents}
                onChange={field("price_kit_cents")}
                className="admin-input font-mono"
              />
            </div>
            <div className="md:col-span-2">
              <label className="label-admin">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={field("description")}
                className="admin-input resize-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id={`active-${product.id}`}
                checked={form.active}
                onChange={field("active")}
                className="h-4 w-4 accent-accent"
              />
              <label
                htmlFor={`active-${product.id}`}
                className="text-[14px] text-fg-1"
              >
                Active (visible in shop)
              </label>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-sm bg-accent px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-accent-fg transition-colors hover:bg-accent-hover disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
            {message && (
              <span className="font-mono text-[12px] text-fg-2">{message}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
