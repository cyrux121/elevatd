"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DbOrder, DbOrderStatus } from "@/lib/types";

const STATUS_LABELS: Record<DbOrderStatus, string> = {
  new: "New",
  shipped: "Shipped",
  delivered: "Delivered",
};

const STATUS_COLORS: Record<DbOrderStatus, string> = {
  new: "text-accent border-accent/30 bg-accent/10",
  shipped: "text-stock-ok border-stock-ok/30 bg-stock-ok/10",
  delivered: "text-fg-2 border-fg-3/30 bg-fg-3/10",
};

export function OrderActions({ order }: { order: DbOrder }) {
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState(order.tracking_number ?? "");
  const [carrier, setCarrier] = useState(order.carrier ?? "USPS");
  const [notes, setNotes] = useState(order.internal_notes ?? "");
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function apiCall(endpoint: string, body: Record<string, unknown>) {
    const res = await fetch(`/api/admin/orders/${order.id}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Request failed");
    return data;
  }

  async function handleMarkShipped() {
    if (!trackingNumber.trim()) {
      setMessage("Enter a tracking number first.");
      return;
    }
    setLoading("ship");
    setMessage("");
    try {
      await apiCall("ship", { trackingNumber, carrier });
      setMessage("Marked as shipped. Shipping email sent.");
      router.refresh();
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(null);
    }
  }

  async function handleMarkDelivered() {
    setLoading("deliver");
    setMessage("");
    try {
      await apiCall("status", { status: "delivered" });
      setMessage("Marked as delivered.");
      router.refresh();
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(null);
    }
  }

  async function handleSaveNotes() {
    setLoading("notes");
    setMessage("");
    try {
      await apiCall("notes", { notes });
      setMessage("Notes saved.");
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-4">
      {/* Status */}
      <section className="rounded-sm border border-ink-4 bg-ink-1 p-5">
        <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">
          Status
        </h2>
        <span
          className={`rounded-sm border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.06em] ${STATUS_COLORS[order.order_status]}`}
        >
          {STATUS_LABELS[order.order_status]}
        </span>
        {order.shipped_at && (
          <p className="mt-2 font-mono text-[11px] text-fg-3">
            Shipped: {new Date(order.shipped_at).toLocaleDateString()}
          </p>
        )}
        {order.delivered_at && (
          <p className="mt-1 font-mono text-[11px] text-fg-3">
            Delivered: {new Date(order.delivered_at).toLocaleDateString()}
          </p>
        )}
      </section>

      {/* Ship form */}
      {order.order_status !== "delivered" && (
        <section className="rounded-sm border border-ink-4 bg-ink-1 p-5">
          <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">
            Fulfillment
          </h2>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3">
                Carrier
              </label>
              <select
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="w-full rounded-sm border border-ink-4 bg-ink-2 px-3 py-2 text-[13px] text-fg-0 focus:border-accent focus:outline-none"
              >
                <option value="USPS">USPS</option>
                <option value="UPS">UPS</option>
                <option value="FedEx">FedEx</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3">
                Tracking Number
              </label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
                className="w-full rounded-sm border border-ink-4 bg-ink-2 px-3 py-2 font-mono text-[13px] text-fg-0 placeholder:text-fg-3 focus:border-accent focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleMarkShipped}
                disabled={loading !== null || order.order_status === "shipped"}
                className="flex-1 rounded-sm bg-accent py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading === "ship" ? "Saving…" : "Mark Shipped + Send Email"}
              </button>
              {order.order_status === "shipped" && (
                <button
                  onClick={handleMarkDelivered}
                  disabled={loading !== null}
                  className="flex-1 rounded-sm border border-stock-ok py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-stock-ok transition-colors hover:bg-stock-ok/10 disabled:opacity-50"
                >
                  {loading === "deliver" ? "Saving…" : "Mark Delivered"}
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Internal notes */}
      <section className="rounded-sm border border-ink-4 bg-ink-1 p-5">
        <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">
          Internal Notes
        </h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Notes visible only to you…"
          className="w-full resize-none rounded-sm border border-ink-4 bg-ink-2 px-3 py-2 text-[13px] text-fg-1 placeholder:text-fg-3 focus:border-accent focus:outline-none"
        />
        <button
          onClick={handleSaveNotes}
          disabled={loading !== null}
          className="mt-2 rounded-sm border border-ink-4 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-fg-2 transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
        >
          {loading === "notes" ? "Saving…" : "Save Notes"}
        </button>
      </section>

      {message && (
        <p className="rounded-sm border border-ink-4 bg-ink-1 px-4 py-3 font-mono text-[12px] text-fg-1">
          {message}
        </p>
      )}
    </div>
  );
}
