import type { ReactNode } from "react";

export function LegalPage({
  tag,
  title,
  updated,
  children,
}: {
  tag: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="border-b border-ink-4 py-16">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            // {tag}
          </p>
          <h1 className="mt-3 font-display text-[clamp(36px,5vw,72px)] uppercase leading-[0.92] tracking-[-0.03em]">
            {title}
          </h1>
          <p className="mt-4 font-mono text-[11px] text-fg-3">
            Last updated: {updated}
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <div className="prose-legal">{children}</div>
        </div>
      </section>
    </>
  );
}

export function LSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="mb-4 font-display text-[20px] uppercase tracking-[-0.01em] text-fg-0">
        {title}
      </h2>
      <div className="space-y-3 text-[15px] leading-[1.7] text-fg-1">{children}</div>
    </div>
  );
}
