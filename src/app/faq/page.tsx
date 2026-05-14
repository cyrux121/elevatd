import Link from "next/link";
import { FaqAccordion } from "./_faq-accordion";

export const runtime = "edge";
export const metadata = { title: "FAQ — Elevated Customs" };

const FAQ_GROUPS = [
  {
    title: "Products",
    items: [
      {
        q: "Are these lights street legal?",
        a: "No. All Elevated Customs LED rock lights are designed and sold for off-road use only. They are not DOT-approved for use on public roads. Check your state and local laws before installing any aftermarket lighting.",
      },
      {
        q: "What's included in a 12-piece kit?",
        a: "Each 12-pack kit includes 12 LED rock light pods, mounting hardware (screws and brackets), wiring harnesses, and a controller depending on the SKU. Everything you need to install is in the box.",
      },
      {
        q: "Do I need a separate controller?",
        a: "It depends on the SKU. The 24 and 36 LED models use simple wiring that can be connected directly to any switched 12V accessory line — no controller required for basic on/off. The 108 and 219 LED models include multi-color Bluetooth controllers in the kit.",
      },
      {
        q: "What voltage do these run on?",
        a: "12V DC. They work with any modern truck, SUV, Jeep, or off-road vehicle with a standard 12V electrical system. No inverter or voltage converter needed.",
      },
      {
        q: "What's the warranty?",
        a: "1-year warranty against manufacturer defects. If a pod or component fails under normal use within one year of purchase, email us with your order number and photos and we'll replace it. See our Refund Policy for full details.",
      },
    ],
  },
  {
    title: "Installation",
    items: [
      {
        q: "Can I install these myself?",
        a: "Yes — if you're comfortable with basic automotive wiring. The install typically involves drilling mounting holes in your wheel wells or undercarriage, routing wire, and connecting to a switched 12V line. We include all hardware. If you've never done automotive wiring before, professional installation is recommended.",
      },
      {
        q: "Do I need to drill into my truck?",
        a: "Yes, typically. Rock lights mount in or around the wheel wells and undercarriage. You'll drill small mounting holes for the pods and route the wiring through to your cab. All mounting hardware is included. Specific drill bit sizes are noted in the included install guide.",
      },
      {
        q: "Will installing these void my vehicle warranty?",
        a: "Aftermarket modifications can potentially affect your vehicle manufacturer's warranty on related systems. Under the Magnuson-Moss Warranty Act, a dealer generally cannot void your warranty solely because you installed an aftermarket part — but they can deny warranty coverage if they can show the aftermarket part caused the specific problem. When in doubt, check with your dealer before installing.",
      },
    ],
  },
  {
    title: "Returns & Orders",
    items: [
      {
        q: "What's your return policy?",
        a: (
          <>
            30 days from the delivery date. Items must be in original, uninstalled
            condition. Full details in our{" "}
            <Link href="/legal/refunds" className="text-accent hover:underline">
              Refund Policy
            </Link>
            .
          </>
        ),
      },
      {
        q: "Can I return lights I've already installed?",
        a: "No. Once lights have been wired, mounted, or otherwise installed, they cannot be returned. This includes lights that have been powered on after mounting. If there's a defect, that's covered separately — email us with photos within 7 days of receipt.",
      },
    ],
  },
  {
    title: "Business",
    items: [
      {
        q: "Do you offer bulk or wholesale pricing?",
        a: (
          <>
            Yes. If you&apos;re a shop, installer, or buying in volume, email{" "}
            <a href="mailto:orders@[YOUR DOMAIN]" className="text-accent hover:underline">
              orders@[YOUR DOMAIN]
            </a>{" "}
            with what you&apos;re looking for and we&apos;ll work something out.
          </>
        ),
      },
      {
        q: "Will you be at any truck shows?",
        a: "Yes — DSLNY in September 2026 at Orange County Fair Speedway. Come find us and see the lights in person. More dates TBD.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-ink-4 py-20">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            // COMMON QUESTIONS
          </p>
          <h1 className="mt-3 font-display text-[clamp(48px,7vw,96px)] uppercase leading-[0.92] tracking-[-0.035em]">
            FAQ
          </h1>
        </div>
      </section>

      {/* Accordion */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <FaqAccordion groups={FAQ_GROUPS} />

          {/* Still have questions */}
          <div className="mt-12 rounded-sm border border-ink-4 bg-ink-1 px-6 py-6">
            <p className="font-display text-[18px] uppercase tracking-[-0.01em]">
              Still have a question?
            </p>
            <p className="mt-2 text-[14px] text-fg-2">
              Email us at{" "}
              <a href="mailto:orders@[YOUR DOMAIN]" className="text-accent hover:underline">
                orders@[YOUR DOMAIN]
              </a>{" "}
              — response within 24 hours on business days.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-accent transition-colors hover:text-accent-hover"
            >
              Go to Contact page
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
