import { LegalPage, LSection } from "@/components/legal-page";

export const runtime = "edge";
export const metadata = { title: "Refund Policy — Elevated Customs" };

export default function RefundsPage() {
  return (
    <LegalPage tag="LEGAL" title="Refund Policy" updated="May 2026">
      <LSection title="30-Day Returns">
        <p>
          We accept returns within <strong>30 days of the delivery date</strong>. To be
          eligible, items must be in their original, uninstalled condition — unused,
          uncut wiring, undrilled mounting points, and in original packaging where
          possible.
        </p>
        <p>
          <strong>No refunds on installed products.</strong> Once lights have been wired
          into your vehicle, mounted with hardware, or otherwise modified, they cannot
          be returned. This includes lights that have been powered on after drilling or
          mounting, even if there are no obvious defects.
        </p>
        <p>
          Customer is responsible for return shipping costs unless the item is defective
          (see below). We recommend using a tracked shipping service — we are not
          responsible for returns lost in transit.
        </p>
      </LSection>

      <LSection title="Refund Process">
        <p>
          Once we receive and inspect your return, we'll process your refund within{" "}
          <strong>5–10 business days</strong>. Refunds are issued to the original
          payment method used at checkout (credit/debit card, Apple Pay, Google Pay).
        </p>
        <p>
          You'll receive a confirmation email once the refund has been issued. Depending
          on your bank or card issuer, it may take an additional 3–5 business days for
          the funds to appear in your account.
        </p>
      </LSection>

      <LSection title="Defective Products">
        <p>
          If your product arrives defective or damaged, email us at{" "}
          <a
            href="mailto:orders@[YOUR DOMAIN]"
            className="text-accent hover:underline"
          >
            orders@[YOUR DOMAIN]
          </a>{" "}
          within <strong>7 days of receipt</strong> with:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Your order number</li>
          <li>A description of the defect</li>
          <li>Clear photos showing the issue</li>
        </ul>
        <p>
          We'll either replace the defective unit at no charge or issue a full refund —
          your choice. We cover return shipping for confirmed defective items.
        </p>
        <p>
          Defect claims submitted more than 7 days after receipt may still be evaluated
          under our warranty policy, but are not guaranteed a full refund.
        </p>
      </LSection>

      <LSection title="Order Cancellations">
        <p>
          Orders can be cancelled for a full refund if cancelled <strong>before
          shipment</strong>. Email us immediately at{" "}
          <a
            href="mailto:orders@[YOUR DOMAIN]"
            className="text-accent hover:underline"
          >
            orders@[YOUR DOMAIN]
          </a>{" "}
          with your order number and "CANCEL" in the subject line.
        </p>
        <p>
          Once an order has shipped, cancellation is no longer possible. You'll need to
          use the standard return process after delivery.
        </p>
      </LSection>

      <LSection title="Non-Returnable Items">
        <ul className="ml-5 list-disc space-y-1">
          <li>Installed or wired products (any product that has been mounted or connected)</li>
          <li>Items returned more than 30 days after delivery</li>
          <li>Items damaged by improper installation, misuse, or external causes</li>
        </ul>
      </LSection>

      <LSection title="Contact">
        <p>
          To start a return or ask a question about your order:{" "}
          <a
            href="mailto:orders@[YOUR DOMAIN]"
            className="text-accent hover:underline"
          >
            orders@[YOUR DOMAIN]
          </a>
          . Response within 24 hours on business days (Mon–Fri).
        </p>
      </LSection>
    </LegalPage>
  );
}
