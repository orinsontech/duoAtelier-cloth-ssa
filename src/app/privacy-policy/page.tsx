import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { BRAND_NAME, CONTACT_EMAIL, buildWhatsAppUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BRAND_NAME} collects, uses, and protects your information.`,
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Your Data"
      title="Privacy Policy"
      updated="26 July 2026"
    >
      <p>
        {BRAND_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your
        privacy. This policy explains what information we collect when you
        design, customize, and order a couple tshirt with us, and how we use
        it.
      </p>

      <div>
        <h2>Information we collect</h2>
        <p>
          When you use the customizer and place an order, we collect the
          details you provide directly: your name, phone number, delivery
          address, size selections, fabric preference, and any reference
          image you upload for your design.
        </p>
        <ul>
          <li>Contact details you submit on the order form</li>
          <li>Images you upload to personalise your design</li>
          <li>Messages exchanged with us over WhatsApp regarding your order</li>
        </ul>
      </div>

      <div>
        <h2>How we use your information</h2>
        <p>We use the information you share only to:</p>
        <ul>
          <li>Prepare and confirm your customised order</li>
          <li>Coordinate production, printing, and delivery</li>
          <li>Contact you about your order status</li>
        </ul>
        <p>We do not sell or rent your personal information to third parties.</p>
      </div>

      <div>
        <h2>Image uploads</h2>
        <p>
          Reference images you upload are stored securely with our image
          hosting provider solely to produce your order and are not used for
          any other purpose without your consent.
        </p>
      </div>

      <div>
        <h2>Data sharing</h2>
        <p>
          We share order details only with the parties needed to fulfil it —
          for example our printing and courier partners — and only to the
          extent required to deliver your tshirts.
        </p>
      </div>

      <div>
        <h2>Data security</h2>
        <p>
          We take reasonable technical and organisational measures to protect
          your information. No method of transmission or storage is
          completely secure, so we cannot guarantee absolute security.
        </p>
      </div>

      <div>
        <h2>Your rights</h2>
        <p>
          You can ask us to review, correct, or delete the personal
          information we hold about you at any time by reaching out through
          the contact details below.
        </p>
      </div>

      <div>
        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The &ldquo;Last
          updated&rdquo; date at the top of this page reflects the most
          recent revision.
        </p>
      </div>

      <div>
        <h2>Contact us</h2>
        <p>
          Questions about this policy? Reach us on{" "}
          <a
            href={buildWhatsAppUrl("Hi! I have a question about your privacy policy.")}
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
