"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";

export function InventoryRow({ product }: { product: Product }) {
  const [count, setCount] = useState(product.inventory_count);
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState(String(product.inventory_count));
  const [saving, setSaving] = useState(false);

  const isLow = count < 10;

  async function saveCount(newCount: number) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/inventory/${product.sku}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: newCount }),
      });
      if (!res.ok) throw new Error("Failed");
      setCount(newCount);
    } catch {
      // Revert on failure
      setInputVal(String(count));
    } finally {
      setSaving(false);
      setEditing(false);
    }
  }

  function handleBlur() {
    const parsed = parseInt(inputVal, 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed !== count) {
      saveCount(parsed);
    } else {
      setInputVal(String(count));
      setEditing(false);
    }
  }

  return (
    <tr className="border-b border-ink-4 last:border-0">
      <td className="px-4 py-3 font-mono text-[12px] text-fg-2">{product.sku}</td>
      <td className="px-4 py-3 text-[14px] text-fg-1">{product.name}</td>
      <td className="px-4 py-3">
        <span
          className={`font-mono text-[18px] font-bold tabular-nums ${
            isLow ? "text-stock-low" : "text-stock-ok"
          }`}
        >
          {count}
        </span>
        {isLow && (
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.06em] text-stock-low">
            Low
          </span>
        )}
      </td>
      <td className="px-4 py-3">
        {editing ? (
          <input
            type="number"
            min="0"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              if (e.key === "Escape") {
                setInputVal(String(count));
                setEditing(false);
              }
            }}
            autoFocus
            className="w-24 rounded-sm border border-accent bg-ink-2 px-2 py-1 font-mono text-[13px] text-fg-0 focus:outline-none"
          />
        ) : (
          <button
            onClick={() => setEditing(true)}
            disabled={saving}
            className="rounded-sm border border-ink-4 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-fg-3 transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
          >
            {saving ? "Saving…" : "Edit"}
          </button>
        )}
      </td>
    </tr>
  );
}
