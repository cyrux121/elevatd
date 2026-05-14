import type { DbOrder, DbOrderLineItem, ShippingAddress } from "@/lib/types";

// TODO: once a custom domain is verified in Resend, replace with:
// "Elevated Customs <orders@elevatedcustoms.com>"
const FROM = "Elevated Customs <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "jacobholicki@gmail.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://elevatd-3s4.pages.dev";

function fmt(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

function fmtAddress(addr: ShippingAddress | null): string {
  if (!addr) return "—";
  const parts = [addr.line1, addr.line2, addr.city, addr.state, addr.postal_code]
    .filter(Boolean)
    .join(", ");
  return parts || "—";
}

function trackingUrl(carrier: string, trackingNumber: string): string {
  switch (carrier) {
    case "USPS":
      return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;
    case "UPS":
      return `https://www.ups.com/track?tracknum=${trackingNumber}`;
    case "FedEx":
      return `https://www.fedex.com/fedextrack/?tracknumbers=${trackingNumber}`;
    default:
      return "";
  }
}

function lineItemsRows(items: DbOrderLineItem[]): string {
  return items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #2a2d35;font-size:14px;color:#c8cbd1;">
          ${item.name}
          ${item.quantity > 1 ? `<span style="color:#8a8f99;font-size:12px;"> × ${item.quantity}</span>` : ""}
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #2a2d35;font-size:14px;color:#f6f7f9;text-align:right;font-family:monospace;">
          ${fmt(item.total_cents)}
        </td>
      </tr>`
    )
    .join("");
}

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Elevated Customs</title>
</head>
<body style="margin:0;padding:0;background-color:#06070a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#f6f7f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#06070a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
          <!-- Wordmark -->
          <tr>
            <td style="padding-bottom:32px;">
              <span style="font-size:18px;font-weight:900;letter-spacing:0.12em;color:#f6f7f9;text-transform:uppercase;">
                ELEVATED CUSTOMS
              </span>
            </td>
          </tr>
          ${content}
          <!-- Footer -->
          <tr>
            <td style="padding-top:40px;border-top:1px solid #2a2d35;">
              <p style="margin:0;font-size:12px;color:#5d626b;line-height:1.6;">
                Elevated Customs · Ships from New Jersey<br>
                Questions? Reply to this email or contact us at <a href="mailto:${ADMIN_EMAIL}" style="color:#3a8dff;">${ADMIN_EMAIL}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function orderConfirmationHtml(order: DbOrder): string {
  const shipping = order.shipping_cents === 0 ? "Free" : fmt(order.shipping_cents);
  return emailWrapper(`
    <!-- Hero -->
    <tr>
      <td style="background:#0c0d11;border:1px solid #2a2d35;padding:32px;margin-bottom:24px;">
        <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#3a8dff;font-family:monospace;">
          // ORDER CONFIRMED
        </p>
        <h1 style="margin:0;font-size:36px;font-weight:900;color:#f6f7f9;letter-spacing:-0.02em;">
          Order #${order.order_number}
        </h1>
      </td>
    </tr>
    <tr><td style="height:16px;"></td></tr>
    <!-- Items -->
    <tr>
      <td style="background:#0c0d11;border:1px solid #2a2d35;padding:24px 32px;">
        <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#8a8f99;font-family:monospace;">
          Items Ordered
        </p>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${lineItemsRows(order.line_items)}
          <tr>
            <td style="padding:12px 0;font-size:13px;color:#8a8f99;">Subtotal</td>
            <td style="padding:12px 0;font-size:13px;color:#c8cbd1;text-align:right;font-family:monospace;">${fmt(order.subtotal_cents)}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;font-size:13px;color:#8a8f99;">Shipping</td>
            <td style="padding:4px 0;font-size:13px;color:#c8cbd1;text-align:right;font-family:monospace;">${shipping}</td>
          </tr>
          <tr>
            <td style="padding:16px 0 0;border-top:1px solid #2a2d35;font-size:14px;font-weight:700;color:#f6f7f9;">Total</td>
            <td style="padding:16px 0 0;border-top:1px solid #2a2d35;font-size:20px;font-weight:900;color:#3a8dff;text-align:right;font-family:monospace;">${fmt(order.total_cents)}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr><td style="height:16px;"></td></tr>
    <!-- Shipping Address -->
    <tr>
      <td style="background:#0c0d11;border:1px solid #2a2d35;padding:24px 32px;">
        <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#8a8f99;font-family:monospace;">
          Shipping To
        </p>
        <p style="margin:0;font-size:14px;color:#c8cbd1;line-height:1.6;">
          ${order.customer_name ?? ""}<br>
          ${fmtAddress(order.shipping_address)}
        </p>
      </td>
    </tr>
    <tr><td style="height:16px;"></td></tr>
    <!-- Timeline -->
    <tr>
      <td style="background:#0c0d11;border:1px solid #2a2d35;padding:24px 32px;">
        <p style="margin:0;font-size:14px;color:#c8cbd1;line-height:1.65;">
          We'll email you when your order ships. Lights leave our New Jersey warehouse next business day. Delivery typically 1–3 business days.
        </p>
      </td>
    </tr>
  `);
}

function adminOrderAlertHtml(order: DbOrder): string {
  return emailWrapper(`
    <tr>
      <td style="background:#0c0d11;border:1px solid #3a8dff;padding:32px;margin-bottom:24px;">
        <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#3a8dff;font-family:monospace;">
          // NEW ORDER
        </p>
        <h1 style="margin:0;font-size:36px;font-weight:900;color:#f6f7f9;letter-spacing:-0.02em;">
          #${order.order_number} — ${fmt(order.total_cents)}
        </h1>
      </td>
    </tr>
    <tr><td style="height:16px;"></td></tr>
    <tr>
      <td style="background:#0c0d11;border:1px solid #2a2d35;padding:24px 32px;">
        <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#8a8f99;font-family:monospace;">Customer</p>
        <p style="margin:0 0 16px;font-size:15px;color:#f6f7f9;">${order.customer_name ?? "—"} &lt;${order.customer_email ?? "—"}&gt;</p>
        <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#8a8f99;font-family:monospace;">Ship To</p>
        <p style="margin:0 0 16px;font-size:14px;color:#c8cbd1;">${fmtAddress(order.shipping_address)}</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;border-top:1px solid #2a2d35;padding-top:16px;">
          ${lineItemsRows(order.line_items)}
        </table>
      </td>
    </tr>
    <tr><td style="height:24px;"></td></tr>
    <tr>
      <td align="center">
        <a href="${SITE_URL}/admin/orders/${order.id}"
           style="display:inline-block;background:#3a8dff;color:#06080d;font-weight:700;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;padding:14px 32px;">
          FULFILL IN ADMIN →
        </a>
      </td>
    </tr>
  `);
}

function shippingNotificationHtml(order: DbOrder): string {
  const carrier = order.carrier ?? "";
  const trackingNum = order.tracking_number ?? "";
  const tUrl = trackingUrl(carrier, trackingNum);

  return emailWrapper(`
    <tr>
      <td style="background:#0c0d11;border:1px solid #2a2d35;padding:32px;">
        <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#3a8dff;font-family:monospace;">
          // IT'S ON THE WAY
        </p>
        <h1 style="margin:0;font-size:36px;font-weight:900;color:#f6f7f9;letter-spacing:-0.02em;">
          Order #${order.order_number} Shipped
        </h1>
      </td>
    </tr>
    <tr><td style="height:16px;"></td></tr>
    <tr>
      <td style="background:#0c0d11;border:1px solid #2a2d35;padding:24px 32px;">
        <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#8a8f99;font-family:monospace;">Carrier</p>
        <p style="margin:0 0 16px;font-size:15px;color:#f6f7f9;">${carrier}</p>
        <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#8a8f99;font-family:monospace;">Tracking Number</p>
        <p style="margin:0 0 16px;font-size:15px;color:#f6f7f9;font-family:monospace;">${trackingNum}</p>
        ${
          tUrl
            ? `<a href="${tUrl}" style="display:inline-block;background:#3a8dff;color:#06080d;font-weight:700;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;padding:12px 28px;">
                TRACK PACKAGE →
              </a>`
            : ""
        }
      </td>
    </tr>
    <tr><td style="height:16px;"></td></tr>
    <tr>
      <td style="background:#0c0d11;border:1px solid #2a2d35;padding:24px 32px;">
        <p style="margin:0 0 12px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#8a8f99;font-family:monospace;">Items Shipped</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${lineItemsRows(order.line_items)}
        </table>
      </td>
    </tr>
    <tr><td style="height:16px;"></td></tr>
    <tr>
      <td style="background:#0c0d11;border:1px solid #2a2d35;padding:20px 32px;">
        <p style="margin:0;font-size:13px;color:#8a8f99;line-height:1.6;">
          Estimated delivery: 1–7 business days depending on location. If you have any issues, reply to this email.
        </p>
      </td>
    </tr>
  `);
}

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[email] RESEND_API_KEY not set — skipping send");
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend ${res.status}: ${body}`);
  }
}

export async function sendOrderConfirmation(order: DbOrder): Promise<void> {
  if (!order.customer_email) return;
  await sendEmail(
    order.customer_email,
    `Order #${order.order_number} confirmed — Elevated Customs`,
    orderConfirmationHtml(order)
  );
}

export async function sendAdminOrderAlert(order: DbOrder): Promise<void> {
  await sendEmail(
    ADMIN_EMAIL,
    `🔔 New order #${order.order_number} — ${fmt(order.total_cents)}`,
    adminOrderAlertHtml(order)
  );
}

export async function sendShippingNotification(order: DbOrder): Promise<void> {
  if (!order.customer_email) return;
  await sendEmail(
    order.customer_email,
    `Your Elevated Customs order has shipped`,
    shippingNotificationHtml(order)
  );
}
