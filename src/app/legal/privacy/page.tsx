import { LegalPage, LSection } from "@/components/legal-page";

export const runtime = "edge";
export const metadata = { title: "Privacy Policy — Elevated Customs" };

export default function PrivacyPage() {
  return (
    <LegalPage tag="LEGAL" title="Privacy Policy" updated="May 2026">
      <LSection title="1. Overview">
        <p>
          Elevated Customs ("we," "us," "our") respects your privacy. This policy
          explains what information we collect, how we use it, and who we share it with
          when you visit our site or place an order.
        </p>
        <p>
          We collect the minimum data needed to fulfill orders and provide support.
          We do not sell your personal information.
        </p>
      </LSection>

      <LSection title="2. Information We Collect">
        <p>
          <strong>When you place an order:</strong> We collect your name, email address,
          shipping address, and order details. Payment is processed by{" "}
          <strong>Stripe</strong> — we never see, store, or have access to your full
          credit card number, CVV, or billing details beyond what Stripe provides us
          (last 4 digits, card brand, expiry).
        </p>
        <p>
          <strong>When you contact us:</strong> We collect the information you provide
          (name, email, message content).
        </p>
        <p>
          <strong>Automatically:</strong> Our hosting provider (Cloudflare) may collect
          standard server log information including IP addresses, browser type, and pages
          visited. We use this only for security and performance monitoring.
        </p>
      </LSection>

      <LSection title="3. How We Use Your Information">
        <p>We use your information to:</p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Process and fulfill your order</li>
          <li>Send order confirmation and shipping notification emails</li>
          <li>Respond to support inquiries</li>
          <li>Send occasional marketing emails (you can opt out at any time)</li>
          <li>Comply with legal obligations (tax records, dispute resolution)</li>
        </ul>
        <p>
          We will never use your email to send spam or sell it to third parties.
          Marketing emails will always include an unsubscribe option.
        </p>
      </LSection>

      <LSection title="4. Third Parties We Share Data With">
        <p>
          We work with the following service providers who may process your data as
          necessary to operate our business:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Stripe</strong> — Payment processing. Stripe collects and handles
            all payment data under their own{" "}
            <a
              href="https://stripe.com/privacy"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Resend</strong> — Transactional email (order confirmations, shipping
            notifications). Receives your email address and name for delivery purposes.
          </li>
          <li>
            <strong>Supabase</strong> — Database hosting for order records. Data is
            stored in US-based servers.
          </li>
          <li>
            <strong>Cloudflare</strong> — Website hosting and edge delivery. May process
            IP addresses and request metadata for security.
          </li>
        </ul>
        <p>
          We do not share your data with any other third parties for marketing,
          advertising, or data brokering purposes.
        </p>
      </LSection>

      <LSection title="5. Cookies">
        <p>
          We use only essential cookies required to operate the site (session management,
          cart state). We do not use tracking cookies, analytics cookies, or advertising
          pixels. No third-party advertising networks have access to your browsing data
          on our site.
        </p>
      </LSection>

      <LSection title="6. Your Rights">
        <p>
          You have the right to request access to, correction of, or deletion of the
          personal information we hold about you. To make a request, email us at{" "}
          <a
            href="mailto:orders@[YOUR DOMAIN]"
            className="text-accent hover:underline"
          >
            orders@[YOUR DOMAIN]
          </a>
          . We will respond within 30 days.
        </p>
        <p>
          You may also opt out of marketing emails at any time using the unsubscribe
          link in any email we send.
        </p>
      </LSection>

      <LSection title="7. Data Retention">
        <p>
          Order data (name, email, shipping address, purchase history) is retained for
          a minimum of <strong>7 years</strong> to comply with IRS and state tax
          record-keeping requirements. After that period, data is deleted or anonymized.
        </p>
        <p>
          Contact and support inquiries are retained for up to 2 years or until your
          request for deletion, whichever comes first.
        </p>
      </LSection>

      <LSection title="8. Security">
        <p>
          We use industry-standard security practices including HTTPS encryption, access
          controls, and secure third-party processors. No method of transmission over
          the internet is 100% secure, but we take reasonable precautions to protect
          your information.
        </p>
      </LSection>

      <LSection title="9. Contact">
        <p>
          Privacy questions or data requests:{" "}
          <a
            href="mailto:orders@[YOUR DOMAIN]"
            className="text-accent hover:underline"
          >
            orders@[YOUR DOMAIN]
          </a>
          {" "}or{" "}
          <a href="/contact" className="text-accent hover:underline">
            Contact page
          </a>
          . We're a small business — you'll get a real reply.
        </p>
      </LSection>
    </LegalPage>
  );
}
