"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartLine, Variant } from "@/lib/types";

type CartState = {
  lines: CartLine[];
  hydrated: boolean;
  setHydrated: () => void;
  addLine: (line: CartLine) => void;
  removeLine: (productId: string, variant: Variant) => void;
  setQuantity: (productId: string, variant: Variant, qty: number) => void;
  clear: () => void;
  subtotalCents: () => number;
};

const sameLine = (a: CartLine, productId: string, variant: Variant) =>
  a.productId === productId && a.variant === variant;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      addLine: (line) =>
        set((state) => {
          const idx = state.lines.findIndex((l) =>
            sameLine(l, line.productId, line.variant)
          );
          if (idx >= 0) {
            const next = [...state.lines];
            next[idx] = {
              ...next[idx],
              quantity: next[idx].quantity + line.quantity,
            };
            return { lines: next };
          }
          return { lines: [...state.lines, line] };
        }),
      removeLine: (productId, variant) =>
        set((state) => ({
          lines: state.lines.filter((l) => !sameLine(l, productId, variant)),
        })),
      setQuantity: (productId, variant, qty) =>
        set((state) => ({
          lines: state.lines
            .map((l) =>
              sameLine(l, productId, variant)
                ? { ...l, quantity: Math.max(0, qty) }
                : l
            )
            .filter((l) => l.quantity > 0),
        })),
      clear: () => set({ lines: [] }),
      subtotalCents: () =>
        get().lines.reduce((sum, l) => sum + l.unitPriceCents * l.quantity, 0),
    }),
    {
      name: "ec-cart-v1",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
      partialize: (state) => ({ lines: state.lines }),
    }
  )
);
