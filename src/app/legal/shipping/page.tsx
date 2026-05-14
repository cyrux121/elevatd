import { LegalPage, LSection } from "@/components/legal-page";

export const runtime = "edge";
export const metadata = { title: "Shipping Policy — Elevated Customs" };

export default function ShippingPage() {
  return (
    <LegalPage tag="LEGAL" title="Shipping Policy" updated="May 2026">
      <LSection title="Processing Time">
        <p>
          Orders are processed and shipped within <strong>up to 12 business days</strong>{" "}
          from the date of purchase. This window accounts for product sourcing and our
          quality inspection process before every shipment leaves our facility.
        </p>
        <p>
          Business days are Monday through Friday, excluding federal holidays. Orders
          placed on weekends or holidays begin processing the next business day.
        </p>
        <p>
          You will receive a shipping confirmation email with tracking information once
          your order has been dispatched.
        </p>
      </LSection>

      <LSection title="Carriers and Delivery">
        <p>
          We ship via <strong>USPS or UPS Ground</strong> depending on package size,
          weight, and destination. Carrier selection is at our discretion. Both carriers
          provide tracking for all shipments.
        </p>
        <p>
          Estimated transit time after shipment is typically 3–7 business days for
          continental US destinations, depending on distance from our New Jersey warehouse.
          Total delivery time from order date may be up to 12 business days processing
          plus transit time.
        </p>
      </LSection>

      <LSection title="Shipping Coverage">
        <p>
          We currently ship to the <strong>continental United States only</strong>. We do
          not ship to Alaska, Hawaii, US territories, APO/FPO addresses, or international
          destinations at this time.
        </p>
        <p>
          <strong>No PO Boxes.</strong> Orders require a physical street address for
          delivery. Orders shipped to PO Boxes may be delayed or returned.
        </p>
      </LSection>

      <LSection title="Shipping Costs">
        <p>
          Shipping rates are calculated and displayed at checkout based on order weight
          and destination. Free shipping is available on qualifying orders — the threshold
          is shown at checkout.
        </p>
      </LSection>

      <LSection title="Tracking Your Order">
        <p>
          Once your order ships, you'll receive an email with your tracking number and
          carrier. Use that number on the carrier's website (usps.com or ups.com) for
          real-time tracking updates.
        </p>
        <p>
          If you haven't received a shipping confirmation within 12 business days of
          your order date, email us at{" "}
          <a
            href="mailto:orders@[YOUR DOMAIN]"
            className="text-accent hover:underline"
          >
            orders@[YOUR DOMAIN]
          </a>{" "}
          with your order number.
        </p>
      </LSection>

      <LSection title="Lost or Damaged Packages">
        <p>
          If your package shows as delivered but you haven't received it, or if your
          order arrives damaged, contact us at{" "}
          <a
            href="mailto:orders@[YOUR DOMAIN]"
            className="text-accent hover:underline"
          >
            orders@[YOUR DOMAIN]
          </a>{" "}
          within <strong>7 days of the expected or actual delivery date</strong>. Include
          your order number and photos of any damage.
        </p>
        <p>
          We will work with the carrier to file a claim and resolve the issue. Claims
          submitted more than 7 days after the delivery date may not be eligible for
          carrier insurance coverage.
        </p>
      </LSection>

      <LSection title="Contact">
        <p>
          Shipping questions:{" "}
          <a
            href="mailto:orders@[YOUR DOMAIN]"
            className="text-accent hover:underline"
          >
            orders@[YOUR DOMAIN]
          </a>
          . We respond within 24 hours on business days.
        </p>
      </LSection>
    </LegalPage>
  );
}
