import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { BRAND_NAME, CONTACT_EMAIL, buildWhatsAppUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `Cancellation, return, and refund terms for ${BRAND_NAME} orders.`,
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Orders & Returns"
      title="Refund Policy"
      updated="26 July 2026"
    >
      <div>
        <h2>Custom, made-to-order products</h2>
        <p>
          Every {BRAND_NAME} tshirt is printed specifically for you based on
          the design, fabric, and size you choose. Because each order is
          custom made, we generally cannot accept returns or exchanges for
          reasons such as a change of mind.
        </p>
      </div>

      <div>
        <h2>Cancellations</h2>
        <p>
          You can cancel or amend your order free of charge any time before
          we begin production. Once printing has started, the order cannot
          be cancelled.
        </p>
      </div>

      <div>
        <h2>Damaged, defective, or incorrect items</h2>
        <p>
          If your order arrives damaged, defective, or different from what
          you confirmed (wrong size, fabric, or design), message us on
          WhatsApp within 48 hours of delivery with a photo or video of the
          issue. We&rsquo;ll arrange a reprint or refund at no extra cost.
        </p>
      </div>

      <div>
        <h2>Refund process</h2>
        <p>
          Approved refunds are processed to your original payment method
          within 5–7 business days. Where a reprint is more suitable, we&rsquo;ll
          coordinate that with you instead.
        </p>
      </div>

      <div>
        <h2>How to request a refund</h2>
        <p>
          Message us on{" "}
          <a
            href={buildWhatsAppUrl("Hi! I'd like to raise a refund request for my order.")}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>{" "}
          with your order details, or email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, and
          we&rsquo;ll take it from there.
        </p>
      </div>
    </LegalPage>
  );
}
