import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { BRAND_NAME, CONTACT_EMAIL, buildWhatsAppUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern orders placed with ${BRAND_NAME}.`,
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Please Read"
      title="Terms of Service"
      updated="26 July 2026"
    >
      <p>
        By browsing this site and placing an order with {BRAND_NAME}, you
        agree to the terms below. Please read them before you order.
      </p>

      <div>
        <h2>Orders &amp; customization</h2>
        <p>
          Every order is made to order based on the design, fabric, size, and
          reference image you provide during customization. Please double
          check your selections and uploaded artwork before confirming — we
          begin production based on exactly what you submit.
        </p>
      </div>

      <div>
        <h2>How orders are placed</h2>
        <p>
          Orders are finalised over WhatsApp after you submit your design and
          details through the customizer. We&rsquo;ll confirm pricing,
          fabric, and delivery timelines with you directly before production
          begins.
        </p>
      </div>

      <div>
        <h2>Pricing &amp; payment</h2>
        <p>
          Prices shown against each design are indicative and may vary
          slightly based on customization complexity, which we&rsquo;ll
          confirm with you on WhatsApp before you pay. Payment terms are
          shared at the time of order confirmation.
        </p>
      </div>

      <div>
        <h2>Production &amp; delivery</h2>
        <p>
          Since each tshirt is custom printed, production takes a few days
          before dispatch. Estimated delivery timelines will be shared with
          you when your order is confirmed.
        </p>
      </div>

      <div>
        <h2>Your uploaded content</h2>
        <p>
          You confirm that any image or artwork you upload is either your
          own, or that you have the right to use it for a custom print. We
          reserve the right to decline artwork that infringes on
          intellectual property or contains inappropriate content.
        </p>
      </div>

      <div>
        <h2>Limitation of liability</h2>
        <p>
          We take care in producing every order to the specifications you
          submit. We are not liable for delays or issues caused by incorrect
          information, unclear reference images, or events outside our
          reasonable control.
        </p>
      </div>

      <div>
        <h2>Changes to these terms</h2>
        <p>
          We may revise these terms occasionally. The &ldquo;Last
          updated&rdquo; date at the top of this page reflects the most
          recent revision.
        </p>
      </div>

      <div>
        <h2>Contact us</h2>
        <p>
          Questions about these terms? Reach us on{" "}
          <a
            href={buildWhatsAppUrl("Hi! I have a question about your terms of service.")}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>{" "}
          or email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </LegalPage>
  );
}
