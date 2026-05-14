"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string | React.ReactNode };
type FaqGroup = { title: string; items: FaqItem[] };

export function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <div key={group.title}>
          <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            // {group.title}
          </h2>
          <div className="divide-y divide-ink-4 rounded-sm border border-ink-4">
            {group.items.map((item, i) => (
              <AccordionItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AccordionItem({ q, a }: FaqItem) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-ink-1">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[15px] font-medium text-fg-0">{q}</span>
        <span
          className={`mt-0.5 shrink-0 text-accent transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="border-t border-ink-4 px-6 pb-5 pt-4 text-[14px] leading-[1.7] text-fg-2">
          {a}
        </div>
      )}
    </div>
  );
}
