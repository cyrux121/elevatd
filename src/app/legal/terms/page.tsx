import { LegalPage, LSection } from "@/components/legal-page";

export const runtime = "edge";
export const metadata = { title: "Terms of Service — Elevated Customs" };

export default function TermsPage() {
  return (
    <LegalPage tag="LEGAL" title="Terms of Service" updated="May 2026">
      <LSection title="1. Acceptance of Terms">
        <p>
          By accessing or purchasing from Elevated Customs ("we," "us," "our") at{" "}
          <strong>elevatd-3s4.pages.dev</strong> (or any future domain), you agree to be
          bound by these Terms of Service. If you do not agree, please do not use this site
          or place an order.
        </p>
        <p>
          We reserve the right to update these terms at any time. Changes take effect
          immediately upon posting. Continued use of the site after changes constitutes
          acceptance.
        </p>
      </LSection>

      <LSection title="2. Products and Descriptions">
        <p>
          We do our best to accurately describe all products, including specifications,
          compatibility, and included components. LED counts, lumen output, and color
          options are listed per product page. Minor variations in color rendering between
          screens and actual product are not considered defects.
        </p>
        <p>
          All LED rock lights sold by Elevated Customs are intended for <strong>off-road
          and off-highway use only</strong>. They are <strong>not DOT-approved for
          on-road use</strong> and should not be operated on public roads where prohibited
          by law. Compliance with all applicable federal, state, and local laws is solely
          the responsibility of the purchaser.
        </p>
      </LSection>

      <LSection title="3. Pricing and Payment">
        <p>
          All prices are listed in US dollars. We reserve the right to change pricing at
          any time without notice. The price in effect at the time of your order is the
          price you pay.
        </p>
        <p>
          Payment is processed securely through <strong>Stripe</strong>. We never see,
          store, or have access to your full credit card number. By placing an order, you
          authorize us to charge the total amount (including applicable taxes and shipping)
          to your selected payment method.
        </p>
        <p>
          We accept all major credit/debit cards, Apple Pay, and Google Pay. Orders are
          confirmed only after successful payment authorization.
        </p>
      </LSection>

      <LSection title="4. Shipping">
        <p>
          We ship to the continental United States only. Shipping timelines, carriers,
          and policies are detailed in our{" "}
          <a href="/legal/shipping" className="text-accent hover:underline">
            Shipping Policy
          </a>
          . Elevated Customs is not liable for delays caused by carriers, weather, or
          circumstances outside our control once a shipment has been handed to the carrier.
        </p>
      </LSection>

      <LSection title="5. Returns and Refunds">
        <p>
          Our return and refund terms are detailed in our{" "}
          <a href="/legal/refunds" className="text-accent hover:underline">
            Refund Policy
          </a>
          . By placing an order, you acknowledge and accept those terms.
        </p>
      </LSection>

      <LSection title="6. Warranty and Installation Disclaimer">
        <p>
          LED rock lights are sold for <strong>off-road use only</strong>. Installation
          involves drilling, routing wires, and connecting to your vehicle's electrical
          system. <strong>Customer assumes all risk</strong> associated with installation
          and use. We strongly recommend professional installation if you are not
          comfortable with basic automotive electrical work.
        </p>
        <p>
          Elevated Customs is not responsible for damage to your vehicle resulting from
          improper installation, water intrusion caused by improper mounting, electrical
          shorts, or any use of the product inconsistent with the provided instructions.
        </p>
        <p>
          Products are warranted against manufacturer defects as described in our{" "}
          <a href="/legal/refunds" className="text-accent hover:underline">
            Refund Policy
          </a>
          . This warranty does not cover physical damage, improper installation, water
          damage due to improper sealing, or normal wear and tear.
        </p>
      </LSection>

      <LSection title="7. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Elevated Customs and its owners,
          employees, and affiliates shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages, including but not limited to lost
          profits, property damage, or personal injury arising from the use or inability
          to use our products or website.
        </p>
        <p>
          Our total liability for any claim arising out of or relating to these Terms or
          any product purchase shall not exceed the amount you paid for the product giving
          rise to the claim.
        </p>
      </LSection>

      <LSection title="8. Intellectual Property">
        <p>
          All content on this site — including text, images, logos, and design — is the
          property of Elevated Customs or its content suppliers and is protected by
          applicable copyright and trademark law. You may not reproduce, distribute, or
          create derivative works without our express written permission.
        </p>
      </LSection>

      <LSection title="9. Governing Law">
        <p>
          These Terms are governed by the laws of the State of New Jersey, without
          regard to its conflict of law provisions. Any disputes shall be resolved in the
          state or federal courts located in New Jersey, and you consent to personal
          jurisdiction in those courts.
        </p>
      </LSection>

      <LSection title="10. Contact">
        <p>
          Questions about these Terms? Email us at{" "}
          <a
            href="mailto:orders@[YOUR DOMAIN]"
            className="text-accent hover:underline"
          >
            orders@[YOUR DOMAIN]
          </a>{" "}
          or visit our{" "}
          <a href="/contact" className="text-accent hover:underline">
            Contact page
          </a>
          .
        </p>
      </LSection>
    </LegalPage>
  );
}
