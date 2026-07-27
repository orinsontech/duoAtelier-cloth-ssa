import type { Metadata } from "next";
import { SiteNav, SiteFooter, StickyWhatsApp } from "@/components/site-nav";
import { BRAND_NAME, CONTACT_EMAIL, buildWhatsAppUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${BRAND_NAME} about a custom order or general question.`,
};

export default function Page() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteNav />
      <header className="px-6 lg:px-10 pt-16 pb-10 text-center border-b border-border">
        <span className="text-[10px] uppercase tracking-[0.35em] text-burgundy">
          Say Hello
        </span>
        <h1 className="font-serif text-5xl md:text-6xl italic mt-4">
          Contact Us
        </h1>
        <p className="mt-4 text-sm text-ink/60 max-w-md mx-auto">
          Questions about a design, fabric, or an order in progress?
          We&rsquo;re fastest to reach on WhatsApp.
        </p>
      </header>

      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto grid gap-8 sm:grid-cols-2">
          <a
            href={buildWhatsAppUrl("Hi! I'd like to get in touch.")}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border p-8 text-center transition-colors hover:border-burgundy"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/40">
              Fastest response
            </p>
            <p className="mt-2 font-serif text-2xl italic">WhatsApp</p>
            <p className="mt-3 text-sm text-ink/60">
              Chat with us directly about your design or order.
            </p>
          </a>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rounded-lg border border-border p-8 text-center transition-colors hover:border-burgundy"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/40">
              For everything else
            </p>
            <p className="mt-2 font-serif text-2xl italic">Email</p>
            <p className="mt-3 text-sm text-ink/60">{CONTACT_EMAIL}</p>
          </a>
        </div>

        <p className="mt-10 text-center text-[11px] uppercase tracking-[0.2em] text-ink/40">
          We usually reply within a few hours.
        </p>
      </section>

      <SiteFooter />
      <StickyWhatsApp />
    </div>
  );
}
