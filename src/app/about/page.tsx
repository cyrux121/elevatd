export const runtime = "edge";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <p className="reveal text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        About
      </p>
      <h1 className="reveal mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        Built in a garage. Run by truck guys.
      </h1>
      <div className="reveal mt-8 space-y-6 text-lg text-ink/80">
        <p>
          Elevated Customs was started by a college student and lifelong truck guy who
          got tired of watching the diesel community get overcharged for basic
          accessories.
        </p>
        <p>Built in New Jersey. Run from a garage. Backed by a real F-250 build.</p>
        <p>
          We carry the same lights the big brands sell — same brightness, same IP68
          waterproof housing, same controllers. We just don&apos;t charge a brand tax.
        </p>
      </div>
    </div>
  );
}
